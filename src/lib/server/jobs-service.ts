import crypto from 'crypto';
import {
  Job,
  JobStatus,
  CreateJobInput,
  Payment,
  EvidenceItem,
  ActivityEvent,
  JobSummaryFinancials
} from '../types';
import { readJobsDatabase, writeJobsDatabase } from './storage';

export function calculateFinancials(job: Job): JobSummaryFinancials {
  const agreedPrice = Number(job.agreedPrice) || 0;
  const payments = Array.isArray(job.payments) ? job.payments : [];

  const totalPaid = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  const advancePaid = payments
    .filter((p) => p.type === 'advance')
    .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

  // Deterministic 2-decimal rounded calculation
  const roundedPaid = Math.round(totalPaid * 100) / 100;
  const rawBalance = agreedPrice - roundedPaid;
  const balanceDue = Math.max(0, Math.round(rawBalance * 100) / 100);

  return {
    agreedPrice,
    totalPaid: roundedPaid,
    balanceDue,
    advancePaid,
    isFullyPaid: balanceDue === 0 && agreedPrice > 0,
  };
}

export function getAllJobs(): Job[] {
  return readJobsDatabase().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getJobById(id: string): Job | null {
  const jobs = readJobsDatabase();
  return jobs.find((j) => j.id === id) || null;
}

export function getJobByCustomerToken(token: string): Job | null {
  if (!token || typeof token !== 'string') return null;
  const jobs = readJobsDatabase();
  return jobs.find((j) => j.customerToken === token) || null;
}

export function createJob(input: CreateJobInput): Job {
  if (!input.title || !input.title.trim()) {
    throw new Error("Job title is required");
  }
  if (!input.customerName || !input.customerName.trim()) {
    throw new Error("Customer name is required");
  }
  if (!input.serviceAddress || !input.serviceAddress.trim()) {
    throw new Error("Service address is required");
  }
  const agreedPrice = Number(input.agreedPrice);
  if (isNaN(agreedPrice) || agreedPrice <= 0) {
    throw new Error("Agreed price must be a valid positive amount");
  }

  const now = new Date().toISOString();
  const id = `job_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
  const customerToken = `ctok_${crypto.randomBytes(12).toString('hex')}`;

  const payments: Payment[] = [];
  const activityLog: ActivityEvent[] = [];

  const initialStatus: JobStatus = 'pending_customer_confirm';

  activityLog.push({
    id: `act_${Date.now()}_1`,
    timestamp: now,
    actor: 'worker',
    actorName: input.workerName || 'Technician',
    action: 'JOB_CREATED',
    description: `Job agreement created for ₹${agreedPrice.toLocaleString('en-IN')}`,
    metadata: { agreedPrice, category: input.category },
  });

  if (input.initialAdvance && input.initialAdvance.amount > 0) {
    const advAmount = Number(input.initialAdvance.amount);
    if (advAmount > agreedPrice) {
      throw new Error("Advance payment cannot exceed the total agreed price");
    }
    const payId = `pay_adv_${Date.now()}`;
    payments.push({
      id: payId,
      amount: advAmount,
      type: 'advance',
      method: input.initialAdvance.method || 'cash',
      date: now,
      note: input.initialAdvance.note || 'Initial advance received at job creation',
      recordedBy: 'worker',
    });

    activityLog.push({
      id: `act_${Date.now()}_2`,
      timestamp: now,
      actor: 'worker',
      actorName: input.workerName || 'Technician',
      action: 'PAYMENT_RECORDED',
      description: `Advance payment of ₹${advAmount.toLocaleString('en-IN')} recorded via ${(input.initialAdvance.method || 'cash').toUpperCase()}`,
      metadata: { amount: advAmount, type: 'advance' },
    });
  }

  const newJob: Job = {
    id,
    customerToken,
    title: input.title.trim(),
    category: input.category,
    description: input.description.trim(),
    customerName: input.customerName.trim(),
    customerPhone: input.customerPhone?.trim(),
    serviceAddress: input.serviceAddress.trim(),
    agreedPrice,
    status: initialStatus,
    expectedCompletionDate: input.expectedCompletionDate,
    createdAt: now,
    updatedAt: now,
    workerName: input.workerName?.trim() || 'Technician',
    workerPhone: input.workerPhone?.trim(),
    evidence: [],
    payments,
    activityLog,
  };

  const jobs = readJobsDatabase();
  jobs.unshift(newJob);
  writeJobsDatabase(jobs);

  return newJob;
}

export function updateJobStatus(
  jobId: string,
  newStatus: JobStatus,
  note?: string,
  actor: 'worker' | 'customer' | 'system' = 'worker',
  actorName: string = 'Technician'
): Job {
  const jobs = readJobsDatabase();
  const index = jobs.findIndex((j) => j.id === jobId);
  if (index === -1) {
    throw new Error(`Job not found with id: ${jobId}`);
  }

  const job = jobs[index];
  const oldStatus = job.status;

  // Validation rules for transitions:
  const allowedTransitions: Record<JobStatus, JobStatus[]> = {
    draft: ['pending_customer_confirm', 'confirmed', 'rejected'],
    pending_customer_confirm: ['confirmed', 'rejected'],
    confirmed: ['in_progress', 'draft'],
    rejected: ['pending_customer_confirm', 'draft'],
    in_progress: ['pending_customer_review', 'completed', 'disputed'],
    pending_customer_review: ['completed', 'disputed', 'in_progress'],
    completed: ['closed', 'in_progress', 'disputed'],
    disputed: ['in_progress', 'closed', 'completed'],
    closed: ['in_progress'],
  };

  if (!allowedTransitions[oldStatus]?.includes(newStatus)) {
    throw new Error(
      `Invalid status transition from '${oldStatus}' to '${newStatus}'`
    );
  }

  // Invariant: Cannot close job if balance remains unsettled unless documented
  if (newStatus === 'closed') {
    const fin = calculateFinancials(job);
    if (fin.balanceDue > 0) {
      throw new Error(`Cannot close job with outstanding balance of ₹${fin.balanceDue}. Settle balance first.`);
    }
  }

  const now = new Date().toISOString();
  job.status = newStatus;
  job.updatedAt = now;

  job.activityLog.push({
    id: `act_${Date.now()}_status`,
    timestamp: now,
    actor,
    actorName,
    action: 'STATUS_UPDATED',
    description: `Status changed from ${oldStatus.replace(/_/g, ' ')} to ${newStatus.replace(/_/g, ' ')}${note ? `: ${note}` : ''}`,
    metadata: { oldStatus, newStatus, note },
  });

  jobs[index] = job;
  writeJobsDatabase(jobs);
  return job;
}

export function customerRespondToAgreement(
  token: string,
  confirmed: boolean,
  customerName?: string,
  note?: string
): Job {
  const jobs = readJobsDatabase();
  const index = jobs.findIndex((j) => j.customerToken === token);
  if (index === -1) {
    throw new Error("Invalid or expired confirmation token");
  }

  const job = jobs[index];
  if (job.status !== 'pending_customer_confirm' && job.status !== 'draft') {
    throw new Error(`Agreement has already been responded to (Current status: ${job.status})`);
  }

  const now = new Date().toISOString();
  const finalCustomerName = customerName || job.customerName;

  if (confirmed) {
    job.status = 'confirmed';
    job.customerConfirmation = {
      confirmedAt: now,
      customerName: finalCustomerName,
      note: note || 'Confirmed agreement terms',
    };
    job.activityLog.push({
      id: `act_${Date.now()}_cust_confirm`,
      timestamp: now,
      actor: 'customer',
      actorName: finalCustomerName,
      action: 'CUSTOMER_CONFIRMED',
      description: `Customer confirmed job agreement and price of ₹${job.agreedPrice.toLocaleString('en-IN')}${note ? ` (Note: "${note}")` : ''}`,
      metadata: { note },
    });
  } else {
    job.status = 'rejected';
    job.customerConfirmation = {
      rejectedAt: now,
      customerName: finalCustomerName,
      note: note || 'Rejected agreement terms',
    };
    job.activityLog.push({
      id: `act_${Date.now()}_cust_reject`,
      timestamp: now,
      actor: 'customer',
      actorName: finalCustomerName,
      action: 'CUSTOMER_REJECTED',
      description: `Customer rejected job agreement${note ? ` (Reason: "${note}")` : ''}`,
      metadata: { note },
    });
  }

  job.updatedAt = now;
  jobs[index] = job;
  writeJobsDatabase(jobs);
  return job;
}

export function customerRespondToCompletion(
  token: string,
  approved: boolean,
  disputeReason?: string,
  customerName?: string,
  note?: string
): Job {
  const jobs = readJobsDatabase();
  const index = jobs.findIndex((j) => j.customerToken === token);
  if (index === -1) {
    throw new Error("Invalid or expired customer token");
  }

  const job = jobs[index];
  if (job.status !== 'pending_customer_review' && job.status !== 'in_progress') {
    throw new Error(`Job is not currently pending completion review (Current status: ${job.status})`);
  }

  const now = new Date().toISOString();
  const finalCustomerName = customerName || job.customerName;

  if (approved) {
    job.status = 'completed';
    job.completionApproval = {
      approvedAt: now,
      customerName: finalCustomerName,
      note: note || 'Completion approved by customer',
    };
    job.activityLog.push({
      id: `act_${Date.now()}_comp_appr`,
      timestamp: now,
      actor: 'customer',
      actorName: finalCustomerName,
      action: 'COMPLETION_APPROVED',
      description: `Customer inspected work and approved completion${note ? ` (Note: "${note}")` : ''}`,
      metadata: { note },
    });
  } else {
    // Invariant: Never automatically declare a disputed job approved
    if (!disputeReason || !disputeReason.trim()) {
      throw new Error("Dispute reason is required when raising a completion disagreement");
    }
    job.status = 'disputed';
    job.completionApproval = {
      disputedAt: now,
      disputeReason: disputeReason.trim(),
      customerName: finalCustomerName,
      note: note?.trim(),
    };
    job.activityLog.push({
      id: `act_${Date.now()}_comp_disp`,
      timestamp: now,
      actor: 'customer',
      actorName: finalCustomerName,
      action: 'COMPLETION_DISPUTED',
      description: `Customer raised a disagreement: "${disputeReason.trim()}"`,
      metadata: { disputeReason: disputeReason.trim() },
    });
  }

  job.updatedAt = now;
  jobs[index] = job;
  writeJobsDatabase(jobs);
  return job;
}

export function addEvidence(
  jobId: string,
  evidence: Omit<EvidenceItem, 'id' | 'timestamp' | 'uploadedBy'>
): Job {
  const jobs = readJobsDatabase();
  const index = jobs.findIndex((j) => j.id === jobId);
  if (index === -1) {
    throw new Error(`Job not found with id: ${jobId}`);
  }

  if (!evidence.title || !evidence.title.trim()) {
    throw new Error("Evidence title is required");
  }
  if (!evidence.imageUrl || !evidence.imageUrl.trim()) {
    throw new Error("Evidence image URL is required");
  }

  const job = jobs[index];
  const now = new Date().toISOString();
  const newItem: EvidenceItem = {
    id: `ev_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
    type: evidence.type || 'after',
    title: evidence.title.trim(),
    description: evidence.description?.trim(),
    imageUrl: evidence.imageUrl.trim(),
    timestamp: now,
    uploadedBy: 'worker',
  };

  job.evidence.push(newItem);
  job.updatedAt = now;

  job.activityLog.push({
    id: `act_${Date.now()}_ev`,
    timestamp: now,
    actor: 'worker',
    actorName: job.workerName,
    action: 'EVIDENCE_ADDED',
    description: `Added ${newItem.type} evidence photo: "${newItem.title}"`,
    metadata: { evidenceId: newItem.id, type: newItem.type },
  });

  jobs[index] = job;
  writeJobsDatabase(jobs);
  return job;
}

