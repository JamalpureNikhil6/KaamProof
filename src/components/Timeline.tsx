import React from 'react';
import { ActivityEvent } from '@/lib/types';
import {
  FilePlus,
  CheckCircle2,
  XCircle,
  IndianRupee,
  Camera,
  RotateCw,
  AlertTriangle,
  Lock,
  User,
  Shield,
} from 'lucide-react';

interface TimelineProps {
  events: ActivityEvent[];
}

export function Timeline({ events }: TimelineProps) {
  const sorted = [...events].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'JOB_CREATED':
        return <FilePlus className="w-4 h-4 text-zinc-600" />;
      case 'CUSTOMER_CONFIRMED':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'CUSTOMER_REJECTED':
        return <XCircle className="w-4 h-4 text-rose-600" />;
      case 'PAYMENT_RECORDED':
        return <IndianRupee className="w-4 h-4 text-[#047857]" />;
      case 'EVIDENCE_ADDED':
        return <Camera className="w-4 h-4 text-blue-600" />;
      case 'STATUS_UPDATED':
        return <RotateCw className="w-4 h-4 text-amber-600" />;
      case 'COMPLETION_APPROVED':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'COMPLETION_DISPUTED':
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      case 'JOB_CLOSED':
        return <Lock className="w-4 h-4 text-zinc-700" />;
      default:
        return <Shield className="w-4 h-4 text-zinc-500" />;
    }
  };

  const getActorBadge = (actor: ActivityEvent['actor'], actorName: string) => {
    switch (actor) {
      case 'customer':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
            <User className="w-2.5 h-2.5" /> Customer ({actorName})
          </span>
        );
      case 'worker':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Shield className="w-2.5 h-2.5" /> Technician ({actorName})
          </span>
        );
      case 'system':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
            System Protocol
          </span>
        );
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E4DFD7]">
      {sorted.map((event) => (
        <div key={event.id} className="relative group">
          {/* Node Icon */}
          <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white border-2 border-[#E4DFD7] flex items-center justify-center group-hover:border-[#047857] transition-colors">
            <div className="scale-75">{getActionIcon(event.action)}</div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E4DFD7] rounded-lg p-3.5 shadow-sm hover:border-[#D1C9BE] transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                {getActorBadge(event.actor, event.actorName)}
                <span className="text-xs font-semibold text-[#18181B]">
                  {event.action.replace(/_/g, ' ')}
                </span>
              </div>
              <time className="text-[11px] font-mono text-[#71717A]">
                {formatDate(event.timestamp)}
              </time>
            </div>
            <p className="text-xs text-[#3F3F46] leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
