import React, { useState } from 'react';
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
  Lock
} from 'lucide-react';
import { BidderAccount, Tender } from '../types';

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
  // Determine if this bidder is Green, Orange, or Red based on their profile
  const isGreen = bidder.complianceScore >= 92;
  const isOrange = bidder.complianceScore >= 60 && bidder.complianceScore < 92;
  const isRed = bidder.complianceScore < 60;

  // Local state for interactive re-upload in Orange Zone
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);
  const [bonusEarned, setBonusEarned] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);

  // Missing documents based on account
  const missingDocsList = bidder.id === 'bidder-marudhar'
    ? ['1 Document Pending: Audited Annual Turnover Certificate with valid ICAI UDIN']
    : bidder.id === 'bidder-sahyadri'
    ? []
    : bidder.id === 'bidder-vidarbha-disq'
    ? ['Statutory Disqualification: Forged CA UDIN & GSTR-3B default notice under Rule 151']
    : ['1 Document Pending: OEM Authorization Form (Annexure-IV) with Principal Seal'];

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
      setUploadSuccessMsg(`Document successfully uploaded within cure window. +2 score improvement recorded by system.`);
    }, 700);
  };

  return (
    <div className="space-y-5 select-none font-sans" id="gem-bidder-portal-root">
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

      {/* Active Tender Context */}
      <div className="bg-white border-2 border-slate-300 p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-200">
          <div>
            <span className="text-[10px] font-mono font-bold bg-slate-800 text-white px-2 py-0.5 mr-2">
              TENDER REF: {activeTender.referenceNumber}
            </span>
            <span className="text-xs font-bold text-slate-900">{activeTender.title}</span>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5">
            Technical Evaluation In Progress
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
          <div>Procuring Agency: <strong className="text-slate-900">{activeTender.organisation}</strong></div>
          <div>Department: <strong className="text-slate-900">{activeTender.department}</strong></div>
          <div>Contract Value: <strong className="text-slate-900 font-mono">₹{((activeTender.contractValue || 0) / 100000).toFixed(2)} Lakhs</strong></div>
        </div>
      </div>

      {/* Primary Status Banner: Green / Orange / Red Zone */}
      {isGreen && (
        <div className="bg-emerald-50 border-2 border-emerald-600 p-5 text-emerald-950 shadow-md">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-emerald-600 text-white font-mono font-black text-xs uppercase tracking-wider">
                  CURRENT STATUS: GREEN ZONE (TOP 34TH PERCENTILE)
                </span>
                <span className="text-xs font-bold text-emerald-800">
                  Ideal Competitive Evaluation Range
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-emerald-900">
                Your Bid Lies in the Green Zone for Active Tender Evaluation
              </h2>

              <p className="text-xs text-emerald-800 leading-relaxed">
                All statutory prerequisites and Annexure-1 compliance parameters (GSTN filing, UDYAM registration, CA audited balance sheets, and Make in India local content) have been successfully authenticated by the Government Procurement Officer. Your bid is currently positioned in the final decision consideration pool.
              </p>

              <div className="p-3 bg-white border border-emerald-300 text-xs space-y-1 text-slate-800">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Next Steps for Registered Seller:</span>
                </div>
                <div>1. Ensure Class-3 Digital Signature Certificate (DSC) remains valid and active.</div>
                <div>2. Keep original Bank Guarantee (EMD) and OEM Undertakings ready for contract signing upon financial opening.</div>
                <div>3. Check portal notifications for any minor clarification queries dispatched by the Buyer.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isOrange && (
        <div className="bg-amber-50 border-2 border-amber-500 p-5 text-amber-950 shadow-md">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-black">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-mono font-black text-xs uppercase tracking-wider">
                  CURRENT STATUS: ORANGE ZONE (ACTION REQUIRED)
                </span>
                <span className="text-xs font-bold text-amber-900">
                  Equal Opportunity Cure Window Active
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-amber-950">
                Your Bid Lies in the Orange Zone: Business Documents Missing or Pending Verification
              </h2>

              <p className="text-xs text-amber-900 leading-relaxed">
                Under <strong>General Financial Rules (GFR) Rule 149(viii) Equal Opportunity Protocol</strong>, you have been auto-allotted a formal cure window to rectify deficient business documents and maintain compliance parity.
              </p>

              {/* 5-Days Window Alert Box */}
              <div className="p-3 bg-white border-2 border-amber-400 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Auto-Allotted Cure Window: <strong>{cureWindowDays} Days Remaining</strong></span>
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    Final submission deadline for missing documents: <strong className="text-slate-900">{deadlineDate} 17:00 IST</strong>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2 py-1 bg-amber-100 text-amber-900 text-xs font-mono font-bold border border-amber-300">
                    WINDOW ALLOTTED BY SYSTEM
                  </span>
                </div>
              </div>

              {/* Deficient Documents List */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                  Pending Document Requirements:
                </div>
                {missingDocsList.map((doc, idx) => {
                  const isUploaded = uploadedDocs.includes(doc);
                  return (
                    <div
                      key={idx}
                      className={`p-3 border flex flex-wrap items-center justify-between gap-3 ${
                        isUploaded
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                          : 'bg-white border-slate-300 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className={`w-4 h-4 ${isUploaded ? 'text-emerald-600' : 'text-amber-600'}`} />
                        <span className="text-xs font-semibold">{doc}</span>
                      </div>

                      <div>
                        {isUploaded ? (
                          <span className="px-2.5 py-1 bg-emerald-600 text-white text-[11px] font-bold font-mono">
                            ✓ RE-UPLOADED (+2 SCORE IMPROVEMENT)
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleReuploadDoc(doc)}
                            disabled={isUploading}
                            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase border border-amber-800 flex items-center gap-1.5 transition-colors shadow-xs"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{isUploading ? 'Uploading...' : 'Re-Upload Now'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {uploadSuccessMsg && (
                <div className="p-3 bg-emerald-100 border border-emerald-400 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{uploadSuccessMsg}</span>
                </div>
              )}

              {/* How to Improve Guidance */}
              <div className="p-3 bg-amber-100/70 border border-amber-300 text-xs text-amber-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-700" />
                  <span>How to Improve Your Compliance Standing:</span>
                </div>
                <p className="text-[11px] text-amber-900 leading-relaxed">
                  Submitting your pending documents within this 5-day cure window automatically adds verified remediation credits (+2 score improvement) to your audit dossier. Documents must be signed with the registered Class-3 digital key and bear valid ICAI UDIN numbers where applicable.
                </p>
                <div className="text-[10px] text-slate-600 italic">
                  Note: In compliance with GeM privacy protocols, internal officer trust scores are kept confidential and not revealed to bidders.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isRed && (
        <div className="bg-rose-50 border-2 border-rose-600 p-5 text-rose-950 shadow-md">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-rose-600 text-white flex items-center justify-center shrink-0">
              <XCircle className="w-6 h-6" />
            </div>
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-rose-600 text-white font-mono font-black text-xs uppercase tracking-wider">
                  CURRENT STATUS: RED ZONE (DISQUALIFIED)
                </span>
                <span className="text-xs font-bold text-rose-800">
                  Statutory Rejection Recorded
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-rose-950">
                Your Tender Has Been Rejected Due to Critical Non-Compliance
              </h2>

              <p className="text-xs text-rose-900 leading-relaxed">
                During the automated inter-portal verification handshake, discrepancies were flagged regarding statutory authenticity under <strong>Rule 151 of General Financial Rules (GFR), 2017</strong>.
              </p>

              <div className="p-3 bg-white border border-rose-300 text-xs space-y-1">
                <div className="font-bold text-rose-900">Grounds for Disqualification:</div>
                <div className="text-slate-800 font-mono">
                  • Statutory GSTR-3B Return Defaults flagged by GSTN API gateway
                </div>
                <div className="text-slate-800 font-mono">
                  • Invalid / unverified ICAI UDIN number on annual financial declaration
                </div>
              </div>

              <div className="p-3 bg-rose-100 border border-rose-300 text-xs text-rose-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-700" />
                  <span>Statutory Impact on Organization Profile:</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Your organizational compliance record in the central procurement database might have been affected due to this rejection. If you believe this determination was made in error, you are entitled to file a formal statutory appeal with the Competent Appellate Authority within 14 calendar days from notification.
                </p>
                <div className="text-[10px] text-slate-600 italic">
                  Note: Specific internal trust scoring vectors are strictly confidential to government evaluating officers and cannot be displayed on vendor portals.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bidder Document Repository Status */}
      <div className="bg-white border-2 border-slate-300 p-5 shadow-xs">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-blue-900" />
          <span>Submitted Document Dossier & DigiLocker Handshake Verification</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200">
            <div className="text-[10px] text-slate-500 font-bold uppercase">GSTN Registration</div>
            <div className="font-mono font-bold text-slate-900 mt-0.5">{bidder.gstin}</div>
            <div className={`text-[10px] font-bold mt-1 ${isRed ? 'text-rose-600' : 'text-emerald-600'}`}>
              {isRed ? '✕ Return Defaults Flagged' : '✓ Active & Verified'}
            </div>
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
