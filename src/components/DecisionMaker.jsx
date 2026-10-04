import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

const DecisionMaker = () => {
  const [inputText, setInputText] = useState('Study Python\nPractice SQL\nBuild a React project\nSolve DSA problems');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isDeciding, setIsDeciding] = useState(false);

  const getChoices = () => {
    return inputText.split(/[\n,]+/).map(c => c.trim()).filter(c => c !== '');
  };

  const handleDecide = () => {
    setError('');
    const choices = getChoices();
    if (choices.length < 2) {
      setError('Please provide at least two valid choices.');
      return;
    }
    
    setIsDeciding(true);
    setResult(null);
    
    // Fake a quick selection animation
    setTimeout(() => {
      const selectedIndex = Math.floor(Math.random() * choices.length);
      setResult(choices[selectedIndex]);
      setIsDeciding(false);
    }, 400);
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
    }
  };

  const reset = () => {
    setResult(null);
    setError('');
    setInputText('');
  };

  const choicesCount = getChoices().length;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <span className="inline-block bg-teal text-white text-[14px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border-3 border-ink shadow-[var(--shadow-hard-sm)] mb-4">
          Decision Maker
        </span>
        <h1 className="font-bricolage font-extrabold text-[52px] leading-[0.98] tracking-tight relative z-0">
          Too many choices? <br/> Let RandomLab <span className="relative inline-block"><span className="absolute inset-0 bg-coral -rotate-1 -z-10 -ml-2 -mr-2 mt-4 rounded-sm" style={{height: '32px'}}></span>pick one.</span>
        </h1>
      </div>

      <div className="card p-8 flex flex-col gap-6">
        
        {/* Result Display */}
        <div className="bg-cream rounded-xl border-3 border-ink p-8 flex flex-col items-center justify-center min-h-[120px] relative">
          {result === null ? (
            <p className="font-dm text-ink/60 font-bold text-lg">
              {isDeciding ? 'Deciding...' : 'Enter choices below'}
            </p>
          ) : (
            <div className={`font-bricolage text-3xl font-extrabold text-center transition-transform ${isDeciding ? 'scale-90 opacity-50' : 'scale-100 opacity-100'}`}>
              {result}
            </div>
          )}
          
          {result !== null && (
            <div className="absolute top-4 right-4 flex gap-2">
              <button onClick={copyToClipboard} className="p-2 bg-white border-2 border-ink rounded-lg hover:bg-sky hover:text-white transition-colors" title="Copy result">
                <Copy size={20} />
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
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="font-dm font-bold text-sm uppercase">Your Choices (comma or newline separated)</label>
            <span className="font-dm text-sm font-bold bg-mustard px-2 py-0.5 rounded-full border-2 border-ink">{choicesCount} items</span>
          </div>
          <textarea 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="input-base min-h-[150px] resize-y"
            placeholder="Option 1, Option 2, Option 3..."
          />
        </div>

        <div className="flex gap-4 mt-2">
          <button 
            onClick={reset}
            className="btn-secondary py-4 w-1/3 flex justify-center items-center gap-2"
          >
            Clear
          </button>
          <button 
            onClick={handleDecide}
            disabled={isDeciding}
            className="btn-primary flex-1 text-xl py-4 flex justify-center items-center gap-2"
          >
            {isDeciding ? 'Thinking...' : 'Make My Decision'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DecisionMaker;
