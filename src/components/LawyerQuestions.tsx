import React, { useState } from 'react';
import { HelpCircle, Tag, Copy, Check, MessageSquareText, ShieldQuestion } from 'lucide-react';

interface LawyerQuestionsProps {
  questions: Array<{
    category: string;
    question: string;
    context: string;
    source: string;
  }>;
  documentName: string;
  onSelectCitation?: (source: string) => void;
}

export const LawyerQuestions: React.FC<LawyerQuestionsProps> = ({
  questions = [],
  documentName = 'Document',
  onSelectCitation,
}) => {
  const safeQuestions = Array.isArray(questions) ? questions : [];
  const [copied, setCopied] = useState(false);

  const handleCopyAll = () => {
    const formatted = safeQuestions
      .map(
        (q, idx) =>
          `${idx + 1}. [${q.category}] ${q.question}\n   Context: ${q.context}\n   Reference: ${q.source}`
      )
      .join('\n\n');

    const textToCopy = `Questions for Legal Advisor or HR regarding ${documentName}:\n\n${formatted}\n\nGenerated with LegalLens.`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6" id="lawyer-questions-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-slate-900">
              Questions for a Legal Professional
            </h2>
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-mono">
              {safeQuestions.length} Prepared Questions
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Take these targeted questions to your attorney or HR team to clarify important provisions before signing.
          </p>
        </div>

        <button
          id="copy-lawyer-questions-btn"
          onClick={handleCopyAll}
          className="inline-flex items-center gap-2 text-xs font-medium px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors self-start sm:self-auto shadow-xs"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copied All Questions</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy All Questions</span>
            </>
          )}
        </button>
      </div>

      {safeQuestions.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-sm">
          No specific questions for a legal advisor were identified for this document.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {safeQuestions.map((q, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2.5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center font-mono">
                  {idx + 1}
                </span>
                <span className="text-xs font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {q.category}
                </span>
              </div>

              {q.source && (
                <button
                  onClick={() => onSelectCitation?.(q.source)}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-600 hover:text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-300 transition-colors"
                  title="View referenced section"
                >
                  <Tag className="w-3 h-3 text-slate-400" />
                  <span>{q.source}</span>
                </button>
              )}
            </div>

            <p className="font-bold text-slate-900 text-sm sm:text-base leading-snug pl-8">
              "{q.question}"
            </p>

            <div className="pl-8 text-xs text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-700">Why to ask: </span>
              {q.context}
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};
