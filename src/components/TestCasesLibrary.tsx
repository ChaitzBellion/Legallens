import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  Download,
  Eye,
  EyeOff,
  Briefcase,
  ShieldAlert,
  Home,
  FileCode,
  Layers,
  ArrowRight,
  Filter,
  Loader2,
} from 'lucide-react';
import type { TestCaseDocumentItem } from '../services/api.js';

interface TestCasesLibraryProps {
  testCases: TestCaseDocumentItem[];
  onSelectTestCase: (testCase: TestCaseDocumentItem) => void;
  isAnalyzing?: boolean;
}

export const TestCasesLibrary: React.FC<TestCasesLibraryProps> = ({
  testCases,
  onSelectTestCase,
  isAnalyzing = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [loadingCaseId, setLoadingCaseId] = useState<string | null>(null);

  const categories = ['ALL', ...Array.from(new Set(testCases.map((tc) => tc.category)))];

  const filteredCases = testCases.filter((tc) =>
    selectedCategory === 'ALL' ? true : tc.category === selectedCategory
  );

  const handleCopyText = (tc: TestCaseDocumentItem) => {
    navigator.clipboard.writeText(tc.text);
    setCopiedId(tc.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadFile = (tc: TestCaseDocumentItem) => {
    const blob = new Blob([tc.text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = tc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Employment':
        return Briefcase;
      case 'Offer Letter':
        return FileText;
      case 'NDA':
        return Layers;
      case 'Lease':
        return Home;
      case 'Contractor':
        return FileCode;
      case 'High-Risk Review':
        return ShieldAlert;
      default:
        return FileText;
    }
  };

  return (
    <div className="space-y-8" id="test-cases-library-view">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4 border border-slate-800 shadow-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-amber-400 text-xs font-medium border border-slate-700">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Evaluation & Verification Suite</span>
        </div>
        <div className="max-w-3xl space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Test Case Documents Library
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Choose from 6 realistic, fictional legal documents to test LegalLens across varied contract types: standard employment, remote offers, mutual NDAs, residential leases, 1099 contractor agreements, and atypical high-friction contracts.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="text-slate-400 font-medium flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Filter by:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 font-semibold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              {cat === 'ALL' ? 'All Documents (6)' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Test Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCases.map((tc) => {
          const IconComponent = getCategoryIcon(tc.category);
          const isPreviewing = previewId === tc.id;
          const isCopied = copiedId === tc.id;
          const isHighRisk = tc.category === 'High-Risk Review';

          return (
            <div
              key={tc.id}
              id={`test-case-card-${tc.id}`}
              className={`bg-white rounded-2xl border shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden ${
                isHighRisk ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200'
              }`}
            >
              {/* Card Header */}
              <div className="p-6 space-y-3 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isHighRisk ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                        {tc.category}
                      </span>
                      <h2 className="font-serif font-bold text-base sm:text-lg text-slate-900 leading-snug">
                        {tc.title}
                      </h2>
                    </div>
                  </div>

                  {tc.badge && (
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border whitespace-nowrap ${
                        isHighRisk
                          ? 'bg-red-50 text-red-800 border-red-200'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {tc.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {tc.description}
                </p>

                {/* Key Provisions to Inspect */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block font-mono">
                    Key Provisions to Inspect in LegalLens:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {tc.keyProvisionsToInspect.map((provision, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{provision}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Collapsible Text Preview */}
                {isPreviewing && (
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-mono text-[11px]">{tc.name}</span>
                      <span>{tc.text.split('\n').length} lines</span>
                    </div>
                    <pre className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-[11px] font-mono text-slate-800 max-h-56 overflow-y-auto whitespace-pre-wrap select-text leading-relaxed">
                      {tc.text}
                    </pre>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    id={`preview-btn-${tc.id}`}
                    onClick={() => setPreviewId(isPreviewing ? null : tc.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-300 transition-colors"
                    title={isPreviewing ? 'Hide preview' : 'Quick preview contract text'}
                  >
                    {isPreviewing ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </>
                    )}
                  </button>

                  <button
                    id={`copy-btn-${tc.id}`}
                    onClick={() => handleCopyText(tc)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-300 transition-colors"
                    title="Copy full contract text to clipboard"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    id={`download-btn-${tc.id}`}
                    onClick={() => handleDownloadFile(tc)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-700 text-xs font-medium border border-slate-300 transition-colors"
                    title="Download .txt file"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>

                <button
                  id={`analyze-testcase-${tc.id}`}
                  disabled={isAnalyzing}
                  onClick={() => {
                    setLoadingCaseId(tc.id);
                    onSelectTestCase(tc);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  {isAnalyzing && loadingCaseId === tc.id ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>Analyze</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
