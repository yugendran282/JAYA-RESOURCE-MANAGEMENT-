import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { InstitutionalLogo } from '../common/InstitutionalLogo';
import { Lock, KeyRound, ShieldAlert, CheckCircle2, AlertCircle, LogOut } from 'lucide-react';

export const ChangePasswordModal: React.FC = () => {
  const { currentUser, changePassword, logout } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Only active if user is logged in and flagged with mustChangePassword
  if (!currentUser || !currentUser.mustChangePassword) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (newPassword.length < 8) {
      setErrorMsg('Password must be at least 8 characters in length.');
      return;
    }

    if (!/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      setErrorMsg('Password must contain both letters and numbers.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await changePassword(newPassword);
      if (result.success) {
        setSuccessMsg(result.message);
      } else {
        setErrorMsg(result.message);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error updating password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070F1E]/90 backdrop-blur-xs">
      <div className="bg-white rounded-xs border border-amber-300 shadow-2xl max-w-md w-full overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-[#0B192C] text-white p-6 text-center border-b border-[#1E3E62] relative">
          <InstitutionalLogo variant="light" size="sm" showTagline={false} className="justify-center mb-2" />
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xs text-[10.5px] uppercase font-bold tracking-wider mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Mandatory Security Protocol</span>
          </div>
          <h3 className="font-institutional-serif text-xl font-bold text-white">
            Initial Credential Setup Required
          </h3>
          <p className="text-[11px] text-slate-300 tracking-wider font-medium mt-1">
            Department Scope: {currentUser.departmentName || 'Authorized Unit'}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-xs leading-relaxed">
            <strong>Welcome, {currentUser.name}.</strong>
            <p className="mt-1 text-slate-700">
              Your account was provisioned with a temporary administrative password. To safeguard departmental records and ensure individual accountability under university audit regulations, you must establish a permanent password before continuing.
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-700 mb-1">
                New Access Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 characters (letters & numbers)"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xs focus:outline-none focus:border-[#0B192C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-700 mb-1">
                Confirm New Access Password *
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter identical password"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xs focus:outline-none focus:border-[#0B192C]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-[#0B192C] hover:bg-[#1E3E62] text-[#EEDB96] font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Encrypting & Updating Credentials...</span>
              ) : (
                <span>Set Password & Proceed to Department Portal</span>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>Do not wish to proceed right now?</span>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 font-medium cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
