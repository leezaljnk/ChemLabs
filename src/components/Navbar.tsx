import React from 'react';
import {
  Atom,
  FlaskConical,
  Grid,
  Search,
  Sparkles,
  Zap,
  Calculator,
  BookOpen,
  Layers,
  TestTube2,
  PenTool,
  Droplets,
  Share2,
  Coffee,
  Menu,
  X
} from 'lucide-react';

export type NavTabId =
  | 'home'
  | 'periodic'
  | 'atom'
  | 'config'
  | 'molecule'
  | 'equation'
  | 'ionic'
  | 'lab'
  | 'echem'
  | 'solution'
  | 'tracuu'
  | 'casio'
  | 'whiteboard';

interface NavbarProps {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  onOpenSearch: () => void;
  onOpenDonate: () => void;
}

export const NAV_ITEMS: { id: NavTabId; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
  { id: 'home', label: 'Trang chủ', icon: Sparkles },
  { id: 'periodic', label: 'Bảng tuần hoàn', icon: Grid },
  { id: 'atom', label: 'Nguyên tử 3D', icon: Atom },
  { id: 'config', label: 'Cấu hình electron', icon: Layers },
  { id: 'molecule', label: 'Phân tử 3D', icon: Share2 },
  { id: 'equation', label: 'PTHH & Tính toán', icon: Calculator },
  { id: 'ionic', label: 'Trao đổi ion & Tính tan', icon: FlaskConical },
  { id: 'lab', label: 'Phòng thí nghiệm ảo', icon: TestTube2, badge: 'Hot' },
  { id: 'echem', label: 'Điện hóa & Pin', icon: Zap },
  { id: 'solution', label: 'Dung dịch & Chuẩn độ', icon: Droplets },
  { id: 'tracuu', label: 'Bách khoa tri thức', icon: BookOpen },
  { id: 'casio', label: 'Máy tính Casio', icon: Calculator },
  { id: 'whiteboard', label: 'Bảng vẽ & Sơ đồ', icon: PenTool }
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  onOpenDonate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            aria-label="Về trang chủ ChemLabs"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <FlaskConical className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  ChemLabs
                </span>
                <span className="hidden sm:inline-flex rounded-full bg-cyan-500/15 px-2 py-0.5 text-[10px] font-semibold text-cyan-400 border border-cyan-500/30 whitespace-nowrap">
                  v1.2 Phổ Thông
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Hóa học tương tác · 100% Miễn phí
              </p>
            </div>
          </button>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-400 hover:border-slate-700 hover:text-slate-200 hover:bg-slate-800/80 transition-all shadow-inner"
            aria-label="Tìm kiếm nhanh nguyên tố, phản ứng hoặc công thức"
          >
            <Search className="h-3.5 w-3.5 text-cyan-400" />
            <span className="hidden md:inline">Tìm kiếm thông minh…</span>
            <kbd className="hidden md:inline rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 border border-slate-700">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={onOpenDonate}
            className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300 hover:bg-amber-500/20 hover:border-amber-500/50 transition-colors"
            aria-label="Mời cà phê tác giả"
          >
            <Coffee className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden sm:inline">Cà phê ☕</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu chức năng'}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Navigation Scrollable Bar */}
      <div className="hidden xl:block border-t border-slate-800/60 bg-slate-900/40 px-4">
        <div className="mx-auto max-w-7xl flex items-center gap-1 overflow-x-auto py-1.5 scrollbar-none">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                aria-label={item.label}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-rose-500/20 px-1.5 py-0.2 text-[9px] font-bold text-rose-300 border border-rose-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur-xl animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 rounded-xl p-2.5 text-xs font-medium text-left transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                      : 'text-slate-300 bg-slate-900/60 hover:bg-slate-800/80'
                  }`}
                  aria-label={item.label}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
