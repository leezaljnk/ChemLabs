export interface ExperimentStep {
  actionVi: string;
  solutionColor: string;
  hasPrecipitate: boolean;
  precipitateColor?: string;
  precipitateName?: string;
  hasGas: boolean;
  gasBubbleColor?: string;
  gasName?: string;
  temperatureC?: number;
  isHeating?: boolean;
  flameColor?: string;
  observationVi: string;
}

export interface ExperimentData {
  id: string;
  title: string;
  grade: '10' | '11' | '12';
  category: 'Vô cơ' | 'Hữu cơ' | 'Oxi hóa - Khử' | 'Điện phân' | 'Nhận biết';
  apparatus: 'test_tube' | 'beaker' | 'erlenmeyer' | 'burner_flame';
  initialReagents: string[];
  equation: string;
  initialColor: string;
  steps: ExperimentStep[];
  conclusionVi: string;
  safetyVi: string;
}

export const EXPERIMENTS: ExperimentData[] = [
  {
    id: 'fe-cuso4',
    title: 'Đinh sắt tác dụng với dung dịch Đồng(II) Sunfat (CuSO₄)',
    grade: '10',
    category: 'Vô cơ',
    apparatus: 'beaker',
    initialReagents: ['Dung dịch CuSO₄ 0.5M', 'Đinh sắt (Fe) đánh sạch gỉ'],
    equation: 'Fe + CuSO₄ → FeSO₄ + Cu↓',
    initialColor: '#0284c7', // vibrant blue
    steps: [
      {
        actionVi: 'Thả đinh sắt sạch vào cốc đựng 50ml dung dịch CuSO₄ màu xanh lam.',
        solutionColor: '#0284c7',
        hasPrecipitate: false,
        hasGas: false,
        observationVi: 'Đinh sắt chìm trong dung dịch màu xanh lam trong suốt của CuSO₄.'
      },
      {
        actionVi: 'Chờ phản ứng diễn ra trong 3 phút (hoặc khuấy nhẹ).',
        solutionColor: '#38bdf8', // slightly lighter blue
        hasPrecipitate: true,
        precipitateColor: '#b45309', // metallic copper red
        precipitateName: 'Lớp đồng (Cu) kim loại màu đỏ bám trên bề mặt sắt',
        hasGas: false,
        observationVi: 'Có lớp kim loại màu đỏ gạch (Cu) bám ngoài đinh sắt, dung dịch nhạt màu xanh lam dần.'
      },
      {
        actionVi: 'Để sau 10 phút đến khi phản ứng hoàn tất.',
        solutionColor: '#a7f3d0', // pale green of FeSO4
        hasPrecipitate: true,
        precipitateColor: '#b45309',
        precipitateName: 'Cu bám dày ngoài đinh sắt',
        hasGas: false,
        observationVi: 'Màu xanh của ion Cu²⁺ biến mất, dung dịch chuyển sang màu xanh lục rất nhạt của FeSO₄. Khối lượng đinh sắt tăng lên (64 - 56 = +8g/mol).'
      }
    ],
    conclusionVi: 'Fe đứng trước Cu trong dãy hoạt động hóa học nên Fe khử Cu²⁺ thành kim loại Cu tự do, tạo muối Fe(II).',
    safetyVi: 'CuSO₄ có độc tính với thủy sinh vật, không đổ trực tiếp vào cống rãnh tự nhiên.'
  },
  {
    id: 'na-water',
    title: 'Natri (Na) tác dụng với nước + Phenolphthalein',
    grade: '10',
    category: 'Vô cơ',
    apparatus: 'beaker',
    initialReagents: ['Nước cất H₂O', 'Mẩu kim loại Natri (hạt đậu)', 'Vài giọt Phenolphthalein'],
    equation: '2Na + 2H₂O → 2NaOH + H₂↑',
    initialColor: '#f8fafc',
    steps: [
      {
        actionVi: 'Nhỏ 2 giọt dung dịch phenolphtalein vào cốc nước cất.',
        solutionColor: '#f8fafc',
        hasPrecipitate: false,
        hasGas: false,
        observationVi: 'Nước cất trung tính (pH ~ 7), phenolphtalein không đổi màu, dung dịch trong suốt.'
      },
      {
        actionVi: 'Thả mẩu natri nhỏ bằng hạt đậu đã thấm sạch dầu vào cốc.',
        solutionColor: '#f43f5e', // vivid magenta/pink
        hasPrecipitate: false,
        hasGas: true,
        gasBubbleColor: '#38bdf8',
        gasName: 'Khí Hiđro (H₂) bốc mạnh',
        observationVi: 'Mẩu Na nóng chảy vo tròn thành giọt bóng loáng chạy nhanh trên mặt nước, sủi bọt khí H₂ rất mạnh. Dung dịch xuất hiện các vệt màu hồng đậm lan tỏa.'
      },
      {
        actionVi: 'Mẩu natri tan hết hoàn toàn.',
        solutionColor: '#ec4899', // bright pink
        hasPrecipitate: false,
        hasGas: false,
        observationVi: 'Phản ứng kết thúc, dung dịch thu được toàn bộ có màu hồng rực do tạo môi trường bazơ kiềm NaOH (pH > 10).'
      }
    ],
    conclusionVi: 'Kim loại kiềm Natri phản ứng rất mãnh liệt với nước tỏa nhiều nhiệt, sinh dung dịch bazơ mạnh kiềm NaOH và giải phóng khí H₂.',
    safetyVi: 'Chỉ dùng mẩu Na rất nhỏ. Không dùng kẹp chạm tay trần vào Na vì Na ăn da cực mạnh.'
  },
  {
    id: 'bacl2-h2so4',
    title: 'Phản ứng tạo kết tủa trắng siêu bền BaSO₄',
    grade: '11',
    category: 'Nhận biết',
    apparatus: 'test_tube',
    initialReagents: ['Dung dịch BaCl₂ 0.1M', 'Dung dịch H₂SO₄ loãng 0.1M'],
    equation: 'BaCl₂ + H₂SO₄ → BaSO₄↓ (trắng) + 2HCl',
    initialColor: '#f1f5f9',
    steps: [
      {
        actionVi: 'Cho 2ml dung dịch BaCl₂ trong suốt vào ống nghiệm.',
        solutionColor: '#f8fafc',
        hasPrecipitate: false,
        hasGas: false,
        observationVi: 'Dung dịch muối BaCl₂ trong suốt không màu.'
      },
      {
        actionVi: 'Nhỏ từng giọt dung dịch H₂SO₄ loãng vào ống nghiệm.',
        solutionColor: '#ffffff',
        hasPrecipitate: true,
        precipitateColor: '#ffffff',
        precipitateName: 'Bari sunfat (BaSO₄) kết tủa trắng đục như sữa',
        hasGas: false,
        observationVi: 'Ngay lập tức xuất hiện kết tủa trắng sữa dày đặc không tan trong nước.'
      },
      {
        actionVi: 'Thử thêm dung dịch axit HCl đậm đặc vào để kiểm tra độ tan.',
        solutionColor: '#ffffff',
        hasPrecipitate: true,
        precipitateColor: '#ffffff',
        precipitateName: 'BaSO₄ không tan trong HCl loãng/đặc',
        hasGas: false,
        observationVi: 'Kết tủa BaSO₄ vẫn không tan trong dung dịch axit dư. Đây là phản ứng đặc trưng nhất để nhận biết ion sunfat (SO₄²⁻).'
      }
    ],
    conclusionVi: 'Ion Ba²⁺ kết hợp với ion SO₄²⁻ tạo kết tủa muối sunfat BaSO₄ có tích số tan cực nhỏ (Ksp ~ 1.1 × 10⁻¹⁰), bền với axit mạnh.',
    safetyVi: 'Các muối bari hòa tan đều có độc tính cao đối với hệ tim mạch và cơ, cần thao tác cẩn thận.'
  },
  {
    id: 'glucose-cuoh2',
    title: 'Phản ứng của Glucozơ với Cu(OH)₂ ở nhiệt độ thường và khi đun nóng',
    grade: '12',
    category: 'Hữu cơ',
    apparatus: 'test_tube',
    initialReagents: ['Dung dịch CuSO₄ 5%', 'Dung dịch NaOH 10%', 'Dung dịch Glucozơ 5%'],
    equation: '2C₆H₁₂O₆ + Cu(OH)₂ → (C₆H₁₁O₆)₂Cu (xanh lam thẫm) + 2H₂O; Đun nóng: CH₂OH[CHOH]₄CHO + 2Cu(OH)₂ + NaOH → CH₂OH[CHOH]₄COONa + Cu₂O↓ (đỏ gạch) + 3H₂O',
    initialColor: '#38bdf8',
    steps: [
      {
        actionVi: 'Cho 5 giọt CuSO₄ vào ống nghiệm chứa 2ml NaOH để tạo kết tủa Cu(OH)₂ tươi.',
        solutionColor: '#0284c7',
        hasPrecipitate: true,
        precipitateColor: '#38bdf8',
        precipitateName: 'Cu(OH)₂ kết tủa nhầy màu xanh lam',
        hasGas: false,
        observationVi: 'Xuất hiện kết tủa màu xanh lam của Cu(OH)₂ trong môi trường kiềm.'
      },
      {
        actionVi: 'Thêm 2ml dung dịch Glucozơ 5% vào và lắc nhẹ ở nhiệt độ thường.',
        solutionColor: '#1d4ed8', // deep royal blue
        hasPrecipitate: false,
        hasGas: false,
        observationVi: 'Kết tủa Cu(OH)₂ tan ra, tạo thành dung dịch phức đồng-glucozơ màu xanh lam thẫm (chứng minh glucozơ có nhiều nhóm -OH kề nhau dạng ancol đa chức).'
      },
      {
        actionVi: 'Kẹp ống nghiệm đun nóng nhẹ trên ngọn lửa đèn cồn trong 2 phút.',
        solutionColor: '#78350f',
        hasPrecipitate: true,
        precipitateColor: '#dc2626', // brick red precipitate Cu2O
        precipitateName: 'Đồng(I) oxit (Cu₂O) kết tủa đỏ gạch',
        hasGas: false,
        isHeating: true,
        observationVi: 'Dung dịch đổi từ xanh sang vàng, sau đó xuất hiện kết tủa màu đỏ gạch của Cu₂O lắng xuống đáy ống nghiệm (chứng minh nhóm -CHO anđehit của glucozơ).'
      }
    ],
    conclusionVi: 'Glucozơ vừa có tính chất của ancol đa chức (tạo phức xanh lam với Cu(OH)₂ ở t° thường) vừa có tính chất của anđehit (khử Cu(OH)₂ thành Cu₂O đỏ gạch khi đun nóng).',
    safetyVi: 'Cẩn thận khi đun nóng ống nghiệm trên ngọn lửa đèn cồn, luôn hơ đều thân ống trước khi tập trung đáy.'
  },
  {
    id: 'flame-tests',
    title: 'Thử màu ngọn lửa của các ion kim loại (Flame Test)',
    grade: '10',
    category: 'Nhận biết',
    apparatus: 'burner_flame',
    initialReagents: ['Dây platin / Dây niken-crom', 'Dung dịch muối NaCl, KCl, CuCl₂, CaCl₂, BaCl₂', 'Đèn khí Bunsen'],
    equation: 'Kích thích nhiệt: M⁺ + nhiệt → M* → M + hν (ánh sáng đặc trưng)',
    initialColor: '#3b82f6', // natural flame blue
    steps: [
      {
        actionVi: 'Nhúng dây niken vào dung dịch muối Natri (NaCl) rồi đưa vào ngọn lửa không màu.',
        solutionColor: '#facc15',
        hasPrecipitate: false,
        hasGas: false,
        flameColor: '#eab308', // intense yellow flame
        observationVi: 'Ngọn lửa đèn cồn bùng cháy màu VÀNG TƯƠI rực rỡ đặc trưng của nguyên tử Natri (bước sóng ~589 nm).'
      },
      {
        actionVi: 'Nhúng dây vào dung dịch muối Kali (KCl) và quan sát qua kính lọc Coban.',
        solutionColor: '#c084fc',
        hasPrecipitate: false,
        hasGas: false,
        flameColor: '#a855f7', // violet lilac flame
        observationVi: 'Ngọn lửa nhuộm màu TÍM HOA CÀ nhạt đặc trưng của nguyên tử Kali.'
      },
      {
        actionVi: 'Nhúng dây vào dung dịch muối Đồng (CuCl₂) đưa vào ngọn lửa.',
        solutionColor: '#10b981',
        hasPrecipitate: false,
        hasGas: false,
        flameColor: '#10b981', // vivid emerald green flame
        observationVi: 'Ngọn lửa chuyển sang màu XANH LỤC LỰC RỠ của các ion Đồng(II).'
      },
      {
        actionVi: 'Nhúng dây vào dung dịch Canxi (CaCl₂).',
        solutionColor: '#f97316',
        hasPrecipitate: false,
        hasGas: false,
        flameColor: '#ea580c', // brick red / orange flame
        observationVi: 'Ngọn lửa chuyển sang màu ĐỎ CAM / ĐỎ GẠCH của Canxi.'
      }
    ],
    conclusionVi: 'Nhiệt độ ngọn lửa kích thích electron ngoài cùng nhảy lên mức năng lượng cao. Khi quay về trạng thái cơ bản, chúng phát ra photon ánh sáng có bước sóng đặc trưng cho từng nguyên tố.',
    safetyVi: 'Đeo kính bảo hộ khi thực hành thử ngọn lửa kim loại.'
  },
  {
    id: 'kmno4-redox',
    title: 'Dung dịch Thuốc tím (KMnO₄) oxi hóa FeSO₄ trong môi trường Axit H₂SO₄',
    grade: '10',
    category: 'Oxi hóa - Khử',
    apparatus: 'erlenmeyer',
    initialReagents: ['Dung dịch KMnO₄ 0.02M (tím đậm)', 'Dung dịch FeSO₄ 0.1M', 'Dung dịch H₂SO₄ 2M loãng'],
    equation: '10FeSO₄ + 2KMnO₄ + 8H₂SO₄ → 5Fe₂(SO₄)₃ + 2MnSO₄ + K₂SO₄ + 8H₂O',
    initialColor: '#701a75', // deep purple KMnO4
    steps: [
      {
        actionVi: 'Lấy 10ml dung dịch FeSO₄ loãng (hơi ngả xanh) và thêm 5ml H₂SO₄ loãng vào bình tam giác.',
        solutionColor: '#d1fae5', // very faint green
        hasPrecipitate: false,
        hasGas: false,
        observationVi: 'Dung dịch chứa ion Fe²⁺ và H⁺ trong suốt, không có màu rõ rệt.'
      },
      {
        actionVi: 'Dùng buret nhỏ từng giọt dung dịch KMnO₄ màu tím đậm vào bình và lắc nhẹ.',
        solutionColor: '#fef08a', // pale yellow of Fe3+
        hasPrecipitate: false,
        hasGas: false,
        observationVi: 'Mỗi giọt thuốc tím màu tím sẫm rơi vào đều MẤT MÀU NGAY TỨC THÌ. Dung dịch dần chuyển sang màu vàng nhạt của muối Fe(III).'
      },
      {
        actionVi: 'Tiếp tục nhỏ đến điểm tương đương (khi Fe²⁺ vừa phản ứng hết).',
        solutionColor: '#fbcfe8', // faint persistent pink
        hasPrecipitate: false,
        hasGas: false,
        observationVi: 'Xuất hiện màu hồng nhạt bền vững trong 30 giây do 1 giọt KMnO₄ dư thừa đánh dấu điểm kết thúc chuẩn độ pemanganat.'
      }
    ],
    conclusionVi: 'Mn⁺⁷ trong KMnO₄ bị khử thành Mn²⁺ (không màu) trong môi trường axit mạnh, đồng thời Fe²⁺ bị oxi hóa lên Fe³⁺ (vàng nhạt).',
    safetyVi: 'H₂SO₄ có tính ăn mòn mạnh; KMnO₄ là chất oxi hóa mạnh có thể gây bỏng da và làm ố quần áo.'
  },
  {
    id: 'al-naoh',
    title: 'Nhôm (Al) tác dụng với dung dịch kiềm mạnh NaOH',
    grade: '12',
    category: 'Vô cơ',
    apparatus: 'test_tube',
    initialReagents: ['Dung dịch NaOH 2M', 'Lá nhôm / phoi nhôm'],
    equation: '2Al + 2NaOH + 2H₂O → 2NaAlO₂ (hoặc Na[Al(OH)₄]) + 3H₂↑',
    initialColor: '#f8fafc',
    steps: [
      {
        actionVi: 'Cho mẩu lá nhôm vào ống nghiệm chứa 3ml dung dịch NaOH 2M.',
        solutionColor: '#f1f5f9',
        hasPrecipitate: false,
        hasGas: false,
        observationVi: 'Lúc đầu phản ứng diễn ra chậm do lớp màng oxit Al₂O₃ bên ngoài đang bị hòa tan: Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O.'
      },
      {
        actionVi: 'Sau 15 giây, khi màng oxit bị phá hủy hoàn toàn.',
        solutionColor: '#e2e8f0',
        hasPrecipitate: false,
        hasGas: true,
        gasBubbleColor: '#38bdf8',
        gasName: 'Bọt khí H₂ sủi bọt cuồn cuộn',
        observationVi: 'Khí Hiđro H₂ sủi bọt cực kỳ mãnh liệt quanh mẩu nhôm, ống nghiệm nóng ran do phản ứng tỏa nhiệt lớn.'
      },
      {
        actionVi: 'Mẩu nhôm tan dần đến hết.',
        solutionColor: '#f8fafc',
        hasPrecipitate: false,
        hasGas: false,
        observationVi: 'Mẩu nhôm tan hoàn toàn tạo dung dịch natri aluminat NaAlO₂ (hoặc Na[Al(OH)₄]) trong suốt không màu.'
      }
    ],
    conclusionVi: 'Nhôm có thể phản ứng với dung dịch kiềm nhờ tính lưỡng tính của màng oxit và bản thân kim loại nhôm khử phân tử nước khi có kiềm hòa tan Al(OH)₃.',
    safetyVi: 'Dung dịch NaOH nóng ăn mòn da thịt rất nguy hiểm, khí H₂ dễ cháy nổ khi gặp tia lửa.'
  },
  {
    id: 'silver-mirror',
    title: 'Phản ứng tráng bạc của Glucozơ với Thuốc thử Tollens ([Ag(NH₃)₂]OH)',
    grade: '12',
    category: 'Hữu cơ',
    apparatus: 'test_tube',
    initialReagents: ['Dung dịch AgNO₃ 1%', 'Dung dịch NH₃ loãng', 'Dung dịch Glucozơ 5%', 'Cốc nước nóng 70-80°C'],
    equation: 'CH₂OH[CHOH]₄CHO + 2[Ag(NH₃)₂]OH → CH₂OH[CHOH]₄COONH₄ + 2Ag↓ + 3NH₃ + H₂O',
    initialColor: '#f8fafc',
    steps: [
      {
        actionVi: 'Điều chế thuốc thử Tollens: Nhỏ từng giọt dd NH₃ vào 2ml dd AgNO₃ đến khi kết tủa AgOH vừa tan hết.',
        solutionColor: '#f8fafc',
        hasPrecipitate: false,
        hasGas: false,
        observationVi: 'Dung dịch phức bạc amoniac [Ag(NH₃)₂]OH trong suốt không màu.'
      },
      {
        actionVi: 'Thêm 1ml dung dịch Glucozơ 5% vào ống nghiệm, lắc đều.',
        solutionColor: '#f8fafc',
        hasPrecipitate: false,
        hasGas: false,
        observationVi: 'Hỗn hợp ban đầu trong suốt, chưa có biến đổi rõ rệt ở nhiệt độ phòng.'
      },
      {
        actionVi: 'Đặt ống nghiệm vào cốc nước nóng 70-80°C trong 5 phút (không lắc).',
        solutionColor: '#cbd5e1',
        hasPrecipitate: true,
        precipitateColor: '#e2e8f0', // bright shiny silver
        precipitateName: 'Lớp kim loại Bạc (Ag) sáng bóng như gương bám vào thành ống nghiệm',
        hasGas: false,
        isHeating: true,
        observationVi: 'Bạc kim loại sinh ra bám sáng loáng, mịn màng như chiếc gương tráng bạc tuyệt đẹp trên thành trong của ống nghiệm.'
      }
    ],
    conclusionVi: 'Nhóm anđehit (-CHO) của glucozơ bị oxi hóa thành muối amoni gluconat, ion Ag⁺ bị khử thành kim loại Ag tự do bám vào thủy tinh.',
    safetyVi: 'Không để dung dịch thuốc thử Tollens lưu cữu lâu ngày vì có thể tạo bạc azua (Ag₃N) gây nổ nguy hiểm.'
  }
];

