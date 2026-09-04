import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Sparkles, ArrowRight, X } from 'lucide-react';

interface NamastePreloaderProps {
  onComplete: () => void;
  allowManualClose?: boolean;
}

export const NamastePreloader: React.FC<NamastePreloaderProps> = ({ onComplete, allowManualClose = true }) => {
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 400);
    const t2 = setTimeout(() => setStage(2), 1100);
    const t3 = setTimeout(() => setStage(3), 2000);
    const t4 = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="namaste-preloader-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.03, transition: { duration: 0.6, ease: 'easeInOut' } }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07131F] text-white overflow-hidden select-none"
        id="gem-namaste-preloader"
      >
        {/* Ambient Tricolor Aura Gradients */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#FF9933]/20 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#138808]/20 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(#002B49_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

        {/* Top Tricolor Strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 flex">
          <div className="flex-1 bg-[#FF9933]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#138808]" />
        </div>

        {/* Skip button if user wants to dive right in */}
        {allowManualClose && (
          <button
            onClick={onComplete}
            className="absolute top-5 right-6 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-slate-200 backdrop-blur-md transition-all border border-white/15"
            id="btn-skip-namaste"
          >
            <span>Skip Intro / सीधे जाएं</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}

        <div className="relative z-10 flex flex-col items-center max-w-xl px-6 text-center">
          {/* Ashoka Chakra in background behind folded hands */}
          <div className="relative mb-6 flex items-center justify-center">
            {/* Spinning 24 spoke Ashoka Chakra */}
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
              viewBox="0 0 100 100"
              className="w-40 h-40 text-[#000080]/60 opacity-70 filter drop-shadow-[0_0_15px_rgba(0,43,73,0.8)]"
            >
              <circle cx="50" cy="50" r="46" fill="none" stroke="#3b82f6" strokeWidth="2.5" opacity="0.7" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
              {Array.from({ length: 24 }).map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={50 + 44 * Math.cos((i * 15 * Math.PI) / 180)}
                  y2={50 + 44 * Math.sin((i * 15 * Math.PI) / 180)}
                  stroke="#3b82f6"
                  strokeWidth="1.2"
                  opacity="0.8"
                />
              ))}
            </motion.svg>

            {/* Folded Hands Icon (Pranām Mudra) */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-b from-[#FF9933]/25 via-white/10 to-[#138808]/25 border border-white/20 shadow-2xl backdrop-blur-sm">
                <span className="text-5xl filter drop-shadow-[0_0_12px_rgba(255,153,51,0.5)]">
                  🙏
                </span>
                <div className="absolute -bottom-1 px-2 py-0.5 rounded-full bg-[#002B49] text-[10px] font-semibold tracking-wider text-amber-300 border border-amber-400/40">
                  सत्यमेव जयते
                </div>
              </div>
            </motion.div>
          </div>

          {/* Big Bold Hindi NAMASTE with Tricolor typography */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mb-2"
          >
            <h1
              className="font-yatra text-6xl sm:text-7xl font-extrabold tracking-wide"
              style={{
                background: 'linear-gradient(180deg, #FF9933 0%, #FFFDF5 50%, #138808 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 4px 20px rgba(255,153,51,0.35))'
              }}
            >
              नमस्ते
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 1 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg sm:text-xl font-medium tracking-wide text-slate-200 mb-1"
          >
            Welcome to <span className="font-bold text-[#FF9933]">GeM</span>{' '}
            <span className="text-white">Smart</span>{' '}
            <span className="font-bold text-[#22c55e]">Procurement 5.0</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: stage >= 2 ? 1 : 0, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6 leading-relaxed"
          >
            गवर्नमेंट ई-मार्केटप्लेस • National Public Procurement Portal
            <div className="text-[11px] text-amber-300/90 mt-0.5">
              AI Bid Compliance Verification & Blockchain Audit Trail System
            </div>
          </motion.div>

          {/* Animated Verification Checklist Chips */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: stage >= 2 ? 1 : 0, y: 0 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FF9933]/15 border border-[#FF9933]/30 text-[11px] font-medium text-amber-200">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Udyam MSME
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/15 border border-blue-400/30 text-[11px] font-medium text-blue-200">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              GSTN Live Returns
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-[11px] font-medium text-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              AI Discrepancy Engine
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#138808]/15 border border-[#138808]/30 text-[11px] font-medium text-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Blockchain Ledger
            </span>
          </motion.div>

          {/* Progress Bar with Tricolor fill */}
          <div className="w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.8, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"
            />
          </div>
          <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Initializing Secure CPSE Gateway Handshake...
          </div>
        </div>

        {/* Bottom Tricolor Strip */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 flex">
          <div className="flex-1 bg-[#138808]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#FF9933]" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
