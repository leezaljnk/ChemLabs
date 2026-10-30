export interface SolubilityCell {
  status: 'T' | 'K' | 'I' | '-';
  label: string;
  color?: string; // color description
  hexBg?: string; // visual color preview for precipitates
  notes?: string;
}

export const CATIONS = [
  { id: 'H', formula: 'H⁺', name: 'Hiđro' },
  { id: 'Na', formula: 'Na⁺', name: 'Natri' },
  { id: 'K', formula: 'K⁺', name: 'Kali' },
  { id: 'NH4', formula: 'NH₄⁺', name: 'Amoni' },
  { id: 'Ag', formula: 'Ag⁺', name: 'Bạc' },
  { id: 'Mg', formula: 'Mg²⁺', name: 'Magie' },
  { id: 'Ca', formula: 'Ca²⁺', name: 'Canxi' },
  { id: 'Ba', formula: 'Ba²⁺', name: 'Bari' },
  { id: 'Zn', formula: 'Zn²⁺', name: 'Kẽm' },
  { id: 'Fe2', formula: 'Fe²⁺', name: 'Sắt (II)' },
  { id: 'Fe3', formula: 'Fe³⁺', name: 'Sắt (III)' },
  { id: 'Cu', formula: 'Cu²⁺', name: 'Đồng (II)' },
  { id: 'Al', formula: 'Al³⁺', name: 'Nhôm' },
  { id: 'Pb', formula: 'Pb²⁺', name: 'Chì (II)' }
];

export const ANIONS = [
  { id: 'OH', formula: 'OH⁻', name: 'Hiđroxit' },
  { id: 'NO3', formula: 'NO₃⁻', name: 'Nitrat' },
  { id: 'Cl', formula: 'Cl⁻', name: 'Clorua' },
  { id: 'Br', formula: 'Br⁻', name: 'Bromua' },
  { id: 'I', formula: 'I⁻', name: 'Iotua' },
  { id: 'SO4', formula: 'SO₄²⁻', name: 'Sunfat' },
  { id: 'CO3', formula: 'CO₃²⁻', name: 'Cacbonat' },
  { id: 'SO3', formula: 'SO₃²⁻', name: 'Sunfit' },
  { id: 'S', formula: 'S²⁻', name: 'Sunfua' },
  { id: 'PO4', formula: 'PO₄³⁻', name: 'Photphat' },
  { id: 'CH3COO', formula: 'CH₃COO⁻', name: 'Axetat' }
];

