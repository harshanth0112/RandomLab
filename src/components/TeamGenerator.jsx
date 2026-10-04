import React, { useState } from 'react';
import { shuffleArray } from '../utils/random';
import { exportToCSV, exportToJSON } from '../utils/exportData';
import { Copy, Download, RefreshCw } from 'lucide-react';

const TeamGenerator = () => {
  const [inputText, setInputText] = useState('Alice, Bob, Charlie, David, Eve, Frank, Grace, Heidi, Ivan');
  const [method, setMethod] = useState('numTeams'); // 'numTeams' or 'teamSize'
  const [count, setCount] = useState(3);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  const getParticipants = () => {
    return inputText.split(/[\n,]+/).map(p => p.trim()).filter(p => p !== '');
  };

  const handleGenerate = () => {
    setError('');
    const participants = getParticipants();
    if (participants.length < 2) {
      setError('Please provide at least two participants.');
      return;
    }
    
    const parsedCount = parseInt(count, 10);
    if (isNaN(parsedCount) || parsedCount < 1) {
      setError('Please provide a valid number.');
      return;
    }

    if (method === 'numTeams' && parsedCount > participants.length) {
      setError('Number of teams cannot exceed the number of participants.');
      return;
    }

    const shuffled = shuffleArray(participants);
    const generatedTeams = [];

    if (method === 'numTeams') {
      for (let i = 0; i < parsedCount; i++) {
        generatedTeams.push([]);
      }
      shuffled.forEach((p, i) => {
        generatedTeams[i % parsedCount].push(p);
      });
    } else {
      for (let i = 0; i < shuffled.length; i += parsedCount) {
        generatedTeams.push(shuffled.slice(i, i + parsedCount));
      }
    }

    setTeams(generatedTeams);
  };

  const copyTeams = () => {
    if (teams.length === 0) return;
    const text = teams.map((t, i) => `Team ${i + 1}:\n${t.join(', ')}`).join('\n\n');
    navigator.clipboard.writeText(text);
  };

  const downloadCSV = () => {
    if (teams.length === 0) return;
    const maxLen = Math.max(...teams.map(t => t.length));
    const headers = teams.map((_, i) => `Team ${i + 1}`);
    const rows = [headers];
    
    for (let i = 0; i < maxLen; i++) {
      const row = teams.map(t => t[i] || '');
      rows.push(row);
    }
    exportToCSV('teams.csv', rows);
  };

  const reset = () => {
    setTeams([]);
    setError('');
    setInputText('');
  };

  const participantCount = getParticipants().length;

  return (
    <div className="w-full max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <span className="inline-block bg-sky text-white text-[14px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border-3 border-ink shadow-[var(--shadow-hard-sm)] mb-4">
          Team Generator
        </span>
        <h1 className="font-bricolage font-extrabold text-[52px] leading-[0.98] tracking-tight relative z-0">
          Mix the group. <br/> <span className="relative inline-block"><span className="absolute inset-0 bg-violet -rotate-1 -z-10 -ml-2 -mr-2 mt-4 rounded-sm" style={{height: '32px'}}></span>Build your teams.</span>
        </h1>
      </div>

      <div className="card p-8 flex flex-col gap-6">
        {error && (
          <div className="bg-coral text-white font-bold p-3 rounded-lg border-2 border-ink">
            {error}
          </div>
        )}

        {/* Configuration */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <label className="font-dm font-bold text-sm uppercase">Participants (comma or newline separated)</label>
            <span className="font-dm text-sm font-bold bg-mustard px-2 py-0.5 rounded-full border-2 border-ink">{participantCount} participants</span>
          </div>
          <textarea 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="input-base min-h-[120px] resize-y"
            placeholder="Alice, Bob, Charlie..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-dm font-bold text-sm uppercase">Method</label>
            <select 
              value={method} 
              onChange={(e) => setMethod(e.target.value)}
              className="input-base cursor-pointer"
            >
              <option value="numTeams">Number of Teams</option>
              <option value="teamSize">Members per Team</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-dm font-bold text-sm uppercase">
              {method === 'numTeams' ? 'How many teams?' : 'How many members?'}
            </label>
            <input 
              type="number" 
              value={count} 
              onChange={(e) => setCount(e.target.value)}
              className="input-base"
              min="1"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-2">
          <button onClick={reset} className="btn-secondary py-4 w-1/4 flex justify-center items-center">
            Clear
          </button>
          <button onClick={handleGenerate} className="btn-primary flex-1 text-xl py-4 flex justify-center items-center">
            Generate Teams
          </button>
        </div>
      </div>

      {/* Results */}
      {teams.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bricolage text-3xl font-extrabold">Generated Teams</h2>
            <div className="flex gap-2">
              <button onClick={copyTeams} className="btn-secondary px-4 py-2 text-sm flex gap-2 items-center" title="Copy All">
                <Copy size={16} /> Copy
              </button>
              <button onClick={downloadCSV} className="btn-secondary px-4 py-2 text-sm flex gap-2 items-center" title="Export CSV">
                <Download size={16} /> CSV
              </button>
              <button onClick={handleGenerate} className="btn-primary px-4 py-2 text-sm flex gap-2 items-center" title="Reshuffle with same settings">
                <RefreshCw size={16} /> Reshuffle
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team, idx) => {
              const bgColors = ['bg-teal', 'bg-coral', 'bg-mustard', 'bg-violet', 'bg-sky'];
              const bgColor = bgColors[idx % bgColors.length];
              
              return (
                <div key={idx} className="card overflow-hidden">
                  <div className={`${bgColor} border-b-3 border-ink px-4 py-3 flex justify-between items-center text-white font-bold`}>
                    <span className="font-bricolage text-lg">Team {idx + 1}</span>
                    <span className="text-sm bg-ink/20 px-2 py-0.5 rounded-full">{team.length} members</span>
                  </div>
                  <div className="p-4">
                    <ul className="flex flex-col gap-2">
                      {team.map((member, i) => (
                        <li key={i} className="font-dm flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full border-2 border-ink bg-mustard"></div>
                          {member}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamGenerator;
