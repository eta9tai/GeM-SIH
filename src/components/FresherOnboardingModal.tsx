import React, { useState } from 'react';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Building2,
  Cpu,
  Layers,
  FileCheck,
  Shield,
  Sparkles,
  ArrowRight,
  RotateCcw,
  X
} from 'lucide-react';
import { ProcurementOfficer, LegacyManualTender } from '../types';

interface FresherOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  officer: ProcurementOfficer;
  onCompleteIngestion: (officerId: string) => void;
}

export const FresherOnboardingModal: React.FC<FresherOnboardingModalProps> = ({
  isOpen,
  onClose,
  officer,
  onCompleteIngestion
}) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [hasConverted, setHasConverted] = useState<boolean>(officer.hasIngestedLegacyProfile || false);
  const [selectedRecord, setSelectedRecord] = useState<LegacyManualTender | null>(
    officer.legacyRecords && officer.legacyRecords.length > 0 ? officer.legacyRecords[0] : null
  );

  if (!isOpen) return null;

  const handleStartIngestion = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setHasConverted(true);
      onCompleteIngestion(officer.id);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white border border-slate-300 rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-purple-900 text-white px-6 py-4 flex items-center justify-between border-b border-purple-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-700/50 border border-purple-400/40 flex items-center justify-center text-purple-200">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold tracking-tight">
                  Fresher Officer Workspace: Legacy Dossier Ingestion
                </h2>
                <span className="px-2 py-0.5 rounded bg-purple-400 text-purple-950 text-[10px] font-mono font-bold">
                  FRESHER ONBOARDING
                </span>
              </div>
              <p className="text-xs text-purple-200">
                Onboarding: {officer.fakeName} (Age: {officer.age}) • {officer.department} (Powai Circle)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-purple-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subheader Banner */}
        <div className="bg-purple-50 px-6 py-3 border-b border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-purple-950">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-700 shrink-0" />
            <span>
              <strong>Physical Paper Registers Detected:</strong> 4 Historical tender files processed manually in DAE zonal stores before GeM AI adoption.
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-purple-800 shrink-0">
            <span>Legacy Bottleneck: <strong>38.5 Days Average Cycle</strong></span>
            <span>•</span>
            <span className="text-red-700 font-bold">CAG Risk: 82/100</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Status Alert */}
          {hasConverted ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-start gap-3 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-emerald-900">
                  Legacy Paper Records Successfully Converted to Cryptographic Ledger!
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  All 4 physical tender files have been OCR-scanned, cross-referenced with Central Public Procurement Portal (CPPP) logs, and sealed onto the GeM blockchain ledger. Manual cycle days reduced from 38.5 days to 2.4 days!
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Physical Dossier Import Pending</span>
                </h4>
                <p className="text-xs text-amber-800 leading-relaxed max-w-2xl">
                  Inspect the physical manual evaluation sheets below, then execute automated OCR parsing and blockchain hashing to upgrade Tanvi to a Prior Ledger Certified (PLC) profile.
                </p>
              </div>
              <button
                type="button"
                onClick={handleStartIngestion}
                disabled={isProcessing}
                className="px-4 py-2.5 rounded-xl bg-purple-800 hover:bg-purple-900 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 shrink-0 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Parsing & Blockchain Hashing...</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-4 h-4 text-amber-300" />
                    <span>Ingest & Convert to Cryptographic Ledger</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Records Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Column: List of legacy files */}
            <div className="md:col-span-5 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Select Physical Paper Tender Dossier:
              </h4>

              <div className="space-y-2">
                {officer.legacyRecords?.map((record) => {
                  const isSelected = selectedRecord?.id === record.id;
                  return (
                    <button
                      key={record.id}
                      type="button"
                      onClick={() => setSelectedRecord(record)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-purple-50/70 border-purple-500 ring-2 ring-purple-400/20 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-mono font-bold text-purple-900">{record.tenderRef}</span>
                        <span className="text-slate-500">{record.dateProcessed}</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 line-clamp-1 mb-1">
                        {record.title}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span>Value: ₹{record.valueLakhs} Lakh</span>
                        <span className="font-mono text-red-600 font-bold">
                          {record.processingDays} Days Manual Processing
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Selected File Deep Inspection */}
            {selectedRecord && (
              <div className="md:col-span-7 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                      {selectedRecord.tenderRef}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      Department: {selectedRecord.department}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-2">
                    {selectedRecord.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-600">
                    <span>Awarded Bidder: <strong>{selectedRecord.winningBidder}</strong></span>
                    <span>•</span>
                    <span className="text-emerald-700 font-bold">Contract: ₹{selectedRecord.valueLakhs} Lakh</span>
                  </div>
                </div>

                {/* Identified Manual Bottlenecks */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Historical Manual Repetitions & Bottlenecks:</span>
                  </h5>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {selectedRecord.manualRepetitionsIdentified.map((rep, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-white p-2 rounded-lg border border-slate-200">
                        <span className="text-red-500 font-bold shrink-0">•</span>
                        <span>{rep}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bidders scrutinized manually */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Paper Bids Evaluated ({selectedRecord.biddersCount} Vendors):</span>
                  </h5>
                  <div className="space-y-1.5">
                    {selectedRecord.biddersList.map((bidder, idx) => (
                      <div key={idx} className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{bidder.name}</span>
                          <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                            bidder.status === 'Accepted'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {bidder.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600">{bidder.reason}</p>
                        <div className="pt-1 flex flex-wrap gap-1 text-[10px] text-slate-500 font-mono">
                          {bidder.manualChecksDone.map((chk, cIdx) => (
                            <span key={cIdx} className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                              {chk}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CAG Audit Query Note */}
                {selectedRecord.cagAuditRemarks && (
                  <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-900 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block">CAG Audit Flag on File:</strong>
                      <span>{selectedRecord.cagAuditRemarks}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
