import React from 'react';
import { Mail } from 'lucide-react';
import { Language } from '../types/index.ts';
import { FOUNDER_INFO } from '../data/projectsData.ts';

interface FounderSectionProps {
  lang: Language;
  onOpenContact: () => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ lang, onOpenContact }) => {
  return (
    <section className="py-4 sm:py-6 max-w-5xl mx-auto px-2 sm:px-4">
      <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/20 shadow-xs relative overflow-hidden">
        
        {/* Decorative corner light */}
        <div 
          aria-hidden="true" 
          className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-200/20 rounded-full blur-[70px] pointer-events-none" 
        />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-5 relative z-10">
          
          {/* Avatar / Monogram */}
          <div className="relative group shrink-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-[1.5px] shadow-sm shadow-indigo-500/15">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex flex-col items-center justify-center">
                <span className="text-xl sm:text-2xl font-extrabold font-mono tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                  GZ
                </span>
                <span className="text-[8px] font-mono text-indigo-400">
                  gz2ai.com
                </span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            </div>
          </div>

          {/* Profile details */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center justify-center md:justify-start gap-2">
                  <span>{FOUNDER_INFO.name}</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                    Lead Architect
                  </span>
                </h3>
                <p className="text-[11px] text-indigo-600 font-semibold">
                  {lang === 'zh' ? FOUNDER_INFO.roleZh : FOUNDER_INFO.role}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-center md:justify-end gap-1.5">
                <a
                  href={`mailto:${FOUNDER_INFO.email}`}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs shadow-indigo-600/30"
                >
                  <Mail className="w-3 h-3" />
                  <span>Email: {FOUNDER_INFO.email}</span>
                </a>
              </div>
            </div>

            <p className="text-[11.5px] text-slate-600 font-normal leading-relaxed max-w-3xl mb-2.5">
              {lang === 'zh' ? FOUNDER_INFO.bioZh : FOUNDER_INFO.bio}
            </p>

            {/* Core Competencies badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1">
              {FOUNDER_INFO.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-white border border-slate-200 text-slate-700 shadow-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
