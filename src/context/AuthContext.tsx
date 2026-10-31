import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role, Department } from '../types';
import { INITIAL_USERS, DEPARTMENTS, INSTITUTIONS } from '../data/mockData';

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
const DEPARTMENTS_STORAGE_KEY = 'jaya_departments_data_v2';

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
    
    // 1. Direct match in preconfigured initial users
    const foundUser = INITIAL_USERS.find(u => u.email.toLowerCase() === trimmed);
    if (foundUser) {
      setCurrentUser(foundUser);
      return true;
    }

    // 2. Admin match
    if (trimmed.includes('admin@') || trimmed === 'admin' || trimmed === 'admin@jaya.edu.in') {
      const adminUser = INITIAL_USERS[0];
      setCurrentUser(adminUser);
      return true;
    }

    // 3. Dynamic lookup across all 51 departments (including admin-assigned HODs in localStorage)
    let departmentsList: Department[] = DEPARTMENTS;
    try {
      const savedDepts = localStorage.getItem(DEPARTMENTS_STORAGE_KEY);
      if (savedDepts) {
        const parsed = JSON.parse(savedDepts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          departmentsList = parsed;
        }
      }
    } catch {
      // fallback to mockData DEPARTMENTS
    }

    // Check exact HOD email match
    const matchedDept = departmentsList.find(
      d => d.hod?.email && d.hod.email.toLowerCase() === trimmed
    );

    if (matchedDept) {
      const inst = INSTITUTIONS.find(i => i.id === matchedDept.institutionId);
      const dynamicHodUser: User = {
        id: `user-hod-${matchedDept.id}`,
        name: matchedDept.hod.name,
        email: matchedDept.hod.email,
        role: 'department_head',
        institutionId: matchedDept.institutionId,
        institutionName: inst?.name || 'Jaya Group of Institutions',
        departmentId: matchedDept.id,
        departmentName: matchedDept.name,
        avatar: matchedDept.hod.photo || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
      };
      setCurrentUser(dynamicHodUser);
      return true;
    }

    // Partial department code match for quick typing (e.g. "csecs", "aero", "biotech")
    const partialDept = departmentsList.find(
      d => trimmed.includes(d.id.replace('dept-', '')) || trimmed.includes(d.code.toLowerCase())
    );
    if (partialDept) {
      const inst = INSTITUTIONS.find(i => i.id === partialDept.institutionId);
      const dynamicHodUser: User = {
        id: `user-hod-${partialDept.id}`,
        name: partialDept.hod?.name || 'Department Head',
        email: partialDept.hod?.email || trimmed,
        role: 'department_head',
        institutionId: partialDept.institutionId,
        institutionName: inst?.name || 'Jaya Group of Institutions',
        departmentId: partialDept.id,
        departmentName: partialDept.name,
        avatar: partialDept.hod?.photo || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
      };
      setCurrentUser(dynamicHodUser);
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
