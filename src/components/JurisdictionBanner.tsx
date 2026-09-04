import React from 'react';
import {
  Shield,
  MapPin,
  Building2,
  Lock,
  Unlock,
  AlertCircle,
  Sparkles,
  Layers,
  HelpCircle,
  UserCheck,
  Briefcase,
  ArrowRightLeft
} from 'lucide-react';
import { ProcurementOfficer, BidderAccount, UserRole } from '../types';

interface JurisdictionBannerProps {
  currentRole: UserRole;
  officer?: ProcurementOfficer;
  bidder?: BidderAccount;
  isCrossTerritoryOverride: boolean;
  onToggleCrossTerritoryOverride: () => void;
  onOpenAuthModal: () => void;
  onOpenFresherModal?: () => void;
  onOpenExplainerModal: () => void;
  filteredCount: number;
  totalCount: number;
}

export const JurisdictionBanner: React.FC<JurisdictionBannerProps> = ({
  currentRole,
  officer,
  bidder,
  isCrossTerritoryOverride,
  onToggleCrossTerritoryOverride,
  onOpenAuthModal,
  onOpenFresherModal,
  onOpenExplainerModal,
  filteredCount,
  totalCount
}) => {
  if (currentRole === 'officer' && officer) {
    const isPowaiOfficer = officer.jurisdiction.pincodes.includes(400076);

    return (
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-6" id="gem-jurisdiction-banner">
        {/* Top Accent Band */}
        <div className="bg-gradient-to-r from-[#002B49] via-[#003860] to-[#002B49] text-white px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold text-[11px]">
              <Shield className="w-3.5 h-3.5 text-slate-950" />
              <span>ACTIVE PROCUREMENT OFFICER</span>
            </div>

            <span className="font-bold text-sm text-white">
              {officer.fakeName} (Age: {officer.age})
            </span>

            <span className="text-slate-300 hidden sm:inline">•</span>

            <span className="text-slate-200">
              {officer.designation}
            </span>

            <span className={`px-2 py-0.2 rounded text-[10px] font-mono font-bold ${
              officer.accountType === 'fresher'
                ? 'bg-purple-400/30 text-purple-200 border border-purple-300/40'
                : 'bg-emerald-400/30 text-emerald-200 border border-emerald-300/40'
            }`}>
              {officer.accountType === 'fresher' ? 'Fresher Officer' : 'PLC Certified'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {officer.accountType === 'fresher' && onOpenFresherModal && (
              <button
                type="button"
                onClick={onOpenFresherModal}
                className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Layers className="w-3 h-3 text-purple-200" />
                <span>Legacy Paper Dossiers</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenExplainerModal}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-amber-300 font-bold text-[11px] flex items-center gap-1.5 transition-colors"
              title="Tender Efficiency & Logic Explainer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Efficiency & CAG Explainer</span>
            </button>

            <button
              type="button"
              onClick={onOpenAuthModal}
              className="px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[11px] flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <ArrowRightLeft className="w-3 h-3 text-slate-950" />
              <span>Switch Officer / Role</span>
            </button>
          </div>
        </div>

        {/* Lower Jurisdiction Bounds & Scope Filter Bar */}
        <div className="px-4 sm:px-6 py-3 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs border-t border-slate-200">
          <div className="flex items-center gap-2 flex-wrap text-slate-700">
            <span className="font-bold text-slate-900 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>Territorial Jurisdiction Bound:</span>
            </span>

            <span className="px-2 py-0.5 rounded bg-white border border-slate-300 font-medium text-slate-800">
              {officer.jurisdiction.state}
            </span>

            <span className="text-slate-400">/</span>

            <span className="px-2 py-0.5 rounded bg-white border border-slate-300 font-medium text-slate-800">
              {officer.jurisdiction.city}
            </span>

            <span className="text-slate-400">/</span>

            <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200 font-bold text-blue-950">
              {officer.jurisdiction.circleOrZone} (PIN: {officer.jurisdiction.pincodes[0]})
            </span>

            <span className="text-slate-400">/</span>

            <span className="text-slate-600 font-medium">
              Dept: <strong>{officer.jurisdiction.department}</strong>
            </span>
          </div>

          {/* Override Toggle & Scope Indicator */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-[11px] text-slate-600">
              {isCrossTerritoryOverride ? (
                <span className="text-amber-700 font-semibold flex items-center gap-1">
                  <Unlock className="w-3 h-3 text-amber-600" />
                  Showing <strong>All India ({totalCount} tenders)</strong> in Audit Override Mode
                </span>
              ) : (
                <span className="text-blue-900 font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3 text-blue-700" />
                  Territorially Restricted: <strong>{filteredCount} Tender{filteredCount === 1 ? '' : 's'} in Area</strong>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onToggleCrossTerritoryOverride}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 border shadow-xs ${
                isCrossTerritoryOverride
                  ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {isCrossTerritoryOverride ? (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Restore Area Filter</span>
                </>
              ) : (
                <>
                  <Unlock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Cross-Territory Audit Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Bidder Mode Banner
  if (currentRole === 'bidder' && bidder) {
    return (
      <div className="bg-white border border-emerald-200 rounded-2xl shadow-sm overflow-hidden mb-6" id="gem-jurisdiction-banner-bidder">
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-bold text-[11px]">
              <Briefcase className="w-3.5 h-3.5 text-slate-950" />
              <span>REGISTERED BIDDER / VENDOR</span>
            </div>

            <span className="font-bold text-sm text-white">
              {bidder.companyName}
            </span>

            <span className="text-emerald-300 hidden sm:inline">•</span>

            <span className="text-emerald-100">
              {bidder.location}
            </span>

            <span className="px-2 py-0.2 rounded bg-emerald-400/20 text-emerald-200 border border-emerald-300/40 text-[10px] font-mono font-bold">
              Compliance: {bidder.complianceScore}/100
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenExplainerModal}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-200 font-bold text-[11px] flex items-center gap-1.5 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-300" />
              <span>Why Bidders Qualify / Disqualify</span>
            </button>

            <button
              type="button"
              onClick={onOpenAuthModal}
              className="px-3 py-1 rounded-lg bg-white text-emerald-950 font-bold text-[11px] flex items-center gap-1.5 hover:bg-emerald-50 transition-colors shadow-sm"
            >
              <ArrowRightLeft className="w-3 h-3 text-emerald-800" />
              <span>Switch Bidder / Role</span>
            </button>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-2.5 bg-emerald-50/50 flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-950 border-t border-emerald-100">
          <div className="flex items-center gap-3 flex-wrap">
            <span>GSTIN: <strong className="font-mono">{bidder.gstin}</strong></span>
            <span>•</span>
            <span>Udyam: <strong className="font-mono">{bidder.udyamNumber}</strong></span>
            <span>•</span>
            <span>Active Bids: <strong>{bidder.activeBidsCount}</strong></span>
            <span>•</span>
            <span>Risk Status: <strong className={bidder.riskLevel === 'Low' ? 'text-emerald-700' : 'text-red-700'}>{bidder.riskLevel} Risk</strong></span>
          </div>

          <div className="text-[11px] text-emerald-800 font-medium">
            Viewing active tenders with open submissions and qualified category items.
          </div>
        </div>
      </div>
    );
  }

  return null;
};
