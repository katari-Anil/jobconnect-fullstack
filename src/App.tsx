import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Job, Application, UserRole, NotificationMessage } from './types';
import { JobConnectStorage } from './services/storageService';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/Toast';
import { HomePage } from './pages/HomePage';
import { JobsPage } from './pages/JobsPage';
import { JobDetailsPage } from './pages/JobDetailsPage';
import { ApplyJobModal } from './components/jobs/ApplyJobModal';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { MyApplicationsPage } from './pages/MyApplicationsPage';
import { StudentProfilePage } from './pages/StudentProfilePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminManageJobsPage } from './pages/AdminManageJobsPage';
import { AdminManageApplicationsPage } from './pages/AdminManageApplicationsPage';
import { NotFoundPage } from './pages/NotFoundPage';

const MainApp: React.FC = () => {
  const { user, role, isAuthenticated } = useAuth();

  // Navigation tab state
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyingJob, setApplyingJob] = useState<Job | null>(null);

  // Core synchronized datasets
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const newNotif: NotificationMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      message,
      type
    };
    setNotifications(prev => [...prev, newNotif]);
    setTimeout(() => {
      dismissToast(newNotif.id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Reload data from JobConnectStorage
  const refreshData = () => {
    setJobs(JobConnectStorage.getJobs());
    setApplications(JobConnectStorage.getApplications());
    setUsers(JobConnectStorage.getUsers());
  };

  useEffect(() => {
    JobConnectStorage.init();
    refreshData();
  }, []);

  // Navigation handler
  const handleNavigate = (tab: string, param?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Role check guards
    if (tab.startsWith('admin-') && role !== 'ADMIN') {
      setCurrentTab('login');
      showToast('Admin credentials required to access the admin portal.', 'error');
      return;
    }

    if ((tab === 'student-dashboard' || tab === 'my-applications' || tab === 'profile') && role !== 'STUDENT') {
      setCurrentTab('login');
      showToast('Please sign in as a student to access this portal.', 'info');
      return;
    }

    setCurrentTab(tab);
  };

  // Job selection and application flow
  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
    setCurrentTab('job-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenApply = (job: Job) => {
    if (!isAuthenticated) {
      setCurrentTab('login');
      showToast('Please sign in or register to submit an application.', 'info');
      return;
    }
    if (role === 'ADMIN') {
      showToast('You are currently signed in as Administrator. Switch to Student view to apply.', 'info');
      return;
    }
    setApplyingJob(job);
  };

  const handleApplicationSuccess = (newApp: Application) => {
    refreshData();
    showToast(`Application for ${newApp.jobTitle} submitted successfully!`, 'success');
  };

  // Job CRUD handlers
  const handleCreateJob = (jobData: Omit<Job, 'id' | 'postedDate'>) => {
    JobConnectStorage.createJob(jobData);
    refreshData();
  };

  const handleUpdateJob = (id: string, updates: Partial<Job>) => {
    JobConnectStorage.updateJob(id, updates);
    refreshData();
    if (selectedJob && selectedJob.id === id) {
      setSelectedJob({ ...selectedJob, ...updates });
    }
  };

  const handleDeleteJob = (id: string) => {
    JobConnectStorage.deleteJob(id);
    refreshData();
    if (selectedJob && selectedJob.id === id) {
      setSelectedJob(null);
      setCurrentTab('jobs');
    }
  };

  // Application status update handler (Admin action)
  const handleUpdateApplicationStatus = (id: string, status: any, notes?: string) => {
    JobConnectStorage.updateApplicationStatus(id, status, notes);
    refreshData();
  };

  const hasApplied = (jobId: string) => {
    if (!user) return false;
    return applications.some(a => a.userId === user.id && a.jobId === jobId);
  };

  // Render active page
  const renderPage = () => {
    switch (currentTab) {
      case 'home':
        return (
          <HomePage
            jobs={jobs}
            onNavigate={handleNavigate}
            onSelectJob={handleSelectJob}
            onApplyJob={handleOpenApply}
          />
        );

      case 'jobs':
        return (
          <JobsPage
            jobs={jobs}
            initialType="All"
            onSelectJob={handleSelectJob}
            onApplyJob={handleOpenApply}
            hasApplied={hasApplied}
          />
        );

      case 'internships':
        return (
          <JobsPage
            jobs={jobs}
            initialType="Internship"
            onSelectJob={handleSelectJob}
            onApplyJob={handleOpenApply}
            hasApplied={hasApplied}
          />
        );

      case 'job-details':
        return (
          <JobDetailsPage
            job={selectedJob}
            onBack={() => setCurrentTab('jobs')}
            onApply={handleOpenApply}
            hasApplied={selectedJob ? hasApplied(selectedJob.id) : false}
          />
        );

      case 'student-dashboard':
        return (
          <StudentDashboard
            jobs={jobs}
            applications={applications}
            onNavigate={handleNavigate}
            onSelectJob={handleSelectJob}
            onApplyJob={handleOpenApply}
          />
        );

      case 'my-applications':
        return (
          <MyApplicationsPage
            applications={applications}
            onNavigate={handleNavigate}
          />
        );

      case 'profile':
        return (
          <StudentProfilePage
            onShowToast={showToast}
          />
        );

      case 'login':
      case 'admin-login':
        return (
          <LoginPage
            onNavigate={handleNavigate}
            onSuccess={(loggedRole) => {
              refreshData();
              showToast(`Welcome! Signed in as ${loggedRole === 'ADMIN' ? 'Administrator' : 'Student'}`, 'success');
              if (loggedRole === 'ADMIN') {
                setCurrentTab('admin-dashboard');
              } else {
                setCurrentTab('student-dashboard');
              }
            }}
          />
        );

      case 'register':
        return (
          <RegisterPage
            onNavigate={handleNavigate}
            onSuccess={() => {
              refreshData();
              showToast('Student registration completed! Welcome to JobConnect.', 'success');
              setCurrentTab('student-dashboard');
            }}
          />
        );

      case 'admin-dashboard':
        return (
          <AdminDashboard
            jobs={jobs}
            applications={applications}
            users={users}
            onNavigate={handleNavigate}
            onOpenCreateJob={() => setCurrentTab('admin-jobs')}
          />
        );

      case 'admin-jobs':
        return (
          <AdminManageJobsPage
            jobs={jobs}
            onCreateJob={handleCreateJob}
            onUpdateJob={handleUpdateJob}
            onDeleteJob={handleDeleteJob}
            onViewJob={handleSelectJob}
            onShowToast={showToast}
          />
        );

      case 'admin-applications':
        return (
          <AdminManageApplicationsPage
            applications={applications}
            onUpdateStatus={handleUpdateApplicationStatus}
            onShowToast={showToast}
          />
        );

      default:
        return <NotFoundPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Top Navigation */}
      <Navbar currentTab={currentTab} onNavigate={handleNavigate} />

      {/* Main Page Body */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Apply Job Modal */}
      <ApplyJobModal
        isOpen={!!applyingJob}
        onClose={() => setApplyingJob(null)}
        job={applyingJob}
        onSuccess={handleApplicationSuccess}
      />

      {/* Reusable Toast Stack */}
      <ToastContainer
        notifications={notifications}
        onDismiss={dismissToast}
      />

      {/* Footer with Developer Katari Anil Credits */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
