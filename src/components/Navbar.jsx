import React from 'react';
import { Activity } from 'lucide-react';

const Navbar = ({ activeMode, setActiveMode }) => {
  const modes = [
    { id: 'number', label: 'Number Gen' },
    { id: 'roulette', label: 'Roulette' },
    { id: 'decision', label: 'Decision' },
    { id: 'team', label: 'Teams' },
  ];

  return (
    <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10 relative">
      <div className="flex items-center gap-4">
        <div className="w-[42px] h-[42px] bg-mustard rounded-xl border-3 border-ink shadow-[var(--shadow-hard-sm)] flex items-center justify-center">
          <Activity className="w-6 h-6 text-ink" strokeWidth={3} />
        </div>
        <span className="font-bricolage font-extrabold text-[26px] tracking-tight text-ink">
          RandomLab
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 font-dm font-medium text-ink">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            className={`transition-colors ${activeMode === mode.id ? 'text-coral border-b-2 border-coral' : 'hover:text-coral'}`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      <div>
        <button onClick={() => setActiveMode('number')} className="btn-nav hidden md:block">
          Start free
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
