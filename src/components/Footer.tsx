import React from 'react';
import { Brain, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Info */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-white text-base">Neural Initialization Lab</span>
              <p className="text-[11px] text-slate-500">
                Academic ML Simulator for Neural Weight Initialization Analysis
              </p>
            </div>
          </div>

          {/* Student Badge */}
          <div className="text-center md:text-right space-y-0.5">
            <div className="font-bold text-slate-200 text-sm">Pratham Pimpalikar (CM23031)</div>
            <div className="text-cyan-400 font-mono text-[11px]">
              B.Tech AI & ML • Course Code: N-PCCCM701T
            </div>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-slate-900">
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">React 19</span>
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">TypeScript 5</span>
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">Vite 6</span>
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">Tailwind CSS</span>
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">Recharts</span>
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-mono">BCE + Backprop Engine</span>
        </div>

        {/* Copyright */}
        <div className="text-center text-slate-600 text-[11px] pt-4">
          © {new Date().getFullYear()} Neural Initialization Lab. Created for B.Tech AI & ML Academic Viva & Demonstration.
        </div>

      </div>
    </footer>
  );
};
