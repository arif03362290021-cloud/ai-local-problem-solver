import React, { useState, useEffect } from 'react';
import {
  SupportedLanguage,
  ProblemCategory,
  ProblemAnalysis,
  SavedProblemRecord,
} from './types';
import { TRANSLATIONS, isRtlLanguage } from './i18n/translations';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { LandingPage } from './pages/LandingPage';
import { ProblemInputPage } from './pages/ProblemInputPage';
import { SolutionDashboardPage } from './pages/SolutionDashboardPage';
import { ApplicationGeneratorPage } from './pages/ApplicationGeneratorPage';
import { DocumentAnalysisPage } from './pages/DocumentAnalysisPage';
import { DepartmentFinderPage } from './pages/DepartmentFinderPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdminPanelPage } from './pages/AdminPanelPage';
import { DEMO_PRESETS } from './data/demoPresets';
import { analyzeProblem, checkServerHealth } from './services/apiService';
import {
  saveProblem,
  toggleBookmarkSolution,
  getBookmarkedSolutionIds,
  getUserPreferences,
  setUserPreferences,
} from './services/storageService';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [currentPage, setCurrentPage] = useState<
    | 'landing'
    | 'solve'
    | 'solution'
    | 'application'
    | 'document'
    | 'departments'
    | 'dashboard'
    | 'admin'
  >('landing');

  const [demoMode, setDemoMode] = useState<boolean>(() => {
    return getUserPreferences().demoMode;
  });

  const [currentAnalysis, setCurrentAnalysis] = useState<ProblemAnalysis | null>(null);
  const [activeProblemRecord, setActiveProblemRecord] = useState<SavedProblemRecord | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [appNotification, setAppNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Prefilled states for solve page
  const [prefilledText, setPrefilledText] = useState('');
  const [prefilledCategory, setPrefilledCategory] = useState<ProblemCategory | undefined>(undefined);

  // Loading state with 3-step animation
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  // Sync RTL/LTR with selected language
  useEffect(() => {
    const isRtl = isRtlLanguage(currentLanguage);
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
    if (isRtl) {
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
    }
  }, [currentLanguage]);

  // Initial health check on mount
  useEffect(() => {
    checkServerHealth().then((health) => {
      if (!health.hasApiKey) {
        setDemoMode(true);
      }
    });
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setAppNotification({ message, type });
    setTimeout(() => setAppNotification(null), 4000);
  };

  const handleToggleDemoMode = () => {
    const newVal = !demoMode;
    setDemoMode(newVal);
    setUserPreferences({ demoMode: newVal });
    showNotification(
      newVal ? 'Demo Mode enabled (offline domain intelligence)' : 'Live AI Mode enabled (Gemini 3.8 Flash)',
      'success'
    );
  };

  const handleSelectPreset = (presetId: string) => {
    const preset = DEMO_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    setCurrentLanguage(preset.language);
    setCurrentAnalysis(preset.analysis);

    const record: SavedProblemRecord = {
      id: `record-${Date.now()}`,
      title: preset.analysis.problem_title,
      category: preset.category,
      originalText: preset.userInput,
      language: preset.language,
      createdAt: new Date().toISOString(),
      status: 'New',
      analysis: preset.analysis,
      completedSteps: [],
      completedDocs: [],
    };
    saveProblem(record);
    setActiveProblemRecord(record);
    setIsSaved(true);
    setCurrentPage('solution');
  };

  const handleSubmitProblem = async (
    problemText: string,
    language: SupportedLanguage,
    category?: ProblemCategory,
    fileData?: { mimeType: string; base64: string; name: string } | null
  ) => {
    setIsLoading(true);
    setLoadingStep(0);

    const step1 = setTimeout(() => setLoadingStep(1), 1000);
    const step2 = setTimeout(() => setLoadingStep(2), 2200);

    try {
      const response = await analyzeProblem(
        problemText,
        language,
        category,
        fileData || undefined,
        demoMode
      );

      clearTimeout(step1);
      clearTimeout(step2);

      setCurrentAnalysis(response.data);

      const record: SavedProblemRecord = {
        id: `prob-${Date.now()}`,
        title: response.data.problem_title || 'Citizen Problem',
        category: response.data.category || category || 'Government Services',
        originalText: problemText,
        language: language,
        createdAt: new Date().toISOString(),
        status: 'New',
        analysis: response.data,
        completedSteps: [],
        completedDocs: [],
      };
      saveProblem(record);
      setActiveProblemRecord(record);
      setIsSaved(false);

      setCurrentPage('solution');
      showNotification('Problem analyzed successfully!', 'success');
    } catch (err) {
      console.error(err);
      showNotification('Using fallback civic procedural rules.', 'error');
    } finally {
      setIsLoading(false);
      setLoadingStep(0);
    }
  };

  const handleSaveProblem = () => {
    if (activeProblemRecord) {
      const isBookmarked = toggleBookmarkSolution(activeProblemRecord.id);
      setIsSaved(isBookmarked);
      showNotification(
        isBookmarked ? 'Solution bookmarked to Dashboard!' : 'Bookmark removed',
        'success'
      );
    }
  };

  const handleViewSavedProblem = (problem: SavedProblemRecord) => {
    setActiveProblemRecord(problem);
    setCurrentAnalysis(problem.analysis);
    setCurrentLanguage(problem.language);
    const bookmarkedIds = getBookmarkedSolutionIds();
    setIsSaved(bookmarkedIds.includes(problem.id));
    setCurrentPage('solution');
  };

  const handleNavigateToSolveWithCategory = (cat: ProblemCategory) => {
    setPrefilledCategory(cat);
    setPrefilledText('');
    setCurrentPage('solve');
  };

  const navigateTo = (page: any) => {
    if (page === 'solve') {
      setPrefilledText('');
      setPrefilledCategory(undefined);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 md:pb-0 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Bar Header */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        currentPage={currentPage}
        onNavigate={navigateTo}
        demoMode={demoMode}
        onToggleDemoMode={handleToggleDemoMode}
      />

      {/* Floating In-App Toast Notification */}
      {appNotification && (
        <aside
          aria-label="Application notification"
          className="fixed top-20 right-4 z-50 max-w-sm bg-white border border-slate-200 shadow-xl rounded-xl p-3 flex items-center gap-2.5 transition-all"
        >
          {appNotification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          )}
          <span className="text-xs font-medium text-slate-800 flex-1">
            {appNotification.message}
          </span>
          <button
            onClick={() => setAppNotification(null)}
            className="text-slate-400 hover:text-slate-600 p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </aside>
      )}

      {/* Demo Mode Banner (when active) */}
      {demoMode && (
        <aside
          aria-label="Demo mode announcement"
          className="bg-amber-100/90 border-b border-amber-200 text-amber-950 px-4 py-1.5 text-xs text-center flex items-center justify-center gap-2 no-print"
        >
          <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
          <span className="font-semibold">Demo Mode Active:</span>
          <span>
            Operating with built-in domain intelligence for Pakistan and Khyber Pakhtunkhwa.
          </span>
        </aside>
      )}

      {/* Page Routing */}
      <main className="flex-1">
        {currentPage === 'landing' && (
          <LandingPage
            currentLanguage={currentLanguage}
            onNavigate={navigateTo}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {currentPage === 'solve' && (
          <ProblemInputPage
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
            onSubmitProblem={handleSubmitProblem}
            isLoading={isLoading}
            loadingStep={loadingStep}
            prefilledText={prefilledText}
            prefilledCategory={prefilledCategory}
          />
        )}

        {currentPage === 'solution' && currentAnalysis && (
          <SolutionDashboardPage
            analysis={currentAnalysis}
            currentLanguage={currentLanguage}
            onNavigate={navigateTo}
            onOpenApplicationGenerator={() => navigateTo('application')}
            onSaveProblem={handleSaveProblem}
            isSaved={isSaved}
            onInspectDocument={() => navigateTo('document')}
            problemRecordId={activeProblemRecord?.id}
            initialCompletedSteps={activeProblemRecord?.completedSteps || []}
            initialCompletedDocs={activeProblemRecord?.completedDocs || []}
          />
        )}

        {currentPage === 'application' && currentAnalysis && (
          <ApplicationGeneratorPage
            analysis={currentAnalysis}
            currentLanguage={currentLanguage}
            onBack={() => navigateTo('solution')}
          />
        )}

        {currentPage === 'document' && (
          <DocumentAnalysisPage
            currentLanguage={currentLanguage}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'departments' && (
          <DepartmentFinderPage
            currentLanguage={currentLanguage}
            onNavigateToSolveWithCategory={handleNavigateToSolveWithCategory}
          />
        )}

        {currentPage === 'dashboard' && (
          <UserDashboardPage
            currentLanguage={currentLanguage}
            onViewProblem={handleViewSavedProblem}
            onNavigateToSolve={() => {
              setPrefilledText('');
              setPrefilledCategory(undefined);
              navigateTo('solve');
            }}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPanelPage
            currentLanguage={currentLanguage}
            onNavigateHome={() => navigateTo('landing')}
          />
        )}
      </main>

      {/* Authoritative Footer */}
      <Footer
        currentLanguage={currentLanguage}
        onNavigate={navigateTo}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        currentPage={currentPage}
        onNavigate={navigateTo}
        currentLanguage={currentLanguage}
      />
    </div>
  );
}
