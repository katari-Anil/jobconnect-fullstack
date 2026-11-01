import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { Application, ApplicationStatus } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  FileText, 
  Search, 
  Filter, 
  ExternalLink, 
  Building, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  Eye,
  Briefcase
} from 'lucide-react';
import { Modal } from '../components/common/Modal';

interface MyApplicationsPageProps {
  applications: Application[];
  onNavigate: (tab: string) => void;
}

export const MyApplicationsPage: React.FC<MyApplicationsPageProps> = ({
  applications,
  onNavigate
}) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const myApps = useMemo(() => {
    if (!user) return [];
    return applications.filter(a => a.userId === user.id);
  }, [applications, user]);

  const filteredApps = useMemo(() => {
    return myApps.filter(app => {
      const matchesSearch = 
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.company.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [myApps, searchTerm, statusFilter]);

  const statuses: (ApplicationStatus | 'All')[] = [
    'All',
    'Applied',
    'Under Review',
    'Shortlisted',
    'Interview',
    'Selected',
    'Rejected'
  ];

  const getTimelineStepIndex = (status: ApplicationStatus) => {
    switch (status) {
      case 'Applied': return 1;
      case 'Under Review': return 2;
      case 'Shortlisted': return 3;
      case 'Interview': return 4;
      case 'Selected': return 5;
      case 'Rejected': return 0; // rejected flag
      default: return 1;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            My Application History
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track real-time hiring progress, interview requests, and recruiter updates
          </p>
        </div>

        <button
          onClick={() => onNavigate('jobs')}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 self-start md:self-auto"
        >
          <Briefcase className="w-4 h-4" />
          <span>Apply to More Roles</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 flex items-center gap-2.5 px-3 py-2 border border-slate-300 rounded-xl focus-within:ring-2 focus-within:ring-blue-500">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by role or company name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs sm:text-sm text-slate-800 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-4 flex items-center gap-2.5 px-3 py-2 border border-slate-300 rounded-xl">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full text-xs sm:text-sm text-slate-800 bg-transparent focus:outline-none cursor-pointer"
            >
              {statuses.map(st => (
                <option key={st} value={st}>{st === 'All' ? 'All Statuses' : st}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick status tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 no-scrollbar">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No applications found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchTerm || statusFilter !== 'All' 
              ? 'No applications match your active filters.' 
              : 'You have not submitted any applications yet. Explore openings to get started!'}
          </p>
          <button
            onClick={() => onNavigate('jobs')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
          >
            Explore Jobs & Internships
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 shadow-xs transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-800 text-lg shrink-0">
                    {app.company.charAt(0)}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">{app.jobTitle}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                      <span className="font-semibold text-slate-800">{app.company}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {app.location}
                      </span>
                      <span>·</span>
                      <span>{app.jobType}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <StatusBadge status={app.status} />
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors"
                    title="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Progress Flow Timeline */}
              <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Applied on <strong className="text-slate-800">{new Date(app.appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong></span>
                </div>

                {app.notes && (
                  <div className="text-xs text-blue-800 bg-blue-50/80 px-2.5 py-1 rounded-md border border-blue-100">
                    <strong className="font-semibold">Recruiter Feedback:</strong> {app.notes}
                  </div>
                )}

                <div className="flex items-center gap-2 text-slate-500">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate max-w-[160px]">{app.resumeFileName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Application Detail Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Application for ${selectedApp.jobTitle}`}
          subtitle={`${selectedApp.company} · ${selectedApp.location}`}
          maxWidth="lg"
        >
          <div className="space-y-5 text-left">
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <p className="text-xs text-slate-400">Current Application Status</p>
                <div className="mt-1">
                  <StatusBadge status={selectedApp.status} />
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Application ID</p>
                <p className="text-xs font-mono text-slate-700 mt-1">{selectedApp.id}</p>
              </div>
            </div>

            {selectedApp.notes && (
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  Recruiter Status Note
                </p>
                <p className="text-slate-700 leading-relaxed">{selectedApp.notes}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
              <div>
                <p className="font-semibold text-slate-400 uppercase">Applicant</p>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{selectedApp.studentName}</p>
                <p>{selectedApp.studentEmail}</p>
                <p>{selectedApp.studentPhone}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-400 uppercase">Education</p>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{selectedApp.studentCollege}</p>
                <p>{selectedApp.studentDegree} in {selectedApp.studentBranch}</p>
                <p>Graduation: {selectedApp.studentGraduationYear || 2026}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Attached Resume</p>
              <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between text-xs font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>{selectedApp.resumeFileName}</span>
                </div>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Verified PDF
                </span>
              </div>
            </div>

            {selectedApp.coverLetter && (
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Submitted Cover Letter</p>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {selectedApp.coverLetter}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};
