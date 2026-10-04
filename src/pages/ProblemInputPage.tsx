import React, { useState, useEffect } from 'react';
import { SupportedLanguage, ProblemCategory } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { VoiceInputButton } from '../components/VoiceInputButton';
import { DocumentUploadZone } from '../components/DocumentUploadZone';
import { DEMO_PRESETS, DemoPreset } from '../data/demoPresets';
import { Sparkles, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

interface ProblemInputPageProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onSubmitProblem: (
    problemText: string,
    language: SupportedLanguage,
    category?: ProblemCategory,
    fileData?: { mimeType: string; base64: string; name: string } | null
  ) => void;
  isLoading: boolean;
  loadingStep: number; // 0, 1, 2
  prefilledText?: string;
  prefilledCategory?: ProblemCategory;
}

const CATEGORIES: ProblemCategory[] = [
  'Electricity & Utilities',
  'Government Services',
  'Education',
  'Jobs & Career',
  'Documents & Identity',
  'Agriculture',
  'Healthcare',
  'Small Business',
  'Transport',
  'Legal Information',
  'Other',
];

export const ProblemInputPage: React.FC<ProblemInputPageProps> = ({
  currentLanguage,
  onLanguageChange,
  onSubmitProblem,
  isLoading,
  loadingStep,
  prefilledText = '',
  prefilledCategory,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const [problemText, setProblemText] = useState(prefilledText);
  const [selectedCategory, setSelectedCategory] = useState<ProblemCategory | ''>(
    prefilledCategory || ''
  );
  const [selectedFile, setSelectedFile] = useState<{
    mimeType: string;
    base64: string;
    name: string;
  } | null>(null);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (prefilledText) {
      setProblemText(prefilledText);
    }
    if (prefilledCategory) {
      setSelectedCategory(prefilledCategory);
    }
  }, [prefilledText, prefilledCategory]);

  const handleVoiceTranscript = (transcript: string) => {
    setProblemText((prev) => (prev ? `${prev} ${transcript}` : transcript));
    setValidationError('');
  };

  const handleApplyPreset = (preset: DemoPreset) => {
    setProblemText(preset.userInput);
    setSelectedCategory(preset.category);
    onLanguageChange(preset.language);
    setValidationError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemText.trim()) {
      setValidationError('Please describe your problem or select one of the demo cases below.');
      return;
    }
    setValidationError('');
    onSubmitProblem(
      problemText.trim(),
      currentLanguage,
      selectedCategory || undefined,
      selectedFile
    );
  };

  // Loading Screen
  if (isLoading) {
    const loadingMessages = [
      'Understanding your problem...',
      'Finding relevant departments & legal procedures in Pakistan...',
      'Preparing your step-by-step solution dashboard...',
    ];

    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {loadingMessages[loadingStep] || loadingMessages[0]}
            </h3>
            <p className="text-sm text-slate-500">
              Analyzing administrative rules, required documents, and drafting formal representation...
            </p>
          </div>

          {/* Stepper Progress */}
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-emerald-600 h-2.5 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${((loadingStep + 1) / 3) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-3 text-xs font-medium text-slate-500 pt-2 border-t border-slate-100">
            <span className={loadingStep >= 0 ? 'text-emerald-700 font-semibold' : ''}>
              1. Interpretation
            </span>
            <span className={loadingStep >= 1 ? 'text-emerald-700 font-semibold' : ''}>
              2. Dept Mapping
            </span>
            <span className={loadingStep >= 2 ? 'text-emerald-700 font-semibold' : ''}>
              3. Solution Synthesis
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-left">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.inputHeading}
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          {t.inputSubtext}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Input Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          {/* Top Options Bar (Language & Category) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2 border-b border-slate-100">
            {/* Language Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.languageSelectLabel}
              </label>
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => onLanguageChange('en')}
                  className={`py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    currentLanguage === 'en'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => onLanguageChange('ur')}
                  className={`py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    currentLanguage === 'ur'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  اردو
                </button>
                <button
                  type="button"
                  onClick={() => onLanguageChange('ur-roman')}
                  className={`py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    currentLanguage === 'ur-roman'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Roman
                </button>
                <button
                  type="button"
                  onClick={() => onLanguageChange('ps')}
                  className={`py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    currentLanguage === 'ps'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  پښتو
                </button>
              </div>
            </div>

            {/* Category Selector */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  {t.categorySelectLabel}
                </label>
                <span className="text-[11px] text-slate-400">({t.optionalLabel})</span>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ProblemCategory)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Auto-Detect by AI</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Large Problem Textarea */}
          <div className="relative">
            <textarea
              rows={5}
              value={problemText}
              onChange={(e) => {
                setProblemText(e.target.value);
                if (validationError) setValidationError('');
              }}
              placeholder={
                currentLanguage === 'ur'
                  ? 'اپنا مسئلہ یہاں لکھیں (مثلاً: میرا بجلی کا بل بہت زیادہ آیا ہے اور مجھے سمجھ نہیں آ رہا کیوں)...'
                  : currentLanguage === 'ps'
                  ? 'خپله ستونزه دلته ولیکئ (لکه: زموږ د بریښنا بل بې حده زیات راغلی دی)...'
                  : currentLanguage === 'ur-roman'
                  ? 'Apna masla yahan likhein (maslan: Mera bijli ka bill bohat zyada aya hai aur mujhe samajh nahi aa raha kyun)...'
                  : 'Describe your problem in detail (e.g. My electricity bill is unusually high, my university degree verification is delayed, or how to get my Kisan card)...'
              }
              className={`w-full p-4 rounded-xl border text-sm sm:text-base leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                currentLanguage === 'ur' || currentLanguage === 'ps' ? 'font-urdu text-right' : ''
              } ${
                validationError
                  ? 'border-rose-400 bg-rose-50/20'
                  : 'border-slate-300 focus:border-transparent bg-slate-50/40'
              }`}
            />

            {/* Quick Actions inside Textarea Bottom (Voice + Character count) */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <VoiceInputButton
                  language={currentLanguage}
                  onTranscript={handleVoiceTranscript}
                />
                <span className="text-xs text-slate-400 hidden sm:inline">
                  Speak in your local accent
                </span>
              </div>
              <span className="text-xs text-slate-400">
                {problemText.length} characters
              </span>
            </div>
          </div>

          {validationError && (
            <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 p-3 rounded-lg border border-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Document / Photo Upload Area */}
          <div className="pt-2">
            <DocumentUploadZone
              onFileSelect={setSelectedFile}
              selectedFile={selectedFile}
              compact
            />
          </div>
        </div>

        {/* Submit Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            🔒 Privacy First: Personal details are not saved permanently without your explicit consent.
          </p>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{t.analyzeButton}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </form>

      {/* Quick Demo Presets Grid */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <div className="mb-4">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            {t.quickDemoLabel}
          </h2>
          <p className="text-xs text-slate-500">
            {t.quickDemoSubtext}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DEMO_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="text-left p-3.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-xs transition-all group"
            >
              <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-700 mb-1">
                <span>{preset.category}</span>
                <span className="text-slate-400 font-normal uppercase">{preset.language}</span>
              </div>
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                {preset.title}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                "{preset.userInput}"
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
