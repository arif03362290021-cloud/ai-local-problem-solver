import React, { useState } from 'react';
import { DocumentAnalysisResult, SupportedLanguage } from '../types';
import { analyzeDocument } from '../services/apiService';
import { DocumentUploadZone } from '../components/DocumentUploadZone';
import { SAMPLE_DOCUMENTS, SampleDocumentItem } from '../data/sampleDocuments';
import {
  FileText,
  AlertCircle,
  CheckCircle2,
  Calendar,
  CreditCard,
  Hash,
  HelpCircle,
  ArrowRight,
  Loader2,
  Building,
  Info,
} from 'lucide-react';

interface DocumentAnalysisPageProps {
  currentLanguage: SupportedLanguage;
  onNavigate: (page: string) => void;
}

export const DocumentAnalysisPage: React.FC<DocumentAnalysisPageProps> = ({
  currentLanguage,
  onNavigate,
}) => {
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    mimeType: string;
    base64: string;
  } | null>(null);

  const [userNote, setUserNote] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<DocumentAnalysisResult | null>(
    SAMPLE_DOCUMENTS[0].analysisResult // Pre-loaded with realistic PESCO bill analysis for instant view
  );
  const [activeSampleTitle, setActiveSampleTitle] = useState(SAMPLE_DOCUMENTS[0].title);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelectPreset = (sample: SampleDocumentItem) => {
    setActiveSampleTitle(sample.title);
    setSelectedFile({
      name: sample.fileName,
      mimeType: 'application/pdf',
      base64: 'sample-preset-data',
    });
    setAnalysisResult(sample.analysisResult);
    setErrorMessage('');
  };

  const handleRunAnalysis = async () => {
    if (!selectedFile) {
      setErrorMessage('Please upload a document or select one of the sample documents.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage('');

    try {
      const response = await analyzeDocument(
        selectedFile,
        userNote,
        currentLanguage
      );
      setAnalysisResult(response.data);
      setActiveSampleTitle(selectedFile.name);
    } catch (err: any) {
      setErrorMessage('Document inspection failed. Please ensure the file is clear and readable.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 text-left">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 w-fit px-3 py-1 rounded-md border border-emerald-200 mb-2">
          <span>AI Vision & Document Inspector</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Utility Bill & Document Analysis
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Upload any Pakistani electricity bill, government notification, job advertisement, or admission document to extract critical numbers, detect over-billing, and decode complex legal clauses.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Upload & Controls */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Upload File or Photo
            </h2>

            <DocumentUploadZone
              onFileSelect={(file) => {
                if (file) {
                  setSelectedFile(file);
                  setActiveSampleTitle(file.name);
                } else {
                  setSelectedFile(null);
                }
              }}
              selectedFile={selectedFile}
              onSelectSamplePreset={handleSelectPreset}
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Optional note about what to inspect:
              </label>
              <input
                type="text"
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                placeholder="e.g. Why did my bill double? or check eligibility deadline"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing || !selectedFile}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                  <span>Scanning Document with AI...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Analyze Uploaded Document</span>
                </>
              )}
            </button>
          </div>

          {/* Visual Showcase Card */}
          <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-900 relative">
            <img
              src="/src/assets/images/doc_analysis_preview_1790919814457.jpg"
              alt="Pakistani Document Inspection"
              className="w-full aspect-[4/3] object-cover opacity-85"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="p-4 bg-slate-900 text-white">
              <p className="text-xs font-semibold text-emerald-400">Supported Formats:</p>
              <p className="text-xs text-slate-300 mt-0.5">
                PESCO / IESCO / LESCO Bills · NADRA Forms · BISE Verification Slips · KPPSC Notifications · Crop Leaf Photos
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Structured AI Analysis Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          {analysisResult ? (
            <div className="space-y-6">
              {/* Document Overview Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    {analysisResult.documentType}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Source: {activeSampleTitle}
                  </span>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                      <Hash className="w-3.5 h-3.5 text-slate-400" />
                      <span>Reference No</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {analysisResult.referenceNumber || 'Not detected'}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                      <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                      <span>Amount / Fee</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {analysisResult.currentAmountOrFee || 'N/A'}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Due / Deadline</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {analysisResult.dueDateOrDeadline || 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Summary Explanation */}
                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200/80">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1">
                    Plain-Language Explanation
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                    {analysisResult.summary}
                  </p>
                </div>
              </div>

              {/* Identified Issues */}
              {analysisResult.identifiedIssues && analysisResult.identifiedIssues.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Key Issues & Anomalies Detected
                  </h3>
                  <div className="space-y-2">
                    {analysisResult.identifiedIssues.map((issue, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 text-xs sm:text-sm text-amber-950"
                      >
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Difficult Terms Decoded */}
              {analysisResult.difficultTermsExplained && analysisResult.difficultTermsExplained.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-slate-500" />
                    <span>Complex Terms Simplified</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {analysisResult.difficultTermsExplained.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1"
                      >
                        <div className="text-xs font-bold text-slate-900">{item.term}</div>
                        <div className="text-xs text-slate-600 leading-relaxed">
                          {item.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Next Steps */}
              {analysisResult.recommendedNextSteps && analysisResult.recommendedNextSteps.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Recommended Next Actions
                  </h3>
                  <div className="space-y-2">
                    {analysisResult.recommendedNextSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800"
                      >
                        <div className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-3">
              <FileText className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No document scanned yet</p>
              <p className="text-xs text-slate-500">
                Upload a document on the left or select a 1-click sample to see the instant breakdown.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
