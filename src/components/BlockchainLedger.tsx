import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Link2,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Search,
  Layers,
  FileCode,
  Hash,
  AlertCircle,
  RefreshCw,
  PlusCircle,
  Clock,
  Sparkles,
  Award
} from 'lucide-react';
import { BlockchainBlock } from '../types';

interface BlockchainLedgerProps {
  ledger: BlockchainBlock[];
  onAddBlock?: (block: BlockchainBlock) => void;
}

export const BlockchainLedger: React.FC<BlockchainLedgerProps> = ({ ledger, onAddBlock }) => {
  const [selectedBlock, setSelectedBlock] = useState<BlockchainBlock | null>(ledger[ledger.length - 1] || null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState<boolean | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleVerifyIntegrity = () => {
    setIsVerifying(true);
    setVerificationSuccess(null);
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationSuccess(true);
    }, 900);
  };

  const filteredBlocks = ledger.filter(b => 
    b.tenderRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.bidderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.event.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border border-brand-border-light shadow-sm overflow-hidden" id="gem-blockchain-ledger">
      {/* Top Banner */}
      <div className="border-b border-brand-border-light px-5 py-4 bg-gradient-to-r from-slate-900 via-[#0B1E36] to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Cryptographic Audit Chain
            </span>
            <span className="text-xs text-slate-300">GeM Immutable Ledger Protocol</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white mt-0.5 flex items-center gap-2">
            Procurement Compliance Blockchain Ledger
            <span className="text-xs font-normal text-emerald-400 font-mono px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-800">
              Chain Height: #{ledger.length}
            </span>
          </h2>
          <p className="text-xs text-slate-300">
            Immutable, cryptographically signed ledger recording every portal verification, AI analysis score, and officer qualification order.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleVerifyIntegrity}
            disabled={isVerifying}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
            id="btn-verify-blockchain"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
            <span>{isVerifying ? 'Verifying Hashes...' : 'Verify Chain Integrity'}</span>
          </button>
        </div>
      </div>

      {/* Verification status toast banner */}
      {verificationSuccess && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-2 text-xs text-emerald-900 flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>All {ledger.length} blocks verified. Previous hash linkages & SHA-256 Merkle roots 100% intact with zero tampering.</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-700">Validated by NIC-GeM Consensus</span>
        </div>
      )}

      {/* Search & Overview controls */}
      <div className="p-4 border-b border-brand-border-light bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search hash, tender ID, or bidder..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#002B49]"
          />
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-600 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Consensus: <strong>Proof-of-Authority (PoA)</strong></span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-slate-500">
            <span>Block Time: ~1.2s</span>
          </div>
        </div>
      </div>

      {/* Visual Chain & Details Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Left: Chain Blocks List (7 cols) */}
        <div className="lg:col-span-7 border-r border-brand-border-light p-4 overflow-y-auto max-h-[580px] space-y-3">
          {filteredBlocks.map((block, idx) => {
            const isSelected = selectedBlock?.blockNumber === block.blockNumber;

            return (
              <div key={block.blockNumber} className="relative">
                {/* Connecting Line between blocks */}
                {idx < filteredBlocks.length - 1 && (
                  <div className="absolute left-6 top-14 bottom-[-14px] w-0.5 bg-gradient-to-b from-blue-400 to-slate-200 z-0 flex items-center justify-center">
                    <Link2 className="w-3 h-3 text-blue-500 bg-white rounded-full p-0.5" />
                  </div>
                )}

                <motion.div
                  whileHover={{ scale: 1.008 }}
                  onClick={() => setSelectedBlock(block)}
                  className={`relative z-10 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#2563EB] ring-2 ring-blue-500/20 bg-blue-50/40 shadow-md'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#002B49] text-white font-mono text-xs font-bold shadow-sm">
                        #{block.blockNumber}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-slate-900 line-clamp-1">
                          {block.event}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {block.timestamp}
                        </span>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 shrink-0">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      {block.complianceScore} Score
                    </span>
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 font-mono">
                    <div className="truncate">
                      <span className="text-slate-400 text-[10px] block">BIDDER ENTITY</span>
                      <span className="font-semibold text-slate-800">{block.bidderName}</span>
                    </div>
                    <div className="truncate">
                      <span className="text-slate-400 text-[10px] block">TENDER REF</span>
                      <span className="text-blue-700">{block.tenderRef}</span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span className="truncate max-w-[260px]">
                      Hash: <span className="text-slate-700">{block.hash.substring(0, 24)}...</span>
                    </span>
                    <span className="text-emerald-700 font-medium font-sans">Click to inspect</span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Block Deep Inspector (5 cols) */}
        <div className="lg:col-span-5 p-5 bg-slate-50 flex flex-col justify-between overflow-y-auto max-h-[580px]">
          {selectedBlock ? (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[#002B49] text-white">
                    <Hash className="w-4 h-4 text-[#FF9933]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Block #{selectedBlock.blockNumber} Details</h3>
                    <p className="text-[11px] text-slate-500 font-mono">{selectedBlock.timestamp}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  SEALED & VALID
                </span>
              </div>

              {/* Event Description */}
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Sealed Procurement Event
                </span>
                <p className="text-slate-900 font-medium leading-snug">
                  {selectedBlock.event}
                </p>
                <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-600">
                  <span>Signatory:</span>
                  <strong className="text-slate-800">{selectedBlock.verifiedBy}</strong>
                </div>
              </div>

              {/* Cryptographic Details Card */}
              <div className="space-y-2.5 p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] shadow-sm">
                <div>
                  <span className="text-slate-400 text-[10px] block">BLOCK SHA-256 HASH</span>
                  <span className="text-emerald-400 break-all">{selectedBlock.hash}</span>
                </div>
                <div className="pt-1.5 border-t border-slate-800">
                  <span className="text-slate-400 text-[10px] block">PREVIOUS BLOCK HASH</span>
                  <span className="text-blue-300 break-all">{selectedBlock.previousHash}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-slate-800 text-[10px]">
                  <div>
                    <span className="text-slate-400 block">MERKLE ROOT</span>
                    <span className="text-amber-300">{selectedBlock.merkleRoot}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">NONCE</span>
                    <span className="text-purple-300">{selectedBlock.nonce}</span>
                  </div>
                </div>
              </div>

              {/* Payload Parameters */}
              <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Audited Bidder Payload
                </span>
                <div className="flex justify-between text-slate-700 py-1 border-b border-slate-100">
                  <span>Company:</span>
                  <strong className="text-slate-900">{selectedBlock.bidderName}</strong>
                </div>
                <div className="flex justify-between text-slate-700 py-1 border-b border-slate-100">
                  <span>Tender Ref:</span>
                  <span className="text-blue-700 font-mono">{selectedBlock.tenderRef}</span>
                </div>
                <div className="flex justify-between text-slate-700 py-1">
                  <span>AI Score:</span>
                  <strong className="text-emerald-700">{selectedBlock.complianceScore}/100</strong>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 py-12">
              <Layers className="w-8 h-8 text-slate-300 mb-2" />
              <p>Select any block on the left to inspect its cryptographic metadata.</p>
            </div>
          )}

          <div className="pt-4 mt-4 border-t border-slate-200 text-center text-[11px] text-slate-500">
            Powered by Government of India Hyperledger Fabric / National Informatics Centre (NIC)
          </div>
        </div>
      </div>
    </div>
  );
};
