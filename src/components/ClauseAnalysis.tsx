import React, { useState } from 'react';
import {
  FileText,
  Filter,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Lightbulb,
  ExternalLink,
  Tag,
  Info,
} from 'lucide-react';
import type { ClauseAnalysisItem, ImportanceLevel, ClauseCategory } from '../types.js';

interface ClauseAnalysisProps {
  clauses: ClauseAnalysisItem[];
  onSelectCitation?: (source: string) => void;
}

export const ClauseAnalysis: React.FC<ClauseAnalysisProps> = ({
  clauses = [],
  onSelectCitation,
}) => {
  const safeClauses = Array.isArray(clauses) ? clauses : [];
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedImportance, setSelectedImportance] = useState<string>('ALL');
  const [expandedClauseIds, setExpandedClauseIds] = useState<Set<string>>(new Set(safeClauses.slice(0, 3).map(c => c.id)));

  const toggleExpand = (id: string) => {
    setExpandedClauseIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => setExpandedClauseIds(new Set(safeClauses.map(c => c.id)));
  const collapseAll = () => setExpandedClauseIds(new Set());

  // Extract unique categories
  const categories = Array.from(new Set(safeClauses.map(c => c.category))).sort();

  const filteredClauses = safeClauses.filter(clause => {
    if (selectedCategory !== 'ALL' && clause.category !== selectedCategory) return false;
    if (selectedImportance !== 'ALL' && clause.importance !== selectedImportance) return false;
    return true;
  });

  const getImportanceBadge = (importance: ImportanceLevel) => {
    switch (importance) {
      case 'HIGH':
        return (
          <span
            className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300"
            title="Important for the reader to understand (not an assessment of legality)"
          >
            HIGH PRIORITY
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
            MEDIUM
          </span>
        );
      case 'LOW':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            STANDARD
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            INFO
          </span>
        );
    }
  };

  return (
    <div className="space-y-6" id="important-clauses-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-slate-900">Important Clauses</h2>
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-mono">
              {filteredClauses.length} of {safeClauses.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Plain-English breakdowns of critical provisions, why they matter, and what to ask.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={expandAll}
            className="text-xs text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="text-xs text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
          <Filter className="w-3.5 h-3.5" />
          <span>Filters:</span>
        </div>

        {/* Category selector */}
        <select
          id="clause-category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-800"
        >
          <option value="ALL">All Categories ({safeClauses.length})</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c} ({safeClauses.filter(item => item.category === c).length})
            </option>
          ))}
        </select>

        {/* Importance selector */}
        <select
          id="clause-importance-filter"
          value={selectedImportance}
          onChange={(e) => setSelectedImportance(e.target.value)}
          className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-800"
        >
          <option value="ALL">All Importance Levels</option>
          <option value="HIGH">High Priority</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Standard</option>
          <option value="INFORMATION">Information</option>
        </select>

        {(selectedCategory !== 'ALL' || selectedImportance !== 'ALL') && (
          <button
            onClick={() => { setSelectedCategory('ALL'); setSelectedImportance('ALL'); }}
            className="text-amber-800 hover:text-amber-950 font-medium underline ml-auto"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Clause Cards List */}
      <div className="space-y-4">
        {filteredClauses.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-sm">
            No clauses match the current filter selection.
          </div>
        ) : (
          filteredClauses.map((clause) => {
            const isExpanded = expandedClauseIds.has(clause.id);

            return (
              <div
                key={clause.id}
                id={`clause-card-${clause.id}`}
                className="bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all overflow-hidden"
              >
                {/* Clause Header / Summary Bar */}
                <div
                  className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                  onClick={() => toggleExpand(clause.id)}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-base text-slate-900">{clause.title}</h3>
                      <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                        {clause.category}
                      </span>
                      {getImportanceBadge(clause.importance)}
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {clause.explanation}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 pt-1">
                    {clause.source && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCitation?.(clause.source);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded border border-slate-200 transition-colors"
                        title="Click to view original source citation"
                      >
                        <Tag className="w-3 h-3 text-slate-400" />
                        <span>{clause.source}</span>
                      </button>
                    )}

                    <div className="p-1 rounded text-slate-400 hover:text-slate-700">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Clause Details */}
                {isExpanded && (
                  <div className="px-4 sm:px-6 pb-5 pt-1 border-t border-slate-100 space-y-4 bg-slate-50/40 text-sm">
                    {/* Why this matters */}
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-blue-600" />
                        Why This Clause Matters in Practice:
                      </span>
                      <p className="text-slate-700 text-xs sm:text-sm pl-5 leading-relaxed">
                        {clause.whyItMatters}
                      </p>
                    </div>

                    {/* Suggested Question */}
                    {clause.suggestedQuestion && (
                      <div className="space-y-1 bg-amber-50/70 p-3 rounded-lg border border-amber-200/80">
                        <span className="text-xs font-semibold text-amber-900 flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                          Suggested Question for HR or Legal Advisor:
                        </span>
                        <p className="text-amber-950 text-xs sm:text-sm pl-5 italic">
                          "{clause.suggestedQuestion}"
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