export function recordPayment(
  jobId: string,
  paymentInput: {
    amount: number;
    type: Payment['type'];
    method: Payment['method'];
    note?: string;
  }
): Job {
  const jobs = readJobsDatabase();
  const index = jobs.findIndex((j) => j.id === jobId);
  if (index === -1) {
    throw new Error(`Job not found with id: ${jobId}`);
  }

  const amount = Number(paymentInput.amount);
  if (isNaN(amount) || amount <= 0) {
    throw new Error("Payment amount must be a positive number");
  }

  const job = jobs[index];
  const currentFin = calculateFinancials(job);

  if (amount > currentFin.balanceDue) {
    throw new Error(
      `Payment amount (₹${amount}) exceeds remaining balance due (₹${currentFin.balanceDue})`
    );
  }

  const now = new Date().toISOString();
  const newPayment: Payment = {
    id: `pay_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
    amount: Math.round(amount * 100) / 100,
    type: paymentInput.type || 'partial',
    method: paymentInput.method || 'cash',
    date: now,
    note: paymentInput.note?.trim(),
    recordedBy: 'worker',
  };

  job.payments.push(newPayment);
  job.updatedAt = now;

  const newFin = calculateFinancials(job);

  job.activityLog.push({
    id: `act_${Date.now()}_pay`,
    timestamp: now,
    actor: 'worker',
    actorName: job.workerName,
    action: 'PAYMENT_RECORDED',
    description: `Recorded payment of ₹${amount.toLocaleString('en-IN')} via ${newPayment.method.toUpperCase()} (Remaining Balance: ₹${newFin.balanceDue.toLocaleString('en-IN')})`,
    metadata: {
      paymentId: newPayment.id,
      amount,
      balanceDue: newFin.balanceDue,
    },
  });

  // If completed and balance is 0, auto-transition to closed or enable closing
  if (job.status === 'completed' && newFin.balanceDue === 0) {
    job.status = 'closed';
    job.activityLog.push({
      id: `act_${Date.now()}_closed`,
      timestamp: now,
      actor: 'system',
      actorName: 'KaamProof Engine',
      action: 'JOB_CLOSED',
      description: 'Job successfully closed: Work approved and full payment settled.',
    });
  }

  jobs[index] = job;
  writeJobsDatabase(jobs);
  return job;
}
