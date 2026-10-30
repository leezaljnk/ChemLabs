export interface ElectrochemicalCouple {
  oxidant: string;
  reductant: string;
  eStandardV: number;
  halfReaction: string;
  groupVi: string;
}

export const ELECTROCHEMICAL_SERIES: ElectrochemicalCouple[] = [
  { oxidant: 'K⁺', reductant: 'K', eStandardV: -2.925, halfReaction: 'K⁺ + 1e ⇄ K', groupVi: 'Kim loại mạnh' },
  { oxidant: 'Ca²⁺', reductant: 'Ca', eStandardV: -2.866, halfReaction: 'Ca²⁺ + 2e ⇄ Ca', groupVi: 'Kim loại mạnh' },
  { oxidant: 'Na⁺', reductant: 'Na', eStandardV: -2.714, halfReaction: 'Na⁺ + 1e ⇄ Na', groupVi: 'Kim loại mạnh' },
  { oxidant: 'Mg²⁺', reductant: 'Mg', eStandardV: -2.372, halfReaction: 'Mg²⁺ + 2e ⇄ Mg', groupVi: 'Kim loại mạnh' },
  { oxidant: 'Al³⁺', reductant: 'Al', eStandardV: -1.662, halfReaction: 'Al³⁺ + 3e ⇄ Al', groupVi: 'Kim loại mạnh' },
  { oxidant: 'Zn²⁺', reductant: 'Zn', eStandardV: -0.763, halfReaction: 'Zn²⁺ + 2e ⇄ Zn', groupVi: 'Kim loại trung bình' },
  { oxidant: 'Cr³⁺', reductant: 'Cr', eStandardV: -0.744, halfReaction: 'Cr³⁺ + 3e ⇄ Cr', groupVi: 'Kim loại trung bình' },
  { oxidant: 'Fe²⁺', reductant: 'Fe', eStandardV: -0.440, halfReaction: 'Fe²⁺ + 2e ⇄ Fe', groupVi: 'Kim loại trung bình' },
  { oxidant: 'Ni²⁺', reductant: 'Ni', eStandardV: -0.257, halfReaction: 'Ni²⁺ + 2e ⇄ Ni', groupVi: 'Kim loại trung bình' },
  { oxidant: 'Sn²⁺', reductant: 'Sn', eStandardV: -0.136, halfReaction: 'Sn²⁺ + 2e ⇄ Sn', groupVi: 'Kim loại trung bình' },
  { oxidant: 'Pb²⁺', reductant: 'Pb', eStandardV: -0.126, halfReaction: 'Pb²⁺ + 2e ⇄ Pb', groupVi: 'Kim loại trung bình' },
  { oxidant: '2H⁺', reductant: 'H₂', eStandardV: 0.000, halfReaction: '2H⁺ + 2e ⇄ H₂', groupVi: 'Mốc so sánh hiđro chuẩn' },
  { oxidant: 'Cu²⁺', reductant: 'Cu', eStandardV: +0.340, halfReaction: 'Cu²⁺ + 2e ⇄ Cu', groupVi: 'Kim loại yếu' },
  { oxidant: 'Fe³⁺', reductant: 'Fe²⁺', eStandardV: +0.771, halfReaction: 'Fe³⁺ + 1e ⇄ Fe²⁺', groupVi: 'Cặp oxi hóa khử đặc biệt' },
  { oxidant: 'Ag⁺', reductant: 'Ag', eStandardV: +0.799, halfReaction: 'Ag⁺ + 1e ⇄ Ag', groupVi: 'Kim loại yếu' },
  { oxidant: 'Pt²⁺', reductant: 'Pt', eStandardV: +1.200, halfReaction: 'Pt²⁺ + 2e ⇄ Pt', groupVi: 'Kim loại quý' },
  { oxidant: 'Au³⁺', reductant: 'Au', eStandardV: +1.520, halfReaction: 'Au³⁺ + 3e ⇄ Au', groupVi: 'Kim loại quý' }
];

