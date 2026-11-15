export type JobStatus =
  | 'draft'
  | 'pending_customer_confirm'
  | 'confirmed'
  | 'rejected'
  | 'in_progress'
  | 'pending_customer_review'
  | 'completed'
  | 'disputed'
  | 'closed';

export type JobCategory =
  | 'electrical'
  | 'plumbing'
  | 'ac_repair'
  | 'appliances'
  | 'carpentry'
  | 'painting'
  | 'masonry'
  | 'other';

export type PaymentType = 'advance' | 'interim' | 'final';

export type PaymentMethod = 'cash' | 'upi' | 'bank_transfer' | 'cheque' | 'other';

export interface Payment {
  id: string;
  amount: number;
  type: PaymentType;
  method: PaymentMethod;
  date: string;
  note?: string;
  recordedBy: 'worker' | 'customer';
}

export interface EvidenceItem {
  id: string;
  type: 'before' | 'after' | 'during';
  title: string;
  description?: string;
  imageUrl: string;
  timestamp: string;
  uploadedBy: 'worker';
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  actor: 'worker' | 'customer' | 'system';
  actorName: string;
  action: string;
  description: string;
  metadata?: Record<string, unknown>;
}

export interface CustomerConfirmation {
  confirmedAt?: string;
  rejectedAt?: string;
  customerName?: string;
  note?: string;
  signatureOrAck?: string;
}

export interface CompletionApproval {
  approvedAt?: string;
  disputedAt?: string;
  disputeReason?: string;
  customerName?: string;
  note?: string;
}

export interface Job {
  id: string;
  customerToken: string; // Unguessable secure URL token for customer portal
  title: string;
  category: JobCategory;
  description: string;
  customerName: string;
  customerPhone?: string;
  serviceAddress: string;
  agreedPrice: number;
  status: JobStatus;
  expectedCompletionDate: string;
  createdAt: string;
  updatedAt: string;
  workerName: string;
  workerPhone?: string;
  evidence: EvidenceItem[];
  payments: Payment[];
  activityLog: ActivityEvent[];
  customerConfirmation?: CustomerConfirmation;
  completionApproval?: CompletionApproval;
}

export interface JobSummaryFinancials {
  agreedPrice: number;
  totalPaid: number;
  balanceDue: number;
  advancePaid: number;
  isFullyPaid: boolean;
}

export interface CreateJobInput {
  title: string;
  category: JobCategory;
  description: string;
  customerName: string;
  customerPhone?: string;
  serviceAddress: string;
  agreedPrice: number;
  expectedCompletionDate: string;
  workerName?: string;
  workerPhone?: string;
  initialAdvance?: {
    amount: number;
    method: PaymentMethod;
    note?: string;
  };
}
