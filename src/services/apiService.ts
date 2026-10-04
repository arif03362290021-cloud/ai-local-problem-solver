import { ProblemAnalysis, DocumentAnalysisResult, SupportedLanguage } from '../types';
import { DEMO_PRESETS } from '../data/demoPresets';

export interface HealthStatus {
  status: string;
  hasApiKey: boolean;
  model: string;
}

export async function checkServerHealth(): Promise<HealthStatus> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (e) {
    return { status: 'offline', hasApiKey: false, model: 'local-demo' };
  }
}

export async function analyzeProblem(
  problem: string,
  language: SupportedLanguage = 'en',
  category?: string,
  fileData?: { mimeType: string; base64: string },
  forceDemoMode = false
): Promise<{ data: ProblemAnalysis; source: string }> {
  // If user forced demo mode or if offline test
  if (forceDemoMode) {
    // Check if problem matches any preset or return matching demo preset
    const match = DEMO_PRESETS.find(p => p.userInput.toLowerCase().slice(0, 30) === problem.toLowerCase().slice(0, 30));
    if (match) {
      return { data: match.analysis, source: 'demo-preset' };
    }
  }

  try {
    const response = await fetch('/api/analyze-problem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        problem,
        language,
        category,
        fileData,
      }),
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      throw new Error(errJson.error || 'Server analysis request failed');
    }

    const json = await response.json();
    return { data: json.data, source: json.source || 'gemini-3.8-flash' };
  } catch (error) {
    console.warn('API error, falling back to client-side preset intelligence:', error);
    // Return first preset or electricity preset as resilient fallback
    const fallback = DEMO_PRESETS[0].analysis;
    return { data: fallback, source: 'fallback-offline' };
  }
}

export async function analyzeDocument(
  fileData: { mimeType: string; base64: string; name?: string },
  userNote = '',
  language: SupportedLanguage = 'en'
): Promise<{ data: DocumentAnalysisResult; source: string }> {
  try {
    const response = await fetch('/api/analyze-document', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileData,
        userNote,
        language,
      }),
    });

    if (!response.ok) {
      throw new Error('Document inspection failed');
    }

    const json = await response.json();
    return { data: json.data, source: json.source || 'gemini-3.8-flash' };
  } catch (err) {
    console.warn('Document analysis error, using fallback:', err);
    throw err;
  }
}

export async function generateApplication(
  problemTitle: string,
  department: string,
  details: string,
  language: SupportedLanguage = 'en',
  applicantInfo: { name?: string; cnic?: string; phone?: string; address?: string; referenceNo?: string } = {}
): Promise<string> {
  try {
    const response = await fetch('/api/generate-application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        problemTitle,
        department,
        details,
        language,
        applicantInfo,
      }),
    });

    if (!response.ok) throw new Error('Application generation failed');
    const json = await response.json();
    return json.applicationText;
  } catch (err) {
    console.warn('Application generator fallback used');
    return `To:
The Competent Officer / In-Charge,
${department || 'Relevant Public Department'},
Khyber Pakhtunkhwa, Pakistan

Subject: Formal Representation Regarding: ${problemTitle}

Respected Sir/Madam,

I respectfully submit this formal representation regarding the matter described above. 

Details: ${details}

I request your kind intervention to review the record and grant necessary administrative redressal at the earliest.

Yours faithfully,
${applicantInfo.name || '[Applicant Name]'}
CNIC: ${applicantInfo.cnic || '[13-Digit CNIC]'}
Phone: ${applicantInfo.phone || '[Mobile Number]'}`;
  }
}

export async function chatFollowUp(
  messages: Array<{ role?: string; sender: 'user' | 'assistant'; content: string }>,
  problemContext: any,
  language: SupportedLanguage = 'en'
): Promise<string> {
  try {
    const response = await fetch('/api/chat-followup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages,
        problemContext,
        language,
      }),
    });

    if (!response.ok) throw new Error('Chat failed');
    const json = await response.json();
    return json.reply;
  } catch (err) {
    return 'For official submission, please visit the designated customer facilitation desk with your original CNIC and latest documents.';
  }
}

export async function translateText(text: string, targetLanguage: SupportedLanguage): Promise<string> {
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        targetLanguage,
      }),
    });

    if (!response.ok) throw new Error('Translation failed');
    const json = await response.json();
    return json.translatedText;
  } catch (err) {
    return text;
  }
}
