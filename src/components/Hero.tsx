import React from 'react';
import { Rocket, Scale, Zap, Activity, CheckCircle2, ShieldAlert } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Glow Effects Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/10 to-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Tag Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide shadow-lg shadow-cyan-500/10">
              <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>B.Tech AI & ML Project • Course: N-PCCCM701T</span>
            </div>

            {/* Main Title */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Zero vs Random <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Initialization
                </span>
              </h1>
              <p className="text-xl lg:text-2xl font-medium text-slate-300">
                Explore How Weight Initialization Shapes Neural Network Learning
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              An interactive Neural Network Learning Lab that visualizes symmetry breaking, weight updates, loss, accuracy, and prediction behavior in real-time. Powered by a live TypeScript backpropagation engine.
            </p>

            {/* Academic Info Banner */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Student</span>
                <span className="font-bold text-slate-200">Pratham Pimpalikar</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">USN</span>
                <span className="font-mono text-cyan-400 font-bold">CM23031</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-slate-500 block text-[10px] uppercase">Target Problem</span>
                <span className="font-semibold text-purple-400">XOR Classification</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => scrollTo('simulator')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_auto] hover:bg-right text-white font-bold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <Rocket className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                <span>🚀 Start Experiment</span>
              </button>

              <button
                onClick={() => scrollTo('comparison')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-bold text-base shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Scale className="w-5 h-5 text-cyan-400" />
                <span>⚖️ Compare Methods</span>
              </button>
            </div>

            {/* Quick stats pills */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <span className="flex items-center space-x-1.5">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Live TS Model</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Backprop & BCE Loss</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Symmetry Breaking Lab</span>
              </span>
            </div>

          </div>

          {/* Right Column: Hero Interactive Network Diagram */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md p-6 rounded-3xl glass-panel glow-box-cyan border border-cyan-500/20 relative">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>2 - 3 - 1 Neural Topology</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                  Interactive
                </span>
              </div>

              {/* Animated SVG Network Representation */}
              <div className="relative py-4">
                <svg viewBox="0 0 320 220" className="w-full h-auto overflow-visible">
                  <defs>
                    <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="connGradActive" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="1" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="1" />
                    </linearGradient>
                  </defs>

                  {/* Input Nodes: (40, 60), (40, 160) */}
                  {/* Hidden Nodes: (160, 40), (160, 110), (160, 180) */}
                  {/* Output Node: (280, 110) */}

                  {/* Connections: Input to Hidden */}
                  <g opacity="0.6">
                    <line x1="40" y1="60" x2="160" y2="40" stroke="url(#connGrad)" strokeWidth="2" />
                    <line x1="40" y1="60" x2="160" y2="110" stroke="url(#connGrad)" strokeWidth="2.5" />
                    <line x1="40" y1="60" x2="160" y2="180" stroke="url(#connGrad)" strokeWidth="1.5" />

                    <line x1="40" y1="160" x2="160" y2="40" stroke="url(#connGrad)" strokeWidth="1.8" />
                    <line x1="40" y1="160" x2="160" y2="110" stroke="url(#connGrad)" strokeWidth="2" />
                    <line x1="40" y1="160" x2="160" y2="180" stroke="url(#connGrad)" strokeWidth="2.5" />
                  </g>

                  {/* Connections: Hidden to Output */}
                  <g opacity="0.8">
                    <line x1="160" y1="40" x2="280" y2="110" stroke="url(#connGradActive)" strokeWidth="3" className="animate-signal" />
                    <line x1="160" y1="110" x2="280" y2="110" stroke="url(#connGradActive)" strokeWidth="2" className="animate-signal" />
                    <line x1="160" y1="180" x2="280" y2="110" stroke="url(#connGradActive)" strokeWidth="2.5" className="animate-signal" />
                  </g>

                  {/* Input Layer Nodes */}
                  <g>
                    <circle cx="40" cy="60" r="14" fill="#1E293B" stroke="#3B82F6" strokeWidth="3" className="animate-pulse" />
                    <text x="40" y="64" textAnchor="middle" fill="#93C5FD" fontSize="10" fontWeight="bold">X₁</text>

                    <circle cx="40" cy="160" r="14" fill="#1E293B" stroke="#3B82F6" strokeWidth="3" className="animate-pulse" />
                    <text x="40" y="164" textAnchor="middle" fill="#93C5FD" fontSize="10" fontWeight="bold">X₂</text>
                  </g>

                  {/* Hidden Layer Nodes */}
                  <g>
                    <circle cx="160" cy="40" r="15" fill="#0F172A" stroke="#06B6D4" strokeWidth="3" />
                    <text x="160" y="44" textAnchor="middle" fill="#67E8F9" fontSize="10" fontWeight="bold">H₁</text>

                    <circle cx="160" cy="110" r="15" fill="#0F172A" stroke="#06B6D4" strokeWidth="3" />
                    <text x="160" y="114" textAnchor="middle" fill="#67E8F9" fontSize="10" fontWeight="bold">H₂</text>

                    <circle cx="160" cy="180" r="15" fill="#0F172A" stroke="#06B6D4" strokeWidth="3" />
                    <text x="160" y="184" textAnchor="middle" fill="#67E8F9" fontSize="10" fontWeight="bold">H₃</text>
                  </g>

                  {/* Output Node */}
                  <g>
                    <circle cx="280" cy="110" r="18" fill="#1E1B4B" stroke="#8B5CF6" strokeWidth="3.5" className="animate-pulse" />
                    <text x="280" y="114" textAnchor="middle" fill="#DDD6FE" fontSize="11" fontWeight="bold">Y</text>
                  </g>

                  {/* Layer Labels */}
                  <text x="40" y="205" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="bold">Input (2)</text>
                  <text x="160" y="205" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="bold">Hidden (3)</text>
                  <text x="280" y="205" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="bold">Output (1)</text>
                </svg>
              </div>

              {/* Card Footer Caption */}
              <div className="mt-2 text-center text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                <span className="text-cyan-400 font-semibold">Live Signals:</span> Forward pass computes <code className="text-purple-300">tanh</code> hidden activations and <code className="text-blue-300">sigmoid</code> prediction output.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
