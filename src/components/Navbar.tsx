import React, { useState, useRef, useEffect } from 'react';
import { Globe, Mail, ExternalLink, ChevronDown, Check } from 'lucide-react';
import { Language } from '../types/index.ts';

interface NavbarProps {
  lang: Language;
  onSelectLang: (lang: Language) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onSelectLang, onOpenContact }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'en' as Language, label: 'English', native: 'English', flag: '🇺🇸' },
    { code: 'zh' as Language, label: 'Chinese (Simplified)', native: '简体中文', flag: '🇨🇳' },
  ];

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-xl transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <a 
          href="https://gz2ai.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-[1.5px] shadow-sm shadow-indigo-500/20 group-hover:shadow-indigo-500/30 transition-shadow">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-xs font-bold font-mono tracking-tighter text-indigo-300">
              GZ
            </div>
          </div>
          <div className="text-left">
            <span className="text-sm font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              George Zhang
            </span>
            <p className="text-[11px] text-slate-500 hidden sm:block font-light">
              {lang === 'zh' ? '人工智能驱动软件生态系统' : 'AI-Powered Software Suite'}
            </p>
          </div>
        </a>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(prev => !prev)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
              aria-label="Language selection dropdown menu"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all cursor-pointer shadow-2xs"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <span>{currentLang.native}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div 
                role="listbox"
                className="absolute right-0 mt-1.5 w-56 rounded-xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                  {lang === 'zh' ? '选择语言' : 'Select Language'}
                </div>
                {languages.map(item => {
                  const isSelected = item.code === lang;
                  return (
                    <button
                      key={item.code}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onSelectLang(item.code);
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50 text-indigo-700 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <span className="text-sm">{item.flag}</span>
                        <span>{item.native}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({item.label})</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 stroke-[2.5] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Contact Button */}
          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-all cursor-pointer shadow-2xs"
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lang === 'zh' ? '联系作者' : 'Contact'}</span>
          </button>

          {/* Direct visit button */}
          <a
            href="https://gz2ai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <span>gz2ai.com</span>
            <ExternalLink className="w-3 h-3" />
          </a>

        </div>

      </div>
    </header>
  );
};
