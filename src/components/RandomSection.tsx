import React, { useState } from 'react';
import { Sparkles, RefreshCw, ArrowDown, CheckCircle, Zap } from 'lucide-react';
import { initializeWeights } from '../model/initialization';

export const RandomSection: React.FC = () => {
  const [seed, setSeed] = useState(42);
  const weights = initializeWeights('random', seed);

  const handleRegenerate = () => {
    setSeed(prev => prev + 1);
  };

  return (
    <section id="random-init" className="py-20 bg-slate-950/60 relative border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Initialization Strategy B (Recommended)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center space-x-3">
              <span>🎲 Random Initialization</span>
            </h2>
          </div>
          <button
            onClick={handleRegenerate}
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-400 text-xs font-bold transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 animate-spin-hover" />
            <span>Generate New Sample Matrix</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Real Live Random Weight Matrix */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 bg-emerald-950/10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block">
                  Live Generated Random Matrix (W₁)
                </span>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                  Seed: {seed}
                </span>
              </div>

              {/* Displaying actual model initialized numbers */}
              <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 font-mono text-center text-sm sm:text-base text-emerald-300">
                <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                  {weights.w1.map((row, rIdx) => (
                    <React.Fragment key={rIdx}>
                      <div className="p-2.5 bg-slate-900 rounded border border-emerald-500/30 text-emerald-400 font-bold">
                        W{rIdx + 1}₁ = {row[0] > 0 ? `+${row[0].toFixed(3)}` : row[0].toFixed(3)}
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded border border-emerald-500/30 text-emerald-400 font-bold">
                        W{rIdx + 1}₂ = {row[1] > 0 ? `+${row[1].toFixed(3)}` : row[1].toFixed(3)}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-3 text-center">
                ✨ Notice: Every single weight starts with a unique magnitude and sign (+/-).
              </p>
            </div>

            {/* Symmetry Broken Pipeline */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                The Symmetry Breaking Advantage
              </span>

              {[
                { title: 'Random Initial Weights', sub: 'H₁, H₂, H₃ start with unique non-zero values' },
                { title: 'Symmetry Broken Instantly', sub: 'No two hidden units compute the same transformation' },
                { title: 'Diverse Activations', sub: 'tanh(z₁) ≠ tanh(z₂) ≠ tanh(z₃)' },
                { title: 'Different Error Gradients', sub: '∂L/∂W₁ ≠ ∂L/∂W₂ ≠ ∂L/∂W₃' },
                { title: 'Independent Feature Specialization', sub: 'Neurons specialize into unique logic detectors for XOR' }
              ].map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold font-mono">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">{step.title}</h4>
                      <p className="text-[11px] text-slate-400 font-mono">{step.sub}</p>
                    </div>
                  </div>
                  {idx < 4 && (
                    <div className="flex justify-center my-1 text-slate-600">
                      <ArrowDown className="w-4 h-4 text-emerald-500/60" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

          </div>

          {/* Right Column: Why Random Works Card */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/40 text-slate-200 space-y-4 shadow-xl">
              <div className="flex items-center space-x-3 text-emerald-400">
                <Sparkles className="w-7 h-7 flex-shrink-0" />
                <h3 className="text-xl font-bold">Why Random Initialization Works</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                By breaking symmetry at step zero, random initialization allows backpropagation to compute distinct partial derivatives for each weight.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                  <div className="text-xs">
                    <strong className="text-white">Independent Gradient Directions:</strong>
                    <p className="text-slate-400">Each hidden unit explores a different pathway in parameter space.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start space-x-3">
                  <Zap className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                  <div className="text-xs">
                    <strong className="text-white">XOR Problem Solvability:</strong>
                    <p className="text-slate-400">XOR requires non-linear decision boundaries. Neurons must specialize into AND/OR/NAND primitive feature detectors.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
