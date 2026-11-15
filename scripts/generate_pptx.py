import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

blank_layout = prs.slide_layouts[6]

# Color Palette
BG_COLOR = RGBColor(250, 249, 246)       # #FAF9F6 Warm Canvas
CARD_BG = RGBColor(255, 255, 255)        # Pure White
CARD_BORDER = RGBColor(228, 223, 215)    # #E4DFD7
TEXT_PRIMARY = RGBColor(24, 24, 27)      # #18181B Charcoal
TEXT_SECONDARY = RGBColor(82, 82, 91)    # #52525B Slate
TEXT_MUTED = RGBColor(113, 113, 122)     # #71717A Gray
EMERALD_BRAND = RGBColor(4, 120, 87)     # #047857 Dark Emerald
EMERALD_PILL_BG = RGBColor(236, 253, 245)# #ECFDF5 Light Mint
DARK_PANEL_BG = RGBColor(24, 24, 27)     # #18181B Dark Footer/Hero
WHITE = RGBColor(255, 255, 255)

BASE_DIR = "/home/user007-nikhil/Desktop/KaamProff"
IMG_DASHBOARD = os.path.join(BASE_DIR, "public/images/dashboard.png")
IMG_CREATION = os.path.join(BASE_DIR, "public/images/job_creation.png")
IMG_DETAILS = os.path.join(BASE_DIR, "public/images/job_details_management.png")
IMG_CUSTOMER = os.path.join(BASE_DIR, "public/images/customer_confirmation_portal.png")
IMG_RECEIPT = os.path.join(BASE_DIR, "public/images/job_print_receipt.png")

def set_slide_background(slide):
    background = slide.background
    fill = background.fill
    fill.solid()
    fill.fore_color.rgb = BG_COLOR

def add_header(slide, badge, title, subtitle, slide_num):
    # Badge Pill
    pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.45), Inches(3.8), Inches(0.32))
    pill.fill.solid()
    pill.fill.fore_color.rgb = EMERALD_PILL_BG
    pill.line.color.rgb = RGBColor(167, 243, 208)
    pill.line.width = Pt(1)
    tf_p = pill.text_frame
    tf_p.word_wrap = False
    p_p = tf_p.paragraphs[0]
    p_p.text = "● " + badge.upper()
    p_p.font.size = Pt(10)
    p_p.font.bold = True
    p_p.font.color.rgb = EMERALD_BRAND

    # Slide Number Badge (Top Right)
    num_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(11.4), Inches(0.45), Inches(1.1), Inches(0.32))
    num_box.fill.solid()
    num_box.fill.fore_color.rgb = RGBColor(244, 242, 237)
    num_box.line.color.rgb = CARD_BORDER
    num_box.line.width = Pt(1)
    tf_n = num_box.text_frame
    p_n = tf_n.paragraphs[0]
    p_n.text = f"0{slide_num} / 07"
    p_n.font.size = Pt(11)
    p_n.font.bold = True
    p_n.font.color.rgb = TEXT_MUTED
    p_n.alignment = PP_ALIGN.CENTER

    # Title
    t_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.82), Inches(11.7), Inches(0.55))
    tf_t = t_box.text_frame
    tf_t.word_wrap = True
    p_t = tf_t.paragraphs[0]
    p_t.text = title
    p_t.font.size = Pt(24)
    p_t.font.bold = True
    p_t.font.color.rgb = TEXT_PRIMARY

    # Subtitle
    s_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.36), Inches(11.7), Inches(0.4))
    tf_s = s_box.text_frame
    tf_s.word_wrap = True
    p_s = tf_s.paragraphs[0]
    p_s.text = subtitle
    p_s.font.size = Pt(12)
    p_s.font.color.rgb = TEXT_SECONDARY

def add_footer(slide, slide_num):
    line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(6.95), Inches(11.733), Inches(0.01))
    line.fill.solid()
    line.fill.fore_color.rgb = CARD_BORDER
    line.line.fill.background()

    f_box = slide.shapes.add_textbox(Inches(0.8), Inches(7.0), Inches(11.733), Inches(0.35))
    tf_f = f_box.text_frame
    p_f = tf_f.paragraphs[0]
    p_f.text = f"KaamProof • VibeX Codes 2026 Presentation • Slide 0{slide_num} of 07"
    p_f.font.size = Pt(10)
    p_f.font.color.rgb = TEXT_MUTED

