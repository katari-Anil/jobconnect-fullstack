import React from 'react';
import { ApplicationStatus } from '../../types';
import { CheckCircle2, Clock, AlertCircle, Calendar, Sparkles, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: ApplicationStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'Applied':
        return {
          bg: 'bg-slate-100 text-slate-800 border-slate-200',
          icon: Clock,
          label: 'Applied'
        };
      case 'Under Review':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: AlertCircle,
          label: 'Under Review'
        };
      case 'Shortlisted':
        return {
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
          icon: Sparkles,
          label: 'Shortlisted'
        };
      case 'Interview':
        return {
          bg: 'bg-purple-50 text-purple-800 border-purple-200',
          icon: Calendar,
          label: 'Interview Round'
        };
      case 'Selected':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          icon: CheckCircle2,
          label: 'Selected'
        };
      case 'Rejected':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          icon: XCircle,
          label: 'Not Selected'
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-200',
          icon: Clock,
          label: status
        };
    }
  };

  const { bg, icon: Icon, label } = getStatusConfig();
  const paddingClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border font-medium ${bg} ${paddingClass}`}>
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{label}</span>
    </span>
  );
};
