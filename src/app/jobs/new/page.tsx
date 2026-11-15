'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { JobCategory, PaymentMethod } from '@/lib/types';
import {
  ArrowLeft,
  ShieldCheck,
  IndianRupee,
  Calendar,
  MapPin,
  User,
  Phone,
  FileText,
  Sparkles,
  Check,
  AlertCircle,
} from 'lucide-react';

interface QuickTemplate {
  category: JobCategory;
  title: string;
  description: string;
  suggestedPrice: number;
}

const TEMPLATES: QuickTemplate[] = [
  {
    category: 'electrical',
    title: 'Main Distribution Board Rewiring & MCB Upgrade',
    description: 'Inspect frequent tripping of 32A main MCB, replace burnt neutral busbar, install 40A double-pole isolator, and rewire loose terminal connections.',
    suggestedPrice: 3200,
  },
  {
    category: 'plumbing',
    title: 'Concealed Bathroom Pipe Leakage & Valve Replacement',
    description: 'Trace damp wall seepage in master bathroom, locate damaged 1/2" CPVC elbow joint, replace leaking section with pressure-tested fittings and replace angle valves.',
    suggestedPrice: 2400,
  },
  {
    category: 'ac_repair',
    title: 'Split AC Deep Foam Cleaning & Refrigerant Gas Top-Up',
    description: 'Pressure jet wash cooling coils, indoor blower wheel, and outdoor condenser. Check R32 operating pressure and top-up refrigerant gas to manufacturer spec.',
    suggestedPrice: 2800,
  },
  {
    category: 'carpentry',
    title: 'Main Entrance Door Mortise Lock & Heavy-duty Hinges Installation',
    description: 'Chisel mortise cavity for Godrej high-security cylindrical lock, align door latch, and replace worn brass hinges with 3 stainless steel ball-bearing hinges.',
    suggestedPrice: 1900,
  },
];

