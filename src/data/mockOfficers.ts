import { ProcurementOfficer, BidderAccount } from '../types';

export const MOCK_PROCUREMENT_OFFICERS: ProcurementOfficer[] = [
  {
    id: 'off-fresher-tanvi',
    fakeName: 'Tanvi S. Kulkarni',
    age: 27,
    designation: 'Assistant Procurement Officer (Fresher)',
    designationHindi: 'सहायक खरीद अधिकारी (नवागंतुक / फ्रेशर)',
    employeeCode: 'DAE-POWAI-2026-F09',
    department: 'Department of Atomic Energy & Central Stores',
    organization: 'Directorate of Purchase and Stores (DPS) / BARC-IIT Powai Liaison',
    accountType: 'fresher',
    systemPin: '4076',
    blockchainAddress: '0x71ba920f12d8a4190cbb1156d98214fa3901bcae',
    idBadgeUploaded: true,
    idBadgeType: 'NIC Gov e-Sign Digital Smart Card (Issued Aug 2026)',
    jurisdiction: {
      state: 'Maharashtra',
      city: 'Mumbai Suburban',
      circleOrZone: 'Powai & Trombay Hub, Mumbai Suburban',
      department: 'Department of Atomic Energy',
      allowedCategories: ['Goods', 'Services'],
      pincodes: [400076, 400085, 400072],
      jurisdictionCode: 'MH-MUM-SUB-POWAI-400076'
    },
    bioNotes: 'Newly onboarded to the GeM 5.0 unified AI & blockchain interface. Holds prior physical legacy register records requiring dossier ingestion.',
    hasIngestedLegacyProfile: false,
    efficiencyMetrics: {
      manualCycleDays: 38.5,
      projectedAiCycleDays: 2.4,
      manualRepetitionHoursPerTender: 54.0,
      projectedAiHoursPerTender: 1.4,
      cagAuditRiskScore: 82.0, // High manual CAG audit risk
      projectedCagRiskScore: 6.0, // Reduced to 6/100
      totalLifetimeTendersApproved: 19,
      estimatedAdministrativeCostSavedLakhs: 40.7,
      verificationAccuracyPct: 68.0,
      projectedAccuracyPct: 99.4
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
      }
    ]
  },
  {
    id: 'off-senior-deshmukh',
    fakeName: 'Prakash R. Deshmukh',
    age: 49,
    designation: 'Executive Engineer & Senior Buyer (PLC Certified)',
    designationHindi: 'अधिशासी अभियंता एवं वरिष्ठ खरीद अधिकारी (पीएलसी प्रमाणित)',
    employeeCode: 'CPWD-DAE-1998-EE02',
    department: 'CPWD & DAE Western Division',
    organization: 'CPWD & DAE Western Division, Mumbai Suburban & Powai Circle',
    accountType: 'plc',
    systemPin: '4076',
    blockchainAddress: '0x89e27c11fba82946cde0019245be770192451029',
    idBadgeUploaded: true,
    idBadgeType: 'Government of India Class-3 Digital Signature Token (e-Mudhra / NIC)',
    jurisdiction: {
      state: 'Maharashtra',
      city: 'Mumbai Suburban',
      circleOrZone: 'Mumbai Suburban & Powai Circle',
      department: 'Department of Atomic Energy',
      allowedCategories: ['Goods', 'Works', 'Services'],
      pincodes: [400076, 400085, 400072],
      jurisdictionCode: 'MH-MUM-SUB-POWAI-400076'
    },
    bioNotes: '24 years of public procurement experience. Fully Prior Ledger Certified (PLC) on GeM with 180+ verified digital tender awards on the cryptographic blockchain registry.',
    hasIngestedLegacyProfile: true,
    efficiencyMetrics: {
      manualCycleDays: 38.5,
      projectedAiCycleDays: 2.4,
      manualRepetitionHoursPerTender: 48.0,
      projectedAiHoursPerTender: 1.1,
      cagAuditRiskScore: 82.0,
      projectedCagRiskScore: 6.0,
      totalLifetimeTendersApproved: 184,
      estimatedAdministrativeCostSavedLakhs: 88.5,
      verificationAccuracyPct: 68.0,
      projectedAccuracyPct: 99.4
    }
  },
  {
    id: 'off-bajwa',
    fakeName: 'Col. Vikramjit S. Bajwa',
    age: 52,
    designation: 'Director of Procurement (PLC Certified)',
    designationHindi: 'निदेशक (खरीद एवं आपूर्ति) - पीएलसी प्रमाणित',
    employeeCode: 'MOD-ARMY-1996-DIR01',
    department: 'Ministry of Defence / Army Base',
    organization: 'Directorate General of Ordnance Services & 512 Army Base Workshop',
    accountType: 'plc',
    systemPin: '1100',
    blockchainAddress: '0x3ca1194825be770192451029384756bcad102938',
    idBadgeUploaded: true,
    idBadgeType: 'Ministry of Defence Cryptographic Nodal Token & Smart Identity Card',
    jurisdiction: {
      state: 'Delhi',
      city: 'New Delhi',
      circleOrZone: 'Ministry of Defence / Army Base, New Delhi',
      department: 'Ministry Of Defence',
      allowedCategories: ['Goods', 'Services', 'Works'],
      pincodes: [110011, 262701, 735101],
      jurisdictionCode: 'DL-DELHI-MOD-110011'
    },
    bioNotes: 'Director of Procurement. Oversees military base logistics, automotive heavy spares, and defense supplies with cryptographic ledger clearance.',
    hasIngestedLegacyProfile: true,
    efficiencyMetrics: {
      manualCycleDays: 38.5,
      projectedAiCycleDays: 2.4,
      manualRepetitionHoursPerTender: 62.0,
      projectedAiHoursPerTender: 1.8,
      cagAuditRiskScore: 82.0,
      projectedCagRiskScore: 6.0,
      totalLifetimeTendersApproved: 310,
      estimatedAdministrativeCostSavedLakhs: 142.0,
      verificationAccuracyPct: 68.0,
      projectedAccuracyPct: 99.4
    }
  },
  {
    id: 'off-sundaram',
    fakeName: 'Rajeshwari Sundaram',
    age: 44,
    designation: 'General Manager - Materials & Contracts (PLC Certified)',
    designationHindi: 'महाप्रबंधक (सामग्री एवं अनुबंध) - पीएलसी प्रमाणित',
    employeeCode: 'BEL-BLR-2002-GM08',
    department: 'BEL & Aerospace Division',
    organization: 'Bharat Electronics Limited (BEL), Bengaluru Urban Complex',
    accountType: 'plc',
    systemPin: '5600',
    blockchainAddress: '0x56a29f8124567812039ba77123901bcae8841091',
    idBadgeUploaded: true,
    idBadgeType: 'DigiLocker Certified e-Office Identification Card',
    jurisdiction: {
      state: 'Karnataka',
      city: 'Bengaluru Urban',
      circleOrZone: 'BEL & Aerospace Division, Bengaluru Urban',
      department: 'Ministry Of Defence',
      allowedCategories: ['Goods', 'Works'],
      pincodes: [560013],
      jurisdictionCode: 'KA-BLR-BEL-560013'
    },
    bioNotes: 'General Manager handling precision electronics, radar testing instrumentation, and high-tech defense electronics contracts.',
    hasIngestedLegacyProfile: true,
    efficiencyMetrics: {
      manualCycleDays: 38.5,
      projectedAiCycleDays: 2.4,
      manualRepetitionHoursPerTender: 44.0,
      projectedAiHoursPerTender: 1.2,
      cagAuditRiskScore: 82.0,
      projectedCagRiskScore: 6.0,
      totalLifetimeTendersApproved: 142,
      estimatedAdministrativeCostSavedLakhs: 64.8,
      verificationAccuracyPct: 68.0,
      projectedAccuracyPct: 99.4
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
