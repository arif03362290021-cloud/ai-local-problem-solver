import React, { useState } from 'react';
import { ProblemAnalysis, SupportedLanguage } from '../types';
import { generateApplication, translateText } from '../services/apiService';
import { saveApplication } from '../services/storageService';
import {
  Copy,
  Check,
  Download,
  Languages,
  RotateCw,
  Printer,
  ArrowLeft,
  FileCheck,
  CheckCircle2,
  Eye,
  X,
  Building,
} from 'lucide-react';

interface ApplicationGeneratorPageProps {
  analysis: ProblemAnalysis;
  currentLanguage: SupportedLanguage;
  onBack: () => void;
}

export const ApplicationGeneratorPage: React.FC<ApplicationGeneratorPageProps> = ({
  analysis,
  currentLanguage,
  onBack,
}) => {
  const [applicantInfo, setApplicantInfo] = useState({
    name: '',
    cnic: '',
    phone: '',
    address: '',
    referenceNo: '',
  });

  const [applicationText, setApplicationText] = useState(analysis.application_draft);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isSavedLocally, setIsSavedLocally] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(
    analysis.language || currentLanguage
  );
  const [selectedTone, setSelectedTone] = useState<'Formal Standard' | 'Urgent Grievance' | 'Polite Appeal'>(
    'Formal Standard'
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(applicationText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([applicationText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `Official_Application_${analysis.category.replace(/\s+/g, '_')}_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleTriggerPrint = () => {
    setShowPrintPreview(false);
    window.print();
  };

  const handleRegenerate = async (customTone?: string) => {
    setIsRegenerating(true);
    try {
      const toneToUse = customTone || selectedTone;
      const details = `${analysis.summary}. Required Tone: ${toneToUse}. Department: ${analysis.department}.`;
      const newDraft = await generateApplication(
        analysis.problem_title,
        analysis.department,
        details,
        selectedLanguage,
        applicantInfo
      );
      setApplicationText(newDraft);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleTranslate = async (targetLang: SupportedLanguage) => {
    setSelectedLanguage(targetLang);
    setIsRegenerating(true);
    try {
      const translated = await translateText(applicationText, targetLang);
      setApplicationText(translated);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleSaveToHistory = () => {
    saveApplication({
      id: Date.now().toString(),
      title: `Application: ${analysis.problem_title}`,
      department: analysis.department,
      problemTitle: analysis.problem_title,
      createdAt: new Date().toISOString(),
      language: selectedLanguage,
      content: applicationText,
      applicantName: applicantInfo.name,
      cnic: applicantInfo.cnic,
    });
    setIsSavedLocally(true);
    setTimeout(() => setIsSavedLocally(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 text-left">
      {/* Top Header */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Solution Dashboard</span>
        </button>

        <span className="text-xs text-slate-500 font-medium">
          Ready for print & official submission
        </span>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="no-print">
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Official Application & Representation Draft
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            This formal application is customized for <span className="font-semibold text-slate-800">{analysis.department}</span> based on your problem details.
          </p>
        </div>

        {/* Live Applicant Info Injector */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3 no-print">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Optional: Fill in your details to auto-insert into application
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Your Full Name"
              value={applicantInfo.name}
              onChange={(e) => setApplicantInfo({ ...applicantInfo, name: e.target.value })}
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <input
              type="text"
              placeholder="13-Digit CNIC (e.g. 17301-...)"
              value={applicantInfo.cnic}
              onChange={(e) => setApplicantInfo({ ...applicantInfo, cnic: e.target.value })}
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <input
              type="text"
              placeholder="Phone Number (0300-...)"
              value={applicantInfo.phone}
              onChange={(e) => setApplicantInfo({ ...applicantInfo, phone: e.target.value })}
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Reference / Consumer / Roll Number (if applicable)"
              value={applicantInfo.referenceNo}
              onChange={(e) => setApplicantInfo({ ...applicantInfo, referenceNo: e.target.value })}
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <input
              type="text"
              placeholder="Full Residential Address / District"
              value={applicantInfo.address}
              onChange={(e) => setApplicantInfo({ ...applicantInfo, address: e.target.value })}
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200">
            {/* Tone selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-medium">Tone:</span>
              <button
                type="button"
                onClick={() => {
                  setSelectedTone('Formal Standard');
                  handleRegenerate('Formal Standard');
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                  selectedTone === 'Formal Standard'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-700 border border-slate-300'
                }`}
              >
                Formal Standard
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedTone('Urgent Grievance');
                  handleRegenerate('Urgent Grievance');
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                  selectedTone === 'Urgent Grievance'
                    ? 'bg-rose-900 text-white'
                    : 'bg-white text-slate-700 border border-slate-300'
                }`}
              >
                Urgent Redressal
              </button>
            </div>

            <button
              onClick={() => handleRegenerate()}
              disabled={isRegenerating}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
              <span>Update Draft with My Details</span>
            </button>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 no-print">
          {/* Translation Bar */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Languages className="w-4 h-4 text-slate-500" />
            <span className="font-medium mr-1">Language:</span>
            <button
              onClick={() => handleTranslate('en')}
              className={`px-2 py-1 rounded font-medium ${
                selectedLanguage === 'en' ? 'bg-slate-900 text-white' : 'bg-slate-100 hover:bg-slate-200'
              }`}
            >
              English
            </button>
            <button
              onClick={() => handleTranslate('ur')}
              className={`px-2 py-1 rounded font-medium ${
                selectedLanguage === 'ur' ? 'bg-slate-900 text-white' : 'bg-slate-100 hover:bg-slate-200'
              }`}
            >
              اردو
            </button>
            <button
              onClick={() => handleTranslate('ps')}
              className={`px-2 py-1 rounded font-medium ${
                selectedLanguage === 'ps' ? 'bg-slate-900 text-white' : 'bg-slate-100 hover:bg-slate-200'
              }`}
            >
              پښتو
            </button>
          </div>

          {/* Export Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium transition-colors"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-600" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowPrintPreview(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-slate-600" />
              <span>Print Preview</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download (.txt)</span>
            </button>
          </div>
        </div>

        {/* Live Editable Text Area formatted as Letter */}
        <div className="relative border border-slate-300 rounded-xl overflow-hidden shadow-inner no-print">
          <textarea
            rows={16}
            value={applicationText}
            onChange={(e) => setApplicationText(e.target.value)}
            className={`w-full p-6 text-sm sm:text-base leading-relaxed text-slate-900 bg-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              selectedLanguage === 'ur' || selectedLanguage === 'ps'
                ? 'font-urdu text-right text-base'
                : ''
            }`}
          />
        </div>

        {/* Print Only Official Letterhead Sheet */}
        <div className="hidden print-only p-8 text-black bg-white">
          <div className="text-center border-b-2 border-black pb-4 mb-6">
            <h2 className="text-xl font-bold uppercase tracking-wider">
              Formal Representation / Public Grievance Petition
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Addressed to {analysis.department} · Khyber Pakhtunkhwa, Pakistan
            </p>
          </div>
          <div className="whitespace-pre-wrap font-serif text-base leading-relaxed">
            {applicationText}
          </div>
          <div className="mt-16 pt-6 border-t border-slate-300 flex justify-between text-xs text-slate-600">
            <div>
              <p>Generated via: AI Local Problem Solver (Civic Support)</p>
              <p>Date of Submission: {new Date().toLocaleDateString('en-GB')}</p>
            </div>
            <div className="text-right">
              <p>Applicant Signature: _______________________</p>
            </div>
          </div>
        </div>

        {/* Footer info and Save */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-500 no-print">
          <p>
            💡 Tip: You can directly edit any word in the box above before copying or printing.
          </p>

          <button
            onClick={handleSaveToHistory}
            className="flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            {isSavedLocally ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Saved to Applications History</span>
              </>
            ) : (
              <>
                <FileCheck className="w-4 h-4" />
                <span>Save Application to Dashboard</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* In-App Print Preview Modal (Avoids window.open) */}
      {showPrintPreview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Printer className="w-4 h-4 text-emerald-600" />
                <span>Print Document Preview</span>
              </div>
              <button
                onClick={() => setShowPrintPreview(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-300 font-serif text-sm leading-relaxed text-slate-900 whitespace-pre-wrap max-h-96 overflow-y-auto">
              {applicationText}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowPrintPreview(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleTriggerPrint}
                className="px-4 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
