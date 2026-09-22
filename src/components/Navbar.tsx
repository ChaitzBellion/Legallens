import React from 'react';
import { Scale, FileSearch, GitCompare, Sparkles, BookOpen, Files } from 'lucide-react';

export type NavView = 'landing' | 'analyze' | 'compare' | 'test-cases' | 'about';

interface NavbarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  hasActiveDocument: boolean;
  onLoadDemo: (demoKey: 'demoA' | 'demoB') => void;
  testCaseCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  hasActiveDocument,
  onLoadDemo,
  testCaseCount = 6,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs" id="app-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tagline */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('landing')}
            id="brand-logo-button"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-xs group-hover:bg-slate-800 transition-colors">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl font-bold tracking-tight text-slate-900">
                  LegalLens
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
                  GenAI Assistant
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal">Understand before you sign.</p>
            </div>
          </div>

          {/* Primary Navigation Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            <button
              id="nav-btn-landing"
              onClick={() => onNavigate('landing')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'landing'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Overview
            </button>

            <button
              id="nav-btn-analyze"
              onClick={() => onNavigate('analyze')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                currentView === 'analyze'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileSearch className="w-4 h-4" />
              <span>{hasActiveDocument ? 'Document Dashboard' : 'Analyze Document'}</span>
            </button>

            <button
              id="nav-btn-compare"
              onClick={() => onNavigate('compare')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                currentView === 'compare'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <GitCompare className="w-4 h-4" />
              <span>Compare Documents</span>
            </button>

            <button
              id="nav-btn-test-cases"
              onClick={() => onNavigate('test-cases')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                currentView === 'test-cases'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Files className="w-4 h-4" />
              <span>Test Documents</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 bg-amber-100 text-amber-900 rounded-full">
                {testCaseCount}
              </span>
            </button>

            <button
              id="nav-btn-about"
              onClick={() => onNavigate('about')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                currentView === 'about'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Safety & Principles</span>
            </button>
          </nav>

          {/* Quick Demo Dropdown / Action */}
          <div className="flex items-center gap-2">
            <button
              id="quick-demo-apex-btn"
              onClick={() => onLoadDemo('demoA')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors shadow-xs"
              title="Load fictional Apex Technologies employment agreement for instant analysis"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">Try Demo:</span>
              <span>Fictional Employment Doc</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
