import React from 'react';
import { NetworkStateSnapshot } from '../model/NeuralNetwork';
import { Activity, Target, ShieldCheck, Cpu, Layers } from 'lucide-react';

interface MetricsDashboardProps {
  snapshot: NetworkStateSnapshot;
  targetEpochs: number;
}

export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({ snapshot, targetEpochs }) => {
  const { epoch, method, loss, accuracy, weightDiversity, isConverged } = snapshot;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      
      {/* Card 1: Epoch */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
        <div className="flex justify-between items-center text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase">Epoch</span>
          <Cpu className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <div className="text-2xl font-black text-white font-mono">
            {epoch} <span className="text-xs text-slate-500 font-sans font-normal">/ {targetEpochs}</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full transition-all duration-200"
              style={{ width: `${Math.min(100, (epoch / targetEpochs) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card 2: Loss */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
        <div className="flex justify-between items-center text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase">Loss (BCE)</span>
          <Activity className="w-4 h-4 text-rose-400" />
        </div>
        <div>
          <div className="text-2xl font-black text-rose-400 font-mono">
            {loss.toFixed(4)}
          </div>
          <span className="text-[10px] text-slate-400">
            {loss < 0.1 ? '🟢 Low Error' : '🔴 High Error'}
          </span>
        </div>
      </div>

      {/* Card 3: Accuracy */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
        <div className="flex justify-between items-center text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase">Accuracy</span>
          <Target className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {accuracy.toFixed(1)}%
          </div>
          <span className="text-[10px] text-slate-400">
            {isConverged ? '✨ Solved XOR!' : accuracy > 50 ? '🟡 Partial' : '🔴 Unlearned'}
          </span>
        </div>
      </div>

      {/* Card 4: Method */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
        <div className="flex justify-between items-center text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase">Method</span>
          <ShieldCheck className="w-4 h-4 text-purple-400" />
        </div>
        <div>
          <div className="text-xl font-bold capitalize text-white flex items-center space-x-1.5">
            <span>{method === 'zero' ? '⚫ Zero' : '🎲 Random'}</span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 block mt-1">
            {method === 'zero' ? 'Symmetric Trap' : 'Symmetry Broken'}
          </span>
        </div>
      </div>

      {/* Card 5: Weight Diversity */}
      <div className="col-span-2 lg:col-span-1 glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
        <div className="flex justify-between items-center text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase">Neuron Diversity</span>
          <Layers className="w-4 h-4 text-amber-400" />
        </div>
        <div>
          <div className="text-2xl font-black font-mono text-amber-400">
            {weightDiversity.toFixed(3)}
          </div>
          <span className="text-[10px] text-slate-400">
            {weightDiversity === 0 ? '⚠️ Zero Diversity (Static)' : '✨ High Variance'}
          </span>
        </div>
      </div>

    </div>
  );
};
