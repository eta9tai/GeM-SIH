export interface StratifiedBidder {
  id: string;
  rank: number;
  companyName: string;
  location: string;
  state: string;
  bidAmount: number;
  complianceScore: number;
  zone: 'green' | 'orange' | 'red';
  status: 'Ideal Bid' | 'Compliant' | 'Missing Documents' | 'Verification Pending' | 'Rejected - Fake Docs' | 'Rejected - Debarred';
  internalTrustScore?: number; // Internal to Officer only! Negative for Red zone!
  negativeTrustPenalty?: number; // E.g. -35 for fake CA UDIN
  missingDocuments?: string[];
  reuploadedDocsCount?: number;
  bonusPointsEarned?: number;
  isAiRecommended?: boolean;
  rejectionReason?: string;
  tags: string[];
}

export interface StratificationSummary {
  tenderRef: string;
  totalBidsCount: number;
  greenCutoffPercentile: number; // e.g. 34%
  greenZoneCount: number; // 34
  orangeZoneCount: number; // 48
  redZoneCount: number; // 18
  cureWindowDays: number; // e.g. 5 days auto-allotted
  idealBidId: string;
  bidders: StratifiedBidder[];
}

// Generate realistic 100 bidders for the active tender
export function generate100StratifiedBidders(tenderRef: string = 'GEM/2026/B/7770945'): StratificationSummary {
  const bidders: StratifiedBidder[] = [];

  // Top 34 Bidders -> GREEN ZONE (Top 34 Percentile)
  const greenNames = [
    { name: 'Sahyadri Scientific Instruments & Bio-Tech Labs', loc: 'Powai, Mumbai', state: 'Maharashtra', tags: ['MSE', 'MII Class-I', 'ISO 13485'] },
    { name: 'Himalayan Optics & Tactical Electronics', loc: 'Sanat Nagar, Srinagar', state: 'Jammu & Kashmir', tags: ['MSE', 'Defence Qualified', 'MII'] },
    { name: 'Howrah Precision Gears & Clutch Works', loc: 'Baltikuri, Howrah', state: 'West Bengal', tags: ['MSE', 'OEM Certified', 'MII'] },
    { name: 'Bharat Heavy Electricals Consortium', loc: 'Bhopal, Madhya Pradesh', state: 'Madhya Pradesh', tags: ['CPSE', 'MII Class-I'] },
    { name: 'Kalyani Analytical Devices LLP', loc: 'Andheri East, Mumbai', state: 'Maharashtra', tags: ['MSE', 'Startup DPIIT'] },
    { name: 'Tata Advanced Systems Limited', loc: 'Hyderabad, Telangana', state: 'Telangana', tags: ['Large Enterprise', 'MII'] },
    { name: 'Larsen & Toubro Defense Electronics', loc: 'Coimbatore, Tamil Nadu', state: 'Tamil Nadu', tags: ['Large Enterprise', 'AS9100D'] },
    { name: 'Godrej Precision Systems Div.', loc: 'Vikhroli, Mumbai', state: 'Maharashtra', tags: ['Large Enterprise', 'MII'] },
    { name: 'Zen Technologies Simulation Works', loc: 'Maheshwaram, Telangana', state: 'Telangana', tags: ['MSE', 'Make In India'] },
    { name: 'Alpha Design Technologies Ltd.', loc: 'Bengaluru, Karnataka', state: 'Karnataka', tags: ['MII Class-I', 'ISO 9001'] },
    { name: 'Astra Microwave Products Ltd.', loc: 'Ranga Reddy, Telangana', state: 'Telangana', tags: ['MSE', 'Defence Certified'] },
    { name: 'Dynamatic Technologies Aerospace', loc: 'Bengaluru, Karnataka', state: 'Karnataka', tags: ['Large Enterprise'] },
    { name: 'Sika Interplant Systems Ltd.', loc: 'Whitefield, Bengaluru', state: 'Karnataka', tags: ['MSE', 'MII'] },
    { name: 'Data Patterns India Limited', loc: 'Siruseri, Chennai', state: 'Tamil Nadu', tags: ['MSE', 'DPIIT'] },
    { name: 'Avantel Telecom Networks Ltd.', loc: 'Visakhapatnam, Andhra Pradesh', state: 'Andhra Pradesh', tags: ['MSE', 'MII Class-I'] },
    { name: 'Paras Defence & Space Tech', loc: 'Navi Mumbai, Maharashtra', state: 'Maharashtra', tags: ['MSE', 'MII Class-I'] },
    { name: 'Centum Electronics Ltd.', loc: 'Yelahanka, Bengaluru', state: 'Karnataka', tags: ['Large Enterprise'] },
    { name: 'Cyient DLM Electronics', loc: 'Mysuru, Karnataka', state: 'Karnataka', tags: ['MII Class-I'] },
    { name: 'Mistral Solutions Pvt. Ltd.', loc: 'Domlur, Bengaluru', state: 'Karnataka', tags: ['MSE', 'Startup'] },
    { name: 'Rossell Techsys Division', loc: 'Devenahalli, Bengaluru', state: 'Karnataka', tags: ['MSE', 'MII'] },
    { name: 'Apollo Microsystems Ltd.', loc: 'Kushaiguda, Hyderabad', state: 'Telangana', tags: ['MSE', 'MII Class-I'] },
    { name: 'Shivalik Bimetal Controls Ltd.', loc: 'Solan, Himachal Pradesh', state: 'Himachal Pradesh', tags: ['MSE'] },
    { name: 'Premier Explosives Propulsion', loc: 'Nalgonda, Telangana', state: 'Telangana', tags: ['PESO Certified'] },
    { name: 'PTC Industries Precision Castings', loc: 'Lucknow, Uttar Pradesh', state: 'Uttar Pradesh', tags: ['MSE', 'MII Class-I'] },
    { name: 'Ankit Aerospace Fasteners', loc: 'Peenya, Bengaluru', state: 'Karnataka', tags: ['MSE', 'AS9100'] },
    { name: 'Taneja Aerospace & Aviation Ltd.', loc: 'Thally, Tamil Nadu', state: 'Tamil Nadu', tags: ['MII'] },
    { name: 'Electronics Corporation of India', loc: 'Cherlapally, Hyderabad', state: 'Telangana', tags: ['CPSE', 'MII Class-I'] },
    { name: 'DCX Systems Wire Harness Works', loc: 'Bengaluru Rural, Karnataka', state: 'Karnataka', tags: ['MSE'] },
    { name: 'Accord Software & Systems Ltd.', loc: 'Indiranagar, Bengaluru', state: 'Karnataka', tags: ['MSE', 'NavIC Certified'] },
    { name: 'IdeaForge Technology Systems', loc: 'Mahape, Navi Mumbai', state: 'Maharashtra', tags: ['MSE', 'DPIIT Startup'] },
    { name: 'Newspace Research & Tech Ltd.', loc: 'HSR Layout, Bengaluru', state: 'Karnataka', tags: ['Startup', 'MII'] },
    { name: 'Tonbo Imaging Tactical Systems', loc: 'Hosur Road, Bengaluru', state: 'Karnataka', tags: ['MSE', 'MII Class-I'] },
    { name: 'Adani Defence Systems & Tech', loc: 'Kanpur, Uttar Pradesh', state: 'Uttar Pradesh', tags: ['Large Enterprise'] },
    { name: 'Solar Industries India Ltd.', loc: 'Nagpur, Maharashtra', state: 'Maharashtra', tags: ['PESO Certified', 'MII'] }
  ];

  greenNames.forEach((item, idx) => {
    const isL1 = idx === 0;
    const baseAmt = 4200000;
    const amt = baseAmt + idx * 28500;
    bidders.push({
      id: `bid-strat-grn-${idx + 1}`,
      rank: idx + 1,
      companyName: item.name,
      location: item.loc,
      state: item.state,
      bidAmount: amt,
      complianceScore: Math.round(99 - idx * 0.18),
      zone: 'green',
      status: isL1 ? 'Ideal Bid' : 'Compliant',
      internalTrustScore: isL1 ? 98.4 : +(98.0 - idx * 0.22).toFixed(1),
      isAiRecommended: isL1,
      tags: item.tags
    });
  });

  // Next 48 Bidders (35th to 82nd) -> ORANGE ZONE (Deficient / Missing Docs)
  const orangeCompanies = [
    { name: 'Marudhar Logistics & Fleet Mobility Pvt. Ltd.', loc: 'Bikaner, Rajasthan', state: 'Rajasthan', missing: ['Audited Turnover Certificate with valid ICAI UDIN'], tags: ['MSE', 'OBC'] },
    { name: 'Western Bio-Equipments LLP', loc: 'Chembur, Mumbai', state: 'Maharashtra', missing: ['OEM Authorization Form (Annexure-IV)', 'Annual ISO Calibration Certificate'], tags: ['MSE'] },
    { name: 'Deccan Express Logistics Pvt. Ltd.', loc: 'Nagpur, Maharashtra', state: 'Maharashtra', missing: ['EPFO Monthly ECR Electronic Challan (July 2026)'], tags: ['General'] },
    { name: 'Aravalli Carrier Systems Ltd.', loc: 'Udaipur, Rajasthan', state: 'Rajasthan', missing: ['Make In India Local Content Self-Declaration under Rule 144(xi)'], tags: ['MII Class-II'] },
    { name: 'Vidarbha Heavy Haulage Corp', loc: 'Amravati, Maharashtra', state: 'Maharashtra', missing: ['Bank Solvency Certificate on Scheduled Bank Letterhead'], tags: ['OBC', 'MSE'] },
    { name: 'Kolkata Heavy Machine Tools & Spares', loc: 'Howrah, West Bengal', state: 'West Bengal', missing: ['Chartered Accountant Net Worth Certificate'], tags: ['MSE'] },
    { name: 'Bengal Industrial & Transmission Gears', loc: 'Hooghly, West Bengal', state: 'West Bengal', missing: ['ESIC Employer Contribution Statement (Q1)'], tags: ['MSE', 'SC'] },
    { name: 'Eastern Precision Alloy Castings Ltd.', loc: 'Asansol, West Bengal', state: 'West Bengal', missing: ['Factory Inspectorate Renewal License Certificate'], tags: ['General'] },
    { name: 'Sahyadri Engineering & Tech Components', loc: 'Powai, Mumbai', state: 'Maharashtra', missing: ['Past Performance Satisfactory Completion Certificate'], tags: ['MSE'] },
    { name: 'Kalyani Mechanical Spares & Hydraulics', loc: 'Andheri, Mumbai', state: 'Maharashtra', missing: ['GST Returns Filing Reconciliation (GSTR-1 vs 3B)'], tags: ['MSE'] },
    { name: 'Himalayan Infra & Perimeter Protections', loc: 'Srinagar, J&K', state: 'Jammu & Kashmir', missing: ['Integrity Pact Notarized Stamp Paper Submission'], tags: ['MSE'] },
    { name: 'Kashmir Valley Construction Consortium', loc: 'Baramulla, J&K', state: 'Jammu & Kashmir', missing: ['Joint Venture Agreement Registration Deed'], tags: ['General'] },
    { name: 'Pir Panjal Defense Structures LLP', loc: 'Anantnag, J&K', state: 'Jammu & Kashmir', missing: ['Security Clearance Verification Annexure'], tags: ['MSE', 'OBC'] },
    { name: 'Northern Border Civil Engineers Ltd.', loc: 'Jammu, J&K', state: 'Jammu & Kashmir', missing: ['Audited Profit & Loss Statement FY 2025-26'], tags: ['MII'] },
    { name: 'Chinar Tactical Enclosures Pvt. Ltd.', loc: 'Budgam, J&K', state: 'Jammu & Kashmir', missing: ['Warranty Support Undertaking from Principal OEM'], tags: ['MSE'] }
  ];

  for (let i = 35; i <= 82; i++) {
    const template = orangeCompanies[(i - 35) % orangeCompanies.length];
    const amt = 5250000 + (i - 34) * 31000;
    const isMarudhar = i === 35;
    bidders.push({
      id: `bid-strat-orn-${i}`,
      rank: i,
      companyName: isMarudhar ? template.name : `${template.name} - Unit ${((i - 35) % 4) + 1}`,
      location: template.loc,
      state: template.state,
      bidAmount: amt,
      complianceScore: Math.round(78 - ((i - 35) * 0.35)),
      zone: 'orange',
      status: 'Missing Documents',
      internalTrustScore: +(72.0 - (i - 35) * 0.4).toFixed(1),
      missingDocuments: template.missing,
      reuploadedDocsCount: 0,
      bonusPointsEarned: 0,
      tags: template.tags
    });
  }

  // Bottom 18 Bidders (83rd to 100th) -> RED ZONE (Rejected Bids)
  const redCompanies = [
    { name: 'Vidarbha Supply Chain Solutions Ltd.', loc: 'MIDC Butibori, Nagpur', state: 'Maharashtra', reason: 'Forged CA UDIN (UDIN-2026-INVALID) & Consecutive GSTR-3B Return Defaults', penalty: -35.0, tags: ['Defaulter'] },
    { name: 'Apex Fake Lab Systems Pvt. Ltd.', loc: 'Chembur East, Mumbai', state: 'Maharashtra', reason: 'Debarred under GFR Rule 151 across CPPP for supplying uncalibrated apparatus', penalty: -50.0, tags: ['Debarred CPPP'] },
    { name: 'Prism Counterfeit Tech Spares', loc: 'Jaipur, Rajasthan', state: 'Rajasthan', reason: 'Forged OEM Authorization Letter with fraudulent seal', penalty: -45.0, tags: ['Forged OEM'] },
    { name: 'Shree Balaji Fraudulent Enterprises', loc: 'Ghaziabad, Uttar Pradesh', state: 'Uttar Pradesh', reason: 'Fake MSME Udyam Certificate; factory address non-existent during physical raid', penalty: -60.0, tags: ['Ghost Firm'] },
    { name: 'Matrix Shell Logistics LLP', loc: 'Kolkata, West Bengal', state: 'West Bengal', reason: 'Shell company flagged by FIU-IND with circular banking transactions', penalty: -55.0, tags: ['FIU Flagged'] },
    { name: 'Om Synthetic Hardware Traders', loc: 'Surat, Gujarat', state: 'Gujarat', reason: 'Non-submission of mandatory EMD & blacklisted in Gujarat eProcurement', penalty: -30.0, tags: ['Blacklisted'] }
  ];

  for (let i = 83; i <= 100; i++) {
    const template = redCompanies[(i - 83) % redCompanies.length];
    const amt = 6800000 + (i - 82) * 55000;
    bidders.push({
      id: `bid-strat-red-${i}`,
      rank: i,
      companyName: (i === 83 || i === 84) ? template.name : `${template.name} [Consortium ${i - 82}]`,
      location: template.loc,
      state: template.state,
      bidAmount: amt,
      complianceScore: Math.round(35 - ((i - 83) * 0.8)),
      zone: 'red',
      status: template.tags[0].includes('Debarred') ? 'Rejected - Debarred' : 'Rejected - Fake Docs',
      internalTrustScore: +(template.penalty - (i - 83) * 0.5).toFixed(1), // Internal negative trust score!
      negativeTrustPenalty: template.penalty,
      rejectionReason: template.reason,
      tags: template.tags
    });
  }

  return {
    tenderRef,
    totalBidsCount: 100,
    greenCutoffPercentile: 34,
    greenZoneCount: 34,
    orangeZoneCount: 48,
    redZoneCount: 18,
    cureWindowDays: 5,
    idealBidId: 'bid-strat-grn-1',
    bidders
  };
}
