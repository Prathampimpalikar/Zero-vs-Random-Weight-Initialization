import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NeuralNetwork, NetworkStateSnapshot } from '../model/NeuralNetwork';
import { InitMethod } from '../model/initialization';
import { LiveNetworkSVG } from './LiveNetworkSVG';
import { MetricsDashboard } from './MetricsDashboard';
import { TrainingCharts } from './TrainingCharts';
import { Play, Pause, RotateCcw, Cpu, Sliders, Zap, ShieldAlert, Sparkles } from 'lucide-react';

interface SimulatorProps {
  onRunFinished?: (method: InitMethod, snapshot: NetworkStateSnapshot, history: any[]) => void;
}

export const Simulator: React.FC<SimulatorProps> = ({ onRunFinished }) => {
  // Simulator Hyperparameter State
  const [method, setMethod] = useState<InitMethod>('random');
  const [learningRate, setLearningRate] = useState<number>(0.5);
  const [targetEpochs, setTargetEpochs] = useState<number>(1000);
  const [seed, setSeed] = useState<number>(42);
  const [speedMs, setSpeedMs] = useState<number>(5);

  // Model Instance Ref
  const nnRef = useRef<NeuralNetwork>(new NeuralNetwork('random', 0.5, 42));
  const [snapshot, setSnapshot] = useState<NetworkStateSnapshot>(() => nnRef.current.getSnapshot());

  // Training state
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const animFrameRef = useRef<number | null>(null);

  // Re-initialize model
  const handleInitialize = useCallback((selectedMethod = method, lr = learningRate, s = seed) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setIsTraining(false);
    nnRef.current = new NeuralNetwork(selectedMethod, lr, s);
    setSnapshot(nnRef.current.getSnapshot());
  }, [method, learningRate, seed]);

  // Handle Init Method Switch
  const handleMethodSelect = (newMethod: InitMethod) => {
    setMethod(newMethod);
    handleInitialize(newMethod, learningRate, seed);
  };

  // Step training function
  const stepTraining = useCallback(() => {
    if (!nnRef.current) return;

    if (nnRef.current.getEpoch() >= targetEpochs) {
      setIsTraining(false);
      const finalSnap = nnRef.current.getSnapshot();
      if (onRunFinished) {
        onRunFinished(nnRef.current.getMethod(), finalSnap, nnRef.current.getHistory());
      }
      return;
    }

    // Run 5 epochs per animation tick for smooth high-speed simulation
    let latestSnap = snapshot;
    const stepsPerTick = Math.max(1, Math.floor(10 / Math.max(1, speedMs)));
    for (let i = 0; i < stepsPerTick; i++) {
      if (nnRef.current.getEpoch() < targetEpochs) {
        latestSnap = nnRef.current.trainEpoch();
      }
    }

    setSnapshot(latestSnap);

    if (isTraining) {
      setTimeout(() => {
        animFrameRef.current = requestAnimationFrame(stepTraining);
      }, speedMs);
    }
  }, [targetEpochs, speedMs, isTraining, onRunFinished, snapshot]);

  useEffect(() => {
    if (isTraining) {
      animFrameRef.current = requestAnimationFrame(stepTraining);
    } else if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isTraining, stepTraining]);

  const handleTogglePlay = () => {
    if (snapshot.epoch >= targetEpochs) {
      handleInitialize();
    }
    setIsTraining(prev => !prev);
  };

  const handleReset = () => {
    handleInitialize();
  };

  return (
    <section id="simulator" className="py-20 bg-slate-950 relative">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            <span>Main Experiment Laboratory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Interactive Neural Network Simulator
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Configure initialization strategies and hyperparameters, then train the real TypeScript XOR model live in your browser.
          </p>
        </div>

        {/* Top Control Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Method Selector Cards */}
          <div className="lg:col-span-5 space-y-4">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              1. Select Initialization Method
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Zero Init Card */}
              <button
                type="button"
                onClick={() => handleMethodSelect('zero')}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 relative cursor-pointer ${
                  method === 'zero'
                    ? 'bg-rose-950/30 border-rose-500 text-white shadow-xl shadow-rose-500/10 ring-2 ring-rose-500/50'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">⚫</span>
                  {method === 'zero' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                  )}
                </div>
                <h4 className="text-base font-bold text-slate-100">Zero Init</h4>
                <p className="text-xs text-slate-400 mt-1">
                  All weights = 0.00. Trapped in symmetric gradient updates.
                </p>
                <div className="mt-3 flex items-center space-x-1 text-[10px] text-rose-400 font-mono">
                  <ShieldAlert className="w-3 h-3" />
                  <span>Symmetry Trap</span>
                </div>
              </button>

              {/* Random Init Card */}
              <button
                type="button"
                onClick={() => handleMethodSelect('random')}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 relative cursor-pointer ${
                  method === 'random'
                    ? 'bg-cyan-950/30 border-cyan-500 text-white shadow-xl shadow-cyan-500/10 ring-2 ring-cyan-500/50'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">🎲</span>
                  {method === 'random' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </div>
                <h4 className="text-base font-bold text-slate-100">Random Init</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Random non-zero weights. Breaks symmetry immediately.
                </p>
                <div className="mt-3 flex items-center space-x-1 text-[10px] text-cyan-400 font-mono">
                  <Sparkles className="w-3 h-3" />
                  <span>Symmetry Broken</span>
                </div>
              </button>

            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={handleTogglePlay}
                className={`flex-1 min-w-[140px] px-6 py-3.5 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                  isTraining
                    ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-500/20'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-cyan-500/25 hover:scale-[1.02]'
                }`}
              >
                {isTraining ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause Training</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>{snapshot.epoch > 0 ? 'Resume Training' : '▶ Start Training'}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold text-sm flex items-center space-x-2 cursor-pointer transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hyperparameter Controls */}
          <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>2. Hyperparameter Configuration</span>
              </span>
              <button
                onClick={() => handleInitialize()}
                className="text-[11px] font-mono text-cyan-400 hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <Zap className="w-3 h-3" />
                <span>Re-apply Parameters</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Learning Rate Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Learning Rate (η):</span>
                  <span className="text-cyan-400 font-bold">{learningRate}</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1.5"
                  step="0.05"
                  value={learningRate}
                  onChange={(e) => {
                    const lr = parseFloat(e.target.value);
                    setLearningRate(lr);
                    handleInitialize(method, lr, seed);
                  }}
                  className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 block">Gradient descent step size per epoch</span>
              </div>

              {/* Target Epochs */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Target Epochs (N):</span>
                  <span className="text-cyan-400 font-bold">{targetEpochs}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="100"
                  value={targetEpochs}
                  onChange={(e) => setTargetEpochs(parseInt(e.target.value))}
                  className="w-full accent-blue-500 bg-slate-800 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 block">Total iterations over XOR dataset</span>
              </div>

              {/* Seed */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Random Seed:</span>
                  <span className="text-purple-400 font-bold">{seed}</span>
                </div>
                <input
                  type="number"
                  value={seed}
                  disabled={method === 'zero'}
                  onChange={(e) => {
                    const s = parseInt(e.target.value) || 1;
                    setSeed(s);
                    handleInitialize(method, learningRate, s);
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-cyan-500 outline-none disabled:opacity-50"
                />
                <span className="text-[10px] text-slate-500 block">Ensures reproducible pseudo-random numbers</span>
              </div>

              {/* Speed Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Step Speed:</span>
                  <span className="text-emerald-400 font-bold">{speedMs} ms</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={speedMs}
                  onChange={(e) => setSpeedMs(parseInt(e.target.value))}
                  className="w-full accent-emerald-400 bg-slate-800 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 block">Delay interval between visual steps</span>
              </div>

            </div>
          </div>

        </div>

        {/* Live Metrics Dashboard */}
        <MetricsDashboard snapshot={snapshot} targetEpochs={targetEpochs} />

        {/* Live Network Diagram & Recharts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-6">
            <LiveNetworkSVG
              weights={snapshot.weights}
              activations={snapshot.sampleActivations[0]}
              epoch={snapshot.epoch}
              isTraining={isTraining}
            />
          </div>

          <div className="lg:col-span-6">
            <TrainingCharts history={nnRef.current.getHistory()} />
          </div>

        </div>

      </div>
    </section>
  );
};
