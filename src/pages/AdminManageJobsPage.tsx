import React, { useState, useMemo } from 'react';
import { Job, JobType } from '../types';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MapPin, 
  Building, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { Modal } from '../components/common/Modal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';

interface AdminManageJobsPageProps {
  jobs: Job[];
  onCreateJob: (jobData: Omit<Job, 'id' | 'postedDate'>) => void;
  onUpdateJob: (id: string, updates: Partial<Job>) => void;
  onDeleteJob: (id: string) => void;
  onViewJob: (job: Job) => void;
  onShowToast: (message: string, type: 'success' | 'error') => void;
}

export const AdminManageJobsPage: React.FC<AdminManageJobsPageProps> = ({
  jobs,
  onCreateJob,
  onUpdateJob,
  onDeleteJob,
  onViewJob,
  onShowToast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [jobType, setJobType] = useState<JobType>('Full-Time');
  const [experience, setExperience] = useState('0 - 1 yr (Freshers Welcome)');
  const [deadline, setDeadline] = useState('2026-12-31');
  const [openings, setOpenings] = useState(5);
  const [category, setCategory] = useState('Software Engineering');
  const [formError, setFormError] = useState('');

  const filteredJobs = useMemo(() => {
    return jobs.filter(j => {
      const matchesSearch = 
        j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = selectedType === 'All' || j.jobType === selectedType;

      return matchesSearch && matchesType;
    });
  }, [jobs, searchTerm, selectedType]);

  const openCreateModal = () => {
    setEditingJob(null);
    setTitle('');
    setCompany('');
    setDescription('');
    setSkills('React, Node.js, TypeScript');
    setLocation('Bengaluru, India');
    setSalary('₹12,00,000 / yr');
    setJobType('Full-Time');
    setExperience('0 - 1 yr');
    setDeadline('2026-12-31');
    setOpenings(5);
    setCategory('Software Engineering');
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (job: Job) => {
    setEditingJob(job);
    setTitle(job.title);
    setCompany(job.company);
    setDescription(job.description);
    setSkills(job.skills.join(', '));
    setLocation(job.location);
    setSalary(job.salary);
    setJobType(job.jobType);
    setExperience(job.experience);
    setDeadline(job.deadline);
    setOpenings(job.openings);
    setCategory(job.category);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!title.trim() || !company.trim() || !description.trim() || !location.trim() || !salary.trim()) {
      setFormError('Please complete all mandatory job details.');
      return;
    }

    const parsedSkills = skills
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (editingJob) {
      onUpdateJob(editingJob.id, {
        title: title.trim(),
        company: company.trim(),
        description: description.trim(),
        skills: parsedSkills,
        location: location.trim(),
        salary: salary.trim(),
        jobType,
        experience: experience.trim(),
        deadline,
        openings: Number(openings),
        category: category.trim()
      });
      onShowToast(`Updated "${title}" successfully`, 'success');
    } else {
      onCreateJob({
        title: title.trim(),
        company: company.trim(),
        description: description.trim(),
        skills: parsedSkills,
        location: location.trim(),
        salary: salary.trim(),
        jobType,
        experience: experience.trim(),
        deadline,
        openings: Number(openings),
        category: category.trim(),
        featured: true
      });
      onShowToast(`Created new job posting "${title}"`, 'success');
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteCandidateId) {
      onDeleteJob(deleteCandidateId);
      onShowToast('Job listing removed successfully', 'success');
      setDeleteCandidateId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Job & Internship Catalog Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create, update, and manage job openings visible to college applicants
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Opening</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 flex items-center gap-2.5 px-3 py-2 border border-slate-300 rounded-xl focus-within:ring-2 focus-within:ring-blue-500">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by title, company, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs sm:text-sm text-slate-800 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-4 flex items-center gap-2.5 px-3 py-2 border border-slate-300 rounded-xl">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full text-xs sm:text-sm text-slate-800 bg-transparent focus:outline-none cursor-pointer"
          >
            <option value="All">All Job Types</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-4">Role & Company</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Salary / Stipend</th>
                <th className="py-3 px-4">Openings</th>
                <th className="py-3 px-4">Deadline</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-slate-500">
                    No jobs found matching your search.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div>
                        <span 
                          onClick={() => onViewJob(job)}
                          className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer block"
                        >
                          {job.title}
                        </span>
                        <span className="text-xs text-slate-500">{job.company}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        {job.jobType}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-xs text-slate-600">
                      {job.location}
                    </td>

                    <td className="py-3.5 px-4 text-xs font-mono font-semibold text-slate-800">
                      {job.salary}
                    </td>

                    <td className="py-3.5 px-4 text-xs font-mono text-slate-700">
                      {job.openings}
                    </td>

                    <td className="py-3.5 px-4 text-xs text-slate-500 font-mono">
                      {job.deadline}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onViewJob(job)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View public preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(job)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Edit job"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteCandidateId(job.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete job"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Create / Edit Job Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingJob ? `Edit Job: ${editingJob.title}` : 'Post New Job / Internship'}
        subtitle="Specify role requirements, compensation, and application deadlines"
        maxWidth="2xl"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
          {formError && (
            <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs border border-rose-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{formError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Job Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. SDE Intern / Frontend Engineer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Company Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Google / Microsoft / Razorpay"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Employment / Job Type <span className="text-rose-500">*</span>
              </label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Part-Time">Part-Time</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Job Category
              </label>
              <input
                type="text"
                placeholder="e.g. Software Engineering / Full Stack"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Location <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Bengaluru, India or Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Salary or Stipend <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ₹14,00,000 / yr or ₹50,000 / month"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Experience Requirement
              </label>
              <input
                type="text"
                placeholder="e.g. Fresher / 0-1 yr"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Openings Count
              </label>
              <input
                type="number"
                min={1}
                value={openings}
                onChange={(e) => setOpenings(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Application Deadline <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Required Skills (comma-separated)
              </label>
              <input
                type="text"
                placeholder="e.g. React, Node.js, TypeScript, PostgreSQL"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Job Description & Responsibilities <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              required
              placeholder="Describe the role requirements, expectations, and work environment..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm cursor-pointer"
            >
              {editingJob ? 'Update Job Details' : 'Publish Job'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteCandidateId}
        onClose={() => setDeleteCandidateId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Job Opening"
        message="Are you sure you want to delete this job posting? This action cannot be undone and will remove it from student view."
        confirmLabel="Yes, Delete Job"
        isDestructive={true}
      />

    </div>
  );
};
