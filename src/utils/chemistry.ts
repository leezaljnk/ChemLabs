/**
 * Chemistry computational engine & utilities for ChemLabs
 */

// Atomic weights for common elements
export const ATOMIC_WEIGHTS: Record<string, number> = {
  H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81,
  C: 12.011, N: 14.007, O: 15.999, F: 18.998, Ne: 20.180,
  Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974,
  S: 32.06, Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078,
  Sc: 44.956, Ti: 47.867, V: 50.942, Cr: 51.996, Mn: 54.938,
  Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38,
  Ga: 69.723, Ge: 72.630, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798,
  Rb: 85.468, Sr: 87.62, Y: 88.906, Zr: 91.224, Nb: 92.906, Mo: 95.95,
  Ag: 107.87, Cd: 112.41, Sn: 118.71, Sb: 121.76, I: 126.90, Xe: 131.29,
  Cs: 132.91, Ba: 137.33, Pt: 195.08, Au: 196.97, Hg: 200.59, Pb: 207.2,
  Bi: 208.98, U: 238.03
};

/**
 * Parse chemical formula and compute exact molar mass
 * Supports parentheses like Ca(OH)2, Fe2(SO4)3, and hydrates like CuSO4.5H2O
 */
export function calculateMolarMass(formula: string): { molarMass: number; elements: Record<string, number>; error?: string } {
  if (!formula || !formula.trim()) {
    return { molarMass: 0, elements: {}, error: 'Công thức trống' };
  }

  const cleanFormula = formula.trim().replace(/\s+/g, '');
  
  // Check for hydrate (e.g., CuSO4.5H2O or CuSO4*5H2O)
  const parts = cleanFormula.split(/[.*•]/);
  let totalMass = 0;
  const totalElements: Record<string, number> = {};

  try {
    for (let i = 0; i < parts.length; i++) {
      let part = parts[i];
      let multiplier = 1;
      
      // If secondary part has multiplier like "5H2O"
      if (i > 0) {
        const match = part.match(/^(\d+)(.*)$/);
        if (match) {
          multiplier = parseInt(match[1], 10);
          part = match[2];
        }
      }

      const counts = parseSimpleFormula(part);
      for (const [el, count] of Object.entries(counts)) {
        totalElements[el] = (totalElements[el] || 0) + count * multiplier;
      }
    }

    for (const [el, count] of Object.entries(totalElements)) {
      const weight = ATOMIC_WEIGHTS[el];
      if (weight === undefined) {
        return { molarMass: 0, elements: {}, error: `Không tìm thấy khối lượng nguyên tử của nguyên tố: ${el}` };
      }
      totalMass += weight * count;
    }

    return {
      molarMass: Math.round(totalMass * 1000) / 1000,
      elements: totalElements
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Công thức không hợp lệ';
    return { molarMass: 0, elements: {}, error: message };
  }
}

/**
 * Parses formula with nested parentheses like Al2(SO4)3
 */
function parseSimpleFormula(str: string): Record<string, number> {
  const stack: Record<string, number>[] = [{}];
  let i = 0;

  while (i < str.length) {
    const ch = str[i];

    if (ch === '(' || ch === '[') {
      stack.push({});
      i++;
    } else if (ch === ')' || ch === ']') {
      i++;
      // get multiplier after parenthesis
      let numStr = '';
      while (i < str.length && /\d/.test(str[i])) {
        numStr += str[i];
        i++;
      }
      const mult = numStr ? parseInt(numStr, 10) : 1;
      const top = stack.pop();
      if (!top || stack.length === 0) {
        throw new Error('Dấu ngoặc không hợp lệ');
      }
      const current = stack[stack.length - 1];
      for (const [el, count] of Object.entries(top)) {
        current[el] = (current[el] || 0) + count * mult;
      }
    } else if (/[A-Z]/.test(ch)) {
      // Element symbol: 1 uppercase followed by optional lowercase letters
      let el = ch;
      i++;
      while (i < str.length && /[a-z]/.test(str[i])) {
        el += str[i];
        i++;
      }
      // Element count
      let numStr = '';
      while (i < str.length && /\d/.test(str[i])) {
        numStr += str[i];
        i++;
      }
      const count = numStr ? parseInt(numStr, 10) : 1;
      const current = stack[stack.length - 1];
      current[el] = (current[el] || 0) + count;
    } else {
      throw new Error(`Ký tự không hợp lệ: "${ch}"`);
    }
  }

  if (stack.length !== 1) {
    throw new Error('Thiếu dấu đóng ngoặc');
  }

  return stack[0];
}

/**
 * Electron subshell order by Aufbau principle (Klechkowski rule)
 */
export const SUBSHELL_ORDER: { name: string; capacity: number; n: number; l: number }[] = [
  { name: '1s', capacity: 2, n: 1, l: 0 },
  { name: '2s', capacity: 2, n: 2, l: 0 },
  { name: '2p', capacity: 6, n: 2, l: 1 },
  { name: '3s', capacity: 2, n: 3, l: 0 },
  { name: '3p', capacity: 6, n: 3, l: 1 },
  { name: '4s', capacity: 2, n: 4, l: 0 },
  { name: '3d', capacity: 10, n: 3, l: 2 },
  { name: '4p', capacity: 6, n: 4, l: 1 },
  { name: '5s', capacity: 2, n: 5, l: 0 },
  { name: '4d', capacity: 10, n: 4, l: 2 },
  { name: '5p', capacity: 6, n: 5, l: 1 },
  { name: '6s', capacity: 2, n: 6, l: 0 },
  { name: '4f', capacity: 14, n: 4, l: 3 },
  { name: '5d', capacity: 10, n: 5, l: 2 },
  { name: '6p', capacity: 6, n: 6, l: 1 },
  { name: '7s', capacity: 2, n: 7, l: 0 },
  { name: '5f', capacity: 14, n: 5, l: 3 },
  { name: '6d', capacity: 10, n: 6, l: 2 },
  { name: '7p', capacity: 6, n: 7, l: 1 }
];

export interface SubshellConfig {
  name: string;
  electrons: number;
  capacity: number;
  n: number;
  l: number;
  // Hund's rule: array of orbital electron counts [spinUp, spinDown]
  orbitals: ('up' | 'both' | 'empty')[];
}

export interface ElectronConfigResult {
  z: number;
  fullConfig: string;
  orderedConfig: string;
  nobleGasConfig: string;
  subshells: SubshellConfig[];
  valenceElectrons: number;
  shellCounts: number[]; // K, L, M, N...
  period: number;
  group: string;
  block: 's' | 'p' | 'd' | 'f';
  isException?: boolean;
}

// Notable configuration exceptions (Cr, Cu, Mo, Ag, Au)
const CONFIG_EXCEPTIONS: Record<number, Record<string, number>> = {
  24: { '1s': 2, '2s': 2, '2p': 6, '3s': 2, '3p': 6, '3d': 5, '4s': 1 }, // Cr [Ar] 3d5 4s1
  29: { '1s': 2, '2s': 2, '2p': 6, '3s': 2, '3p': 6, '3d': 10, '4s': 1 }, // Cu [Ar] 3d10 4s1
  42: { '1s': 2, '2s': 2, '2p': 6, '3s': 2, '3p': 6, '3d': 10, '4s': 2, '4p': 6, '4d': 5, '5s': 1 }, // Mo
  47: { '1s': 2, '2s': 2, '2p': 6, '3s': 2, '3p': 6, '3d': 10, '4s': 2, '4p': 6, '4d': 10, '5s': 1 }, // Ag
  79: { '1s': 2, '2s': 2, '2p': 6, '3s': 2, '3p': 6, '3d': 10, '4s': 2, '4p': 6, '4d': 10, '4f': 14, '5s': 2, '5p': 6, '5d': 10, '6s': 1 } // Au
};

export function getElectronConfig(z: number): ElectronConfigResult {
  if (z < 1 || z > 118) {
    throw new Error('Số hiệu nguyên tử Z phải từ 1 đến 118');
  }

  const subshells: SubshellConfig[] = [];
  let remaining = z;
  const isException = z in CONFIG_EXCEPTIONS;
  const exceptionMap = CONFIG_EXCEPTIONS[z];

  for (const shell of SUBSHELL_ORDER) {
    if (remaining <= 0) break;

    let electrons = 0;
    if (isException && exceptionMap[shell.name] !== undefined) {
      electrons = exceptionMap[shell.name];
      remaining -= electrons;
    } else {
      electrons = Math.min(remaining, shell.capacity);
      remaining -= electrons;
    }

    if (electrons > 0) {
      const numOrbitals = shell.capacity / 2;
      const orbitals: ('up' | 'both' | 'empty')[] = [];
      
      // Hund's rule: fill 1 electron in each orbital first, then pair
      for (let orb = 0; orb < numOrbitals; orb++) {
        if (electrons > numOrbitals + orb) {
          orbitals.push('both'); // 2 electrons: spin up and down
        } else if (electrons > orb) {
          orbitals.push('up'); // 1 electron: spin up
        } else {
          orbitals.push('empty');
        }
      }

      subshells.push({
        name: shell.name,
        electrons,
        capacity: shell.capacity,
        n: shell.n,
        l: shell.l,
        orbitals
      });
    }
  }

  // Shell electron counts K, L, M, N...
  const shellCounts: number[] = [0, 0, 0, 0, 0, 0, 0];
  subshells.forEach(s => {
    shellCounts[s.n - 1] += s.electrons;
  });

  // Full config string in Aufbau filling order
  const fullConfig = subshells.map(s => `${s.name}${superscript(s.electrons)}`).join(' ');

  // Ordered config string by principal quantum number n
  const orderedList = [...subshells].sort((a, b) => {
    if (a.n !== b.n) return a.n - b.n;
    return a.l - b.l;
  });
  const orderedConfig = orderedList.map(s => `${s.name}${superscript(s.electrons)}`).join(' ');

  // Noble gas shorthand
  const nobleGases = [
    { z: 86, sym: 'Rn' },
    { z: 54, sym: 'Xe' },
    { z: 36, sym: 'Kr' },
    { z: 18, sym: 'Ar' },
    { z: 10, sym: 'Ne' },
    { z: 2, sym: 'He' }
  ];

  let nobleGasConfig = fullConfig;
  for (const ng of nobleGases) {
    if (z > ng.z) {
      // Find remaining part
      const ngConfig = getElectronConfig(ng.z).orderedConfig;
      // Slice out the noble gas portion from ordered
      const tail = orderedList.filter(s => {
        // Find if this subshell is beyond the noble gas core
        const ngSubshells = getElectronConfig(ng.z).subshells;
        const matching = ngSubshells.find(n => n.name === s.name);
        return !matching || matching.electrons < s.electrons;
      }).map(s => {
        const ngSub = getElectronConfig(ng.z).subshells.find(n => n.name === s.name);
        const remE = s.electrons - (ngSub ? ngSub.electrons : 0);
        return `${s.name}${superscript(remE)}`;
      }).join(' ');

      nobleGasConfig = `[${ng.sym}] ${tail}`;
      break;
    } else if (z === ng.z) {
      nobleGasConfig = `[${ng.sym}] (${orderedConfig})`;
      break;
    }
  }

  // Determine period, block, and group
  const maxN = Math.max(...subshells.map(s => s.n));
  const period = maxN;

  const lastFillingSubshell = subshells[subshells.length - 1];
  const block = (['s', 'p', 'd', 'f'][lastFillingSubshell.l]) as 's' | 'p' | 'd' | 'f';

  // Valence electrons
  let valenceElectrons = 0;
  if (block === 's' || block === 'p') {
    valenceElectrons = subshells.filter(s => s.n === maxN).reduce((acc, s) => acc + s.electrons, 0);
  } else if (block === 'd') {
    const sShell = subshells.find(s => s.n === maxN && s.name.endsWith('s'));
    const dShell = subshells.find(s => s.n === maxN - 1 && s.name.endsWith('d'));
    valenceElectrons = (sShell ? sShell.electrons : 0) + (dShell ? dShell.electrons : 0);
  } else {
    valenceElectrons = 2; // f-block usually considered 2-3
  }

  // Group deduction
  let group = '';
  if (block === 's') {
    group = `${valenceElectrons}A`;
  } else if (block === 'p') {
    group = `${valenceElectrons}A`;
  } else if (block === 'd') {
    if (valenceElectrons <= 7) group = `${valenceElectrons}B`;
    else if (valenceElectrons === 8 || valenceElectrons === 9 || valenceElectrons === 10) group = 'VIIIB';
    else if (valenceElectrons === 11) group = 'IB';
    else if (valenceElectrons === 12) group = 'IIB';
  } else {
    group = 'Lantanit / Actinit';
  }

  return {
    z,
    fullConfig,
    orderedConfig,
    nobleGasConfig,
    subshells,
    valenceElectrons,
    shellCounts: shellCounts.slice(0, maxN),
    period,
    group,
    block,
    isException
  };
}

/**
 * Unicode superscript converter for electron powers
 */
export function superscript(num: number): string {
  const map: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
  };
  return String(num).split('').map(d => map[d] || d).join('');
}

