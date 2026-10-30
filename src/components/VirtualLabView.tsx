import React, { useState, useEffect, useRef } from 'react';
import { TestTube2, Flame, RotateCw, Play, Sparkles, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { EXPERIMENTS, MIXING_REAGENTS, evaluateReagentMix, ExperimentData } from '../data/experiments';

interface VirtualLabViewProps {
  initialExperimentId?: string;
}

export const VirtualLabView: React.FC<VirtualLabViewProps> = ({ initialExperimentId }) => {
  const [labMode, setLabMode] = useState<'preset' | 'sandbox'>('preset');

  // Preset experiment state
  const [activeExpId, setActiveExpId] = useState<string>(
    initialExperimentId || EXPERIMENTS[0].id
  );
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isHeating, setIsHeating] = useState<boolean>(false);

  // Sandbox mode state
  const [reagent1, setReagent1] = useState<string>('cuso4');
  const [reagent2, setReagent2] = useState<string>('naoh');
  const [sandboxResult, setSandboxResult] = useState<ReturnType<typeof evaluateReagentMix> | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const bubbleListRef = useRef<{ x: number; y: number; speed: number; size: number }[]>([]);

  const experiment = EXPERIMENTS.find(e => e.id === activeExpId) || EXPERIMENTS[0];
  const step = experiment.steps[currentStepIdx] || experiment.steps[0];

  // Initialize bubbles
  useEffect(() => {
    bubbleListRef.current = Array.from({ length: 25 }, () => ({
      x: 200 + Math.random() * 120,
      y: 350 + Math.random() * 80,
      speed: 1.5 + Math.random() * 2,
      size: 2 + Math.random() * 4
    }));
  }, [activeExpId, currentStepIdx, sandboxResult]);

  // Canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let tick = 0;

    const render = () => {
      tick++;
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;

      ctx.clearRect(0, 0, width, height);

      // Background lab table
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // Lab wooden desk surface
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 420, width, 120);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 415, width, 5);

      // Determine active rendering state
      let liquidColor = step.solutionColor;
      let hasGas = step.hasGas;
      let hasPpt = step.hasPrecipitate;
      let pptColor = step.precipitateColor || '#ffffff';
      let flameCol = step.flameColor;

      if (labMode === 'sandbox' && sandboxResult) {
        liquidColor = sandboxResult.colorHex;
        hasGas = !!sandboxResult.gas;
        hasPpt = !!sandboxResult.precipitate;
        pptColor = sandboxResult.precipitate?.hex || '#ffffff';
      }

      // Draw Bunsen Burner flame if heating or flame test
      if (flameCol || isHeating || step.isHeating) {
        const fColor = flameCol || '#f97316';
        // Burner stand
        ctx.fillStyle = '#475569';
        ctx.fillRect(cx - 25, 430, 50, 40);
        ctx.fillStyle = '#334155';
        ctx.fillRect(cx - 35, 470, 70, 15);

        // Flame glow
        const fGlow = ctx.createRadialGradient(cx, 400, 5, cx, 390, 45);
        fGlow.addColorStop(0, '#ffffff');
        fGlow.addColorStop(0.4, fColor);
        fGlow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = fGlow;
        ctx.beginPath();
        const flicker = Math.sin(tick * 0.2) * 5;
        ctx.ellipse(cx, 395 + flicker * 0.2, 22 + flicker * 0.5, 40 + flicker, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Glassware (Beaker or Test Tube)
      if (experiment.apparatus === 'test_tube' || labMode === 'sandbox') {
        // Test Tube
        const tubeX = cx - 35;
        const tubeY = 140;
        const tubeW = 70;
        const tubeH = 260;
        const radius = 35;

        // Solution inside tube
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tubeX, tubeY);
        ctx.lineTo(tubeX, tubeY + tubeH - radius);
        ctx.arc(tubeX + radius, tubeY + tubeH - radius, radius, Math.PI, 0, true);
        ctx.lineTo(tubeX + tubeW, tubeY);
        ctx.closePath();
        ctx.clip();

        // Liquid filling
        const liquidTop = tubeY + 80;
        const liquidHeight = tubeH - 80;

        ctx.fillStyle = liquidColor;
        ctx.fillRect(tubeX, liquidTop, tubeW, liquidHeight);

        // Meniscus curved surface
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.ellipse(tubeX + tubeW / 2, liquidTop, tubeW / 2, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Precipitate layer at bottom
        if (hasPpt) {
          ctx.fillStyle = pptColor;
          ctx.beginPath();
          ctx.arc(tubeX + radius, tubeY + tubeH - radius, radius - 2, 0, Math.PI);
          ctx.fill();

          // Flakes settling
          for (let f = 0; f < 10; f++) {
            const fx = tubeX + 15 + Math.sin(tick * 0.05 + f) * 20 + f * 4;
            const fy = tubeY + tubeH - 40 + (Math.cos(tick * 0.08 + f) * 15);
            ctx.fillStyle = pptColor;
            ctx.fillRect(fx, fy, 4, 4);
          }
        }

        // Bubbling Gas Animation
        if (hasGas) {
          bubbleListRef.current.forEach(b => {
            b.y -= b.speed;
            if (b.y < liquidTop) {
              b.y = tubeY + tubeH - 20;
              b.x = tubeX + 10 + Math.random() * (tubeW - 20);
            }
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
            ctx.fill();
          });
        }

        ctx.restore();

        // Glass outline & reflections
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(tubeX, tubeY);
        ctx.lineTo(tubeX, tubeY + tubeH - radius);
        ctx.arc(tubeX + radius, tubeY + tubeH - radius, radius, Math.PI, 0, true);
        ctx.lineTo(tubeX + tubeW, tubeY);
        ctx.stroke();

        // Rim
        ctx.beginPath();
        ctx.ellipse(tubeX + tubeW / 2, tubeY, tubeW / 2 + 4, 6, 0, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // Beaker
        const bX = cx - 70;
        const bY = 220;
        const bW = 140;
        const bH = 190;

        // Solution
        const liquidTop = bY + 50;
        const liquidH = bH - 50;

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(bX, bY, bW, bH, [0, 0, 16, 16]);
        ctx.clip();

        ctx.fillStyle = liquidColor;
        ctx.fillRect(bX, liquidTop, bW, liquidH);

        // Meniscus
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.ellipse(bX + bW / 2, liquidTop, bW / 2 - 2, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        // Precipitate
        if (hasPpt) {
          ctx.fillStyle = pptColor;
          ctx.fillRect(bX + 10, bY + bH - 25, bW - 20, 20);
        }

        // Gas Bubbles
        if (hasGas) {
          bubbleListRef.current.forEach(b => {
            b.y -= b.speed;
            if (b.y < liquidTop) {
              b.y = bY + bH - 20;
              b.x = bX + 15 + Math.random() * (bW - 30);
            }
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
            ctx.fill();
          });
        }

        ctx.restore();

        // Glass Outline
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 3;
        ctx.strokeRect(bX, bY, bW, bH);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [step, isHeating, labMode, sandboxResult, experiment.apparatus]);

  const handleNextStep = () => {
    if (currentStepIdx < experiment.steps.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    }
  };

  const handleResetExperiment = () => {
    setCurrentStepIdx(0);
    setIsHeating(false);
  };

  const handleMixSandbox = () => {
    const res = evaluateReagentMix(reagent1, reagent2);
    setSandboxResult(res);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <TestTube2 className="h-7 w-7 text-emerald-400" />
            <span>Phòng Thí Nghiệm Hóa Học Ảo (Virtual Lab)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Quan sát hiện tượng đổi màu dung dịch, kết tủa lắng đáy, bọt khí sủi trào và ngọn lửa kim loại sống động như thực tế.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center rounded-2xl border border-slate-800 bg-slate-900 p-1">
          <button
            onClick={() => setLabMode('preset')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              labMode === 'preset' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Thí nghiệm mẫu (20+)
          </button>
          <button
            onClick={() => setLabMode('sandbox')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              labMode === 'sandbox' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tự do pha trộn hóa chất
          </button>
        </div>
      </div>

      {labMode === 'preset' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visual Laboratory Viewport */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-2 shadow-2xl flex flex-col items-center justify-center">
            <canvas
              ref={canvasRef}
              width={720}
              height={520}
              className="w-full h-auto rounded-2xl block"
            />

            {/* Step Controls Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/90 p-3 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleNextStep}
                  disabled={currentStepIdx >= experiment.steps.length - 1}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-md shadow-emerald-600/20"
                >
                  <span>Bước tiếp theo ({currentStepIdx + 1}/{experiment.steps.length})</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={handleResetExperiment}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-2 text-slate-400 hover:text-white hover:bg-slate-800"
                  title="Làm lại từ đầu"
                  aria-label="Làm lại từ đầu"
                >
                  <RotateCw className="h-4 w-4" />
                </button>
              </div>

              {/* Heat button toggle */}
              <button
                onClick={() => setIsHeating(!isHeating)}
                className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
                  isHeating
                    ? 'border-orange-500 bg-orange-500/20 text-orange-300'
                    : 'border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Flame className={`h-4 w-4 ${isHeating ? 'text-orange-400 animate-pulse' : 'text-slate-400'}`} />
                <span>{isHeating ? 'Đang bật đèn cồn' : 'Bật đèn cồn'}</span>
              </button>
            </div>
          </div>

          {/* Experiment Guide & Observations */}
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
              {/* Select Preset */}
              <div>
                <span className="text-xs font-semibold text-emerald-400 block mb-1">Chọn thí nghiệm:</span>
                <select
                  value={activeExpId}
                  onChange={e => {
                    setActiveExpId(e.target.value);
                    setCurrentStepIdx(0);
                    setIsHeating(false);
                  }}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs font-bold text-white focus:outline-none"
                >
                  {EXPERIMENTS.map(exp => (
                    <option key={exp.id} value={exp.id}>
                      {exp.title} ({exp.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Active Equation */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3.5 space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold block">Phương trình phản ứng:</span>
                <div className="font-mono text-xs font-bold text-emerald-300 break-words">
                  {experiment.equation}
                </div>
              </div>

              {/* Step Action & Observation */}
              <div className="space-y-3">
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>Thao tác: {step.actionVi}</span>
                  </div>
                  <div className="text-xs text-slate-200 leading-relaxed border-t border-emerald-500/20 pt-2">
                    <span className="font-semibold text-white">Hiện tượng: </span>
                    {step.observationVi}
                  </div>
                </div>

                {/* Conclusion */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3.5 space-y-1 text-xs text-slate-300">
                  <span className="font-bold text-white block">Giải thích bản chất:</span>
                  <p className="leading-relaxed text-[11px] text-slate-400">
                    {experiment.conclusionVi}
                  </p>
                </div>

                {/* Safety Warning */}
                <div className="rounded-2xl border border-amber-500/30 bg-amber-950/20 p-3 flex items-start gap-2.5 text-xs text-amber-300">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-400" />
                  <div>
                    <span className="font-bold">An toàn phòng thí nghiệm: </span>
                    <span className="text-amber-200/90 text-[11px]">{experiment.safetyVi}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Sandbox Mode: Mix Reagents */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-2 shadow-2xl flex flex-col items-center justify-center">
            <canvas
              ref={canvasRef}
              width={720}
              height={520}
              className="w-full h-auto rounded-2xl block"
            />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center">
              <button
                onClick={handleMixSandbox}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all"
              >
                <Sparkles className="h-4 w-4" />
                <span>Pha trộn vào ống nghiệm ngay</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
              <h3 className="text-base font-bold text-white">Chọn 2 hóa chất để hòa trộn</h3>

              {/* Reagent 1 */}
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">
                  Chất thứ nhất (Lọ 1):
                </label>
                <select
                  value={reagent1}
                  onChange={e => setReagent1(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs font-bold text-white focus:outline-none"
                >
                  {MIXING_REAGENTS.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.nameVi} ({r.formula})
                    </option>
                  ))}
                </select>
              </div>

              {/* Reagent 2 */}
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">
                  Chất thứ hai (Lọ 2):
                </label>
                <select
                  value={reagent2}
                  onChange={e => setReagent2(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs font-bold text-white focus:outline-none"
                >
                  {MIXING_REAGENTS.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.nameVi} ({r.formula})
                    </option>
                  ))}
                </select>
              </div>

              {/* Sandbox Result Card */}
              {sandboxResult && (
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-4 space-y-2 animate-in fade-in">
                  <div className="font-bold text-emerald-300 text-xs">
                    Hiện tượng quan sát:
                  </div>
                  <p className="text-xs text-white leading-relaxed">
                    {sandboxResult.phenomenon}
                  </p>
                  <div className="border-t border-emerald-500/20 pt-2 font-mono text-xs text-cyan-300">
                    PTHH: {sandboxResult.equation}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
