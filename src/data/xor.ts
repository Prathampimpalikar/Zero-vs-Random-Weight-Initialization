export interface XORDataPoint {
  input: [number, number];
  target: number;
  label: string;
}

export const xorDataset: XORDataPoint[] = [
  { input: [0, 0], target: 0, label: "0 XOR 0 = 0" },
  { input: [0, 1], target: 1, label: "0 XOR 1 = 1" },
  { input: [1, 0], target: 1, label: "1 XOR 0 = 1" },
  { input: [1, 1], target: 0, label: "1 XOR 1 = 0" }
];