export default function NewJobPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [category, setCategory] = useState<JobCategory>('electrical');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [serviceAddress, setServiceAddress] = useState('');
  const [agreedPrice, setAgreedPrice] = useState<string>('');
  const [expectedCompletionDate, setExpectedCompletionDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [workerName, setWorkerName] = useState('Vikram Technician Services');
  const [workerPhone, setWorkerPhone] = useState('+91 98111 22334');

  // Advance payment
  const [hasAdvance, setHasAdvance] = useState(false);
  const [advanceAmount, setAdvanceAmount] = useState<string>('');
  const [advanceMethod, setAdvanceMethod] = useState<PaymentMethod>('upi');
  const [advanceNote, setAdvanceNote] = useState('');

  const applyTemplate = (t: QuickTemplate) => {
    setCategory(t.category);
    setTitle(t.title);
    setDescription(t.description);
    setAgreedPrice(t.suggestedPrice.toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const priceNum = Number(agreedPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Please provide a valid agreed price greater than ₹0.');
      return;
    }

    let advancePayload = undefined;
    if (hasAdvance && Number(advanceAmount) > 0) {
      const advNum = Number(advanceAmount);
      if (advNum > priceNum) {
        setError('Advance payment cannot exceed the total agreed job price.');
        return;
      }
      advancePayload = {
        amount: advNum,
        method: advanceMethod,
        note: advanceNote.trim() || 'Advance payment collected at job creation',
      };
    }

    try {
      setSubmitting(true);
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          title: title.trim(),
          description: description.trim(),
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim() || undefined,
          serviceAddress: serviceAddress.trim(),
          agreedPrice: priceNum,
          expectedCompletionDate,
          workerName: workerName.trim(),
          workerPhone: workerPhone.trim() || undefined,
          initialAdvance: advancePayload,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to create job');
      }

      router.push(`/jobs/${data.job.id}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error creating job';
      setError(msg);
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header & Back */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="p-2 rounded-lg bg-white border border-[#E4DFD7] text-[#52525B] hover:text-[#18181B] hover:bg-[#F4F2ED] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#18181B]">
            Create Service Work Agreement
          </h1>
          <p className="text-xs text-[#52525B]">
            Document scope, lock in agreed price, and generate a secure confirmation link for your customer.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-300 text-rose-800 p-4 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Quick Template Picker */}
      <div className="bg-[#FFFFFF] border border-[#E4DFD7] rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-1.5 mb-2.5">
          <Sparkles className="w-4 h-4 text-[#047857]" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#52525B]">
            Quick Trade Templates (Optional 1-Click Fill)
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {TEMPLATES.map((tmpl, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyTemplate(tmpl)}
              className="text-left p-2.5 rounded-lg border border-[#E4DFD7] hover:border-[#047857] hover:bg-[#F4F2ED]/60 transition-all text-xs"
            >
              <div className="flex items-center justify-between font-semibold text-[#18181B] mb-0.5">
                <span className="truncate">{tmpl.title.split('&')[0]}</span>
                <span className="text-[#047857]">₹{tmpl.suggestedPrice}</span>
              </div>
              <p className="text-[11px] text-[#71717A] truncate">{tmpl.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Creation Form */}
      <form onSubmit={handleSubmit} className="bg-[#FFFFFF] border border-[#E4DFD7] rounded-2xl p-6 shadow-sm space-y-6">
        {/* Trade Category */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#52525B] mb-2">
            Service Trade Category *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'electrical', label: '⚡ Electrical' },
              { id: 'plumbing', label: '🔧 Plumbing' },
              { id: 'ac_repair', label: '❄️ AC Repair' },
              { id: 'appliances', label: '🔌 Appliances' },
              { id: 'carpentry', label: '🪚 Carpentry' },
              { id: 'painting', label: '🎨 Painting' },
              { id: 'masonry', label: '🧱 Masonry' },
              { id: 'other', label: '🛠️ General Repair' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id as JobCategory)}
                className={`py-2 px-3 text-xs font-medium rounded-lg border text-left transition-all ${
                  category === cat.id
                    ? 'border-[#047857] bg-emerald-50 text-[#047857] font-semibold'
                    : 'border-[#E4DFD7] bg-[#F4F2ED]/40 text-[#52525B] hover:text-[#18181B]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Work Scope */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#52525B] mb-1.5">
              Job Title / Primary Task *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Switchboard repair and burnt MCB replacement"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E4DFD7] rounded-lg text-[#18181B] focus:outline-none focus:border-[#047857]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#52525B] mb-1.5">
              Specific Work Details &amp; Materials Agreed *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe exact scope, brand of parts agreed, specific issues diagnosed to avoid scope creep."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E4DFD7] rounded-lg text-[#18181B] focus:outline-none focus:border-[#047857]"
            />
          </div>
        </div>

        {/* Customer Information */}
        <div className="border-t border-[#E4DFD7] pt-5 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#52525B] flex items-center gap-1.5">
            <User className="w-4 h-4 text-[#047857]" /> Customer &amp; Location
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#71717A] mb-1">
                Customer Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Sharma"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2 bg-[#FAF9F6] border border-[#E4DFD7] rounded-lg text-[#18181B] focus:outline-none focus:border-[#047857]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#71717A] mb-1">
                Customer Phone (Optional)
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2 bg-[#FAF9F6] border border-[#E4DFD7] rounded-lg text-[#18181B] focus:outline-none focus:border-[#047857]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#71717A] mb-1">
              Service Address / Location *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Flat 402, Shanti Vihar Apartments, Sector 14, Gurgaon"
              value={serviceAddress}
              onChange={(e) => setServiceAddress(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 bg-[#FAF9F6] border border-[#E4DFD7] rounded-lg text-[#18181B] focus:outline-none focus:border-[#047857]"
            />
          </div>
        </div>

        {/* Pricing & Target Timeline */}
        <div className="border-t border-[#E4DFD7] pt-5 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#52525B] flex items-center gap-1.5">
            <IndianRupee className="w-4 h-4 text-[#047857]" /> Financial Agreement &amp; Timeline
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#71717A] mb-1">
                Total Agreed Price (₹ INR) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#52525B]">₹</span>
                <input
                  type="number"
                  required
                  min="1"
                  step="any"
                  placeholder="3200"
                  value={agreedPrice}
                  onChange={(e) => setAgreedPrice(e.target.value)}
                  className="w-full text-sm font-semibold pl-8 pr-3 py-2 bg-[#FAF9F6] border border-[#E4DFD7] rounded-lg text-[#18181B] focus:outline-none focus:border-[#047857]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#71717A] mb-1">
                Expected Completion Date *
              </label>
              <input
                type="date"
                required
                value={expectedCompletionDate}
                onChange={(e) => setExpectedCompletionDate(e.target.value)}
                className="w-full text-xs sm:text-sm px-3 py-2 bg-[#FAF9F6] border border-[#E4DFD7] rounded-lg text-[#18181B] focus:outline-none focus:border-[#047857]"
              />
            </div>
          </div>

          {/* Advance Payment Section */}
          <div className="bg-[#F4F2ED]/60 rounded-xl p-4 border border-[#E4DFD7]">
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#18181B]">
                <input
                  type="checkbox"
                  checked={hasAdvance}
                  onChange={(e) => setHasAdvance(e.target.checked)}
                  className="rounded border-[#E4DFD7] text-[#047857] focus:ring-[#047857] w-4 h-4"
                />
                <span>Record Advance Payment Received Upfront</span>
              </label>
            </div>

            {hasAdvance && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] text-[#71717A] mb-1">Advance Amount (₹)</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="1000"
                    value={advanceAmount}
                    onChange={(e) => setAdvanceAmount(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-1.5 bg-white border border-[#E4DFD7] rounded-lg text-[#18181B]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#71717A] mb-1">Payment Method</label>
                  <select
                    value={advanceMethod}
                    onChange={(e) => setAdvanceMethod(e.target.value as PaymentMethod)}
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-[#E4DFD7] rounded-lg text-[#18181B]"
                  >
                    <option value="upi">UPI (GPay / PhonePe / Paytm)</option>
                    <option value="cash">Cash in hand</option>
                    <option value="bank_transfer">Bank Transfer / IMPS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-[#71717A] mb-1">Purpose / Note</label>
                  <input
                    type="text"
                    placeholder="e.g. Parts purchase advance"
                    value={advanceNote}
                    onChange={(e) => setAdvanceNote(e.target.value)}
                    className="w-full text-xs px-3 py-1.5 bg-white border border-[#E4DFD7] rounded-lg text-[#18181B]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Technician Signature Info */}
        <div className="border-t border-[#E4DFD7] pt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#52525B]">
            <div>
              <span className="font-semibold text-[#18181B] block">Technician Name:</span>
              <input
                type="text"
                value={workerName}
                onChange={(e) => setWorkerName(e.target.value)}
                className="w-full text-xs px-3 py-1.5 mt-1 bg-[#FAF9F6] border border-[#E4DFD7] rounded-lg text-[#18181B]"
              />
            </div>
            <div>
              <span className="font-semibold text-[#18181B] block">Technician Contact:</span>
              <input
                type="text"
                value={workerPhone}
                onChange={(e) => setWorkerPhone(e.target.value)}
                className="w-full text-xs px-3 py-1.5 mt-1 bg-[#FAF9F6] border border-[#E4DFD7] rounded-lg text-[#18181B]"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="border-t border-[#E4DFD7] pt-5 flex items-center justify-end gap-3">
          <Link
            href="/"
            className="px-4 py-2.5 rounded-lg border border-[#E4DFD7] text-xs font-semibold text-[#52525B] hover:bg-[#F4F2ED] transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#047857] text-white text-xs sm:text-sm font-semibold hover:bg-[#065F46] shadow-sm disabled:opacity-60 transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{submitting ? 'Generating Agreement...' : 'Create & Generate Link'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
