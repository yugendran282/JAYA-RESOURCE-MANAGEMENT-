import React, { useState } from 'react';
import { X, CheckCircle, GraduationCap, Phone, Mail, MapPin, Download } from 'lucide-react';

interface AdmissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdmissionsModal: React.FC<AdmissionsModalProps> = ({ isOpen, onClose }) => {
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [targetProgram, setTargetProgram] = useState('B.E. Computer Science & Engineering (JEC)');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070F1E]/80 backdrop-blur-xs">
      <div className="bg-white rounded-xs border border-slate-300 shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="bg-[#0B192C] text-white p-6 relative border-b border-[#1E3E62] flex items-center gap-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src="/images/jaya-education-trust-logo.png"
            alt="JAYA Education Trust Logo"
            className="h-12 w-auto object-contain drop-shadow-sm shrink-0"
          />
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">
              Academic Year 2026-2027
            </span>
            <h3 className="font-institutional-serif text-xl font-bold text-white mt-0.5">
              Admissions Inquiry & Prospectus
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Jaya Group of Institutions • Thiruninravur & Chennai Campuses
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="font-institutional-serif text-xl font-bold text-[#0B192C]">
              Inquiry Form Received
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Our Admissions Counseling Office will reach out with the comprehensive prospectus, fee structure, and counseling codes within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs text-slate-700">
            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                Candidate Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Full Legal Name"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="candidate@example.com"
                  value={candidateEmail}
                  onChange={(e) => setCandidateEmail(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={candidatePhone}
                  onChange={(e) => setCandidatePhone(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-600 mb-1">
                Programme of Interest *
              </label>
              <select
                value={targetProgram}
                onChange={(e) => setTargetProgram(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-xs bg-white"
              >
                <option value="B.E. Computer Science & Engineering (JEC)">B.E. Computer Science & Engineering (JEC - Code 1108)</option>
                <option value="B.Tech Artificial Intelligence & Data Science (JEC)">B.Tech Artificial Intelligence & Data Science (JEC)</option>
                <option value="B.E. Electronics & Communication (JEC)">B.E. Electronics & Communication Engineering (JEC)</option>
                <option value="B.E. Mechanical Engineering (JEC)">B.E. Mechanical Engineering (JEC)</option>
                <option value="B.Pharm (Bachelor of Pharmacy - JCP)">B.Pharm (Bachelor of Pharmacy - JCP Chennai)</option>
                <option value="B.C.A Computer Applications (JCAS)">B.C.A. Computer Applications (JCAS)</option>
                <option value="B.Sc Biotechnology / Microbiology (JCAS)">B.Sc Biotechnology (JCAS Madras Univ)</option>
                <option value="B.Sc Medical Laboratory Technology (JCPS)">B.Sc Medical Lab Technology (JCPS Paramedical)</option>
                <option value="M.B.A. / M.C.A. (Anna University)">M.B.A. / M.C.A. (Anna University)</option>
              </select>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs text-[11px] text-slate-600 space-y-1">
              <p><strong>Tamil Nadu Engineering Admissions (TNEA) Codes:</strong></p>
              <p>• Jaya Engineering College: <strong>1108</strong></p>
              <p>• Jaya Institute of Technology: <strong>1111</strong></p>
              <p>• Jaya Sakthi Engineering College: <strong>1120</strong></p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-300 text-slate-600 rounded-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#0B192C] hover:bg-[#1E3E62] text-[#EEDB96] font-semibold text-xs uppercase tracking-wider rounded-xs cursor-pointer"
              >
                Submit Application Inquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
