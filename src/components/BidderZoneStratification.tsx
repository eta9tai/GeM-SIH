import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  Calendar,
  Clock,
  Plus,
  ArrowRight,
  ChevronRight,
  Building2,
  FileText,
  FileCheck2,
  Upload,
  RefreshCw,
  Search,
  Filter,
  Layers,
  Lock,
  Award,
  Zap,
  Info
} from 'lucide-react';
import { Tender, ProcurementOfficer } from '../types';
import { StratificationSummary, StratifiedBidder, generate100StratifiedBidders } from '../data/mockStratificationData';

interface BidderZoneStratificationProps {
  tender: Tender;
  officer: ProcurementOfficer;
  onProceedToDecisionTree: () => void;
  onBackToCompliance: () => void;
}

export const BidderZoneStratification: React.FC<BidderZoneStratificationProps> = ({
  tender,
  officer,
  onProceedToDecisionTree,
  onBackToCompliance
}) => {
  // Generate 100 bidders data for this tender
  const initialStratification = useMemo(() => {
    return generate100StratifiedBidders(tender.referenceNumber);
  }, [tender.referenceNumber]);

  const [stratificationData, setStratificationData] = useState<StratificationSummary>(initialStratification);
  const [activeZoneTab, setActiveZoneTab] = useState<'all' | 'green' | 'orange' | 'red'>('all');
  const [cureWindowDays, setCureWindowDays] = useState<number>(5);
  const [extensionCount, setExtensionCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSimulatingSort, setIsSimulatingSort] = useState<boolean>(false);
  const [clarificationNoticeSent, setClarificationNoticeSent] = useState<string | null>(null);

  // Extend 5-day cure window
  const handleExtend5Days = () => {
    setCureWindowDays(prev => prev + 5);
    setExtensionCount(prev => prev + 1);
  };

  // Simulate vendor re-upload in Orange zone -> +2 score boost without moving to green zone
  const handleSimulateReupload = (bidderId: string) => {
    setStratificationData(prev => {
      const updatedBidders = prev.bidders.map(b => {
        if (b.id === bidderId) {
          const newBonus = (b.bonusPointsEarned || 0) + 2;
          return {
            ...b,
            complianceScore: Math.min(88, b.complianceScore + 2),
            bonusPointsEarned: newBonus,
            reuploadedDocsCount: (b.reuploadedDocsCount || 0) + 1,
            status: 'Compliant' as const
          };
        }
        return b;
      });
      return { ...prev, bidders: updatedBidders };
    });
  };

  // Re-run sorting animation
  const handleRerunSort = () => {
    setIsSimulatingSort(true);
    setTimeout(() => {
      setIsSimulatingSort(false);
    }, 800);
  };

  // Request minor clarification for Green zone bidder
  const handleRequestClarification = (bidderName: string) => {
    setClarificationNoticeSent(`Clarification query dispatched to ${bidderName} via GeM Portal (24-hr turnaround).`);
    setTimeout(() => {
      setClarificationNoticeSent(null);
    }, 4000);
  };

  // Filtered bidders
  const filteredBidders = useMemo(() => {
    return stratificationData.bidders.filter(b => {
      if (activeZoneTab !== 'all' && b.zone !== activeZoneTab) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          b.companyName.toLowerCase().includes(q) ||
          b.location.toLowerCase().includes(q) ||
          b.state.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [stratificationData.bidders, activeZoneTab, searchQuery]);

  // AI recommended bidder
  const idealBidder = stratificationData.bidders.find(b => b.isAiRecommended) || stratificationData.bidders[0];

  // Calculate dynamic deadline date based on cureWindowDays
  const deadlineDate = useMemo(() => {
    const d = new Date(2026, 8, 4 + cureWindowDays); // Sept 2026
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }, [cureWindowDays]);

  return (
    <div className="space-y-5 select-none font-sans" id="bidder-zone-stratification-root">
      {/* Top Stratification Protocol Banner */}
      <div className="bg-[#002B49] text-white p-5 border-2 border-slate-800 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-blue-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 text-slate-950 flex items-center justify-center font-black">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                  STAGE 2: STRATIFICATION & ZONE DERIVATION
                </span>
                <span className="text-[10px] bg-blue-900 border border-blue-700 px-2 py-0.5 font-mono text-blue-200 uppercase">
                  GFR Rule 149(viii) Equal Opportunity Protocol
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-white tracking-wide uppercase mt-0.5">
                100-Bidder Evaluation & Risk Segmentation Model
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                Tender: <strong className="text-white font-mono">{tender.referenceNumber}</strong> • {tender.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onBackToCompliance}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-600 transition-colors"
            >
              ← Back to Compliance Matrix
            </button>

            <button
              onClick={handleRerunSort}
              className="px-3 py-2 bg-blue-900 hover:bg-blue-800 text-amber-300 text-xs font-bold border border-blue-700 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSimulatingSort ? 'animate-spin' : ''}`} />
              <span>Recalculate Percentiles</span>
            </button>
          </div>
        </div>

        {/* 3 Zones Overview Metric Bar - Sharp Rectangular Containers */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-4">
          <div className="p-3 bg-slate-900 border-2 border-slate-700">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Total Valid Bids Received
            </div>
            <div className="text-2xl font-black text-white font-mono mt-0.5">
              100 Bids
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Evaluated across 15 statutory parameters
            </div>
          </div>

          {/* Green Zone Metric */}
          <div
            onClick={() => setActiveZoneTab('green')}
            className={`p-3 border-2 cursor-pointer transition-all ${
              activeZoneTab === 'green'
                ? 'bg-emerald-950 border-emerald-400 shadow-lg'
                : 'bg-emerald-950/60 border-emerald-700 hover:border-emerald-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                GREEN ZONE (Top 34%)
              </span>
              <span className="text-[10px] bg-emerald-500 text-slate-950 px-1.5 py-0.2 font-mono font-black">
                IDEAL BIDS
              </span>
            </div>
            <div className="text-2xl font-black text-emerald-300 font-mono mt-0.5">
              34 Bids
            </div>
            <div className="text-[11px] text-emerald-200 mt-1">
              Final award lies strictly in this zone
            </div>
          </div>

          {/* Orange Zone Metric */}
          <div
            onClick={() => setActiveZoneTab('orange')}
            className={`p-3 border-2 cursor-pointer transition-all ${
              activeZoneTab === 'orange'
                ? 'bg-amber-950 border-amber-400 shadow-lg'
                : 'bg-amber-950/60 border-amber-700 hover:border-amber-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                ORANGE ZONE (Opportunity)
              </span>
              <span className="text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.2 font-mono font-black">
                {cureWindowDays}D WINDOW
              </span>
            </div>
            <div className="text-2xl font-black text-amber-300 font-mono mt-0.5">
              48 Bids
            </div>
            <div className="text-[11px] text-amber-200 mt-1">
              Missing business docs • +2 point remedy
            </div>
          </div>

          {/* Red Zone Metric */}
          <div
            onClick={() => setActiveZoneTab('red')}
            className={`p-3 border-2 cursor-pointer transition-all ${
              activeZoneTab === 'red'
                ? 'bg-rose-950 border-rose-400 shadow-lg'
                : 'bg-rose-950/60 border-rose-700 hover:border-rose-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider">
                RED ZONE (Rejected)
              </span>
              <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 font-mono font-black">
                DISQUALIFIED
              </span>
            </div>
            <div className="text-2xl font-black text-rose-300 font-mono mt-0.5">
              18 Bids
            </div>
            <div className="text-[11px] text-rose-200 mt-1">
              Fake documents • Negative trust score
            </div>
          </div>
        </div>

        {/* Stratification Progress Distribution Bar */}
        <div className="mt-4 pt-3 border-t border-blue-900/80">
          <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1.5 font-mono">
            <span>PERCENTILE DISTRIBUTION (1 to 100)</span>
            <span>
              Top 34% (Rank 1–34) ➔ Green • Next 48% (Rank 35–82) ➔ Orange • Bottom 18% (Rank 83–100) ➔ Red
            </span>
          </div>
          <div className="h-4 w-full bg-slate-950 border border-slate-700 flex overflow-hidden">
            <div
              style={{ width: '34%' }}
              className="bg-emerald-500 hover:bg-emerald-400 transition-all flex items-center justify-center text-[10px] text-slate-950 font-black font-mono"
              title="Green Zone: 34 Bids (Ideal Zone)"
            >
              GREEN (34%)
            </div>
            <div
              style={{ width: '48%' }}
              className="bg-amber-500 hover:bg-amber-400 transition-all flex items-center justify-center text-[10px] text-slate-950 font-black font-mono"
              title="Orange Zone: 48 Bids (Opportunity Cure Zone)"
            >
              ORANGE (48%)
            </div>
            <div
              style={{ width: '18%' }}
              className="bg-rose-600 hover:bg-rose-500 transition-all flex items-center justify-center text-[10px] text-white font-black font-mono"
              title="Red Zone: 18 Bids (Disqualified / Negative Trust)"
            >
              RED (18%)
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommended Ideal Bid Card (From Green Zone) */}
      <div className="bg-gradient-to-r from-emerald-900 via-[#002B49] to-slate-900 border-2 border-emerald-500 text-white p-5 shadow-xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-amber-400 text-slate-950 font-black font-mono text-[10px] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-slate-950" />
                AI RECOMMENDED IDEAL BID
              </span>
              <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 font-black font-mono text-[10px] uppercase">
                RANK L1 • GREEN ZONE
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-black text-white">
              {idealBidder.companyName}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <span>Location: <strong className="text-white">{idealBidder.location}, {idealBidder.state}</strong></span>
              <span>•</span>
              <span>Quoted Rate: <strong className="text-emerald-400 font-mono font-bold">₹{(idealBidder.bidAmount / 100000).toFixed(2)} Lakhs</strong></span>
              <span>•</span>
              <span>Compliance Index: <strong className="text-white font-mono font-bold">{idealBidder.complianceScore}/100</strong></span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              <strong>Evaluation Justification:</strong> Meets 100% statutory prerequisites with verified GSTN filing, active UDYAM MSE registration, zero CAG audit discrepancies, and authenticated Class-I Make in India local content.
            </p>
          </div>

          <div className="p-4 bg-slate-950 border border-emerald-500/60 min-w-[220px] text-center space-y-2">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Internal Officer Trust Score
            </div>
            <div className="text-3xl font-black text-emerald-400 font-mono">
              {idealBidder.internalTrustScore}
              <span className="text-xs text-slate-400 font-normal"> / 100</span>
            </div>
            <div className="text-[10px] text-emerald-300 font-mono">
              CAG Audit Risk: <strong>0.18% (Minimal)</strong>
            </div>

            <button
              onClick={() => handleRequestClarification(idealBidder.companyName)}
              className="w-full mt-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold border border-slate-600 transition-colors"
            >
              Request Minor Clarification
            </button>
          </div>
        </div>

        {clarificationNoticeSent && (
          <div className="mt-3 p-2.5 bg-amber-500/20 border border-amber-500 text-amber-200 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{clarificationNoticeSent}</span>
          </div>
        )}
      </div>

      {/* Interactive Controls & Zone Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 border-2 border-slate-300">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveZoneTab('all')}
            className={`px-3 py-1.5 text-xs font-bold uppercase transition-all border ${
              activeZoneTab === 'all'
                ? 'bg-[#002B49] text-white border-blue-950 font-black'
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
            }`}
          >
            All 100 Bidders
          </button>

          <button
            onClick={() => setActiveZoneTab('green')}
            className={`px-3 py-1.5 text-xs font-bold uppercase transition-all border flex items-center gap-1.5 ${
              activeZoneTab === 'green'
                ? 'bg-emerald-700 text-white border-emerald-800 font-black'
                : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
            }`}
          >
            <span className="w-2 h-2 bg-emerald-500 inline-block" />
            <span>Green Zone ({stratificationData.greenZoneCount})</span>
          </button>

          <button
            onClick={() => setActiveZoneTab('orange')}
            className={`px-3 py-1.5 text-xs font-bold uppercase transition-all border flex items-center gap-1.5 ${
              activeZoneTab === 'orange'
                ? 'bg-amber-600 text-white border-amber-700 font-black'
                : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
            }`}
          >
            <span className="w-2 h-2 bg-amber-500 inline-block" />
            <span>Orange Zone ({stratificationData.orangeZoneCount})</span>
          </button>

          <button
            onClick={() => setActiveZoneTab('red')}
            className={`px-3 py-1.5 text-xs font-bold uppercase transition-all border flex items-center gap-1.5 ${
              activeZoneTab === 'red'
                ? 'bg-rose-700 text-white border-rose-800 font-black'
                : 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100'
            }`}
          >
            <span className="w-2 h-2 bg-rose-600 inline-block" />
            <span>Red Zone ({stratificationData.redZoneCount})</span>
          </button>
        </div>

        {/* Search Filter */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by company or state..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-[#002B49]"
          />
        </div>
      </div>

      {/* Special Orange Zone Action Bar: 5-Days Cure Window Extension */}
      {(activeZoneTab === 'all' || activeZoneTab === 'orange') && (
        <div className="bg-amber-50 border-2 border-amber-400 p-4 text-amber-950">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-mono font-black text-[10px] uppercase">
                  EQUAL OPPORTUNITY REMEDIATION PROTOCOL
                </span>
                <span className="text-xs font-bold text-amber-900">
                  GFR Rule 149(viii) Statutory Cure Window
                </span>
              </div>
              <p className="text-xs text-amber-900">
                Notice dispatched to 48 Orange Zone vendors: <em>"Your business documents are missing or verification is pending. Kindly re-upload within the auto-allotted window."</em>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] text-amber-800 font-bold uppercase">Active Cure Window:</div>
                <div className="text-sm font-mono font-black text-amber-950">
                  {cureWindowDays} Days (Closes {deadlineDate})
                </div>
              </div>

              <button
                type="button"
                onClick={handleExtend5Days}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider border border-amber-800 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>+ 5 Days Extension</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bidders Roster / Grid organized by Zones */}
      <div className="space-y-3">
        {filteredBidders.map((bidder) => {
          const isGreen = bidder.zone === 'green';
          const isOrange = bidder.zone === 'orange';
          const isRed = bidder.zone === 'red';

          const cardBorder = isGreen
            ? 'border-emerald-600 bg-emerald-50/40'
            : isOrange
            ? 'border-amber-500 bg-amber-50/40'
            : 'border-rose-600 bg-rose-50/40';

          const tagBadge = isGreen
            ? 'bg-emerald-700 text-white'
            : isOrange
            ? 'bg-amber-600 text-white'
            : 'bg-rose-700 text-white';

          return (
            <div
              key={bidder.id}
              className={`p-4 border-2 ${cardBorder} transition-all shadow-xs`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1 min-w-[280px]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-900 text-white">
                      RANK #{bidder.rank}
                    </span>
                    <span className={`text-[10px] font-mono font-black px-2 py-0.5 uppercase ${tagBadge}`}>
                      {bidder.zone.toUpperCase()} ZONE
                    </span>
                    <span className="text-xs font-semibold text-slate-700">
                      {bidder.location}, {bidder.state}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-950">
                    {bidder.companyName}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                    <span>Quoted: <strong className="text-slate-900 font-mono">₹{(bidder.bidAmount / 100000).toFixed(2)} Lakhs</strong></span>
                    <span>•</span>
                    <span>Compliance Score: <strong className="text-slate-900 font-mono">{bidder.complianceScore} / 100</strong></span>
                    {bidder.bonusPointsEarned ? (
                      <span className="text-emerald-700 font-bold font-mono">
                        (+{bidder.bonusPointsEarned} remedy points earned)
                      </span>
                    ) : null}
                  </div>

                  {/* Zone Specific Explanations */}
                  {isGreen && (
                    <div className="text-[11px] text-emerald-800 font-medium flex items-center gap-1.5 pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>All statutory annexures verified without discrepancies. Eligible for final technical comparison.</span>
                    </div>
                  )}

                  {isOrange && (
                    <div className="text-[11px] text-amber-900 space-y-1 pt-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span>Deficient Business Documents (5-Day Cure Window Auto-Allotted):</span>
                      </div>
                      <ul className="list-disc pl-5 text-amber-800">
                        {bidder.missingDocuments?.map((doc, idx) => (
                          <li key={idx}>Missing: <strong>{doc}</strong></li>
                        ))}
                      </ul>
                      {bidder.reuploadedDocsCount ? (
                        <div className="text-emerald-800 font-bold text-[10px] bg-emerald-100 p-1 border border-emerald-300 inline-block">
                          ✓ Document re-uploaded in cure window. +2 score improvement logged. (Vendor stays in Orange Zone for equal opportunity protocol)
                        </div>
                      ) : null}
                    </div>
                  )}

                  {isRed && (
                    <div className="text-[11px] text-rose-900 space-y-1 pt-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-rose-700 shrink-0" />
                        <span>Statutory Disqualification Grounds:</span>
                      </div>
                      <div className="p-2 bg-rose-100 border border-rose-300 font-medium">
                        {bidder.rejectionReason}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side Actions & Internal Trust Metric */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  {/* Internal Trust Score Display (Officer internal only!) */}
                  <div className="p-2 bg-white border border-slate-300 text-right min-w-[150px]">
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                      Internal Trust Score
                    </div>
                    <div className={`text-lg font-black font-mono ${
                      isGreen ? 'text-emerald-700' : isOrange ? 'text-amber-700' : 'text-rose-700'
                    }`}>
                      {bidder.internalTrustScore !== undefined ? (
                        bidder.internalTrustScore > 0 ? `${bidder.internalTrustScore}` : `${bidder.internalTrustScore} (PENALTY)`
                      ) : 'N/A'}
                    </div>
                    <div className="text-[9px] text-slate-500">
                      {isRed ? 'Debarment Risk Active' : 'Officer Internal Metric'}
                    </div>
                  </div>

                  {/* Interactive Button for Orange Zone */}
                  {isOrange && (
                    <button
                      type="button"
                      onClick={() => handleSimulateReupload(bidder.id)}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider border border-amber-800 flex items-center gap-1 transition-colors"
                      title="Simulate vendor uploading missing document within 5 days window"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Re-upload Document (+2 Score)</span>
                    </button>
                  )}

                  {isGreen && (
                    <button
                      type="button"
                      onClick={() => handleRequestClarification(bidder.companyName)}
                      className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider border border-emerald-900 flex items-center gap-1 transition-colors"
                    >
                      <FileCheck2 className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Request Minor Clause</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Stage Navigation Action */}
      <div className="bg-[#002B49] text-white p-5 border-2 border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs text-slate-300 max-w-xl">
          <strong className="text-white">Stratification Protocol Completed:</strong> All 100 bids categorized into Green (34%), Orange (48%), and Red (18%) zones. 5-day cure notice dispatched to orange zone bidders.
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToCompliance}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-600 transition-colors"
          >
            ← Review Compliance Matrix
          </button>

          <button
            type="button"
            onClick={onProceedToDecisionTree}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider border border-amber-300 flex items-center gap-2 transition-colors shadow-lg"
          >
            <span>Proceed to Step 3: AI Decision Tree & Recommendation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
