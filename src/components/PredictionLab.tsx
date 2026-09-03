import React, { useState } from 'react';
import { NeuralNetwork } from '../model/NeuralNetwork';
import { Target, Sparkles, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export const PredictionLab: React.FC = () => {
  // Local trained network instance for interactive testing
  const [model, setModel] = useState<NeuralNetwork>(() => {
    const nn = new NeuralNetwork('random', 0.5, 42);
    // Train for 800 epochs so prediction lab starts fully trained!
    for (let i = 0; i < 800; i++) nn.trainEpoch();
    return nn;
  });

  const [input1, setInput1] = useState<number>(1);
  const [input2, setInput2] = useState<number>(0);

  const expectedTarget = input1 ^ input2; // Bitwise XOR
  const { prediction, probability, confidencePct } = model.predict([input1, input2]);
  const isCorrect = prediction === expectedTarget;

  const handleRetrainModel = () => {
    const newNN = new NeuralNetwork('random', 0.5, Math.floor(Math.random() * 1000));
    for (let i = 0; i < 800; i++) newNN.trainEpoch();
    setModel(newNN);
  };

  return (
    <section id="prediction" className="py-20 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Inference Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            🎯 XOR Live Prediction Lab
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Test the trained neural network model on arbitrary XOR inputs to verify logic gate classification accuracy and probability confidence.
          </p>
        </div>

        {/* Prediction Interface Dashboard */}
        <div className="max-w-4xl mx-auto glass-panel p-8 rounded-3xl border border-cyan-500/30 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Input Selectors Column */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                1. Select Binary Inputs
              </h3>

              {/* Input X1 Toggle */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">Input X₁</span>
                  <span className="text-xs font-mono text-cyan-400">First Signal</span>
                </div>
                <div className="flex space-x-2">
                  {[0, 1].map((val) => (
                    <button
                      key={`x1-${val}`}
                      onClick={() => setInput1(val)}
                      className={`w-10 h-10 rounded-xl font-bold font-mono text-sm transition-all cursor-pointer ${
                        input1 === val
                          ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30 scale-105'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input X2 Toggle */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">Input X₂</span>
                  <span className="text-xs font-mono text-cyan-400">Second Signal</span>
                </div>
                <div className="flex space-x-2">
                  {[0, 1].map((val) => (
                    <button
                      key={`x2-${val}`}
                      onClick={() => setInput2(val)}
                      className={`w-10 h-10 rounded-xl font-bold font-mono text-sm transition-all cursor-pointer ${
                        input2 === val
                          ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30 scale-105'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleRetrainModel}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 transition-all cursor-pointer"
              >
                🔄 Re-sample Trained Weights
              </button>
            </div>

            {/* Live Model Output Display */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 text-center">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block">
                2. Live Model Output
              </span>

              {/* Input summary */}
              <div className="flex items-center justify-center space-x-3 text-sm font-mono text-slate-300">
                <span className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-cyan-300">
                  Input: [{input1}, {input2}]
                </span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
                <span className="px-3 py-1 rounded bg-purple-950/60 border border-purple-500/40 text-purple-300">
                  Target: {expectedTarget}
                </span>
              </div>

              {/* Large Prediction Output Box */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 uppercase">Model Prediction</span>
                <div className="text-5xl font-black font-mono text-white flex items-center justify-center space-x-3">
                  <span className={isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                    {prediction}
                  </span>
                  {isCorrect ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  ) : (
                    <XCircle className="w-8 h-8 text-rose-400" />
                  )}
                </div>
                <div className="text-xs font-mono text-slate-400 pt-2">
                  Raw Output Probability: <span className="text-cyan-400 font-bold">{probability.toFixed(4)}</span>
                </div>
              </div>

              {/* Confidence Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Confidence Metric:</span>
                  <span className="text-emerald-400 font-bold">{confidencePct}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-300"
                    style={{ width: `${confidencePct}%` }}
                  />
                </div>
              </div>

            </div>

          </div>

          {/* Complete XOR Truth Table Status Grid */}
          <div className="pt-4 border-t border-slate-800">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
              Full XOR Truth Table Verification
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              {[
                [0, 0, 0],
                [0, 1, 1],
                [1, 0, 1],
                [1, 1, 0]
              ].map(([x1, x2, tgt]) => {
                const res = model.predict([x1, x2]);
                const matches = res.prediction === tgt;
                return (
                  <div
                    key={`truth-${x1}-${x2}`}
                    className={`p-3 rounded-xl border flex flex-col justify-between ${
                      matches
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span>[{x1}, {x2}] → {tgt}</span>
                      {matches ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5 text-rose-400" />}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Pred: <strong>{res.prediction}</strong> ({Math.round(res.probability * 100)}%)
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