// Custom mixing reagents database for sandbox mode
export interface MixingReagent {
  id: string;
  nameVi: string;
  formula: string;
  colorHex: string;
  type: 'acid' | 'base' | 'salt' | 'metal' | 'indicator';
}

export const MIXING_REAGENTS: MixingReagent[] = [
  { id: 'hcl', nameVi: 'Axit Clohiđric', formula: 'HCl 1M', colorHex: '#f8fafc', type: 'acid' },
  { id: 'h2so4', nameVi: 'Axit Sunfuric', formula: 'H₂SO₄ 1M', colorHex: '#f8fafc', type: 'acid' },
  { id: 'naoh', nameVi: 'Natri Hiđroxit', formula: 'NaOH 1M', colorHex: '#f8fafc', type: 'base' },
  { id: 'baoh2', nameVi: 'Bari Hiđroxit', formula: 'Ba(OH)₂ 0.5M', colorHex: '#f8fafc', type: 'base' },
  { id: 'cuso4', nameVi: 'Đồng(II) Sunfat', formula: 'CuSO₄ 0.5M', colorHex: '#0284c7', type: 'salt' },
  { id: 'fecl3', nameVi: 'Sắt(III) Clorua', formula: 'FeCl₃ 0.5M', colorHex: '#ca8a04', type: 'salt' },
  { id: 'feso4', nameVi: 'Sắt(II) Sunfat', formula: 'FeSO₄ 0.5M', colorHex: '#a7f3d0', type: 'salt' },
  { id: 'bacl2', nameVi: 'Bari Clorua', formula: 'BaCl₂ 0.5M', colorHex: '#f8fafc', type: 'salt' },
  { id: 'agno3', nameVi: 'Bạc Nitrat', formula: 'AgNO₃ 0.2M', colorHex: '#f8fafc', type: 'salt' },
  { id: 'na2co3', nameVi: 'Natri Cacbonat', formula: 'Na₂CO₃ 0.5M', colorHex: '#f8fafc', type: 'salt' },
  { id: 'kmno4', nameVi: 'Thuốc tím', formula: 'KMnO₄ 0.05M', colorHex: '#701a75', type: 'salt' },
  { id: 'phenol', nameVi: 'Phenolphthalein', formula: 'C₂₀H₁₄O₄', colorHex: '#f8fafc', type: 'indicator' }
];

