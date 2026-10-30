import React, { useState } from 'react';
import { FlaskConical, Search, Info, X, Check, AlertCircle } from 'lucide-react';
import { CATIONS, ANIONS, SOLUBILITY_MATRIX, SolubilityCell } from '../data/solubility';

export const IonicReactionView: React.FC = () => {
  const [filterCation, setFilterCation] = useState<string>('all');
  const [filterAnion, setFilterAnion] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [selectedCell, setSelectedCell] = useState<{
    cation: typeof CATIONS[0];
    anion: typeof ANIONS[0];
    data: SolubilityCell;
  } | null>(null);

  // Status badge styles
  const getStatusBadge = (cell: SolubilityCell) => {
    switch (cell.status) {
      case 'T':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'K':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold';
      case 'I':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case '-':
        return 'bg-slate-800 text-slate-500 border-slate-700';
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <FlaskConical className="h-7 w-7 text-teal-400" />
            <span>Bảng Tính Tan &amp; Phản Ứng Trao Đổi Ion Trong Dung Dịch</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Tra cứu khả năng hòa tan của muối và hiđroxit, màu sắc kết tủa và điều kiện xảy ra phản ứng trao đổi ion.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="flex items-center gap-1 rounded-lg bg-emerald-500/15 px-2.5 py-1 text-emerald-300 border border-emerald-500/30 font-bold">
            T: Tan tốt
          </span>
          <span className="flex items-center gap-1 rounded-lg bg-rose-500/20 px-2.5 py-1 text-rose-300 border border-rose-500/40 font-bold">
            K: Không tan (Kết tủa)
          </span>
          <span className="flex items-center gap-1 rounded-lg bg-amber-500/15 px-2.5 py-1 text-amber-300 border border-amber-500/30 font-bold">
            I: Ít tan
          </span>
          <span className="flex items-center gap-1 rounded-lg bg-slate-800 px-2.5 py-1 text-slate-400 border border-slate-700 font-bold">
            —: Bị phân hủy
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 font-semibold">Lọc Cation:</span>
          <select
            value={filterCation}
            onChange={e => setFilterCation(e.target.value)}
            className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 font-semibold text-white focus:outline-none"
          >
            <option value="all">Tất cả Cation</option>
            {CATIONS.map(c => (
              <option key={c.id} value={c.id}>
                {c.formula} ({c.name})
              </option>
            ))}
          </select>

          <span className="text-slate-400 font-semibold ml-2">Lọc Anion:</span>
          <select
            value={filterAnion}
            onChange={e => setFilterAnion(e.target.value)}
            className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 font-semibold text-white focus:outline-none"
          >
            <option value="all">Tất cả Anion</option>
            {ANIONS.map(a => (
              <option key={a.id} value={a.id}>
                {a.formula} ({a.name})
              </option>
            ))}
          </select>
        </div>

        <div className="text-slate-500 text-[11px]">
          Bấm vào ô bất kì để xem chi tiết màu sắc kết tủa và phương trình ion
        </div>
      </div>

      {/* Interactive Solubility Table */}
      <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950/80 shadow-2xl">
        <table className="w-full border-collapse text-center text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-300">
              <th className="p-3 sticky left-0 z-20 bg-slate-900 font-bold text-teal-400 border-r border-slate-800 text-left">
                Cation \ Anion
              </th>
              {ANIONS.filter(a => filterAnion === 'all' || a.id === filterAnion).map(anion => (
                <th key={anion.id} className="p-2.5 font-bold font-mono text-cyan-300 border-r border-slate-800/80">
                  <div>{anion.formula}</div>
                  <div className="text-[10px] text-slate-400 font-normal">{anion.name}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {CATIONS.filter(c => filterCation === 'all' || c.id === filterCation).map(cation => (
              <tr key={cation.id} className="hover:bg-slate-900/40 transition-colors">
                <td className="p-3 sticky left-0 z-10 bg-slate-950 font-bold font-mono text-teal-300 border-r border-slate-800 text-left">
                  <span>{cation.formula}</span>
                  <span className="text-[10px] text-slate-400 block font-normal">{cation.name}</span>
                </td>

                {ANIONS.filter(a => filterAnion === 'all' || a.id === filterAnion).map(anion => {
                  const cell = SOLUBILITY_MATRIX[cation.id]?.[anion.id] || { status: 'T', label: 'Tan' };

                  return (
                    <td
                      key={anion.id}
                      onClick={() => setSelectedCell({ cation, anion, data: cell })}
                      className="p-1 border-r border-slate-800/60 cursor-pointer"
                    >
                      <div
                        className={`mx-auto flex h-9 w-9 items-center justify-center rounded-xl border text-xs font-bold transition-transform hover:scale-110 ${getStatusBadge(
                          cell
                        )}`}
                      >
                        {/* If precipitate has visual color preview */}
                        {cell.hexBg && cell.status === 'K' && (
                          <span
                            className="inline-block h-2 w-2 rounded-full mr-1 border border-black/40 shadow-xs"
                            style={{ backgroundColor: cell.hexBg }}
                          />
                        )}
                        <span>{cell.status}</span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal for Selected Cell */}
      {selectedCell && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl space-y-4">
            <button
              onClick={() => setSelectedCell(null)}
              className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
              aria-label="Đóng chi tiết hợp chất"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl border text-lg font-black ${getStatusBadge(
                  selectedCell.data
                )}`}
              >
                {selectedCell.data.status}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {selectedCell.cation.formula} + {selectedCell.anion.formula}
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedCell.cation.name} {selectedCell.anion.name}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Trạng thái:</span>
                <span className="font-bold text-white">{selectedCell.data.label}</span>
              </div>

              {selectedCell.data.color && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Màu sắc kết tủa:</span>
                  <span className="flex items-center gap-1.5 font-bold text-white">
                    {selectedCell.data.hexBg && (
                      <span
                        className="inline-block h-3 w-3 rounded-full border border-slate-700"
                        style={{ backgroundColor: selectedCell.data.hexBg }}
                      />
                    )}
                    {selectedCell.data.color}
                  </span>
                </div>
              )}

              {selectedCell.data.notes && (
                <div className="border-t border-slate-800 pt-2 text-slate-300 text-xs">
                  <span className="text-slate-400 font-semibold block mb-0.5">Lưu ý hóa học:</span>
                  {selectedCell.data.notes}
                </div>
              )}
            </div>

            <div className="text-[11px] text-slate-500">
              Điều kiện xảy ra phản ứng trao đổi ion: sản phẩm phải có chất kết tủa, chất khí hoặc chất điện li rất yếu (như H₂O).
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