/**
 * Calculate pH from solution parameters
 */
export function calculateSolutionPH(params: {
  type: 'strong_acid' | 'strong_base' | 'weak_acid' | 'weak_base';
  concentration: number; // M
  valence?: number; // e.g. H2SO4 has 2 H+, Ba(OH)2 has 2 OH-
  pKa?: number;
  pKb?: number;
}): { pH: number; pOH: number; hConcentration: number; ohConcentration: number; steps: string[] } {
  const { type, concentration, valence = 1, pKa, pKb } = params;
  const steps: string[] = [];

  if (concentration <= 0) {
    return {
      pH: 7.0,
      pOH: 7.0,
      hConcentration: 1e-7,
      ohConcentration: 1e-7,
      steps: ['Dung dịch không có chất tan hoặc nồng độ = 0: pH = 7.0 (trung tính)']
    };
  }

  let hConc = 1e-7;
  let ohConc = 1e-7;
  let pH = 7;
  let pOH = 7;

  if (type === 'strong_acid') {
    hConc = concentration * valence;
    pH = -Math.log10(hConc);
    pOH = 14 - pH;
    ohConc = Math.pow(10, -pOH);
    steps.push(`Axit mạnh điện li hoàn toàn: [H⁺] = C × số ion H⁺ = ${concentration} × ${valence} = ${hConc.toExponential(3)} M`);
    steps.push(`pH = -lg[H⁺] = -lg(${hConc.toExponential(3)}) = ${pH.toFixed(2)}`);
  } else if (type === 'strong_base') {
    ohConc = concentration * valence;
    pOH = -Math.log10(ohConc);
    pH = 14 - pOH;
    hConc = Math.pow(10, -pH);
    steps.push(`Bazo mạnh điện li hoàn toàn: [OH⁻] = C × số ion OH⁻ = ${concentration} × ${valence} = ${ohConc.toExponential(3)} M`);
    steps.push(`pOH = -lg[OH⁻] = ${pOH.toFixed(2)} ⇒ pH = 14 - pOH = ${pH.toFixed(2)}`);
  } else if (type === 'weak_acid') {
    const ka = pKa !== undefined ? Math.pow(10, -pKa) : 1.75e-5; // default acetic acid
    // [H+] = sqrt(Ka * C) if alpha < 0.05
    hConc = Math.sqrt(ka * concentration);
    pH = -Math.log10(hConc);
    pOH = 14 - pH;
    ohConc = Math.pow(10, -pOH);
    steps.push(`Axit yếu cân bằng điện li: [H⁺] ≈ √(Ka × C) = √(${ka.toExponential(2)} × ${concentration}) = ${hConc.toExponential(3)} M`);
    steps.push(`pH = -lg[H⁺] = ${pH.toFixed(2)}`);
  } else if (type === 'weak_base') {
    const kb = pKb !== undefined ? Math.pow(10, -pKb) : 1.8e-5; // default NH3
    ohConc = Math.sqrt(kb * concentration);
    pOH = -Math.log10(ohConc);
    pH = 14 - pOH;
    hConc = Math.pow(10, -pH);
    steps.push(`Bazo yếu cân bằng điện li: [OH⁻] ≈ √(Kb × C) = √(${kb.toExponential(2)} × ${concentration}) = ${ohConc.toExponential(3)} M`);
    steps.push(`pOH = ${pOH.toFixed(2)} ⇒ pH = 14 - pOH = ${pH.toFixed(2)}`);
  }

  // Constrain pH to 0..14 range in practice
  pH = Math.max(0, Math.min(14, pH));
  pOH = 14 - pH;

  return {
    pH: Math.round(pH * 100) / 100,
    pOH: Math.round(pOH * 100) / 100,
    hConcentration: hConc,
    ohConcentration: ohConc,
    steps
  };
}

