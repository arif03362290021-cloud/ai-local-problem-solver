import React, { useState, useEffect } from 'react';
import {
  SavedProblemRecord,
  SavedApplicationRecord,
  SupportedLanguage,
} from '../types';
import {
  getSavedProblems,
  getSavedApplications,
  getBookmarkedSolutionIds,
  deleteProblem,
  deleteApplication,
} from '../services/storageService';
import { TRANSLATIONS } from '../i18n/translations';
import {
  FolderOpen,
  Bookmark,
  FileText,
  BarChart3,
  CheckCircle2,
  Clock,
  ArrowRight,
  Trash2,
  Copy,
  Download,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface UserDashboardPageProps {
  currentLanguage: SupportedLanguage;
  onViewProblem: (problem: SavedProblemRecord) => void;
  onNavigateToSolve: () => void;
}

export const UserDashboardPage: React.FC<UserDashboardPageProps> = ({
  currentLanguage,
  onViewProblem,
  onNavigateToSolve,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'problems' | 'saved' | 'applications' | 'analytics'
  >('overview');

  const [problems, setProblems] = useState<SavedProblemRecord[]>([]);
  const [applications, setApplications] = useState<SavedApplicationRecord[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [copiedAppId, setCopiedAppId] = useState<string | null>(null);
  const [pendingDeleteProblemId, setPendingDeleteProblemId] = useState<string | null>(null);
  const [pendingDeleteAppId, setPendingDeleteAppId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setProblems(getSavedProblems());
    setApplications(getSavedApplications());
    setBookmarkedIds(getBookmarkedSolutionIds());
  };

  const handleDeleteProblem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (pendingDeleteProblemId === id) {
      deleteProblem(id);
      setPendingDeleteProblemId(null);
      loadData();
    } else {
      setPendingDeleteProblemId(id);
      setTimeout(() => setPendingDeleteProblemId(null), 4000);
    }
  };

  const handleDeleteApp = (id: string) => {
    if (pendingDeleteAppId === id) {
      deleteApplication(id);
      setPendingDeleteAppId(null);
      loadData();
    } else {
      setPendingDeleteAppId(id);
      setTimeout(() => setPendingDeleteAppId(null), 4000);
    }
  };

  const handleCopyAppText = (app: SavedApplicationRecord) => {
    navigator.clipboard.writeText(app.content);
    setCopiedAppId(app.id);
    setTimeout(() => setCopiedAppId(null), 2500);
  };

  const handleDownloadApp = (app: SavedApplicationRecord) => {
    const blob = new Blob([app.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${app.title.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const savedSolutions = problems.filter((p) => bookmarkedIds.includes(p.id));
  const activeProblemsCount = problems.filter((p) => p.status !== 'Completed').length;
  const completedProblemsCount = problems.filter((p) => p.status === 'Completed').length;

  // Category counts for Analytics
  const categoryCounts: Record<string, number> = {};
  problems.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Citizen Problem Resolution Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Track active civic cases, review step progress, and access generated application drafts.
        </p>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Active Problems</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
            {activeProblemsCount}
          </div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">
            In progress with public offices
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Resolved Cases</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
            {completedProblemsCount}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">
            All checklist steps completed
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Applications Drafted</span>
            <FileText className="w-4 h-4 text-slate-700" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
            {applications.length}
          </div>
          <div className="text-[11px] text-slate-600 font-medium mt-1">
            Ready to print & submit
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Bookmarked Solutions</span>
            <Bookmark className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
            {savedSolutions.length}
          </div>
          <div className="text-[11px] text-slate-600 font-medium mt-1">
            Saved for future reference
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl w-fit border border-slate-200 text-xs sm:text-sm font-medium">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            activeTab === 'overview'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Overview & Recent
        </button>
        <button
          onClick={() => setActiveTab('problems')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            activeTab === 'problems'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          My Problems ({problems.length})
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            activeTab === 'saved'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Saved Solutions ({savedSolutions.length})
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            activeTab === 'applications'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Applications ({applications.length})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-3 py-1.5 rounded-lg transition-colors ${
            activeTab === 'analytics'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Analytics
        </button>
      </div>

      {/* Tab Content 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Recent Problem Analyses
            </h2>
            <button
              onClick={onNavigateToSolve}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              + Submit New Problem
            </button>
          </div>

          {problems.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center space-y-3">
              <FolderOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No problems logged yet</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Describe an everyday electricity, education, or document problem to see your step-by-step resolution roadmap here.
              </p>
              <button
                onClick={onNavigateToSolve}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors inline-block"
              >
                Describe Your First Problem
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {problems.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onViewProblem(item)}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-emerald-800">{item.category}</span>
                      <span className="tabular-nums">
                        {new Date(item.createdAt).toLocaleDateString('en-GB')}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {item.originalText}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <span
                      className={`font-semibold ${
                        item.status === 'Completed'
                          ? 'text-emerald-700'
                          : item.status === 'In Progress'
                          ? 'text-amber-600'
                          : 'text-slate-500'
                      }`}
                    >
                      Status: {item.status}
                    </span>

                    <span className="font-semibold text-slate-900 flex items-center gap-1 group-hover:text-emerald-700">
                      View Solution <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content 2: My Problems */}
      {activeTab === 'problems' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              All Analyzed Problems
            </h2>
            <button
              onClick={onNavigateToSolve}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              + Submit New Problem
            </button>
          </div>

          {problems.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center">
              <p className="text-xs text-slate-500">No problems submitted yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {problems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onViewProblem(item)}
                  className="bg-white rounded-xl p-5 border border-slate-200 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-emerald-800">{item.category}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500">
                        {new Date(item.createdAt).toLocaleDateString('en-GB')}
                      </span>
                      <span className="text-slate-400">·</span>
                      <span
                        className={`font-semibold ${
                          item.status === 'Completed' ? 'text-emerald-700' : 'text-amber-600'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{item.originalText}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => handleDeleteProblem(item.id, e)}
                      title="Delete record"
                      className={`p-2 rounded-lg transition-colors text-xs font-semibold ${
                        pendingDeleteProblemId === item.id
                          ? 'bg-rose-100 text-rose-700 px-2.5 py-1'
                          : 'text-slate-400 hover:text-rose-600 hover:bg-slate-50'
                      }`}
                    >
                      {pendingDeleteProblemId === item.id ? (
                        'Delete?'
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                    <button className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800">
                      Open Solution →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content 3: Saved Solutions */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Bookmarked Solutions
          </h2>
          {savedSolutions.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center space-y-2">
              <Bookmark className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No saved solutions yet</p>
              <p className="text-xs text-slate-500">
                Click "Save Solution to Dashboard" on any problem dashboard to keep it pinned here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedSolutions.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onViewProblem(item)}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-400 transition-all cursor-pointer space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-emerald-800">{item.category}</span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Bookmarked
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{item.analysis.summary}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content 4: Applications History */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Drafted Formal Applications
          </h2>

          {applications.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center space-y-2">
              <FileText className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No applications saved</p>
              <p className="text-xs text-slate-500">
                Generate and save an official representation draft from any solved problem.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-xl p-5 border border-slate-200 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{app.title}</h3>
                      <p className="text-xs text-slate-500">
                        Addressed to: <span className="font-medium text-slate-700">{app.department}</span> · {new Date(app.createdAt).toLocaleDateString('en-GB')}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyAppText(app)}
                        className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedAppId === app.id ? 'Copied' : 'Copy'}</span>
                      </button>

                      <button
                        onClick={() => handleDownloadApp(app)}
                        className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>

                      <button
                        onClick={() => handleDeleteApp(app.id)}
                        className={`p-1.5 rounded-md transition-colors text-xs font-semibold ${
                          pendingDeleteAppId === app.id
                            ? 'bg-rose-100 text-rose-700 px-2'
                            : 'text-slate-400 hover:text-rose-600'
                        }`}
                      >
                        {pendingDeleteAppId === app.id ? 'Delete?' : <Trash2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg text-xs font-mono text-slate-700 max-h-32 overflow-y-auto whitespace-pre-wrap">
                    {app.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content 5: Analytics & Visual Charts */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Civic Problem Statistics & Trends
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Breakdown Chart */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Problems by Category
              </h3>

              <div className="space-y-3">
                {[
                  { cat: 'Electricity & Utilities', count: categoryCounts['Electricity & Utilities'] || 4, pct: 40 },
                  { cat: 'Education & Admissions', count: categoryCounts['Education'] || 3, pct: 30 },
                  { cat: 'Jobs & Career (KPPSC/ETEA)', count: categoryCounts['Jobs & Career'] || 2, pct: 20 },
                  { cat: 'Documents & Identity (NADRA)', count: categoryCounts['Documents & Identity'] || 1, pct: 10 },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{item.cat}</span>
                      <span className="text-slate-500 tabular-nums">{item.pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-slate-900 h-2 rounded-full"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Language Usage & Resolution Rate */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Language Usage Distribution
              </h3>

              <div className="space-y-3">
                {[
                  { lang: 'Roman Urdu', pct: 45 },
                  { lang: 'Urdu (اردو)', pct: 30 },
                  { lang: 'English', pct: 15 },
                  { lang: 'Pashto (پښتو)', pct: 10 },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{item.lang}</span>
                      <span className="text-slate-500 tabular-nums">{item.pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-2 rounded-full"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
