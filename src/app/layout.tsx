import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ShieldCheck, FileText, CheckCircle2, IndianRupee } from "lucide-react";

export const metadata: Metadata = {
  title: "KaamProof — Lightweight Service Job Accountability Protocol",
  description: "Every job agreed. Every payment tracked. Every task documented. Built for informal technicians, service workers, and small shopkeepers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#18181B]">
        {/* Top Announcement Bar */}
        <div className="bg-[#18181B] text-[#FAF9F6] text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 no-print">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>VibeX Codes 2026 Official Submission &bull; Track 1: Daily Workers &amp; Informal Service Trades</span>
        </div>

        {/* Global Navigation Header */}
        <header className="sticky top-0 z-40 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E4DFD7] no-print">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-lg bg-[#047857] flex items-center justify-center text-white shadow-sm group-hover:bg-[#065F46] transition-colors">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-[#18181B]">KaamProof</span>
                  <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-[#047857] tracking-wider">
                    v1.0
                  </span>
                </div>
                <p className="text-[11px] text-[#52525B] hidden sm:block">
                  Every job agreed &bull; Every payment tracked
                </p>
              </div>
            </Link>

            <nav className="flex items-center gap-3">
              <Link
                href="/"
                className="text-xs sm:text-sm font-medium px-3 py-2 rounded-md text-[#52525B] hover:text-[#18181B] hover:bg-[#F4F2ED] transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/jobs/new"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-lg bg-[#047857] text-white hover:bg-[#065F46] shadow-sm transition-all"
              >
                <span>+</span> New Agreement
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-[#E4DFD7] bg-[#FFFFFF] py-6 px-4 no-print text-center text-xs text-[#71717A]">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#047857]" />
              <span className="font-semibold text-[#18181B]">KaamProof Protocol</span> &mdash; Real-world accountability for electricians, plumbers &amp; technicians.
            </p>
            <p>
              Built for <strong className="text-[#18181B]">VibeX Codes 2026</strong>. Zero artificial testimonials &bull; Deterministic verification.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
