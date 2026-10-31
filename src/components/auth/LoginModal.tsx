import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { InstitutionalLogo } from '../common/InstitutionalLogo';
import { AdminSetupModal } from './AdminSetupModal';
import { X, Lock, User, ArrowRight, ShieldCheck, AlertCircle, Settings2, ShieldAlert } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const { login, isAdminSetupNeeded } = useAuth();
  const [identifier, setIdentifier] = useState('jaya groups');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminSetupModal, setShowAdminSetupModal] = useState(false);

  if (!isOpen) return null;

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
        if (result.isSetupRequired) {
          setShowAdminSetupModal(true);
        }
        setErrorMsg(result.message || 'Invalid institutional credentials.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error. Please check your network connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAdminUsername = () => {
    setIdentifier('jaya groups');
    setPassword('');
    setErrorMsg('');
  };

  return (
    <>
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
          <div className="p-6 space-y-4">
            {/* Super Admin Username Display Badge */}
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
                onClick={handleSelectAdminUsername}
                className="px-2.5 py-1 text-[10.5px] font-semibold bg-[#0B192C] text-[#EEDB96] rounded-xs hover:bg-[#1E3E62] transition-colors cursor-pointer"
              >
                Use Admin ID
              </button>
            </div>

            {/* Notice if Super Admin master password setup is needed */}
            {isAdminSetupNeeded && (
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-xs text-amber-900 text-xs flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">Super Admin Password Setup Required</p>
                  <p className="text-[11px] text-slate-600">
                    Master credentials for <strong className="font-mono">jaya groups</strong> have not been established yet.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowAdminSetupModal(true)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 underline hover:text-amber-950 mt-1 cursor-pointer"
                  >
                    <Settings2 className="w-3 h-3" />
                    <span>Run Protected Master Setup Now</span>
                  </button>
                </div>
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
                  Admin Username or Institutional Email *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    autoComplete="username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder='Enter "jaya groups" or HOD institutional email'
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xs focus:outline-none focus:border-[#0B192C] font-mono"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Super Admin: <code className="font-bold text-slate-700">jaya groups</code> | HODs: Individual issued email
                </span>
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
                  <span>Verifying Credentials...</span>
                ) : (
                  <>
                    <span>Authenticate Session</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Institutional Governance Notice & Master Setup Link */}
            <div className="pt-2 border-t border-slate-100 text-center space-y-1.5">
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-600 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Supabase Auth & Row Level Security Enforced</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                Central management is restricted to Super Admin (<span className="font-mono text-slate-600">jaya groups</span>). Department HOD accounts are provisioned exclusively through the executive console.
              </p>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowAdminSetupModal(true)}
                  className="text-[10px] text-slate-500 hover:text-[#0B192C] underline cursor-pointer"
                >
                  Configure / Reset Super Admin Master Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Super Admin Protected Setup Modal */}
      <AdminSetupModal
        isOpen={showAdminSetupModal}
        onClose={() => setShowAdminSetupModal(false)}
        onSetupSuccess={() => {
          setIdentifier('jaya groups');
        }}
      />
    </>
  );
};
