import React, { useState } from 'react';
import { ShieldAlert, Sparkles, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';

export const SymmetryVisual: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'zero' | 'random'>('zero');

  return (
    <section className="py-20 bg-slate-950/90 relative border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Visual Demonstration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Symmetry Breaking Visualizer
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Toggle between Zero and Random Initialization to see how hidden neuron activation vectors behave under forward propagation and gradient descent.
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setSelectedView('zero')}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center space-x-2 ${
              selectedView === 'zero'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/30 scale-105'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>⚫ Zero Initialization View</span>
          </button>

          <button
            onClick={() => setSelectedView('random')}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center space-x-2 ${
              selectedView === 'random'
                ? 'bg-cyan-500 text-black font-extrabold shadow-lg shadow-cyan-500/30 scale-105'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>🎲 Random Initialization View</span>
          </button>
        </div>

        {/* Symmetry Comparison Container */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-8">
          
          {selectedView === 'zero' ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <span className="text-sm font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-2">
                  <XCircle className="w-5 h-5 text-rose-500" />
                  <span>Zero Initialization: Trapped in Symmetry</span>
                </span>
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded border border-slate-800">
                  W₁₁ = W₂₁ = W₃₁ = 0.00
                </span>
              </div>

              {/* 3 Symmetric Neurons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((neuronId) => (
                  <div key={`sym-h${neuronId}`} className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/40 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-rose-500 mx-auto flex items-center justify-center font-bold text-rose-400 font-mono">
                      H{neuronId}
                    </div>
                    <div className="font-mono text-xs text-rose-300 space-y-1">
                      <div>Weight Vector: [0.00, 0.00]</div>
                      <div>Activation: tanh(0) = 0.000</div>
                      <div>Gradient: ∂L/∂W = 0.042</div>
                    </div>
                    <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-300">
                      Identical Update
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 text-xs text-rose-300 text-center font-mono">
                ⚠️ Result: All 3 hidden neurons output the EXACT SAME vector [0.00, 0.00, 0.00]. They collapse into a single effective neuron, failing to break symmetry!
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <span className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Random Initialization: Symmetry Broken!</span>
                </span>
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded border border-slate-800">
                  W₁₁ ≠ W₂₁ ≠ W₃₁
                </span>
              </div>

              {/* 3 Asymmetric Neurons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 1, w: '[+0.42, -0.18]', a: '+0.364', g: '+0.124', label: 'AND Detector' },
                  { id: 2, w: '[-0.75, +0.63]', a: '-0.598', g: '-0.281', label: 'OR Detector' },
                  { id: 3, w: '[+0.29, +0.81]', a: '+0.712', g: '+0.054', label: 'NAND Detector' }
                ].map((item) => (
                  <div key={`asym-h${item.id}`} className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/40 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-cyan-400 mx-auto flex items-center justify-center font-bold text-cyan-300 font-mono animate-pulse">
                      H{item.id}
                    </div>
                    <div className="font-mono text-xs text-cyan-300 space-y-1">
                      <div>Weight Vector: {item.w}</div>
                      <div>Activation: {item.a}</div>
                      <div>Gradient: {item.g}</div>
                    </div>
                    <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs text-cyan-300 text-center font-mono">
                ✨ Result: Each hidden neuron receives unique gradients, allowing them to specialize into distinct logic detectors and solve non-linear XOR decision boundaries!
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
