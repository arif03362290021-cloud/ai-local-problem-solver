import { SupportedLanguage } from '../types';

export interface TranslationDictionary {
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  describeProblemCTA: string;
  seeHowItWorksCTA: string;
  supportedLanguagesLabel: string;
  inputHeading: string;
  inputPlaceholder: string;
  inputSubtext: string;
  languageSelectLabel: string;
  categorySelectLabel: string;
  optionalLabel: string;
  analyzeButton: string;
  analyzingButton: string;
  voiceInputTooltip: string;
  voiceListening: string;
  uploadFileTooltip: string;
  fileSelected: string;
  quickDemoLabel: string;
  quickDemoSubtext: string;
  hereIsWhatWeUnderstood: string;
  problemSummary: string;
  possibleReasons: string[];
  possibleReasonsTitle: string;
  recommendedSolution: string;
  stepsCompletedOf: (completed: number, total: number) => string;
  requiredDocumentsTitle: string;
  nextActionTitle: string;
  generateApplicationCTA: string;
  uploadDocAnalysisCTA: string;
  askAIFollowUpCTA: string;
  saveSolutionCTA: string;
  solutionSavedCTA: string;
  printPDFCTA: string;
  officialDisclaimer: string;
  disclaimerNotice: string;
  findDepartmentTitle: string;
  servicesNearMeTitle: string;
  myProblemsTitle: string;
  dashboardTitle: string;
  demoModeBadge: string;
  demoModeNotice: string;
  navHome: string;
  navSolve: string;
  navDocument: string;
  navDepartments: string;
  navDashboard: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    tagline: 'Your Problem. Our AI. A Clear Solution.',
    heroTitle: 'Your Problem. Our AI. A Clear Solution.',
    heroSubtitle: 'Describe your problem in Urdu, Pashto, Roman Urdu or English — and get simple, actionable guidance for government services, utilities, education, documents and local issues in Pakistan.',
    describeProblemCTA: 'Describe Your Problem',
    seeHowItWorksCTA: 'See How It Works',
    supportedLanguagesLabel: 'Supported in Pakistan & KP',
    inputHeading: 'What problem are you facing?',
    inputPlaceholder: 'Describe your issue in detail (e.g. My electricity bill is unusually high, my degree verification is delayed, or how to get my Kisan card)...',
    inputSubtext: 'You can write in English, Urdu, Roman Urdu or Pashto, or speak using the microphone.',
    languageSelectLabel: 'Language',
    categorySelectLabel: 'Category',
    optionalLabel: 'Optional',
    analyzeButton: 'Analyze Problem with AI',
    analyzingButton: 'Analyzing your problem...',
    voiceInputTooltip: 'Click to speak in your language',
    voiceListening: 'Listening... please speak now',
    uploadFileTooltip: 'Attach bill, notice, or document',
    fileSelected: 'Document attached',
    quickDemoLabel: 'Try a Realistic Demo Preset',
    quickDemoSubtext: 'Select a real-world scenario from Pakistan / KP to see how the solver works instantly:',
    hereIsWhatWeUnderstood: "Here's what we understood",
    problemSummary: 'Problem Summary',
    possibleReasons: ['Possible causes and factors'],
    possibleReasonsTitle: 'Possible Reasons',
    recommendedSolution: 'Recommended Step-by-Step Procedure',
    stepsCompletedOf: (c, t) => `${c} of ${t} steps completed`,
    requiredDocumentsTitle: 'Required Documents Checklist',
    nextActionTitle: 'Recommended Immediate Next Action',
    generateApplicationCTA: 'Generate Official Application',
    uploadDocAnalysisCTA: 'Upload Document / Bill for AI Inspection',
    askAIFollowUpCTA: 'Still Confused? Ask AI',
    saveSolutionCTA: 'Save Solution to Dashboard',
    solutionSavedCTA: 'Solution Saved!',
    printPDFCTA: 'Print / Save as PDF',
    officialDisclaimer: 'Official Verification Notice',
    disclaimerNotice: 'AI Local Problem Solver is an independent AI assistance platform. It is not an official government department. Always verify sensitive legal, financial, and government matters with the relevant official authority.',
    findDepartmentTitle: 'Find the Right Department',
    servicesNearMeTitle: 'Public Services Near Me',
    myProblemsTitle: 'My Submitted Problems',
    dashboardTitle: 'Resolution Dashboard',
    demoModeBadge: 'Demo Mode Active',
    demoModeNotice: 'Using realistic offline demo intelligence. Full system operational without API credentials.',
    navHome: 'Home',
    navSolve: 'Solve Problem',
    navDocument: 'Inspect Document',
    navDepartments: 'Find Department',
    navDashboard: 'Dashboard',
  },
  ur: {
    tagline: 'آپ کا مسئلہ۔ ہمارا اے آئی۔ ایک واضح حل۔',
    heroTitle: 'آپ کا مسئلہ۔ ہمارا اے آئی۔ ایک واضح حل۔',
    heroSubtitle: 'اپنا مسئلہ اردو، پشتو، رومن اردو یا انگریزی میں بیان کریں — اور سرکاری خدمات، بجلی، تعلیم، نوکریوں اور دستاویزات کے متعلق آسان اور عملی رہنمائی حاصل کریں۔',
    describeProblemCTA: 'اپنا مسئلہ بیان کریں',
    seeHowItWorksCTA: 'طریقہ کار دیکھیں',
    supportedLanguagesLabel: 'پاکستان اور خیبر پختونخوا کے لیے دستیاب',
    inputHeading: 'آپ کو کیا مسئلہ درپیش ہے؟',
    inputPlaceholder: 'اپنا مسئلہ یہاں تفصیل سے لکھیں (مثلاً: میرا بجلی کا بل بہت زیادہ آیا ہے، ڈگری کی تصدیق میں تاخیر ہو رہی ہے، یا کسان کارڈ کا طریقہ کیا ہے)...',
    inputSubtext: 'آپ اردو، پشتو، رومن اردو یا انگریزی میں لکھ سکتے ہیں، یا مائیکروفون پر بول کر بتا سکتے ہیں۔',
    languageSelectLabel: 'زبان',
    categorySelectLabel: 'شعبہ / زمرہ',
    optionalLabel: 'اختیاری',
    analyzeButton: 'مسئلے کا اے آئی تجزیہ کریں',
    analyzingButton: 'مسئلے کا تجزیہ جاری ہے...',
    voiceInputTooltip: 'بولنے کے لیے مائیک پر کلک کریں',
    voiceListening: 'سن رہے ہیں... براہ کرم بولیں',
    uploadFileTooltip: 'بل، اشتہار یا کاغذات منسلک کریں',
    fileSelected: 'فائل منسلک ہو گئی',
    quickDemoLabel: 'تیار شدہ ڈیمو مثالیں منتخب کریں',
    quickDemoSubtext: 'فوری نتائج دیکھنے کے لیے درج ذیل میں سے کسی ایک حقیقی مسئلے پر کلک کریں:',
    hereIsWhatWeUnderstood: 'ہم نے آپ کے مسئلے سے کیا سمجھا',
    problemSummary: 'مسئلے کا خلاصہ',
    possibleReasons: ['ممکنہ وجوہات'],
    possibleReasonsTitle: 'ممکنہ وجوہات',
    recommendedSolution: 'مرحلہ وار طریقہ کار',
    stepsCompletedOf: (c, t) => `${t} میں سے ${c} مراحل مکمل ہوئے`,
    requiredDocumentsTitle: 'درکار ضروری دستاویزات',
    nextActionTitle: 'اگلا فوری اقدام جو آپ کو کرنا چاہیے',
    generateApplicationCTA: 'باقاعدہ دفتری درخواست تیار کریں',
    uploadDocAnalysisCTA: 'کاغذات یا بل کا معائنہ کروائیں',
    askAIFollowUpCTA: 'کوئی الجھن ہے؟ اے آئی سے مزید پوچھیں',
    saveSolutionCTA: 'حل محفوظ کریں',
    solutionSavedCTA: 'حل محفوظ کر لیا گیا!',
    printPDFCTA: 'پرنٹ یا پی ڈی ایف محفوظ کریں',
    officialDisclaimer: 'سرکاری تصدیق کا لازمی نوٹس',
    disclaimerNotice: 'اے آئی لوکل پرابلم سالور ایک آزاد معلوماتی پلیٹ فارم ہے اور یہ کوئی سرکاری ادارہ نہیں ہے۔ حساس قانونی و مالی معاملات میں متعلقہ سرکاری دفتر سے تصدیق ضرور کریں۔',
    findDepartmentTitle: 'متعلقہ سرکاری محکمہ تلاش کریں',
    servicesNearMeTitle: 'قریبی سرکاری مراکز و سہولیات',
    myProblemsTitle: 'میرے درج شدہ مسائل',
    dashboardTitle: 'ڈیش بورڈ',
    demoModeBadge: 'ڈیمو موڈ فعال ہے',
    demoModeNotice: 'حقیقی نمونہ ڈیٹا اور ماڈل پر مبنی نتائج۔ انٹرنیٹ اور اے پی آئی کے بغیر بھی فعال۔',
    navHome: 'مرکزی صفحہ',
    navSolve: 'مسئلہ حل کریں',
    navDocument: 'دستاویز معائنہ',
    navDepartments: 'محکمہ تلاش کریں',
    navDashboard: 'ڈیش بورڈ',
  },
  'ur-roman': {
    tagline: 'Aap Ka Masla. Hamara AI. Aik Wazeh Hal.',
    heroTitle: 'Aap Ka Masla. Hamara AI. Aik Wazeh Hal.',
    heroSubtitle: 'Apna masla Roman Urdu, Urdu, Pashto ya English mein bayan karein — aur bijli, sarkari dafatar, taleem, documents aur rozmarrah masail ka aasan hal payein.',
    describeProblemCTA: 'Apna Masla Bayan Karein',
    seeHowItWorksCTA: 'Tariqa Kar Dekhein',
    supportedLanguagesLabel: 'Pakistan aur KP ke liye dastiyab',
    inputHeading: 'Aap ko kya masla pesh aa raha hai?',
    inputPlaceholder: 'Apna masla yahan likhein (maslan: Mera bijli ka bill bohat zyada aya hai aur samajh nahi aa raha kyun, ya admission verification mein takheer ho rahi hai)...',
    inputSubtext: 'Aap Roman Urdu, Urdu, Pashto ya English mein type kar sakte hain ya mic par bol sakte hain.',
    languageSelectLabel: 'Zuban',
    categorySelectLabel: 'Category',
    optionalLabel: 'Ikhtiyari',
    analyzeButton: 'AI se Masla Analyze Karein',
    analyzingButton: 'Aap ka masla analyze ho raha hai...',
    voiceInputTooltip: 'Bolne ke liye mic dabayein',
    voiceListening: 'Sun rahe hain... ab boleiye',
    uploadFileTooltip: 'Bill ya document attach karein',
    fileSelected: 'Document attach ho gaya',
    quickDemoLabel: 'Ready-made Demo Cases Check Karein',
    quickDemoSubtext: 'Pakistan aur KP ke aam masail ka live solution dekhne ke liye kisi aik par click karein:',
    hereIsWhatWeUnderstood: 'Ham ne aap ke masle se kya samjha',
    problemSummary: 'Masle Ka Khulasa',
    possibleReasons: ['Mumkinah Wajohat'],
    possibleReasonsTitle: 'Mumkinah Wajohat',
    recommendedSolution: 'Step-by-Step Hal Ka Tariqa',
    stepsCompletedOf: (c, t) => `${t} mein se ${c} steps mukammal huway`,
    requiredDocumentsTitle: 'Zaroori Documents Ki List',
    nextActionTitle: 'Aap Ka Agla Fouri Action',
    generateApplicationCTA: 'Official Application Draft Banayein',
    uploadDocAnalysisCTA: 'Bill ya Document AI ko Dikhayein',
    askAIFollowUpCTA: 'Mazeed Sawal Poochein (Ask AI)',
    saveSolutionCTA: 'Ye Solution Save Karein',
    solutionSavedCTA: 'Solution Save Ho Gaya!',
    printPDFCTA: 'Print / Download PDF',
    officialDisclaimer: 'Zaroori Sarkari Disclaimer',
    disclaimerNotice: 'AI Local Problem Solver aik aazad rehnuma system hai, ye koi sarkari idaara nahi hai. Kisi bhi qanooni ya sarkari mamle mein mutaliqa daftari channel se tasdeeq zaroor karein.',
    findDepartmentTitle: 'Sahi Department Talash Karein',
    servicesNearMeTitle: 'Qareebi Sarkari Sahooliyat',
    myProblemsTitle: 'Mere Save Kiye Gaye Masail',
    dashboardTitle: 'Mera Dashboard',
    demoModeBadge: 'Demo Mode Active',
    demoModeNotice: 'Realistic demo intelligence active hai. API ke baghair bhi full application chal rahi hai.',
    navHome: 'Home',
    navSolve: 'Masla Solve Karein',
    navDocument: 'Document Check',
    navDepartments: 'Departments',
    navDashboard: 'Dashboard',
  },
  ps: {
    tagline: 'ستاسو ستونزه. زمونږ مصنوعي ځیرکتیا. یو روښانه حل.',
    heroTitle: 'ستاسو ستونزه. زمونږ مصنوعي ځیرکتیا. یو روښانه حل.',
    heroSubtitle: 'خپله ستونزه په پښتو، اردو، رومن اردو یا انګلیسي کې بیان کړئ — او د دولتي ادارو، بریښنا، تعلیم، اسنادو او کرنې په اړه ساده او عملي لارښوونه تر لاسه کړئ.',
    describeProblemCTA: 'خپله ستونزه بیان کړئ',
    seeHowItWorksCTA: 'طریقه کار وګورئ',
    supportedLanguagesLabel: 'د خیبر پښتونخوا او ټول پاکستان لپاره',
    inputHeading: 'تاسو له کومې ستونزې سره مخ یاست؟',
    inputPlaceholder: 'خپله ستونزه دلته ولیکئ (لکه: زموږ د بریښنا بل بې حده زیات راغلی، یا په پوهنتون کې د اسنادو تصدیق، یا د کسان کارډ د ګټې طریقه څه ده)...',
    inputSubtext: 'تاسو کولی شئ په پښتو، اردو، یا انګلیسي ولیکئ، یا د مایکروفون له لارې خبرې وکړئ.',
    languageSelectLabel: 'ژبه',
    categorySelectLabel: 'کټګوري / څانګه',
    optionalLabel: 'اختیاري',
    analyzeButton: 'د ستونزې هوښیار تحلیل (AI)',
    analyzingButton: 'ستونزه تحلیل کیږي...',
    voiceInputTooltip: 'د خبرو لپاره مایک کښیکاږئ',
    voiceListening: 'اورو یې... مهرباني وکړئ وغږیږئ',
    uploadFileTooltip: 'د بل یا اسنادو عکس ولیږئ',
    fileSelected: 'فایل ضمیمه شو',
    quickDemoLabel: 'د بېلګې چمتو شوي موضوعات',
    quickDemoSubtext: 'د خیبر پښتونخوا د اصلي ستونزو د حل لیدلو لپاره یو باندې کلیک وکړئ:',
    hereIsWhatWeUnderstood: 'موږ ستاسو له ستونزې څه زده کړل',
    problemSummary: 'د ستونزې لنډیز',
    possibleReasons: ['احتمالي لاملونه'],
    possibleReasonsTitle: 'احتمالي لاملونه',
    recommendedSolution: 'ګام په ګام د حل لاره',
    stepsCompletedOf: (c, t) => `له ${t} څخه ${c} پړاوونه بشپړ شول`,
    requiredDocumentsTitle: 'اړین رسمي اسناد او کاغذونه',
    nextActionTitle: 'ستاسو راتلونکی سمدستي ګام',
    generateApplicationCTA: 'رسمي اداري عریضه جوړه کړئ',
    uploadDocAnalysisCTA: 'د بل یا سند کتنه (AI Inspection)',
    askAIFollowUpCTA: 'پوښتنه لرئ؟ نور وپوښتئ',
    saveSolutionCTA: 'دا حل خوندي کړئ',
    solutionSavedCTA: 'حل په ډشبورډ کې خوندي شو!',
    printPDFCTA: 'چاپ یا PDF ډاونلوډ کړئ',
    officialDisclaimer: 'د رسمي تصدیق پاملرنه',
    disclaimerNotice: 'دا د ستونزو د حل خپلواک مرستندوی سیسټم دی، دولتي دفتر نه دی. د قانوني او رسمي چارو لپاره تل له اړوندې دولتي ادارې سره معلومات تایید کړئ.',
    findDepartmentTitle: 'اړونده دولتي اداره ومومئ',
    servicesNearMeTitle: 'نږدې ولسي خدمتونه',
    myProblemsTitle: 'زما درج شوې ستونزې',
    dashboardTitle: 'ډشبورډ',
    demoModeBadge: 'ډیمو حالت فعال دی',
    demoModeNotice: 'د حقیقي ډیمو الګوریتم له مخې سیسټم فعال دی او د بهرنۍ کیلي پرته هم سم کار کوي.',
    navHome: 'اصلي پاڼه',
    navSolve: 'د ستونزې حل',
    navDocument: 'د اسنادو شننه',
    navDepartments: 'ادارې لټول',
    navDashboard: 'ډشبورډ',
  },
};

export function isRtlLanguage(lang: SupportedLanguage): boolean {
  return lang === 'ur' || lang === 'ps';
}
