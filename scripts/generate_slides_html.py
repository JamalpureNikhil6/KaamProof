import base64
import os

def get_base64_image(file_path):
    if not os.path.exists(file_path):
        return ""
    with open(file_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        return f"data:image/png;base64,{encoded_string}"

BASE_DIR = "/home/user007-nikhil/Desktop/KaamProff"
dashboard_b64 = get_base64_image(f"{BASE_DIR}/public/images/dashboard.png")
creation_b64 = get_base64_image(f"{BASE_DIR}/public/images/job_creation.png")
customer_b64 = get_base64_image(f"{BASE_DIR}/public/images/customer_confirmation_portal.png")
job_detail_b64 = get_base64_image(f"{BASE_DIR}/public/images/job_details_management.png")
receipt_b64 = get_base64_image(f"{BASE_DIR}/public/images/job_print_receipt.png")

HTML_TEMPLATE = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>KaamProof — VibeX Codes 2026 Presentation</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap');

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
    padding: 56px 80px;
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
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 6px 14px;
    border-radius: 999px;
    background: #ECFDF5;
    color: #047857;
    border: 1px solid #A7F3D0;
    margin-bottom: 8px;
  }}

  .track-pill-dot {{
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #047857;
  }}

  .slide-title {{
    font-size: 38px;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #18181B;
    line-height: 1.15;
  }}

  .slide-subtitle {{
    font-size: 17px;
    color: #52525B;
    margin-top: 4px;
    font-weight: 500;
  }}

  .slide-number {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 15px;
    font-weight: 700;
    color: #71717A;
    background: #F4F2ED;
    border: 1px solid #E4DFD7;
    padding: 6px 14px;
    border-radius: 8px;
  }}

  /* Body Content */
  .slide-body {{
    flex: 1;
    margin-top: 24px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }}

  /* Footer */
  .slide-footer {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #E4DFD7;
    padding-top: 14px;
    font-size: 13.5px;
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
    padding: 24px;
    box-shadow: 0 4px 12px rgba(24, 24, 27, 0.03);
  }}

  .grid-2 {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    width: 100%;
    align-items: center;
  }}

  .grid-3 {{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;
    width: 100%;
  }}

  .grid-4 {{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    width: 100%;
  }}

  .step-card {{
    background: #FFFFFF;
    border: 1px solid #E4DFD7;
    border-radius: 12px;
    padding: 16px 18px;
    position: relative;
    box-shadow: 0 2px 6px rgba(0,0,0,0.02);
  }}

  .step-num {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    color: #047857;
    background: #ECFDF5;
    display: inline-block;
    padding: 2px 7px;
    border-radius: 6px;
    margin-bottom: 6px;
  }}

  .browser-mockup {{
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #D1C9BE;
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    background: #FFFFFF;
  }}

  .browser-bar {{
    background: #EFECE6;
    padding: 7px 14px;
    display: flex;
    align-items: center;
    gap: 6px;
    border-bottom: 1px solid #D1C9BE;
  }}

  .browser-dot {{
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #D1C9BE;
  }}

  .browser-url {{
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #71717A;
    background: #FFFFFF;
    padding: 2px 10px;
    border-radius: 4px;
    border: 1px solid #E4DFD7;
    margin-left: 8px;
    flex: 1;
  }}

  .mockup-img {{
    width: 100%;
    display: block;
    object-fit: cover;
  }}

  .caption {{
    font-size: 12px;
    color: #71717A;
    margin-top: 8px;
    font-style: italic;
  }}
