import React from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { Sparkles, Globe, ShieldAlert, PlusCircle } from 'lucide-react';

interface HeaderProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  demoMode: boolean;
  onToggleDemoMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  currentPage,
  onNavigate,
  demoMode,
  onToggleDemoMode,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('landing')}
            className="text-left group flex items-center gap-2.5 focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-emerald-400 flex items-center justify-center font-bold text-lg shadow-sm">
              🇵🇰
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
              AI Local Problem Solver
            </span>
          </button>
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('landing')}
            className={`transition-colors hover:text-slate-900 py-1 ${
              currentPage === 'landing' ? 'text-slate-950 font-semibold border-b-2 border-emerald-600' : ''
            }`}
          >
            {t.navHome}
          </button>
          <button
            onClick={() => onNavigate('solve')}
            className={`transition-colors hover:text-slate-900 py-1 ${
              currentPage === 'solve' ? 'text-slate-950 font-semibold border-b-2 border-emerald-600' : ''
            }`}
          >
            {t.navSolve}
          </button>
          <button
            onClick={() => onNavigate('document')}
            className={`transition-colors hover:text-slate-900 py-1 ${
              currentPage === 'document' ? 'text-slate-950 font-semibold border-b-2 border-emerald-600' : ''
            }`}
          >
            {t.navDocument}
          </button>
          <button
            onClick={() => onNavigate('departments')}
            className={`transition-colors hover:text-slate-900 py-1 ${
              currentPage === 'departments' ? 'text-slate-950 font-semibold border-b-2 border-emerald-600' : ''
            }`}
          >
            {t.navDepartments}
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className={`transition-colors hover:text-slate-900 py-1 ${
              currentPage === 'dashboard' ? 'text-slate-950 font-semibold border-b-2 border-emerald-600' : ''
            }`}
          >
            {t.navDashboard}
          </button>
        </nav>

        {/* Zone 3: Language Selector, Demo Mode Toggle & Primary Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 hidden sm:block" />
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                currentLanguage === 'en' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('ur')}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                currentLanguage === 'ur' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              اردو
            </button>
            <button
              onClick={() => onLanguageChange('ur-roman')}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                currentLanguage === 'ur-roman' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Roman
            </button>
            <button
              onClick={() => onLanguageChange('ps')}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                currentLanguage === 'ps' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              پښتو
            </button>
          </div>

          {/* Demo Mode Toggle */}
          <button
            onClick={onToggleDemoMode}
            title={demoMode ? 'Demo Mode Active (offline-resilient)' : 'Live AI Mode Active'}
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border transition-all ${
              demoMode
                ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-xs'
                : 'bg-emerald-50 text-emerald-800 border-emerald-300'
            }`}
          >
            {demoMode ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Demo Mode</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Live AI Mode</span>
              </>
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => onNavigate('solve')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shadow-xs"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">{t.describeProblemCTA}</span>
            <span className="sm:hidden">{t.navSolve}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
