export type PortalName = 'gem' | 'cppp' | 'etenders' | 'railways';

export type TenderCategory = 'Goods' | 'Services' | 'Works';

export type TenderStatus = 'aoc' | 'financial_bid_opening' | 'financial_evaluation' | 'technical_evaluation' | 'active';

export interface BidderDocument {
  id: string;
  name: string;
  type: 'udyam' | 'gst' | 'itr' | 'pan' | 'mii_declaration' | 'oem_auth' | 'epfo_esic' | 'balance_sheet';
  status: 'verified' | 'discrepancy' | 'missing' | 'pending';
  fileSize: string;
  digiLockerVerified: boolean;
  hash: string;
  extractedData?: Record<string, string | number>;
  notes?: string;
}

export interface PortalHandshake {
  portal: string;
  portalCode: 'GSTN' | 'UDYAM' | 'INCOME_TAX' | 'MCA21' | 'EPFO_ESIC' | 'DIGILOCKER' | 'DEBARMENT_REGISTRY' | 'DPIIT';
  status: 'connected' | 'checking' | 'verified' | 'flagged';
  responseTimeMs: number;
  resultSummary: string;
  matchedId: string;
}

export interface ComplianceScoreBreakdown {
  statutoryRegistration: number; // Max 25
  financialSoundness: number;    // Max 25
  technicalEligibility: number;  // Max 25
  pastPerformanceIntegrity: number; // Max 25
}

export interface BidderVerificationData {
  complianceScore: number; // 0 - 100
  riskLevel: 'Low' | 'Medium' | 'High';
  recommendation: 'Qualified' | 'Disqualified' | 'Clarification Required';
  recommendationReason: string;
  gapsAndDiscrepancies: string[];
  keyHighlights: string[];
  statutoryChecks: {
    gstnStatus: 'Active & Filing Up-to-date' | 'Return Default Detected' | 'Suspended';
    gstinNumber: string;
    udyamRegistration: string;
    udyamCategory: 'Micro' | 'Small' | 'Medium' | 'Not Registered';
    panNumber: string;
    panItrStatus: 'Verified (3 Yrs Filed)' | 'Pending Verification' | 'Defective ITR';
    makeInIndiaPercentage: number;
    epfoStatus: 'Compliant (148 Employees)' | 'Compliant (42 Employees)' | 'Exempt / Not Applicable' | 'Non-Compliant';
    esicStatus: 'Active & Contributions Paid' | 'Exempt';
    debarmentStatus: 'Clean (No Blacklist in CPPP/GeM)' | 'FLAGGED - Debarred by MoD' | 'Clean';
    startupDpiit: boolean;
    oemAuthorizationValid: boolean;
  };
  handshakes: PortalHandshake[];
  documents: BidderDocument[];
  officerDecision?: {
    action: 'Approved' | 'Disqualified' | 'Clarification_Sought';
    officerName: string;
    officerDesignation: string;
    timestamp: string;
    remarks: string;
    blockchainTxHash: string;
  };
}

export interface Bidder {
  id: string;
  companyName: string;
  location: string;
  state: string;
  bidNumber: string;
  amount?: number;
  quotedAmount?: number;
  awardedAmount?: number;
  rank?: 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6' | 'L7' | 'L8' | 'L9' | 'L10';
  status: 'Qualified' | 'Disqualified' | 'Under Review';
  remarks?: string;
  isAwarded?: boolean;
  isMasked?: boolean;
  tags: string[]; // e.g. ["MSE", "MII", "OBC", "General", "SC", "ST"]
  contactUnlocked?: boolean;
  phone?: string;
  email?: string;
  verificationData: BidderVerificationData;
}

export interface TenderItem {
  name: string;
  quantity: number | string;
  deliveryLocation: string;
  specification?: string;
}

export interface Tender {
  id: string;
  tenderId: string;
  referenceNumber: string;
  title: string;
  description: string;
  organisation: string;
  department: string;
  division: string;
  location: string;
  state: string;
  city: string;
  pincode?: number;
  tenderValue?: number;
  contractValue?: number;
  emdValue?: number;
  tenderType: 'Single Packet Bid' | 'Two Packet Bid';
  tenderCategory: TenderCategory;
  gemBidType: 'boq' | 'service' | 'product' | 'product_custom';
  status: TenderStatus;
  publishDate: string;
  closingDate: string;
  openingDate: string;
  lastActivityAt: string;
  corrigendumCount?: number;
  beneficiary?: string;
  eligibility: {
    experienceYears: number;
    minTurnoverLakhs: number;
    purchasePreference: string[];
  };
  items: TenderItem[];
  bids: Bidder[];
}

export interface BlockchainBlock {
  blockNumber: number;
  timestamp: string;
  previousHash: string;
  hash: string;
  nonce: number;
  merkleRoot: string;
  tenderRef: string;
  event: string;
  verifiedBy: string;
  bidderName: string;
  complianceScore: number;
  status: 'VALID' | 'PENDING';
}

export interface TreeNode {
  id: string;
  label: string;
  labelHindi?: string;
  description: string;
  category: 'statutory' | 'entity' | 'technical' | 'labor' | 'decision' | 'officer';
  status: 'passed' | 'warning' | 'failed' | 'pending';
  details: string;
  scoreImpact: string;
  children?: TreeNode[];
}
