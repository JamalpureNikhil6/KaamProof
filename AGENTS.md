# KAAMPROOF — AGENT ROLES AND RESPONSIBILITY MATRIX

Project: KAAMPROOF (VibeX Codes 2026 - Track 1: Daily Workers, Small Shopkeepers & Informal Workforce)
Repository: `/home/user007-nikhil/Desktop/KaamProff`

## Agent Structure & Explicit File Ownership

| Agent | Role | Responsibilities | Strict File Ownership |
|---|---|---|---|
| **Lead Agent (Orchestrator)** | Chief Architect & Integration Lead | System orchestration, interface alignment, conflict resolution, end-to-end integration, production build & delivery. | Root config, `AGENTS.md`, `HANDOFF_TO_IDE.md`, `IDE_TAKEOVER_PROMPT.md` |
| **Agent 1** | Product Architect & Domain Researcher | Domain models, state machines, business invariants, privacy guidelines, capability map and specification. | `docs/SPEC-kaamproof.md`, `docs/ARCHITECTURE.md`, `docs/SECURITY_PRIVACY.md` |
| **Agent 2** | Backend & Data Engineer | Atomic JSON/File-backed persistent storage, state transitions, token generator, activity timeline logger, deterministic arithmetic, API endpoints. | `src/lib/server/*`, `src/app/api/*`, `data/*` |
| **Agent 3** | Frontend & Experience Engineer | Modern editorial UI, worker dashboard, job wizard, unique customer confirmation portal, evidence upload viewer, payment tracker, responsive layouts, accessible UI. | `src/app/*` (pages, layouts), `src/components/*`, `src/styles/*` |
| **Agent 4** | QA & Security Engineer | Synthetic test generation, lifecycle validation, payment precision tests, unauthorized access & tampering verification, test runner script, QA report. | `scripts/test-runner.js`, `tests/*`, `docs/QA_SECURITY_REPORT.md` |

## Shared Contract Guidelines
1. **Types Contract**: `src/lib/types.ts` is the single source of truth for all data structures (Job, Activity, Payment, Evidence, Status). Any schema change requires consensus.
2. **Access Control**: Public customer tokens (`c_token_...`) provide scoped access strictly to their specific job's confirmation and completion review; private worker dashboard provides full management.
3. **Deterministic Math**: Currency stored in integer or fixed 2-decimal numbers (INR ₹). Balance = Agreed Amount - Sum(Payments Received). Never floating-point rounding errors.
4. **Privacy First**: No unnecessary tracking, no public job listings, unique cryptographic nanoid tokens for shared links.
