import React, { useState } from 'react';
import { Database, Sliders, Brain, ArrowRight, Activity, RotateCcw, Award, CheckCircle, Zap } from 'lucide-react';

export const Workflow: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      title: '1. XOR Dataset',
      icon: Database,
      desc: '4 binary logic samples: [0,0]→0, [0,1]→1, [1,0]→1, [1,1]→0. Requires non-linear decision boundary.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/30'
    },
    {
      title: '2. Select Initialization',
      icon: Sliders,
      desc: 'Choose Zero Initialization (trapped in symmetry) or Random Initialization (symmetry broken).',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/30'
    },
    {
      title: '3. Initialize Weights',
      icon: Brain,
      desc: 'Populate weight matrices W₁ (3x2), b₁ (3), W₂ (1x3), b₂ (1) with selected starting values.',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10 border-cyan-500/30'
    },
    {
      title: '4. Forward Propagation',
      icon: ArrowRight,
      desc: 'Compute z₁ = W₁x + b₁, hidden activations a₁ = tanh(z₁), and output prediction a₂ = σ(W₂a₁ + b₂).',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/30'
    },
    {
      title: '5. Calculate Loss',
      icon: Activity,
      desc: 'Evaluate Binary Cross Entropy loss: L = -[y ln(a₂) + (1-y) ln(1-a₂)].',
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10 border-rose-500/30'
    },
    {
      title: '6. Backpropagation & Gradients',
      icon: Zap,
      desc: 'Apply chain rule to compute partial derivatives ∂L/∂W₂ and ∂L/∂W₁ for all parameters.',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/30'
    },
    {
      title: '7. Update Weights (SGD)',
      icon: RotateCcw,
      desc: 'Perform gradient descent update: W_new = W_old - η · ∂L/∂W.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/30'
    },
    {
      title: '8. Calculate Accuracy & Repeat',
      icon: Award,
      desc: 'Track accuracy metric per epoch and repeat for N epochs until convergence.',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10 border-cyan-500/30'
    }
  ];

  return (
    <section id="workflow" className="py-20 bg-slate-950/70 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>End-to-End ML Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Neural Learning Workflow
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Click through each stage of the training loop to inspect how data passes through forward propagation, backpropagation, and weight updates.
          </p>
        </div>

        {/* Workflow Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'bg-slate-900 border-cyan-500 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-500/50 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl border ${step.bgColor} ${step.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    STEP {idx + 1}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{step.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Selected Step Detailed View Card */}
        <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-4 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              {React.createElement(steps[activeStep].icon, { className: 'w-8 h-8' })}
            </div>
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">
                Active Inspection Focus
              </span>
              <h3 className="text-xl font-bold text-white">{steps[activeStep].title}</h3>
              <p className="text-xs text-slate-300 max-w-xl mt-1">{steps[activeStep].desc}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveStep(prev => (prev > 0 ? prev - 1 : steps.length - 1))}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300"
            >
              ← Previous
            </button>
            <button
              onClick={() => setActiveStep(prev => (prev < steps.length - 1 ? prev + 1 : 0))}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs"
            >
              Next Step →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
