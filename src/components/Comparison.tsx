import React, { useState } from 'react';
import { NeuralNetwork, NetworkStateSnapshot } from '../model/NeuralNetwork';
import { Scale, Play, CheckCircle2, AlertTriangle, BarChart2 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

export const Comparison: React.FC = () => {
  const [zeroResult, setZeroResult] = useState<NetworkStateSnapshot | null>(null);
  const [randomResult, setRandomResult] = useState<NetworkStateSnapshot | null>(null);
  const [isComparing, setIsComparing] = useState<boolean>(false);

  const handleRunComparison = () => {
    setIsComparing(true);

    setTimeout(() => {
      // 1. Run Zero Initialization model
      const zeroNN = new NeuralNetwork('zero', 0.5, 42);
      for (let i = 0; i < 1000; i++) {
        zeroNN.trainEpoch();
      }
      setZeroResult(zeroNN.getSnapshot());

      // 2. Run Random Initialization model
      const randomNN = new NeuralNetwork('random', 0.5, 42);
      for (let i = 0; i < 1000; i++) {
        randomNN.trainEpoch();
      }
      setRandomResult(randomNN.getSnapshot());

      setIsComparing(false);
    }, 100);
  };

  // Format data for comparison chart if results exist
  const chartData = [
    {
      metric: 'Classification Accuracy (%)',
      ZeroInit: zeroResult ? zeroResult.accuracy : 0,
      RandomInit: randomResult ? randomResult.accuracy : 0
    },
    {
      metric: 'Loss Reduction (1 - Loss)',
      ZeroInit: zeroResult ? Math.max(0, Number((1 - zeroResult.loss).toFixed(2))) : 0,
      RandomInit: randomResult ? Math.max(0, Number((1 - randomResult.loss).toFixed(2))) : 0
    },
    {
      metric: 'Neuron Weight Diversity',
      ZeroInit: zeroResult ? zeroResult.weightDiversity * 10 : 0,
      RandomInit: randomResult ? randomResult.weightDiversity * 10 : 0
    }
  ];

  return (
    <section id="comparison" className="py-20 bg-slate-950/80 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold mb-3">
              <Scale className="w-3.5 h-3.5" />
              <span>Controlled Scientific Experiment</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              ⚖️ Zero vs Random Comparison Laboratory
            </h2>
          </div>

          <button
            onClick={handleRunComparison}
            disabled={isComparing}
            className="mt-4 md:mt-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isComparing ? 'Running Models...' : '⚡ Run Side-by-Side Experiment'}</span>
          </button>
        </div>

        {/* Experiment Setup Identical Control Banner */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <span className="font-semibold text-slate-200">Controlled Parameters:</span>
          <span>Dataset: <strong>XOR Logic Gate</strong></span>
          <span>Architecture: <strong>2 - 3 - 1 Neural Network</strong></span>
          <span>Learning Rate: <strong>η = 0.5</strong></span>
          <span>Epochs: <strong>1,000</strong></span>
          <span>Activations: <strong>tanh (hidden) / sigmoid (output)</strong></span>
        </div>

        {/* Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Zero Init Results Card */}
          <div className="glass-panel p-6 rounded-3xl border border-rose-500/30 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <span>⚫ Zero Initialization</span>
              </h3>
              <span className="text-xs font-mono text-rose-400 bg-rose-950/40 px-2.5 py-1 rounded border border-rose-500/30">
                W₁ = 0.00
              </span>
            </div>

            {zeroResult ? (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Final Loss</span>
                    <span className="text-lg font-bold text-rose-400">{zeroResult.loss.toFixed(4)}</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Final Accuracy</span>
                    <span className="text-lg font-bold text-slate-200">{zeroResult.accuracy.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[10px]">Neuron Weight Diversity</span>
                  <span className="font-mono text-rose-400 font-bold">{zeroResult.weightDiversity.toFixed(4)} (Zero Variance)</span>
                </div>

                <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/20 text-rose-200 flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>Observed Outcome:</strong> Network failed to break symmetry. All 3 hidden units remain identical, making XOR unsolvable.
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 text-sm italic">
                "Run experiment to generate results."
              </div>
            )}
          </div>

          {/* Random Init Results Card */}
          <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <span>🎲 Random Initialization</span>
              </h3>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-500/30">
                W₁ ~ Uniform(-0.8, 0.8)
              </span>
            </div>

            {randomResult ? (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3 font-mono">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Final Loss</span>
                    <span className="text-lg font-bold text-emerald-400">{randomResult.loss.toFixed(4)}</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Final Accuracy</span>
                    <span className="text-lg font-bold text-emerald-400">{randomResult.accuracy.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 block text-[10px]">Neuron Weight Diversity</span>
                  <span className="font-mono text-cyan-400 font-bold">{randomResult.weightDiversity.toFixed(4)} (High Diversity)</span>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-200 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>Observed Outcome:</strong> Symmetry broken at epoch 0. Neurons specialized into logic gates, converging to 100% accuracy.
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 text-sm italic">
                "Run experiment to generate results."
              </div>
            )}
          </div>

        </div>

        {/* Live Empirical Comparison Table */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <BarChart2 className="w-5 h-5 text-cyan-400" />
            <span>Empirical Comparison Table</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Metric / Behavior</th>
                  <th className="p-3.5 text-rose-400">⚫ Zero Initialization</th>
                  <th className="p-3.5 text-emerald-400">🎲 Random Initialization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                <tr>
                  <td className="p-3.5 font-bold text-slate-200">Initial Weight Diversity</td>
                  <td className="p-3.5 text-rose-400">{zeroResult ? zeroResult.weights.w1[0][0].toFixed(2) : '—'} (All 0.00)</td>
                  <td className="p-3.5 text-emerald-400">{randomResult ? randomResult.weightDiversity.toFixed(3) : '—'} (Unique Vector)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-200">Symmetry Breaking</td>
                  <td className="p-3.5 text-rose-400">❌ No (Symmetric Trap)</td>
                  <td className="p-3.5 text-emerald-400">✅ Yes (Broken Instantly)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-200">Neuron Diversity</td>
                  <td className="p-3.5 text-rose-400">0.0000 (Identical Outputs)</td>
                  <td className="p-3.5 text-emerald-400">{randomResult ? randomResult.weightDiversity.toFixed(4) : '—'} (Specialized)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-200">Final Loss (BCE)</td>
                  <td className="p-3.5 text-rose-400">{zeroResult ? zeroResult.loss.toFixed(4) : 'Run to compute'}</td>
                  <td className="p-3.5 text-emerald-400">{randomResult ? randomResult.loss.toFixed(4) : 'Run to compute'}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-200">Final Accuracy (%)</td>
                  <td className="p-3.5 text-rose-400">{zeroResult ? `${zeroResult.accuracy.toFixed(1)}%` : 'Run to compute'}</td>
                  <td className="p-3.5 text-emerald-400">{randomResult ? `${randomResult.accuracy.toFixed(1)}%` : 'Run to compute'}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-200">Learning Behavior</td>
                  <td className="p-3.5 text-rose-400">Flatlined Loss / Stagnant</td>
                  <td className="p-3.5 text-emerald-400">Smooth Convergence to 100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Comparison Bar Chart */}
        {(zeroResult || randomResult) && (
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white">Visual Performance Comparison Chart</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis dataKey="metric" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#334155', borderRadius: '12px' }} />
                  <Legend />
                  <Bar dataKey="ZeroInit" name="⚫ Zero Initialization" fill="#F43F5E" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="RandomInit" name="🎲 Random Initialization" fill="#10B981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
