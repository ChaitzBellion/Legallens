import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  AlertCircle,
  Sparkles,
  ClipboardList,
  CheckCircle2,
  Loader2,
  FileCode,
  Files,
  ArrowRight,
} from 'lucide-react';
import type { TestCaseDocumentItem } from '../services/api.js';

interface UploadPanelProps {
  onAnalyze: (file?: File, text?: string, documentName?: string) => Promise<void>;
  isLoading: boolean;
  onLoadDemo: (demoKey: 'demoA' | 'demoB') => void;
  testCases?: TestCaseDocumentItem[];
  onSelectTestCase?: (testCase: TestCaseDocumentItem) => void;
  onOpenTestCasesLibrary?: () => void;
}

export type ProcessingStep = 'uploading' | 'extracting' | 'analyzing' | 'building' | 'idle';

export const UploadPanel: React.FC<UploadPanelProps> = ({
  onAnalyze,
  isLoading,
  onLoadDemo,
  testCases = [],
  onSelectTestCase,
  onOpenTestCasesLibrary,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState('');
  const [docName, setDocName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<ProcessingStep>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    setErrorMessage(null);
    const validExtensions = ['.pdf', '.docx', '.txt', '.text', '.md'];
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!validExtensions.includes(ext)) {
      setErrorMessage(`Unsupported file format (${ext}). Please upload a PDF, DOCX, or TXT legal document.`);
      return false;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File size exceeds the 10MB limit. Please provide a smaller file.');
      return false;
    }

    if (file.size === 0) {
      setErrorMessage('The selected file is empty. Please select a document with text.');
      return false;
    }

    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleStartAnalysis = async () => {
    setErrorMessage(null);

    if (activeTab === 'upload') {
      if (!selectedFile) {
        setErrorMessage('Please choose or drag in a legal document to analyze.');
        return;
      }

      // Simulate sequential steps for clear user feedback
      setCurrentStep('uploading');
      const stepTimer1 = setTimeout(() => setCurrentStep('extracting'), 600);
      const stepTimer2 = setTimeout(() => setCurrentStep('analyzing'), 1400);
      const stepTimer3 = setTimeout(() => setCurrentStep('building'), 3000);

      try {
        await onAnalyze(selectedFile, undefined, selectedFile.name);
      } catch (err: any) {
        setErrorMessage(err?.message || 'AI document analysis could not be completed.');
      } finally {
        clearTimeout(stepTimer1);
        clearTimeout(stepTimer2);
        clearTimeout(stepTimer3);
        setCurrentStep('idle');
      }
    } else {
      if (!pastedText.trim() || pastedText.trim().length < 25) {
        setErrorMessage('Please paste at least 25 characters of legal agreement text.');
        return;
      }

      setCurrentStep('extracting');
      const stepTimer2 = setTimeout(() => setCurrentStep('analyzing'), 800);
      const stepTimer3 = setTimeout(() => setCurrentStep('building'), 2200);

      try {
        await onAnalyze(undefined, pastedText.trim(), docName || 'Pasted Legal Agreement.txt');
      } catch (err: any) {
        setErrorMessage(err?.message || 'AI document analysis could not be completed.');
      } finally {
        clearTimeout(stepTimer2);
        clearTimeout(stepTimer3);
        setCurrentStep('idle');
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto" id="upload-panel-card">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header with Tab switcher */}
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-slate-900">Analyze a Legal Document</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Upload an employment agreement, offer letter, or contract for plain-English breakdown.
            </p>
          </div>

          <div className="inline-flex rounded-lg p-1 bg-slate-100 border border-slate-200 self-start sm:self-center">
            <button
              id="tab-upload-file"
              onClick={() => { setActiveTab('upload'); setErrorMessage(null); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'upload' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Upload File
            </button>
            <button
              id="tab-paste-text"
              onClick={() => { setActiveTab('paste'); setErrorMessage(null); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === 'paste' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Paste Text
            </button>
          </div>
        </div>

        {/* Quick Demo Pre-Load Box & Test Cases */}
        <div className="bg-amber-50/60 border-b border-amber-200/70 px-6 py-3.5 space-y-2 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-amber-950 font-medium">
              <Sparkles className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>Need test documents? Pre-load one of 6 realistic fictional samples:</span>
            </div>
            {onOpenTestCasesLibrary && (
              <button
                id="open-library-link"
                onClick={onOpenTestCasesLibrary}
                className="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 hover:text-amber-950 hover:underline"
              >
                <Files className="w-3.5 h-3.5" />
                <span>Browse Test Cases Library (6)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {testCases && testCases.length > 0 ? (
              testCases.map((tc) => (
                <button
                  key={tc.id}
                  id={`quick-tc-btn-${tc.id}`}
                  onClick={() => onSelectTestCase ? onSelectTestCase(tc) : onLoadDemo('demoA')}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-amber-100 text-slate-800 text-[11px] font-medium border border-amber-300 transition-colors shadow-2xs flex items-center gap-1"
                  title={`Load ${tc.title} (${tc.category})`}
                >
                  <span className="font-semibold text-amber-900">[{tc.category}]</span>
                  <span className="truncate max-w-[130px] sm:max-w-none">{tc.title.split(' ')[0]} {tc.title.split(' ')[1]}</span>
                </button>
              ))
            ) : (
              <>
                <button
                  id="load-demo-a-button"
                  onClick={() => onLoadDemo('demoA')}
                  className="px-2.5 py-1 rounded bg-white text-amber-900 font-medium border border-amber-300 hover:bg-amber-100 transition-colors shadow-xs"
                >
                  Apex Tech Agreement
                </button>
                <button
                  id="load-demo-b-button"
                  onClick={() => onLoadDemo('demoB')}
                  className="px-2.5 py-1 rounded bg-white text-amber-900 font-medium border border-amber-300 hover:bg-amber-100 transition-colors shadow-xs"
                >
                  Beacon Offer Letter B
                </button>
              </>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 space-y-6">
          {errorMessage && (
            <div
              id="upload-error-alert"
              className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start justify-between gap-3 shadow-2xs"
              role="alert"
            >
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">{errorMessage}</div>
              </div>
              <button
                type="button"
                onClick={handleStartAnalysis}
                disabled={isLoading}
                className="px-2.5 py-1 rounded bg-amber-900 text-white hover:bg-amber-800 text-xs font-semibold shrink-0 cursor-pointer transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {activeTab === 'upload' ? (
            <div className="space-y-4">
              <div
                id="file-dropzone"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                  dragActive
                    ? 'border-amber-600 bg-amber-50/40'
                    : selectedFile
                    ? 'border-slate-300 bg-slate-50/70'
                    : 'border-slate-300 hover:border-slate-400 bg-slate-50/40'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt,.text,.md"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input-element"
                />

                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-white text-slate-700 shadow-xs border border-slate-200 flex items-center justify-center">
                    {selectedFile ? (
                      <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                    ) : (
                      <Upload className="w-7 h-7 text-slate-500" />
                    )}
                  </div>

                  {selectedFile ? (
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{selectedFile.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {(selectedFile.size / 1024).toFixed(1)} KB • Click to choose a different file
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Drop your document here, or <span className="text-amber-800 underline">browse</span>
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Supports PDF, Word (.docx), and plain text files up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label htmlFor="doc-title-input" className="block text-xs font-medium text-slate-700 mb-1">
                  Document Title (Optional)
                </label>
                <input
                  id="doc-title-input"
                  type="text"
                  placeholder="e.g. Acme Corp Employment Offer.txt"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
                />
              </div>

              <div>
                <label htmlFor="doc-text-area" className="block text-xs font-medium text-slate-700 mb-1">
                  Document Text Content
                </label>
                <textarea
                  id="doc-text-area"
                  rows={8}
                  placeholder="Paste the full text of the agreement or offer letter here..."
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
                ></textarea>
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>Treats text as untrusted data with strict prompt isolation.</span>
                  <span>{pastedText.length} characters</span>
                </div>
              </div>
            </div>
          )}

          {/* Real-time Processing Pipeline Indicator */}
          {isLoading && (
            <div className="bg-slate-900 text-white rounded-xl p-5 space-y-4" id="processing-pipeline-status">
              <div className="flex items-center justify-between text-xs text-slate-300 border-b border-slate-800 pb-2">
                <span className="font-semibold text-white flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  LegalLens AI Processing Pipeline
                </span>
                <span className="text-amber-400 font-mono text-[11px]">AI Analysis Engine</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'uploading', label: '1. Uploading' },
                  { id: 'extracting', label: '2. Extracting Text' },
                  { id: 'analyzing', label: '3. Analyzing Clauses' },
                  { id: 'building', label: '4. Summary & Risks' },
                ].map((step, idx) => {
                  const isCurrent = currentStep === step.id;
                  const isPast =
                    (currentStep === 'extracting' && idx === 0) ||
                    (currentStep === 'analyzing' && idx <= 1) ||
                    (currentStep === 'building' && idx <= 2);

                  return (
                    <div
                      key={step.id}
                      className={`p-2 rounded-lg border text-center transition-colors ${
                        isCurrent
                          ? 'bg-amber-950/60 border-amber-500 text-amber-300 font-semibold animate-pulse'
                          : isPast
                          ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-300'
                          : 'bg-slate-800/40 border-slate-800 text-slate-500'
                      }`}
                    >
                      {step.label}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-slate-400" />
              <span>In-memory processing • Never permanently stored</span>
            </div>

            <button
              id="start-analysis-btn"
              onClick={handleStartAnalysis}
              disabled={isLoading || (activeTab === 'upload' && !selectedFile) || (activeTab === 'paste' && !pastedText.trim())}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Analyzing Document...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Analyze Document</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
