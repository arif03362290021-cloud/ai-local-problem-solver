import React from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import {
  Home,
  PlusCircle,
  FileSearch,
  Building2,
  LayoutDashboard,
} from 'lucide-react';

interface MobileNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  currentLanguage: SupportedLanguage;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentPage,
  onNavigate,
  currentLanguage,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const navItems = [
    { id: 'landing', label: t.navHome, icon: Home },
    { id: 'solve', label: t.navSolve, icon: PlusCircle },
    { id: 'document', label: t.navDocument, icon: FileSearch },
    { id: 'departments', label: t.navDepartments, icon: Building2 },
    { id: 'dashboard', label: t.navDashboard, icon: LayoutDashboard },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-3 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-emerald-700 font-bold'
                  : 'text-slate-500 hover:text-slate-900 font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600 scale-110' : ''}`} />
              <span className="text-[10px] mt-0.5 whitespace-nowrap truncate max-w-[60px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
