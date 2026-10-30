import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, Sparkles, Check, RefreshCw, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRESET_REACTIONS, ChemicalReaction } from '../data/reactions';
import { calculateMolarMass } from '../utils/chemistry';

interface EquationCalculatorViewProps {
  initialReactionId?: string;
}

export const EquationCalculatorView: React.FC<EquationCalculatorViewProps> = ({ initialReactionId }) => {
  const [selectedReactionId, setSelectedReactionId] = useState<string>(
    initialReactionId || PRESET_REACTIONS[0].id
  );
  
  // Custom formula molar mass calculator state
  const [customFormula, setCustomFormula] = useState<string>('Al2(SO4)3');
  const [molarMassResult, setMolarMassResult] = useState<ReturnType<typeof calculateMolarMass> | null>(null);

  // Stoichiometry calculation state for the active reaction
  const [inputMoles, setInputMoles] = useState<number>(1);
  const [standardGasCondition, setStandardGasCondition] = useState<'standard_2479' | 'old_224'>('standard_2479');

  const reaction = PRESET_REACTIONS.find(r => r.id === selectedReactionId) || PRESET_REACTIONS[0];

  // Auto calculate custom formula on change
  useEffect(() => {
    if (customFormula.trim()) {
      const res = calculateMolarMass(customFormula);
      setMolarMassResult(res);
    }
  }, [customFormula]);

  const molarVolume = standardGasCondition === 'standard_2479' ? 24.79 : 22.4;

  // Compute table of amounts based on input moles for the primary reactant
  const stoichiometryTable = useMemo(() => {
    const baseCoeff = reaction.coefficients.reactants[0].coeff;
    const factor = inputMoles / baseCoeff;

    const reactants = reaction.coefficients.reactants.map(item => {
      const moles = item.coeff * factor;
      const mm = calculateMolarMass(item.formula);
      const mass = mm.molarMass > 0 ? moles * mm.molarMass : 0;
      return {
        formula: item.formula,
        coeff: item.coeff,
        moles: Math.round(moles * 1000) / 1000,
        molarMass: mm.molarMass,
        massGrams: Math.round(mass * 100) / 100,
        gasVolumeLiters: Math.round(moles * molarVolume * 100) / 100
      };
    });

    const products = reaction.coefficients.products.map(item => {
      const moles = item.coeff * factor;
      const mm = calculateMolarMass(item.formula);
      const mass = mm.molarMass > 0 ? moles * mm.molarMass : 0;
      return {
        formula: item.formula,
        coeff: item.coeff,
        moles: Math.round(moles * 1000) / 1000,
        molarMass: mm.molarMass,
        massGrams: Math.round(mass * 100) / 100,
        gasVolumeLiters: Math.round(moles * molarVolume * 100) / 100
      };
    });

    return { reactants, products };
  }, [reaction, inputMoles, molarVolume]);

  const handleCelebrate = () => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Calculator className="h-7 w-7 text-sky-400" />
            <span>Phương Trình Hóa Học &amp; Tính Toán Theo PTHH</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Cân bằng phản ứng, tính toán theo số mol, khối lượng m (gam), thể tích khí chuẩn 24.79 L (25°C, 1 bar) và nồng độ mol.
          </p>
        </div>

        {/* Reaction selector dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={selectedReactionId}
            onChange={e => setSelectedReactionId(e.target.value)}
            className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-white focus:border-sky-500 focus:outline-none"
          >
            {PRESET_REACTIONS.map(r => (
              <option key={r.id} value={r.id}>
                {r.balancedEquation}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Reaction Card */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-6 shadow-2xl backdrop-blur-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-sky-500/15 px-2.5 py-1 text-xs font-bold text-sky-400 border border-sky-500/30">
              {reaction.typeVi}
            </span>
            <span className="text-xs text-slate-400">Lớp {reaction.grade}</span>
          </div>

          <button
            onClick={handleCelebrate}
            className="flex items-center gap-1.5 rounded-xl bg-sky-500/20 border border-sky-500/40 px-3 py-1.5 text-xs font-bold text-sky-300 hover:bg-sky-500/30 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Đã cân bằng chính xác</span>
          </button>
        </div>

        {/* Big Balanced Equation Display */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-center">
          <div className="font-mono text-xl sm:text-2xl font-black text-white tracking-wide">
            {reaction.balancedEquation}
          </div>
          {reaction.conditionsVi && (
            <div className="mt-2 text-xs text-amber-400 font-medium">
              Điều kiện phản ứng: {reaction.conditionsVi}
            </div>
          )}
          {reaction.netIonicEquation && (
            <div className="mt-2 text-xs text-cyan-300 font-mono">
              Phương trình ion rút gọn: {reaction.netIonicEquation}
            </div>
          )}
        </div>

        {/* Stoichiometry Input & Calculation */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-300">
                Nhập số mol chất ban đầu ({reaction.coefficients.reactants[0].formula}):
              </span>
              <input
                type="number"
                step="0.1"
                min="0.01"
                value={inputMoles}
                onChange={e => setInputMoles(Math.max(0.001, parseFloat(e.target.value) || 0))}
                className="w-24 rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 font-mono text-sm font-bold text-cyan-300 focus:border-sky-500 focus:outline-none text-center"
              />
              <span className="text-xs text-slate-400 font-mono">mol</span>
            </div>

            {/* Gas condition radio */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-semibold">Điều kiện khí:</span>
              <button
                onClick={() => setStandardGasCondition('standard_2479')}
                className={`rounded-lg px-2.5 py-1 font-semibold ${
                  standardGasCondition === 'standard_2479'
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                24.79 L/mol (25°C, 1 bar - SGK mới)
              </button>
              <button
                onClick={() => setStandardGasCondition('old_224')}
                className={`rounded-lg px-2.5 py-1 font-semibold ${
                  standardGasCondition === 'old_224'
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                22.4 L/mol (ĐKTC cũ)
              </button>
            </div>
          </div>

          {/* Stoichiometry Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/60">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-semibold">
                <tr>
                  <th className="p-3">Vai trò</th>
                  <th className="p-3">Chất</th>
                  <th className="p-3">Hệ số</th>
                  <th className="p-3">Khối lượng mol M (g/mol)</th>
                  <th className="p-3 text-cyan-400">Số mol n (mol)</th>
                  <th className="p-3 text-sky-400">Khối lượng m (gam)</th>
                  <th className="p-3 text-amber-400">Thể tích khí V (lít)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {stoichiometryTable.reactants.map((item, idx) => (
                  <tr key={`r-${idx}`} className="hover:bg-slate-900/40">
                    <td className="p-3 text-emerald-400 font-sans font-semibold">Chất phản ứng</td>
                    <td className="p-3 font-bold text-white text-sm">{item.formula}</td>
                    <td className="p-3 text-slate-400">{item.coeff}</td>
                    <td className="p-3 text-slate-300">{item.molarMass || '—'}</td>
                    <td className="p-3 font-bold text-cyan-300">{item.moles}</td>
                    <td className="p-3 font-bold text-sky-300">{item.massGrams} g</td>
                    <td className="p-3 text-amber-300">{item.gasVolumeLiters} L</td>
                  </tr>
                ))}
                {stoichiometryTable.products.map((item, idx) => (
                  <tr key={`p-${idx}`} className="hover:bg-slate-900/40 bg-slate-900/20">
                    <td className="p-3 text-indigo-400 font-sans font-semibold">Sản phẩm</td>
                    <td className="p-3 font-bold text-white text-sm">{item.formula}</td>
                    <td className="p-3 text-slate-400">{item.coeff}</td>
                    <td className="p-3 text-slate-300">{item.molarMass || '—'}</td>
                    <td className="p-3 font-bold text-cyan-300">{item.moles}</td>
                    <td className="p-3 font-bold text-sky-300">{item.massGrams} g</td>
                    <td className="p-3 text-amber-300">{item.gasVolumeLiters} L</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Custom Formula Molar Mass Calculator */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-cyan-400" />
              <span>Máy Tính Khối Lượng Mol Phân Tử (Molar Mass)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Nhập công thức hóa học bất kì có dấu ngoặc hoặc muối ngậm nước (ví dụ: Ca(OH)2, Al2(SO4)3, CuSO4.5H2O, Fe2(SO4)3)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customFormula}
              onChange={e => setCustomFormula(e.target.value)}
              placeholder="Nhập công thức (CuSO4.5H2O)..."
              className="rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 font-mono text-sm font-bold text-cyan-300 focus:border-cyan-500 focus:outline-none w-48"
            />
          </div>
        </div>

        {/* Result Breakdown */}
        {molarMassResult && !molarMassResult.error && (
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-semibold">Khối lượng mol M:</span>
              <span className="font-mono text-2xl font-black text-cyan-400">
                {molarMassResult.molarMass} <span className="text-sm font-normal text-slate-400">g/mol</span>
              </span>
            </div>

            {/* Element Percentage Composition */}
            <div className="border-t border-slate-800/80 pt-3">
              <span className="text-xs text-slate-400 block mb-2 font-semibold">Thành phần phần trăm khối lượng (%):</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(molarMassResult.elements).map(([el, count]) => {
                  const elWeight = (count * (calculateMolarMass(el).molarMass)) / molarMassResult.molarMass * 100;
                  return (
                    <div key={el} className="rounded-xl border border-slate-800 bg-slate-900/60 p-2.5 text-xs">
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-white">{el} (×{count})</span>
                        <span className="text-cyan-400 font-mono">{elWeight.toFixed(2)}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-800 mt-1.5 overflow-hidden">
                        <div
                          className="h-full bg-cyan-500 rounded-full"
                          style={{ width: `${Math.min(100, elWeight)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {molarMassResult?.error && (
          <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-950/20 p-3 text-xs text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{molarMassResult.error}</span>
          </div>
        )}
      </div>
    </div>
  );
};
