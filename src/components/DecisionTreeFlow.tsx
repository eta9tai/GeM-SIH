import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileCheck,
  Building2,
  Shield,
  Layers,
  Cpu,
  UserCheck,
  ArrowDown,
  Info,
  ExternalLink,
  ChevronRight,
  Sparkles,
  RefreshCw,
  Lock
} from 'lucide-react';
import { Bidder } from '../types';

interface DecisionTreeFlowProps {
  selectedBidder?: Bidder;
  allBidders?: Bidder[];
  onSelectBidder?: (bidder: Bidder) => void;
  onOpenAuditModal?: (bidder: Bidder) => void;
}

export const DecisionTreeFlow: React.FC<DecisionTreeFlowProps> = ({
  selectedBidder,
  allBidders = [],
  onSelectBidder,
  onOpenAuditModal
}) => {
  const [activeStepId, setActiveStepId] = useState<string>('ai_engine');
  const [activeSimulationMode, setActiveSimulationMode] = useState<'clean' | 'discrepancy' | 'disqualified'>('clean');

  // If no bidder is selected, choose the first or a default
  const currentBidder = selectedBidder || allBidders[0];
  const checks = currentBidder?.verificationData?.statutoryChecks;
  const score = currentBidder?.verificationData?.complianceScore ?? 95;
  const risk = currentBidder?.verificationData?.riskLevel ?? 'Low';

  const steps = [
    {
      id: 'step_statutory',
      title: '1. Statutory & Tax Gateways',
      titleHindi: 'वैधानिक और कर सत्यापन',
      icon: Building2,
      status: checks?.gstnStatus.includes('Default') ? 'failed' : 'passed',
      summary: `GSTN: ${checks?.gstnStatus || 'Active'}, PAN: ${checks?.panItrStatus || 'Verified'}`,
      details: 'Automated API ping to GSTN (E-Way/GSTR-3B) and CBDT Income Tax portal to verify active status, non-default return records, and minimum 3-year turnover consistency.',
      ruleRef: 'Rule 144(xi) GFR 2017 & Section 148 of GST Act',
      apiEndpoint: 'https://api.gstn.gov.in/taxpayer/v2/returns/status',
      latency: '142ms'
    },
    {
      id: 'step_entity',
      title: '2. MSME & Standing Clearance',
      titleHindi: 'उद्यम और एमएसएमई जांच',
      icon: Shield,
      status: checks?.debarmentStatus.includes('FLAGGED') ? 'failed' : 'passed',
      summary: `Udyam: ${checks?.udyamCategory || 'Micro'} | CPPP Debarment: ${checks?.debarmentStatus.includes('FLAGGED') ? 'Debarred' : 'Clean'}`,
      details: 'Instant query to MSME Udyam Database for investment/turnover classification. Simultaneously scans the Central Public Procurement Portal (CPPP) debarment registry across all 82 CPSEs.',
      ruleRef: 'Public Procurement Policy for MSEs Order 2012 & GeM Debarment Guidelines',
      apiEndpoint: 'https://udyamregistration.gov.in/api/v1/verify',
      latency: '185ms'
    },
    {
      id: 'step_technical',
      title: '3. Local Content & DigiLocker',
      titleHindi: 'मेक इन इंडिया व डिजीलाकर',
      icon: Layers,
      status: checks?.oemAuthorizationValid === false ? 'failed' : (checks?.makeInIndiaPercentage && checks.makeInIndiaPercentage >= 50) ? 'passed' : 'warning',
      summary: `MII Content: ${checks?.makeInIndiaPercentage ?? 85}% | OEM Auth: ${checks?.oemAuthorizationValid ? 'Valid' : 'Missing/Expired'}`,
      details: 'Evaluates Make in India local value-addition percentage (Class-I >= 50%, Class-II 20-50%). Cryptographically checks digital hashes of OEM authorization and BIS CRS certificates via DigiLocker.',
      ruleRef: 'DPIIT Order No. P-45021/2/2017-PP (BE-II)',
      apiEndpoint: 'https://api.digilocker.gov.in/v2/documents/cert-verify',
      latency: '110ms'
    },
    {
      id: 'step_labor',
      title: '4. Labor & Welfare Compliance',
      titleHindi: 'ईपीएफओ और ईएसआईसी अनुपालन',
      icon: FileCheck,
      status: checks?.epfoStatus.includes('Non') ? 'failed' : 'passed',
      summary: `EPFO: ${checks?.epfoStatus || 'Compliant'} | ESIC: ${checks?.esicStatus || 'Active'}`,
      details: 'Verification of Electronic Challan Returns (ECR) on EPFO Shram Suvidha portal ensuring workforce statutory wages, gratuity and social security deposits are up to date.',
      ruleRef: 'The Employees Provident Funds and Miscellaneous Provisions Act 1952',
      apiEndpoint: 'https://unifiedportal-emp.epfindia.gov.in/api/challan/audit',
      latency: '190ms'
    },
    {
      id: 'ai_engine',
      title: '5. AI Multi-Source Cross-Verification Engine',
      titleHindi: 'एआई बहु-स्रोत क्रॉस-सत्यापन इंजन',
      icon: Cpu,
      status: score >= 85 ? 'passed' : score >= 65 ? 'warning' : 'failed',
      summary: `Compliance Score: ${score}/100 (${risk} Risk)`,
      details: 'Synthesizes all raw statutory responses, detects discrepancies between financial books and tax filings, calculates composite compliance rating and issues statutory recommendation.',
      ruleRef: 'GeM AI Decision-Support & Risk Governance Framework v5.0',
      apiEndpoint: 'internal://gem.ai.engine/compliance/evaluate',
      latency: '340ms'
    },
    {
      id: 'step_decision',
      title: '6. Procurement Officer Executive Action',
      titleHindi: 'खरीद अधिकारी अंतिम निर्णय',
      icon: UserCheck,
      status: currentBidder?.status === 'Qualified' ? 'passed' : currentBidder?.status === 'Disqualified' ? 'failed' : 'warning',
      summary: `Current Decision: ${currentBidder?.status || 'Qualified'}`,
      details: 'Procurement Officer reviews the AI recommendations, examines any flagged variance, issues Additional Terms & Conditions (ATC) notices or grants technical qualification, sealing the action into the immutable Blockchain Ledger.',
      ruleRef: 'Manual for Procurement of Goods 2024, Ministry of Finance',
      apiEndpoint: 'blockchain://gem-ledger.gov.in/blocks/seal-transaction',
      latency: '85ms'
    }
  ];

  const activeStep = steps.find(s => s.id === activeStepId) || steps[4];

  return (
    <div className="bg-white rounded-xl border border-brand-border-light shadow-sm overflow-hidden" id="gem-decision-tree-flow">
      {/* Top Banner */}
      <div className="border-b border-brand-border-light px-5 py-4 bg-gradient-to-r from-slate-900 via-[#0A2540] to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#FF9933]/20 border border-[#FF9933]/40 text-[#FF9933] text-[10px] font-bold tracking-wider uppercase">
              AI Verification Tree Flow
            </span>
            <span className="text-xs text-slate-300">GeM 5.0 Decision Architecture</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white mt-0.5">
            Automated Bid Compliance & Statutory Verification Pipeline
          </h2>
          <p className="text-xs text-slate-300">
            Interactive visual flow showing multi-portal verification, risk classification, and procurement decision gating.
          </p>
        </div>

        {/* Bidder Switcher if multiple provided */}
        {allBidders.length > 0 && onSelectBidder && (
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-slate-300 font-medium">Test Bidder:</span>
            <select
              value={currentBidder?.id}
              onChange={(e) => {
                const b = allBidders.find(item => item.id === e.target.value);
                if (b) onSelectBidder(b);
              }}
              className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-semibold border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
            >
              {allBidders.map((b) => (
                <option key={b.id} value={b.id} className="bg-slate-900 text-white">
                  {b.companyName} ({b.verificationData?.complianceScore ?? 85} pts - {b.status})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Interactive Flow Area */}
      <div className="p-5 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Animated Tree Diagram (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Root Node: Tender Bid Received */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md p-3.5 rounded-xl border border-slate-300 bg-slate-50 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#002B49] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                BID
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-900">Bidder: {currentBidder?.companyName || 'Bidder Entity'}</div>
                <div className="text-[11px] text-slate-500">Ref: {currentBidder?.bidNumber} • {currentBidder?.location}</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-semibold">
              Packet Opened
            </span>
          </motion.div>

          {/* Flow Connector Line 1 */}
          <div className="w-0.5 h-6 bg-slate-300 relative flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping absolute" />
          </div>

          {/* Level 1: Four Parallel Statutory Gateway Nodes */}
          <div className="w-full grid grid-cols-2 gap-2.5 sm:gap-3">
            {steps.slice(0, 4).map((step) => {
              const Icon = step.icon;
              const isActive = activeStepId === step.id;
              const isPassed = step.status === 'passed';
              const isFailed = step.status === 'failed';

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepId(step.id)}
                  className={`p-3 rounded-xl border text-left transition-all relative group ${
                    isActive
                      ? 'border-[#2563EB] ring-2 ring-blue-500/20 bg-blue-50/50 shadow-md'
                      : isFailed
                      ? 'border-red-200 bg-red-50/40 hover:border-red-300'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className={`p-1.5 rounded-md ${
                        isFailed ? 'bg-red-100 text-red-700' : isPassed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-900 leading-tight">
                        {step.title.replace(/^\d+\.\s*/, '')}
                      </span>
                    </div>

                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : isFailed ? (
                      <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    )}
                  </div>
                  <div className="text-[10px] text-slate-600 line-clamp-1 font-medium">
                    {step.summary}
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-[9px] text-slate-400">
                    <span>API Handshake</span>
                    <span className="font-mono text-emerald-700 font-semibold">{step.latency}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Flow Connector Line 2 (Convergence into AI Engine) */}
          <div className="w-full flex flex-col items-center my-1">
            <div className="w-0.5 h-5 bg-slate-300 relative flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping absolute" />
            </div>
            <div className="px-3 py-0.5 rounded-full bg-purple-100 border border-purple-200 text-[10px] font-semibold text-purple-800">
              Gateway Responses Streamed to Engine
            </div>
            <div className="w-0.5 h-4 bg-slate-300" />
          </div>

          {/* Level 2: AI Verification Engine Convergence Node */}
          <button
            onClick={() => setActiveStepId('ai_engine')}
            className={`w-full max-w-lg p-4 rounded-xl border text-left transition-all relative ${
              activeStepId === 'ai_engine'
                ? 'border-purple-500 ring-2 ring-purple-500/20 bg-gradient-to-r from-purple-50/70 via-indigo-50/50 to-white shadow-md'
                : 'border-slate-200 bg-white hover:border-purple-200 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-purple-600 text-white shadow-sm">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    AI Multi-Source Cross-Verification Engine
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Discrepancy Matrix • Statutory Rule Evaluator
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-base font-extrabold ${
                  score >= 85 ? 'text-emerald-600' : score >= 65 ? 'text-amber-600' : 'text-red-600'
                }`}>
                  {score}/100
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  risk === 'Low' ? 'bg-emerald-100 text-emerald-800' : risk === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                }`}>
                  {risk} Risk
                </span>
              </div>
            </div>

            {/* Visual Risk Gauge bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
              <div
                className={`h-full transition-all duration-500 ${
                  score >= 85 ? 'bg-emerald-500' : score >= 65 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${score}%` }}
              />
            </div>

            <div className="mt-2 text-[11px] text-slate-600 flex items-center justify-between">
              <span>Recommendation: <strong>{currentBidder?.verificationData?.recommendation || 'Qualified'}</strong></span>
              <span className="text-[10px] text-purple-700 underline font-semibold">Inspect Reasoning →</span>
            </div>
          </button>

          {/* Flow Connector Line 3 (Three-way Decision Branch) */}
          <div className="w-full flex flex-col items-center my-1">
            <div className="w-0.5 h-4 bg-slate-300" />
            <div className="w-full max-w-md grid grid-cols-3 gap-2 text-center text-[9px] font-semibold text-slate-500">
              <span className="text-emerald-700">Score &ge; 85</span>
              <span className="text-amber-700">65 - 84</span>
              <span className="text-red-700">&lt; 65 or Flagged</span>
            </div>
            <div className="w-0.5 h-3 bg-slate-300" />
          </div>

          {/* Level 3: Terminal Node: Procurement Officer Final Decision & Blockchain Seal */}
          <button
            onClick={() => setActiveStepId('step_decision')}
            className={`w-full max-w-lg p-3.5 rounded-xl border text-left transition-all ${
              activeStepId === 'step_decision'
                ? 'border-emerald-600 ring-2 ring-emerald-500/20 bg-emerald-50/50 shadow-md'
                : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-700 text-white">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Procurement Officer Final Order</div>
                  <div className="text-[11px] text-slate-500">Human-in-the-Loop Approval & Blockchain Seal</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                <Lock className="w-3.5 h-3.5 text-emerald-700" />
                {currentBidder?.status || 'Qualified'}
              </div>
            </div>
          </button>
        </div>

        {/* Right Column: Node Details & Live Simulated Payload (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-blue-100 text-blue-800">
                  <activeStep.icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{activeStep.title}</h3>
                  <p className="text-[11px] text-slate-500 font-hindi">{activeStep.titleHindi}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                activeStep.status === 'passed'
                  ? 'bg-emerald-100 text-emerald-800'
                  : activeStep.status === 'failed'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {activeStep.status.toUpperCase()}
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed mb-4">
              <div>
                <span className="font-semibold text-slate-900 block mb-0.5">Verification Rule:</span>
                <p className="text-slate-600">{activeStep.details}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-800 block mb-1">
                  Legal & Procurement Authority:
                </span>
                <span className="text-[11px] text-blue-700 font-medium">
                  {activeStep.ruleRef}
                </span>
              </div>

              {/* Simulated Government API Handshake Payload Box */}
              <div>
                <span className="font-semibold text-slate-900 block mb-1">
                  Gateway Handshake & Telemetry:
                </span>
                <div className="bg-slate-900 text-slate-200 rounded-lg p-3 font-mono text-[10px] space-y-1 overflow-x-auto">
                  <div className="text-emerald-400 font-bold">GET {activeStep.apiEndpoint}</div>
                  <div className="text-slate-400">Response Status: 200 OK • Latency: {activeStep.latency}</div>
                  <div className="text-slate-400">Target ID: {currentBidder?.verificationData?.statutoryChecks?.gstinNumber || 'IND-CPPP-7721'}</div>
                  <div className="text-amber-300">Digest SHA-256: 8f2a1b9e09d9482... [AUTHENTIC]</div>
                </div>
              </div>

              {/* Highlights or Gaps */}
              {currentBidder?.verificationData?.gapsAndDiscrepancies && currentBidder.verificationData.gapsAndDiscrepancies.length > 0 && (
                <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-800">
                  <span className="font-bold flex items-center gap-1 mb-1 text-xs">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                    AI Flagged Discrepancies:
                  </span>
                  <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                    {currentBidder.verificationData.gapsAndDiscrepancies.map((g, i) => (
                      <li key={i}>{g}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Action button to open Full Interactive Audit Modal */}
          {onOpenAuditModal && currentBidder && (
            <button
              onClick={() => onOpenAuditModal(currentBidder)}
              className="w-full mt-3 py-2.5 px-4 rounded-lg bg-[#002B49] hover:bg-[#00385f] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Cpu className="w-4 h-4 text-[#FF9933]" />
              <span>Launch Full Multi-Portal AI Verification Engine</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
