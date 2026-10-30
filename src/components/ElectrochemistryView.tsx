import React, { useState, useEffect, useRef } from 'react';
import { Zap, Play, Pause, Calculator, Search, ArrowRight, Sparkles } from 'lucide-react';
import { ELECTROCHEMICAL_SERIES } from '../data/knowledge';
import { calculateFaraday } from '../utils/chemistry';

export const ElectrochemistryView: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [filterQuery, setFilterQuery] = useState<string>('');

  // Faraday Calculator State
  const [currentI, setCurrentI] = useState<number>(2.5); // Amperes
  const [timeMins, setTimeMins] = useState<number>(32);  // Minutes
  const [selectedMetal, setSelectedMetal] = useState<string>('Cu');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const tickRef = useRef<number>(0);

  // Metal configurations for Faraday
  const METAL_CONFIGS: Record<string, { name: string; mass: number; electrons: number }> = {
    Cu: { name: 'Đồng (Cu²⁺/Cu)', mass: 63.55, electrons: 2 },
    Ag: { name: 'Bạc (Ag⁺/Ag)', mass: 107.87, electrons: 1 },
    Fe: { name: 'Sắt (Fe²⁺/Fe)', mass: 55.85, electrons: 2 },
    Al: { name: 'Nhôm (Al³⁺/Al)', mass: 26.98, electrons: 3 },
    Au: { name: 'Vàng (Au³⁺/Au)', mass: 196.97, electrons: 3 },
    Zn: { name: 'Kẽm (Zn²⁺/Zn)', mass: 65.38, electrons: 2 }
  };

  const faradayResult = React.useMemo(() => {
    const metal = METAL_CONFIGS[selectedMetal] || METAL_CONFIGS['Cu'];
    return calculateFaraday({
      atomicMass: metal.mass,
      currentAmps: currentI,
      timeSeconds: timeMins * 60,
      electrons: metal.electrons
    });
  }, [currentI, timeMins, selectedMetal]);

  // Galvanic cell Daniell animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      tickRef.current++;
      const t = tickRef.current;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Lab desk background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // Desk line
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 420, width, 120);

      // Left Beaker: Anode (Zn in ZnSO4 solution)
      const b1X = 100;
      const b1Y = 200;
      const bW = 180;
      const bH = 220;

      // Solution ZnSO4 (transparent / clear pale gray)
      ctx.fillStyle = 'rgba(148, 163, 184, 0.2)';
      ctx.fillRect(b1X + 4, b1Y + 40, bW - 8, bH - 44);

      // Glassware 1 outline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 3;
      ctx.strokeRect(b1X, b1Y, bW, bH);

      // Zn Electrode (Zinc metal plate)
      ctx.fillStyle = '#94a3b8'; // zinc gray
      ctx.fillRect(b1X + 60, b1Y - 40, 30, 220);
      ctx.strokeStyle = '#64748b';
      ctx.strokeRect(b1X + 60, b1Y - 40, 30, 220);

      // Right Beaker: Cathode (Cu in CuSO4 blue solution)
      const b2X = 440;
      const b2Y = 200;

      // Solution CuSO4 (vivid blue)
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(b2X + 4, b2Y + 40, bW - 8, bH - 44);

      // Glassware 2 outline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 3;
      ctx.strokeRect(b2X, b2Y, bW, bH);

      // Cu Electrode (Copper metal plate, reddish)
      ctx.fillStyle = '#b45309'; // copper reddish brown
      ctx.fillRect(b2X + 90, b2Y - 40, 30, 220);
      ctx.strokeStyle = '#78350f';
      ctx.strokeRect(b2X + 90, b2Y - 40, 30, 220);

      // Salt Bridge (Cầu muối U ngược)
      ctx.fillStyle = 'rgba(241, 245, 249, 0.85)';
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.8)';
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.rect(b1X + 130, b1Y + 30, 25, 140); // left tube leg
      ctx.rect(b2X + 25, b2Y + 30, 25, 140);  // right tube leg
      ctx.rect(b1X + 130, b1Y + 15, (b2X + 25) - (b1X + 130) + 25, 25); // bridge arch
      ctx.fill();
      ctx.stroke();

      // Salt bridge text
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Cầu muối (KCl)', (b1X + b2X + bW) / 2, b1Y + 32);

      // Wires and Voltmeter Connecting Zn and Cu
      const wireY = 80;
      ctx.strokeStyle = '#f59e0b'; // golden wire
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(b1X + 75, b1Y - 40);
      ctx.lineTo(b1X + 75, wireY);
      ctx.lineTo(b2X + 105, wireY);
      ctx.lineTo(b2X + 105, b2Y - 40);
      ctx.stroke();

      // Voltmeter Circle at center
      const vX = (b1X + 75 + b2X + 105) / 2;
      const vY = wireY;

      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(vX, vY, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Voltmeter Reading: +1.10 V
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('+1.10 V', vX, vY + 4);

      // Flowing Electron Animation dots (e- from Zn to Cu)
      if (isPlaying) {
        const numDots = 8;
        for (let i = 0; i < numDots; i++) {
          const progress = ((t * 2 + i * 80) % 500) / 500;
          let dotX = 0;
          let dotY = wireY;

          if (progress < 0.2) {
            // moving up from Zn
            dotX = b1X + 75;
            dotY = (b1Y - 40) - (progress / 0.2) * ((b1Y - 40) - wireY);
          } else if (progress < 0.8) {
            // moving horizontal through voltmeter
            const hProgress = (progress - 0.2) / 0.6;
            dotX = (b1X + 75) + hProgress * ((b2X + 105) - (b1X + 75));
            dotY = wireY;
          } else {
            // moving down to Cu
            const dProgress = (progress - 0.8) / 0.2;
            dotX = b2X + 105;
            dotY = wireY + dProgress * ((b2Y - 40) - wireY);
          }

          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Labels
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';

      // Anode label
      ctx.fillText('Anot (-) · Kẽm (Zn)', b1X + 75, b1Y + bH + 25);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px "JetBrains Mono"';
      ctx.fillText('Zn → Zn²⁺ + 2e⁻ (Oxi hóa)', b1X + 75, b1Y + bH + 42);

      // Cathode label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('Catot (+) · Đồng (Cu)', b2X + 105, b2Y + bH + 25);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '10px "JetBrains Mono"';
      ctx.fillText('Cu²⁺ + 2e⁻ → Cu (Khử)', b2X + 105, b2Y + bH + 42);

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  const filteredSeries = ELECTROCHEMICAL_SERIES.filter(
    item =>
      item.oxidant.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.reductant.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.groupVi.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Zap className="h-7 w-7 text-amber-400" />
            <span>Điện Hóa Học, Pin Điện &amp; Điện Phân</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Mô phỏng Pin điện Daniell Zn-Cu, dòng dịch chuyển electron, dãy thế điện cực chuẩn E° và định luật điện phân Faraday.
          </p>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 px-4 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/30"
          aria-label={isPlaying ? 'Tạm dừng mô phỏng pin' : 'Chạy mô phỏng pin'}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          <span>{isPlaying ? 'Tạm dừng pin' : 'Tiếp tục phóng điện'}</span>
        </button>
      </div>

      {/* Main Galvanic Pin Simulation Canvas */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950 p-2 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
          width={720}
          height={480}
          className="w-full h-auto rounded-2xl block"
        />

        <div className="w-full border-t border-slate-800 bg-slate-900/80 p-4 rounded-b-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Suất điện động pin:</span>
            <span className="font-mono font-bold text-amber-300">
              E°pin = E°(Cu²⁺/Cu) - E°(Zn²⁺/Zn) = (+0.34 V) - (-0.76 V) = +1.10 V
            </span>
          </div>
          <div className="text-slate-400">
            Dòng electron truyền từ cực âm (Anot Zn) sang cực dương (Catot Cu) qua dây dẫn ngoài.
          </div>
        </div>
      </div>

      {/* Two Columns: Faraday Calculator & Electrochemical Series */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Faraday Calculator */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calculator className="h-5 w-5 text-amber-400" />
              <span>Máy Tính Điện Phân Faraday (m = AIt / nF)</span>
            </h2>
            <span className="rounded-lg bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/30">
              F = 96485 C/mol
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Metal picker */}
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">
                Kim loại điện phân:
              </label>
              <select
                value={selectedMetal}
                onChange={e => setSelectedMetal(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2 text-xs font-bold text-white focus:outline-none"
              >
                {Object.entries(METAL_CONFIGS).map(([sym, cfg]) => (
                  <option key={sym} value={sym}>
                    {cfg.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Current */}
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">
                Cường độ I (Ampe):
              </label>
              <input
                type="number"
                step="0.5"
                min="0.1"
                value={currentI}
                onChange={e => setCurrentI(Math.max(0.1, parseFloat(e.target.value) || 0))}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2 text-xs font-bold text-amber-300 focus:outline-none text-center"
              />
            </div>

            {/* Time in mins */}
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">
                Thời gian t (phút):
              </label>
              <input
                type="number"
                step="1"
                min="1"
                value={timeMins}
                onChange={e => setTimeMins(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2 text-xs font-bold text-amber-300 focus:outline-none text-center"
              />
            </div>
          </div>

          {/* Result Calculation Output */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-semibold">Khối lượng kim loại bám ở catot (m):</span>
              <span className="font-mono text-2xl font-black text-amber-400">
                {faradayResult.massGrams} <span className="text-sm font-normal text-slate-400">gam</span>
              </span>
            </div>

            <div className="border-t border-slate-800 pt-2 space-y-1 font-mono text-xs text-slate-300">
              {faradayResult.steps.map((st, i) => (
                <div key={i} className="text-[11px] text-slate-400">
                  • {st}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Standard Electrode Potentials Table (Dãy thế điện cực chuẩn E°) */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-cyan-400" />
              <span>Dãy Thế Điện Cực Chuẩn (E° ở 25°C)</span>
            </h2>

            <div className="relative w-40">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={filterQuery}
                onChange={e => setFilterQuery(e.target.value)}
                placeholder="Tìm cặp oxi hóa..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-1 pl-8 pr-2 text-xs text-white placeholder:text-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="max-h-72 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950/80">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-400 sticky top-0">
                <tr>
                  <th className="p-2.5">Cặp Oxi hóa / Khử</th>
                  <th className="p-2.5">Bán phản ứng</th>
                  <th className="p-2.5 text-right font-mono">E° (Volt)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredSeries.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40">
                    <td className="p-2.5 font-bold text-white">
                      {item.oxidant} / {item.reductant}
                    </td>
                    <td className="p-2.5 text-slate-400 text-[11px]">{item.halfReaction}</td>
                    <td
                      className={`p-2.5 text-right font-bold ${
                        item.eStandardV > 0 ? 'text-amber-400' : 'text-cyan-400'
                      }`}
                    >
                      {item.eStandardV > 0 ? `+${item.eStandardV.toFixed(3)}` : item.eStandardV.toFixed(3)} V
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-[11px] text-slate-400">
            Quy tắc Alpha (α): Chất oxi hóa mạnh hơn phản ứng với chất khử mạnh hơn để sinh chất oxi hóa yếu hơn và chất khử yếu hơn.
          </div>
        </div>
      </div>
    </div>
  );
};
