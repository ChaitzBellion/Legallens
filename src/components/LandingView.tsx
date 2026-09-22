import React from 'react';
import {
  FileText,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  ListChecks,
  GitCompare,
  Sparkles,
  AlertTriangle,
  FileSearch,
  BookMarked,
  Briefcase,
  Home,
  FileCode,
  Layers,
  Files,
} from 'lucide-react';

interface LandingViewProps {
  onStartAnalyze: () => void;
  onStartCompare: () => void;
  onLoadDemo: (demoKey: 'demoA' | 'demoB') => void;
  onNavigateToTestCases?: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onStartAnalyze,
  onStartCompare,
  onLoadDemo,
  onNavigateToTestCases,
}) => {
  return (
    <div className="space-y-16 py-8" id="landing-view-container">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8" id="hero-section">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Grounded GenAI Legal Document Navigator</span>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
            Understand your legal documents <span className="text-amber-800 underline decoration-amber-300 decoration-wavy decoration-2">before you sign.</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            LegalLens uses AI to turn complex legal documents into clear explanations, important clauses, questions, and practical checklists.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            id="hero-primary-cta"
            onClick={onStartAnalyze}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 text-white font-medium text-base hover:bg-slate-800 transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <FileSearch className="w-5 h-5 text-amber-400" />
            <span>Analyze a Document</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-secondary-cta"
            onClick={onStartCompare}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-800 border border-slate-300 font-medium text-base hover:bg-slate-50 transition-all shadow-xs cursor-pointer"
          >
            <GitCompare className="w-5 h-5 text-slate-600" />
            <span>Compare Documents</span>
          </button>

          <button
            id="hero-demo-cta"
            onClick={() => onLoadDemo('demoA')}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-amber-50 text-amber-950 border border-amber-200 font-medium text-base hover:bg-amber-100 transition-all shadow-xs cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-700" />
            <span>Load Fictional Employment Demo</span>
          </button>

          {onNavigateToTestCases && (
            <button
              id="hero-testcases-cta"
              onClick={onNavigateToTestCases}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white text-slate-800 border border-slate-300 font-medium text-base hover:bg-slate-50 transition-all shadow-xs cursor-pointer"
            >
              <Files className="w-5 h-5 text-amber-600" />
              <span>Test Case Library (6 Cases)</span>
            </button>
          )}
        </div>

        {/* Visual Transformation Graphic */}
        <div className="mt-12 pt-6 max-w-5xl mx-auto">
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800">
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-4 text-center">
              The Transformation: Dense Legalese → Clear Actionable Intelligence
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left: Raw Document */}
              <div className="md:col-span-5 bg-slate-950 rounded-xl p-4 border border-slate-800 text-left font-mono text-xs text-slate-400 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-300 font-sans">
                  <span className="flex items-center gap-1.5 font-medium">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    Agreement_Draft.pdf
                  </span>
                  <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">15 Pages</span>
                </div>
                <div className="opacity-75 space-y-1.5 text-[11px] leading-relaxed">
                  <p className="text-slate-500 font-sans italic text-[10px]">SECTION 7.2 & 5.1 EXCERPTS:</p>
                  <p className="line-clamp-2">
                    "NOW, THEREFORE, the Employee covenants and warrants that in the event of termination without cause..."
                  </p>
                  <p className="line-clamp-2 bg-amber-950/40 text-amber-200/90 p-1 rounded border border-amber-900/50">
                    "notice shall be strictly sixty (60) days prior written notice, during which all restrictive covenants under Section 6.1 remain fully enforceable..."
                  </p>
                  <p className="line-clamp-2">
                    "Employee irrevocably assigns worldwide all Inventions conceived off-hours during or within 6 months post-employment..."
                  </p>
                </div>
                <div className="text-[10px] text-slate-400 pt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  <span>Unclear obligations & restrictive covenants buried in legalese</span>
                </div>
              </div>

              {/* Center: AI Processing Arrow */}
              <div className="md:col-span-2 flex flex-col items-center justify-center gap-2">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  <ArrowRight className="w-5 h-5 hidden md:block" />
                  <span className="md:hidden">↓</span>
                </div>
                <span className="text-[11px] text-amber-300 font-mono">LegalLens AI</span>
              </div>

              {/* Right: Structured Insights */}
              <div className="md:col-span-5 bg-slate-800/80 rounded-xl p-4 border border-slate-700 text-left space-y-3">
                <div className="text-[11px] font-sans font-semibold text-slate-300 flex items-center justify-between pb-1.5 border-b border-slate-700">
                  <span>Structured Document Analysis</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">Verified Grounded</span>
                </div>

                {/* Card 1 */}
                <div className="bg-slate-900/90 rounded-lg p-2.5 border border-slate-700/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">Notice Period: 60 Days</span>
                    <span className="text-[10px] text-amber-400 bg-amber-950/70 px-1.5 py-0.5 rounded">Source: Sec 7.2</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Either party must provide 2 months' written notice to resign or terminate.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-amber-950/30 rounded-lg p-2.5 border border-amber-800/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                      Area to Review: Broad IP Assignment
                    </span>
                    <span className="text-[10px] text-amber-300 bg-amber-900/60 px-1.5 py-0.5 rounded">Sec 5.2</span>
                  </div>
                  <p className="text-[11px] text-amber-200/90">
                    Clause covers personal projects up to 6 months post-departure. Suggested question for HR generated.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-slate-50 rounded-2xl border border-slate-200" id="how-it-works-section">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-3xl font-bold text-slate-900 tracking-tight">How LegalLens Works</h2>
          <p className="mt-2 text-slate-600">A clear, disciplined 5-step journey to understand any agreement before signing.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              step: '1',
              title: 'Upload',
              desc: 'Upload your PDF, DOCX, or text agreement safely without permanent data retention.',
              icon: FileText,
            },
            {
              step: '2',
              title: 'Understand',
              desc: 'Get a plain-English executive summary and structured breakdown of key terms.',
              icon: BookMarked,
            },
            {
              step: '3',
              title: 'Review',
              desc: 'Identify critical clauses, notice periods, post-employment covenants, and attention areas.',
              icon: AlertTriangle,
            },
            {
              step: '4',
              title: 'Ask',
              desc: 'Ask questions in plain English with every answer backed by exact section citations.',
              icon: HelpCircle,
            },
            {
              step: '5',
              title: 'Prepare',
              desc: 'Export actionable review checklists and targeted questions for your HR or legal counsel.',
              icon: ListChecks,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3 relative group hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center font-mono">
                  {item.step}
                </span>
                <item.icon className="w-5 h-5 text-slate-500 group-hover:text-slate-900 transition-colors" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What LegalLens Can Help With */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="capabilities-section">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="font-serif text-3xl font-bold text-slate-900 tracking-tight">
            What LegalLens Can Help With
          </h2>
          <p className="mt-2 text-slate-600">
            Engineered specifically to demystify contracts without fake legal certainty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Plain-English Summaries',
              desc: 'Translates dense legal terminology into clear, accessible prose anyone can digest.',
              icon: FileText,
            },
            {
              title: 'Important Clauses & Obligations',
              desc: 'Pinpoints compensation, notice periods, probation terms, working hours, and termination rules.',
              icon: Layers,
            },
            {
              title: 'Attention Areas & Concerns',
              desc: 'Flags long notice requirements, restrictive non-competes, and broad IP assignments for closer scrutiny.',
              icon: AlertTriangle,
            },
            {
              title: 'Key Dates, Notice & Amounts',
              desc: 'Extracts exact salary numbers, discretionary bonus conditions, deadlines, and notice periods.',
              icon: CheckCircle2,
            },
            {
              title: 'Grounded Document Q&A',
              desc: 'Ask direct questions ("Can I resign during probation?") and receive section-grounded answers.',
              icon: HelpCircle,
            },
            {
              title: 'Document Comparison',
              desc: 'Compare two offers or agreements side-by-side to understand differences without biased scoring.',
              icon: GitCompare,
            },
            {
              title: 'Review Checklists',
              desc: 'Generates a copyable, interactive action checklist grounded exclusively in the uploaded contract.',
              icon: ListChecks,
            },
            {
              title: 'Questions for Legal Professionals',
              desc: 'Produces focused, intelligent questions to ask an attorney or HR representative prior to signing.',
              icon: ShieldCheck,
            },
            {
              title: 'Zero Permanent Document Storage',
              desc: 'Processes documents in-memory on the server. Your sensitive legal text is never persisted permanently.',
              icon: Briefcase,
            },
          ].map((feat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow space-y-3"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
                <feat.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900 text-base">{feat.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Supported Documents */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="supported-documents-section">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 border border-slate-800">
          <div className="max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">Supported Document Types</h2>
            <p className="text-slate-300 mt-2 text-sm sm:text-base">
              While optimized first and most thoroughly for Employment Agreements and Offer Letters, LegalLens understands standard legal contracts:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Employment Agreements', icon: Briefcase, highlight: true },
              { label: 'Offer Letters', icon: FileText, highlight: true },
              { label: 'Non-Disclosure (NDAs)', icon: ShieldCheck },
              { label: 'Rental & Lease Agreements', icon: Home },
              { label: 'Service Agreements', icon: Layers },
              { label: 'Freelance & Contractor', icon: FileCode },
              { label: 'Consulting Agreements', icon: BookMarked },
              { label: 'General Contracts', icon: FileText },
            ].map((doc, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex items-center gap-3 ${
                  doc.highlight
                    ? 'bg-amber-950/40 border-amber-600/50 text-amber-100'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-200'
                }`}
              >
                <doc.icon className={`w-5 h-5 ${doc.highlight ? 'text-amber-400' : 'text-slate-400'}`} />
                <span className="text-sm font-medium">{doc.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Ethical Boundaries Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="safety-section">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8 space-y-4 text-amber-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-amber-900">Safety & Professional Boundaries</h3>
              <p className="text-xs text-amber-800 font-medium">Core commitments of LegalLens</p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-amber-900">
            <strong>LegalLens provides general information and document analysis. It is not a substitute for advice from a qualified legal professional.</strong>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="space-y-2 bg-white/70 p-3.5 rounded-lg border border-amber-200">
              <span className="font-semibold text-amber-900 block uppercase tracking-wider text-[11px]">
                Language We Use
              </span>
              <ul className="space-y-1 text-slate-700 list-disc list-inside">
                <li>"Potential concern"</li>
                <li>"Needs attention"</li>
                <li>"Consider reviewing this clause"</li>
                <li>"Worth discussing with a legal professional"</li>
              </ul>
            </div>

            <div className="space-y-2 bg-white/70 p-3.5 rounded-lg border border-amber-200">
              <span className="font-semibold text-red-900 block uppercase tracking-wider text-[11px]">
                Claims We Never Make
              </span>
              <ul className="space-y-1 text-slate-700 list-disc list-inside">
                <li>"This clause is illegal"</li>
                <li>"You will win this case"</li>
                <li>"This contract is definitely enforceable"</li>
                <li>"You don't need a lawyer"</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
