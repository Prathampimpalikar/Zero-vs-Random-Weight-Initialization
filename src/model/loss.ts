// Binary Cross Entropy Loss
export function binaryCrossEntropy(predicted: number, target: number): number {
  const eps = 1e-15;
  const p = Math.max(eps, Math.min(1 - eps, predicted));
  return -(target * Math.log(p) + (1 - target) * Math.log(1 - p));
}

// Calculate mean loss over dataset
export function calculateEpochLoss(predictions: number[], targets: number[]): number {
  let totalLoss = 0;
  for (let i = 0; i < predictions.length; i++) {
    totalLoss += binaryCrossEntropy(predictions[i], targets[i]);
  }
  return totalLoss / predictions.length;
}

// Calculate accuracy (% of predictions within 0.5 threshold of target)
export function calculateAccuracy(predictions: number[], targets: number[]): number {
  let correct = 0;
  for (let i = 0; i < predictions.length; i++) {
    const predClass = predictions[i] >= 0.5 ? 1 : 0;
    if (predClass === targets[i]) {
      correct++;
    }
  }
  return (correct / predictions.length) * 100;
}
