# LegalLens

### Understand before you sign.

**LegalLens** is a production-grade GenAI-powered legal document understanding and navigation assistant. It empowers everyday professionals, freelancers, and renters to demystify complex legal contracts, highlight critical clauses and obligations, and prepare practical questions for qualified legal counsel before signing.

---

## 1. Product Purpose & Boundaries

Legal information is notoriously dense and difficult for ordinary people to parse. LegalLens helps users:
- **Understand legal documents in plain English** without convoluted legalese.
- **Identify important clauses and obligations** (salary, notice periods, termination conditions, restrictive covenants).
- **Flag potential areas for closer review** (post-employment non-competes, broad IP assignments, long notice periods).
- **Ask grounded questions** about an uploaded document with section-level citations.
- **Compare two legal documents side-by-side** (e.g. comparing two employment offers).
- **Generate practical review checklists** to track verification progress.
- **Prepare targeted questions** for a qualified attorney or HR team.

### Absolute Safety & Non-Legal Advice Boundaries
LegalLens is **strictly an informational tool** and **never presents itself as a lawyer**:
- **Language Used**: *"Potential concern"*, *"Needs attention"*, *"Consider reviewing this clause"*, *"Worth discussing with a legal professional"*.
- **Forbidden Claims**: Never declares *"This clause is illegal"*, *"You will win this case"*, or *"You don't need a lawyer"*.
- **Zero Definitive Legal Guarantees**: Does not predict court rulings or make blanket enforceability claims.

---

## 2. System Architecture

- **Client**: Modern React 18, TypeScript, Tailwind CSS, Lucide Icons, responsive layouts with WCAG AA compliance.
- **Server**: Express.js with Vite middleware, strictly handling all GenAI orchestration and keeping API keys secure on the server side.
- **AI Engine**: Google GenAI SDK (`@google/genai`) using Gemini models with `responseSchema` for structured, type-safe outputs.
- **Parsing Engine**: In-memory parsing of PDF, Word (`.docx` via Mammoth), and plain text (`.txt`) documents without permanent disk persistence.
- **Security**: Prompt injection defense using quarantined `<user_submitted_legal_document_content>` boundaries.

### Deploying to Vercel

The frontend is built as a Vite static site, and the existing Express API is exposed to Vercel through the `api/[...path].ts` serverless function. Vercel uses the checked-in `vercel.json` build settings.

1. Import the repository into Vercel with the project root set to the repository root.
2. In **Project Settings → Environment Variables**, add `GEMINI_API_KEY` with the key value and enable it for the **Production** environment (and Preview too, if needed). `APP_URL` is not required for Gemini analysis.
3. Redeploy after changing environment variables; Vercel applies them to new deployments.
4. Visit `https://<your-deployment-domain>/api/health`. A working API responds with JSON and reports `"hasGeminiKey": true`.

Vercel Functions limit request bodies to 4.5 MB, so uploads larger than that platform limit may be rejected even though the local server accepts files up to 10 MB.

---

## 3. Key Features

1. **Document Upload & Instant Demo Pre-Loads**:
   - Drag-and-drop or paste legal text.
   - 1-click fictional demo buttons: *Apex Technologies Inc. Employment Agreement* & *Beacon Global Systems Offer Letter*.
2. **Executive Summary & Key Terms Matrix**:
   - Extracts 18+ contractual terms (Salary, Bonus, Benefits, Probation, Notice, IP, Non-Compete, Governing Law, etc.).
   - Explicitly displays *"Not found in document"* if absent—never hallucinates or guesses.
3. **Important Clauses Explorer**:
   - Categorized by Compensation, Termination, Notice, Intellectual Property, Restrictive Covenants, etc.
   - Filterable by category and importance level (`HIGH`, `MEDIUM`, `LOW`, `INFORMATION`).
   - Plain-English explanations with source citations and suggested questions.
4. **Areas to Review**:
   - Spotlights clauses that warrant scrutiny (e.g., broad post-employment IP assignment, 60-day resignation notice).
5. **Ask LegalLens (Grounded Q&A)**:
   - Chat interface answering user queries exclusively from document text.
   - Section and clause citations for every verified answer.
   - Transparent fallback when information is absent.
6. **Compare Documents**:
   - Compare two job offers or lease agreements.
   - Side-by-side matrix with neutral factual difference analysis.
7. **Checklist & Lawyer Question Preparation**:
   - Interactive verification checklist with completion tracking and one-click copy.
   - Grouped, citation-backed questions to bring to a consultation with an attorney.
8. **Test Cases Library (6 Realistic Benchmark Contracts)**:
   - **Case 1: Apex Technologies Employment Agreement**: Standard corporate offer with 60-day resignation notice, discretionary bonus conditions, and 12-month non-compete.
   - **Case 2: Beacon Global Systems Remote Offer Letter**: Remote tech role with home office stipend, quarterly performance bonus, and flexible 14-day notice.
   - **Case 3: Horizon Robotics Mutual Non-Disclosure Agreement**: 3-year term, standard exclusion carve-outs, injunctive relief, and 30-day return-of-materials mandate.
   - **Case 4: Oakridge Apartments Residential Lease**: 12-month tenancy, $2,400 security deposit with 21-day refund window, 60-day non-renewal notice, and $250 pet fee.
   - **Case 5: PixelCraft Studio Independent Contractor Agreement**: Work-for-hire milestone billing, Net-30 terms, 1099 tax status, and client ownership of deliverables upon final payment.
   - **Case 6: Titan Global High-Risk / Atypical Sample Contract**: Stress-testing sample featuring 90-day unilateral notice, forfeiture of accrued compensation upon departure, perpetual global non-compete, and mandatory one-sided arbitration.
