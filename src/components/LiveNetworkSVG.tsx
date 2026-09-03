import React, { useState } from 'react';
import { ModelWeights } from '../model/initialization';

interface LiveNetworkSVGProps {
  weights: ModelWeights;
  activations?: {
    input: [number, number];
    hiddenA: number[];
    outputA: number;
  };
  epoch: number;
  isTraining: boolean;
}

export const LiveNetworkSVG: React.FC<LiveNetworkSVGProps> = ({
  weights,
  activations,
  epoch,
  isTraining
}) => {
  const [hoveredConn, setHoveredConn] = useState<string | null>(null);

  // Default activations if none passed
  const currentInput = activations ? activations.input : [0, 0];
  const hiddenA = activations ? activations.hiddenA : [0, 0, 0];
  const outputA = activations ? activations.outputA : 0.5;

  // Connection geometry coordinates
  const inputCoords = [
    { x: 50, y: 70, label: 'X₁' },
    { x: 50, y: 190, label: 'X₂' }
  ];

  const hiddenCoords = [
    { x: 220, y: 40, label: 'H₁' },
    { x: 220, y: 130, label: 'H₂' },
    { x: 220, y: 220, label: 'H₃' }
  ];

  const outputCoord = { x: 390, y: 130, label: 'Y' };

  // Helper for stroke color & width based on weight value
  const getConnectionStyle = (weight: number) => {
    const absW = Math.abs(weight);
    const strokeWidth = Math.min(6, Math.max(1.2, absW * 2.5));
    // Positive weight = cyan/blue, Negative weight = rose/red, Zero weight = muted slate
    let color = '#475569';
    if (weight > 0.01) color = '#06B6D4'; // cyan
    else if (weight < -0.01) color = '#F43F5E'; // rose
    return { color, strokeWidth };
  };

  return (
    <div className="relative w-full glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col items-center">
      
      {/* Top Bar Header */}
      <div className="w-full flex justify-between items-center mb-4 pb-3 border-b border-slate-800/80 text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-bold text-slate-200 uppercase tracking-wider">
            Live 2-3-1 Topology Visualizer
          </span>
        </div>

        <div className="flex items-center space-x-3 font-mono">
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
            Epoch: <strong className="text-cyan-400">{epoch}</strong>
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-300">
            {isTraining ? '▶ Training...' : '⏸ Paused'}
          </span>
        </div>
      </div>

      {/* Hover Info Tooltip Banner */}
      <div className="h-7 mb-2 text-center text-xs font-mono">
        {hoveredConn ? (
          <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 shadow-md">
            {hoveredConn}
          </span>
        ) : (
          <span className="text-slate-500">
            💡 Hover over connections to view exact scalar weights & gradients
          </span>
        )}
      </div>

      {/* SVG Canvas */}
      <div className="w-full max-w-lg overflow-visible py-2">
        <svg viewBox="0 0 440 260" className="w-full h-auto">
          <defs>
            {/* Pulsing signal markers for active training */}
            <linearGradient id="sigBlue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>

          {/* LAYER 1 TO LAYER 2 CONNECTIONS (Input -> Hidden) */}
          {hiddenCoords.map((hNode, hIdx) => {
            return inputCoords.map((iNode, iIdx) => {
              const weightVal = weights.w1[hIdx][iIdx];
              const style = getConnectionStyle(weightVal);
              const connKey = `W1 [Hidden H${hIdx + 1} ← Input X${iIdx + 1}]: ${weightVal.toFixed(4)}`;
              const isHovered = hoveredConn === connKey;

              return (
                <g key={`w1-${hIdx}-${iIdx}`}>
                  <line
                    x1={iNode.x}
                    y1={iNode.y}
                    x2={hNode.x}
                    y2={hNode.y}
                    stroke={isHovered ? '#F59E0B' : style.color}
                    strokeWidth={isHovered ? style.strokeWidth + 2 : style.strokeWidth}
                    opacity={isHovered ? 1 : 0.75}
                    className={isTraining ? 'animate-signal' : ''}
                    onMouseEnter={() => setHoveredConn(connKey)}
                    onMouseLeave={() => setHoveredConn(null)}
                    style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                  />
                </g>
              );
            });
          })}

          {/* LAYER 2 TO LAYER 3 CONNECTIONS (Hidden -> Output) */}
          {hiddenCoords.map((hNode, hIdx) => {
            const weightVal = weights.w2[0][hIdx];
            const style = getConnectionStyle(weightVal);
            const connKey = `W2 [Output Y ← Hidden H${hIdx + 1}]: ${weightVal.toFixed(4)}`;
            const isHovered = hoveredConn === connKey;

            return (
              <g key={`w2-${hIdx}`}>
                <line
                  x1={hNode.x}
                  y1={hNode.y}
                  x2={outputCoord.x}
                  y2={outputCoord.y}
                  stroke={isHovered ? '#F59E0B' : style.color}
                  strokeWidth={isHovered ? style.strokeWidth + 2 : style.strokeWidth}
                  opacity={isHovered ? 1 : 0.85}
                  className={isTraining ? 'animate-signal' : ''}
                  onMouseEnter={() => setHoveredConn(connKey)}
                  onMouseLeave={() => setHoveredConn(null)}
                  style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                />
              </g>
            );
          })}

          {/* INPUT NODES */}
          {inputCoords.map((node, idx) => (
            <g key={`input-node-${idx}`}>
              <circle
                cx={node.x}
                cy={node.y}
                r="18"
                fill="#0F172A"
                stroke="#3B82F6"
                strokeWidth="3"
              />
              <text x={node.x} y={node.y - 2} textAnchor="middle" fill="#93C5FD" fontSize="11" fontWeight="bold">
                {node.label}
              </text>
              <text x={node.x} y={node.y + 11} textAnchor="middle" fill="#67E8F9" fontSize="9" fontFamily="monospace">
                v: {currentInput[idx]}
              </text>
            </g>
          ))}

          {/* HIDDEN NODES */}
          {hiddenCoords.map((node, idx) => {
            const actVal = hiddenA[idx] ?? 0;
            return (
              <g key={`hidden-node-${idx}`}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  fill="#0B0F19"
                  stroke="#06B6D4"
                  strokeWidth="3.5"
                />
                <text x={node.x} y={node.y - 3} textAnchor="middle" fill="#E0F2FE" fontSize="11" fontWeight="bold">
                  {node.label}
                </text>
                <text x={node.x} y={node.y + 11} textAnchor="middle" fill="#38BDF8" fontSize="9" fontFamily="monospace">
                  a: {actVal.toFixed(2)}
                </text>
              </g>
            );
          })}

          {/* OUTPUT NODE */}
          <g>
            <circle
              cx={outputCoord.x}
              cy={outputCoord.y}
              r="22"
              fill="#1E1B4B"
              stroke="#8B5CF6"
              strokeWidth="4"
            />
            <text x={outputCoord.x} y={outputCoord.y - 3} textAnchor="middle" fill="#F3E8FF" fontSize="12" fontWeight="bold">
              {outputCoord.label}
            </text>
            <text x={outputCoord.x} y={outputCoord.y + 12} textAnchor="middle" fill="#C084FC" fontSize="10" fontFamily="monospace" fontWeight="bold">
              {outputA.toFixed(3)}
            </text>
          </g>

          {/* Legend Labels */}
          <text x={50} y={245} textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="bold">Input Layer</text>
          <text x={220} y={245} textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="bold">Hidden (tanh)</text>
          <text x={390} y={245} textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="bold">Output (sigmoid)</text>
        </svg>
      </div>

      {/* Connection Color Legend */}
      <div className="mt-3 flex items-center justify-center space-x-6 text-[11px] text-slate-400">
        <span className="flex items-center space-x-1.5">
          <span className="w-3 h-1 rounded bg-cyan-400" />
          <span>Positive Weight (+)</span>
        </span>
        <span className="flex items-center space-x-1.5">
          <span className="w-3 h-1 rounded bg-rose-500" />
          <span>Negative Weight (-)</span>
        </span>
        <span className="flex items-center space-x-1.5">
          <span className="w-3 h-1 rounded bg-slate-600" />
          <span>Zero Weight (0.00)</span>
        </span>
      </div>

    </div>
  );
};
