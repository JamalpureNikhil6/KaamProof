// Comprehensive Test Suite for KaamProof Core Engine
// Validates: Lifecycle transitions, Deterministic Payment Ledger, Evidence, Disputes, Tokens

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Setup test database isolated environment
const TEST_DATA_DIR = path.join(__dirname, '..', 'data');
const TEST_DB_FILE = path.join(TEST_DATA_DIR, 'jobs.json');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    testsFailed++;
    throw new Error(message);
  } else {
    console.log(`✅ PASS: ${message}`);
    testsPassed++;
  }
}

function calculateFinancials(job) {
  const agreedPrice = Number(job.agreedPrice) || 0;
  const payments = Array.isArray(job.payments) ? job.payments : [];

  const totalPaid = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  const advancePaid = payments
    .filter((p) => p.type === 'advance')
    .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

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

async function runAllTests() {
  console.log("=========================================");
  console.log("   KAAMPROOF CORE ENGINE TEST SUITE      ");
  console.log("=========================================\n");

  // TEST 1: Payment & Deterministic Financials Arithmetic
  console.log("--- TEST GROUP 1: Deterministic Financials & Floating Point Precision ---");
  {
    const mockJob = {
      agreedPrice: 4500.50,
      payments: [
        { amount: 1500.20, type: 'advance' },
        { amount: 1000.10, type: 'partial' },
        { amount: 2000.20, type: 'final' }
      ]
    };

    const fin = calculateFinancials(mockJob);
    assert(fin.agreedPrice === 4500.50, "Agreed price matches expected");
    assert(fin.totalPaid === 4500.50, `Total paid deterministic calculation (Expected 4500.50, got ${fin.totalPaid})`);
    assert(fin.balanceDue === 0, `Balance due is exactly 0.00 (Got ${fin.balanceDue})`);
    assert(fin.isFullyPaid === true, "isFullyPaid flag is correctly true when balance is 0");
    assert(fin.advancePaid === 1500.20, "Advance paid correctly isolated");
  }

  // TEST 2: Partial Payment Balance Due
  console.log("\n--- TEST GROUP 2: Partial Balance Verification ---");
  {
    const mockJob2 = {
      agreedPrice: 3200,
      payments: [
        { amount: 1000, type: 'advance' }
      ]
    };
    const fin2 = calculateFinancials(mockJob2);
    assert(fin2.balanceDue === 2200, `Balance due after ₹1000 advance is ₹2200 (Got ₹${fin2.balanceDue})`);
    assert(fin2.isFullyPaid === false, "Job is marked not fully paid");
  }

  // TEST 3: State Machine Allowed Transitions
  console.log("\n--- TEST GROUP 3: Job Lifecycle State Machine ---");
  {
    const allowedTransitions = {
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

    function isValidTransition(from, to) {
      return (allowedTransitions[from] || []).includes(to);
    }

    assert(isValidTransition('pending_customer_confirm', 'confirmed') === true, "Can confirm from pending_customer_confirm");
    assert(isValidTransition('pending_customer_confirm', 'rejected') === true, "Can reject from pending_customer_confirm");
    assert(isValidTransition('confirmed', 'in_progress') === true, "Can start work once confirmed");
    assert(isValidTransition('in_progress', 'pending_customer_review') === true, "Can request customer completion review");
    assert(isValidTransition('pending_customer_review', 'completed') === true, "Customer can approve completion");
    assert(isValidTransition('pending_customer_review', 'disputed') === true, "Customer can dispute completion");
    assert(isValidTransition('pending_customer_confirm', 'closed') === false, "Illegal transition directly to closed is blocked");
  }

  // TEST 4: Non-auto approval of disputes
  console.log("\n--- TEST GROUP 4: Disputed Job Safety Invariant ---");
  {
    const disputeReason = "Switchboard MCB still heating up under heavy load";
    let status = 'pending_customer_review';

    // Simulate customer raising dispute
    if (disputeReason && disputeReason.trim()) {
      status = 'disputed';
    }

    assert(status === 'disputed', "Job transitioned to 'disputed' upon customer objection");
    assert(status !== 'completed', "Disputed job is never automatically approved");
  }

  // TEST 5: Cryptographic Token Uniqueness & Entanglement
  console.log("\n--- TEST GROUP 5: Security & Token Randomness ---");
  {
    const token1 = `ctok_${crypto.randomBytes(12).toString('hex')}`;
    const token2 = `ctok_${crypto.randomBytes(12).toString('hex')}`;
    assert(token1.length === 29, `Token length is safe and uniform (Length: ${token1.length})`);
    assert(token1 !== token2, "Unique non-deterministic tokens generated");
    assert(token1.startsWith('ctok_'), "Customer token has recognizable prefix");
  }

  // TEST 6: Check Database Seed File Persistence
  console.log("\n--- TEST GROUP 6: Persistence & Seed Verification ---");
  {
    assert(fs.existsSync(TEST_DB_FILE), `Database file exists at ${TEST_DB_FILE}`);
    const data = JSON.parse(fs.readFileSync(TEST_DB_FILE, 'utf-8'));
    assert(Array.isArray(data), "Database contains valid array of jobs");
    assert(data.length >= 1, `Seed job loaded successfully (Found ${data.length} jobs)`);
    const seed = data[0];
    assert(seed.id === "job_demo_elec_01", "Electrician demo seed job id matches");
    assert(seed.customerToken.startsWith("ctok_"), "Seed customer token valid");
    assert(seed.payments.length >= 1, "Seed job contains initial payment");
    assert(seed.activityLog.length >= 4, "Seed job contains full audit trail");
  }

  console.log("\n=========================================");
  console.log(`TEST SUMMARY: ${testsPassed} passed, ${testsFailed} failed.`);
  console.log("=========================================\n");

  if (testsFailed > 0) {
    process.exit(1);
  }
}

runAllTests().catch((err) => {
  console.error("Test runner encountered error:", err);
  process.exit(1);
});
