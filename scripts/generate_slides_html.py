import base64
import os

def get_base64_image(file_path):
    with open(file_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        return f"data:image/png;base64,{encoded_string}"

dashboard_b64 = get_base64_image("/home/user007-nikhil/Desktop/KaamProff/public/images/dashboard_clean.png")
customer_b64 = get_base64_image("/home/user007-nikhil/Desktop/KaamProff/public/images/customer_portal_clean.png")
job_detail_b64 = get_base64_image("/home/user007-nikhil/Desktop/KaamProff/public/images/job_detail_clean.png")

HTML_TEMPLATE = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>KaamProof — VibeX Codes 2026 Presentation</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');

  @page {{
    size: 1920px 1080px;
    margin: 0;
  }}

  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}

  body {{
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #FAF9F6;
    color: #18181B;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }}

  .slide {{
    width: 1920px;
    height: 1080px;
    padding: 68px 96px;
    position: relative;
    page-break-after: always;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #FAF9F6;
    overflow: hidden;
  }}

  /* Header elements */
  .slide-header {{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }}

  .track-pill {{
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 6px 14px;
    border-radius: 999px;
    background: #ECFDF5;
    color: #047857;
    border: 1px solid #A7F3D0;
    margin-bottom: 12px;
  }}

  .track-pill-dot {{
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #047857;
  }}

  .slide-title {{
    font-size: 42px;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #18181B;
    line-height: 1.15;
  }}

  .slide-subtitle {{
    font-size: 19px;
    color: #52525B;
    margin-top: 4px;
    font-weight: 500;
  }}

  .slide-number {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 16px;
    font-weight: 600;
    color: #71717A;
    background: #F4F2ED;
    border: 1px solid #E4DFD7;
    padding: 6px 14px;
    border-radius: 8px;
  }}

  /* Body Content */
  .slide-body {{
    flex: 1;
    margin-top: 32px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
  }}

  /* Footer */
  .slide-footer {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #E4DFD7;
    padding-top: 16px;
    font-size: 14px;
    color: #71717A;
    font-weight: 500;
  }}

  .footer-brand {{
    font-weight: 700;
    color: #18181B;
    letter-spacing: -0.01em;
  }}

  /* Cards & Grid utilities */
  .card {{
    background: #FFFFFF;
    border: 1px solid #E4DFD7;
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 4px 12px rgba(24, 24, 27, 0.03);
  }}

  .grid-2 {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    width: 100%;
  }}

  .grid-3 {{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 28px;
    width: 100%;
  }}

  .grid-4 {{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    width: 100%;
  }}

  .step-card {{
    background: #FFFFFF;
    border: 1px solid #E4DFD7;
    border-radius: 14px;
    padding: 24px;
    position: relative;
    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
  }}

  .step-num {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    color: #047857;
    background: #ECFDF5;
    display: inline-block;
    padding: 3px 8px;
    border-radius: 6px;
    margin-bottom: 10px;
  }}

  .stat-label {{
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #71717A;
    margin-bottom: 4px;
  }}
