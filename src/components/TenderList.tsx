import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Bookmark,
  Share2,
  FileText,
  MapPin,
  Calendar,
  Award,
  Lock,
  Cpu,
  ChevronDown,
  X,
  Building,
  CheckCircle2,
  AlertTriangle,
  ArrowUpDown,
  Download
} from 'lucide-react';
import { Tender, Bidder } from '../types';

interface TenderListProps {
  tenders: Tender[];
  onSelectTender: (tender: Tender) => void;
  onOpenAIVerifier: (bidder: Bidder, tender: Tender) => void;
  searchQuery: string;
}

export const TenderList: React.FC<TenderListProps> = ({
  tenders,
  onSelectTender,
  onOpenAIVerifier,
  searchQuery
}) => {
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedOrg, setSelectedOrg] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [savedTenders, setSavedTenders] = useState<Record<string, boolean>>({});
  const [readMoreExpanded, setReadMoreExpanded] = useState<boolean>(false);
  const [keywordInput, setKeywordInput] = useState<string>('');
  const [appliedKeywords, setAppliedKeywords] = useState<string[]>([]);
  const [activeDateRange, setActiveDateRange] = useState<string>('Last 6 Months');

  const toggleSaveTender = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedTenders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (keywordInput.trim() && !appliedKeywords.includes(keywordInput.trim())) {
      setAppliedKeywords(prev => [...prev, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (kw: string) => {
    setAppliedKeywords(prev => prev.filter(k => k !== kw));
  };

  // Filter tenders based on search and sidebar filters
  const filteredTenders = useMemo(() => {
    return tenders.filter(t => {
      // Global search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = t.title.toLowerCase().includes(q);
        const matchOrg = t.organisation.toLowerCase().includes(q);
        const matchLoc = t.location.toLowerCase().includes(q);
        const matchRef = t.referenceNumber.toLowerCase().includes(q);
        const matchBidder = t.bids.some(b => b.companyName.toLowerCase().includes(q));
        if (!matchTitle && !matchOrg && !matchLoc && !matchRef && !matchBidder) return false;
      }

      // Keyword chips
      if (appliedKeywords.length > 0) {
        const hasKeywordMatch = appliedKeywords.some(kw => 
          t.title.toLowerCase().includes(kw.toLowerCase()) ||
          t.description.toLowerCase().includes(kw.toLowerCase()) ||
          t.organisation.toLowerCase().includes(kw.toLowerCase())
        );
        if (!hasKeywordMatch) return false;
      }

      // State filter
      if (selectedState !== 'All' && !t.state.toLowerCase().includes(selectedState.toLowerCase())) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && t.tenderCategory !== selectedCategory) {
        return false;
      }

      // Organization filter
      if (selectedOrg !== 'All' && !t.organisation.toLowerCase().includes(selectedOrg.toLowerCase())) {
        return false;
      }

      // Status filter
      if (selectedStatus !== 'All' && t.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [tenders, searchQuery, appliedKeywords, selectedState, selectedCategory, selectedOrg, selectedStatus]);

  return (
    <div className="space-y-4" id="gem-tender-list-view">
      {/* Page Header matching Tenderkart / GeM format */}
      <div className="mb-2">
        <div className="flex items-baseline gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
            Government e-Marketplace (GeM) Tender Results
          </h1>
          <span className="text-sm font-semibold text-slate-500">
            5,36,590 results
          </span>
        </div>

        {/* Informative GeM Portal Description */}
        <div className="mt-2 max-w-4xl text-sm leading-relaxed text-slate-600">
          <div className="flex items-start gap-2">
            <p className={readMoreExpanded ? '' : 'line-clamp-2'}>
              Browse active tenders from Government e-Marketplace (GeM), India's unified public procurement portal. GeM serves as the one-stop-shop for Central and State Government ministries, departments, PSUs, and autonomous bodies to procure goods and services online with 5,36,590 active bids. Access opportunities across diverse categories including IT hardware & software, office equipment, vehicles, electrical items, medical equipment, security services, facility management, manpower services, and professional consulting. GeM ensures transparent, efficient, and corruption-free procurement.
            </p>
            <button
              onClick={() => setReadMoreExpanded(!readMoreExpanded)}
              className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-800 focus:outline-none"
            >
              {readMoreExpanded ? 'Show less' : 'Read more'}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${readMoreExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters (3 cols) + Tender Cards (9 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar Filters */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-24 bg-white rounded-xl border border-brand-border-light shadow-xs p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#002B49]" />
                <h2 className="text-sm font-bold text-slate-900">Filters</h2>
              </div>
              <button
                onClick={() => {
                  setSelectedState('All');
                  setSelectedCategory('All');
                  setSelectedOrg('All');
                  setSelectedStatus('All');
                  setAppliedKeywords([]);
                }}
                className="text-xs font-semibold text-blue-700 hover:underline"
              >
                Clear all
              </button>
            </div>

            {/* Keyword Input Filter */}
            <div className="space-y-1.5 border-b border-slate-200 pb-3">
              <label className="text-xs font-bold text-slate-800 block">Keywords</label>
              <form onSubmit={handleAddKeyword} className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="e.g. Solar, Truck, IT..."
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#002B49]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#002B49] text-white text-xs font-semibold rounded-lg hover:bg-[#003860]"
                >
                  Add
                </button>
              </form>

              {appliedKeywords.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {appliedKeywords.map(kw => (
                    <span
                      key={kw}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-[11px] font-medium"
                    >
                      {kw}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeKeyword(kw)} />
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Activity Date Range Chips */}
            <div className="space-y-2 border-b border-slate-200 pb-3">
              <label className="text-xs font-bold text-slate-800 block">Last Activity</label>
              <div className="flex flex-wrap gap-1.5">
                {['Today', 'Last 7 Days', 'Last 1 Month', 'Last 6 Months', 'All'].map(range => (
                  <button
                    key={range}
                    onClick={() => setActiveDateRange(range)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                      activeDateRange === range
                        ? 'bg-[#002B49] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* State Filter */}
            <div className="space-y-1.5 border-b border-slate-200 pb-3">
              <label className="text-xs font-bold text-slate-800 block">State / UT</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#002B49]"
              >
                <option value="All">All States / UTs</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Jammu And Kashmir">Jammu & Kashmir</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Kerala">Kerala</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Punjab">Punjab</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="space-y-1.5 border-b border-slate-200 pb-3">
              <label className="text-xs font-bold text-slate-800 block">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#002B49]"
              >
                <option value="All">All Categories</option>
                <option value="Goods">Goods</option>
                <option value="Services">Services</option>
                <option value="Works">Works</option>
              </select>
            </div>

            {/* Organization Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 block">Buyer Organisation</label>
              <select
                value={selectedOrg}
                onChange={(e) => setSelectedOrg(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#002B49]"
              >
                <option value="All">All Organisations</option>
                <option value="Indian Army">Indian Army</option>
                <option value="Indian Air Force">Indian Air Force</option>
                <option value="Indian Navy">Indian Navy</option>
                <option value="Bharat Electronics Limited">BEL (Bharat Electronics)</option>
                <option value="Hindustan Petroleum Corporation Ltd">HPCL</option>
                <option value="Directorate Of Purchase And Stores">DAE / PMO</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Tender Cards List */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          {/* Active Filter Chips Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-3 rounded-xl border border-slate-200 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-slate-400 font-semibold mr-1">Active:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 font-medium">
                Portal: GeM
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 font-medium">
                Status: AOC
              </span>
              {selectedState !== 'All' && (
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-medium flex items-center gap-1">
                  State: {selectedState}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedState('All')} />
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <span>Showing <strong>{filteredTenders.length}</strong> matching tenders</span>
            </div>
          </div>

          {/* Tender Cards */}
          {filteredTenders.length > 0 ? (
            <div className="space-y-4">
              {filteredTenders.map((tender) => {
                const winningBid = tender.bids.find(b => b.isAwarded) || tender.bids[0];
                const isSaved = savedTenders[tender.id];

                return (
                  <motion.div
                    key={tender.id}
                    whileHover={{ scale: 1.004 }}
                    onClick={() => onSelectTender(tender)}
                    className="p-5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md cursor-pointer transition-all space-y-3"
                  >
                    {/* Tender Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-700 transition-colors leading-snug">
                            {tender.organisation}
                          </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{tender.location}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-medium text-slate-700">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>Tender closing: {new Date(tender.closingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </span>
                        </div>

                        <p className="text-sm text-slate-700 font-medium line-clamp-2 leading-relaxed mt-1">
                          {tender.title}
                        </p>
                      </div>

                      {/* Top Action Buttons (Notes, Save, Share) */}
                      <div className="flex items-center gap-1.5 shrink-0 self-start">
                        <button
                          type="button"
                          onClick={(e) => toggleSaveTender(tender.id, e)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${
                            isSaved
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                          <span>{isSaved ? 'Saved' : 'Save'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard?.writeText(window.location.href);
                          }}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                          title="Share Tender"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* GeM Tag Badges */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold">
                      <span className="px-2 py-0.5 rounded bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xs">
                        GeM
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800">
                        AOC
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800">
                        {tender.gemBidType.toUpperCase()} Bids
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                        {tender.tenderCategory}
                      </span>
                    </div>

                    <div className="h-px bg-slate-100" />

                    {/* Awarded Bids Section */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                        <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                          <Award className="w-4 h-4 text-emerald-600" />
                          Awarded Bids ({tender.bids.filter(b => b.isAwarded).length || 1})
                        </span>
                        <span className="text-slate-500 text-[11px]">
                          Ref: {tender.referenceNumber}
                        </span>
                      </div>

                      {/* Winning Bidder Highlight Card */}
                      {winningBid && (
                        <div className="p-3 rounded-xl border border-emerald-100 bg-emerald-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-bold text-blue-800 hover:underline">
                              {winningBid.companyName}
                            </span>
                            {winningBid.tags.map(t => (
                              <span key={t} className="px-1.5 py-0.2 rounded bg-white text-[10px] font-semibold text-slate-600 border border-slate-200">
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-sm font-black text-emerald-700 font-mono">
                              ₹{winningBid.amount ? (winningBid.amount / 100000).toFixed(2) + ' Lakh' : 'Refer Docs'}
                            </span>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenAIVerifier(winningBid, tender);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#002B49] hover:bg-[#003860] text-white text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
                            >
                              <Cpu className="w-3.5 h-3.5 text-[#FF9933]" />
                              <span>AI Verify</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
              <Search className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="text-base font-bold text-slate-900">No tenders match your filters</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try removing keyword filters or choosing "All" in the state or category dropdown.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
