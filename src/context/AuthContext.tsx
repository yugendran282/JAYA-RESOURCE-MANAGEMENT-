import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role, HodAccount } from '../types';
import { INITIAL_SUPER_ADMIN, INITIAL_HOD_ACCOUNTS } from '../data/authData';
import { INSTITUTIONS, DEPARTMENTS } from '../data/mockData';
import { hashPassword, verifyPassword, generateTemporaryPassword } from '../lib/crypto';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface LoginResult {
  success: boolean;
  message?: string;
  mustChangePassword?: boolean;
  isSetupRequired?: boolean;
}

export interface CreateHodInput {
  fullName: string;
  email: string;
  username?: string;
  institutionId: string;
  departmentId: string;
  designation?: string;
  phone?: string;
}

export interface UpdateHodInput {
  id: string;
  fullName: string;
  email: string;
  username?: string;
  institutionId: string;
  departmentId: string;
  designation?: string;
  phone?: string;
}

interface AuthContextType {
  currentUser: User | null;
  role: Role | 'guest';
  isAuthenticated: boolean;
  isAdmin: boolean;
  isDeptHead: boolean;
  isFaculty: boolean;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
  changePassword: (newPassword: string) => Promise<{ success: boolean; message: string }>;
  
  // Super Admin Protected Master Setup
  isAdminSetupNeeded: boolean;
  setupSuperAdminPassword: (newPassword: string) => Promise<{ success: boolean; message: string }>;

  // Super Admin HOD Account Governance
  hodAccounts: HodAccount[];
  createHodAccount: (input: CreateHodInput) => Promise<{ success: boolean; account?: HodAccount; temporaryPassword?: string; message: string }>;
  updateHodAccount: (input: UpdateHodInput) => Promise<{ success: boolean; message: string }>;
  toggleHodStatus: (accountId: string) => Promise<{ success: boolean; message: string }>;
  resetHodPassword: (accountId: string) => Promise<{ success: boolean; temporaryPassword?: string; message: string }>;
  deleteHodAccount: (accountId: string) => Promise<{ success: boolean; message: string }>;
  
  canManageDepartment: (deptId?: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'jaya_auth_user_session_v3';
const HOD_ACCOUNTS_STORAGE_KEY = 'jaya_hod_accounts_v3';
const SUPER_ADMIN_VAULT_KEY = 'jaya_super_admin_sec_vault_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Load active session
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 2. Load managed HOD accounts
  const [hodAccounts, setHodAccounts] = useState<HodAccount[]>(() => {
    try {
      const saved = localStorage.getItem(HOD_ACCOUNTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_HOD_ACCOUNTS;
  });

  // 3. Load Super Admin master credential hash from protected vault (persistent credentials)
  const [adminMasterHash, setAdminMasterHash] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(SUPER_ADMIN_VAULT_KEY);
      if (stored) return stored;
    } catch {
      // fallback
    }
    return INITIAL_SUPER_ADMIN.passwordHash;
  });

  const isAdminSetupNeeded = false;

