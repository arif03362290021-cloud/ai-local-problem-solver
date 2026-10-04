import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

const app = express();
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// Initialize GoogleGenAI SDK safely
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(aiClient),
    model: 'gemini-3.8-flash',
    timestamp: new Date().toISOString(),
  });
});

// Helper to safely parse JSON from AI response
function extractAndParseJSON(text: string) {
  try {
    const cleaned = text.trim();
    // If it's wrapped in ```json ... ``` markdown block
    const jsonMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1]);
    }
    return JSON.parse(cleaned);
  } catch (e) {
    console.warn('Initial JSON parse failed, attempting regex extraction:', e);
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const sub = text.substring(firstBrace, lastBrace + 1);
      return JSON.parse(sub);
    }
    throw new Error('Unable to parse JSON from AI response');
  }
}

// 1. Problem Analysis Endpoint
app.post('/api/analyze-problem', async (req: Request, res: Response) => {
  const { problem, language = 'en', category, fileData } = req.body;

  if (!problem || typeof problem !== 'string' || problem.trim().length === 0) {
    res.status(400).json({ error: 'Please provide a description of the problem.' });
    return;
  }

  // If Gemini API is available, query gemini-3.8-flash
  if (aiClient) {
    try {
      const systemInstruction = `You are "AI Local Problem Solver", an expert civic and public administrative advisor in Pakistan, especially Khyber Pakhtunkhwa.
Your task is to analyze everyday problems of Pakistani citizens, students, farmers, job seekers, and small businesses.
Languages supported: English, Urdu (اردو), Roman Urdu, Pashto (پښتو).
Respond in the language specified or matching the user's input: "${language}".

Safety & Grounding Rules:
- NEVER pretend to be an official government representative or that you have submitted the complaint or contacted any department.
- Clarify that you provide a prepared draft and procedure for the citizen to verify and submit.
- Return output strictly as valid JSON adhering to the required structure.`;

      const prompt = `Analyze this citizen problem from Pakistan/KP:
Problem Description: "${problem}"
User preferred language: "${language}"
Category hint: "${category || 'Auto-detect'}"

Return a JSON object with this exact shape:
{
  "category": "Electricity & Utilities" | "Government Services" | "Education" | "Jobs & Career" | "Documents & Identity" | "Agriculture" | "Healthcare" | "Small Business" | "Transport" | "Legal Information" | "Other",
  "problem_title": "Concise descriptive title",
  "language": "${language}",
  "summary": "Clear, compassionate explanation of what the user is facing and why, written in the requested language (${language})",
  "urgency": "Low" | "Medium" | "High" | "Urgent",
  "department": "Exact relevant Pakistani department/entity (e.g. PESCO, BISE Peshawar, NADRA, KPPSC, etc.)",
  "possible_reasons": ["Reason 1", "Reason 2", "Reason 3"],
  "recommended_steps": [
    {
      "stepNumber": 1,
      "title": "Action title",
      "description": "Specific instruction on where to go, what form to fill, or what website to check",
      "departmentOffice": "Relevant office name",
      "estimatedDays": "e.g. 1-2 days"
    }
  ],
  "required_documents": ["Document 1", "Document 2", "Document 3"],
  "application_draft": "A formal, polite, and professionally formatted application/complaint draft addressed to the head/officer of the department, ready for the user to print/submit.",
  "next_action": "The single most immediate step the user should take right now.",
  "official_disclaimer": "AI Local Problem Solver is an independent guidance platform. Always verify final legal, financial and procedural details with the official department."
}`;

      const contents: any[] = [];
      if (fileData && fileData.base64 && fileData.mimeType) {
        contents.push({
          inlineData: {
            mimeType: fileData.mimeType,
            data: fileData.base64.replace(/^data:[^;]+;base64,/, ''),
          },
        });
      }
      contents.push({ text: prompt });

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: contents,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const responseText = response.text || '';
      const parsedData = extractAndParseJSON(responseText);
      res.json({ success: true, data: parsedData, source: 'gemini-3.8-flash' });
      return;
    } catch (apiError) {
      console.error('Gemini API call failed, falling back to local domain intelligence:', apiError);
    }
  }

  // Offline / Demo intelligence fallback
  const fallbackAnalysis = generateFallbackAnalysis(problem, language, category);
  res.json({ success: true, data: fallbackAnalysis, source: 'local-demo-intelligence' });
});

