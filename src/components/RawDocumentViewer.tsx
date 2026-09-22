import React, { useState, useEffect } from 'react';
import { X, Search, Copy, Check, FileText } from 'lucide-react';

interface RawDocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  documentName: string;
  rawText: string;
  initialSearchQuery?: string;
}

export const RawDocumentViewer: React.FC<RawDocumentViewerProps> = ({
  isOpen,
  onClose,
  documentName,
  rawText,
  initialSearchQuery = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to render text with search highlights
  const renderHighlightedText = () => {
    if (!searchQuery.trim()) {
      return rawText;
    }

    const query = searchQuery.trim();
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = rawText.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-amber-200 text-amber-950 font-bold px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="raw-doc-title"
      id="raw-document-viewer-modal"
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full h-[85vh] flex flex-col shadow-2xl border border-slate-300 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:px-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-amber-400" />
            <div>
              <h2 id="raw-doc-title" className="text-base font-bold font-serif">
                {documentName}
              </h2>
              <span className="text-xs text-slate-400 font-mono">Full Extracted Document Text</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close raw document viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Filter Bar */}
        <div className="p-3.5 bg-slate-100 border-b border-slate-200 flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search keywords or sections (e.g. 'Section 8.2', 'notice', 'probation')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-500 hover:text-slate-800 px-2"
            >
              Clear
            </button>
          )}
        </div>

        {/* Text View Body */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-50 text-slate-800 font-mono text-xs leading-relaxed whitespace-pre-wrap select-text">
          {renderHighlightedText()}
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
