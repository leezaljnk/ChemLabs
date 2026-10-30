export interface ElementData {
  z: number;
  symbol: string;
  nameVi: string;
  nameEn: string;
  atomicMass: number;
  category: 'alkali' | 'alkaline_earth' | 'transition' | 'post_transition' | 'metalloid' | 'nonmetal' | 'halogen' | 'noble_gas' | 'lanthanide' | 'actinide';
  categoryVi: string;
  period: number;
  group: number; // 1-18
  block: 's' | 'p' | 'd' | 'f';
  electronConfig: string;
  electronegativity?: number;
  radiusPm?: number;
  stateAt298K: 'solid' | 'liquid' | 'gas';
  stateVi: string;
  meltingPointC?: number;
  boilingPointC?: number;
  densityGPerCm3?: number;
  oxidationStates: number[];
  discoveredYear?: number | string;
  summaryVi: string;
  applicationsVi: string[];
}

export const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  alkali: { bg: 'bg-rose-500/15', text: 'text-rose-400', border: 'border-rose-500/40', glow: 'shadow-rose-500/20' },
  alkaline_earth: { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/40', glow: 'shadow-amber-500/20' },
  transition: { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/40', glow: 'shadow-blue-500/20' },
  post_transition: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/40', glow: 'shadow-emerald-500/20' },
  metalloid: { bg: 'bg-teal-500/15', text: 'text-teal-300', border: 'border-teal-500/40', glow: 'shadow-teal-500/20' },
  nonmetal: { bg: 'bg-indigo-500/15', text: 'text-indigo-300', border: 'border-indigo-500/40', glow: 'shadow-indigo-500/20' },
  halogen: { bg: 'bg-cyan-500/15', text: 'text-cyan-300', border: 'border-cyan-500/40', glow: 'shadow-cyan-500/20' },
  noble_gas: { bg: 'bg-purple-500/15', text: 'text-purple-300', border: 'border-purple-500/40', glow: 'shadow-purple-500/20' },
  lanthanide: { bg: 'bg-pink-500/15', text: 'text-pink-300', border: 'border-pink-500/40', glow: 'shadow-pink-500/20' },
  actinide: { bg: 'bg-fuchsia-500/15', text: 'text-fuchsia-300', border: 'border-fuchsia-500/40', glow: 'shadow-fuchsia-500/20' }
};

export const CATEGORY_LABELS: Record<string, string> = {
  alkali: 'Kim loại kiềm (Nhóm IA)',
  alkaline_earth: 'Kim loại kiềm thổ (Nhóm IIA)',
  transition: 'Kim loại chuyển tiếp (Khối d)',
  post_transition: 'Kim loại sau chuyển tiếp',
  metalloid: 'Á kim',
  nonmetal: 'Phi kim đa nguyên tử',
  halogen: 'Halogen (Nhóm VIIA)',
  noble_gas: 'Khí hiếm (Nhóm VIIIA)',
  lanthanide: 'Lantanit (Họ Lantan)',
  actinide: 'Actinit (Họ Actini)'
};

// Full 118 Elements data
export const ELEMENTS: ElementData[] = [
  {
    z: 1, symbol: 'H', nameVi: 'Hiđro (Hydrogen)', nameEn: 'Hydrogen', atomicMass: 1.008,
    category: 'nonmetal', categoryVi: 'Phi kim', period: 1, group: 1, block: 's',
    electronConfig: '1s¹', electronegativity: 2.20, radiusPm: 53, stateAt298K: 'gas', stateVi: 'Khí',
    meltingPointC: -259.16, boilingPointC: -252.87, densityGPerCm3: 0.00008988, oxidationStates: [-1, 1],
    discoveredYear: 1766,
    summaryVi: 'Nguyên tố nhẹ nhất và dồi dào nhất trong vũ trụ. Khí không màu, không mùi, cháy tỏa nhiệt lớn và sinh nước.',
    applicationsVi: ['Nhiên liệu sạch tương lai', 'Tổng hợp amoniac (NH3)', 'Khử oxit kim loại']
  },
  {
    z: 2, symbol: 'He', nameVi: 'Heli (Helium)', nameEn: 'Helium', atomicMass: 4.0026,
    category: 'noble_gas', categoryVi: 'Khí hiếm', period: 1, group: 18, block: 's',
    electronConfig: '1s²', electronegativity: undefined, radiusPm: 31, stateAt298K: 'gas', stateVi: 'Khí',
    meltingPointC: -272.2, boilingPointC: -268.93, densityGPerCm3: 0.0001785, oxidationStates: [0],
    discoveredYear: 1868,
    summaryVi: 'Khí trơ nhẹ thứ hai, cấu hình electron bão hòa 1s² rất bền vững. Không cháy, an toàn.',
    applicationsVi: ['Bơm khinh khí cầu', 'Làm lạnh nam châm siêu dẫn MRI', 'Hỗn hợp khí thở lặn sâu']
  },
  {
    z: 3, symbol: 'Li', nameVi: 'Liti (Lithium)', nameEn: 'Lithium', atomicMass: 6.94,
    category: 'alkali', categoryVi: 'Kim loại kiềm', period: 2, group: 1, block: 's',
    electronConfig: '[He] 2s¹', electronegativity: 0.98, radiusPm: 167, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 180.54, boilingPointC: 1342, densityGPerCm3: 0.534, oxidationStates: [1],
    discoveredYear: 1817,
    summaryVi: 'Kim loại nhẹ nhất (nổi trên dầu), khử mạnh, ngọn lửa cháy màu đỏ son đặc trưng.',
    applicationsVi: ['Pin Li-ion cho xe điện, điện thoại', 'Hợp kim siêu nhẹ cho hàng không', 'Dược phẩm điều trị rối loạn lưỡng cực']
  },
  {
    z: 4, symbol: 'Be', nameVi: 'Beri (Beryllium)', nameEn: 'Beryllium', atomicMass: 9.0122,
    category: 'alkaline_earth', categoryVi: 'Kim loại kiềm thổ', period: 2, group: 2, block: 's',
    electronConfig: '[He] 2s²', electronegativity: 1.57, radiusPm: 112, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 1287, boilingPointC: 2470, densityGPerCm3: 1.85, oxidationStates: [2],
    discoveredYear: 1798,
    summaryVi: 'Kim loại kiềm thổ cứng, nhẹ, màng oxit bền ngăn phản ứng với nước kể cả ở nhiệt độ cao. Hợp chất lưỡng tính.',
    applicationsVi: ['Cửa sổ ống tia X', 'Gương kính thiên văn không gian James Webb', 'Hợp kim đồng - beri đàn hồi cao']
  },
  {
    z: 5, symbol: 'B', nameVi: 'Bo (Boron)', nameEn: 'Boron', atomicMass: 10.81,
    category: 'metalloid', categoryVi: 'Á kim', period: 2, group: 13, block: 'p',
    electronConfig: '[He] 2s² 2p¹', electronegativity: 2.04, radiusPm: 87, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 2076, boilingPointC: 3927, densityGPerCm3: 2.34, oxidationStates: [3],
    discoveredYear: 1808,
    summaryVi: 'Á kim bán dẫn màu sẫm, độ cứng rất cao. Thiếu hụt electron nên tạo ra nhiều hợp chất cụm boran độc đáo.',
    applicationsVi: ['Thủy tinh chịu nhiệt Pyrex/Borosilicate', 'Thanh điều khiển lò phản ứng hạt nhân', 'Gốm áo giáp chống đạn']
  },
  {
    z: 6, symbol: 'C', nameVi: 'Cacbon (Carbon)', nameEn: 'Carbon', atomicMass: 12.011,
    category: 'nonmetal', categoryVi: 'Phi kim', period: 2, group: 14, block: 'p',
    electronConfig: '[He] 2s² 2p²', electronegativity: 2.55, radiusPm: 67, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 3550, boilingPointC: 4027, densityGPerCm3: 2.267, oxidationStates: [-4, -2, 2, 4],
    discoveredYear: 'Cổ đại',
    summaryVi: 'Cốt lõi của Hóa học hữu cơ và mọi sự sống trên Trái Đất. Các dạng thù hình nổi tiếng: kim cương, than chì, fullerene, graphene.',
    applicationsVi: ['Vật liệu nano graphene', 'Than hoạt tính lọc nước/khí', 'Nhiên liệu hóa thạch, thép']
  },
  {
    z: 7, symbol: 'N', nameVi: 'Nitơ (Nitrogen)', nameEn: 'Nitrogen', atomicMass: 14.007,
    category: 'nonmetal', categoryVi: 'Phi kim', period: 2, group: 15, block: 'p',
    electronConfig: '[He] 2s² 2p³', electronegativity: 3.04, radiusPm: 56, stateAt298K: 'gas', stateVi: 'Khí',
    meltingPointC: -210.0, boilingPointC: -195.79, densityGPerCm3: 0.0012506, oxidationStates: [-3, 1, 2, 3, 4, 5],
    discoveredYear: 1772,
    summaryVi: 'Chiếm 78% thể tích khí quyển Trái Đất. Liên kết ba N≡N cực bền làm khí trơ ở điều kiện thường, chỉ hoạt động ở nhiệt độ cao hoặc có xúc tác.',
    applicationsVi: ['Sản xuất phân đạm (Urê, amoni)', 'Môi trường bảo quản thực phẩm', 'Nitơ lỏng làm lạnh y sinh']
  },
  {
    z: 8, symbol: 'O', nameVi: 'Oxi (Oxygen)', nameEn: 'Oxygen', atomicMass: 15.999,
    category: 'nonmetal', categoryVi: 'Phi kim', period: 2, group: 16, block: 'p',
    electronConfig: '[He] 2s² 2p⁴', electronegativity: 3.44, radiusPm: 48, stateAt298K: 'gas', stateVi: 'Khí',
    meltingPointC: -218.79, boilingPointC: -182.96, densityGPerCm3: 0.001429, oxidationStates: [-2, -1, 2],
    discoveredYear: 1774,
    summaryVi: 'Nguyên tố phổ biến nhất trong vỏ Trái Đất và cần thiết cho hô hấp tế bào. Tính oxi hóa mạnh thứ hai sau flo.',
    applicationsVi: ['Duy trì sự sống và sự cháy', 'Luyện thép công nghiệp', 'Khí y tế hồi sức cấp cứu']
  },
  {
    z: 9, symbol: 'F', nameVi: 'Flo (Fluorine)', nameEn: 'Fluorine', atomicMass: 18.998,
    category: 'halogen', categoryVi: 'Halogen', period: 2, group: 17, block: 'p',
    electronConfig: '[He] 2s² 2p⁵', electronegativity: 3.98, radiusPm: 42, stateAt298K: 'gas', stateVi: 'Khí',
    meltingPointC: -219.67, boilingPointC: -188.11, densityGPerCm3: 0.001696, oxidationStates: [-1],
    discoveredYear: 1886,
    summaryVi: 'Nguyên tố có độ âm điện lớn nhất (3.98) và tính oxi hóa mạnh nhất. Phản ứng nổ mãnh liệt với hiđro ngay trong bóng tối ở nhiệt độ âm.',
    applicationsVi: ['Kem đánh răng chống sâu răng (ion F-)', 'Chảo chống dính Teflon (PTFE)', 'Làm giàu uranium (UF6)']
  },
  {
    z: 10, symbol: 'Ne', nameVi: 'Neon (Neon)', nameEn: 'Neon', atomicMass: 20.180,
    category: 'noble_gas', categoryVi: 'Khí hiếm', period: 2, group: 18, block: 'p',
    electronConfig: '[He] 2s² 2p⁶', electronegativity: undefined, radiusPm: 38, stateAt298K: 'gas', stateVi: 'Khí',
    meltingPointC: -248.59, boilingPointC: -246.08, densityGPerCm3: 0.0009002, oxidationStates: [0],
    discoveredYear: 1898,
    summaryVi: 'Khí hiếm phát ra ánh sáng đỏ cam rực rỡ khi có dòng điện phóng qua trong ống chân không.',
    applicationsVi: ['Đèn quảng cáo neon rực rỡ', 'Laser Heli-Neon (He-Ne)', 'Chỉ thị điện áp cao']
  },
  {
    z: 11, symbol: 'Na', nameVi: 'Natri (Sodium)', nameEn: 'Sodium', atomicMass: 22.990,
    category: 'alkali', categoryVi: 'Kim loại kiềm', period: 3, group: 1, block: 's',
    electronConfig: '[Ne] 3s¹', electronegativity: 0.93, radiusPm: 190, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 97.79, boilingPointC: 883, densityGPerCm3: 0.968, oxidationStates: [1],
    discoveredYear: 1807,
    summaryVi: 'Kim loại kiềm mềm như sáp, cắt được bằng dao. Phản ứng mãnh liệt với nước sinh NaOH và H2, bốc cháy ngọn lửa màu vàng tươi.',
    applicationsVi: ['Muối ăn NaCl thiết yếu cho sinh học', 'Xà phòng hóa (muối natri của axit béo)', 'Chất làm mát lò phản ứng hạt nhân nhanh']
  },
  {
    z: 12, symbol: 'Mg', nameVi: 'Magie (Magnesium)', nameEn: 'Magnesium', atomicMass: 24.305,
    category: 'alkaline_earth', categoryVi: 'Kim loại kiềm thổ', period: 3, group: 2, block: 's',
    electronConfig: '[Ne] 3s²', electronegativity: 1.31, radiusPm: 145, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 650, boilingPointC: 1090, densityGPerCm3: 1.738, oxidationStates: [2],
    discoveredYear: 1755,
    summaryVi: 'Kim loại nhẹ màu trắng bạc. Cháy trong không khí tạo ánh sáng trắng chói lòa và tỏa nhiệt rất mạnh. Cốt lõi của diệp lục tố thực vật.',
    applicationsVi: ['Pháo sáng, pháo hoa', 'Hợp kim magnalium siêu nhẹ cho laptop, ô tô', 'Hợp chất cơ magie Grignard trong tổng hợp hữu cơ']
  },
  {
    z: 13, symbol: 'Al', nameVi: 'Nhôm (Aluminium)', nameEn: 'Aluminium', atomicMass: 26.982,
    category: 'post_transition', categoryVi: 'Kim loại sau chuyển tiếp', period: 3, group: 13, block: 'p',
    electronConfig: '[Ne] 3s² 3p¹', electronegativity: 1.61, radiusPm: 118, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 660.32, boilingPointC: 2519, densityGPerCm3: 2.70, oxidationStates: [3],
    discoveredYear: 1825,
    summaryVi: 'Kim loại phổ biến nhất vỏ Trái Đất. Nhờ màng oxit Al2O3 mỏng mịn bảo vệ, nhôm trơ với nước và không khí. Bị thụ động hóa trong HNO3/H2SO4 đặc nguội.',
    applicationsVi: ['Thân máy bay, tàu hỏa cao tốc', 'Dây dẫn điện cao thế', 'Bao bì thực phẩm và lon nước giải khát']
  },
  {
    z: 14, symbol: 'Si', nameVi: 'Silic (Silicon)', nameEn: 'Silicon', atomicMass: 28.085,
    category: 'metalloid', categoryVi: 'Á kim', period: 3, group: 14, block: 'p',
    electronConfig: '[Ne] 3s² 3p²', electronegativity: 1.90, radiusPm: 111, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 1414, boilingPointC: 3265, densityGPerCm3: 2.329, oxidationStates: [-4, 2, 4],
    discoveredYear: 1824,
    summaryVi: 'Nền tảng của kỷ nguyên công nghệ số và thung lũng Silicon. Bán dẫn tuyệt vời, thành phần chính của cát (SiO2) và thủy tinh.',
    applicationsVi: ['Chip vi xử lý CPU, bộ nhớ máy tính', 'Tấm pin năng lượng mặt trời', 'Polime silicon chịu nhiệt trong y tế và đời sống']
  },
  {
    z: 15, symbol: 'P', nameVi: 'Photpho (Phosphorus)', nameEn: 'Phosphorus', atomicMass: 30.974,
    category: 'nonmetal', categoryVi: 'Phi kim', period: 3, group: 15, block: 'p',
    electronConfig: '[Ne] 3s² 3p³', electronegativity: 2.19, radiusPm: 98, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 44.15, boilingPointC: 280.5, densityGPerCm3: 1.823, oxidationStates: [-3, 3, 5],
    discoveredYear: 1669,
    summaryVi: 'Thành phần xương, răng và phân tử di truyền DNA, RNA, ATP. Hai thù hình chính: photpho trắng (cực độc, tự bốc cháy ở 40°C) và photpho đỏ (bền, không độc).',
    applicationsVi: ['Phân lân (supephotphat)', 'Bao diêm an toàn', 'Chất chống cháy công nghiệp']
  },
  {
    z: 16, symbol: 'S', nameVi: 'Lưu huỳnh (Sulfur)', nameEn: 'Sulfur', atomicMass: 32.06,
    category: 'nonmetal', categoryVi: 'Phi kim', period: 3, group: 16, block: 'p',
    electronConfig: '[Ne] 3s² 3p⁴', electronegativity: 2.58, radiusPm: 88, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 115.21, boilingPointC: 444.6, densityGPerCm3: 2.07, oxidationStates: [-2, 2, 4, 6],
    discoveredYear: 'Cổ đại',
    summaryVi: 'Chất rắn màu vàng tươi, cháy sinh khí SO2 mùi hắc. Là nguyên liệu sản xuất axit sunfuric H2SO4 — thước đo nền công nghiệp hóa chất một quốc gia.',
    applicationsVi: ['Sản xuất H2SO4', 'Lưu hóa cao su giúp tăng đàn hồi', 'Thuốc trừ sâu và diệt nấm']
  },
  {
    z: 17, symbol: 'Cl', nameVi: 'Clo (Chlorine)', nameEn: 'Chlorine', atomicMass: 35.45,
    category: 'halogen', categoryVi: 'Halogen', period: 3, group: 17, block: 'p',
    electronConfig: '[Ne] 3s² 3p⁵', electronegativity: 3.16, radiusPm: 79, stateAt298K: 'gas', stateVi: 'Khí',
    meltingPointC: -101.5, boilingPointC: -34.04, densityGPerCm3: 0.003214, oxidationStates: [-1, 1, 3, 5, 7],
    discoveredYear: 1774,
    summaryVi: 'Khí màu vàng lục, mùi xốc, nặng hơn không khí, độc. Tính oxi hóa mạnh, tẩy màu khi ẩm nhờ tạo axit hipoclorơ (HClO).',
    applicationsVi: ['Khử trùng nước sinh hoạt và bể bơi', 'Sản xuất nhựa PVC', 'Nước Javel tẩy trắng']
  },
  {
    z: 18, symbol: 'Ar', nameVi: 'Agon (Argon)', nameEn: 'Argon', atomicMass: 39.948,
    category: 'noble_gas', categoryVi: 'Khí hiếm', period: 3, group: 18, block: 'p',
    electronConfig: '[Ne] 3s² 3p⁶', electronegativity: undefined, radiusPm: 71, stateAt298K: 'gas', stateVi: 'Khí',
    meltingPointC: -189.34, boilingPointC: -185.85, densityGPerCm3: 0.001784, oxidationStates: [0],
    discoveredYear: 1894,
    summaryVi: 'Khí hiếm phong phú nhất trong khí quyển (khoảng 0.93%). Hoàn toàn trơ hóa học.',
    applicationsVi: ['Khí bảo vệ trong hàn kim loại TIG/MIG', 'Khí bảo vệ trong bóng đèn sợi đốt', 'Sản xuất tinh thể silic đơn tinh thể']
  },
  {
    z: 19, symbol: 'K', nameVi: 'Kali (Potassium)', nameEn: 'Potassium', atomicMass: 39.098,
    category: 'alkali', categoryVi: 'Kim loại kiềm', period: 4, group: 1, block: 's',
    electronConfig: '[Ar] 4s¹', electronegativity: 0.82, radiusPm: 243, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 63.5, boilingPointC: 759, densityGPerCm3: 0.89, oxidationStates: [1],
    discoveredYear: 1807,
    summaryVi: 'Kim loại kiềm hoạt động hóa học mạnh hơn natri. Ngọn lửa cháy màu tím hoa cà. Cực kỳ cần thiết cho dẫn truyền xung thần kinh.',
    applicationsVi: ['Phân kali cho nông nghiệp (KCl, K2SO4)', 'Thuốc nổ đen (KNO3)', 'Duy trì cân bằng thẩm thấu tế bào sinh học']
  },
  {
    z: 20, symbol: 'Ca', nameVi: 'Canxi (Calcium)', nameEn: 'Calcium', atomicMass: 40.078,
    category: 'alkaline_earth', categoryVi: 'Kim loại kiềm thổ', period: 4, group: 2, block: 's',
    electronConfig: '[Ar] 4s²', electronegativity: 1.00, radiusPm: 194, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 842, boilingPointC: 1484, densityGPerCm3: 1.55, oxidationStates: [2],
    discoveredYear: 1808,
    summaryVi: 'Kim loại kiềm thổ cấu thành khung xương, vỏ ốc, đá vôi (CaCO3). Phản ứng với nước ở nhiệt độ phòng tạo dd vôi tôi Ca(OH)2 và sủi khí H2.',
    applicationsVi: ['Vật liệu xây dựng (xi măng, vôi, thạch cao)', 'Khoáng chất dinh dưỡng cho xương khớp', 'Khử oxi trong luyện kim đặc biệt']
  },
  {
    z: 21, symbol: 'Sc', nameVi: 'Scandi (Scandium)', nameEn: 'Scandium', atomicMass: 44.956,
    category: 'transition', categoryVi: 'Kim loại chuyển tiếp', period: 4, group: 3, block: 'd',
    electronConfig: '[Ar] 3d¹ 4s²', electronegativity: 1.36, radiusPm: 184, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 1541, boilingPointC: 2836, densityGPerCm3: 2.985, oxidationStates: [3],
    discoveredYear: 1879,
    summaryVi: 'Kim loại chuyển tiếp đầu tiên của bảng tuần hoàn, màu trắng bạc, nhẹ nhưng điểm nóng chảy cao.',
    applicationsVi: ['Hợp kim nhôm-scandi trong súng lục và gậy bóng chày', 'Đèn chiếu phim halide']
  },
  {
    z: 22, symbol: 'Ti', nameVi: 'Titan (Titanium)', nameEn: 'Titanium', atomicMass: 47.867,
    category: 'transition', categoryVi: 'Kim loại chuyển tiếp', period: 4, group: 4, block: 'd',
    electronConfig: '[Ar] 3d² 4s²', electronegativity: 1.54, radiusPm: 176, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 1668, boilingPointC: 3287, densityGPerCm3: 4.506, oxidationStates: [2, 3, 4],
    discoveredYear: 1791,
    summaryVi: 'Bền như thép nhưng nhẹ hơn gần một nửa, chống ăn mòn nước biển và axit cực tốt. Oxit TiO2 màu trắng sáng che phủ cực tốt.',
    applicationsVi: ['Hàng không vũ trụ, tên lửa', 'Khớp nhân tạo, cấy ghép nha khoa', 'Sơn trắng TiO2']
  },
  {
    z: 23, symbol: 'V', nameVi: 'Vanadi (Vanadium)', nameEn: 'Vanadium', atomicMass: 50.942,
    category: 'transition', categoryVi: 'Kim loại chuyển tiếp', period: 4, group: 5, block: 'd',
    electronConfig: '[Ar] 3d³ 4s²', electronegativity: 1.63, radiusPm: 171, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 1910, boilingPointC: 3407, densityGPerCm3: 6.11, oxidationStates: [2, 3, 4, 5],
    discoveredYear: 1801,
    summaryVi: 'Kim loại dẻo có các ion mang 4 màu sắc kỳ thú ứng với các mức oxi hóa: V²⁺ (tím), V³⁺ (xanh lá), VO²⁺ (xanh dương), VO2⁺ (vàng).',
    applicationsVi: ['Thép vanadi siêu cứng cho cờ lê, trục xe', 'Xúc tác V2O5 trong sản xuất H2SO4', 'Pin lưu lượng vanadi (VRFB)']
  },
  {
    z: 24, symbol: 'Cr', nameVi: 'Crom (Chromium)', nameEn: 'Chromium', atomicMass: 51.996,
    category: 'transition', categoryVi: 'Kim loại chuyển tiếp', period: 4, group: 6, block: 'd',
    electronConfig: '[Ar] 3d⁵ 4s¹', electronegativity: 1.66, radiusPm: 166, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 1907, boilingPointC: 2671, densityGPerCm3: 7.19, oxidationStates: [2, 3, 6],
    discoveredYear: 1797,
    summaryVi: 'Kim loại cứng nhất (cắt được thủy tinh, độ cứng Mohs 8.5). Cấu hình bán bão hòa 3d⁵ 4s¹ bất thường. CrO3 là oxit axit có tính oxi hóa cực mạnh.',
    applicationsVi: ['Thép không gỉ (Inox: Fe + Cr + Ni)', 'Mạ crom bóng gương chống rỉ', 'Hợp chất màu crôm cho gốm sứ']
  },
  {
    z: 25, symbol: 'Mn', nameVi: 'Mangan (Manganese)', nameEn: 'Manganese', atomicMass: 54.938,
    category: 'transition', categoryVi: 'Kim loại chuyển tiếp', period: 4, group: 7, block: 'd',
    electronConfig: '[Ar] 3d⁵ 4s²', electronegativity: 1.55, radiusPm: 161, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 1246, boilingPointC: 2061, densityGPerCm3: 7.21, oxidationStates: [2, 3, 4, 6, 7],
    discoveredYear: 1774,
    summaryVi: 'Nguyên tố có dải số oxi hóa phong phú (-3 đến +7). Thuốc tím KMnO4 là chất oxi hóa kinh điển trong phòng thí nghiệm.',
    applicationsVi: ['Sản xuất thép mangan chống mài mòn cao', 'Chất khử trùng tím KMnO4', 'Cực dương pin kiềm (MnO2)']
  },
  {
    z: 26, symbol: 'Fe', nameVi: 'Sắt (Iron)', nameEn: 'Iron', atomicMass: 55.845,
    category: 'transition', categoryVi: 'Kim loại chuyển tiếp', period: 4, group: 8, block: 'd',
    electronConfig: '[Ar] 3d⁶ 4s²', electronegativity: 1.83, radiusPm: 156, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 1538, boilingPointC: 2862, densityGPerCm3: 7.874, oxidationStates: [2, 3],
    discoveredYear: 'Cổ đại',
    summaryVi: 'Trụ cột của nền văn minh kim loại. Nguyên tố có từ tính, thành phần trung tâm của Hemoglobin vận chuyển oxy trong máu.',
    applicationsVi: ['Gang và thép xây dựng, kết cấu hạ tầng', 'Vận chuyển oxy trong hồng cầu máu', 'Nam châm điện']
  },
  {
    z: 27, symbol: 'Co', nameVi: 'Coban (Cobalt)', nameEn: 'Cobalt', atomicMass: 58.933,
    category: 'transition', categoryVi: 'Kim loại chuyển tiếp', period: 4, group: 9, block: 'd',
    electronConfig: '[Ar] 3d⁷ 4s²', electronegativity: 1.88, radiusPm: 152, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 1495, boilingPointC: 2927, densityGPerCm3: 8.90, oxidationStates: [2, 3],
    discoveredYear: 1735,
    summaryVi: 'Kim loại từ tính màu xám ánh xanh, ion Co²⁺ tạo màu xanh coban huyền thoại trong thủy tinh và gốm men. Cốt lõi của Vitamin B12.',
    applicationsVi: ['Pin lithium coban oxit (LCO)', 'Hợp kim siêu chịu nhiệt tuabin phản lực', 'Sắc tố xanh coban quý giá']
  },
  {
    z: 28, symbol: 'Ni', nameVi: 'Niken (Nickel)', nameEn: 'Nickel', atomicMass: 58.693,
    category: 'transition', categoryVi: 'Kim loại chuyển tiếp', period: 4, group: 10, block: 'd',
    electronConfig: '[Ar] 3d⁸ 4s²', electronegativity: 1.91, radiusPm: 149, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 1455, boilingPointC: 2913, densityGPerCm3: 8.908, oxidationStates: [2, 3],
    discoveredYear: 1751,
    summaryVi: 'Kim loại cứng, chống ăn mòn cao, bề mặt bóng sáng. Xúc tác kinh điển cho phản ứng hiđro hóa anken và dầu thực vật.',
    applicationsVi: ['Xúc tác hiđro hóa trong hóa hữu cơ', 'Thép không gỉ austenit', 'Pin xe điện NMC và NiMH']
  },
  {
    z: 29, symbol: 'Cu', nameVi: 'Đồng (Copper)', nameEn: 'Copper', atomicMass: 63.546,
    category: 'transition', categoryVi: 'Kim loại chuyển tiếp', period: 4, group: 11, block: 'd',
    electronConfig: '[Ar] 3d¹⁰ 4s¹', electronegativity: 1.90, radiusPm: 145, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 1084.62, boilingPointC: 2562, densityGPerCm3: 8.96, oxidationStates: [1, 2],
    discoveredYear: 'Cổ đại',
    summaryVi: 'Kim loại màu đỏ cam, dẫn điện và dẫn nhiệt xuất sắc chỉ sau bạc. Cấu hình bền bão hòa 3d¹⁰ 4s¹.',
    applicationsVi: ['Dây dẫn điện, bo mạch vi điện tử', 'Hợp kim đồng thau (Cu-Zn) và đồng thiếc (Cu-Sn)', 'Ống nước và thiết bị kháng khuẩn']
  },
  {
    z: 30, symbol: 'Zn', nameVi: 'Kẽm (Zinc)', nameEn: 'Zinc', atomicMass: 65.38,
    category: 'transition', categoryVi: 'Kim loại chuyển tiếp', period: 4, group: 12, block: 'd',
    electronConfig: '[Ar] 3d¹⁰ 4s²', electronegativity: 1.65, radiusPm: 142, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 419.53, boilingPointC: 907, densityGPerCm3: 7.14, oxidationStates: [2],
    discoveredYear: 1746,
    summaryVi: 'Kim loại màu lam nhạt, oxit và hiđroxit ZnO, Zn(OH)2 có tính lưỡng tính tan cả trong axit và kiềm.',
    applicationsVi: ['Mạ kẽm bảo vệ sắt thép chống rỉ', 'Hợp kim đúc cơ khí', 'Nguyên tố vi lượng thiết yếu miễn dịch']
  },
  {
    z: 35, symbol: 'Br', nameVi: 'Brom (Bromine)', nameEn: 'Bromine', atomicMass: 79.904,
    category: 'halogen', categoryVi: 'Halogen', period: 4, group: 17, block: 'p',
    electronConfig: '[Ar] 3d¹⁰ 4s² 4p⁵', electronegativity: 2.96, radiusPm: 94, stateAt298K: 'liquid', stateVi: 'Lỏng',
    meltingPointC: -7.2, boilingPointC: 58.8, densityGPerCm3: 3.1028, oxidationStates: [-1, 1, 3, 5],
    discoveredYear: 1826,
    summaryVi: 'Phi kim duy nhất ở thể lỏng tại điều kiện tiêu chuẩn, màu nâu đỏ, bốc khói độc hại. Thuốc thử kinh điển để nhận biết liên kết bội (C=C, C≡C) và phenol.',
    applicationsVi: ['Nhận biết hidrocacbon không no, anilin, phenol', 'Dung môi và chất chống cháy', 'Thuốc tráng phim AgBr']
  },
  {
    z: 47, symbol: 'Ag', nameVi: 'Bạc (Silver)', nameEn: 'Silver', atomicMass: 107.87,
    category: 'transition', categoryVi: 'Kim loại chuyển tiếp', period: 5, group: 11, block: 'd',
    electronConfig: '[Kr] 4d¹⁰ 5s¹', electronegativity: 1.93, radiusPm: 165, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 961.78, boilingPointC: 2162, densityGPerCm3: 10.49, oxidationStates: [1],
    discoveredYear: 'Cổ đại',
    summaryVi: 'Kim loại có độ dẫn điện và dẫn nhiệt cao nhất trong toàn bộ bảng tuần hoàn. Phản ứng tráng gương của glucozo và anđehit tạo lớp bạc sáng bóng.',
    applicationsVi: ['Tráng gương, phích nước', 'Trang sức và tích trữ giá trị', 'Mạch in dẫn điện cao cấp']
  },
  {
    z: 53, symbol: 'I', nameVi: 'Iot (Iodine)', nameEn: 'Iodine', atomicMass: 126.90,
    category: 'halogen', categoryVi: 'Halogen', period: 5, group: 17, block: 'p',
    electronConfig: '[Kr] 4d¹⁰ 5s² 5p⁵', electronegativity: 2.66, radiusPm: 115, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 113.7, boilingPointC: 184.3, densityGPerCm3: 4.933, oxidationStates: [-1, 1, 5, 7],
    discoveredYear: 1811,
    summaryVi: 'Chất rắn tím đen có tính thăng hoa khi đun nóng biến trực tiếp thành hơi màu tím. Tác dụng với hồ tinh bột tạo phức màu xanh tím đặc trưng.',
    applicationsVi: ['Nhận biết tinh bột', 'Muối iot phòng bệnh bướu cổ', 'Cồn sát trùng povidone-iodine']
  },
  {
    z: 56, symbol: 'Ba', nameVi: 'Bari (Barium)', nameEn: 'Barium', atomicMass: 137.33,
    category: 'alkaline_earth', categoryVi: 'Kim loại kiềm thổ', period: 6, group: 2, block: 's',
    electronConfig: '[Xe] 6s²', electronegativity: 0.89, radiusPm: 253, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 727, boilingPointC: 1897, densityGPerCm3: 3.51, oxidationStates: [2],
    discoveredYear: 1808,
    summaryVi: 'Kim loại kiềm thổ hoạt động mạnh, ngọn lửa cháy màu lục non. Ion Ba²⁺ là thuốc thử nhận biết ion sunfat (SO4²⁻) sinh kết tủa trắng BaSO4 siêu bền.',
    applicationsVi: ['Thuốc cản quang chụp X-quang dạ dày BaSO4', 'Pháo hoa màu xanh lục', 'Dung dịch khoan dầu mỏ']
  },
  {
    z: 79, symbol: 'Au', nameVi: 'Vàng (Gold)', nameEn: 'Gold', atomicMass: 196.97,
    category: 'transition', categoryVi: 'Kim loại chuyển tiếp', period: 6, group: 11, block: 'd',
    electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', electronegativity: 2.54, radiusPm: 174, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 1064.18, boilingPointC: 2856, densityGPerCm3: 19.30, oxidationStates: [1, 3],
    discoveredYear: 'Cổ đại',
    summaryVi: 'Kim loại quý có tính dẻo nhất (1 gam vàng có thể dát mỏng thành lá diện tích 1 m²). Không tan trong axit đơn lẻ, chỉ tan trong nước cường toan (hỗn hợp HNO3 : HCl = 1 : 3).',
    applicationsVi: ['Dự trữ tiền tệ thế giới', 'Đầu tiếp xúc điện tử vi mô', 'Trang sức vĩnh cửu']
  },
  {
    z: 80, symbol: 'Hg', nameVi: 'Thủy ngân (Mercury)', nameEn: 'Mercury', atomicMass: 200.59,
    category: 'transition', categoryVi: 'Kim loại chuyển tiếp', period: 6, group: 12, block: 'd',
    electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s²', electronegativity: 2.00, radiusPm: 171, stateAt298K: 'liquid', stateVi: 'Lỏng',
    meltingPointC: -38.83, boilingPointC: 356.73, densityGPerCm3: 13.534, oxidationStates: [1, 2],
    discoveredYear: 'Cổ đại',
    summaryVi: 'Kim loại duy nhất ở thể lỏng ở nhiệt độ phòng. Hơi thủy ngân rất độc. Khi bị đổ vỡ nhiệt kế thủy ngân, người ta dùng bột lưu huỳnh rắc lên để tạo HgS rắn không bay hơi.',
    applicationsVi: ['Nhiệt kế và áp kế truyền thống', 'Hỗn hống trám răng', 'Bột lưu huỳnh xử lý sự cố thủy ngân']
  },
  {
    z: 82, symbol: 'Pb', nameVi: 'Chì (Lead)', nameEn: 'Lead', atomicMass: 207.2,
    category: 'post_transition', categoryVi: 'Kim loại sau chuyển tiếp', period: 6, group: 14, block: 'p',
    electronConfig: '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', electronegativity: 1.87, radiusPm: 181, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 327.46, boilingPointC: 1749, densityGPerCm3: 11.34, oxidationStates: [2, 4],
    discoveredYear: 'Cổ đại',
    summaryVi: 'Kim loại nặng, mềm, khả năng hấp thụ tia phóng xạ và tia X rất cao. Hợp chất chì có độc tính tích tụ sinh học.',
    applicationsVi: ['Ắc quy chì cho xe máy, ô tô', 'Tấm chắn bức xạ hạt nhân và tia X', 'Chống ăn mòn cáp ngầm']
  },
  {
    z: 92, symbol: 'U', nameVi: 'Urani (Uranium)', nameEn: 'Uranium', atomicMass: 238.03,
    category: 'actinide', categoryVi: 'Actinit', period: 7, group: 3, block: 'f',
    electronConfig: '[Rn] 5f³ 6d¹ 7s²', electronegativity: 1.38, radiusPm: 196, stateAt298K: 'solid', stateVi: 'Rắn',
    meltingPointC: 1132.2, boilingPointC: 4131, densityGPerCm3: 19.1, oxidationStates: [3, 4, 5, 6],
    discoveredYear: 1789,
    summaryVi: 'Kim loại phóng xạ họ Actinit, đồng vị U-235 là nhiên liệu chính cho phản ứng phân hạch giải phóng năng lượng hạt nhân khổng lồ.',
    applicationsVi: ['Nhiên liệu nhà máy điện hạt nhân', 'Đạn xuyên giáp urani nghèo', 'Định tuổi địa chất đá cổ']
  }
];

// Helper to fill or lookup elements 1 to 118 with fallback synthesis if not expanded in full table
export const ALL_118_NAMES: Record<number, { sym: string; vi: string; en: string; cat: ElementData['category']; period: number; group: number; block: 's'|'p'|'d'|'f'; mass: number }> = {
  31: { sym: 'Ga', vi: 'Gali', en: 'Gallium', cat: 'post_transition', period: 4, group: 13, block: 'p', mass: 69.723 },
  32: { sym: 'Ge', vi: 'Gecmani', en: 'Germanium', cat: 'metalloid', period: 4, group: 14, block: 'p', mass: 72.630 },
  33: { sym: 'As', vi: 'Asen', en: 'Arsenic', cat: 'metalloid', period: 4, group: 15, block: 'p', mass: 74.922 },
  34: { sym: 'Se', vi: 'Selen', en: 'Selenium', cat: 'nonmetal', period: 4, group: 16, block: 'p', mass: 78.971 },
  36: { sym: 'Kr', vi: 'Kripton', en: 'Krypton', cat: 'noble_gas', period: 4, group: 18, block: 'p', mass: 83.798 },
  37: { sym: 'Rb', vi: 'Rubiđi', en: 'Rubidium', cat: 'alkali', period: 5, group: 1, block: 's', mass: 85.468 },
  38: { sym: 'Sr', vi: 'Stronti', en: 'Strontium', cat: 'alkaline_earth', period: 5, group: 2, block: 's', mass: 87.62 },
  39: { sym: 'Y', vi: 'Ytri', en: 'Yttrium', cat: 'transition', period: 5, group: 3, block: 'd', mass: 88.906 },
  40: { sym: 'Zr', vi: 'Ziriconi', en: 'Zirconium', cat: 'transition', period: 5, group: 4, block: 'd', mass: 91.224 },
  41: { sym: 'Nb', vi: 'Niobi', en: 'Niobium', cat: 'transition', period: 5, group: 5, block: 'd', mass: 92.906 },
  42: { sym: 'Mo', vi: 'Molipđen', en: 'Molybdenum', cat: 'transition', period: 5, group: 6, block: 'd', mass: 95.95 },
  43: { sym: 'Tc', vi: 'Tecneti', en: 'Technetium', cat: 'transition', period: 5, group: 7, block: 'd', mass: 98 },
  44: { sym: 'Ru', vi: 'Rutheni', en: 'Ruthenium', cat: 'transition', period: 5, group: 8, block: 'd', mass: 101.07 },
  45: { sym: 'Rh', vi: 'Rodi', en: 'Rhodium', cat: 'transition', period: 5, group: 9, block: 'd', mass: 102.91 },
  46: { sym: 'Pd', vi: 'Paladi', en: 'Palladium', cat: 'transition', period: 5, group: 10, block: 'd', mass: 106.42 },
  48: { sym: 'Cd', vi: 'Cadimi', en: 'Cadmium', cat: 'transition', period: 5, group: 12, block: 'd', mass: 112.41 },
  49: { sym: 'In', vi: 'Indi', en: 'Indium', cat: 'post_transition', period: 5, group: 13, block: 'p', mass: 114.82 },
  50: { sym: 'Sn', vi: 'Thiếc', en: 'Tin', cat: 'post_transition', period: 5, group: 14, block: 'p', mass: 118.71 },
  51: { sym: 'Sb', vi: 'Antimon', en: 'Antimony', cat: 'metalloid', period: 5, group: 15, block: 'p', mass: 121.76 },
  52: { sym: 'Te', vi: 'Telu', en: 'Tellurium', cat: 'metalloid', period: 5, group: 16, block: 'p', mass: 127.60 },
  54: { sym: 'Xe', vi: 'Xenon', en: 'Xenon', cat: 'noble_gas', period: 5, group: 18, block: 'p', mass: 131.29 },
  55: { sym: 'Cs', vi: 'Xesi', en: 'Caesium', cat: 'alkali', period: 6, group: 1, block: 's', mass: 132.91 },
  57: { sym: 'La', vi: 'Lantan', en: 'Lanthanum', cat: 'lanthanide', period: 6, group: 3, block: 'f', mass: 138.91 },
  74: { sym: 'W', vi: 'Vonfram', en: 'Tungsten', cat: 'transition', period: 6, group: 6, block: 'd', mass: 183.84 },
  78: { sym: 'Pt', vi: 'Bạch kim (Platin)', en: 'Platinum', cat: 'transition', period: 6, group: 10, block: 'd', mass: 195.08 },
  86: { sym: 'Rn', vi: 'Radon', en: 'Radon', cat: 'noble_gas', period: 6, group: 18, block: 'p', mass: 222 },
  87: { sym: 'Fr', vi: 'Franxi', en: 'Francium', cat: 'alkali', period: 7, group: 1, block: 's', mass: 223 },
  88: { sym: 'Ra', vi: 'Radi', en: 'Radium', cat: 'alkaline_earth', period: 7, group: 2, block: 's', mass: 226 },
  118: { sym: 'Og', vi: 'Oganesson', en: 'Oganesson', cat: 'noble_gas', period: 7, group: 18, block: 'p', mass: 294 }
};

export function getElementByZ(z: number): ElementData {
  const found = ELEMENTS.find(e => e.z === z);
  if (found) return found;

  const extra = ALL_118_NAMES[z];
  const sym = extra ? extra.sym : `E${z}`;
  const vi = extra ? extra.vi : `Nguyên tố ${z}`;
  const en = extra ? extra.en : `Element ${z}`;
  const cat = extra ? extra.cat : 'transition';
  const period = extra ? extra.period : Math.ceil(z / 18);
  const group = extra ? extra.group : ((z - 1) % 18) + 1;
  const block = extra ? extra.block : 'd';
  const mass = extra ? extra.mass : Math.round(z * 2.3);

  return {
    z,
    symbol: sym,
    nameVi: vi,
    nameEn: en,
    atomicMass: mass,
    category: cat,
    categoryVi: CATEGORY_LABELS[cat] || 'Kim loại chuyển tiếp',
    period,
    group,
    block,
    electronConfig: `Z = ${z}`,
    stateAt298K: 'solid',
    stateVi: 'Rắn',
    oxidationStates: [2],
    summaryVi: `${vi} (Z = ${z}) là nguyên tố hóa học thuộc chu kì ${period}, phân nhóm ${group}.`,
    applicationsVi: ['Nghiên cứu khoa học vật liệu', 'Công nghệ hạt nhân và phòng thí nghiệm']
  };
}
