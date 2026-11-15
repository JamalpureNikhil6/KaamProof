'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Job, JobSummaryFinancials, PaymentMethod } from '@/lib/types';
import { StatusBadge } from '@/components/StatusBadge';
import { FinancialSummaryCard } from '@/components/FinancialSummaryCard';
import { CopyLinkButton } from '@/components/CopyLinkButton';
import { Timeline } from '@/components/Timeline';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Phone,
  Camera,
  IndianRupee,
  CheckCircle2,
  AlertTriangle,
  Printer,
  Plus,
  Play,
  Check,
  Send,
  Eye,
  FileText,
} from 'lucide-react';

interface EnrichedJob extends Job {
  financials: JobSummaryFinancials;
}

const SAMPLE_EVIDENCE_PRESETS = [
  {
    type: 'before' as const,
    title: 'Burnt neutral bar & melted PVC wiring',
    description: 'Blackened terminal block and melted insulation found inside switchboard.',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
  },
  {
    type: 'after' as const,
    title: 'New 40A DP Isolator & clean neutral busbar installed',
    description: 'Replaced burnt neutral bar, torqued all terminals, tested insulation resistance.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
  },
  {
    type: 'during' as const,
    title: 'Havells genuine parts verification and wiring route',
    description: 'Genuine copper wire with heat-resistant lugs crimped.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  },
];

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.id as string;

  const [job, setJob] = useState<EnrichedJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modals
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Evidence Form
  const [evType, setEvType] = useState<'before' | 'after' | 'during'>('after');
  const [evTitle, setEvTitle] = useState('');
  const [evDesc, setEvDesc] = useState('');
  const [evImageUrl, setEvImageUrl] = useState('');

  // Payment Form
  const [payAmount, setPayAmount] = useState('');
  const [payType, setPayType] = useState<'advance' | 'partial' | 'final'>('final');
  const [payMethod, setPayMethod] = useState<PaymentMethod>('upi');
  const [payNote, setPayNote] = useState('');

  const fetchJob = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/jobs/${jobId}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Job not found');
      }
      setJob(data.job);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error fetching job';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    if (jobId) {
      fetchJob();
    }
  }, [jobId, fetchJob]);

  // Status transitions
  const handleTransition = async (targetStatus: string, note?: string) => {
    try {
      setActionLoading(true);
      const res = await fetch(`/api/jobs/${jobId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: targetStatus, note }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Status update failed');
      }
      setJob(data.job);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setActionLoading(false);
    }
  };

  // Submit Evidence
  const handleAddEvidence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evTitle.trim() || !evImageUrl.trim()) {
      alert('Title and Image URL are required');
      return;
    }
    try {
      setActionLoading(true);
      const res = await fetch(`/api/jobs/${jobId}/evidence`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: evType,
          title: evTitle.trim(),
          description: evDesc.trim(),
          imageUrl: evImageUrl.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to add evidence');
      }
      setJob(data.job);
      setShowEvidenceModal(false);
      setEvTitle('');
      setEvDesc('');
      setEvImageUrl('');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to add evidence');
    } finally {
      setActionLoading(false);
    }
  };

  // Submit Payment
  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = Number(payAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid positive payment amount');
      return;
    }
    try {
      setActionLoading(true);
      const res = await fetch(`/api/jobs/${jobId}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountNum,
          type: payType,
          method: payMethod,
          note: payNote.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to record payment');
      }
      setJob(data.job);
      setShowPaymentModal(false);
      setPayAmount('');
      setPayNote('');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to record payment');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-[#E4DFD7]">
        <div className="w-8 h-8 border-2 border-[#047857] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-[#52525B]">Loading job record #{jobId}...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 bg-white rounded-2xl border border-rose-200 p-6 space-y-4">
        <AlertTriangle className="w-10 h-10 text-rose-600 mx-auto" />
        <h2 className="text-lg font-bold text-[#18181B]">Job Record Not Found</h2>
        <p className="text-xs text-[#52525B]">{error || 'Unable to locate this service agreement.'}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#18181B] text-white text-xs font-semibold rounded-lg"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-lg bg-white border border-[#E4DFD7] text-[#52525B] hover:text-[#18181B] hover:bg-[#F4F2ED] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#71717A] uppercase">
                {job.id}
              </span>
              <StatusBadge status={job.status} size="sm" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#18181B]">
              {job.title}
            </h1>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <Link
            href={`/jobs/${job.id}/print`}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-white border border-[#E4DFD7] rounded-lg text-[#18181B] hover:bg-[#F4F2ED] transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-[#52525B]" />
            <span>Job Receipt / Summary</span>
          </Link>

          {job.status === 'confirmed' && (
            <button
              onClick={() => handleTransition('in_progress', 'Technician commenced on-site work')}
              disabled={actionLoading}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-[#047857] text-white rounded-lg hover:bg-[#065F46] transition-colors disabled:opacity-60 shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start Work (In Progress)</span>
            </button>
          )}

          {job.status === 'in_progress' && (
            <button
              onClick={() =>
                handleTransition(
                  'pending_customer_review',
                  'Technician finished work and submitted before/after proof for customer review'
                )
              }
              disabled={actionLoading}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Request Customer Sign-off</span>
            </button>
          )}

          {job.status === 'completed' && job.financials.balanceDue === 0 && (
            <button
              onClick={() =>
                handleTransition('closed', 'Full payment received and work approved by customer')
              }
              disabled={actionLoading}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 bg-[#18181B] text-white rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-60 shadow-sm"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Close Job (Fully Settled)</span>
            </button>
          )}
        </div>
      </div>

      {/* Disputed Alert Banner if applicable */}
      {job.status === 'disputed' && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-xl p-4 text-xs space-y-1">
          <div className="flex items-center gap-2 font-bold text-rose-800">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Customer Raised a Work Disagreement</span>
          </div>
          <p className="text-rose-900 pl-6">
            <strong>Dispute Reason: </strong>
            &ldquo;{job.completionApproval?.disputeReason || 'Unspecified disagreement'}&rdquo;
          </p>
          <div className="pl-6 pt-2">
            <button
              onClick={() => handleTransition('in_progress', 'Technician addressing customer concerns on-site')}
              className="px-3 py-1 bg-rose-600 text-white font-semibold rounded text-[11px] hover:bg-rose-700"
            >
              Re-open to In Progress (Rectify Work)
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: Left (Job Details, Evidence, Payments) | Right (Customer Portal Link, Financials, Timeline) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Work Agreement Card */}
          <div className="bg-[#FFFFFF] border border-[#E4DFD7] rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E4DFD7] pb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#52525B] flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#047857]" /> Work Agreement Scope
              </h2>
              <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded bg-[#F4F2ED] text-[#52525B]">
                {job.category.replace(/_/g, ' ')}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#18181B] leading-relaxed whitespace-pre-wrap">
              {job.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#FAF9F6] p-3.5 rounded-lg border border-[#E4DFD7]">
              <div>
                <span className="text-[#71717A] block text-[11px] mb-0.5">Customer &amp; Location</span>
                <span className="font-semibold text-[#18181B] block">{job.customerName}</span>
                {job.customerPhone && <span className="text-[#52525B] block">{job.customerPhone}</span>}
                <span className="text-[#71717A] block truncate">{job.serviceAddress}</span>
              </div>

              <div>
                <span className="text-[#71717A] block text-[11px] mb-0.5">Schedule &amp; Technician</span>
                <span className="font-semibold text-[#18181B] block">
                  Target: {new Date(job.expectedCompletionDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <span className="text-[#52525B] block">{job.workerName}</span>
                {job.workerPhone && <span className="text-[#71717A] block">{job.workerPhone}</span>}
              </div>
            </div>

            {/* Customer Response Status */}
            {job.customerConfirmation && (
              <div className="text-xs p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 text-emerald-900">
                <div className="font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Agreement Confirmed by {job.customerConfirmation.customerName || job.customerName}</span>
                </div>
                {job.customerConfirmation.note && (
                  <p className="text-[11px] text-emerald-800 mt-1 italic">
                    &ldquo;{job.customerConfirmation.note}&rdquo;
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Photographic Evidence Gallery */}
          <div className="bg-[#FFFFFF] border border-[#E4DFD7] rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E4DFD7] pb-3">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[#52525B] flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-[#047857]" /> Job Photographic Evidence
                </h2>
                <span className="text-[11px] text-[#71717A]">
                  Before &amp; After visual proof to prevent disputes
                </span>
              </div>
              <button
                onClick={() => setShowEvidenceModal(true)}
                className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-[#047857] text-white rounded-lg hover:bg-[#065F46] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Evidence</span>
              </button>
            </div>

            {job.evidence.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-[#E4DFD7] rounded-xl p-4">
                <Camera className="w-8 h-8 text-[#A1A1AA] mx-auto mb-2" />
                <p className="text-xs text-[#52525B] font-medium">No visual evidence uploaded yet</p>
                <p className="text-[11px] text-[#71717A] mt-0.5 mb-3">
                  Upload photos before opening switchboards/pipes and after repair completion.
                </p>
                <button
                  onClick={() => setShowEvidenceModal(true)}
                  className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 bg-[#F4F2ED] text-[#18181B] rounded-lg hover:bg-[#E4DFD7]"
                >
                  <Plus className="w-3.5 h-3.5" /> Upload First Photo
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {job.evidence.map((item) => (
                  <div
                    key={item.id}
                    className="border border-[#E4DFD7] rounded-xl overflow-hidden bg-[#FAF9F6] flex flex-col justify-between"
                  >
                    <div className="relative aspect-video bg-zinc-900 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <span
                        className={`absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow ${
                          item.type === 'before'
                            ? 'bg-amber-600 text-white'
                            : item.type === 'after'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>

                    <div className="p-3">
                      <h4 className="text-xs font-bold text-[#18181B] mb-1">{item.title}</h4>
                      {item.description && (
                        <p className="text-[11px] text-[#52525B] line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                      <time className="text-[10px] text-[#71717A] font-mono block mt-2">
                        {new Date(item.timestamp).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </time>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payment Transactions Table */}
          <div className="bg-[#FFFFFF] border border-[#E4DFD7] rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E4DFD7] pb-3">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[#52525B] flex items-center gap-1.5">
                  <IndianRupee className="w-4 h-4 text-[#047857]" /> Payment Transactions
                </h2>
                <span className="text-[11px] text-[#71717A]">
                  Deterministic receipts and balance calculation
                </span>
              </div>
              {job.financials.balanceDue > 0 && (
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-[#047857] text-white rounded-lg hover:bg-[#065F46] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Record Payment</span>
                </button>
              )}
            </div>

            {job.payments.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-[#E4DFD7] rounded-xl p-3 text-xs text-[#71717A]">
                No payments recorded yet. Remaining balance: ₹{job.financials.balanceDue.toLocaleString('en-IN')}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF9F6] border-b border-[#E4DFD7] text-[#71717A] uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Method</th>
                      <th className="py-2.5 px-3">Note</th>
                      <th className="py-2.5 px-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4DFD7]">
                    {job.payments.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FAF9F6]/50">
                        <td className="py-2.5 px-3 font-mono text-[11px] text-[#71717A]">
                          {new Date(p.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </td>
                        <td className="py-2.5 px-3 font-semibold uppercase text-[10px]">
                          <span
                            className={`px-2 py-0.5 rounded ${
                              p.type === 'advance'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {p.type}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 uppercase text-[11px] font-mono text-[#52525B]">
                          {p.method}
                        </td>
                        <td className="py-2.5 px-3 text-[#52525B] max-w-xs truncate">
                          {p.note || '—'}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-emerald-700">
                          ₹{p.amount.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 Col) */}
        <div className="space-y-6">
          {/* Customer Confirmation Link Card */}
          <CopyLinkButton token={job.customerToken} variant="card" />

          {/* Financials Overview Card */}
          <FinancialSummaryCard financials={job.financials} />

          {/* Chronological Activity Timeline */}
          <div className="bg-[#FFFFFF] border border-[#E4DFD7] rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#52525B]">
              Immutable Audit Trail
            </h3>
            <Timeline events={job.activityLog} />
          </div>
        </div>
      </div>

      {/* Modal: Add Evidence */}
      {showEvidenceModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#E4DFD7] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E4DFD7] pb-3">
              <h3 className="text-sm font-bold text-[#18181B] flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-[#047857]" /> Upload Photographic Evidence
              </h3>
              <button
                onClick={() => setShowEvidenceModal(false)}
                className="text-xs text-[#71717A] hover:text-[#18181B]"
              >
                ✕
              </button>
            </div>

            {/* Presets */}
            <div className="bg-[#FAF9F6] p-3 rounded-lg border border-[#E4DFD7]">
              <span className="text-[11px] font-semibold text-[#52525B] block mb-1.5">
                Quick Demo Presets:
              </span>
              <div className="flex flex-col gap-1.5">
                {SAMPLE_EVIDENCE_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setEvType(preset.type);
                      setEvTitle(preset.title);
                      setEvDesc(preset.description);
                      setEvImageUrl(preset.imageUrl);
                    }}
                    className="text-left text-xs p-1.5 rounded hover:bg-[#E4DFD7] transition-colors flex items-center justify-between"
                  >
                    <span className="font-medium truncate">{preset.title}</span>
                    <span className="text-[10px] uppercase font-mono px-1 rounded bg-zinc-200">
                      {preset.type}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleAddEvidence} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#52525B] mb-1">
                  Evidence Stage
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['before', 'during', 'after'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setEvType(t)}
                      className={`py-1.5 text-xs font-semibold rounded-lg border uppercase transition-colors ${
                        evType === t
                          ? 'border-[#047857] bg-emerald-50 text-[#047857]'
                          : 'border-[#E4DFD7] bg-[#FAF9F6] text-[#71717A]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#52525B] mb-1">
                  Title / Component Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Neutral busbar repaired and tightened"
                  value={evTitle}
                  onChange={(e) => setEvTitle(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#FAF9F6] border border-[#E4DFD7] rounded-lg"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#52525B] mb-1">
                  Description / Observations
                </label>
                <textarea
                  rows={2}
                  placeholder="Details of test measurements, parts replaced..."
                  value={evDesc}
                  onChange={(e) => setEvDesc(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#FAF9F6] border border-[#E4DFD7] rounded-lg"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#52525B] mb-1">
                  Image URL / Cloud Link *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={evImageUrl}
                  onChange={(e) => setEvImageUrl(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#FAF9F6] border border-[#E4DFD7] rounded-lg"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEvidenceModal(false)}
                  className="px-3 py-2 text-xs rounded-lg border border-[#E4DFD7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#047857] text-white hover:bg-[#065F46] disabled:opacity-50"
                >
                  Save Evidence Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Record Payment */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#E4DFD7] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E4DFD7] pb-3">
              <h3 className="text-sm font-bold text-[#18181B] flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-[#047857]" /> Record Received Payment
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-xs text-[#71717A] hover:text-[#18181B]"
              >
                ✕
              </button>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs text-amber-900 flex justify-between">
              <span>Remaining Balance Due:</span>
              <span className="font-bold">₹{job.financials.balanceDue.toLocaleString('en-IN')}</span>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#52525B] mb-1">
                  Payment Amount (₹ INR) *
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    required
                    min="1"
                    max={job.financials.balanceDue}
                    step="any"
                    placeholder={job.financials.balanceDue.toString()}
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    className="flex-1 text-sm font-bold px-3 py-2 bg-[#FAF9F6] border border-[#E4DFD7] rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setPayAmount(job.financials.balanceDue.toString())}
                    className="px-2.5 py-1 text-[11px] font-semibold rounded bg-[#F4F2ED] border border-[#E4DFD7] text-[#18181B] hover:bg-[#E4DFD7]"
                  >
                    Full Balance
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#52525B] mb-1">
                  Payment Stage
                </label>
                <select
                  value={payType}
                  onChange={(e) => setPayType(e.target.value as any)}
                  className="w-full text-xs px-3 py-2 bg-[#FAF9F6] border border-[#E4DFD7] rounded-lg"
                >
                  <option value="final">Final Settlement</option>
                  <option value="partial">Interim / Milestone Payment</option>
                  <option value="advance">Additional Advance</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#52525B] mb-1">
                  Payment Method
                </label>
                <select
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value as PaymentMethod)}
                  className="w-full text-xs px-3 py-2 bg-[#FAF9F6] border border-[#E4DFD7] rounded-lg"
                >
                  <option value="upi">UPI (GPay / PhonePe / Paytm / BHIM)</option>
                  <option value="cash">Cash in hand</option>
                  <option value="bank_transfer">Bank Transfer / IMPS / NEFT</option>
                  <option value="cheque">Cheque</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-[#52525B] mb-1">
                  Transaction Reference / Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. Received via PhonePe, UTR 938472938..."
                  value={payNote}
                  onChange={(e) => setPayNote(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-[#FAF9F6] border border-[#E4DFD7] rounded-lg"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="px-3 py-2 text-xs rounded-lg border border-[#E4DFD7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#047857] text-white hover:bg-[#065F46] disabled:opacity-50"
                >
                  Record Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
