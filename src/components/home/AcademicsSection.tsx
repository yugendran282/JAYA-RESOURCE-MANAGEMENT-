import React from 'react';
import { Cpu, FlaskConical, Layers, TrendingUp, CheckCircle2, Building, Users } from 'lucide-react';

export const AcademicsSection: React.FC = () => {
  const centersOfExcellence = [
    {
      title: 'AI & Cognitive Computing CoE',
      icon: Cpu,
      institution: 'Jaya Engineering College',
      description: 'Features dedicated NVIDIA RTX 4090 GPU clusters, Intel Xeon servers, and open-source foundation model training environments for AI research.'
    },
    {
      title: 'Pharmaceutical Formulation & Pilot Plant',
      icon: FlaskConical,
      institution: 'Jaya College of Pharmacy',
      description: 'Houses 16-station rotary tablet presses, fluid bed dryers, and Shimadzu HPLC suites operating under cGMP pharmaceutical testing protocols.'
    },
    {
      title: 'Advanced VLSI & Embedded Systems Hub',
      icon: Layers,
      institution: 'Jaya Engineering College (ECE)',
      description: 'Configured with Cadence EDA software licenses, Xilinx FPGA development boards, and digital spectrum analyzers for semiconductor prototyping.'
    },
    {
      title: 'Industrial CNC & Rapid Prototyping Center',
      icon: Building,
      institution: 'Jaya Institute of Technology / JSEC',
      description: 'Equipped with industrial trainer lathes, milling centers, and industrial 3D additive manufacturing stations for precision tooling.'
    }
  ];

  const recruiters = [
    'Tata Consultancy Services',
    'Infosys Technologies',
    'Cognizant Technology Solutions',
    'Wipro Technologies',
    'Zoho Corporation',
    'HCLTech',
    'Larsen & Toubro Infotech',
    'Sun Pharmaceutical Industries',
    'Cipla Health',
    'Dr. Reddy’s Laboratories'
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-200/80" id="academics-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-semibold text-[#A98438] mb-2.5">
            <span className="w-8 h-[1px] bg-[#C5A059]" />
            <span>Academic Rigor</span>
          </div>
          <h2 className="font-institutional-serif text-3xl sm:text-4xl text-[#0B192C] font-normal tracking-tight">
            Centers of Excellence & Industry Integration
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-light">
            Bridging theoretical pedagogy with hands-on industrial and laboratory application through specialized research incubators and multidisciplinary centers.
          </p>
        </div>

        {/* Centers of Excellence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {centersOfExcellence.map((coe, idx) => {
            const Icon = coe.icon;
            return (
              <div
                key={idx}
                className="p-7 bg-[#FBFBFA] border border-slate-200 rounded-xs hover:border-[#C5A059] transition-all hover:shadow-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xs bg-[#0B192C] flex items-center justify-center text-[#C5A059]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-institutional-serif text-lg font-semibold text-[#0B192C]">
                      {coe.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{coe.institution}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {coe.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Corporate Recruitment & Placement Section */}
        <div className="bg-[#0B192C] text-white p-8 sm:p-12 rounded-xs relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="px-3 py-1 bg-[#1E3E62] text-[#EEDB96] text-[11px] uppercase tracking-widest font-semibold rounded-xs">
                Career Outcomes
              </span>
              <h3 className="font-institutional-serif text-2xl sm:text-3xl text-white font-normal">
                Corporate Placements & Career Trajectories
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                The centralized Training & Placement Cell coordinates comprehensive aptitude mentoring, coding bootcamps, and on-campus recruitment with leading international enterprises.
              </p>
              <div className="pt-2 flex items-center gap-6">
                <div>
                  <p className="font-institutional-serif text-3xl font-bold text-[#C5A059]">92.4%</p>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400">Consistent Placement Rate</p>
                </div>
                <div className="w-[1px] h-10 bg-slate-700" />
                <div>
                  <p className="font-institutional-serif text-3xl font-bold text-[#C5A059]">120+</p>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400">Visiting Recruiters</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 text-xs">
                {recruiters.map((recruiter, index) => (
                  <div
                    key={index}
                    className="p-3 bg-[#070F1E]/60 border border-[#1E3E62]/60 rounded-xs flex items-center gap-2 text-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
                    <span className="font-medium text-[11.5px] truncate">{recruiter}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
