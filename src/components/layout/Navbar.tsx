import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Briefcase, 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  ShieldCheck, 
  GraduationCap, 
  FileText, 
  Layers,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, param?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate }) => {
  const { user, role, logout, quickLoginAsStudent, quickLoginAsAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNav = (tab: string, param?: string) => {
    onNavigate(tab, param);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar 3-Zone Contract */}
        <div className="flex items-center justify-between h-16 gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <button 
            onClick={() => handleNav('home')} 
            className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Job<span className="text-blue-600">Connect</span>
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 clean single-line navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNav('home')}
              className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentTab === 'home' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('jobs')}
              className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentTab === 'jobs' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : ''
              }`}
            >
              Find Jobs
            </button>
            <button
              onClick={() => handleNav('internships')}
              className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1 ${
                currentTab === 'internships' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : ''
              }`}
            >
              Internships
            </button>
            {role === 'STUDENT' && (
              <>
                <button
                  onClick={() => handleNav('student-dashboard')}
                  className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1 ${
                    currentTab === 'student-dashboard' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : ''
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleNav('my-applications')}
                  className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1 ${
                    currentTab === 'my-applications' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : ''
                  }`}
                >
                  My Applications
                </button>
              </>
            )}
            {role === 'ADMIN' && (
              <>
                <button
                  onClick={() => handleNav('admin-dashboard')}
                  className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1 ${
                    currentTab === 'admin-dashboard' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : ''
                  }`}
                >
                  Admin Console
                </button>
                <button
                  onClick={() => handleNav('admin-jobs')}
                  className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1 ${
                    currentTab === 'admin-jobs' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : ''
                  }`}
                >
                  Manage Jobs
                </button>
                <button
                  onClick={() => handleNav('admin-applications')}
                  className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1 ${
                    currentTab === 'admin-applications' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : ''
                  }`}
                >
                  Applications
                </button>
              </>
            )}
          </nav>

          {/* Zone 3: 1 Primary Action & User Profile */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Role Tester Switcher */}
            <div className="hidden lg:flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs">
              <button
                type="button"
                onClick={quickLoginAsStudent}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  role === 'STUDENT' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to Student view (Katari Anil)"
              >
                Student View
              </button>
              <button
                type="button"
                onClick={quickLoginAsAdmin}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  role === 'ADMIN' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to Admin view"
              >
                Admin View
              </button>
            </div>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white transition-colors text-sm font-medium text-slate-800"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline-block max-w-[120px] truncate">{user.name}</span>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-500">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
                      <p className="text-xs text-blue-600 font-medium capitalize mt-0.5">
                        {role === 'ADMIN' ? 'Administrator' : 'Student Member'}
                      </p>
                    </div>

                    {role === 'STUDENT' ? (
                      <>
                        <button
                          onClick={() => handleNav('student-dashboard')}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <Layers className="w-4 h-4 text-slate-500" />
                          Student Dashboard
                        </button>
                        <button
                          onClick={() => handleNav('my-applications')}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <FileText className="w-4 h-4 text-slate-500" />
                          My Applications
                        </button>
                        <button
                          onClick={() => handleNav('profile')}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <UserIcon className="w-4 h-4 text-slate-500" />
                          My Profile
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleNav('admin-dashboard')}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <ShieldCheck className="w-4 h-4 text-slate-500" />
                          Admin Dashboard
                        </button>
                        <button
                          onClick={() => handleNav('admin-jobs')}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <Briefcase className="w-4 h-4 text-slate-500" />
                          Manage Jobs
                        </button>
                        <button
                          onClick={() => handleNav('admin-applications')}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <FileText className="w-4 h-4 text-slate-500" />
                          Review Applications
                        </button>
                      </>
                    )}

                    <div className="border-t border-slate-100 my-1"></div>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        handleNav('home');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => handleNav('login')}
                  className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors whitespace-nowrap"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNav('register')}
                  className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-500/20 transition-all whitespace-nowrap"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 px-1">
              <span className="text-xs text-slate-500 font-medium">Switch Preview Persona:</span>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-md">
                <button
                  onClick={() => { quickLoginAsStudent(); setMobileMenuOpen(false); }}
                  className={`px-2 py-0.5 text-xs rounded font-medium ${role === 'STUDENT' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'}`}
                >
                  Student
                </button>
                <button
                  onClick={() => { quickLoginAsAdmin(); setMobileMenuOpen(false); }}
                  className={`px-2 py-0.5 text-xs rounded font-medium ${role === 'ADMIN' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'}`}
                >
                  Admin
                </button>
              </div>
            </div>

            <button
              onClick={() => handleNav('home')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentTab === 'home' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('jobs')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentTab === 'jobs' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Find Jobs
            </button>
            <button
              onClick={() => handleNav('internships')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentTab === 'internships' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Internships
            </button>

            {role === 'STUDENT' && (
              <>
                <button
                  onClick={() => handleNav('student-dashboard')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                    currentTab === 'student-dashboard' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleNav('my-applications')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                    currentTab === 'my-applications' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  My Applications
                </button>
                <button
                  onClick={() => handleNav('profile')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                    currentTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Profile
                </button>
              </>
            )}

            {role === 'ADMIN' && (
              <>
                <button
                  onClick={() => handleNav('admin-dashboard')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                    currentTab === 'admin-dashboard' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Admin Dashboard
                </button>
                <button
                  onClick={() => handleNav('admin-jobs')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                    currentTab === 'admin-jobs' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Manage Jobs
                </button>
                <button
                  onClick={() => handleNav('admin-applications')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                    currentTab === 'admin-applications' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Manage Applications
                </button>
              </>
            )}

            {!user ? (
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => handleNav('login')}
                  className="w-full py-2.5 text-center text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNav('register')}
                  className="w-full py-2.5 text-center text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm"
                >
                  Register as Student
                </button>
              </div>
            ) : (
              <div className="pt-2">
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    handleNav('home');
                  }}
                  className="w-full py-2.5 text-center text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
