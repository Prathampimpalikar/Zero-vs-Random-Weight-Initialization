import React from 'react';
import { BookOpen, FunctionSquare, Layers, Activity, GitCommit } from 'lucide-react';

export const MathSection: React.FC = () => {
  return (
    <section id="math" className="py-20 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mathematical Derivations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Formal Mathematical Formulations
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Detailed mathematical equations governing forward propagation, non-linear activations, cross-entropy loss, and gradient updates.
          </p>
        </div>

        {/* Math Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Forward Propagation */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center space-x-3 text-cyan-400">
              <FunctionSquare className="w-6 h-6" />
              <h3 className="text-xl font-bold text-white">1. Forward Propagation</h3>
            </div>
            
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-cyan-300 text-sm space-y-2">
              <div>z<sup>(1)</sup> = W<sup>(1)</sup> · x + b<sup>(1)</sup></div>
              <div>a<sup>(1)</sup> = tanh(z<sup>(1)</sup>)</div>
              <div>z<sup>(2)</sup> = W<sup>(2)</sup> · a<sup>(1)</sup> + b<sup>(2)</sup></div>
              <div>a<sup>(2)</sup> = σ(z<sup>(2)</sup>)</div>
            </div>

            <div className="text-xs text-slate-400 space-y-1">
              <p><strong className="text-slate-200">W<sup>(1)</sup>:</strong> Weight matrix for hidden layer (3×2)</p>
              <p><strong className="text-slate-200">x:</strong> Input vector [X₁, X₂]<sup>T</sup> (2×1)</p>
              <p><strong className="text-slate-200">W<sup>(2)</sup>:</strong> Output weight vector (1×3)</p>
            </div>
          </div>

          {/* Card 2: Activation Functions */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center space-x-3 text-purple-400">
              <Layers className="w-6 h-6" />
              <h3 className="text-xl font-bold text-white">2. Activation Functions</h3>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-purple-300 text-sm space-y-3">
              <div>
                <span className="text-xs text-slate-400 block font-sans">Hidden Layer (Hyperbolic Tangent):</span>
                tanh(z) = (e<sup>z</sup> - e<sup>-z</sup>) / (e<sup>z</sup> + e<sup>-z</sup>)
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-sans">Output Layer (Sigmoid):</span>
                σ(z) = 1 / (1 + e<sup>-z</sup>)
              </div>
            </div>

            <div className="text-xs text-slate-400 space-y-1">
              <p><strong className="text-slate-200">tanh:</strong> Maps hidden values to (-1, 1), zero-centered for smooth gradients.</p>
              <p><strong className="text-slate-200">σ(z):</strong> Maps output to interval (0, 1), representing target classification probability.</p>
            </div>
          </div>

          {/* Card 3: Binary Cross-Entropy Loss */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center space-x-3 text-rose-400">
              <Activity className="w-6 h-6" />
              <h3 className="text-xl font-bold text-white">3. Binary Cross-Entropy Loss</h3>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-rose-300 text-sm">
              L(a, y) = - [ y · ln(a) + (1 - y) · ln(1 - a) ]
            </div>

            <div className="text-xs text-slate-400 space-y-1">
              <p><strong className="text-slate-200">y:</strong> Ground truth binary label (0 or 1)</p>
              <p><strong className="text-slate-200">a:</strong> Model predicted scalar probability a<sup>(2)</sup></p>
              <p>Penalizes confident incorrect predictions exponentially.</p>
            </div>
          </div>

          {/* Card 4: Gradient Descent Update */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center space-x-3 text-emerald-400">
              <GitCommit className="w-6 h-6" />
              <h3 className="text-xl font-bold text-white">4. Gradient Descent Update</h3>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-emerald-300 text-sm space-y-2">
              <div>W<sub>new</sub> = W<sub>old</sub> - η · (∂L / ∂W)</div>
              <div>b<sub>new</sub> = b<sub>old</sub> - η · (∂L / ∂b)</div>
            </div>

            <div className="text-xs text-slate-400 space-y-1">
              <p><strong className="text-slate-200">η:</strong> Learning rate parameter (hyperparameter step size)</p>
              <p><strong className="text-slate-200">∂L / ∂W:</strong> Partial derivative gradient of loss with respect to weights</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
