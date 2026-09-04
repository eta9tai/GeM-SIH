import React from 'react';
import {
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Clock,
  CheckCircle,
  Building,
  Award,
  Zap,
  Users,
  Percent
} from 'lucide-react';

export const ProcurementAnalytics: React.FC = () => {
  return (
    <div className="space-y-6" id="gem-procurement-analytics">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#002B49] via-[#0B3B60] to-[#002B49] text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold tracking-wider uppercase">
            National Impact Dashboard
          </span>
          <h2 className="text-2xl font-black text-white mt-1">
            GeM 5.0 Procurement & Compliance Metrics
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Real-time analytics capturing automated verification throughput across 80+ tender portals, 25K+ daily tenders, and 82 Central Public Sector Enterprises (CPSEs).
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-center">
            <span className="text-2xl font-black text-amber-300 block">74.6%</span>
            <span className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Effort Reduction</span>
          </div>
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-center">
            <span className="text-2xl font-black text-emerald-400 block">18 min</span>
            <span className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Avg Verification</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Active GeM Bids</span>
            <Building className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">5,36,590</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14.2% YoY growth
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">MSME Procurement Share</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">52.8%</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">
            Target 25% exceeded by 2x
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">High Risk Bids Filtered</span>
            <ShieldCheck className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">14,290</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Debarment & GST return defaults
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Blockchain Audit Entries</span>
            <Zap className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">1.84M</div>
          <div className="text-[11px] text-slate-500 font-medium mt-1">
            Cryptographically sealed blocks
          </div>
        </div>
      </div>

      {/* Ministry Distribution & Verification Speed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ministry breakdown */}
        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center justify-between">
            <span>Procurement Volume by Ministry</span>
            <span className="text-xs font-normal text-slate-400">FY 2026-27</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-800 mb-1">
                <span>Ministry of Defence (Army, Air Force, Navy, BDL, BEL)</span>
                <span>₹142,500 Cr (38%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#002B49] h-full rounded-full" style={{ width: '38%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-800 mb-1">
                <span>Ministry of Railways (CPSE, Zonal Railways)</span>
                <span>₹98,200 Cr (26%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '26%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-800 mb-1">
                <span>Ministry of Petroleum & Natural Gas (HPCL, IOCL, ONGC)</span>
                <span>₹64,100 Cr (17%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '17%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-800 mb-1">
                <span>Ministry of Heavy Industries & Power (BHEL, NTPC)</span>
                <span>₹45,300 Cr (12%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '12%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-800 mb-1">
                <span>Education, Health & Other CPSEs</span>
                <span>₹26,400 Cr (7%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full rounded-full" style={{ width: '7%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Expected Impact Summary */}
        <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              National Transformation Outcomes
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Real-world impact metrics delivered by AI compliance verification and blockchain immutability.
            </p>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-950 block">60–80% Reduction in Evaluation Effort:</strong>
                  <span>Officers save hundreds of hours cross-referencing multi-page PDFs against tax portals manually.</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-blue-950 block">Faster Tender Evaluation & Award:</strong>
                  <span>AOC cycle reduced from standard 45 days to less than 12 days.</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-purple-50/70 border border-purple-200 flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-purple-950 block">Complete Auditability & Traceability:</strong>
                  <span>Every officer order cryptographically time-stamped on NIC-GeM Blockchain with zero data tampering.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Central Public Procurement Portal (CPPP) Sync</span>
            <span className="font-mono text-emerald-700 font-bold">Latency: 42ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};
