import React from 'react';
import { Search } from 'lucide-react';
import { Language, ProjectCategory } from '../types/index.ts';

interface HeroSectionProps {
  lang: Language;
  selectedCategory: ProjectCategory;
  onSelectCategory: (cat: ProjectCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalProjects: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const categories: { id: ProjectCategory; label: string; labelZh: string }[] = [
    { id: 'all', label: 'All Projects', labelZh: '全部项目' },
    { id: 'energy', label: 'CleanTech & Energy', labelZh: '储能与算力' },
    { id: 'enterprise', label: 'Enterprise Systems', labelZh: '企业核心系统' },
    { id: 'healthcare', label: 'Other', labelZh: '其它' },
  ];

  return (
    <section className="relative pt-6 pb-4 sm:pt-8 sm:pb-5 text-center overflow-hidden">
      
      {/* Ambient background glow orbs for light background */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-indigo-200/25 rounded-full blur-[100px] pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-2 right-1/4 w-[280px] h-[280px] bg-pink-200/20 rounded-full blur-[90px] pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute top-1/3 left-1/4 w-[240px] h-[240px] bg-purple-200/20 rounded-full blur-[80px] pointer-events-none" 
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Hero Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 mb-2 leading-tight">
          George Zhang's AI Projects
        </h1>

        {/* Subtitle */}
        <p className="text-slate-700 text-sm sm:text-base font-bold max-w-2xl mx-auto leading-relaxed mb-5">
          {lang === 'zh'
            ? '探索以人工智能为驱动的下一代软件生态系统'
            : 'Exploring next-generation AI-driven software ecosystems'}
        </p>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 max-w-4xl mx-auto">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 p-1 rounded-xl bg-slate-200/70 border border-slate-200 backdrop-blur-md w-full md:w-auto">
            {categories.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                  }`}
                >
                  {lang === 'zh' ? cat.labelZh : cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder={lang === 'zh' ? '搜索功能、技术栈或系统...' : 'Search system, tech stack...'}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs sm:text-sm bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-1"
              >
                ✕
              </button>
            )}
          </div>

        </div>

      </div>

    </section>
  );
};
