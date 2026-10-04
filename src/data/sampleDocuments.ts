import { DocumentAnalysisResult } from '../types';

export interface SampleDocumentItem {
  id: string;
  title: string;
  category: string;
  description: string;
  fileName: string;
  analysisResult: DocumentAnalysisResult;
}

export const SAMPLE_DOCUMENTS: SampleDocumentItem[] = [
  {
    id: 'pesco-sample-bill',
    title: 'PESCO Domestic Electricity Bill (August 2026)',
    category: 'Electricity & Utilities',
    description: 'Real utility bill sample with Fuel Price Adjustment (FPA) and sudden tariff slab jump.',
    fileName: 'pesco_bill_aug2026.pdf',
    analysisResult: {
      documentType: 'Electricity Utility Bill (PESCO / DISCO)',
      referenceNumber: '04-26114-0829100 U',
      billingMonthOrDate: 'August 2026',
      unitsOrKeyMetric: '542 Units (Previous: 285 Units)',
      currentAmountOrFee: 'PKR 28,450 (Including Taxes & FPA)',
      dueDateOrDeadline: '18 August 2026',
      issuerDepartment: 'Peshawar Electric Supply Company (PESCO)',
      summary: 'Your bill has increased from PKR 8,200 to PKR 28,450. The primary cause is a 90% increase in units consumed (jumping from 285 units to 542 units), which has eliminated your protected tariff slab benefits and triggered high un-protected unit slabs plus accumulated Fuel Price Adjustments.',
      identifiedIssues: [
        'Slab Threshold Crossed: Consumption of 542 units moved the connection from protected tier (<300 units) to the higher commercial domestic tier.',
        'Fuel Price Adjustment (FPA): Additional surcharge of PKR 4,120 applied for previous power generation fuel differences.',
        'Late Payment Risk: A surcharge of PKR 2,150 will be charged if not paid by 18 August 2026.',
        'TV License & Electricity Duty: Standard mandatory government levies included.'
      ],
      difficultTermsExplained: [
        {
          term: 'Fuel Price Adjustment (FPA)',
          explanation: 'A monthly variable surcharge approved by NEPRA that accounts for differences in fuel prices used in national electricity generation.'
        },
        {
          term: 'Protected vs Un-Protected Consumer',
          explanation: 'Consumers who use under 200 or 300 units continuously for 6 months receive subsidized tariff rates. Crossing 300 units strips away this status.'
        },
        {
          term: 'MDI / Sanctioned Load',
          explanation: 'The maximum kilowatt load authorized for your home (e.g. 2kW or 5kW). Exceeding this can lead to penalties.'
        }
      ],
      recommendedNextSteps: [
        'Inspect your meter screen immediately to verify if the actual reading matches the 542 units on this bill.',
        'If the physical meter shows lower units, visit your PESCO sub-division office with photos to request an amended bill before 18 August.',
        'If units are accurate, apply for 2-3 installments at the PESCO Revenue Office to prevent disconnection.'
      ],
      isVerifiedAuthenticCheck: 'Valid official 14-digit PESCO consumer reference format detected.'
    }
  },
  {
    id: 'kppsc-job-ad-sample',
    title: 'KPPSC Recruitment Advertisement Notice (PMS / Tehsildar)',
    category: 'Jobs & Career',
    description: 'Official provincial public service commission eligibility, zonal quota and age criteria notice.',
    fileName: 'kppsc_advt_04_2026.pdf',
    analysisResult: {
      documentType: 'Public Service Recruitment Notification (KPPSC)',
      referenceNumber: 'Advertisement No. 04/2026 - KPPSC',
      billingMonthOrDate: 'Closing Date: 25 September 2026',
      unitsOrKeyMetric: 'Total Posts: 48 (Zonal Quotas Allocated)',
      currentAmountOrFee: 'Challan Fee: PKR 1,500 via EasyPaisa / JazzCash / Bank',
      dueDateOrDeadline: '25 September 2026 (5:00 PM)',
      issuerDepartment: 'Khyber Pakhtunkhwa Public Service Commission',
      summary: 'Official advertisement for competitive provincial recruitment. Requires second-class Bachelor degree from a recognized HEC university and permanent domicile in Khyber Pakhtunkhwa. Candidates must strictly apply under their verified domicile zone.',
      identifiedIssues: [
        'Strict Domicile Condition: Domicile must have been issued on or before the closing date. Late-issued domiciles will result in rejection.',
        'Age Limit & Relaxations: General age limit is 21 to 30 years, with 3-year relaxation for government employees and backward areas.',
        'Fee Verification: Online challan slip must carry a valid transaction ID before final form submission.'
      ],
      difficultTermsExplained: [
        {
          term: 'Zonal Allocation (Zones 1-5)',
          explanation: 'Khyber Pakhtunkhwa allocates civil service posts across five administrative geographic zones to ensure equitable representation across all districts.'
        },
        {
          term: 'Domicile vs PRC',
          explanation: 'Domicile proves permanent regional belonging; PRC (Permanent Residence Certificate) is verified by the local district administration.'
        }
      ],
      recommendedNextSteps: [
        'Verify your CNIC and Domicile district in your KPPSC profile before clicking submit.',
        'Pay the PKR 1,500 challan via the official 1Bill / EasyPaisa portal and keep the transaction SMS saved.',
        'Print the online confirmation receipt immediately after submission.'
      ],
      isVerifiedAuthenticCheck: 'Official KPPSC notice format matching provincial gazette rules.'
    }
  },
  {
    id: 'bise-sanad-sample',
    title: 'BISE Secondary School Certificate Verification Notice',
    category: 'Education',
    description: 'Educational board verification slip with serial number and seal instructions.',
    fileName: 'bise_verification_slip.pdf',
    analysisResult: {
      documentType: 'Educational Board Verification Slip (BISE)',
      referenceNumber: 'BISE-VER-2026-9941',
      billingMonthOrDate: 'Issued: July 2026',
      unitsOrKeyMetric: 'Passing Year: 2024 / SSC Science Group',
      currentAmountOrFee: 'Verification Fee: PKR 1,200',
      dueDateOrDeadline: 'Valid for submission to HEC / IBCC',
      issuerDepartment: 'Board of Intermediate and Secondary Education (BISE) Peshawar',
      summary: 'Certificate verification document confirming the authenticity of candidate secondary school credentials. Required for subsequent IBCC equivalence and university admissions.',
      identifiedIssues: [
        'Sealed Envelope Integrity: The envelope must remain strictly unopened if destined for HEC or foreign embassies.',
        'QR Code Validation: Ensure the embossed QR verification code scans accurately to the bisep.edu.pk database.'
      ],
      difficultTermsExplained: [
        {
          term: 'IBCC Attestation',
          explanation: 'Inter Board Coordination Commission validates board certificates across all Pakistani provinces.'
        },
        {
          term: 'Sanad vs DMC',
          explanation: 'DMC is the Detailed Marks Certificate (grades); Sanad is the official final diploma/degree parchment issued after graduation.'
        }
      ],
      recommendedNextSteps: [
        'Do not break the official board seal on the envelope.',
        'Proceed with IBCC attestation if applying for foreign visa or HEC degree equivalency.'
      ],
      isVerifiedAuthenticCheck: 'Official BISE embossed stamp and serial verification code present.'
    }
  }
];
