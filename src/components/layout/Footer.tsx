import React from 'react';
import { InstitutionalLogo } from '../common/InstitutionalLogo';
import { INSTITUTIONS } from '../../data/mockData';
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ShieldAlert,
  Award,
  Globe,
  ChevronRight
} from 'lucide-react';

interface FooterProps {
  onNavigateInstitution: (institutionId: string) => void;
  onOpenLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateInstitution, onOpenLogin }) => {
  return (
    <footer className="bg-[#070F1E] text-slate-300 border-t border-[#1E3E62]/40 relative z-10" id="contact-section">
      {/* Gold decorative accent line */}
      <div className="h-1 bg-gradient-to-r from-[#0B192C] via-[#C5A059] to-[#0B192C]" />

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Institutional Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <InstitutionalLogo variant="light" size="lg" showTagline={false} />
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              Under the benevolent stewardship of the Jaya Educational Trust, our multidisciplinary collegiate network has imparted world-class technological, scientific, and humanist education across Chennai West and Tamil Nadu since 1977.
            </p>

            <div className="pt-2 border-t border-slate-800 space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Central Administrative Office:</strong><br />
                  C.T.H. Road, Prakash Nagar, Thiruninravur, Chennai, Tamil Nadu - 602 024, India
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <span>General EPABX: +91 44 2630 0982 / 2630 0983</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                <span>info@jaya.edu.in | registrar@jaya.edu.in</span>
              </div>
            </div>
          </div>

          {/* Col 2: Institutional Directory (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-institutional-crest text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold pb-2 border-b border-slate-800">
              Member Institutions
            </h4>
            <ul className="space-y-2 text-xs">
              {INSTITUTIONS.slice(0, 8).map((inst) => (
                <li key={inst.id}>
                  <button
                    onClick={() => onNavigateInstitution(inst.id)}
                    className="group text-left text-slate-300 hover:text-white flex items-center justify-between w-full py-1 hover:translate-x-1 transition-transform"
                  >
                    <span className="flex items-center gap-1.5">
                      <ChevronRight className="w-3 h-3 text-[#C5A059] group-hover:text-white" />
                      <span>{inst.name}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {inst.establishedYear}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Statutory & Resource Portal (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-institutional-crest text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold pb-2 border-b border-slate-800">
              Governance & Disclosures
            </h4>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="#about-section" className="p-2 bg-slate-900/60 border border-slate-800 rounded hover:border-[#C5A059]/50 text-slate-300 hover:text-white transition-colors">
                AICTE Approvals
              </a>
              <a href="#about-section" className="p-2 bg-slate-900/60 border border-slate-800 rounded hover:border-[#C5A059]/50 text-slate-300 hover:text-white transition-colors">
                Anna Univ Affiliations
              </a>
              <a href="#about-section" className="p-2 bg-slate-900/60 border border-slate-800 rounded hover:border-[#C5A059]/50 text-slate-300 hover:text-white transition-colors">
                NAAC Self Study (SSR)
              </a>
              <a href="#about-section" className="p-2 bg-slate-900/60 border border-slate-800 rounded hover:border-[#C5A059]/50 text-slate-300 hover:text-white transition-colors">
                NIRF Institutional Data
              </a>
              <a href="#contact-section" className="p-2 bg-slate-900/60 border border-slate-800 rounded hover:border-[#C5A059]/50 text-slate-300 hover:text-white transition-colors">
                Anti-Ragging Squad
              </a>
              <a href="#contact-section" className="p-2 bg-slate-900/60 border border-slate-800 rounded hover:border-[#C5A059]/50 text-slate-300 hover:text-white transition-colors">
                Internal Grievance Cell
              </a>
            </div>

            <div className="p-4 bg-[#0B192C] border border-[#1E3E62] rounded mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#C5A059]" />
                  Centralized Resource Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mb-3">
                Authorized access for Department HODs, Laboratory In-Charges, and System Administrators for equipment reservation and inventory auditing.
              </p>
              <button
                onClick={onOpenLogin}
                className="w-full py-2 bg-[#C5A059] hover:bg-[#d4af37] text-[#070F1E] font-bold text-xs uppercase tracking-wider rounded transition-colors text-center"
              >
                Access Management Console
              </button>
            </div>
          </div>
        </div>

        {/* Accreditations Strip */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-6">
            <span className="text-[#C5A059] font-medium uppercase tracking-wider">Statutory Recognition:</span>
            <span>All India Council for Technical Education (AICTE)</span>
            <span>Pharmacy Council of India (PCI)</span>
            <span>National Council for Teacher Education (NCTE)</span>
            <span>UGC 2(f) & 12(B)</span>
          </div>
          <div className="text-slate-500 font-mono text-[11px]">
            ISO 9001:2015 Quality Certified
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Jaya Educational Trust. All rights reserved. JAYA GROUP OF INSTITUTIONS.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Terms of Use</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Mandatory Disclosure</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300">Site Map</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
