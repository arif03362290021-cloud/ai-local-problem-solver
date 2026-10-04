import React from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { ShieldCheck, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  currentLanguage: SupportedLanguage;
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLanguage, onNavigate }) => {
  const t = TRANSLATIONS[currentLanguage];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust & Official Disclaimer Box */}
        <div className="bg-slate-800/80 rounded-xl p-5 sm:p-6 border border-slate-700 mb-10 text-sm">
          <div className="flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold text-base mb-1">
                {t.officialDisclaimer}
              </h4>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                {t.disclaimerNotice}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800 text-sm">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-bold text-white tracking-tight">AI Local Problem Solver</span>
              <span className="text-xs bg-slate-800 text-emerald-400 px-2 py-0.5 rounded border border-slate-700">Pakistan & KP</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Democratizing public administrative literacy. Helping citizens, students, job seekers, and farmers navigate Pakistani civic procedures in English, Urdu, Roman Urdu, and Pashto.
            </p>
          </div>

          <div>
            <h5 className="text-white font-medium mb-3 text-xs uppercase tracking-wider">Quick Navigation</h5>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate('landing')} className="hover:text-white transition-colors">
                  {t.navHome}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('solve')} className="hover:text-white transition-colors">
                  {t.navSolve}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('document')} className="hover:text-white transition-colors">
                  {t.navDocument}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('departments')} className="hover:text-white transition-colors">
                  {t.navDepartments}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">
                  {t.navDashboard}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-medium mb-3 text-xs uppercase tracking-wider">Official Portals</h5>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="https://ccms.pitc.com.pk" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span>PESCO / CCMS Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://nadra.gov.pk" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span>NADRA Citizen Services</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://kppsc.gov.pk" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span>KPPSC Jobs Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://bisep.edu.pk" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span>BISE Peshawar Board</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://sehatcardplus.gov.pk" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span>Sehat Card Plus KP</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} AI Local Problem Solver. Built for Pakistani citizens with privacy first.</p>
          <div className="flex items-center gap-4">
            <span>Powered by Google Gemini 3.8</span>
            <span>·</span>
            <button onClick={() => onNavigate('admin')} className="text-slate-500 hover:text-slate-300">
              Admin & Analytics
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