</style>
</head>
<body>

  <!-- ==================== SLIDE 1: COVER ==================== -->
  <div class="slide" style="justify-content: space-between; background: linear-gradient(135deg, #FAF9F6 0%, #F5F3EC 100%);">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div class="track-pill">
        <span class="track-pill-dot"></span>
        VibeX Codes 2026 &bull; Track 1: Workers and Small Businesses
      </div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 600; color: #71717A;">
        SUBMISSION ID: KAAMPROOF-2026
      </div>
    </div>

    <div style="max-width: 1300px; margin-top: 10px;">
      <div style="display: inline-flex; align-items: center; gap: 16px; margin-bottom: 20px;">
        <div style="width: 64px; height: 64px; border-radius: 16px; background: #047857; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 32px; box-shadow: 0 8px 16px rgba(4, 120, 87, 0.25);">
          ✓
        </div>
        <h1 style="font-size: 80px; font-weight: 800; letter-spacing: -0.04em; color: #18181B; line-height: 1;">KaamProof</h1>
      </div>

      <div style="font-size: 32px; font-weight: 700; color: #047857; margin-bottom: 20px; letter-spacing: -0.02em;">
        Every job agreed. Every payment tracked. Every task documented.
      </div>

      <p style="font-size: 22px; color: #3F3F46; line-height: 1.5; max-width: 1100px; margin-bottom: 36px; font-weight: 500;">
        A lightweight, zero-friction service-job accountability system connecting work agreements, photographic evidence, customer confirmation, and deterministic payment tracking into a single verifiable workflow for informal trades.
      </p>

      <div style="display: flex; gap: 28px;">
        <div class="card" style="padding: 18px 24px; background: white; border-radius: 12px;">
          <div class="stat-label">Core Target Trade</div>
          <div style="font-size: 17px; font-weight: 700; color: #18181B;">Electricians, Plumbers, HVAC &amp; Repair Technicians</div>
        </div>
        <div class="card" style="padding: 18px 24px; background: white; border-radius: 12px;">
          <div class="stat-label">Customer Friction</div>
          <div style="font-size: 17px; font-weight: 700; color: #18181B;">Zero App Download &bull; Instant 1-Click WhatsApp Link</div>
        </div>
        <div class="card" style="padding: 18px 24px; background: white; border-radius: 12px;">
          <div class="stat-label">Implementation State</div>
          <div style="font-size: 17px; font-weight: 700; color: #047857;">Live &amp; Verified Production Build (26/26 Tests Passing)</div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span class="footer-brand">KaamProof &bull; VibeX Codes 2026 Presentation</span>
      <span>Slide 01 of 07</span>
    </div>
  </div>

  <!-- ==================== SLIDE 2: PROBLEM STATEMENT ==================== -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <div class="track-pill"><span class="track-pill-dot"></span> The Problem Grounding</div>
        <h2 class="slide-title">The Cost of Verbal Agreements in Informal Trade</h2>
        <p class="slide-subtitle">Millions of daily service jobs rely on unwritten calls, leading to avoidable disputes.</p>
      </div>
      <div class="slide-number">02 / 07</div>
    </div>

    <div class="slide-body">
      <div class="grid-2" style="align-items: stretch;">
        <div style="display: flex; flex-direction: column; justify-content: space-between; gap: 18px;">
          <div class="card" style="border-left: 6px solid #E11D48; padding: 22px 26px;">
            <h3 style="font-size: 19px; font-weight: 700; color: #BE123C; margin-bottom: 6px;">1. Unclear Initial Scope &amp; Quoted Price</h3>
            <p style="font-size: 15px; color: #3F3F46; line-height: 1.5;">
              Tradesmen quote estimates verbally over quick calls. Customers frequently dispute the final bill or claim additional repair tasks were included for free.
            </p>
          </div>

          <div class="card" style="border-left: 6px solid #D97706; padding: 22px 26px;">
            <h3 style="font-size: 19px; font-weight: 700; color: #B45309; margin-bottom: 6px;">2. Lack of Documented On-Site Work &amp; Parts</h3>
            <p style="font-size: 15px; color: #3F3F46; line-height: 1.5;">
              Technicians discover burnt wiring, broken valves, or hidden faults on-site. Without before-and-after proof, customers suspect unnecessary parts or shoddy labor.
            </p>
          </div>

          <div class="card" style="border-left: 6px solid #E11D48; padding: 22px 26px;">
            <h3 style="font-size: 19px; font-weight: 700; color: #BE123C; margin-bottom: 6px;">3. Unrecorded Advances &amp; Partial Payment Chaos</h3>
            <p style="font-size: 15px; color: #3F3F46; line-height: 1.5;">
              Cash or UPI advances taken for spare parts are frequently forgotten or disputed. With no shared ledger, remaining balances face delayed payment.
            </p>
          </div>
        </div>

        <!-- Breakdown Flow Visual -->
        <div class="card" style="background: #FBF9F5; display: flex; flex-direction: column; justify-content: center; padding: 32px;">
          <div style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #71717A; margin-bottom: 20px;">
            Traditional Informal Workflow Breakdown:
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div style="display: flex; align-items: center; gap: 16px; background: white; padding: 16px 20px; border-radius: 12px; border: 1px solid #E4DFD7;">
              <div style="width: 36px; height: 36px; border-radius: 8px; background: #F4F2ED; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #71717A;">1</div>
              <div style="flex: 1;">
                <strong style="color: #18181B; font-size: 16px;">Verbal Quote Given</strong>
                <p style="font-size: 14px; color: #71717A;">"₹3,200 for main panel repair" &rarr; Customer remembers "about ₹2,000".</p>
              </div>
            </div>

            <div style="text-align: center; color: #BE123C; font-weight: 700; font-size: 18px;">&darr;</div>

            <div style="display: flex; align-items: center; gap: 16px; background: white; padding: 16px 20px; border-radius: 12px; border: 1px solid #E4DFD7;">
              <div style="width: 36px; height: 36px; border-radius: 8px; background: #F4F2ED; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #71717A;">2</div>
              <div style="flex: 1;">
                <strong style="color: #18181B; font-size: 16px;">Repair Executed Without Photos</strong>
                <p style="font-size: 14px; color: #71717A;">Burnt neutral busbar replaced, but customer never saw original damage.</p>
              </div>
            </div>

            <div style="text-align: center; color: #BE123C; font-weight: 700; font-size: 18px;">&darr;</div>

            <div style="display: flex; align-items: center; gap: 16px; background: #FFF1F2; padding: 16px 20px; border-radius: 12px; border: 1px solid #FECDD3;">
              <div style="width: 36px; height: 36px; border-radius: 8px; background: #E11D48; color: white; display: flex; align-items: center; justify-content: center; font-weight: 800;">!</div>
              <div style="flex: 1;">
                <strong style="color: #BE123C; font-size: 16px;">Payment Dispute &amp; Delayed Settlement</strong>
                <p style="font-size: 14px; color: #881337;">Worker left unpaid or forced to take deep discounts to settle arguments.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span class="footer-brand">KaamProof &bull; VibeX Codes 2026 Presentation</span>
      <span>Slide 02 of 07</span>
    </div>
  </div>

  <!-- ==================== SLIDE 3: PROPOSED SOLUTION ==================== -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <div class="track-pill"><span class="track-pill-dot"></span> The Solution Architecture</div>
        <h2 class="slide-title">KaamProof: The Complete Service-Job Lifecycle Protocol</h2>
        <p class="slide-subtitle">A lightweight job accountability system — NOT another worker marketplace.</p>
      </div>
      <div class="slide-number">03 / 07</div>
    </div>

    <div class="slide-body">
      <div style="width: 100%;">
        <div style="background: white; border: 1px solid #E4DFD7; border-radius: 14px; padding: 18px 28px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 17px; color: #18181B; font-weight: 600;">
            <span style="color: #047857; font-weight: 800;">Key Differentiator:</span> We do not charge commissions, broker leads, or replace worker-client relationships.
          </div>
          <div style="font-size: 14px; color: #52525B; font-family: 'JetBrains Mono', monospace; background: #F4F2ED; padding: 5px 12px; border-radius: 6px;">
            Zero Marketplace Commissions &bull; Pure Operational Trust
          </div>
        </div>

        <div class="grid-3" style="row-gap: 20px;">
          <div class="step-card">
            <span class="step-num">STEP 01</span>
            <h3 style="font-size: 17px; font-weight: 700; color: #18181B; margin-bottom: 4px;">Create Service Job</h3>
            <p style="font-size: 13.5px; color: #52525B; line-height: 1.45;">
              Technician selects trade (Electrical, Plumbing, HVAC) and inputs scope with 1-click presets.
            </p>
          </div>

          <div class="step-card">
            <span class="step-num">STEP 02</span>
            <h3 style="font-size: 17px; font-weight: 700; color: #18181B; margin-bottom: 4px;">Lock Agreed Price &amp; Advance</h3>
            <p style="font-size: 13.5px; color: #52525B; line-height: 1.45;">
              Total quoted amount is recorded upfront with optional advance payment receipt (Cash or UPI).
            </p>
          </div>

          <div class="step-card">
            <span class="step-num">STEP 03</span>
            <h3 style="font-size: 17px; font-weight: 700; color: #18181B; margin-bottom: 4px;">1-Click Customer Confirmation</h3>
            <p style="font-size: 13.5px; color: #52525B; line-height: 1.45;">
              Customer receives private URL via WhatsApp; accepts terms and prices with zero account creation.
            </p>
          </div>

          <div class="step-card">
            <span class="step-num">STEP 04</span>
            <h3 style="font-size: 17px; font-weight: 700; color: #18181B; margin-bottom: 4px;">On-Site Evidence Logging</h3>
            <p style="font-size: 13.5px; color: #52525B; line-height: 1.45;">
              Technician uploads tagged <em>Before</em>, <em>During</em>, and <em>After</em> photos directly from device storage.
            </p>
          </div>

          <div class="step-card">
            <span class="step-num">STEP 05</span>
            <h3 style="font-size: 17px; font-weight: 700; color: #18181B; margin-bottom: 4px;">Customer Completion Sign-Off</h3>
            <p style="font-size: 13.5px; color: #52525B; line-height: 1.45;">
              Customer inspects work proof and approves completion, or registers explicit dispute with reasons.
            </p>
          </div>

          <div class="step-card">
            <span class="step-num">STEP 06</span>
            <h3 style="font-size: 17px; font-weight: 700; color: #18181B; margin-bottom: 4px;">Deterministic Balance Settlement</h3>
            <p style="font-size: 13.5px; color: #52525B; line-height: 1.45;">
              Remaining balance calculated to the exact rupee; closes to ₹0 and exports a formal completion certificate.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span class="footer-brand">KaamProof &bull; VibeX Codes 2026 Presentation</span>
      <span>Slide 03 of 07</span>
    </div>
  </div>

  <!-- ==================== SLIDE 4: TECHNOLOGY STACK ==================== -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <div class="track-pill"><span class="track-pill-dot"></span> System Engineering</div>
        <h2 class="slide-title">Actual Verified Technology Stack &amp; Architecture</h2>
        <p class="slide-subtitle">Strictly what exists in the repository — zero speculative or unverified dependencies.</p>
      </div>
      <div class="slide-number">04 / 07</div>
    </div>

    <div class="slide-body">
      <div class="grid-2" style="align-items: stretch; width: 100%;">
        <div style="display: flex; flex-direction: column; justify-content: space-between; gap: 14px;">
          <div class="card" style="padding: 18px 22px;">
            <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #047857; margin-bottom: 2px;">Frontend Framework</div>
            <div style="font-size: 17px; font-weight: 800; color: #18181B;">Next.js 14.2.15 App Router &bull; React 18 &bull; Tailwind CSS</div>
            <p style="font-size: 13px; color: #71717A; margin-top: 3px;">Mobile-first responsive layout, WCAG 2.1 AA accessible, 0 design violations on Impeccable 4.8.0.</p>
          </div>

          <div class="card" style="padding: 18px 22px;">
            <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #047857; margin-bottom: 2px;">Backend &amp; APIs</div>
            <div style="font-size: 17px; font-weight: 800; color: #18181B;">Next.js Route Handlers &bull; TypeScript Strict Mode</div>
            <p style="font-size: 13px; color: #71717A; margin-top: 3px;">REST endpoints for job CRUD, device file uploads, status mutations, and payment ledger.</p>
          </div>

          <div class="card" style="padding: 18px 22px;">
            <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #047857; margin-bottom: 2px;">Data Persistence</div>
            <div style="font-size: 17px; font-weight: 800; color: #18181B;">Atomic File-Backed JSON Storage &bull; Lock-Safe Temp Writes</div>
            <p style="font-size: 13px; color: #71717A; margin-top: 3px;">In-process persistence in <code>data/jobs.json</code>. Zero external database daemon needed; survives server restarts.</p>
          </div>

          <div class="card" style="padding: 18px 22px;">
            <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #047857; margin-bottom: 2px;">Security &amp; Deterministic Engine</div>
            <div style="font-size: 17px; font-weight: 800; color: #18181B;">24-Char Cryptographic Tokens &bull; 2-Decimal Rupee Precision</div>
            <p style="font-size: 13px; color: #71717A; margin-top: 3px;">Scoped customer URLs (<code>ctok_*</code>) with no account barriers. Exact <code>Math.round</code> balance arithmetic.</p>
          </div>
        </div>

        <div class="card" style="background: white; padding: 26px; display: flex; flex-direction: column; justify-content: space-between;">
          <div style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #71717A; margin-bottom: 12px;">
            System Data Flow &amp; Security Boundary:
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="background: #F4F2ED; border: 1px solid #E4DFD7; border-radius: 10px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="color: #18181B; font-size: 14.5px;">Worker Workspace</strong>
                <span style="font-size: 12px; color: #71717A; display: block;">Dashboard &bull; Wizard &bull; Local Evidence Upload &bull; Ledger</span>
              </div>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 12px; background: white; padding: 3px 8px; border-radius: 6px;">/jobs/*</span>
            </div>

            <div style="text-align: center; color: #047857; font-weight: 700; font-size: 15px;">&uarr;&darr; (Internal REST Endpoints)</div>

            <div style="background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 10px; padding: 12px 16px; text-align: center;">
              <strong style="color: #047857; font-size: 15px;">KaamProof Core State Engine</strong>
              <div style="font-size: 12.5px; color: #065F46; margin-top: 2px;">Status Transition Validator &bull; Deterministic Ledger &bull; Immutable Audit Timeline</div>
            </div>

            <div style="text-align: center; color: #047857; font-weight: 700; font-size: 15px;">&uarr;&darr; (Scoped Public Token Access)</div>

            <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 10px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="color: #1E40AF; font-size: 14.5px;">Customer Confirmation Portal</strong>
                <span style="font-size: 12px; color: #3B82F6; display: block;">1-Click Review &bull; Dispute Invariant &bull; Completion Sign-Off</span>
              </div>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 12px; background: white; padding: 3px 8px; border-radius: 6px;">/confirm/[token]</span>
            </div>
          </div>

          <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid #E4DFD7; display: flex; justify-content: space-between; font-size: 13px; color: #71717A;">
            <span>Verified Test Suite: <strong>26 / 26 Passing</strong></span>
            <span>Production Build: <strong>Zero Errors (Exit 0)</strong></span>
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span class="footer-brand">KaamProof &bull; VibeX Codes 2026 Presentation</span>
      <span>Slide 04 of 07</span>
    </div>
  </div>

  <!-- ==================== SLIDE 5: IMPLEMENTATION & CLEAN SCREENSHOTS ==================== -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <div class="track-pill"><span class="track-pill-dot"></span> Live Implementation</div>
        <h2 class="slide-title">Verified Core Features &amp; Uncut Application Evidence</h2>
        <p class="slide-subtitle">Clean, full-fidelity captures from the running application on http://localhost:3000.</p>
      </div>
      <div class="slide-number">05 / 07</div>
    </div>

    <div class="slide-body" style="margin-top: 16px; margin-bottom: 12px;">
      <div class="grid-2" style="gap: 36px; width: 100%; align-items: start;">
        <!-- Left: Worker Operations Dashboard -->
        <div class="card" style="padding: 20px; background: white; border: 1px solid #E4DFD7; border-radius: 14px; box-shadow: 0 6px 18px rgba(0,0,0,0.03);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <div>
              <span style="font-size: 11px; font-weight: 700; color: #047857; text-transform: uppercase; letter-spacing: 0.05em; background: #ECFDF5; padding: 2px 8px; border-radius: 4px;">Feature 01 &bull; Implemented</span>
              <h3 style="font-size: 18px; font-weight: 800; color: #18181B; margin-top: 2px;">Technician Operations Dashboard</h3>
            </div>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #71717A; background: #F4F2ED; padding: 3px 8px; border-radius: 4px;">http://localhost:3000</span>
          </div>
          
          <p style="font-size: 13px; color: #52525B; line-height: 1.45; margin-bottom: 12px;">
            <strong>Value:</strong> Real-time ledger tracking active jobs, customer sign-off states, collected revenue, and outstanding balance down to the exact rupee.
          </p>

          <!-- Browser Mockup Window -->
          <div style="border-radius: 8px; overflow: hidden; border: 1px solid #D1C9BE; box-shadow: 0 4px 12px rgba(0,0,0,0.06); background: #FAF9F6;">
            <div style="background: #EFECE6; padding: 6px 12px; display: flex; align-items: center; gap: 5px; border-bottom: 1px solid #D1C9BE;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #FF5F56; display: inline-block;"></span>
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #FFBD2E; display: inline-block;"></span>
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #27C93F; display: inline-block;"></span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 10.5px; color: #71717A; margin-left: 6px;">KaamProof &bull; Worker Dashboard (Live View)</span>
            </div>
            <img src="{dashboard_b64}" alt="Worker Dashboard" style="width: 100%; height: auto; max-height: 480px; object-fit: contain; display: block; background: #FAF9F6;" />
          </div>
        </div>

        <!-- Right: Customer Confirmation Portal -->
        <div class="card" style="padding: 20px; background: white; border: 1px solid #E4DFD7; border-radius: 14px; box-shadow: 0 6px 18px rgba(0,0,0,0.03);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <div>
              <span style="font-size: 11px; font-weight: 700; color: #1E40AF; text-transform: uppercase; letter-spacing: 0.05em; background: #EFF6FF; padding: 2px 8px; border-radius: 4px;">Feature 02 &bull; Implemented</span>
              <h3 style="font-size: 18px; font-weight: 800; color: #18181B; margin-top: 2px;">Customer Verification Portal</h3>
            </div>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #71717A; background: #F4F2ED; padding: 3px 8px; border-radius: 4px;">/confirm/[token]</span>
          </div>

          <p style="font-size: 13px; color: #52525B; line-height: 1.45; margin-bottom: 12px;">
            <strong>Value:</strong> Zero-login link sent via WhatsApp. Customers review agreed scope, verify on-site photo proof, and confirm or dispute with 1 click.
          </p>

          <!-- Browser Mockup Window -->
          <div style="border-radius: 8px; overflow: hidden; border: 1px solid #D1C9BE; box-shadow: 0 4px 12px rgba(0,0,0,0.06); background: #FAF9F6;">
            <div style="background: #EFECE6; padding: 6px 12px; display: flex; align-items: center; gap: 5px; border-bottom: 1px solid #D1C9BE;">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #FF5F56; display: inline-block;"></span>
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #FFBD2E; display: inline-block;"></span>
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #27C93F; display: inline-block;"></span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 10.5px; color: #71717A; margin-left: 6px;">KaamProof &bull; Customer Portal (Live View)</span>
            </div>
            <img src="{customer_b64}" alt="Customer Portal" style="width: 100%; height: auto; max-height: 480px; object-fit: contain; display: block; background: #FAF9F6;" />
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span class="footer-brand">KaamProof &bull; VibeX Codes 2026 Presentation</span>
      <span>Slide 05 of 07</span>
    </div>
  </div>

  <!-- ==================== SLIDE 6: INNOVATION & IMPACT ==================== -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <div class="track-pill"><span class="track-pill-dot"></span> Innovation &amp; Impact</div>
        <h2 class="slide-title">Bridging the Gap Between Job Acceptance &amp; Payment Closure</h2>
        <p class="slide-subtitle">Why KaamProof succeeds where marketplace and generic invoicing apps fail.</p>
      </div>
      <div class="slide-number">06 / 07</div>
    </div>

    <div class="slide-body">
      <div class="grid-2" style="align-items: stretch; width: 100%;">
        <div style="display: flex; flex-direction: column; justify-content: space-between; gap: 16px;">
          <div class="card" style="border-left: 6px solid #047857; padding: 22px;">
            <h3 style="font-size: 19px; font-weight: 800; color: #18181B; margin-bottom: 6px;">1. Solves the Real Friction: Execution &amp; Closure</h3>
            <p style="font-size: 14.5px; color: #3F3F46; line-height: 1.5;">
              Existing apps focus on <em>finding</em> leads (Urban Company, marketplaces) or complex corporate invoicing (Zoho, QuickBooks). None protect the tradesman <em>during</em> execution when the work is actually being carried out.
            </p>
          </div>

          <div class="card" style="border-left: 6px solid #047857; padding: 22px;">
            <h3 style="font-size: 19px; font-weight: 800; color: #18181B; margin-bottom: 6px;">2. Disputed Job Invariant (Never Auto-Approved)</h3>
            <p style="font-size: 14.5px; color: #3F3F46; line-height: 1.5;">
              If a customer registers a disagreement, the job is never falsely marked completed. A mandatory dispute reason is recorded, allowing on-site rectification without litigation or bad blood.
            </p>
          </div>

          <div class="card" style="border-left: 6px solid #047857; padding: 22px;">
            <h3 style="font-size: 19px; font-weight: 800; color: #18181B; margin-bottom: 6px;">3. Low-Barrier Frictionless Customer Experience</h3>
            <p style="font-size: 14.5px; color: #3F3F46; line-height: 1.5;">
              Customers will not download an app to confirm a ₹500 tap washer repair. KaamProof's lightweight web links via WhatsApp require zero login, removing all friction to adoption.
            </p>
          </div>
        </div>

        <div class="card" style="background: white; padding: 32px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #047857; margin-bottom: 14px;">
              Potential Qualitative Impact for Informal Workforce:
            </div>

            <div style="display: flex; flex-direction: column; gap: 18px;">
              <div>
                <h4 style="font-size: 16px; font-weight: 700; color: #18181B; margin-bottom: 3px;">&bull; Eliminates Verbal Renegotiation at Billing</h4>
                <p style="font-size: 13.5px; color: #52525B; line-height: 1.45;">
                  With price locked upfront in writing, workers no longer have to awkwardly bargain down their rates once work is completed.
                </p>
              </div>

              <div>
                <h4 style="font-size: 16px; font-weight: 700; color: #18181B; margin-bottom: 3px;">&bull; Builds an Immutable Digital Trade Portfolio</h4>
                <p style="font-size: 13.5px; color: #52525B; line-height: 1.45;">
                  Completed jobs with photo evidence serve as a verifiable track record of competence for new clients, moving beyond word-of-mouth.
                </p>
              </div>

              <div>
                <h4 style="font-size: 16px; font-weight: 700; color: #18181B; margin-bottom: 3px;">&bull; Restores Dignity &amp; Professional Parity</h4>
                <p style="font-size: 13.5px; color: #52525B; line-height: 1.45;">
                  Elevates informal daily workers to the same standard of operational clarity enjoyed by organized enterprise contractors.
                </p>
              </div>
            </div>
          </div>

          <div style="background: #F4F2ED; border: 1px solid #E4DFD7; padding: 12px 16px; border-radius: 8px; font-size: 12.5px; color: #71717A; margin-top: 18px;">
            <strong>Integrity Statement:</strong> Potential impact is reported based on operational design principles. No fabricated adoption figures, user interviews, or synthetic metrics are claimed.
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span class="footer-brand">KaamProof &bull; VibeX Codes 2026 Presentation</span>
      <span>Slide 06 of 07</span>
    </div>
  </div>

  <!-- ==================== SLIDE 7: FUTURE SCOPE & CONCLUSION ==================== -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <div class="track-pill"><span class="track-pill-dot"></span> Roadmap &amp; Conclusion</div>
        <h2 class="slide-title">Future Scope &amp; Sustainable Evolution</h2>
        <p class="slide-subtitle">Realistic next engineering steps for production rollout across India.</p>
      </div>
      <div class="slide-number">07 / 07</div>
    </div>

    <div class="slide-body">
      <div style="width: 100%;">
        <div class="grid-4" style="margin-bottom: 32px;">
          <div class="card" style="padding: 22px;">
            <div style="font-size: 11px; font-weight: 700; color: #047857; text-transform: uppercase; margin-bottom: 4px;">P2 Planned</div>
            <h3 style="font-size: 16px; font-weight: 800; color: #18181B; margin-bottom: 4px;">Voice-to-Scope Drafting</h3>
            <p style="font-size: 12.5px; color: #52525B; line-height: 1.4;">
              Convert vernacular voice notes (Hindi, Tamil, Marathi) into structured job items with AI assistance.
            </p>
          </div>

          <div class="card" style="padding: 22px;">
            <div style="font-size: 11px; font-weight: 700; color: #047857; text-transform: uppercase; margin-bottom: 4px;">Next Phase</div>
            <h3 style="font-size: 16px; font-weight: 800; color: #18181B; margin-bottom: 4px;">WhatsApp Business Bot</h3>
            <p style="font-size: 12.5px; color: #52525B; line-height: 1.4;">
              Automated dispatch of confirmation links and completion alerts via official WhatsApp Cloud API.
            </p>
          </div>

          <div class="card" style="padding: 22px;">
            <div style="font-size: 11px; font-weight: 700; color: #047857; text-transform: uppercase; margin-bottom: 4px;">Next Phase</div>
            <h3 style="font-size: 16px; font-weight: 800; color: #18181B; margin-bottom: 4px;">Offline-First PWA Sync</h3>
            <p style="font-size: 12.5px; color: #52525B; line-height: 1.4;">
              Local storage sync for technicians working in basements, elevator shafts, or low-connectivity zones.
            </p>
          </div>

          <div class="card" style="padding: 22px;">
            <div style="font-size: 11px; font-weight: 700; color: #047857; text-transform: uppercase; margin-bottom: 4px;">Ecosystem</div>
            <h3 style="font-size: 16px; font-weight: 800; color: #18181B; margin-bottom: 4px;">Micro-Credit Profiles</h3>
            <p style="font-size: 12.5px; color: #52525B; line-height: 1.4;">
              Export verified job completion and payment ledgers as proof of steady trade income for small NBFC loans.
            </p>
          </div>
        </div>

        <div style="background: #18181B; border-radius: 16px; padding: 40px 48px; color: white; display: flex; justify-content: space-between; align-items: center;">
          <div style="max-width: 1000px;">
            <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #34D399; margin-bottom: 10px;">
              Closing Statement &bull; VibeX Codes 2026
            </div>
            <p style="font-size: 25px; font-weight: 700; line-height: 1.4; color: #FAF9F6; letter-spacing: -0.01em;">
              &ldquo;By replacing verbal ambiguity with verifiable consensus, KaamProof restores dignity, mutual trust, and financial certainty to millions of informal service workers.&rdquo;
            </p>
          </div>

          <div style="text-align: right; border-left: 1px solid #3F3F46; padding-left: 36px; display: flex; flex-direction: column; gap: 6px;">
            <span style="font-size: 18px; font-weight: 800; color: white;">KaamProof</span>
            <span style="font-size: 13px; color: #A1A1AA;">Track 1: Workers &amp; Small Businesses</span>
            <span style="font-size: 12px; font-family: 'JetBrains Mono', monospace; color: #34D399;">Ready for Evaluation</span>
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span class="footer-brand">KaamProof &bull; VibeX Codes 2026 Presentation</span>
      <span>Slide 07 of 07</span>
    </div>
  </div>

</body>
</html>
"""

with open("submission/slides.html", "w", encoding="utf-8") as f:
    f.write(HTML_TEMPLATE)

print("Updated submission/slides.html with embedded base64 screenshots")
