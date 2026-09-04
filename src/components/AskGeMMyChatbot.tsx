import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'gemmy' | 'user';
  text: string;
  timestamp: string;
  actionLinks?: { label: string; action: string }[];
}

interface AskGeMMyChatbotProps {
  onOpenTreeFlow: () => void;
  onOpenBlockchain: () => void;
}

export const AskGeMMyChatbot: React.FC<AskGeMMyChatbotProps> = ({
  onOpenTreeFlow,
  onOpenBlockchain
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'gemmy',
      text: 'नमस्ते! I am GeMMy, your AI Procurement & Bid Compliance Assistant. How can I assist you with statutory checks, tender evaluations, or GFR 2017 rules today?',
      timestamp: '11:15 AM',
      actionLinks: [
        { label: 'How does AI verify Make In India (MII)?', action: 'mii' },
        { label: 'Why was Aditya Logistics disqualified?', action: 'aditya' },
        { label: 'View Blockchain Audit Trail', action: 'blockchain' }
      ]
    }
  ]);

  const handleSend = (userText?: string) => {
    const textToSend = userText || inputValue;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!userText) setInputValue('');

    // Generate intelligent AI procurement assistant response
    setTimeout(() => {
      let botResponse = '';
      const q = textToSend.toLowerCase();

      if (q.includes('mii') || q.includes('make in india') || q.includes('local content')) {
        botResponse = 'As per DPIIT Order No. P-45021/2/2017-PP, Class-I Local Suppliers must provide >= 50% domestic value addition. Our AI Cross-Verification Engine audits the self-declaration against imported bill-of-entry data on customs gateways to ensure authenticity.';
      } else if (q.includes('aditya') || q.includes('disqualif')) {
        botResponse = 'Bidder ADITYA LOGISTICS was disqualified on Indian Air Force tender GEM/2026/B/7770945 because the GSTN live gateway handshake flagged a GSTR-3B return default exceeding 90 days, violating GFR Rule 144(xi), along with a turnover gap (₹34.2L vs required ₹52.0L).';
      } else if (q.includes('blockchain') || q.includes('ledger') || q.includes('hash')) {
        botResponse = 'The GeM Blockchain Audit Ledger timestamps every evaluation step into cryptographic blocks. Once the Procurement Officer seals a qualification order, the SHA-256 hash becomes immutable, preventing retrospective alteration.';
        onOpenBlockchain();
      } else if (q.includes('tree') || q.includes('decision') || q.includes('flow')) {
        botResponse = 'Opening the AI Decision Tree Flow for you! You can examine the statutory checks, enterprise standing, DigiLocker verification, and score gates interactively.';
        onOpenTreeFlow();
      } else {
        botResponse = `Under General Financial Rules (GFR) 2017 and GeM Guidelines, automated verification retrieves authentic primary data across GSTN, MSME Udyam, Income Tax, and EPFO registries to minimize evaluation delays by 60–80%.`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'gemmy',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button in Bottom Left (as seen in GeM screenshot!) */}
      <div className="fixed bottom-5 left-5 z-40" id="gem-floating-ask-gemmy">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#002B49] via-[#003d69] to-[#0284c7] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all border border-cyan-400/40"
          >
            <div className="w-7 h-7 rounded-full bg-[#FF9933] flex items-center justify-center text-white shadow-sm font-bold text-xs">
              🤖
            </div>
            <div className="text-left leading-tight">
              <span className="font-bold text-xs block">Ask GeMMy</span>
              <span className="text-[9px] text-cyan-200 font-medium italic">Powered by AI</span>
            </div>
          </button>
        )}
      </div>

      {/* Interactive Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-5 left-5 z-50 w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col h-[520px]"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#002B49] via-[#003860] to-[#002B49] text-white p-3.5 flex items-center justify-between border-b border-blue-900">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FF9933] flex items-center justify-center text-base shadow-sm">
                  🤖
                </div>
                <div>
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    Ask GeMMy AI
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-[10px] text-cyan-200">
                    GeM & CPPP Statutory Procurement Assistant
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-white/10 text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-3.5 flex-1 overflow-y-auto space-y-3 bg-slate-50 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'gemmy' && (
                    <div className="w-6 h-6 rounded-full bg-[#002B49] text-white flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                      GeM
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#002B49] text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200 shadow-xs rounded-bl-xs'
                    }`}
                  >
                    <p>{m.text}</p>
                    <span className={`text-[9px] block mt-1 ${m.sender === 'user' ? 'text-slate-300' : 'text-slate-400'}`}>
                      {m.timestamp}
                    </span>

                    {/* Action Chips */}
                    {m.actionLinks && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-col gap-1.5">
                        {m.actionLinks.map((link, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(link.label)}
                            className="text-left text-[11px] font-semibold text-blue-700 hover:text-blue-900 bg-blue-50/80 hover:bg-blue-100 p-1.5 rounded-md transition-colors flex items-center justify-between"
                          >
                            <span>{link.label}</span>
                            <ChevronRight className="w-3 h-3 text-blue-500" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask GeMMy about tenders, GFR rules, or bids..."
                className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002B49]"
              />
              <button
                onClick={() => handleSend()}
                className="p-2 rounded-lg bg-[#002B49] hover:bg-[#003860] text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
