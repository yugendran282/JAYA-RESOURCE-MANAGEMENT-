import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { InstitutionalLogo } from '../common/InstitutionalLogo';
import {
  X,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Building2,
  GraduationCap
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const { login } = useAuth();
  const [loginMode, setLoginMode] = useState<'admin' | 'hod'>('admin');
  const [identifier, setIdentifier] = useState('jaya groups');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleModeSwitch = (mode: 'admin' | 'hod') => {
    setLoginMode(mode);
    setErrorMsg('');
    setPassword('');
    if (mode === 'admin') {
      setIdentifier('jaya groups');
    } else {
      setIdentifier('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const result = await login(identifier, password);
      if (result.success) {
        const clean = identifier.trim().toLowerCase();
        const role = (clean === 'jaya groups' || clean === 'jayagroups' || clean.includes('admin'))
          ? 'admin'
          : 'department_head';
        onLoginSuccess(role);
        onClose();
      } else {
        setErrorMsg(result.message || 'Invalid institutional credentials.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error connecting to institutional directory.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070F1E]/85 backdrop-blur-xs">
        <div className="bg-white rounded-xs border border-slate-300 shadow-2xl max-w-md w-full overflow-hidden animate-fadeIn">
          {/* Header with Official Lighthouse Logo */}
          <div className="bg-[#0B192C] text-white p-6 relative text-center border-b border-[#1E3E62]">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close authentication modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Official Logo Display */}
            <div className="flex justify-center mb-2">
              <InstitutionalLogo variant="light" size="md" showTagline={false} />
            </div>

            <h3 className="font-institutional-serif text-lg sm:text-xl font-bold text-white mt-1">
              Resource Management System
            </h3>
            <p className="text-[10px] sm:text-[10.5px] text-[#C5A059] tracking-widest uppercase font-semibold mt-1">
              Central Institutional Authentication
            </p>
          </div>

          {/* Dedicated Tab Switcher: Admin vs HOD */}
          <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
            <button
              type="button"
              onClick={() => handleModeSwitch('admin')}
              className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition-all cursor-pointer border-b-2 ${
                loginMode === 'admin'
                  ? 'bg-white text-[#0B192C] border-[#0B192C] shadow-xs'
                  : 'text-slate-500 border-transparent hover:text-slate-800'
              }`}
            >
              <Building2 className={`w-4 h-4 ${loginMode === 'admin' ? 'text-[#C5A059]' : 'text-slate-400'}`} />
              <span>Super Admin Portal</span>
            </button>

            <button
              type="button"
              onClick={() => handleModeSwitch('hod')}
              className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition-all cursor-pointer border-b-2 ${
                loginMode === 'hod'
                  ? 'bg-white text-[#0B192C] border-[#0B192C] shadow-xs'
                  : 'text-slate-500 border-transparent hover:text-slate-800'
              }`}
            >
              <GraduationCap className={`w-4 h-4 ${loginMode === 'hod' ? 'text-[#C5A059]' : 'text-slate-400'}`} />
              <span>Department HOD Portal</span>
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 space-y-4">
            {/* Mode-specific context banner */}
            {loginMode === 'admin' ? (
              <div className="p-3 bg-[#0B192C]/5 border border-[#0B192C]/15 rounded-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                    Designated Super Admin Username:
                  </span>
                  <span className="font-mono text-xs font-bold text-[#0B192C]">
                    jaya groups
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIdentifier('jaya groups')}
                  className="px-2.5 py-1 text-[10.5px] font-semibold bg-[#0B192C] text-[#EEDB96] rounded-xs hover:bg-[#1E3E62] transition-colors cursor-pointer"
                >
                  Use Admin ID
                </button>
              </div>
            ) : (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs text-xs text-slate-600 leading-relaxed">
                <p className="font-semibold text-[#0B192C] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Individual HOD Credential Verification
                </p>
                <p className="text-[11px] mt-0.5">
                  Please log in using your individual institutional email issued by the Super Admin. Each HOD has access restricted strictly to their assigned department.
                </p>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Secure Authentication Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                  {loginMode === 'admin' ? 'Admin Username or Trust Email *' : 'Assigned Institutional Email *'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    autoComplete="username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={
                      loginMode === 'admin'
                        ? 'Enter "jaya groups" or admin@jaya.edu.in'
                        : 'e.g. hod.cse@jec.jaya.edu.in'
                    }
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xs focus:outline-none focus:border-[#0B192C] font-mono"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  {loginMode === 'admin'
                    ? 'Central Executive Login ID: jaya groups'
                    : 'Issued by Super Admin to your specific department'}
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                  Authorized Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xs focus:outline-none focus:border-[#0B192C]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-[#0B192C] hover:bg-[#1E3E62] text-[#EEDB96] font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Verifying Credentials...</span>
                ) : (
                  <>
                    <span>Authenticate Session</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Footer security badge */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Supabase Auth & RLS Protected</span>
              </span>
              <span>Jaya Trust • Estd. 1977</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
