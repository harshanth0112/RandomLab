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
        <div className={`grid grid-cols-1 gap-12 items-start ${activeMode === 'number' ? 'lg:grid-cols-[1.1fr_0.9fr]' : ''}`}>
          {/* Main Content Area */}
          <div className={`${activeMode !== 'number' ? 'w-full max-w-5xl mx-auto' : ''}`}>
            {activeMode === 'number' && <NumberGenerator />}
            {activeMode === 'roulette' && <Roulette />}
            {activeMode === 'decision' && <DecisionMaker />}
            {activeMode === 'team' && <TeamGenerator />}
          </div>
          
          {/* Right Column - Product Mockup from UI.md */}
          {activeMode === 'number' && (
            <div className="hidden lg:block w-full rotate-[-2deg] bg-white border-3 border-ink rounded-[22px] shadow-[var(--shadow-hard)] overflow-hidden">
              <div className="bg-cream border-b-3 border-ink p-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-coral border-2 border-ink"></div>
              <div className="w-3 h-3 rounded-full bg-mustard border-2 border-ink"></div>
              <div className="w-3 h-3 rounded-full bg-teal border-2 border-ink"></div>
              <span className="ml-2 font-dm font-bold text-sm">This week - Design squad</span>
            </div>
            
            <div className="p-6 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bricolage text-xl font-bold">Sprint velocity</h3>
                <span className="bg-teal text-white px-3 py-1 rounded-full border-2 border-ink font-bold text-sm">+38% up</span>
              </div>
              
              <div className="border-3 border-ink rounded-xl p-4 flex items-end justify-between h-40 gap-2">
                {[
                  {h: '44%', c: 'bg-mustard'},
                  {h: '62%', c: 'bg-coral'},
                  {h: '52%', c: 'bg-violet'},
                  {h: '82%', c: 'bg-teal'},
                  {h: '70%', c: 'bg-sky'},
                  {h: '96%', c: 'bg-coral'}
                ].map((bar, i) => (
                  <div key={i} className={`w-full ${bar.c} border-2 border-ink rounded-t-lg`} style={{height: bar.h}}></div>
                ))}
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-teal border-2 border-ink flex items-center justify-center text-white">✓</div>
                  <span className="font-dm font-medium strike">Ship the new onboarding flow</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-teal border-2 border-ink flex items-center justify-center text-white">✓</div>
                  <span className="font-dm font-medium strike">Review Q3 roadmap draft</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-white border-2 border-ink"></div>
                  <span className="font-dm font-medium">Sync with the growth pod</span>
                </div>
              </div>
              </div>
            </div>
          )}
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
