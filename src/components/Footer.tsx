import React from 'react';
import { Language } from '../types/index.ts';

interface FooterProps {
  lang: Language;
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="mt-8 border-t border-slate-200 py-4 sm:py-5 bg-slate-100/90 text-slate-500 text-[11px]">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 flex items-center justify-center text-center">
        
        {/* Copyright */}
        <div className="space-y-0.5">
          <p className="font-medium tracking-wide text-slate-700">
            &copy; 2026 George Zhang. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
