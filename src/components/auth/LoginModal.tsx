import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { InstitutionalLogo } from '../common/InstitutionalLogo';
import { X, ShieldCheck, Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const { login, quickLogin, availableUsers } = useAuth();
  const [email, setEmail] = useState('admin@jaya.edu.in');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = login(email);
    if (success) {
      const lower = email.toLowerCase();
      const role = lower.includes('admin') ? 'admin' : 'department_head';
      onLoginSuccess(role);
      onClose();
    } else {
      setErrorMsg('Invalid institutional credentials. Please try one of the demo logins below.');
    }
  };

  const handleSelectDemoUser = (user: typeof availableUsers[0]) => {
    quickLogin(user);
    onLoginSuccess(user.role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070F1E]/80 backdrop-blur-xs">
      <div className="bg-white rounded-xs border border-slate-300 shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header with seal */}
        <div className="bg-[#0B192C] text-white p-6 relative text-center border-b border-[#1E3E62]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <InstitutionalLogo variant="light" size="sm" showTagline={false} className="justify-center mb-2" />
          <h3 className="font-institutional-serif text-xl font-bold text-white mt-2">
            Institutional Resource Management Console
          </h3>
          <p className="text-[11px] text-slate-300 tracking-wider uppercase font-medium mt-1">
            Central Authentication & Access Protocol
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs">
              {errorMsg}
            </div>
          )}

          {/* Quick 1-Click Demo Profiles */}
          <div className="space-y-2">
            <span className="text-[10.5px] uppercase tracking-wider text-slate-500 font-bold block">
              Direct Evaluation Access (1-Click Login):
            </span>

            <div className="grid grid-cols-1 gap-1.5 max-h-56 overflow-y-auto pr-1">
              {availableUsers.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleSelectDemoUser(user)}
                  className="w-full p-2 bg-slate-50 hover:bg-[#0B192C] hover:text-white border border-slate-200 rounded-xs text-left transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-bold text-slate-900 group-hover:text-white truncate">
                      {user.role === 'admin'
                        ? 'Trust System Administrator'
                        : `HOD — ${user.departmentName}`}
                    </p>
                    <p className="text-[10px] text-slate-500 group-hover:text-slate-300 font-mono truncate">
                      {user.email} {user.institutionName ? `• ${user.institutionName.split(' ')[1] || ''}` : ''}
                    </p>
                  </div>
                  <span className={`text-[9.5px] uppercase font-bold px-2 py-0.5 rounded-xs shrink-0 ${
                    user.role === 'admin' 
                      ? 'text-[#C5A059] bg-[#070F1E]' 
                      : 'text-slate-700 bg-slate-200 group-hover:bg-[#1E3E62] group-hover:text-[#EEDB96]'
                  }`}>
                    {user.role === 'admin' ? 'Admin' : 'HOD'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <span className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[10.5px] uppercase tracking-wider text-slate-400 font-semibold absolute">
              Or Manual Sign In
            </span>
          </div>

          {/* Manual Login Form */}
          <form onSubmit={handleManualLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                Institutional Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="username@jaya.edu.in"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xs focus:outline-none focus:border-[#0B192C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                Access Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xs focus:outline-none focus:border-[#0B192C]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#0B192C] hover:bg-[#1E3E62] text-[#EEDB96] font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Authenticate Session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <p className="text-[10px] text-center text-slate-400 leading-tight">
            Security Notice: Unauthorized access attempts are monitored and recorded under Anna University & Institutional cyber regulations.
          </p>
        </div>
      </div>
    </div>
  );
};
