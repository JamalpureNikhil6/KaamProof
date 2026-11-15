'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Job, JobSummaryFinancials } from '@/lib/types';
import { StatusBadge } from '@/components/StatusBadge';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  IndianRupee,
  Calendar,
  MapPin,
  Camera,
  Check,
  Send,
  MessageSquare,
  Lock,
} from 'lucide-react';

interface EnrichedJob extends Job {
  financials: JobSummaryFinancials;
}

export default function CustomerConfirmPage() {
  const params = useParams();
  const token = params?.token as string;

  const [job, setJob] = useState<EnrichedJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [confirmName, setConfirmName] = useState('');
  const [confirmNote, setConfirmNote] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  // Dispute states
  const [showDisputeForm, setShowDisputeForm] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');

  const fetchJob = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/customer/${token}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid or expired confirmation link');
      }
      setJob(data.job);
      setConfirmName(data.job.customerName || '');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error fetching job';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchJob();
    }
  }, [token, fetchJob]);

  // Customer responds to initial agreement
  const handleAgreementResponse = async (confirmed: boolean) => {
    if (!confirmed && !rejectReason.trim()) {
      alert('Please specify the reason for declining or requesting changes.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`/api/customer/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'confirm_agreement',
          confirmed,
          customerName: confirmName.trim() || undefined,
          note: confirmed ? confirmNote.trim() : rejectReason.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit response');
      }
      setJob(data.job);
      setShowRejectForm(false);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to respond');
    } finally {
      setSubmitting(false);
    }
  };

  // Customer responds to completion review
  const handleCompletionResponse = async (approved: boolean) => {
    if (!approved && !disputeReason.trim()) {
      alert('Please explain the issue or what work remains incomplete.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`/api/customer/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'review_completion',
          approved,
          disputeReason: !approved ? disputeReason.trim() : undefined,
          customerName: confirmName.trim() || undefined,
          note: approved ? confirmNote.trim() : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit completion review');
      }
      setJob(data.job);
      setShowDisputeForm(false);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 bg-white rounded-2xl border border-[#E4DFD7] p-6">
        <div className="w-8 h-8 border-2 border-[#047857] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-[#52525B]">Securing connection to job agreement...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 bg-white rounded-2xl border border-rose-200 p-6 space-y-4">
        <AlertTriangle className="w-10 h-10 text-rose-600 mx-auto" />
        <h2 className="text-lg font-bold text-[#18181B]">Invalid or Expired Link</h2>
        <p className="text-xs text-[#52525B]">
          {error || 'This service confirmation link is invalid or has expired.'}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Verification Header */}
      <div className="bg-[#FFFFFF] border border-[#E4DFD7] rounded-2xl p-6 shadow-sm text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-[#047857] text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
          <ShieldCheck className="w-7 h-7 stroke-[2.2]" />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-[#047857] border border-emerald-200">
          Official Customer Verification Portal
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-[#18181B]">
          {job.title}
        </h1>
        <p className="text-xs text-[#52525B]">
          Provided by <strong className="text-[#18181B]">{job.workerName}</strong> &bull; {job.serviceAddress}
        </p>
        <div className="pt-2">
          <StatusBadge status={job.status} size="md" />
        </div>
      </div>

      {/* Agreed Work Scope */}
      <div className="bg-[#FFFFFF] border border-[#E4DFD7] rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#52525B] border-b border-[#E4DFD7] pb-2">
          Agreed Scope of Work
        </h2>
        <p className="text-sm text-[#18181B] leading-relaxed whitespace-pre-wrap">
          {job.description}
        </p>

        <div className="grid grid-cols-2 gap-4 text-xs bg-[#FAF9F6] p-3.5 rounded-xl border border-[#E4DFD7]">
          <div>
            <span className="text-[#71717A] text-[11px] block">Customer</span>
            <span className="font-semibold text-[#18181B]">{job.customerName}</span>
          </div>
          <div>
            <span className="text-[#71717A] text-[11px] block">Target Date</span>
            <span className="font-semibold text-[#18181B]">
              {new Date(job.expectedCompletionDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Financial Breakdown Card */}
      <div className="bg-[#FFFFFF] border border-[#E4DFD7] rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#52525B] border-b border-[#E4DFD7] pb-2">
          Agreed Pricing &amp; Payments
        </h2>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E4DFD7]">
            <span className="text-[11px] text-[#71717A] block">Agreed Total</span>
            <span className="text-lg font-bold text-[#18181B]">₹{job.financials.agreedPrice.toLocaleString('en-IN')}</span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <span className="text-[11px] text-emerald-800 block">Total Paid</span>
            <span className="text-lg font-bold text-emerald-700">₹{job.financials.totalPaid.toLocaleString('en-IN')}</span>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
            <span className="text-[11px] text-amber-800 block">Balance Due</span>
            <span className="text-lg font-bold text-amber-700">₹{job.financials.balanceDue.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {job.payments.length > 0 && (
          <div className="border-t border-[#E4DFD7] pt-3">
            <span className="text-[11px] font-semibold text-[#71717A] block mb-2">Recorded Payments:</span>
            <div className="space-y-1.5 text-xs">
              {job.payments.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-[#FAF9F6]">
                  <div>
                    <span className="font-semibold uppercase text-[10px] px-1.5 py-0.5 rounded bg-zinc-200 mr-2">
                      {p.type}
                    </span>
                    <span className="text-[#52525B]">{p.note || 'Payment recorded'}</span>
                  </div>
                  <span className="font-bold text-emerald-700">₹{p.amount.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Photographic Evidence Gallery */}
      {job.evidence.length > 0 && (
        <div className="bg-[#FFFFFF] border border-[#E4DFD7] rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#E4DFD7] pb-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#52525B] flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-[#047857]" /> Photographic Work Evidence
            </h2>
            <span className="text-[11px] text-[#71717A]">{job.evidence.length} photos</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {job.evidence.map((ev) => (
              <div key={ev.id} className="border border-[#E4DFD7] rounded-xl overflow-hidden bg-[#FAF9F6]">
                <div className="aspect-video bg-zinc-900 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ev.imageUrl} alt={ev.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/70 text-white">
                    {ev.type}
                  </span>
                </div>
                <div className="p-3">
                  <h4 className="text-xs font-bold text-[#18181B]">{ev.title}</h4>
                  {ev.description && <p className="text-[11px] text-[#52525B] mt-0.5">{ev.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STATE 1: PENDING INITIAL CONFIRMATION */}
      {(job.status === 'pending_customer_confirm' || job.status === 'draft') && (
        <div className="bg-[#FFFFFF] border-2 border-emerald-500 rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#047857]" />
            <h2 className="text-base font-bold text-[#18181B]">
              Step 1: Do you confirm this work and agreed price?
            </h2>
          </div>
          <p className="text-xs text-[#52525B]">
            By confirming, you agree to the work scope, parts description, and price of <strong>₹{job.financials.agreedPrice.toLocaleString('en-IN')}</strong> quoted by {job.workerName}.
          </p>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-[11px] font-medium text-[#71717A] mb-1">Your Full Name</label>
              <input
                type="text"
                value={confirmName}
                onChange={(e) => setConfirmName(e.target.value)}
                placeholder="Ramesh Sharma"
                className="w-full text-xs px-3 py-2 bg-[#FAF9F6] border border-[#E4DFD7] rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#71717A] mb-1">Special Instructions or Notes (Optional)</label>
              <input
                type="text"
                value={confirmNote}
                onChange={(e) => setConfirmNote(e.target.value)}
                placeholder="e.g. Please use Havells DP isolator as agreed"
                className="w-full text-xs px-3 py-2 bg-[#FAF9F6] border border-[#E4DFD7] rounded-lg"
              />
            </div>

            {!showRejectForm ? (
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleAgreementResponse(true)}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#047857] text-white font-semibold text-xs sm:text-sm hover:bg-[#065F46] shadow-sm disabled:opacity-60 transition-all"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Accept &amp; Confirm Job Agreement</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowRejectForm(true)}
                  className="py-3 px-4 rounded-xl border border-rose-300 text-rose-700 bg-rose-50 hover:bg-rose-100 text-xs font-semibold transition-colors"
                >
                  Decline / Request Change
                </button>
              </div>
            ) : (
              <div className="p-4 bg-rose-50 border border-rose-300 rounded-xl space-y-3">
                <span className="text-xs font-bold text-rose-900 block">Why are you declining this agreement?</span>
                <textarea
                  rows={2}
                  placeholder="Price differs from estimate, incorrect address or scope..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-rose-300 rounded-lg"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowRejectForm(false)}
                    className="px-3 py-1.5 text-xs text-[#52525B] rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => handleAgreementResponse(false)}
                    className="px-4 py-1.5 text-xs font-semibold bg-rose-600 text-white rounded-lg hover:bg-rose-700"
                  >
                    Submit Rejection
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STATE 2: PENDING CUSTOMER REVIEW (WORK FINISHED BY TECHNICIAN) */}
      {job.status === 'pending_customer_review' && (
        <div className="bg-[#FFFFFF] border-2 border-blue-500 rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-[#18181B]">
              Step 2: Technician Completed Work — Customer Approval
            </h2>
          </div>
          <p className="text-xs text-[#52525B]">
            {job.workerName} has finished the work and uploaded evidence. Please inspect the repaired items and photos above, then confirm completion or raise an issue.
          </p>

          {!showDisputeForm ? (
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                disabled={submitting}
                onClick={() => handleCompletionResponse(true)}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#047857] text-white font-semibold text-xs sm:text-sm hover:bg-[#065F46] shadow-sm disabled:opacity-60 transition-all"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Approve Work Completion</span>
              </button>

              <button
                type="button"
                onClick={() => setShowDisputeForm(true)}
                className="py-3 px-4 rounded-xl border border-rose-300 text-rose-700 bg-rose-50 hover:bg-rose-100 text-xs font-semibold transition-colors"
              >
                Raise Issue / Disagreement
              </button>
            </div>
          ) : (
            <div className="p-4 bg-rose-50 border border-rose-300 rounded-xl space-y-3">
              <span className="text-xs font-bold text-rose-900 block">Describe the issue or incomplete work:</span>
              <textarea
                rows={3}
                required
                placeholder="e.g. Switchboard trips when turning on living room AC, loose socket..."
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-rose-300 rounded-lg"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowDisputeForm(false)}
                  className="px-3 py-1.5 text-xs text-[#52525B] rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => handleCompletionResponse(false)}
                  className="px-4 py-1.5 text-xs font-semibold bg-rose-600 text-white rounded-lg hover:bg-rose-700"
                >
                  Register Formal Disagreement
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STATE 3: COMPLETED / SETTLED */}
      {['completed', 'closed'].includes(job.status) && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 text-center space-y-2">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
          <h3 className="text-lg font-bold text-emerald-900">
            Work Successfully Completed &amp; Approved
          </h3>
          <p className="text-xs text-emerald-800 max-w-md mx-auto">
            This job was confirmed and signed off by {job.completionApproval?.customerName || job.customerName} on{' '}
            {job.completionApproval?.approvedAt
              ? new Date(job.completionApproval.approvedAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : 'Record confirmed'}.
          </p>
          <div className="pt-2">
            <span className="text-xs font-mono bg-white px-3 py-1 rounded-full border border-emerald-200 text-emerald-800">
              Audit Hash: {job.customerToken.slice(0, 16)}
            </span>
          </div>
        </div>
      )}

      {/* STATE 4: DISPUTED */}
      {job.status === 'disputed' && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-6 text-center space-y-2">
          <AlertTriangle className="w-10 h-10 text-rose-600 mx-auto" />
          <h3 className="text-lg font-bold text-rose-900">
            Disagreement Registered
          </h3>
          <p className="text-xs text-rose-800 max-w-md mx-auto">
            You registered an issue: &ldquo;{job.completionApproval?.disputeReason}&rdquo;. The technician has been notified to rectify the work on-site.
          </p>
        </div>
      )}
    </div>
  );
}