# ==================== SLIDE 1: INTRODUCTION ====================
s1 = prs.slides.add_slide(blank_layout)
set_slide_background(s1)
add_header(s1, "Track 1: Workers and Small Businesses", "KaamProof", 
           "Every job agreed. Every payment tracked. Every task documented.", 1)

# Left Column: Overview Card
c1_left = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.85), Inches(5.8), Inches(4.85))
c1_left.fill.solid()
c1_left.fill.fore_color.rgb = CARD_BG
c1_left.line.color.rgb = CARD_BORDER
c1_left.line.width = Pt(1)

tf1 = c1_left.text_frame
tf1.word_wrap = True

p = tf1.paragraphs[0]
p.text = "THE PROBLEM & VALUE PROPOSITION"
p.font.size = Pt(11)
p.font.bold = True
p.font.color.rgb = EMERALD_BRAND
p.space_after = Pt(10)

p2 = tf1.add_paragraph()
p2.text = "A lightweight, zero-friction service-job accountability platform connecting work agreements, photographic evidence, customer confirmation, and deterministic payment tracking."
p2.font.size = Pt(13)
p2.font.color.rgb = TEXT_PRIMARY
p2.space_after = Pt(14)

points1 = [
    ("Target Trade", "Independent electricians, plumbers, HVAC technicians, carpenters & repair specialists."),
    ("Zero Customer Friction", "No mobile app download or customer registration required — instant 1-click WhatsApp link."),
    ("Non-Marketplace Focus", "Protects bilateral trust after a job is booked; eliminates billing arguments & unpaid balances."),
    ("Production Verification", "Next.js 14 App Router, TypeScript strict mode, 27/27 automated tests passing.")
]
for title, desc in points1:
    pt = tf1.add_paragraph()
    pt.text = f"• {title}: {desc}"
    pt.font.size = Pt(11.5)
    pt.font.color.rgb = TEXT_SECONDARY
    pt.space_after = Pt(10)

# Right Column: Hero Dashboard Mockup
if os.path.exists(IMG_DASHBOARD):
    s1.shapes.add_picture(IMG_DASHBOARD, Inches(6.8), Inches(1.85), width=Inches(5.733))
    cap_box = s1.shapes.add_textbox(Inches(6.8), Inches(5.95), Inches(5.733), Inches(0.6))
    tf_c = cap_box.text_frame
    tf_c.word_wrap = True
    pc = tf_c.paragraphs[0]
    pc.text = "Live Screenshot: Technician Operations Dashboard showing active jobs, ₹ metrics, customer cards, and WhatsApp action triggers."
    pc.font.size = Pt(9.5)
    pc.font.italic = True
    pc.font.color.rgb = TEXT_MUTED

add_footer(s1, 1)

# ==================== SLIDE 2: PROBLEM STATEMENT ====================
s2 = prs.slides.add_slide(blank_layout)
set_slide_background(s2)
add_header(s2, "The Problem Grounding", "The Cost of Verbal Agreements in Informal Trade", 
           "Millions of daily service jobs rely on unwritten calls, leading to avoidable disputes and delayed wages.", 2)

problems = [
    ("01. Unclear Initial Scope & Verbal Estimates", 
     "Work begins based on loose telephone calls or brief verbal chats. When actual conditions require additional labor or materials, customers suspect price gouging, causing bitter disputes at settlement time."),
    ("02. Lack of Documented On-Site Work & Parts", 
     "Technicians replace faulty conduits or plumbing valves inside walls or under sinks. Without immediate photographic proof, customers question whether parts were genuinely replaced or tasks actually done."),
    ("03. Unrecorded Advances & Payment Chaos", 
     "Cash advances given for materials are rarely recorded systematically. At job end, disagreements arise regarding how much was already paid versus the outstanding balance owed.")
]

