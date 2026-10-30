import React, { useState } from 'react';
import { Navbar, NavTabId } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { PeriodicTableView } from './components/PeriodicTableView';
import { Atom3DView } from './components/Atom3DView';
import { ElectronConfigView } from './components/ElectronConfigView';
import { Molecule3DView } from './components/Molecule3DView';
import { EquationCalculatorView } from './components/EquationCalculatorView';
import { IonicReactionView } from './components/IonicReactionView';
import { VirtualLabView } from './components/VirtualLabView';
import { ElectrochemistryView } from './components/ElectrochemistryView';
import { SolutionTitrationView } from './components/SolutionTitrationView';
import { KnowledgeView } from './components/KnowledgeView';
import { CasioCalculatorView } from './components/CasioCalculatorView';
import { WhiteboardView } from './components/WhiteboardView';
import { QuickSearchModal } from './components/QuickSearchModal';
import { CoffeeModal } from './components/CoffeeModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTabId>('home');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCoffeeOpen, setIsCoffeeOpen] = useState<boolean>(false);

  // Tab Context State (e.g. elementZ, experimentId, reactionId)
  const [tabContext, setTabContext] = useState<{
    elementZ?: number;
    experimentId?: string;
    reactionId?: string;
  }>({});

  const handleSelectTab = (tab: NavTabId, contextData?: any) => {
    setActiveTab(tab);
    if (contextData) {
      setTabContext(contextData);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenDonate={() => setIsCoffeeOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'home' && (
          <HomeView
            onSelectTab={handleSelectTab}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenDonate={() => setIsCoffeeOpen(true)}
          />
        )}

        {activeTab === 'periodic' && (
          <PeriodicTableView
            initialElementZ={tabContext.elementZ}
            onNavigateToTab={handleSelectTab}
          />
        )}

        {activeTab === 'atom' && (
          <Atom3DView initialElementZ={tabContext.elementZ || 6} />
        )}

        {activeTab === 'config' && (
          <ElectronConfigView initialElementZ={tabContext.elementZ || 26} />
        )}

        {activeTab === 'molecule' && <Molecule3DView />}

        {activeTab === 'equation' && (
          <EquationCalculatorView initialReactionId={tabContext.reactionId} />
        )}

        {activeTab === 'ionic' && <IonicReactionView />}

        {activeTab === 'lab' && (
          <VirtualLabView initialExperimentId={tabContext.experimentId} />
        )}

        {activeTab === 'echem' && <ElectrochemistryView />}

        {activeTab === 'solution' && <SolutionTitrationView />}

        {activeTab === 'tracuu' && <KnowledgeView />}

        {activeTab === 'casio' && <CasioCalculatorView />}

        {activeTab === 'whiteboard' && <WhiteboardView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-bold text-white">ChemLabs</span>
            <span>—</span>
            <span>Hệ sinh thái Hóa học số tương tác dành cho Giáo viên &amp; Học sinh</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => handleSelectTab('tracuu')}
              className="hover:text-cyan-400 transition-colors"
            >
              Bách khoa tri thức
            </button>
            <button
              onClick={() => handleSelectTab('lab')}
              className="hover:text-cyan-400 transition-colors"
            >
              Thí nghiệm ảo
            </button>
            <button
              onClick={() => setIsCoffeeOpen(true)}
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              Ủng hộ tác giả ☕
            </button>
          </div>
        </div>
      </footer>

      {/* Universal Search Modal (⌘K) */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTab={handleSelectTab}
      />

      {/* Coffee Support Modal */}
      <CoffeeModal
        isOpen={isCoffeeOpen}
        onClose={() => setIsCoffeeOpen(false)}
      />
    </div>
  );
}
