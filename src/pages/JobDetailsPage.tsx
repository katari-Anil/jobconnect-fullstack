import React from 'react';
import { Job } from '../types';
import { 
  ArrowLeft, 
  MapPin, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  Clock, 
  Users, 
  Share2, 
  CheckCircle2, 
  Building,
  GraduationCap
} from 'lucide-react';

interface JobDetailsPageProps {
  job: Job | null;
  onBack: () => void;
  onApply: (job: Job) => void;
  hasApplied: boolean;
}

export const JobDetailsPage: React.FC<JobDetailsPageProps> = ({
  job,
  onBack,
  onApply,
  hasApplied
}) => {
  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-600">No job selected.</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to all opportunities</span>
      </button>

      {/* Main Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-2xl text-slate-800 shrink-0">
              {job.company.charAt(0)}
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  {job.jobType}
                </span>
                <span className="text-xs text-slate-400 font-mono">Job ID: {job.id}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-600 font-medium">
                <span className="font-bold text-slate-900">{job.company}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {job.location}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Posted {job.postedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0">
            {hasApplied ? (
              <div className="px-5 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-sm font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Application Submitted</span>
              </div>
            ) : (
              <button
                onClick={() => onApply(job)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                Apply for this Role
              </button>
            )}

            <p className="text-[11px] text-slate-400">
              Application Deadline: <strong className="text-slate-700">{job.deadline}</strong>
            </p>
          </div>

        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[11px] text-slate-400 font-semibold uppercase">Offered Package</p>
            <p className="text-sm font-bold text-slate-900 font-mono tabular-nums mt-0.5">{job.salary}</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[11px] text-slate-400 font-semibold uppercase">Experience Required</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{job.experience}</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[11px] text-slate-400 font-semibold uppercase">Total Openings</p>
            <p className="text-sm font-bold text-slate-900 font-mono tabular-nums mt-0.5">{job.openings} Positions</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[11px] text-slate-400 font-semibold uppercase">Category</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{job.category}</p>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Job Description & Requirements */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
          
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3">About the Position</h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-3">Requirements & Eligibility</h2>
              <ul className="space-y-2.5">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-3">Required Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Hiring Workflow */}
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2">
              Recruitment Evaluation Process
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-700">
              <div className="p-2 bg-white rounded-lg border border-blue-100">
                <span className="font-bold text-blue-600 block">Round 1:</span> Profile & Resume Screening
              </div>
              <div className="p-2 bg-white rounded-lg border border-blue-100">
                <span className="font-bold text-blue-600 block">Round 2:</span> Technical & Coding Assessment
              </div>
              <div className="p-2 bg-white rounded-lg border border-blue-100">
                <span className="font-bold text-blue-600 block">Round 3:</span> System Design & Culture Fit
              </div>
            </div>
          </div>

          {/* Bottom Apply Action */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Ready to take the next step in your career journey?
            </p>
            {hasApplied ? (
              <span className="text-xs font-semibold text-emerald-700">
                Already Applied
              </span>
            ) : (
              <button
                onClick={() => onApply(job)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                Apply Now
              </button>
            )}
          </div>

        </div>

        {/* Right Sidebar: Company Info & Security note */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <Building className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">About {job.company}</h3>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              {job.company} is an industry leader recognized globally for innovation, engineering culture, and competitive benefits for university talent.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Company Size</span>
                <span className="font-semibold text-slate-800">10,000+ employees</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Industry</span>
                <span className="font-semibold text-slate-800">Internet & Cloud</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Headquarters</span>
                <span className="font-semibold text-slate-800">{job.location}</span>
              </div>
            </div>
          </div>

          {/* Student Protection Notice */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 text-xs text-slate-600 space-y-2">
            <p className="font-bold text-slate-900">Safe Job Guarantee</p>
            <p className="leading-relaxed">
              JobConnect never charges application fees. All job postings are verified by our talent operations team.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
