import { BidderDocumentRecord, ComplianceDocCategory } from '../types';

export interface DocumentParameterGroup {
  category: ComplianceDocCategory;
  title: string;
  titleHindi: string;
  description: string;
  iconName: string;
  color: string;
  documents: {
    docCode: string;
    title: string;
    pdfAnnexureRef: string;
    isMandatory: boolean;
    governingAct: string;
    verificationGateway: string;
  }[];
}

export const COMPLIANCE_PARAMETER_GROUPS: DocumentParameterGroup[] = [
  {
    category: 'core_identity',
    title: '1. Core Identity & Business Constitution',
    titleHindi: 'मूल पहचान एवं व्यावसायिक गठन प्रमाण',
    description: 'Mandatory statutory identification, PAN, GST registration, partnership deed/COI, and digital signature authorization.',
    iconName: 'ShieldCheck',
    color: 'border-blue-500 text-blue-700 bg-blue-50',
    documents: [
      {
        docCode: 'DOC-PAN-01',
        title: 'PAN Card (Permanent Account Number)',
        pdfAnnexureRef: 'Annexure-1, Clause 1(1)',
        isMandatory: true,
        governingAct: 'Income Tax Act, 1961 (Section 139A)',
        verificationGateway: 'Income Tax NSDL/Protean Database API'
      },
      {
        docCode: 'DOC-GST-02',
        title: 'GST Registration Certificate (Form GST REG-06)',
        pdfAnnexureRef: 'Annexure-1, Clause 1(2)',
        isMandatory: true,
        governingAct: 'Central Goods and Services Tax Act, 2017',
        verificationGateway: 'GSTN Central API Gateway (GSP Connect)'
      },
      {
        docCode: 'DOC-AADHAAR-03',
        title: 'Aadhaar Verification of Authorized Signatory',
        pdfAnnexureRef: 'Annexure-1, Clause 1(1)',
        isMandatory: true,
        governingAct: 'Aadhaar (Targeted Delivery) Act, 2016',
        verificationGateway: 'UIDAI e-KYC via DigiLocker OTP Protocol'
      },
      {
        docCode: 'DOC-CONSTITUTION-04',
        title: 'Certificate of Incorporation / Registered Partnership Deed / MoA & AoA',
        pdfAnnexureRef: 'Annexure-1, Clause 1(4)',
        isMandatory: true,
        governingAct: 'Companies Act, 2013 / Indian Partnership Act, 1932',
        verificationGateway: 'Ministry of Corporate Affairs (MCA21 API)'
      },
      {
        docCode: 'DOC-POA-05',
        title: 'Power of Attorney & Board Resolution for DSC Authorization',
        pdfAnnexureRef: 'Annexure-1, Clause 1(5)',
        isMandatory: true,
        governingAct: 'Powers of Attorney Act, 1882 & IT Act, 2000',
        verificationGateway: 'National Informatics Centre (NIC) DSC Token Validator'
      }
    ]
  },
  {
    category: 'financial_banking',
    title: '2. Financial Solvency, Banking & Taxes',
    titleHindi: 'वित्तीय सक्षमता, बैंकिंग एवं कर अनुपालन',
    description: 'Direct banking mandates, cancelled cheques, and verified 3-year Income Tax Returns (ITR).',
    iconName: 'CreditCard',
    color: 'border-emerald-500 text-emerald-700 bg-emerald-50',
    documents: [
      {
        docCode: 'DOC-BANK-01',
        title: 'Bank Account Mandate & Cancelled Cheque / Passbook',
        pdfAnnexureRef: 'Annexure-1, Clause 3(5)',
        isMandatory: true,
        governingAct: 'RBI Electronic Clearing Service Regulations & PFMS',
        verificationGateway: 'NPCI / Public Financial Management System (PFMS API)'
      },
      {
        docCode: 'DOC-ITR-02',
        title: 'Income Tax Returns (ITR-V) for Past 3 Financial Years',
        pdfAnnexureRef: 'Annexure-1, Clause 1(1)',
        isMandatory: true,
        governingAct: 'Income Tax Rules, 1962 (Form ITR-V/Ack)',
        verificationGateway: 'CBDT Central Processing Centre (CPC Bengaluru)'
      },
      {
        docCode: 'DOC-TURNOVER-03',
        title: 'Audited Balance Sheets & CA Turnover Certificate with UDIN',
        pdfAnnexureRef: 'Annexure-1, Clause 1(4)',
        isMandatory: true,
        governingAct: 'ICAI UDIN Mandatory Verification Framework',
        verificationGateway: 'ICAI UDIN Portal Direct Verification'
      }
    ]
  },
  {
    category: 'bidding_credentials',
    title: '3. Bidding, MSME & Quality Credentials',
    titleHindi: 'बोली, एमएसएमई एवं गुणवत्ता प्रमाण पत्र',
    description: 'MSME Udyam registration for EMD exemptions, OEM Authorization letter, and ISO/BIS standards.',
    iconName: 'Award',
    color: 'border-purple-500 text-purple-700 bg-purple-50',
    documents: [
      {
        docCode: 'DOC-UDYAM-01',
        title: 'MSME Udyam Registration Certificate',
        pdfAnnexureRef: 'Annexure-1, Pre-Qualification',
        isMandatory: false,
        governingAct: 'Micro, Small and Medium Enterprises Development Act, 2006',
        verificationGateway: 'Udyam Registration Portal (Ministry of MSME API)'
      },
      {
        docCode: 'DOC-OEM-02',
        title: 'OEM Authorization Letter (Manufacturer Authorization Form)',
        pdfAnnexureRef: 'Annexure-1, Clause 1(5)',
        isMandatory: true,
        governingAct: 'General Financial Rules, 2017 (Rule 149)',
        verificationGateway: 'GeM OEM Direct Verification Registry'
      },
      {
        docCode: 'DOC-EXP-03',
        title: 'Past Performance & Completion Certificates',
        pdfAnnexureRef: 'Annexure-1, Clause 1(7)',
        isMandatory: true,
        governingAct: 'Central Public Procurement Portal (CPPP) Performance Records',
        verificationGateway: 'CPPP National Past Performance Repository'
      },
      {
        docCode: 'DOC-ISO-04',
        title: 'Quality Standards Certificate (ISO 9001:2015 / ISO 13485 / BIS Mark)',
        pdfAnnexureRef: 'Annexure-1, Quality Criteria',
        isMandatory: true,
        governingAct: 'Bureau of Indian Standards Act, 2016 / IAF MLA',
        verificationGateway: 'QCI / NABCB National Accreditation Registry'
      }
    ]
  },
  {
    category: 'labor_welfare',
    title: '4. Statutory Labor Laws, Child Labor & Welfare Undertakings',
    titleHindi: 'वैधानिक श्रम कानून, बाल श्रम निषेध एवं कल्याण पत्र',
    description: 'Mandatory statutory declaration for payment strictly according to Labour Laws, Child Labour Prohibition undertaking, PF & ESIC registrations.',
    iconName: 'Users',
    color: 'border-amber-500 text-amber-800 bg-amber-50',
    documents: [
      {
        docCode: 'DOC-PAYMENT-LABOUR-01',
        title: 'Undertaking for Payment Strictly According to Labour Law',
        pdfAnnexureRef: 'Annexure-1, Page 10, Clause 3(3)',
        isMandatory: true,
        governingAct: 'Minimum Wages Act 1948, Payment of Wages Act 1936 & Code on Wages 2019',
        verificationGateway: 'Ministry of Labour & Employment / Shram Suvidha Portal'
      },
      {
        docCode: 'DOC-CHILD-LABOUR-02',
        title: 'Undertaking for Non-Engagement of Child Labor',
        pdfAnnexureRef: 'Annexure-1, Page 10, Clause 3(2)',
        isMandatory: true,
        governingAct: 'Child and Adolescent Labour (Prohibition and Regulation) Act, 1986',
        verificationGateway: 'PENCIL Portal (Child Labour Division, MoLE)'
      },
      {
        docCode: 'DOC-EPFO-03',
        title: 'PF (EPFO) Registration Certificate & Monthly ECR Filing Slip',
        pdfAnnexureRef: 'Annexure-1, Page 9, Clause 1(3)',
        isMandatory: true,
        governingAct: 'Employees Provident Funds & Misc. Provisions Act, 1952',
        verificationGateway: 'EPFO Electronic Challan cum Return (ECR) Gateway'
      },
      {
        docCode: 'DOC-ESIC-04',
        title: 'ESIC Registration Certificate & Contribution Undertaking',
        pdfAnnexureRef: 'Annexure-1, Page 10, Clause 3(3)',
        isMandatory: true,
        governingAct: 'Employees State Insurance Act, 1948',
        verificationGateway: 'ESIC Panchdeep Employer Portal'
      },
      {
        docCode: 'DOC-SAFETY-05',
        title: 'Industrial Safety & Occupational Health Declaration',
        pdfAnnexureRef: 'Annexure-1, Page 10, Clause 3(1)',
        isMandatory: true,
        governingAct: 'Factories Act, 1948 & Directorate General Factory Advice Service (DGFASLI)',
        verificationGateway: 'State Directorate of Industrial Safety and Health (DISH)'
      },
      {
        docCode: 'DOC-ECS-CONSENT-06',
        title: 'Format for Consent Letter for Payment through Electronic Mode',
        pdfAnnexureRef: 'Annexure-1, Page 10, Clause 3(5)',
        isMandatory: true,
        governingAct: 'Government of India e-Payment Direct Benefit Transfer Rules',
        verificationGateway: 'RBI RTGS/NEFT & GeM Electronic Settlement Engine'
      }
    ]
  },
  {
    category: 'integrity_declarations',
    title: '5. Integrity, Non-Tampering & Rate Declarations',
    titleHindi: 'सत्यनिष्ठा, गैर-छेड़छाड़ एवं दर घोषणाएं',
    description: 'Holiday listing clearance declaration, Non-tampering undertaking, Declarations A, B, C & D, Lowest rate undertaking, and Terms acceptance.',
    iconName: 'FileCheck2',
    color: 'border-rose-500 text-rose-800 bg-rose-50',
    documents: [
      {
        docCode: 'DOC-HOLIDAY-01',
        title: 'Undertakings and Declarations for "Holiday Listing" (Debarment Clearance)',
        pdfAnnexureRef: 'Annexure-1, Page 9, Clause 1(6)',
        isMandatory: true,
        governingAct: 'Public Procurement (Preference to Make in India) & CPPP Holiday Guidelines',
        verificationGateway: 'CPPP Central Holiday & Blacklist Screening Engine'
      },
      {
        docCode: 'DOC-NONTAMPER-02',
        title: 'Undertakings and Declarations for Non-Tampering of Bid Documents',
        pdfAnnexureRef: 'Annexure-1, Page 10, Clause 2(1)',
        isMandatory: true,
        governingAct: 'Indian Penal Code 1860 (Forgery) & IT Act 2000 Section 65B',
        verificationGateway: 'GeM Cryptographic PDF Hash Comparison Engine'
      },
      {
        docCode: 'DOC-DECL-ABCD-03',
        title: 'Undertakings and Declarations "A, B, C, & D" (Border Country & Integrity)',
        pdfAnnexureRef: 'Annexure-1, Page 10, Clause 2(2)',
        isMandatory: true,
        governingAct: 'General Financial Rules 2017 Rule 144(xi) & Central Vigilance Commission',
        verificationGateway: 'Ministry of External Affairs / MHA Land Border Verification API'
      },
      {
        docCode: 'DOC-LOWEST-RATE-04',
        title: 'Undertaking on Self-Declaration on Submission of Lowest Rate (L1)',
        pdfAnnexureRef: 'Annexure-1, Page 9, Clause 1(8)',
        isMandatory: true,
        governingAct: 'Competition Act, 2002 & Public Procurement Pricing Principles',
        verificationGateway: 'GeM Historic Price Comparison & Business Intelligence'
      },
      {
        docCode: 'DOC-ACCEPT-TC-05',
        title: 'Undertaking & Acceptance of Tender Terms and Conditions',
        pdfAnnexureRef: 'Annexure-1, Page 9, Clause 1(7)',
        isMandatory: true,
        governingAct: 'Indian Contract Act, 1872',
        verificationGateway: 'GeM Electronic Acceptance Ledger'
      }
    ]
  }
];