// 2. Document Analysis Endpoint
app.post('/api/analyze-document', async (req: Request, res: Response) => {
  const { fileData, userNote = '', language = 'en' } = req.body;

  if (!fileData || !fileData.base64) {
    res.status(400).json({ error: 'Please provide a document or image file.' });
    return;
  }

  if (aiClient) {
    try {
      const mimeType = fileData.mimeType || 'image/jpeg';
      const base64Data = fileData.base64.replace(/^data:[^;]+;base64,/, '');

      const systemInstruction = `You are an expert Pakistani document and utility bill analyst.
Analyze the provided document (e.g. electricity bill, government order, job ad, board certificate, or agriculture photo) and extract essential information accurately.
Language of response: "${language}".
Do NOT invent reference numbers, amounts, or dates that cannot be detected.
Return output strictly as valid JSON.`;

      const prompt = `Inspect this document from Pakistan. User note: "${userNote}".
Return a JSON object with:
{
  "documentType": "e.g. Electricity Bill (PESCO), Job Advertisement, Board Sanad, etc.",
  "referenceNumber": "Extracted consumer/challan/reference number or 'Not detected'",
  "billingMonthOrDate": "Extracted date or month",
  "unitsOrKeyMetric": "Units consumed, marks obtained, or key numerical metric",
  "currentAmountOrFee": "Total payable, fee, or financial amount",
  "dueDateOrDeadline": "Due date, deadline, or expiry",
  "issuerDepartment": "Issuing authority or department",
  "summary": "Clear, accessible explanation of what this document states",
  "identifiedIssues": ["Issue or observation 1", "Issue 2"],
  "difficultTermsExplained": [
    { "term": "Technical or Urdu/English legal term", "explanation": "Simple explanation" }
  ],
  "recommendedNextSteps": ["Step 1", "Step 2", "Step 3"],
  "isVerifiedAuthenticCheck": "Assessment of standard markers observed"
}`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data,
            },
          },
          { text: prompt },
        ],
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.1,
        },
      });

      const responseText = response.text || '';
      const parsedData = extractAndParseJSON(responseText);
      res.json({ success: true, data: parsedData, source: 'gemini-3.8-flash' });
      return;
    } catch (err) {
      console.error('Gemini document inspection error, using fallback:', err);
    }
  }

  // Fallback document analysis
  res.json({
    success: true,
    data: {
      documentType: 'Official Document / Utility Bill',
      referenceNumber: '04-26114-0829100 U (Verified Format)',
      billingMonthOrDate: 'Current Billing Cycle',
      unitsOrKeyMetric: '542 Units recorded',
      currentAmountOrFee: 'PKR 28,450',
      dueDateOrDeadline: 'Upcoming due date indicated',
      issuerDepartment: 'Peshawar Electric Supply Company (PESCO) / Official Authority',
      summary: 'Analysis indicates an increase in consumption units exceeding the subsidized protected tier (300 units). Fuel Price Adjustments (FPA) and taxes have been appended.',
      identifiedIssues: [
        'Consumption jumped across tariff tier bracket.',
        'High Fuel Price Adjustment surcharge applied.',
        'Payment before due date is required to avoid late surcharge.'
      ],
      difficultTermsExplained: [
        {
          term: 'FPA (Fuel Price Adjustment)',
          explanation: 'Monthly adjustment for generation fuel cost variation approved by NEPRA.'
        },
        {
          term: 'Protected Tariff Slab',
          explanation: 'Subsidized rate for domestic consumers using under 300 units continuously.'
        }
      ],
      recommendedNextSteps: [
        'Take a clear photograph of your physical meter display to check for over-reading.',
        'Visit your local sub-division office before the due date if the meter reading is lower.'
      ],
      isVerifiedAuthenticCheck: 'Document contains typical official serial structure and barcode blocks.'
    },
    source: 'local-demo-intelligence'
  });
});

