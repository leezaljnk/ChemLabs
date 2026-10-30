import React, { useState, useEffect, useRef } from 'react';
import { Atom, Play, Pause, RotateCw, ZoomIn, ZoomOut, Sparkles, Layers } from 'lucide-react';
import { getElementByZ } from '../data/elements';
import { getElectronConfig } from '../utils/chemistry';

interface Atom3DViewProps {
  initialElementZ?: number;
}

export const Atom3DView: React.FC<Atom3DViewProps> = ({ initialElementZ = 6 }) => {
  const [elementZ, setElementZ] = useState<number>(initialElementZ);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'bohr' | 'orbitals'>('bohr');
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const angleRef = useRef<number>(0);

  const element = getElementByZ(elementZ);
  const config = getElectronConfig(elementZ);

  // Shell electron counts: e.g. Carbon Z=6 -> [2, 4]
  const shellCounts = config.shellCounts;
  const numElectrons = elementZ;
  const numProtons = elementZ;
  const numNeutrons = Math.max(0, Math.round(element.atomicMass) - elementZ);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localAngle = angleRef.current;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Deep space grid background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle orbital guide grid
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 300 * zoom, 0, Math.PI * 2);
      ctx.stroke();

      if (viewMode === 'bohr') {
        // Draw Bohr Shells
        const shellRadiusStep = (Math.min(width, height) * 0.4 * zoom) / Math.max(1, shellCounts.length);
        const baseRadius = 45 * zoom;

        shellCounts.forEach((count, shellIdx) => {
          const r = baseRadius + (shellIdx + 1) * shellRadiusStep;

          // Orbit path circle
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);

          // Shell label (K, L, M, N...)
          const shellNames = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];
          ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillText(`Lớp ${shellNames[shellIdx]} (${count}e⁻)`, cx + r - 10, cy - 6);

          // Draw electrons on this shell
          for (let e = 0; e < count; e++) {
            // Speed varies slightly by shell (inner electrons orbit faster)
            const shellSpeedMultiplier = (shellCounts.length - shellIdx * 0.5) * 0.8;
            const electronAngle = localAngle * shellSpeedMultiplier + (e * (Math.PI * 2)) / count;

            const ex = cx + r * Math.cos(electronAngle);
            const ey = cy + r * Math.sin(electronAngle);

            // Electron Glow
            const glow = ctx.createRadialGradient(ex, ey, 1, ex, ey, 8 * zoom);
            glow.addColorStop(0, '#38bdf8');
            glow.addColorStop(0.5, 'rgba(56, 189, 248, 0.5)');
            glow.addColorStop(1, 'rgba(56, 189, 248, 0)');
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(ex, ey, 8 * zoom, 0, Math.PI * 2);
            ctx.fill();

            // Electron Core
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(ex, ey, 3 * zoom, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      } else {
        // Orbital Clouds Mode (s, p, d representation)
        // Draw s-orbital sphere
        const sGlow = ctx.createRadialGradient(cx, cy, 10 * zoom, cx, cy, 80 * zoom);
        sGlow.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
        sGlow.addColorStop(0.6, 'rgba(59, 130, 246, 0.15)');
        sGlow.addColorStop(1, 'rgba(59, 130, 246, 0)');
        ctx.fillStyle = sGlow;
        ctx.beginPath();
        ctx.arc(cx, cy, 80 * zoom, 0, Math.PI * 2);
        ctx.fill();

        // Draw p-orbital dumbbell lobes
        if (elementZ > 2) {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(localAngle * 0.3);

          // Px dumbbell
          const lobeGrad = ctx.createRadialGradient(70 * zoom, 0, 5, 70 * zoom, 0, 60 * zoom);
          lobeGrad.addColorStop(0, 'rgba(236, 72, 153, 0.6)');
          lobeGrad.addColorStop(1, 'rgba(236, 72, 153, 0)');
          ctx.fillStyle = lobeGrad;
          ctx.beginPath();
          ctx.arc(70 * zoom, 0, 50 * zoom, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(-70 * zoom, 0, 50 * zoom, 0, Math.PI * 2);
          ctx.fill();

          // Py dumbbell
          const lobeGradY = ctx.createRadialGradient(0, 70 * zoom, 5, 0, 70 * zoom, 60 * zoom);
          lobeGradY.addColorStop(0, 'rgba(168, 85, 247, 0.6)');
          lobeGradY.addColorStop(1, 'rgba(168, 85, 247, 0)');
          ctx.fillStyle = lobeGradY;
          ctx.beginPath();
          ctx.arc(0, 70 * zoom, 50 * zoom, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(0, -70 * zoom, 50 * zoom, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      }

      // Draw Atomic Nucleus (Hạt nhân)
      const nucleusRadius = Math.min(32 * zoom, 40);
      const nucleusGlow = ctx.createRadialGradient(cx, cy, 5, cx, cy, nucleusRadius * 2);
      nucleusGlow.addColorStop(0, 'rgba(239, 68, 68, 0.8)');
      nucleusGlow.addColorStop(0.5, 'rgba(234, 88, 12, 0.4)');
      nucleusGlow.addColorStop(1, 'rgba(234, 88, 12, 0)');
      ctx.fillStyle = nucleusGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, nucleusRadius * 2, 0, Math.PI * 2);
      ctx.fill();

      // Individual Protons and Neutrons particles cluster
      const numCluster = Math.min(24, numProtons + numNeutrons);
      for (let p = 0; p < numCluster; p++) {
        const pAngle = p * 137.5 * (Math.PI / 180);
        const pDist = (Math.sqrt(p) / Math.sqrt(numCluster)) * (nucleusRadius * 0.8);
        const px = cx + pDist * Math.cos(pAngle);
        const py = cy + pDist * Math.sin(pAngle);

        const isProton = p % 2 === 0;
        ctx.fillStyle = isProton ? '#ef4444' : '#64748b'; // red proton, slate neutron
        ctx.beginPath();
        ctx.arc(px, py, 4 * zoom, 0, Math.PI * 2);
        ctx.fill();
      }

      // Nucleus Center Text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${element.symbol}`, cx, cy);

      if (isPlaying) {
        localAngle += 0.015 * speed;
        angleRef.current = localAngle;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [elementZ, isPlaying, speed, zoom, viewMode, shellCounts, element.symbol, numProtons, numNeutrons]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Atom className="h-7 w-7 text-cyan-400" />
            <span>Mô Hình Nguyên Tử 3D Bohr &amp; Orbital</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Quan sát chuyển động quay của electron quanh hạt nhân nguyên tử theo mô hình hành tinh nguyên tử Bohr.
          </p>
        </div>

        {/* Preset Element Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { z: 1, sym: 'H' },
            { z: 2, sym: 'He' },
            { z: 6, sym: 'C' },
            { z: 7, sym: 'N' },
            { z: 8, sym: 'O' },
            { z: 11, sym: 'Na' },
            { z: 13, sym: 'Al' },
            { z: 17, sym: 'Cl' },
            { z: 26, sym: 'Fe' },
            { z: 29, sym: 'Cu' }
          ].map(p => (
            <button
              key={p.z}
              onClick={() => setElementZ(p.z)}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                elementZ === p.z
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {p.sym}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas Display Viewport */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-2 shadow-2xl flex flex-col items-center justify-center">
          <canvas
            ref={canvasRef}
            width={720}
            height={540}
            className="w-full h-auto rounded-2xl block"
          />

          {/* Overlay Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-800/80 bg-slate-900/90 p-2.5 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-3 py-1.5 text-xs font-bold text-slate-950 hover:bg-cyan-400"
                aria-label={isPlaying ? 'Tạm dừng mô phỏng' : 'Tiếp tục mô phỏng'}
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                <span>{isPlaying ? 'Tạm dừng' : 'Chạy tiếp'}</span>
              </button>

              <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
                <span className="text-[11px] text-slate-400 font-semibold">Tốc độ:</span>
                {[0.5, 1, 2].map(s => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`rounded px-1.5 py-0.5 text-[10px] font-mono ${
                      speed === s ? 'bg-slate-700 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom buttons */}
              <button
                onClick={() => setZoom(z => Math.max(0.6, z - 0.2))}
                className="rounded-lg border border-slate-800 p-1.5 text-slate-400 hover:text-white"
                title="Thu nhỏ"
                aria-label="Thu nhỏ"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <button
                onClick={() => setZoom(z => Math.min(1.8, z + 0.2))}
                className="rounded-lg border border-slate-800 p-1.5 text-slate-400 hover:text-white"
                title="Phóng to"
                aria-label="Phóng to"
              >
                <ZoomIn className="h-4 w-4" />
              </button>

              {/* Mode toggle */}
              <div className="flex items-center rounded-xl border border-slate-800 bg-slate-950 p-0.5">
                <button
                  onClick={() => setViewMode('bohr')}
                  className={`rounded-lg px-2 py-1 text-[11px] font-semibold ${
                    viewMode === 'bohr' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
                  }`}
                >
                  Mô hình Bohr
                </button>
                <button
                  onClick={() => setViewMode('orbitals')}
                  className={`rounded-lg px-2 py-1 text-[11px] font-semibold ${
                    viewMode === 'orbitals' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400'
                  }`}
                >
                  Đám mây s/p
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Element Info & Quantum Stats */}
        <div className="space-y-4">
          {/* Header Card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-cyan-400">Số hiệu nguyên tử Z = {element.z}</span>
                <h2 className="text-2xl font-bold text-white">{element.nameVi}</h2>
                <p className="text-xs text-slate-400">{element.nameEn} · {element.categoryVi}</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 font-black text-2xl text-cyan-300 border border-cyan-500/30">
                {element.symbol}
              </div>
            </div>

            {/* Particle counts */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-2.5">
                <div className="text-base font-bold text-red-400">{numProtons}</div>
                <div className="text-[10px] text-slate-400">Proton (p⁺)</div>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-2.5">
                <div className="text-base font-bold text-slate-300">{numNeutrons}</div>
                <div className="text-[10px] text-slate-400">Neutron (n⁰)</div>
              </div>
              <div className="rounded-xl border border-sky-500/30 bg-sky-950/20 p-2.5">
                <div className="text-base font-bold text-sky-400">{numElectrons}</div>
                <div className="text-[10px] text-slate-400">Electron (e⁻)</div>
              </div>
            </div>

            {/* Electron Configuration */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-semibold">Cấu hình electron:</span>
              <div className="rounded-xl bg-slate-950 p-3 font-mono text-xs text-cyan-300 border border-slate-800">
                {config.orderedConfig}
              </div>
              <div className="text-[11px] text-slate-400">
                Dạng khí hiếm: <span className="font-mono text-slate-200">{config.nobleGasConfig}</span>
              </div>
            </div>

            {/* Bohr Shells Breakdown */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-semibold">Phân bố số e trên từng lớp:</span>
              <div className="space-y-1.5">
                {shellCounts.map((count, i) => {
                  const names = ['K (n=1)', 'L (n=2)', 'M (n=3)', 'N (n=4)', 'O (n=5)', 'P (n=6)', 'Q (n=7)'];
                  const maxCap = 2 * Math.pow(i + 1, 2);
                  const pct = Math.min(100, Math.round((count / maxCap) * 100));

                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-300">Lớp {names[i]}:</span>
                        <span className="font-mono text-cyan-400">{count} / {maxCap} e⁻</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
