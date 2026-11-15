import fs from 'fs';
import path from 'path';
import { Job } from '../types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'jobs.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial synthetic seed data for competition demo:
// Section 9: "A customer hires an electrician to repair a switchboard"
const INITIAL_DEMO_JOBS: Job[] = [
  {
    id: "job_demo_elec_01",
    customerToken: "ctok_elec_demo_9823f4a1",
    title: "Main Distribution Board Rewiring & MCB Upgrade",
    category: "electrical",
    description: "Inspect frequent tripping of 32A main MCB, replace burnt neutral busbar, install 40A double-pole isolator, and rewire loose terminal connections in living room sub-panel.",
    customerName: "Ramesh Sharma",
    customerPhone: "+91 98765 43210",
    serviceAddress: "Flat 402, Shanti Vihar Apartments, Sector 14, Gurgaon",
    agreedPrice: 3200,
    status: "in_progress",
    expectedCompletionDate: "2026-11-15",
    createdAt: "2026-11-15T09:30:00.000Z",
    updatedAt: "2026-11-15T14:15:00.000Z",
    workerName: "Vikram Electrician Services",
    workerPhone: "+91 98111 22334",
    evidence: [
      {
        id: "ev_01_before",
        type: "before",
        title: "Burnt neutral bar & melted PVC wiring",
        description: "Discovered blackened terminal block and loose overheating neutral cable causing sparks during AC load.",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
        timestamp: "2026-11-15T10:45:00.000Z",
        uploadedBy: "worker"
      }
    ],
    payments: [
      {
        id: "pay_adv_01",
        amount: 1000,
        type: "advance",
        method: "upi",
        date: "2026-11-15T10:00:00.000Z",
        note: "Advance received for purchasing 40A Havells DP Isolator & 6 sqmm copper wire",
        recordedBy: "worker"
      }
    ],
    activityLog: [
      {
        id: "act_01",
        timestamp: "2026-11-15T09:30:00.000Z",
        actor: "worker",
        actorName: "Vikram (Electrician)",
        action: "JOB_CREATED",
        description: "Job agreement created with estimated price of ₹3,200"
      },
      {
        id: "act_02",
        timestamp: "2026-11-15T09:45:00.000Z",
        actor: "customer",
        actorName: "Ramesh Sharma",
        action: "CUSTOMER_CONFIRMED",
        description: "Customer reviewed and accepted job terms via secure link"
      },
      {
        id: "act_03",
        timestamp: "2026-11-15T10:00:00.000Z",
        actor: "worker",
        actorName: "Vikram (Electrician)",
        action: "PAYMENT_RECORDED",
        description: "₹1,000 advance payment recorded via UPI (Balance: ₹2,200)"
      },
      {
        id: "act_04",
        timestamp: "2026-11-15T10:45:00.000Z",
        actor: "worker",
        actorName: "Vikram (Electrician)",
        action: "EVIDENCE_ADDED",
        description: "Before-work evidence photo uploaded (Burnt neutral busbar)"
      },
      {
        id: "act_05",
        timestamp: "2026-11-15T11:00:00.000Z",
        actor: "worker",
        actorName: "Vikram (Electrician)",
        action: "STATUS_UPDATED",
        description: "Status changed to In Progress"
      }
    ],
    customerConfirmation: {
      confirmedAt: "2026-11-15T09:45:00.000Z",
      customerName: "Ramesh Sharma",
      note: "Confirmed. Please ensure original Havells or Schneider parts are used."
    }
  }
];

export function readJobsDatabase(): Job[] {
  try {
    if (!fs.existsSync(DB_FILE)) {
      writeJobsDatabase(INITIAL_DEMO_JOBS);
      return INITIAL_DEMO_JOBS;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw) as Job[];
  } catch (err) {
    console.error("Error reading jobs database, falling back to in-memory:", err);
    return INITIAL_DEMO_JOBS;
  }
}

export function writeJobsDatabase(jobs: Job[]): void {
  try {
    const tempFile = `${DB_FILE}.${Date.now()}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(jobs, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error("Failed to write to jobs database:", err);
    throw new Error("Database persistence error");
  }
}
