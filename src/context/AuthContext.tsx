import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { INITIAL_USERS } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  role: Role | 'guest';
  isAuthenticated: boolean;
  login: (email: string, role?: Role, departmentId?: string, institutionId?: string) => boolean;
  quickLogin: (user: User) => void;
  logout: () => void;
  isAdmin: boolean;
  isDeptHead: boolean;
  isFaculty: boolean;
  availableUsers: User[];
  canManageDepartment: (deptId?: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'jaya_auth_user_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [currentUser]);

  const login = (email: string): boolean => {
    const trimmed = email.trim().toLowerCase();
    const foundUser = INITIAL_USERS.find(u => u.email.toLowerCase() === trimmed);
    if (foundUser) {
      setCurrentUser(foundUser);
      return true;
    }
    // Generic match based on domain
    if (trimmed.includes('admin')) {
      const adminUser = INITIAL_USERS[0];
      setCurrentUser(adminUser);
      return true;
    }
    if (trimmed.includes('hod') || trimmed.includes('cse')) {
      const hodUser = INITIAL_USERS[1];
      setCurrentUser(hodUser);
      return true;
    }
    if (trimmed.includes('pharma')) {
      const pharmaUser = INITIAL_USERS[2];
      setCurrentUser(pharmaUser);
      return true;
    }
    return false;
  };

  const quickLogin = (user: User) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const role: Role | 'guest' = currentUser ? currentUser.role : 'guest';
  const isAdmin = currentUser?.role === 'admin';
  const isDeptHead = currentUser?.role === 'department_head';
  const isFaculty = currentUser?.role === 'faculty';

  const canManageDepartment = (deptId?: string): boolean => {
    if (!currentUser) return false;
    if (currentUser.role === 'admin') return true;
    if (currentUser.role === 'department_head' && currentUser.departmentId === deptId) return true;
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        isAuthenticated: !!currentUser,
        login,
        quickLogin,
        logout,
        isAdmin,
        isDeptHead,
        isFaculty,
        availableUsers: INITIAL_USERS,
        canManageDepartment
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
