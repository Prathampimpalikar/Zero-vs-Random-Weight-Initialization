import React from 'react';
import { UserCheck, GraduationCap, Github, ExternalLink, Code2, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-950/80 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Credits & Documentation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Academic Project Overview
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Official project card for submission in B.Tech Artificial Intelligence & Machine Learning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Academic Credentials Card */}
          <div className="lg:col-span-6 glass-panel p-8 rounded-3xl border border-cyan-500/30 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <GraduationCap className="w-40 h-40 text-cyan-400" />
            </div>

            <div className="flex items-center space-x-3 text-cyan-400 pb-3 border-b border-slate-800">
              <UserCheck className="w-6 h-6" />
              <h3 className="text-xl font-bold text-white">Project & Student Card</h3>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block uppercase">Project Title</span>
                <span className="text-sm font-bold text-white font-sans">
                  Comparison of Zero Initialization and Random Initialization Techniques in Neural Networks
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block uppercase">Student Name</span>
                  <span className="text-sm font-bold text-cyan-300 font-sans">Pratham Pimpalikar</span>
                </div>
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block uppercase">USN</span>
                  <span className="text-sm font-bold text-cyan-400 font-mono">CM23031</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block uppercase">Course</span>
                  <span className="text-xs font-bold text-slate-200 font-sans">Neural Networks and Deep Learning</span>
                </div>
                <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block uppercase">Course Code</span>
                  <span className="text-xs font-bold text-purple-400 font-mono">N-PCCCM701T</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-2 text-xs text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verified TypeScript Neural Network Engine</span>
            </div>
          </div>

          {/* Right Column: Deployment Guide for GitHub & Web */}
          <div className="lg:col-span-6 glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center space-x-3 text-purple-400 pb-3 border-b border-slate-800">
              <Github className="w-6 h-6" />
              <h3 className="text-xl font-bold text-white">GitHub Deployment Guide</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              This application is built fully static in React + TypeScript + Vite. It requires no backend and can be deployed directly to GitHub Pages, Vercel, or Netlify.
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
              <div className="text-cyan-400 font-bold"># Push to GitHub:</div>
              <div className="text-slate-400">git init</div>
              <div className="text-slate-400">git add .</div>
              <div className="text-slate-400">git commit -m "Neural Initialization Lab CM23031"</div>
              <div className="text-slate-400">git remote add origin https://github.com/Prathampimpalikar/Zero-vs-Random-Weight-Initialization.git</div>
              <div className="text-slate-400">git push -u origin main</div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono text-slate-400">Production Build Output: <code>/dist</code></span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold font-mono">
                Vercel / Netlify Ready
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
