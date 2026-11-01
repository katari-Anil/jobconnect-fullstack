import React, { useState } from 'react';
import { Job } from '../types';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Building2, 
  ArrowRight, 
  CheckCircle, 
  Award, 
  TrendingUp, 
  Users, 
  Sparkles,
  ExternalLink,
  Code2,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';

interface HomePageProps {
  jobs: Job[];
  onNavigate: (tab: string, param?: string) => void;
  onSelectJob: (job: Job) => void;
  onApplyJob: (job: Job) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  jobs,
  onNavigate,
  onSelectJob,
  onApplyJob
}) => {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const featuredJobs = jobs.filter(j => j.featured).slice(0, 4);
  const latestInternships = jobs.filter(j => j.jobType === 'Internship').slice(0, 3);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('jobs');
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-blue-50/60 via-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Quiet editorial kicker */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100/80 text-blue-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>2026 Campus Placement & Internship Season Live</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
                Find Your Dream Job or <span className="text-blue-600">Internship</span>
              </h1>

              <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                Discover opportunities, build your career, and connect with companies looking for talented students.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('jobs')}
                  className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Jobs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 shadow-xs transition-all cursor-pointer"
                >
                  Get Started
                </button>
              </div>

              {/* Search Bar Container */}
              <form 
                onSubmit={handleSearchSubmit}
                className="mt-8 p-2.5 bg-white rounded-2xl shadow-lg border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-2"
              >
                <div className="sm:col-span-5 flex items-center gap-2.5 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-200">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search by job title, skill, or company..."
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    className="w-full text-xs sm:text-sm text-slate-800 focus:outline-none placeholder:text-slate-400"
                  />
                </div>

                <div className="sm:col-span-4 flex items-center gap-2.5 px-3 py-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Location (e.g. Bengaluru, Remote)..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full text-xs sm:text-sm text-slate-800 focus:outline-none placeholder:text-slate-400"
                  />
                </div>

                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="w-full h-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Find Roles</span>
                  </button>
                </div>
              </form>

              {/* Quick Trust Metrics */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200/80 text-left">
                <div>
                  <p className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">500+</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Verified Openings</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">98%</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Response Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">₹12 LPA</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Average Package</p>
                </div>
              </div>

            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[16/10] bg-slate-100">
                <img
                  src="/src/assets/images/hero_career_students_1793538221566.jpg"
                  alt="College students discovering tech careers on JobConnect"
                  className="w-full h-full object-cover"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white p-3 rounded-xl bg-slate-900/70 backdrop-blur-md border border-white/10">
                  <p className="text-xs font-semibold text-blue-300">Campus Recruitment Platform</p>
                  <p className="text-sm font-bold mt-0.5">Trusted by top universities & engineering graduates</p>
                </div>
              </div>

              {/* Float Highlight Badge */}
              <div className="absolute -bottom-5 -left-5 bg-white p-3.5 rounded-xl shadow-xl border border-slate-200 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Direct Recruiter Access</p>
                  <p className="text-[11px] text-slate-500">Zero middleman application tracking</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* DEVELOPER SHOWCASE CREDIT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-blue-900/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300 shrink-0">
              <Code2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-blue-400 font-bold">Architecture & Engineering</span>
                <span className="text-slate-400">·</span>
                <span className="text-xs text-slate-300">Full Stack System</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                Developed by Katari Anil
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Computer Science & Engineering Student | Full Stack Developer specializing in React, Node.js Express, PostgreSQL & Cloud Architectures.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://github.com/katari-Anil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm"
            >
              <span>View GitHub Profile</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/katari-anil-b95157314"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-colors"
            >
              <span>Connect on LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. POPULAR COMPANIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-6">
          Top Tech Companies Actively Hiring on JobConnect
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-80 grayscale hover:grayscale-0 transition-all">
          <span className="text-lg md:text-xl font-bold text-slate-700 tracking-tight">Google</span>
          <span className="text-lg md:text-xl font-bold text-slate-700 tracking-tight">Microsoft</span>
          <span className="text-lg md:text-xl font-bold text-slate-700 tracking-tight">Amazon</span>
          <span className="text-lg md:text-xl font-bold text-slate-700 tracking-tight">Adobe</span>
          <span className="text-lg md:text-xl font-bold text-slate-700 tracking-tight">Razorpay</span>
          <span className="text-lg md:text-xl font-bold text-slate-700 tracking-tight">Swiggy</span>
          <span className="text-lg md:text-xl font-bold text-slate-700 tracking-tight">Infosys</span>
          <span className="text-lg md:text-xl font-bold text-slate-700 tracking-tight">TCS</span>
        </div>
      </section>

      {/* 3. FEATURED JOBS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Featured Opportunities
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Hand-picked verified roles from high-growth technology leaders
            </p>
          </div>
          <button
            onClick={() => onNavigate('jobs')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            <span>View All {jobs.length} Positions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredJobs.map((job) => (
            <div
              key={job.id}
              className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-lg">
                      {job.company.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="font-semibold text-slate-700">{job.company}</span>
                        <span>·</span>
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                    {job.jobType}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-4 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {job.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 4 && (
                    <span className="text-[11px] text-slate-400 self-center">
                      +{job.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Compensation</p>
                  <p className="text-sm font-bold text-slate-900 font-mono tabular-nums">
                    {job.salary}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectJob(job)}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onApplyJob(job)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. LATEST INTERNSHIPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>For College Students</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Latest College Internships
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Gain practical engineering experience with competitive stipends
            </p>
          </div>
          <button
            onClick={() => onNavigate('internships')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            <span>View All Internships</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestInternships.map((job) => (
            <div
              key={job.id}
              className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    Stipend {job.salary}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Deadline: {job.deadline}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mt-3 hover:text-blue-600 transition-colors">
                  {job.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {job.company} · {job.location}
                </p>

                <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono tabular-nums">
                  {job.openings} Openings
                </span>
                <button
                  onClick={() => onApplyJob(job)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg border border-blue-600 transition-colors"
                >
                  Quick Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              How JobConnect Works
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Four streamlined steps to land your next high-impact career opportunity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-base mb-4 font-mono">
                01
              </div>
              <h3 className="text-base font-bold text-slate-900">Create Student Profile</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Add your college, degree, graduation year, core technical skills, and upload your verified PDF resume.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-base mb-4 font-mono">
                02
              </div>
              <h3 className="text-base font-bold text-slate-900">Discover Opportunities</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Filter by full-time, internships, remote roles, salary packages, and technical requirements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-base mb-4 font-mono">
                03
              </div>
              <h3 className="text-base font-bold text-slate-900">Apply with One Click</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Submit tailored applications with personalized cover letters directly to verified recruiting managers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-base mb-4 font-mono">
                04
              </div>
              <h3 className="text-base font-bold text-slate-900">Track Progress Live</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Receive live status updates from Shortlisted to Interview and Selection directly on your student dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STUDENT SUCCESS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-200 shadow-xl aspect-[4/3] bg-slate-100">
            <img
              src="/src/assets/images/student_career_success_1793538223069.jpg"
              alt="Graduates celebrating job offers"
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Campus Placement Impact</span>
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Empowering Students Across 120+ Universities
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              JobConnect removes the guesswork from early-career recruitment. Students can track every submitted application in real-time, while hiring managers review authentic candidate resumes and GitHub profiles directly.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-700">
                  <strong className="text-slate-900">Direct Recruiter Oversight:</strong> Applications go directly to verified HR managers with no automated resume-drop black holes.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-700">
                  <strong className="text-slate-900">Role-Based System:</strong> Distinct portals for students to manage applications and recruiters to evaluate candidate credentials.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-700">
                  <strong className="text-slate-900">Complete Transparency:</strong> Instant live updates when candidates move from Applied to Shortlisted, Interview, or Selected.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('register')}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-colors"
              >
                Register as a Student Today
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ABOUT SECTION (Created & Developed by Katari Anil) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 text-left">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              About The Project
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Created & Developed by Katari Anil
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              JobConnect was architected and built by <strong>Katari Anil</strong>, a dedicated Computer Science & Engineering student and Full Stack Developer. The system bridges the gap between ambitious college undergraduates and industry recruiters by delivering a modern, responsive, and secure recruitment management application.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Designed as an end-to-end full-stack portfolio initiative, JobConnect integrates strict TypeScript typing, modular React components, role-based access control (RBAC), and REST API architecture backed by a PostgreSQL database schema with Prisma ORM.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="https://github.com/katari-Anil"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
              >
                <span>GitHub: katari-Anil</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/katari-anil-b95157314"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
              >
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