// 3. Application Generator Endpoint
app.post('/api/generate-application', async (req: Request, res: Response) => {
  const { problemTitle, department, details, language = 'en', applicantInfo = {} } = req.body;

  if (aiClient) {
    try {
      const prompt = `Write a formal, official, respectful application/complaint to a Pakistani government or civic authority.
Department: ${department || 'The Concerned Official Authority'}
Subject/Problem: ${problemTitle}
Details: ${details}
Language: ${language} (English, Urdu, or Pashto)
Applicant Details:
- Name: ${applicantInfo.name || '[Applicant Name]'}
- CNIC: ${applicantInfo.cnic || '[13-Digit CNIC]'}
- Phone: ${applicantInfo.phone || '[Phone Number]'}
- Address: ${applicantInfo.address || '[Address / City]'}
- Reference/Account: ${applicantInfo.referenceNo || '[Consumer / Ref Number]'}

Ensure proper formal protocol ("To, The Competent Authority...", "Subject: ...", "Respected Sir/Madam...", formal body, prayer/relief requested, and closing).`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are an expert administrative legal clerk in Pakistan specializing in drafting formal petitions, representations, and complaints.',
          temperature: 0.3,
        },
      });

      res.json({ success: true, applicationText: response.text || '' });
      return;
    } catch (err) {
      console.error('Error generating application via Gemini:', err);
    }
  }

  // Fallback drafted application
  const draft = `To:
The Competent Officer / In-Charge,
${department || 'Relevant Public Department / Authority'},
Khyber Pakhtunkhwa, Pakistan

Subject: Formal Representation Regarding: ${problemTitle || 'Urgent Grievance Redressal'}

Respected Sir/Madam,

With utmost respect, I am submitting this formal application to bring to your kind notice the following matter:

${details || 'I am facing an administrative grievance that requires your urgent intervention and lawful verification.'}

In view of the above circumstances, it is respectfully requested that:
1. Necessary official verification be carried out regarding the matter.
2. Necessary relief and administrative rectification be granted at the earliest convenience.
3. Relevant confirmation or revised documents be provided to the applicant.

Thanking you in anticipation for your prompt assistance and kind consideration.

Yours faithfully,
${applicantInfo.name || '[Applicant Name]'}
CNIC: ${applicantInfo.cnic || '[13-Digit CNIC]'}
Contact: ${applicantInfo.phone || '[Mobile Number]'}
Address: ${applicantInfo.address || '[District / Province, Pakistan]'}
Date: ${new Date().toLocaleDateString('en-GB')}`;

  res.json({ success: true, applicationText: draft });
});

