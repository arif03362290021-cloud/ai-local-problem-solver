import React from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  GraduationCap,
  Briefcase,
  FileText,
  Sprout,
  Building2,
  Store,
  Car,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface LandingPageProps {
  currentLanguage: SupportedLanguage;
  onNavigate: (page: string) => void;
  onSelectPreset: (presetId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  currentLanguage,
  onNavigate,
  onSelectPreset,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const problemCategories = [
    {
      icon: Zap,
      title: 'Electricity & Utilities',
      titleUrdu: 'بجلی و یوٹیلیٹیز',
      desc: 'PESCO, TESCO bills, meter over-reading, sudden slab jump, load shedding faults.',
      presetId: 'demo-electricity-bill',
    },
    {
      icon: GraduationCap,
      title: 'Education & Admissions',
      titleUrdu: 'تعلیم و اسناد',
      desc: 'BISE Peshawar/Mardan verification, HEC degree attestation, duplicate sanad.',
      presetId: 'demo-university-admission',
    },
    {
      icon: Briefcase,
      title: 'Jobs & Career',
      titleUrdu: 'ملازمت و کیریئر',
      desc: 'KPPSC, ETEA recruitment screening, zonal quota discrepancies, syllabus guidance.',
      presetId: 'demo-job-kppsc',
    },
    {
      icon: FileText,
      title: 'Documents & Identity',
      titleUrdu: 'شناختی دستاویزات',
      desc: 'NADRA Smart CNIC renewal, B-Form corrections, Union Council birth certs, passports.',
      presetId: 'demo-nadra-cnic',
    },
    {
      icon: Sprout,
      title: 'Agriculture & Farming',
      titleUrdu: 'زراعت و کسان',
      desc: 'KP Kisan Card subsidy, pest attack diagnosis, certified seed advisory.',
      presetId: 'demo-farmer-crop',
    },
    {
      icon: Building2,
      title: 'Government Services',
      titleUrdu: 'سرکاری خدمات',
      desc: 'DC Office E-Khidmat, Domicile verification, Pakistan Citizen Portal complaints.',
      presetId: null,
    },
    {
      icon: Store,
      title: 'Small Business',
      titleUrdu: 'چھوٹے کاروبار',
      desc: 'KPRA sales tax on services, municipal trade licenses, shopkeeper disputes.',
      presetId: null,
    },
    {
      icon: Car,
      title: 'Transport & Traffic',
      titleUrdu: 'ٹرانسپورٹ و ٹریفک',
      desc: 'Computerized driving license renewal, vehicle token tax, traffic challan appeals.',
      presetId: null,
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero Section */}
      <section className="relative pt-6 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Regional Supported Languages Kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 w-fit px-3 py-1 rounded-md border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>{t.supportedLanguagesLabel}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-600">اردو · Roman Urdu · پښتو · English</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                {t.heroTitle}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {t.heroSubtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('solve')}
                  className="px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 group"
                >
                  <span>{t.describeProblemCTA}</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('how-it-works');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3.5 text-sm sm:text-base font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-xs"
                >
                  {t.seeHowItWorksCTA}
                </button>

                <button
                  onClick={() => onNavigate('document')}
                  className="px-5 py-3.5 text-sm sm:text-base font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors shadow-xs"
                >
                  Upload Bill / Document
                </button>
              </div>

              {/* Verified Trust Markers */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 border-t border-slate-200">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified KP & Pakistan Procedures</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Ready-to-print Official Applications</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Free Public AI Civic Tool</span>
                </div>
              </div>
            </div>

            {/* Right Visual Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 group">
                <img
                  src="/src/assets/images/hero_civic_guidance_1790919801020.jpg"
                  alt="Civic Problem Solver Guidance Center in Khyber Pakhtunkhwa"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback container if image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white text-left">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                      Live AI Civic Guidance
                    </span>
                  </div>
                  <p className="text-base font-bold text-white">
                    PESCO · NADRA · KPPSC · BISE · Agriculture
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    Helping citizens convert administrative obstacles into step-by-step checklist tasks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Demo Presets Banner for Instant Demonstration */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                <Zap className="w-4 h-4" />
                <span>Hackathon Instant Live Demo</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">
                Test with Real-Life Pakistani Scenarios
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Click any scenario below to see the full AI analysis, step-by-step procedure, required documents, and draft complaint:
              </p>
            </div>
            <button
              onClick={() => onNavigate('solve')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold rounded-lg self-start md:self-auto transition-colors whitespace-nowrap"
            >
              Custom Problem →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <button
              onClick={() => onSelectPreset('demo-electricity-bill')}
              className="text-left p-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 transition-all group"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-amber-400 mb-1">
                <span>Electricity · PESCO</span>
                <span className="text-[11px] bg-amber-400/10 px-1.5 py-0.5 rounded">High Urgency</span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                High Bill & Meter Reading Discrepancy
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                "Mera bijli ka bill is mahine 750 units par pohnch gaya jabkay meter reading kam lag rahi hai..."
              </p>
            </button>

            <button
              onClick={() => onSelectPreset('demo-university-admission')}
              className="text-left p-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 transition-all group"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-sky-400 mb-1">
                <span>Education · BISE & HEC</span>
                <span className="text-[11px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded">Urgent 10-Day</span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                Urgent BISE Verification & HEC Attestation
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Foreign master scholarship deadline in 10 days requiring sealed board envelope and walk-in token.
              </p>
            </button>

            <button
              onClick={() => onSelectPreset('demo-job-kppsc')}
              className="text-left p-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 transition-all group"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 mb-1">
                <span>Jobs · KPPSC</span>
                <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">Tehsildar Post</span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                Domicile Zonal Quota Clerical Correction
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Candidate passed screening test but inadvertently selected Zone 2 instead of Zone 3 on portal.
              </p>
            </button>

            <button
              onClick={() => onSelectPreset('demo-nadra-cnic')}
              className="text-left p-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 transition-all group"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-violet-400 mb-1">
                <span>Identity · نادرا</span>
                <span className="text-[11px] bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded">اردو</span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                نادرا ب فارم اور شناختی کارڈ کی درستی
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-urdu">
                بچے کے ب فارم میں والدہ کے شناختی کارڈ نمبر اور تاریخ پیدائش کی درستی کا مکمل طریقہ۔
              </p>
            </button>

            <button
              onClick={() => onSelectPreset('demo-farmer-crop')}
              className="text-left p-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 transition-all group"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-lime-400 mb-1">
                <span>Agriculture · کرنه</span>
                <span className="text-[11px] bg-lime-500/20 text-lime-300 px-1.5 py-0.5 rounded">پښتو</span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                د کسان کارډ سبسډي او د غنمو ژیړه کنګي
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-urdu">
                په سوات او مردان کې د غنمو په فصل د زراعت د محکمې وړیا مرسته او د کسان کارډ سپری رعایت۔
              </p>
            </button>

            <button
              onClick={() => onNavigate('document')}
              className="text-left p-4 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/60 transition-all group"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 mb-1">
                <span>Document AI Inspector</span>
                <span className="text-[11px] bg-emerald-400/20 text-emerald-200 px-1.5 py-0.5 rounded">Visual Inspection</span>
              </div>
              <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                Sample Utility Bill & Document Analysis
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                Test with a real PESCO bill sample: extracts reference number, slabs, taxes, and explains billing terms.
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
            <span>Simple 4-Step Process</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            How It Works
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            No complicated jargon. From your voice or text message to an official resolution procedure in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs relative">
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-base mb-4">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Tell us your problem
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Describe your issue in Urdu, Pashto, Roman Urdu, or English. You can also record voice or upload a photo/bill.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs relative">
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-base mb-4">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              AI understands & analyzes
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Gemini identifies the relevant Pakistani department, underlying reasons, urgency level, and administrative rules.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs relative">
            <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-base mb-4">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Get an actionable solution
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Receive a step-by-step procedure timeline, document checklist, office addresses, and an immediate next action.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs relative">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-base mb-4">
              04
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Take action with confidence
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Generate a formal application draft ready to copy/print, track your progress, or ask AI follow-up questions.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Problems We Can Help With Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Comprehensive Civic Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Problems We Can Help With
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Built specifically around the operational realities of public authorities in Pakistan and Khyber Pakhtunkhwa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {problemCategories.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-slate-800" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs font-urdu text-emerald-800 mb-2">{item.titleUrdu}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
                  {item.presetId ? (
                    <button
                      onClick={() => onSelectPreset(item.presetId!)}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                    >
                      Try Case Demo →
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigate('solve')}
                      className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1"
                    >
                      Submit Issue →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Trust & Disclaimer Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/90 rounded-2xl p-6 sm:p-10 border border-slate-200 text-left">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center shrink-0">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-slate-900">
                Built to make complex public information transparent and accessible
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.disclaimerNotice}
              </p>
            </div>
            <button
              onClick={() => onNavigate('departments')}
              className="shrink-0 px-4 py-2.5 bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
            >
              View Official Directory
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
