import { Tender, Bidder } from '../types';
import { generateBidderComplianceDocuments } from './mockComplianceDocs';

const BACKUP_BIDDERS_BY_CATEGORY: Record<string, { companyName: string; location: string; state: string; tags: string[] }[]> = {
  Services: [
    { companyName: 'Shree Karni Multimodal Fleet Services', location: 'Jodhpur, Rajasthan', state: 'Rajasthan', tags: ['MSE', 'MII Class-I'] },
    { companyName: 'Western Corridor Freightways LLP', location: 'Jaipur, Rajasthan', state: 'Rajasthan', tags: ['MSE', 'General'] },
    { companyName: 'Deccan Express Logistics Pvt. Ltd.', location: 'Nagpur, Maharashtra', state: 'Maharashtra', tags: ['General'] },
    { companyName: 'Aravalli Carrier Systems Ltd.', location: 'Udaipur, Rajasthan', state: 'Rajasthan', tags: ['MII Class-I'] },
    { companyName: 'Vidarbha Heavy Haulage Corp', location: 'Amravati, Maharashtra', state: 'Maharashtra', tags: ['OBC', 'MSE'] }
  ],
  Goods: [
    { companyName: 'Kolkata Heavy Machine Tools & Spares', location: 'Howrah, West Bengal', state: 'West Bengal', tags: ['MSE', 'MII Class-I'] },
    { companyName: 'Bengal Industrial & Transmission Gears', location: 'Hooghly, West Bengal', state: 'West Bengal', tags: ['MSE', 'SC'] },
    { companyName: 'Eastern Precision Alloy Castings Ltd.', location: 'Asansol, West Bengal', state: 'West Bengal', tags: ['General'] },
    { companyName: 'Sahyadri Engineering & Tech Components', location: 'Powai, Mumbai', state: 'Maharashtra', tags: ['MSE', 'MII Class-I'] },
    { companyName: 'Kalyani Mechanical Spares & Hydraulics', location: 'Andheri, Mumbai', state: 'Maharashtra', tags: ['MSE', 'General'] }
  ],
  Works: [
    { companyName: 'Himalayan Infra & Perimeter Protections', location: 'Srinagar, J&K', state: 'Jammu And Kashmir', tags: ['MSE', 'MII Class-I'] },
    { companyName: 'Kashmir Valley Construction Consortium', location: 'Baramulla, J&K', state: 'Jammu And Kashmir', tags: ['General'] },
    { companyName: 'Pir Panjal Defense Structures LLP', location: 'Anantnag, J&K', state: 'Jammu And Kashmir', tags: ['MSE', 'OBC'] },
    { companyName: 'Northern Border Civil Engineers Ltd.', location: 'Jammu, J&K', state: 'Jammu And Kashmir', tags: ['MII Class-I'] },
    { companyName: 'Chinar Tactical Enclosures Pvt. Ltd.', location: 'Budgam, J&K', state: 'Jammu And Kashmir', tags: ['MSE'] }
  ]
};

