import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Award, Compass, GraduationCap, ShieldCheck, ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreInstitutions: () => void;
  onOpenAdmissions: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreInstitutions, onOpenAdmissions }) => {
  return (
    <section className="relative bg-[#070F1E] text-white overflow-hidden min-h-[82vh] flex flex-col justify-between">
      {/* Background Campus Photograph with Ivy-League / Oxford Style Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=85"
          alt="Jaya Group of Institutions Campus Quadrangle"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.38] contrast-[1.08]"
        />
        {/* Subtle Navy Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070F1E] via-[#070F1E]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070F1E] via-transparent to-[#070F1E]/60" />
      </div>

      {/* Subtle Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
        style={{ backgroundImage: 'radial-gradient(#C5A059 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
      />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 flex-grow flex items-center">
        <div className="max-w-3xl">
          {/* Institutional Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-3.5 py-1.5 border border-[#C5A059]/40 bg-[#0B192C]/85 backdrop-blur-xs rounded-xs mb-6 text-xs text-[#EEDB96] uppercase tracking-[0.18em] font-medium shadow-md"
          >
            <img
              src="/images/jaya-education-trust-logo.png"
              alt="Jaya Educational Trust Logo"
              className="h-6 w-auto object-contain drop-shadow-[0_1px_3px_rgba(197,160,89,0.4)]"
            />
            <span className="h-3.5 w-[1px] bg-[#C5A059]/50" />
            <span>Pioneering Higher Education Since 1977</span>
          </motion.div>

          {/* Majestic Serif Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-institutional-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.12] mb-6"
          >
            Nurturing Intellect, Character, and <span className="italic font-light text-[#EEDB96]">Scientific Discovery</span>.
          </motion.h1>

          {/* Thin gold decorative rule */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '80px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[3px] bg-[#C5A059] mb-6"
          />

          {/* Short Institutional Introduction */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mb-9"
          >
            For nearly half a century, the Jaya Group of Institutions has stood as an academic beacon in Tamil Nadu—uniting engineering excellence, pharmaceutical innovation, arts, sciences, and doctoral research across world-class campus facilities.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={onExploreInstitutions}
              className="px-6 py-3.5 bg-[#C5A059] hover:bg-[#d4af37] text-[#070F1E] font-semibold text-xs uppercase tracking-[0.16em] rounded-xs shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>Explore Member Institutions</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onOpenAdmissions}
              className="px-6 py-3.5 bg-transparent hover:bg-white/10 text-white border border-slate-400/60 hover:border-white font-medium text-xs uppercase tracking-[0.16em] rounded-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-[#C5A059]" />
              <span>Academic Prospectus 2026</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Institutional Highlights Strip */}
      <div className="relative z-10 bg-[#060E18]/95 border-t border-slate-800/80 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
            <div className="flex items-center gap-4 pt-4 md:pt-0">
              <div className="w-10 h-10 rounded border border-[#C5A059]/30 flex items-center justify-center bg-[#0B192C]">
                <Award className="w-5 h-5 text-[#C5A059]" />
              </div>
              <div>
                <p className="font-institutional-serif text-2xl font-bold text-white leading-none">48+</p>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 mt-1">Years of Academic Heritage</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6">
              <div className="w-10 h-10 rounded border border-[#C5A059]/30 flex items-center justify-center bg-[#0B192C]">
                <Compass className="w-5 h-5 text-[#C5A059]" />
              </div>
              <div>
                <p className="font-institutional-serif text-2xl font-bold text-white leading-none">9</p>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 mt-1">Specialized Institutions</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6">
              <div className="w-10 h-10 rounded border border-[#C5A059]/30 flex items-center justify-center bg-[#0B192C]">
                <GraduationCap className="w-5 h-5 text-[#C5A059]" />
              </div>
              <div>
                <p className="font-institutional-serif text-2xl font-bold text-white leading-none">35,000+</p>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 mt-1">Global Alumni Network</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6">
              <div className="w-10 h-10 rounded border border-[#C5A059]/30 flex items-center justify-center bg-[#0B192C]">
                <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
              </div>
              <div>
                <p className="font-institutional-serif text-2xl font-bold text-white leading-none">180+</p>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 mt-1">Advanced Research Labs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
