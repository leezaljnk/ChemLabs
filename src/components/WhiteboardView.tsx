import React, { useState, useRef, useEffect } from 'react';
import { PenTool, Eraser, Download, Trash2, Undo, Sparkles } from 'lucide-react';

export const WhiteboardView: React.FC = () => {
  const [tool, setTool] = useState<'pen' | 'highlighter' | 'eraser'>('pen');
  const [color, setColor] = useState<string>('#38bdf8');
  const [lineWidth, setLineWidth] = useState<number>(3);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const historyRef = useRef<ImageData[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dark canvas background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Save initial state
    historyRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  }, []);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    lastPosRef.current = getCanvasCoords(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const curPos = getCanvasCoords(e);

    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(curPos.x, curPos.y);

    if (tool === 'eraser') {
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = lineWidth * 4;
      ctx.lineCap = 'round';
      ctx.globalAlpha = 1.0;
    } else if (tool === 'highlighter') {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth * 3;
      ctx.lineCap = 'square';
      ctx.globalAlpha = 0.35;
    } else {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.globalAlpha = 1.0;
    }

    ctx.stroke();
    lastPosRef.current = curPos;
  };

  const stopDrawing = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.globalAlpha = 1.0;

    // Save history snapshot
    historyRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    if (historyRef.current.length > 20) historyRef.current.shift();
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    historyRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  };

  const handleUndo = () => {
    if (historyRef.current.length <= 1) return;
    historyRef.current.pop();
    const last = historyRef.current[historyRef.current.length - 1];
    const canvas = canvasRef.current;
    if (!canvas || !last) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.putImageData(last, 0, 0);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `ChemLabs-Whiteboard-${Date.now()}.png`;
    a.click();
  };

  // Stamp chemical apparatus shapes
  const handleStampShape = (shape: 'beaker' | 'testtube' | 'benzene' | 'arrow') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = 'rgba(56, 189, 248, 0.1)';

    if (shape === 'beaker') {
      ctx.strokeRect(cx - 50, cy - 60, 100, 120);
      ctx.fillRect(cx - 48, cy, 96, 58);
    } else if (shape === 'testtube') {
      ctx.beginPath();
      ctx.moveTo(cx - 20, cy - 80);
      ctx.lineTo(cx - 20, cy + 60);
      ctx.arc(cx, cy + 60, 20, Math.PI, 0, true);
      ctx.lineTo(cx + 20, cy - 80);
      ctx.stroke();
    } else if (shape === 'benzene') {
      const r = 50;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // inner aromatic circle
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.stroke();
    } else if (shape === 'arrow') {
      ctx.beginPath();
      ctx.moveTo(cx - 80, cy);
      ctx.lineTo(cx + 80, cy);
      ctx.lineTo(cx + 60, cy - 15);
      ctx.moveTo(cx + 80, cy);
      ctx.lineTo(cx + 60, cy + 15);
      ctx.stroke();
    }

    historyRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <PenTool className="h-7 w-7 text-pink-400" />
            <span>Bảng Viết &amp; Xưởng Vẽ Sơ Đồ Hóa Học (Inkable)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Ghi chép công thức, vẽ cấu tạo phân tử, chèn khuôn mẫu dụng cụ thí nghiệm và xuất ảnh PNG.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800"
            title="Hoàn tác (Undo)"
            aria-label="Hoàn tác"
          >
            <Undo className="h-4 w-4" />
            <span>Hoàn tác</span>
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-slate-800"
            title="Xóa trắng bảng"
            aria-label="Xóa trắng bảng"
          >
            <Trash2 className="h-4 w-4" />
            <span>Xóa bảng</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-xl bg-pink-600 px-4 py-2 text-xs font-bold text-white hover:bg-pink-500 shadow-md shadow-pink-600/20"
            aria-label="Tải về hình ảnh PNG"
          >
            <Download className="h-4 w-4" />
            <span>Xuất file PNG</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
        {/* Tools (Pen / Highlighter / Eraser) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setTool('pen')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              tool === 'pen' ? 'bg-pink-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Bút mực
          </button>
          <button
            onClick={() => setTool('highlighter')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              tool === 'highlighter' ? 'bg-pink-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Dạ quang
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              tool === 'eraser' ? 'bg-pink-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tẩy xóa
          </button>
        </div>

        {/* Colors Palette */}
        <div className="flex items-center gap-2">
          {['#ffffff', '#38bdf8', '#22c55e', '#eab308', '#ef4444', '#ec4899', '#a855f7'].map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`h-6 w-6 rounded-full border-2 transition-transform ${
                color === c ? 'scale-125 border-white shadow-sm' : 'border-transparent hover:scale-110'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        {/* Stroke width */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-400 font-semibold">Cỡ nét:</span>
          {[2, 4, 8, 14].map(w => (
            <button
              key={w}
              onClick={() => setLineWidth(w)}
              className={`rounded-lg px-2 py-1 text-xs font-mono font-bold ${
                lineWidth === w ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {w}px
            </button>
          ))}
        </div>

        {/* Chemical Shape Stamps */}
        <div className="flex items-center gap-1 border-l border-slate-800 pl-3">
          <span className="text-[11px] text-slate-400 font-semibold mr-1">Chèn nhanh:</span>
          <button
            onClick={() => handleStampShape('beaker')}
            className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-semibold text-slate-300 hover:bg-slate-800"
          >
            Cốc
          </button>
          <button
            onClick={() => handleStampShape('testtube')}
            className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-semibold text-slate-300 hover:bg-slate-800"
          >
            Ống nghiệm
          </button>
          <button
            onClick={() => handleStampShape('benzene')}
            className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-semibold text-slate-300 hover:bg-slate-800"
          >
            Benzen
          </button>
          <button
            onClick={() => handleStampShape('arrow')}
            className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-semibold text-slate-300 hover:bg-slate-800"
          >
            Mũi tên (→)
          </button>
        </div>
      </div>

      {/* Main Drawing Canvas */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-2 shadow-2xl">
        <canvas
          ref={canvasRef}
          width={1120}
          height={620}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full h-auto rounded-2xl cursor-crosshair block"
        />
      </div>
    </div>
  );
};
