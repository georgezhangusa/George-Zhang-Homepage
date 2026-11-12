import React from 'react';
import { ExternalLink, ArrowRight, Play } from 'lucide-react';
import { ProjectItem, Language } from '../types/index.ts';

interface ProjectCardProps {
  project: ProjectItem;
  lang: Language;
  onOpenModal: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, lang, onOpenModal }) => {
  // Theme color maps for light mode
  const colorStyles = {
    indigo: {
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      iconBox: 'bg-indigo-50 text-indigo-600 border-indigo-200 group-hover:bg-indigo-100 group-hover:border-indigo-300',
      hoverBorder: 'hover:border-indigo-300 hover:shadow-[0_16px_32px_-10px_rgba(99,102,241,0.15)]',
      titleHover: 'group-hover:text-indigo-600',
      accentText: 'text-indigo-600 hover:text-indigo-800',
      btnSecondary: 'bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 border-indigo-200/80',
    },
    purple: {
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      iconBox: 'bg-purple-50 text-purple-600 border-purple-200 group-hover:bg-purple-100 group-hover:border-purple-300',
      hoverBorder: 'hover:border-purple-300 hover:shadow-[0_16px_32px_-10px_rgba(168,85,247,0.15)]',
      titleHover: 'group-hover:text-purple-600',
      accentText: 'text-purple-600 hover:text-purple-800',
      btnSecondary: 'bg-purple-50/80 hover:bg-purple-100 text-purple-700 border-purple-200/80',
    },
    pink: {
      badgeBg: 'bg-pink-50 text-pink-700 border-pink-200',
      iconBox: 'bg-pink-50 text-pink-600 border-pink-200 group-hover:bg-pink-100 group-hover:border-pink-300',
      hoverBorder: 'hover:border-pink-300 hover:shadow-[0_16px_32px_-10px_rgba(244,114,182,0.15)]',
      titleHover: 'group-hover:text-pink-600',
      accentText: 'text-pink-600 hover:text-pink-800',
      btnSecondary: 'bg-pink-50/80 hover:bg-pink-100 text-pink-700 border-pink-200/80',
    },
    cyan: {
      badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      iconBox: 'bg-cyan-50 text-cyan-600 border-cyan-200 group-hover:bg-cyan-100 group-hover:border-cyan-300',
      hoverBorder: 'hover:border-cyan-300 hover:shadow-[0_16px_32px_-10px_rgba(6,182,212,0.15)]',
      titleHover: 'group-hover:text-cyan-600',
      accentText: 'text-cyan-600 hover:text-cyan-800',
      btnSecondary: 'bg-cyan-50/80 hover:bg-cyan-100 text-cyan-700 border-cyan-200/80',
    },
    emerald: {
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconBox: 'bg-emerald-50 text-emerald-600 border-emerald-200 group-hover:bg-emerald-100 group-hover:border-emerald-300',
      hoverBorder: 'hover:border-emerald-300 hover:shadow-[0_16px_32px_-10px_rgba(16,185,129,0.15)]',
      titleHover: 'group-hover:text-emerald-600',
      accentText: 'text-emerald-600 hover:text-emerald-800',
      btnSecondary: 'bg-emerald-50/80 hover:bg-emerald-100 text-emerald-700 border-emerald-200/80',
    },
    amber: {
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      iconBox: 'bg-amber-50 text-amber-600 border-amber-200 group-hover:bg-amber-100 group-hover:border-amber-300',
      hoverBorder: 'hover:border-amber-300 hover:shadow-[0_16px_32px_-10px_rgba(245,158,11,0.15)]',
      titleHover: 'group-hover:text-amber-600',
      accentText: 'text-amber-600 hover:text-amber-800',
      btnSecondary: 'bg-amber-50/80 hover:bg-amber-100 text-amber-700 border-amber-200/80',
    }
  };

  const style = colorStyles[project.themeColor] || colorStyles.indigo;

  return (
    <div 
      className={`glass-card p-3.5 sm:p-4 rounded-xl flex flex-col justify-between group relative overflow-hidden transition-all duration-300 ${style.hoverBorder}`}
    >
      {/* Subtle top decorative accent light */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accentHex}, transparent)` }}
      />

      <div>
        {/* Top Header: Icon & Category Tag */}
        <div className="flex items-start justify-between mb-2.5">
          <div 
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center text-lg sm:text-xl transition-transform duration-300 group-hover:scale-105 shadow-2xs ${style.iconBox}`}
          >
            <span>{project.iconEmoji}</span>
          </div>

          <div className="flex items-center">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style.badgeBg}`}>
              {lang === 'zh' ? project.categoryLabelZh : project.categoryLabel}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-base sm:text-[17px] font-bold mb-1.5 leading-snug">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-slate-900 transition-colors ${style.titleHover} hover:underline`}
          >
            {lang === 'zh' ? project.titleZh : project.title}
          </a>
        </h2>

        {/* Description - Full display with comfortable readability */}
        <p className="text-xs sm:text-[13px] text-slate-600 font-normal leading-relaxed mb-3">
          {lang === 'zh' ? project.descriptionZh : project.description}
        </p>

        {/* Metrics Grid preview */}
        <div className="grid grid-cols-2 gap-2 mb-3 p-2.5 rounded-lg bg-slate-50/90 border border-slate-100">
          {project.metrics.slice(0, 2).map((m, idx) => (
            <div key={idx} className="flex flex-col min-w-0">
              <span className="text-[11px] text-slate-500 truncate font-medium">
                {lang === 'zh' ? m.labelZh : m.label}
              </span>
              <div className="flex items-baseline gap-1 mt-0.5 truncate">
                <span className="text-sm font-bold font-mono text-slate-900 truncate">{m.value}</span>
                {m.change && (
                  <span className="text-[11px] font-mono text-emerald-600 font-semibold shrink-0">
                    {m.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.techStack.slice(0, 4).map((tech, idx) => (
            <span 
              key={idx} 
              className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 border border-slate-200/70 text-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Action Buttons - Directly Open Project Webpage */}
      <div className="pt-2 border-t border-slate-100">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} on ${project.url}`}
          data-testid={`demo-btn-${project.id}`}
          className={`w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-[13px] font-semibold border transition-all cursor-pointer shadow-2xs ${style.btnSecondary} hover:shadow-xs`}
        >
          <span>{lang === 'zh' ? '直接打开对应网页' : 'Open Website'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
};
