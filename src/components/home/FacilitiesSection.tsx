import React from 'react';
import { BookOpen, Monitor, Trophy, Home, Bus, Wifi, Shield } from 'lucide-react';

export const FacilitiesSection: React.FC = () => {
  const facilities = [
    {
      title: 'Central Digital Library',
      description: 'Over 100,000 reference volumes, subscription to IEEE, ScienceDirect, DELNET, and air-conditioned digital reading carrels.',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
      tag: 'Academic Resource'
    },
    {
      title: 'High-Compute Campus Network',
      description: 'Campus-wide gigabit optical fiber backbone with 1 Gbps redundant leased line connectivity and 24x7 Wi-Fi access.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      tag: 'Infrastructure'
    },
    {
      title: 'Sports & Athletic Arena',
      description: 'Standard 400m athletic track, floodlit cricket grounds, outdoor volleyball, basketball, and indoor badminton stadia.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
      tag: 'Student Wellness'
    },
    {
      title: 'Residential Hostels & Dining',
      description: 'Modern resident halls for boys and girls with RO water plants, reading study halls, and nutritious hygienic dining.',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      tag: 'Residential Life'
    }
  ];

  return (
    <section className="py-24 bg-[#FAFAF9] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-semibold text-[#A98438] mb-2.5">
            <span className="w-8 h-[1px] bg-[#C5A059]" />
            <span>Campus Infrastructure</span>
          </div>
          <h2 className="font-institutional-serif text-3xl sm:text-4xl text-[#0B192C] font-normal tracking-tight">
            World-Class Facilities Built for Distinction
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed font-light">
            Comprehensive amenities designed to foster intellectual concentration, collaborative inquiry, athletic achievement, and personal growth.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((fac, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xs overflow-hidden group hover:border-[#C5A059] transition-all hover:shadow-md flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={fac.image}
                  alt={fac.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#070F1E]/80 text-[#EEDB96] text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs backdrop-blur-xs border border-white/10">
                  {fac.tag}
                </span>
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-institutional-serif text-lg font-semibold text-[#0B192C] group-hover:text-[#1E3E62] transition-colors">
                    {fac.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 font-light leading-relaxed">
                    {fac.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transportation & Safety Strip */}
        <div className="mt-12 p-6 bg-white border border-slate-200 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xs bg-[#0B192C] text-[#C5A059] flex items-center justify-center flex-shrink-0">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-[#0B192C]">Institutional Transportation Network</h4>
              <p className="text-xs text-slate-500 mt-0.5">Fleet of over 60 dedicated buses operating across Chennai, Avadi, Tambaram, Red Hills, and Tiruvallur.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xs bg-[#0B192C] text-[#C5A059] flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-[#0B192C]">24x7 Campus Security & CCTV</h4>
              <p className="text-xs text-slate-500 mt-0.5">Round-the-clock security surveillance, gated access control, and dedicated emergency response.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
