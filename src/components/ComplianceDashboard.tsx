import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  ShieldAlert,
  FileText,
  AlertTriangle,
  Building2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Search,
  Filter,
  Layers,
  Activity,
  Award,
  CreditCard,
  Users,
  FileCheck2,
  Lock,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Zap,
  Printer,
  Download,
  Info,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { Tender, Bidder, BidderDocumentRecord, ComplianceDocCategory } from '../types';
import { COMPLIANCE_PARAMETER_GROUPS } from '../data/mockComplianceDocs';
import { SampleLetterModal } from './SampleLetterModal';
import { HandshakeSimulator } from './HandshakeSimulator';

interface ComplianceDashboardProps {
  tenders: Tender[];
  selectedTenderId?: string;
  onTenderSelect?: (tenderId: string) => void;
  onSealAuditOnBlockchain?: (tenderRef: string, bidderName: string, remarks: string, isApproved: boolean) => void;
}

export const ComplianceDashboard: React.FC<ComplianceDashboardProps> = ({
  tenders,
  selectedTenderId,
  onTenderSelect,
  onSealAuditOnBlockchain
}) => {
  // Current Tender state
  const activeTender = useMemo(() => {
    if (selectedTenderId) {
      const found = tenders.find(t => t.id === selectedTenderId || t.tenderId === selectedTenderId);
      if (found) return found;
    }
    return tenders[0];
  }, [tenders, selectedTenderId]);

  // Current Bidder state (default to L1 bidder)
  const [selectedBidderId, setSelectedBidderId] = useState<string>(
    activeTender?.bids[0]?.id || ''
  );

  // Synchronize bidder selection when tender changes
  React.useEffect(() => {
    if (activeTender && activeTender.bids.length > 0) {
      // Keep existing bidder if exists in new tender, otherwise select first (L1)
      const exists = activeTender.bids.some(b => b.id === selectedBidderId);
      if (!exists) {
        setSelectedBidderId(activeTender.bids[0].id);
      }
    }
  }, [activeTender]);

  const activeBidder = useMemo(() => {
    return activeTender?.bids.find(b => b.id === selectedBidderId) || activeTender?.bids[0];
  }, [activeTender, selectedBidderId]);

  // Modal State for Sample Letter
  const [previewDocument, setPreviewDocument] = useState<BidderDocumentRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<ComplianceDocCategory | 'all'>('all');
  const [showAnomaliesOnly, setShowAnomaliesOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showHandshakeSimulator, setShowHandshakeSimulator] = useState<boolean>(true);

  // Officer sign-off state
  const [auditRemarks, setAuditRemarks] = useState<string>('All statutory compliance declarations verified according to GFR 2017 & Annexure-1 norms.');
  const [sealedSuccessMsg, setSealedSuccessMsg] = useState<string | null>(null);

  // Filtered documents
  const allDocs: BidderDocumentRecord[] = activeBidder?.complianceDocuments || [];

  const filteredDocs = useMemo(() => {
    return allDocs.filter(doc => {
      if (selectedCategory !== 'all' && doc.category !== selectedCategory) return false;
      if (showAnomaliesOnly && !doc.isAnomaly && doc.variancePercentage <= 40) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = doc.title.toLowerCase().includes(q);
        const matchCode = doc.docCode.toLowerCase().includes(q);
        const matchRef = doc.pdfAnnexureRef.toLowerCase().includes(q);
        if (!matchTitle && !matchCode && !matchRef) return false;
      }
      return true;
    });
  }, [allDocs, selectedCategory, showAnomaliesOnly, searchQuery]);

  // Total anomalies count
  const anomalyCount = useMemo(() => {
    return allDocs.filter(d => d.isAnomaly || d.variancePercentage > 40).length;
  }, [allDocs]);

  // Open Sample Letter modal
  const handleOpenLetter = (doc: BidderDocumentRecord) => {
    setPreviewDocument(doc);
    setIsModalOpen(true);
  };

  // Seal on Blockchain
  const handleSealAudit = (isApproved: boolean) => {
    if (!activeBidder || !activeTender) return;
    if (onSealAuditOnBlockchain) {
      onSealAuditOnBlockchain(
        activeTender.referenceNumber,
        activeBidder.companyName,
        auditRemarks,
        isApproved
      );
    }
    setSealedSuccessMsg(`Cryptographic audit hash generated & sealed onto GeM Gov Blockchain Ledger for ${activeBidder.companyName}!`);
    setTimeout(() => setSealedSuccessMsg(null), 5000);
  };

  const getCategoryIcon = (category: ComplianceDocCategory) => {
    switch (category) {
      case 'core_identity':
        return <ShieldCheck className="w-4 h-4 text-blue-600" />;
      case 'financial_banking':
        return <CreditCard className="w-4 h-4 text-emerald-600" />;
      case 'bidding_credentials':
        return <Award className="w-4 h-4 text-purple-600" />;
      case 'labor_welfare':
        return <Users className="w-4 h-4 text-amber-600" />;
      case 'integrity_declarations':
        return <FileCheck2 className="w-4 h-4 text-rose-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6" id="compliance-dashboard-root">
      
      {/* Top Banner: GeM Compliance Verification Control Center */}
      <div className="bg-gradient-to-r from-[#002B49] via-[#083b63] to-[#002B49] rounded-2xl p-6 text-white shadow-xl border border-blue-900 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                ANNEXURE-1 STATUTORY AUDIT DESK
              </span>
              <span className="text-xs text-blue-200 font-mono">
                GeM Automated Regulatory Verification Engine
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
              Bidder Compliance & Variance Analysis Matrix
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Real-time multi-state statutory handshake simulation, document variance tracking (1%-5% baseline), child labor prohibition declarations, and cryptographic blockchain audit seals.
            </p>
          </div>

          {/* Tender Dropdown Selector */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 min-w-[280px] shrink-0">
            <label className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-1 flex items-center justify-between">
              <span>Select Active Tender</span>
              <span className="text-white/60 font-mono text-[10px]">{tenders.length} Live Tenders</span>
            </label>
            <select
              value={activeTender?.id}
              onChange={(e) => {
                if (onTenderSelect) onTenderSelect(e.target.value);
              }}
              className="w-full bg-slate-900/90 text-white font-medium text-xs rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {tenders.map((t) => (
                <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                  {t.referenceNumber} - {t.title.substring(0, 45)}...
                </option>
              ))}
            </select>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-300">
              <span>{activeTender?.organisation}</span>
              <span className="font-mono text-amber-300">₹{(activeTender?.tenderValue || 0).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tender Summary Bar */}
      {activeTender && (
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold font-mono">
              GeM
            </span>
            <div>
              <div className="font-bold text-slate-900 text-sm">{activeTender.title}</div>
              <div className="text-slate-500 flex items-center gap-2 mt-0.5">
                <span className="font-mono">{activeTender.referenceNumber}</span>
                <span>•</span>
                <span>{activeTender.department} ({activeTender.location})</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 font-mono">
            <div className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700">
              <span className="text-[10px] text-slate-500 block uppercase">Estimated Value</span>
              <span className="font-bold">₹{((activeTender.tenderValue || 0) / 100000).toFixed(2)} Lakhs</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="text-[10px] text-emerald-600 block uppercase">Bidders Evaluated</span>
              <span className="font-bold">{activeTender.bids.length} Active Bids</span>
            </div>
          </div>
        </div>
      )}

      {/* 5 Bidders Comparative Bar (Her tender ke 5 bidder!) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              5 Bidders Technical & Statutory Evaluation Matrix
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold font-mono">
              {activeTender?.bids.length} Bidders Loaded
            </span>
          </div>
          <span className="text-xs text-slate-500">
            Click any bidder to inspect detailed parameter documents & launch handshake simulation
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {activeTender?.bids.map((bidder) => {
            const isSelected = bidder.id === selectedBidderId;
            const isAnomaly = bidder.verificationData.riskLevel === 'High' || bidder.status === 'Disqualified';
            const isL1 = bidder.rank === 'L1';
            const score = bidder.verificationData.complianceScore;

            return (
              <motion.div
                key={bidder.id}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedBidderId(bidder.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all relative ${
                  isSelected
                    ? isAnomaly
                      ? 'bg-rose-50/80 border-rose-500 shadow-md ring-2 ring-rose-500/30'
                      : 'bg-blue-50/80 border-blue-600 shadow-md ring-2 ring-blue-600/30'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                {/* L1 or Rank Pill */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-black font-mono ${
                    isL1
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : bidder.rank === 'L2'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-800'
                  }`}>
                    {bidder.rank || 'BID'}
                  </span>

                  {isAnomaly ? (
                    <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 text-[10px] font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-rose-600" />
                      ANOMALY
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      QUALIFIED
                    </span>
                  )}
                </div>

                {/* Company Name */}
                <h3 className="text-xs font-bold text-slate-900 line-clamp-2 min-h-[32px]">
                  {bidder.companyName}
                </h3>

                <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{bidder.location}</span>
                </div>

                {/* Quoted Price */}
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Quoted Amount:</span>
                  <span className="font-bold font-mono text-slate-900">
                    ₹{(bidder.quotedAmount || bidder.amount || 0).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Compliance Score Bar */}
                <div className="mt-2">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-slate-500">Compliance:</span>
                    <span className={`font-bold font-mono ${
                      isAnomaly ? 'text-rose-600' : 'text-emerald-700'
                    }`}>
                      {score}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isAnomaly ? 'bg-rose-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>

                {/* Selected Indicator Arrow */}
                {isSelected && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-inherit border-r border-b border-inherit pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Inter-State Statutory Handshake Simulator for Selected Bidder */}
      {activeBidder && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                Live Inter-State API Handshake Simulation ({activeBidder.companyName})
              </h3>
            </div>
            <button
              onClick={() => setShowHandshakeSimulator(prev => !prev)}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 underline"
            >
              {showHandshakeSimulator ? 'Hide Simulation Canvas' : 'Show Simulation Canvas'}
            </button>
          </div>

          <AnimatePresence>
            {showHandshakeSimulator && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <HandshakeSimulator
                  bidder={activeBidder}
                  tenderRef={activeTender?.referenceNumber || 'GEM/2026/BID'}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Parameter-Wise Compliance Documents Matrix */}
      {activeBidder && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          
          {/* Section Header & Search/Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-mono text-[11px] font-bold">
                  {activeBidder.bidNumber}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {allDocs.length} Total Verification Documents
                </span>
                {anomalyCount > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 font-bold text-xs flex items-center gap-1 animate-pulse">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    {anomalyCount} Anomaly Flagged (&gt;40% Variance)
                  </span>
                )}
              </div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight mt-1">
                Statutory Proforma Documents & Baseline Variance Analysis
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Standard scanning & OCR baseline variance ranges from <strong>1.0% to 5.0%</strong>. Critical statutory anomalies & omissions exceed <strong>40.0%</strong>.
              </p>
            </div>

            {/* Filter Buttons & Search */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search document / act..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                />
              </div>

              {/* Anomaly Toggle Button */}
              <button
                onClick={() => setShowAnomaliesOnly(prev => !prev)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  showAnomaliesOnly
                    ? 'bg-rose-600 text-white shadow-sm shadow-rose-900/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Show Anomalies Only (&gt;40%)</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Parameters ({allDocs.length})
            </button>

            {COMPLIANCE_PARAMETER_GROUPS.map((group) => {
              const count = allDocs.filter(d => d.category === group.category).length;
              const hasAnomaly = allDocs.some(d => d.category === group.category && (d.isAnomaly || d.variancePercentage > 40));
              const isSelected = selectedCategory === group.category;

              return (
                <button
                  key={group.category}
                  onClick={() => setSelectedCategory(group.category)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {getCategoryIcon(group.category)}
                  <span>{group.title.split('.')[1] || group.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    hasAnomaly ? 'bg-rose-500 text-white font-black' : isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Documents Table View */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Doc Code & Title</th>
                    <th className="py-3 px-3">Annexure-1 Reference</th>
                    <th className="py-3 px-3">Governing Statutory Act</th>
                    <th className="py-3 px-3 text-center">Variance % (1-5% vs &gt;40%)</th>
                    <th className="py-3 px-3">Verification Gateway</th>
                    <th className="py-3 px-3">Blockchain IPFS CID</th>
                    <th className="py-3 px-4 text-right">Official Letter Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredDocs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-slate-400">
                        No documents matching the active filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredDocs.map((doc) => {
                      const isAnomaly = doc.isAnomaly || doc.variancePercentage > 40;

                      return (
                        <tr
                          key={doc.id}
                          className={`hover:bg-slate-50/80 transition-colors ${
                            isAnomaly ? 'bg-rose-50/40' : ''
                          }`}
                        >
                          {/* Title & Code */}
                          <td className="py-3 px-4">
                            <div className="flex items-start gap-2">
                              <div className="mt-0.5 shrink-0">
                                {isAnomaly ? (
                                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                                ) : (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                )}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900 leading-tight">
                                  {doc.title}
                                </div>
                                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                                  {doc.docCode}
                                </div>
                                {isAnomaly && doc.anomalyDescription && (
                                  <div className="mt-1 text-[11px] text-rose-700 font-medium bg-rose-100/80 p-1.5 rounded border border-rose-200">
                                    {doc.anomalyDescription}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Annexure-1 Ref */}
                          <td className="py-3 px-3 text-slate-600 font-mono whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200">
                              {doc.pdfAnnexureRef}
                            </span>
                          </td>

                          {/* Act */}
                          <td className="py-3 px-3 text-slate-600 max-w-[180px]">
                            <span className="line-clamp-2 text-[11px]">
                              {doc.sampleLetter.authorityOrAct}
                            </span>
                          </td>

                          {/* Variance */}
                          <td className="py-3 px-3 text-center">
                            <div className="flex flex-col items-center">
                              <span className={`px-2 py-0.5 rounded-full font-mono text-[11px] font-bold ${
                                isAnomaly
                                  ? 'bg-rose-600 text-white animate-pulse'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {doc.variancePercentage}% {isAnomaly ? 'CRITICAL (>40%)' : 'Normal'}
                              </span>
                              <div className="w-16 h-1 bg-slate-200 rounded-full mt-1 overflow-hidden">
                                <div
                                  className={`h-full ${isAnomaly ? 'bg-rose-600' : 'bg-emerald-500'}`}
                                  style={{ width: `${Math.min(100, (doc.variancePercentage / 60) * 100)}%` }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* Verification Gateway */}
                          <td className="py-3 px-3 text-slate-600 text-[11px]">
                            <span className="font-mono text-slate-700">
                              {doc.verificationGateway}
                            </span>
                          </td>

                          {/* Blockchain Hash / IPFS */}
                          <td className="py-3 px-3 text-[10px] text-slate-500 font-mono">
                            <div className="flex items-center gap-1">
                              <Lock className="w-3 h-3 text-purple-600 shrink-0" />
                              <span className="truncate max-w-[110px]" title={doc.blockchainHash}>
                                {doc.blockchainHash.substring(0, 14)}...
                              </span>
                            </div>
                          </td>

                          {/* Actions: View Sample Letter */}
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleOpenLetter(doc)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-sm ${
                                isAnomaly
                                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                              }`}
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>View Sample Letter</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Procurement Officer Executive Sign-Off & Blockchain Seal Box */}
          <div className="mt-8 bg-slate-50 rounded-xl p-5 border border-slate-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-slate-800" />
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                  Procurement Officer Statutory Audit & Cryptographic Seal
                </h4>
              </div>
              <span className="text-xs font-mono text-slate-500">
                Rule 149 & 151 of General Financial Rules (GFR), 2017
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Executive Assessment & Disqualification Justification:
                </label>
                <textarea
                  rows={2}
                  value={auditRemarks}
                  onChange={(e) => setAuditRemarks(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                  placeholder="Enter statutory inspection notes or debarment grounds..."
                />
              </div>

              {sealedSuccessMsg && (
                <div className="p-3 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{sealedSuccessMsg}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="text-[11px] text-slate-500">
                  Officer DSC: <strong className="text-slate-800">CLASS-3 GOVERNMENT SIGNATURE</strong> • Jurisdiction: <strong className="text-slate-800">{activeTender.location}</strong>
                </div>

                <div className="flex items-center gap-2">
                  {anomalyCount > 0 && (
                    <button
                      onClick={() => handleSealAudit(false)}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Issue Disqualification Order (Rule 151)</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleSealAudit(true)}
                    className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-colors"
                  >
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span>Seal Compliance Audit on Blockchain</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Official Sample Letter Modal */}
      <SampleLetterModal
        document={previewDocument}
        bidderName={activeBidder?.companyName || 'Vendor Enterprise'}
        bidderLocation={activeBidder?.location || 'India'}
        tenderRef={activeTender?.referenceNumber || 'GEM/2026/B/7770945'}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