for idx, (p_title, p_desc) in enumerate(problems):
    card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8 + idx * 3.98), Inches(1.85), Inches(3.78), Inches(3.0))
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_BG
    card.line.color.rgb = CARD_BORDER
    card.line.width = Pt(1)
    tf = card.text_frame
    tf.word_wrap = True
    
    p = tf.paragraphs[0]
    p.text = p_title
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = RGBColor(185, 28, 28) # Red accent for problem
    p.space_after = Pt(10)
    
    p2 = tf.add_paragraph()
    p2.text = p_desc
    p2.font.size = Pt(11)
    p2.font.color.rgb = TEXT_SECONDARY
    p2.space_after = Pt(6)

# Bottom Visual: Contrast Banner
banner = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.05), Inches(11.733), Inches(1.65))
banner.fill.solid()
banner.fill.fore_color.rgb = CARD_BG
banner.line.color.rgb = CARD_BORDER
banner.line.width = Pt(1)
tf_b = banner.text_frame
tf_b.word_wrap = True

pb0 = tf_b.paragraphs[0]
pb0.text = "THE REAL-WORLD WORKFLOW GAP: VERBAL CHAOS VS. KAAMPROOF CERTAINTY"
pb0.font.size = Pt(10.5)
pb0.font.bold = True
pb0.font.color.rgb = EMERALD_BRAND
pb0.space_after = Pt(6)

pb1 = tf_b.add_paragraph()
pb1.text = "❌ Verbal Status Quo: Phone Estimate ➔ Unrecorded Changes ➔ Hidden Work ➔ Ambiguous Cash Advances ➔ Final Dispute & Lost Wages"
pb1.font.size = Pt(11)
pb1.font.color.rgb = RGBColor(185, 28, 28)
pb1.space_after = Pt(6)

pb2 = tf_b.add_paragraph()
pb2.text = "✔ KaamProof Standard: Locked Scope & Advance ➔ 1-Click WhatsApp Approval ➔ On-Site Photos ➔ Transparent Balance ➔ Instant Sign-off"
pb2.font.size = Pt(11)
pb2.font.bold = True
pb2.font.color.rgb = EMERALD_BRAND

add_footer(s2, 2)

# ==================== SLIDE 3: PROPOSED SOLUTION ====================
s3 = prs.slides.add_slide(blank_layout)
set_slide_background(s3)
add_header(s3, "The Solution Architecture", "KaamProof: The Complete Service-Job Lifecycle Protocol", 
           "A lightweight job accountability system — NOT another gig marketplace.", 3)

# Left Column: The 6-Step Protocol
c3_left = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.85), Inches(5.8), Inches(4.85))
c3_left.fill.solid()
c3_left.fill.fore_color.rgb = CARD_BG
c3_left.line.color.rgb = CARD_BORDER
c3_left.line.width = Pt(1)

tf3 = c3_left.text_frame
tf3.word_wrap = True

p = tf3.paragraphs[0]
p.text = "THE 6-STEP SERVICE-JOB PROTOCOL"
p.font.size = Pt(11)
p.font.bold = True
p.font.color.rgb = EMERALD_BRAND
p.space_after = Pt(8)

steps = [
    ("Step 01: Create Job", "Select trade preset, title, scope notes & customer mobile."),
    ("Step 02: Lock Agreed Price", "Define agreed total and initial advance payment with rupee precision."),
    ("Step 03: 1-Click WhatsApp Link", "Customer receives secure link; reviews and confirms without app install."),
    ("Step 04: On-Site Photo Evidence", "Upload timestamped photos before and after work directly from phone camera."),
    ("Step 05: Customer Completion Review", "Customer inspects proof and signs off or raises structured dispute."),
    ("Step 06: Deterministic Settlement", "Real-time balance tracking down to ₹0 with verifiable digital receipt.")
]
for st, desc in steps:
    pt = tf3.add_paragraph()
    pt.text = f"{st}: {desc}"
    pt.font.size = Pt(11)
    pt.font.color.rgb = TEXT_PRIMARY
    pt.space_after = Pt(6)

