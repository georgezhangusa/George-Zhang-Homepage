/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ProjectCard } from './components/ProjectCard.tsx';
import { ProjectModal } from './components/ProjectModal.tsx';
import { ArchitectureSection } from './components/ArchitectureSection.tsx';
import { FounderSection } from './components/FounderSection.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { Footer } from './components/Footer.tsx';
import { PROJECTS_DATA } from './data/projectsData.ts';
import { filterProjects } from './utils/projects.ts';
import { Language, ProjectCategory, ProjectItem } from './types/index.ts';
import { RefreshCw } from 'lucide-react';

export default function App() {
  // Default language is set to English as requested
  const [lang, setLang] = useState<Language>('en');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    return filterProjects(PROJECTS_DATA, selectedCategory, searchQuery);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col relative selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      
      {/* Global Navbar with Dropdown Language Selector */}
      <Navbar
        lang={lang}
        onSelectLang={setLang}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Hero Section */}
        <HeroSection
          lang={lang}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalProjects={PROJECTS_DATA.length}
        />

        {/* Project Cards Section */}
        <section className="mt-4 mb-16">
          <div className="flex items-center justify-between mb-6 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                {lang === 'zh' ? '核心 AI 旗舰系统' : 'Core Flagship Platforms'}
              </h2>
            </div>
            <span className="text-xs font-mono font-medium text-slate-500">
              {filteredProjects.length} {lang === 'zh' ? '个系统已就绪' : 'Systems Online'}
            </span>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  lang={lang}
                  onOpenModal={setSelectedProject}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl border border-slate-200 bg-white shadow-xs my-6">
              <p className="text-slate-600 text-sm mb-4">
                {lang === 'zh'
                  ? `未找到与 “${searchQuery}” 匹配的系统。`
                  : `No systems found matching "${searchQuery}".`}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer border border-slate-200"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{lang === 'zh' ? '重置筛选条件' : 'Reset Filters'}</span>
              </button>
            </div>
          )}
        </section>

        {/* Architecture Infrastructure Section */}
        <ArchitectureSection lang={lang} />

        {/* Founder & Contact Section */}
        <FounderSection
          lang={lang}
          onOpenContact={() => setIsContactOpen(true)}
        />

      </main>

      {/* Global Footer */}
      <Footer
        lang={lang}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Interactive Project Simulator Modal */}
      <ProjectModal
        project={selectedProject}
        lang={lang}
        onClose={() => setSelectedProject(null)}
      />

      {/* Contact & Inquiries Modal */}
      <ContactModal
        isOpen={isContactOpen}
        lang={lang}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}
