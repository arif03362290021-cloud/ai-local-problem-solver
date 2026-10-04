import React, { useState, useEffect, useRef } from 'react';
import {
  ProblemAnalysis,
  SupportedLanguage,
  ChatMessage,
} from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { chatFollowUp, translateText } from '../services/apiService';
import { updateProblemStep, updateProblemDoc } from '../services/storageService';
import { VoiceInputButton } from '../components/VoiceInputButton';
import {
  CheckCircle2,
  Clock,
  Building,
  AlertTriangle,
  FileText,
  Bookmark,
  BookmarkCheck,
  Printer,
  Sparkles,
  Send,
  RotateCcw,
  ChevronRight,
  UploadCloud,
  MessageSquare,
} from 'lucide-react';

interface SolutionDashboardPageProps {
  analysis: ProblemAnalysis;
  currentLanguage: SupportedLanguage;
  onNavigate: (page: string) => void;
  onOpenApplicationGenerator: () => void;
  onSaveProblem: () => void;
  isSaved: boolean;
  onInspectDocument: () => void;
  problemRecordId?: string;
  initialCompletedSteps?: number[];
  initialCompletedDocs?: string[];
}

export const SolutionDashboardPage: React.FC<SolutionDashboardPageProps> = ({
  analysis,
  currentLanguage,
  onNavigate,
  onOpenApplicationGenerator,
  onSaveProblem,
  isSaved,
  onInspectDocument,
  problemRecordId,
  initialCompletedSteps = [],
  initialCompletedDocs = [],
}) => {
  const t = TRANSLATIONS[currentLanguage];

  // Steps completion state
  const [completedSteps, setCompletedSteps] = useState<number[]>(initialCompletedSteps);
  const [completedDocs, setCompletedDocs] = useState<string[]>(initialCompletedDocs);

  // Follow-up chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      content:
        currentLanguage === 'ur'
          ? `میں آپ کے اس مسئلے (${analysis.problem_title}) کے متعلق سوالات کے جوابات دینے کے لیے حاضر ہوں۔ آپ دفتر کا پتہ، فیس یا طریقہ کار کے بارے میں پوچھ سکتے ہیں۔`
          : currentLanguage === 'ps'
          ? `زه ستاسو د دې ستونزې اړوند پوښتنو ته ځواب ویلو لپاره حاضر یم. تاسو کولی شئ د ادارې د دفتر، فیس او وخت په اړه پوښتنه وکړئ.`
          : `I am here to answer follow-up questions regarding "${analysis.problem_title}". Ask about submission procedures, office locations, fees, or timelines.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatLoading]);

  const toggleStep = (stepNumber: number) => {
    const isCompleted = completedSteps.includes(stepNumber);
    const updated = isCompleted
      ? completedSteps.filter((s) => s !== stepNumber)
      : [...completedSteps, stepNumber];
    setCompletedSteps(updated);

    if (problemRecordId) {
      updateProblemStep(problemRecordId, stepNumber, !isCompleted);
    }
  };

  const toggleDoc = (docName: string) => {
    const isChecked = completedDocs.includes(docName);
    const updated = isChecked
      ? completedDocs.filter((d) => d !== docName)
      : [...completedDocs, docName];
    setCompletedDocs(updated);

    if (problemRecordId) {
      updateProblemDoc(problemRecordId, docName, !isChecked);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || chatInput;
    if (!query.trim() || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await chatFollowUp(
        [...chatMessages, userMsg],
        analysis,
        currentLanguage
      );

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleTranslateMessage = async (msgId: string, content: string) => {
    const target = currentLanguage === 'ur' ? 'en' : 'ur';
    const translated = await translateText(content, target);
    setChatMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, translatedContent: translated } : m))
    );
  };

  const totalSteps = analysis.recommended_steps?.length || 1;
  const progressPercent = Math.round((completedSteps.length / totalSteps) * 100);

  const suggestedQuestions = [
    currentLanguage === 'ur'
      ? 'مجھے درخواست کہاں جمع کروانی ہے؟'
      : currentLanguage === 'ps'
      ? 'زه باید غوښتنلیک چیرته وسپارم؟'
      : currentLanguage === 'ur-roman'
      ? 'Mujhe application kahan submit karni hai?'
      : 'Where do I submit this application?',
    currentLanguage === 'ur'
      ? 'اس کام کی سرکاری فیس کتنی ہے؟'
      : currentLanguage === 'ps'
      ? 'د دې پروسې رسمي فیس څومره دی؟'
      : currentLanguage === 'ur-roman'
      ? 'Is kaam ki sarkari fee kitni hai?'
      : 'What is the official fee for this procedure?',
    currentLanguage === 'ur'
      ? 'اس پورے عمل میں کتنے دن لگیں گے؟'
      : currentLanguage === 'ps'
      ? 'دا به څو ورځې وخت ونیسي؟'
      : currentLanguage === 'ur-roman'
      ? 'Is poore process mein kitne din lagenge?'
      : 'How many days will this process take?',
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 text-left">
      {/* Top Header Card: "Here's what we understood" */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 no-print">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.hereIsWhatWeUnderstood}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onSaveProblem}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                isSaved
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.solutionSavedCTA}</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t.saveSolutionCTA}</span>
                </>
              )}
            </button>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>{t.printPDFCTA}</span>
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {analysis.problem_title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-600">
            <span className="font-semibold text-slate-800">{analysis.category}</span>
            <span aria-hidden="true">·</span>
            <span
              className={`font-semibold ${
                analysis.urgency === 'Urgent'
                  ? 'text-rose-600'
                  : analysis.urgency === 'High'
                  ? 'text-amber-600'
                  : 'text-emerald-700'
              }`}
            >
              {analysis.urgency} Urgency
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-slate-700 font-medium">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              {analysis.department}
            </span>
          </div>
        </div>

        {/* Problem Summary Box */}
        <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            {t.problemSummary}
          </h2>
          <p
            className={`text-sm sm:text-base text-slate-800 leading-relaxed ${
              analysis.language === 'ur' || analysis.language === 'ps' ? 'font-urdu' : ''
            }`}
          >
            {analysis.summary}
          </p>
        </div>

        {/* Immediate Next Action Banner */}
        <div className="bg-amber-50/80 rounded-xl p-4 border border-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-0.5">
              {t.nextActionTitle}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-amber-950">
              {analysis.next_action}
            </p>
          </div>
        </div>
      </div>

      {/* Possible Reasons Cards */}
      {analysis.possible_reasons && analysis.possible_reasons.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">
            {t.possibleReasonsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {analysis.possible_reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Step-by-Step Procedure Timeline */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {t.recommendedSolution}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Follow this verified sequential roadmap to resolve your issue:
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-slate-700">
              {t.stepsCompletedOf(completedSteps.length, totalSteps)}
            </span>
            <div className="w-36 bg-slate-100 rounded-full h-2 mt-1 overflow-hidden">
              <div
                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Timeline Steps */}
        <div className="space-y-4">
          {analysis.recommended_steps?.map((step) => {
            const isCompleted = completedSteps.includes(step.stepNumber);
            return (
              <div
                key={step.stepNumber}
                onClick={() => toggleStep(step.stepNumber)}
                className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                  isCompleted
                    ? 'bg-emerald-50/40 border-emerald-300'
                    : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {/* Checkbox */}
                <div
                  className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isCompleted
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 bg-white hover:border-slate-400'
                  }`}
                >
                  {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3
                      className={`text-sm sm:text-base font-bold ${
                        isCompleted ? 'text-emerald-950 line-through' : 'text-slate-900'
                      }`}
                    >
                      {step.stepNumber}. {step.title}
                    </h3>

                    {step.estimatedDays && (
                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {step.estimatedDays}
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isCompleted ? 'text-slate-500' : 'text-slate-600'
                    }`}
                  >
                    {step.description}
                  </p>

                  {step.departmentOffice && (
                    <div className="pt-1 text-xs text-emerald-800 font-medium flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      <span>{step.departmentOffice}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Required Documents Checklist */}
      {analysis.required_documents && analysis.required_documents.length > 0 && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {t.requiredDocumentsTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Check off each document as you arrange it before visiting the office:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {analysis.required_documents.map((doc, index) => {
              const isChecked = completedDocs.includes(doc);
              return (
                <div
                  key={index}
                  onClick={() => toggleDoc(doc)}
                  className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-emerald-50/50 border-emerald-300 text-emerald-900'
                      : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                      isChecked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      isChecked ? 'line-through text-slate-500' : 'text-slate-800'
                    }`}
                  >
                    {doc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Prominent Action Hub */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 no-print">
        {/* Generate Application Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
              <FileText className="w-4 h-4" />
              <span>OFFICIAL DRAFT GENERATOR</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Generate Official Application Draft
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              We have synthesized a formal written complaint ready with your details, addressed to {analysis.department}. Edit, copy, or download.
            </p>
          </div>
          <button
            onClick={onOpenApplicationGenerator}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <span>{t.generateApplicationCTA}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Upload Document for Inspection Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-between space-y-4 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-2">
              <UploadCloud className="w-4 h-4" />
              <span>DOCUMENT & BILL INSPECTION</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Have a Bill or Official Letter?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Upload your utility bill or admission notice for visual AI verification of reference numbers, slab jump, and hidden surcharges.
            </p>
          </div>
          <button
            onClick={onInspectDocument}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 border border-slate-300"
          >
            <span>{t.uploadDocAnalysisCTA}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* AI Follow-up Chat Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 no-print">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {t.askAIFollowUpCTA}
            </h2>
          </div>

          <button
            onClick={() =>
              setChatMessages([
                {
                  id: 'welcome-reset',
                  sender: 'assistant',
                  content: 'Chat refreshed. Ask any specific question regarding your problem resolution.',
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
              ])
            }
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Chat</span>
          </button>
        </div>

        {/* Suggested Quick Question Chips */}
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(q)}
              className="text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors border border-slate-200 text-left"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat History Container */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1 pt-2">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-xs'
                    : 'bg-slate-100 text-slate-900 rounded-tl-xs border border-slate-200'
                }`}
              >
                <p className="whitespace-pre-line">{msg.content}</p>

                {msg.translatedContent && (
                  <div className="mt-2 pt-2 border-t border-slate-200/60 text-xs italic text-emerald-800">
                    {msg.translatedContent}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 px-1">
                <span>{msg.timestamp}</span>
                {msg.sender === 'assistant' && (
                  <button
                    onClick={() => handleTranslateMessage(msg.id, msg.content)}
                    className="hover:text-emerald-700 font-medium"
                  >
                    Translate
                  </button>
                )}
              </div>
            </div>
          ))}

          {isChatLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span>Consulting procedural regulations...</span>
            </div>
          )}
          <div ref={chatScrollRef} />
        </div>

        {/* Chat Input Bar with Voice Support */}
        <div className="flex items-center gap-2 pt-2">
          <VoiceInputButton
            language={currentLanguage}
            onTranscript={(trans) => setChatInput((prev) => (prev ? `${prev} ${trans}` : trans))}
          />
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder={
              currentLanguage === 'ur'
                ? 'اپنا سوال یہاں لکھیں...'
                : currentLanguage === 'ps'
                ? 'خپله پوښتنه دلته ولیکئ...'
                : 'Ask a follow-up question (e.g. Which counter should I go to?)...'
            }
            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!chatInput.trim() || isChatLoading}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-xl transition-colors flex items-center justify-center shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
