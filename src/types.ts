export type DocumentType = 
  | 'employment_agreement'
  | 'offer_letter'
  | 'nda'
  | 'rental_agreement'
  | 'service_agreement'
  | 'freelance_contract'
  | 'general_contract'
  | 'other';

export type ImportanceLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'INFORMATION';

export type ClauseCategory = 
  | 'Compensation'
  | 'Termination'
  | 'Notice'
  | 'Probation'
  | 'Confidentiality'
  | 'Intellectual Property'
  | 'Non-compete'
  | 'Non-solicitation'
  | 'Leave'
  | 'Working hours'
  | 'Liability'
  | 'Dispute resolution'
  | 'Governing law'
  | 'Data/privacy'
  | 'Other';

export interface KeyTerms {
  employer?: string;
  employee?: string;
  jobTitle?: string;
  startDate?: string;
  location?: string;
  salary?: string;
  variableCompensation?: string;
  benefits?: string;
  probationPeriod?: string;
  workingHours?: string;
  noticePeriod?: string;
  terminationConditions?: string;
  leaveInformation?: string;
  confidentiality?: string;
  intellectualProperty?: string;
  nonCompete?: string;
  nonSolicitation?: string;
  governingLaw?: string;
  disputeResolution?: string;
  [key: string]: string | undefined;
}

export interface ClauseAnalysisItem {
  id: string;
  title: string;
  category: ClauseCategory;
  importance: ImportanceLevel;
  explanation: string;
  source: string;
  whyItMatters: string;
  suggestedQuestion?: string;
}

export interface AttentionAreaItem {
  id: string;
  title: string;
  severity: 'review' | 'caution';
  explanation: string;
  whyItMatters: string;
  source: string;
  suggestedQuestion: string;
}

export interface DocumentAnalysis {
  id: string;
  documentName: string;
  documentType: DocumentType;
  documentTypeLabel: string;
  pageCount?: number;
  wordCount: number;
  summary: string;
  keyTerms: KeyTerms;
  clauses: ClauseAnalysisItem[];
  attentionAreas: AttentionAreaItem[];
  keyDatesAndDeadlines: Array<{
    title: string;
    dateOrPeriod: string;
    source: string;
  }>;
  questionsForProfessional: Array<{
    category: string;
    question: string;
    context: string;
    source: string;
  }>;
  recommendedChecklist: Array<{
    id: string;
    text: string;
    category: string;
    isCompleted?: boolean;
  }>;
  rawTextPreview?: string;
  isFictionalDemo?: boolean;
}

export interface QnAMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  source?: string;
  timestamp: string;
}

export interface ComparisonCategoryItem {
  category: string;
  docAValue: string;
  docBValue: string;
  difference: string;
  keyNote?: string;
}

export interface ComparisonResult {
  docAName: string;
  docBName: string;
  summary: string;
  items: ComparisonCategoryItem[];
  majorDifferencesSummary: string[];
}
