import React from 'react';
import {
  Building2,
  User,
  Briefcase,
  Calendar,
  MapPin,
  DollarSign,
  TrendingUp,
  HeartPulse,
  Clock,
  Hourglass,
  Bell,
  AlertOctagon,
  Sun,
  Lock,
  Lightbulb,
  ShieldBan,
  Users,
  Scale,
  Gavel,
} from 'lucide-react';
import type { KeyTerms } from '../types.js';

interface KeyTermsGridProps {
  terms: KeyTerms;
}

interface TermItemConfig {
  key: keyof KeyTerms;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'Parties & Role' | 'Compensation & Perks' | 'Time & Notice' | 'Legal & Covenants';
}

const TERM_CONFIGS: TermItemConfig[] = [
  // Parties & Role
  { key: 'employer', label: 'Employer / Company', icon: Building2, category: 'Parties & Role' },
  { key: 'employee', label: 'Employee / Individual', icon: User, category: 'Parties & Role' },
  { key: 'jobTitle', label: 'Position / Title', icon: Briefcase, category: 'Parties & Role' },
  { key: 'startDate', label: 'Start Date / Commencement', icon: Calendar, category: 'Parties & Role' },
  { key: 'location', label: 'Work Location / Hybrid', icon: MapPin, category: 'Parties & Role' },

  // Compensation & Perks
  { key: 'salary', label: 'Base Salary / Fee', icon: DollarSign, category: 'Compensation & Perks' },
  { key: 'variableCompensation', label: 'Bonus / Variable Comp', icon: TrendingUp, category: 'Compensation & Perks' },
  { key: 'benefits', label: 'Benefits & Retirement', icon: HeartPulse, category: 'Compensation & Perks' },
  { key: 'leaveInformation', label: 'Paid Time Off (PTO) / Leave', icon: Sun, category: 'Compensation & Perks' },

  // Time & Notice
  { key: 'probationPeriod', label: 'Probationary Period', icon: Hourglass, category: 'Time & Notice' },
  { key: 'workingHours', label: 'Working Hours / Schedule', icon: Clock, category: 'Time & Notice' },
  { key: 'noticePeriod', label: 'Notice Period', icon: Bell, category: 'Time & Notice' },
  { key: 'terminationConditions', label: 'Termination Rules', icon: AlertOctagon, category: 'Time & Notice' },

  // Legal & Covenants
  { key: 'confidentiality', label: 'Confidentiality Scope', icon: Lock, category: 'Legal & Covenants' },
  { key: 'intellectualProperty', label: 'IP Assignment & Inventions', icon: Lightbulb, category: 'Legal & Covenants' },
  { key: 'nonCompete', label: 'Non-Compete Restrictions', icon: ShieldBan, category: 'Legal & Covenants' },
  { key: 'nonSolicitation', label: 'Non-Solicitation Terms', icon: Users, category: 'Legal & Covenants' },
  { key: 'governingLaw', label: 'Governing Law', icon: Scale, category: 'Legal & Covenants' },
  { key: 'disputeResolution', label: 'Dispute Resolution / Arbitration', icon: Gavel, category: 'Legal & Covenants' },
];

export const KeyTermsGrid: React.FC<KeyTermsGridProps> = ({ terms }) => {
  const isNotFound = (value?: string) => {
    if (!value) return true;
    const lower = value.trim().toLowerCase();
    return (
      lower === 'not found in document' ||
      lower === 'not found' ||
      lower === 'not specified' ||
      lower === 'n/a'
    );
  };

  const categories: Array<'Parties & Role' | 'Compensation & Perks' | 'Time & Notice' | 'Legal & Covenants'> = [
    'Parties & Role',
    'Compensation & Perks',
    'Time & Notice',
    'Legal & Covenants',
  ];

  return (
    <div className="space-y-6" id="key-terms-section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-900">Key Terms & Terms Matrix</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Core contractual terms extracted verbatim or summarized. If a term is absent, it is explicitly flagged.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {categories.map((cat) => {
          const items = TERM_CONFIGS.filter((cfg) => cfg.category === cat);
          return (
            <div key={cat} className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
                {cat}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((cfg) => {
                  const val = terms[cfg.key];
                  const notPresent = isNotFound(val);

                  return (
                    <div
                      key={String(cfg.key)}
                      id={`term-card-${String(cfg.key)}`}
                      className={`p-4 rounded-xl border transition-all ${
                        notPresent
                          ? 'bg-slate-50/70 border-slate-200/80 text-slate-400'
                          : 'bg-white border-slate-200 shadow-2xs hover:shadow-xs hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <cfg.icon
                          className={`w-4 h-4 ${
                            notPresent ? 'text-slate-400' : 'text-slate-700'
                          }`}
                        />
                        <span
                          className={`text-xs font-medium ${
                            notPresent ? 'text-slate-500' : 'text-slate-600'
                          }`}
                        >
                          {cfg.label}
                        </span>
                      </div>

                      <div className="mt-1">
                        {notPresent ? (
                          <span className="inline-block text-xs font-mono text-slate-400 italic bg-slate-100/80 px-2 py-0.5 rounded border border-slate-200/60">
                            Not found in document
                          </span>
                        ) : (
                          <p className="text-sm font-semibold text-slate-900 leading-snug break-words">
                            {val}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
