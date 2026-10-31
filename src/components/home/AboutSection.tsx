import React from 'react';
import { ShieldCheck, Award, BookOpen, Compass, CheckCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-24 bg-white" id="about-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-semibold text-[#A98438] mb-2.5">
            <span className="w-8 h-[1px] bg-[#C5A059]" />
            <span>Legacy & Heritage</span>
            <span className="w-8 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="font-institutional-serif text-3xl sm:text-4xl text-[#0B192C] font-normal tracking-tight">
            Nearly Five Decades of Educational Distinction
          </h2>
          <div className="w-16 h-[2px] bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
            Founded in 1977 under the visionary leadership of the Jaya Educational Trust, the institution has blossomed from a foundational academy into one of Tamil Nadu's most comprehensive educational networks.
          </p>
        </div>

        {/* Two-Column Editorial Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Authentic Photography & Archival Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative border-4 border-[#0B192C] p-2 shadow-xl bg-white">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
                alt="Jaya Group Academic Convocation"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#070F1E] text-white p-5 border-2 border-[#C5A059] shadow-xl max-w-[260px] hidden sm:block">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src="/images/jaya-education-trust-logo.png"
                    alt="Jaya Educational Trust"
                    className="h-8 w-auto object-contain drop-shadow-xs"
                  />
                  <p className="font-institutional-crest text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">
                    TRUST MOTTO
                  </p>
                </div>
                <p className="font-institutional-serif text-base italic text-slate-100 leading-snug">
                  "Your Success is Our Service"
                </p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">
                  Jaya Educational Trust • Estd. 1977
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-institutional-serif text-2xl text-[#0B192C] font-semibold leading-snug">
              Transforming Suburban Chennai into a Nexus of Technical and Scientific Eminence
            </h3>
            
            <p className="text-slate-600 text-sm leading-relaxed font-light">
              Situated predominantly along the strategic Chennai-Tiruvallur High Road corridor in Thiruninravur, the Jaya Group encompasses an expansive network of colleges spanning engineering, technology, arts and sciences, pharmacy, paramedical healthcare, teacher education, polytechnic diplomas, and foundational schooling.
            </p>

            <p className="text-slate-600 text-sm leading-relaxed font-light">
              Each institution within the Trust is anchored by rigorous university affiliations—including Anna University, University of Madras, The Tamil Nadu Dr. M.G.R. Medical University, and Tamil Nadu Teachers Education University—complemented by premier statutory approvals from AICTE, PCI, and NCTE.
            </p>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-[#0B192C] uppercase tracking-wider">Statutory Recognition</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Accredited by NAAC and approved by premier regulatory councils.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-[#0B192C] uppercase tracking-wider">Research Pedagogy</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Over 180 advanced laboratories supporting student patents and publications.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Compass className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-[#0B192C] uppercase tracking-wider">Industry Integration</h4>
                  <p className="text-xs text-slate-500 mt-0.5">MoUs with 120+ corporate giants for active internships and placements.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-[#0B192C] uppercase tracking-wider">Alumni Distinction</h4>
                  <p className="text-xs text-slate-500 mt-0.5">35,000+ alumni holding distinguished positions across 40 countries.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
