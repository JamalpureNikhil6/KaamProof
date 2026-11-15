'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Job, JobSummaryFinancials } from '@/lib/types';
import { StatusBadge } from '@/components/StatusBadge';
import { CopyLinkButton } from '@/components/CopyLinkButton';
import {
  Briefcase,
  IndianRupee,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
  Filter,
  Search,
  MapPin,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface EnrichedJob extends Job {
  financials: JobSummaryFinancials;
}

export default function DashboardPage() {
  const [jobs, setJobs] = useState<EnrichedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/jobs');
      const data = await res.json();
      if (data.success) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'all') return true;
    if (statusFilter === 'active') {
      return ['pending_customer_confirm', 'confirmed', 'in_progress'].includes(job.status);
    }
    if (statusFilter === 'review') {
      return job.status === 'pending_customer_review';
    }
    if (statusFilter === 'disputed') {
      return job.status === 'disputed';
    }
    if (statusFilter === 'completed') {
      return ['completed', 'closed'].includes(job.status);
    }
    return true;
  });

  // Calculate high-level aggregates
  const totalActive = jobs.filter((j) =>
    ['pending_customer_confirm', 'confirmed', 'in_progress'].includes(j.status)
  ).length;

  const totalAwaitingReview = jobs.filter(
    (j) => j.status === 'pending_customer_review'
  ).length;

  const totalOutstandingBalance = jobs.reduce(
    (sum, j) => sum + (j.financials?.balanceDue || 0),
    0
  );

  const totalSettledRevenue = jobs.reduce(
    (sum, j) => sum + (j.financials?.totalPaid || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#FFFFFF] border border-[#E4DFD7] rounded-2xl p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#047857] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Technician Workspace
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B]">
            Job Accountability Ledger
          </h1>
          <p className="text-sm text-[#52525B] mt-1">
            Track signed customer agreements, upload on-site evidence, and record payments with zero ambiguity.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/jobs/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#047857] text-white text-sm font-semibold hover:bg-[#065F46] shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create New Agreement</span>
          </Link>
        </div>
      </div>

      {/* Aggregate Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#FFFFFF] border border-[#E4DFD7] rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#71717A] mb-1 font-medium">
            <span>Active Jobs</span>
            <Briefcase className="w-4 h-4 text-[#047857]" />
          </div>
          <div className="text-2xl font-bold text-[#18181B]">{totalActive}</div>
          <span className="text-[11px] text-[#71717A]">In progress or awaiting start</span>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E4DFD7] rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-amber-800 mb-1 font-medium">
            <span>Customer Sign-off</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-700">{totalAwaitingReview}</div>
          <span className="text-[11px] text-amber-800">Awaiting customer approval</span>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E4DFD7] rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-emerald-800 mb-1 font-medium">
            <span>Collected Revenue</span>
            <IndianRupee className="w-4 h-4 text-[#047857]" />
          </div>
          <div className="text-2xl font-bold text-emerald-700">
            ₹{totalSettledRevenue.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-700">Verified received payments</span>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E4DFD7] rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-amber-900 mb-1 font-medium">
            <span>Outstanding Balance</span>
            <IndianRupee className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-700">
            ₹{totalOutstandingBalance.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-amber-800">Receivable from active jobs</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#FFFFFF] border border-[#E4DFD7] p-3 rounded-xl shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
          <input
            type="text"
            placeholder="Search by customer, job title, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs sm:text-sm pl-9 pr-4 py-2 bg-[#F4F2ED] border border-[#E4DFD7] rounded-lg text-[#18181B] focus:outline-none focus:border-[#047857]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-[#71717A] ml-1 mr-0.5" />
          {[
            { id: 'all', label: 'All' },
            { id: 'active', label: 'Active' },
            { id: 'review', label: 'In Review' },
            { id: 'disputed', label: 'Disputed' },
            { id: 'completed', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                statusFilter === tab.id
                  ? 'bg-[#18181B] text-white'
                  : 'bg-[#F4F2ED] text-[#52525B] hover:text-[#18181B]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs List */}
      {loading ? (
        <div className="text-center py-12 bg-white rounded-xl border border-[#E4DFD7]">
          <div className="w-6 h-6 border-2 border-[#047857] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-xs text-[#71717A]">Loading jobs ledger...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-14 bg-white rounded-2xl border border-dashed border-[#D1C9BE] p-6">
          <Briefcase className="w-10 h-10 text-[#71717A] mx-auto mb-3" />
          <h3 className="text-base font-semibold text-[#18181B]">No jobs match your filter</h3>
          <p className="text-xs text-[#52525B] max-w-sm mx-auto mt-1 mb-4">
            Create a formal job agreement with agreed pricing, customer confirmation link, and evidence tracking.
          </p>
          <Link
            href="/jobs/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#047857] text-white text-xs font-semibold rounded-lg hover:bg-[#065F46]"
          >
            <Plus className="w-3.5 h-3.5" /> Create Agreement
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-[#FFFFFF] border border-[#E4DFD7] rounded-xl p-5 shadow-sm hover:border-[#D1C9BE] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F4F2ED] text-[#52525B]">
                    {job.category.replace(/_/g, ' ')}
                  </span>
                  <StatusBadge status={job.status} size="sm" />
                </div>

                <Link href={`/jobs/${job.id}`}>
                  <h3 className="text-base font-bold text-[#18181B] hover:text-[#047857] transition-colors leading-snug">
                    {job.title}
                  </h3>
                </Link>

                <p className="text-xs text-[#52525B] line-clamp-2 mt-1 mb-3">
                  {job.description}
                </p>

                <div className="space-y-1.5 text-xs text-[#52525B] mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-[#18181B]">{job.customerName}</span>
                    {job.customerPhone && (
                      <span className="text-[#71717A]">({job.customerPhone})</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#71717A]">
                    <MapPin className="w-3 h-3 text-[#71717A] flex-shrink-0" />
                    <span className="truncate">{job.serviceAddress}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#71717A]">
                    <Calendar className="w-3 h-3 text-[#71717A] flex-shrink-0" />
                    <span>Target: {new Date(job.expectedCompletionDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>

              {/* Financial & Link Footer */}
              <div className="border-t border-[#E4DFD7] pt-3 mt-2">
                <div className="flex items-center justify-between text-xs mb-3">
                  <div>
                    <span className="text-[#71717A] text-[11px]">Agreed: </span>
                    <span className="font-bold text-[#18181B]">₹{job.financials.agreedPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-[#71717A] text-[11px]">Balance Due: </span>
                    <span
                      className={`font-bold ${
                        job.financials.balanceDue > 0
                          ? 'text-amber-700'
                          : 'text-emerald-700'
                      }`}
                    >
                      ₹{job.financials.balanceDue.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <CopyLinkButton token={job.customerToken} />

                  <Link
                    href={`/jobs/${job.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-[#18181B] text-white rounded-lg hover:bg-zinc-800 transition-colors"
                  >
                    <span>Manage</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
