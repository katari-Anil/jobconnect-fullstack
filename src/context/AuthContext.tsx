import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { JobConnectStorage } from '../services/storageService';
import { INITIAL_STUDENT, INITIAL_ADMIN } from '../data/initialData';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: UserRole) => Promise<{ success: boolean; message?: string }>;
  register: (data: Omit<User, 'id' | 'createdAt' | 'role'>) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  quickLoginAsStudent: () => void;
  quickLoginAsAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    JobConnectStorage.init();
    const storedUser = JobConnectStorage.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    } else {
      // By default, let's keep student Katari Anil logged in so user can instantly preview the student dashboard
      JobConnectStorage.setCurrentUser(INITIAL_STUDENT);
      setUser(INITIAL_STUDENT);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, requestedRole: UserRole = 'STUDENT') => {
    setIsLoading(true);
    // Simulate short network latency
    await new Promise(res => setTimeout(res, 200));

    // Admin email check
    if (requestedRole === 'ADMIN' || email.toLowerCase() === 'admin@jobconnect.com') {
      const admin = JobConnectStorage.getUserById(INITIAL_ADMIN.id) || INITIAL_ADMIN;
      JobConnectStorage.setCurrentUser(admin);
      setUser(admin);
      setIsLoading(false);
      return { success: true };
    }

    const found = JobConnectStorage.getUserByEmail(email);
    if (!found) {
      setIsLoading(false);
      return { success: false, message: 'Account not found with this email. Please register first.' };
    }

    JobConnectStorage.setCurrentUser(found);
    setUser(found);
    setIsLoading(false);
    return { success: true };
  };

  const register = async (data: Omit<User, 'id' | 'createdAt' | 'role'>) => {
    setIsLoading(true);
    await new Promise(res => setTimeout(res, 300));
    try {
      const newUser = JobConnectStorage.registerStudent(data);
      JobConnectStorage.setCurrentUser(newUser);
      setUser(newUser);
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, message: err?.message || 'Failed to register' };
    }
  };

  const logout = () => {
    JobConnectStorage.setCurrentUser(null);
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return false;
    const updated = JobConnectStorage.updateUserProfile(user.id, updates);
    if (updated) {
      setUser({ ...updated });
      return true;
    }
    return false;
  };

  const quickLoginAsStudent = () => {
    const student = JobConnectStorage.getUserById(INITIAL_STUDENT.id) || INITIAL_STUDENT;
    JobConnectStorage.setCurrentUser(student);
    setUser(student);
  };

  const quickLoginAsAdmin = () => {
    const admin = JobConnectStorage.getUserById(INITIAL_ADMIN.id) || INITIAL_ADMIN;
    JobConnectStorage.setCurrentUser(admin);
    setUser(admin);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        quickLoginAsStudent,
        quickLoginAsAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
