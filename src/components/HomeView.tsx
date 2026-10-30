import React from 'react';
import {
  Grid,
  Atom,
  Layers,
  Share2,
  Calculator,
  FlaskConical,
  TestTube2,
  Zap,
  Droplets,
  BookOpen,
  PenTool,
  ArrowRight,
  Sparkles,
  Search,
  ExternalLink,
  Heart,
  QrCode,
  Copy,
  Check
} from 'lucide-react';
import { NavTabId } from './Navbar';
import { ELEMENTS } from '../data/elements';

interface HomeViewProps {
  onSelectTab: (tab: NavTabId, contextData?: any) => void;
  onOpenSearch: () => void;
  onOpenDonate: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab,
  onOpenSearch,
  onOpenDonate
}) => {
  const [copiedBank, setCopiedBank] = React.useState(false);

  // Daily pick of element: Iron Z=26 or Copper Z=29 or Sodium Z=11
  const featuredElement = ELEMENTS.find(e => e.z === 26) || ELEMENTS[0];

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('10389821115');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-300">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Hệ sinh thái Hóa học số tương tác chuẩn SGK Mới (KHTN 10 - 11 - 12)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Khám phá thế giới{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Hóa Học Phổ Thông
            </span>{' '}
            tương tác trực quan
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Nền tảng học tập toàn diện tích hợp 118 nguyên tố bảng tuần hoàn, mô hình nguyên tử 3D Bohr, cấu hình electron ô orbital, cân bằng phản ứng, phòng thí nghiệm ảo chân thực, điện hóa và đường cong chuẩn độ.
          </p>

          {/* Quick Search Action */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition-all hover:scale-[1.02] active:scale-[0.98]"
              aria-label="Mở tìm kiếm thông minh"
            >
              <Search className="h-4 w-4" />
              <span>Tìm kiếm thông minh (⌘K)</span>
            </button>

            <button
              onClick={() => onSelectTab('lab')}
              className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800/80 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-slate-600 hover:bg-slate-700/80 transition-all"
              aria-label="Vào phòng thí nghiệm ảo"
            >
              <TestTube2 className="h-4 w-4 text-emerald-400" />
              <span>Phòng thí nghiệm ảo</span>
            </button>
          </div>

          {/* Quick Stats Banner */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-800/80">
            <div className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-3">
              <div className="text-xl sm:text-2xl font-bold text-cyan-400">118</div>
              <div className="text-[11px] text-slate-400">Nguyên tố tuần hoàn</div>
            </div>
            <div className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-3">
              <div className="text-xl sm:text-2xl font-bold text-blue-400">100%</div>
              <div className="text-[11px] text-slate-400">Ô Orbital & Hund</div>
            </div>
            <div className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-3">
              <div className="text-xl sm:text-2xl font-bold text-emerald-400">20+</div>
              <div className="text-[11px] text-slate-400">Thí nghiệm ảo & Pha trộn</div>
            </div>
            <div className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-3">
              <div className="text-xl sm:text-2xl font-bold text-amber-400">0.00s</div>
              <div className="text-[11px] text-slate-400">Tốc độ tức thì Offline</div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Spotlight Cards (Tiêu điểm mỗi ngày) */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>Tiêu điểm kiến thức nổi bật</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Spotlight 1: Element of the Day */}
          <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/60 p-4 relative overflow-hidden group hover:border-cyan-500/60 transition-colors">
            <div className="flex items-center justify-between text-xs text-cyan-400 font-semibold mb-2">
              <span>Nguyên tố tiêu biểu</span>
              <span className="rounded bg-cyan-500/15 px-1.5 py-0.5 text-[10px]">Z = {featuredElement.z}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/20 font-black text-xl text-cyan-300 border border-cyan-500/40">
                {featuredElement.symbol}
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {featuredElement.nameVi}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {featuredElement.categoryVi} · {featuredElement.electronConfig}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-300 mt-2 line-clamp-2">
              {featuredElement.summaryVi}
            </p>
            <button
              onClick={() => onSelectTab('periodic', { elementZ: featuredElement.z })}
              className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
              aria-label={`Xem chi tiết nguyên tố ${featuredElement.nameVi}`}
            >
              <span>Xem bảng tuần hoàn</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Spotlight 2: Experiment of the day */}
          <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/60 p-4 group hover:border-emerald-500/60 transition-colors">
            <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold mb-2">
              <span>Thí nghiệm gợi ý</span>
              <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px]">Lớp 12</span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
              Glucozơ tráng bạc ([Ag(NH₃)₂]OH)
            </h3>
            <p className="text-[11px] font-mono text-emerald-300/80 mt-1">
              R-CHO + 2[Ag(NH₃)₂]OH → 2Ag↓ + ...
            </p>
            <p className="text-xs text-slate-300 mt-2 line-clamp-2">
              Tạo lớp bạc kim loại sáng bóng như gương bám vào thành ống nghiệm khi đun nóng nhẹ trong nước ấm.
            </p>
            <button
              onClick={() => onSelectTab('lab', { experimentId: 'silver-mirror' })}
              className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              aria-label="Mở thí nghiệm tráng bạc trong phòng thí nghiệm ảo"
            >
              <span>Chạy thí nghiệm ảo</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Spotlight 3: Formula of the day */}
          <div className="rounded-2xl border border-amber-500/30 bg-slate-900/60 p-4 group hover:border-amber-500/60 transition-colors">
            <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-2">
              <span>Công thức · Lớp 12</span>
              <span className="rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px]">Điện hóa</span>
            </div>
            <h3 className="text-sm font-bold text-white">
              Suất điện động chuẩn của pin
            </h3>
            <div className="my-2 rounded-lg bg-slate-950/80 p-2 font-mono text-xs text-amber-300 font-bold text-center border border-slate-800">
              E°pin = E°catot - E°anot &gt; 0
            </div>
            <p className="text-xs text-slate-300 line-clamp-2">
              Catot xảy ra quá trình khử (cực dương), anot xảy ra quá trình oxi hóa (cực âm).
            </p>
            <button
              onClick={() => onSelectTab('echem')}
              className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300"
              aria-label="Mở mô phỏng Pin và Điện hóa"
            >
              <span>Mô phỏng pin điện</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Spotlight 4: Concept */}
          <div className="rounded-2xl border border-purple-500/30 bg-slate-900/60 p-4 group hover:border-purple-500/60 transition-colors">
            <div className="flex items-center justify-between text-xs text-purple-400 font-semibold mb-2">
              <span>Khái niệm trọng tâm</span>
              <span className="rounded bg-purple-500/15 px-1.5 py-0.5 text-[10px]">Polime</span>
            </div>
            <h3 className="text-sm font-bold text-white">
              Cao su &amp; Sự lưu hóa cao su
            </h3>
            <p className="text-xs text-slate-300 mt-2 line-clamp-2">
              Vật liệu polime có tính đàn hồi cao. Quá trình lưu hóa bằng lưu huỳnh tạo cầu nối đisunfua -S-S- tạo mạng không gian bền nhiệt hơn.
            </p>
            <button
              onClick={() => onSelectTab('tracuu')}
              className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300"
              aria-label="Mở Bách khoa tri thức hóa học"
            >
              <span>Tra cứu bách khoa</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Feature Modules Grid */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Hệ Thống Chức Năng Học Tập Hóa Học
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Chọn một phân hệ để bắt đầu trải nghiệm học tập và mô phỏng tương tác
          </p>
        </div>

        {/* Group 1: Cấu tạo chất */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <Atom className="h-4 w-4" />
            <span>Phân hệ 1: Cấu tạo chất &amp; Cấu trúc phân tử</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => onSelectTab('periodic')}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-left hover:border-cyan-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-cyan-500/10 transition-all group"
              aria-label="Mở Bảng tuần hoàn 118 nguyên tố"
            >
              <div className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 group-hover:scale-105 transition-transform">
                  <Grid className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300">
                  Bảng tuần hoàn
                </h4>
                <p className="text-xs text-slate-400">
                  118 nguyên tố, phân nhóm, chu kì, độ âm điện, bán kính, xu hướng biến thiên tuần hoàn.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>Khám phá</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </button>

            <button
              onClick={() => onSelectTab('atom')}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-left hover:border-blue-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-blue-500/10 transition-all group"
              aria-label="Mở Mô hình nguyên tử 3D Bohr"
            >
              <div className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30 group-hover:scale-105 transition-transform">
                  <Atom className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-blue-300">
                  Nguyên tử 3D Bohr
                </h4>
                <p className="text-xs text-slate-400">
                  Mô hình Bohr các lớp K, L, M, N, hạt proton/neutron, đám mây electron chuyển động sống động.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
                <span>Khám phá</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </button>

            <button
              onClick={() => onSelectTab('config')}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-left hover:border-indigo-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-indigo-500/10 transition-all group"
              aria-label="Mở Cấu hình electron và ô orbital"
            >
              <div className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 group-hover:scale-105 transition-transform">
                  <Layers className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-indigo-300">
                  Cấu hình electron &amp; Ô Orbital
                </h4>
                <p className="text-xs text-slate-400">
                  Phân bố ô lượng tử [↑↓], quy tắc Hund, nguyên lí Pauli, cấu hình ion Fe²⁺, Fe³⁺, Cl⁻.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform">
                <span>Khám phá</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </button>

            <button
              onClick={() => onSelectTab('molecule')}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-left hover:border-purple-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-purple-500/10 transition-all group"
              aria-label="Mở Mô hình phân tử 3D và VSEPR"
            >
              <div className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30 group-hover:scale-105 transition-transform">
                  <Share2 className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-purple-300">
                  Phân tử 3D &amp; VSEPR
                </h4>
                <p className="text-xs text-slate-400">
                  Mô hình que &amp; không gian H₂O, CH₄, CO₂, NH₃, C₆H₆, góc liên kết và dạng lai hóa.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform">
                <span>Khám phá</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </button>
          </div>
        </div>

        {/* Group 2: Phản ứng & Phòng thí nghiệm */}
        <div className="space-y-3 pt-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <FlaskConical className="h-4 w-4" />
            <span>Phân hệ 2: Phản ứng &amp; Phòng thí nghiệm ảo</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => onSelectTab('lab')}
              className="flex flex-col justify-between rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/30 to-slate-900/80 p-4 text-left hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 transition-all group relative overflow-hidden"
              aria-label="Mở Phòng thí nghiệm ảo tương tác"
            >
              <div className="absolute top-2 right-2 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                Nổi bật
              </div>
              <div className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 group-hover:scale-105 transition-transform">
                  <TestTube2 className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-300">
                  Phòng thí nghiệm ảo
                </h4>
                <p className="text-xs text-slate-300">
                  Mô phỏng 20+ thí nghiệm: đun nóng, kết tủa, sủi bọt khí, thử ngọn lửa và sandbox tự pha trộn!
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>Thực hành thí nghiệm</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </button>

            <button
              onClick={() => onSelectTab('equation')}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-left hover:border-sky-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-sky-500/10 transition-all group"
              aria-label="Mở Cân bằng PTHH và tính toán hóa học"
            >
              <div className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400 border border-sky-500/30 group-hover:scale-105 transition-transform">
                  <Calculator className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-sky-300">
                  PTHH &amp; Tính toán hóa học
                </h4>
                <p className="text-xs text-slate-400">
                  Cân bằng phương trình, tính số mol n = m/M, thể tích khí chuẩn 24.79 L/mol, chất hạn chế.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-sky-400 group-hover:translate-x-1 transition-transform">
                <span>Tính toán</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </button>

            <button
              onClick={() => onSelectTab('ionic')}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-left hover:border-teal-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-teal-500/10 transition-all group"
              aria-label="Mở Bảng tính tan và phản ứng ion"
            >
              <div className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/15 text-teal-400 border border-teal-500/30 group-hover:scale-105 transition-transform">
                  <FlaskConical className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-teal-300">
                  Bảng tính tan &amp; Ion
                </h4>
                <p className="text-xs text-slate-400">
                  Ma trận tan/kết tủa của 14 Cation × 11 Anion, màu sắc kết tủa BaSO₄, AgCl, Fe(OH)₃, CuS.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-teal-400 group-hover:translate-x-1 transition-transform">
                <span>Tra cứu bảng</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </button>

            <button
              onClick={() => onSelectTab('echem')}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-left hover:border-amber-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-amber-500/10 transition-all group"
              aria-label="Mở Điện hóa và Pin điện"
            >
              <div className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 group-hover:scale-105 transition-transform">
                  <Zap className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300">
                  Điện hóa &amp; Pin
                </h4>
                <p className="text-xs text-slate-400">
                  Mô phỏng Pin Daniell Zn-Cu, cầu muối, dãy thế điện cực chuẩn E°, công thức Faraday.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>Mô phỏng pin</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </button>
          </div>
        </div>

        {/* Group 3: Dung dịch & Công cụ */}
        <div className="space-y-3 pt-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
            <Droplets className="h-4 w-4" />
            <span>Phân hệ 3: Dung dịch, Chuẩn độ &amp; Công cụ hỗ trợ</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => onSelectTab('solution')}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-left hover:border-rose-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-rose-500/10 transition-all group"
              aria-label="Mở Dung dịch và chuẩn độ pH"
            >
              <div className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30 group-hover:scale-105 transition-transform">
                  <Droplets className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-rose-300">
                  Dung dịch &amp; Chuẩn độ pH
                </h4>
                <p className="text-xs text-slate-400">
                  Tính pH axit/bazơ mạnh &amp; yếu, mô phỏng nhỏ giọt chuẩn độ buret vẽ đồ thị thời gian thực.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-rose-400 group-hover:translate-x-1 transition-transform">
                <span>Chuẩn độ</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </button>

            <button
              onClick={() => onSelectTab('tracuu')}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-left hover:border-amber-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-amber-500/10 transition-all group"
              aria-label="Mở Bách khoa tri thức hóa học"
            >
              <div className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 group-hover:scale-105 transition-transform">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300">
                  Bách khoa tri thức
                </h4>
                <p className="text-xs text-slate-400">
                  Dãy hoạt động kim loại, màu sắc dung dịch/kết tủa, nhận biết ion, tổng hợp công thức 10-11-12.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>Tra cứu</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </button>

            <button
              onClick={() => onSelectTab('casio')}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-left hover:border-cyan-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-cyan-500/10 transition-all group"
              aria-label="Mở Máy tính khoa học Casio FX"
            >
              <div className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 group-hover:scale-105 transition-transform">
                  <Calculator className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300">
                  Máy tính Hóa học Casio
                </h4>
                <p className="text-xs text-slate-400">
                  Phím tắt khối lượng mol SO₄ (96), NO₃ (62), CO₃ (60), H₂O (18), hằng số R, F, Avogadro.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>Mở máy tính</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </button>

            <button
              onClick={() => onSelectTab('whiteboard')}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-left hover:border-pink-500/50 hover:bg-slate-900 hover:shadow-lg hover:shadow-pink-500/10 transition-all group"
              aria-label="Mở Bảng viết và vẽ sơ đồ hóa học"
            >
              <div className="space-y-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/15 text-pink-400 border border-pink-500/30 group-hover:scale-105 transition-transform">
                  <PenTool className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-pink-300">
                  Bảng viết &amp; Sơ đồ
                </h4>
                <p className="text-xs text-slate-400">
                  Bảng vẽ tay ghi chú phản ứng, phác thảo dụng cụ thí nghiệm, hỗ trợ bút màu và xuất hình ảnh PNG.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-pink-400 group-hover:translate-x-1 transition-transform">
                <span>Mở bảng vẽ</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Author & Community Dedication Box */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-[11px] font-semibold text-slate-300">
              <span>🧑‍🏫 TÁC GIẢ &amp; SÁNG LẬP DỰ ÁN SANG-HOÁ GỐC</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Thầy Nguyễn Văn Sang
            </h3>
            <p className="text-xs text-cyan-400 font-medium">
              Giáo viên môn Toán — THPT Nguyễn Hữu Cảnh, TP. Hồ Chí Minh
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Hệ sinh thái Hóa học được xây dựng hoàn toàn miễn phí 100% vì cộng đồng giáo viên và học sinh Việt Nam. Ứng dụng xử lý dữ liệu thuần client-side với tốc độ tức thì và bảo mật tối đa.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenDonate}
                className="flex items-center gap-2 rounded-xl bg-amber-500/20 border border-amber-500/40 px-4 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/30 transition-colors"
                aria-label="Mời cà phê ủng hộ tác giả"
              >
                <span>Mời tác giả ly cà phê ☕</span>
              </button>
              <a
                href="mailto:nguyensangnhc@gmail.com"
                className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <span>✉️ nguyensangnhc@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quick Bank Account QR Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 text-center space-y-3">
            <div className="text-xs font-bold text-slate-300">
              🏦 VPBANK · NGUYEN VAN SANG
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-base font-bold text-cyan-400 tracking-wider">
                10389821115
              </span>
              <button
                onClick={handleCopyAccount}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                title="Sao chép số tài khoản"
                aria-label="Sao chép số tài khoản"
              >
                {copiedBank ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <div className="text-[11px] text-slate-400">
              Quét mã VietQR bằng app ngân hàng ủng hộ dự án giáo dục
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
