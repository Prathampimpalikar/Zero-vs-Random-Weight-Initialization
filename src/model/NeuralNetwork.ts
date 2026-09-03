import { tanh, tanhDerivativeFromValue, sigmoid } from './activations';
import { binaryCrossEntropy, calculateEpochLoss, calculateAccuracy } from './loss';
import { initializeWeights, InitMethod, ModelWeights, calculateWeightDiversity } from './initialization';
import { xorDataset } from '../data/xor';

export interface NetworkStateSnapshot {
  epoch: number;
  method: InitMethod;
  learningRate: number;
  weights: ModelWeights;
  lastGradients: {
    w1Grad: number[][];
    b1Grad: number[];
    w2Grad: number[][];
    b2Grad: number[];
  };
  sampleActivations: Array<{
    input: [number, number];
    target: number;
    hiddenZ: number[];
    hiddenA: number[];
    outputZ: number;
    outputA: number;
  }>;
  loss: number;
  accuracy: number;
  weightDiversity: number;
  isConverged: boolean;
}

export interface EpochHistoryPoint {
  epoch: number;
  loss: number;
  accuracy: number;
  // Track specific weights for visualization
  w1_n0_i0: number; // Hidden neuron 0, input 0
  w1_n1_i0: number; // Hidden neuron 1, input 0
  w1_n2_i0: number; // Hidden neuron 2, input 0
  w2_n0: number;    // Output weight 0
}

export class NeuralNetwork {
  private weights: ModelWeights;
  private method: InitMethod;
  private learningRate: number;
  private currentEpoch: number = 0;
  private history: EpochHistoryPoint[] = [];

  constructor(method: InitMethod = 'random', learningRate: number = 0.5, seed: number = 42) {
    this.method = method;
    this.learningRate = learningRate;
    this.weights = initializeWeights(method, seed);
    this.recordHistory();
  }

  public getWeights(): ModelWeights {
    // Return deep copy
    return JSON.parse(JSON.stringify(this.weights));
  }

  public getMethod(): InitMethod {
    return this.method;
  }

  public getLearningRate(): number {
    return this.learningRate;
  }

  public getEpoch(): number {
    return this.currentEpoch;
  }

  public getHistory(): EpochHistoryPoint[] {
    return this.history;
  }

  // Single sample forward pass
  public forward(input: [number, number]): {
    hiddenZ: number[];
    hiddenA: number[];
    outputZ: number;
    outputA: number;
  } {
    const { w1, b1, w2, b2 } = this.weights;

    // Hidden layer: 3 neurons
    const hiddenZ: number[] = [0, 0, 0];
    const hiddenA: number[] = [0, 0, 0];

    for (let j = 0; j < 3; j++) {
      hiddenZ[j] = w1[j][0] * input[0] + w1[j][1] * input[1] + b1[j];
      hiddenA[j] = tanh(hiddenZ[j]);
    }

    // Output layer: 1 neuron
    let outputZ = b2[0];
    for (let j = 0; j < 3; j++) {
      outputZ += w2[0][j] * hiddenA[j];
    }
    const outputA = sigmoid(outputZ);

    return { hiddenZ, hiddenA, outputZ, outputA };
  }

  // Predict method for external callers (returns output scalar prediction & confidence)
  public predict(input: [number, number]): { prediction: number; probability: number; confidencePct: number } {
    const { outputA } = this.forward(input);
    const predClass = outputA >= 0.5 ? 1 : 0;
    const confidencePct = Math.round((predClass === 1 ? outputA : 1 - outputA) * 100);
    return {
      prediction: predClass,
      probability: outputA,
      confidencePct
    };
  }

