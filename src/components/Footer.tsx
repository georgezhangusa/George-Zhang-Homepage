import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Language } from '../types/index.ts';

interface FooterProps {
  lang: Language;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenContact }) => {
  return (
    <footer className="mt-20 border-t border-slate-200 py-10 bg-slate-100/90 text-slate-500 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Copyright */}
        <div className="text-center sm:text-left space-y-1">
          <p className="font-medium tracking-wide text-slate-700">
            &copy; 2026 George Zhang. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-500">
            {lang === 'zh' 
              ? '人工智能驱动的下一代软件生态系统 • 赋能医疗、新能源储能与核心业务管理' 
              : 'AI-Powered Software Suite • Healthcare Admissions, CleanTech Storage & Enterprise Operations'}
          </p>
        </div>

        {/* Center / Right: System Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600 font-mono text-[11px]">
          <a
            href="https://gz2ai.com/med"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition-colors font-medium"
          >
            Med Project
          </a>
          <span className="text-slate-300">•</span>
          <a
            href="https://gz2ai.com/bess"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-600 transition-colors font-medium"
          >
            BESS System
          </a>
          <span className="text-slate-300">•</span>
          <a
            href="https://gz2ai.com/cpms"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-600 transition-colors font-medium"
          >
            CPMS Portal
          </a>
          <span className="text-slate-300">•</span>
          <button
            onClick={onOpenContact}
            className="hover:text-slate-900 transition-colors cursor-pointer font-medium"
          >
            {lang === 'zh' ? '联系作者' : 'Contact'}
          </button>
          <span className="text-slate-300">•</span>
          <a
            href="https://gz2ai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 font-bold"
          >
            <span>gz2ai.com</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </footer>
  );
};
