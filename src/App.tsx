import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ConceptCards } from './components/ConceptCards';
import { ZeroSection } from './components/ZeroSection';
import { RandomSection } from './components/RandomSection';
import { Simulator } from './components/Simulator';
import { Comparison } from './components/Comparison';
import { PredictionLab } from './components/PredictionLab';
import { Workflow } from './components/Workflow';
import { MathSection } from './components/MathSection';
import { SymmetryVisual } from './components/SymmetryVisual';
import { AdvancedMethods } from './components/AdvancedMethods';
import { Quiz } from './components/Quiz';
import { About } from './components/About';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const sections = [
      'hero',
      'concepts',
      'zero-init',
      'random-init',
      'simulator',
      'comparison',
      'prediction',
      'workflow',
      'math',
      'quiz',
      'about'
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Sticky Top Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Page Sections */}
      <main>
        <Hero />
        <ConceptCards />
        <ZeroSection />
        <RandomSection />
        <Simulator />
        <Comparison />
        <PredictionLab />
        <Workflow />
        <MathSection />
        <SymmetryVisual />
        <AdvancedMethods />
        <Quiz />
        <About />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
