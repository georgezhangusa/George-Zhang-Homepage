import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Language } from '../types/index.ts';

interface FooterProps {
  lang: Language;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenContact }) => {
  const links = [
    { name: 'AIDC', url: 'https://aidc.gz2ai.com/' },
    { name: 'EMS-BESS', url: 'https://ems-bess.gz2ai.com/' },
    { name: 'BBEM', url: 'https://bbem.gz2ai.com/' },
    { name: 'BAT-SOH', url: 'https://bat-soh.gz2ai.com/' },
    { name: 'CPMS', url: 'https://cpms.gz2ai.com/' },
    { name: 'CPEM', url: 'https://cpem.gz2ai.com/' },
    { name: 'Med Project', url: 'https://med.gz2ai.com/' },
  ];

  return (
    <footer className="mt-8 border-t border-slate-200 py-4 sm:py-5 bg-slate-100/90 text-slate-500 text-[11px]">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left: Copyright */}
        <div className="text-center sm:text-left space-y-0.5">
          <p className="font-medium tracking-wide text-slate-700">
            &copy; 2026 George Zhang. All rights reserved.
          </p>
          <p className="text-[10px] text-slate-500">
            {lang === 'zh' 
              ? '人工智能驱动的下一代软件生态系统 • 覆盖智算中心、储能电网、电池安全与临床决策' 
              : 'AI-Powered Software Suite • AI Data Centers, BESS Energy Storage, Battery SOH & Clinical Systems'}
          </p>
        </div>

        {/* Center / Right: System Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-slate-600 font-mono text-[10.5px]">
          {links.map((link, idx) => (
            <React.Fragment key={link.name}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 transition-colors font-medium"
              >
                {link.name}
              </a>
              {idx < links.length - 1 && <span className="text-slate-300">•</span>}
            </React.Fragment>
          ))}
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
            className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-0.5 font-bold"
          >
            <span>gz2ai.com</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>

      </div>
    </footer>
  );
};
