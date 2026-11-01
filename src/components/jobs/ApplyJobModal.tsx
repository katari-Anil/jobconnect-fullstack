import React, { useState } from 'react';
import { Job, Application } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { JobConnectStorage } from '../../services/storageService';
import { Modal } from '../common/Modal';
import { UploadCloud, CheckCircle2, FileText, AlertCircle } from 'lucide-react';

interface ApplyJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  onSuccess: (application: Application) => void;
}

export const ApplyJobModal: React.FC<ApplyJobModalProps> = ({
  isOpen,
  onClose,
  job,
  onSuccess
}) => {
  const { user } = useAuth();
  const [phone, setPhone] = useState(user?.phone || '');
  const [skills, setSkills] = useState(user?.skills ? user.skills.join(', ') : '');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState(user?.resumeFileName || '');
  const [fileError, setFileError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!job) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate PDF
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        setFileError('Only PDF files are accepted (.pdf).');
        return;
      }
      // Validate size <= 5MB
      if (file.size > 5 * 1024 * 1024) {
        setFileError('File size must be 5MB or less.');
        return;
      }
      setResumeFile(file);
      setResumeFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!user) {
      setError('Please sign in as a student to apply for this job.');
      return;
    }

    if (!resumeFileName && !resumeFile) {
      setFileError('Please attach your PDF resume to submit your application.');
      return;
    }

    try {
      setIsSubmitting(true);

      const parsedSkills = skills
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

      const applicationData = {
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        companyLogo: job.companyLogo,
        location: job.location,
        jobType: job.jobType,
        userId: user.id,
        studentName: user.name,
        studentEmail: user.email,
        studentPhone: phone || user.phone || 'N/A',
        studentCollege: user.college || 'N/A',
        studentDegree: user.degree || 'N/A',
        studentBranch: user.branch || 'N/A',
        studentGraduationYear: user.graduationYear,
        skills: parsedSkills.length > 0 ? parsedSkills : (user.skills || []),
        resumeUrl: '#',
        resumeFileName: resumeFileName || `${user.name.replace(/\s+/g, '_')}_Resume.pdf`,
        coverLetter: coverLetter.trim()
      };

      const newApp = JobConnectStorage.applyForJob(applicationData);
      setIsSubmitting(false);
      onSuccess(newApp);
      onClose();
    } catch (err: any) {
      setIsSubmitting(false);
      setError(err?.message || 'Could not submit application.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Apply for ${job.title}`}
      subtitle={`${job.company} · ${job.location}`}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs border border-rose-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Applicant Name
            </label>
            <input
              type="text"
              readOnly
              value={user?.name || ''}
              className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              readOnly
              value={user?.email || ''}
              className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-600 cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Relevant Skills (comma-separated)
          </label>
          <input
            type="text"
            placeholder="e.g. React, Node.js, TypeScript, PostgreSQL"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Resume PDF Upload */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            PDF Resume Upload <span className="text-rose-500">*</span>
          </label>
          <div className="border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl p-4 text-center bg-slate-50/50 transition-colors">
            <input
              type="file"
              id="resume-upload"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="resume-upload" className="cursor-pointer block">
              <UploadCloud className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-xs font-medium text-slate-700">
                Click to browse or drag & drop your resume
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                PDF only (Max file size: 5MB)
              </p>
            </label>
            {resumeFileName && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium">
                <FileText className="w-3.5 h-3.5" />
                <span className="truncate max-w-[200px]">{resumeFileName}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              </div>
            )}
          </div>
          {fileError && <p className="text-xs text-rose-600 mt-1">{fileError}</p>}
        </div>

        {/* Cover Letter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Cover Letter / Note to Recruiter
          </label>
          <textarea
            rows={3}
            placeholder="Briefly explain your suitability, relevant college coursework, projects, or why you're passionate about joining..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm shadow-blue-500/20 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