# Right Column: Screenshot of Job Creation Wizard
if os.path.exists(IMG_CREATION):
    s3.shapes.add_picture(IMG_CREATION, Inches(6.8), Inches(1.85), width=Inches(5.733))
    cap_box = s3.shapes.add_textbox(Inches(6.8), Inches(6.1), Inches(5.733), Inches(0.55))
    tf_c = cap_box.text_frame
    tf_c.word_wrap = True
    pc = tf_c.paragraphs[0]
    pc.text = "Live Screenshot: Job Creation Wizard locking scope, trade presets (Electrician, Plumber), agreed price (₹3,200), and advance (₹1,000)."
    pc.font.size = Pt(9.5)
    pc.font.italic = True
    pc.font.color.rgb = TEXT_MUTED

add_footer(s3, 3)

# ==================== SLIDE 4: TECHNOLOGY STACK ====================
s4 = prs.slides.add_slide(blank_layout)
set_slide_background(s4)
add_header(s4, "System Engineering", "Actual Verified Technology Stack & Architecture", 
           "Strictly what exists and runs in the repository — zero speculative or unbuilt dependencies.", 4)

tech_cards = [
    ("Frontend Layer", "Next.js 14.2 App Router\nReact 18 & TypeScript Strict\nTailwind CSS with responsive design\nLucide React for clear iconography\nWCAG 2.1 AA accessible contrast"),
    ("Backend API Layer", "Next.js Route Handlers (app/api/jobs)\nStrict request validation & typing\nRESTful lifecycle state management\nError handling with structured HTTP codes\nDeterministic 2-decimal rupee math"),
    ("Storage & Persistence", "Atomic File-Backed JSON Store\nLocated at data/jobs.json\nSafe write-to-temp and atomic rename\nPrevents race conditions & corruption\nZero external database dependency"),
    ("Security & Access Control", "Cryptographic nanoid tokens (ctok_*)\n29-character unguessable public URLs\nScoped customer view (no internal leaks)\nStrict Dispute Invariant (no auto-signoff)\nZero credentials committed to git")
]

for idx, (t_title, t_desc) in enumerate(tech_cards):
    row = idx // 2
    col = idx % 2
    card = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8 + col * 5.98), Inches(1.85 + row * 1.8), Inches(5.75), Inches(1.65))
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_BG
    card.line.color.rgb = CARD_BORDER
    card.line.width = Pt(1)
    tf = card.text_frame
    tf.word_wrap = True
    
    p = tf.paragraphs[0]
    p.text = t_title
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = EMERALD_BRAND
    p.space_after = Pt(6)
    
    p2 = tf.add_paragraph()
    p2.text = t_desc
    p2.font.size = Pt(10.5)
    p2.font.color.rgb = TEXT_SECONDARY

# Architecture Bar at Bottom
arch_bar = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.6), Inches(11.733), Inches(1.15))
arch_bar.fill.solid()
arch_bar.fill.fore_color.rgb = DARK_PANEL_BG
arch_bar.line.fill.background()
tf_a = arch_bar.text_frame
tf_a.word_wrap = True

pa0 = tf_a.paragraphs[0]
pa0.text = "VERIFIED ARCHITECTURE & TESTING RIGOR"
pa0.font.size = Pt(10)
pa0.font.bold = True
pa0.font.color.rgb = RGBColor(52, 211, 153)
pa0.space_after = Pt(4)

pa1 = tf_a.add_paragraph()
pa1.text = "Technician Client  ⇄  REST API Handlers  ⇄  Atomic JSON Storage  ⇄  Customer WhatsApp Link (/customer/[token])\n✔ 27/27 Automated Tests Passing (Lifecycle, Math, Security)  •  next build exit code 0  •  Zero synthetic data claims"
pa1.font.size = Pt(10)
pa1.font.color.rgb = WHITE

add_footer(s4, 4)

# ==================== SLIDE 5: IMPLEMENTATION & WORKING FEATURES ====================
s5 = prs.slides.add_slide(blank_layout)
set_slide_background(s5)
add_header(s5, "Live Implementation", "Verified Core Features & Working Product Screenshots", 
           "Clean, full-fidelity captures from the running application on http://localhost:3000.", 5)

