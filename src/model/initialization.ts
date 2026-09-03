// Seeded pseudo-random number generator (Mulberry32)
export function createPRNG(seed: number) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type InitMethod = 'zero' | 'random';

export interface ModelWeights {
  // W1: 3 hidden neurons x 2 inputs
  w1: number[][]; 
  // b1: 3 hidden biases
  b1: number[];
  // W2: 1 output neuron x 3 hidden inputs
  w2: number[][]; 
  // b2: 1 output bias
  b2: number[];
}

export function initializeWeights(method: InitMethod, seed: number = 42): ModelWeights {
  if (method === 'zero') {
    return {
      w1: [
        [0, 0],
        [0, 0],
        [0, 0]
      ],
      b1: [0, 0, 0],
      w2: [[0, 0, 0]],
      b2: [0]
    };
  }

  // Random initialization using Box-Muller transform for normal distribution or small random numbers
  const prng = createPRNG(seed);
  const randomVal = () => {
    // Uniform between -0.8 and 0.8 to ensure good initial variance
    return (prng() - 0.5) * 1.6;
  };

  return {
    w1: [
      [randomVal(), randomVal()],
      [randomVal(), randomVal()],
      [randomVal(), randomVal()]
    ],
    b1: [randomVal() * 0.1, randomVal() * 0.1, randomVal() * 0.1],
    w2: [[randomVal(), randomVal(), randomVal()]],
    b2: [randomVal() * 0.1]
  };
}

// Calculate Weight Diversity Metric (variance of weight vectors across hidden neurons)
export function calculateWeightDiversity(w1: number[][]): number {
  // w1 has 3 rows (neurons), each having 2 weights
  if (w1.length < 2) return 0;
  
  // Calculate Euclidean distance between neuron weight pairs
  let totalDistance = 0;
  let pairs = 0;
  
  for (let i = 0; i < w1.length; i++) {
    for (let j = i + 1; j < w1.length; j++) {
      let sumSq = 0;
      for (let k = 0; k < w1[i].length; k++) {
        sumSq += Math.pow(w1[i][k] - w1[j][k], 2);
      }
      totalDistance += Math.sqrt(sumSq);
      pairs++;
    }
  }
  
  return pairs > 0 ? totalDistance / pairs : 0;
}
