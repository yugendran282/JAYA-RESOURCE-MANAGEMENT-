import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { InstitutionalLogo } from '../common/InstitutionalLogo';
import { X, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Info, KeyRound } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDevPanel, setShowDevPanel] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        const lower = email.toLowerCase();
        const role = lower.includes('admin') ? 'admin' : 'department_head';
        onLoginSuccess(role);
        onClose();
      } else {
        setErrorMsg(result.message || 'Invalid institutional credentials.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error. Please check your network connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper for development testing only - strictly hidden in production builds
  const isDevMode = import.meta.env.DEV;

  const populateDevCredentials = (testEmail: string, testPass: string) => {
    setEmail(testEmail);
    setPassword(testPass);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070F1E]/85 backdrop-blur-xs">
      <div className="bg-white rounded-xs border border-slate-300 shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header with Coat of Arms Seal */}
        <div className="bg-[#0B192C] text-white p-6 relative text-center border-b border-[#1E3E62]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close authentication modal"
          >
            <X className="w-5 h-5" />
          </button>

          <InstitutionalLogo variant="light" size="sm" showTagline={false} className="justify-center mb-2" />
          <h3 className="font-institutional-serif text-xl font-bold text-white mt-1">
            Institutional Resource Management Console
          </h3>
          <p className="text-[10.5px] text-[#C5A059] tracking-wider uppercase font-semibold mt-1">
            Central Authentication & Access Protocol
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Secure Institutional Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                Institutional Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@jaya.edu.in or hod.dept@college.jaya.edu.in"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xs focus:outline-none focus:border-[#0B192C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                Authorized Access Password *
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
                <span>Verifying Cryptographic Credentials...</span>
              ) : (
                <>
                  <span>Authenticate Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Institutional Governance Notice */}
          <div className="pt-2 border-t border-slate-100 text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-600 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Role-Based Access Control • Row Level Security Active</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              Accounts are provisioned exclusively by the Central Trust Super Administrator. Public self-registration is strictly disabled under Anna University cyber governance protocols.
            </p>
          </div>

          {/* 
            DEVELOPMENT ENVIRONMENT ONLY DRAWER
            Strictly guarded by import.meta.env.DEV.
            Never compiled or exposed in production environments.
          */}
          {isDevMode && (
            <div className="pt-2 border-t border-dashed border-slate-300">
              <button
                type="button"
                onClick={() => setShowDevPanel(!showDevPanel)}
                className="w-full text-center text-[10px] text-amber-700 hover:text-amber-900 font-semibold uppercase tracking-wider py-1 flex items-center justify-center gap-1 cursor-pointer"
              >
                <KeyRound className="w-3 h-3" />
                <span>{showDevPanel ? 'Hide Dev Environment Test Notes' : 'Dev Environment Test Notes (Local Dev Only)'}</span>
              </button>

              {showDevPanel && (
                <div className="mt-2 p-3 bg-amber-50/70 border border-amber-200 rounded-xs text-[10.5px] space-y-2 text-slate-700">
                  <p className="font-bold text-amber-900 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" />
                    <span>Issued Test Credentials for Local Development:</span>
                  </p>
                  
                  <div className="space-y-1 font-mono text-[10px]">
                    <div
                      onClick={() => populateDevCredentials('admin@jaya.edu.in', 'SuperAdmin@Jaya2026')}
                      className="p-1.5 bg-white border border-amber-200 rounded-xs cursor-pointer hover:bg-amber-100 flex justify-between items-center"
                    >
                      <span><strong>Super Admin:</strong> admin@jaya.edu.in</span>
                      <span className="text-amber-800">SuperAdmin@Jaya2026</span>
                    </div>

                    <div
                      onClick={() => populateDevCredentials('hod.cse@jec.jaya.edu.in', 'JECcse@2026#')}
                      className="p-1.5 bg-white border border-amber-200 rounded-xs cursor-pointer hover:bg-amber-100 flex justify-between items-center"
                    >
                      <span><strong>JEC CSE HOD:</strong> hod.cse@jec.jaya.edu.in</span>
                      <span className="text-amber-800">JECcse@2026#</span>
                    </div>

                    <div
                      onClick={() => populateDevCredentials('hod.csecs@jsec.jaya.edu.in', 'JSECcsecs@2026#')}
                      className="p-1.5 bg-white border border-amber-200 rounded-xs cursor-pointer hover:bg-amber-100 flex justify-between items-center"
                    >
                      <span><strong>JSEC Cyber HOD:</strong> hod.csecs@jsec.jaya.edu.in</span>
                      <span className="text-amber-800">JSECcsecs@2026#</span>
                    </div>

                    <div
                      onClick={() => populateDevCredentials('hod.pharma@jcp.jaya.edu.in', 'JCPpharma@2026#')}
                      className="p-1.5 bg-white border border-amber-200 rounded-xs cursor-pointer hover:bg-amber-100 flex justify-between items-center"
                    >
                      <span><strong>JCP Pharma HOD:</strong> hod.pharma@jcp.jaya.edu.in</span>
                      <span className="text-amber-800">JCPpharma@2026#</span>
                    </div>
                  </div>
                  <p className="text-[9.5px] text-slate-500 italic">
                    Clicking any entry populates credentials for immediate verification. In production builds, this entire development panel is tree-shaken and excluded.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
