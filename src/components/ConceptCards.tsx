import React from 'react';
import { BookOpen, Layers, ShieldCheck, Zap, GitCommit, SlidersHorizontal, Sparkles } from 'lucide-react';

export const ConceptCards: React.FC = () => {
  return (
    <section id="concepts" className="py-20 bg-slate-950/60 relative border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Theoretical Foundations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Core Concepts of Weight Initialization
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Understand why initial parameters are crucial for deep neural networks to break symmetry, maintain gradient flow, and converge efficiently.
          </p>
        </div>

        {/* Grid of Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Card 1: What is Weight Initialization? */}
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:border-blue-500/40 transition-all">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Layers className="w-32 h-32 text-blue-400" />
            </div>
            <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400 w-fit mb-6">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              What is Weight Initialization?
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Weight initialization is the procedure used to set the initial starting values of neural network parameters (weights $W$ and biases $b$) prior to model training via gradient descent.
            </p>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="flex items-center space-x-2 font-mono text-cyan-400">
                <GitCommit className="w-4 h-4" />
                <span>Transformation Formula: z = W · x + b</span>
              </div>
              <p>
                The initial values determine the starting position in the loss landscape. Poor choices cause vanishing/exploding gradients or static symmetric traps.
              </p>
            </div>
          </div>

          {/* Card 2: Why is Initialization Important? */}
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:border-purple-500/40 transition-all">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Sparkles className="w-32 h-32 text-purple-400" />
            </div>
            <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 w-fit mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Why is Initialization Important?
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Gradient descent is a local optimization algorithm. If initial weights are uniform or identical across hidden units, gradient updates remain symmetrical across neurons.
            </p>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="flex items-center space-x-2 font-mono text-purple-400">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Optimization Trajectory</span>
              </div>
              <p>
                Proper initialization enables hidden neurons to specialize and extract diverse non-linear features rather than duplicating identical operations.
              </p>
            </div>
          </div>

        </div>

        {/* 5 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Symmetry Breaking</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Forces hidden neurons to learn distinct representations.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-blue-500/40 transition-all">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Gradient Flow</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prevents vanishing or exploding signal during backpropagation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition-all">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
              <GitCommit className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Fast Convergence</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Accelerates loss minimization towards global optima.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 transition-all">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Feature Specialization</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Allows layers to decompose complex input relationships.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition-all">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Training Stability</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ensures numerical precision and avoids gradient saturation.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
