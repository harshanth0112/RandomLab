import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AnimatedConfetti from './components/AnimatedConfetti';
import NumberGenerator from './components/NumberGenerator';
import Roulette from './components/Roulette';
import DecisionMaker from './components/DecisionMaker';
import TeamGenerator from './components/TeamGenerator';

function App() {
  const [activeMode, setActiveMode] = useState('number');

  return (
    <div className="min-h-screen flex flex-col relative w-full overflow-hidden">
      <AnimatedConfetti />
      <Navbar activeMode={activeMode} setActiveMode={setActiveMode} />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="w-full max-w-5xl mx-auto items-start">
          {/* Main Content Area */}
          <div>
            {activeMode === 'number' && <NumberGenerator />}
            {activeMode === 'roulette' && <Roulette />}
            {activeMode === 'decision' && <DecisionMaker />}
            {activeMode === 'team' && <TeamGenerator />}
          </div>
        </div>
        
        {/* Full bleed logo strip */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[100vw] mt-24">
          <div className="w-full bg-ink py-6 border-y-3 border-ink flex flex-wrap items-center justify-between px-10 gap-8 overflow-hidden">
            <span className="text-mustard font-dm font-bold tracking-widest whitespace-nowrap">TRUSTED BY TEAMS AT</span>
            <div className="flex items-center gap-12 text-cream/85 font-bricolage font-bold text-xl whitespace-nowrap">
              <span>Northwind</span>
              <span>Fig&Co</span>
              <span>Superbloom</span>
              <span>Kettle</span>
              <span>Halcyon</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
