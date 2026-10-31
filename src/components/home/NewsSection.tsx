import React, { useState } from 'react';
import { NEWS_ITEMS } from '../../data/mockData';
import { Calendar, Bell, ArrowRight, FileText, CheckCircle, ExternalLink } from 'lucide-react';

interface NewsSectionProps {
  onOpenAdmissions: () => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ onOpenAdmissions }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Academic', 'Research', 'Admissions', 'Placement'];

  const filteredNews = NEWS_ITEMS.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <section className="py-24 bg-white" id="admissions-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-semibold text-[#A98438] mb-2.5">
              <span className="w-8 h-[1px] bg-[#C5A059]" />
              <span>Official Bulletins</span>
            </div>
            <h2 className="font-institutional-serif text-3xl sm:text-4xl text-[#0B192C] font-normal tracking-tight">
              News, Research & Announcements
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-xs transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0B192C] text-[#EEDB96]'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredNews.map((news) => (
            <div
              key={news.id}
              className="p-6 bg-[#FAFAF9] border border-slate-200 rounded-xs hover:border-[#C5A059] transition-all hover:shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="px-2.5 py-0.5 bg-[#0B192C] text-white text-[10.5px] font-semibold uppercase tracking-wider rounded-xs">
                    {news.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                    {news.date}
                  </span>
                </div>

                <h3 className="font-institutional-serif text-lg font-semibold text-[#0B192C] leading-snug hover:text-[#1E3E62] transition-colors cursor-pointer">
                  {news.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  {news.excerpt}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">
                  {news.institutionName}
                </span>
                <span className="text-[#0B192C] font-semibold hover:text-[#C5A059] inline-flex items-center gap-1 cursor-pointer">
                  <span>Read Notice</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Admissions 2026-2027 Official Callout Banner */}
        <div className="bg-gradient-to-r from-[#070F1E] via-[#0B192C] to-[#0F223D] text-white p-8 sm:p-12 rounded-xs border-2 border-[#C5A059]/40 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <span className="inline-block px-3 py-1 bg-[#C5A059]/20 border border-[#C5A059] text-[#EEDB96] text-xs font-semibold uppercase tracking-widest rounded-xs">
                Admissions Notification 2026-2027
              </span>
              <h3 className="font-institutional-serif text-2xl sm:text-3xl font-normal text-white">
                Begin Your Journey of Scholastic & Professional Excellence
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Counseling and management quota seats are now open for B.E., B.Tech, B.Pharm, B.Sc, B.C.A., M.B.A., and M.C.A. programs across our Thiruninravur & Chennai institutions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <button
                onClick={onOpenAdmissions}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#C5A059] hover:bg-[#d4af37] text-[#070F1E] font-bold text-xs uppercase tracking-[0.16em] rounded-xs shadow-md transition-all text-center cursor-pointer"
              >
                Apply Online / Inquire
              </button>
              <a
                href="tel:+914426300982"
                className="w-full sm:w-auto px-6 py-3.5 bg-transparent hover:bg-white/10 border border-slate-400 text-white font-medium text-xs uppercase tracking-[0.16em] rounded-xs transition-colors text-center"
              >
                Admissions Cell: +91 44 2630 0982
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