# Left Image: Job Details & Management
if os.path.exists(IMG_DETAILS):
    s5.shapes.add_picture(IMG_DETAILS, Inches(0.8), Inches(1.85), width=Inches(5.733))
    cap_box_l = s5.shapes.add_textbox(Inches(0.8), Inches(6.05), Inches(5.733), Inches(0.75))
    tf_cl = cap_box_l.text_frame
    tf_cl.word_wrap = True
    pcl0 = tf_cl.paragraphs[0]
    pcl0.text = "Feature 01: Job Detail & Progress Ledger"
    pcl0.font.size = Pt(11)
    pcl0.font.bold = True
    pcl0.font.color.rgb = EMERALD_BRAND
    pcl1 = tf_cl.add_paragraph()
    pcl1.text = "Live timeline, photo evidence gallery with before/after stage tags, recorded advance ₹1,000, and outstanding balance ₹2,200."
    pcl1.font.size = Pt(9.5)
    pcl1.font.color.rgb = TEXT_SECONDARY

# Right Image: Customer Verification Portal
if os.path.exists(IMG_CUSTOMER):
    s5.shapes.add_picture(IMG_CUSTOMER, Inches(6.8), Inches(1.85), width=Inches(5.733))
    cap_box_r = s5.shapes.add_textbox(Inches(6.8), Inches(6.05), Inches(5.733), Inches(0.75))
    tf_cr = cap_box_r.text_frame
    tf_cr.word_wrap = True
    pcr0 = tf_cr.paragraphs[0]
    pcr0.text = "Feature 02: Zero-Login Customer Portal"
    pcr0.font.size = Pt(11)
    pcr0.font.bold = True
    pcr0.font.color.rgb = EMERALD_BRAND
    pcr1 = tf_cr.add_paragraph()
    pcr1.text = "Accessible via WhatsApp link. Customer reviews locked price (₹3,200), advance paid, and one-click approves or raises dispute."
    pcr1.font.size = Pt(9.5)
    pcr1.font.color.rgb = TEXT_SECONDARY

add_footer(s5, 5)

# ==================== SLIDE 6: INNOVATION & IMPACT ====================
s6 = prs.slides.add_slide(blank_layout)
set_slide_background(s6)
add_header(s6, "Innovation & Impact", "Bridging the Gap Between Job Acceptance & Payment Closure", 
           "Why KaamProof succeeds where marketplaces and generic invoicing apps fail.", 6)

# Left Column: Key Differentiators
c6_left = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.85), Inches(5.8), Inches(4.85))
c6_left.fill.solid()
c6_left.fill.fore_color.rgb = CARD_BG
c6_left.line.color.rgb = CARD_BORDER
c6_left.line.width = Pt(1)

tf6 = c6_left.text_frame
tf6.word_wrap = True

p = tf6.paragraphs[0]
p.text = "WHAT MAKES KAAMPROOF DISTINCTIVE"
p.font.size = Pt(11)
p.font.bold = True
p.font.color.rgb = EMERALD_BRAND
p.space_after = Pt(8)

diffs = [
    ("Solves the Execution Gap", "Gig marketplaces take commission just for lead matching, leaving workers alone during disputes. KaamProof protects bilateral trust during execution."),
    ("Non-Negotiable Dispute Invariant", "Disputed jobs are never silently auto-completed. A mandatory reason is enforced, halting status until mutually resolved."),
    ("Zero Customer Friction", "Customers never need to install an app or create an account. Links open in any mobile browser directly from WhatsApp."),
    ("Dignity & Formal Credit History", "Transforms informal verbal trade into verifiable proof-of-work records, unlocking micro-credit and NBFC financing for tradespeople.")
]

for dt, dd in diffs:
    pt = tf6.add_paragraph()
    pt.text = f"• {dt}: {dd}"
    pt.font.size = Pt(11)
    pt.font.color.rgb = TEXT_PRIMARY
    pt.space_after = Pt(8)

