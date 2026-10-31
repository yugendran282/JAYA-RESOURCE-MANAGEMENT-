import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { InstitutionalLogo } from '../common/InstitutionalLogo';
import { Lock, KeyRound, ShieldAlert, CheckCircle2, AlertCircle, X, ShieldCheck } from 'lucide-react';

interface AdminSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSetupSuccess?: () => void;
}

export const AdminSetupModal: React.FC<AdminSetupModalProps> = ({
  isOpen,
  onClose,
  onSetupSuccess
}) => {
  const { setupSuperAdminPassword } = useAuth();
  const [masterPassword, setMasterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (masterPassword.length < 8) {
      setErrorMsg('Master password must be at least 8 characters in length.');
      return;
    }

    if (!/[A-Za-z]/.test(masterPassword) || !/[0-9]/.test(masterPassword)) {
      setErrorMsg('Master password must contain both letters and numbers.');
      return;
    }

    if (masterPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await setupSuperAdminPassword(masterPassword);
      if (result.success) {
        setSuccessMsg(result.message);
        setTimeout(() => {
          if (onSetupSuccess) onSetupSuccess();
          onClose();
        }, 1500);
      } else {
        setErrorMsg(result.message);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error establishing Super Admin password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070F1E]/90 backdrop-blur-xs">
      <div className="bg-white rounded-xs border border-[#C5A059] shadow-2xl max-w-md w-full overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-[#0B192C] text-white p-6 text-center border-b border-[#1E3E62] relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <InstitutionalLogo variant="light" size="sm" showTagline={false} className="justify-center mb-2" />
          
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#C5A059]/20 text-[#EEDB96] border border-[#C5A059]/40 rounded-xs text-[10.5px] uppercase font-bold tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Protected Master Credential Setup</span>
          </div>

          <h3 className="font-institutional-serif text-xl font-bold text-white">
            Configure JAYA Groups Super Admin
          </h3>
          <p className="text-[11px] text-slate-300 tracking-wider font-medium mt-1">
            Designated Admin Login ID: <span className="font-mono text-[#EEDB96] font-bold">jaya groups</span>
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="p-3 bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xs leading-relaxed space-y-1">
            <p className="font-semibold text-[#0B192C]">Zero-Hardcoded Credential Protocol:</p>
            <p>
              In accordance with institutional security policies, master passwords are never hardcoded or exposed in frontend source code. Establish the Super Admin master password below to initialize access for login ID <strong className="font-mono text-[#0B192C]">jaya groups</strong>.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                Admin Username / Login ID
              </label>
              <input
                type="text"
                disabled
                value="jaya groups"
                className="w-full p-2 border border-slate-200 rounded-xs bg-slate-100 font-mono font-bold text-[#0B192C] select-all cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-700 mb-1">
                Super Admin Master Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={masterPassword}
                  onChange={(e) => setMasterPassword(e.target.value)}
                  placeholder="Minimum 8 characters (letters & numbers)"
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xs focus:outline-none focus:border-[#0B192C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-700 mb-1">
                Confirm Master Password *
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter identical password"
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xs focus:outline-none focus:border-[#0B192C]"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-300 text-slate-600 rounded-xs hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-[#0B192C] hover:bg-[#1E3E62] text-[#EEDB96] font-semibold rounded-xs shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Encrypting & Initializing...' : 'Establish Master Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