export function enrichTendersWith5Bidders(rawTenders: Tender[]): Tender[] {
  return rawTenders.map((tender) => {
    let currentBids = [...tender.bids];
    const categoryKey = tender.tenderCategory || 'Goods';
    const fallbackList = BACKUP_BIDDERS_BY_CATEGORY[categoryKey] || BACKUP_BIDDERS_BY_CATEGORY['Goods'];

    // Ensure exactly 5 bidders per tender
    while (currentBids.length < 5) {
      const rankIndex = currentBids.length + 1;
      const rankStr = `L${rankIndex}` as Bidder['rank'];
      const fallback = fallbackList[(rankIndex - 1) % fallbackList.length];
      const baseAmount = tender.contractValue || tender.tenderValue || 1000000;
      const multiplier = 1 + (rankIndex - 1) * 0.045; // slightly higher price for L2, L3, L4, L5
      const calculatedAmount = Math.round(baseAmount * multiplier);

      const isAnomaly = rankIndex === 5; // Make L5 bidder anomalous for realistic audit demonstration

      const newBidder: Bidder = {
        id: `bid-${tender.tenderId}-${rankIndex}`,
        companyName: fallback.companyName,
        location: fallback.location,
        state: fallback.state,
        bidNumber: `GEM-${tender.tenderId}-${rankIndex * 7}`,
        amount: calculatedAmount,
        quotedAmount: calculatedAmount,
        rank: rankStr,
        status: isAnomaly ? 'Disqualified' : 'Qualified',
        isAwarded: rankIndex === 1,
        tags: fallback.tags,
        phone: `+91 ${98200 + rankIndex} *****`,
        email: `contracts@${fallback.companyName.toLowerCase().replace(/[^a-z]/g, '').substring(0, 12)}.gov.in`,
        verificationData: {
          complianceScore: isAnomaly ? 41 : Math.max(78, 98 - (rankIndex - 1) * 4),
          riskLevel: isAnomaly ? 'High' : (rankIndex > 3 ? 'Medium' : 'Low'),
          recommendation: isAnomaly ? 'Disqualified' : 'Qualified',
          recommendationReason: isAnomaly
            ? 'Critical anomalies detected: Statutory labor declarations omitted and CPPP holiday listing match flagged.'
            : `Statutory parameters verified compliant. Bid rank is ${rankStr}.`,
          gapsAndDiscrepancies: isAnomaly
            ? ['Omission of mandatory Child Labour Act Section 14 statutory declaration', 'Variance > 40% on Minimum Wages compliance undertaking']
            : [],
          keyHighlights: isAnomaly
            ? ['Flagged for review under Rule 144(xi) GFR 2017']
            : ['GSTN active', 'Udyam valid', 'EPFO return cleared'],
          statutoryChecks: {
            gstnStatus: isAnomaly ? 'Return Default Detected' : 'Active & Filing Up-to-date',
            gstinNumber: `27AA${rankIndex}C${Math.floor(1000 + rankIndex * 892)}K1Z${rankIndex}`,
            udyamRegistration: `UDYAM-${fallback.state.substring(0, 2).toUpperCase()}-09-00${19280 + rankIndex}`,
            udyamCategory: rankIndex % 2 === 0 ? 'Small' : 'Micro',
            panNumber: `AA${fallback.state.substring(0, 2).toUpperCase()}${1000 + rankIndex}K`,
            panItrStatus: isAnomaly ? 'Defective ITR' : 'Verified (3 Yrs Filed)',
            makeInIndiaPercentage: isAnomaly ? 32 : 84.5,
            epfoStatus: isAnomaly ? 'Non-Compliant' : 'Compliant (42 Employees)',
            esicStatus: 'Active & Contributions Paid',
            debarmentStatus: isAnomaly ? 'FLAGGED - Debarred by MoD' : 'Clean (No Blacklist in CPPP/GeM)',
            startupDpiit: false,
            oemAuthorizationValid: !isAnomaly
          },
          handshakes: [
            { portal: 'GSTN Gateway', portalCode: 'GSTN', status: isAnomaly ? 'flagged' : 'verified', responseTimeMs: 140, resultSummary: isAnomaly ? 'Return Default Flagged' : 'Taxpayer Active', matchedId: 'GST-VERIFIED' },
            { portal: 'Udyam Registration Portal', portalCode: 'UDYAM', status: 'verified', responseTimeMs: 180, resultSummary: 'MSME Validated', matchedId: 'UDYAM-MATCH' },
            { portal: 'Income Tax e-Filing API', portalCode: 'INCOME_TAX', status: isAnomaly ? 'flagged' : 'verified', responseTimeMs: 210, resultSummary: isAnomaly ? 'ITR-V Defective' : 'ITR-V Verified', matchedId: 'PAN-MATCH' },
            { portal: 'EPFO Compliance Gateway', portalCode: 'EPFO_ESIC', status: isAnomaly ? 'flagged' : 'verified', responseTimeMs: 160, resultSummary: isAnomaly ? 'ECR Default' : 'ECR Cleared', matchedId: 'EPFO-MATCH' },
            { portal: 'DigiLocker National Vault', portalCode: 'DIGILOCKER', status: 'verified', responseTimeMs: 115, resultSummary: 'Certificates Authenticated', matchedId: 'DL-DOC' },
            { portal: 'CPPP Central Debarment List', portalCode: 'DEBARMENT_REGISTRY', status: isAnomaly ? 'flagged' : 'verified', responseTimeMs: 90, resultSummary: isAnomaly ? 'Banned in CPPP' : 'Clear Record', matchedId: 'CPPP-CLEAR' }
          ],
          documents: []
        }
      };

      currentBids.push(newBidder);
    }

    // Now populate 23 complianceDocuments for all 5 bidders!
    currentBids = currentBids.map((b) => {
      const isAnomaly = b.verificationData.riskLevel === 'High' || b.status === 'Disqualified' || (b.rank === 'L5');
      const docs = generateBidderComplianceDocuments(b.id, b.companyName, b.location, isAnomaly);
      return {
        ...b,
        complianceDocuments: docs
      };
    });

    return {
      ...tender,
      bids: currentBids
    };
  });
}
