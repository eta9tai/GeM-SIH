import { ProcurementOfficer, BidderAccount } from '../types';

export const MOCK_PROCUREMENT_OFFICERS: ProcurementOfficer[] = [
  {
    id: 'off-fresher-tanvi',
    fakeName: 'Tanvi S. Kulkarni',
    age: 29,
    designation: 'Assistant Procurement Officer (Technical Scrutiny Desk)',
    designationHindi: 'सहायक खरीद अधिकारी (तकनीकी जांच डेस्क)',
    employeeCode: 'DAE-POWAI-2026-F09',
    department: 'Department of Atomic Energy & Allied Research Units',
    organization: 'Directorate of Purchase and Stores (DPS) / BARC-IIT Powai Liaison',
    accountType: 'fresher',
    systemPin: '400076',
    blockchainAddress: '0x71ba920f12d8a4190cbb1156d98214fa3901bcae',
    idBadgeUploaded: true,
    idBadgeType: 'NIC Gov e-Sign Digital Smart Card (Issued Aug 2026)',
    jurisdiction: {
      state: 'Maharashtra',
      city: 'Mumbai Suburban',
      circleOrZone: 'Powai & Trombay Circle (Mumbai-East)',
      department: 'Department of Atomic Energy',
      allowedCategories: ['Goods', 'Services'],
      pincodes: [400076, 400085, 400072],
      jurisdictionCode: 'MH-MUM-SUB-POWAI-04'
    },
    bioNotes: 'Newly onboarded to the GeM 5.0 unified AI & blockchain interface. Holds 4 years of prior manual paper-based tender evaluations in zonal laboratories before digital migration.',
    hasIngestedLegacyProfile: false,
    efficiencyMetrics: {
      manualCycleDays: 46.5,
      projectedAiCycleDays: 3.8,
      manualRepetitionHoursPerTender: 54.0,
      projectedAiHoursPerTender: 1.4,
      cagAuditRiskScore: 14.8, // 14.8% past paper discrepancy risk
      projectedCagRiskScore: 0.2, // 0.2% on blockchain
      totalLifetimeTendersApproved: 19,
      estimatedAdministrativeCostSavedLakhs: 21.4,
      verificationAccuracyPct: 83.2,
      projectedAccuracyPct: 99.8
    },
    legacyRecords: [
      {
        id: 'leg-tnd-01',
        tenderRef: 'DAE/POWAI/MED/2024/09',
        title: 'Procurement of Benchtop Refrigerated Laboratory Centrifuges & Rotors',
        dateProcessed: '14 Nov 2024 (Physical File Memo)',
        department: 'Department of Atomic Energy',
        valueLakhs: 14.2,
        biddersCount: 4,
        biddersList: [
          {
            name: 'Sahyadri Scientific Instruments & Bio-Tech Labs',
            status: 'Accepted',
            reason: 'L1 Bidder, physically certified ISO 13485 paper copies, verified with bank manager via dispatch letter.',
            manualChecksDone: [
              'Manual physical verification of Sales Tax NOC at Chembur VAT Office',
              'Paper Bank Guarantee letter dispatched via Speed Post to SBI Powai Branch',
              'Physical sample inspection report signed by 3 laboratory officers'
            ]
          },
          {
            name: 'Kalyani Analytical Devices LLP',
            status: 'Rejected',
            reason: 'Turnover paper certificate lacked UDIN stamp from Chartered Accountant.',
            manualChecksDone: ['Physical cross-examination of balance sheet notarized copies']
          },
          {
            name: 'Apex Lab Systems Pvt. Ltd.',
            status: 'Rejected',
            reason: 'Quoted L2 rate; tender awarded on lowest evaluated conforming bid.',
            manualChecksDone: ['Manual comparison register (Form CPWD-6) drafting']
          },
          {
            name: 'Western Bio-Equipments',
            status: 'Rejected',
            reason: 'Failed physical rotor balancing inspection test on manual test bench.',
            manualChecksDone: ['Laboratory bench physical trial']
          }
        ],
        winningBidder: 'Sahyadri Scientific Instruments & Bio-Tech Labs',
        manualRepetitionsIdentified: [
          'Manual drafting of Comparative Statements (CS) taking 11 working days',
          'Inter-departmental physical file movement between Powai and Trombay Head Office',
          'Manual bank guarantee authenticity verification delayed by 18 days awaiting postal reply',
          'Physical xerox copies of 84 pages filed in triplicate hard-bound files'
        ],
        processingDays: 48,
        cagAuditQueriesCount: 2,
        cagAuditRemarks: 'Audit Para #14/2024: Delay of 19 days in EMD refund to non-awarded bidders due to physical cheque clearing bottlenecks.'
      },
      {
        id: 'leg-tnd-02',
        tenderRef: 'DAE/IIT-P/CIVIL/2025/03',
        title: 'Annual Rate Contract for Clean Room HVAC Filter Replacement & HEPA Certification',
        dateProcessed: '22 Feb 2025 (Physical File Memo)',
        department: 'Department of Atomic Energy',
        valueLakhs: 28.5,
        biddersCount: 5,
        biddersList: [
          {
            name: 'Deccan Cleanroom Air Systems Pvt. Ltd.',
            status: 'Accepted',
            reason: 'L1 compliant bid; validated through physical factory visit and test certificate scrutiny.',
            manualChecksDone: [
              'Manual verification of EPFO ECR paper challans for 36 technicians',
              'Manual verification of EMD demand draft at treasury desk'
            ]
          },
          {
            name: 'Konkan Air Filter Solutions',
            status: 'Rejected',
            reason: 'Submitted paper affidavit on outdated stamp paper (₹20 instead of mandatory ₹100 as per Maharashtra Stamp Act).',
            manualChecksDone: ['Physical stamp paper verification']
          },
          {
            name: 'Pragati Engineering Works',
            status: 'Rejected',
            reason: 'L2 rate quoted on paper envelope opening.',
            manualChecksDone: ['Manual rate tabulation register']
          }
        ],
        winningBidder: 'Deccan Cleanroom Air Systems Pvt. Ltd.',
        manualRepetitionsIdentified: [
          'Manual calculations of GST rate differentials on labor vs material components',
          'Physical collection of 14 paper certificates from local municipal corporation',
          'Manual re-typing of vendor details into central ledger'
        ],
        processingDays: 52,
        cagAuditQueriesCount: 1,
        cagAuditRemarks: 'Audit Observation: Absence of digital timestamp on envelope receipt register resulting in supplier grievance.'
      },
      {
        id: 'leg-tnd-03',
        tenderRef: 'DAE/POWAI/ELEC/2025/11',
        title: 'Supply and Laying of Armoured 11kV Underground Power Feeder Cables',
        dateProcessed: '18 Jul 2025 (Physical File Memo)',
        department: 'Department of Atomic Energy',
        valueLakhs: 41.0,
        biddersCount: 3,
        biddersList: [
          {
            name: 'Maratha Heavy Electricals & Cables Ltd.',
            status: 'Accepted',
            reason: 'OEM test certificate physically counter-signed by CPRI (Central Power Research Institute).',
            manualChecksDone: ['Physical CPRI test report stamp verification']
          },
          {
            name: 'Vidyut Cables Corp',
            status: 'Rejected',
            reason: 'Physical insurance policy cover note expired during bid evaluation period.',
            manualChecksDone: ['Paper insurance document check']
          }
        ],
        winningBidder: 'Maratha Heavy Electricals & Cables Ltd.',
        manualRepetitionsIdentified: [
          'Manual physical measurement book (MB) reconciliation',
          'Paper-based BG verification causing 23-day wait time'
        ],
        processingDays: 44,
        cagAuditQueriesCount: 0,
        cagAuditRemarks: 'Clean manual audit cleared without adverse audit paras.'
      },
      {
        id: 'leg-tnd-04',
        tenderRef: 'DAE/LAB/SAFETY/2025/19',
        title: 'Radiation Safety Equipment & Thermo-Luminescent Dosimeter (TLD) Badges',
        dateProcessed: '03 Nov 2025 (Physical File Memo)',
        department: 'Department of Atomic Energy',
        valueLakhs: 8.9,
        biddersCount: 3,
        biddersList: [
          {
            name: 'Sahyadri Scientific Instruments & Bio-Tech Labs',
            status: 'Accepted',
            reason: 'AERB (Atomic Energy Regulatory Board) accreditation physically validated with Trombay registry.',
            manualChecksDone: ['Physical AERB certificate serial verification']
          }
        ],
        winningBidder: 'Sahyadri Scientific Instruments & Bio-Tech Labs',
        manualRepetitionsIdentified: [
          'Duplicate filing across 3 paper registers (Inward, Scrutiny, and Sanction memo)',
          'Physical manual calculations of local octroi/cess exemptions'
        ],
        processingDays: 42,
        cagAuditQueriesCount: 1,
        cagAuditRemarks: 'Audit query on delayed delivery penalty calculations done manually.'
      }
    ]
  },
  {
    id: 'off-senior-deshmukh',
    fakeName: 'Prakash R. Deshmukh',
    age: 51,
    designation: 'Executive Engineer & Senior Procurement Officer (Secondary Buyer)',
    designationHindi: 'अधिशासी अभियंता एवं वरिष्ठ खरीद अधिकारी',
    employeeCode: 'DAE-POWAI-1999-EE02',
    department: 'Department of Atomic Energy & Infrastructure Division',
    organization: 'Directorate of Purchase and Stores (DPS) Trombay / Mumbai Zone',
    accountType: 'plc',
    systemPin: '400085',
    blockchainAddress: '0x89e27c11fba82946cde0019245be770192451029',
    idBadgeUploaded: true,
    idBadgeType: 'Government of India Class-3 Digital Signature Token (e-Mudhra / NIC)',
    jurisdiction: {
      state: 'Maharashtra',
      city: 'Mumbai Suburban',
      circleOrZone: 'Powai Circle, Trombay & Vikhroli Hub',
      department: 'Department of Atomic Energy',
      allowedCategories: ['Goods', 'Works', 'Services'],
      pincodes: [400085, 400076, 400079],
      jurisdictionCode: 'MH-MUM-SUB-POWAI-01'
    },
    bioNotes: '24 years of public procurement experience. Fully Prior Ledger Certified (PLC) on GeM with 180+ verified digital tender awards on the cryptographic blockchain registry.',
    hasIngestedLegacyProfile: true,
    efficiencyMetrics: {
      manualCycleDays: 42.0,
      projectedAiCycleDays: 3.2,
      manualRepetitionHoursPerTender: 48.0,
      projectedAiHoursPerTender: 1.1,
      cagAuditRiskScore: 6.2,
      projectedCagRiskScore: 0.05,
      totalLifetimeTendersApproved: 184,
      estimatedAdministrativeCostSavedLakhs: 88.5,
      verificationAccuracyPct: 94.0,
      projectedAccuracyPct: 99.9
    }
  },
  {
    id: 'off-hod-bhatnagar',
    fakeName: 'Rajeshwar M. Bhatnagar',
    age: 56,
    designation: 'Chief Procurement Officer & Directorate Head (Primary Buyer / HoD)',
    designationHindi: 'मुख्य खरीद अधिकारी एवं विभागाध्यक्ष (प्राथमिक खरीदार)',
    employeeCode: 'MOD-IAF-1992-CPO01',
    department: 'Ministry Of Defence',
    organization: 'Indian Air Force Equipment Directorate & 35 Wing Public Fund Account',
    accountType: 'plc',
    systemPin: '110011',
    blockchainAddress: '0x3ca1194825be770192451029384756bcad102938',
    idBadgeUploaded: true,
    idBadgeType: 'Ministry of Defence Cryptographic Nodal Token & Smart Identity Card',
    jurisdiction: {
      state: 'Uttar Pradesh',
      city: 'Kheri',
      circleOrZone: 'Northern & Western Airbase Circles (Kheri & Suratgarh)',
      department: 'Ministry Of Defence',
      allowedCategories: ['Goods', 'Services', 'Works'],
      pincodes: [262701, 335804],
      jurisdictionCode: 'UP-IAF-NORTH-ZONE-01'
    },
    bioNotes: 'Primary User & Head of Department. Highest financial delegation under Rule 149 GFR. Oversees heavy equipment transport and defence machinery contracts.',
    hasIngestedLegacyProfile: true,
    efficiencyMetrics: {
      manualCycleDays: 58.0,
      projectedAiCycleDays: 4.1,
      manualRepetitionHoursPerTender: 62.0,
      projectedAiHoursPerTender: 1.8,
      cagAuditRiskScore: 8.5,
      projectedCagRiskScore: 0.1,
      totalLifetimeTendersApproved: 310,
      estimatedAdministrativeCostSavedLakhs: 142.0,
      verificationAccuracyPct: 96.5,
      projectedAccuracyPct: 99.9
    }
  },
  {
    id: 'off-director-banerjee',
    fakeName: 'Sunita B. Banerjee',
    age: 44,
    designation: 'Joint Director (Procurement & Stores)',
    designationHindi: 'संयुक्त निदेशक (खरीद एवं सामग्री प्रबंधन)',
    employeeCode: 'MOD-ICG-2004-JD11',
    department: 'Ministry Of Defence',
    organization: 'Indian Coast Guard Regional HQ (NE) & Base Workshop',
    accountType: 'plc',
    systemPin: '700027',
    blockchainAddress: '0x19dfa98124567812039ba77123901bcae8841091',
    idBadgeUploaded: true,
    idBadgeType: 'DigiLocker Certified e-Office Identification Card',
    jurisdiction: {
      state: 'West Bengal',
      city: 'Kolkata',
      circleOrZone: 'Eastern Naval & Coast Guard Command (24 Paraganas & Jalpaiguri)',
      department: 'Ministry Of Defence',
      allowedCategories: ['Goods', 'Works'],
      pincodes: [700027, 735101],
      jurisdictionCode: 'WB-KOL-EAST-ZONE-02'
    },
    bioNotes: 'Experienced secondary buyer handling strategic electronics, tactical displays, and naval maintenance contracts with strict DPIIT Class-I local content mandates.',
    hasIngestedLegacyProfile: true,
    efficiencyMetrics: {
      manualCycleDays: 39.0,
      projectedAiCycleDays: 3.0,
      manualRepetitionHoursPerTender: 44.0,
      projectedAiHoursPerTender: 1.2,
      cagAuditRiskScore: 5.1,
      projectedCagRiskScore: 0.08,
      totalLifetimeTendersApproved: 128,
      estimatedAdministrativeCostSavedLakhs: 56.2,
      verificationAccuracyPct: 95.0,
      projectedAccuracyPct: 99.8
    }
  }
];

