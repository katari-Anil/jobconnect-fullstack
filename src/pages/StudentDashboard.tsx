import React, { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { Job, Application } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  Briefcase, 
  FileText, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Sparkles,
  Layers,
  User,
  GraduationCap
} from 'lucide-react';

interface StudentDashboardProps {
  jobs: Job[];
  applications: Application[];
  onNavigate: (tab: string, param?: string) => void;
  onSelectJob: (job: Job) => void;
  onApplyJob: (job: Job) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  jobs,
  applications,
  onNavigate,
  onSelectJob,
  onApplyJob
}) => {
  const { user } = useAuth();

  const myApplications = useMemo(() => {
    if (!user) return [];
    return applications.filter(a => a.userId === user.id);
  }, [applications, user]);

  const shortlistedCount = myApplications.filter(a => a.status === 'Shortlisted' || a.status === 'Interview' || a.status === 'Selected').length;
  const pendingCount = myApplications.filter(a => a.status === 'Applied' || a.status === 'Under Review').length;

  // Recommended jobs based on student skills or featured
  const recommendedJobs = useMemo(() => {
    return jobs.slice(0, 3);
  }, [jobs]);

  const recentApplications = myApplications.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/15 backdrop-blur-md text-white text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5 text-blue-200" />
            <span>Class of {user?.graduationYear || 2026} · {user?.degree || 'B.Tech CS'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Student'}!
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm max-w-xl">
            You have <strong className="text-white font-mono">{pendingCount}</strong> active applications under review. Check out newly posted tech internships today.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('jobs')}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-blue-700 text-xs font-bold shadow-sm transition-colors"
          >
            Find New Roles
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className="px-4 py-2.5 rounded-xl bg-blue-800/60 hover:bg-blue-800 text-white text-xs font-semibold border border-white/20 transition-colors"
          >
            Update Resume
          </button>
        </div>
      </div>

      {/* 4 Core Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Jobs Available */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Jobs Available</p>
            <p className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-0.5">{jobs.length}</p>
          </div>
        </div>

        {/* Applications Submitted */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Applications Submitted</p>
            <p className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-0.5">{myApplications.length}</p>
          </div>
        </div>

        {/* Shortlisted Applications */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Shortlisted / Progress</p>
            <p className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-0.5">{shortlistedCount}</p>
          </div>
        </div>

        {/* Pending Applications */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending Review</p>
            <p className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-0.5">{pendingCount}</p>
          </div>
        </div>

      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 cols): Recent Applications & Recommended Jobs */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Recent Applications Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-bold text-slate-900">Recent Applications</h2>
              </div>
              <button
                onClick={() => onNavigate('my-applications')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>View Full Tracker</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {recentApplications.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <p className="text-xs text-slate-500">You haven’t submitted any applications yet.</p>
                <button
                  onClick={() => onNavigate('jobs')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
                >
                  Explore Jobs & Apply
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {recentApplications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{app.jobTitle}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="font-semibold text-slate-700">{app.company}</span>
                        <span>·</span>
                        <span>{app.location}</span>
                        <span>·</span>
                        <span>Applied {new Date(app.appliedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <StatusBadge status={app.status} size="sm" />
                      <button
                        onClick={() => onNavigate('my-applications')}
                        className="text-xs font-semibold text-slate-600 hover:text-blue-600"
                      >
                        Track
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recommended Jobs Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h2 className="text-base font-bold text-slate-900">Recommended for Your Profile</h2>
              </div>
              <button
                onClick={() => onNavigate('jobs')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>Browse All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {recommendedJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 shrink-0">
                      {job.company.charAt(0)}
                    </div>
                    <div>
                      <h4 
                        onClick={() => onSelectJob(job)}
                        className="text-sm font-bold text-slate-900 hover:text-blue-600 cursor-pointer"
                      >
                        {job.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {job.company} · {job.location} · <strong className="text-slate-800 font-mono">{job.salary}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onSelectJob(job)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onApplyJob(job)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Upcoming Opportunities & Student Profile card */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
                {user?.name.charAt(0) || 'S'}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{user?.name}</h3>
                <p className="text-xs text-slate-500">{user?.college || 'Engineering Student'}</p>
                <p className="text-[11px] text-blue-600 font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Resume:</span>
                <span className="font-semibold text-slate-800 truncate max-w-[150px]">
                  {user?.resumeFileName || 'Katari_Anil_Resume.pdf'}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Degree:</span>
                <span className="font-semibold text-slate-800">{user?.degree || 'B.Tech'}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Graduation:</span>
                <span className="font-semibold text-slate-800 font-mono">{user?.graduationYear || 2026}</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('profile')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>Edit Full Profile</span>
            </button>
          </div>

          {/* Upcoming Campus Drives & Deadlines */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">Upcoming Opportunities</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Google Cloud Drive</span>
                  <span className="text-blue-600 font-mono">Dec 31</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">SDE Intern 2026 Batch - Bengaluru</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Razorpay Checkout Team</span>
                  <span className="text-blue-600 font-mono">Dec 10</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Full Stack Intern - High priority</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Microsoft Azure Portal</span>
                  <span className="text-blue-600 font-mono">Nov 28</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Associate Frontend Engineer</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
