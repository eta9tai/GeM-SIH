import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Building,
  CheckCircle2,
  Lock,
  Copy,
  Printer,
  Download,
  ExternalLink,
  ShieldAlert,
  Fingerprint,
  Calendar,
  MapPin,
  Check
} from 'lucide-react';
import { BidderDocumentRecord } from '../types';

interface SampleLetterModalProps {
  document: BidderDocumentRecord | null;
  bidderName: string;
  bidderLocation: string;
  tenderRef: string;
  isOpen: boolean;
  onClose: () => void;
}

export const SampleLetterModal: React.FC<SampleLetterModalProps> = ({
  document,
  bidderName,
  bidderLocation,
  tenderRef,
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !document) return null;

  const letter = document.sampleLetter;
  const isAnomaly = document.isAnomaly || document.variancePercentage > 40;

  const handleCopy = () => {
    if (!letter) return;
    const textToCopy = `${letter.title}\n${letter.authorityOrAct}\n\n${letter.letterBody}\n\nSignatory: ${letter.signatory}\nPlace: ${letter.place}\nDate: ${letter.date}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[9995] flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-md overflow-y-auto" id="sample-letter-modal">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Top Header */}
        <div className={`px-6 py-4 flex items-center justify-between text-white ${
          isAnomaly ? 'bg-gradient-to-r from-rose-950 via-rose-900 to-amber-950 border-b border-rose-800' : 'bg-gradient-to-r from-[#002B49] via-[#083b63] to-[#002B49] border-b border-blue-900'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-inner ${
              isAnomaly ? 'bg-rose-500/20 text-rose-300 border border-rose-400/30' : 'bg-amber-400/20 text-amber-300 border border-amber-300/30'
            }`}>
              {isAnomaly ? <ShieldAlert className="w-5 h-5 text-rose-300" /> : <FileText className="w-5 h-5 text-amber-300" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider text-amber-300">
                  Official Bidder Proforma Submission & Sample Letter
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-slate-200 font-mono">
                  {document.docCode}
                </span>
              </div>
              <h2 className="text-base font-bold text-white tracking-tight mt-0.5">
                {document.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white flex items-center gap-1.5 transition-colors"
              title="Copy Letter Text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white flex items-center gap-1.5 transition-colors hidden sm:flex"
              title="Print Document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-200 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Variance & Document Status Bar */}
        <div className={`px-6 py-3 border-b flex flex-wrap items-center justify-between gap-3 text-xs ${
          isAnomaly ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          <div className="flex items-center gap-2">
            <span className="font-bold">PDF Annexure Reference:</span>
            <span className="px-2 py-0.5 rounded bg-white font-medium border border-slate-200">
              {document.pdfAnnexureRef}
            </span>
          </div>

          {/* Document Variance Gauge */}
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-600">Calculated Document Variance:</span>
            <div className="flex items-center gap-1.5">
              <div className="w-24 h-2 rounded-full bg-slate-200 overflow-hidden relative">
                <div
                  className={`h-full rounded-full ${
                    isAnomaly ? 'bg-rose-600' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, (document.variancePercentage / 60) * 100)}%` }}
                />
              </div>
              <span className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                isAnomaly
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {document.variancePercentage}% {isAnomaly ? 'CRITICAL ANOMALY (>40%)' : 'Normal (1-5%)'}
              </span>
            </div>
          </div>
        </div>

        {/* Anomaly Callout (if variance > 40%) */}
        {isAnomaly && (
          <div className="px-6 py-3 bg-rose-600 text-white flex items-start gap-3 shadow-inner">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-300" />
            <div>
              <div className="font-bold text-xs uppercase tracking-wider text-amber-200">
                Statutory Deviation Warning • GFR Rule Violation Detected
              </div>
              <p className="text-xs text-rose-100 mt-0.5">
                {document.anomalyDescription || 'Document content deviates significantly (>40%) from standard regulatory proforma. Mandatory statutory obligations were altered or omitted.'}
              </p>
            </div>
          </div>
        )}

        {/* Modal Scrollable Content: Realistic Official Paper Letter */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-100/80">
          <div className="bg-white rounded-xl shadow-md border border-slate-300 p-8 sm:p-12 max-w-3xl mx-auto relative font-serif text-slate-800 leading-relaxed">
            
            {/* Government / Corporate Letterhead */}
            <div className="text-center border-b-2 border-slate-900 pb-5 mb-6 font-sans">
              <div className="text-[11px] tracking-widest uppercase font-bold text-slate-500">
                GOVERNMENT E-MARKETPLACE (GeM) • OFFICIAL BID COMPLIANCE SUBMISSION
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1 uppercase">
                {bidderName}
              </h1>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Registered Office: {bidderLocation} • Tender Ref: <span className="font-mono text-slate-900 font-bold">{tenderRef}</span>
              </p>
              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 mt-2 font-mono">
                <span>CIN / UDYAM: VERIFIED</span>
                <span>•</span>
                <span>DOC REF: {document.docCode}</span>
                <span>•</span>
                <span>ANNEXURE-1 ENCLOSURE</span>
              </div>
            </div>

            {/* Letter Title Banner */}
            <div className="my-6 text-center">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 underline uppercase tracking-wide">
                {letter.title}
              </h2>
              <p className="text-xs italic text-slate-600 font-sans mt-1">
                ({letter.authorityOrAct})
              </p>
            </div>

            {/* Letter Body */}
            <div className="text-sm whitespace-pre-line text-slate-800 space-y-4 font-normal text-justify">
              {letter.letterBody}
            </div>

            {/* Key Statutory Clauses List */}
            {letter.keyClauses && letter.keyClauses.length > 0 && (
              <div className="my-6 p-4 rounded-lg bg-slate-50 border border-slate-200 font-sans">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Key Enforceability Clauses & Statutory Cross-Checks:
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {letter.keyClauses.map((clause, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                      <span>{clause}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Signatures & Official Stamp Box */}
            <div className="mt-10 pt-6 border-t border-slate-300 font-sans flex flex-col sm:flex-row justify-between items-end gap-6">
              <div className="text-xs text-slate-600 space-y-1">
                <div className="flex items-center gap-1 text-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span><strong>Place:</strong> {letter.place}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-800">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span><strong>Date:</strong> {letter.date}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-2">
                  DSC Token Serial: 0x981A72FE44C1
                </div>
              </div>

              {/* Rubber Stamp & Digital Signature Box */}
              <div className="border-2 border-dashed border-slate-400 rounded-xl p-4 bg-slate-50/80 text-center min-w-[220px] relative">
                {/* Official Round Stamp Simulation */}
                <div className={`w-24 h-24 rounded-full border-2 mx-auto flex flex-col items-center justify-center p-2 rotate-[-6deg] mb-2 ${
                  isAnomaly ? 'border-rose-400 text-rose-700 bg-rose-50/50' : 'border-blue-600 text-blue-800 bg-blue-50/50'
                }`}>
                  <span className="text-[8px] uppercase font-bold tracking-tighter">★ GOVERNMENT VENDOR ★</span>
                  <span className="text-[9px] font-extrabold text-center uppercase leading-tight my-0.5">
                    {bidderName.substring(0, 16)}
                  </span>
                  <span className="text-[8px] font-mono">{letter.stampVerified ? 'SEAL VERIFIED' : 'SEAL MISMATCH'}</span>
                </div>

                <div className="text-xs font-bold text-slate-900">{letter.signatory}</div>
                <div className="text-[11px] text-slate-600">{letter.designation}</div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-1 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" />
                  Class-3 DSC Signed (PKI Verified)
                </div>
              </div>
            </div>

            {/* Bottom Security Watermark */}
            <div className="mt-8 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400 font-mono flex flex-wrap items-center justify-between gap-2">
              <span>IPFS CID: {document.ipfsCid}</span>
              <span>GATEWAY: {document.verificationGateway}</span>
              <span>BLOCKCHAIN LEDGER HASH: {document.blockchainHash.substring(0, 18)}...</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-slate-400" />
            <span>Document integrity cryptographically attested under Section 65B of Indian Evidence Act.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
          >
            Close Document
          </button>
        </div>
      </motion.div>
    </div>
  );
};
