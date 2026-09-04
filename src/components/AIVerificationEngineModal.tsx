import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Cpu,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  Building,
  DollarSign,
  Download,
  Lock,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Ban,
  HelpCircle,
  FileCheck2,
  RefreshCw,
  Clock
} from 'lucide-react';
import { Bidder, Tender, BlockchainBlock } from '../types';

interface AIVerificationEngineModalProps {
  bidder: Bidder | null;
  tender: Tender | null;
  isOpen: boolean;
  onClose: () => void;
  onRecordOfficerDecision: (bidderId: string, action: 'Approved' | 'Disqualified' | 'Clarification_Sought', remarks: string) => void;
}

export const AIVerificationEngineModal: React.FC<AIVerificationEngineModalProps> = ({
  bidder,
  tender,
  isOpen,
  onClose,
  onRecordOfficerDecision
}) => {
  if (!isOpen || !bidder) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'portals' | 'discrepancies' | 'officer_action'>('overview');
  const [officerRemarks, setOfficerRemarks] = useState('');
  const [selectedAction, setSelectedAction] = useState<'Approved' | 'Disqualified' | 'Clarification_Sought'>('Approved');
  const [isSubmittingAction, setIsSubmittingAction] = useState(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  const verification = bidder.verificationData;
  const checks = verification.statutoryChecks;
  const score = verification.complianceScore;
  const risk = verification.riskLevel;

  const handleOfficerSubmit = () => {
    setIsSubmittingAction(true);
    setTimeout(() => {
      onRecordOfficerDecision(bidder.id, selectedAction, officerRemarks || `Officer verified on ${new Date().toLocaleDateString()}`);
      setIsSubmittingAction(false);
      setActionSuccessMessage(`Decision [${selectedAction}] successfully cryptographically sealed in GeM Blockchain Ledger!`);
      setTimeout(() => {
        setActionSuccessMessage(null);
      }, 3000);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-sm overflow-y-auto" id="modal-ai-verification">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#002B49] via-[#083b63] to-[#002B49] text-white px-6 py-4 flex items-center justify-between border-b border-blue-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF9933] to-[#e68019] text-white flex items-center justify-center shadow-md">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider text-amber-300">
                  AI Statutory Compliance Engine
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/15 text-slate-200">
                  Rule 144(xi) GFR 2017
                </span>
              </div>
              <h2 className="text-lg font-bold text-white leading-tight">
                {bidder.companyName}
              </h2>
              <p className="text-xs text-slate-300">
                Bid #{bidder.bidNumber} • Tender: {tender?.referenceNumber || 'GEM/2026'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-300">Overall Score</div>
              <div className={`text-xl font-extrabold ${score >= 85 ? 'text-emerald-400' : score >= 65 ? 'text-amber-300' : 'text-rose-400'}`}>
                {score}/100
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3.5 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#002B49] text-[#002B49]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Compliance Assessment</span>
          </button>

          <button
            onClick={() => setActiveTab('portals')}
            className={`py-3 px-3.5 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'portals'
                ? 'border-[#002B49] text-[#002B49]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building className="w-4 h-4 text-blue-600" />
            <span>Govt Portal Handshakes ({verification.handshakes.length || 6})</span>
          </button>

          <button
            onClick={() => setActiveTab('discrepancies')}
            className={`py-3 px-3.5 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'discrepancies'
                ? 'border-[#002B49] text-[#002B49]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Discrepancy Matrix ({verification.gapsAndDiscrepancies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('officer_action')}
            className={`py-3 px-3.5 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'officer_action'
                ? 'border-[#002B49] text-[#002B49]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserCheck className="w-4 h-4 text-purple-600" />
            <span>Procurement Officer Action</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-800">
          {actionSuccessMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{actionSuccessMessage}</span>
            </div>
          )}

          {/* TAB 1: OVERVIEW & SCORE */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Score Header Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Score Gauge */}
                <div className="p-5 rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white flex flex-col items-center justify-center text-center">
                  <div className="relative w-28 h-28 flex items-center justify-center mb-2">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={`${score >= 85 ? 'text-emerald-500' : score >= 65 ? 'text-amber-500' : 'text-rose-500'}`}
                        strokeDasharray={`${score}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-2xl font-black text-slate-900">{score}</span>
                      <span className="text-[10px] text-slate-500 font-semibold uppercase">out of 100</span>
                    </div>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    risk === 'Low' ? 'bg-emerald-100 text-emerald-800' : risk === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {risk.toUpperCase()} RISK CLASSIFICATION
                  </span>
                </div>

                {/* AI Recommendation */}
                <div className="md:col-span-2 p-5 rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        AI Statutory Recommendation
                      </span>
                      <span className={`text-xs font-extrabold px-3 py-1 rounded-md ${
                        verification.recommendation === 'Qualified'
                          ? 'bg-emerald-600 text-white'
                          : verification.recommendation === 'Disqualified'
                          ? 'bg-rose-600 text-white'
                          : 'bg-amber-500 text-white'
                      }`}>
                        {verification.recommendation}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-800 leading-relaxed">
                      {verification.recommendationReason}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <span>Rank: <strong>{bidder.rank || 'Under Evaluation'}</strong></span>
                    <span>Bid Amount: <strong>₹{bidder.amount ? (bidder.amount / 100000).toFixed(2) + ' Lakh' : 'Refer Docs'}</strong></span>
                    <span className="text-emerald-700 font-semibold">DigiLocker Certified</span>
                  </div>
                </div>
              </div>

              {/* Statutory Pillars Breakdown */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  Statutory & Eligibility Validation Matrix
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="text-[11px] text-slate-500 font-semibold mb-0.5">GSTN Status & Filing</div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      {checks.gstnStatus.includes('Default') ? (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                      <span>{checks.gstnStatus}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-1">GSTIN: {checks.gstinNumber}</div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="text-[11px] text-slate-500 font-semibold mb-0.5">Udyam MSME Standing</div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{checks.udyamCategory} Enterprise</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-1">{checks.udyamRegistration}</div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="text-[11px] text-slate-500 font-semibold mb-0.5">Make In India (Local Content)</div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{checks.makeInIndiaPercentage}% Local Value</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Class-I Local Supplier (PPO 2017)</div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="text-[11px] text-slate-500 font-semibold mb-0.5">Income Tax Compliance</div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      {checks.panItrStatus.includes('Defective') ? (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                      <span>{checks.panItrStatus}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-1">PAN: {checks.panNumber}</div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="text-[11px] text-slate-500 font-semibold mb-0.5">CPPP Debarment Scan</div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      {checks.debarmentStatus.includes('FLAGGED') ? (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      )}
                      <span>{checks.debarmentStatus}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Scanned 82 CPSE lists</div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="text-[11px] text-slate-500 font-semibold mb-0.5">Workforce & Labor Standard</div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{checks.epfoStatus}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">ESIC: {checks.esicStatus}</div>
                  </div>
                </div>
              </div>

              {/* Key Verification Highlights */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block mb-2">
                  Verified Audit Findings
                </span>
                <ul className="space-y-1.5 text-xs text-emerald-800">
                  {verification.keyHighlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: PORTAL HANDSHAKES */}
          {activeTab === 'portals' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Live automated API handshakes querying verified Central Government databases and regulatory registries in real-time.
              </p>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                {verification.handshakes.map((h, idx) => (
                  <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg text-xs font-bold ${
                        h.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {h.portalCode}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{h.portal}</div>
                        <div className="text-xs text-slate-600 mt-0.5">{h.resultSummary}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-1">Matched Key: {h.matchedId}</div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        h.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {h.status === 'verified' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {h.status.toUpperCase()}
                      </span>
                      <div className="text-[10px] font-mono text-slate-400 mt-1">Latency: {h.responseTimeMs}ms</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DISCREPANCIES */}
          {activeTab === 'discrepancies' && (
            <div className="space-y-4">
              {verification.gapsAndDiscrepancies.length > 0 ? (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs">
                    <span className="font-bold block mb-1">
                      {verification.gapsAndDiscrepancies.length} Discrepanc{verification.gapsAndDiscrepancies.length > 1 ? 'ies' : 'y'} detected by AI Verification Engine:
                    </span>
                    <p className="text-rose-700">
                      These points fail strict GFR 2017 / GeM tender eligibility conditions and must either be clarified by the bidder or lead to technical disqualification.
                    </p>
                  </div>

                  <div className="space-y-2">
                    {verification.gapsAndDiscrepancies.map((gap, i) => (
                      <div key={i} className="p-3 rounded-lg border border-red-200 bg-white flex items-start gap-2.5 text-xs text-slate-800">
                        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-red-950">Issue #{i + 1}: {gap}</div>
                          <span className="text-[11px] text-slate-500">Cross-verified against primary government source.</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-emerald-50/50 border border-emerald-200 rounded-xl">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-emerald-950">Zero Discrepancies Found</h4>
                  <p className="text-xs text-emerald-800 mt-1 max-w-md mx-auto">
                    Bid documents, financial turnover, statutory returns, and local content declarations match government repository records with 100% integrity.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PROCUREMENT OFFICER ACTION */}
          {activeTab === 'officer_action' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="font-bold text-slate-900 block mb-1">
                  Procurement Officer Authority & Responsibility:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  As per GeM Guidelines and GFR 2017 Rule 144(xi), the AI system provides decision-support and evidence verification. The formal qualification, rejection, or clarification order remains the statutory responsibility of the Procurement Officer.
                </p>
              </div>

              {/* Action Selector */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-2">Select Decision:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedAction('Approved')}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                      selectedAction === 'Approved'
                        ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-emerald-900">Approve Qualification</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Bidder meets all eligibility criteria</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedAction('Clarification_Sought')}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                      selectedAction === 'Clarification_Sought'
                        ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-amber-900">Seek Clarification</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Issue 48-hr ATC clarification notice</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedAction('Disqualified')}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                      selectedAction === 'Disqualified'
                        ? 'border-rose-600 bg-rose-50/70 ring-2 ring-rose-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <Ban className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-rose-900">Disqualify Bidder</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Technical or statutory rejection</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Officer Remarks Textarea */}
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Officer Order & Justification Remarks:
                </label>
                <textarea
                  rows={3}
                  value={officerRemarks}
                  onChange={(e) => setOfficerRemarks(e.target.value)}
                  placeholder="Enter detailed technical evaluation findings, audit remarks, or justification..."
                  className="w-full p-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Will be cryptographically timestamped on Blockchain Audit Ledger</span>
                </div>

                <button
                  type="button"
                  onClick={handleOfficerSubmit}
                  disabled={isSubmittingAction}
                  className="px-5 py-2.5 rounded-lg bg-[#002B49] hover:bg-[#003c66] text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
                >
                  {isSubmittingAction ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Signing & Sealing Block...</span>
                    </>
                  ) : (
                    <>
                      <FileCheck2 className="w-4 h-4 text-[#FF9933]" />
                      <span>Execute Decision & Seal Audit Record</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>GeM National Audit Framework v5.0 Active</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
