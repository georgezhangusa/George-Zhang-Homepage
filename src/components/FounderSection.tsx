import React from 'react';
import { Mail, Globe } from 'lucide-react';
import { Language } from '../types/index.ts';
import { FOUNDER_INFO } from '../data/projectsData.ts';

interface FounderSectionProps {
  lang: Language;
  onOpenContact: () => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ lang, onOpenContact }) => {
  return (
    <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/20 shadow-md relative overflow-hidden">
        
        {/* Decorative corner light */}
        <div 
          aria-hidden="true" 
          className="absolute -right-10 -bottom-10 w-60 h-60 bg-indigo-200/30 rounded-full blur-[80px] pointer-events-none" 
        />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 relative z-10">
          
          {/* Avatar / Monogram */}
          <div className="relative group shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-[2px] shadow-lg shadow-indigo-500/15">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex flex-col items-center justify-center">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                  GZ
                </span>
                <span className="text-[10px] font-mono text-indigo-400 mt-1">
                  gz2ai.com
                </span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-xs">
              <span className="w-2 h-2 rounded-full bg-white"></span>
            </div>
          </div>

          {/* Profile details */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 flex items-center justify-center md:justify-start gap-2">
                  <span>{FOUNDER_INFO.name}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                    Lead Architect
                  </span>
                </h3>
                <p className="text-xs text-indigo-600 font-semibold mt-0.5">
                  {lang === 'zh' ? FOUNDER_INFO.roleZh : FOUNDER_INFO.role}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-center md:justify-end gap-2 pt-1">
                <button
                  onClick={onOpenContact}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-indigo-600/30"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{lang === 'zh' ? '发送消息' : 'Send Message'}</span>
                </button>
                <a
                  href="https://gz2ai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 transition-colors flex items-center gap-1 shadow-2xs"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>gz2ai.com</span>
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-2xl mb-4">
              {lang === 'zh' ? FOUNDER_INFO.bioZh : FOUNDER_INFO.bio}
            </p>

            {/* Core Competencies badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5">
              {FOUNDER_INFO.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium bg-white border border-slate-200 text-slate-700 shadow-2xs"
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
