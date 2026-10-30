import React, { useState, useEffect, useRef } from 'react';
import { Droplets, Calculator, Sparkles, RefreshCw, ArrowRight } from 'lucide-react';
import { calculateSolutionPH } from '../utils/chemistry';

export const SolutionTitrationView: React.FC = () => {
  // pH Calculator State
  const [solType, setSolType] = useState<'strong_acid' | 'strong_base' | 'weak_acid' | 'weak_base'>('strong_acid');
  const [concentration, setConcentration] = useState<number>(0.05); // M
  const [valence, setValence] = useState<number>(1); // e.g. 2 for H2SO4 or Ba(OH)2

  // Titration Simulator State: Titrating 25.0 mL of 0.1M HCl with 0.1M NaOH
  const [titrantVol, setTitrantVol] = useState<number>(15.0); // mL of NaOH added (0 to 50 mL)
  const [indicator, setIndicator] = useState<'phenolphthalein' | 'litmus' | 'methyl_orange'>('phenolphthalein');

  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const phResult = React.useMemo(() => {
    return calculateSolutionPH({
      type: solType,
      concentration,
      valence
    });
  }, [solType, concentration, valence]);

  // Compute live pH for the titration mixture
  // V_acid = 25 mL, C_acid = 0.1 M -> n_acid = 0.0025 mol
  // V_base = titrantVol mL, C_base = 0.1 M -> n_base = titrantVol * 0.0001 mol
  const titrationPoint = React.useMemo(() => {
    const vAcid = 25.0; // mL
    const cAcid = 0.1;  // M
    const cBase = 0.1;  // M
    const vBase = titrantVol; // mL
    const totalV = vAcid + vBase; // mL

    const nAcid = (vAcid / 1000) * cAcid;
    const nBase = (vBase / 1000) * cBase;

    let pH = 7.0;
    let status = 'Điểm tương đương (Trung hòa hoàn toàn)';

    if (Math.abs(nAcid - nBase) < 1e-6) {
      pH = 7.0;
      status = 'Đạt điểm tương đương chính xác: V(NaOH) = 25.0 mL, pH = 7.0';
    } else if (nAcid > nBase) {
      const remH = nAcid - nBase;
      const hConc = remH / (totalV / 1000);
      pH = -Math.log10(hConc);
      status = `Axit dư: pH = ${pH.toFixed(2)} (Môi trường axit)`;
    } else {
      const remOH = nBase - nAcid;
      const ohConc = remOH / (totalV / 1000);
      const pOH = -Math.log10(ohConc);
      pH = 14.0 - pOH;
      status = `Kiềm dư: pH = ${pH.toFixed(2)} (Môi trường bazơ kiềm)`;
    }

    pH = Math.max(1.0, Math.min(13.0, pH));

    // Indicator Color
    let beakerColor = '#f8fafc'; // transparent
    let indicatorDesc = '';

    if (indicator === 'phenolphthalein') {
      if (pH >= 8.3) {
        beakerColor = '#ec4899'; // vivid pink
        indicatorDesc = 'Màu hồng rực rỡ (pH ≥ 8.3)';
      } else {
        beakerColor = '#f8fafc'; // colorless
        indicatorDesc = 'Không màu (pH < 8.3)';
      }
    } else if (indicator === 'litmus') {
      if (pH < 6.0) {
        beakerColor = '#ef4444'; // red
        indicatorDesc = 'Màu đỏ (Môi trường axit)';
      } else if (pH > 8.0) {
        beakerColor = '#3b82f6'; // blue
        indicatorDesc = 'Màu xanh (Môi trường kiềm)';
      } else {
        beakerColor = '#a855f7'; // purple
        indicatorDesc = 'Màu tím (Trung tính)';
      }
    } else if (indicator === 'methyl_orange') {
      if (pH < 3.1) {
        beakerColor = '#dc2626'; // red
        indicatorDesc = 'Màu đỏ (pH < 3.1)';
      } else if (pH > 4.4) {
        beakerColor = '#eab308'; // yellow
        indicatorDesc = 'Màu vàng (pH > 4.4)';
      } else {
        beakerColor = '#f97316'; // orange
        indicatorDesc = 'Màu da cam (3.1 ≤ pH ≤ 4.4)';
      }
    }

    return { pH, status, beakerColor, indicatorDesc };
  }, [titrantVol, indicator]);

  // Draw titration curve on canvas
  useEffect(() => {
    const canvas = chartCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Dark chart background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    const padLeft = 45;
    const padBottom = 35;
    const padTop = 20;
    const padRight = 20;

    const plotW = width - padLeft - padRight;
    const plotH = height - padTop - padBottom;

    // Grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;

    // pH grid lines 0 to 14
    for (let p = 0; p <= 14; p += 2) {
      const y = padTop + plotH - (p / 14) * plotH;
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(width - padRight, y);
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '10px "JetBrains Mono"';
      ctx.textAlign = 'right';
      ctx.fillText(`${p}`, padLeft - 6, y + 3);
    }

    // Volume grid lines 0 to 50 mL
    for (let v = 0; v <= 50; v += 10) {
      const x = padLeft + (v / 50) * plotW;
      ctx.beginPath();
      ctx.moveTo(x, padTop);
      ctx.lineTo(x, padTop + plotH);
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '10px "JetBrains Mono"';
      ctx.textAlign = 'center';
      ctx.fillText(`${v} mL`, x, height - padBottom + 15);
    }

    // Neutral line pH = 7
    const neutralY = padTop + plotH - (7 / 14) * plotH;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padLeft, neutralY);
    ctx.lineTo(width - padRight, neutralY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Plot full titration curve
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    for (let v = 0; v <= 50; v += 0.5) {
      const vAcid = 25;
      const cAcid = 0.1;
      const cBase = 0.1;
      const totalV = vAcid + v;
      const nAcid = (vAcid / 1000) * cAcid;
      const nBase = (v / 1000) * cBase;

      let p = 7;
      if (Math.abs(nAcid - nBase) < 1e-6) {
        p = 7;
      } else if (nAcid > nBase) {
        const hConc = (nAcid - nBase) / (totalV / 1000);
        p = -Math.log10(hConc);
      } else {
        const ohConc = (nBase - nAcid) / (totalV / 1000);
        p = 14 + Math.log10(ohConc);
      }
      p = Math.max(1, Math.min(13, p));

      const cx = padLeft + (v / 50) * plotW;
      const cy = padTop + plotH - (p / 14) * plotH;

      if (v === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    }
    ctx.stroke();

    // Equivalence Point Marker (V=25, pH=7)
    const eqX = padLeft + (25 / 50) * plotW;
    const eqY = padTop + plotH - (7 / 14) * plotH;
    ctx.fillStyle = '#22c55e'; // green dot
    ctx.beginPath();
    ctx.arc(eqX, eqY, 5, 0, Math.PI * 2);
    ctx.fill();

    // Current Titrant Position Dot
    const curX = padLeft + (titrantVol / 50) * plotW;
    const curY = padTop + plotH - (titrationPoint.pH / 14) * plotH;

    ctx.fillStyle = '#ec4899'; // pink dot
    ctx.beginPath();
    ctx.arc(curX, curY, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(curX, curY, 7, 0, Math.PI * 2);
    ctx.stroke();
  }, [titrantVol, titrationPoint.pH]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Droplets className="h-7 w-7 text-rose-400" />
            <span>Dung Dịch, Nồng Độ pH &amp; Đường Cong Chuẩn Độ</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Máy tính pH cho axit/bazơ mạnh &amp; yếu và mô phỏng nhỏ giọt chuẩn độ buret vẽ đồ thị thời gian thực.
          </p>
        </div>
      </div>

      {/* Titration Simulator Interactive Section */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-rose-400" />
              <span>Mô Phỏng Chuẩn Độ Axit Mạnh (HCl 0.1M) bằng Bazơ Mạnh (NaOH 0.1M)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Thể tích ban đầu: 25.0 mL dung dịch HCl 0.1M. Thêm từng giọt dung dịch chuẩn NaOH 0.1M từ buret.
            </p>
          </div>

          {/* Indicator Selector */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 p-1 text-xs">
            <span className="text-slate-400 px-2 font-semibold">Chất chỉ thị:</span>
            {[
              { id: 'phenolphthalein', label: 'Phenolphthalein' },
              { id: 'litmus', label: 'Quỳ tím' },
              { id: 'methyl_orange', label: 'Metyl da cam' }
            ].map(ind => (
              <button
                key={ind.id}
                onClick={() => setIndicator(ind.id as any)}
                className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
                  indicator === ind.id ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                {ind.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Titration Chart */}
          <div className="lg:col-span-2 space-y-3">
            <canvas
              ref={chartCanvasRef}
              width={640}
              height={320}
              className="w-full h-auto rounded-2xl border border-slate-800 bg-slate-950 block shadow-inner"
            />

            {/* Slider Control */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">
                  Thể tích NaOH đã nhỏ từ Buret (V_NaOH):
                </span>
                <span className="font-mono text-base font-bold text-rose-400">
                  {titrantVol.toFixed(1)} mL
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="0.5"
                value={titrantVol}
                onChange={e => setTitrantVol(parseFloat(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0 mL (Bắt đầu)</span>
                <span className="text-emerald-400 font-bold">25 mL (Điểm tương đương pH = 7.0)</span>
                <span>50 mL (Dư kiềm)</span>
              </div>
            </div>
          </div>

          {/* Solution Beaker Preview & Status Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4 text-center">
            <div className="text-xs font-semibold text-slate-400">
              Dung dịch trong bình tam giác:
            </div>

            {/* Beaker with live color */}
            <div className="mx-auto flex h-36 w-28 flex-col justify-end overflow-hidden rounded-b-3xl border-2 border-white/60 bg-slate-900/60 shadow-xl relative">
              <div
                className="w-full rounded-b-2xl transition-colors duration-200"
                style={{
                  height: '75%',
                  backgroundColor: titrationPoint.beakerColor
                }}
              />
            </div>

            <div className="space-y-1">
              <div className="font-mono text-3xl font-black text-white">
                pH = {titrationPoint.pH.toFixed(2)}
              </div>
              <div className="text-xs font-semibold text-rose-300">
                {titrationPoint.indicatorDesc}
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                {titrationPoint.status}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Standalone pH Calculator */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Calculator className="h-5 w-5 text-cyan-400" />
          <span>Máy Tính Độ pH Dung Dịch Chuẩn</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Solution Type */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">
              Loại dung dịch:
            </label>
            <select
              value={solType}
              onChange={e => setSolType(e.target.value as any)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2 text-xs font-bold text-white focus:outline-none"
            >
              <option value="strong_acid">Axit mạnh (HCl, HNO₃, H₂SO₄)</option>
              <option value="strong_base">Bazơ mạnh (NaOH, KOH, Ba(OH)₂)</option>
              <option value="weak_acid">Axit yếu (CH₃COOH, Ka=1.75×10⁻⁵)</option>
              <option value="weak_base">Bazơ yếu (NH₃, Kb=1.8×10⁻⁵)</option>
            </select>
          </div>

          {/* Concentration */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">
              Nồng độ mol C (M):
            </label>
            <input
              type="number"
              step="0.01"
              min="0.0001"
              value={concentration}
              onChange={e => setConcentration(Math.max(0.00001, parseFloat(e.target.value) || 0))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2 text-xs font-bold text-cyan-300 focus:outline-none text-center"
            />
          </div>

          {/* Valence / Number of H+ or OH- */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">
              Hóa trị / Số nấc (H⁺ hoặc OH⁻):
            </label>
            <select
              value={valence}
              onChange={e => setValence(parseInt(e.target.value, 10))}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2 text-xs font-bold text-white focus:outline-none"
            >
              <option value={1}>1 nấc (HCl, HNO₃, NaOH, KOH)</option>
              <option value={2}>2 nấc (H₂SO₄, Ba(OH)₂, Ca(OH)₂)</option>
            </select>
          </div>
        </div>

        {/* Calculation Result */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 font-semibold">Chỉ số pH:</span>
              <div className="font-mono text-3xl font-black text-cyan-400">
                {phResult.pH}
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-semibold">Chỉ số pOH:</span>
              <div className="font-mono text-xl font-bold text-slate-300">
                {phResult.pOH}
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-semibold">[H⁺] (M):</span>
              <div className="font-mono text-sm font-bold text-rose-300">
                {phResult.hConcentration.toExponential(3)}
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-semibold">[OH⁻] (M):</span>
              <div className="font-mono text-sm font-bold text-blue-300">
                {phResult.ohConcentration.toExponential(3)}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-2 space-y-1 text-xs text-slate-400 font-mono">
            {phResult.steps.map((st, i) => (
              <div key={i}>• {st}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
