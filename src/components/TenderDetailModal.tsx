import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Building,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  ShieldCheck,
  Cpu,
  Award,
  Download,
  Share2,
  Bookmark,
  ExternalLink,
  ChevronRight,
  Phone,
  Mail,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Tender, Bidder } from '../types';

interface TenderDetailModalProps {
  tender: Tender | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenAIVerifier: (bidder: Bidder, tender: Tender) => void;
}

export const TenderDetailModal: React.FC<TenderDetailModalProps> = ({
  tender,
  isOpen,
  onClose,
  onOpenAIVerifier
}) => {
  if (!isOpen || !tender) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'bids' | 'items' | 'eligibility'>('overview');
  const [unlockedContacts, setUnlockedContacts] = useState<Record<string, boolean>>({});

  const toggleContact = (bidderId: string) => {
    setUnlockedContacts(prev => ({ ...prev, [bidderId]: !prev[bidderId] }));
  };

  return (
    <div className="fixed inset-0 z-[9980] flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-sm overflow-y-auto" id="modal-tender-detail">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0A2540] to-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow-sm">
              GeM
            </span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold text-xs border border-cyan-400/30">
              {tender.status === 'aoc' ? 'AOC (Award of Contract)' : tender.status.toUpperCase()}
            </span>
            <span className="text-xs text-slate-300 font-mono hidden sm:inline">
              Ref: {tender.referenceNumber}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tender Title & Authority Bar */}
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900 leading-snug">
            {tender.title}
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-medium text-slate-900">
              <Building className="w-4 h-4 text-blue-700" />
              <span>{tender.organisation}</span>
              <span className="text-slate-400">({tender.department})</span>
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{tender.location}</span>
            </div>

            <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
              <span>Contract Value: ₹{tender.contractValue ? (tender.contractValue / 100000).toFixed(2) + ' Lakh' : 'Refer Docs'}</span>
            </div>
          </div>

          {/* Timeline Bar */}
          <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Published</span>
                <span className="font-semibold text-slate-800">
                  {new Date(tender.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>

            <div className="h-0.5 flex-1 bg-slate-200 mx-4" />

            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Closing Date</span>
                <span className="font-semibold text-slate-800">
                  {new Date(tender.closingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>

            <div className="h-0.5 flex-1 bg-slate-200 mx-4" />

            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-bold">Awarded</span>
                <span className="font-semibold text-slate-800">
                  {new Date(tender.lastActivityAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 px-6 bg-white gap-3 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 border-b-2 transition-all ${
              activeTab === 'overview' ? 'border-[#002B49] text-[#002B49]' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Tender Overview & Scope
          </button>
          <button
            onClick={() => setActiveTab('bids')}
            className={`py-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'bids' ? 'border-[#002B49] text-[#002B49]' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>Participating Bids ({tender.bids.length})</span>
            <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 text-[10px]">AI Verified</span>
          </button>
          <button
            onClick={() => setActiveTab('items')}
            className={`py-3 border-b-2 transition-all ${
              activeTab === 'items' ? 'border-[#002B49] text-[#002B49]' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Items & BoQ ({tender.items.length})
          </button>
          <button
            onClick={() => setActiveTab('eligibility')}
            className={`py-3 border-b-2 transition-all ${
              activeTab === 'eligibility' ? 'border-[#002B49] text-[#002B49]' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Eligibility & ATC Terms
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-800 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Scope of Work & Specification Summary
                </h3>
                <p className="text-sm text-slate-800 leading-relaxed font-normal">
                  {tender.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="text-[11px] text-slate-500">Tender Type</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">{tender.tenderType}</div>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="text-[11px] text-slate-500">Bid Type & Method</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">{tender.gemBidType.toUpperCase()} • Total Value Wise</div>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="text-[11px] text-slate-500">EMD Fee Requirement</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">
                    {tender.emdValue ? `₹${(tender.emdValue / 100000).toFixed(2)} Lakh` : 'Exempt for MSEs'}
                  </div>
                </div>
              </div>

              {tender.beneficiary && (
                <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-blue-950 flex items-center justify-between">
                  <span>Beneficiary Account: <strong>{tender.beneficiary}</strong></span>
                  <span className="font-mono text-[10px] text-blue-700">CPSE Certified</span>
                </div>
              )}
            </div>
          )}

          {/* TAB: BIDS & COMPARISON */}
          {activeTab === 'bids' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Bid Qualification & Financial Ranking</h3>
                  <p className="text-xs text-slate-500">
                    Click any bidder to trigger real-time AI Multi-Portal verification and compliance analysis.
                  </p>
                </div>
                <div className="text-xs text-slate-500">
                  Showing top {tender.bids.length} bids
                </div>
              </div>

              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                {tender.bids.map((b) => {
                  const isContactVisible = unlockedContacts[b.id];

                  return (
                    <div key={b.id} className="p-4 hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          {b.rank && (
                            <span className={`px-2 py-0.5 rounded text-[11px] font-extrabold ${
                              b.rank === 'L1'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-200 text-slate-800'
                            }`}>
                              {b.rank}
                            </span>
                          )}

                          <span className="font-bold text-sm text-slate-900">
                            {b.companyName}
                          </span>

                          {b.isAwarded && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                              <Award className="w-3 h-3 text-emerald-700" />
                              Awarded Contract
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                          <span>{b.location}</span>
                          <span>•</span>
                          <span className="font-mono text-[11px]">{b.bidNumber}</span>

                          {/* Tags */}
                          {b.tags.map(t => (
                            <span key={t} className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold border border-slate-200">
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Contact Unlock Simulation */}
                        {b.phone && (
                          <div className="text-xs">
                            {isContactVisible ? (
                              <div className="flex items-center gap-3 text-emerald-800 font-mono text-[11px] bg-emerald-50 p-1.5 rounded-md inline-flex">
                                <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {b.phone}</span>
                                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {b.email}</span>
                              </div>
                            ) : (
                              <button
                                onClick={() => toggleContact(b.id)}
                                className="text-[11px] font-semibold text-blue-700 hover:underline flex items-center gap-1"
                              >
                                <Phone className="w-3 h-3" />
                                <span>Unlock Authority Contact Details</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Right side: Amount and AI Verifier Launcher */}
                      <div className="flex items-center gap-3 sm:flex-col sm:items-end shrink-0">
                        <div className="text-right">
                          <div className="text-sm font-bold text-emerald-700">
                            {b.amount ? `₹${(b.amount / 100000).toFixed(2)} Lakh` : 'Refer Docs'}
                          </div>
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            b.status === 'Qualified' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {b.status}
                          </span>
                        </div>

                        <button
                          onClick={() => onOpenAIVerifier(b, tender)}
                          className="px-3 py-1.5 rounded-lg bg-[#002B49] hover:bg-[#003c66] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                        >
                          <Cpu className="w-3.5 h-3.5 text-[#FF9933]" />
                          <span>Verify Compliance</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: ITEMS */}
          {activeTab === 'items' && (
            <div className="space-y-4">
              <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Item / Service Description</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Delivery Location</th>
                    <th className="p-3">Specification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tender.items.map((it, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="p-3 font-bold text-slate-500">{idx + 1}</td>
                      <td className="p-3 font-semibold text-slate-900">{it.name}</td>
                      <td className="p-3 font-mono font-bold text-blue-800">{it.quantity}</td>
                      <td className="p-3 text-slate-600">{it.deliveryLocation}</td>
                      <td className="p-3 text-slate-500">{it.specification || 'As per GeM Product Specs'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB: ELIGIBILITY */}
          {activeTab === 'eligibility' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="font-bold text-slate-900 block mb-1">Past Experience Criteria</span>
                  <p className="text-slate-600">
                    Minimum {tender.eligibility.experienceYears} years past performance delivering similar supplies to Central/State Govt ministries, CPSEs or public universities.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="font-bold text-slate-900 block mb-1">Annual Turnover Requirement</span>
                  <p className="text-slate-600">
                    Average annual audited financial turnover for the last 3 financial years must be at least ₹{tender.eligibility.minTurnoverLakhs} Lakhs.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
                <span className="font-bold text-amber-950 block mb-1">Purchase Preferences Applicable:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {tender.eligibility.purchasePreference.map(p => (
                    <span key={p} className="px-2.5 py-1 rounded bg-white border border-amber-300 text-amber-900 font-semibold text-xs">
                      ✓ {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs">
          <div className="text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Authenticated on Central Public Procurement Portal (CPPP)</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
