# KAAMPROOF — TECHNICAL SPECIFICATION & CAPABILITY MAP
**VibeX Codes 2026 — Track 1: Informal Workforce & Small Enterprises**
**Document Version:** 1.0.0 (Gated Spec Phase)
**Author:** Agent 1 (Product Architect) & Lead Orchestrator

---

## 1. Executive Summary & Objective

**Problem:** Millions of informal tradespeople in India (electricians, plumbers, carpenters, appliance technicians, small mechanics) conduct 95%+ of their business transactions through phone calls, WhatsApp messages, and verbal estimates. Over 30% of informal jobs face payment delays or disputes caused by:
- Ambiguous initial verbal scope.
- Unrecorded advance payments.
- Disagreement over whether work was completed as agreed.
- Unverified additional parts or scope creep.

**Solution:** **KAAMPROOF** provides an ultra-lightweight, zero-friction job accountability protocol:
1. **Technician creates job agreement** (work items, price, estimated completion).
2. **Customer receives a direct, unique confirmation link** (no app download, no account required) to review and explicitly confirm or reject the agreement.
3. **Execution & Evidence logging**: Technician logs before & after visual evidence with timestamped audit notes.
4. **Completion Approval**: Customer inspects completion photos and either approves or records an explicit disagreement.
5. **Deterministic Payment Ledger**: Tracks advance received, milestone payments, and outstanding balance without relying on fake payment gateways.
6. **Immutable Audit Trail & PDF/Print Job Summary**: Complete chronological timeline accessible to both parties.

---

## 2. Capability Map

| Module ID | Responsibility | Boundary & Inputs | Depends On |
|---|---|---|---|
| `types` | Core domain interfaces, enums, payload validation types | Shared contract between backend and UI | None |
| `storage` | Atomic file-backed JSON persistent storage with file-locking | In-process filesystem persistence | `types` |
| `jobs-engine` | State machine transitions, validation, token security | Job CRUD, status transitions, activity logging | `storage` |
| `ledger` | Deterministic balance and payment calculations | Payment records, refunds, balance math | `jobs-engine` |
| `evidence` | Before/after image metadata, timestamps, notes | Image storage and validation | `jobs-engine` |
| `worker-ui` | Technician dashboard, job creator wizard, timeline view | Next.js App Router, Tailwind, Lucide | `jobs-engine` |
| `customer-ui`| Frictionless customer portal accessed via secure token | Dedicated `/confirm/[token]` portal | `jobs-engine` |
| `export` | Clean printable job completion certificate / receipt | CSS print styling & structured layout | `jobs-engine` |

---

## 3. State Machine Specification

```
                  ┌──────────────┐
                  │    DRAFT     │
                  └──────┬───────┘
                         │ (Publish / Send Link)
                         ▼
             ┌─────────────────────────┐
             │ PENDING_CUSTOMER_CONFIRM │
             └─────┬─────────────┬─────┘
   (Customer Reject)│             │ (Customer Confirm)
                   ▼             ▼
             ┌───────────┐ ┌───────────┐
             │ REJECTED  │ │ CONFIRMED │
             └───────────┘ └─────┬─────┘
                                 │ (Start Work)
                                 ▼
                           ┌─────────────┐
                           │ IN_PROGRESS │
                           └─────┬───────┘
                                 │ (Technician Records Completion + Evidence)
                                 ▼
                     ┌────────────────────────┐
                     │ PENDING_CUSTOMER_REVIEW │
                     └─────┬────────────┬─────┘
   (Customer Dispute)│            │ (Customer Approves Completion)
                     ▼            ▼
               ┌──────────┐ ┌───────────┐
               │ DISPUTED │ │ COMPLETED │
               └────┬─────┘ └─────┬─────┘
                    │             │ (Balance == 0)
                    │             ▼
                    │       ┌───────────┐
                    └──────►│  CLOSED   │
                            └───────────┘
```

### Invariants:
- A job cannot be marked `COMPLETED` by the technician alone; it transitions to `PENDING_CUSTOMER_REVIEW` until customer confirms, or customer registers a `DISPUTED` state.
- Disputed jobs are NEVER automatically declared approved.
- A job cannot be transitioned to `CLOSED` unless:
  1. The work has been accepted or dispute resolved, AND
  2. Outstanding balance equals 0 (or marked explicitly settled).
- Customer link uses an unguessable 24-character token (`c_tok_...`).

---

## 4. Payment Ledger Invariants

- Currency: Indian Rupee (INR ₹).
- Model:
  - `agreedAmount`: Positive number (> 0).
  - `payments`: Array of `{ id, amount, type: 'advance' | 'partial' | 'final', date, note, recordedBy }`.
  - `totalPaid`: `sum(payments.map(p => p.amount))`.
  - `balanceDue`: `agreedAmount - totalPaid`.
- Invariant: `balanceDue >= 0`. Payments cannot exceed `agreedAmount` (or triggers warning).
- No floating-point rounding errors: calculated with `Math.round((amount) * 100) / 100`.

---

## 5. Security & Privacy Rules

1. Customer link contains only the scoped customer confirmation token. It does not grant worker administrative privileges (such as editing worker rates or deleting the job).
2. Worker management view is accessed via job ID `/jobs/[id]`.
3. Customer Phone & Address are stored securely and rendered only for operational verification, never publicly indexed.
4. All state mutations append an immutable activity event:
   `{ id, timestamp, actor: 'worker' | 'customer' | 'system', action, details }`.

---

## 6. Verification & Test Plan

- **Unit / Logic Tests**: State transitions, deterministic payment arithmetic, activity event generation, invalid input rejection.
- **API Tests**: Job creation, customer token retrieval, token verification, customer confirmation, dispute recording, evidence addition, payment recording.
- **Automated Quality Checks**: Production Next.js build (`npm run build`), TypeScript type checking (`npx tsc --noEmit`), Impeccable design scan (`impeccable detect src/`).
- **Synthetic Live Scenario**: Electrician switchboard repair end-to-end demo flow.