/**
 * Calculate Faraday electrolysis mass: m = (A * I * t) / (n * F)
 * A: atomic mass (g/mol)
 * I: current (Amperes)
 * t: time (seconds)
 * n: number of exchanged electrons
 * F: Faraday constant ~ 96485 C/mol
 */
export function calculateFaraday(params: {
  atomicMass: number;
  currentAmps: number;
  timeSeconds: number;
  electrons: number;
}): { massGrams: number; moles: number; steps: string[] } {
  const F = 96485;
  const { atomicMass, currentAmps, timeSeconds, electrons } = params;

  if (electrons <= 0 || currentAmps <= 0 || timeSeconds <= 0) {
    return { massGrams: 0, moles: 0, steps: ['Thông số không hợp lệ'] };
  }

  const moles = (currentAmps * timeSeconds) / (electrons * F);
  const massGrams = moles * atomicMass;

  return {
    massGrams: Math.round(massGrams * 10000) / 10000,
    moles: Math.round(moles * 100000) / 100000,
    steps: [
      `Điện lượng Q = I × t = ${currentAmps} A × ${timeSeconds} s = ${(currentAmps * timeSeconds).toFixed(1)} C`,
      `Số mol electron trao đổi n(e) = (I × t) / F = ${(currentAmps * timeSeconds).toFixed(1)} / 96485 = ${((currentAmps * timeSeconds) / F).toFixed(5)} mol`,
      `Số mol kim loại thoát ra n = n(e) / ${electrons} = ${moles.toFixed(5)} mol`,
      `Khối lượng m = n × M = ${moles.toFixed(5)} × ${atomicMass} = ${massGrams.toFixed(4)} gam`
    ]
  };
}
