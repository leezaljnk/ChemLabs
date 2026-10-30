import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, Grid, TestTube2, Calculator, BookOpen, Layers, ArrowRight } from 'lucide-react';
import { ELEMENTS } from '../data/elements';
import { PRESET_REACTIONS } from '../data/reactions';
import { EXPERIMENTS } from '../data/experiments';
import { CORE_FORMULAS } from '../data/knowledge';
import { NavTabId } from './Navbar';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: NavTabId, contextData?: any) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTab
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener for ESC and ⌘K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle handled by parent
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return {
        elements: ELEMENTS.slice(0, 4),
        reactions: PRESET_REACTIONS.slice(0, 3),
        experiments: EXPERIMENTS.slice(0, 2),
        formulas: CORE_FORMULAS.slice(0, 2)
      };
    }

    const q = query.toLowerCase().trim();

    const filteredElements = ELEMENTS.filter(
      el =>
        el.symbol.toLowerCase().includes(q) ||
        el.nameVi.toLowerCase().includes(q) ||
        el.nameEn.toLowerCase().includes(q) ||
        String(el.z) === q
    ).slice(0, 5);

    const filteredReactions = PRESET_REACTIONS.filter(
      r =>
        r.reactantsStr.toLowerCase().includes(q) ||
        r.productsStr.toLowerCase().includes(q) ||
        r.balancedEquation.toLowerCase().includes(q) ||
        r.typeVi.toLowerCase().includes(q)
    ).slice(0, 4);

    const filteredExperiments = EXPERIMENTS.filter(
      exp =>
        exp.title.toLowerCase().includes(q) ||
        exp.equation.toLowerCase().includes(q) ||
        exp.category.toLowerCase().includes(q)
    ).slice(0, 3);

    const filteredFormulas = CORE_FORMULAS.filter(
      f =>
        f.nameVi.toLowerCase().includes(q) ||
        f.latex.toLowerCase().includes(q) ||
        f.explanationVi.toLowerCase().includes(q)
    ).slice(0, 3);

    return {
      elements: filteredElements,
      reactions: filteredReactions,
      experiments: filteredExperiments,
      formulas: filteredFormulas
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 p-4 pt-16 sm:pt-24 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl">
        {/* Search Input */}
        <div className="relative flex items-center border-b border-slate-800 pb-3">
          <Search className="h-5 w-5 text-cyan-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Tìm kiếm nguyên tố (Fe, Na), phản ứng, thí nghiệm, công thức..."
            className="w-full bg-transparent px-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
            aria-label="Đóng tìm kiếm"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="mt-3 max-h-[60vh] space-y-4 overflow-y-auto pr-1">
          {/* Elements Section */}
          {searchResults.elements.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                <Grid className="h-3.5 w-3.5" />
                <span>Nguyên tố hóa học</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                {searchResults.elements.map(el => (
                  <button
                    key={el.z}
                    onClick={() => {
                      onSelectTab('periodic', { elementZ: el.z });
                      onClose();
                    }}
                    className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/60 p-2.5 hover:border-cyan-500/50 hover:bg-cyan-950/20 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/15 font-bold text-cyan-300 border border-cyan-500/30 text-xs">
                        {el.symbol}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-cyan-300">
                          {el.nameVi}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Z = {el.z} · {el.categoryVi}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reactions Section */}
          {searchResults.reactions.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-blue-400 uppercase tracking-wider">
                <Calculator className="h-3.5 w-3.5" />
                <span>Phương trình hóa học</span>
              </div>
              <div className="space-y-1.5 mt-1">
                {searchResults.reactions.map(r => (
                  <button
                    key={r.id}
                    onClick={() => {
                      onSelectTab('equation', { reactionId: r.id });
                      onClose();
                    }}
                    className="w-full flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/60 p-2.5 hover:border-blue-500/50 hover:bg-blue-950/20 text-left transition-colors group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-100 font-mono group-hover:text-blue-300">
                        {r.balancedEquation}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {r.typeVi} · Lớp {r.grade}
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Experiments Section */}
          {searchResults.experiments.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <TestTube2 className="h-3.5 w-3.5" />
                <span>Thí nghiệm ảo</span>
              </div>
              <div className="space-y-1.5 mt-1">
                {searchResults.experiments.map(exp => (
                  <button
                    key={exp.id}
                    onClick={() => {
                      onSelectTab('lab', { experimentId: exp.id });
                      onClose();
                    }}
                    className="w-full flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/60 p-2.5 hover:border-emerald-500/50 hover:bg-emerald-950/20 text-left transition-colors group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-100 group-hover:text-emerald-300">
                        {exp.title}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {exp.equation}
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Formulas Section */}
          {searchResults.formulas.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Công thức trọng tâm</span>
              </div>
              <div className="space-y-1.5 mt-1">
                {searchResults.formulas.map((f, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      onSelectTab('tracuu');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/60 p-2.5 hover:border-amber-500/50 hover:bg-amber-950/20 text-left transition-colors group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-100 group-hover:text-amber-300">
                        {f.nameVi} (Lớp {f.grade})
                      </div>
                      <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                        {f.explanationVi}
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer tip */}
        <div className="mt-3 border-t border-slate-800 pt-2 flex items-center justify-between text-[11px] text-slate-500">
          <span>Gợi ý: Nhập ký hiệu (Fe, O, Cl) hoặc tên chất để tra cứu tức thì</span>
          <span className="hidden sm:inline">Nhấn ESC để đóng</span>
        </div>
      </div>
    </div>
  );
};
