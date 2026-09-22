import React from 'react';
import { AlertTriangle, Tag, HelpCircle, Info, ShieldAlert } from 'lucide-react';
import type { AttentionAreaItem } from '../types.js';

interface AttentionAreasProps {
  attentionAreas: AttentionAreaItem[];
  onSelectCitation?: (source: string) => void;
}

export const AttentionAreas: React.FC<AttentionAreasProps> = ({
  attentionAreas = [],
  onSelectCitation,
}) => {
  const safeAttentionAreas = Array.isArray(attentionAreas) ? attentionAreas : [];

  return (
    <div className="space-y-6" id="areas-to-review-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-slate-900">Areas to Review</h2>
            <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-semibold border border-amber-300">
              {safeAttentionAreas.length} Items Identified
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Provisions that may warrant closer scrutiny, negotiation, or discussion with a legal professional before signing.
          </p>
        </div>
      </div>

      {safeAttentionAreas.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-sm">
          No high-friction clauses or unusual restrictive terms were identified in this document.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {safeAttentionAreas.map((item) => (
            <div
              key={item.id}
              id={`attention-card-${item.id}`}
              className="bg-white rounded-xl border border-amber-200 shadow-2xs hover:shadow-xs p-5 space-y-4 relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-amber-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">{item.title}</h3>
                    <span className="text-[11px] font-medium text-amber-800">
                      Needs closer review • Worth verifying prior to signing
                    </span>
                  </div>
                </div>

                {item.source && (
                  <button
                    onClick={() => onSelectCitation?.(item.source)}
                    className="inline-flex items-center gap-1 text-xs font-mono text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded border border-slate-300 transition-colors self-start sm:self-center"
                    title="View source section in document"
                  >
                    <Tag className="w-3 h-3 text-slate-500" />
                    <span>{item.source}</span>
                  </button>
                )}
              </div>

              {/* What the document says & Why it matters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="space-y-1 bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    What The Document States:
                  </span>
                  <p className="text-slate-800 leading-relaxed">{item.explanation}</p>
                </div>

                <div className="space-y-1 bg-amber-50/50 p-3.5 rounded-lg border border-amber-200/60">
                  <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
                    Why You Should Understand It:
                  </span>
                  <p className="text-amber-950 leading-relaxed">{item.whyItMatters}</p>
                </div>
              </div>

              {/* Suggested Question */}
              <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-start gap-2 text-xs">
                <HelpCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed text-slate-700">
                  <strong className="text-slate-900 font-medium">Suggested question for HR or legal counsel: </strong>
                  <span className="italic">"{item.suggestedQuestion}"</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
