export interface ChemicalReaction {
  id: string;
  reactantsStr: string;
  productsStr: string;
  balancedEquation: string;
  ionicEquation?: string;
  netIonicEquation?: string;
  typeVi: string;
  grade: '10' | '11' | '12';
  conditionsVi?: string;
  notesVi?: string;
  coefficients: {
    reactants: { formula: string; coeff: number }[];
    products: { formula: string; coeff: number }[];
  };
}

export const PRESET_REACTIONS: ChemicalReaction[] = [
  {
    id: 'nhiet-nhom',
    reactantsStr: 'Al + Fe3O4',
    productsStr: 'Al2O3 + Fe',
    balancedEquation: '8Al + 3Fe₃O₄ → 4Al₂O₃ + 9Fe',
    typeVi: 'Phản ứng nhiệt nhôm · Oxi hóa - Khử',
    grade: '12',
    conditionsVi: 'Nhiệt độ cao (t° > 2000°C), mồi lửa bằng hỗn hợp BaO₂ + Mg',
    notesVi: 'Tỏa nhiệt cực lớn, dùng để hàn đường ray xe lửa tại chỗ.',
    coefficients: {
      reactants: [{ formula: 'Al', coeff: 8 }, { formula: 'Fe3O4', coeff: 3 }],
      products: [{ formula: 'Al2O3', coeff: 4 }, { formula: 'Fe', coeff: 9 }]
    }
  },
  {
    id: 'cu-hno3-loang',
    reactantsStr: 'Cu + HNO3',
    productsStr: 'Cu(NO3)2 + NO + H2O',
    balancedEquation: '3Cu + 8HNO₃ → 3Cu(NO₃)₂ + 2NO↑ + 4H₂O',
    ionicEquation: '3Cu + 8H⁺ + 8NO₃⁻ → 3Cu²⁺ + 6NO₃⁻ + 2NO↑ + 4H₂O',
    netIonicEquation: '3Cu + 8H⁺ + 2NO₃⁻ → 3Cu²⁺ + 2NO↑ + 4H₂O',
    typeVi: 'Oxi hóa - Khử với axit có tính oxi hóa',
    grade: '11',
    conditionsVi: 'Dung dịch HNO₃ loãng, nhiệt độ phòng',
    notesVi: 'Khí NO không màu bay ra gặp oxi không khí hóa nâu đỏ thành NO₂.',
    coefficients: {
      reactants: [{ formula: 'Cu', coeff: 3 }, { formula: 'HNO3', coeff: 8 }],
      products: [{ formula: 'Cu(NO3)2', coeff: 3 }, { formula: 'NO', coeff: 2 }, { formula: 'H2O', coeff: 4 }]
    }
  },
  {
    id: 'kmno4-hcl',
    reactantsStr: 'KMnO4 + HCl',
    productsStr: 'KCl + MnCl2 + Cl2 + H2O',
    balancedEquation: '2KMnO₄ + 16HCl → 2KCl + 2MnCl₂ + 5Cl₂↑ + 8H₂O',
    typeVi: 'Điều chế khí Clo trong phòng thí nghiệm',
    grade: '10',
    conditionsVi: 'HCl đặc, đun nóng nhẹ',
    notesVi: 'KMnO₄ là chất oxi hóa mạnh, oxi hóa Cl⁻ trong HCl thành khí Cl₂ màu vàng lục mùi xốc.',
    coefficients: {
      reactants: [{ formula: 'KMnO4', coeff: 2 }, { formula: 'HCl', coeff: 16 }],
      products: [{ formula: 'KCl', coeff: 2 }, { formula: 'MnCl2', coeff: 2 }, { formula: 'Cl2', coeff: 5 }, { formula: 'H2O', coeff: 8 }]
    }
  },
  {
    id: 'fe-h2so4-dac',
    reactantsStr: 'Fe + H2SO4',
    productsStr: 'Fe2(SO4)3 + SO2 + H2O',
    balancedEquation: '2Fe + 6H₂SO₄ (đặc, nóng) → Fe₂(SO₄)₃ + 3SO₂↑ + 6H₂O',
    typeVi: 'Oxi hóa - Khử kim loại với H₂SO₄ đặc',
    grade: '10',
    conditionsVi: 'H₂SO₄ đặc, đun nóng (Fe bị thụ động trong H₂SO₄ đặc nguội)',
    notesVi: 'Sinh khí SO₂ mùi hắc làm mất màu cánh hoa hồng và dung dịch brom.',
    coefficients: {
      reactants: [{ formula: 'Fe', coeff: 2 }, { formula: 'H2SO4', coeff: 6 }],
      products: [{ formula: 'Fe2(SO4)3', coeff: 1 }, { formula: 'SO2', coeff: 3 }, { formula: 'H2O', coeff: 6 }]
    }
  },
  {
    id: 'caco3-hcl',
    reactantsStr: 'CaCO3 + HCl',
    productsStr: 'CaCl2 + CO2 + H2O',
    balancedEquation: 'CaCO₃ + 2HCl → CaCl₂ + CO₂↑ + H₂O',
    netIonicEquation: 'CaCO₃ + 2H⁺ → Ca²⁺ + CO₂↑ + H₂O',
    typeVi: 'Phản ứng trao đổi ion tạo khí',
    grade: '11',
    conditionsVi: 'Nhiệt độ phòng',
    notesVi: 'Khí CO₂ sinh ra làm vẩn đục nước vôi trong Ca(OH)₂.',
    coefficients: {
      reactants: [{ formula: 'CaCO3', coeff: 1 }, { formula: 'HCl', coeff: 2 }],
      products: [{ formula: 'CaCl2', coeff: 1 }, { formula: 'CO2', coeff: 1 }, { formula: 'H2O', coeff: 1 }]
    }
  },
  {
    id: 'este-hoa',
    reactantsStr: 'CH3COOH + C2H5OH',
    productsStr: 'CH3COOC2H5 + H2O',
    balancedEquation: 'CH₃COOH + C₂H₅OH ⇄ CH₃COOC₂H₅ + H₂O',
    typeVi: 'Phản ứng este hóa (Thuận nghịch)',
    grade: '12',
    conditionsVi: 'H₂SO₄ đặc xúc tác, đun sôi nhẹ (65-70°C)',
    notesVi: 'Etyl axetat CH₃COOC₂H₅ có mùi thơm hoa quả đặc trưng, nhẹ hơn nước và ít tan.',
    coefficients: {
      reactants: [{ formula: 'CH3COOH', coeff: 1 }, { formula: 'C2H5OH', coeff: 1 }],
      products: [{ formula: 'CH3COOC2H5', coeff: 1 }, { formula: 'H2O', coeff: 1 }]
    }
  },
  {
    id: 'len-men-ruou',
    reactantsStr: 'C6H12O6',
    productsStr: 'C2H5OH + CO2',
    balancedEquation: 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂↑',
    typeVi: 'Lên men sinh hóa',
    grade: '12',
    conditionsVi: 'Men rượu zymase, nhiệt độ 30-35°C',
    notesVi: 'Cơ sở của công nghệ sản xuất rượu vang, bia và cồn sinh học bio-ethanol.',
    coefficients: {
      reactants: [{ formula: 'C6H12O6', coeff: 1 }],
      products: [{ formula: 'C2H5OH', coeff: 2 }, { formula: 'CO2', coeff: 2 }]
    }
  }
];
