import React, { useState } from 'react';
import {
  ShieldCheck,
  UserCheck,
  Briefcase,
  Key,
  Lock,
  Building2,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ArrowRight,
  LogOut,
  RefreshCw,
  FileBadge,
  Eye,
  EyeOff
} from 'lucide-react';
import { ProcurementOfficer, BidderAccount, UserRole } from '../types';
import { MOCK_PROCUREMENT_OFFICERS, MOCK_BIDDER_ACCOUNTS } from '../data/mockOfficers';

interface TopLoginPanelProps {
  currentRole: UserRole;
  currentOfficer: ProcurementOfficer;
  currentBidder: BidderAccount;
  isAuthenticated: boolean;
  onLoginOfficer: (officer: ProcurementOfficer) => void;
  onLoginBidder: (bidder: BidderAccount) => void;
  onSwitchAccount: () => void;
}

export const TopLoginPanel: React.FC<TopLoginPanelProps> = ({
  currentRole,
  currentOfficer,
  currentBidder,
  isAuthenticated,
  onLoginOfficer,
  onLoginBidder,
  onSwitchAccount
}) => {
  const [selectedRoleTab, setSelectedRoleTab] = useState<UserRole>(currentRole || 'officer');
  const [selectedOfficerId, setSelectedOfficerId] = useState<string>(currentOfficer.id);
  const [selectedBidderId, setSelectedBidderId] = useState<string>(currentBidder.id);
  const [pinInput, setPinInput] = useState<string>(currentRole === 'officer' ? currentOfficer.systemPin : currentBidder.systemPin);
  const [showPin, setShowPin] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(!isAuthenticated);

  const activeSelectedOfficer = MOCK_PROCUREMENT_OFFICERS.find(o => o.id === selectedOfficerId) || currentOfficer;
  const activeSelectedBidder = MOCK_BIDDER_ACCOUNTS.find(b => b.id === selectedBidderId) || currentBidder;

  const handleOfficerChange = (id: string) => {
    setSelectedOfficerId(id);
    const off = MOCK_PROCUREMENT_OFFICERS.find(o => o.id === id);
    if (off) {
      setPinInput(off.systemPin);
    }
  };

  const handleBidderChange = (id: string) => {
    setSelectedBidderId(id);
    const bid = MOCK_BIDDER_ACCOUNTS.find(b => b.id === id);
    if (bid) {
      setPinInput(bid.systemPin);
    }
  };

  const handlePerformLogin = () => {
    if (selectedRoleTab === 'officer') {
      onLoginOfficer(activeSelectedOfficer);
    } else {
      onLoginBidder(activeSelectedBidder);
    }
    setIsExpanded(false);
  };

  return (
    <div className="w-full bg-[#001f35] border-b-2 border-slate-700 text-white select-none font-sans" id="gem-top-login-bar">
      {/* If Authenticated & Collapsed: Crisp Authenticated Session Strip */}
      {isAuthenticated && !isExpanded ? (
        <div className="px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 bg-[#00243d] border-b border-blue-900/60">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border-r border-slate-700 pr-3">
              <span className="w-2 h-2 bg-emerald-400 animate-ping inline-block" />
              <span className="text-[11px] font-mono tracking-wider uppercase font-bold text-emerald-300">
                {currentRole === 'officer' ? 'OFFICER SESSION ACTIVE' : 'BIDDER VENDOR PORTAL ACTIVE'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                currentRole === 'officer'
                  ? 'bg-blue-900 text-blue-200 border border-blue-700'
                  : 'bg-emerald-900 text-emerald-200 border border-emerald-700'
              }`}>
                {currentRole === 'officer' ? 'GOVERNMENT BUYER' : 'REGISTERED SELLER'}
              </div>

              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>{currentRole === 'officer' ? currentOfficer.fakeName : currentBidder.companyName}</span>
                <span className="text-[11px] text-slate-400 font-normal">
                  ({currentRole === 'officer' ? currentOfficer.employeeCode : `GSTIN: ${currentBidder.gstin}`})
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-300">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {currentRole === 'officer'
                  ? `${currentOfficer.jurisdiction.circleOrZone} (PIN: ${currentOfficer.jurisdiction.pincodes[0]})`
                  : `${currentBidder.location} • Status: Active Bidder`}
              </span>
            </div>

            <button
              onClick={() => setIsExpanded(true)}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold border border-slate-600 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Switch Account / Change Role</span>
            </button>
          </div>
        </div>
      ) : (
        /* Full Official Government Login Panel across the Top */
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#001b2f] via-[#002744] to-[#00182b] border-b-2 border-amber-500">
          {/* Header row with Crest and Portal Identification */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-500/20 border border-amber-500 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white tracking-wide uppercase">
                  GeM 5.0 Unified Authentication & Role Authorization Gateway
                </h2>
                <p className="text-[11px] text-slate-300">
                  Secured via National Informatics Centre (NIC) DSC & DigiLocker e-Sign Trust Framework
                </p>
              </div>
            </div>

            {isAuthenticated && (
              <button
                onClick={() => setIsExpanded(false)}
                className="px-2.5 py-1 text-xs text-slate-300 hover:text-white border border-slate-600 hover:bg-slate-800 transition-colors"
              >
                ✕ Close Panel
              </button>
            )}
          </div>

          {/* Role Tabs - Sharp crisp rectangular tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              type="button"
              onClick={() => {
                setSelectedRoleTab('officer');
                setPinInput(activeSelectedOfficer.systemPin);
              }}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border transition-all ${
                selectedRoleTab === 'officer'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-black'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>1. Government Procurement Officer Login</span>
              <span className="text-[9px] px-1.5 py-0.2 bg-slate-950/40 text-amber-200 font-mono">
                CPSE / BUYER
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedRoleTab('bidder');
                setPinInput(activeSelectedBidder.systemPin);
              }}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border transition-all ${
                selectedRoleTab === 'bidder'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md font-black'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>2. Registered GeM / CPPP Bidder Login</span>
              <span className="text-[9px] px-1.5 py-0.2 bg-slate-950/40 text-emerald-200 font-mono">
                VENDOR / SELLER
              </span>
            </button>
          </div>

          {/* Dynamic Login Form depending on Selected Role */}
          {selectedRoleTab === 'officer' ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-900/90 p-4 border border-slate-700">
              {/* Officer Selection */}
              <div className="md:col-span-6 space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                  Select Designated Procurement Officer Persona:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {MOCK_PROCUREMENT_OFFICERS.map((officer) => (
                    <div
                      key={officer.id}
                      onClick={() => handleOfficerChange(officer.id)}
                      className={`p-2.5 border cursor-pointer transition-all ${
                        selectedOfficerId === officer.id
                          ? 'border-amber-400 bg-amber-950/30'
                          : 'border-slate-700 bg-slate-800/60 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold text-white truncate">{officer.fakeName}</span>
                        <span className={`text-[9px] font-mono px-1 py-0.2 ${
                          officer.accountType === 'fresher' ? 'bg-purple-900 text-purple-200' : 'bg-emerald-900 text-emerald-200'
                        }`}>
                          {officer.accountType === 'fresher' ? 'FRESHER' : 'PLC'}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-300 line-clamp-1">{officer.designation}</div>
                      <div className="text-[9px] text-slate-400 font-mono mt-1">
                        PIN: {officer.jurisdiction.pincodes[0]} • {officer.jurisdiction.city}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Authentication Credentials */}
              <div className="md:col-span-6 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      Officer Security PIN / DSC Token Key:
                    </label>
                    <span className="text-[10px] text-amber-400 font-mono">
                      Authorized PIN: <strong>{activeSelectedOfficer.systemPin}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type={showPin ? 'text' : 'password'}
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        placeholder="Enter 4-digit Security PIN"
                        className="w-full pl-9 pr-10 py-2 bg-slate-950 border border-slate-600 text-white font-mono text-sm tracking-widest focus:outline-none focus:border-amber-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPin(!showPin)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                      >
                        {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPinInput(activeSelectedOfficer.systemPin)}
                      className="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 text-[10px] font-mono border border-slate-600 text-amber-300 shrink-0"
                      title="Auto-fill authorized Officer PIN"
                    >
                      Use Key: {activeSelectedOfficer.systemPin}
                    </button>
                  </div>
                </div>

                {/* Badges and Confirmation */}
                <div className="p-2 bg-slate-950 border border-slate-800 text-[10px] text-slate-300 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Class-3 DSC Token:</span>
                    <span className="text-emerald-400 font-mono font-bold">VERIFIED (NIC-CA-2026)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Territory Bounds:</span>
                    <span className="text-white font-semibold truncate max-w-[200px]">
                      {activeSelectedOfficer.jurisdiction.circleOrZone}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePerformLogin}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-amber-300 transition-colors shadow-lg"
                >
                  <Key className="w-4 h-4" />
                  <span>Authenticate & Enter Officer Evaluation Desk</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Bidder Login View */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-900/90 p-4 border border-slate-700">
              {/* Bidder Selection */}
              <div className="md:col-span-6 space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 block">
                  Select Registered Vendor Account Persona:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {MOCK_BIDDER_ACCOUNTS.map((bidder) => {
                    const isGreen = bidder.complianceScore > 90;
                    const isOrange = bidder.complianceScore >= 60 && bidder.complianceScore <= 90;
                    const isRed = bidder.complianceScore < 60;
                    const zoneLabel = isGreen ? 'GREEN ZONE' : isOrange ? 'ORANGE ZONE' : 'RED ZONE';
                    const zoneColor = isGreen ? 'bg-emerald-900 text-emerald-200' : isOrange ? 'bg-amber-900 text-amber-200' : 'bg-rose-900 text-rose-200';

                    return (
                      <div
                        key={bidder.id}
                        onClick={() => handleBidderChange(bidder.id)}
                        className={`p-2.5 border cursor-pointer transition-all ${
                          selectedBidderId === bidder.id
                            ? 'border-emerald-400 bg-emerald-950/30'
                            : 'border-slate-700 bg-slate-800/60 hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-xs font-bold text-white truncate">{bidder.companyName}</span>
                          <span className={`text-[8px] font-mono font-black px-1 py-0.2 ${zoneColor}`}>
                            {zoneLabel}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-300 line-clamp-1">{bidder.location}</div>
                        <div className="text-[9px] text-slate-400 font-mono mt-1">
                          GSTIN: {bidder.gstin}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bidder PIN and Access */}
              <div className="md:col-span-6 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      Bidder Registered Security PIN / OTP:
                    </label>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      Authorized PIN: <strong>{activeSelectedBidder.systemPin}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type={showPin ? 'text' : 'password'}
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        placeholder="Enter 6-digit Portal PIN"
                        className="w-full pl-9 pr-10 py-2 bg-slate-950 border border-slate-600 text-white font-mono text-sm tracking-widest focus:outline-none focus:border-emerald-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPin(!showPin)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                      >
                        {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPinInput(activeSelectedBidder.systemPin)}
                      className="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 text-[10px] font-mono border border-slate-600 text-emerald-300 shrink-0"
                      title="Auto-fill authorized Bidder PIN"
                    >
                      Use Key: {activeSelectedBidder.systemPin}
                    </button>
                  </div>
                </div>

                <div className="p-2 bg-slate-950 border border-slate-800 text-[10px] text-slate-300 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Enterprise Category:</span>
                    <span className="text-amber-300 font-mono font-bold">
                      {activeSelectedBidder.tags.join(', ')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Privacy Notice:</span>
                    <span className="text-slate-300 italic">
                      Internal Officer Audit Ledgers & Trust Scores are hidden in Bidder View
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePerformLogin}
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-emerald-300 transition-colors shadow-lg"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Authenticate as Registered Bidder & View My Bids</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
