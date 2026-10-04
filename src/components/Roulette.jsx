import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Trash2 } from 'lucide-react';

const DEFAULT_ENTRIES = 'Option 1, Option 2, Option 3, Option 4';

const Roulette = () => {
  const [inputText, setInputText] = useState(DEFAULT_ENTRIES);
  const [entries, setEntries] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const parsed = inputText.split(/[\n,]+/).map(e => e.trim()).filter(e => e !== '');
    setEntries(parsed);
  }, [inputText]);

  const handleSpin = () => {
    if (entries.length < 2 || isSpinning) return;
    
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    setIsSpinning(true);
    setWinner(null);

    // 1. Select the winning entry index
    const targetIndex = Math.floor(Math.random() * entries.length);
    const sliceAngle = 360 / entries.length;
    
    // 2. Calculate target segment angle
    // Segment i starts at i*sliceAngle and ends at (i+1)*sliceAngle.
    // The visual center of the target segment is (targetIndex + 0.5) * sliceAngle.
    // The pointer is fixed at 0 degrees (top).
    // To position the center of the target segment at 0 degrees, the wheel needs to rotate
    // backwards by the segment center angle.
    // Random offset within the slice to make it feel natural (avoid landing exactly in the middle every time)
    const offset = (Math.random() * sliceAngle * 0.8) - (sliceAngle * 0.4);
    
    const targetAngle = 360 - ((targetIndex + 0.5) * sliceAngle) + offset;
    
    // 3. Add multiple full spins for the animation effect
    const extraSpins = 360 * (prefersReducedMotion ? 0 : 5);
    
    // 4. Calculate final absolute rotation
    const currentRotMod = rotation % 360;
    const finalRotation = rotation + extraSpins + (targetAngle - currentRotMod) + (targetAngle < currentRotMod ? 360 : 0);
    
    setRotation(finalRotation);

    const animationDuration = prefersReducedMotion ? 100 : 4000;

    setTimeout(() => {
      // Set the SAME selected entry in the Winner card
      setWinner(entries[targetIndex]);
      setIsSpinning(false);
    }, animationDuration);
  };

  const resetDefaults = () => {
    if (isSpinning) return;
    setInputText(DEFAULT_ENTRIES);
    setWinner(null);
    setRotation(0);
  };
  
  const clearEntries = () => {
    if (isSpinning) return;
    setInputText('');
    setWinner(null);
    setRotation(0);
  };

  // Generate colors for wheel slices
  const getSliceColor = (index) => {
    const colors = ['#12b3a4', '#ff5b57', '#ffc531', '#6b5be6', '#3aa0ff']; // teal, coral, mustard, violet, sky
    return colors[index % colors.length];
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <span className="inline-block bg-coral text-white text-[14px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border-3 border-ink shadow-[var(--shadow-hard-sm)] mb-4">
          Roulette
        </span>
        <h1 className="font-bricolage font-extrabold text-[42px] md:text-[52px] leading-[0.98] tracking-tight relative z-0">
          Spin the wheel. <br/> <span className="relative inline-block"><span className="absolute inset-0 bg-sky -rotate-2 -z-10 -ml-2 -mr-2 mt-4 rounded-sm" style={{height: '32px'}}></span>Let randomness decide.</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Col: Wheel */}
        <div className="card p-6 md:p-10 flex flex-col items-center justify-center relative bg-cream/30">
          
          <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] flex items-center justify-center">
            
            {/* FIXED Pointer at the top */}
            <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <svg width="46" height="56" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_4px_0_#17140d]">
                <path d="M20 50L4 0H36L20 50Z" fill="#ffc531" stroke="#17140d" strokeWidth="4" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* The Wheel */}
            <div className="relative w-full h-full rounded-full border-4 border-ink shadow-[var(--shadow-hard)] overflow-hidden bg-white" style={{ isolation: 'isolate' }}>
              <div 
                className="w-full h-full rounded-full" 
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  transitionDuration: isSpinning ? '4s' : '0s',
                  transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.4, 1)', // Natural deceleration
                  willChange: 'transform'
                }}
              >
                {/* Slices Background */}
                <div 
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{
                    background: entries.length > 1 
                      ? `conic-gradient(${entries.map((_, i) => `${getSliceColor(i)} ${i * (360 / entries.length)}deg ${(i + 1) * (360 / entries.length)}deg`).join(', ')})`
                      : '#f5efe2' // fallback cream
                  }}
                ></div>

                {/* Slices Text & Dividers */}
                {entries.length > 0 && entries.map((entry, i) => {
                  const sliceAngle = 360 / entries.length;
                  const midAngle = (i + 0.5) * sliceAngle;
                  
                  // Text rotation calculation to ensure readability
                  const angleDeg = midAngle - 90; 
                  // If midAngle is in the left half of the wheel (180 to 360 degrees), the text would be upside down.
                  const isLeftHalf = midAngle > 90 && midAngle < 270;
                  
                  return (
                    <React.Fragment key={i}>
                      {/* Segment Divider Line */}
                      <div 
                        className="absolute top-0 left-1/2 w-1 h-1/2 bg-ink origin-bottom -translate-x-1/2"
                        style={{ transform: `rotate(${i * sliceAngle}deg)` }}
                      ></div>

                      {/* Text Label */}
                      <div 
                        className="absolute top-1/2 left-1/2 w-[45%] flex items-center pointer-events-none"
                        style={{
                          transformOrigin: '0% 50%',
                          transform: `rotate(${angleDeg}deg)`,
                        }}
                      >
                         <div
                           className="w-full flex px-2 sm:px-4"
                           style={{
                             justifyContent: isLeftHalf ? 'flex-start' : 'flex-end',
                             transform: isLeftHalf ? 'rotate(180deg)' : 'none',
                           }}
                         >
                           <span className="font-bricolage font-bold text-ink text-xs sm:text-sm md:text-base truncate max-w-[90%] bg-white/70 px-1 rounded-sm">
                             {entry}
                           </span>
                         </div>
                      </div>
                    </React.Fragment>
                  );
                })}
                
                {/* Inner Hub */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-white border-4 border-ink rounded-full z-10 flex items-center justify-center shadow-sm">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-ink rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={handleSpin}
            disabled={isSpinning || entries.length < 2}
            className={`mt-10 btn-primary text-xl sm:text-2xl px-12 py-4 sm:py-5 w-full max-w-[300px] transition-all ${isSpinning || entries.length < 2 ? 'opacity-50 cursor-not-allowed bg-ink border-ink' : ''}`}
          >
            {isSpinning ? 'SPINNING...' : 'SPIN'}
          </button>
          
          {entries.length < 2 && (
             <p className="mt-4 font-dm font-bold text-coral text-sm">Add at least 2 entries to spin.</p>
          )}
        </div>

        {/* Right Col: Config & Results */}
        <div className="flex flex-col gap-6 lg:gap-8">
          
          {/* Winner Card */}
          <div className="card p-6 md:p-8">
            <h3 className="font-bricolage text-2xl font-extrabold mb-4">Winner</h3>
            <div className="bg-cream rounded-xl border-3 border-ink p-6 min-h-[140px] flex flex-col items-center justify-center relative shadow-inner">
              {winner ? (
                <>
                  <span className="font-dm text-sm font-bold text-ink/70 uppercase tracking-widest mb-2 text-center">Your result is ready!</span>
                  <div className="font-bricolage text-3xl sm:text-4xl md:text-5xl font-extrabold text-coral text-center animate-bounce break-words w-full px-2">
                    {winner}
                  </div>
                </>
              ) : (
                <span className="font-dm font-bold text-ink/60 text-center text-lg">
                  {isSpinning ? 'Waiting for wheel...' : 'Spin the wheel to make a decision'}
                </span>
              )}
            </div>
          </div>

          {/* Entries Config Card */}
          <div className="card p-6 md:p-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bricolage text-2xl font-extrabold uppercase tracking-tight">Wheel Entries</h3>
              <span className="font-dm text-sm font-bold bg-mustard px-3 py-1 rounded-full border-2 border-ink">{entries.length} items</span>
            </div>
            
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isSpinning}
              className="input-base w-full min-h-[120px] resize-y mb-2"
              placeholder="Add entries here..."
            />
            <p className="font-dm text-xs text-ink/60 mb-4 font-bold">Separate with commas or new lines.</p>
            
            <div className="flex gap-3 mb-6">
              <button 
                onClick={clearEntries}
                disabled={isSpinning}
                className="btn-secondary text-sm px-4 py-2 flex items-center gap-2 disabled:opacity-50"
              >
                <Trash2 size={16} /> Clear
              </button>
              <button 
                onClick={resetDefaults}
                disabled={isSpinning}
                className="btn-secondary text-sm px-4 py-2 flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw size={16} /> Defaults
              </button>
            </div>

            {/* Chips display */}
            <div className="flex flex-wrap gap-2">
              {entries.map((entry, idx) => (
                <span key={idx} className="bg-white border-2 border-ink rounded-md px-3 py-1 text-xs font-dm font-bold shadow-[2px_2px_0_#17140d]">
                  {entry}
                </span>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Roulette;
