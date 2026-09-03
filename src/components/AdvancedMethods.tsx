import React from 'react';
import { BookOpen, Sparkles, Layers, Award } from 'lucide-react';

export const AdvancedMethods: React.FC = () => {
  const methods = [
    {
      name: 'Xavier / Glorot Initialization',
      author: 'Xavier Glorot & Yoshua Bengio (2010)',
      formula: 'W ~ N(0, 2 / (n_in + n_out))',
      desc: 'Scales initial weight variance according to both input and output layer dimensions. Best suited for symmetric activations like Tanh and Sigmoid.',
      badge: '📚 Advanced / Future Scope'
    },
    {
      name: 'He Initialization (Kaiming He)',
      author: 'Kaiming He et al. (2015)',
      formula: 'W ~ N(0, 2 / n_in)',
      desc: 'Doubles the initial variance multiplier to compensate for dead negative units in Rectified Linear Units (ReLU) and Leaky ReLU activations.',
      badge: '📚 Advanced / Future Scope'
    },
    {
      name: 'LeCun Initialization',
      author: 'Yann LeCun et al. (1998)',
      formula: 'W ~ N(0, 1 / n_in)',
      desc: 'Designed for SELU and specialized normalized neural networks, scaling variance strictly by the number of fan-in input connections.',
      badge: '📚 Advanced / Future Scope'
    }
  ];

  return (
    <section className="py-20 bg-slate-950/60 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Modern Deep Learning Techniques</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Modern Weight Initialization Methods
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            State-of-the-art variance scaling heuristics used in modern deep learning frameworks (PyTorch & TensorFlow).
          </p>
        </div>

        {/* 3 Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {methods.map((m, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 hover:border-purple-500/40 transition-all">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                  {m.badge}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">{m.name}</h3>
                <span className="text-[11px] text-slate-500 block font-mono">{m.author}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-purple-300">
                {m.formula}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
