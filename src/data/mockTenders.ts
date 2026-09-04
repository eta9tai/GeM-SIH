import { Tender, BlockchainBlock } from '../types';

export const INITIAL_TENDERS: Tender[] = [
  {
    id: 'edb53456-5812-464f-a174-9a215dd673d3',
    tenderId: '9588461',
    referenceNumber: 'GEM/2026/B/7770945',
    title: 'Goods Transport Service – Per KM Based Service - Machinery & Equipment; Open Body LCV Truck; 19 FT LCV',
    description: 'Procurement of Goods Transport Service on Per KM rate contract basis for Machinery, Heavy Ground Equipment across Northern and Western airbases with Open Body LCV 19FT, Platform Truck 22FT, and 32FT trailers.',
    organisation: 'Indian Air Force',
    department: 'Ministry Of Defence',
    division: 'Air Force Public Fund Account',
    location: 'Kheri, Uttar Pradesh',
    state: 'Uttar Pradesh',
    city: 'Kheri',
    pincode: 262701,
    tenderValue: 5200000,
    contractValue: 4200000,
    emdValue: 103890,
    tenderType: 'Two Packet Bid',
    tenderCategory: 'Services',
    gemBidType: 'service',
    status: 'aoc',
    publishDate: '2026-07-31T09:00:00Z',
    closingDate: '2026-08-21T09:00:00Z',
    openingDate: '2026-08-21T09:30:00Z',
    lastActivityAt: '2026-09-04T08:04:04Z',
    corrigendumCount: 0,
    beneficiary: 'AIR FORCE PUBLIC FUND ACCOUNT, SURATGARH, 35 WING AIR FORCE',
    eligibility: {
      experienceYears: 2,
      minTurnoverLakhs: 52,
      purchasePreference: ['MSE', 'MII (Class-I)']
    },
    items: [
      { name: 'Open Body LCV Truck; 19 FT LCV', quantity: '37,500 KM', deliveryLocation: 'GANGA NAGAR / SURATGARH', specification: 'Diesel BS-VI compliant, GPS enabled, cargo lashings' },
      { name: 'Platform Truck; 22 FT Truck', quantity: '37,500 KM', deliveryLocation: 'GANGA NAGAR / SURATGARH', specification: 'Flatbed heavy equipment carrier with heavy tie-down chain' },
      { name: 'Platform Truck; 32 FT Truck', quantity: '6,000 KM', deliveryLocation: 'GANGA NAGAR / SURATGARH', specification: 'Multi-axle low bed for aero-spares and ground support machinery' }
    ],
    bids: [
      {
        id: 'bid-iaf-1',
        companyName: 'SHREE VIJAY TRAVELS',
        location: 'Bikaner, Rajasthan',
        state: 'Rajasthan',
        bidNumber: 'GEM-9588461-20',
        amount: 4200000,
        quotedAmount: 4200000,
        awardedAmount: 4200000,
        rank: 'L1',
        status: 'Qualified',
        isAwarded: true,
        tags: ['MSE', 'OBC', 'MII Class-I'],
        phone: '+91 94140 *****',
        email: 'vijaytravels.bkn@gov-vendor.in',
        verificationData: {
          complianceScore: 98,
          riskLevel: 'Low',
          recommendation: 'Qualified',
          recommendationReason: 'All statutory, financial, and fleet authorization metrics cross-verified clean. Validated MSME Udyam and 100% active GST return filing with no debarment across CPPP.',
          gapsAndDiscrepancies: [],
          keyHighlights: [
            'GST Returns (GSTR-3B & GSTR-1) filed on-time for last 36 months',
            'Fleet GPS certificate verified via DigiLocker Government vault',
            'Class-I Local Content declared at 94.2% compliant with MII policy',
            'Zero penalties or litigation entries in National Debarment Database'
          ],
          statutoryChecks: {
            gstnStatus: 'Active & Filing Up-to-date',
            gstinNumber: '08AAAFS7892K1Z9',
            udyamRegistration: 'UDYAM-RJ-04-0019284',
            udyamCategory: 'Small',
            panNumber: 'AAAFS7892K',
            panItrStatus: 'Verified (3 Yrs Filed)',
            makeInIndiaPercentage: 94.2,
            epfoStatus: 'Compliant (42 Employees)',
            esicStatus: 'Active & Contributions Paid',
            debarmentStatus: 'Clean (No Blacklist in CPPP/GeM)',
            startupDpiit: false,
            oemAuthorizationValid: true
          },
          handshakes: [
            { portal: 'GSTN Gateway', portalCode: 'GSTN', status: 'verified', responseTimeMs: 142, resultSummary: 'Taxpayer Active, E-Way Bill Generation Enabled', matchedId: '08AAAFS7892K1Z9' },
            { portal: 'Udyam Registration Portal', portalCode: 'UDYAM', status: 'verified', responseTimeMs: 185, resultSummary: 'MSME Service Enterprise Validated (Small)', matchedId: 'UDYAM-RJ-04-0019284' },
            { portal: 'Income Tax e-Filing API', portalCode: 'INCOME_TAX', status: 'verified', responseTimeMs: 220, resultSummary: 'ITR-V Verified for AY 2024-25, 2025-26, 2026-27', matchedId: 'AAAFS7892K' },
            { portal: 'EPFO Compliance Gateway', portalCode: 'EPFO_ESIC', status: 'verified', responseTimeMs: 190, resultSummary: 'Electronic Challan Returns (ECR) cleared for last 12 months', matchedId: 'RJ/BK/0045812' },
            { portal: 'DigiLocker National Vault', portalCode: 'DIGILOCKER', status: 'verified', responseTimeMs: 110, resultSummary: 'Vehicle Fitness & National Carriage Permits authenticated', matchedId: 'DL-DOC-889410' },
            { portal: 'CPPP Central Debarment List', portalCode: 'DEBARMENT_REGISTRY', status: 'verified', responseTimeMs: 95, resultSummary: 'No Debarment or Suspension record found across 82 CPSEs', matchedId: 'CLEAR-RECORD-08' }
          ],
          documents: [
            { id: 'doc-1', name: 'Fleet RC Books & National Permits.pdf', type: 'oem_auth', status: 'verified', fileSize: '2.4 MB', digiLockerVerified: true, hash: 'sha256:7e8912cba9...' },
            { id: 'doc-2', name: 'Udyam MSME Certificate.pdf', type: 'udyam', status: 'verified', fileSize: '480 KB', digiLockerVerified: true, hash: 'sha256:4a01c459de...' },
            { id: 'doc-3', name: 'Audited Turnover Statement CA Certified.pdf', type: 'balance_sheet', status: 'verified', fileSize: '1.8 MB', digiLockerVerified: true, hash: 'sha256:91bf883ae0...' },
            { id: 'doc-4', name: 'Make In India (Class-I) Self Declaration.pdf', type: 'mii_declaration', status: 'verified', fileSize: '320 KB', digiLockerVerified: false, hash: 'sha256:bb65ef128c...' }
          ],
          officerDecision: {
            action: 'Approved',
            officerName: 'Wing Cdr. R. K. Saxena',
            officerDesignation: 'Senior Procurement Officer, 35 Wing Air Force',
            timestamp: '2026-09-04 11:20:14 IST',
            remarks: 'Technically and commercially qualified. Contract awarded to L1 bidder under MSE preferential terms.',
            blockchainTxHash: '0x88f4e912ab7c56910dae9942bf114a87c1269fa84511082c33211ef5'
          }
        }
      },
      {
        id: 'bid-iaf-2',
        companyName: 'TRIDEV TRANSPORT COMPANY',
        location: 'Bikaner, Rajasthan',
        state: 'Rajasthan',
        bidNumber: 'GEM-9588461-23',
        amount: 4334250,
        quotedAmount: 4334250,
        rank: 'L2',
        status: 'Qualified',
        tags: ['General'],
        verificationData: {
          complianceScore: 92,
          riskLevel: 'Low',
          recommendation: 'Qualified',
          recommendationReason: 'Compliant on statutory parameters; quote is higher than L1.',
          gapsAndDiscrepancies: [],
          keyHighlights: ['Turnover meets threshold ₹74.8 Lakhs (min ₹52L required)', 'All tax filings validated'],
          statutoryChecks: {
            gstnStatus: 'Active & Filing Up-to-date',
            gstinNumber: '08BAPTC4412M1Z3',
            udyamRegistration: 'Not Registered',
            udyamCategory: 'Not Registered',
            panNumber: 'BAPTC4412M',
            panItrStatus: 'Verified (3 Yrs Filed)',
            makeInIndiaPercentage: 91.0,
            epfoStatus: 'Compliant (148 Employees)',
            esicStatus: 'Active & Contributions Paid',
            debarmentStatus: 'Clean (No Blacklist in CPPP/GeM)',
            startupDpiit: false,
            oemAuthorizationValid: true
          },
          handshakes: [
            { portal: 'GSTN Gateway', portalCode: 'GSTN', status: 'verified', responseTimeMs: 156, resultSummary: 'Active Taxpayer', matchedId: '08BAPTC4412M1Z3' },
            { portal: 'Income Tax e-Filing API', portalCode: 'INCOME_TAX', status: 'verified', responseTimeMs: 204, resultSummary: 'ITR Cleared', matchedId: 'BAPTC4412M' }
          ],
          documents: []
        }
      },
      {
        id: 'bid-iaf-3',
        companyName: 'H K LOGISTICS',
        location: 'Jaipur, Rajasthan',
        state: 'Rajasthan',
        bidNumber: 'GEM-9588461-11',
        amount: 4642500,
        quotedAmount: 4642500,
        rank: 'L3',
        status: 'Qualified',
        tags: ['MSE', 'OBC'],
        verificationData: {
          complianceScore: 89,
          riskLevel: 'Low',
          recommendation: 'Qualified',
          recommendationReason: 'Compliant technically, quote higher than L1.',
          gapsAndDiscrepancies: [],
          keyHighlights: ['Valid Udyam Micro Enterprise', 'Local carriage permit validated'],
          statutoryChecks: {
            gstnStatus: 'Active & Filing Up-to-date',
            gstinNumber: '08AABCH1199F1ZV',
            udyamRegistration: 'UDYAM-RJ-17-0091142',
            udyamCategory: 'Micro',
            panNumber: 'AABCH1199F',
            panItrStatus: 'Verified (3 Yrs Filed)',
            makeInIndiaPercentage: 88.5,
            epfoStatus: 'Exempt / Not Applicable',
            esicStatus: 'Exempt',
            debarmentStatus: 'Clean (No Blacklist in CPPP/GeM)',
            startupDpiit: false,
            oemAuthorizationValid: true
          },
          handshakes: [],
          documents: []
        }
      },
      {
        id: 'bid-iaf-4',
        companyName: 'SHRI KARNI LOGISTIC SERVICES',
        location: 'Jodhpur, Rajasthan',
        state: 'Rajasthan',
        bidNumber: 'GEM-9588461-21',
        amount: 4865250,
        quotedAmount: 4865250,
        rank: 'L4',
        status: 'Qualified',
        tags: ['MSE', 'OBC'],
        verificationData: {
          complianceScore: 84,
          riskLevel: 'Medium',
          recommendation: 'Clarification Required',
          recommendationReason: 'Turnover in submitted balance sheet has 4.2% variance compared to annual GST turnover.',
          gapsAndDiscrepancies: ['GST vs Financial ledger variance of ₹3.1L flagged by AI Engine'],
          keyHighlights: ['Fleet RC verified on DigiLocker'],
          statutoryChecks: {
            gstnStatus: 'Active & Filing Up-to-date',
            gstinNumber: '08AAEFK3321D1ZB',
            udyamRegistration: 'UDYAM-RJ-19-0021941',
            udyamCategory: 'Small',
            panNumber: 'AAEFK3321D',
            panItrStatus: 'Verified (3 Yrs Filed)',
            makeInIndiaPercentage: 85.0,
            epfoStatus: 'Compliant (42 Employees)',
            esicStatus: 'Active & Contributions Paid',
            debarmentStatus: 'Clean (No Blacklist in CPPP/GeM)',
            startupDpiit: false,
            oemAuthorizationValid: true
          },
          handshakes: [],
          documents: []
        }
      },
      {
        id: 'bid-iaf-5',
        companyName: 'ADITYA LOGISTICS',
        location: 'Nagpur, Maharashtra',
        state: 'Maharashtra',
        bidNumber: 'GEM-9588461-1',
        status: 'Disqualified',
        tags: ['MSE', 'General'],
        remarks: 'Disqualified at Technical Stage — GSTR-3B return default > 90 days and missing audited P&L.',
        verificationData: {
          complianceScore: 38,
          riskLevel: 'High',
          recommendation: 'Disqualified',
          recommendationReason: 'Critical statutory failures: GSTN portal reports defaulting returns for Q3-Q4; turnover below minimum required ₹52.0 Lakhs.',
          gapsAndDiscrepancies: [
            'GSTN status flagged: Return Filing Default over 90 days (Rule 144(xi) GFR non-compliant)',
            'Average 3-yr turnover is ₹34.2L (Mandatory tender minimum is ₹52.0L)',
            'Missing ATC certificate of non-debarment'
          ],
          keyHighlights: ['Automated AI Verification prevented high-risk bid progression'],
          statutoryChecks: {
            gstnStatus: 'Return Default Detected',
            gstinNumber: '27AALPA9910C1Z4',
            udyamRegistration: 'UDYAM-MH-20-0081249',
            udyamCategory: 'Micro',
            panNumber: 'AALPA9910C',
            panItrStatus: 'Defective ITR',
            makeInIndiaPercentage: 60.0,
            epfoStatus: 'Non-Compliant',
            esicStatus: 'Exempt',
            debarmentStatus: 'Clean (No Blacklist in CPPP/GeM)',
            startupDpiit: false,
            oemAuthorizationValid: false
          },
          handshakes: [
            { portal: 'GSTN Gateway', portalCode: 'GSTN', status: 'flagged', responseTimeMs: 160, resultSummary: 'GSTR-3B default for continuous 3 tax periods', matchedId: '27AALPA9910C1Z4' },
            { portal: 'Income Tax e-Filing API', portalCode: 'INCOME_TAX', status: 'flagged', responseTimeMs: 230, resultSummary: 'Mismatch in ITR Gross Turnover vs GST Turnover', matchedId: 'AALPA9910C' }
          ],
          documents: []
        }
      }
    ]
  },
  {
    id: 'a565e734-5dd9-4c7a-b8a6-297ca41144a6',
    tenderId: '9807729',
    referenceNumber: 'GEM/2026/B/9807729',
    title: 'MT SPARES (Automotive Clutch Assembly, Slave Cylinder, Master Cylinder)',
    description: 'Procurement of Heavy Vehicle Spare Parts including Clutch Cover & Disc Assembly, Concentric Slave Cylinder, Hydraulic Booster and Brake Assemblies for Army field transport vehicles.',
    organisation: 'Indian Army',
    department: 'Ministry Of Defence',
    division: 'Directorate General of Supplies & Transport',
    location: 'Jalpaiguri, West Bengal',
    state: 'West Bengal',
    city: 'Jalpaiguri',
    pincode: 735101,
    contractValue: 69350,
    tenderType: 'Two Packet Bid',
    tenderCategory: 'Goods',
    gemBidType: 'boq',
    status: 'aoc',
    publishDate: '2026-08-25T00:00:00Z',
    closingDate: '2026-09-04T20:00:00Z',
    openingDate: '2026-09-04T20:30:00Z',
    lastActivityAt: '2026-09-04T14:30:00Z',
    eligibility: {
      experienceYears: 1,
      minTurnoverLakhs: 2,
      purchasePreference: ['MSE', 'MII']
    },
    items: [
      { name: 'CLUTCH COVER AND DISC ASSY', quantity: 12, deliveryLocation: '512 ARMY BASE WORKSHOP', specification: 'OEM Tata 407/709 grade heavy duty' },
      { name: 'CONCENTRIC SLAVE CYLINDER', quantity: 18, deliveryLocation: '512 ARMY BASE WORKSHOP', specification: 'Pressure tested 220 bar certified' }
    ],
    bids: [
      {
        id: 'bid-army-1',
        companyName: 'RADHE INDUSTRIES & TRADING CO.',
        location: 'Howrah, West Bengal',
        state: 'West Bengal',
        bidNumber: 'GEM-9807729-3',
        amount: 69350,
        quotedAmount: 69350,
        awardedAmount: 69350,
        rank: 'L1',
        status: 'Qualified',
        isAwarded: true,
        tags: ['MSE', 'General', 'MII'],
        verificationData: {
          complianceScore: 95,
          riskLevel: 'Low',
          recommendation: 'Qualified',
          recommendationReason: 'Technical specifications match army vehicle OEM codes. OEM warranty letter and ISO 9001 certified on DigiLocker.',
          gapsAndDiscrepancies: [],
          keyHighlights: ['Automotive test certificate verified', '100% Make In India verified'],
          statutoryChecks: {
            gstnStatus: 'Active & Filing Up-to-date',
            gstinNumber: '19AABCR4455E1Z7',
            udyamRegistration: 'UDYAM-WB-10-0012948',
            udyamCategory: 'Micro',
            panNumber: 'AABCR4455E',
            panItrStatus: 'Verified (3 Yrs Filed)',
            makeInIndiaPercentage: 100.0,
            epfoStatus: 'Compliant (42 Employees)',
            esicStatus: 'Active & Contributions Paid',
            debarmentStatus: 'Clean (No Blacklist in CPPP/GeM)',
            startupDpiit: false,
            oemAuthorizationValid: true
          },
          handshakes: [],
          documents: []
        }
      },
      {
        id: 'bid-army-2',
        companyName: 'M/s Dhruv Enterprises',
        location: 'Kolkata, West Bengal',
        state: 'West Bengal',
        bidNumber: 'GEM-9807729-2',
        amount: 72060,
        quotedAmount: 72060,
        rank: 'L2',
        status: 'Qualified',
        tags: ['MSE', 'General'],
        verificationData: {
          complianceScore: 91,
          riskLevel: 'Low',
          recommendation: 'Qualified',
          recommendationReason: 'Statutory compliance complete; rate is L2.',
          gapsAndDiscrepancies: [],
          keyHighlights: ['Udyam micro verified'],
          statutoryChecks: {
            gstnStatus: 'Active & Filing Up-to-date',
            gstinNumber: '19AAECD9982H1Z1',
            udyamRegistration: 'UDYAM-WB-14-0044910',
            udyamCategory: 'Micro',
            panNumber: 'AAECD9982H',
            panItrStatus: 'Verified (3 Yrs Filed)',
            makeInIndiaPercentage: 90.0,
            epfoStatus: 'Exempt / Not Applicable',
            esicStatus: 'Exempt',
            debarmentStatus: 'Clean (No Blacklist in CPPP/GeM)',
            startupDpiit: false,
            oemAuthorizationValid: true
          },
          handshakes: [],
          documents: []
        }
      }
    ]
  },
  {
    id: 'd19f4c6b-46fc-478d-adc1-5f99e551fc68',
    tenderId: '9722980',
    referenceNumber: 'GEM/2026/B/9722980',
    title: 'Liquid Nitrogen (In Kg) (Q3) - Refineries & Petrochemical Complex',
    description: 'Bulk supply of high-purity Liquid Nitrogen (Grade 99.99%) conforming to IS 1747 via cryogenic road tankers with telemetry monitoring for continuous inerting and purge operations.',
    organisation: 'Hindustan Petroleum Corporation Ltd',
    department: 'Ministry Of Petroleum And Natural Gas',
    division: 'Visakh Refinery Procurement',
    location: 'Visakhapatanam, Andhra Pradesh',
    state: 'Andhra Pradesh',
    city: 'Visakhapatanam',
    pincode: 530011,
    contractValue: 99500000,
    tenderValue: 100000000,
    emdValue: 2500000,
    tenderType: 'Two Packet Bid',
    tenderCategory: 'Goods',
    gemBidType: 'product',
    status: 'aoc',
    publishDate: '2026-08-07T00:00:00Z',
    closingDate: '2026-08-19T12:00:00Z',
    openingDate: '2026-08-19T12:30:00Z',
    lastActivityAt: '2026-09-04T08:45:58Z',
    eligibility: {
      experienceYears: 5,
      minTurnoverLakhs: 3000,
      purchasePreference: ['MII (Class-I)']
    },
    items: [
      { name: 'Liquid Nitrogen conforming to IS 1747 (99.99% purity)', quantity: '4,500,000 Kg', deliveryLocation: 'HPCL Visakh Refinery Cryogenic Storage Tanks', specification: 'Max Oxygen 10 ppm, Moisture < 5 ppm' }
    ],
    bids: [
      {
        id: 'bid-hpcl-1',
        companyName: 'LIQUINOX GASES PRIVATE LIMITED',
        location: 'Hyderabad, Telangana',
        state: 'Telangana',
        bidNumber: 'GEM-9722980-3',
        amount: 99500000,
        quotedAmount: 99500000,
        awardedAmount: 99500000,
        rank: 'L1',
        status: 'Qualified',
        isAwarded: true,
        tags: ['MII Class-I', 'Large Enterprise'],
        phone: '+91 40 2789 ****',
        email: 'tenders@liquinoxgases.com',
        verificationData: {
          complianceScore: 99,
          riskLevel: 'Low',
          recommendation: 'Qualified',
          recommendationReason: 'PESO cryogenic transport licenses verified, CPPP negative clearing confirmed, audited balance sheets reflect ₹184 Cr turnover exceeding requirement.',
          gapsAndDiscrepancies: [],
          keyHighlights: ['PESO certified tanker fleet', 'IS 1747 laboratory NABL accreditation matched', 'Class-I Local Content at 98.4%'],
          statutoryChecks: {
            gstnStatus: 'Active & Filing Up-to-date',
            gstinNumber: '36AABCL8901D1ZF',
            udyamRegistration: 'Not Registered',
            udyamCategory: 'Not Registered',
            panNumber: 'AABCL8901D',
            panItrStatus: 'Verified (3 Yrs Filed)',
            makeInIndiaPercentage: 98.4,
            epfoStatus: 'Compliant (148 Employees)',
            esicStatus: 'Active & Contributions Paid',
            debarmentStatus: 'Clean (No Blacklist in CPPP/GeM)',
            startupDpiit: false,
            oemAuthorizationValid: true
          },
          handshakes: [],
          documents: []
        }
      },
      {
        id: 'bid-hpcl-2',
        companyName: 'ELLENBARRIE INDUSTRIAL GASES LTD',
        location: 'Kolkata, West Bengal',
        state: 'West Bengal',
        bidNumber: 'GEM-9722980-1',
        amount: 99700000,
        quotedAmount: 99700000,
        rank: 'L2',
        status: 'Qualified',
        tags: ['MII'],
        verificationData: {
          complianceScore: 96,
          riskLevel: 'Low',
          recommendation: 'Qualified',
          recommendationReason: 'Fully compliant technical and statutory score.',
          gapsAndDiscrepancies: [],
          keyHighlights: ['Turnover validated ₹320 Cr'],
          statutoryChecks: {
            gstnStatus: 'Active & Filing Up-to-date',
            gstinNumber: '19AAACE4411K1Z8',
            udyamRegistration: 'Not Registered',
            udyamCategory: 'Not Registered',
            panNumber: 'AAACE4411K',
            panItrStatus: 'Verified (3 Yrs Filed)',
            makeInIndiaPercentage: 96.0,
            epfoStatus: 'Compliant (148 Employees)',
            esicStatus: 'Active & Contributions Paid',
            debarmentStatus: 'Clean (No Blacklist in CPPP/GeM)',
            startupDpiit: false,
            oemAuthorizationValid: true
          },
          handshakes: [],
          documents: []
        }
      }
    ]
  },
  {
    id: '973cbbba-1f7f-49f2-9867-0aea090806ce',
    tenderId: '9619679',
    referenceNumber: 'GEM/2026/B/9619679',
    title: 'Portable Sentry Surveillance System - High Altitude Border Post Security',
    description: 'Procurement of Portable Ruggedized Sentry Surveillance Units equipped with Thermal Imaging, Pan-Tilt Zoom Day/Night sensors, and encrypted wireless telemetry for forward frontier outposts.',
    organisation: 'Indian Army',
    department: 'Ministry Of Defence',
    division: 'Signals & Surveillance Command',
    location: 'Ganderbal, Jammu And Kashmir',
    state: 'Jammu And Kashmir',
    city: 'Ganderbal',
    pincode: 191201,
    contractValue: 26097099.86,
    tenderValue: 27000000,
    emdValue: 540000,
    tenderType: 'Two Packet Bid',
    tenderCategory: 'Goods',
    gemBidType: 'product_custom',
    status: 'aoc',
    publishDate: '2026-07-31T00:00:00Z',
    closingDate: '2026-08-10T20:00:00Z',
    openingDate: '2026-08-10T20:30:00Z',
    lastActivityAt: '2026-09-04T09:30:00Z',
    eligibility: {
      experienceYears: 3,
      minTurnoverLakhs: 150,
      purchasePreference: ['MSE', 'MII Class-I']
    },
    items: [
      { name: 'Portable Sentry Surveillance System (MIL-STD-810G)', quantity: 18, deliveryLocation: '15 CORPS TRANSIT DEPOT SRINAGAR', specification: 'Cooled thermal sensor, AI target classification, 72-hr battery' }
    ],
    bids: [
      {
        id: 'bid-sentry-1',
        companyName: 'FIRDOUS ENTERPRISES',
        location: 'Srinagar, Jammu And Kashmir',
        state: 'Jammu And Kashmir',
        bidNumber: 'GEM-9619679-3',
        amount: 26097099.86,
        quotedAmount: 26097099.86,
        awardedAmount: 26097099.86,
        rank: 'L1',
        status: 'Qualified',
        isAwarded: true,
        tags: ['MSE', 'MII', 'General'],
        phone: '+91 194 245 ****',
        email: 'contact@firdousinfra.in',
        verificationData: {
          complianceScore: 97,
          riskLevel: 'Low',
          recommendation: 'Qualified',
          recommendationReason: 'Passed all environmental MIL-STD testing certificates, security clearance vetted by MHA/MoD, local content certified at 72.8%.',
          gapsAndDiscrepancies: [],
          keyHighlights: ['Military grade temperature test (-40°C to +55°C) cleared', 'Encrypted firmware certified by STQC'],
          statutoryChecks: {
            gstnStatus: 'Active & Filing Up-to-date',
            gstinNumber: '01AABCF9941G1ZQ',
            udyamRegistration: 'UDYAM-JK-05-0004128',
            udyamCategory: 'Small',
            panNumber: 'AABCF9941G',
            panItrStatus: 'Verified (3 Yrs Filed)',
            makeInIndiaPercentage: 72.8,
            epfoStatus: 'Compliant (42 Employees)',
            esicStatus: 'Active & Contributions Paid',
            debarmentStatus: 'Clean (No Blacklist in CPPP/GeM)',
            startupDpiit: false,
            oemAuthorizationValid: true
          },
          handshakes: [],
          documents: []
        }
      },
      {
        id: 'bid-sentry-2',
        companyName: 'THE MIR ENTERPRISES',
        location: 'Srinagar, Jammu And Kashmir',
        state: 'Jammu And Kashmir',
        bidNumber: 'GEM-9619679-5',
        status: 'Disqualified',
        tags: ['MSE', 'MII', 'General'],
        remarks: 'Disqualified: STQC cybersecurity encryption clearance certificate missing; OEM authorization expired.',
        verificationData: {
          complianceScore: 48,
          riskLevel: 'High',
          recommendation: 'Disqualified',
          recommendationReason: 'OEM Sensor authorization failed cryptographic signature validation on DigiLocker; missing required MIL-STD-810G test lab report.',
          gapsAndDiscrepancies: [
            'OEM Authorization document signature invalidated (Digest mismatch)',
            'Failed Mandatory Security Compliance check under Defense Procurement Manual'
          ],
          keyHighlights: ['Security breach averted by AI cross-referencing OEM database'],
          statutoryChecks: {
            gstnStatus: 'Active & Filing Up-to-date',
            gstinNumber: '01ABCDE1234F1Z1',
            udyamRegistration: 'UDYAM-JK-05-0019283',
            udyamCategory: 'Micro',
            panNumber: 'ABCDE1234F',
            panItrStatus: 'Verified (3 Yrs Filed)',
            makeInIndiaPercentage: 54.0,
            epfoStatus: 'Exempt / Not Applicable',
            esicStatus: 'Exempt',
            debarmentStatus: 'Clean (No Blacklist in CPPP/GeM)',
            startupDpiit: false,
            oemAuthorizationValid: false
          },
          handshakes: [],
          documents: []
        }
      }
    ]
  },
  {
    id: '56018f49-fb66-4b21-ad88-88a7e30dd378',
    tenderId: '9648633',
    referenceNumber: 'GEM/2026/B/9648633',
    title: '4 CHANNEL ELECTRONIC LOAD - High Precision Testing Instrumentation',
    description: 'Supply and calibration of 4 Channel DC Programmable Electronic Loads (JL400W-P) with SCPI interface, transient testing, and modular rack mount chassis for Defence Radar production testing.',
    organisation: 'Bharat Electronics Limited (bel)',
    department: 'Ministry Of Defence',
    division: 'BEL Bengaluru Complex',
    location: 'Bengaluru Urban, Karnataka',
    state: 'Karnataka',
    city: 'Bengaluru Urban',
    pincode: 560013,
    contractValue: 1120000,
    tenderValue: 1200000,
    tenderType: 'Two Packet Bid',
    tenderCategory: 'Goods',
    gemBidType: 'product_custom',
    status: 'aoc',
    publishDate: '2026-07-23T00:00:00Z',
    closingDate: '2026-08-13T11:00:00Z',
    openingDate: '2026-08-13T11:30:00Z',
    lastActivityAt: '2026-09-04T10:03:21Z',
    eligibility: {
      experienceYears: 2,
      minTurnoverLakhs: 10,
      purchasePreference: ['MSE', 'MII']
    },
    items: [
      { name: '4 CHANNEL ELECTRONIC LOAD (400W Modular)', quantity: 4, deliveryLocation: 'BEL D&E TESTING DIVISION BENGALURU', specification: 'Accuracy 0.05%, Slew rate 2.5A/us' }
    ],
    bids: [
      {
        id: 'bid-bel-1',
        companyName: 'JOMA INDIA EV PRIVATE LIMITED',
        location: 'Bengaluru Urban, Karnataka',
        state: 'Karnataka',
        bidNumber: 'GEM-9648633-2',
        amount: 1120000,
        quotedAmount: 1120000,
        awardedAmount: 1120000,
        rank: 'L1',
        status: 'Qualified',
        isAwarded: true,
        tags: ['MSE', 'MII', 'General'],
        verificationData: {
          complianceScore: 94,
          riskLevel: 'Low',
          recommendation: 'Qualified',
          recommendationReason: 'OEM technical data sheet validated. NABL calibration certificates uploaded and verified on DigiLocker.',
          gapsAndDiscrepancies: [],
          keyHighlights: ['Turnover verified ₹48.5 Lakhs', 'Active GSTN status'],
          statutoryChecks: {
            gstnStatus: 'Active & Filing Up-to-date',
            gstinNumber: '29AAFCJ8892P1Z0',
            udyamRegistration: 'UDYAM-KR-03-0091823',
            udyamCategory: 'Micro',
            panNumber: 'AAFCJ8892P',
            panItrStatus: 'Verified (3 Yrs Filed)',
            makeInIndiaPercentage: 82.0,
            epfoStatus: 'Compliant (42 Employees)',
            esicStatus: 'Active & Contributions Paid',
            debarmentStatus: 'Clean (No Blacklist in CPPP/GeM)',
            startupDpiit: true,
            oemAuthorizationValid: true
          },
          handshakes: [],
          documents: []
        }
      }
    ]
  },
  {
    id: '4f30091f-d33d-4e45-aefb-b259ee60d540',
    tenderId: '9575266',
    referenceNumber: 'GEM/2026/B/9575266',
    title: 'Digital Board Anti-Glare LCD with Direct-lit LED with touch screen display size-98 inches',
    description: 'Procurement of Interactive Smart Flat Panel 98-inch 4K UHD Anti-Glare display panels with 40-point multi-touch, integrated Android 14/Windows dual OS OPS slot for Coast Guard Tactical Operations Room.',
    organisation: 'Indian Coast Guard',
    department: 'Ministry Of Defence',
    division: 'Coast Guard Regional HQ (NE)',
    location: '24 Paraganas South, West Bengal',
    state: 'West Bengal',
    city: '24 Paraganas South',
    pincode: 700027,
    contractValue: 355052,
    tenderType: 'Two Packet Bid',
    tenderCategory: 'Goods',
    gemBidType: 'product_custom',
    status: 'aoc',
    publishDate: '2026-08-11T00:00:00Z',
    closingDate: '2026-09-01T17:00:00Z',
    openingDate: '2026-09-01T17:30:00Z',
    lastActivityAt: '2026-09-04T10:30:00Z',
    corrigendumCount: 1,
    eligibility: {
      experienceYears: 2,
      minTurnoverLakhs: 8,
      purchasePreference: ['MSE', 'MII']
    },
    items: [
      { name: 'Interactive Digital Board 98-inch 4K', quantity: 1, deliveryLocation: 'COAST GUARD AIR ENCLAVE KOLKATA', specification: 'BIS R-Number certified, 40-point IR Touch, Dual Stylus' }
    ],
    bids: [
      {
        id: 'bid-icg-1',
        companyName: 'M/S. KALI MANUFACTURING',
        location: 'Kolkata, West Bengal',
        state: 'West Bengal',
        bidNumber: 'GEM-9575266-3',
        amount: 355052,
        quotedAmount: 355052,
        awardedAmount: 355052,
        rank: 'L1',
        status: 'Qualified',
        isAwarded: true,
        tags: ['MII', 'MSE'],
        verificationData: {
          complianceScore: 96,
          riskLevel: 'Low',
          recommendation: 'Qualified',
          recommendationReason: 'BIS CRS certification verified on Bureau of Indian Standards portal. Valid OEM partnership authorization.',
          gapsAndDiscrepancies: [],
          keyHighlights: ['BIS CRS R-number verified authentic', 'Clean audit history'],
          statutoryChecks: {
            gstnStatus: 'Active & Filing Up-to-date',
            gstinNumber: '19AAEFK1122D1Z9',
            udyamRegistration: 'UDYAM-WB-10-0087412',
            udyamCategory: 'Micro',
            panNumber: 'AAEFK1122D',
            panItrStatus: 'Verified (3 Yrs Filed)',
            makeInIndiaPercentage: 65.0,
            epfoStatus: 'Exempt / Not Applicable',
            esicStatus: 'Exempt',
            debarmentStatus: 'Clean (No Blacklist in CPPP/GeM)',
            startupDpiit: false,
            oemAuthorizationValid: true
          },
          handshakes: [],
          documents: []
        }
      }
    ]
  },
  {
    id: 'c33be997-8bf0-40bc-a498-de894616d72d',
    tenderId: '9317388',
    referenceNumber: 'GEM/2026/B/9317388',
    title: 'Refrigerated Centrifuge: Maximum Speed of 30, 130 x g / 17, 500 rpm with brushless motor',
    description: 'High-speed benchtop refrigerated centrifuge with aerosol-tight rotor, microprocessor PID temperature control (-11°C to +40°C), continuous diagnostic sensors for Bhabha Atomic Research Centre lab.',
    organisation: 'Directorate Of Purchase And Stores',
    department: 'Department of Atomic Energy',
    division: 'DPS Central Stores Trombay',
    location: 'Mumbai Suburban, Maharashtra',
    state: 'Maharashtra',
    city: 'Mumbai Suburban',
    pincode: 400085,
    contractValue: 1251060,
    tenderType: 'Two Packet Bid',
    tenderCategory: 'Goods',
    gemBidType: 'product_custom',
    status: 'aoc',
    publishDate: '2026-05-21T00:00:00Z',
    closingDate: '2026-06-12T11:00:00Z',
    openingDate: '2026-06-12T11:30:00Z',
    lastActivityAt: '2026-09-04T11:30:00Z',
    eligibility: {
      experienceYears: 3,
      minTurnoverLakhs: 25,
      purchasePreference: ['MSE', 'MII']
    },
    items: [
      { name: 'Refrigerated Micro-Centrifuge 30130xg', quantity: 2, deliveryLocation: 'BARC MEDICAL LAB COMPLEX TROMBAY', specification: 'Rotor FA-45-30-11, CE certified' }
    ],
    bids: [
      {
        id: 'bid-dps-1',
        companyName: 'EDUCATIONAL & RESEARCH AIDS COMPANY',
        location: 'Mumbai, Maharashtra',
        state: 'Maharashtra',
        bidNumber: 'GEM-9317388-4',
        amount: 1251060,
        quotedAmount: 1251060,
        awardedAmount: 1251060,
        rank: 'L1',
        status: 'Qualified',
        isAwarded: true,
        tags: ['Authorized OEM Partner', 'MSE'],
        verificationData: {
          complianceScore: 98,
          riskLevel: 'Low',
          recommendation: 'Qualified',
          recommendationReason: 'Direct manufacturer authorization verified. DAE security clearance intact.',
          gapsAndDiscrepancies: [],
          keyHighlights: ['ISO 13485 medical device compliance verified'],
          statutoryChecks: {
            gstnStatus: 'Active & Filing Up-to-date',
            gstinNumber: '27AAECE1190K1Z2',
            udyamRegistration: 'UDYAM-MH-18-0091410',
            udyamCategory: 'Small',
            panNumber: 'AAECE1190K',
            panItrStatus: 'Verified (3 Yrs Filed)',
            makeInIndiaPercentage: 62.0,
            epfoStatus: 'Compliant (42 Employees)',
            esicStatus: 'Active & Contributions Paid',
            debarmentStatus: 'Clean (No Blacklist in CPPP/GeM)',
            startupDpiit: false,
            oemAuthorizationValid: true
          },
          handshakes: [],
          documents: []
        }
      }
    ]
  }
];

