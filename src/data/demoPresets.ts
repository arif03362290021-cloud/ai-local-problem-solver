import { ProblemAnalysis, SupportedLanguage, ProblemCategory } from '../types';

export interface DemoPreset {
  id: string;
  title: string;
  titleUrdu: string;
  titlePashto: string;
  category: ProblemCategory;
  language: SupportedLanguage;
  userInput: string;
  analysis: ProblemAnalysis;
}

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'demo-electricity-bill',
    title: 'High Electricity Bill & Reading Discrepancy',
    titleUrdu: 'بجلی کا زیادہ بل اور میٹر ریڈنگ کا مسئلہ',
    titlePashto: 'د بریښنا لوړ بل او د میټر ستونزه',
    category: 'Electricity & Utilities',
    language: 'ur-roman',
    userInput: 'Mera bijli ka bill is mahine bohat zyada aya hai aur mujhe samajh nahi aa raha kyun. Pichle mahine 300 units aye thay is mahine 750 units likhe hain jabkay meter reading kam lag rahi hai.',
    analysis: {
      category: 'Electricity & Utilities',
      problem_title: 'Sudden Bill Spike & Meter Reading Discrepancy',
      language: 'ur-roman',
      summary: 'Aap ka bijli ka bill is mahine 750 units par pohnch gaya hai jo pichle mahine ke 300 units se 150% zyada hai. Is se tariff slab protected (300 units tak) se nikal kar un-protected category mein chala gaya hai, jis se per-unit rate aur taxes double ho gaye hain.',
      urgency: 'High',
      department: 'Peshawar Electric Supply Company (PESCO) / Relevant DISCO',
      possible_reasons: [
        'Incorrect or advance meter reading recorded by meter reader',
        'Tariff slab jump (crossing 300 units triggers unprotected high commercial slab)',
        'Accumulated Fuel Price Adjustment (FPA) or quarterly tariff adjustment',
        'Defective or running meter fault or domestic earthing leakage',
        'Previous unpaid arrears or wrong consumer category applied'
      ],
      recommended_steps: [
        {
          stepNumber: 1,
          title: 'Physical Meter Reading Check',
          description: 'Apne bijli ke meter par ja kar live digital reading (KWh display) ki clear picture lein jahan date aur time bhi nazar aaye.',
          estimatedDays: 'Immediate',
        },
        {
          stepNumber: 2,
          title: 'Compare Units with Bill Reading',
          description: 'Bill par likhi "Current Reading" aur meter ki live reading ka mawazna karein. Agar bill par reading zyada likhi hai to ye "Over-reading" ka proof hai.',
          estimatedDays: 'Same day',
        },
        {
          stepNumber: 3,
          title: 'Visit PESCO Sub-Division Office (RO/SDO)',
          description: 'Pichle 3 mahine ke bill aur meter ki tasveer le kar apne ilaqe ke SDO ya Revenue Officer ke pas jayein aur "Detection / Reading Correction" form submit karein.',
          departmentOffice: 'Local PESCO Sub-Division Office',
          estimatedDays: '1 - 2 Days',
        },
        {
          stepNumber: 4,
          title: 'Submit Online Complaint on PITB / CCMS Portal',
          description: 'Agar sub-division mein sunwai na ho to ccms.pitc.com.pk par 14-digit Reference Number ke sath reading proof upload karein.',
          departmentOffice: 'CCMS Portal (ccms.pitc.com.pk)',
          estimatedDays: '2 - 3 Days',
        },
        {
          stepNumber: 5,
          title: 'Get Corrected Bill or Extension in Due Date',
          description: 'RO se computerized revised bill ya payment date extension stamp hasil karein taakay late payment surcharge na lagay.',
          estimatedDays: 'Before Due Date',
        }
      ],
      required_documents: [
        'Recent original high electricity bill',
        'Previous 2-3 months paid bills copies for consumption pattern proof',
        'Clear time-stamped photograph of the electric meter screen showing current units',
        'Applicant CNIC copy (owner or tenant)',
        'Written application addressed to the Sub-Divisional Officer (SDO)'
      ],
      application_draft: `To:
The Sub-Divisional Officer (SDO)
Peshawar Electric Supply Company (PESCO), Sub-Division [Insert Area / Sub-Division Name], Peshawar

Subject: Application for Rectification of Erroneous Meter Reading & Excessive Electricity Bill (Ref No: [Insert 14-Digit Reference No])

Respected Sir,

With due respect, I am a bona fide consumer of PESCO bearing Reference No: [Insert Reference No] installed at [Insert Consumer Address].

I am writing to bring to your urgent notice an anomaly in the electricity bill issued for the billing month of [Current Month]. The bill shows a billed reading of 750 units, whereas my physical meter on site currently displays significantly lower units (photograph attached with date & time). In the previous month, my normal consumption was approximately 300 units.

Due to this excessive and erroneous reading, my tariff category has been unfairly pushed into the higher un-protected slab, resulting in an exorbitant and unjustified financial burden, along with heavy surcharges.

It is therefore respectfully requested that:
1. An official lineman/meter inspector be deputed to verify the actual on-site meter reading.
2. The bill be revised based on the actual units consumed.
3. The due date for payment be extended until the revised bill is officially generated.

Thanking you in anticipation for your prompt redressal.

Yours faithfully,
[Your Name / Consumer Name]
CNIC: [Your 13-Digit CNIC]
Mobile: [Your Contact Number]
Date: [Current Date]`,
      next_action: 'Take a clear photograph of your electricity meter right now and check if the displayed units match the current reading on your bill.',
      official_disclaimer: 'AI Local Problem Solver provides procedural guidance based on standard DISCO/NEPRA regulations. Please visit your designated sub-division office before the due date to avoid power disconnection.',
      key_contacts: {
        helpline: '118 or 091-9212010',
        website: 'https://pesco.com.pk',
        portalName: 'Customer Complaint Management System (CCMS: ccms.pitc.com.pk)'
      }
    }
  },
  {
    id: 'demo-university-admission',
    title: 'BISE Verification & HEC Degree Attestation Delay',
    titleUrdu: 'تعلیمی اسناد کی تصدیق اور ایچ ای سی کی تاخیر',
    titlePashto: 'د ښوونې د سندونو تصدیق او د HEC ستونزه',
    category: 'Education',
    language: 'en',
    userInput: 'I urgently need to verify my F.Sc DMC from BISE Peshawar and get my BS degree attested by HEC for a foreign master scholarship deadline in 10 days, but standard verification takes weeks. What is the fastest official procedure?',
    analysis: {
      category: 'Education',
      problem_title: 'Urgent BISE Verification & HEC Fast-Track Attestation',
      language: 'en',
      summary: 'You have a scholarship deadline in 10 days requiring BISE Peshawar verification of your intermediate certificate and HEC attestation of your bachelor degree. Regular postal attestation takes 15-20 working days, so you must use the official One-Day Urgent / Fast-Track Walk-in services.',
      urgency: 'Urgent',
      department: 'BISE Peshawar & Higher Education Commission (HEC) Regional Centre',
      possible_reasons: [
        'Postal verification queues take 2 to 3 weeks due to high backlog',
        'HEC online portal requires prior document upload and pre-verification approval before appointment slot generation',
        'Board sealed envelope requirement for HEC attestation of intermediate prerequisites'
      ],
      recommended_steps: [
        {
          stepNumber: 1,
          title: 'Apply for BISE Peshawar Urgent Verification',
          description: 'Visit the BISE Peshawar Online Verification Portal (bisep.edu.pk). Generate the Urgent Verification Challan fee (approx Rs. 1,500 - 2,000) and pay at any Allied Bank / EasyPaisa branch.',
          departmentOffice: 'BISE Peshawar, Jamrud Road',
          estimatedDays: '1 Day (Urgent Counter)',
        },
        {
          stepNumber: 2,
          title: 'Collect Sealed Board Envelope',
          description: 'Submit original DMC and copies at the One-Window facilitation cell of BISE Peshawar. Request a "Confidential Sealed Envelope for HEC / Foreign Embassy".',
          departmentOffice: 'BISE One-Window Cell',
          estimatedDays: 'Same Day / Next Morning',
        },
        {
          stepNumber: 3,
          title: 'Log in to HEC e-Portal (eservices.hec.gov.pk)',
          description: 'Create an application under "Attestation Services". Select "Walk-in Urgent (Same Day)" mode instead of courier mode. Choose HEC Regional Centre Peshawar or HEC Islamabad HQ.',
          departmentOffice: 'HEC e-Services Portal',
          estimatedDays: '2 Hours online',
        },
        {
          stepNumber: 4,
          title: 'Book Urgent Walk-in Slot & Attach Scholarship Offer',
          description: 'Attach the scholarship award letter as justification for urgent scheduling. Pay the urgent attestation fee online via 1Bill.',
          estimatedDays: '1 Day for online approval',
        },
        {
          stepNumber: 5,
          title: 'Appear at HEC Facilitation Centre with Original Transcript & Degree',
          description: 'Present original Matric/F.Sc, BS Degree, official Transcript, CNIC, and appointment slip. The HEC officer stamps the QR-coded security sticker on the same day.',
          departmentOffice: 'HEC Regional Centre, Phase 5 Hayatabad, Peshawar',
          estimatedDays: 'Same Day at counter',
        }
      ],
      required_documents: [
        'Original BS Degree and official Semester Transcript / DMC',
        'Original Intermediate (F.Sc) Sanad / DMC & Matric Certificate',
        'CNIC original and 2 clear photocopies',
        'Passport copy (if required for foreign scholarship)',
        'Copy of Scholarship Admission Letter / Visa Deadline notification',
        'Bank fee paid challan receipts'
      ],
      application_draft: `To:
The Director / In-charge
Higher Education Commission (HEC) Regional Centre, Phase 5, Hayatabad, Peshawar

Subject: Request for Urgent Same-Day Walk-In Degree Attestation on Basis of Scholarship Deadline

Respected Sir/Madam,

I have completed my [Degree Name, e.g. BS Computer Science] from [University Name] in the year [Graduation Year] under Roll No / Registration No: [Your Registration No].

I have been awarded a prestigious international scholarship for postgraduate studies at [University / Country Name], with a mandatory document submission deadline on [Specific Date within 10 days]. Failure to provide an HEC-attested degree by this deadline will result in the immediate forfeiture of my admission and scholarship opportunity.

My online application has been lodged on the HEC e-portal with Application ID: [Insert e-Services App ID]. All prerequisite educational certificates including Matric and Intermediate are verified.

In light of the extreme urgency and strict foreign deadline, I humbly request your good office to grant me an emergency walk-in attestation token at the earliest.

Thanking you in anticipation.

Yours obediently,
[Your Full Name]
CNIC: [Your CNIC]
Phone: [Your Phone Number]
Application ID: [HEC Application ID]`,
      next_action: 'Generate your BISE Peshawar online urgent challan today, and immediately upload your degree scan to eservices.hec.gov.pk to clear preliminary screening.',
      official_disclaimer: 'Always verify appointment availability directly on eservices.hec.gov.pk. Do not pay unauthorized agents or intermediaries.',
      key_contacts: {
        helpline: 'HEC UAN: 051-111-119-432 / BISE: 091-9221404',
        website: 'https://eservices.hec.gov.pk',
        portalName: 'HEC E-Services Portal & BISE One-Window'
      }
    }
  },
  {
    id: 'demo-job-kppsc',
    title: 'KPPSC / ETEA Job Domicile & Zonal Quota Issue',
    titleUrdu: 'خیبر پختونخوا پبلک سروس کمیشن میں زونل کوٹہ اور ڈومیسائل کا مسئلہ',
    titlePashto: 'په KPPSC کې د زونل کوټې او ډومیسائل ستونزه',
    category: 'Jobs & Career',
    language: 'ur-roman',
    userInput: 'Mene KPPSC me Tehsildar post ke liye apply kiya tha. Mera test pass ho gaya hai lekin ab mujhe call aayi hai ke mera Domicile Zone 3 ka hai jabkay mene Zone 2 select kiya tha ghalti se. Kya meri application reject ho jayegi ya theek ho sakti hai?',
    analysis: {
      category: 'Jobs & Career',
      problem_title: 'Correction of Domicile Zone in KPPSC Candidate Profile',
      language: 'ur-roman',
      summary: 'Aap ne KPPSC Tehsildar test qualify kar liya hai lekin online profile mein ghalti se Zone 2 select ho gaya jabkay Domicile Certificate Zone 3 ka hai. KPPSC regulations ke mutabiq clerical mistake ki correction interview se pehle written representation submit kar ke legal affidavit ke sath theek karwai ja sakti hai.',
      urgency: 'High',
      department: 'Khyber Pakhtunkhwa Public Service Commission (KPPSC)',
      possible_reasons: [
        'Online portal form filling error while selecting district dropdown',
        'Zonal quota system in KP divides districts into 5 zones (Zone 1 to Zone 5), each having distinct merit seats',
        'Discrepancy detected during scrutiny of original documents post-screening test'
      ],
      recommended_steps: [
        {
          stepNumber: 1,
          title: 'Obtain Verified Copy of Domicile Certificate',
          description: 'Apne mutaliqa Deputy Commissioner (DC) office se Domicile ki certified verification copy ya PRC hasil karein jo date of application se pehle ki ho.',
          departmentOffice: 'DC Office / E-Khidmat Center',
          estimatedDays: '1 Day',
        },
        {
          stepNumber: 2,
          title: 'Prepare Legal Affidavit on Stamp Paper',
          description: 'Rs. 100 ke judicial stamp paper par Oath Commissioner se tasdeeq shuda bayan e halfi (Affidavit) banwayein jisme wazeh ho ke Zone 2 ka selection ek unintentional clerical error tha.',
          estimatedDays: 'Same Day',
        },
        {
          stepNumber: 3,
          title: 'Draft Formal Representation to Secretary KPPSC',
          description: 'Secretary KPPSC ke naam written appeal likhein jisme test passing status, roll number, original domicile certificate aur affidavit attach karein.',
          estimatedDays: '1 Day',
        },
        {
          stepNumber: 4,
          title: 'Submit in Person at KPPSC Facilitation Desk (Peshawar)',
          description: 'KPPSC Head Office, 2-Fort Road Peshawar Cantonment ke Reception / Diary Section mein dasty jama karein aur Diary Number / Receipt zaroor lein.',
          departmentOffice: 'KPPSC Fort Road, Peshawar',
          estimatedDays: 'Same Day',
        },
        {
          stepNumber: 5,
          title: 'Follow Up with Scrutiny Branch',
          description: '3 working days ke baad diary number ke sath Scrutiny Committee se meeting karein taakay interview schedule se pehle quota zone update ho sakay.',
          estimatedDays: '3 - 5 Days',
        }
      ],
      required_documents: [
        'Original Domicile Certificate and PRC issued by DC Office',
        'Original KPPSC Test Roll Number Slip and Result Notification copy',
        'Rs. 100 Stamp Paper Affidavit attested by Oath Commissioner / Notary Public',
        'Copy of CNIC',
        'Copy of Online Application Summary Sheet submitted initially'
      ],
      application_draft: `To:
The Secretary,
Khyber Pakhtunkhwa Public Service Commission (KPPSC),
2-Fort Road, Peshawar Cantonment

Subject: Representation for Rectification of Inadvertent Clerical Error in Domicile Zone Allocation (Roll No: [Your Roll No], Post: Tehsildar)

Respected Sir,

Respectfully stated that I, [Your Full Name], appeared in the written screening test for the post of [Post Name, e.g. Tehsildar / Assistant], Advertisement No: [Advt No] under Roll No: [Your Roll No], and was declared successful on merit.

During the document scrutiny stage, it transpired that my online candidature reflects Zone [Incorrect Zone, e.g. Zone 2] instead of Zone [Correct Zone, e.g. Zone 3]. I respectfully submit that my permanent domicile belongs to District [District Name], which officially falls under Zone [Correct Zone]. The selection of the incorrect zone during the initial online application submission was purely an inadvertent typographical/clerical oversight without any mala fide intent.

I have attached:
1. Certified true copy of my original Domicile Certificate issued by Deputy Commissioner [District Name] prior to the closing date.
2. Solemn Affidavit on non-judicial stamp paper confirming the clerical nature of this error.
3. Copy of the online application and roll number slip.

It is humbly prayed that my genuine candidature may kindly be considered and shifted to my lawful Zone [Correct Zone] quota, and I may be allowed to appear in the interview on merit.

Yours faithfully,
[Your Name]
Roll No: [Roll Number]
CNIC: [Your CNIC]
Cell: [Phone Number]`,
      next_action: 'Get your domicile verified from the DC office and submit your written representation to the KPPSC Diary Branch before the interview list is finalized.',
      official_disclaimer: 'KPPSC rules stipulate that domicile must be valid prior to the advertisement closing date. Ensure all attested documents are genuine.',
      key_contacts: {
        helpline: '091-9214131 / 091-9212897',
        website: 'https://kppsc.gov.pk',
        portalName: 'KPPSC Online Candidate Portal'
      }
    }
  },
  {
    id: 'demo-nadra-cnic',
    title: 'NADRA CNIC Modification & B-Form Parent Name Correction',
    titleUrdu: 'نادرا شناختی کارڈ اور ب فارم میں والدین کے نام کی درستی',
    titlePashto: 'په نادرا پېژندپاڼه او بې فارم کې د نوم سمول',
    category: 'Documents & Identity',
    language: 'ur',
    userInput: 'میرے بچے کے ب فارم میں والدہ کا شناختی کارڈ نمبر اور تاریخ پیدائش میں غلطی ہے، جس کی وجہ سے سکول ایڈمیشن اور پاسپورٹ نہیں بن رہا۔ نادرا دفتر سے اس کو کیسے درست کروایا جائے؟',
    analysis: {
      category: 'Documents & Identity',
      problem_title: 'NADRA B-Form / CRC Correction Procedure',
      language: 'ur',
      summary: 'آپ کے بچے کے چائلڈ رجسٹریشن سرٹیفکیٹ (ب فارم) میں والدہ کے کوائف اور تاریخ پیدائش میں کلیریکل غلطی ہے جس سے پاسپورٹ اور سکول میں رکاوٹ آ رہی ہے۔ نادرا رولز کے مطابق یونین کونسل برتھ ریکارڈ اور نادرا فیملی ٹری کی تصدیق کے ذریعے ب فارم کی ترمیم ممکن ہے۔',
      urgency: 'Medium',
      department: 'نیشنل ڈیٹا بیس اینڈ رجسٹریشن اتھارٹی (نادرا)',
      possible_reasons: [
        'یونین کونسل کے ابتدائی برتھ اندراج میں ہندسوں کی غلطی',
        'والدہ کا پرانا شناختی کارڈ یا شادی کے بعد نادرا ریکارڈ اپڈیٹ نہ ہونا',
        'ڈیٹا انٹری آپریٹر کی طرف سے ہسپتال کے برتھ سرٹیفکیٹ کو غلط پڑھنا'
      ],
      recommended_steps: [
        {
          stepNumber: 1,
          title: 'یونین کونسل کا کمپیوٹرائزڈ برتھ ریکارڈ چیک کریں',
          description: 'سب سے پہلے متعلقہ یونین کونسل سیکرٹری سے رابطہ کریں اور کمپیوٹرائزڈ برتھ سلپ کا ریکارڈ درست کروائیں۔',
          departmentOffice: 'متعلقہ یونین کونسل دفتر',
          estimatedDays: '1 سے 2 دن',
        },
        {
          stepNumber: 2,
          title: 'ہسپتال / میٹرنٹی ہوم کی اصل برتھ رپورٹ حاصل کریں',
          description: 'جس ہسپتال میں بچے کی پیدائش ہوئی وہاں کا اصل ڈسچارج سلپ یا تصدیق نامہ ساتھ رکھیں۔',
          estimatedDays: '1 دن',
        },
        {
          stepNumber: 3,
          title: 'والد اور والدہ دونوں نادرا میگا سنٹر تشریف لے جائیں',
          description: 'بچے کی موجودگی کے ساتھ دونوں والدین اصل شناختی کارڈز لے کر نادرا سینٹر کے "Modification Counter" کا ٹوکن لیں۔',
          departmentOffice: 'نادرا میگا سنٹر پشاور / متعلقہ تحصیل دفتر',
          estimatedDays: 'اسی روز',
        },
        {
          stepNumber: 4,
          title: 'بائیو میٹرک تصدیق اور فارم پرنٹنگ',
          description: 'والد یا والدہ کا انگوٹھا سکین ہوگا اور نیا تصدیقی فارم جاری کیا جائے گا۔',
          estimatedDays: 'اسی وقت',
        },
        {
          stepNumber: 5,
          title: 'ترمیم شدہ سمارٹ برتھ سرٹیفکیٹ کا حصول',
          description: 'نارمل فیس پر 5 سے 7 دن، جبکہ ارجنٹ فیس پر 2 سے 3 دن میں نیا ب فارم ڈلیور ہو جائے گا۔',
          estimatedDays: '3 سے 7 دن',
        }
      ],
      required_documents: [
        'والد اور والدہ کے اصل قومی شناختی کارڈ (CNIC)',
        'یونین کونسل کا اصل کمپیوٹرائزڈ برتھ سرٹیفکیٹ',
        'ہسپتال کا اصل برتھ کارڈ / لیبر روم ڈسچارج سلپ',
        'بچے کی سابقہ غلط ب فارم کی اصل کاپی',
        'والدین کا نکاح نامہ یا فیملی رجسٹریشن سرٹیفکیٹ (FRC)'
      ],
      application_draft: `بخدمت جناب انچارج / اسسٹنٹ ڈائریکٹر صاحب
نادرا رجسٹریشن سینٹر، پشاور

عنوان: ب فارم / چائلڈ رجسٹریشن سرٹیفکیٹ (CRC) میں والدہ کے شناختی کارڈ نمبر اور تاریخ پیدائش کی درستی کی درخواست

جناب عالی!
نہایت ادب سے گزارش ہے کہ سائل کے بچے مسمی [بچے کا نام] جس کا ب فارم نمبر [ب فارم نمبر] ہے، اس کے اندراج کے وقت والدہ کا شناختی کارڈ نمبر اور تاریخ پیدائش میں سہواً غلطی واقع ہو گئی ہے۔ 

اس غلطی کی وجہ سے بچے کا سکول داخلہ اور پاسپورٹ کا عمل مکمل نہیں ہو پا رہا ہے۔ اس درخواست کے ہمراہ ہسپتال کا اصل برتھ کارڈ، یونین کونسل کا تصدیق شدہ کمپیوٹرائزڈ سرٹیفکیٹ اور والدین کے اصل شناختی کارڈز لف ہیں۔

التماس ہے کہ نادرا ڈیٹا بیس میں ضروری تصدیق کے بعد بچے کا ب فارم درست کر کے نیا سرٹیفکیٹ جاری فرمایا جائے۔

پیشگی شکریہ۔

العارض:
والد کا نام: [والد کا نام]
شناختی کارڈ نمبر: [والد کا شناختی کارڈ]
موبائل نمبر: [موبائل فون نمبر]
رہائش: [مکمل پتہ]
تاریخ: [موجودہ تاریخ]`,
      next_action: 'پہلے یونین کونسل سے درست کمپیوٹرائزڈ برتھ سلپ حاصل کریں اور پھر دونوں والدین نادرا سینٹر جائیں۔',
      official_disclaimer: 'اگر بچے کی عمر 10 سال سے زیادہ ہو تو نادرا ضوابط کے مطابق بچے کا نادرا سینٹر ذاتی طور پر حاضر ہونا لازمی ہے۔',
      key_contacts: {
        helpline: '1777 (موبائل سے) یا 051-111-786-100',
        website: 'https://nadra.gov.pk',
        portalName: 'نادرا پاک آئی ڈی پورٹل'
      }
    }
  },
  {
    id: 'demo-farmer-crop',
    title: 'Kisan Card Subsidy & Wheat Crop Yellow Rust Attack',
    titleUrdu: 'کسان کارڈ سبسڈی اور گندم کی فصل پر زرد کنگی کا حملہ',
    titlePashto: 'د کسان کارډ سبسډي او د غنمو د فصل ناروغي',
    category: 'Agriculture',
    language: 'ps',
    userInput: 'زمونږ په سوات او مردان کې د غنمو په فصل باندې ژیړ رنګی پوډر (ژیړه کنګي) راغلې ده او پاڼې وچیږي. د زراعت د محکمې نه څنګه وړیا مشوره او د کسان کارډ له لارې زرعی دواګانو او سرې باندې رعایت تر لاسه کړو؟',
    analysis: {
      category: 'Agriculture',
      problem_title: 'Wheat Yellow Rust Control & KP Kisan Card Subsidy',
      language: 'ps',
      summary: 'ستاسو په غنمو د ژیړې کنګي (Yellow Rust) حمله شوې ده چې د پښتونخوا د زراعت ریاست له لارې د کسان کارډ لاندې په فنجي وژونکو دواګانو (Fungicide) او سرې باندې ۳۰ تر ۴۰ سلنه رسمي سبسډي ورکول کیږي.',
      urgency: 'Urgent',
      department: 'Directorate General Agriculture Extension KP (زراعت ریاست خیبر پښتونخوا)',
      possible_reasons: [
        'د ژمي د بارانونو او مرطوبې هوا له وجې د ژیړې کنګي د سپورونو (Spores) خپریدل',
        'د کروندګر د کسان کارډ بایومیټریک تجدید نه کیدل',
        'غیر تصدیق شوي تخم کارول چې د ناروغیو مقاومت نه لري'
      ],
      recommended_steps: [
        {
          stepNumber: 1,
          title: 'د فصل د ناروغۍ نمونې عکس او د زراعت افسر ته ښودل',
          description: 'د اغیزمنو پاڼو عکسونه واخلئ او د خپلې تحصیل د زراعت ایکسٹینشن (Agriculture Extension) دفتر ته مراجعه وکړئ.',
          departmentOffice: 'د تحصیل زراعت دفتر (سوات / مردان)',
          estimatedDays: 'فوري (همدغه ورځ)',
        },
        {
          stepNumber: 2,
          title: 'د فنګس ضد سمدستي سپری (Fungicide)',
          description: 'د کرنې د متخصص په لارښوونه پروپيکونازول (Propiconazole) یا ټیبوکونازول د هوا په ارام وخت کې سمدستي سپری کړئ.',
          estimatedDays: '۲۴ ساعتونو کې',
        },
        {
          stepNumber: 3,
          title: 'د کسان کارډ د سبسډي فعالول',
          description: 'که کسان کارډ نه لرئ، د ځمکې فرد او پټوار تصدیق سره د HBL بایومیټریک ریټیلر یا د کرنې دفتر ته لاړ شئ.',
          departmentOffice: 'HBL Konnect / د کرنې دفتر',
          estimatedDays: '۲ تر ۳ ورځې',
        },
        {
          stepNumber: 4,
          title: 'په رعایت نرخ د سرې او ادویه ترلاسه کول',
          description: 'د کسان کارډ له لارې په مجاز ډیلرانو باندې خپل او ټي پي (OTP) ورکړئ او رسمي سبسډي واخلئ.',
          estimatedDays: 'په فوري توګه',
        }
      ],
      required_documents: [
        'د کروندګر اصل پېژندپاڼه (CNIC)',
        'د ځمکې راجستر فرد یا د کرایې / مزارعت رسمي خط',
        'د پټواري لخوا د فصل د کښت تصدیق نامه',
        'د کسان کارډ شمیره او ثبت شوی ګرځنده موبایل نمبر'
      ],
      application_draft: `خدمت جناب:
محترم ډایرکټر صیب د زراعت ایکسٹینشن ډیپارټمنټ خیبر پښتونخوا، ضلعي دفتر سوات / مردان

موضوع: په غنمو باندې د ژیړې کنګي د کنټرول او کسان کارډ له لارې د سبسیډي د مرستې عریضه

جناب عالي!
په خورا درنښت عرض کوم چې زما پټي په [د کلي یا تحصیل نوم] کې واقع دي. په روان موسم کې زمونږ د غنمو په ولاړ فصل باندې د ژیړې کنګي (Yellow Rust) سخته حمله شوې ده او د پاڼو پوډر فصل ته سخت تاوان رسوي.

د دې لپاره چې عام کښتګر د زیان نه وساتل شي، هیله ده چې د زراعت د ژغورنې یوه رسمي ډله زمونږ سیمې ته ولیږئ ترڅو دوا پاشي او د کسان کارډ په ذریعه د اړتیا وړ فنجي وژونکو درملو او سرې سبسیډي په عاجله توګه منظوره شي.

په درنښت:
د کروندګر نوم: [ستاسو نوم]
د شناختي کارډ نمبر: [شناختي کارډ نمبر]
د موبایل شمیره: [د تلیفون شمیره]
د کلي او ضلعې نوم: [سوات / مردان / خیبر پښتونخوا]`,
      next_action: 'سمدستي د زراعت فیلډ اسسټنټ ته د خپلو غنمو پاڼه وښایئ ترڅو د فصل له تباهۍ مخکې سپری وشي.',
      official_disclaimer: 'د هر ډول کیمیاوي زهرجن درملو د کارولو پر مهال ماسک او دستکشې لازمي دي. د کرنې رسمي لارښوونه تعقیب کړئ.',
      key_contacts: {
        helpline: '091-9224222 / زراعت هیلپ لاین',
        website: 'https://agrikp.gov.pk',
        portalName: 'د خیبر پښتونخوا د زراعت کسان کارډ پورټل'
      }
    }
  }
];
