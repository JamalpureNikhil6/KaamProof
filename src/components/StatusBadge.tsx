import React from 'react';
import { JobStatus } from '@/lib/types';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileEdit,
  Eye,
  Lock,
} from 'lucide-react';

interface StatusBadgeProps {
  status: JobStatus;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const configs: Record<
    JobStatus,
    { label: string; bg: string; text: string; border: string; icon: React.ReactNode }
  > = {
    draft: {
      label: 'Draft',
      bg: 'bg-zinc-100',
      text: 'text-zinc-700',
      border: 'border-zinc-300',
      icon: <FileEdit className="w-3.5 h-3.5" />,
    },
    pending_customer_confirm: {
      label: 'Pending Customer Approval',
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-300',
      icon: <Clock className="w-3.5 h-3.5" />,
    },
    confirmed: {
      label: 'Agreement Confirmed',
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-300',
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
    rejected: {
      label: 'Agreement Rejected',
      bg: 'bg-rose-50',
      text: 'text-rose-800',
      border: 'border-rose-300',
      icon: <XCircle className="w-3.5 h-3.5" />,
    },
    in_progress: {
      label: 'Work In Progress',
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      border: 'border-blue-300',
      icon: <Clock className="w-3.5 h-3.5 animate-spin" />,
    },
    pending_customer_review: {
      label: 'Awaiting Customer Completion Sign-off',
      bg: 'bg-amber-100',
      text: 'text-amber-900',
      border: 'border-amber-400',
      icon: <Eye className="w-3.5 h-3.5" />,
    },
    completed: {
      label: 'Work Approved / Completed',
      bg: 'bg-emerald-100',
      text: 'text-emerald-900',
      border: 'border-emerald-400',
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
    disputed: {
      label: 'Disputed by Customer',
      bg: 'bg-rose-100',
      text: 'text-rose-900',
      border: 'border-rose-400',
      icon: <AlertTriangle className="w-3.5 h-3.5" />,
    },
    closed: {
      label: 'Settled & Closed',
      bg: 'bg-zinc-800',
      text: 'text-zinc-100',
      border: 'border-zinc-700',
      icon: <Lock className="w-3.5 h-3.5" />,
    },
  };

  const config = configs[status] || configs.draft;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]}`}
    >
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
}
