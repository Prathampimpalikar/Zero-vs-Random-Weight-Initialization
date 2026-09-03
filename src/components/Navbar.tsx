import React, { useState, useEffect } from 'react';
import { Brain, Play, Scale, BookOpen, Cpu, HelpCircle, UserCheck, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home', icon: Brain },
    { id: 'concepts', label: 'Concepts', icon: BookOpen },
    { id: 'simulator', label: 'Simulator', icon: Cpu },
    { id: 'comparison', label: 'Comparison', icon: Scale },
    { id: 'prediction', label: 'Predictor', icon: Sparkles },
    { id: 'workflow', label: 'Workflow', icon: Play },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
    { id: 'about', label: 'About', icon: UserCheck },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-xl shadow-black/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => scrollTo('hero')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Brain className="w-6 h-6 animate-pulse-slow" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                Neural Initialization Lab
              </span>
              <span className="hidden sm:block text-[10px] uppercase tracking-widest text-cyan-400 font-mono">
                Academic ML Simulator
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-sm">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Student Badge & Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-semibold text-slate-200">Pratham Pimpalikar</span>
              <span className="text-[10px] font-mono text-cyan-400">CM23031 • N-PCCCM701T</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 backdrop-blur-xl px-4 pt-4 pb-6 mt-3 shadow-2xl">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="flex items-center space-x-2 p-3 rounded-lg bg-slate-900/80 border border-slate-800/60 text-slate-300 text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
            <span>Student: Pratham Pimpalikar (CM23031)</span>
            <span className="text-cyan-400 font-mono">B.Tech AI & ML</span>
          </div>
        </div>
      )}
    </nav>
  );
};
