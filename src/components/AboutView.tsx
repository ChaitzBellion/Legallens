import React from 'react';
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Cpu,
  FileSearch,
  BookOpen,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6" id="about-safety-view">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center mx-auto shadow-sm">
          <Scale className="w-6 h-6" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Safety, Tone, & Ethical Design
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          LegalLens is designed from the ground up to empower ordinary individuals to navigate legal documents responsibly without replacing professional counsel.
        </p>
      </div>

      {/* Core Principle Card */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8 space-y-4 text-amber-950">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-amber-800 flex-shrink-0" />
          <h2 className="font-serif text-xl font-bold text-amber-900">
            Absolute Directive: Informational, Not Legal Counsel
          </h2>
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-amber-900">
          Legal documents create binding commitments. While LegalLens uses state-of-the-art GenAI to unpack vocabulary, extract key milestones, and organize provisions, it is <strong>strictly an informational tool</strong>.
        </p>
        <p className="text-sm leading-relaxed text-amber-900">
          Laws vary dramatically by state, country, union agreements, and judicial precedent. Only a licensed, qualified attorney in your relevant jurisdiction can provide tailored legal advice or assess whether a specific clause is enforceable in your unique context.
        </p>
      </div>

      {/* Language Policy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-2xs">
          <div className="flex items-center gap-2 text-emerald-700 font-semibold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Permitted & Prescribed Language</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>"Potential concern":</strong> Highlights terms requiring clarification.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>"Needs attention":</strong> Identifies unusual or asymmetric obligations.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>"Consider reviewing":</strong> Encourages thoughtful personal diligence.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>"Worth discussing with a legal professional":</strong> Guides towards expert validation.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-2xs">
          <div className="flex items-center gap-2 text-red-700 font-semibold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Strictly Prohibited Claims</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">✕</span>
              <span><strong>"This clause is illegal":</strong> LegalLens never pronounces invalidity.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">✕</span>
              <span><strong>"You will win this claim":</strong> No litigation predictions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">✕</span>
              <span><strong>"This contract is unenforceable":</strong> Enforceability depends on jurisdiction.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">✕</span>
              <span><strong>"You do not need a lawyer":</strong> Never discourages professional consultation.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Security & Data Privacy Architecture */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
        <div className="flex items-center gap-3">
          <Lock className="w-6 h-6 text-slate-800" />
          <h2 className="font-serif text-xl font-bold text-slate-900">
            Security & Data Protection Guardrails
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-semibold text-slate-900 block">Server-Side Key Isolation</span>
            <p className="text-slate-600 leading-relaxed text-xs">
              Gemini API credentials never touch the browser. All orchestration is mediated by an Express backend.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-semibold text-slate-900 block">In-Memory Text Processing</span>
            <p className="text-slate-600 leading-relaxed text-xs">
              Uploaded agreements are parsed in volatile RAM using secure streaming buffers and are never written to disk.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-semibold text-slate-900 block">Prompt Injection Defense</span>
            <p className="text-slate-600 leading-relaxed text-xs">
              Documents are quarantined in isolated syntactic blocks, blocking malicious jailbreaks embedded in contract text.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
