import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Info,
  Layers,
  Atom,
  Flame,
  X,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import {
  ELEMENTS,
  ElementData,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  getElementByZ
} from '../data/elements';
import { getElectronConfig } from '../utils/chemistry';
import { NavTabId } from './Navbar';

interface PeriodicTableViewProps {
  initialElementZ?: number;
  onNavigateToTab?: (tab: NavTabId, contextData?: any) => void;
}

export const PeriodicTableView: React.FC<PeriodicTableViewProps> = ({
  initialElementZ,
  onNavigateToTab
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBlock, setSelectedBlock] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [activeElementZ, setActiveElementZ] = useState<number>(initialElementZ || 26); // Default Fe Z=26
  const [showModal, setShowModal] = useState<boolean>(!!initialElementZ);

  // Active element details
  const activeElement = useMemo(() => {
    return getElementByZ(activeElementZ);
  }, [activeElementZ]);

  // Computed electron config and shell counts for active element
  const activeConfig = useMemo(() => {
    try {
      return getElectronConfig(activeElementZ);
    } catch {
      return null;
    }
  }, [activeElementZ]);

  // Periodic grid coordinate mapper (Period 1-7, Group 1-18)
  const gridCells = useMemo(() => {
    const cells: { z: number; period: number; group: number }[] = [];

    for (let z = 1; z <= 118; z++) {
      const el = getElementByZ(z);
      // Lanthanides (57-71) placed in separate bottom row (period 8)
      if (z >= 57 && z <= 71) {
        cells.push({ z, period: 8, group: z - 57 + 3 });
      }
      // Actinides (89-103) placed in separate bottom row (period 9)
      else if (z >= 89 && z <= 103) {
        cells.push({ z, period: 9, group: z - 89 + 3 });
      } else {
        cells.push({ z, period: el.period, group: el.group });
      }
    }
    return cells;
  }, []);

  // Filter checker
  const isElementVisible = (z: number) => {
    const el = getElementByZ(z);

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      const matchSymbol = el.symbol.toLowerCase().includes(q);
      const matchNameVi = el.nameVi.toLowerCase().includes(q);
      const matchNameEn = el.nameEn.toLowerCase().includes(q);
      const matchZ = String(el.z) === q;
      if (!matchSymbol && !matchNameVi && !matchNameEn && !matchZ) return false;
    }

    if (selectedCategory !== 'all' && el.category !== selectedCategory) {
      return false;
    }

    if (selectedBlock !== 'all' && el.block !== selectedBlock) {
      return false;
    }

    if (selectedState !== 'all' && el.stateAt298K !== selectedState) {
      return false;
    }

    return true;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <span>Bảng Tuần Hoàn Các Nguyên Tố Hóa Học</span>
            <span className="rounded-full bg-cyan-500/15 px-2.5 py-0.5 text-xs font-bold text-cyan-400 border border-cyan-500/30">
              IUPAC 118
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Tra cứu cấu hình electron, chu kì, phân nhóm, bán kính, độ âm điện và xu hướng tuần hoàn.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm theo tên (Sắt, Fe), số Z (26)..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-2 pl-9 pr-4 text-xs text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
              aria-label="Xóa từ khóa tìm kiếm"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3" /> Nhóm:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`rounded-lg px-2.5 py-1 font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Tất cả (118)
          </button>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
            const isSelected = selectedCategory === key;
            const colors = CATEGORY_COLORS[key];
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(isSelected ? 'all' : key)}
                className={`rounded-lg px-2.5 py-1 transition-all border ${
                  isSelected
                    ? `${colors.bg} ${colors.text} ${colors.border} font-bold shadow-sm`
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {label.split('(')[0].trim()}
              </button>
            );
          })}
        </div>

        {/* Secondary filters: Block & State */}
        <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-semibold">Khối orbital:</span>
            {['all', 's', 'p', 'd', 'f'].map(b => (
              <button
                key={b}
                onClick={() => setSelectedBlock(b)}
                className={`rounded px-2 py-0.5 uppercase font-mono ${
                  selectedBlock === b
                    ? 'bg-slate-700 text-cyan-300 font-bold'
                    : 'bg-slate-900 text-slate-500 hover:text-slate-300'
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-semibold">Trạng thái:</span>
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'solid', label: 'Rắn' },
              { id: 'liquid', label: 'Lỏng' },
              { id: 'gas', label: 'Khí' }
            ].map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedState(s.id)}
                className={`rounded px-2 py-0.5 ${
                  selectedState === s.id
                    ? 'bg-slate-700 text-cyan-300 font-bold'
                    : 'bg-slate-900 text-slate-500 hover:text-slate-300'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Grid Container */}
      <div className="overflow-x-auto pb-6">
        <div
          className="grid gap-1 min-w-[980px]"
          style={{
            gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
            gridTemplateRows: 'repeat(9, minmax(0, auto))'
          }}
        >
          {/* Periodic Elements */}
          {gridCells.map(({ z, period, group }) => {
            const el = getElementByZ(z);
            const isVisible = isElementVisible(z);
            const isSelected = activeElementZ === z;
            const colors = CATEGORY_COLORS[el.category] || CATEGORY_COLORS['transition'];

            return (
              <button
                key={z}
                onClick={() => {
                  setActiveElementZ(z);
                  setShowModal(true);
                }}
                style={{
                  gridColumn: group,
                  gridRow: period
                }}
                className={`relative flex flex-col items-center justify-center rounded-lg border p-1 text-center transition-all ${
                  colors.bg
                } ${colors.border} ${
                  isSelected
                    ? 'ring-2 ring-cyan-400 scale-105 z-20 shadow-lg'
                    : 'hover:scale-105 hover:z-10'
                } ${!isVisible ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}
                aria-label={`Nguyên tố ${el.nameVi}, Z bằng ${el.z}`}
              >
                <div className="flex w-full items-center justify-between px-0.5 text-[9px] text-slate-400">
                  <span className="font-mono">{el.z}</span>
                  <span className="text-[8px] font-mono text-slate-500">
                    {Math.round(el.atomicMass)}
                  </span>
                </div>
                <div className={`text-base font-black tracking-tight ${colors.text}`}>
                  {el.symbol}
                </div>
                <div className="w-full truncate text-[9px] text-slate-300 font-medium leading-none">
                  {el.nameVi.split(' ')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Separator and labels for Lanthanides & Actinides */}
        <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-500">
          <span>* Họ Lantan (La – Lu: Z = 57 đến 71)</span>
          <span>** Họ Actini (Ac – Lr: Z = 89 đến 103)</span>
        </div>
      </div>

      {/* Element Detail Drawer / Modal */}
      {showModal && activeElement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
              aria-label="Đóng bảng chi tiết nguyên tố"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Element Header */}
            <div className="flex items-start gap-4">
              <div
                className={`flex h-20 w-20 flex-col items-center justify-center rounded-2xl border ${
                  CATEGORY_COLORS[activeElement.category]?.bg
                } ${CATEGORY_COLORS[activeElement.category]?.border}`}
              >
                <span className="text-xs font-mono text-slate-400">Z = {activeElement.z}</span>
                <span
                  className={`text-3xl font-black ${
                    CATEGORY_COLORS[activeElement.category]?.text
                  }`}
                >
                  {activeElement.symbol}
                </span>
                <span className="text-[10px] text-slate-400">
                  {activeElement.atomicMass.toFixed(3)}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>{activeElement.nameVi}</span>
                  <span className="text-sm font-normal text-slate-400">
                    ({activeElement.nameEn})
                  </span>
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs text-cyan-300 font-medium">
                    {activeElement.categoryVi}
                  </span>
                  <span className="text-xs text-slate-400">
                    Chu kì {activeElement.period} · Nhóm {activeElement.group} · Phân lớp {activeElement.block}
                  </span>
                  <span className="text-xs text-slate-400">
                    Trạng thái: {activeElement.stateVi}
                  </span>
                </div>
              </div>
            </div>

            {/* Bohr Shells Graphic */}
            <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-3">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Atom className="h-4 w-4" />
                  <span>Mô hình các lớp electron (Bohr):</span>
                </span>
                <span className="font-mono text-slate-300">
                  {activeConfig?.orderedConfig}
                </span>
              </div>

              <div className="flex items-center justify-around py-2">
                {activeConfig?.shellCounts.map((count, idx) => {
                  const shellNames = ['K (n=1)', 'L (n=2)', 'M (n=3)', 'N (n=4)', 'O (n=5)', 'P (n=6)', 'Q (n=7)'];
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10 text-sm font-bold text-cyan-300 border border-cyan-500/30">
                        {count}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 font-mono">
                        {shellNames[idx]?.split(' ')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Properties Matrix */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-2.5">
                <span className="text-slate-400 block text-[10px]">Độ âm điện:</span>
                <span className="text-sm font-bold text-white">
                  {activeElement.electronegativity ?? 'Không có'}
                </span>
              </div>
              <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-2.5">
                <span className="text-slate-400 block text-[10px]">Bán kính nguyên tử:</span>
                <span className="text-sm font-bold text-white">
                  {activeElement.radiusPm ? `${activeElement.radiusPm} pm` : '—'}
                </span>
              </div>
              <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-2.5">
                <span className="text-slate-400 block text-[10px]">Nhiệt độ nóng chảy:</span>
                <span className="text-sm font-bold text-white">
                  {activeElement.meltingPointC !== undefined ? `${activeElement.meltingPointC}°C` : '—'}
                </span>
              </div>
              <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-2.5">
                <span className="text-slate-400 block text-[10px]">Nhiệt độ sôi:</span>
                <span className="text-sm font-bold text-white">
                  {activeElement.boilingPointC !== undefined ? `${activeElement.boilingPointC}°C` : '—'}
                </span>
              </div>
            </div>

            {/* Summary & Applications */}
            <div className="mt-4 space-y-2 text-xs">
              <p className="text-slate-300 leading-relaxed">
                {activeElement.summaryVi}
              </p>
              {activeElement.applicationsVi?.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-slate-400 font-semibold">Ứng dụng:</span>
                  {activeElement.applicationsVi.map((app, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-slate-800 px-2 py-0.5 text-slate-300"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Quick jump buttons */}
            <div className="mt-5 flex flex-wrap items-center justify-end gap-2 border-t border-slate-800 pt-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  onNavigateToTab?.('atom', { elementZ: activeElement.z });
                }}
                className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white"
                aria-label="Xem nguyên tử 3D Bohr"
              >
                <Atom className="h-3.5 w-3.5 text-cyan-400" />
                <span>Xem mô hình 3D Bohr</span>
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  onNavigateToTab?.('config', { elementZ: activeElement.z });
                }}
                className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400"
                aria-label="Xem cấu hình ô orbital"
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Xem ô orbital &amp; Hund</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