export const MOCK_BIDDER_ACCOUNTS: BidderAccount[] = [
  {
    id: 'bidder-sahyadri',
    companyName: 'Sahyadri Scientific Instruments & Bio-Tech Labs',
    contactPerson: 'Milind S. Joshi (Managing Director)',
    gstin: '27AAECE1190K1Z2',
    pan: 'AAECE1190K',
    udyamNumber: 'UDYAM-MH-18-0091410',
    location: 'Powai Industrial Area, Mumbai',
    state: 'Maharashtra',
    systemPin: '400076',
    complianceScore: 98,
    activeBidsCount: 2,
    totalWonAmount: 1251060,
    tags: ['MSE', 'MII Class-I', 'ISO 13485 Certified'],
    linkedTenderIds: ['c33be997-8bf0-40bc-a498-de894616d72d'],
    riskLevel: 'Low'
  },
  {
    id: 'bidder-marudhar',
    companyName: 'Marudhar Logistics & Fleet Mobility Pvt. Ltd.',
    contactPerson: 'Sukhdev Singh Bhati (Fleet Director)',
    gstin: '08AAAFS7892K1Z9',
    pan: 'AAAFS7892K',
    udyamNumber: 'UDYAM-RJ-04-0019284',
    location: 'Bikaner Central Depot',
    state: 'Rajasthan',
    systemPin: '334001',
    complianceScore: 98,
    activeBidsCount: 3,
    totalWonAmount: 4200000,
    tags: ['MSE', 'OBC', 'MII Class-I'],
    linkedTenderIds: ['edb53456-5812-464f-a174-9a215dd673d3'],
    riskLevel: 'Low'
  },
  {
    id: 'bidder-vidarbha-disq',
    companyName: 'Vidarbha Supply Chain Solutions Ltd.',
    contactPerson: 'Arun K. Deshpande (Proprietor)',
    gstin: '27AALPA9910C1Z4',
    pan: 'AALPA9910C',
    udyamNumber: 'UDYAM-MH-20-0081249',
    location: 'MIDC Butibori, Nagpur',
    state: 'Maharashtra',
    systemPin: '440001',
    complianceScore: 38,
    activeBidsCount: 1,
    totalWonAmount: 0,
    tags: ['MSE', 'GSTR-3B Notice Pending'],
    linkedTenderIds: ['edb53456-5812-464f-a174-9a215dd673d3'],
    riskLevel: 'High'
  },
  {
    id: 'bidder-himalayan',
    companyName: 'Himalayan Optics & Tactical Electronics',
    contactPerson: 'Bashir Ahmad Lone (Technical Head)',
    gstin: '01AABCF9941G1ZQ',
    pan: 'AABCF9941G',
    udyamNumber: 'UDYAM-JK-05-0004128',
    location: 'Sanat Nagar Electronics Zone, Srinagar',
    state: 'Jammu And Kashmir',
    systemPin: '190001',
    complianceScore: 97,
    activeBidsCount: 1,
    totalWonAmount: 26097099.86,
    tags: ['MSE', 'Defence Qualified', 'MII Class-I'],
    linkedTenderIds: ['973cbbba-1f7f-49f2-9867-0aea090806ce'],
    riskLevel: 'Low'
  },
  {
    id: 'bidder-howrah-gears',
    companyName: 'Howrah Precision Gears & Clutch Works',
    contactPerson: 'Subhasish Majumdar (Partner)',
    gstin: '19AABCR4455E1Z7',
    pan: 'AABCR4455E',
    udyamNumber: 'UDYAM-WB-10-0012948',
    location: 'Baltikuri Industrial Estate, Howrah',
    state: 'West Bengal',
    systemPin: '711101',
    complianceScore: 95,
    activeBidsCount: 2,
    totalWonAmount: 69350,
    tags: ['MSE', 'OEM Certified', 'MII'],
    linkedTenderIds: ['a565e734-5dd9-4c7a-b8a6-297ca41144a6'],
    riskLevel: 'Low'
  },
  {
    id: 'bidder-deccan-cryo',
    companyName: 'Deccan Cryogenics & Petrochem Gases Ltd.',
    contactPerson: 'V. Ramanathan (Executive VP Sales)',
    gstin: '36AABCL8901D1ZF',
    pan: 'AABCL8901D',
    udyamNumber: 'Not Applicable (Large Enterprise)',
    location: 'Balanagar Industrial Area, Hyderabad',
    state: 'Telangana',
    systemPin: '500037',
    complianceScore: 99,
    activeBidsCount: 1,
    totalWonAmount: 99500000,
    tags: ['PESO Certified', 'MII Class-I', 'Large Enterprise'],
    linkedTenderIds: ['d19f4c6b-46fc-478d-adc1-5f99e551fc68'],
    riskLevel: 'Low'
  }
];