  // Perform 1 full epoch of training over XOR dataset
  public trainEpoch(): NetworkStateSnapshot {
    const { w1, b1, w2, b2 } = this.weights;

    // Accumulate gradients across batch (full batch GD over 4 XOR samples)
    const w1Grad = [
      [0, 0],
      [0, 0],
      [0, 0]
    ];
    const b1Grad = [0, 0, 0];
    const w2Grad = [[0, 0, 0]];
    const b2Grad = [0];

    const sampleActivations = [];
    const predictions: number[] = [];
    const targets: number[] = [];

    for (const sample of xorDataset) {
      const { input, target } = sample;
      targets.push(target);

      // Forward pass
      const { hiddenZ, hiddenA, outputZ, outputA } = this.forward(input);
      predictions.push(outputA);

      sampleActivations.push({
        input,
        target,
        hiddenZ,
        hiddenA,
        outputZ,
        outputA
      });

      // Output error: dL/dz2 = outputA - target (for BCE + Sigmoid)
      const delta2 = outputA - target;

      // Accumulate output layer gradients
      for (let j = 0; j < 3; j++) {
        w2Grad[0][j] += delta2 * hiddenA[j];
      }
      b2Grad[0] += delta2;

      // Hidden layer error: delta1_j = (w2_j * delta2) * tanhDerivative(hiddenA_j)
      const delta1: number[] = [0, 0, 0];
      for (let j = 0; j < 3; j++) {
        const dActivation = tanhDerivativeFromValue(hiddenA[j]);
        delta1[j] = w2[0][j] * delta2 * dActivation;

        // Accumulate hidden layer gradients
        w1Grad[j][0] += delta1[j] * input[0];
        w1Grad[j][1] += delta1[j] * input[1];
        b1Grad[j] += delta1[j];
      }
    }

    const N = xorDataset.length;
    const lr = this.learningRate;

    // Average gradients and update weights
    for (let j = 0; j < 3; j++) {
      w1Grad[j][0] /= N;
      w1Grad[j][1] /= N;
      b1Grad[j] /= N;

      w1[j][0] -= lr * w1Grad[j][0];
      w1[j][1] -= lr * w1Grad[j][1];
      b1[j] -= lr * b1Grad[j];
    }

    for (let j = 0; j < 3; j++) {
      w2Grad[0][j] /= N;
      w2[0][j] -= lr * w2Grad[0][j];
    }
    b2Grad[0] /= N;
    b2[0] -= lr * b2Grad[0];

    this.currentEpoch++;

    // Calculate current loss & accuracy
    const loss = calculateEpochLoss(predictions, targets);
    const accuracy = calculateAccuracy(predictions, targets);
    const weightDiversity = calculateWeightDiversity(w1);

    this.recordHistory(loss, accuracy);

    return {
      epoch: this.currentEpoch,
      method: this.method,
      learningRate: this.learningRate,
      weights: this.getWeights(),
      lastGradients: {
        w1Grad,
        b1Grad,
        w2Grad,
        b2Grad
      },
      sampleActivations,
      loss,
      accuracy,
      weightDiversity,
      isConverged: accuracy === 100 && loss < 0.05
    };
  }

  // Get current snapshot without training step
  public getSnapshot(): NetworkStateSnapshot {
    const sampleActivations = xorDataset.map(sample => {
      const { hiddenZ, hiddenA, outputZ, outputA } = this.forward(sample.input);
      return {
        input: sample.input,
        target: sample.target,
        hiddenZ,
        hiddenA,
        outputZ,
        outputA
      };
    });

    const predictions = sampleActivations.map(s => s.outputA);
    const targets = xorDataset.map(s => s.target);
    const loss = calculateEpochLoss(predictions, targets);
    const accuracy = calculateAccuracy(predictions, targets);
    const weightDiversity = calculateWeightDiversity(this.weights.w1);

    return {
      epoch: this.currentEpoch,
      method: this.method,
      learningRate: this.learningRate,
      weights: this.getWeights(),
      lastGradients: {
        w1Grad: [[0, 0], [0, 0], [0, 0]],
        b1Grad: [0, 0, 0],
        w2Grad: [[0, 0, 0]],
        b2Grad: [0]
      },
      sampleActivations,
      loss,
      accuracy,
      weightDiversity,
      isConverged: accuracy === 100 && loss < 0.05
    };
  }

  private recordHistory(currentLoss?: number, currentAcc?: number) {
    const snap = currentLoss === undefined ? this.getSnapshot() : { loss: currentLoss, accuracy: currentAcc! };
    this.history.push({
      epoch: this.currentEpoch,
      loss: Number(snap.loss.toFixed(4)),
      accuracy: Number(snap.accuracy.toFixed(1)),
      w1_n0_i0: Number(this.weights.w1[0][0].toFixed(4)),
      w1_n1_i0: Number(this.weights.w1[1][0].toFixed(4)),
      w1_n2_i0: Number(this.weights.w1[2][0].toFixed(4)),
      w2_n0: Number(this.weights.w2[0][0].toFixed(4))
    });
  }
}
