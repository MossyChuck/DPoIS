import { TestFunction } from './function';
import { DFT } from './dft';
import Complex from 'complex.js';
import { FFT } from './fft';

const toMagnitude = (x: Complex) => x.abs();
const toPhase = (x: Complex) => x.arg();

function computeDft(inreal: number[], inimag: number[]) {
	var n = inreal.length;
	var outreal = new Array(n);
	var outimag = new Array(n);
	for (var k = 0; k < n; k++) {  // For each output element
		var sumreal = 0;
		var sumimag = 0;
		for (var t = 0; t < n; t++) {  // For each input element
			var angle = 2 * Math.PI * t * k / n;
			sumreal +=  inreal[t] * Math.cos(angle) + inimag[t] * Math.sin(angle);
			sumimag += -inreal[t] * Math.sin(angle) + inimag[t] * Math.cos(angle);
		}
		outreal[k] = sumreal;
		outimag[k] = sumimag;
	}
	return [outreal, outimag];
}

export const calculate = (n: number) => {
  const testFunction = new TestFunction();
  const original = testFunction.getData(n);
  const dft = new DFT();
  const [dftResult, dftQuantity] = dft.process(original);
  const dftRestored = dft.restore(dftResult);
  const fft = new FFT();
  const [fftResult, fftQuantity] = fft.process(original.map(x => new Complex(x, 0)));
  const fftRestored = fft.restore(fftResult);
  return {
    original,
    dft: {
      re: dftResult.map(v => v.re),
      im: dftResult.map(v => v.im),
      magnitude: dftResult.map(toMagnitude),
      phase: dftResult.map(toPhase),
      restored: dftRestored.map(v => v.re),
      quantity: dftQuantity,
    },
    fft: {
      re: fftResult.map(v => v.re),
      im: fftResult.map(v => v.im),
      magnitude: fftResult.map(x => x.div(original.length, 0)).map(toMagnitude),
      phase: fftResult.map(x => x.div(original.length, 0)).map(toPhase),
      restored: fftRestored.map(v => v.div(original.length, 0).re),
      quantity: fftQuantity,
    },
  };
} 