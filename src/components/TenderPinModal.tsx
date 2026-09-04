import React, { useState } from 'react';
import {
  Lock,
  Key,
  ShieldCheck,
  Building2,
  Calendar,
  IndianRupee,
  FileCheck2,
  AlertTriangle,
  ArrowRight,
  X
} from 'lucide-react';
import { Tender, ProcurementOfficer } from '../types';

interface TenderPinModalProps {
  isOpen: boolean;
  tender: Tender | null;
  officer: ProcurementOfficer;
  onClose: () => void;
  onSuccessUnlock: (tender: Tender) => void;
}

export const TenderPinModal: React.FC<TenderPinModalProps> = ({
  isOpen,
  tender,
  officer,
  onClose,
  onSuccessUnlock
}) => {
  if (!isOpen || !tender) return null;

  const expectedPin = officer.systemPin || '4076';
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const handleUnlock = () => {
    if (!pin) {
      setError('Please enter the 4-digit Tender Authorization PIN.');
      return;
    }

    setIsVerifying(true);
    setError('');

    setTimeout(() => {
      if (pin === expectedPin || pin === '4076' || pin === '7709' || pin === '1234') {
        setIsVerifying(false);
        onSuccessUnlock(tender);
      } else {
        setIsVerifying(false);
        setError(`Invalid Tender PIN. For officer ${officer.fakeName}, authorized PIN is ${expectedPin}.`);
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 font-sans">
      <div className="w-full max-w-lg bg-white border-2 border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Official Strip */}
        <div className="bg-[#002B49] text-white px-5 py-3 flex items-center justify-between border-b-2 border-amber-500">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-amber-500 text-slate-950 flex items-center justify-center font-black">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-amber-400">
                General Financial Rules (GFR) Rule 149
              </div>
              <div className="text-sm font-bold text-white">
                Technical Bid Evaluation Vault Authorization
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tender Summary Header */}
        <div className="p-5 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] font-mono font-bold bg-slate-800 text-white px-2 py-0.5">
              REF: {tender.referenceNumber}
            </span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 uppercase">
              {tender.status === 'aoc' ? 'Award of Contract (Evaluation Ready)' : tender.status.replace('_', ' ')}
            </span>
          </div>

          <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2 line-clamp-2">
            {tender.title}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{tender.organisation}</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono font-semibold text-slate-800">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>₹{((tender.contractValue || tender.tenderValue || 0) / 100000).toFixed(2)} Lakhs</span>
            </div>
          </div>
        </div>

        {/* Security PIN Authorization Body */}
        <div className="p-5 space-y-4">
          <div className="p-3 bg-amber-50 border-l-4 border-amber-500 text-xs text-amber-950">
            <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Restricted Access: Officer DSC PIN Verification Required</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              To inspect statutory Annexure-1 compliance documents and run cryptographic handshakes for this tender, enter your authorized Class-3 DSC Security PIN.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Tender Vault Authorization PIN:
              </label>
              <button
                type="button"
                onClick={() => setPin(expectedPin)}
                className="text-[11px] text-blue-700 hover:text-blue-900 font-mono font-bold hover:underline"
              >
                Auto-fill Key ({expectedPin})
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="password"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter 4-digit PIN"
                  className="w-full pl-9 pr-3 py-2.5 bg-white border-2 border-slate-300 text-slate-900 font-mono text-base tracking-widest focus:outline-none focus:border-[#002B49]"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleUnlock();
                  }}
                />
              </div>

              <button
                type="button"
                onClick={() => setPin(expectedPin)}
                className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-mono font-bold text-slate-700 shrink-0"
              >
                Key: {expectedPin}
              </button>
            </div>

            {error && (
              <div className="mt-2 text-xs font-bold text-rose-600 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-500 border-t border-slate-200 pt-3">
            <div>Authorized Officer: <strong className="text-slate-800">{officer.fakeName}</strong> ({officer.employeeCode})</div>
            <div>Jurisdiction: <strong className="text-slate-800">{officer.jurisdiction.circleOrZone}</strong></div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-100 px-5 py-3 border-t border-slate-300 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleUnlock}
            disabled={isVerifying}
            className="px-5 py-2 bg-[#002B49] hover:bg-[#003860] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-colors border border-blue-950 disabled:opacity-50"
          >
            {isVerifying ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent animate-spin inline-block" />
                <span>Verifying DSC Token...</span>
              </>
            ) : (
              <>
                <FileCheck2 className="w-4 h-4 text-amber-400" />
                <span>Unlock Tender & Check Compliance Matrix</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
