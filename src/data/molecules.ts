export interface Atom3D {
  id: string;
  element: string;
  x: number; // in angstroms or normalized units
  y: number;
  z: number;
  radius: number;
  color: string;
  label: string;
}

export interface Bond3D {
  from: number; // atom index
  to: number;   // atom index
  order: 1 | 2 | 3;
}

export interface MoleculeData {
  id: string;
  nameVi: string;
  formula: string;
  vseprGeometry: string;
  hybridization: string;
  bondAngle: string;
  polarityVi: string;
  descriptionVi: string;
  atoms: Atom3D[];
  bonds: Bond3D[];
}

export const MOLECULES_LIBRARY: MoleculeData[] = [
  {
    id: 'h2o',
    nameVi: 'Nước (Water)',
    formula: 'H₂O',
    vseprGeometry: 'Gấp khúc (Bent - AX₂E₂)',
    hybridization: 'sp³',
    bondAngle: '104.5°',
    polarityVi: 'Phân cực mạnh (μ = 1.85 D)',
    descriptionVi: 'Oxi có 2 cặp electron tự do đẩy mạnh 2 liên kết O-H khiến góc liên kết bị co từ 109.5° xuống 104.5°. Nước là dung môi phân cực tuyệt vời cho sự sống.',
    atoms: [
      { id: 'O1', element: 'O', x: 0, y: 0.1, z: 0, radius: 26, color: '#ef4444', label: 'O' },
      { id: 'H1', element: 'H', x: -0.85, y: -0.55, z: 0, radius: 15, color: '#f8fafc', label: 'H' },
      { id: 'H2', element: 'H', x: 0.85, y: -0.55, z: 0, radius: 15, color: '#f8fafc', label: 'H' }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 }
    ]
  },
  {
    id: 'ch4',
    nameVi: 'Metan (Methane)',
    formula: 'CH₄',
    vseprGeometry: 'Tứ diện đều (Tetrahedral - AX₄)',
    hybridization: 'sp³',
    bondAngle: '109.5°',
    polarityVi: 'Không phân cực (μ = 0)',
    descriptionVi: 'Nguyên tử cacbon lai hóa sp³ ở tâm tứ diện đều, 4 liên kết C-H hướng về 4 đỉnh với góc chuẩn 109.5°. Khí thiên nhiên không màu, cháy tỏa nhiều nhiệt.',
    atoms: [
      { id: 'C1', element: 'C', x: 0, y: 0, z: 0, radius: 28, color: '#475569', label: 'C' },
      { id: 'H1', element: 'H', x: 0, y: 1.1, z: 0, radius: 15, color: '#f8fafc', label: 'H' },
      { id: 'H2', element: 'H', x: 1.03, y: -0.36, z: 0, radius: 15, color: '#f8fafc', label: 'H' },
      { id: 'H3', element: 'H', x: -0.51, y: -0.36, z: 0.89, radius: 15, color: '#f8fafc', label: 'H' },
      { id: 'H4', element: 'H', x: -0.51, y: -0.36, z: -0.89, radius: 15, color: '#f8fafc', label: 'H' }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 }
    ]
  },
  {
    id: 'co2',
    nameVi: 'Cacbon đioxit (Carbon Dioxide)',
    formula: 'CO₂',
    vseprGeometry: 'Đường thẳng (Linear - AX₂)',
    hybridization: 'sp',
    bondAngle: '180°',
    polarityVi: 'Không phân cực (2 momen lưỡng cực triệt tiêu lẫn nhau)',
    descriptionVi: 'Cacbon lai hóa sp tạo 2 liên kết đôi đối xứng O=C=O theo một đường thẳng góc 180°. Khí gây hiệu ứng nhà kính chính.',
    atoms: [
      { id: 'C1', element: 'C', x: 0, y: 0, z: 0, radius: 28, color: '#475569', label: 'C' },
      { id: 'O1', element: 'O', x: -1.2, y: 0, z: 0, radius: 26, color: '#ef4444', label: 'O' },
      { id: 'O2', element: 'O', x: 1.2, y: 0, z: 0, radius: 26, color: '#ef4444', label: 'O' }
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 2 }
    ]
  },
  {
    id: 'nh3',
    nameVi: 'Amoniac (Ammonia)',
    formula: 'NH₃',
    vseprGeometry: 'Chóp tam giác (Trigonal Pyramidal - AX₃E)',
    hybridization: 'sp³',
    bondAngle: '107°',
    polarityVi: 'Phân cực (μ = 1.47 D)',
    descriptionVi: 'Nitơ còn 1 cặp electron tự do không liên kết ở đỉnh chóp đẩy 3 liên kết N-H làm góc thu hẹp còn 107°. Dễ tan trong nước tạo môi trường bazơ yếu.',
    atoms: [
      { id: 'N1', element: 'N', x: 0, y: 0.35, z: 0, radius: 26, color: '#3b82f6', label: 'N' },
      { id: 'H1', element: 'H', x: 0.94, y: -0.2, z: 0, radius: 15, color: '#f8fafc', label: 'H' },
      { id: 'H2', element: 'H', x: -0.47, y: -0.2, z: 0.81, radius: 15, color: '#f8fafc', label: 'H' },
      { id: 'H3', element: 'H', x: -0.47, y: -0.2, z: -0.81, radius: 15, color: '#f8fafc', label: 'H' }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 }
    ]
  },
  {
    id: 'c6h6',
    nameVi: 'Benzen (Benzene)',
    formula: 'C₆H₆',
    vseprGeometry: 'Vòng phẳng lục giác đều (Planar Hexagonal Ring)',
    hybridization: 'sp²',
    bondAngle: '120°',
    polarityVi: 'Không phân cực (μ = 0)',
    descriptionVi: 'Vòng 6 nguyên tử cacbon lai hóa sp² cùng nằm trên một mặt phẳng với hệ liên kết π giải tỏa liên hợp cực kỳ bền vững (nhân thơm). Dễ thế, khó cộng, bền với tác nhân oxi hóa.',
    atoms: [
      { id: 'C1', element: 'C', x: 1.4, y: 0, z: 0, radius: 24, color: '#475569', label: 'C' },
      { id: 'C2', element: 'C', x: 0.7, y: 1.21, z: 0, radius: 24, color: '#475569', label: 'C' },
      { id: 'C3', element: 'C', x: -0.7, y: 1.21, z: 0, radius: 24, color: '#475569', label: 'C' },
      { id: 'C4', element: 'C', x: -1.4, y: 0, z: 0, radius: 24, color: '#475569', label: 'C' },
      { id: 'C5', element: 'C', x: -0.7, y: -1.21, z: 0, radius: 24, color: '#475569', label: 'C' },
      { id: 'C6', element: 'C', x: 0.7, y: -1.21, z: 0, radius: 24, color: '#475569', label: 'C' },
      { id: 'H1', element: 'H', x: 2.3, y: 0, z: 0, radius: 14, color: '#f8fafc', label: 'H' },
      { id: 'H2', element: 'H', x: 1.15, y: 1.99, z: 0, radius: 14, color: '#f8fafc', label: 'H' },
      { id: 'H3', element: 'H', x: -1.15, y: 1.99, z: 0, radius: 14, color: '#f8fafc', label: 'H' },
      { id: 'H4', element: 'H', x: -2.3, y: 0, z: 0, radius: 14, color: '#f8fafc', label: 'H' },
      { id: 'H5', element: 'H', x: -1.15, y: -1.99, z: 0, radius: 14, color: '#f8fafc', label: 'H' },
      { id: 'H6', element: 'H', x: 1.15, y: -1.99, z: 0, radius: 14, color: '#f8fafc', label: 'H' }
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 1, to: 2, order: 1 },
      { from: 2, to: 3, order: 2 },
      { from: 3, to: 4, order: 1 },
      { from: 4, to: 5, order: 2 },
      { from: 5, to: 0, order: 1 },
      { from: 0, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
      { from: 2, to: 8, order: 1 },
      { from: 3, to: 9, order: 1 },
      { from: 4, to: 10, order: 1 },
      { from: 5, to: 11, order: 1 }
    ]
  },
  {
    id: 'c2h5oh',
    nameVi: 'Etanol / Cồn (Ethanol)',
    formula: 'C₂H₅OH',
    vseprGeometry: 'Chuỗi liên kết tứ diện + góc gấp khúc ở nhóm -OH',
    hybridization: 'sp³',
    bondAngle: '109.5° (C) / 104.5° (O)',
    polarityVi: 'Phân cực, tan vô hạn trong nước nhờ liên kết hiđro liên phân tử',
    descriptionVi: 'Ancol no đơn chức có nhóm hiđroxyl (-OH) liên kết trực tiếp với cacbon no. Tác dụng với kim loại kiềm giải phóng H₂.',
    atoms: [
      { id: 'C1', element: 'C', x: -1.1, y: 0, z: 0, radius: 26, color: '#475569', label: 'C' },
      { id: 'C2', element: 'C', x: 0.3, y: 0.4, z: 0, radius: 26, color: '#475569', label: 'C' },
      { id: 'O1', element: 'O', x: 1.2, y: -0.6, z: 0, radius: 25, color: '#ef4444', label: 'O' },
      { id: 'H_o', element: 'H', x: 2.1, y: -0.3, z: 0, radius: 14, color: '#f8fafc', label: 'H' },
      { id: 'H1', element: 'H', x: -1.2, y: -1.0, z: 0, radius: 14, color: '#f8fafc', label: 'H' },
      { id: 'H2', element: 'H', x: -1.7, y: 0.4, z: 0.8, radius: 14, color: '#f8fafc', label: 'H' },
      { id: 'H3', element: 'H', x: -1.7, y: 0.4, z: -0.8, radius: 14, color: '#f8fafc', label: 'H' },
      { id: 'H4', element: 'H', x: 0.4, y: 1.1, z: 0.8, radius: 14, color: '#f8fafc', label: 'H' },
      { id: 'H5', element: 'H', x: 0.4, y: 1.1, z: -0.8, radius: 14, color: '#f8fafc', label: 'H' }
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 1, to: 2, order: 1 },
      { from: 2, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
      { from: 0, to: 5, order: 1 },
      { from: 0, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
      { from: 1, to: 8, order: 1 }
    ]
  }
];
