import React, { useState, useMemo } from 'react';
import { Job, JobType } from '../types';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Filter, 
  SlidersHorizontal, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpDown,
  Building,
  CheckCircle2
} from 'lucide-react';

interface JobsPageProps {
  jobs: Job[];
  initialType?: JobType | 'All';
  onSelectJob: (job: Job) => void;
  onApplyJob: (job: Job) => void;
  hasApplied: (jobId: string) => boolean;
}

export const JobsPage: React.FC<JobsPageProps> = ({
  jobs,
  initialType = 'All',
  onSelectJob,
  onApplyJob,
  hasApplied
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [selectedType, setSelectedType] = useState<string>(initialType);
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'latest' | 'openings' | 'company'>('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const pageSize = 6;

  // Extract all unique locations and skills
  const allLocations = useMemo(() => {
    const locs = new Set<string>();
    jobs.forEach(j => {
      const city = j.location.split(',')[0].trim();
      locs.add(city);
    });
    return Array.from(locs);
  }, [jobs]);

  const allSkills = useMemo(() => {
    const skills = new Set<string>();
    jobs.forEach(j => j.skills.forEach(s => skills.add(s)));
    return Array.from(skills).sort();
  }, [jobs]);

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesLocation = 
        !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());

      const matchesCompany = 
        !companyFilter || job.company.toLowerCase().includes(companyFilter.toLowerCase());

      const matchesType = 
        selectedType === 'All' || job.jobType === selectedType;

      const matchesSkill = 
        selectedSkill === 'All' || job.skills.includes(selectedSkill);

      return matchesSearch && matchesLocation && matchesCompany && matchesType && matchesSkill;
    }).sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      }
      if (sortBy === 'openings') {
        return b.openings - a.openings;
      }
      if (sortBy === 'company') {
        return a.company.localeCompare(b.company);
      }
      return 0;
    });
  }, [jobs, searchTerm, locationFilter, companyFilter, selectedType, selectedSkill, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / pageSize) || 1;
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const resetFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setCompanyFilter('');
    setSelectedType('All');
    setSelectedSkill('All');
    setSortBy('latest');
    setCurrentPage(1);
  };

  const jobTypes: (JobType | 'All')[] = ['All', 'Full-Time', 'Internship', 'Remote', 'Hybrid', 'Part-Time'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {initialType === 'Internship' ? 'Student Internships' : 'Explore Jobs & Internships'}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Find verified openings, filter by skills, and apply directly to recruiters
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="latest">Latest Posted</option>
                <option value="openings">Most Openings</option>
                <option value="company">Company Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Inputs Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 flex items-center gap-2.5 px-3 py-2.5 border border-slate-300 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by title, skill, or keywords..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full text-xs sm:text-sm text-slate-800 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-3 flex items-center gap-2.5 px-3 py-2.5 border border-slate-300 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Location..."
              value={locationFilter}
              onChange={(e) => { setLocationFilter(e.target.value); setCurrentPage(1); }}
              className="w-full text-xs sm:text-sm text-slate-800 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-3 flex items-center gap-2.5 px-3 py-2.5 border border-slate-300 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            <Building className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Company..."
              value={companyFilter}
              onChange={(e) => { setCompanyFilter(e.target.value); setCurrentPage(1); }}
              className="w-full text-xs sm:text-sm text-slate-800 focus:outline-none"
            />
          </div>
        </div>

        {/* Interactive Segmented Job Type Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-4 mt-2 border-t border-slate-100 no-scrollbar">
          <span className="text-xs text-slate-400 font-medium mr-2 whitespace-nowrap">Job Type:</span>
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => { setSelectedType(type); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedType === type
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-left">
        
        {/* Desktop Filter Sidebar */}
        <aside className={`md:col-span-4 lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-6 ${mobileFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span>Filters</span>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Quick Filter: Tech Skill */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Filter by Skill
            </label>
            <select
              value={selectedSkill}
              onChange={(e) => { setSelectedSkill(e.target.value); setCurrentPage(1); }}
              className="w-full p-2 text-xs border border-slate-200 rounded-lg text-slate-700 bg-slate-50 focus:outline-none"
            >
              <option value="All">All Tech Skills</option>
              {allSkills.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Quick Filter: Locations */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Popular Cities
            </label>
            <div className="space-y-1">
              {['Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Remote'].map((city) => (
                <button
                  key={city}
                  onClick={() => { setLocationFilter(locationFilter === city ? '' : city); setCurrentPage(1); }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    locationFilter === city
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Recruiter / Placement Note */}
          <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-900 space-y-1">
            <p className="font-bold">Student Advantage</p>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Every listed internship and job includes transparent salary or stipend disclosures and direct application tracking.
            </p>
          </div>
        </aside>

        {/* Job Listings Column */}
        <main className="md:col-span-8 lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
            <span>
              Showing <strong className="text-slate-800 font-mono">{filteredJobs.length}</strong> opportunities
            </span>
            <span>
              Page <strong className="text-slate-800 font-mono">{currentPage}</strong> of <strong className="text-slate-800 font-mono">{totalPages}</strong>
            </span>
          </div>

          {paginatedJobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No matching jobs or internships found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try loosening your search keywords, clearing selected filters, or exploring other technology categories.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedJobs.map((job) => {
                const applied = hasApplied(job.id);
                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-400 hover:shadow-sm transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      
                      {/* Left: Company & Title */}
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-800 text-lg shrink-0">
                          {job.company.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 
                              onClick={() => onSelectJob(job)}
                              className="text-base font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors"
                            >
                              {job.title}
                            </h3>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                            <span className="font-semibold text-slate-800">{job.company}</span>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {job.location}
                            </span>
                            <span>·</span>
                            <span>Posted {job.postedDate}</span>
                          </div>

                          {/* Skill Tags */}
                          <div className="flex flex-wrap items-center gap-1.5 mt-3">
                            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                              {job.jobType}
                            </span>
                            {job.skills.map(s => (
                              <span key={s} className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-600">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Salary & Actions */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <div className="text-left sm:text-right">
                          <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Compensation</p>
                          <p className="text-sm font-bold text-slate-900 font-mono tabular-nums">{job.salary}</p>
                          <p className="text-[11px] text-slate-500 font-mono tabular-nums">{job.openings} Openings</p>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onSelectJob(job)}
                            className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                          >
                            Details
                          </button>
                          
                          {applied ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Applied</span>
                            </span>
                          ) : (
                            <button
                              onClick={() => onApplyJob(job)}
                              className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                            >
                              Apply Now
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>

      </div>
    </div>
  );
};
