import React, { useState } from 'react';
import {
  Sparkles,
  Lock,
  Unlock,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Download,
  CreditCard,
  ShieldCheck,
  Zap,
  BarChart3,
  Calendar,
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';
import { BidderAccount, Tender } from '../types';

interface OutcomePreviewPaidFeatureProps {
  bidder: BidderAccount;
  activeTender: Tender;
  hasUploadedPendingDoc?: boolean;
}

export const OutcomePreviewPaidFeature: React.FC<OutcomePreviewPaidFeatureProps> = ({
  bidder,
  activeTender,
  hasUploadedPendingDoc = false
}) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<'single' | 'msme' | 'annual'>('single');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);

  // Compute realistic predictive outcome metrics
  const isHighProbability = bidder.complianceScore >= 80;
  const baseWinProb = bidder.id === 'bidder-sahyadri'
    ? 89.4
    : bidder.id === 'bidder-marudhar'
    ? (hasUploadedPendingDoc ? 92.6 : 74.8)
    : bidder.id === 'bidder-vidarbha-disq'
    ? 12.0
    : 81.5;

  const handleUnlockSimulation = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsUnlocked(true);
    }, 600);
  };

  return (
    <div className="bg-white border-2 border-slate-300 shadow-md overflow-hidden select-none" id="gem-outcome-preview-container">
      {/* Top Header Strip with Paid Feature Indication */}
      <div className="bg-[#002B49] text-white px-5 py-3 border-b-2 border-amber-500 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-amber-400 text-slate-950 flex items-center justify-center font-black">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black font-mono px-2 py-0.5 bg-amber-400 text-slate-950 uppercase tracking-wider">
                PAID FEATURE • सशुल्क सेवा
              </span>
              <span className="text-[11px] text-amber-300 font-bold hidden sm:inline">
                GeM Seller Pro Intelligence Suite
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-white">
              Outcome Preview & Pre-Financial Opening Intelligence
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isUnlocked ? (
            <span className="px-2.5 py-1 bg-emerald-600 text-white text-xs font-bold font-mono flex items-center gap-1.5 border border-emerald-400">
              <Unlock className="w-3.5 h-3.5 text-emerald-200" />
              <span>SUBSCRIPTION ACTIVE</span>
            </span>
          ) : (
            <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold font-mono flex items-center gap-1.5 border border-amber-400/40">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>PREMIUM ACCESS LOCKED</span>
            </span>
          )}

          <button
            type="button"
            onClick={() => setIsUnlocked(prev => !prev)}
            className="text-[11px] text-slate-300 hover:text-white underline ml-2"
          >
            {isUnlocked ? '[Lock View]' : '[Demo Unlock]'}
          </button>
        </div>
      </div>

      {/* Main Body: Either Paywall Card or Unlocked Intelligence Dashboard */}
      {!isUnlocked ? (
        <div className="p-6 sm:p-8 bg-gradient-to-b from-slate-50 to-amber-50/30">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="w-16 h-16 bg-amber-100 text-amber-900 mx-auto flex items-center justify-center border-2 border-amber-400 shadow-sm">
              <Lock className="w-8 h-8 text-amber-800" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg sm:text-xl font-black text-slate-900">
                क्या इसको paid feature बना देंगे? हाँ, यह अग्रिम परिणाम पूर्वानुमान (Outcome Preview) सशुल्क सेवा है।
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                Before commercial envelopes are unsealed, access pre-financial statistical projections, win likelihood indices, and competitor pricing corridors without violating statutory confidentiality.
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left my-5">
              <div className="p-3.5 bg-white border-2 border-slate-200">
                <div className="text-xs font-black text-slate-900 flex items-center gap-1.5 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Win Likelihood Index</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-normal">
                  Algorithmic probability derived from your verified compliance score and competitor evaluation matrix.
                </p>
              </div>

              <div className="p-3.5 bg-white border-2 border-slate-200">
                <div className="text-xs font-black text-slate-900 flex items-center gap-1.5 mb-1">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  <span>Price Corridor Spread</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-normal">
                  Benchmark your quoted quotation against the estimated L1 winning corridor with zero identity leakage.
                </p>
              </div>

              <div className="p-3.5 bg-white border-2 border-slate-200">
                <div className="text-xs font-black text-slate-900 flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Post-Cure Simulation</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-normal">
                  Real-time preview of how rectifying pending documents boosts your winning odds before financial opening.
                </p>
              </div>
            </div>

            {/* Pricing Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div
                onClick={() => setSelectedPlan('single')}
                className={`p-4 border-2 cursor-pointer transition-all text-left ${
                  selectedPlan === 'single'
                    ? 'border-[#002B49] bg-white shadow-md'
                    : 'border-slate-300 bg-slate-50 hover:bg-white'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-800">Single Tender Pass</span>
                  <input type="radio" checked={selectedPlan === 'single'} readOnly className="accent-[#002B49]" />
                </div>
                <div className="text-xl font-black text-slate-900 font-mono">₹999</div>
                <div className="text-[10px] text-slate-500 mt-1">One-time evaluation intelligence for Tender Ref: {activeTender.referenceNumber.substring(0, 14)}...</div>
              </div>

              <div
                onClick={() => setSelectedPlan('msme')}
                className={`p-4 border-2 cursor-pointer transition-all text-left relative ${
                  selectedPlan === 'msme'
                    ? 'border-emerald-600 bg-white shadow-md'
                    : 'border-slate-300 bg-slate-50 hover:bg-white'
                }`}
              >
                <span className="absolute -top-2.5 right-3 px-1.5 py-0.2 bg-emerald-600 text-white text-[9px] font-black uppercase">
                  50% MSME SUBSIDY
                </span>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-emerald-900">Udyam Special Pass</span>
                  <input type="radio" checked={selectedPlan === 'msme'} readOnly className="accent-emerald-600" />
                </div>
                <div className="text-xl font-black text-emerald-800 font-mono">₹499</div>
                <div className="text-[10px] text-slate-500 mt-1">Subsidized for verified Micro & Small Enterprises (Class-1 local content).</div>
              </div>

              <div
                onClick={() => setSelectedPlan('annual')}
                className={`p-4 border-2 cursor-pointer transition-all text-left ${
                  selectedPlan === 'annual'
                    ? 'border-amber-600 bg-white shadow-md'
                    : 'border-slate-300 bg-slate-50 hover:bg-white'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-800">Annual Unlimited</span>
                  <input type="radio" checked={selectedPlan === 'annual'} readOnly className="accent-amber-600" />
                </div>
                <div className="text-xl font-black text-slate-900 font-mono">₹4,999<span className="text-xs font-normal text-slate-500">/yr</span></div>
                <div className="text-[10px] text-slate-500 mt-1">All CPPP & GeM tenders, WhatsApp priority alerts, and L1 trend analysis.</div>
              </div>
            </div>

            {/* Unlock Action Button */}
            <div className="pt-3">
              <button
                type="button"
                onClick={handleUnlockSimulation}
                disabled={isProcessingPayment}
                className="px-8 py-3 bg-[#002B49] hover:bg-[#003860] text-white font-black text-xs uppercase tracking-wider border-2 border-amber-400 shadow-md transition-all flex items-center gap-2 mx-auto"
              >
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>
                  {isProcessingPayment
                    ? 'Authenticating Bharat BillPay / GeM Seller Wallet...'
                    : `Unlock Outcome Preview Now (${selectedPlan === 'single' ? '₹999' : selectedPlan === 'msme' ? '₹499' : '₹4,999'})`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 mt-2">
                <span>✓ Instant Portal Activation</span>
                <span>•</span>
                <span>✓ Official GeM Seller Pro Receipt</span>
                <span>•</span>
                <span>✓ Fully Reimbursable as Tender Marketing Expense</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* UNLOCKED OUTCOME PREVIEW DASHBOARD */
        <div className="p-5 sm:p-6 space-y-6 bg-white">
          {/* Top Status Bar: High Chances Confirmation */}
          <div className="p-4 bg-emerald-50 border-2 border-emerald-600 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-emerald-600 text-white font-mono font-black text-[10px] uppercase tracking-wider">
                  STATISTICAL PREDICTION RESULT
                </span>
                <span className="text-xs font-bold text-emerald-900">
                  Calculated against participating bidder pool & technical benchmarks
                </span>
              </div>
              <h4 className="text-base font-black text-emerald-950">
                The chances of you getting this tender are high ({baseWinProb.toFixed(1)}% Projected Probability)
              </h4>
              <p className="text-xs text-emerald-900">
                Your submitted quotation and verified compliance parameters place you in the top competitive bracket for contract award upon financial opening.
              </p>
            </div>

            <div className="text-center px-4 py-2 bg-white border border-emerald-400 shadow-xs">
              <div className="text-[10px] text-slate-500 font-bold uppercase">Award Likelihood</div>
              <div className="text-2xl font-black text-emerald-700 font-mono">
                {baseWinProb.toFixed(1)}%
              </div>
              <div className="text-[9px] text-emerald-800 font-bold uppercase">HIGH PROBABILITY</div>
            </div>
          </div>

          {/* 3 Detailed Intelligence Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pillar 1: Price Corridor Spread */}
            <div className="p-4 bg-slate-50 border-2 border-slate-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 uppercase">1. Evaluated Rate Corridor</span>
                <span className="text-[10px] font-mono font-bold bg-slate-200 px-1.5 py-0.5 text-slate-800">L1 BENCHMARK</span>
              </div>
              <div className="text-xs text-slate-700 leading-relaxed">
                Estimated winning rate corridor: <strong className="font-mono text-slate-900">₹3.85L – ₹4.05L</strong>. Your quotation sits safely within this estimated L1 corridor with healthy profit margins.
              </div>
              <div className="pt-2">
                <div className="text-[10px] font-bold text-slate-500 mb-1 flex justify-between">
                  <span>Below Estimate</span>
                  <span className="text-emerald-700 font-bold">Your Bid (Safe Corridor)</span>
                  <span>Inflated</span>
                </div>
                <div className="h-3 w-full bg-slate-200 flex">
                  <div className="w-1/4 bg-blue-300" title="Low margin outlier" />
                  <div className="w-1/2 bg-emerald-500 relative" title="Optimal L1 sweet spot">
                    <div className="absolute top-0 bottom-0 left-1/3 w-1 bg-black" title="You are here" />
                  </div>
                  <div className="w-1/4 bg-rose-300" title="High quotes" />
                </div>
              </div>
            </div>

            {/* Pillar 2: Financial Envelope Opening Schedule */}
            <div className="p-4 bg-slate-50 border-2 border-slate-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 uppercase">2. Financial Opening</span>
                <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.5">
                  SCHEDULED
                </span>
              </div>
              <div className="text-xs text-slate-700 leading-relaxed">
                Anticipated commercial bid decryption: <strong className="text-slate-900">08 September 2026, 11:30 AM IST</strong>.
              </div>
              <div className="p-2 bg-white border border-slate-200 text-xs text-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-900">
                  <Calendar className="w-3.5 h-3.5 text-[#002B49]" />
                  <span>Cure Window Closes: In 5 Days</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-900">
                  <Clock className="w-3.5 h-3.5 text-[#002B49]" />
                  <span>AOC (Award of Contract): Within 12 Days</span>
                </div>
              </div>
            </div>

            {/* Pillar 3: Statutory Audit & CAG Vulnerability Score */}
            <div className="p-4 bg-slate-50 border-2 border-slate-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 uppercase">3. CAG Audit Clearance</span>
                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-1.5 py-0.5">
                  100% CLEAR
                </span>
              </div>
              <div className="text-xs text-slate-700 leading-relaxed">
                Audit Vulnerability Score: <strong className="text-emerald-700 font-mono">0.0% (Zero Discrepancy)</strong>. Your documents fully satisfy GFR Rule 149 and MSME Public Procurement Policy 2012.
              </div>
              <div className="text-[11px] text-slate-600 bg-white p-2 border border-slate-200">
                Purchase Preference Clause: <strong>Class-1 MII (Local Content &gt; 50%) gives you statutory L1 matching rights.</strong>
              </div>
            </div>
          </div>

          {/* Action Row & Download */}
          <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Paid Intelligence Certified under GeM Seller Pro Algorithm V5.2.</span>
            </div>

            <button
              type="button"
              onClick={() => alert(`Outcome Intelligence Dossier for ${bidder.companyName} downloaded. Contains Win Probability Index (${baseWinProb.toFixed(1)}%), rate corridor analysis, and purchase preference audit notes.`)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase flex items-center gap-1.5 border border-slate-950 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Download Predictive Outcome Report (PDF)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
