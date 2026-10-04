import React, { useState } from 'react';
import { generateRandomNumber } from '../utils/random';
import { Copy, RefreshCw } from 'lucide-react';

const NumberGenerator = () => {
  const [result, setResult] = useState(null);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setError('');
    if (min > max) {
      setError('Minimum value cannot be greater than maximum value.');
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      setResult(generateRandomNumber(min, max));
      setIsGenerating(false);
    }, 200); // Small delay for animation feel
  };

  const copyToClipboard = () => {
    if (result !== null) {
      navigator.clipboard.writeText(result.toString());
    }
  };

  const reset = () => {
    setResult(null);
    setError('');
  };

  const applyPreset = (presetMin, presetMax) => {
    setMin(presetMin);
    setMax(presetMax);
    setError('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Title block like the hero eyebrow */}
      <div className="mb-8">
        <span className="inline-block bg-violet text-white text-[14px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border-3 border-ink shadow-[var(--shadow-hard-sm)] mb-4">
          <span className="inline-block w-2 h-2 rounded-full bg-mustard mr-2"></span>
          Core Feature
        </span>
        <h1 className="font-bricolage font-extrabold text-[52px] leading-[0.98] tracking-tight relative z-0">
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-mustard -rotate-2 -z-10 -ml-2 -mr-2 mt-4 rounded-sm" style={{height: '32px'}}></span>
            Generate
          </span>{' '}
          Numbers Instantly.
        </h1>
        <p className="font-dm text-[19px] mt-4 text-ink/80">
          Set your range and get a truly random number with one click.
        </p>
      </div>

      <div className="card p-8 flex flex-col gap-6">
        
        {/* Result Display */}
        <div className="bg-cream rounded-xl border-3 border-ink p-8 flex flex-col items-center justify-center min-h-[160px] relative">
          {result === null ? (
            <p className="font-dm text-ink/60 font-bold text-lg">No number generated yet</p>
          ) : (
            <div className={`font-bricolage text-7xl font-extrabold transition-transform ${isGenerating ? 'scale-90 opacity-50' : 'scale-100 opacity-100'}`}>
              {result}
            </div>
          )}
          
          {result !== null && (
            <div className="absolute top-4 right-4 flex gap-2">
              <button onClick={copyToClipboard} className="p-2 bg-white border-2 border-ink rounded-lg hover:bg-sky hover:text-white transition-colors">
                <Copy size={20} />
              </button>
              <button onClick={reset} className="p-2 bg-white border-2 border-ink rounded-lg hover:bg-coral hover:text-white transition-colors">
                <RefreshCw size={20} />
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-coral text-white font-bold p-3 rounded-lg border-2 border-ink">
            {error}
          </div>
        )}

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-dm font-bold text-sm uppercase">Minimum</label>
            <input 
              type="number" 
              value={min} 
              onChange={(e) => setMin(Number(e.target.value))}
              className="input-base"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-dm font-bold text-sm uppercase">Maximum</label>
            <input 
              type="number" 
              value={max} 
              onChange={(e) => setMax(Number(e.target.value))}
              className="input-base"
            />
          </div>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap gap-2 mt-2">
          {[ [1,10], [1,100], [1,1000], [1,10000] ].map(([pMin, pMax]) => (
            <button
              key={`${pMin}-${pMax}`}
              onClick={() => applyPreset(pMin, pMax)}
              className="px-3 py-1 bg-white border-2 border-ink rounded-full text-sm font-bold hover:bg-mustard transition-colors shadow-[3px_3px_0_#17140d] active:shadow-none active:translate-y-[3px] active:translate-x-[3px]"
            >
              {pMin}-{pMax}
            </button>
          ))}
        </div>

        <button 
          onClick={handleGenerate}
          className="btn-primary w-full text-xl py-4 mt-2 flex justify-center items-center gap-2"
        >
          Generate Random Number
        </button>
      </div>
    </div>
  );
};

export default NumberGenerator;
