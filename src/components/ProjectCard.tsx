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
    }
  };

  const style = colorStyles[project.themeColor];

  return (
    <div 
      className={`glass-card p-6 rounded-2xl flex flex-col justify-between group relative overflow-hidden transition-all duration-300 ${style.hoverBorder}`}
    >
      {/* Subtle top decorative accent light */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2.5px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accentHex}, transparent)` }}
      />

      <div>
        {/* Top Header: Icon & Category Tag */}
        <div className="flex items-start justify-between mb-5">
          <div 
            className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-105 shadow-2xs ${style.iconBox}`}
          >
            <span>{project.iconEmoji}</span>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${style.badgeBg}`}>
              {lang === 'zh' ? project.categoryLabelZh : project.categoryLabel}
            </span>
            <span className="text-[10px] text-slate-400 font-mono font-medium">
              PROD LIVE
            </span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <h2 className={`text-xl sm:text-2xl font-bold mb-1.5 text-slate-900 transition-colors ${style.titleHover}`}>
          {lang === 'zh' ? project.titleZh : project.title}
        </h2>

        <p className="text-xs text-slate-500 font-medium mb-3">
          {lang === 'zh' ? project.subTitleZh : project.subTitle}
        </p>

        {/* Description */}
        <p className="text-sm text-slate-600 font-normal leading-relaxed mb-5">
          {lang === 'zh' ? project.descriptionZh : project.description}
        </p>

        {/* Metrics Grid preview */}
        <div className="grid grid-cols-2 gap-2 mb-5 p-3 rounded-xl bg-slate-50/90 border border-slate-100">
          {project.metrics.slice(0, 2).map((m, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-[10px] text-slate-500 truncate font-medium">
                {lang === 'zh' ? m.labelZh : m.label}
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-sm font-bold font-mono text-slate-900">{m.value}</span>
                {m.change && (
                  <span className="text-[10px] font-mono text-emerald-600 font-semibold">
                    {m.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.slice(0, 4).map((tech, idx) => (
            <span 
              key={idx} 
              className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/60 text-slate-600"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Action Buttons */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        
        {/* Interactive Demo Trigger */}
        <button
          onClick={() => onOpenModal(project)}
          aria-label={`Open interactive demo for ${project.title}`}
          data-testid={`demo-btn-${project.id}`}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-2xs ${style.btnSecondary}`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{lang === 'zh' ? '交互推演' : 'Interactive Demo'}</span>
        </button>

        {/* Direct Link to System */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.title} on ${project.url}`}
          data-testid={`visit-link-${project.id}`}
          className={`inline-flex items-center gap-1 text-xs font-semibold ${style.accentText} hover:underline group-hover:translate-x-0.5 transition-transform`}
        >
          <span>{lang === 'zh' ? '访问系统' : 'Visit System'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>

      </div>

    </div>
  );
};