# Right Column: Screenshot of Job Print Receipt / Work Certificate
if os.path.exists(IMG_RECEIPT):
    s6.shapes.add_picture(IMG_RECEIPT, Inches(6.8), Inches(1.85), width=Inches(5.733))
    cap_box_r = s6.shapes.add_textbox(Inches(6.8), Inches(6.05), Inches(5.733), Inches(0.75))
    tf_cr = cap_box_r.text_frame
    tf_cr.word_wrap = True
    pcr0 = tf_cr.paragraphs[0]
    pcr0.text = "Feature 03: Printable Work Certificate & Settlement Receipt"
    pcr0.font.size = Pt(11)
    pcr0.font.bold = True
    pcr0.font.color.rgb = EMERALD_BRAND
    pcr1 = tf_cr.add_paragraph()
    pcr1.text = "Official completion certificate showing job scope, photo verification, customer sign-off timestamp, and settled payment ledger."
    pcr1.font.size = Pt(9.5)
    pcr1.font.color.rgb = TEXT_SECONDARY

add_footer(s6, 6)

# ==================== SLIDE 7: FUTURE SCOPE ====================
s7 = prs.slides.add_slide(blank_layout)
set_slide_background(s7)
add_header(s7, "Roadmap & Conclusion", "Future Scope & Sustainable Evolution", 
           "Realistic next engineering steps for production rollout across India.", 7)

# 4 Roadmap Cards
roadmaps = [
    ("P2 Planned", "Voice-to-Scope AI Drafting", "Convert vernacular audio notes (Hindi, Tamil, Marathi) into structured job scopes with trade price suggestions using on-device models."),
    ("Next Phase", "WhatsApp Business Bot", "Automated dispatch of confirmation links, progress alerts, and completion receipts via official Meta WhatsApp Cloud API."),
    ("Next Phase", "Offline-First PWA Sync", "Background IndexedDB sync for technicians working in basements, elevator shafts, or low-connectivity service locations."),
    ("Ecosystem", "Micro-Credit Ledgers", "Export verified job completion and payment ledgers as proof of steady trade income for small NBFC / Mudra loans.")
]

for idx, (badge, r_title, r_desc) in enumerate(roadmaps):
    card = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8 + idx * 2.98), Inches(1.85), Inches(2.78), Inches(2.6))
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_BG
    card.line.color.rgb = CARD_BORDER
    card.line.width = Pt(1)
    tf = card.text_frame
    tf.word_wrap = True
    
    p = tf.paragraphs[0]
    p.text = badge.upper()
    p.font.size = Pt(9.5)
    p.font.bold = True
    p.font.color.rgb = EMERALD_BRAND
    p.space_after = Pt(4)
    
    p2 = tf.add_paragraph()
    p2.text = r_title
    p2.font.size = Pt(12)
    p2.font.bold = True
    p2.font.color.rgb = TEXT_PRIMARY
    p2.space_after = Pt(6)

    p3 = tf.add_paragraph()
    p3.text = r_desc
    p3.font.size = Pt(10.5)
    p3.font.color.rgb = TEXT_SECONDARY

# Closing Banner
closing = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(4.75), Inches(11.733), Inches(2.0))
closing.fill.solid()
closing.fill.fore_color.rgb = DARK_PANEL_BG
closing.line.fill.background()
tf_cl = closing.text_frame
tf_cl.word_wrap = True

pc0 = tf_cl.paragraphs[0]
pc0.text = "CLOSING STATEMENT • VIBEX CODES 2026"
pc0.font.size = Pt(11)
pc0.font.bold = True
pc0.font.color.rgb = RGBColor(52, 211, 153)
pc0.space_after = Pt(8)

pc1 = tf_cl.add_paragraph()
pc1.text = "“KaamProof — Bringing clarity and accountability to every service job.”"
pc1.font.size = Pt(20)
pc1.font.bold = True
pc1.font.color.rgb = WHITE
pc1.space_after = Pt(10)

pc2 = tf_cl.add_paragraph()
pc2.text = "Track 1: Workers and Small Businesses  •  Production Next.js 14 Build Verified  •  Ready for Final Evaluation"
pc2.font.size = Pt(11.5)
pc2.font.color.rgb = RGBColor(209, 213, 219)

add_footer(s7, 7)

# Save
os.makedirs("submission", exist_ok=True)
pptx_out = "submission/KaamProof_VibeX_Codes_2026.pptx"
prs.save(pptx_out)
print(f"Successfully generated competition-ready PPTX at {pptx_out}")