  // Supabase Auth session rehydration across page refreshes / browser restarts
  useEffect(() => {
    if (!isSupabaseConfigured() || !supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user && !currentUser) {
        const email = session.user.email?.toLowerCase();
        if (email === INITIAL_SUPER_ADMIN.email.toLowerCase()) {
          setCurrentUser({
            id: INITIAL_SUPER_ADMIN.id,
            name: 'jaya groups',
            username: 'jaya groups',
            email: INITIAL_SUPER_ADMIN.email,
            role: 'admin',
            institutionId: INITIAL_SUPER_ADMIN.institutionId,
            institutionName: INITIAL_SUPER_ADMIN.institutionName,
            departmentId: INITIAL_SUPER_ADMIN.departmentId,
            departmentName: INITIAL_SUPER_ADMIN.departmentName,
            mustChangePassword: false,
            isActive: true
          });
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setCurrentUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Sync session
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [currentUser]);

  // Sync HOD accounts
  useEffect(() => {
    localStorage.setItem(HOD_ACCOUNTS_STORAGE_KEY, JSON.stringify(hodAccounts));
  }, [hodAccounts]);

  // --------------------------------------------------------------------------
  // SUPER ADMIN MASTER PASSWORD ROTATION / UPDATE
  // --------------------------------------------------------------------------
  const setupSuperAdminPassword = async (newPassword: string): Promise<{ success: boolean; message: string }> => {
    if (newPassword.length < 8) {
      return { success: false, message: 'Master password must be at least 8 characters long.' };
    }
    if (!/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      return { success: false, message: 'Master password must contain both letters and numbers.' };
    }

    try {
      const newHash = await hashPassword(newPassword);
      localStorage.setItem(SUPER_ADMIN_VAULT_KEY, newHash);
      setAdminMasterHash(newHash);

      // If Supabase is connected, update Super Admin password on Supabase Auth
      if (isSupabaseConfigured() && supabase) {
        try {
          const { data: sessionData } = await supabase.auth.getSession();
          if (sessionData?.session?.user) {
            await supabase.auth.updateUser({ password: newPassword });
          } else {
            const { error: signInErr } = await supabase.auth.signInWithPassword({
              email: INITIAL_SUPER_ADMIN.email,
              password: newPassword,
            });
            if (signInErr) {
              await supabase.auth.signUp({
                email: INITIAL_SUPER_ADMIN.email,
                password: newPassword,
                options: {
                  data: {
                    username: 'jaya groups',
                    full_name: 'jaya groups',
                    role: 'admin'
                  }
                }
              });
            }
          }
        } catch {
          // Supabase sync attempt
        }
      }

      return {
        success: true,
        message: 'Super Admin master credentials updated successfully for "jaya groups".'
      };
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to update master password.' };
    }
  };

  // --------------------------------------------------------------------------
  // SECURE AUTHENTICATION (Supabase with Local Cryptographic Vault Fallback)
  // --------------------------------------------------------------------------
  const login = async (identifier: string, password: string): Promise<LoginResult> => {
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanId || !cleanPassword) {
      return { success: false, message: 'Identifier and password are both required.' };
    }

    // 1. Check if Super Admin login (ID: "jaya groups" or "admin@jaya.edu.in")
    const isSuperAdminId =
      cleanId === 'jaya groups' ||
      cleanId === 'jayagroups' ||
      cleanId === 'admin@jaya.edu.in' ||
      cleanId === 'admin';

    if (isSuperAdminId) {
      // If Supabase is connected, authenticate via Supabase Auth signInWithPassword()
      if (isSupabaseConfigured() && supabase) {
        try {
          const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: INITIAL_SUPER_ADMIN.email,
            password: cleanPassword,
          });

          if (!authError && authData.user) {
            const adminUser: User = {
              id: INITIAL_SUPER_ADMIN.id,
              name: 'jaya groups',
              username: 'jaya groups',
              email: INITIAL_SUPER_ADMIN.email,
              role: 'admin',
              institutionId: INITIAL_SUPER_ADMIN.institutionId,
              institutionName: INITIAL_SUPER_ADMIN.institutionName,
              departmentId: INITIAL_SUPER_ADMIN.departmentId,
              departmentName: INITIAL_SUPER_ADMIN.departmentName,
              mustChangePassword: false,
              isActive: true
            };
            setCurrentUser(adminUser);
            return { success: true, mustChangePassword: false };
          }
        } catch {
          // fallback to cryptographic vault check
        }
      }

      // Cryptographic verification against persistent master hash
      const targetHash = adminMasterHash || INITIAL_SUPER_ADMIN.passwordHash;
      const isMatch = await verifyPassword(cleanPassword, targetHash);
      if (isMatch) {
        // If Supabase is connected, sync user account in Supabase Auth if needed
        if (isSupabaseConfigured() && supabase) {
          try {
            await supabase.auth.signUp({
              email: INITIAL_SUPER_ADMIN.email,
              password: cleanPassword,
              options: {
                data: {
                  username: 'jaya groups',
                  full_name: 'jaya groups',
                  role: 'admin'
                }
              }
            });
          } catch {
            // Background sync
          }
        }

        const adminUser: User = {
          id: INITIAL_SUPER_ADMIN.id,
          name: 'jaya groups',
          username: 'jaya groups',
          email: INITIAL_SUPER_ADMIN.email,
          role: 'admin',
          institutionId: INITIAL_SUPER_ADMIN.institutionId,
          institutionName: INITIAL_SUPER_ADMIN.institutionName,
          departmentId: INITIAL_SUPER_ADMIN.departmentId,
          departmentName: INITIAL_SUPER_ADMIN.departmentName,
          mustChangePassword: false,
          isActive: true
        };
        setCurrentUser(adminUser);
        return { success: true, mustChangePassword: false };
      } else {
        return {
          success: false,
          message: 'Invalid access credentials for Super Admin (jaya groups).'
        };
      }
    }

    // 2. If Supabase is connected, authenticate HOD via Supabase Auth & RLS
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: cleanId,
          password: cleanPassword,
        });

        if (authError || !authData.user) {
          return { success: false, message: authError?.message || 'Invalid institutional credentials.' };
        }

        // Fetch authorized profile
        const { data: profile, error: profileError } = await supabase
          .from('hod_accounts')
          .select('*, institutions(name), departments(name)')
          .eq('id', authData.user.id)
          .single();

        if (profileError || !profile) {
          await supabase.auth.signOut();
          return { success: false, message: 'No authorized departmental profile found for this user.' };
        }

        if (!profile.is_active) {
          await supabase.auth.signOut();
          return { success: false, message: 'This HOD account has been deactivated by the Super Admin.' };
        }

        const sessionUser: User = {
          id: profile.id,
          name: profile.full_name,
          email: profile.email,
          role: profile.role,
          institutionId: profile.institution_id,
          institutionName: profile.institutions?.name,
          departmentId: profile.department_id,
          departmentName: profile.departments?.name,
          mustChangePassword: profile.must_change_password,
          isActive: profile.is_active,
        };

        setCurrentUser(sessionUser);
        return { success: true, mustChangePassword: profile.must_change_password };
      } catch (err: any) {
        return { success: false, message: err.message || 'Authentication error connecting to secure backend.' };
      }
    }

    // Verify Managed HOD Accounts (by email or unique login ID)
    const matchedAccount = hodAccounts.find(acc =>
      acc.email.toLowerCase() === cleanId ||
      (acc.username && acc.username.toLowerCase() === cleanId)
    );
    if (!matchedAccount) {
      return {
        success: false,
        message: 'Invalid institutional credentials. Account not registered by Super Admin.'
      };
    }

    if (!matchedAccount.isActive) {
      return {
        success: false,
        message: 'Access Denied: This Department HOD account has been deactivated by the Super Admin.'
      };
    }

    const isMatch = await verifyPassword(cleanPassword, matchedAccount.passwordHash);
    if (!isMatch) {
      return {
        success: false,
        message: 'Invalid access credentials. Please verify your email and password.'
      };
    }

    // Valid HOD Authentication
    const sessionUser: User = {
      id: matchedAccount.id,
      name: matchedAccount.fullName,
      email: matchedAccount.email,
      username: matchedAccount.username,
      role: matchedAccount.role,
      institutionId: matchedAccount.institutionId,
      institutionName: matchedAccount.institutionName,
      departmentId: matchedAccount.departmentId,
      departmentName: matchedAccount.departmentName,
      mustChangePassword: matchedAccount.mustChangePassword,
      isActive: matchedAccount.isActive,
    };

    // Update last login timestamp
    setHodAccounts(prev =>
      prev.map(acc => acc.id === matchedAccount.id ? { ...acc, lastLoginAt: new Date().toISOString() } : acc)
    );

    setCurrentUser(sessionUser);
    return { success: true, mustChangePassword: matchedAccount.mustChangePassword };
  };

  const logout = () => {
    if (isSupabaseConfigured() && supabase) {
      supabase.auth.signOut().catch(() => {});
    }
    setCurrentUser(null);
  };

  // --------------------------------------------------------------------------
  // PASSWORD CHANGE ON FIRST LOGIN OR RESET
  // --------------------------------------------------------------------------
  const changePassword = async (newPassword: string): Promise<{ success: boolean; message: string }> => {
    if (!currentUser) {
      return { success: false, message: 'No active session.' };
    }

    if (newPassword.length < 8) {
      return { success: false, message: 'Password must be at least 8 characters long.' };
    }

    if (!/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      return { success: false, message: 'Password must contain both letters and numbers.' };
    }

    try {
      const newHash = await hashPassword(newPassword);

      // Super Admin password change
      if (currentUser.role === 'admin') {
        localStorage.setItem(SUPER_ADMIN_VAULT_KEY, newHash);
        setAdminMasterHash(newHash);
        if (isSupabaseConfigured() && supabase) {
          try {
            await supabase.auth.updateUser({ password: newPassword });
          } catch {
            // sync
          }
        }
        return { success: true, message: 'Super Admin master password successfully updated.' };
      }

      // Department HOD password change
      if (isSupabaseConfigured() && supabase) {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) throw error;
        await supabase
          .from('hod_accounts')
          .update({ must_change_password: false })
          .eq('id', currentUser.id);
      }

      setHodAccounts(prev =>
        prev.map(acc => {
          if (acc.email.toLowerCase() === currentUser.email.toLowerCase()) {
            return {
              ...acc,
              passwordHash: newHash,
              mustChangePassword: false,
              temporaryPassword: undefined
            };
          }
          return acc;
        })
      );

      setCurrentUser(prev => prev ? { ...prev, mustChangePassword: false } : null);
      return { success: true, message: 'Password successfully updated. You may now access your portal.' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to update password.' };
    }
  };

  // --------------------------------------------------------------------------
  // SUPER ADMIN HOD ACCOUNT GOVERNANCE
  // --------------------------------------------------------------------------
  const createHodAccount = async (input: CreateHodInput): Promise<{
    success: boolean;
    account?: HodAccount;
    temporaryPassword?: string;
    message: string;
  }> => {
    if (currentUser?.role !== 'admin') {
      return { success: false, message: 'Unauthorized. Only Super Admin can provision HOD accounts.' };
    }

    const cleanEmail = input.email.trim().toLowerCase();
    if (hodAccounts.some(acc => acc.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: `An account with email ${cleanEmail} already exists.` };
    }

    const cleanUsername = (input.username || '').trim().toLowerCase();
    if (cleanUsername && hodAccounts.some(acc => acc.username && acc.username.toLowerCase() === cleanUsername)) {
      return { success: false, message: `An account with login ID "${cleanUsername}" already exists.` };
    }

    const inst = INSTITUTIONS.find(i => i.id === input.institutionId);
    const dept = DEPARTMENTS.find(d => d.id === input.departmentId);

    if (!inst || !dept) {
      return { success: false, message: 'Invalid institution or department selected.' };
    }

    // Verify department belongs to the institution
    if (dept.institutionId !== inst.id) {
      return { success: false, message: 'The selected department does not belong to the selected institution.' };
    }

    // Generate secure temporary password
    const tempPassword = generateTemporaryPassword();
    const tempHash = await hashPassword(tempPassword);
    const finalUsername = cleanUsername || cleanEmail.split('@')[0];

    // If Supabase is connected, create account via Supabase Auth & record in hod_accounts
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data: authData } = await supabase.auth.signUp({
          email: cleanEmail,
          password: tempPassword,
          options: {
            data: {
              username: finalUsername,
              full_name: input.fullName.trim(),
              role: 'department_head',
              institution_id: inst.id,
              department_id: dept.id
            }
          }
        });

        if (authData?.user) {
          await supabase.from('hod_accounts').insert({
            id: authData.user.id,
            email: cleanEmail,
            full_name: input.fullName.trim(),
            institution_id: inst.id,
            department_id: dept.id,
            designation: input.designation || 'Professor & Head',
            phone: input.phone || '+91 44 2630 0982',
            role: 'department_head',
            is_active: true,
            must_change_password: true
          });
        }
      } catch (err) {
        console.warn('Supabase remote sync note:', err);
      }
    }

    const newAccount: HodAccount = {
      id: `acc-hod-${Date.now()}`,
      email: cleanEmail,
      username: finalUsername,
      fullName: input.fullName.trim(),
      institutionId: inst.id,
      institutionName: inst.name,
      departmentId: dept.id,
      departmentName: dept.name,
      designation: input.designation || 'Professor & Head',
      phone: input.phone || '+91 44 2630 0982',
      role: 'department_head',
      isActive: true,
      mustChangePassword: true,
      passwordHash: tempHash,
      temporaryPassword: tempPassword,
      createdAt: new Date().toISOString()
    };

    setHodAccounts(prev => [newAccount, ...prev]);
    return {
      success: true,
      account: newAccount,
      temporaryPassword: tempPassword,
      message: 'HOD account provisioned successfully.'
    };
  };

  const updateHodAccount = async (input: UpdateHodInput): Promise<{ success: boolean; message: string }> => {
    if (currentUser?.role !== 'admin') {
      return { success: false, message: 'Unauthorized. Only Super Admin can edit HOD accounts.' };
    }

    const target = hodAccounts.find(a => a.id === input.id);
    if (!target) {
      return { success: false, message: 'Account not found.' };
    }

    if (target.role === 'admin') {
      return { success: false, message: 'Root Super Admin account cannot be edited here.' };
    }

    const cleanEmail = (input.email || target.email).trim().toLowerCase();
    const cleanUsername = (input.username || target.username || '').trim().toLowerCase();

    // Check email uniqueness if changed
    if (cleanEmail !== target.email.toLowerCase() && hodAccounts.some(a => a.id !== input.id && a.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: `An account with email "${cleanEmail}" already exists.` };
    }

    // Check login ID uniqueness if changed
    if (cleanUsername && cleanUsername !== (target.username || '').toLowerCase() && hodAccounts.some(a => a.id !== input.id && (a.username || '').toLowerCase() === cleanUsername)) {
      return { success: false, message: `An account with login ID "${cleanUsername}" already exists.` };
    }

    const instId = input.institutionId || target.institutionId;
    const deptId = input.departmentId || target.departmentId;

    const inst = INSTITUTIONS.find(i => i.id === instId);
    const dept = DEPARTMENTS.find(d => d.id === deptId);

    if (!inst || !dept) {
      return { success: false, message: 'Invalid institution or department selected.' };
    }

    if (dept.institutionId !== inst.id) {
      return { success: false, message: 'The selected department does not belong to the selected institution.' };
    }

    // Sync to Supabase if configured
    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('hod_accounts').update({
          email: cleanEmail,
          full_name: input.fullName.trim(),
          institution_id: inst.id,
          department_id: dept.id,
          designation: input.designation || target.designation,
          phone: input.phone || target.phone,
        }).eq('id', input.id);
      } catch (err) {
        console.warn('Supabase remote update note:', err);
      }
    }

    setHodAccounts(prev =>
      prev.map(a => a.id === input.id ? {
        ...a,
        email: cleanEmail,
        username: cleanUsername || a.username,
        fullName: input.fullName.trim(),
        institutionId: inst.id,
        institutionName: inst.name,
        departmentId: dept.id,
        departmentName: dept.name,
        designation: input.designation || a.designation,
        phone: input.phone || a.phone,
      } : a)
    );

    return { success: true, message: 'HOD account details successfully updated.' };
  };

  const toggleHodStatus = async (accountId: string): Promise<{ success: boolean; message: string }> => {
    if (currentUser?.role !== 'admin') {
      return { success: false, message: 'Unauthorized.' };
    }

    const target = hodAccounts.find(a => a.id === accountId);
    if (!target) return { success: false, message: 'Account not found.' };

    if (target.role === 'admin') {
      return { success: false, message: 'Cannot deactivate the root Super Admin account.' };
    }

    const newStatus = !target.isActive;

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('hod_accounts').update({ is_active: newStatus }).eq('id', accountId);
      } catch (err) {
        console.warn('Supabase remote status update note:', err);
      }
    }

    setHodAccounts(prev =>
      prev.map(a => a.id === accountId ? { ...a, isActive: newStatus } : a)
    );

    // If deactivated and user is currently logged in, forcibly terminate session
    if (!newStatus && currentUser?.email.toLowerCase() === target.email.toLowerCase()) {
      logout();
    }

    return {
      success: true,
      message: `Account has been ${newStatus ? 'activated' : 'deactivated'}.`
    };
  };

  const resetHodPassword = async (accountId: string): Promise<{
    success: boolean;
    temporaryPassword?: string;
    message: string;
  }> => {
    if (currentUser?.role !== 'admin') {
      return { success: false, message: 'Unauthorized.' };
    }

    const target = hodAccounts.find(a => a.id === accountId);
    if (!target) return { success: false, message: 'Account not found.' };

    if (target.role === 'admin') {
      return { success: false, message: 'Use master rotation to change Super Admin password.' };
    }

    const newTempPassword = generateTemporaryPassword();
    const newHash = await hashPassword(newTempPassword);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('hod_accounts').update({ must_change_password: true }).eq('id', accountId);
      } catch (err) {
        console.warn('Supabase remote reset note:', err);
      }
    }

    setHodAccounts(prev =>
      prev.map(a => a.id === accountId ? {
        ...a,
        passwordHash: newHash,
        mustChangePassword: true,
        temporaryPassword: newTempPassword
      } : a)
    );

    return {
      success: true,
      temporaryPassword: newTempPassword,
      message: `Temporary password generated for ${target.email}.`
    };
  };

  const deleteHodAccount = async (accountId: string): Promise<{ success: boolean; message: string }> => {
    if (currentUser?.role !== 'admin') {
      return { success: false, message: 'Unauthorized.' };
    }

    const target = hodAccounts.find(a => a.id === accountId);
    if (!target) return { success: false, message: 'Account not found.' };

    if (target.role === 'admin') {
      return { success: false, message: 'Cannot delete the Super Admin root account.' };
    }

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('hod_accounts').delete().eq('id', accountId);
      } catch (err) {
        console.warn('Supabase remote delete note:', err);
      }
    }

    setHodAccounts(prev => prev.filter(a => a.id !== accountId));
    return { success: true, message: 'Account deleted.' };
  };

  // --------------------------------------------------------------------------
  // ROLE & ACCESS PERMISSION CHECKS
  // --------------------------------------------------------------------------
  const role: Role | 'guest' = currentUser ? currentUser.role : 'guest';
  const isAdmin = currentUser?.role === 'admin';
  const isDeptHead = currentUser?.role === 'department_head';
  const isFaculty = currentUser?.role === 'faculty';

  const canManageDepartment = (deptId?: string): boolean => {
    if (!currentUser) return false;
    if (currentUser.role === 'admin') return true;
    if (currentUser.role === 'department_head' && currentUser.departmentId === deptId && currentUser.isActive !== false) {
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        isAuthenticated: !!currentUser,
        isAdmin,
        isDeptHead,
        isFaculty,
        login,
        logout,
        changePassword,
        isAdminSetupNeeded,
        setupSuperAdminPassword,
        hodAccounts,
        createHodAccount,
        updateHodAccount,
        toggleHodStatus,
        resetHodPassword,
        deleteHodAccount,
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