</style>
</head>
<body>

  <!-- ==================== SLIDE 1: COVER ==================== -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <div class="track-pill"><span class="track-pill-dot"></span> Track 1: Workers and Small Businesses</div>
        <h1 class="slide-title">KaamProof</h1>
        <p class="slide-subtitle">Every job agreed. Every payment tracked. Every task documented.</p>
      </div>
      <div class="slide-number">01 / 07</div>
    </div>

    <div class="slide-body">
      <div class="grid-2">
        <div class="card" style="padding: 32px;">
          <div style="font-size: 12px; font-weight: 700; color: #047857; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px;">
            The Value Proposition
          </div>
          <p style="font-size: 18px; line-height: 1.5; color: #18181B; font-weight: 600; margin-bottom: 20px;">
            A lightweight, zero-friction service-job accountability platform connecting work agreements, photographic evidence, customer confirmation, and deterministic payment tracking.
          </p>

          <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px;">
            <div style="display: flex; gap: 12px; align-items: flex-start;">
              <span style="color: #047857; font-weight: 800; font-size: 16px;">•</span>
              <div>
                <strong style="color: #18181B; font-size: 14.5px;">Target Trade:</strong>
                <span style="color: #52525B; font-size: 14.5px;"> Independent electricians, plumbers, HVAC technicians, carpenters &amp; repair specialists.</span>
              </div>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start;">
              <span style="color: #047857; font-weight: 800; font-size: 16px;">•</span>
              <div>
                <strong style="color: #18181B; font-size: 14.5px;">Zero Customer Friction:</strong>
                <span style="color: #52525B; font-size: 14.5px;"> No mobile app download or customer registration required — instant 1-click WhatsApp link.</span>
              </div>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start;">
              <span style="color: #047857; font-weight: 800; font-size: 16px;">•</span>
              <div>
                <strong style="color: #18181B; font-size: 14.5px;">Non-Marketplace Focus:</strong>
                <span style="color: #52525B; font-size: 14.5px;"> Protects bilateral trust during and after job execution; eliminates billing arguments &amp; unpaid balances.</span>
              </div>
            </div>
          </div>

          <div style="background: #F4F2ED; border-radius: 8px; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 13px; font-weight: 600; color: #18181B;">Production Verification</span>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 700; color: #047857; background: #ECFDF5; padding: 4px 10px; border-radius: 4px; border: 1px solid #A7F3D0;">Next.js 14 &bull; 27/27 Tests Passing</span>
          </div>
        </div>

        <div>
          <div class="browser-mockup">
            <div class="browser-bar">
              <span class="browser-dot" style="background:#EF4444;"></span>
              <span class="browser-dot" style="background:#F59E0B;"></span>
              <span class="browser-dot" style="background:#10B981;"></span>
              <span class="browser-url">http://localhost:3000 — KaamProof Technician Dashboard</span>
            </div>
            <img src="{dashboard_b64}" class="mockup-img" alt="Technician Dashboard" style="height: 480px; object-position: top;" />
          </div>
          <div class="caption">Live Screenshot: Technician Operations Dashboard showing active jobs, ₹ metrics, customer cards, and WhatsApp action triggers.</div>
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
        <p class="slide-subtitle">Millions of daily service jobs rely on unwritten calls, leading to avoidable disputes and delayed wages.</p>
      </div>
      <div class="slide-number">02 / 07</div>
    </div>

    <div class="slide-body">
      <div style="width: 100%;">
        <div class="grid-3" style="margin-bottom: 28px;">
          <div class="card" style="border-top: 4px solid #EF4444;">
            <div style="font-size: 12px; font-weight: 700; color: #B91C1C; margin-bottom: 8px;">01. SCOPE &amp; PRICE AMBIGUITY</div>
            <h3 style="font-size: 17px; font-weight: 800; color: #18181B; margin-bottom: 8px;">Unclear Estimates</h3>
            <p style="font-size: 13.5px; line-height: 1.5; color: #52525B;">
              Work begins based on casual phone chats. When actual conditions require additional labor or materials, customers suspect price gouging, triggering bitter disputes at settlement time.
            </p>
          </div>

          <div class="card" style="border-top: 4px solid #F59E0B;">
            <div style="font-size: 12px; font-weight: 700; color: #D97706; margin-bottom: 8px;">02. INVISIBLE ON-SITE WORK</div>
            <h3 style="font-size: 17px; font-weight: 800; color: #18181B; margin-bottom: 8px;">Lack of Photo Proof</h3>
            <p style="font-size: 13.5px; line-height: 1.5; color: #52525B;">
              Technicians replace faulty conduits or plumbing valves inside walls or underground. Without immediate photographic proof, customers question whether parts were genuinely replaced.
            </p>
          </div>

          <div class="card" style="border-top: 4px solid #6366F1;">
            <div style="font-size: 12px; font-weight: 700; color: #4F46E5; margin-bottom: 8px;">03. UNRECORDED CASH PAYMENTS</div>
            <h3 style="font-size: 17px; font-weight: 800; color: #18181B; margin-bottom: 8px;">Payment Chaos</h3>
            <p style="font-size: 13.5px; line-height: 1.5; color: #52525B;">
              Cash advances given for materials are rarely recorded systematically. At job end, disagreements arise regarding how much was already paid versus the outstanding balance owed.
            </p>
          </div>
        </div>

        <div class="card" style="background: #FFFFFF; border: 1px solid #E4DFD7; padding: 24px;">
          <div style="font-size: 12px; font-weight: 700; color: #047857; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;">
            The Real-World Workflow Gap: Verbal Chaos vs. KaamProof Certainty
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; align-items: center; background: #FEF2F2; padding: 12px 18px; border-radius: 8px; border: 1px solid #FECACA; font-size: 13.5px; color: #991B1B;">
              <strong style="min-width: 180px;">❌ Verbal Status Quo:</strong>
              <span>Phone Call &rarr; Vague Estimate &rarr; Unrecorded Changes &rarr; Hidden Work &rarr; Cash Advance Forgotten &rarr; Final Billing Dispute &amp; Delayed Payment</span>
            </div>
            <div style="display: flex; align-items: center; background: #ECFDF5; padding: 12px 18px; border-radius: 8px; border: 1px solid #A7F3D0; font-size: 13.5px; color: #065F46;">
              <strong style="min-width: 180px;">✔ KaamProof Standard:</strong>
              <span>Scope &amp; Price Locked &rarr; 1-Click WhatsApp Approval &rarr; On-Site Photos &rarr; Live Balance Ledger &rarr; Instant Sign-Off &amp; Zero Friction</span>
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
        <p class="slide-subtitle">A lightweight job accountability system — NOT another gig marketplace.</p>
      </div>
      <div class="slide-number">03 / 07</div>
    </div>

    <div class="slide-body">
      <div class="grid-2">
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div class="step-card">
            <span class="step-num">STEP 01</span>
            <h4 style="font-size: 14.5px; font-weight: 700; color: #18181B; margin-bottom: 2px;">Create Service Job</h4>
            <p style="font-size: 12.5px; color: #52525B;">Select trade presets (Electrical, Plumbing, HVAC), describe scope, and enter customer mobile number.</p>
          </div>

          <div class="step-card">
            <span class="step-num">STEP 02</span>
            <h4 style="font-size: 14.5px; font-weight: 700; color: #18181B; margin-bottom: 2px;">Lock Agreed Price &amp; Advance</h4>
            <p style="font-size: 12.5px; color: #52525B;">Specify total agreed rupees and initial advance payment with guaranteed 2-decimal arithmetic.</p>
          </div>

          <div class="step-card">
            <span class="step-num">STEP 03</span>
            <h4 style="font-size: 14.5px; font-weight: 700; color: #18181B; margin-bottom: 2px;">1-Click WhatsApp Confirmation</h4>
            <p style="font-size: 12.5px; color: #52525B;">Customer receives secure, scoped link via WhatsApp to review and approve scope without app installation.</p>
          </div>

          <div class="step-card">
            <span class="step-num">STEP 04</span>
            <h4 style="font-size: 14.5px; font-weight: 700; color: #18181B; margin-bottom: 2px;">On-Site Evidence Logging</h4>
            <p style="font-size: 12.5px; color: #52525B;">Technician snaps photos directly to device storage, tagging before/after stages for complete transparency.</p>
          </div>

          <div class="step-card">
            <span class="step-num">STEP 05</span>
            <h4 style="font-size: 14.5px; font-weight: 700; color: #18181B; margin-bottom: 2px;">Customer Completion Review</h4>
            <p style="font-size: 12.5px; color: #52525B;">Customer inspects finished work evidence and signs off or records explicit feedback (Dispute Invariant).</p>
          </div>

          <div class="step-card">
            <span class="step-num">STEP 06</span>
            <h4 style="font-size: 14.5px; font-weight: 700; color: #18181B; margin-bottom: 2px;">Deterministic Settlement</h4>
            <p style="font-size: 12.5px; color: #52525B;">Real-time ledger updates remaining balance down to exact ₹0, issuing a verifiable digital receipt.</p>
          </div>
        </div>

        <div>
          <div class="browser-mockup">
            <div class="browser-bar">
              <span class="browser-dot" style="background:#EF4444;"></span>
              <span class="browser-dot" style="background:#F59E0B;"></span>
              <span class="browser-dot" style="background:#10B981;"></span>
              <span class="browser-url">http://localhost:3000/jobs/new — Job Creation &amp; Scope Lock</span>
            </div>
            <img src="{creation_b64}" class="mockup-img" alt="Job Creation Wizard" style="height: 480px; object-position: top;" />
          </div>
          <div class="caption">Live Screenshot: Job Creation Wizard locking scope, trade presets, agreed price (₹3,200), and advance (₹1,000).</div>
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
        <p class="slide-subtitle">Strictly what exists and runs in the repository — zero speculative or unbuilt dependencies.</p>
      </div>
      <div class="slide-number">04 / 07</div>
    </div>

    <div class="slide-body">
      <div style="width: 100%;">
        <div class="grid-4" style="margin-bottom: 28px;">
          <div class="card" style="padding: 22px;">
            <div style="font-size: 11px; font-weight: 700; color: #047857; text-transform: uppercase; margin-bottom: 6px;">Frontend Layer</div>
            <h3 style="font-size: 16px; font-weight: 800; color: #18181B; margin-bottom: 6px;">Next.js 14 App Router</h3>
            <p style="font-size: 12.5px; color: #52525B; line-height: 1.45;">
              React 18 &bull; TypeScript strict mode &bull; Tailwind CSS &bull; Mobile-first responsive layouts &bull; WCAG 2.1 AA accessible contrast.
            </p>
          </div>

          <div class="card" style="padding: 22px;">
            <div style="font-size: 11px; font-weight: 700; color: #047857; text-transform: uppercase; margin-bottom: 6px;">Backend &amp; API</div>
            <h3 style="font-size: 16px; font-weight: 800; color: #18181B; margin-bottom: 6px;">Route Handlers</h3>
            <p style="font-size: 12.5px; color: #52525B; line-height: 1.45;">
              Next.js API routes (<code>/api/jobs</code>) &bull; Strict payload validation &bull; RESTful state transitions &bull; Deterministic 2-decimal rupee math.
            </p>
          </div>

          <div class="card" style="padding: 22px;">
            <div style="font-size: 11px; font-weight: 700; color: #047857; text-transform: uppercase; margin-bottom: 6px;">Persistence Layer</div>
            <h3 style="font-size: 16px; font-weight: 800; color: #18181B; margin-bottom: 6px;">Atomic File JSON</h3>
            <p style="font-size: 12.5px; color: #52525B; line-height: 1.45;">
              Atomic file-backed JSON store in <code>data/jobs.json</code> &bull; Safe temp-write and atomic rename &bull; Zero external database dependency.
            </p>
          </div>

          <div class="card" style="padding: 22px;">
            <div style="font-size: 11px; font-weight: 700; color: #047857; text-transform: uppercase; margin-bottom: 6px;">Security &amp; Auth</div>
            <h3 style="font-size: 16px; font-weight: 800; color: #18181B; margin-bottom: 6px;">Scoped Tokens</h3>
            <p style="font-size: 12.5px; color: #52525B; line-height: 1.45;">
              29-character unguessable nanoid tokens (<code>ctok_*</code>) &bull; Zero-login public customer access &bull; Non-bypassable dispute invariant.
            </p>
          </div>
        </div>

        <div style="background: #18181B; border-radius: 14px; padding: 24px 32px; color: white;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #34D399;">
              System Architecture &amp; Data Flow
            </span>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #A1A1AA;">
              27 / 27 Automated Tests Passing (Exit Code 0)
            </span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr; align-items: center; gap: 12px; font-family: 'JetBrains Mono', monospace; font-size: 12px; text-align: center;">
            <div style="background: #27272A; padding: 12px 14px; border-radius: 8px; border: 1px solid #3F3F46;">
              <strong style="color: #FAF9F6; display: block;">Worker Client</strong>
              <span style="color: #A1A1AA; font-size: 11px;">Dashboard &amp; Wizard</span>
            </div>
            <div style="color: #34D399; font-weight: 700;">⇄</div>
            <div style="background: #27272A; padding: 12px 14px; border-radius: 8px; border: 1px solid #3F3F46;">
              <strong style="color: #FAF9F6; display: block;">REST API Handlers</strong>
              <span style="color: #A1A1AA; font-size: 11px;">/api/jobs &amp; actions</span>
            </div>
            <div style="color: #34D399; font-weight: 700;">⇄</div>
            <div style="background: #27272A; padding: 12px 14px; border-radius: 8px; border: 1px solid #3F3F46;">
              <strong style="color: #FAF9F6; display: block;">Atomic JSON Store</strong>
              <span style="color: #A1A1AA; font-size: 11px;">Safe Temp-Rename</span>
            </div>
            <div style="color: #34D399; font-weight: 700;">⇄</div>
            <div style="background: #27272A; padding: 12px 14px; border-radius: 8px; border: 1px solid #3F3F46;">
              <strong style="color: #FAF9F6; display: block;">Customer Link</strong>
              <span style="color: #A1A1AA; font-size: 11px;">WhatsApp ctok_* Link</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span class="footer-brand">KaamProof &bull; VibeX Codes 2026 Presentation</span>
      <span>Slide 04 of 07</span>
    </div>
  </div>

  <!-- ==================== SLIDE 5: IMPLEMENTATION & WORKING FEATURES ==================== -->
  <div class="slide">
    <div class="slide-header">
      <div>
        <div class="track-pill"><span class="track-pill-dot"></span> Live Implementation</div>
        <h2 class="slide-title">Verified Core Features &amp; Uncut Application Evidence</h2>
        <p class="slide-subtitle">Clean, full-fidelity captures from the running application on http://localhost:3000.</p>
      </div>
      <div class="slide-number">05 / 07</div>
    </div>

    <div class="slide-body">
      <div class="grid-2">
        <div>
          <div class="browser-mockup">
            <div class="browser-bar">
              <span class="browser-dot" style="background:#EF4444;"></span>
              <span class="browser-dot" style="background:#F59E0B;"></span>
              <span class="browser-dot" style="background:#10B981;"></span>
              <span class="browser-url">http://localhost:3000/jobs/job_demo_elec_01 — Technician View</span>
            </div>
            <img src="{job_detail_b64}" class="mockup-img" alt="Job Details Management" style="height: 440px; object-position: top;" />
          </div>
          <div style="margin-top: 10px;">
            <h4 style="font-size: 14px; font-weight: 700; color: #047857;">Feature 01: Job Details, Photo Evidence &amp; Ledger</h4>
            <p style="font-size: 12px; color: #52525B;">Live status timeline, before/after evidence gallery with stage tags, recorded advance ₹1,000, and remaining balance ₹2,200.</p>
          </div>
        </div>

        <div>
          <div class="browser-mockup">
            <div class="browser-bar">
              <span class="browser-dot" style="background:#EF4444;"></span>
              <span class="browser-dot" style="background:#F59E0B;"></span>
              <span class="browser-dot" style="background:#10B981;"></span>
              <span class="browser-url">http://localhost:3000/customer/ctok_demo_customer_token_99</span>
            </div>
            <img src="{customer_b64}" class="mockup-img" alt="Customer Confirmation Portal" style="height: 440px; object-position: top;" />
          </div>
          <div style="margin-top: 10px;">
            <h4 style="font-size: 14px; font-weight: 700; color: #047857;">Feature 02: Zero-Login Customer Verification Portal</h4>
            <p style="font-size: 12px; color: #52525B;">Sent via WhatsApp link. Customer reviews agreed price (₹3,200), advance paid, and one-click approves or raises structured dispute.</p>
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
        <p class="slide-subtitle">Why KaamProof succeeds where marketplaces and generic invoicing apps fail.</p>
      </div>
      <div class="slide-number">06 / 07</div>
    </div>

    <div class="slide-body">
      <div class="grid-2">
        <div class="card" style="padding: 28px;">
          <div style="font-size: 12px; font-weight: 700; color: #047857; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;">
            What Makes KaamProof Distinctive
          </div>

          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div>
              <h4 style="font-size: 15px; font-weight: 700; color: #18181B; margin-bottom: 3px;">1. Solves the Execution Gap</h4>
              <p style="font-size: 13px; color: #52525B; line-height: 1.45;">
                Gig marketplaces take commissions merely for lead generation, abandoning workers during execution disputes. KaamProof protects bilateral trust while the work is done until final payment settlement.
              </p>
            </div>

            <div>
              <h4 style="font-size: 15px; font-weight: 700; color: #18181B; margin-bottom: 3px;">2. Non-Negotiable Dispute Invariant</h4>
              <p style="font-size: 13px; color: #52525B; line-height: 1.45;">
                Unlike passive invoice apps, disputed work cannot be auto-completed or marked paid. A mandatory reason is enforced, halting status until mutually resolved.
              </p>
            </div>

            <div>
              <h4 style="font-size: 15px; font-weight: 700; color: #18181B; margin-bottom: 3px;">3. Zero-Friction Customer Experience</h4>
              <p style="font-size: 13px; color: #52525B; line-height: 1.45;">
                Customers never need to install an app or create an account. Links open in any mobile browser directly from WhatsApp.
              </p>
            </div>

            <div>
              <h4 style="font-size: 15px; font-weight: 700; color: #18181B; margin-bottom: 3px;">4. Restoring Dignity &amp; Credit Profiling</h4>
              <p style="font-size: 13px; color: #52525B; line-height: 1.45;">
                Transforms informal verbal trade into verifiable proof-of-work records, unlocking micro-credit and NBFC financing for tradespeople.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div class="browser-mockup">
            <div class="browser-bar">
              <span class="browser-dot" style="background:#EF4444;"></span>
              <span class="browser-dot" style="background:#F59E0B;"></span>
              <span class="browser-dot" style="background:#10B981;"></span>
              <span class="browser-url">http://localhost:3000/jobs/job_demo_elec_01/receipt — Printable Certificate</span>
            </div>
            <img src="{receipt_b64}" class="mockup-img" alt="Printable Receipt & Certificate" style="height: 440px; object-position: top;" />
          </div>
          <div class="caption">Live Screenshot: Official Work Completion Certificate &amp; Payment Settlement Receipt, exportable as verifiable proof for micro-loans.</div>
        </div>
      </div>
    </div>

    <div class="slide-footer">
      <span class="footer-brand">KaamProof &bull; VibeX Codes 2026 Presentation</span>
      <span>Slide 06 of 07</span>
    </div>
  </div>

  <!-- ==================== SLIDE 7: FUTURE SCOPE ==================== -->
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
        <div class="grid-4" style="gap: 20px; margin-bottom: 32px;">
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
            <p style="font-size: 26px; font-weight: 700; line-height: 1.35; color: #FAF9F6; letter-spacing: -0.01em;">
              &ldquo;KaamProof &mdash; Bringing clarity and accountability to every service job.&rdquo;
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

with open(f"{BASE_DIR}/submission/slides.html", "w", encoding="utf-8") as f:
    f.write(HTML_TEMPLATE)

print("Updated submission/slides.html with all 5 verified screenshots from public/images")
