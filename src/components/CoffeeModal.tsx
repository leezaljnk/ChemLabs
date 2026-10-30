import React, { useState } from 'react';
import { X, Coffee, Copy, Check, ExternalLink, Heart } from 'lucide-react';

interface CoffeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CoffeeModal: React.FC<CoffeeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText('10389821115');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          aria-label="Đóng"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Coffee className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Mời Thầy Sang Ly Cà Phê ☕</h3>
            <p className="text-xs text-amber-400 font-medium">Đồng hành cùng dự án giáo dục miễn phí</p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Hệ sinh thái Hóa học được xây dựng hoàn toàn phi lợi nhuận vì cộng đồng học sinh và giáo viên Việt Nam. Một ly cà phê nhỏ là nguồn động viên tinh thần to lớn để tác giả tiếp tục cập nhật thêm nhiều bài học và mô phỏng thí nghiệm mới!
        </p>

        {/* Bank Account Info Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-3">
          <div className="text-xs font-bold text-slate-300">
            🏦 NGÂN HÀNG VPBANK (VIỆT NAM THỊNH VƯỢNG)
          </div>
          <div className="text-xs text-slate-400">
            Chủ tài khoản: <span className="font-bold text-white">NGUYEN VAN SANG</span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-900 p-3 border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-500 block">Số tài khoản:</span>
              <span className="font-mono text-lg font-bold text-cyan-400 tracking-wider">
                10389821115
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-700 transition-colors"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2 pt-1 text-xs">
          <a
            href="https://www.facebook.com/nguyenvan.sang.92798072/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-800/80 p-2.5 font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <span>Kết nối Facebook với Thầy Sang</span>
            <ExternalLink className="h-3.5 w-3.5 text-cyan-400" />
          </a>
        </div>
      </div>
    </div>
  );
};
