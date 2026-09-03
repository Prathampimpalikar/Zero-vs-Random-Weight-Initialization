import React from 'react';
import { AlertTriangle, ShieldAlert, ArrowDown, HelpCircle, CheckCircle2 } from 'lucide-react';

export const ZeroSection: React.FC = () => {
  return (
    <section id="zero-init" className="py-20 bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Initialization Strategy A</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center space-x-3">
              <span>⚫ Zero Initialization</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md mt-2 md:mt-0">
            Setting all weight parameters to exactly zero causes every neuron in a hidden layer to compute identical functions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Mathematical Matrix & Symmetry Diagram */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Weight Matrix Card */}
            <div className="glass-panel p-6 rounded-3xl border border-rose-500/20 bg-rose-950/10">
              <span className="text-xs font-mono text-rose-400 uppercase tracking-widest block mb-3">
                Hidden Layer Weight Matrix (W₁)
              </span>
              <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 font-mono text-center text-sm sm:text-base text-rose-300">
                <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                  <div className="p-2 bg-slate-900 rounded border border-rose-500/30">W₁₁ = 0.000</div>
                  <div className="p-2 bg-slate-900 rounded border border-rose-500/30">W₁₂ = 0.000</div>
                  <div className="p-2 bg-slate-900 rounded border border-rose-500/30">W₂₁ = 0.000</div>
                  <div className="p-2 bg-slate-900 rounded border border-rose-500/30">W₂₂ = 0.000</div>
                  <div className="p-2 bg-slate-900 rounded border border-rose-500/30">W₃₁ = 0.000</div>
                  <div className="p-2 bg-slate-900 rounded border border-rose-500/30">W₃₂ = 0.000</div>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-3 text-center">
                All 6 incoming hidden connection weights are set to 0.
              </p>
            </div>

            {/* Symmetry Trap Pipeline */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                The Symmetry Trap Chain Reaction
              </span>

              {[
                { title: 'All Hidden Neurons', sub: 'H₁, H₂, H₃ start with identical zero weights' },
                { title: 'Same Initial Activations', sub: 'a₁ = tanh(0) = 0, a₂ = tanh(0) = 0, a₃ = tanh(0) = 0' },
                { title: 'Identical Backprop Gradients', sub: '∂L/∂W₁ = ∂L/∂W₂ = ∂L/∂W₃' },
                { title: 'Identical Weight Updates', sub: 'W₁_new = W₂_new = W₃_new after SGD step' },
                { title: 'Symmetry Remains Intact', sub: 'Network acts as a single-neuron model (Cannot learn XOR)' }
              ].map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-bold font-mono">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">{step.title}</h4>
                      <p className="text-[11px] text-slate-400 font-mono">{step.sub}</p>
                    </div>
                  </div>
                  {idx < 4 && (
                    <div className="flex justify-center my-1 text-slate-600">
                      <ArrowDown className="w-4 h-4 text-rose-500/60" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

          </div>

          {/* Right Column: Educational Warning & Nuance Card */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Warning Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-950/40 to-slate-900 border border-rose-500/40 text-slate-200 space-y-4 shadow-xl">
              <div className="flex items-center space-x-3 text-rose-400">
                <AlertTriangle className="w-7 h-7 flex-shrink-0" />
                <h3 className="text-xl font-bold">Educational Warning</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                ⚠️ Initializing all hidden-layer weights to zero prevents effective symmetry breaking. Every hidden unit receives identical error signals, causing them to move synchronously in weight space.
              </p>
            </div>

            {/* Nuance & Clarification Card (IMPORTANT requirement #31) */}
            <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 space-y-4">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
                <span>Important Technical Distinction</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Do not confuse <strong className="text-cyan-300">zero initialization of weights</strong> with <strong className="text-emerald-300">zero initialization of biases</strong>:
              </p>
              
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start space-x-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-200">Weights (W = 0):</span>
                    <p className="text-slate-400">
                      Problematic for hidden layers because it forces incoming gradient symmetry.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-200">Biases (b = 0):</span>
                    <p className="text-slate-400">
                      Standard and safe! As long as weights $W$ are randomized, initializing biases $b=0$ breaks symmetry correctly without issue.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-[11px] text-cyan-200">
                💡 <strong>Key Takeaway:</strong> Zero initialization isn't "broken math" — it's mathematically sound gradient descent, but trapped in an uninformative symmetric equilibrium!
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