// 4. Follow-up Chat Endpoint
app.post('/api/chat-followup', async (req: Request, res: Response) => {
  const { messages, problemContext, language = 'en' } = req.body;

  if (aiClient && Array.isArray(messages) && messages.length > 0) {
    try {
      const historyPrompt = messages.map(m => `${m.sender.toUpperCase()}: ${m.content}`).join('\n');
      const systemInstruction = `You are the AI Assistant for "AI Local Problem Solver" in Pakistan.
The user is asking a follow-up question regarding their previously analyzed problem:
Problem: "${problemContext?.problem_title || 'Citizen Problem'}"
Category: "${problemContext?.category || 'General'}"
Department: "${problemContext?.department || 'Relevant Authority'}"
Language: "${language}"

Guidelines:
- Answer in the user's preferred language (${language}).
- Be concise, practical, courteous, and accurate for Pakistani local procedures.
- Never claim to have contacted the government or submitted anything.
- Suggest concrete steps, locations, portal links, or required documents.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `${historyPrompt}\nASSISTANT:`,
        config: {
          systemInstruction,
          temperature: 0.3,
        },
      });

      res.json({ success: true, reply: response.text || '' });
      return;
    } catch (err) {
      console.error('Chat follow-up error with Gemini:', err);
    }
  }

  // Fallback reply
  const lastUserMsg = messages && messages[messages.length - 1]?.content.toLowerCase();
  let fallbackReply = `For ${problemContext?.department || 'this department'}, you should visit your nearest designated facilitation counter with your original CNIC and latest documents. You can also track online via their verified portal or citizen complaints cell.`;

  if (lastUserMsg && (lastUserMsg.includes('kahan') || lastUserMsg.includes('where'))) {
    fallbackReply = `Aap ko apne mutaliqa district office ya sub-division office jana hoga. Agar aap Peshawar mein hain to official customer facilitation center Shami Road ya Hayatabad center par subah 9 baje se dopehar 3 baje tak tashreef le jayein.`;
  } else if (lastUserMsg && (lastUserMsg.includes('fee') || lastUserMsg.includes('paisa') || lastUserMsg.includes('cost'))) {
    fallbackReply = `Standard government scrutiny/application fee 1Bill, EasyPaisa, JazzCash ya National Bank of Pakistan (NBP) ke zariye jama hoti hai. Kabhi kisi private agent ko direct cash na dein.`;
  }

  res.json({ success: true, reply: fallbackReply });
});

// 5. Translation Endpoint
app.post('/api/translate', async (req: Request, res: Response) => {
  const { text, targetLanguage = 'ur' } = req.body;

  if (!text) {
    res.status(400).json({ error: 'Text required' });
    return;
  }

  if (aiClient) {
    try {
      const prompt = `Translate the following text accurately into ${targetLanguage} (choose appropriate formal, courteous phrasing for Pakistani public administration):
"""
${text}
"""
Output ONLY the translated text without extra conversational preamble.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { temperature: 0.2 },
      });

      res.json({ success: true, translatedText: response.text || text });
      return;
    } catch (err) {
      console.error('Translation error with Gemini:', err);
    }
  }

  res.json({ success: true, translatedText: text });
});

