import React from 'react';
import { JobSummaryFinancials } from '@/lib/types';
import { IndianRupee, CheckCircle, AlertCircle } from 'lucide-react';

interface FinancialSummaryCardProps {
  financials: JobSummaryFinancials;
  compact?: boolean;
}

export function FinancialSummaryCard({
  financials,
  compact = false,
}: FinancialSummaryCardProps) {
  const { agreedPrice, totalPaid, balanceDue, advancePaid, isFullyPaid } =
    financials;

  const progressPercent =
    agreedPrice > 0 ? Math.min(100, Math.round((totalPaid / agreedPrice) * 100)) : 0;

  if (compact) {
    return (
      <div className="flex items-center justify-between text-xs py-2 px-3 bg-[#F4F2ED] rounded-lg border border-[#E4DFD7]">
        <div>
          <span className="text-[#71717A]">Agreed: </span>
          <span className="font-semibold text-[#18181B]">₹{agreedPrice.toLocaleString('en-IN')}</span>
        </div>
        <div>
          <span className="text-[#71717A]">Paid: </span>
          <span className="font-semibold text-emerald-700">₹{totalPaid.toLocaleString('en-IN')}</span>
        </div>
        <div>
          <span className="text-[#71717A]">Due: </span>
          <span className={`font-bold ${balanceDue > 0 ? 'text-amber-700' : 'text-emerald-700'}`}>
            ₹{balanceDue.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] border border-[#E4DFD7] rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-[#E4DFD7] pb-3 mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#52525B] flex items-center gap-1.5">
          <IndianRupee className="w-4 h-4 text-[#047857]" />
          Financial Ledger Summary
        </h3>
        {isFullyPaid ? (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
            <CheckCircle className="w-3.5 h-3.5" /> Fully Settled
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
            <AlertCircle className="w-3.5 h-3.5" /> ₹{balanceDue.toLocaleString('en-IN')} Outstanding
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-3 bg-[#F4F2ED] rounded-lg">
          <span className="text-xs text-[#71717A] block mb-1">Agreed Total</span>
          <span className="text-lg sm:text-xl font-bold text-[#18181B]">
            ₹{agreedPrice.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100">
          <span className="text-xs text-emerald-800 block mb-1">Total Received</span>
          <span className="text-lg sm:text-xl font-bold text-emerald-700">
            ₹{totalPaid.toLocaleString('en-IN')}
          </span>
          {advancePaid > 0 && (
            <span className="text-[10px] text-emerald-600 block mt-0.5">
              (₹{advancePaid.toLocaleString('en-IN')} advance)
            </span>
          )}
        </div>

        <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-100">
          <span className="text-xs text-amber-800 block mb-1">Remaining Balance</span>
          <span className="text-lg sm:text-xl font-bold text-amber-700">
            ₹{balanceDue.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-xs text-[#71717A] mb-1.5 font-medium">
          <span>Payment Progress</span>
          <span>{progressPercent}% Settled</span>
        </div>
        <div className="w-full bg-[#E4DFD7] h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#047857] h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
