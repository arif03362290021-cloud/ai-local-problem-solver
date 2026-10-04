export type SupportedLanguage = 'en' | 'ur' | 'ur-roman' | 'ps';

export type ProblemCategory =
  | 'Electricity & Utilities'
  | 'Government Services'
  | 'Education'
  | 'Jobs & Career'
  | 'Documents & Identity'
  | 'Agriculture'
  | 'Healthcare'
  | 'Small Business'
  | 'Transport'
  | 'Legal Information'
  | 'Other';

export type UrgencyLevel = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface StepProcedure {
  stepNumber: number;
  title: string;
  description: string;
  departmentOffice?: string;
  estimatedDays?: string;
  feeInfo?: string;
  completed?: boolean;
}

export interface ProblemAnalysis {
  category: ProblemCategory;
  problem_title: string;
  language: SupportedLanguage;
  summary: string;
  urgency: UrgencyLevel;
  department: string;
  possible_reasons: string[];
  recommended_steps: StepProcedure[];
  required_documents: string[];
  application_draft: string;
  next_action: string;
  official_disclaimer: string;
  key_contacts?: {
    helpline?: string;
    website?: string;
    portalName?: string;
  };
}

export interface DocumentAnalysisResult {
  documentType: string;
  referenceNumber?: string;
  billingMonthOrDate?: string;
  unitsOrKeyMetric?: string;
  currentAmountOrFee?: string;
  dueDateOrDeadline?: string;
  issuerDepartment: string;
  summary: string;
  identifiedIssues: string[];
  difficultTermsExplained: { term: string; explanation: string }[];
  recommendedNextSteps: string[];
  isVerifiedAuthenticCheck?: string;
}

export interface DepartmentInfo {
  id: string;
  name: string;
  urduName?: string;
  pashtoName?: string;
  category: ProblemCategory;
  province: string;
  district: string;
  officeAddress: string;
  helpline: string;
  website: string;
  services: string[];
  verified: boolean;
  sampleNotice?: string;
}

export interface SavedProblemRecord {
  id: string;
  title: string;
  category: ProblemCategory;
  originalText: string;
  language: SupportedLanguage;
  createdAt: string;
  status: 'New' | 'In Progress' | 'Completed';
  analysis: ProblemAnalysis;
  completedSteps: number[];
  completedDocs: string[];
  notes?: string;
}

export interface SavedApplicationRecord {
  id: string;
  title: string;
  department: string;
  problemTitle: string;
  createdAt: string;
  language: SupportedLanguage;
  content: string;
  applicantName?: string;
  cnic?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  translatedContent?: string;
}
