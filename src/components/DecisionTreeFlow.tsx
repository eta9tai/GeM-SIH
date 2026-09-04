import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Lock,
  Play,
  RotateCcw,
  Clock,
  Sliders,
  Check,
  X,
  Zap
} from 'lucide-react';
import { Bidder } from '../types';

export type NodeVerificationStatus = 'pending' | 'verifying' | 'verified' | 'rejected';

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
  const [isAutoRunning, setIsAutoRunning] = useState<boolean>(false);
  const [autoRunStepIndex, setAutoRunStepIndex] = useState<number>(-1);
  const [autoRunSpeed, setAutoRunSpeed] = useState<'normal' | 'fast'>('normal');

  // If no bidder is selected, choose the first or a default
  const currentBidder = selectedBidder || allBidders[0];
  const checks = currentBidder?.verificationData?.statutoryChecks;
  const score = currentBidder?.verificationData?.complianceScore ?? 95;
  const risk = currentBidder?.verificationData?.riskLevel ?? 'Low';

  // Compute the statutory target outcome for each step based on the selected bidder
  const getTargetStatusForStep = (stepId: string): 'verified' | 'rejected' => {
    switch (stepId) {
      case 'step_statutory':
        return checks?.gstnStatus?.includes('Default') || checks?.panItrStatus?.includes('Defective')
          ? 'rejected'
          : 'verified';
      case 'step_entity':
        return checks?.debarmentStatus?.includes('FLAGGED')
          ? 'rejected'
          : 'verified';
      case 'step_technical':
        return checks?.oemAuthorizationValid === false || (checks?.makeInIndiaPercentage !== undefined && checks.makeInIndiaPercentage < 50)
          ? 'rejected'
          : 'verified';
      case 'step_labor':
        return checks?.epfoStatus?.includes('Non') || checks?.esicStatus?.includes('Default')
          ? 'rejected'
          : 'verified';
      case 'ai_engine':
        return score >= 65 && !checks?.debarmentStatus?.includes('FLAGGED') && !checks?.gstnStatus?.includes('Default')
          ? 'verified'
          : 'rejected';
      case 'step_decision':
        return currentBidder?.status === 'Disqualified'
          ? 'rejected'
          : 'verified';
      default:
        return 'verified';
    }
  };

  // Node verification statuses state
  const [nodeStatuses, setNodeStatuses] = useState<Record<string, NodeVerificationStatus>>(() => {
    const initial: Record<string, NodeVerificationStatus> = {
      step_statutory: getTargetStatusForStep('step_statutory'),
      step_entity: getTargetStatusForStep('step_entity'),
      step_technical: getTargetStatusForStep('step_technical'),
      step_labor: getTargetStatusForStep('step_labor'),
      ai_engine: getTargetStatusForStep('ai_engine'),
      step_decision: getTargetStatusForStep('step_decision')
    };
    return initial;
  });

  // Keep a record of recent verification logs for telemetry
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    'System initialized with standard GFR 2017 rule gates.',
    'Multi-source government connectors online (GSTN, Udyam, CBDT, DigiLocker).'
  ]);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setTelemetryLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 7)]);
  };

  // When selectedBidder changes, auto-trigger a re-verification check
  const prevBidderIdRef = useRef<string | undefined>(currentBidder?.id);
  useEffect(() => {
    if (currentBidder && currentBidder.id !== prevBidderIdRef.current) {
      prevBidderIdRef.current = currentBidder.id;
      // Animate transition to new bidder's target statuses
      triggerAutomatedVerification();
    }
  }, [currentBidder?.id]);

  const stepsOrder = ['step_statutory', 'step_entity', 'step_technical', 'step_labor', 'ai_engine', 'step_decision'];

  // Automated step-by-step verification pipeline simulation
  const triggerAutomatedVerification = () => {
    if (isAutoRunning) return;
    setIsAutoRunning(true);
    setAutoRunStepIndex(0);
    addLog(`Initiating automated multi-portal verification for ${currentBidder?.companyName || 'Bidder'}...`);

    // First reset all nodes to 'pending' with animation
    setNodeStatuses({
      step_statutory: 'pending',
      step_entity: 'pending',
      step_technical: 'pending',
      step_labor: 'pending',
      ai_engine: 'pending',
      step_decision: 'pending'
    });

    const stepDelay = autoRunSpeed === 'fast' ? 400 : 750;
    const verifyDelay = autoRunSpeed === 'fast' ? 300 : 500;

    let currentIndex = 0;

    const runNextStep = () => {
      if (currentIndex >= stepsOrder.length) {
        setIsAutoRunning(false);
        setAutoRunStepIndex(-1);
        addLog('Automated verification check complete. Final audit order ready.');
        return;
      }

      const stepId = stepsOrder[currentIndex];
      setAutoRunStepIndex(currentIndex);
      setActiveStepId(stepId);

      // Transition node: pending -> verifying
      setNodeStatuses(prev => ({ ...prev, [stepId]: 'verifying' }));
      addLog(`Auditing ${stepId.replace('step_', '')}: Sending API handshake...`);

      setTimeout(() => {
        // Transition node: verifying -> verified or rejected
        const finalStatus = getTargetStatusForStep(stepId);
        setNodeStatuses(prev => ({ ...prev, [stepId]: finalStatus }));
        addLog(`Status updated: ${stepId.replace('step_', '')} -> ${finalStatus.toUpperCase()}`);

        currentIndex++;
        setTimeout(runNextStep, stepDelay);
      }, verifyDelay);
    };

    setTimeout(runNextStep, 350);
  };

  // Reset all nodes to 'pending' to observe transitions
  const resetAllToPending = () => {
    setIsAutoRunning(false);
    setAutoRunStepIndex(-1);
    setNodeStatuses({
      step_statutory: 'pending',
      step_entity: 'pending',
      step_technical: 'pending',
      step_labor: 'pending',
      ai_engine: 'pending',
      step_decision: 'pending'
    });
    addLog('Manual Action: All nodes reset to [PENDING] status.');
  };

  // Manual verification check for a single node
  const handleManualStatusChange = (stepId: string, newStatus: NodeVerificationStatus) => {
    setNodeStatuses(prev => ({ ...prev, [stepId]: newStatus }));
    addLog(`Manual Check Override: ${stepId.replace('step_', '')} set to [${newStatus.toUpperCase()}]`);
  };

  // Simulate a single node gateway handshake check
  const handleSingleNodeVerify = (stepId: string) => {
    setNodeStatuses(prev => ({ ...prev, [stepId]: 'verifying' }));
    addLog(`Manual Gateway Handshake initiated on ${stepId}...`);

    setTimeout(() => {
      const target = getTargetStatusForStep(stepId);
      setNodeStatuses(prev => ({ ...prev, [stepId]: target }));
      addLog(`Manual Gateway Handshake completed: [${target.toUpperCase()}]`);
    }, 600);
  };

  const steps = [
    {
      id: 'step_statutory',
      title: '1. Statutory & Tax Gateways',
      titleHindi: 'वैधानिक और कर सत्यापन',
      icon: Building2,
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
      summary: `Udyam: ${checks?.udyamCategory || 'Micro'} | CPPP Debarment: ${checks?.debarmentStatus?.includes('FLAGGED') ? 'Debarred' : 'Clean'}`,
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
      summary: `Current Decision: ${currentBidder?.status || 'Qualified'}`,
      details: 'Procurement Officer reviews the AI recommendations, examines any flagged variance, issues Additional Terms & Conditions (ATC) notices or grants technical qualification, sealing the action into the immutable Blockchain Ledger.',
      ruleRef: 'Manual for Procurement of Goods 2024, Ministry of Finance',
      apiEndpoint: 'blockchain://gem-ledger.gov.in/blocks/seal-transaction',
      latency: '85ms'
    }
  ];

  const activeStep = steps.find(s => s.id === activeStepId) || steps[4];
  const activeStepStatus = nodeStatuses[activeStep.id] || 'verified';

  // Staggered entrance animation variants for the container and nodes
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const nodeEntranceVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };

  // Helper to render animated status badge
  const renderStatusBadge = (status: NodeVerificationStatus) => {
    return (
      <AnimatePresence mode="wait">
        {status === 'verified' && (
          <motion.span
            key="verified"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Verified</span>
          </motion.span>
        )}
        {status === 'rejected' && (
          <motion.span
            key="rejected"
            initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-300 shadow-xs"
          >
            <XCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span>Rejected</span>
          </motion.span>
        )}
        {status === 'verifying' && (
          <motion.span
            key="verifying"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300 shadow-xs"
          >
            <RefreshCw className="w-3 h-3 text-blue-600 animate-spin shrink-0" />
            <span>Verifying...</span>
          </motion.span>
        )}
        {status === 'pending' && (
          <motion.span
            key="pending"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 450, damping: 26 }}
            className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300 shadow-xs"
          >
            <Clock className="w-3 h-3 text-amber-600 shrink-0" />
            <span>Pending</span>
          </motion.span>
        )}
      </AnimatePresence>
    );
  };

  // Helper to determine node animated card style based on verification status
  const getNodeCardStyle = (stepId: string) => {
    const status = nodeStatuses[stepId] || 'verified';
    const isActive = activeStepId === stepId;

    if (status === 'verifying') {
      return {
        cardClass: 'border-blue-500 ring-2 ring-blue-500/30 bg-blue-50/50 shadow-md',
        iconClass: 'bg-blue-100 text-blue-700',
        animateProps: {
          scale: [1, 1.02, 1],
          boxShadow: [
            '0 0 0 0 rgba(59, 130, 246, 0.4)',
            '0 0 0 8px rgba(59, 130, 246, 0)',
            '0 0 0 0 rgba(59, 130, 246, 0.4)'
          ],
          transition: { repeat: Infinity, duration: 1.2 }
        }
      };
    }

    if (status === 'rejected') {
      return {
        cardClass: isActive
          ? 'border-red-600 ring-2 ring-red-500/30 bg-red-50/80 shadow-md'
          : 'border-red-300 bg-red-50/40 hover:border-red-400 hover:shadow-xs',
        iconClass: 'bg-red-100 text-red-700',
        animateProps: {
          x: [0, -6, 6, -4, 4, -2, 2, 0],
          scale: [0.97, 1.02, 1],
          transition: { duration: 0.5 }
        }
      };
    }

    if (status === 'verified') {
      return {
        cardClass: isActive
          ? 'border-emerald-600 ring-2 ring-emerald-500/25 bg-emerald-50/50 shadow-md'
          : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-xs',
        iconClass: 'bg-emerald-100 text-emerald-700',
        animateProps: {
          scale: [0.96, 1.03, 1],
          transition: { type: 'spring', stiffness: 450, damping: 22 }
        }
      };
    }

    // Pending
    return {
      cardClass: isActive
        ? 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/30 shadow-md'
        : 'border-slate-200 bg-slate-50/80 hover:border-slate-300',
      iconClass: 'bg-slate-200 text-slate-700',
      animateProps: {
        scale: 1,
        transition: { duration: 0.25 }
      }
    };
  };

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
            Interactive visual flow with live entrance and state-change animations reflecting transitions from Pending to Verified or Rejected statuses.
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

      {/* Verification Pipeline Action Toolbar */}
      <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={triggerAutomatedVerification}
            disabled={isAutoRunning}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-xs transition-all ${
              isAutoRunning
                ? 'bg-blue-600 text-white cursor-wait'
                : 'bg-[#002B49] hover:bg-[#003d69] text-white'
            }`}
            title="Run animated automated check across all gateways"
          >
            {isAutoRunning ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-300" />
                <span>Running Automated Check ({autoRunStepIndex + 1}/6)...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#FF9933] fill-[#FF9933]" />
                <span>Run Automated Verification Check</span>
              </>
            )}
          </button>

          <button
            onClick={resetAllToPending}
            disabled={isAutoRunning}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-300 flex items-center gap-1.5 transition-colors"
            title="Reset all nodes to Pending to re-run transitions"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset All to Pending</span>
          </button>

          {/* Speed Toggle */}
          <div className="hidden sm:flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 text-[11px] text-slate-600">
            <span className="px-1.5 text-slate-400 font-medium">Speed:</span>
            <button
              onClick={() => setAutoRunSpeed('normal')}
              className={`px-2 py-0.5 rounded font-bold ${autoRunSpeed === 'normal' ? 'bg-[#002B49] text-white' : 'hover:text-slate-900'}`}
            >
              1x
            </button>
            <button
              onClick={() => setAutoRunSpeed('fast')}
              className={`px-2 py-0.5 rounded font-bold ${autoRunSpeed === 'fast' ? 'bg-[#002B49] text-white' : 'hover:text-slate-900'}`}
            >
              2x Fast
            </button>
          </div>
        </div>

        {/* Status Indicators Summary */}
        <div className="flex items-center gap-2 text-xs font-medium">
          <span className="text-slate-500 text-[11px] hidden md:inline">Pipeline Status:</span>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {Object.values(nodeStatuses).filter(s => s === 'verified').length} Verified
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {Object.values(nodeStatuses).filter(s => s === 'rejected').length} Rejected
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              {Object.values(nodeStatuses).filter(s => s === 'pending').length} Pending
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Flow Area */}
      <div className="p-5 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Animated Tree Diagram (7 cols) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-center"
        >
          {/* Root Node: Tender Bid Received */}
          <motion.div
            variants={nodeEntranceVariants}
            className="w-full max-w-md p-3.5 rounded-xl border border-slate-300 bg-slate-50 shadow-sm flex items-center justify-between relative overflow-hidden"
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
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              Packet Opened
            </span>
          </motion.div>

          {/* Flow Connector Line 1 */}
          <div className="w-0.5 h-6 bg-slate-300 relative flex items-center justify-center">
            <motion.div
              animate={{ y: [-10, 10], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-2 h-2 rounded-full bg-blue-500 absolute"
            />
          </div>

          {/* Level 1: Four Parallel Statutory Gateway Nodes */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {steps.slice(0, 4).map((step, idx) => {
              const Icon = step.icon;
              const status = nodeStatuses[step.id] || 'verified';
              const cardStyle = getNodeCardStyle(step.id);

              return (
                <motion.div
                  key={step.id}
                  variants={nodeEntranceVariants}
                  animate={cardStyle.animateProps}
                  className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${cardStyle.cardClass}`}
                >
                  {/* Active Scanning Bar when in 'verifying' state */}
                  {status === 'verifying' && (
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-blue-400/25 to-transparent pointer-events-none"
                    />
                  )}

                  <div className="flex items-start justify-between gap-1 mb-1.5">
                    <button
                      onClick={() => setActiveStepId(step.id)}
                      className="flex items-center gap-1.5 text-left flex-1"
                    >
                      <div className={`p-1.5 rounded-md ${cardStyle.iconClass}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-900 leading-tight">
                        {step.title.replace(/^\d+\.\s*/, '')}
                      </span>
                    </button>

                    {/* Animated Status Badge */}
                    <div className="shrink-0">
                      {renderStatusBadge(status)}
                    </div>
                  </div>

                  <p
                    onClick={() => setActiveStepId(step.id)}
                    className="text-[10px] text-slate-600 line-clamp-1 font-medium cursor-pointer"
                  >
                    {step.summary}
                  </p>

                  <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400">
                    <button
                      onClick={() => setActiveStepId(step.id)}
                      className="text-blue-700 font-semibold hover:underline"
                    >
                      Inspect Gateway →
                    </button>

                    {/* Quick Manual Single Node Handshake Action */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSingleNodeVerify(step.id);
                      }}
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[9px] transition-colors"
                      title="Simulate manual check transition for this node"
                    >
                      <Zap className="w-2.5 h-2.5 text-amber-500" />
                      <span>Re-verify</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Flow Connector Line 2 (Convergence into AI Engine) */}
          <div className="w-full flex flex-col items-center my-1.5">
            <div className="w-0.5 h-4 bg-slate-300" />
            <motion.div
              variants={nodeEntranceVariants}
              className="px-3 py-0.5 rounded-full bg-purple-100 border border-purple-200 text-[10px] font-semibold text-purple-800 flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-3 h-3 text-purple-600" />
              <span>Gateway Responses Streamed to Engine</span>
            </motion.div>
            <div className="w-0.5 h-3 bg-slate-300" />
          </div>

          {/* Level 2: AI Verification Engine Convergence Node */}
          {(() => {
            const aiStatus = nodeStatuses['ai_engine'] || 'verified';
            const aiCardStyle = getNodeCardStyle('ai_engine');

            return (
              <motion.div
                variants={nodeEntranceVariants}
                animate={aiCardStyle.animateProps}
                className={`w-full max-w-lg p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                  activeStepId === 'ai_engine'
                    ? 'border-purple-500 ring-2 ring-purple-500/25 bg-gradient-to-r from-purple-50/80 via-indigo-50/50 to-white shadow-md'
                    : aiCardStyle.cardClass
                }`}
              >
                {aiStatus === 'verifying' && (
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-purple-400/25 to-transparent pointer-events-none"
                  />
                )}

                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => setActiveStepId('ai_engine')}
                    className="flex items-center gap-2 text-left"
                  >
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
                  </button>

                  <div className="text-right flex flex-col items-end gap-1">
                    {renderStatusBadge(aiStatus)}
                    <div className={`text-base font-extrabold leading-none ${
                      score >= 85 ? 'text-emerald-600' : score >= 65 ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {score}/100
                    </div>
                  </div>
                </div>

                {/* Visual Risk Gauge bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex my-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full ${
                      score >= 85 ? 'bg-emerald-500' : score >= 65 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                  />
                </div>

                <div className="mt-1 text-[11px] text-slate-600 flex items-center justify-between">
                  <span>
                    Recommendation: <strong className={score >= 70 ? 'text-emerald-700' : 'text-red-700'}>
                      {currentBidder?.verificationData?.recommendation || 'Qualified'}
                    </strong>
                  </span>
                  <button
                    onClick={() => setActiveStepId('ai_engine')}
                    className="text-[10px] text-purple-700 underline font-semibold"
                  >
                    Inspect Reasoning →
                  </button>
                </div>
              </motion.div>
            );
          })()}

          {/* Flow Connector Line 3 (Three-way Decision Branch) */}
          <div className="w-full flex flex-col items-center my-1.5">
            <div className="w-0.5 h-3.5 bg-slate-300" />
            <div className="w-full max-w-md grid grid-cols-3 gap-2 text-center text-[9px] font-semibold text-slate-500">
              <span className="text-emerald-700">Score &ge; 85 (Pass)</span>
              <span className="text-amber-700">65 - 84 (Clarify)</span>
              <span className="text-red-700">&lt; 65 (Reject)</span>
            </div>
            <div className="w-0.5 h-3 bg-slate-300" />
          </div>

          {/* Level 3: Terminal Node: Procurement Officer Final Decision & Blockchain Seal */}
          {(() => {
            const decisionStatus = nodeStatuses['step_decision'] || 'verified';
            const decisionCardStyle = getNodeCardStyle('step_decision');

            return (
              <motion.div
                variants={nodeEntranceVariants}
                animate={decisionCardStyle.animateProps}
                className={`w-full max-w-lg p-3.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                  activeStepId === 'step_decision'
                    ? 'border-emerald-600 ring-2 ring-emerald-500/20 bg-emerald-50/50 shadow-md'
                    : decisionCardStyle.cardClass
                }`}
              >
                {decisionStatus === 'verifying' && (
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent pointer-events-none"
                  />
                )}

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setActiveStepId('step_decision')}
                    className="flex items-center gap-2.5 text-left flex-1"
                  >
                    <div className="p-2 rounded-lg bg-emerald-700 text-white">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Procurement Officer Final Order</div>
                      <div className="text-[11px] text-slate-500">Human-in-the-Loop Approval & Blockchain Seal</div>
                    </div>
                  </button>

                  <div className="flex items-center gap-2 shrink-0">
                    {renderStatusBadge(decisionStatus)}
                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                      <Lock className="w-3 h-3 text-slate-500" />
                      <span>{currentBidder?.status || 'Qualified'}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </motion.div>

        {/* Right Column: Node Details & Live Simulated Payload (5 cols) */}
        <div className="lg:col-span-5 bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 flex flex-col justify-between space-y-4">
          <div>
            {/* Active Step Header with Animated Status Badge */}
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
              <div>
                {renderStatusBadge(activeStepStatus)}
              </div>
            </div>

            {/* Manual Verification Check & Status Override Interactive Toolbar */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs mb-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-blue-600" />
                  Manual Check Controls
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Toggle state to test animations</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => handleManualStatusChange(activeStep.id, 'pending')}
                  className={`px-2 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                    activeStepStatus === 'pending'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300 ring-2 ring-amber-400/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <Clock className="w-3 h-3 text-amber-600" />
                  <span>Pending</span>
                </button>

                <button
                  onClick={() => handleManualStatusChange(activeStep.id, 'verified')}
                  className={`px-2 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                    activeStepStatus === 'verified'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 ring-2 ring-emerald-500/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>Verify (Pass)</span>
                </button>

                <button
                  onClick={() => handleManualStatusChange(activeStep.id, 'rejected')}
                  className={`px-2 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                    activeStepStatus === 'rejected'
                      ? 'bg-red-100 text-red-900 border border-red-300 ring-2 ring-red-500/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <X className="w-3 h-3 text-red-600" />
                  <span>Reject (Fail)</span>
                </button>
              </div>

              {/* Simulate Single Gateway Handshake Animation */}
              <button
                onClick={() => handleSingleNodeVerify(activeStep.id)}
                className="w-full py-1 px-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold flex items-center justify-center gap-1.5 border border-blue-200 transition-colors"
              >
                <RefreshCw className="w-3 h-3 text-blue-600" />
                <span>Simulate Gateway Check (Pending &rarr; Verifying &rarr; Result)</span>
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed mb-3">
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

              {/* Gateway Telemetry and Live Logs */}
              <div>
                <span className="font-semibold text-slate-900 block mb-1">
                  Gateway Handshake & Verification Telemetry:
                </span>
                <div className="bg-slate-900 text-slate-200 rounded-lg p-3 font-mono text-[10px] space-y-1 overflow-x-auto max-h-36">
                  <div className="text-emerald-400 font-bold">GET {activeStep.apiEndpoint}</div>
                  <div className="text-slate-400">Response Status: 200 OK • Latency: {activeStep.latency}</div>
                  <div className="text-amber-300">Digest SHA-256: 8f2a1b9e09d9482... [SEALED]</div>
                  <div className="h-px bg-slate-800 my-1" />
                  <div className="text-slate-400 font-sans text-[9px] uppercase font-bold tracking-wider">Live Activity Log:</div>
                  {telemetryLogs.map((log, i) => (
                    <div key={i} className="text-slate-300 font-mono text-[9px] truncate">
                      {log}
                    </div>
                  ))}
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
              className="w-full py-2.5 px-4 rounded-lg bg-[#002B49] hover:bg-[#00385f] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
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

