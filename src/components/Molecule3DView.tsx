import React, { useState, useEffect, useRef } from 'react';
import { Share2, RotateCw, Play, Pause, ZoomIn, ZoomOut, Info, Sparkles } from 'lucide-react';
import { MOLECULES_LIBRARY, MoleculeData, Atom3D, Bond3D } from '../data/molecules';

export const Molecule3DView: React.FC = () => {
  const [selectedMoleculeId, setSelectedMoleculeId] = useState<string>('h2o');
  const [displayMode, setDisplayMode] = useState<'ball_stick' | 'space_filling'>('ball_stick');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(1);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotationRef = useRef<{ rx: number; ry: number }>({ rx: 0.3, ry: 0.5 });
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  const molecule = MOLECULES_LIBRARY.find(m => m.id === selectedMoleculeId) || MOLECULES_LIBRARY[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Deep dark background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // Radial background aura
      const bgGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 260);
      bgGrad.addColorStop(0, 'rgba(30, 58, 138, 0.25)');
      bgGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Auto rotation increment
      if (isRotating && !isDraggingRef.current) {
        rotationRef.current.ry += 0.012;
      }

      const rx = rotationRef.current.rx;
      const ry = rotationRef.current.ry;

      // 3D projection helper
      const project = (atom: Atom3D) => {
        // Rotate around Y
        const cosY = Math.cos(ry);
        const sinY = Math.sin(ry);
        const x1 = atom.x * cosY + atom.z * sinY;
        const z1 = -atom.x * sinY + atom.z * cosY;

        // Rotate around X
        const cosX = Math.cos(rx);
        const sinX = Math.sin(rx);
        const y2 = atom.y * cosX - z1 * sinX;
        const z2 = atom.y * sinX + z1 * cosX;

        // Perspective scale
        const scale = 110 * zoom;
        const screenX = cx + x1 * scale;
        const screenY = cy - y2 * scale; // invert Y for standard screen coordinates

        return { screenX, screenY, depth: z2, atom };
      };

      const projectedAtoms = molecule.atoms.map(project);

      // Sort bonds and atoms by depth for painter's algorithm
      // Draw bonds first
      molecule.bonds.forEach(bond => {
        const p1 = projectedAtoms[bond.from];
        const p2 = projectedAtoms[bond.to];
        if (!p1 || !p2) return;

        ctx.strokeStyle = 'rgba(148, 163, 184, 0.5)';
        ctx.lineWidth = (displayMode === 'ball_stick' ? 6 : 10) * zoom;
        ctx.beginPath();
        ctx.moveTo(p1.screenX, p1.screenY);
        ctx.lineTo(p2.screenX, p2.screenY);
        ctx.stroke();

        // If double bond, draw secondary parallel line
        if (bond.order >= 2) {
          ctx.strokeStyle = 'rgba(248, 250, 252, 0.4)';
          ctx.lineWidth = 2 * zoom;
          ctx.beginPath();
          ctx.moveTo(p1.screenX + 4, p1.screenY + 4);
          ctx.lineTo(p2.screenX + 4, p2.screenY + 4);
          ctx.stroke();
        }
      });

      // Sort atoms by depth (furthest first, closest last)
      const sortedAtoms = [...projectedAtoms].sort((a, b) => a.depth - b.depth);

      // Draw atoms
      sortedAtoms.forEach(item => {
        const radiusMultiplier = displayMode === 'space_filling' ? 1.8 : 1.0;
        const r = item.atom.radius * radiusMultiplier * zoom;

        // 3D Sphere shading with gradient
        const sphereGrad = ctx.createRadialGradient(
          item.screenX - r * 0.35,
          item.screenY - r * 0.35,
          r * 0.1,
          item.screenX,
          item.screenY,
          r
        );
        sphereGrad.addColorStop(0, '#ffffff');
        sphereGrad.addColorStop(0.3, item.atom.color);
        sphereGrad.addColorStop(1, '#0f172a');

        ctx.fillStyle = sphereGrad;
        ctx.beginPath();
        ctx.arc(item.screenX, item.screenY, r, 0, Math.PI * 2);
        ctx.fill();

        // Atom Symbol text
        ctx.fillStyle = item.atom.element === 'H' ? '#0f172a' : '#ffffff';
        ctx.font = `bold ${Math.max(9, Math.round(12 * zoom))}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.atom.label, item.screenX, item.screenY);
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [molecule, displayMode, isRotating, zoom]);

  // Mouse drag handlers for manual 3D rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    rotationRef.current.ry += dx * 0.01;
    rotationRef.current.rx += dy * 0.01;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Share2 className="h-7 w-7 text-purple-400" />
            <span>Phân Tử 3D &amp; Cấu Trúc Không Gian VSEPR</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Mô hình hóa hình học phân tử theo thuyết lực đẩy cặp electron hóa trị (VSEPR), góc liên kết và dạng lai hóa.
          </p>
        </div>

        {/* Molecule Picker */}
        <div className="flex flex-wrap items-center gap-1.5">
          {MOLECULES_LIBRARY.map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedMoleculeId(m.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                selectedMoleculeId === m.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                  : 'border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {m.formula}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Canvas Viewport */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-2 shadow-2xl flex flex-col items-center justify-center select-none">
          <canvas
            ref={canvasRef}
            width={720}
            height={500}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="w-full h-auto rounded-2xl cursor-grab active:cursor-grabbing block"
          />

          <div className="absolute top-4 left-4 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs text-slate-400 backdrop-blur-md">
            <span>Kéo chuột để xoay 360°</span>
          </div>

          {/* Bottom Viewport Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-800/80 bg-slate-900/90 p-2.5 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRotating(!isRotating)}
                className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-purple-500"
                aria-label={isRotating ? 'Dừng tự xoay' : 'Tự xoay 360 độ'}
              >
                {isRotating ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                <span>{isRotating ? 'Dừng xoay' : 'Tự xoay'}</span>
              </button>

              <div className="flex items-center rounded-xl border border-slate-800 bg-slate-950 p-0.5">
                <button
                  onClick={() => setDisplayMode('ball_stick')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                    displayMode === 'ball_stick' ? 'bg-purple-500/20 text-purple-300' : 'text-slate-400'
                  }`}
                >
                  Que &amp; Quả cầu
                </button>
                <button
                  onClick={() => setDisplayMode('space_filling')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                    displayMode === 'space_filling' ? 'bg-purple-500/20 text-purple-300' : 'text-slate-400'
                  }`}
                >
                  Không gian đặc (vdW)
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
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
            </div>
          </div>
        </div>

        {/* Molecule Geometry & VSEPR Info */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-xl font-bold text-cyan-400">{molecule.formula}</span>
                <h2 className="text-xl font-bold text-white">{molecule.nameVi}</h2>
              </div>
              <span className="rounded-full bg-purple-500/15 px-3 py-1 text-xs font-bold text-purple-300 border border-purple-500/30">
                {molecule.hybridization}
              </span>
            </div>

            {/* VSEPR Geometry matrix */}
            <div className="space-y-2 text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <span className="text-slate-400 block text-[10px]">Dạng hình học VSEPR:</span>
                <span className="text-sm font-bold text-purple-300">{molecule.vseprGeometry}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-slate-400 block text-[10px]">Góc liên kết chuẩn:</span>
                  <span className="text-sm font-bold text-white">{molecule.bondAngle}</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <span className="text-slate-400 block text-[10px]">Trạng thái lai hóa:</span>
                  <span className="text-sm font-bold text-white">{molecule.hybridization}</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <span className="text-slate-400 block text-[10px]">Tính phân cực phân tử:</span>
                <span className="text-xs font-semibold text-cyan-300">{molecule.polarityVi}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-3">
              {molecule.descriptionVi}
            </p>

            {/* CPK Color Legend */}
            <div className="border-t border-slate-800 pt-3 space-y-2">
              <span className="text-[11px] font-semibold text-slate-400">Quy ước màu nguyên tử (CPK):</span>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="h-3 w-3 rounded-full bg-white border border-slate-400 inline-block" /> H (Hiđro)
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="h-3 w-3 rounded-full bg-slate-600 inline-block" /> C (Cacbon)
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="h-3 w-3 rounded-full bg-red-500 inline-block" /> O (Oxi)
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="h-3 w-3 rounded-full bg-blue-500 inline-block" /> N (Nitơ)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
