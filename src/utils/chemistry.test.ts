import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateMolarMass,
  getElectronConfig,
  calculateSolutionPH,
  calculateFaraday
} from './chemistry';

test('calculateMolarMass calculates standard compounds correctly', () => {
  const h2o = calculateMolarMass('H2O');
  assert.equal(Math.round(h2o.molarMass * 10) / 10, 18);
  assert.equal(h2o.elements['H'], 2);
  assert.equal(h2o.elements['O'], 1);

  const caOH2 = calculateMolarMass('Ca(OH)2');
  assert.ok(Math.abs(caOH2.molarMass - 74.09) < 0.1);
  assert.equal(caOH2.elements['Ca'], 1);
  assert.equal(caOH2.elements['O'], 2);
  assert.equal(caOH2.elements['H'], 2);

  const al2so4_3 = calculateMolarMass('Al2(SO4)3');
  assert.ok(Math.abs(al2so4_3.molarMass - 342.15) < 0.2);
  assert.equal(al2so4_3.elements['Al'], 2);
  assert.equal(al2so4_3.elements['S'], 3);
  assert.equal(al2so4_3.elements['O'], 12);
});

test('calculateMolarMass calculates hydrates correctly', () => {
  const cuso4_5h2o = calculateMolarMass('CuSO4.5H2O');
  // Cu 63.55 + S 32.06 + O 64 + 5 * 18.015 = 249.68
  assert.ok(Math.abs(cuso4_5h2o.molarMass - 249.68) < 0.3);
  assert.equal(cuso4_5h2o.elements['H'], 10);
  assert.equal(cuso4_5h2o.elements['O'], 9);
});

test('getElectronConfig computes Aufbau and exceptions', () => {
  // Carbon Z=6: 1s2 2s2 2p2
  const carbon = getElectronConfig(6);
  assert.equal(carbon.valenceElectrons, 4);
  assert.equal(carbon.period, 2);
  assert.equal(carbon.group, '4A');

  // Chromium Z=24 exception: [Ar] 3d5 4s1
  const cr = getElectronConfig(24);
  assert.equal(cr.isException, true);
  assert.ok(cr.orderedConfig.includes('3d⁵ 4s¹'));

  // Iron Z=26: 1s2 2s2 2p6 3s2 3p6 3d6 4s2
  const fe = getElectronConfig(26);
  assert.equal(fe.period, 4);
  assert.equal(fe.block, 'd');
  assert.equal(fe.group, 'VIIIB');
});

test('calculateSolutionPH handles strong acids and bases', () => {
  // 0.01 M HCl
  const hcl = calculateSolutionPH({ type: 'strong_acid', concentration: 0.01 });
  assert.equal(hcl.pH, 2);

  // 0.005 M Ba(OH)2 (valence=2 -> [OH-] = 0.01 M -> pOH = 2 -> pH = 12)
  const baoh2 = calculateSolutionPH({ type: 'strong_base', concentration: 0.005, valence: 2 });
  assert.equal(baoh2.pH, 12);
});

test('calculateFaraday computes mass correctly', () => {
  // Cu (M=64, n=2) with I=2A, t=9648.5s -> n(e) = 2*9648.5 / 96485 = 0.2 mol e -> n(Cu) = 0.1 mol -> m = 6.4g
  const faraday = calculateFaraday({
    atomicMass: 64,
    currentAmps: 2,
    timeSeconds: 9648.5,
    electrons: 2
  });
  assert.ok(Math.abs(faraday.massGrams - 6.4) < 0.05);
});
