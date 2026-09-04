import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  Upload,
  Calendar,
  Clock,
  Building2,
  FileCheck2,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  Lock,
  Stamp,
  Check,
  AlertCircle,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { BidderAccount, Tender } from '../types';
import { OutcomePreviewPaidFeature } from './OutcomePreviewPaidFeature';

interface BidderPortalViewProps {
  bidder: BidderAccount;
  activeTender: Tender;
  cureWindowDays: number;
}

export const BidderPortalView: React.FC<BidderPortalViewProps> = ({
  bidder,
  activeTender,
  cureWindowDays
}) => {
  // Configurable application timeline (5 weeks, 5 days, 6 days, 7 days, or 4 days ago)
  const defaultAppliedDuration = useMemo(() => {
    if (bidder.id === 'bidder-vidarbha-disq') return '5 weeks ago';
    if (bidder.id === 'bidder-western') return '7 days ago';
    if (bidder.id === 'bidder-marudhar') return '5 days ago';
    if (bidder.id === 'bidder-howrah-gears') return '4 days ago';
    return '6 days ago';
  }, [bidder.id]);

  const [appliedDuration, setAppliedDuration] = useState<string>(defaultAppliedDuration);

  // Application decision state: "staying" vs "withdrawn"
  const [bidderDecision, setBidderDecision] = useState<'staying' | 'withdrawn'>('staying');
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);

  // Local state for interactive re-upload of pending documents
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);
  const [bonusEarned, setBonusEarned] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);

  // Does this bidder have a pending document requirement?
  const hasPendingDocument = bidder.id === 'bidder-marudhar' || bidder.complianceScore < 90;

  // Missing documents list based on account
  const missingDocsList = bidder.id === 'bidder-marudhar'
    ? ['Audited Annual Turnover Certificate with valid ICAI UDIN (Annexure-III)']
    : bidder.complianceScore < 90
    ? ['OEM Authorization Form (Annexure-IV) with Principal Corporate Seal']
    : [];

  const deadlineDate = new Date(2026, 8, 4 + cureWindowDays).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const handleReuploadDoc = (docName: string) => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadedDocs(prev => [...prev, docName]);
      setBonusEarned(prev => prev + 2);
      setUploadSuccessMsg(`Document "${docName}" successfully authenticated. +2 remediation score added to your submission dossier.`);
    }, 700);
  };

  return (
    <div className="space-y-6 select-none font-sans" id="gem-bidder-portal-root">
      {/* Top Bidder Identity Banner - Sharp Rectangular Styling */}
      <div className="bg-[#002B49] text-white p-5 border-2 border-slate-800 shadow-md">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 font-mono font-black text-[10px] uppercase">
                REGISTERED VENDOR WORKSPACE
              </span>
              <span className="text-xs text-slate-300 font-mono">
                CPPP / GeM Unified Seller ID: {bidder.gstin}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-white uppercase tracking-wide">
              {bidder.companyName}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-0.5">
              <span>Authorized Person: <strong className="text-white">{bidder.contactPerson}</strong></span>
              <span>•</span>
              <span>Location: <strong className="text-white">{bidder.location}, {bidder.state}</strong></span>
              <span>•</span>
              <span>UDYAM: <strong className="text-amber-300 font-mono">{bidder.udyamNumber}</strong></span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="px-3 py-1 bg-slate-900 border border-slate-700 text-right">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Seller Classification:</div>
              <div className="text-xs font-bold text-amber-300">{bidder.tags.join(' • ')}</div>
            </div>
            <div className="text-[10px] text-slate-400 italic">
              Government Buyer Portals Handshake Status: <strong>Active</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Active Tender Context with Prominent Application Timeline Badge */}
      <div className="bg-white border-2 border-slate-300 p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-200">
          <div>
            <span className="text-[10px] font-mono font-bold bg-slate-800 text-white px-2 py-0.5 mr-2">
              TENDER REF: {activeTender.referenceNumber}
            </span>
            <span className="text-xs font-bold text-slate-900">{activeTender.title}</span>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5">
            Technical Evaluation Completed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700 mb-3">
          <div>Procuring Agency: <strong className="text-slate-900">{activeTender.organisation}</strong></div>
          <div>Department: <strong className="text-slate-900">{activeTender.department}</strong></div>
          <div>Contract Value: <strong className="text-slate-900 font-mono">₹{((activeTender.contractValue || 0) / 100000).toFixed(2)} Lakhs</strong></div>
        </div>

        {/* PROMINENT SUBMISSION TIMELINE BADGE (Applied 5 weeks, 5 days, 6 days, 7 days, or 4 days ago) */}
        <div className="p-3 bg-amber-50/70 border-2 border-amber-300 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-amber-900 font-medium">Submission Timestamp Record:</div>
              <div className="text-xs sm:text-sm font-black text-slate-900">
                You applied to this bid <span className="text-amber-800 underline decoration-amber-500 font-mono font-extrabold">{appliedDuration}</span>
              </div>
            </div>
          </div>

          {/* Quick interactive test pill to switch applied duration */}
          <div className="flex items-center gap-1 text-[10px]">
            <span className="text-slate-500 font-medium mr-1">Switch timeline:</span>
            {['4 days ago', '5 days ago', '6 days ago', '7 days ago', '5 weeks ago'].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setAppliedDuration(d)}
                className={`px-2 py-0.5 border text-[10px] font-mono transition-colors ${
                  appliedDuration === d
                    ? 'bg-[#002B49] text-white border-blue-950 font-bold'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SPECIAL CONVERSATIONAL HINDI / ENGLISH DOCUMENT PENDING CALLOUT BANNER */}
      {hasPendingDocument && (
        <div className="bg-amber-100 border-2 border-amber-500 p-5 text-amber-950 shadow-md">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-black">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-2 flex-1">
              {/* The exact Hindi quote requested */}
              <div className="inline-block px-3 py-1 bg-amber-300 border border-amber-500 text-slate-950 font-black text-sm sm:text-base tracking-wide font-hindi shadow-xs">
                “आपका अच्छा है, लेकिन आपका भाई साहब, ये document pending है”
              </div>

              <p className="text-xs text-amber-950 leading-relaxed font-medium">
                महोदय, आपकी कंपनी की बुनियादी योग्यता एवं तकनीकी साख (technical credentials) बहुत अच्छी है, लेकिन भाई साहब, नीचे दर्शाया गया यह आवश्यक दस्तावेज़ (supporting document) अभी लंबित (pending) है। निविदा के अंतिम वित्तीय मूल्यांकन में अपनी मजबूत स्थिति बनाए रखने के लिए आपको इसे निर्धारित समय-सीमा के भीतर तत्काल अपलोड करना होगा।
              </p>

              {/* Pending Documents Action Card */}
              <div className="mt-3 space-y-2">
                <div className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-700" />
                  <span>Pending Document Verification Requirements:</span>
                </div>

                {missingDocsList.map((doc, idx) => {
                  const isUploaded = uploadedDocs.includes(doc);
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 border-2 flex flex-wrap items-center justify-between gap-3 ${
                        isUploaded
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                          : 'bg-white border-amber-400 text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className={`w-4 h-4 shrink-0 ${isUploaded ? 'text-emerald-600' : 'text-amber-600'}`} />
                        <span className="text-xs font-bold">{doc}</span>
                      </div>

                      <div>
                        {isUploaded ? (
                          <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold font-mono flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5" />
                            <span>DOCUMENT UPLOADED & VERIFIED (+2 SCORE)</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleReuploadDoc(doc)}
                            disabled={isUploading}
                            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-black text-xs uppercase border border-amber-800 flex items-center gap-1.5 transition-colors shadow-xs"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{isUploading ? 'Validating ICAI/OEM Key...' : 'Upload Supporting Document Now'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {uploadSuccessMsg && (
                <div className="p-3 bg-emerald-100 border border-emerald-400 text-emerald-900 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{uploadSuccessMsg}</span>
                </div>
              )}

              <div className="text-[11px] text-amber-900 flex items-center gap-1 pt-1">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                <span>Auto-Allotted Cure Window: <strong>5 Days Remaining (Deadline: {deadlineDate} 17:00 IST)</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OFFICIAL GOVERNMENT NOTIFICATION LETTER (Proper Letterhead Format) */}
      <div className="bg-white border-2 border-slate-400 shadow-md p-6 sm:p-8 space-y-6" id="gem-bidder-formal-letter">
        {/* Tricolor top header */}
        <div className="h-1 flex -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-4">
          <div className="flex-1 bg-[#FF9933]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#138808]" />
        </div>

        {/* Letterhead Header */}
        <div className="border-b-2 border-slate-300 pb-4 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center border border-slate-400 p-1 bg-slate-50 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-800" fill="currentColor">
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="4" />
                <circle cx="50" cy="50" r="10" fill="currentColor" />
                {[...Array(24)].map((_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={50 + 42 * Math.cos((i * 15 * Math.PI) / 180)}
                    y2={50 + 42 * Math.sin((i * 15 * Math.PI) / 180)}
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                ))}
              </svg>
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                भारत सरकार • GOVERNMENT OF INDIA
              </div>
              <h2 className="text-sm sm:text-base font-black text-slate-900 uppercase">
                GeM 5.0 National Public Procurement Authority
              </h2>
              <p className="text-[11px] text-slate-600">
                Statutory Technical Evaluation Desk • Central Public Procurement Portal (CPPP)
              </p>
            </div>
          </div>

          <div className="text-right text-xs font-mono space-y-0.5">
            <div>Letter Memo: <strong className="text-slate-900">GEM/EVAL/2026/LTR-8910</strong></div>
            <div>Dispatch Date: <strong className="text-slate-900">04 September 2026</strong></div>
            <div>Security Hash: <strong className="text-slate-600">0x7F2A...9C14</strong></div>
          </div>
        </div>

        {/* Recipient Details */}
        <div className="text-xs text-slate-800 space-y-0.5 bg-slate-50 p-3 border border-slate-200">
          <div>To,</div>
          <div className="font-bold text-slate-900 text-sm">{bidder.companyName}</div>
          <div>Authorized Signatory: <span className="font-medium text-slate-800">{bidder.contactPerson}</span></div>
          <div>Registered GSTIN: <span className="font-mono text-slate-800">{bidder.gstin}</span> | UDYAM: <span className="font-mono text-slate-800">{bidder.udyamNumber}</span></div>
          <div>Registered Premises: <span className="text-slate-800">{bidder.location}, {bidder.state}</span></div>
        </div>

        {/* Formal Subject */}
        <div className="text-xs font-bold text-slate-900 border-l-4 border-[#002B49] pl-3 py-1 bg-slate-100/70">
          SUBJECT: Formal Intimation of Scrutiny & Stratification Review for Tender Ref: {activeTender.referenceNumber} ({activeTender.title})
        </div>

        {/* Letter Body containing all exact requested points */}
        <div className="text-xs sm:text-sm text-slate-800 space-y-4 leading-relaxed">
          <p className="font-medium text-slate-900">
            Dear Bidder,
          </p>

          <div className="space-y-3">
            {/* 1. Your application has been reviewed successfully. */}
            <div className="flex items-start gap-2.5">
              <span className="font-bold font-mono text-[#002B49] shrink-0">1.</span>
              <p>
                <strong className="text-slate-950 font-bold">Your application has been reviewed successfully.</strong> The technical scrutiny committee and automated statutory verification systems have verified your bid submission against the published qualification criteria.
              </p>
            </div>

            {/* 2. Based on the stratification of the bidders in the same tender, the procurement has been completed. */}
            <div className="flex items-start gap-2.5">
              <span className="font-bold font-mono text-[#002B49] shrink-0">2.</span>
              <p>
                <strong className="text-slate-950 font-bold">Based on the stratification of the bidders in the same tender, the procurement evaluation has been completed.</strong> All participating bids received across ministries and public sector undertakings have been categorized in strict conformity with General Financial Rules (GFR) 2017.
              </p>
            </div>

            {/* 3. The chances of you getting this tender are high. */}
            <div className="flex items-start gap-2.5">
              <span className="font-bold font-mono text-[#002B49] shrink-0">3.</span>
              <p>
                <strong className="text-emerald-800 font-bold">The chances of you getting this tender are high.</strong> Your technical conformity, statutory declarations (GSTN, EPFO, MSME Udyam, Make in India local content), and evaluated rates place your bid in an advantageous competitive position for final award upon commercial unsealing.
              </p>
            </div>

            {/* 4. You may stay on this tender or leave it right now. */}
            <div className="flex items-start gap-2.5">
              <span className="font-bold font-mono text-[#002B49] shrink-0">4.</span>
              <p>
                <strong className="text-slate-950 font-bold">You may stay on this tender or leave it right now.</strong> Under statutory procurement guidelines, you possess the autonomous right to maintain your active bid participation or withdraw your quotation prior to final commercial decryption.
              </p>
            </div>

            {/* 5. Change or withdraw your decision. */}
            <div className="flex items-start gap-2.5">
              <span className="font-bold font-mono text-[#002B49] shrink-0">5.</span>
              <div className="space-y-2 flex-1">
                <p>
                  <strong className="text-slate-950 font-bold">Change or withdraw your decision:</strong> You can confirm your active bid participation or exercise your formal right of withdrawal using the decision controls below.
                </p>

                {/* Interactive Decision Control Box */}
                <div className="p-3.5 bg-slate-50 border-2 border-slate-300 flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-bold text-slate-500 uppercase">Current Bidder Participation Status:</div>
                    <div className="flex items-center gap-2">
                      {bidderDecision === 'staying' ? (
                        <span className="px-2.5 py-1 bg-emerald-600 text-white font-mono font-bold text-xs flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5" />
                          <span>STAYING ON THIS TENDER (ACTIVE PARTICIPANT)</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-rose-600 text-white font-mono font-bold text-xs flex items-center gap-1.5">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>WITHDRAWN BY BIDDER</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {bidderDecision === 'staying' ? (
                      <button
                        type="button"
                        onClick={() => setShowWithdrawModal(true)}
                        className="px-4 py-2 border border-slate-400 bg-white hover:bg-rose-50 text-rose-800 text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
                      >
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Change or Withdraw Your Decision</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setBidderDecision('staying')}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Re-Confirm: Stay on This Tender</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Upload any supporting documents required above. */}
            <div className="flex items-start gap-2.5">
              <span className="font-bold font-mono text-[#002B49] shrink-0">6.</span>
              <p>
                <strong className="text-slate-950 font-bold">Upload any supporting documents required above.</strong> In the event that any supplementary document, OEM endorsement, or CA turnover certificate has been flagged, please utilize the cure window upload interface above to submit the verified files.
              </p>
            </div>
          </div>
        </div>

        {/* Letter Signoff & Digital Signature Verification */}
        <div className="pt-6 border-t-2 border-slate-200 flex flex-wrap items-end justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="text-[10px] text-slate-500 font-bold uppercase">Digital Authentication Stamp:</div>
            <div className="flex items-center gap-2 text-emerald-800 font-mono font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>CRYPTOGRAPHICALLY SEALED • GFR 2017 RULE 149(viii)</span>
            </div>
            <div className="text-[10px] text-slate-500">
              Note: Confidential officer evaluation vectors and zone stratification matrices remain protected under central procurement rules.
            </div>
          </div>

          <div className="text-right space-y-1">
            <div className="font-bold text-slate-900">Sd/-</div>
            <div className="font-bold text-slate-950 text-xs">Competent Procurement Evaluation Authority</div>
            <div className="text-[11px] text-slate-600">Central Public Procurement Division • GeM 5.0</div>
          </div>
        </div>
      </div>

      {/* WITHDRAWAL MODAL */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-slate-800 max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-rose-700">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <h3 className="font-black text-base text-slate-900">Confirm Bid Withdrawal Decision</h3>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              Are you sure you want to withdraw your bid from <strong>Tender Ref: {activeTender.referenceNumber}</strong>? Once withdrawn, your bid will be excluded from the final financial unsealing and award consideration.
            </p>

            <div className="p-3 bg-amber-50 border border-amber-300 text-xs text-amber-900">
              Note: Under GFR rules, voluntary withdrawal before financial opening does not attract any EMD forfeiture or debarment penalty.
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowWithdrawModal(false)}
                className="px-4 py-2 border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel (Keep Active)
              </button>

              <button
                type="button"
                onClick={() => {
                  setBidderDecision('withdrawn');
                  setShowWithdrawModal(false);
                }}
                className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold transition-colors"
              >
                Yes, Withdraw My Bid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEXT PART: OUTCOME PREVIEW (PAID FEATURE) */}
      <OutcomePreviewPaidFeature
        bidder={bidder}
        activeTender={activeTender}
        hasUploadedPendingDoc={uploadedDocs.length > 0}
      />

      {/* Bidder Document Repository Status (DigiLocker & Handshakes) */}
      <div className="bg-white border-2 border-slate-300 p-5 shadow-xs">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-blue-900" />
          <span>Submitted Document Dossier & DigiLocker Handshake Verification</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200">
            <div className="text-[10px] text-slate-500 font-bold uppercase">GSTN Registration</div>
            <div className="font-mono font-bold text-slate-900 mt-0.5">{bidder.gstin}</div>
            <div className="text-[10px] text-emerald-600 font-bold mt-1">✓ Active & Verified</div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200">
            <div className="text-[10px] text-slate-500 font-bold uppercase">Permanent Account No. (PAN)</div>
            <div className="font-mono font-bold text-slate-900 mt-0.5">{bidder.pan}</div>
            <div className="text-[10px] text-emerald-600 font-bold mt-1">✓ CBDT Match Verified</div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200">
            <div className="text-[10px] text-slate-500 font-bold uppercase">MSME Udyam Certificate</div>
            <div className="font-mono font-bold text-slate-900 mt-0.5">{bidder.udyamNumber}</div>
            <div className="text-[10px] text-emerald-600 font-bold mt-1">✓ MSME Portal Validated</div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200">
            <div className="text-[10px] text-slate-500 font-bold uppercase">Class-3 DSC Token</div>
            <div className="font-mono font-bold text-slate-900 mt-0.5">NIC-CA-2026-TOKEN</div>
            <div className="text-[10px] text-emerald-600 font-bold mt-1">✓ Valid till Dec 2027</div>
          </div>
        </div>
      </div>
    </div>
  );
};