// Generates complete 23-document package per bidder with controlled variances (1%-5% normal, >40% for anomalies)
export function generateBidderComplianceDocuments(
  bidderId: string,
  companyName: string,
  location: string,
  isAnomalyBidder: boolean = false
): BidderDocumentRecord[] {
  const records: BidderDocumentRecord[] = [];

  // Deterministic seed for reproducible mock data
  let seed = 0;
  for (let i = 0; i < bidderId.length; i++) {
    seed += bidderId.charCodeAt(i);
  }

  COMPLIANCE_PARAMETER_GROUPS.forEach(group => {
    group.documents.forEach((doc, idx) => {
      const docSeed = (seed + idx * 17) % 100;
      
      // Determine if this specific document has an anomaly
      // If the bidder is marked as anomaly (e.g. Vidarbha Supply Chain Solutions), give 2-3 specific critical anomalies > 40%
      let isDocAnomaly = false;
      let variance = 0;
      let anomalyDesc = '';
      let anomalySeverity: 'none' | 'low' | 'critical' = 'none';
      let status: BidderDocumentRecord['submissionStatus'] = 'Verified';

      if (isAnomalyBidder && (doc.docCode === 'DOC-PAYMENT-LABOUR-01' || doc.docCode === 'DOC-CHILD-LABOUR-02' || doc.docCode === 'DOC-HOLIDAY-01' || doc.docCode === 'DOC-GST-02')) {
        isDocAnomaly = true;
        anomalySeverity = 'critical';
        status = 'Anomaly_Detected';

        if (doc.docCode === 'DOC-CHILD-LABOUR-02') {
          variance = 48.6; // >40% anomaly!
          anomalyDesc = 'CRITICAL ANOMALY: Mandatory statutory declaration clauses under Section 14 of Child & Adolescent Labour Act 1986 are omitted in the uploaded letter; replaced with unverified informal text.';
        } else if (doc.docCode === 'DOC-PAYMENT-LABOUR-01') {
          variance = 54.2; // >40% anomaly!
          anomalyDesc = 'CRITICAL ANOMALY: Minimum Wages schedule missing statutory dearness allowance (VDA) escalation commitment; wage matrix contradicts state gazette rates.';
        } else if (doc.docCode === 'DOC-HOLIDAY-01') {
          variance = 62.8; // >40% anomaly!
          anomalyDesc = 'CRITICAL ANOMALY: Match identified on CPPP Holiday Listing registry (Active suspension from Maharashtra State Warehousing Corp).';
        } else if (doc.docCode === 'DOC-GST-02') {
          variance = 44.5; // >40% anomaly!
          anomalyDesc = 'ANOMALY DETECTED: GSTR-3B return default flag active for 4 consecutive tax periods with tax liability mismatch.';
        }
      } else {
        // Normal document: variance ranges strictly between 1.0% and 4.9%
        const normalized = 1.0 + ((docSeed % 40) / 10.0); // e.g. 1.0% to 4.9%
        variance = parseFloat(normalized.toFixed(2));
        status = 'Verified';
      }

      const sampleLetter = generateRealisticSampleLetter(doc.docCode, doc.title, companyName, location, isDocAnomaly, variance);

      const blockNum = 10420 + (idx * 3);
      const hexHash = `0x${((seed * 31 + idx * 97) % 0xffffffff).toString(16).padStart(8, '0')}${((seed * 13) % 0xffff).toString(16).padStart(4, '0')}`;

      records.push({
        id: `${bidderId}-${doc.docCode}`,
        docCode: doc.docCode,
        title: doc.title,
        category: group.category,
        pdfAnnexureRef: doc.pdfAnnexureRef,
        isMandatory: doc.isMandatory,
        submissionStatus: status,
        variancePercentage: variance,
        isAnomaly: isDocAnomaly,
        anomalySeverity: anomalySeverity,
        anomalyDescription: anomalyDesc,
        blockchainHash: `${hexHash}4b89a29d10294fcde88124567812039ba77123901bcae8841091`,
        ipfsCid: `QmX${((seed * 47) % 100000000).toString(16)}b78e914825be770192451029384756bcad`,
        timestamp: '2026-08-20 14:22:18 IST',
        verificationGateway: doc.verificationGateway,
        sampleLetter: sampleLetter
      });
    });
  });

  return records;
}

