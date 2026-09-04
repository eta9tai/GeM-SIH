import React from 'react';
import {
  Search,
  Shield,
  Layers,
  Cpu,
  Lock,
  BarChart3,
  Globe,
  Bell,
  Sparkles,
  ChevronDown,
  RotateCcw,
  ShieldCheck,
  UserCheck,
  Briefcase,
  HelpCircle,
  ArrowRightLeft,
  PieChart
} from 'lucide-react';
import { ProcurementOfficer, BidderAccount, UserRole } from '../types';

export type PortalViewType = 'tenders' | 'compliance_dashboard' | 'bidder_stratification' | 'tree_flow' | 'blockchain' | 'analytics' | 'bidder_workspace';

interface HeaderProps {
  activeView: PortalViewType;
  onSelectView: (view: PortalViewType) => void;
  onReplayNamaste: () => void;
  language: 'en' | 'hi';
  onToggleLanguage: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  fontSize: 'normal' | 'large' | 'small';
  onChangeFontSize: (size: 'normal' | 'large' | 'small') => void;
  currentRole: UserRole;
  currentOfficer?: ProcurementOfficer;
  currentBidder?: BidderAccount;
  onOpenAuthModal: () => void;
  onOpenExplainerModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onSelectView,
  onReplayNamaste,
  language,
  onToggleLanguage,
  searchQuery,
  onSearchChange,
  fontSize,
  onChangeFontSize,
  currentRole,
  currentOfficer,
  currentBidder,
  onOpenAuthModal,
  onOpenExplainerModal
}) => {
  const isBidderRole = currentRole === 'bidder';

  return (
    <header className="sticky top-0 z-40 bg-white border-b-2 border-slate-800 shadow-sm" id="gem-main-header">
      {/* Top Tricolor Government of India Strip */}
      <div className="h-1.5 flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* Top Utility Bar (Matching GeM / CPPP official portal) */}
      <div className="bg-[#002B49] text-white text-[11px] px-4 sm:px-6 py-1.5 flex items-center justify-between border-b border-blue-950">
        <div className="flex items-center gap-3">
          <span className="text-slate-300 hidden md:inline">
            भारत सरकार • Government of India
          </span>
          <span className="text-slate-500 hidden md:inline">|</span>
          <span className="text-slate-300 font-medium">
            केंद्रीय सार्वजनिक खरीद पोर्टल (CPPP) & GeM 5.0
          </span>
        </div>

        <div className="flex items-center gap-3 font-medium">
          {/* Replay Namaste Intro Button */}
          <button
            onClick={onReplayNamaste}
            className="flex items-center gap-1 text-amber-300 hover:text-amber-200 transition-colors bg-white/10 px-2 py-0.5 text-[11px] border border-white/20"
            title="Replay Hindi Namaste Greeting"
          >
            <span>🙏</span>
            <span className="font-hindi font-bold">नमस्ते Intro</span>
          </button>

          <span className="text-slate-600 hidden sm:inline">|</span>

          {/* Language Toggle */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1 hover:text-amber-300 transition-colors"
          >
            <Globe className="w-3 h-3" />
            <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          <span className="text-slate-600 hidden sm:inline">|</span>

          {/* Font Size Accessibility */}
          <div className="flex items-center gap-1 text-slate-300">
            <span className="text-[10px] text-slate-400 mr-0.5">Font:</span>
            <button
              onClick={() => onChangeFontSize('small')}
              className={`px-1 py-0.2 hover:bg-white/10 ${fontSize === 'small' ? 'text-amber-300 font-bold' : ''}`}
            >
              A-
            </button>
            <button
              onClick={() => onChangeFontSize('normal')}
              className={`px-1 py-0.2 hover:bg-white/10 ${fontSize === 'normal' ? 'text-amber-300 font-bold' : ''}`}
            >
              A
            </button>
            <button
              onClick={() => onChangeFontSize('large')}
              className={`px-1 py-0.2 hover:bg-white/10 ${fontSize === 'large' ? 'text-amber-300 font-bold' : ''}`}
            >
              A+
            </button>
          </div>

          <span className="text-slate-600 hidden sm:inline">|</span>

          {/* CAG / Efficiency Logic Explainer */}
          <button
            onClick={onOpenExplainerModal}
            className="flex items-center gap-1 text-amber-300 hover:text-amber-100 text-[11px] font-mono font-bold"
            title="View CAG Audit-Proof Procurement Logic"
          >
            <HelpCircle className="w-3 h-3 text-amber-400" />
            <span className="hidden lg:inline">GFR 149 Logic</span>
          </button>
        </div>
      </div>

      {/* Main Official Header Branding */}
      <div className="px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 bg-white border-b border-slate-300">
        {/* Government Emblem & Title */}
        <div className="flex items-center gap-3">
          {/* Ashoka Emblem Vector Graphic */}
          <div className="w-10 h-10 flex items-center justify-center border border-slate-400 p-1 bg-slate-50">
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
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-widest text-[#002B49] uppercase">
                GeM 5.0 • CPPP INTEGRATED
              </span>
              <span className="px-1.5 py-0.2 bg-emerald-100 border border-emerald-300 text-emerald-800 text-[9px] font-bold font-mono">
                CAG AUDIT PROOF
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              {language === 'hi'
                ? 'स्मार्ट खरीद विश्लेषण एवं तकनीकी अनुपालन मंच'
                : 'Smart Procurement & Statutory Compliance Evaluation Desk'}
            </h1>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              General Financial Rules (GFR) 2017 • Rule 149(viii) Equal Opportunity Stratification
            </p>
          </div>
        </div>

        {/* Right Search Bar & Role Pill */}
        <div className="flex items-center gap-3">
          <div className="relative w-48 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={language === 'hi' ? 'निविदा संख्या, वस्तु या विभाग खोजें...' : 'Search tender, bid ID, ministry...'}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#002B49]"
            />
          </div>

          <button
            onClick={onOpenAuthModal}
            className="px-3 py-1.5 border border-slate-700 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center gap-1.5"
            title="Switch User Persona or Role"
          >
            {isBidderRole ? <Briefcase className="w-3.5 h-3.5 text-emerald-400" /> : <UserCheck className="w-3.5 h-3.5 text-amber-400" />}
            <span className="hidden sm:inline">
              {isBidderRole ? currentBidder?.companyName.substring(0, 14) + '...' : currentOfficer?.fakeName.split(' ')[0]}
            </span>
            <span className="text-[10px] text-amber-300 uppercase">
              ({isBidderRole ? 'Bidder' : 'Officer'})
            </span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Menu Bar - Role Specific */}
      <div className="bg-slate-100 border-b border-slate-300 px-4 sm:px-6 flex items-center justify-between overflow-x-auto">
        <div className="flex items-center gap-1 py-1">
          {/* If Bidder Role: Show ONLY Bidder Workspace */}
          {isBidderRole ? (
            <>
              <button
                onClick={() => onSelectView('bidder_workspace')}
                className={`px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap border ${
                  activeView === 'bidder_workspace'
                    ? 'bg-[#002B49] text-white border-blue-950 shadow-xs'
                    : 'text-slate-700 bg-white border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                <span>My Active Bidder Dashboard (Zone Status)</span>
              </button>

              <div className="px-3 py-1 text-xs text-slate-600 italic">
                (Internal Officer Audit Ledgers, Decision Trees, and Procurement Analytics are restricted)
              </div>
            </>
          ) : (
            /* Officer Navigation Tabs */
            <>
              <button
                onClick={() => onSelectView('tenders')}
                className={`px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap border ${
                  activeView === 'tenders'
                    ? 'bg-[#002B49] text-white border-blue-950 shadow-xs'
                    : 'text-slate-700 bg-white border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#FF9933]" />
                <span>1. Tenders & PIN Access</span>
              </button>

              <button
                onClick={() => onSelectView('compliance_dashboard')}
                className={`px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap border ${
                  activeView === 'compliance_dashboard'
                    ? 'bg-[#002B49] text-white border-blue-950 shadow-xs'
                    : 'text-slate-700 bg-white border-slate-300 hover:bg-slate-50'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>2. Compliance & Variance Matrix</span>
                <span className="px-1.5 py-0.2 bg-amber-400 text-slate-950 text-[9px] font-black font-mono">
                  HANDSHAKES
                </span>
              </button>

              <button
                onClick={() => onSelectView('bidder_stratification')}
                className={`px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap border ${
                  activeView === 'bidder_stratification'
                    ? 'bg-[#002B49] text-white border-blue-950 shadow-xs'
                    : 'text-slate-700 bg-white border-slate-300 hover:bg-slate-50'
                }`}
              >
                <PieChart className="w-3.5 h-3.5 text-amber-500" />
                <span>3. 100-Bidder Stratification (Green/Orange/Red)</span>
                <span className="px-1.5 py-0.2 bg-emerald-700 text-white text-[9px] font-black font-mono">
                  ZONES
                </span>
              </button>

              <button
                onClick={() => onSelectView('tree_flow')}
                className={`px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap border ${
                  activeView === 'tree_flow'
                    ? 'bg-[#002B49] text-white border-blue-950 shadow-xs'
                    : 'text-slate-700 bg-white border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>4. AI Decision Tree Flow</span>
              </button>

              <button
                onClick={() => onSelectView('blockchain')}
                className={`px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap border ${
                  activeView === 'blockchain'
                    ? 'bg-[#002B49] text-white border-blue-950 shadow-xs'
                    : 'text-slate-700 bg-white border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>5. Blockchain Audit Ledger</span>
              </button>

              <button
                onClick={() => onSelectView('analytics')}
                className={`px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap border ${
                  activeView === 'analytics'
                    ? 'bg-[#002B49] text-white border-blue-950 shadow-xs'
                    : 'text-slate-700 bg-white border-slate-300 hover:bg-slate-50'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5 text-amber-500" />
                <span>6. Procurement Analytics</span>
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 border border-emerald-300 bg-emerald-50 text-emerald-900 text-[10px] font-bold font-mono">
            <Shield className="w-3 h-3 text-emerald-600" />
            Audit Traceability 100%
          </span>
        </div>
      </div>
    </header>
  );
};
