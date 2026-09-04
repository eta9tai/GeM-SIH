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
  ArrowRightLeft
} from 'lucide-react';
import { ProcurementOfficer, BidderAccount, UserRole } from '../types';

interface HeaderProps {
  activeView: 'tenders' | 'compliance_dashboard' | 'tree_flow' | 'blockchain' | 'analytics';
  onSelectView: (view: 'tenders' | 'compliance_dashboard' | 'tree_flow' | 'blockchain' | 'analytics') => void;
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
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm" id="gem-main-header">
      {/* Top Tricolor Government of India Strip */}
      <div className="h-1 flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* Top Utility Bar (Matching GeM / CPPP official portal) */}
      <div className="bg-[#002B49] text-white text-[11px] px-4 sm:px-6 py-1 flex items-center justify-between border-b border-blue-950">
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
            className="flex items-center gap-1 text-amber-300 hover:text-amber-200 transition-colors bg-white/10 px-2 py-0.5 rounded text-[11px]"
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
              className={`px-1 py-0.2 rounded hover:bg-white/10 ${fontSize === 'small' ? 'text-amber-300 font-bold' : ''}`}
            >
              A-
            </button>
            <button
              onClick={() => onChangeFontSize('normal')}
              className={`px-1 py-0.2 rounded hover:bg-white/10 ${fontSize === 'normal' ? 'text-amber-300 font-bold' : ''}`}
            >
              A
            </button>
            <button
              onClick={() => onChangeFontSize('large')}
              className={`px-1 py-0.2 rounded hover:bg-white/10 ${fontSize === 'large' ? 'text-amber-300 font-bold' : ''}`}
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Search Bar */}
      <div className="px-4 sm:px-6 py-3 bg-white border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Logo Section with Indian Emblem */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Ashoka Stambh SVG Motif */}
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 32 38" className="h-9 w-auto text-[#002B49]" fill="currentColor">
              <path d="M16 2C13 2 11 4 11 7c0 1.5.5 3 1.5 4.1C10 12.5 8 15 8 18.5c0 4 3 7.5 7 8v5h-4v2h10v-2h-4v-5c4-.5 7-4 7-8 0-3.5-2-6-4.5-7.4C20.5 10 21 8.5 21 7c0-3-2-5-5-5zm0 2c1.7 0 3 1.3 3 3 0 1.1-.6 2.1-1.5 2.6l-.5.3.3.5C18.6 11.9 20 13.9 20 16.5c0 3-2.5 5.5-5.5 5.5S9 19.5 9 16.5c0-2.6 1.4-4.6 2.7-6.1l.3-.5-.5-.3C10.6 9.1 10 8.1 10 7c0-1.7 1.3-3 3-3zm-3 29.5v1h6v-1h-6z" />
            </svg>
            <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block" />
          </div>

          {/* GeM Colorful Brand Emblem */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onSelectView('tenders')}>
            <div className="flex items-center">
              <span className="font-extrabold text-2xl tracking-tighter text-[#002B49]">
                GeM
              </span>
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF9933] ml-0.5 animate-pulse" />
            </div>
            <div className="leading-tight border-l border-slate-200 pl-2">
              <div className="text-[13px] font-bold text-slate-900 leading-tight">
                Government e-Marketplace
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                Efficient • Transparent • Inclusive
              </div>
            </div>
          </div>
        </div>

        {/* Center Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by tender ID, organisation, keyword, state or value..."
              className="w-full pl-9 pr-24 py-2 rounded-lg border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002B49] focus:bg-white transition-all shadow-inner"
            />
            <button
              onClick={() => {}}
              className="absolute right-1.5 px-3 py-1 rounded-md bg-[#002B49] hover:bg-[#003c66] text-white text-[11px] font-semibold transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {/* Right Role & Account Selector Badge */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenExplainerModal}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors border border-slate-300"
            title="Tender Efficiency & Logic Explainer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Logic Explainer</span>
          </button>

          <button
            type="button"
            onClick={onOpenAuthModal}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition-all text-left shadow-xs hover:border-blue-400 group"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              currentRole === 'officer'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-emerald-100 text-emerald-800'
            }`}>
              {currentRole === 'officer' ? (
                <UserCheck className="w-4 h-4" />
              ) : (
                <Briefcase className="w-4 h-4" />
              )}
            </div>

            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {currentRole === 'officer' ? 'Officer' : 'Bidder'}
                </span>
                <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold ${
                  currentRole === 'officer'
                    ? currentOfficer?.accountType === 'fresher'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-emerald-100 text-emerald-800'
                    : 'bg-teal-100 text-teal-800'
                }`}>
                  {currentRole === 'officer'
                    ? currentOfficer?.accountType === 'fresher' ? 'Fresher' : 'PLC'
                    : 'Vendor'}
                </span>
              </div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-900 max-w-[140px] truncate">
                {currentRole === 'officer'
                  ? currentOfficer?.fakeName || 'Procurement Officer'
                  : currentBidder?.companyName || 'Registered Bidder'}
              </div>
            </div>

            <ArrowRightLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 shrink-0 ml-1" />
          </button>
        </div>
      </div>

      {/* Navigation Sub-Menu Bar */}
      <div className="bg-slate-100 px-4 sm:px-6 py-1.5 flex items-center justify-between gap-2 overflow-x-auto border-t border-slate-200">
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onSelectView('tenders')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeView === 'tenders'
                ? 'bg-[#002B49] text-white shadow-sm'
                : 'text-slate-700 hover:bg-white hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#FF9933]" />
            <span>{language === 'hi' ? 'निविदाएं व परिणाम' : 'Tenders & Bids'}</span>
          </button>

          <button
            onClick={() => onSelectView('compliance_dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeView === 'compliance_dashboard'
                ? 'bg-[#002B49] text-white shadow-sm'
                : 'text-slate-700 hover:bg-white hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'hi' ? 'अनुपालन डैशबोर्ड (एनेक्सचर-1)' : 'Compliance Dashboard (Annexure-1)'}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[9px] font-black font-mono">
              HANDSHAKES
            </span>
          </button>

          <button
            onClick={() => onSelectView('tree_flow')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeView === 'tree_flow'
                ? 'bg-[#002B49] text-white shadow-sm'
                : 'text-slate-700 hover:bg-white hover:text-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>{language === 'hi' ? 'एआई निर्णय वृक्ष प्रवाह' : 'AI Decision Tree Flow'}</span>
          </button>

          <button
            onClick={() => onSelectView('blockchain')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeView === 'blockchain'
                ? 'bg-[#002B49] text-white shadow-sm'
                : 'text-slate-700 hover:bg-white hover:text-slate-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'hi' ? 'ब्लॉकचेन ऑडिट लेज़र' : 'Blockchain Audit Ledger'}</span>
          </button>

          <button
            onClick={() => onSelectView('analytics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeView === 'analytics'
                ? 'bg-[#002B49] text-white shadow-sm'
                : 'text-slate-700 hover:bg-white hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-amber-500" />
            <span>{language === 'hi' ? 'खरीद विश्लेषण' : 'Procurement Analytics'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
            <Shield className="w-3 h-3 text-emerald-600" />
            Audit Traceability 100%
          </span>
        </div>
      </div>
    </header>
  );
};