function generateRealisticSampleLetter(
  docCode: string,
  title: string,
  companyName: string,
  location: string,
  isAnomaly: boolean,
  variance: number
) {
  if (docCode === 'DOC-CHILD-LABOUR-02') {
    return {
      title: 'UNDERTAKING FOR NON-ENGAGEMENT OF CHILD LABOUR',
      authorityOrAct: 'Under the Child and Adolescent Labour (Prohibition and Regulation) Act, 1986 & GeM Standard Conditions of Contract',
      letterBody: `TO WHOMSOEVER IT MAY CONCERN / THE COMPETENT TENDER AUTHORITY:

1. We, M/s ${companyName}, having our registered office situated at ${location}, hereby solemnly declare, affirm and undertake that:
   a) We strictly adhere to and comply with the provisions of the Child and Adolescent Labour (Prohibition and Regulation) Act, 1986, including all subsequent amendments thereto.
   b) No person below the age of fourteen (14) years, and no adolescent between 14 to 18 years, has been or shall be engaged, employed or permitted to work in any hazardous occupations, operations, or process connected with this contract or at any premises, factory, depot or supply chain logistics site belonging to us.
   c) In the event of this tender being awarded to us, we shall ensure that all sub-contractors, suppliers, logistics handlers, and ancillary service providers strictly comply with this zero-tolerance mandate.

2. We fully understand that any violation, discrepancy, or adverse report in this regard will result in immediate termination of the contract, forfeiture of the Earnest Money Deposit / Performance Security, and disqualification/blacklisting from GeM and CPPP under Rule 151 of GFR 2017.

3. This undertaking is signed and sealed under the official authority of our Board of Directors / Authorized Signatory with valid Digital Signature Certificate.`,
      signatory: 'Authorized Signatory & Chief Compliance Officer',
      designation: 'Managing Director / Authorized Representative',
      stampVerified: !isAnomaly,
      place: location,
      date: '18 August 2026',
      keyClauses: [
        'Zero-tolerance policy against child and adolescent labor in compliance with MoLE guidelines',
        'Section 14 statutory criminal liability indemnification',
        'Direct inspection consent granted to Central/State Labor Enforcement Officers',
        `Cryptographic digital signature verified with 0x48a... (Variance: ${variance}%)`
      ]
    };
  }

  if (docCode === 'DOC-PAYMENT-LABOUR-01') {
    return {
      title: 'UNDERTAKING FOR PAYMENT STRICTLY ACCORDING TO LABOUR LAWS',
      authorityOrAct: 'Under the Minimum Wages Act 1948, Payment of Wages Act 1936, Contract Labour (R&A) Act 1970 & Code on Wages 2019',
      letterBody: `TO THE TENDER INVITING AUTHORITY:

SUBJECT: COMPREHENSIVE STATUTORY DECLARATION ON LABOUR WAGE COMPLIANCE

We, M/s ${companyName}, hereby solemnly submit and certify that:
1. All workers, personnel, technicians, drivers, and supervisory staff engaged or to be deployed for the execution of the services/goods under this GeM Bid shall be paid wages strictly at or above the statutory Minimum Rates of Wages notified by the Central Government / Chief Labour Commissioner (Central) or the respective State Government Gazette, whichever is higher.
2. All statutory components including Basic Wage, Variable Dearness Allowance (VDA), Provident Fund (EPFO @ 12%), Employees State Insurance (ESIC @ 3.25%), Statutory Bonus (under Payment of Bonus Act, 1965), and Gratuity will be deposited through direct Electronic Fund Transfer (NEFT/RTGS) directly into the verified bank accounts of the deployed employees on or before the 7th of every calendar month.
3. No unauthorized deductions or administrative cuts of any nature shall be made from the wage disbursements of the workforce.
4. We maintain all statutory registers (Form A, B, C, D registers of wages, muster rolls, overtime, fines) in full readiness for inspection by the Departmental Labour Welfare Officer and Auditor General.`,
      signatory: 'Head of Human Resources & Statutory Compliances',
      designation: 'Director / Authorized Signatory',
      stampVerified: !isAnomaly,
      place: location,
      date: '19 August 2026',
      keyClauses: [
        'Payment strictly on or before 7th of every month via direct bank transfer (DBT)',
        'Mandatory monthly EPFO ECR challans and ESIC contribution returns linked with GeM billing',
        'Compliance with Equal Remuneration Act 1976 and Maternity Benefit Act',
        `Variance measured against National Model Labor Format: ${variance}%`
      ]
    };
  }

  if (docCode === 'DOC-HOLIDAY-01') {
    return {
      title: 'UNDERTAKING AND DECLARATION FOR "HOLIDAY LISTING" & DEBARMENT',
      authorityOrAct: 'As per CPPP / GeM Guidelines for Banning of Business Dealings & Rule 151 GFR 2017',
      letterBody: `TO THE BUYING ENTITY & GeM NODAL DESK:

We hereby declare that:
1. M/s ${companyName} and our Directors, Partners, Proprietors, or Key Management Personnel are NOT currently placed on any "Holiday Listing", Banning List, Suspension List, or Debarred Register by any Central Ministry, State Government Department, Public Sector Undertaking (PSU), Autonomous Body, or Municipal Authority across India as on the date of submission of this bid.
2. No inquiry, investigation, or vigilance proceeding for fraudulent practices, cartelization, or professional misconduct is pending or concluded with adverse findings against our enterprise.
3. If this declaration is found false, misleading, or suppressed at any stage, the authority shall have the absolute right to cancel the bid/contract and initiate criminal proceedings under the Indian Penal Code.`,
      signatory: 'Authorized Corporate Signatory',
      designation: 'General Counsel & Company Secretary',
      stampVerified: !isAnomaly,
      place: location,
      date: '17 August 2026',
      keyClauses: [
        'Clean record across all 82 Central Public Sector Enterprises (CPSEs)',
        'No active ban or disciplinary suspension in CPPP database',
        'Self-indemnification against collusive bidding or cartel behavior',
        `Cryptographic cross-reference with CPPP API: ${variance}% variance`
      ]
    };
  }

  if (docCode === 'DOC-NONTAMPER-02') {
    return {
      title: 'UNDERTAKING AND DECLARATION FOR NON-TAMPERING OF TENDER DOCUMENTS',
      authorityOrAct: 'Annexure-1, Clause 2(1) & Information Technology Act, 2000',
      letterBody: `TO WHOM IT MAY CONCERN:

We hereby confirm and certify that:
1. The tender documents downloaded by us from the Government e-Marketplace (GeM) portal have not been modified, altered, amended, tempered or deleted in any form or manner.
2. In case any discrepancy, alteration, or tampering is detected between the original tender document published on GeM and the bid submitted by us, the original published version of the tender shall prevail and our bid shall be liable for immediate rejection without notice.
3. The cryptographic checksum (SHA-256) of each file uploaded matches our local pre-upload digital signature certificate register.`,
      signatory: 'Chief Information & Compliance Officer',
      designation: 'Authorized Signatory',
      stampVerified: !isAnomaly,
      place: location,
      date: '19 August 2026',
      keyClauses: [
        'SHA-256 Bit-level file hash consistency verified',
        'Original GeM terms and conditions untampered',
        'Class-3 Digital Signature Certificate timestamp valid'
      ]
    };
  }

  // Generic fallback for other documents
  return {
    title: `STATUTORY DOCUMENT SUBMISSION - ${title.toUpperCase()}`,
    authorityOrAct: `Submitted in compliance with GeM Portal Terms & ${docCode}`,
    letterBody: `TO THE TENDER EVALUATION COMMITTEE:

We, M/s ${companyName}, hereby submit the official certified document: "${title}" in accordance with the pre-qualification and technical requirements of the tender.

We certify under the seal of our organization that all particulars, numbers, certificates, and dates contained in this document are authentic, verifiable from official government repositories, and in full force and effect as of today.`,
    signatory: 'Authorized Signatory',
    designation: 'Partner / Director / Proprietor',
    stampVerified: !isAnomaly,
    place: location,
    date: '18 August 2026',
    keyClauses: [
      'Document authenticated via digital signature',
      `Variance calculated: ${variance}%`,
      'Ready for automated API handshake verification'
    ]
  };
}
