import React from 'react';
import { Briefcase, Github, Linkedin, ExternalLink, Heart, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Job<span className="text-blue-500">Connect</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The modern career launchpad empowering college students and early-career talent to discover verified internships, full-time engineering roles, and track applications with transparency.
            </p>

            <div className="pt-2">
              <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">
                Lead Project Architect
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/katari-Anil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-white" />
                  <span>katari-Anil</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
                <a
                  href="https://www.linkedin.com/in/katari-anil-b95157314"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Opportunities
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-white transition-colors">
                  Explore All Jobs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('internships')} className="hover:text-white transition-colors">
                  Summer Internships
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-white transition-colors">
                  Remote Tech Positions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jobs')} className="hover:text-white transition-colors">
                  Freshers Placements
                </button>
              </li>
            </ul>
          </div>

          {/* Portals */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Portals
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate('student-dashboard')} className="hover:text-white transition-colors">
                  Student Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('my-applications')} className="hover:text-white transition-colors">
                  Application Tracker
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('profile')} className="hover:text-white transition-colors">
                  Student Profile & Resume
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin-dashboard')} className="hover:text-white transition-colors">
                  Recruiter / Admin Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Tech Stack & Architecture */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Technology Stack
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Engineered with React 19, TypeScript, Tailwind CSS, Node.js Express REST API, PostgreSQL, and Prisma ORM.
            </p>
            <div className="pt-2 text-xs text-slate-400">
              <p className="text-slate-300 font-medium">Developed by Katari Anil</p>
              <p className="text-slate-500">CSE Student & Full Stack Developer</p>
            </div>
          </div>
        </div>

        {/* Bottom Attribution & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <p>© 2026 JobConnect. All Rights Reserved.</p>
          </div>

          <div className="flex items-center gap-1.5 text-center">
            <span>Developed with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>by</span>
            <a
              href="https://github.com/katari-Anil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-semibold hover:text-blue-400 underline underline-offset-2 transition-colors"
            >
              Katari Anil
            </a>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">CSE Student</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/katari-Anil"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub: https://github.com/katari-Anil</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
