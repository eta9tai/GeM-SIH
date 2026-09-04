import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { NamastePreloader } from './components/NamastePreloader';
import { TenderList } from './components/TenderList';
import { DecisionTreeFlow } from './components/DecisionTreeFlow';
import { BlockchainLedger } from './components/BlockchainLedger';
import { ProcurementAnalytics } from './components/ProcurementAnalytics';
import { TenderDetailModal } from './components/TenderDetailModal';
import { AIVerificationEngineModal } from './components/AIVerificationEngineModal';
import { AskGeMMyChatbot } from './components/AskGeMMyChatbot';
import { ComplianceDashboard } from './components/ComplianceDashboard';
import { AuthModal } from './components/AuthModal';
import { FresherOnboardingModal } from './components/FresherOnboardingModal';
import { EfficiencyLogicExplainerModal } from './components/EfficiencyLogicExplainerModal';
import { JurisdictionBanner } from './components/JurisdictionBanner';
import { INITIAL_TENDERS, INITIAL_BLOCKCHAIN_LEDGER } from './data/mockTenders';
import { MOCK_PROCUREMENT_OFFICERS, MOCK_BIDDER_ACCOUNTS } from './data/mockOfficers';
import { Tender, Bidder, BlockchainBlock, ProcurementOfficer, BidderAccount, UserRole } from './types';
import { ShieldCheck, Heart, ExternalLink, HelpCircle } from 'lucide-react';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [tenders, setTenders] = useState<Tender[]>(INITIAL_TENDERS);
  const [blockchainLedger, setBlockchainLedger] = useState<BlockchainBlock[]>(INITIAL_BLOCKCHAIN_LEDGER);
  const [activeView, setActiveView] = useState<'tenders' | 'compliance_dashboard' | 'tree_flow' | 'blockchain' | 'analytics'>('tenders');
  const [selectedComplianceTenderId, setSelectedComplianceTenderId] = useState<string>(INITIAL_TENDERS[0].id);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [fontSize, setFontSize] = useState<'small' | 'normal' | 'large'>('normal');
  const [searchQuery, setSearchQuery] = useState('');

  // User Role & Account Simulation State
  const [currentRole, setCurrentRole] = useState<UserRole>('officer');
  const [currentOfficer, setCurrentOfficer] = useState<ProcurementOfficer>(MOCK_PROCUREMENT_OFFICERS[0]);
  const [currentBidder, setCurrentBidder] = useState<BidderAccount>(MOCK_BIDDER_ACCOUNTS[0]);
  const [isCrossTerritoryOverride, setIsCrossTerritoryOverride] = useState<boolean>(false);

  // Modals for Auth, Fresher Onboarding, and Explainer
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isFresherModalOpen, setIsFresherModalOpen] = useState<boolean>(false);
  const [isExplainerModalOpen, setIsExplainerModalOpen] = useState<boolean>(false);

  // Modals
  const [selectedTenderForModal, setSelectedTenderForModal] = useState<Tender | null>(null);
  const [selectedBidderForVerifier, setSelectedBidderForVerifier] = useState<{ bidder: Bidder; tender: Tender } | null>(null);

  // Selected bidder for Decision Tree Flow
  const [treeSelectedBidder, setTreeSelectedBidder] = useState<Bidder>(
    INITIAL_TENDERS[0].bids[0]
  );

  // Territorial Jurisdiction Filtering
  const displayedTenders = useMemo(() => {
    if (currentRole === 'officer' && !isCrossTerritoryOverride) {
      return tenders.filter(t => {
        // 1. PIN code direct match
        if (t.pincode && currentOfficer.jurisdiction.pincodes.includes(t.pincode)) {
          return true;
        }
        // 2. City / Circle / Powai match within state
        if (
          t.state.toLowerCase() === currentOfficer.jurisdiction.state.toLowerCase() &&
          (t.city?.toLowerCase().includes(currentOfficer.jurisdiction.city.toLowerCase()) ||
           currentOfficer.jurisdiction.circleOrZone.toLowerCase().includes(t.city?.toLowerCase() || '') ||
           t.location.toLowerCase().includes('powai'))
        ) {
          return true;
        }
        // 3. Department match within same state
        if (
          t.department?.toLowerCase() === currentOfficer.jurisdiction.department.toLowerCase() &&
          t.state.toLowerCase() === currentOfficer.jurisdiction.state.toLowerCase()
        ) {
          return true;
        }
        return false;
      });
    }
    return tenders;
  }, [tenders, currentRole, currentOfficer, isCrossTerritoryOverride]);

  const handleOpenAIVerifier = (bidder: Bidder, tender: Tender) => {
    setSelectedBidderForVerifier({ bidder, tender });
    setTreeSelectedBidder(bidder);
  };

  const handleRecordOfficerDecision = (
    bidderId: string,
    action: 'Approved' | 'Disqualified' | 'Clarification_Sought',
    remarks: string
  ) => {
    // 1. Update Bidder status in Tenders list
    setTenders(prevTenders => {
      return prevTenders.map(t => {
        const hasBidder = t.bids.some(b => b.id === bidderId);
        if (!hasBidder) return t;

        const updatedBids = t.bids.map(b => {
          if (b.id !== bidderId) return b;
          const statusText = action === 'Approved' ? 'Qualified' : action === 'Disqualified' ? 'Disqualified' : 'Under Review';
          return {
            ...b,
            status: statusText as any,
            verificationData: {
              ...b.verificationData,
              officerDecision: {
                action,
                officerName: currentRole === 'officer' ? currentOfficer.fakeName : 'Authorized Officer',
                officerDesignation: currentRole === 'officer' ? currentOfficer.designation : 'Executive Engineer / CPO',
                timestamp: new Date().toLocaleString('en-IN'),
                remarks,
                blockchainTxHash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}...`
              }
            }
          };
        });

        return { ...t, bids: updatedBids };
      });
    });

    // 2. Append newly signed block to Blockchain Ledger
    const lastBlock = blockchainLedger[blockchainLedger.length - 1];
    const newBlockNumber = blockchainLedger.length;
    const targetTender = selectedBidderForVerifier?.tender || tenders[0];
    const targetBidder = selectedBidderForVerifier?.bidder || tenders[0].bids[0];

    const officerSigner = currentRole === 'officer'
      ? `${currentOfficer.fakeName} [${currentOfficer.employeeCode}] - ${currentOfficer.jurisdiction.circleOrZone}`
      : 'Senior Procurement Officer (CPSE Validated)';

    const newBlock: BlockchainBlock = {
      blockNumber: newBlockNumber,
      timestamp: new Date().toLocaleString('en-IN') + ' IST',
      previousHash: lastBlock.hash,
      hash: `0x0000${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
      nonce: Math.floor(Math.random() * 900000) + 100000,
      merkleRoot: `0x${Math.random().toString(16).substring(2, 10)}...`,
      tenderRef: targetTender.referenceNumber,
      event: `Procurement Officer Executive Order: ${action} (${remarks.substring(0, 45)}...)`,
      verifiedBy: officerSigner,
      bidderName: targetBidder.companyName,
      complianceScore: targetBidder.verificationData.complianceScore,
      status: 'VALID'
    };

    setBlockchainLedger(prev => [...prev, newBlock]);
  };

  const handleCompleteFresherIngestion = (officerId: string) => {
    setCurrentOfficer(prev => ({
      ...prev,
      hasIngestedLegacyProfile: true,
      accountType: 'plc' as any,
      efficiencyMetrics: {
        ...prev.efficiencyMetrics,
        cagAuditRiskScore: 6.0,
        manualCycleDays: 2.4,
        verificationAccuracyPct: 99.4
      }
    }));
  };

  // Font size multiplier class
  const fontSizeClass = fontSize === 'large' ? 'text-[17px]' : fontSize === 'small' ? 'text-[13px]' : 'text-[15px]';

  // Flat list of all bidders for switcher
  const allBiddersList = tenders.flatMap(t => t.bids);

  return (
    <div className={`min-h-screen bg-[#F4F6F8] flex flex-col text-slate-900 ${fontSizeClass}`} id="gem-root-container">
      {/* Big Bold Hindi Namaste Preloader */}
      {showPreloader && (
        <NamastePreloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* Main Header & Nav */}
      <Header
        activeView={activeView}
        onSelectView={setActiveView}
        onReplayNamaste={() => setShowPreloader(true)}
        language={language}
        onToggleLanguage={() => setLanguage(l => l === 'en' ? 'hi' : 'en')}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        currentRole={currentRole}
        currentOfficer={currentOfficer}
        currentBidder={currentBidder}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenExplainerModal={() => setIsExplainerModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Territorial Jurisdiction Security Banner */}
        <JurisdictionBanner
          currentRole={currentRole}
          officer={currentOfficer}
          bidder={currentBidder}
          isCrossTerritoryOverride={isCrossTerritoryOverride}
          onToggleCrossTerritoryOverride={() => setIsCrossTerritoryOverride(prev => !prev)}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onOpenFresherModal={() => setIsFresherModalOpen(true)}
          onOpenExplainerModal={() => setIsExplainerModalOpen(true)}
          filteredCount={displayedTenders.length}
          totalCount={tenders.length}
        />

        {activeView === 'tenders' && (
          <TenderList
            tenders={displayedTenders}
            onSelectTender={(tender) => setSelectedTenderForModal(tender)}
            onOpenAIVerifier={handleOpenAIVerifier}
            searchQuery={searchQuery}
          />
        )}

        {activeView === 'compliance_dashboard' && (
          <ComplianceDashboard
            tenders={displayedTenders.length > 0 ? displayedTenders : tenders}
            selectedTenderId={selectedComplianceTenderId}
            onTenderSelect={(tId) => setSelectedComplianceTenderId(tId)}
            onSealAuditOnBlockchain={(tenderRef, bidderName, remarks, isApproved) => {
              const lastBlock = blockchainLedger[blockchainLedger.length - 1];
              const signerTitle = currentRole === 'officer'
                ? `${currentOfficer.fakeName} (${currentOfficer.designation})`
                : 'Senior Procurement Officer (GeM Certified)';

              const newBlock: BlockchainBlock = {
                blockNumber: blockchainLedger.length,
                timestamp: new Date().toLocaleString('en-IN') + ' IST',
                previousHash: lastBlock.hash,
                hash: `0x0000${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
                nonce: Math.floor(Math.random() * 900000) + 100000,
                merkleRoot: `0x${Math.random().toString(16).substring(2, 10)}...`,
                tenderRef: tenderRef,
                event: isApproved
                  ? `Statutory Audit Passed: Annexure-1 Compliances Sealed on Ledger (${remarks.substring(0, 40)}...)`
                  : `Statutory Disqualification Seal: Anomaly > 40% Detected (${remarks.substring(0, 40)}...)`,
                verifiedBy: signerTitle,
                bidderName: bidderName,
                complianceScore: isApproved ? 96 : 38,
                status: 'VALID'
              };
              setBlockchainLedger(prev => [...prev, newBlock]);
            }}
          />
        )}

        {activeView === 'tree_flow' && (
          <DecisionTreeFlow
            selectedBidder={treeSelectedBidder}
            allBidders={allBiddersList}
            onSelectBidder={(b) => setTreeSelectedBidder(b)}
            onOpenAuditModal={(b) => {
              const matchedTender = tenders.find(t => t.bids.some(bid => bid.id === b.id)) || tenders[0];
              handleOpenAIVerifier(b, matchedTender);
            }}
          />
        )}

        {activeView === 'blockchain' && (
          <BlockchainLedger
            ledger={blockchainLedger}
            onAddBlock={(block) => setBlockchainLedger(prev => [...prev, block])}
          />
        )}

        {activeView === 'analytics' && (
          <ProcurementAnalytics />
        )}
      </main>

      {/* Tender Detail Modal */}
      <TenderDetailModal
        tender={selectedTenderForModal}
        isOpen={!!selectedTenderForModal}
        onClose={() => setSelectedTenderForModal(null)}
        onOpenAIVerifier={(bidder, tender) => {
          setSelectedTenderForModal(null);
          handleOpenAIVerifier(bidder, tender);
        }}
        onOpenComplianceDashboard={(tender) => {
          setSelectedComplianceTenderId(tender.id);
          setActiveView('compliance_dashboard');
          setSelectedTenderForModal(null);
        }}
      />

      {/* AI Multi-Portal Verification Modal */}
      <AIVerificationEngineModal
        bidder={selectedBidderForVerifier?.bidder || null}
        tender={selectedBidderForVerifier?.tender || null}
        isOpen={!!selectedBidderForVerifier}
        onClose={() => setSelectedBidderForVerifier(null)}
        onRecordOfficerDecision={handleRecordOfficerDecision}
      />

      {/* Dual-Role Authentication & Multi-Account Simulation Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentRole={currentRole}
        currentOfficer={currentOfficer}
        currentBidder={currentBidder}
        onSelectOfficer={(officer) => {
          setCurrentOfficer(officer);
          setCurrentRole('officer');
          setIsCrossTerritoryOverride(false);
        }}
        onSelectBidder={(bidder) => {
          setCurrentBidder(bidder);
          setCurrentRole('bidder');
          setIsCrossTerritoryOverride(false);
        }}
        onOpenFresherWorkspace={(officer) => {
          setCurrentOfficer(officer);
          setCurrentRole('officer');
          setIsFresherModalOpen(true);
        }}
      />

      {/* Fresher Officer Legacy Dossier Ingestion Modal */}
      <FresherOnboardingModal
        isOpen={isFresherModalOpen}
        onClose={() => setIsFresherModalOpen(false)}
        officer={currentOfficer}
        onCompleteIngestion={handleCompleteFresherIngestion}
      />

      {/* Quantitative Efficiency & Algorithmic Logic Explainer Modal */}
      <EfficiencyLogicExplainerModal
        isOpen={isExplainerModalOpen}
        onClose={() => setIsExplainerModalOpen(false)}
      />

      {/* Floating Ask GeMMy AI Chatbot */}
      <AskGeMMyChatbot
        onOpenTreeFlow={() => setActiveView('tree_flow')}
        onOpenBlockchain={() => setActiveView('blockchain')}
      />

      {/* Official Government of India & Tenderkart Footer */}
      <footer className="bg-[#002B49] text-white border-t border-slate-800 text-xs mt-12" id="gem-portal-footer">
        {/* Tricolor divider */}
        <div className="h-1 flex">
          <div className="flex-1 bg-[#FF9933]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#138808]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-slate-300">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-black text-lg text-white">GeM 5.0</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-bold">
                  NATIONAL
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Government e-Marketplace (GeM) is the national public procurement portal of India for Central & State ministries, CPSEs, and local bodies.
              </p>
              <div className="mt-3 text-[11px] text-amber-300 flex items-center gap-1 font-hindi">
                <span>सत्यमेव जयते • Transparency • Inclusiveness</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
                Quick Links
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li><a href="#tenders" onClick={() => setActiveView('tenders')} className="hover:text-amber-300">Live Tenders</a></li>
                <li><a href="#results" onClick={() => setActiveView('tenders')} className="hover:text-amber-300">Tender Results (AOC)</a></li>
                <li><a href="#tree" onClick={() => setActiveView('tree_flow')} className="hover:text-amber-300">AI Decision Tree</a></li>
                <li><a href="#blockchain" onClick={() => setActiveView('blockchain')} className="hover:text-amber-300">Blockchain Audit Ledger</a></li>
                <li><a href="#analytics" onClick={() => setActiveView('analytics')} className="hover:text-amber-300">CPSE Impact Analytics</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
                Statutory Tools & Portal Sync
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li><span className="text-slate-400">GSTN Status Verifier API</span></li>
                <li><span className="text-slate-400">MSME Udyam Database Connector</span></li>
                <li><span className="text-slate-400">CBDT Income Tax 3-Yr Audit</span></li>
                <li><span className="text-slate-400">DigiLocker Document Vault</span></li>
                <li><span className="text-slate-400">CPPP Central Debarment Clearing</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
                Helpdesk & Support
              </h4>
              <div className="space-y-1.5 text-xs text-slate-400">
                <div>Email: <strong className="text-slate-200">hello@tenderkart.in</strong></div>
                <div>Toll Free / WhatsApp: <strong className="text-slate-200">+91 89711 26947</strong></div>
                <div className="text-[11px] mt-2">
                  Operating Hours: Mon - Sat, 09:00 AM - 07:00 PM IST
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            <p>© 2026 Government e-Marketplace (GeM) & Tenderkart Integration. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="hover:underline cursor-pointer">Privacy Policy</span>
              <span className="hover:underline cursor-pointer">Terms of Service</span>
              <span className="hover:underline cursor-pointer">Security Whitepaper</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
