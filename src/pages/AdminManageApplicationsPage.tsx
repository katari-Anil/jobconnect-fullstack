import React, { useState, useMemo } from 'react';
import { Application, ApplicationStatus } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { 
  FileText, 
  Search, 
  Filter, 
  User, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  GraduationCap,
  Calendar,
  MessageSquare,
  Building
} from 'lucide-react';
import { Modal } from '../components/common/Modal';

interface AdminManageApplicationsPageProps {
  applications: Application[];
  onUpdateStatus: (id: string, status: ApplicationStatus, notes?: string) => void;
  onShowToast: (message: string, type: 'success' | 'error') => void;
}

export const AdminManageApplicationsPage: React.FC<AdminManageApplicationsPageProps> = ({
  applications,
  onUpdateStatus,
  onShowToast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // Status Change Dialog State
  const [statusChangeApp, setStatusChangeApp] = useState<Application | null>(null);
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('Shortlisted');
  const [statusNotes, setStatusNotes] = useState('');

  const filteredApps = useMemo(() => {
    return applications.filter(a => {
      const matchesSearch = 
        a.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.studentCollege.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || a.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  const allStatuses: ApplicationStatus[] = [
    'Applied',
    'Under Review',
    'Shortlisted',
    'Interview',
    'Selected',
    'Rejected'
  ];

  const handleOpenStatusModal = (app: Application) => {
    setStatusChangeApp(app);
    setNewStatus(app.status);
    setStatusNotes(app.notes || '');
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusChangeApp) return;

    onUpdateStatus(statusChangeApp.id, newStatus, statusNotes.trim());
    onShowToast(`Updated ${statusChangeApp.studentName}'s status to ${newStatus}`, 'success');
    setStatusChangeApp(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Candidate Application Review
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review student resumes, evaluate qualifications, and advance candidates through recruitment stages
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Total Submissions:</span>
          <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-mono font-bold text-xs">
            {applications.length}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 flex items-center gap-2.5 px-3 py-2 border border-slate-300 rounded-xl focus-within:ring-2 focus-within:ring-blue-500">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by student name, college, role, or company..."
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
            <option value="All">All Application Stages</option>
            {allStatuses.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Role & Company</th>
                <th className="py-3 px-4">Education</th>
                <th className="py-3 px-4">Applied Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-slate-500">
                    No applications found matching search criteria.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                    
                    {/* Candidate */}
                    <td className="py-3.5 px-4">
                      <div>
                        <span 
                          onClick={() => setSelectedApp(app)}
                          className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer block"
                        >
                          {app.studentName}
                        </span>
                        <span className="text-xs text-slate-500">{app.studentEmail}</span>
                      </div>
                    </td>

                    {/* Role & Company */}
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="font-semibold text-slate-800 text-xs">{app.jobTitle}</span>
                        <div className="text-[11px] text-slate-500">{app.company} · {app.jobType}</div>
                      </div>
                    </td>

                    {/* Education */}
                    <td className="py-3.5 px-4 text-xs text-slate-600">
                      <span className="font-medium text-slate-800 block truncate max-w-[200px]">{app.studentCollege}</span>
                      <span className="text-[11px] text-slate-400">{app.studentDegree} ({app.studentGraduationYear || 2026})</span>
                    </td>

                    {/* Applied Date */}
                    <td className="py-3.5 px-4 text-xs text-slate-500 font-mono">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      <StatusBadge status={app.status} size="sm" />
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View student profile & resume"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenStatusModal(app)}
                          className="px-2.5 py-1 text-xs font-semibold text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-200 hover:border-blue-600 rounded-lg transition-all"
                        >
                          Update Status
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Profile Details Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Candidate Profile: ${selectedApp.studentName}`}
          subtitle={`Applied for ${selectedApp.jobTitle} at ${selectedApp.company}`}
          maxWidth="2xl"
        >
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  {selectedApp.studentName.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{selectedApp.studentName}</h3>
                  <p className="text-xs text-slate-500">{selectedApp.studentEmail} · {selectedApp.studentPhone}</p>
                </div>
              </div>

              <div>
                <StatusBadge status={selectedApp.status} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <p className="font-semibold text-slate-400 uppercase">Academic Details</p>
                <p className="font-bold text-slate-900 text-sm">{selectedApp.studentCollege}</p>
                <p>{selectedApp.studentDegree} in {selectedApp.studentBranch}</p>
                <p>Graduation Year: <strong className="font-mono">{selectedApp.studentGraduationYear || 2026}</strong></p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <p className="font-semibold text-slate-400 uppercase">Verified Resume</p>
                <div className="flex items-center gap-2 pt-1">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-slate-800 truncate">{selectedApp.resumeFileName}</span>
                </div>
                <p className="text-[11px] text-emerald-600 font-medium">Valid PDF Document</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase mb-1.5">Technical Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedApp.skills.map(s => (
                  <span key={s} className="px-2.5 py-1 rounded-md text-xs bg-slate-100 text-slate-700 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {selectedApp.coverLetter && (
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1.5">Candidate Cover Letter</p>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {selectedApp.coverLetter}
                </div>
              </div>
            )}

            {selectedApp.notes && (
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900">
                <p className="font-bold">Evaluation Feedback on Record:</p>
                <p className="mt-0.5 text-slate-700">{selectedApp.notes}</p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  const target = selectedApp;
                  setSelectedApp(null);
                  handleOpenStatusModal(target);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
              >
                Change Application Status
              </button>
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Update Status Modal */}
      {statusChangeApp && (
        <Modal
          isOpen={!!statusChangeApp}
          onClose={() => setStatusChangeApp(null)}
          title={`Update Status for ${statusChangeApp.studentName}`}
          subtitle={`Position: ${statusChangeApp.jobTitle} (${statusChangeApp.company})`}
          maxWidth="md"
        >
          <form onSubmit={handleSaveStatus} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Recruitment Stage / Status <span className="text-rose-500">*</span>
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Applied">Applied (Initial Intake)</option>
                <option value="Under Review">Under Review (HR Screening)</option>
                <option value="Shortlisted">Shortlisted (Assessment Ready)</option>
                <option value="Interview">Interview Round Scheduled</option>
                <option value="Selected">Selected / Offer Extended</option>
                <option value="Rejected">Not Selected / Closed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Recruiter Feedback & Notes for Student
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Cleared resume screening. Technical interview scheduled for Nov 5."
                value={statusNotes}
                onChange={(e) => setStatusNotes(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <p className="text-[11px] text-slate-400 mt-1">
                This note will be visible to the student in their "My Applications" dashboard tracker.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStatusChangeApp(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
              >
                Save & Notify Student
              </button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};