export const SOLUBILITY_MATRIX: Record<string, Record<string, SolubilityCell>> = {
  H: {
    OH: { status: 'T', label: 'Tan (Nước H₂O)' },
    NO3: { status: 'T', label: 'Tan (HNO₃)' },
    Cl: { status: 'T', label: 'Tan (HCl axit clohiđric)' },
    Br: { status: 'T', label: 'Tan (HBr)' },
    I: { status: 'T', label: 'Tan (HI)' },
    SO4: { status: 'T', label: 'Tan (H₂SO₄ axit sunfuric)' },
    CO3: { status: 'T', label: 'Kém bền, phân hủy thành CO₂↑ + H₂O' },
    SO3: { status: 'T', label: 'Kém bền, phân hủy thành SO₂↑ + H₂O' },
    S: { status: 'T', label: 'Tan khí H₂S mùi trứng thối' },
    PO4: { status: 'T', label: 'Tan (H₃PO₄)' },
    CH3COO: { status: 'T', label: 'Tan (CH₃COOH)' }
  },
  Na: {
    OH: { status: 'T', label: 'Tan (Kiềm NaOH)' },
    NO3: { status: 'T', label: 'Tan' },
    Cl: { status: 'T', label: 'Tan (Muối ăn NaCl)' },
    Br: { status: 'T', label: 'Tan' },
    I: { status: 'T', label: 'Tan' },
    SO4: { status: 'T', label: 'Tan' },
    CO3: { status: 'T', label: 'Tan' },
    SO3: { status: 'T', label: 'Tan' },
    S: { status: 'T', label: 'Tan' },
    PO4: { status: 'T', label: 'Tan' },
    CH3COO: { status: 'T', label: 'Tan' }
  },
  K: {
    OH: { status: 'T', label: 'Tan (Kiềm KOH)' },
    NO3: { status: 'T', label: 'Tan' },
    Cl: { status: 'T', label: 'Tan' },
    Br: { status: 'T', label: 'Tan' },
    I: { status: 'T', label: 'Tan' },
    SO4: { status: 'T', label: 'Tan' },
    CO3: { status: 'T', label: 'Tan' },
    SO3: { status: 'T', label: 'Tan' },
    S: { status: 'T', label: 'Tan' },
    PO4: { status: 'T', label: 'Tan' },
    CH3COO: { status: 'T', label: 'Tan' }
  },
  NH4: {
    OH: { status: 'T', label: 'Tan (Kém bền: NH₃↑ + H₂O)' },
    NO3: { status: 'T', label: 'Tan' },
    Cl: { status: 'T', label: 'Tan' },
    Br: { status: 'T', label: 'Tan' },
    I: { status: 'T', label: 'Tan' },
    SO4: { status: 'T', label: 'Tan' },
    CO3: { status: 'T', label: 'Tan' },
    SO3: { status: 'T', label: 'Tan' },
    S: { status: 'T', label: 'Tan' },
    PO4: { status: 'T', label: 'Tan' },
    CH3COO: { status: 'T', label: 'Tan' }
  },
  Ag: {
    OH: { status: '-', label: 'Không tồn tại, phân hủy thành Ag₂O đen', hexBg: '#332924' },
    NO3: { status: 'T', label: 'Tan (AgNO₃)' },
    Cl: { status: 'K', label: 'Kết tủa trắng', color: 'Trắng', hexBg: '#ffffff', notes: 'Hóa đen ngoài ánh sáng: 2AgCl → 2Ag + Cl₂' },
    Br: { status: 'K', label: 'Kết tủa vàng nhạt', color: 'Vàng nhạt', hexBg: '#fef08a' },
    I: { status: 'K', label: 'Kết tủa vàng đậm', color: 'Vàng đậm', hexBg: '#facc15' },
    SO4: { status: 'I', label: 'Ít tan (Ag₂SO₄)' },
    CO3: { status: 'K', label: 'Kết tủa vàng xám' },
    SO3: { status: 'K', label: 'Kết tủa trắng' },
    S: { status: 'K', label: 'Kết tủa đen (Ag₂S)', color: 'Đen', hexBg: '#18181b', notes: 'Rất bền không tan trong axit loãng' },
    PO4: { status: 'K', label: 'Kết tủa vàng tươi (Ag₃PO₄)', color: 'Vàng tươi', hexBg: '#f59e0b' },
    CH3COO: { status: 'T', label: 'Tan' }
  },
  Mg: {
    OH: { status: 'K', label: 'Kết tủa trắng Mg(OH)₂', color: 'Trắng', hexBg: '#ffffff' },
    NO3: { status: 'T', label: 'Tan' },
    Cl: { status: 'T', label: 'Tan' },
    Br: { status: 'T', label: 'Tan' },
    I: { status: 'T', label: 'Tan' },
    SO4: { status: 'T', label: 'Tan' },
    CO3: { status: 'K', label: 'Kết tủa trắng (MgCO₃)', color: 'Trắng', hexBg: '#ffffff' },
    SO3: { status: 'I', label: 'Ít tan' },
    S: { status: '-', label: 'Bị thủy phân trong nước' },
    PO4: { status: 'K', label: 'Kết tủa trắng' },
    CH3COO: { status: 'T', label: 'Tan' }
  },
  Ca: {
    OH: { status: 'I', label: 'Ít tan (Nước vôi trong Ca(OH)₂)', notes: 'Dung dịch làm đục khi sục khí CO₂' },
    NO3: { status: 'T', label: 'Tan' },
    Cl: { status: 'T', label: 'Tan' },
    Br: { status: 'T', label: 'Tan' },
    I: { status: 'T', label: 'Tan' },
    SO4: { status: 'I', label: 'Ít tan (Thạch cao CaSO₄)', notes: 'Chất gây độ cứng vĩnh cửu của nước' },
    CO3: { status: 'K', label: 'Kết tủa trắng (Đá vôi CaCO₃)', color: 'Trắng', hexBg: '#ffffff' },
    SO3: { status: 'K', label: 'Kết tủa trắng (CaSO₃)', color: 'Trắng', hexBg: '#ffffff' },
    S: { status: '-', label: 'Bị thủy phân trong nước' },
    PO4: { status: 'K', label: 'Kết tủa trắng Ca₃(PO₄)₂' },
    CH3COO: { status: 'T', label: 'Tan' }
  },
  Ba: {
    OH: { status: 'T', label: 'Tan (Kiềm mạnh Ba(OH)₂)' },
    NO3: { status: 'T', label: 'Tan' },
    Cl: { status: 'T', label: 'Tan (BaCl₂)' },
    Br: { status: 'T', label: 'Tan' },
    I: { status: 'T', label: 'Tan' },
    SO4: { status: 'K', label: 'Kết tủa trắng siêu bền BaSO₄', color: 'Trắng', hexBg: '#ffffff', notes: 'Không tan trong cả axit mạnh HCl, HNO₃ loãng' },
    CO3: { status: 'K', label: 'Kết tủa trắng (BaCO₃)', color: 'Trắng', hexBg: '#ffffff' },
    SO3: { status: 'K', label: 'Kết tủa trắng (BaSO₃)', color: 'Trắng', hexBg: '#ffffff' },
    S: { status: 'T', label: 'Tan' },
    PO4: { status: 'K', label: 'Kết tủa trắng Ba₃(PO₄)₂' },
    CH3COO: { status: 'T', label: 'Tan' }
  },
  Zn: {
    OH: { status: 'K', label: 'Kết tủa trắng lưỡng tính Zn(OH)₂', color: 'Trắng', hexBg: '#ffffff', notes: 'Tan trong axit và kiềm dư' },
    NO3: { status: 'T', label: 'Tan' },
    Cl: { status: 'T', label: 'Tan' },
    Br: { status: 'T', label: 'Tan' },
    I: { status: 'T', label: 'Tan' },
    SO4: { status: 'T', label: 'Tan' },
    CO3: { status: 'K', label: 'Kết tủa trắng (ZnCO₃)' },
    SO3: { status: 'K', label: 'Kết tủa trắng' },
    S: { status: 'K', label: 'Kết tủa trắng (ZnS)', color: 'Trắng', hexBg: '#ffffff', notes: 'Muối sunfua kim loại duy nhất màu trắng' },
    PO4: { status: 'K', label: 'Kết tủa trắng' },
    CH3COO: { status: 'T', label: 'Tan' }
  },
  Fe2: {
    OH: { status: 'K', label: 'Kết tủa trắng xanh Fe(OH)₂', color: 'Trắng xanh', hexBg: '#a7f3d0', notes: 'Hóa nâu đỏ ngoài không khí do tạo Fe(OH)₃' },
    NO3: { status: 'T', label: 'Tan' },
    Cl: { status: 'T', label: 'Tan' },
    Br: { status: 'T', label: 'Tan' },
    I: { status: 'T', label: 'Tan' },
    SO4: { status: 'T', label: 'Tan (FeSO₄)' },
    CO3: { status: 'K', label: 'Kết tủa trắng xám (FeCO₃)' },
    SO3: { status: 'K', label: 'Kết tủa trắng' },
    S: { status: 'K', label: 'Kết tủa đen (FeS)', color: 'Đen', hexBg: '#1e293b', notes: 'Tan trong dung dịch HCl: FeS + 2HCl → FeCl₂ + H₂S↑' },
    PO4: { status: 'K', label: 'Kết tủa trắng' },
    CH3COO: { status: 'T', label: 'Tan' }
  },
  Fe3: {
    OH: { status: 'K', label: 'Kết tủa nâu đỏ Fe(OH)₃', color: 'Nâu đỏ', hexBg: '#991b1b' },
    NO3: { status: 'T', label: 'Tan (Dung dịch màu vàng nâu)' },
    Cl: { status: 'T', label: 'Tan (FeCl₃)' },
    Br: { status: 'T', label: 'Tan' },
    I: { status: '-', label: 'Không tồn tại (Fe³⁺ oxi hóa I⁻ thành I₂: 2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂)' },
    SO4: { status: 'T', label: 'Tan' },
    CO3: { status: '-', label: 'Bị thủy phân: 2Fe³⁺ + 3CO₃²⁻ + 3H₂O → 2Fe(OH)₃↓ + 3CO₂↑' },
    SO3: { status: '-', label: 'Bị thủy phân tạo Fe(OH)₃↓ + SO₂↑' },
    S: { status: '-', label: 'Phân hủy / oxi hóa khử' },
    PO4: { status: 'K', label: 'Kết tủa vàng trắng FePO₄' },
    CH3COO: { status: 'T', label: 'Tan' }
  },
  Cu: {
    OH: { status: 'K', label: 'Kết tủa xanh lam Cu(OH)₂', color: 'Xanh lam', hexBg: '#0284c7', notes: 'Tan trong dung dịch đường đa (glucozo, saccarozo, glixerol) tạo phức xanh lam thẫm' },
    NO3: { status: 'T', label: 'Tan (Dung dịch xanh lam)' },
    Cl: { status: 'T', label: 'Tan (CuCl₂ dung dịch màu xanh)' },
    Br: { status: 'T', label: 'Tan' },
    I: { status: '-', label: 'Bị phân hủy thành CuI kết tủa trắng + I₂' },
    SO4: { status: 'T', label: 'Tan (CuSO₄ dung dịch xanh lam)' },
    CO3: { status: 'K', label: 'Kết tủa xanh lục (CuCO₃ / Malachite)' },
    SO3: { status: 'K', label: 'Kết tủa' },
    S: { status: 'K', label: 'Kết tủa đen CuS', color: 'Đen', hexBg: '#0f172a', notes: 'Không tan trong axit HCl, H₂SO₄ loãng' },
    PO4: { status: 'K', label: 'Kết tủa xanh lục Cu₃(PO₄)₂' },
    CH3COO: { status: 'T', label: 'Tan' }
  },
  Al: {
    OH: { status: 'K', label: 'Kết tủa keo trắng Al(OH)₃', color: 'Keo trắng', hexBg: '#f1f5f9', notes: 'Lưỡng tính, tan trong axit và bazơ kiềm mạnh' },
    NO3: { status: 'T', label: 'Tan' },
    Cl: { status: 'T', label: 'Tan' },
    Br: { status: 'T', label: 'Tan' },
    I: { status: 'T', label: 'Tan' },
    SO4: { status: 'T', label: 'Tan (Phèn chua Al₂(SO₄)₃)' },
    CO3: { status: '-', label: 'Bị thủy phân: 2Al³⁺ + 3CO₃²⁻ + 3H₂O → 2Al(OH)₃↓ + 3CO₂↑' },
    SO3: { status: '-', label: 'Bị thủy phân' },
    S: { status: '-', label: 'Bị thủy phân tạo Al(OH)₃↓ + H₂S↑' },
    PO4: { status: 'K', label: 'Kết tủa trắng AlPO₄' },
    CH3COO: { status: 'T', label: 'Tan' }
  },
  Pb: {
    OH: { status: 'K', label: 'Kết tủa trắng lưỡng tính Pb(OH)₂', color: 'Trắng', hexBg: '#ffffff' },
    NO3: { status: 'T', label: 'Tan (Pb(NO₃)₂)' },
    Cl: { status: 'I', label: 'Ít tan trong nước lạnh (PbCl₂), tan trong nước sôi' },
    Br: { status: 'I', label: 'Ít tan (PbBr₂)' },
    I: { status: 'K', label: 'Kết tủa vàng tươi óng ánh PbI₂ (Mưa vàng)', color: 'Vàng tươi', hexBg: '#eab308', notes: 'Tan khi đun sôi, khi nguội kết tinh lấp lánh như vảy vàng' },
    SO4: { status: 'K', label: 'Kết tủa trắng PbSO₄', color: 'Trắng', hexBg: '#ffffff' },
    CO3: { status: 'K', label: 'Kết tủa trắng' },
    SO3: { status: 'K', label: 'Kết tủa trắng' },
    S: { status: 'K', label: 'Kết tủa đen PbS', color: 'Đen', hexBg: '#09090b', notes: 'Không tan trong axit loãng, nhận biết khí H₂S bằng quỳ tẩm Pb(NO₃)₂' },
    PO4: { status: 'K', label: 'Kết tủa trắng' },
    CH3COO: { status: 'T', label: 'Tan' }
  }
};
