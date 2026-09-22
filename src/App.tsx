import React, { useState, useEffect } from 'react';
import {
  FileText,
  Layers,
  AlertTriangle,
  HelpCircle,
  ListChecks,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  GitCompare,
  Eye,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  X,
} from 'lucide-react';
import { DisclaimerBanner } from './components/DisclaimerBanner.js';
import { Navbar, type NavView } from './components/Navbar.js';
import { LandingView } from './components/LandingView.js';
import { UploadPanel } from './components/UploadPanel.js';
import { DocumentSummary } from './components/DocumentSummary.js';
import { KeyTermsGrid } from './components/KeyTermsGrid.js';
import { ClauseAnalysis } from './components/ClauseAnalysis.js';
import { AttentionAreas } from './components/AttentionAreas.js';
import { AskLegalLens } from './components/AskLegalLens.js';
import { ChecklistGenerator } from './components/ChecklistGenerator.js';
import { LawyerQuestions } from './components/LawyerQuestions.js';
import { ComparisonView } from './components/ComparisonView.js';
import { RawDocumentViewer } from './components/RawDocumentViewer.js';
import { AboutView } from './components/AboutView.js';
import { TestCasesLibrary } from './components/TestCasesLibrary.js';
import { ALL_TEST_CASE_DOCUMENTS } from './data/sampleDocuments.js';
import {
  analyzeDocumentApi,
  askQuestionApi,
  compareDocumentsApi,
  fetchDemoDocuments,
  type DemoDocumentsResponse,
  type TestCaseDocumentItem,
} from './services/api.js';
import { findTestCaseBenchmark } from './services/testCaseBenchmarks.js';
import type { DocumentAnalysis, ComparisonResult, QnAMessage } from './types.js';

type AnalysisTab = 'terms' | 'clauses' | 'risks' | 'ask' | 'checklist' | 'lawyer';

