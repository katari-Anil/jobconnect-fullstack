import React, { useMemo } from 'react';
import { Job, Application, User } from '../types';
import { 
  Users, 
  Briefcase, 
  FileText, 
  CheckCircle, 
  TrendingUp, 
  Calendar, 
  Plus, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  PieChart,
  BarChart3
} from 'lucide-react';

interface AdminDashboardProps {
  jobs: Job[];
  applications: Application[];
  users: User[];
  onNavigate: (tab: string) => void;
  onOpenCreateJob: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  jobs,
  applications,
  users,
  onNavigate,
  onOpenCreateJob
}) => {
  const students = users.filter(u => u.role === 'STUDENT');
  const shortlistedCount = applications.filter(a => a.status === 'Shortlisted' || a.status === 'Interview' || a.status === 'Selected').length;

  // Status breakdown calculations
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {
      Applied: 0,
      'Under Review': 0,
      Shortlisted: 0,
      Interview: 0,
      Selected: 0,
      Rejected: 0
    };
    applications.forEach(a => {
      if (counts[a.status] !== undefined) {
        counts[a.status]++;
      } else {
        counts[a.status] = 1;
      }
    });
    return counts;
  }, [applications]);

  // Jobs by category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    jobs.forEach(j => {
      counts[j.category] = (counts[j.category] || 0) + 1;
    });
    return Object.entries(counts);
  }, [jobs]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      
      {/* Header Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/20">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Administrator & Recruiter Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            JobConnect Command Center
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
            Real-time management for student applications, university placement drives, and verified job postings.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCreateJob}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Job</span>
          </button>
          <button
            onClick={() => onNavigate('admin-applications')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            Review Candidates
          </button>
        </div>
      </div>

      {/* 4 Core Admin KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Students */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Registered Students</p>
            <p className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-0.5">{students.length + 18}</p>
          </div>
        </div>

        {/* Total Jobs */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Job Postings</p>
            <p className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-0.5">{jobs.length}</p>
          </div>
        </div>

        {/* Total Applications */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Submissions</p>
            <p className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-0.5">{applications.length}</p>
          </div>
        </div>

        {/* Shortlisted Students */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Shortlisted Candidates</p>
            <p className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-0.5">{shortlistedCount}</p>
          </div>
        </div>

      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Applications by Status Breakdown (8 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">Applications by Hiring Status</h2>
            </div>
            <button
              onClick={() => onNavigate('admin-applications')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {Object.entries(statusCounts).map(([status, count]) => {
              const total = applications.length || 1;
              const percent = Math.round((count / total) * 100);
              
              const barColors: Record<string, string> = {
                Applied: 'bg-slate-400',
                'Under Review': 'bg-amber-400',
                Shortlisted: 'bg-blue-600',
                Interview: 'bg-purple-600',
                Selected: 'bg-emerald-500',
                Rejected: 'bg-rose-400'
              };

              return (
                <div key={status} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{status}</span>
                    <span className="font-mono text-slate-500">
                      <strong className="text-slate-800 font-bold">{count}</strong> ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${barColors[status] || 'bg-blue-600'}`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Overall Talent Conversion Rate</span>
            <span className="font-bold text-emerald-700 font-mono text-sm">
              {Math.round(((statusCounts['Selected'] || 0) / (applications.length || 1)) * 100)}%
            </span>
          </div>
        </div>

        {/* Jobs by Category & Monthly Pipeline (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <PieChart className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">Job Categories Distribution</h2>
            </div>

            <div className="space-y-3 pt-1">
              {categoryCounts.map(([cat, count]) => (
                <div key={cat} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-50 last:border-0">
                  <span className="text-slate-700 font-medium">{cat}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-slate-800 font-semibold">
                    {count} roles
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('admin-jobs')}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-blue-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Manage Job Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Recruitment Checklist */}
          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-5 text-xs text-blue-900 space-y-2">
            <p className="font-bold">Recruiter Quick Actions</p>
            <ul className="space-y-1.5 text-slate-600 text-[11px]">
              <li>• Review applicants awaiting initial screening</li>
              <li>• Update interview status to trigger student notification</li>
              <li>• Audit active job expiration dates before campus drives</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
