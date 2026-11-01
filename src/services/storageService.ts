import { Job, Application, User, ApplicationStatus } from '../types';
import { INITIAL_JOBS, INITIAL_STUDENT, INITIAL_ADMIN, INITIAL_APPLICATIONS } from '../data/initialData';

const STORAGE_KEYS = {
  JOBS: 'jobconnect_jobs_v1',
  APPLICATIONS: 'jobconnect_applications_v1',
  USERS: 'jobconnect_users_v1',
  CURRENT_USER: 'jobconnect_current_user_v1',
  AUTH_TOKEN: 'jobconnect_auth_token_v1'
};

export class JobConnectStorage {
  // Initialize default data if not present
  static init() {
    if (!localStorage.getItem(STORAGE_KEYS.JOBS)) {
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(INITIAL_JOBS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([INITIAL_STUDENT, INITIAL_ADMIN]));
    }
  }

  // --- JOBS ---
  static getJobs(): Job[] {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.JOBS);
      return data ? JSON.parse(data) : INITIAL_JOBS;
    } catch {
      return INITIAL_JOBS;
    }
  }

  static getJobById(id: string): Job | undefined {
    return this.getJobs().find(j => j.id === id);
  }

  static createJob(jobData: Omit<Job, 'id' | 'postedDate'>): Job {
    const jobs = this.getJobs();
    const newJob: Job = {
      ...jobData,
      id: `job-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0]
    };
    jobs.unshift(newJob);
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
    return newJob;
  }

  static updateJob(id: string, updates: Partial<Job>): Job | null {
    const jobs = this.getJobs();
    const index = jobs.findIndex(j => j.id === id);
    if (index === -1) return null;
    
    jobs[index] = { ...jobs[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
    return jobs[index];
  }

  static deleteJob(id: string): boolean {
    const jobs = this.getJobs();
    const filtered = jobs.filter(j => j.id !== id);
    if (filtered.length === jobs.length) return false;
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(filtered));
    return true;
  }

  // --- APPLICATIONS ---
  static getApplications(): Application[] {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      return data ? JSON.parse(data) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  }

  static getMyApplications(userId: string): Application[] {
    return this.getApplications().filter(a => a.userId === userId);
  }

  static hasApplied(userId: string, jobId: string): boolean {
    return this.getApplications().some(a => a.userId === userId && a.jobId === jobId);
  }

  static applyForJob(applicationData: Omit<Application, 'id' | 'appliedAt' | 'updatedAt' | 'status'>): Application {
    const applications = this.getApplications();
    // Prevent duplicate application
    const existing = applications.find(a => a.userId === applicationData.userId && a.jobId === applicationData.jobId);
    if (existing) {
      throw new Error('You have already applied for this position.');
    }

    const now = new Date().toISOString();
    const newApp: Application = {
      ...applicationData,
      id: `app-${Date.now()}`,
      status: 'Applied',
      appliedAt: now,
      updatedAt: now
    };

    applications.unshift(newApp);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    return newApp;
  }

  static updateApplicationStatus(id: string, status: ApplicationStatus, notes?: string): Application | null {
    const applications = this.getApplications();
    const index = applications.findIndex(a => a.id === id);
    if (index === -1) return null;

    applications[index] = {
      ...applications[index],
      status,
      updatedAt: new Date().toISOString(),
      ...(notes !== undefined ? { notes } : {})
    };
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    return applications[index];
  }

  // --- USERS & AUTH ---
  static getUsers(): User[] {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      return data ? JSON.parse(data) : [INITIAL_STUDENT, INITIAL_ADMIN];
    } catch {
      return [INITIAL_STUDENT, INITIAL_ADMIN];
    }
  }

  static getUserById(id: string): User | undefined {
    return this.getUsers().find(u => u.id === id);
  }

  static getUserByEmail(email: string): User | undefined {
    return this.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  static registerStudent(userData: Omit<User, 'id' | 'createdAt' | 'role'>): User {
    const users = this.getUsers();
    if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      throw new Error('An account with this email already exists.');
    }

    const newUser: User = {
      ...userData,
      id: `usr-student-${Date.now()}`,
      role: 'STUDENT',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return newUser;
  }

  static updateUserProfile(id: string, updates: Partial<User>): User | null {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;

    users[index] = { ...users[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // Also update in current user session if it is the active user
    const current = this.getCurrentUser();
    if (current && current.id === id) {
      this.setCurrentUser(users[index]);
    }

    // Also update applicant display details across applications
    const applications = this.getApplications();
    let updatedApps = false;
    applications.forEach((app, i) => {
      if (app.userId === id) {
        applications[i] = {
          ...app,
          studentName: updates.name || app.studentName,
          studentPhone: updates.phone || app.studentPhone,
          studentCollege: updates.college || app.studentCollege,
          studentDegree: updates.degree || app.studentDegree,
          studentBranch: updates.branch || app.studentBranch
        };
        updatedApps = true;
      }
    });
    if (updatedApps) {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    }

    return users[index];
  }

  // --- SESSION ---
  static getCurrentUser(): User | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  static setCurrentUser(user: User | null) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, `jwt-token-${user.id}-${Date.now()}`);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    }
  }

  // Reset to default dataset
  static resetToDefaults() {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(INITIAL_JOBS));
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([INITIAL_STUDENT, INITIAL_ADMIN]));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(INITIAL_STUDENT));
  }
}
