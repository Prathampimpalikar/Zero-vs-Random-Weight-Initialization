import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { HelpCircle, Award, CheckCircle2, XCircle, RotateCcw, Sparkles } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Why is zero initialization problematic for hidden-layer weights in neural networks?",
    options: [
      "A. It increases the dataset size unnecessarily",
      "B. It prevents effective symmetry breaking across hidden neurons",
      "C. It completely removes the output activation layer",
      "D. It forces the learning rate to drop to zero"
    ],
    correctIndex: 1,
    explanation: "Zero initializing hidden weights causes every neuron in the same layer to compute identical activations and receive identical backprop gradients, keeping them permanently symmetric."
  },
  {
    id: 2,
    question: "Is zero initialization ALWAYS invalid in neural network training?",
    options: [
      "A. Yes, zero initialization is mathematically illegal in all layers",
      "B. No, zero initialization can be appropriate for biases if weights are randomized",
      "C. Yes, zero initialization causes hardware memory corruption",
      "D. No, zero initialization is the optimal strategy for deep ResNets"
    ],
    correctIndex: 1,
    explanation: "Bias terms (b) can safely be initialized to zero as long as the weight matrix (W) is randomized to break neuron symmetry."
  },
  {
    id: 3,
    question: "What primary advantage does Random Initialization provide at Epoch 0?",
    options: [
      "A. It guarantees 100% classification accuracy without training",
      "B. It immediately breaks symmetry, allowing hidden neurons to learn distinct features",
      "C. It bypasses backpropagation and skips gradient updates",
      "D. It eliminates the need for activation functions"
    ],
    correctIndex: 1,
    explanation: "Random starting weights give each neuron a unique response vector, enabling independent gradient trajectories during SGD."
  },
  {
    id: 4,
    question: "Which activation function is used in the hidden layer of our XOR Neural Network model?",
    options: [
      "A. Softmax",
      "B. Hyperbolic Tangent (tanh)",
      "C. Linear Identity",
      "D. Step Function"
    ],
    correctIndex: 1,
    explanation: "Tanh maps hidden neuron values to (-1, 1) and provides zero-centered smooth derivatives for gradient descent."
  },
  {
    id: 5,
    question: "What loss function is used to calculate classification error for binary XOR outputs?",
    options: [
      "A. Mean Squared Error (MSE)",
      "B. Binary Cross-Entropy (BCE)",
      "C. Huber Loss",
      "D. Cosine Similarity Loss"
    ],
    correctIndex: 1,
    explanation: "Binary Cross-Entropy (BCE) measures probabilistic loss for binary classification targets (0 or 1)."
  },
  {
    id: 6,
    question: "Which modern initialization method is specifically scaled for Tanh and Sigmoid activations?",
    options: [
      "A. He Initialization",
      "B. Xavier / Glorot Initialization",
      "C. LeCun Initialization",
      "D. Constant One Initialization"
    ],
    correctIndex: 1,
    explanation: "Xavier / Glorot initialization scales weight variance based on (n_in + n_out) for symmetric activation functions."
  }
];

export const Quiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Array<number | null>>(() =>
    new Array(quizQuestions.length).fill(null)
  );
  const [showResults, setShowResults] = useState<boolean>(false);

  const currentQ = quizQuestions[currentIndex];
  const selectedOption = selectedAnswers[currentIndex];

  const handleSelect = (optIndex: number) => {
    if (selectedOption !== null && selectedOption !== undefined) return; // Already answered
    const updated = [...selectedAnswers];
    updated[currentIndex] = optIndex;
    setSelectedAnswers(updated);
  };

  const calculateScore = (): number => {
    return selectedAnswers.reduce<number>((acc, ans, i) => {
      if (ans !== null && ans === quizQuestions[i].correctIndex) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowResults(true);
      const currentScore = calculateScore();
      if (currentScore >= 4) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers(new Array(quizQuestions.length).fill(null));
    setShowResults(false);
  };

  const score = calculateScore();

  return (
    <section id="quiz" className="py-20 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Interactive Assessment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Knowledge Check Quiz
          </h2>
          <p className="text-slate-400 text-sm">
            Test your understanding of weight initialization, symmetry breaking, and backpropagation concepts.
          </p>
        </div>

        {/* Quiz Main Card */}
        <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 space-y-6">
          
          {!showResults ? (
            <div className="space-y-6">
              
              {/* Progress & Question Counter */}
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">
                  Question <strong className="text-cyan-400">{currentIndex + 1}</strong> of {quizQuestions.length}
                </span>
                <span className="text-purple-400 font-bold">
                  Score: {score} / {quizQuestions.length}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {currentQ.question}
              </h3>

              {/* Options List */}
              <div className="space-y-3">
                {currentQ.options.map((optText, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isCorrect = optIdx === currentQ.correctIndex;
                  let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (selectedOption !== null && selectedOption !== undefined) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-300 font-bold';
                    }
                  }

                  return (
                    <button
                      key={`opt-${optIdx}`}
                      onClick={() => handleSelect(optIdx)}
                      disabled={selectedOption !== null && selectedOption !== undefined}
                      className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{optText}</span>
                      {selectedOption !== null && selectedOption !== undefined && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                      {selectedOption !== null && selectedOption !== undefined && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Card */}
              {selectedOption !== null && selectedOption !== undefined && (
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 text-xs text-cyan-200 space-y-1 animate-fade-in">
                  <div className="font-bold flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Explanation:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  disabled={selectedOption === null || selectedOption === undefined}
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm transition-all disabled:opacity-40 cursor-pointer"
                >
                  {currentIndex < quizQuestions.length - 1 ? 'Next Question →' : 'See Final Results 🏆'}
                </button>
              </div>

            </div>
          ) : (
            /* Results Screen */
            <div className="text-center space-y-6 py-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 text-white mx-auto flex items-center justify-center shadow-xl shadow-cyan-500/20">
                <Award className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">Quiz Completed!</h3>
                <p className="text-slate-400 text-sm mt-1">
                  You scored <strong className="text-cyan-400">{score}</strong> out of {quizQuestions.length} ({Math.round((score / quizQuestions.length) * 100)}%)
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 max-w-md mx-auto">
                {score >= 5 ? (
                  <span className="text-emerald-400 font-bold">🎉 Outstanding! You have mastered weight initialization and symmetry breaking.</span>
                ) : (
                  <span className="text-amber-400">Review the simulator and concept cards to reinforce your understanding.</span>
                )}
              </div>

              <button
                onClick={handleRestart}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm shadow-lg hover:scale-105 transition-all flex items-center space-x-2 mx-auto cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restart Quiz</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
