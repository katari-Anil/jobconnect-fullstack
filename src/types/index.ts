export type UserRole = 'STUDENT' | 'ADMIN';

export type JobType = 'Full-Time' | 'Part-Time' | 'Internship' | 'Remote' | 'Hybrid';

export type ApplicationStatus = 
  | 'Applied' 
  | 'Under Review' 
  | 'Shortlisted' 
  | 'Interview' 
  | 'Selected' 
  | 'Rejected';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  college?: string;
  degree?: string;
  branch?: string;
  graduationYear?: number;
  skills?: string[];
  resumeUrl?: string;
  resumeFileName?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  bio?: string;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  description: string;
  requirements?: string[];
  skills: string[];
  location: string;
  jobType: JobType;
  salary: string; // e.g. "₹8,00,000 - ₹12,00,000 / yr" or "₹25,000 / month"
  experience: string; // e.g. "Fresher / 0-1 yr"
  deadline: string; // e.g. "2026-12-15"
  openings: number;
  category: string;
  postedDate: string;
  featured?: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyLogo?: string;
  location: string;
  jobType: JobType;
  userId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  studentCollege: string;
  studentDegree: string;
  studentBranch: string;
  studentGraduationYear?: number;
  skills: string[];
  resumeUrl: string;
  resumeFileName: string;
  coverLetter?: string;
  status: ApplicationStatus;
  appliedAt: string;
  updatedAt: string;
  notes?: string;
}

export interface NotificationMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
