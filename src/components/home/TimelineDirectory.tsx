import React, { useState } from 'react';
import { Institution } from '../../types';
import { INSTITUTIONS } from '../../data/mockData';
import {
  MapPin,
  Calendar,
  Building,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Filter
} from 'lucide-react';

interface TimelineDirectoryProps {
  onSelectInstitution: (institutionId: string) => void;
}

export const TimelineDirectory: React.FC<TimelineDirectoryProps> = ({ onSelectInstitution }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Sorted chronologically to reflect the historic timeline of the trust
  const sortedInstitutions = [...INSTITUTIONS].sort((a, b) => a.establishedYear - b.establishedYear);

  const categories = [
    { id: 'all', label: 'All 9 Member Institutions' },
    { id: 'eng', label: 'Engineering & Technology' },
    { id: 'arts', label: 'Arts, Science & Commerce' },
    { id: 'pharma', label: 'Pharmacy & Healthcare' },
    { id: 'vocational', label: 'Diploma & Foundations' }
  ];

  const filteredInstitutions = sortedInstitutions.filter(inst => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'eng') return inst.id.includes('jec') || inst.id.includes('jit') || inst.id.includes('jsec');
    if (activeCategory === 'arts') return inst.id.includes('jcas');
    if (activeCategory === 'pharma') return inst.id.includes('jcp') || inst.id.includes('paramedical');
    if (activeCategory === 'vocational') return inst.id.includes('polytechnic') || inst.id.includes('education') || inst.id.includes('school');
    return true;
  });

  return (
    <section className="py-24 bg-[#FAFAF9] border-t border-b border-slate-200/80" id="institutions-directory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Editorial Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-semibold text-[#A98438] mb-2.5">
            <span className="w-8 h-[1px] bg-[#C5A059]" />
            <span>Collegiate Directory</span>
          </div>
          <h2 className="font-institutional-serif text-3xl sm:text-4xl text-[#0B192C] font-normal tracking-tight">
            Our Member Institutions
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-light">
            An established consortium of degree-granting colleges, autonomous technological centers, and medical research institutes under the governance of Jaya Educational Trust.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-7">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#0B192C] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* INTERACTIVE VERTICAL TIMELINE */}
        <div className="relative">
          {/* Central Thin Spine Line */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-8 w-[1.5px] bg-slate-300 -translate-x-1/2" />

          <div className="space-y-12 lg:space-y-16">
            {filteredInstitutions.map((inst, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={inst.id}
                  className="relative flex flex-col lg:flex-row items-center group"
                >
                  {/* Timeline Center Node (Desktop) */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10">
                    <div className="w-9 h-9 rounded-full bg-white border-2 border-[#0B192C] group-hover:border-[#C5A059] flex items-center justify-center shadow-xs transition-colors">
                      <div className="w-3 h-3 rounded-full bg-[#0B192C] group-hover:bg-[#C5A059] transition-colors" />
                    </div>
                  </div>

                  {/* Left Column (Content or Image depending on even/odd) */}
                  <div className={`w-full lg:w-1/2 ${isEven ? 'lg:pr-14 text-left' : 'lg:order-2 lg:pl-14 text-left'}`}>
                    <div className="bg-white border border-slate-200/90 rounded-xs p-6 sm:p-7 shadow-xs hover:shadow-md transition-all group-hover:border-[#C5A059]/60">
                      {/* Meta header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-[#0B192C] text-[#EEDB96] font-mono text-[11px] font-semibold rounded-xs">
                            Estd. {inst.establishedYear}
                          </span>
                          <span className="text-[11px] text-slate-500 font-medium">
                            Code: {inst.code}
                          </span>
                        </div>
                        <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200/50">
                          {inst.accreditation[0]}
                        </span>
                      </div>

                      {/* Institution Name */}
                      <h3 className="font-institutional-serif text-xl sm:text-2xl text-[#0B192C] font-semibold leading-snug group-hover:text-[#1E3E62] transition-colors">
                        {inst.name}
                      </h3>

                      {/* Location and Affiliation */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                          {inst.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building className="w-3.5 h-3.5 text-slate-400" />
                          {inst.affiliation}
                        </span>
                      </div>

                      {/* Brief Editorial Description */}
                      <p className="mt-3 text-xs sm:text-sm text-slate-600 font-light leading-relaxed line-clamp-3">
                        {inst.overview}
                      </p>

                      {/* Key highlights pill tags */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                        <div className="text-[11px] text-slate-500">
                          <span className="font-semibold text-slate-800">{inst.departmentsCount}</span> Academic Departments • <span className="font-semibold text-slate-800">{inst.studentCount}+</span> Enrolled
                        </div>

                        {/* Explore Institution Button */}
                        <button
                          onClick={() => onSelectInstitution(inst.id)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#0B192C] bg-[#F1F5F9] hover:bg-[#0B192C] hover:text-[#EEDB96] rounded-xs transition-colors group/btn cursor-pointer"
                        >
                          <span>Explore Institution & Labs</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Campus Photo) */}
                  <div className={`w-full lg:w-1/2 mt-4 lg:mt-0 ${isEven ? 'lg:pl-14' : 'lg:order-1 lg:pr-14'}`}>
                    <div 
                      onClick={() => onSelectInstitution(inst.id)}
                      className="relative overflow-hidden rounded-xs border border-slate-200 shadow-xs cursor-pointer group/img h-52 sm:h-64"
                    >
                      <img
                        src={inst.thumbnailImage}
                        alt={`${inst.name} Campus`}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070F1E]/80 via-transparent to-transparent opacity-80 group-hover/img:opacity-60 transition-opacity" />
                      
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                        <span className="font-medium bg-[#070F1E]/70 px-2.5 py-1 rounded-xs backdrop-blur-xs border border-white/10">
                          {inst.campusArea}
                        </span>
                        <span className="flex items-center gap-1 text-[#EEDB96] font-medium text-[11px]">
                          <span>View Profile</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
