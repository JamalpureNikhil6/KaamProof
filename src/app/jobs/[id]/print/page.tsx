'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Job, JobSummaryFinancials } from '@/lib/types';
import { StatusBadge } from '@/components/StatusBadge';
import {
  ShieldCheck,
  Printer,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

interface EnrichedJob extends Job {
  financials: JobSummaryFinancials;
}

export default function PrintJobReceiptPage() {
  const params = useParams();
  const jobId = params?.id as string;
  const [job, setJob] = useState<EnrichedJob | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!jobId) return;
    fetch(`/api/jobs/${jobId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setJob(data.job);
        }
      })
      .finally(() => setLoading(false));
  }, [jobId]);

  if (loading) {
    return <div className="text-center py-20 text-xs">Generating printable certificate...</div>;
  }

  if (!job) {
    return <div className="text-center py-20 text-xs text-rose-600">Job record not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-4">
      {/* Action Header (Hidden in print) */}
      <div className="flex items-center justify-between no-print border-b border-[#E4DFD7] pb-4">
        <Link
          href={`/jobs/${job.id}`}
          className="inline-flex items-center gap-1.5 text-xs text-[#52525B] hover:text-[#18181B]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Job Management</span>
        </Link>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#047857] text-white text-xs font-semibold rounded-lg hover:bg-[#065F46] shadow-sm"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export PDF</span>
        </button>
      </div>

      {/* Official Certificate Card */}
      <div className="bg-white border border-[#E4DFD7] p-8 rounded-xl print-card space-y-6">
        {/* Certificate Header */}
        <div className="flex items-start justify-between border-b-2 border-[#18181B] pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#047857] text-white flex items-center justify-center">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#18181B]">
                KaamProof
              </h1>
              <p className="text-xs text-[#52525B]">
                Service Work Agreement &amp; Completion Record
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono font-bold text-[#18181B] block">
              JOB REF: {job.id.toUpperCase()}
            </span>
            <span className="text-[11px] text-[#71717A] block font-mono">
              Issued: {new Date(job.createdAt).toLocaleDateString('en-IN')}
            </span>
            <div className="mt-1">
              <StatusBadge status={job.status} size="sm" />
            </div>
          </div>
        </div>

        {/* Stakeholders Info */}
        <div className="grid grid-cols-2 gap-6 text-xs bg-[#FAF9F6] p-4 rounded-lg border border-[#E4DFD7]">
          <div>
            <h3 className="font-bold text-[#18181B] uppercase tracking-wider text-[11px] mb-1">
              Customer Details
            </h3>
            <p className="font-semibold text-sm text-[#18181B]">{job.customerName}</p>
            {job.customerPhone && <p className="text-[#52525B]">{job.customerPhone}</p>}
            <p className="text-[#71717A] mt-1">{job.serviceAddress}</p>
          </div>

          <div>
            <h3 className="font-bold text-[#18181B] uppercase tracking-wider text-[11px] mb-1">
              Service Technician
            </h3>
            <p className="font-semibold text-sm text-[#18181B]">{job.workerName}</p>
            {job.workerPhone && <p className="text-[#52525B]">{job.workerPhone}</p>}
            <p className="text-[#71717A] mt-1">Trade: {job.category.replace(/_/g, ' ').toUpperCase()}</p>
          </div>
        </div>

        {/* Work Description */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#52525B]">
            Agreed Work Scope &amp; Specifications
          </h3>
          <div className="p-4 bg-white border border-[#E4DFD7] rounded-lg text-xs leading-relaxed">
            <h4 className="font-bold text-[#18181B] text-sm mb-1">{job.title}</h4>
            <p className="text-[#3F3F46] whitespace-pre-wrap">{job.description}</p>
          </div>
        </div>

        {/* Photographic Evidence Summary */}
        {job.evidence.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#52525B]">
              On-Site Photographic Evidence ({job.evidence.length} Logged)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {job.evidence.map((ev) => (
                <div key={ev.id} className="border border-[#E4DFD7] rounded-lg p-2.5 bg-[#FAF9F6] flex gap-3 items-center">
                  <div className="w-16 h-16 bg-zinc-200 rounded overflow-hidden flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ev.imageUrl} alt={ev.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-xs overflow-hidden">
                    <span className="text-[10px] uppercase font-bold text-[#047857] block">{ev.type} Work</span>
                    <p className="font-semibold text-[#18181B] truncate">{ev.title}</p>
                    <time className="text-[10px] text-[#71717A] font-mono block mt-0.5">
                      {new Date(ev.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short' })}
                    </time>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Financial Settlement Ledger */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#52525B]">
            Financial Settlement Statement
          </h3>
          <table className="w-full text-left text-xs border border-[#E4DFD7] rounded-lg overflow-hidden">
            <thead className="bg-[#FAF9F6] border-b border-[#E4DFD7] text-[#71717A] uppercase text-[10px]">
              <tr>
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Payment Stage</th>
                <th className="py-2 px-3">Method</th>
                <th className="py-2 px-3">Reference / Note</th>
                <th className="py-2 px-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4DFD7]">
              {job.payments.map((p) => (
                <tr key={p.id}>
                  <td className="py-2 px-3 font-mono text-[11px] text-[#71717A]">
                    {new Date(p.date).toLocaleDateString('en-IN')}
                  </td>
                  <td className="py-2 px-3 uppercase text-[10px] font-semibold">{p.type}</td>
                  <td className="py-2 px-3 uppercase font-mono text-[#52525B]">{p.method}</td>
                  <td className="py-2 px-3 text-[#52525B]">{p.note || '—'}</td>
                  <td className="py-2 px-3 text-right font-bold">₹{p.amount.toLocaleString('en-IN')}</td>
                </tr>
              ))}
              <tr className="bg-[#FAF9F6] font-bold text-xs">
                <td colSpan={4} className="py-2 px-3 text-right">Total Agreed Price:</td>
                <td className="py-2 px-3 text-right">₹{job.financials.agreedPrice.toLocaleString('en-IN')}</td>
              </tr>
              <tr className="bg-[#FAF9F6] font-bold text-xs text-emerald-700">
                <td colSpan={4} className="py-2 px-3 text-right">Total Paid to Date:</td>
                <td className="py-2 px-3 text-right">₹{job.financials.totalPaid.toLocaleString('en-IN')}</td>
              </tr>
              <tr className="bg-zinc-100 font-bold text-sm">
                <td colSpan={4} className="py-2 px-3 text-right">Outstanding Balance Due:</td>
                <td className="py-2 px-3 text-right">₹{job.financials.balanceDue.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Verification Acknowledgement Signatures */}
        <div className="border-t border-[#E4DFD7] pt-6 grid grid-cols-2 gap-8 text-xs">
          <div className="border-t border-dashed border-[#A1A1AA] pt-3">
            <span className="block text-[11px] text-[#71717A] uppercase font-semibold">Customer Digital Confirmation</span>
            <p className="font-bold text-[#18181B] mt-1">{job.customerConfirmation?.customerName || job.customerName}</p>
            <p className="text-[10px] text-emerald-700 font-mono mt-0.5">
              {job.customerConfirmation?.confirmedAt
                ? `Confirmed: ${new Date(job.customerConfirmation.confirmedAt).toLocaleString('en-IN')}`
                : 'Pending initial confirmation'}
            </p>
          </div>

          <div className="border-t border-dashed border-[#A1A1AA] pt-3 text-right">
            <span className="block text-[11px] text-[#71717A] uppercase font-semibold">Technician Execution Sign-off</span>
            <p className="font-bold text-[#18181B] mt-1">{job.workerName}</p>
            <p className="text-[10px] text-emerald-700 font-mono mt-0.5">
              Protocol Hash: {job.customerToken.slice(0, 16)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
