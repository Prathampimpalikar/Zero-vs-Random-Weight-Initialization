// Activation functions and their derivatives

// Tanh activation for hidden layer
export function tanh(x: number): number {
  return Math.tanh(x);
}

export function tanhDerivativeFromValue(tanhVal: number): number {
  return 1 - tanhVal * tanhVal;
}

// Sigmoid activation for output layer
export function sigmoid(x: number): number {
  // Clamp x to avoid overflow/underflow
  const clampedX = Math.max(-50, Math.min(50, x));
  return 1 / (1 + Math.exp(-clampedX));
}

export function sigmoidDerivativeFromValue(sigVal: number): number {
  return sigVal * (1 - sigVal);
}
