import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

interface DisclaimerBannerProps {
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div
        id="disclaimer-banner-compact"
        className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2 text-xs flex items-center justify-between gap-3 rounded-lg"
        role="note"
        aria-label="Legal Disclaimer"
      >
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0" />
          <span>
            <strong>LegalLens is an AI document assistant, not a lawyer.</strong> Informational analysis only; does not replace qualified professional legal advice.
          </span>
        </div>
        <span className="text-[11px] font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
          Not Legal Advice
        </span>
      </div>
    );
  }

  return (
    <aside
      id="disclaimer-banner-full"
      className="bg-slate-900 text-slate-200 border-b border-slate-800 px-4 py-2.5 text-xs font-normal"
      role="complementary"
      aria-label="Legal Assistance Disclaimer"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-slate-300">
          <Info className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>
            <strong className="text-white font-medium">Important Notice:</strong> LegalLens provides plain-English document analysis and navigation. It does not provide definitive legal counsel, predict court outcomes, or replace a qualified attorney.
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Factual Grounding Active</span>
        </div>
      </div>
    </aside>
  );
};
