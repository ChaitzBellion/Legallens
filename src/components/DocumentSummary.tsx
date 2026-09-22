import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Eye,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import type { DocumentAnalysis } from '../types.js';

interface DocumentSummaryProps {
  analysis: DocumentAnalysis;
  onViewRawText: () => void;
}

export const DocumentSummary: React.FC<DocumentSummaryProps> = ({
  analysis,
  onViewRawText,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    navigator.clipboard.writeText(analysis.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden" id="document-summary-card">
      {/* Top Meta Bar */}
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center flex-shrink-0 border border-slate-700">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-bold font-serif text-white tracking-tight">
                {analysis.documentName}
              </h1>
              {analysis.isFictionalDemo && (
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
                  Demo Document — Fictional
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
              <span className="font-medium text-slate-300">{analysis.documentTypeLabel}</span>
              <span>•</span>
              {analysis.pageCount ? <span>{analysis.pageCount} Pages</span> : null}
              {analysis.pageCount ? <span>•</span> : null}
              <span>{analysis.wordCount.toLocaleString()} words</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs border border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-medium">Analysis Grounded</span>
          </div>

          <button
            id="view-raw-document-btn"
            onClick={onViewRawText}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Full Text</span>
          </button>
        </div>
      </div>

      {/* Executive Summary Section */}
      <div className="p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl font-bold text-slate-900">Executive Summary</h2>
            <span className="text-xs text-slate-500 font-sans font-normal">(Plain-English Overview)</span>
          </div>

          <button
            id="copy-summary-btn"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-md transition-colors"
            title="Copy plain English summary"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-sm sm:text-base text-slate-700 leading-relaxed space-y-3">
          <p className="whitespace-pre-line">{analysis.summary}</p>
        </div>

        {/* Highlight Stats Pill Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold block">
              Important Clauses
            </span>
            <span className="text-xl font-bold font-mono text-slate-900 mt-0.5 block">
              {analysis.clauses?.length ?? 0}
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-amber-700 uppercase tracking-wider font-semibold block">
              Areas to Review
            </span>
            <span className="text-xl font-bold font-mono text-amber-900 mt-0.5 block">
              {analysis.attentionAreas?.length ?? 0}
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold block">
              Key Dates & Notice
            </span>
            <span className="text-xl font-bold font-mono text-slate-900 mt-0.5 block">
              {analysis.keyDatesAndDeadlines?.length ?? 0}
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold block">
              Lawyer Questions
            </span>
            <span className="text-xl font-bold font-mono text-slate-900 mt-0.5 block">
              {analysis.questionsForProfessional?.length ?? 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
