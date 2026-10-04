import React from 'react';

const ConfettiShape = ({ type, className, style }) => {
  const baseClasses = `absolute pointer-events-none inline-block ${className}`;
  
  if (type === 'triangle') {
    return (
      <svg className={baseClasses} style={style} width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 4L36 32H4L20 4Z" fill="#ff5b57" stroke="#17140d" strokeWidth="3" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (type === 'quarter-arc') {
    return (
      <svg className={baseClasses} style={style} width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M4 36C4 18.3269 18.3269 4 36 4" stroke="#17140d" strokeWidth="8" strokeLinecap="round"/>
        <path d="M4 36C4 18.3269 18.3269 4 36 4" stroke="#12b3a4" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    );
  }
  if (type === 'dotted-circle') {
    return (
      <svg className={baseClasses} style={style} width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="20" stroke="#ffc531" strokeWidth="4" strokeDasharray="4 8" strokeLinecap="round"/>
      </svg>
    );
  }
  if (type === 'plus') {
    return (
      <svg className={baseClasses} style={style} width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 4V36M4 20H36" stroke="#6b5be6" strokeWidth="8" strokeLinecap="round"/>
        <path d="M20 4V36M4 20H36" stroke="#17140d" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    );
  }
  if (type === 'squiggle') {
    return (
      <svg className={baseClasses} style={style} width="60" height="24" viewBox="0 0 60 24" fill="none">
        <path d="M4 12C10.5 12 10.5 4 17 4C23.5 4 23.5 20 30 20C36.5 20 36.5 4 43 4C49.5 4 49.5 12 56 12" stroke="#17140d" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    );
  }
  if (type === 'half-circle') {
    return (
      <svg className={baseClasses} style={style} width="48" height="24" viewBox="0 0 48 24" fill="none">
        <path d="M4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24H4Z" fill="#ffc531" stroke="#17140d" strokeWidth="3" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (type === 'dot') {
    return (
      <svg className={baseClasses} style={style} width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" fill="#12b3a4" stroke="#17140d" strokeWidth="2"/>
      </svg>
    );
  }
  if (type === 'zigzag') {
    return (
      <svg className={baseClasses} style={style} width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M4 20L12 8L20 32L28 8L36 20" stroke="#3aa0ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (type === 'striped-circle') {
    return (
      <svg className={baseClasses} style={style} width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" fill="#ff5b57" stroke="#17140d" strokeWidth="3"/>
        <path d="M4 24H44M10 14H38M10 34H38" stroke="#17140d" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    );
  }
  return null;
};

const AnimatedConfetti = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      <ConfettiShape type="triangle" className="animate-drift top-[15%] left-[10%]" />
      <ConfettiShape type="quarter-arc" className="animate-spin-slow top-[25%] right-[15%]" />
      <ConfettiShape type="dotted-circle" className="animate-bob bottom-[20%] left-[20%]" />
      <ConfettiShape type="plus" className="animate-spin-slow top-[10%] right-[30%]" />
      <ConfettiShape type="squiggle" className="animate-sway top-[40%] left-[5%]" />
      <ConfettiShape type="half-circle" className="animate-drift bottom-[30%] right-[10%]" />
      <ConfettiShape type="dot" className="animate-bob top-[50%] left-[30%]" />
      <ConfettiShape type="zigzag" className="animate-bob top-[60%] right-[25%]" />
      <ConfettiShape type="striped-circle" className="animate-spin-slow bottom-[10%] right-[40%]" />
    </div>
  );
};

export default AnimatedConfetti;
