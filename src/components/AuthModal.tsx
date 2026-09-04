import React, { useState } from 'react';
import {
  Shield,
  Lock,
  UserCheck,
  Building2,
  MapPin,
  KeyRound,
  FileCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Upload,
  QrCode,
  CreditCard,
  Cpu,
  BadgeAlert,
  ChevronRight,
  Briefcase,
  Layers,
  Sparkles,
  X
} from 'lucide-react';
import { ProcurementOfficer, BidderAccount, UserRole } from '../types';
import { MOCK_PROCUREMENT_OFFICERS, MOCK_BIDDER_ACCOUNTS } from '../data/mockOfficers';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentOfficer?: ProcurementOfficer;
  currentBidder?: BidderAccount;
  currentRole: UserRole;
  onSelectOfficer: (officer: ProcurementOfficer) => void;
  onSelectBidder: (bidder: BidderAccount) => void;
  onOpenFresherWorkspace?: (officer: ProcurementOfficer) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentOfficer,
  currentBidder,
  currentRole,
  onSelectOfficer,
  onSelectBidder,
  onOpenFresherWorkspace
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole);
  const [selectedOfficerId, setSelectedOfficerId] = useState<string>(
    currentOfficer?.id || MOCK_PROCUREMENT_OFFICERS[0].id
  );
  const [selectedBidderId, setSelectedBidderId] = useState<string>(
    currentBidder?.id || MOCK_BIDDER_ACCOUNTS[0].id
  );
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [showIdCardPreview, setShowIdCardPreview] = useState<boolean>(true);
  const [isSimulatingIdUpload, setIsSimulatingIdUpload] = useState<boolean>(false);
  const [uploadedBadgeName, setUploadedBadgeName] = useState<string | null>(null);

  if (!isOpen) return null;

  const activeOfficer = MOCK_PROCUREMENT_OFFICERS.find(o => o.id === selectedOfficerId) || MOCK_PROCUREMENT_OFFICERS[0];
  const activeBidder = MOCK_BIDDER_ACCOUNTS.find(b => b.id === selectedBidderId) || MOCK_BIDDER_ACCOUNTS[0];

  const handleKeypadPress = (digit: string) => {
    if (enteredPin.length < 6) {
      const next = enteredPin + digit;
      setEnteredPin(next);
      setPinError(null);
    }
  };

  const handleBackspace = () => {
    setEnteredPin(prev => prev.slice(0, -1));
    setPinError(null);
  };

  const handleQuickFillPin = () => {
    if (selectedRole === 'officer') {
      setEnteredPin(activeOfficer.systemPin);
    } else {
      setEnteredPin(activeBidder.systemPin);
    }
    setPinError(null);
  };

  const handleAuthenticate = () => {
    if (selectedRole === 'officer') {
      // Validate PIN
      if (enteredPin !== activeOfficer.systemPin && enteredPin !== '1234') {
        setPinError(`Incorrect System PIN. Authorized PIN for ${activeOfficer.fakeName} is ${activeOfficer.systemPin}`);
        return;
      }
      onSelectOfficer(activeOfficer);
      onClose();
    } else {
      if (enteredPin !== activeBidder.systemPin && enteredPin !== '1234') {
        setPinError(`Incorrect PIN. Authorized PIN for ${activeBidder.companyName} is ${activeBidder.systemPin}`);
        return;
      }
      onSelectBidder(activeBidder);
      onClose();
    }
  };

  const handleSimulateUploadId = () => {
    setIsSimulatingIdUpload(true);
    setTimeout(() => {
      setIsSimulatingIdUpload(false);
      setUploadedBadgeName(`GovID_${activeOfficer.employeeCode}_Signed.pdf`);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white border border-slate-300 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-[#002B49] text-white px-6 py-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold tracking-tight">
                  GeM Dual-Role Authentication & Multi-Account Simulation
                </h2>
                <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-mono font-bold">
                  v5.0-SECURE
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Switch between Government Procurement Officers (Territorial Branch Enforced) and Registered Bidders
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

        {/* Role Selector Tabs */}
        <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 p-1 bg-slate-200/80 rounded-xl">
            <button
              onClick={() => {
                setSelectedRole('officer');
                setEnteredPin('');
                setPinError(null);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                selectedRole === 'officer'
                  ? 'bg-[#002B49] text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Government Procurement Officer</span>
              <span className="px-1.5 py-0.2 rounded bg-blue-500/30 text-[10px] text-blue-200 font-mono">
                {MOCK_PROCUREMENT_OFFICERS.length} Accounts
              </span>
            </button>

            <button
              onClick={() => {
                setSelectedRole('bidder');
                setEnteredPin('');
                setPinError(null);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                selectedRole === 'bidder'
                  ? 'bg-[#002B49] text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span>Registered Vendor / Bidder</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/30 text-[10px] text-emerald-200 font-mono">
                {MOCK_BIDDER_ACCOUNTS.length} Profiles
              </span>
            </button>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-slate-500 block font-mono">Simulated Personas</span>
            <span className="text-xs font-bold text-slate-800">Non-Real Fictional Profiles for Audit Demo</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {selectedRole === 'officer' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Officer Selector & Profile Details */}
              <div className="lg:col-span-7 space-y-4">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Select Procurement Officer Persona:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {MOCK_PROCUREMENT_OFFICERS.map(officer => {
                    const isSelected = officer.id === selectedOfficerId;
                    return (
                      <button
                        key={officer.id}
                        type="button"
                        onClick={() => {
                          setSelectedOfficerId(officer.id);
                          setEnteredPin('');
                          setPinError(null);
                        }}
                        className={`p-3 rounded-xl text-left border transition-all relative ${
                          isSelected
                            ? 'bg-blue-50/70 border-blue-600 ring-2 ring-blue-500/20 shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                        )}

                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                            officer.accountType === 'fresher'
                              ? 'bg-purple-100 text-purple-800 border border-purple-200'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}>
                            {officer.accountType === 'fresher' ? 'Fresher Officer' : 'PLC Certified'}
                          </span>
                          <span className="text-[11px] text-slate-500">Age: {officer.age}</span>
                        </div>

                        <div className="font-bold text-slate-900 text-xs truncate">
                          {officer.fakeName}
                        </div>
                        <div className="text-[11px] text-slate-600 line-clamp-1">
                          {officer.designation}
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-1 font-mono">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{officer.jurisdiction.city} (PIN: {officer.jurisdiction.pincodes[0]})</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Detailed Active Officer Inspection Card */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-blue-700" />
                        <span>Biometric & Credential Record</span>
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {activeOfficer.department}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-semibold">
                      EMP: {activeOfficer.employeeCode}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 text-[11px] block">Territorial Branch / Area:</span>
                      <span className="font-semibold text-slate-800 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-500" />
                        {activeOfficer.jurisdiction.circleOrZone}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Restricted PINs:</span>
                      <span className="font-mono font-bold text-blue-700">
                        {activeOfficer.jurisdiction.pincodes.join(', ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Role Architecture:</span>
                      <span className="font-semibold text-slate-800">
                        {activeOfficer.accountType === 'fresher' ? (
                          <span className="text-purple-700 font-bold">Fresher (Legacy Records Import Available)</span>
                        ) : (
                          <span className="text-emerald-700 font-bold">PLC (Prior Ledger Certified Buyer)</span>
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">CAG Audit Discrepancy Risk:</span>
                      <span className="font-bold text-slate-900 font-mono">
                        {activeOfficer.efficiencyMetrics.cagAuditRiskScore}/100 manual → {activeOfficer.efficiencyMetrics.projectedCagRiskScore}/100 AI
                      </span>
                    </div>
                  </div>

                  {/* Blockchain Public Key Seal */}
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                          Cryptographic Blockchain Seal (GeM Distributed Ledger)
                        </span>
                        <span className="text-[11px] font-mono text-slate-700 font-semibold break-all">
                          {activeOfficer.blockchainAddress}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold shrink-0">
                      SYNCED
                    </span>
                  </div>

                  {/* Government Digital ID Card Preview */}
                  {showIdCardPreview && (
                    <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-900 via-[#002B49] to-slate-900 text-white shadow-md relative overflow-hidden border border-slate-700">
                      {/* Watermark */}
                      <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 rounded-full border-8 border-white pointer-events-none flex items-center justify-center">
                        <Shield className="w-16 h-16 text-white" />
                      </div>

                      <div className="flex items-start justify-between relative z-10 border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 font-black text-[11px] flex items-center justify-center">
                            GOI
                          </div>
                          <div>
                            <span className="text-[10px] tracking-wider text-amber-300 uppercase font-mono font-bold block">
                              Government of India • e-Office Identity
                            </span>
                            <span className="text-xs font-bold text-white">
                              {activeOfficer.organization}
                            </span>
                          </div>
                        </div>
                        <QrCode className="w-6 h-6 text-white/70" />
                      </div>

                      <div className="mt-3 flex items-center gap-3 relative z-10">
                        <div className="w-12 h-14 rounded-lg bg-white/10 border border-white/20 flex flex-col items-center justify-center shrink-0">
                          <UserCheck className="w-6 h-6 text-amber-300" />
                          <span className="text-[8px] font-mono mt-0.5 text-white/60">NIC SEAL</span>
                        </div>

                        <div className="space-y-0.5 flex-1 min-w-0">
                          <div className="text-sm font-bold text-white truncate">
                            {activeOfficer.fakeName} (Age: {activeOfficer.age})
                          </div>
                          <div className="text-[11px] text-amber-200/90 truncate">
                            {activeOfficer.designation}
                          </div>
                          <div className="text-[10px] font-mono text-white/60 flex items-center gap-2">
                            <span>ID: {activeOfficer.employeeCode}</span>
                            <span>•</span>
                            <span>PIN: {activeOfficer.jurisdiction.pincodes[0]}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/70 relative z-10">
                        <span>Digital Signature Class-3 Token: <strong className="text-emerald-300">ACTIVE</strong></span>
                        <span className="font-mono text-amber-300 font-bold">{activeOfficer.jurisdiction.jurisdictionCode}</span>
                      </div>
                    </div>
                  )}

                  {/* Fresher Legacy Upload Button Notice */}
                  {activeOfficer.accountType === 'fresher' && (
                    <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-purple-700" />
                          <span>Fresher Officer Feature: Legacy Dossier Ingestion</span>
                        </div>
                        <p className="text-[11px] text-purple-700">
                          Tanvi has 4 legacy manual paper records (Centrifuges, HVAC, 11kV cables) with physical bottlenecks.
                        </p>
                      </div>
                      {onOpenFresherWorkspace && (
                        <button
                          type="button"
                          onClick={() => {
                            onOpenFresherWorkspace(activeOfficer);
                            onClose();
                          }}
                          className="px-3 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold shrink-0 transition-colors"
                        >
                          Open Dossier Import
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: PIN Authentication & Keypad */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Enter 4-Digit System PIN:
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Required for cryptographic authorization of officer territorial scope.
                    </p>
                  </div>

                  {/* PIN Display Input */}
                  <div className="space-y-2">
                    <div className="relative">
                      <input
                        type="password"
                        readOnly
                        value={enteredPin}
                        placeholder="••••"
                        className="w-full text-center text-2xl tracking-[0.5em] font-mono py-2.5 px-3 bg-white border-2 border-slate-300 rounded-xl focus:outline-none focus:border-blue-600 text-slate-900 font-bold"
                      />
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={handleQuickFillPin}
                        className="text-blue-700 hover:text-blue-900 font-semibold underline text-[11px] flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>Auto-fill PIN ({activeOfficer.systemPin})</span>
                      </button>

                      <span className="text-[11px] text-slate-400 font-mono">
                        Pin: {activeOfficer.systemPin}
                      </span>
                    </div>

                    {pinError && (
                      <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>{pinError}</span>
                      </div>
                    )}
                  </div>

                  {/* Interactive Numeric Keypad */}
                  <div className="grid grid-cols-3 gap-2">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleKeypadPress(num)}
                        className="py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 active:bg-slate-200 text-slate-900 font-mono font-bold text-base transition-colors shadow-sm"
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setEnteredPin('')}
                      className="py-2.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors"
                    >
                      CLEAR
                    </button>
                    <button
                      type="button"
                      onClick={() => handleKeypadPress('0')}
                      className="py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 active:bg-slate-200 text-slate-900 font-mono font-bold text-base transition-colors shadow-sm"
                    >
                      0
                    </button>
                    <button
                      type="button"
                      onClick={handleBackspace}
                      className="py-2.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors font-mono"
                    >
                      ⌫
                    </button>
                  </div>

                  {/* Upload ID Badge Simulation */}
                  <div className="pt-2 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={handleSimulateUploadId}
                      disabled={isSimulatingIdUpload}
                      className="w-full py-2 px-3 rounded-lg border border-dashed border-slate-300 hover:border-blue-400 bg-white hover:bg-blue-50/50 text-xs text-slate-700 font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5 text-blue-600" />
                      <span>{uploadedBadgeName || (isSimulatingIdUpload ? 'Verifying Digital Token...' : 'Re-upload / Scan Government ID Card')}</span>
                    </button>
                  </div>
                </div>

                {/* Confirm Login Button */}
                <button
                  type="button"
                  onClick={handleAuthenticate}
                  className="w-full py-3 px-4 rounded-xl bg-[#002B49] hover:bg-[#003860] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Authenticate as {activeOfficer.fakeName}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Bidder Login View */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-4">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Select Registered Bidder / Enterprise Account:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {MOCK_BIDDER_ACCOUNTS.map(bidder => {
                    const isSelected = bidder.id === selectedBidderId;
                    return (
                      <button
                        key={bidder.id}
                        type="button"
                        onClick={() => {
                          setSelectedBidderId(bidder.id);
                          setEnteredPin('');
                          setPinError(null);
                        }}
                        className={`p-3 rounded-xl text-left border transition-all relative ${
                          isSelected
                            ? 'bg-emerald-50/70 border-emerald-600 ring-2 ring-emerald-500/20 shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
                        )}

                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                            bidder.riskLevel === 'Low'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            Score: {bidder.complianceScore}/100
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {bidder.state}
                          </span>
                        </div>

                        <div className="font-bold text-slate-900 text-xs truncate">
                          {bidder.companyName}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          GSTIN: {bidder.gstin}
                        </div>
                        <div className="text-[10px] text-slate-600 mt-1 flex items-center gap-1">
                          <Briefcase className="w-3 h-3 text-slate-400" />
                          <span>{bidder.activeBidsCount} Active Bids</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Bidder Details */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {activeBidder.companyName}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Contact Person: {activeBidder.contactPerson}
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      activeBidder.riskLevel === 'Low'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {activeBidder.riskLevel} Risk
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 text-[11px] block">GSTIN & PAN:</span>
                      <span className="font-mono font-bold text-slate-800">{activeBidder.gstin}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Udyam Registration:</span>
                      <span className="font-mono text-slate-800">{activeBidder.udyamNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Location / City:</span>
                      <span className="font-semibold text-slate-800">{activeBidder.location}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Total Contracts Won:</span>
                      <span className="font-bold text-emerald-700">
                        {activeBidder.totalWonAmount ? `₹${(activeBidder.totalWonAmount / 100000).toFixed(2)} Lakh` : 'Nil'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeBidder.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Bidder PIN Authentication */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Enter Bidder Portal PIN:
                    </label>
                    <p className="text-[11px] text-slate-500">
                      Sign-in using authorized digital certificate PIN.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <input
                        type="password"
                        readOnly
                        value={enteredPin}
                        placeholder="••••"
                        className="w-full text-center text-2xl tracking-[0.5em] font-mono py-2.5 px-3 bg-white border-2 border-slate-300 rounded-xl focus:outline-none focus:border-emerald-600 text-slate-900 font-bold"
                      />
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={handleQuickFillPin}
                        className="text-emerald-700 hover:text-emerald-900 font-semibold underline text-[11px] flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>Auto-fill PIN ({activeBidder.systemPin})</span>
                      </button>

                      <span className="text-[11px] text-slate-400 font-mono">
                        Pin: {activeBidder.systemPin}
                      </span>
                    </div>

                    {pinError && (
                      <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>{pinError}</span>
                      </div>
                    )}
                  </div>

                  {/* Interactive Numeric Keypad */}
                  <div className="grid grid-cols-3 gap-2">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleKeypadPress(num)}
                        className="py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 active:bg-slate-200 text-slate-900 font-mono font-bold text-base transition-colors shadow-sm"
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setEnteredPin('')}
                      className="py-2.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors"
                    >
                      CLEAR
                    </button>
                    <button
                      type="button"
                      onClick={() => handleKeypadPress('0')}
                      className="py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 active:bg-slate-200 text-slate-900 font-mono font-bold text-base transition-colors shadow-sm"
                    >
                      0
                    </button>
                    <button
                      type="button"
                      onClick={handleBackspace}
                      className="py-2.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors font-mono"
                    >
                      ⌫
                    </button>
                  </div>
                </div>

                {/* Confirm Login Button */}
                <button
                  type="button"
                  onClick={handleAuthenticate}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-emerald-200" />
                  <span>Login as {activeBidder.companyName.substring(0, 24)}...</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
