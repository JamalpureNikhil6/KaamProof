from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
import os

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

blank_slide_layout = prs.slide_layouts[6]

slides_data = [
    {
        "title": "KaamProof",
        "subtitle": "Every job agreed. Every payment tracked. Every task documented.",
        "badge": "VibeX Codes 2026 • Track 1: Workers and Small Businesses",
        "content": [
            "A lightweight, zero-friction service-job accountability system connecting work agreements, photographic evidence, customer confirmation, and deterministic payment tracking.",
            "Target Trade: Electricians, Plumbers, HVAC & Repair Technicians",
            "Zero Customer Friction: Instant 1-Click WhatsApp Link without app download",
            "Implementation: Production Next.js 14 Build Verified (27/27 Tests Passing)"
        ],
        "image_right": "/home/user007-nikhil/Desktop/KaamProff/public/images/dashboard.png"
    },
    {
        "title": "The Cost of Verbal Agreements in Informal Trade",
        "subtitle": "Millions of daily service jobs rely on unwritten calls, leading to avoidable disputes.",
        "badge": "The Problem Grounding",
        "content": [
            "1. Unclear Initial Scope & Quoted Price: Verbal estimates lead to disputes over what was included.",
            "2. Lack of Documented On-Site Work & Parts: Without photos, customers suspect unnecessary parts.",
            "3. Unrecorded Advances & Partial Payment Chaos: Advances for materials are forgotten or disputed.",
            "Traditional Breakdown: Verbal Quote -> No Photo Proof -> Payment Disputes & Delayed Settlement."
        ]
    },
    {
        "title": "KaamProof: The Complete Service-Job Lifecycle Protocol",
        "subtitle": "A lightweight job accountability system — NOT another worker marketplace.",
        "badge": "The Solution Architecture",
        "content": [
            "Step 01: Create Service Job with trade presets",
            "Step 02: Lock Agreed Price & Advance upfront",
            "Step 03: 1-Click Customer Confirmation via WhatsApp link",
            "Step 04: On-Site Evidence Logging from device storage",
            "Step 05: Customer Completion Sign-Off or explicit dispute",
            "Step 06: Deterministic Balance Settlement down to exact ₹0"
        ]
    },
    {
        "title": "Actual Verified Technology Stack & Architecture",
        "subtitle": "Strictly what exists in the repository — zero speculative dependencies.",
        "badge": "System Engineering",
        "content": [
            "Frontend: Next.js 14.2.15 App Router, React 18, Tailwind CSS (WCAG 2.1 AA compliant)",
            "Backend: Next.js Route Handlers in TypeScript Strict Mode",
            "Storage: Atomic File-Backed JSON in data/jobs.json with temp-write locking",
            "Security: Scoped 29-char cryptographic tokens (ctok_*) for public customer access",
            "Ledger: Deterministic 2-decimal rupee precision math (Math.round)",
            "Quality: 27 automated unit & integration tests passing with exit code 0"
        ]
    },
    {
        "title": "Verified Core Features & Uncut Application Evidence",
        "subtitle": "Clean, full-fidelity captures from the running application on http://localhost:3000.",
        "badge": "Live Implementation",
        "content": [
            "Feature 01: Technician Operations Dashboard — Real-time ledger with active job counters & balances",
            "Feature 02: Customer Verification Portal — Zero-login link sent via WhatsApp for 1-click confirmation",
            "Feature 03: On-Site Evidence Gallery — Device storage camera upload with before/after stage tags",
            "Feature 04: Formal Printable Receipt — Official completion certificate and payment settlement"
        ],
        "image_left": "/home/user007-nikhil/Desktop/KaamProff/public/images/dashboard.png",
        "image_right": "/home/user007-nikhil/Desktop/KaamProff/public/images/customer_confirmation_portal.png"
    },
    {
        "title": "Bridging the Gap Between Job Acceptance & Payment Closure",
        "subtitle": "Why KaamProof succeeds where marketplace and generic invoicing apps fail.",
        "badge": "Innovation & Impact",
        "content": [
            "1. Solves the Execution Gap: Protects tradesmen during the actual job, not just finding leads",
            "2. Disputed Job Invariant: Disputed work is NEVER auto-approved; mandatory reason recorded",
            "3. Low-Barrier Adoption: No customer app install required; frictionless WhatsApp integration",
            "Qualitative Impact: Eliminates verbal bargaining at billing, builds immutable digital trade portfolio, and restores professional dignity to informal workers."
        ]
    },
    {
        "title": "Future Scope & Sustainable Evolution",
        "subtitle": "Realistic next engineering steps for production rollout across India.",
        "badge": "Roadmap & Conclusion",
        "content": [
            "P2 Planned: Vernacular Voice-to-Scope AI drafting (Hindi, Tamil, Marathi)",
            "Next Phase: Automated WhatsApp Business Cloud API notification bot",
            "Next Phase: Offline-First Service Worker PWA for basement/underground service sites",
            "Ecosystem: Exportable verified payment ledgers for micro-credit profiling & NBFC loans",
            "Closing Statement: 'KaamProof — Bringing clarity and accountability to every service job.'"
        ]
    }
]