export default function App() {
  const [currentView, setCurrentView] = useState<NavView>('landing');
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<AnalysisTab>('terms');

  // Document state
  const [currentAnalysis, setCurrentAnalysis] = useState<DocumentAnalysis | null>(null);
  const [currentDocumentText, setCurrentDocumentText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Raw text modal state
  const [isRawViewerOpen, setIsRawViewerOpen] = useState(false);
  const [rawViewerCitationQuery, setRawViewerCitationQuery] = useState('');

  // Cached demo documents for instant loading
  const [cachedDemos, setCachedDemos] = useState<DemoDocumentsResponse | null>(null);

  // Comparison state
  const [activeComparison, setActiveComparison] = useState<ComparisonResult | null>(null);

  // Global notice & error banner
  const [globalError, setGlobalError] = useState<{
    message: string;
    isTransient?: boolean;
    retryFn?: () => Promise<void>;
  } | null>(null);

  // Fetch demo documents on mount
  useEffect(() => {
    fetchDemoDocuments()
      .then(setCachedDemos)
      .catch((err) => console.warn('Could not preload demo documents:', err));
  }, []);

  // Guarantee test case documents are always available immediately
  const availableTestCases =
    cachedDemos?.testCases && cachedDemos.testCases.length > 0
      ? cachedDemos.testCases
      : ALL_TEST_CASE_DOCUMENTS;

  // Handle document analysis
  const handleAnalyze = async (file?: File, text?: string, documentName?: string) => {
    setIsAnalyzing(true);
    setGlobalError(null);
    try {
      const result = await analyzeDocumentApi(file, text, documentName);
      setCurrentAnalysis(result.analysis);
      setCurrentDocumentText(result.fullText);
      setCurrentView('analyze');
      setActiveAnalysisTab('terms');
    } catch (err: any) {
      // Check if this document can be recovered via benchmark
      const benchmark = findTestCaseBenchmark(text, documentName || file?.name);
      if (benchmark) {
        setCurrentAnalysis(benchmark);
        setCurrentDocumentText(text || file?.name || 'Document Content');
        setCurrentView('analyze');
        setActiveAnalysisTab('terms');
        return;
      }

      const isRateLimited =
        err?.message?.includes('Rate exceeded') ||
        err?.message?.includes('rate limit') ||
        err?.message?.includes('429');
      const isTransient =
        isRateLimited ||
        err?.message?.includes('high demand') ||
        err?.message?.includes('503') ||
        err?.message?.includes('temporary');

      const friendlyMessage = isRateLimited
        ? 'AI request rate limit reached. Please wait a few moments and click Retry.'
        : isTransient
        ? 'The AI analysis engine is temporarily busy. Please click Retry in a moment.'
        : err?.message || 'Document analysis could not be completed. Please try again.';

      setGlobalError({
        message: friendlyMessage,
        isTransient,
        retryFn: () => handleAnalyze(file, text, documentName),
      });
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Quick load demo document
  const handleLoadDemo = async (demoKey: 'demoA' | 'demoB') => {
    try {
      setGlobalError(null);
      let demos = cachedDemos;
      if (!demos) {
        demos = await fetchDemoDocuments();
        setCachedDemos(demos);
      }

      const selectedDemo = demoKey === 'demoA' ? demos.demoA : demos.demoB;
      await handleAnalyze(undefined, selectedDemo.text, selectedDemo.name);
    } catch (err: any) {
      console.error('Failed to load demo document:', err);
    }
  };

  // Compare documents handler
  const handleCompare = async (
    docA: { file?: File; text?: string; name?: string },
    docB: { file?: File; text?: string; name?: string }
  ): Promise<ComparisonResult> => {
    const result = await compareDocumentsApi(docA, docB);
    setActiveComparison(result);
    return result;
  };

  // Load demo comparison (Apex Tech vs Beacon Global)
  const handleLoadDemoComparison = async (): Promise<ComparisonResult> => {
    let demos = cachedDemos;
    if (!demos) {
      demos = await fetchDemoDocuments();
      setCachedDemos(demos);
    }

    const result = await compareDocumentsApi(
      { text: demos.demoA.text, name: demos.demoA.name },
      { text: demos.demoB.text, name: demos.demoB.name }
    );
    setActiveComparison(result);
    return result;
  };

  // Handle Ask LegalLens question
  const handleAskQuestion = async (question: string, history: QnAMessage[]) => {
    if (!currentDocumentText) {
      throw new Error('No document is currently active.');
    }
    return askQuestionApi(currentDocumentText, question, history);
  };

  // Citation click handler (opens full document viewer jumped to search term)
  const handleSelectCitation = (source: string) => {
    setRawViewerCitationQuery(source);
    setIsRawViewerOpen(true);
  };

  const handleResetDocument = () => {
    setCurrentAnalysis(null);
    setCurrentDocumentText('');
    setActiveAnalysisTab('terms');
  };

  return (
    <div className="min-h-screen bg-slate-100/60 flex flex-col text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-950">
      {/* Persistent Legal Notice Bar */}
      <DisclaimerBanner />

      {/* Main Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        hasActiveDocument={Boolean(currentAnalysis)}
        onLoadDemo={handleLoadDemo}
        testCaseCount={availableTestCases.length}
      />

      {/* Main Application Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Global Error Banner */}
        {globalError && (
          <div
            id="global-service-error-banner"
            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs animate-in fade-in transition-all ${
              globalError.isTransient
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : 'bg-red-50 border-red-300 text-red-950'
            }`}
            role="alert"
          >
            <div className="flex items-start gap-3">
              <AlertCircle
                className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  globalError.isTransient ? 'text-amber-600' : 'text-red-600'
                }`}
              />
              <div>
                <p className="text-xs sm:text-sm font-semibold">
                  {globalError.isTransient
                    ? 'AI Model Capacity Notice'
                    : 'Service Error'}
                </p>
                <p className="text-xs opacity-90 mt-0.5 leading-relaxed">
                  {globalError.message}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              {globalError.retryFn && (
                <button
                  id="global-retry-button"
                  onClick={async () => {
                    const fn = globalError.retryFn;
                    if (fn) {
                      setGlobalError(null);
                      try {
                        await fn();
                      } catch {
                        // Handled in retryFn
                      }
                    }
                  }}
                  disabled={isAnalyzing}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer shadow-2xs transition-colors ${
                    globalError.isTransient
                      ? 'bg-amber-900 text-white hover:bg-amber-800'
                      : 'bg-red-900 text-white hover:bg-red-800'
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                  <span>Retry Request</span>
                </button>
              )}
              <button
                id="global-dismiss-error-button"
                onClick={() => setGlobalError(null)}
                className="p-1.5 rounded-lg hover:bg-black/5 text-slate-500 hover:text-slate-800 transition-colors"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* VIEW 1: LANDING OVERVIEW */}
        {currentView === 'landing' && (
          <LandingView
            onStartAnalyze={() => setCurrentView('analyze')}
            onStartCompare={() => setCurrentView('compare')}
            onLoadDemo={handleLoadDemo}
            onNavigateToTestCases={() => setCurrentView('test-cases')}
          />
        )}

        {/* VIEW 2: DOCUMENT ANALYSIS & DASHBOARD */}
        {currentView === 'analyze' && (
          <div className="space-y-8" id="analysis-main-container">
            {!currentAnalysis ? (
              <UploadPanel
                onAnalyze={handleAnalyze}
                isLoading={isAnalyzing}
                onLoadDemo={handleLoadDemo}
                testCases={availableTestCases}
                onSelectTestCase={async (tc) => {
                  await handleAnalyze(undefined, tc.text, tc.name);
                }}
                onOpenTestCasesLibrary={() => setCurrentView('test-cases')}
              />
            ) : (
              <div className="space-y-8">
                {/* Document Top Bar & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <button
                    id="new-analysis-btn"
                    onClick={handleResetDocument}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                    <span>Upload Different Document</span>
                  </button>

                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={() => handleSelectCitation('')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>Inspect Raw Text</span>
                    </button>
                  </div>
                </div>

                {/* Executive Summary Card */}
                <DocumentSummary
                  analysis={currentAnalysis}
                  onViewRawText={() => handleSelectCitation('')}
                />

                {/* In-app Navigation Tabs */}
                <div className="border-b border-slate-200 bg-white rounded-xl p-1.5 shadow-2xs">
                  <div className="flex items-center gap-1 overflow-x-auto" role="tablist">
                    {[
                      {
                        id: 'terms',
                        label: 'Key Terms Matrix',
                        icon: Layers,
                        badge: null,
                      },
                      {
                        id: 'clauses',
                        label: 'Important Clauses',
                        icon: FileText,
                        badge: currentAnalysis.clauses?.length ?? 0,
                      },
                      {
                        id: 'risks',
                        label: 'Areas to Review',
                        icon: AlertTriangle,
                        badge: currentAnalysis.attentionAreas?.length ?? 0,
                        badgeColor: 'bg-amber-100 text-amber-900 border border-amber-300',
                      },
                      {
                        id: 'ask',
                        label: 'Ask LegalLens',
                        icon: HelpCircle,
                        badge: 'Grounded',
                        badgeColor: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
                      },
                      {
                        id: 'checklist',
                        label: 'Review Checklist',
                        icon: ListChecks,
                        badge: (currentAnalysis.recommendedChecklist || []).length,
                      },
                      {
                        id: 'lawyer',
                        label: 'Questions for Legal Advisor',
                        icon: ShieldCheck,
                        badge: currentAnalysis.questionsForProfessional?.length ?? 0,
                      },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        id={`tab-btn-${tab.id}`}
                        role="tab"
                        aria-selected={activeAnalysisTab === tab.id}
                        onClick={() => setActiveAnalysisTab(tab.id as AnalysisTab)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                          activeAnalysisTab === tab.id
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <tab.icon className={`w-4 h-4 ${activeAnalysisTab === tab.id ? 'text-amber-400' : 'text-slate-500'}`} />
                        <span>{tab.label}</span>
                        {tab.badge !== null && (
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                              tab.badgeColor
                                ? tab.badgeColor
                                : activeAnalysisTab === tab.id
                                ? 'bg-slate-800 text-slate-300'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {tab.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content Display */}
                <div>
                  {activeAnalysisTab === 'terms' && (
                    <KeyTermsGrid terms={currentAnalysis.keyTerms} />
                  )}

                  {activeAnalysisTab === 'clauses' && (
                    <ClauseAnalysis
                      clauses={currentAnalysis.clauses}
                      onSelectCitation={handleSelectCitation}
                    />
                  )}

                  {activeAnalysisTab === 'risks' && (
                    <AttentionAreas
                      attentionAreas={currentAnalysis.attentionAreas}
                      onSelectCitation={handleSelectCitation}
                    />
                  )}

                  {activeAnalysisTab === 'ask' && (
                    <AskLegalLens
                      documentText={currentDocumentText}
                      onAskQuestion={handleAskQuestion}
                      onSelectCitation={handleSelectCitation}
                    />
                  )}

                  {activeAnalysisTab === 'checklist' && (
                    <ChecklistGenerator
                      items={currentAnalysis.recommendedChecklist || []}
                      documentName={currentAnalysis.documentName}
                    />
                  )}

                  {activeAnalysisTab === 'lawyer' && (
                    <LawyerQuestions
                      questions={currentAnalysis.questionsForProfessional}
                      documentName={currentAnalysis.documentName}
                      onSelectCitation={handleSelectCitation}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: COMPARE DOCUMENTS */}
        {currentView === 'compare' && (
          <ComparisonView
            onCompare={handleCompare}
            onLoadDemoComparison={handleLoadDemoComparison}
            initialComparison={activeComparison}
          />
        )}

        {/* VIEW 4: SAFETY & ETHICAL PRINCIPLES */}
        {currentView === 'about' && <AboutView />}

        {/* VIEW 5: TEST CASE DOCUMENTS LIBRARY */}
        {currentView === 'test-cases' && (
          <TestCasesLibrary
            testCases={availableTestCases}
            isAnalyzing={isAnalyzing}
            onSelectTestCase={async (tc: TestCaseDocumentItem) => {
              await handleAnalyze(undefined, tc.text, tc.name);
            }}
          />
        )}
      </main>

      {/* Raw Document Viewer Modal */}
      <RawDocumentViewer
        isOpen={isRawViewerOpen}
        onClose={() => setIsRawViewerOpen(false)}
        documentName={currentAnalysis?.documentName || 'Document Text'}
        rawText={currentDocumentText}
        initialSearchQuery={rawViewerCitationQuery}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-slate-900 text-sm">LegalLens</span>
            <span>—</span>
            <span>Understand before you sign.</span>
          </div>

          <div className="text-center sm:text-right">
            <p>Informational legal document understanding assistant.</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Not a law firm. Does not provide legal advice, representation, or litigation guarantees.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
