import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { EpochHistoryPoint } from '../model/NeuralNetwork';
import { TrendingDown, Award, GitBranch } from 'lucide-react';

interface TrainingChartsProps {
  history: EpochHistoryPoint[];
}

export const TrainingCharts: React.FC<TrainingChartsProps> = ({ history }) => {
  const [activeTab, setActiveTab] = useState<'loss' | 'accuracy' | 'weights'>('loss');

  // Sample data points to keep chart performant if epoch count is large (> 200)
  const sampledHistory = React.useMemo(() => {
    if (history.length <= 150) return history;
    const step = Math.ceil(history.length / 150);
    return history.filter((_, idx) => idx % step === 0 || idx === history.length - 1);
  }, [history]);

  return (
    <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
      
      {/* Chart Header & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <span>📊 Live Experiment Metrics & Convergence Trajectory</span>
          </h3>
          <p className="text-xs text-slate-400">
            Real-time loss curve, accuracy progress, and weight trajectory computed directly by the TypeScript neural network engine.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('loss')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              activeTab === 'loss' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Loss vs Epoch</span>
          </button>

          <button
            onClick={() => setActiveTab('accuracy')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              activeTab === 'accuracy' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Accuracy vs Epoch</span>
          </button>

          <button
            onClick={() => setActiveTab('weights')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              activeTab === 'weights' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Weight Evolution</span>
          </button>
        </div>
      </div>

      {/* Chart Display Area */}
      <div className="h-72 w-full pt-2">
        {sampledHistory.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm">
            Press "▶ Train" to start generating real-time learning metrics.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {activeTab === 'loss' ? (
              <LineChart data={sampledHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="epoch" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} domain={[0, 'auto']} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  labelStyle={{ color: '#94A3B8' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Line
                  type="monotone"
                  dataKey="loss"
                  name="Binary Cross-Entropy Loss"
                  stroke="#F43F5E"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6, fill: '#F43F5E' }}
                />
              </LineChart>
            ) : activeTab === 'accuracy' ? (
              <LineChart data={sampledHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="epoch" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} domain={[0, 100]} unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  labelStyle={{ color: '#94A3B8' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  name="Classification Accuracy (%)"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6, fill: '#10B981' }}
                />
              </LineChart>
            ) : (
              <LineChart data={sampledHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="epoch" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  labelStyle={{ color: '#94A3B8' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Line
                  type="monotone"
                  dataKey="w1_n0_i0"
                  name="Weight H1 (X1 → H1)"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="w1_n1_i0"
                  name="Weight H2 (X1 → H2)"
                  stroke="#06B6D4"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="w1_n2_i0"
                  name="Weight H3 (X1 → H3)"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="w2_n0"
                  name="Output Weight (H1 → Y)"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
};