for idx, slide_info in enumerate(slides_data):
    slide = prs.slides.add_slide(blank_slide_layout)
    
    # Header Badge
    badge_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.5), Inches(8), Inches(0.4))
    tf_b = badge_box.text_frame
    p_b = tf_b.paragraphs[0]
    p_b.text = slide_info["badge"].upper()
    p_b.font.size = Pt(11)
    p_b.font.bold = True
    p_b.font.color.rgb = RGBColor(4, 120, 87)
    
    # Title
    title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.9), Inches(11.5), Inches(0.8))
    tf_t = title_box.text_frame
    p_t = tf_t.paragraphs[0]
    p_t.text = slide_info["title"]
    p_t.font.size = Pt(28)
    p_t.font.bold = True
    p_t.font.color.rgb = RGBColor(24, 24, 27)

    # Subtitle
    sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.6), Inches(11.5), Inches(0.5))
    tf_s = sub_box.text_frame
    p_s = tf_s.paragraphs[0]
    p_s.text = slide_info["subtitle"]
    p_s.font.size = Pt(14)
    p_s.font.color.rgb = RGBColor(82, 82, 91)
    
    # Body Layout
    has_left = "image_left" in slide_info and os.path.exists(slide_info["image_left"])
    has_right = "image_right" in slide_info and os.path.exists(slide_info["image_right"])

    if has_left and has_right:
        slide.shapes.add_picture(slide_info["image_left"], Inches(0.8), Inches(2.3), width=Inches(5.7))
        slide.shapes.add_picture(slide_info["image_right"], Inches(6.8), Inches(2.3), width=Inches(5.7))
    elif has_right and not has_left:
        # Split: Text on left, image on right
        body_box = slide.shapes.add_textbox(Inches(0.8), Inches(2.3), Inches(6.2), Inches(4.2))
        tf_body = body_box.text_frame
        tf_body.word_wrap = True
        for point in slide_info["content"]:
            p = tf_body.add_paragraph()
            p.text = "• " + point
            p.font.size = Pt(15)
            p.font.color.rgb = RGBColor(39, 39, 42)
            p.space_after = Pt(14)
        slide.shapes.add_picture(slide_info["image_right"], Inches(7.3), Inches(2.3), width=Inches(5.2))
    else:
        body_box = slide.shapes.add_textbox(Inches(0.8), Inches(2.3), Inches(11.5), Inches(4.2))
        tf_body = body_box.text_frame
        tf_body.word_wrap = True
        for point in slide_info["content"]:
            p = tf_body.add_paragraph()
            p.text = "• " + point
            p.font.size = Pt(15)
            p.font.color.rgb = RGBColor(39, 39, 42)
            p.space_after = Pt(12)

    # Footer
    footer_box = slide.shapes.add_textbox(Inches(0.8), Inches(6.9), Inches(11.5), Inches(0.4))
    tf_f = footer_box.text_frame
    p_f = tf_f.paragraphs[0]
    p_f.text = f"KaamProof • VibeX Codes 2026 Presentation • Slide 0{idx+1} of 07"
    p_f.font.size = Pt(10)
    p_f.font.color.rgb = RGBColor(113, 113, 122)

os.makedirs("submission", exist_ok=True)
pptx_path = "submission/KaamProof_VibeX_Codes_2026.pptx"
prs.save(pptx_path)
print(f"Generated editable PPTX at {pptx_path}")