export function evaluateReagentMix(r1: string, r2: string): {
  colorHex: string;
  precipitate?: { name: string; color: string; hex: string };
  gas?: { name: string; color: string };
  equation: string;
  phenomenon: string;
} {
  const pair = [r1, r2].sort().join('+');

  switch (pair) {
    case 'cuso4+naoh':
      return {
        colorHex: '#38bdf8',
        precipitate: { name: 'Cu(OH)₂', color: 'Xanh lam', hex: '#0284c7' },
        equation: 'CuSO₄ + 2NaOH → Cu(OH)₂↓ (xanh lam) + Na₂SO₄',
        phenomenon: 'Xuất hiện kết tủa màu xanh lam của đồng(II) hiđroxit Cu(OH)₂.'
      };
    case 'bacl2+h2so4':
      return {
        colorHex: '#ffffff',
        precipitate: { name: 'BaSO₄', color: 'Trắng', hex: '#ffffff' },
        equation: 'BaCl₂ + H₂SO₄ → BaSO₄↓ (trắng) + 2HCl',
        phenomenon: 'Xuất hiện kết tủa trắng đục dày đặc của BaSO₄ không tan trong axit.'
      };
    case 'agno3+hcl':
      return {
        colorHex: '#ffffff',
        precipitate: { name: 'AgCl', color: 'Trắng', hex: '#ffffff' },
        equation: 'AgNO₃ + HCl → AgCl↓ (trắng) + HNO₃',
        phenomenon: 'Xuất hiện kết tủa màu trắng vón của AgCl, hóa đen ngoài ánh sáng.'
      };
    case 'fecl3+naoh':
      return {
        colorHex: '#7f1d1d',
        precipitate: { name: 'Fe(OH)₃', color: 'Nâu đỏ', hex: '#991b1b' },
        equation: 'FeCl₃ + 3NaOH → Fe(OH)₃↓ (nâu đỏ) + 3NaCl',
        phenomenon: 'Xuất hiện kết tủa màu nâu đỏ của sắt(III) hiđroxit Fe(OH)₃.'
      };
    case 'feso4+naoh':
      return {
        colorHex: '#a7f3d0',
        precipitate: { name: 'Fe(OH)₂', color: 'Trắng xanh', hex: '#86efac' },
        equation: 'FeSO₄ + 2NaOH → Fe(OH)₂↓ (trắng xanh) + Na₂SO₄',
        phenomenon: 'Xuất hiện kết tủa màu trắng xanh Fe(OH)₂, sau đó dần hóa nâu đỏ ngoài không khí do tạo Fe(OH)₃.'
      };
    case 'hcl+na2co3':
      return {
        colorHex: '#f8fafc',
        gas: { name: 'CO₂', color: 'Không màu' },
        equation: '2HCl + Na₂CO₃ → 2NaCl + CO₂↑ + H₂O',
        phenomenon: 'Sủi bọt khí CO₂ không màu mãnh liệt, dung dịch vẫn trong suốt.'
      };
    case 'h2so4+na2co3':
      return {
        colorHex: '#f8fafc',
        gas: { name: 'CO₂', color: 'Không màu' },
        equation: 'H₂SO₄ + Na₂CO₃ → Na₂SO₄ + CO₂↑ + H₂O',
        phenomenon: 'Sủi bọt khí CO₂ không màu, giải phóng nhanh.'
      };
    case 'baoh2+h2so4':
      return {
        colorHex: '#ffffff',
        precipitate: { name: 'BaSO₄', color: 'Trắng', hex: '#ffffff' },
        equation: 'Ba(OH)₂ + H₂SO₄ → BaSO₄↓ + 2H₂O',
        phenomenon: 'Tạo kết tủa trắng BaSO₄ và tỏa nhiệt trung hòa axit - bazơ.'
      };
    case 'naoh+phenol':
      return {
        colorHex: '#ec4899', // bright pink
        equation: 'Phenolphthalein + OH⁻ → Chuyển dạng ion có màu hồng',
        phenomenon: 'Dung dịch lập tức chuyển sang màu hồng đậm rực rỡ do môi trường kiềm (pH > 8.3).'
      };
    case 'baoh2+phenol':
      return {
        colorHex: '#ec4899',
        equation: 'Phenolphthalein + Ba(OH)₂ → Chuyển sang màu hồng',
        phenomenon: 'Dung dịch chuyển sang màu hồng cánh sen do kiềm Ba(OH)₂.'
      };
    case 'hcl+naoh':
      return {
        colorHex: '#f8fafc',
        equation: 'HCl + NaOH → NaCl + H₂O',
        phenomenon: 'Phản ứng trung hòa tạo nước và muối ăn, tỏa nhiệt, dung dịch trong suốt không màu.'
      };
    default:
      return {
        colorHex: '#f1f5f9',
        equation: 'Không có hiện tượng phản ứng rõ rệt ở điều kiện thường',
        phenomenon: 'Hai dung dịch hòa trộn đồng nhất mà không xuất hiện kết tủa hay khí bay lên.'
      };
  }
}
