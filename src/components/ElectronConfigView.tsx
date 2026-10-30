import React, { useState, useMemo } from 'react';
import { Layers, ArrowUp, ArrowDown, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { getElementByZ } from '../data/elements';
import { getElectronConfig, SubshellConfig } from '../utils/chemistry';

interface ElectronConfigViewProps {
  initialElementZ?: number;
}

export const ElectronConfigView: React.FC<ElectronConfigViewProps> = ({ initialElementZ = 26 }) => {
  const [z, setZ] = useState<number>(initialElementZ);
  const [ionCharge, setIonCharge] = useState<number>(0); // 0 = neutral, +1, +2, +3, -1, -2

  const element = getElementByZ(z);

  // Effective electron count for neutral atom or ion
  const effectiveElectrons = Math.max(1, Math.min(118, z - ionCharge));

  const neutralConfig = useMemo(() => {
    return getElectronConfig(z);
  }, [z]);

  // For ions, compute config adjusting valence removal (e.g., transition metals lose 4s before 3d!)
  const ionConfigDisplay = useMemo(() => {
    if (ionCharge === 0) return neutralConfig.orderedConfig;

    if (ionCharge > 0) {
      // Cation: remove electrons from outermost n first
      let toRemove = ionCharge;
      // Copy neutral subshells
      const subs = neutralConfig.subshells.map(s => ({ ...s }));
      // Sort by highest n, then highest l
      const removalOrder = [...subs].sort((a, b) => {
        if (b.n !== a.n) return b.n - a.n;
        return b.l - a.l;
      });

      for (const item of removalOrder) {
        if (toRemove <= 0) break;
        const removeCount = Math.min(item.electrons, toRemove);
        item.electrons -= removeCount;
        toRemove -= removeCount;
      }

      const activeSubs = subs.filter(s => s.electrons > 0);
      return activeSubs.map(s => `${s.name}<sup>${s.electrons}</sup>`).join(' ');
    } else {
      // Anion: simple addition
      const addedConfig = getElectronConfig(z - ionCharge);
      return addedConfig.orderedConfig;
    }
  }, [z, ionCharge, neutralConfig]);

  // Quantum numbers for the last electron in neutral atom
  const quantumNumbers = useMemo(() => {
    const lastSub = neutralConfig.subshells[neutralConfig.subshells.length - 1];
    if (!lastSub) return null;

    const n = lastSub.n;
    const l = lastSub.l;
    const lLetters = ['s', 'p', 'd', 'f'];
    const numOrbitals = lastSub.capacity / 2;
    const remElectrons = lastSub.electrons;

    // m_l ranges from -l to +l
    let orbitalIndex = 0;
    let isPairing = false;
    if (remElectrons <= numOrbitals) {
      orbitalIndex = remElectrons - 1;
      isPairing = false;
    } else {
      orbitalIndex = remElectrons - numOrbitals - 1;
      isPairing = true;
    }

    const ml = -l + orbitalIndex;
    const ms = isPairing ? '-½' : '+½';

    return {
      n,
      l,
      lLetter: lLetters[l],
      ml,
      ms,
      description: `Electron cuối cùng điền vào phân lớp ${lastSub.name} với số lượng tử n = ${n}, l = ${l} (${lLetters[l]}), mₗ = ${ml}, mₛ = ${ms}.`
    };
  }, [neutralConfig]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Layers className="h-7 w-7 text-indigo-400" />
            <span>Cấu Hình Electron &amp; Ô Lượng Tử Orbital</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Phân bố electron theo nguyên lí vững bền Aufbau, quy tắc Hund và nguyên lí loại trừ Pauli.
          </p>
        </div>

        {/* Input Z and Presets */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 p-1.5">
            <span className="text-xs text-slate-400 font-semibold pl-2">Số hiệu Z:</span>
            <input
              type="number"
              min={1}
              max={118}
              value={z}
              onChange={e => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val) && val >= 1 && val <= 118) {
                  setZ(val);
                  setIonCharge(0);
                }
              }}
              className="w-16 rounded-lg bg-slate-950 px-2 py-1 text-center font-mono text-sm font-bold text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1">
            {[1, 6, 7, 8, 11, 17, 24, 26, 29].map(presetZ => (
              <button
                key={presetZ}
                onClick={() => {
                  setZ(presetZ);
                  setIonCharge(0);
                }}
                className={`rounded-lg px-2 py-1 text-xs font-bold ${
                  z === presetZ
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {getElementByZ(presetZ).symbol}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Analysis Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Element Info & Ion Selector */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 font-black text-2xl text-indigo-300 border border-indigo-500/30">
                  {element.symbol}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>{element.nameVi}</span>
                    <span className="text-sm font-normal text-slate-400">({element.nameEn})</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Z = {z} · Chu kì {neutralConfig.period} · Nhóm {neutralConfig.group} · Khối {neutralConfig.block}
                  </p>
                </div>
              </div>

              {/* Ion Mode Selector */}
              <div className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 p-1">
                <span className="text-[11px] text-slate-400 font-semibold px-2">Trạng thái:</span>
                {[
                  { charge: 0, label: `${element.symbol}⁰ (Trung hòa)` },
                  { charge: 1, label: `${element.symbol}⁺` },
                  { charge: 2, label: `${element.symbol}²⁺` },
                  { charge: 3, label: `${element.symbol}³⁺` },
                  { charge: -1, label: `${element.symbol}⁻` },
                  { charge: -2, label: `${element.symbol}²⁻` }
                ].map(opt => (
                  <button
                    key={opt.charge}
                    onClick={() => setIonCharge(opt.charge)}
                    className={`rounded-lg px-2 py-1 text-xs font-semibold transition-all ${
                      ionCharge === opt.charge
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Electron Config Output Box */}
            <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span>Cấu hình electron hoàn chỉnh:</span>
                <span className="text-indigo-400 font-mono">
                  {ionCharge !== 0 ? `Ion ${element.symbol}${ionCharge > 0 ? `+${ionCharge}` : ionCharge}` : 'Nguyên tử trung hòa'}
                </span>
              </div>
              <div
                className="font-mono text-base font-bold text-cyan-300"
                dangerouslySetInnerHTML={{ __html: ionConfigDisplay }}
              />
              {ionCharge === 0 && (
                <div className="text-xs text-slate-400 pt-1">
                  Thu gọn theo khí hiếm: <span className="font-mono text-white font-semibold">{neutralConfig.nobleGasConfig}</span>
                </div>
              )}
            </div>
          </div>

          {/* Visual Orbital Boxes (Ô Lượng Tử) */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="h-4 w-4 text-cyan-400" />
                <span>Biểu diễn electron trên các ô lượng tử Orbital (Quy tắc Hund)</span>
              </h3>
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="inline-block h-2 w-2 rounded-full bg-cyan-400" /> Ghép đôi [↑↓]
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block h-2 w-2 rounded-full bg-indigo-400" /> Độc thân [↑ ]
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              {neutralConfig.subshells.map((sub, sIdx) => {
                return (
                  <div
                    key={sIdx}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-3"
                  >
                    <div className="w-16 font-mono text-xs font-bold text-indigo-400 shrink-0">
                      {sub.name} ({sub.electrons}e⁻)
                    </div>

                    {/* Orbital Boxes */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {sub.orbitals.map((state, oIdx) => (
                        <div
                          key={oIdx}
                          className={`flex h-12 w-12 items-center justify-center rounded-xl border font-mono text-lg font-bold transition-all ${
                            state === 'both'
                              ? 'border-cyan-500/50 bg-cyan-950/20 text-cyan-300 shadow-sm shadow-cyan-500/10'
                              : state === 'up'
                              ? 'border-indigo-500/50 bg-indigo-950/20 text-indigo-300'
                              : 'border-slate-800 bg-slate-900/40 text-slate-600'
                          }`}
                        >
                          {state === 'both' && (
                            <div className="flex items-center gap-0.5">
                              <ArrowUp className="h-4 w-4 text-cyan-400" />
                              <ArrowDown className="h-4 w-4 text-cyan-300" />
                            </div>
                          )}
                          {state === 'up' && (
                            <ArrowUp className="h-5 w-5 text-indigo-400" />
                          )}
                          {state === 'empty' && <span className="text-slate-700 text-xs">—</span>}
                        </div>
                      ))}
                    </div>

                    <div className="text-[11px] text-slate-400 ml-auto hidden sm:block">
                      {sub.orbitals.filter(s => s === 'up').length > 0
                        ? `${sub.orbitals.filter(s => s === 'up').length} e⁻ độc thân`
                        : sub.electrons === sub.capacity
                        ? 'Bão hòa'
                        : ''}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Side Panel: Quantum Numbers & Rules */}
        <div className="space-y-4">
          {/* Quantum numbers card */}
          {quantumNumbers && (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>Bộ 4 Số Lượng Tử (Electron chót)</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {quantumNumbers.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-slate-400 block text-[10px]">Số lượng tử chính (n):</span>
                  <span className="text-lg font-bold text-white">{quantumNumbers.n}</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-slate-400 block text-[10px]">Số lượng tử phụ (l):</span>
                  <span className="text-lg font-bold text-white">{quantumNumbers.l} ({quantumNumbers.lLetter})</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-slate-400 block text-[10px]">Từ tính (mₗ):</span>
                  <span className="text-lg font-bold text-white">{quantumNumbers.ml}</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-slate-400 block text-[10px]">Spin tự quay (mₛ):</span>
                  <span className="text-lg font-bold text-white">{quantumNumbers.ms}</span>
                </div>
              </div>
            </div>
          )}

          {/* Core Principles reminder */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 text-xs">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-cyan-400" />
              <span>Quy Tắc Điền Electron Cần Nhớ</span>
            </h3>

            <div className="space-y-2 text-slate-300">
              <div className="rounded-xl bg-slate-950/60 p-2.5 border border-slate-800">
                <div className="font-semibold text-cyan-300">1. Nguyên lí vững bền (Aufbau):</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p → 5s → 4d... Electron chiếm các orbital có mức năng lượng từ thấp đến cao.
                </div>
              </div>

              <div className="rounded-xl bg-slate-950/60 p-2.5 border border-slate-800">
                <div className="font-semibold text-indigo-300">2. Quy tắc Hund:</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Trong cùng một phân lớp, các electron phân bố sao cho số electron độc thân là cực đại và các electron này phải có spin cùng chiều (↑).
                </div>
              </div>

              <div className="rounded-xl bg-slate-950/60 p-2.5 border border-slate-800">
                <div className="font-semibold text-amber-300">3. Ngoại lệ Cr (Z=24) &amp; Cu (Z=29):</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Cr nhảy 1e từ 4s sang 3d để đạt trạng thái bán bão hòa bền [Ar] 3d⁵ 4s¹; Cu đạt bão hòa [Ar] 3d¹⁰ 4s¹.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
