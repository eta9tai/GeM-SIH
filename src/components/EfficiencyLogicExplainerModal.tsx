import React, { useState } from 'react';
import {
  HelpCircle,
  Clock,
  TrendingDown,
  ShieldCheck,
  Zap,
  AlertOctagon,
  Scale,
  Cpu,
  Lock,
  FileCheck,
  Award,
  BookOpen,
  X
} from 'lucide-react';

interface EfficiencyLogicExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EfficiencyLogicExplainerModal: React.FC<EfficiencyLogicExplainerModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'gfr_rules' | 'blockchain_chaining' | 'disqualification_logic'>('metrics');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white border border-slate-300 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#002B49] text-white px-6 py-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold tracking-tight">
                  Tender Efficiency Analytics & Algorithmic Logic Explainer
                </h2>
                <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-mono font-bold">
                  CAG & GFR 2017
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Comparative Scrutiny Benchmarks, Statutory Rule 144(xi) Audit Proofs & Blockchain Chaining
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 px-6 py-2 border-b border-slate-200 flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'metrics'
                ? 'bg-[#002B49] text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Manual vs AI Benchmark</span>
          </button>

          <button
            onClick={() => setActiveTab('disqualification_logic')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'disqualification_logic'
                ? 'bg-[#002B49] text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-blue-400" />
            <span>Disqualification Algorithms</span>
          </button>

          <button
            onClick={() => setActiveTab('gfr_rules')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'gfr_rules'
                ? 'bg-[#002B49] text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>GFR Rule 144(xi) & 149 Mandates</span>
          </button>

          <button
            onClick={() => setActiveTab('blockchain_chaining')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'blockchain_chaining'
                ? 'bg-[#002B49] text-white shadow-sm'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-purple-400" />
            <span>Blockchain Hash Chaining</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: COMPARATIVE DASHBOARD METRICS */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Quantitative Scrutiny Velocity: Manual Evaluation vs. GeM AI Engine
                </h3>
                <p className="text-xs text-slate-500">
                  Empirical metrics across 1,400+ public tenders comparing physical file scrutiny with automated cryptographic multi-portal handshakes.
                </p>
              </div>

              {/* 4 Core Quantitative Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Processing Velocity */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                        <Clock className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-900">Processing Velocity</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold font-mono">
                      93.8% Time Saved
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Manual Cycle</span>
                      <span className="text-lg font-extrabold text-slate-700 font-mono">38.5 Days</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-600 font-bold uppercase block">AI Clearing</span>
                      <span className="text-lg font-extrabold text-emerald-700 font-mono">2.4 Days</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Eliminates manual file transit, paper courier delays for Bank Guarantees, and physical committee meetings.
                  </p>
                </div>

                {/* 2. CAG Audit Risk */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-700">
                        <AlertOctagon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-900">CAG Audit Risk Score</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold font-mono">
                      92.7% Risk Reduction
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Manual Baseline</span>
                      <span className="text-lg font-extrabold text-red-600 font-mono">82 / 100 (High)</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-600 font-bold uppercase block">AI Blockchain</span>
                      <span className="text-lg font-extrabold text-emerald-700 font-mono">6 / 100 (Low)</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Prevents adverse audit paras by automatically enforcing UDIN validation, GSTR-3B filings, and CPPP debarment checks.
                  </p>
                </div>

                {/* 3. Administrative Cost */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700">
                        <TrendingDown className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-900">Administrative Cost / Tender</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold font-mono">
                      ₹40,700 Saved / Tender
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Manual Tender</span>
                      <span className="text-lg font-extrabold text-slate-700 font-mono">₹42,800</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-600 font-bold uppercase block">GeM AI Flow</span>
                      <span className="text-lg font-extrabold text-emerald-700 font-mono">₹2,100</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Radically shrinks officer labor hours from 48-60 hrs down to 1-2 hrs of executive cryptographic sign-off.
                  </p>
                </div>

                {/* 4. Disqualification Accuracy */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-900">Disqualification Accuracy</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-[11px] font-bold font-mono">
                      Zero Document Tampering
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Manual Evaluation</span>
                      <span className="text-lg font-extrabold text-slate-700 font-mono">68.0% Accuracy</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-600 font-bold uppercase block">Automated AI</span>
                      <span className="text-lg font-extrabold text-emerald-700 font-mono">99.4% Accuracy</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Detects fabricated UDINs, forged OEM authorization letters, and missing Child Labor penal clauses via variance checks.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DISQUALIFICATION ALGORITHMIC REASONING */}
          {activeTab === 'disqualification_logic' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                Algorithmic Disqualification Framework
              </h3>
              <p className="text-xs text-slate-500">
                Why vendors are systematically flagged or disqualified by the AI engine:
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-red-700">1. Statutory Tax Default (GSTR-3B Anomaly)</span>
                    <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-mono text-[10px] font-bold">CRITICAL</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Under Section 39 of CGST Act, vendors defaulting on 3 consecutive tax periods trigger automatic disqualification. The GSTN API handshake cross-examines return filing dates against the bid submission timestamp.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-700">2. Annexure-1 Proforma Variance &gt; 40%</span>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono text-[10px] font-bold">TAMPERING FLAG</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Vendors omitting statutory penalty declarations (e.g., Section 14 of Child Labour Prohibition Act 1986, or Minimum Wages Act 1948 schedules) receive document variance exceeding 40.0%, triggering mandatory rejection under GFR Rule 151.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700">3. CPPP Holiday Listing & Debarment Check</span>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono text-[10px] font-bold">SECURITY CLEARANCE</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Automated queries to the Central Public Procurement Portal blacklist registry verify that neither the entity, its directors (DIN), nor its PAN have active debarment orders from any Ministry or Central Public Sector Enterprise.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GFR RULES & STATUTORY MANDATES */}
          {activeTab === 'gfr_rules' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                General Financial Rules (GFR 2017) Statutory Enforcement
              </h3>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1">
                  <strong className="text-blue-950 font-bold block text-sm">GFR Rule 144(xi) - Land Border Compliance:</strong>
                  <p className="text-blue-900 leading-relaxed">
                    Mandates that any bidder from a country sharing a land border with India must be registered with the Competent Authority (DPIIT). The AI engine automatically parses Declaration-D and verifies registration credentials against the Ministry of External Affairs whitelist.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                  <strong className="text-emerald-950 font-bold block text-sm">GFR Rule 149 - Mandatory GeM Procurement:</strong>
                  <p className="text-emerald-900 leading-relaxed">
                    Mandates common-use goods and services to be procured exclusively through the GeM portal. Ensures compliance with Purchase Preference policies for Micro and Small Enterprises (MSEs) and Class-I Local Suppliers (Make in India minimum 50% local content).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 font-bold block text-sm">Public Procurement Policy for MSEs Order 2012:</strong>
                  <p className="text-slate-600 leading-relaxed">
                    Exemption from payment of Earnest Money Deposit (EMD) and tender fees for MSEs holding valid Udyam Registration Certificates, verified in real-time via the Ministry of MSME API gateway.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BLOCKCHAIN HASH CHAINING */}
          {activeTab === 'blockchain_chaining' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                Cryptographic Hash Chaining on GeM Distributed Ledger
              </h3>
              <p className="text-xs text-slate-500">
                How cryptographic proofs guarantee mathematical tamper-evidence across all procurement decisions:
              </p>

              <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs space-y-2">
                <div className="text-emerald-400 font-bold">// Cryptographic Block Structure</div>
                <div>Block N = SHA-256(Block N-1 Hash + Timestamp + Officer Public Key + Merkle Root of Bids + Decision Order)</div>
                <div className="text-amber-300">Nonce: Math.floor(Math.random() * 900000) + 100000</div>
                <div className="text-slate-400">Status: VALIDATED (Consensus achieved across MeitY Cloud & NIC Nodes)</div>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-950 space-y-1">
                <strong className="text-purple-900 font-bold block">Why Tampering is Impossible:</strong>
                <p className="text-purple-800 leading-relaxed">
                  If any party alters a bid amount or officer decision in hindsight, the SHA-256 hash calculation breaks instantly across the chain. The CAG auditor can verify 100% of historical transactions mathematically in seconds.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
