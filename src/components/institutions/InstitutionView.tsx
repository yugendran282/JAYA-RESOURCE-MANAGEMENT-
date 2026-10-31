import React from 'react';
import { Institution, Department } from '../../types';
import { useData } from '../../context/DataContext';
import {
  MapPin,
  Calendar,
  Building,
  GraduationCap,
  Users,
  Award,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  FlaskConical,
  Phone,
  Mail
} from 'lucide-react';

interface InstitutionViewProps {
  institutionId: string;
  onBackToHome: () => void;
  onSelectDepartment: (departmentId: string) => void;
}

export const InstitutionView: React.FC<InstitutionViewProps> = ({
  institutionId,
  onBackToHome,
  onSelectDepartment
}) => {
  const { getInstitutionById, getDepartmentsByInstitution } = useData();

  const institution = getInstitutionById(institutionId);
  const departments = getDepartmentsByInstitution(institutionId);

  if (!institution) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Institution Not Found</h2>
        <button
          onClick={onBackToHome}
          className="mt-4 px-4 py-2 bg-[#0B192C] text-white rounded text-xs uppercase tracking-wider"
        >
          Return to Directory
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Breadcrumb Header */}
      <div className="bg-[#070F1E] text-slate-400 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2">
          <button onClick={onBackToHome} className="hover:text-white transition-colors">
            University Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <button onClick={onBackToHome} className="hover:text-white transition-colors">
            Institutions Directory
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-[#C5A059] font-medium truncate">{institution.name}</span>
        </div>
      </div>

      {/* DEDICATED INSTITUTIONAL BANNER */}
      <div className="relative bg-[#070F1E] text-white overflow-hidden py-16 sm:py-20 border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <img
            src={institution.bannerImage}
            alt={institution.name}
            className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070F1E] via-[#070F1E]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <img
                src="/images/jaya-education-trust-logo.png"
                alt="JAYA Education Trust"
                className="h-8 w-auto object-contain drop-shadow-[0_1px_3px_rgba(197,160,89,0.35)] mr-1"
              />
              <span className="px-3 py-1 bg-[#C5A059] text-[#070F1E] text-xs font-bold uppercase tracking-wider rounded-xs">
                Estd. {institution.establishedYear}
              </span>
              <span className="px-3 py-1 bg-[#0B192C] text-slate-300 text-xs font-mono border border-slate-700 rounded-xs">
                Code: {institution.code}
              </span>
              <span className="px-3 py-1 bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-xs font-medium rounded-xs">
                {institution.accreditation[0]}
              </span>
            </div>

            <h1 className="font-institutional-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight mb-4">
              {institution.name}
            </h1>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-300 mb-6">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C5A059]" />
                {institution.address}
              </span>
              <span className="flex items-center gap-1.5">
                <Building className="w-4 h-4 text-[#C5A059]" />
                {institution.affiliation}
              </span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed font-light max-w-2xl">
              {institution.overview}
            </p>
          </div>
        </div>
      </div>

      {/* Institutional Key Metrics Strip */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 divide-x divide-slate-100">
            <div>
              <p className="font-institutional-serif text-2xl font-bold text-[#0B192C]">{institution.studentCount}+</p>
              <p className="text-xs uppercase tracking-wider text-slate-500 mt-0.5">Students Enrolled</p>
            </div>
            <div className="pl-6">
              <p className="font-institutional-serif text-2xl font-bold text-[#0B192C]">{institution.facultyCount}+</p>
              <p className="text-xs uppercase tracking-wider text-slate-500 mt-0.5">Distinguished Faculty</p>
            </div>
            <div className="pl-6">
              <p className="font-institutional-serif text-2xl font-bold text-[#0B192C]">{departments.length}</p>
              <p className="text-xs uppercase tracking-wider text-slate-500 mt-0.5">Academic Departments</p>
            </div>
            <div className="pl-6">
              <p className="font-institutional-serif text-2xl font-bold text-[#0B192C]">{institution.campusArea}</p>
              <p className="text-xs uppercase tracking-wider text-slate-500 mt-0.5">Campus Grounds</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Column (8 cols): DEPARTMENTS LIST */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#A98438] mb-2">
                <span className="w-6 h-[1px] bg-[#C5A059]" />
                <span>Academic Divisions</span>
              </div>
              <h2 className="font-institutional-serif text-2xl sm:text-3xl text-[#0B192C] font-semibold mb-3">
                Constituent Departments & Research Units
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light mb-8">
                Select a department below to inspect its dedicated laboratories, room numbers, bench configurations, equipment inventory, and submit resource requests.
              </p>

              {/* Department Cards Grid */}
              <div className="space-y-4">
                {departments.length > 0 ? (
                  departments.map((dept) => (
                    <div
                      key={dept.id}
                      onClick={() => onSelectDepartment(dept.id)}
                      className="p-6 bg-white border border-slate-200 hover:border-[#0B192C] rounded-xs shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 bg-[#0B192C] text-[#EEDB96] font-mono text-[11px] font-bold rounded-xs">
                            {dept.code}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            Estd. {dept.establishedYear}
                          </span>
                        </div>

                        <h3 className="font-institutional-serif text-xl font-bold text-[#0B192C] group-hover:text-[#1E3E62] transition-colors">
                          Department of {dept.name}
                        </h3>

                        <p className="text-xs text-slate-600 font-light line-clamp-2 max-w-xl">
                          {dept.vision}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                          <span className="flex items-center gap-1">
                            <FlaskConical className="w-3.5 h-3.5 text-[#C5A059]" />
                            <strong className="text-slate-700">{dept.laboratories.length}</strong> Specialized Labs
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                            <strong className="text-slate-700">{dept.facultyCount}</strong> Faculty Members
                          </span>
                          <span className="flex items-center gap-1">
                            <GraduationCap className="w-3.5 h-3.5 text-[#C5A059]" />
                            <strong className="text-slate-700">{dept.studentIntake}</strong> Annual Student Intake
                          </span>
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectDepartment(dept.id);
                          }}
                          className="w-full sm:w-auto px-4 py-2.5 bg-[#F1F5F9] hover:bg-[#0B192C] text-[#0B192C] hover:text-[#EEDB96] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 group/btn"
                        >
                          <span>Department & Labs</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-xs">
                    <p className="text-sm text-slate-600">No departments currently configured for this institution.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Programs Offered */}
            <div className="pt-8 border-t border-slate-200">
              <h3 className="font-institutional-serif text-xl font-bold text-[#0B192C] mb-4">
                Approved Academic Curricula
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {institution.programsOffered.map((prog, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white border border-slate-200 rounded-xs flex items-center gap-2 text-slate-700"
                  >
                    <BookOpen className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                    <span className="font-medium">{prog}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column (4 cols): Leadership & Quick Facts */}
          <div className="lg:col-span-4 space-y-8">
            {/* Principal Profile Box */}
            <div className="bg-white border border-slate-200 rounded-xs p-6 shadow-xs">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-[#A98438] mb-3">
                <Award className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Executive Leadership</span>
              </div>
              <h4 className="font-institutional-serif text-lg font-bold text-[#0B192C]">
                {institution.principal.name}
              </h4>
              <p className="text-xs text-[#C5A059] font-medium mt-0.5">{institution.principal.designation}</p>
              <p className="text-[11px] text-slate-500 font-mono mt-1">{institution.principal.qualification}</p>

              {institution.principal.message && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-600 italic leading-relaxed font-light">
                    "{institution.principal.message}"
                  </p>
                </div>
              )}
            </div>

            {/* Institutional Highlights */}
            <div className="bg-[#FAFAF9] border border-slate-200 rounded-xs p-6">
              <h4 className="font-institutional-serif text-base font-bold text-[#0B192C] mb-4">
                Institutional Distinctions
              </h4>
              <ul className="space-y-3 text-xs text-slate-600">
                {institution.highlights.map((hl, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-1.5 flex-shrink-0" />
                    <span className="leading-relaxed">{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Approvals Badge Box */}
            <div className="bg-white border border-slate-200 rounded-xs p-6 text-xs text-slate-600 space-y-2">
              <h4 className="font-semibold text-xs text-[#0B192C] uppercase tracking-wider mb-2">
                Statutory Approvals
              </h4>
              {institution.approvedBy.map((ap, index) => (
                <div key={index} className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{ap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
