import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  ShieldAlert,
  Play,
  RotateCcw,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ArrowRight,
  Activity,
  Server,
  Zap,
  Radio,
  FileCheck,
  Building2,
  Sparkles,
  Layers
} from 'lucide-react';
import { Bidder } from '../types';

interface HandshakeSimulatorProps {
  bidder: Bidder;
  tenderRef: string;
  onSimulationComplete?: (results: any) => void;
}

interface SimulatedHub {
  id: string;
  name: string;
  category: 'bidder' | 'regulatory' | 'tax' | 'labor' | 'blockchain';
  state: string;
  city: string;
  x: number; // 0 - 100%
  y: number; // 0 - 100%
  ipAddress: string;
}

interface HandshakeStepData {
  id: string;
  name: string;
  titleHindi: string;
  targetHubId: string;
  protocol: string;
  gateway: string;
  statutoryScope: string;
  latencyMs: number;
  status: 'idle' | 'in_transit' | 'verified_safe' | 'anomaly_flagged';
  anomalyMessage?: string;
  verificationBadge: string;
  auditHash: string;
}

export const HandshakeSimulator: React.FC<HandshakeSimulatorProps> = ({
  bidder,
  tenderRef,
  onSimulationComplete
}) => {
  const isAnomalyBidder = bidder.verificationData.riskLevel === 'High' || bidder.status === 'Disqualified';

  // State hubs across India
  const HUBS: SimulatedHub[] = [
    {
      id: 'hub-bidder',
      name: `${bidder.companyName.substring(0, 20)}...`,
      category: 'bidder',
      state: bidder.state,
      city: bidder.location.split(',')[0],
      x: bidder.state === 'Rajasthan' ? 25 : bidder.state === 'Maharashtra' ? 28 : bidder.state === 'West Bengal' ? 76 : 35,
      y: bidder.state === 'Rajasthan' ? 38 : bidder.state === 'Maharashtra' ? 62 : bidder.state === 'West Bengal' ? 50 : 55,
      ipAddress: '103.24.182.44 (State Node)'
    },
    {
      id: 'hub-delhi-central',
      name: 'Delhi NCR Central Gateway',
      category: 'regulatory',
      state: 'Delhi',
      city: 'New Delhi (CGO Complex)',
      x: 44,
      y: 28,
      ipAddress: '164.100.24.1 (NIC Central)'
    },
    {
      id: 'hub-gstn',
      name: 'GSTN Central Council Gateway',
      category: 'tax',
      state: 'Delhi NCR',
      city: 'Aerocity, New Delhi',
      x: 49,
      y: 24,
      ipAddress: '10.198.112.50 (GSTN-GSP)'
    },
    {
      id: 'hub-cbdt',
      name: 'CBDT Income Tax CPC',
      category: 'tax',
      state: 'Karnataka',
      city: 'Electronic City, Bengaluru',
      x: 46,
      y: 78,
      ipAddress: '14.139.120.10 (CPC Bengaluru)'
    },
    {
      id: 'hub-udyam',
      name: 'Ministry of MSME Udyam Core',
      category: 'regulatory',
      state: 'Delhi',
      city: 'Udyog Bhawan, New Delhi',
      x: 39,
      y: 32,
      ipAddress: '164.100.56.20 (MSME API)'
    },
    {
      id: 'hub-labour',
      name: 'MoLE Shram Suvidha & Child Labor Registry',
      category: 'labor',
      state: 'Delhi',
      city: 'Shram Shakti Bhawan, New Delhi',
      x: 52,
      y: 35,
      ipAddress: '103.111.44.82 (MoLE PENCIL)'
    },
    {
      id: 'hub-cppp',
      name: 'CPPP National Holiday Listing Ledger',
      category: 'regulatory',
      state: 'Delhi',
      city: 'NIC Vigyan Bhawan, New Delhi',
      x: 57,
      y: 30,
      ipAddress: '164.100.12.8 (CPPP DB)'
    },
    {
      id: 'hub-blockchain',
      name: 'GeM Gov Blockchain Ledger Cluster',
      category: 'blockchain',
      state: 'National Cloud',
      city: 'NIC Meghraj Gov Cloud',
      x: 62,
      y: 70,
      ipAddress: '10.220.88.9 (Hyperledger Gov)'
    }
  ];

  // The sequential handshake steps
  const INITIAL_STEPS: HandshakeStepData[] = [
    {
      id: 'step-gstn',
      name: 'GSTN Gateway Handshake',
      titleHindi: 'जीएसटीएन नेटवर्क सत्यापन',
      targetHubId: 'hub-gstn',
      protocol: 'REST API over mTLS 1.3 (256-bit)',
      gateway: 'GSTN GSP Direct Nodal Switch',
      statutoryScope: 'Active GSTR-3B filings, tax clearance & registration validity',
      latencyMs: 142,
      status: 'idle',
      verificationBadge: 'SAFE & SOUND (GST Active)',
      auditHash: '0x99fa1b89...cde2'
    },
    {
      id: 'step-cbdt',
      name: 'CBDT Income Tax Handshake',
      titleHindi: 'आयकर विभाग सीबीडीटी हैंडशेक',
      targetHubId: 'hub-cbdt',
      protocol: 'JSON-RPC 2.0 with HMAC-SHA256',
      gateway: 'CPC Bengaluru Direct Line',
      statutoryScope: '3-Year ITR Form V verification, PAN-Aadhaar linkage & Turnover audit',
      latencyMs: 188,
      status: 'idle',
      verificationBadge: 'SAFE & SOUND (ITR Filed)',
      auditHash: '0x77bc4a12...89ef'
    },
    {
      id: 'step-udyam',
      name: 'MSME Udyam Standing Handshake',
      titleHindi: 'एमएसएमई उद्यम पोर्टल हैंडशेक',
      targetHubId: 'hub-udyam',
      protocol: 'OAuth2 with PKCS#7 Signed Token',
      gateway: 'Ministry of MSME Gateway',
      statutoryScope: 'Micro/Small Enterprise classification & EMD Exemption waiver',
      latencyMs: 110,
      status: 'idle',
      verificationBadge: 'SAFE & SOUND (Udyam Verified)',
      auditHash: '0x33ef9012...55aa'
    },
    {
      id: 'step-labour',
      name: 'Labour Law & Child Labour Non-Engagement Handshake',
      titleHindi: 'श्रम कानून एवं बाल श्रम निषेध हैंडशेक',
      targetHubId: 'hub-labour',
      protocol: 'Shram Suvidha REST & PENCIL API',
      gateway: 'Ministry of Labour & Employment',
      statutoryScope: 'Child Labour Act 1986 Section 14 check & Minimum Wages Act 1948',
      latencyMs: 165,
      status: 'idle',
      anomalyMessage: isAnomalyBidder ? 'ANOMALY DETECTED: Missing statutory Section 14 non-engagement undertaking. Text deviation > 40%.' : undefined,
      verificationBadge: isAnomalyBidder ? 'ANOMALY DETECTED (Variance 48.6%)' : 'SAFE & SOUND (Zero Child Labour)',
      auditHash: '0x55aa3312...ee88'
    },
    {
      id: 'step-cppp',
      name: 'CPPP Holiday Listing & Debarment Scan Handshake',
      titleHindi: 'सीपीडब्ल्यूपी हॉलिडे लिस्टिंग एवं ब्लैकलिस्ट स्कैन',
      targetHubId: 'hub-cppp',
      protocol: 'Encrypted ZK-SNARK Query',
      gateway: 'CPPP National Central Registry',
      statutoryScope: 'Cross-screening across 82 CPSEs, Defence, Railways and MoF debarred records',
      latencyMs: 195,
      status: 'idle',
      anomalyMessage: isAnomalyBidder ? 'ANOMALY DETECTED: Match found on CPPP Banning list.' : undefined,
      verificationBadge: isAnomalyBidder ? 'CRITICAL ANOMALY (Debarment Flagged)' : 'SAFE & SOUND (No Holiday Listing)',
      auditHash: '0x11ab4499...bb77'
    },
    {
      id: 'step-blockchain',
      name: 'GeM Blockchain Ledger Consensus Handshake',
      titleHindi: 'जीईएम ब्लॉकचेन लेज़र अंतिम सील',
      targetHubId: 'hub-blockchain',
      protocol: 'Hyperledger Besu State Commit / EVM Call',
      gateway: 'NIC Meghraj Blockchain Node',
      statutoryScope: 'Merkle root verification, immutable cryptographic seal & audit block write',
      latencyMs: 230,
      status: 'idle',
      verificationBadge: 'SAFE & SOUND (Block Sealed)',
      auditHash: '0x88cc2211...ffff'
    }
  ];

  const [steps, setSteps] = useState<HandshakeStepData[]>(INITIAL_STEPS);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [activePacket, setActivePacket] = useState<{
    from: SimulatedHub;
    to: SimulatedHub;
    stepName: string;
  } | null>(null);

  // Reset steps when bidder changes
  useEffect(() => {
    setSteps(INITIAL_STEPS);
    setIsRunning(false);
    setActiveStepIndex(-1);
    setActivePacket(null);
  }, [bidder.id]);

  const handleStartSimulation = async () => {
    setIsRunning(true);
    const bidderHub = HUBS.find(h => h.id === 'hub-bidder') || HUBS[0];

    for (let i = 0; i < steps.length; i++) {
      setActiveStepIndex(i);
      const currentStep = steps[i];
      const targetHub = HUBS.find(h => h.id === currentStep.targetHubId) || HUBS[1];

      // 1. Packet in transit from Bidder State to Target Hub
      setActivePacket({
        from: bidderHub,
        to: targetHub,
        stepName: currentStep.name
      });

      setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'in_transit' } : s));

      // Wait 700ms travel time
      await new Promise(r => setTimeout(r, 700));

      // 2. Verified or Anomaly
      const isFailed = isAnomalyBidder && (currentStep.id === 'step-labour' || currentStep.id === 'step-cppp');
      setSteps(prev => prev.map((s, idx) => idx === i ? {
        ...s,
        status: isFailed ? 'anomaly_flagged' : 'verified_safe'
      } : s));

      // Wait 400ms dwell time
      await new Promise(r => setTimeout(r, 450));
    }

    setActivePacket(null);
    setIsRunning(false);
    if (onSimulationComplete) {
      onSimulationComplete({ completed: true, isAnomaly: isAnomalyBidder });
    }
  };

  const handleReset = () => {
    setSteps(INITIAL_STEPS);
    setIsRunning(false);
    setActiveStepIndex(-1);
    setActivePacket(null);
  };

  const bidderHub = HUBS[0];

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 border border-slate-700 shadow-xl overflow-hidden relative" id="multi-state-handshake-simulator">
      {/* Background Cyber Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-25 pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              SAFE & SOUND • MULTI-STATE ARCHITECTURE
            </span>
            <span className="text-xs text-slate-400 font-mono">
              mTLS 1.3 / 256-bit Encrypted
            </span>
          </div>

          <h3 className="text-lg font-black text-white tracking-tight mt-1 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            Inter-State Statutory Handshake Simulator
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time automated cryptographic packet routing between <strong className="text-amber-300">{bidder.companyName} ({bidder.state})</strong> and Central Government Portals.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleStartSimulation}
            disabled={isRunning}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg ${
              isRunning
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-950'
            }`}
          >
            <Play className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Handshakes In Transit...' : 'Initiate Full Handshake Simulation'}</span>
          </button>

          <button
            onClick={handleReset}
            disabled={isRunning}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reset Simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Simulation View: Left Map Diagram + Right Handshake Steps */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* LEFT: Interactive Map Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/90 rounded-xl p-4 border border-slate-800 relative min-h-[360px] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>INDIAN NATIONAL PROCUREMENT GRID (NICNET)</span>
            </div>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
              NODES ONLINE: 8 / 8
            </span>
          </div>

          {/* Graphical Map Canvas with Nodes & Connecting Lines */}
          <div className="relative w-full h-[280px] bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 rounded-lg overflow-hidden border border-slate-800/80">
            {/* Background SVG Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {HUBS.filter(h => h.id !== 'hub-bidder').map((hub) => (
                <line
                  key={hub.id}
                  x1={`${bidderHub.x}%`}
                  y1={`${bidderHub.y}%`}
                  x2={`${hub.x}%`}
                  y2={`${hub.y}%`}
                  stroke="#334155"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Active Traveling Packet Line */}
              {activePacket && (
                <motion.line
                  x1={`${activePacket.from.x}%`}
                  y1={`${activePacket.from.y}%`}
                  x2={`${activePacket.to.x}%`}
                  y2={`${activePacket.to.y}%`}
                  stroke={isAnomalyBidder && (activePacket.to.id === 'hub-labour' || activePacket.to.id === 'hub-cppp') ? '#f43f5e' : '#10b981'}
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.65, ease: 'easeInOut' }}
                />
              )}
            </svg>

            {/* Traveling Data Packet Animation */}
            <AnimatePresence>
              {activePacket && (
                <motion.div
                  initial={{
                    left: `${activePacket.from.x}%`,
                    top: `${activePacket.from.y}%`,
                    scale: 0.8,
                    opacity: 0
                  }}
                  animate={{
                    left: `${activePacket.to.x}%`,
                    top: `${activePacket.to.y}%`,
                    scale: 1.2,
                    opacity: 1
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
                >
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-[9px] font-black shadow-lg shadow-emerald-500/50 uppercase tracking-tighter">
                    <Zap className="w-2.5 h-2.5 fill-current" />
                    <span>256b TLS Packet</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Node Pins on Map */}
            {HUBS.map((hub) => {
              const isBidder = hub.id === 'hub-bidder';
              const isTargetActive = activePacket && activePacket.to.id === hub.id;

              return (
                <div
                  key={hub.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                  style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                >
                  <div className="flex flex-col items-center">
                    {/* Glowing Ping Ring */}
                    <div className="relative">
                      {isTargetActive && (
                        <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                      )}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                        isBidder
                          ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                          : hub.category === 'blockchain'
                          ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                          : hub.category === 'labor'
                          ? 'bg-orange-600 text-white ring-2 ring-orange-400'
                          : 'bg-blue-600 text-white ring-2 ring-blue-400'
                      }`}>
                        {isBidder ? (
                          <Building2 className="w-4 h-4" />
                        ) : hub.category === 'blockchain' ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <Server className="w-4 h-4" />
                        )}
                      </div>
                    </div>

                    {/* Node Label Tooltip */}
                    <div className="mt-1 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-[10px] font-bold text-slate-200 whitespace-nowrap shadow-md">
                      {hub.name}
                    </div>
                    <div className="text-[9px] text-slate-400 font-mono">
                      {hub.state}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Security Telemetry Bar */}
          <div className="mt-3 pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Safe & Sound: Zero Man-in-the-Middle Risk</span>
            </div>
            <span>TENDER: {tenderRef}</span>
          </div>
        </div>

        {/* RIGHT: Sequential Handshake Steps List (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between mb-1">
            <span>Automated Handshake Pipeline</span>
            <span className="text-[10px] font-mono text-emerald-400">6 Gateways Connected</span>
          </div>

          {steps.map((step, idx) => {
            const isCurrent = activeStepIndex === idx;
            const isVerified = step.status === 'verified_safe';
            const isFailed = step.status === 'anomaly_flagged';
            const inTransit = step.status === 'in_transit';

            return (
              <div
                key={step.id}
                className={`p-3 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-slate-800/90 border-emerald-500 shadow-md ring-1 ring-emerald-500/40'
                    : isVerified
                    ? 'bg-slate-950/70 border-emerald-900/60'
                    : isFailed
                    ? 'bg-rose-950/70 border-rose-600'
                    : 'bg-slate-950/40 border-slate-800 opacity-80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    {/* Status Icon */}
                    <div className="mt-0.5 shrink-0">
                      {inTransit ? (
                        <div className="w-5 h-5 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
                      ) : isVerified ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : isFailed ? (
                        <ShieldAlert className="w-5 h-5 text-rose-500 animate-bounce" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-600 text-[10px] flex items-center justify-center text-slate-400 font-mono">
                          {idx + 1}
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{step.name}</span>
                        <span className="text-[10px] text-slate-400 font-hindi hidden sm:inline">
                          ({step.titleHindi})
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300 mt-0.5">
                        {step.statutoryScope}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-1 flex items-center gap-2">
                        <span>{step.protocol}</span>
                        <span>•</span>
                        <span>{step.latencyMs}ms</span>
                      </div>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="shrink-0 text-right">
                    {isVerified && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {step.verificationBadge}
                      </span>
                    )}
                    {isFailed && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-900 text-rose-200 border border-rose-600">
                        {step.verificationBadge}
                      </span>
                    )}
                    {inTransit && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 animate-pulse border border-amber-800">
                        Pinging Gateway...
                      </span>
                    )}
                  </div>
                </div>

                {/* Anomaly text warning if failed */}
                {isFailed && step.anomalyMessage && (
                  <div className="mt-2 pt-2 border-t border-rose-800 text-[11px] text-rose-200 flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>{step.anomalyMessage}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
