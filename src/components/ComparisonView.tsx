import React, { useState } from 'react';
import {
  GitCompare,
  Upload,
  Sparkles,
  FileText,
  AlertCircle,
  Loader2,
  CheckCircle2,
  ArrowRightLeft,
  Info,
} from 'lucide-react';
import type { ComparisonResult } from '../types.js';

interface ComparisonViewProps {
  onCompare: (
    docA: { file?: File; text?: string; name?: string },
    docB: { file?: File; text?: string; name?: string }
  ) => Promise<ComparisonResult>;
  onLoadDemoComparison: () => Promise<ComparisonResult>;
  initialComparison?: ComparisonResult | null;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  onCompare,
  onLoadDemoComparison,
  initialComparison,
}) => {
  const [docAFile, setDocAFile] = useState<File | null>(null);
  const [docBFile, setDocBFile] = useState<File | null>(null);
  const [docAText, setDocAText] = useState('');
  const [docBText, setDocBText] = useState('');
  const [docAName, setDocAName] = useState('');
  const [docBName, setDocBName] = useState('');
  const [activeInputMode, setActiveInputMode] = useState<'upload' | 'paste'>('upload');
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(initialComparison || null);
  const [isComparing, setIsComparing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleStartComparison = async () => {
    setErrorMessage(null);

    const hasA = activeInputMode === 'upload' ? Boolean(docAFile) : Boolean(docAText.trim());
    const hasB = activeInputMode === 'upload' ? Boolean(docBFile) : Boolean(docBText.trim());

    if (!hasA || !hasB) {
      setErrorMessage('Please provide both Document A and Document B to compare.');
      return;
    }

    setIsComparing(true);
    try {
      const res = await onCompare(
        activeInputMode === 'upload'
          ? { file: docAFile!, name: docAFile!.name }
          : { text: docAText.trim(), name: docAName || 'Document A' },
        activeInputMode === 'upload'
          ? { file: docBFile!, name: docBFile!.name }
          : { text: docBText.trim(), name: docBName || 'Document B' }
      );
      setComparisonResult(res);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to compare the two legal documents.');
    } finally {
      setIsComparing(false);
    }
  };

  const handleLoadDemoComparison = async () => {
    setErrorMessage(null);
    setIsComparing(true);
    try {
      const res = await onLoadDemoComparison();
      setComparisonResult(res);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to load demo comparison.');
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="space-y-10" id="comparison-view-container">
      {/* Title & Introduction */}
      <div className="max-w-4xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
          <GitCompare className="w-3.5 h-3.5 text-slate-600" />
          <span>Side-by-Side Clause & Terms Differencer</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Compare Two Legal Documents
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Evaluating two job offers or lease agreements? Extract key terms side-by-side and highlight factual differences neutrally—without subjective scoring.
        </p>

        <div className="pt-2">
          <button
            id="load-demo-comparison-cta"
            onClick={handleLoadDemoComparison}
            disabled={isComparing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>Load Fictional Demo Comparison: Apex Technologies vs Beacon Global Offer</span>
          </button>
        </div>
      </div>

      {/* Input Selection Box */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="font-serif text-lg font-bold text-slate-900">Document Inputs</h2>
          <div className="inline-flex rounded-lg p-1 bg-slate-100 border border-slate-200">
            <button
              onClick={() => setActiveInputMode('upload')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeInputMode === 'upload' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Upload Files
            </button>
            <button
              onClick={() => setActiveInputMode('paste')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeInputMode === 'paste' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Paste Text
            </button>
          </div>
        </div>

        {errorMessage && (
          <div
            id="comparison-error-alert"
            className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start justify-between gap-3 shadow-2xs"
            role="alert"
          >
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="leading-relaxed">{errorMessage}</div>
            </div>
            <button
              type="button"
              onClick={handleStartComparison}
              disabled={isComparing}
              className="px-2.5 py-1 rounded bg-amber-900 text-white hover:bg-amber-800 text-xs font-semibold shrink-0 cursor-pointer transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Document A */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center font-mono">
                A
              </span>
              <h3 className="font-bold text-sm text-slate-900">Document A (e.g. Current Offer)</h3>
            </div>

            {activeInputMode === 'upload' ? (
              <label className="border-2 border-dashed border-slate-300 hover:border-slate-400 bg-white rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors block">
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && setDocAFile(e.target.files[0])}
                />
                <FileText className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-xs font-semibold text-slate-800">
                  {docAFile ? docAFile.name : 'Select Document A (.pdf, .docx, .txt)'}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">
                  {docAFile ? `${(docAFile.size / 1024).toFixed(1)} KB` : 'Click to browse'}
                </span>
              </label>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Document A Name (e.g. Apex Tech Offer)"
                  value={docAName}
                  onChange={(e) => setDocAName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                />
                <textarea
                  rows={5}
                  placeholder="Paste Document A contract text..."
                  value={docAText}
                  onChange={(e) => setDocAText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono"
                />
              </div>
            )}
          </div>

          {/* Document B */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-700 text-white text-xs font-bold flex items-center justify-center font-mono">
                B
              </span>
              <h3 className="font-bold text-sm text-slate-900">Document B (e.g. Competing Offer)</h3>
            </div>

            {activeInputMode === 'upload' ? (
              <label className="border-2 border-dashed border-slate-300 hover:border-slate-400 bg-white rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors block">
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && setDocBFile(e.target.files[0])}
                />
                <FileText className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-xs font-semibold text-slate-800">
                  {docBFile ? docBFile.name : 'Select Document B (.pdf, .docx, .txt)'}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">
                  {docBFile ? `${(docBFile.size / 1024).toFixed(1)} KB` : 'Click to browse'}
                </span>
              </label>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Document B Name (e.g. Beacon Global Offer)"
                  value={docBName}
                  onChange={(e) => setDocBName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                />
                <textarea
                  rows={5}
                  placeholder="Paste Document B contract text..."
                  value={docBText}
                  onChange={(e) => setDocBText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            id="execute-comparison-btn"
            onClick={handleStartComparison}
            disabled={isComparing}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 disabled:opacity-50 transition-colors shadow-xs"
          >
            {isComparing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span>Comparing Documents...</span>
              </>
            ) : (
              <>
                <GitCompare className="w-4 h-4 text-amber-400" />
                <span>Compare Both Documents</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Comparison Results Section */}
      {comparisonResult && (
        <div className="max-w-6xl mx-auto space-y-6" id="comparison-results-card">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
                <ArrowRightLeft className="w-4 h-4" />
                <span>STRUCTURED COMPARISON REPORT</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                {comparisonResult.docAName} vs. {comparisonResult.docBName}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
                {comparisonResult.summary}
              </p>
            </div>

            {/* Major Differences Summary Bullets */}
            {Boolean(comparisonResult.majorDifferencesSummary?.length) && (
              <div className="bg-amber-50/50 p-6 border-b border-amber-200/80 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block font-mono">
                  Prominent Factual Differences
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-950">
                  {comparisonResult.majorDifferencesSummary.map((diff, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0"></span>
                      <span>{diff}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm" id="comparison-matrix-table">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4 sm:px-6 w-1/5">Category</th>
                    <th className="py-3.5 px-4 sm:px-6 w-1/4 bg-slate-50/80">
                      {comparisonResult.docAName}
                    </th>
                    <th className="py-3.5 px-4 sm:px-6 w-1/4 bg-slate-100/50">
                      {comparisonResult.docBName}
                    </th>
                    <th className="py-3.5 px-4 sm:px-6 w-3/10 bg-amber-50/40 text-amber-950">
                      Factual Difference
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {(comparisonResult.items || []).map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-semibold text-slate-900 align-top">
                        {row.category}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-slate-700 align-top bg-slate-50/30 whitespace-pre-line">
                        {row.docAValue}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-slate-700 align-top bg-slate-50/10 whitespace-pre-line">
                        {row.docBValue}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-slate-800 align-top bg-amber-50/20 font-normal leading-relaxed">
                        <div className="space-y-1">
                          <p>{row.difference}</p>
                          {row.keyNote && (
                            <span className="inline-block text-[11px] text-slate-500 italic">
                              Note: {row.keyNote}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Neutrality Note Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center gap-2">
              <Info className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>
                LegalLens reports factual differences neutrally and never ranks contracts as "better" or "worse", leaving the evaluation entirely to your priorities and legal advisor.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