export interface ColorItem {
  nameVi: string;
  formula: string;
  colorName: string;
  hexCode: string;
  state: 'kết tủa' | 'dung dịch' | 'chất khí' | 'chất rắn';
  notesVi: string;
}

export const CHEMICAL_COLORS: ColorItem[] = [
  { nameVi: 'Đồng(II) sunfat ngậm nước', formula: 'CuSO₄·5H₂O / Cu²⁺', colorName: 'Xanh lam', hexCode: '#0284c7', state: 'dung dịch', notesVi: 'Màu xanh đặc trưng của ion đồng hiđrat hóa [Cu(H₂O)₆]²⁺' },
  { nameVi: 'Đồng(II) hiđroxit', formula: 'Cu(OH)₂', colorName: 'Xanh lam', hexCode: '#0369a1', state: 'kết tủa', notesVi: 'Tan trong saccarozo, glucozo, glixerol tạo phức xanh lam thẫm' },
  { nameVi: 'Sắt(III) hiđroxit', formula: 'Fe(OH)₃', colorName: 'Nâu đỏ', hexCode: '#991b1b', state: 'kết tủa', notesVi: 'Tạo thành khi cho dd muối Fe(III) tác dụng với bazơ kiềm' },
  { nameVi: 'Sắt(II) hiđroxit', formula: 'Fe(OH)₂', colorName: 'Trắng xanh', hexCode: '#86efac', state: 'kết tủa', notesVi: 'Kém bền, dễ bị oxi không khí oxi hóa thành Fe(OH)₃ nâu đỏ' },
  { nameVi: 'Bari sunfat', formula: 'BaSO₄', colorName: 'Trắng đục', hexCode: '#ffffff', state: 'kết tủa', notesVi: 'Không tan trong nước và axit mạnh, thuốc thử nhận biết SO₄²⁻' },
  { nameVi: 'Bạc clorua', formula: 'AgCl', colorName: 'Trắng vón', hexCode: '#ffffff', state: 'kết tủa', notesVi: 'Hóa xám đen ngoài ánh sáng do giải phóng bạc mịn kim loại' },
  { nameVi: 'Bạc bromua', formula: 'AgBr', colorName: 'Vàng nhạt', hexCode: '#fef08a', state: 'kết tủa', notesVi: 'Dùng tráng phim ảnh' },
  { nameVi: 'Bạc iotua', formula: 'AgI', colorName: 'Vàng đậm', hexCode: '#facc15', state: 'kết tủa', notesVi: 'Không tan trong NH₃ loãng' },
  { nameVi: 'Chì(II) iotua', formula: 'PbI₂', colorName: 'Vàng tươi lấp lánh (Mưa vàng)', hexCode: '#eab308', state: 'kết tủa', notesVi: 'Tan khi đun sôi, kết tinh dạng vảy vàng óng khi nguội' },
  { nameVi: 'Bạc photphat', formula: 'Ag₃PO₄', colorName: 'Vàng tươi', hexCode: '#f59e0b', state: 'kết tủa', notesVi: 'Tan được trong axit nitric HNO₃' },
  { nameVi: 'Đồng(I) oxit', formula: 'Cu₂O', colorName: 'Đỏ gạch', hexCode: '#dc2626', state: 'kết tủa', notesVi: 'Sản phẩm phản ứng anđehit/glucozo với Cu(OH)₂ khi đun nóng' },
  { nameVi: 'Chì sunfua / Bạc sunfua / Đồng sunfua', formula: 'PbS / Ag₂S / CuS', colorName: 'Đen tuyền', hexCode: '#09090b', state: 'kết tủa', notesVi: 'Kết tủa sunfua kim loại nặng không tan trong axit HCl loãng' },
  { nameVi: 'Khí Nitơ đioxit', formula: 'NO₂', colorName: 'Nâu đỏ', hexCode: '#b45309', state: 'chất khí', notesVi: 'Mùi hắc độc, sinh ra khi Cu tác dụng với HNO₃ đặc' },
  { nameVi: 'Khí Clo', formula: 'Cl₂', colorName: 'Vàng lục', hexCode: '#a3e635', state: 'chất khí', notesVi: 'Khí mùi xốc, nặng hơn không khí, độc' }
];

