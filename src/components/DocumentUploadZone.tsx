import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, X, Image as ImageIcon } from 'lucide-react';
import { SAMPLE_DOCUMENTS, SampleDocumentItem } from '../data/sampleDocuments';

interface DocumentUploadZoneProps {
  onFileSelect: (fileData: { mimeType: string; base64: string; name: string } | null) => void;
  selectedFile: { name: string; mimeType: string; base64?: string } | null;
  onSelectSamplePreset?: (sample: SampleDocumentItem) => void;
  compact?: boolean;
}

export const DocumentUploadZone: React.FC<DocumentUploadZoneProps> = ({
  onFileSelect,
  selectedFile,
  onSelectSamplePreset,
  compact = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [sizeError, setSizeError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    if (file.size > 20 * 1024 * 1024) {
      setSizeError('File size exceeds 20MB limit. Please upload a smaller document or photo.');
      return;
    }
    setSizeError('');

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      onFileSelect({
        mimeType: file.type || 'image/jpeg',
        base64,
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="space-y-3">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,.pdf"
        className="hidden"
      />

      {/* Drop Zone Box */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-4 sm:p-5 text-center cursor-pointer transition-all ${
          dragOver
            ? 'border-emerald-500 bg-emerald-50/50'
            : selectedFile
            ? 'border-emerald-400 bg-emerald-50/30'
            : 'border-slate-300 hover:border-slate-400 bg-slate-50/60'
        }`}
      >
        {selectedFile ? (
          <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-emerald-200">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-left truncate">
                <p className="text-sm font-semibold text-slate-800 truncate">{selectedFile.name}</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready for AI analysis
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onFileSelect(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="p-1 text-slate-400 hover:text-rose-600 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-2">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-2">
              <UploadCloud className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold text-slate-800 mb-0.5">
              Upload Document, Electricity Bill or Letter
            </p>
            <p className="text-xs text-slate-500">
              Drop your PDF, JPG, PNG here or browse from device (up to 20MB)
            </p>
          </div>
        )}
      </div>

      {sizeError && (
        <div className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg p-2.5">
          {sizeError}
        </div>
      )}

      {/* 1-Click Demo Sample Presets */}
      {onSelectSamplePreset && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-slate-600 mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Or test with 1-click realistic Pakistani sample documents:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {SAMPLE_DOCUMENTS.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => onSelectSamplePreset(sample)}
                className="text-left p-2 rounded-md bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-xs transition-all text-xs group"
              >
                <div className="font-semibold text-slate-800 group-hover:text-emerald-700 truncate">
                  {sample.title}
                </div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">
                  {sample.category}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