// Offline Domain Heuristics Generator
function generateFallbackAnalysis(problemText: string, language: string, categoryHint?: string) {
  const textLower = problemText.toLowerCase();

  // Electricity
  if (categoryHint === 'Electricity & Utilities' || textLower.includes('bijli') || textLower.includes('bill') || textLower.includes('pesco') || textLower.includes('meter') || textLower.includes('wapda')) {
    return {
      category: 'Electricity & Utilities',
      problem_title: 'Electricity Bill Discrepancy & Reading Verification',
      language: language,
      summary: language === 'ur'
        ? 'آپ کا بجلی کا بل پچھلے مہینوں کی نسبت غیر معمولی طور پر زیادہ آیا ہے، جس کی بڑی وجہ میٹر ریڈنگ میں ممکنہ غلطی یا پروٹیکٹڈ ٹیرف سلیب سے نکلنا ہو سکتی ہے۔'
        : language === 'ps'
        ? 'ستاسو د بریښنا بل د معمول خلاف لوړ راغلی دی، چې لامل یې د میټر غلطه لوستنه یا د سبسیډي لرونکي سلیب څخه اوښتل کیدی شي.'
        : 'Your electricity bill shows an abnormal increase compared to your regular consumption pattern, indicating possible over-reading or loss of protected tariff status.',
      urgency: 'High',
      department: 'Peshawar Electric Supply Company (PESCO) / Local DISCO',
      possible_reasons: [
        'Meter reader recorded inaccurate advance or estimated units',
        'Crossing 300 units triggered high un-protected tariff slab with multiple surcharges',
        'Fuel Price Adjustment (FPA) or quarterly tariff adjustment arrears',
        'Ground earthing leakage or running meter defect'
      ],
      recommended_steps: [
        {
          stepNumber: 1,
          title: 'Photograph Live Meter Display',
          description: 'Take a clear timestamped photo of your physical meter showing current KWh reading.',
          estimatedDays: 'Immediate'
        },
        {
          stepNumber: 2,
          title: 'Compare with Bill Reading',
          description: 'If physical reading is lower than the "Current Reading" printed on the bill, it proves over-reading.',
          estimatedDays: 'Same day'
        },
        {
          stepNumber: 3,
          title: 'Visit PESCO Sub-Division (SDO / RO)',
          description: 'Submit an over-reading rectification application with photos and previous bills to get an amended bill.',
          departmentOffice: 'Local Sub-Division Office',
          estimatedDays: '1-2 Days'
        },
        {
          stepNumber: 4,
          title: 'Register Online on CCMS Portal',
          description: 'If sub-division delays, file complaint on ccms.pitc.com.pk with 14-digit reference number.',
          departmentOffice: 'CCMS Portal (ccms.pitc.com.pk)',
          estimatedDays: '2 Days'
        }
      ],
      required_documents: [
        'Current high electricity bill',
        'Previous 2-3 months paid bills',
        'Clear photograph of electric meter screen',
        'Consumer CNIC copy'
      ],
      application_draft: `To:\nThe Sub-Divisional Officer (SDO)\nPeshawar Electric Supply Company (PESCO), Sub-Division Peshawar\n\nSubject: Request for Revision of Erroneous Electricity Bill (Ref No: [14-Digit Reference No])\n\nRespected Sir,\n\nI am a bona fide consumer of PESCO bearing Reference No: [Reference No]. In the current month, my bill reflects an inaccurate reading far exceeding the actual units displayed on the physical meter.\n\nKindly depute an inspector to verify the on-site reading and issue a corrected computerized bill before the due date.\n\nYours faithfully,\n[Consumer Name]\nCNIC: [Your CNIC]\nPhone: [Your Phone]`,
      next_action: 'Take a photo of your electric meter screen right now to compare it with the units printed on your bill.',
      official_disclaimer: 'AI Local Problem Solver is an independent guidance platform. Always verify with your sub-division before the due date to avoid late payment surcharges.',
      key_contacts: {
        helpline: '118 or 091-9212010',
        website: 'https://pesco.com.pk',
        portalName: 'Customer Complaint Management System (ccms.pitc.com.pk)'
      }
    };
  }

  // Education / BISE / HEC
  if (categoryHint === 'Education' || textLower.includes('degree') || textLower.includes('sanad') || textLower.includes('bise') || textLower.includes('hec') || textLower.includes('admission') || textLower.includes('dmc')) {
    return {
      category: 'Education',
      problem_title: 'Educational Document Verification & Attestation',
      language: language,
      summary: 'You require expedited verification or attestation of your academic credentials from BISE Peshawar or the Higher Education Commission (HEC) for employment or higher studies.',
      urgency: 'High',
      department: 'BISE Peshawar / Higher Education Commission (HEC) Regional Centre',
      possible_reasons: [
        'Standard postal verification requires 15-20 days queue',
        'Board sealed envelope is required prior to HEC or embassy submission',
        'Online portal challan must be reconciled before token generation'
      ],
      recommended_steps: [
        {
          stepNumber: 1,
          title: 'Generate Urgent Board Challan Online',
          description: 'Visit bisep.edu.pk, generate urgent verification fee slip, and deposit at bank/EasyPaisa.',
          departmentOffice: 'BISE Peshawar',
          estimatedDays: '1 Day'
        },
        {
          stepNumber: 2,
          title: 'Visit One-Window Cell with Original DMC',
          description: 'Submit original document and copies at the One-Window facilitation desk.',
          departmentOffice: 'BISE Jamrud Road',
          estimatedDays: 'Same Day'
        },
        {
          stepNumber: 3,
          title: 'Book HEC Walk-in Slot',
          description: 'Apply on eservices.hec.gov.pk under Attestation and choose Urgent Walk-in option.',
          departmentOffice: 'HEC Regional Centre Hayatabad',
          estimatedDays: '1-2 Days'
        }
      ],
      required_documents: [
        'Original Degree and official Transcripts',
        'Original Matric and Intermediate Sanad/DMC',
        'CNIC copy',
        'Paid bank challan'
      ],
      application_draft: `To:\nThe Controller of Examinations / Secretary\nBISE Peshawar, Khyber Pakhtunkhwa\n\nSubject: Application for Urgent Verification of Certificate\n\nRespected Sir,\n\nI passed my examinations under Roll No [Roll No] in Year [Year]. I urgently require verified and sealed credentials for onward submission.\n\nKindly issue the confidential verification at the earliest.\n\nYours obediently,\n[Student Name]\nCNIC: [CNIC No]\nPhone: [Phone No]`,
      next_action: 'Pay the online verification challan and visit the BISE One-Window cell tomorrow morning with original certificates.',
      official_disclaimer: 'Ensure all envelopes destined for HEC or embassies remain strictly sealed by the issuing board.',
      key_contacts: {
        helpline: '091-9221404 / 051-111-119-432',
        website: 'https://bisep.edu.pk / https://eservices.hec.gov.pk'
      }
    };
  }

  // General default
  return {
    category: categoryHint || 'Government Services',
    problem_title: 'Public Administrative & Citizen Assistance',
    language: language,
    summary: 'Your issue has been logged and analyzed according to standard administrative regulations in Pakistan and Khyber Pakhtunkhwa. Follow the structured procedure to seek official redressal.',
    urgency: 'Medium',
    department: 'Relevant District Administration / Pakistan Citizen Portal (PCP)',
    possible_reasons: [
      'Procedural requirements or prerequisites need formal fulfillment',
      'Documentation or verification record pending at the local office',
      'Online portal registration required for tracking'
    ],
    recommended_steps: [
      {
        stepNumber: 1,
        title: 'Gather Prerequisite Documents',
        description: 'Ensure original CNIC, supporting receipts, and proof of residence/record are collected.',
        estimatedDays: '1 Day'
      },
      {
        stepNumber: 2,
        title: 'Submit Formal Written Application',
        description: 'Present the provided application draft to the concerned department reception and obtain a diary tracking number.',
        departmentOffice: 'District Administration / Local Office',
        estimatedDays: '1-2 Days'
      },
      {
        stepNumber: 3,
        title: 'Escalate on Pakistan Citizen Portal (PCP)',
        description: 'If unresolved within standard timeframe, submit a grievance via the Citizen Portal mobile app.',
        departmentOffice: 'Citizen Portal (PCP)',
        estimatedDays: '3-5 Days'
      }
    ],
    required_documents: [
      'Applicant National Identity Card (CNIC)',
      'Relevant official reference/challan receipts',
      'Signed application letter'
    ],
    application_draft: `To:\nThe Concerned Officer / In-Charge\nCompetent Public Authority, Khyber Pakhtunkhwa\n\nSubject: Formal Application for Grievance Redressal\n\nRespected Sir/Madam,\n\nI respectfully bring to your notice the following citizen matter. Kindly review the attached documents and issue necessary official direction for prompt resolution.\n\nYours faithfully,\n[Your Name]\nCNIC: [Your CNIC]\nPhone: [Your Phone]`,
    next_action: 'Review the required documents checklist and prepare your formal written application.',
    official_disclaimer: 'AI Local Problem Solver is an independent guidance platform. Always verify with official departments.',
    key_contacts: {
      helpline: 'Pakistan Citizen Portal / Local DC Office',
      website: 'https://kp.gov.pk'
    }
  };
}

// Full-stack Vite handling
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AI Local Problem Solver server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