export interface FormulaSummary {
  nameVi: string;
  grade: '10' | '11' | '12';
  latex: string;
  explanationVi: string;
  exampleVi: string;
}

export const CORE_FORMULAS: FormulaSummary[] = [
  {
    nameVi: 'Số mol theo khối lượng & thể tích khí chuẩn (25°C, 1 bar)',
    grade: '10',
    latex: 'n = \\frac{m}{M} = \\frac{V}{24.79}',
    explanationVi: 'Theo chương trình SGK mới (KHTN / Hóa học 10-12), ở điều kiện chuẩn (25°C, 1 bar), 1 mol khí bất kỳ chiếm 24.79 lít (thay cho 22.4 lít ở ĐKTC cũ 0°C, 1 atm).',
    exampleVi: '4.958 lít khí O₂ tương ứng với n = 4.958 / 24.79 = 0.2 mol.'
  },
  {
    nameVi: 'Định luật bảo toàn Electron (Oxi hóa - Khử)',
    grade: '10',
    latex: '\\sum n_{e\\text{ nhường}} = \\sum n_{e\\text{ nhận}}',
    explanationVi: 'Tổng số mol electron mà chất khử nhường bằng tổng số mol electron mà chất oxi hóa nhận.',
    exampleVi: 'Kim loại M nhường: n(e) = a × n(M); N⁺⁵ nhận: n(e) = 3n(NO) + n(NO₂) + 8n(N₂O) + 10n(N₂) + 8n(NH₄⁺).'
  },
  {
    nameVi: 'Độ pH của dung dịch & Tích số ion của nước',
    grade: '11',
    latex: '\\text{pH} = -\\lg[\\text{H}^+], \\quad K_w = [\\text{H}^+][\\text{OH}^-] = 10^{-14} \\text{ (ở 25°C)} \\implies \\text{pH} + \\text{pOH} = 14',
    explanationVi: 'pH đo nồng độ ion H⁺ trong dung dịch: pH < 7 môi trường axit, pH = 7 trung tính, pH > 7 môi trường bazơ/kiềm.',
    exampleVi: 'Dung dịch HCl 0.001 M có [H⁺] = 10⁻³ M ⇒ pH = -lg(10⁻³) = 3.0.'
  },
  {
    nameVi: 'Suất điện động chuẩn của pin điện hóa (E°pin)',
    grade: '12',
    latex: 'E^\\circ_{\\text{pin}} = E^\\circ_{\\text{catot (+) (cực dương)}} - E^\\circ_{\\text{anot (-) (cực âm)}} > 0',
    explanationVi: 'Suất điện động của pin luôn là giá trị dương. Catot xảy ra quá trình khử (cặp có E° lớn hơn), anot xảy ra quá trình oxi hóa (cặp có E° nhỏ hơn).',
    exampleVi: 'Pin Daniell Zn-Cu: E°pin = E°(Cu²⁺/Cu) - E°(Zn²⁺/Zn) = (+0.34V) - (-0.76V) = +1.10 V.'
  },
  {
    nameVi: 'Định luật Faraday về điện phân',
    grade: '12',
    latex: 'm = \\frac{A \\cdot I \\cdot t}{n \\cdot F}',
    explanationVi: 'A: khối lượng mol (g/mol); I: cường độ dòng điện (Ampe); t: thời gian điện phân (giây); n: số electron trao đổi; F: hằng số Faraday (96485 C/mol).',
    exampleVi: 'Điện phân dd CuSO₄ (Cu²⁺ + 2e → Cu) với I = 5A trong 1930s: m = (64 × 5 × 1930) / (2 × 96485) = 3.2 gam.'
  }
];
