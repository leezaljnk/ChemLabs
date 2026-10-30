import React, { useState } from 'react';
import { BookOpen, Search, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { CHEMICAL_COLORS, CORE_FORMULAS, ELECTROCHEMICAL_SERIES } from '../data/knowledge';

export const KnowledgeView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'colors' | 'formulas' | 'series' | 'identification'>('colors');
  const [search, setSearch] = useState<string>('');

  // Identification tests data
  const IDENTIFICATION_TESTS = [
    {
      target: 'Ion Sunfat (SO₄²⁻)',
      reagent: 'Dung dịch BaCl₂ hoặc Ba(OH)₂',
      phenomenon: 'Xuất hiện kết tủa trắng tinh khiết BaSO₄ không tan trong axit mạnh loãng hay đặc.',
      equation: 'Ba²⁺ + SO₄²⁻ → BaSO₄↓ (trắng)'
    },
    {
      target: 'Ion Clorua (Cl⁻)',
      reagent: 'Dung dịch AgNO₃',
      phenomenon: 'Xuất hiện kết tủa trắng vón AgCl, để ngoài ánh sáng chuyển sang màu xám đen.',
      equation: 'Ag⁺ + Cl⁻ → AgCl↓ (trắng)'
    },
    {
      target: 'Ion Sắt(III) (Fe³⁺)',
      reagent: 'Dung dịch kiềm NaOH / KOH',
      phenomenon: 'Xuất hiện kết tủa màu nâu đỏ của Fe(OH)₃.',
      equation: 'Fe³⁺ + 3OH⁻ → Fe(OH)₃↓ (nâu đỏ)'
    },
    {
      target: 'Ion Sắt(II) (Fe²⁺)',
      reagent: 'Dung dịch kiềm NaOH trong không khí',
      phenomenon: 'Xuất hiện kết tủa trắng xanh Fe(OH)₂, sau một thời gian hóa nâu đỏ do bị oxi không khí oxi hóa thành Fe(OH)₃.',
      equation: 'Fe²⁺ + 2OH⁻ → Fe(OH)₂↓ (trắng xanh); 4Fe(OH)₂ + O₂ + 2H₂O → 4Fe(OH)₃↓ (nâu đỏ)'
    },
    {
      target: 'Ion Đồng(II) (Cu²⁺)',
      reagent: 'Dung dịch kiềm NaOH hoặc dd NH₃ dư',
      phenomenon: 'Tạo kết tủa xanh lam Cu(OH)₂. Nếu cho tiếp NH₃ dư, kết tủa tan tạo dung dịch phức màu xanh lam thẫm [Cu(NH₃)₄]²⁺.',
      equation: 'Cu²⁺ + 2OH⁻ → Cu(OH)₂↓; Cu(OH)₂ + 4NH₃ → [Cu(NH₃)₄](OH)₂ (xanh thẫm)'
    },
    {
      target: 'Ion Amoni (NH₄⁺)',
      reagent: 'Dung dịch kiềm NaOH đun nóng',
      phenomenon: 'Sinh khí Amoniac (NH₃) mùi khai bốc lên, làm xanh giấy quỳ tím ẩm.',
      equation: 'NH₄⁺ + OH⁻ → NH₃↑ + H₂O'
    },
    {
      target: 'Khí Cacbonic (CO₂)',
      reagent: 'Nước vôi trong dư Ca(OH)₂',
      phenomenon: 'Nước vôi trong bị vẩn đục do tạo kết tủa trắng CaCO₃.',
      equation: 'CO₂ + Ca(OH)₂ → CaCO₃↓ (trắng) + H₂O'
    },
    {
      target: 'Khí Sunfurơ (SO₂)',
      reagent: 'Dung dịch Brom (Br₂) màu nâu đỏ hoặc cánh hoa hồng',
      phenomenon: 'Làm mất màu nâu đỏ của nước brom và làm mất màu cánh hoa hồng.',
      equation: 'SO₂ + Br₂ + 2H₂O → 2HBr + H₂SO₄'
    },
    {
      target: 'Hồ tinh bột',
      reagent: 'Dung dịch Iot (I₂)',
      phenomenon: 'Xuất hiện màu xanh tím đặc trưng (phức hấp phụ). Khi đun nóng màu xanh biến mất, để nguội màu xanh lại xuất hiện.',
      equation: 'Iot chui vào trong lòng xoắn của amilozơ tạo phức xanh tím'
    }
  ];

  const filteredColors = CHEMICAL_COLORS.filter(
    c =>
      c.nameVi.toLowerCase().includes(search.toLowerCase()) ||
      c.formula.toLowerCase().includes(search.toLowerCase()) ||
      c.colorName.toLowerCase().includes(search.toLowerCase())
  );

  const filteredFormulas = CORE_FORMULAS.filter(
    f =>
      f.nameVi.toLowerCase().includes(search.toLowerCase()) ||
      f.explanationVi.toLowerCase().includes(search.toLowerCase()) ||
      f.exampleVi.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTests = IDENTIFICATION_TESTS.filter(
    t =>
      t.target.toLowerCase().includes(search.toLowerCase()) ||
      t.reagent.toLowerCase().includes(search.toLowerCase()) ||
      t.phenomenon.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-amber-400" />
            <span>Bách Khoa Tri Thức Hóa Học Phổ Thông</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Tra cứu nhanh màu sắc dung dịch &amp; kết tủa, mẹo nhận biết các ion và chất khí, dãy hoạt động hóa học và hệ thống công thức.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm kiếm kiến thức..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-2 pl-9 pr-4 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/80 pb-3 text-xs">
        {[
          { id: 'colors', label: 'Bảng màu sắc các chất' },
          { id: 'identification', label: 'Nhận biết ion & chất khí' },
          { id: 'series', label: 'Dãy hoạt động & Dãy điện hóa' },
          { id: 'formulas', label: 'Công thức trọng tâm 10-11-12' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`rounded-xl px-4 py-2 font-bold transition-all ${
              activeSubTab === tab.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Subtab 1: Color Handbook */}
      {activeSubTab === 'colors' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredColors.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 shrink-0 rounded-xl border border-white/20 shadow-inner"
                    style={{ backgroundColor: item.hexCode }}
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.nameVi}</h3>
                    <div className="font-mono text-xs text-cyan-300 font-semibold">{item.formula}</div>
                  </div>
                </div>
                <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300 font-medium">
                  {item.state}
                </span>
              </div>

              <div className="border-t border-slate-800/80 pt-2 text-xs">
                <div className="text-slate-300">
                  <span className="font-semibold text-amber-400">Màu sắc: </span>
                  {item.colorName}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {item.notesVi}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Subtab 2: Identification Guide */}
      {activeSubTab === 'identification' && (
        <div className="space-y-3">
          {filteredTests.map((test, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-teal-300 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Chất cần nhận biết: {test.target}</span>
                </h3>
                <span className="rounded-lg bg-teal-500/15 px-2.5 py-0.5 text-xs text-teal-400 font-semibold border border-teal-500/30">
                  Thuốc thử: {test.reagent}
                </span>
              </div>

              <div className="text-xs text-slate-300 pt-1">
                <span className="font-bold text-white">Hiện tượng quan sát: </span>
                {test.phenomenon}
              </div>

              <div className="rounded-xl bg-slate-950 p-2.5 font-mono text-xs text-cyan-300 border border-slate-800/80">
                {test.equation}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Subtab 3: Activity & Electrochemical Series */}
      {activeSubTab === 'series' && (
        <div className="space-y-6">
          {/* Mnemonic card */}
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-950/20 to-slate-900/80 p-5 space-y-3">
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>Câu Ca Dao Thần Chú Ghi Nhớ Dãy Hoạt Động Kim Loại</span>
            </h3>
            <div className="font-mono text-sm sm:text-base font-bold text-white tracking-wide bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              K · Na · Ba · Ca · Mg · Al · Zn · Fe · Ni · Sn · Pb · (H) · Cu · Hg · Ag · Pt · Au
            </div>
            <div className="text-xs text-amber-200/90 italic leading-relaxed">
              &quot;Khi Nào Bạn Cần May Áo Giáp Sắt Nhớ Sang Phố Hỏi Cửa Hàng Á Phi Âu&quot;
            </div>
          </div>

          {/* Table of Standard Electrode Potentials */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <h3 className="text-sm font-bold text-white">Dãy Thế Điện Cực Chuẩn (E° ở 25°C):</h3>
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-800 bg-slate-950 text-slate-400 font-semibold">
                  <tr>
                    <th className="p-3">Cặp Oxi hóa / Khử</th>
                    <th className="p-3">Dạng phản ứng khử</th>
                    <th className="p-3 font-mono text-right">E° (V)</th>
                    <th className="p-3">Phân nhóm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {ELECTROCHEMICAL_SERIES.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">{c.oxidant} / {c.reductant}</td>
                      <td className="p-3 text-slate-300">{c.halfReaction}</td>
                      <td className={`p-3 font-bold text-right ${c.eStandardV > 0 ? 'text-amber-400' : 'text-cyan-400'}`}>
                        {c.eStandardV > 0 ? `+${c.eStandardV.toFixed(3)}` : c.eStandardV.toFixed(3)} V
                      </td>
                      <td className="p-3 font-sans text-slate-400">{c.groupVi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 4: Formulas */}
      {activeSubTab === 'formulas' && (
        <div className="space-y-4">
          {filteredFormulas.map((f, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-bold text-white">{f.nameVi}</h3>
                <span className="rounded-lg bg-amber-500/15 px-2.5 py-0.5 text-xs font-bold text-amber-300 border border-amber-500/30">
                  Lớp {f.grade}
                </span>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-sm sm:text-base font-bold text-amber-300 text-center">
                {f.latex}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {f.explanationVi}
              </p>

              <div className="rounded-xl bg-slate-950/60 p-3 border border-slate-800/80 text-xs">
                <span className="font-semibold text-cyan-400 block mb-0.5">Ví dụ áp dụng:</span>
                <span className="text-slate-300">{f.exampleVi}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