export const INITIAL_BLOCKCHAIN_LEDGER: BlockchainBlock[] = [
  {
    blockNumber: 0,
    timestamp: '2026-08-01 00:00:01 IST',
    previousHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    hash: '0x0000a1f89bc4510098df12e094ba452179836104bcde88214fa1107936ef1102',
    nonce: 849201,
    merkleRoot: '0x3ef9108bca992147...',
    tenderRef: 'GENESIS-BLOCK',
    event: 'GeM 5.0 Cryptographic Ledger Initialized by Ministry of Commerce & Industry',
    verifiedBy: 'NIC-GeM Security Architecture Hub',
    bidderName: 'SYSTEM_ROOT',
    complianceScore: 100,
    status: 'VALID'
  },
  {
    blockNumber: 1,
    timestamp: '2026-08-21 09:30:15 IST',
    previousHash: '0x0000a1f89bc4510098df12e094ba452179836104bcde88214fa1107936ef1102',
    hash: '0x0000d8391fbac019245be78912e8410294fcda991823bc014812a89cf1294820',
    nonce: 194822,
    merkleRoot: '0x88f4e912ab7c5691...',
    tenderRef: 'GEM/2026/B/7770945',
    event: 'AI Cross-Verification Audit & Statutory Clearing (Udyam + GSTN + DigiLocker)',
    verifiedBy: 'AI Engine v4.2 & Wing Cdr. R. K. Saxena',
    bidderName: 'SHREE VIJAY TRAVELS',
    complianceScore: 98,
    status: 'VALID'
  },
  {
    blockNumber: 2,
    timestamp: '2026-08-21 09:34:02 IST',
    previousHash: '0x0000d8391fbac019245be78912e8410294fcda991823bc014812a89cf1294820',
    hash: '0x00007e9912bcfa00142851992bcda001924567812039ba77123901bcae884109',
    nonce: 471928,
    merkleRoot: '0x12bb9401fca77812...',
    tenderRef: 'GEM/2026/B/7770945',
    event: 'Technical Disqualification Seal: Return Default (Rule 144(xi) GFR Flagged)',
    verifiedBy: 'GeM Statutory Compliance Bot #04',
    bidderName: 'ADITYA LOGISTICS',
    complianceScore: 38,
    status: 'VALID'
  },
  {
    blockNumber: 3,
    timestamp: '2026-08-27 19:30:44 IST',
    previousHash: '0x00007e9912bcfa00142851992bcda001924567812039ba77123901bcae884109',
    hash: '0x00009182bcfe00194825be770192451029384756bcad10293847561029384756',
    nonce: 631094,
    merkleRoot: '0x66a01bcde9941258...',
    tenderRef: 'GEM/2026/B/9807729',
    event: 'Army Base Workshop Technical Pass: OEM Spare Authentication Sealed',
    verifiedBy: 'Col. Vikram Singh (Director Procurement)',
    bidderName: 'RADHE INDUSTRIES & TRADING CO.',
    complianceScore: 95,
    status: 'VALID'
  }
];
