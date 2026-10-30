import React, { useState } from 'react';
import { Calculator, Delete, RotateCcw, Sparkles } from 'lucide-react';

export const CasioCalculatorView: React.FC = () => {
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('0');
  const [history, setHistory] = useState<{ expr: string; res: string }[]>([]);

  const handleAppend = (val: string) => {
    setExpression(prev => prev + val);
  };

  const handleClear = () => {
    setExpression('');
    setResult('0');
  };

  const handleDelete = () => {
    setExpression(prev => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    if (!expression.trim()) return;

    try {
      // Safe sanitized evaluation for math expression
      // Replace symbols
      const sanitized = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**');

      // Use Function constructor in isolated scope
      // eslint-disable-next-line no-new-func
      const evalResult = Function(`"use strict"; return (${sanitized})`)();

      const rounded = Math.round(Number(evalResult) * 100000) / 100000;
      setResult(String(rounded));
      setHistory(prev => [{ expr: expression, res: String(rounded) }, ...prev.slice(0, 9)]);
    } catch {
      setResult('Lỗi cú pháp');
    }
  };

  // Chemistry shortcuts
  const CHEM_SHORTCUTS = [
    { label: 'SO₄ (96)', val: '96' },
    { label: 'NO₃ (62)', val: '62' },
    { label: 'CO₃ (60)', val: '60' },
    { label: 'PO₄ (95)', val: '95' },
    { label: 'OH (17)', val: '17' },
    { label: 'H₂O (18)', val: '18' },
    { label: 'NH₄ (18)', val: '18' },
    { label: 'Fe (56)', val: '56' },
    { label: 'Cu (64)', val: '64' },
    { label: 'Al (27)', val: '27' },
    { label: 'Ag (108)', val: '108' },
    { label: 'Ba (137)', val: '137' },
    { label: 'Cl (35.5)', val: '35.5' },
    { label: 'R (0.082)', val: '0.082' },
    { label: 'F (96485)', val: '96485' },
    { label: 'V_chuẩn (24.79)', val: '24.79' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Calculator className="h-7 w-7 text-cyan-400" />
            <span>Máy Tính Khoa Học Hóa Học Casio FX</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Máy tính khoa học tích hợp sẵn phím tắt khối lượng mol các gốc axit, kim loại và hằng số Faraday, khí chuẩn.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Casio Body */}
        <div className="lg:col-span-2 mx-auto w-full max-w-xl rounded-3xl border-2 border-slate-700 bg-slate-900 p-6 shadow-2xl space-y-5">
          {/* Top Brand Stripe */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
            <span className="font-bold tracking-widest text-white">CASIO</span>
            <span className="text-cyan-400 font-bold">fx-580VN X · CHEM EDITION</span>
            <span className="text-[10px] text-amber-400">CLASSWIZ</span>
          </div>

          {/* LCD Screen */}
          <div className="rounded-2xl border-2 border-slate-800 bg-slate-950 p-4 shadow-inner space-y-2">
            <div className="h-6 overflow-x-auto text-right font-mono text-xs text-slate-400 scrollbar-none">
              {expression || ' '}
            </div>
            <div className="overflow-x-auto text-right font-mono text-3xl font-bold text-cyan-400 tracking-wide scrollbar-none">
              {result}
            </div>
          </div>

          {/* Chemistry Quick Shortcuts Panel */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
              Phím tắt Hóa học nhanh (Khối lượng mol &amp; Hằng số):
            </span>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
              {CHEM_SHORTCUTS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAppend(item.val)}
                  className="rounded-lg border border-cyan-500/30 bg-cyan-950/20 py-1.5 text-[10px] font-bold text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scientific Keypad */}
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 pt-2">
            {/* Row 1 */}
            <button
              onClick={() => handleAppend('(')}
              className="rounded-xl border border-slate-800 bg-slate-800/80 p-3 text-sm font-bold text-slate-300 hover:bg-slate-700"
            >
              (
            </button>
            <button
              onClick={() => handleAppend(')')}
              className="rounded-xl border border-slate-800 bg-slate-800/80 p-3 text-sm font-bold text-slate-300 hover:bg-slate-700"
            >
              )
            </button>
            <button
              onClick={() => handleAppend('^')}
              className="rounded-xl border border-slate-800 bg-slate-800/80 p-3 text-sm font-bold text-slate-300 hover:bg-slate-700"
            >
              xʸ
            </button>
            <button
              onClick={handleDelete}
              className="rounded-xl border border-red-500/30 bg-red-950/30 p-3 text-sm font-bold text-red-400 hover:bg-red-900/50 flex items-center justify-center"
            >
              <Delete className="h-4 w-4" />
            </button>
            <button
              onClick={handleClear}
              className="rounded-xl border border-rose-500 bg-rose-600 p-3 text-sm font-bold text-white hover:bg-rose-500"
            >
              AC
            </button>

            {/* Numbers & Operators */}
            {['7', '8', '9', '÷'].map((btn, i) => (
              <button
                key={i}
                onClick={() => handleAppend(btn)}
                className={`rounded-xl border p-3.5 text-base font-bold transition-all ${
                  btn === '÷'
                    ? 'border-indigo-500/40 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/50'
                    : 'border-slate-800 bg-slate-800/60 text-white hover:bg-slate-700'
                }`}
              >
                {btn}
              </button>
            ))}
            <button
              onClick={() => handleAppend('Math.sqrt(')}
              className="rounded-xl border border-slate-800 bg-slate-800/80 p-3 text-sm font-bold text-slate-300 hover:bg-slate-700"
            >
              √x
            </button>

            {['4', '5', '6', '×'].map((btn, i) => (
              <button
                key={i}
                onClick={() => handleAppend(btn)}
                className={`rounded-xl border p-3.5 text-base font-bold transition-all ${
                  btn === '×'
                    ? 'border-indigo-500/40 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/50'
                    : 'border-slate-800 bg-slate-800/60 text-white hover:bg-slate-700'
                }`}
              >
                {btn}
              </button>
            ))}
            <button
              onClick={() => handleAppend('Math.log10(')}
              className="rounded-xl border border-slate-800 bg-slate-800/80 p-3 text-xs font-bold text-slate-300 hover:bg-slate-700"
            >
              log (pH)
            </button>

            {['1', '2', '3', '-'].map((btn, i) => (
              <button
                key={i}
                onClick={() => handleAppend(btn)}
                className={`rounded-xl border p-3.5 text-base font-bold transition-all ${
                  btn === '-'
                    ? 'border-indigo-500/40 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/50'
                    : 'border-slate-800 bg-slate-800/60 text-white hover:bg-slate-700'
                }`}
              >
                {btn}
              </button>
            ))}
            <button
              onClick={() => handleAppend('*10**')}
              className="rounded-xl border border-slate-800 bg-slate-800/80 p-3 text-xs font-bold text-slate-300 hover:bg-slate-700"
            >
              ×10ˣ
            </button>

            {['0', '.', '%', '+'].map((btn, i) => (
              <button
                key={i}
                onClick={() => handleAppend(btn)}
                className={`rounded-xl border p-3.5 text-base font-bold transition-all ${
                  btn === '+'
                    ? 'border-indigo-500/40 bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/50'
                    : 'border-slate-800 bg-slate-800/60 text-white hover:bg-slate-700'
                }`}
              >
                {btn}
              </button>
            ))}
            <button
              onClick={handleCalculate}
              className="rounded-xl border border-cyan-400 bg-gradient-to-r from-cyan-500 to-blue-600 p-3.5 text-lg font-black text-slate-950 shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500"
            >
              =
            </button>
          </div>
        </div>

        {/* Calculation History Log */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-slate-400" />
                <span>Lịch sử tính toán</span>
              </h3>
              {history.length > 0 && (
                <button
                  onClick={() => setHistory([])}
                  className="text-xs text-rose-400 hover:text-rose-300"
                >
                  Xóa
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                Chưa có phép tính nào trong phiên làm việc này.
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {history.map((h, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setExpression(h.expr);
                      setResult(h.res);
                    }}
                    className="cursor-pointer rounded-xl border border-slate-800/80 bg-slate-950 p-2.5 text-right font-mono transition-colors hover:border-cyan-500/50"
                  >
                    <div className="text-[11px] text-slate-400">{h.expr}</div>
                    <div className="text-sm font-bold text-cyan-400">= {h.res}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
