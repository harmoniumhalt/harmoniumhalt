import { useState, useCallback } from 'react';
import { useAudioEngine } from '../hooks/useAudioEngine';
import { ReverbControl } from './ReverbControl';

// Standard guitar open strings: E2 A2 D3 G3 B3 E4
const STRINGS = [
  { name: 'E2', baseFreq: 82.41,  color: '#f97316' },
  { name: 'A2', baseFreq: 110.00, color: '#fbbf24' },
  { name: 'D3', baseFreq: 146.83, color: '#fb923c' },
  { name: 'G3', baseFreq: 196.00, color: '#f59e0b' },
  { name: 'B3', baseFreq: 246.94, color: '#fde68a' },
  { name: 'E4', baseFreq: 329.63, color: '#fef3c7' },
];

const FRETS = 12;

// Chord shapes: [string0fret, string1fret, ...] -1 = muted
const CHORDS = [
  { name: 'Em',  frets: [0, 2, 2, 0, 0, 0] },
  { name: 'Am',  frets: [-1, 0, 2, 2, 1, 0] },
  { name: 'G',   frets: [3, 2, 0, 0, 0, 3] },
  { name: 'C',   frets: [-1, 3, 2, 0, 1, 0] },
  { name: 'D',   frets: [-1, -1, 0, 2, 3, 2] },
  { name: 'A',   frets: [-1, 0, 2, 2, 2, 0] },
];

export function Guitar() {
  const { playNote, reverbOn, toggleReverb, reverbAmount, updateReverbAmount, getCtx } = useAudioEngine();
  const [activeCell, setActiveCell] = useState(null);
  const [selectedChord, setSelectedChord] = useState(null);

  const pluckFret = useCallback((stringIdx, fret) => {
    getCtx();
    const str = STRINGS[stringIdx];
    const freq = str.baseFreq * Math.pow(2, fret / 12);
    playNote(freq, 'tanpura', 0.8, 1.2);
    setActiveCell(`${stringIdx}-${fret}`);
    setTimeout(() => setActiveCell(null), 300);
  }, [playNote, getCtx]);

  const playChord = useCallback((chord) => {
    getCtx();
    setSelectedChord(chord.name);
    chord.frets.forEach((fret, si) => {
      if (fret >= 0) {
        setTimeout(() => pluckFret(si, fret), si * 35);
      }
    });
    setTimeout(() => setSelectedChord(null), 800);
  }, [pluckFret, getCtx]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-[#e8eaf0]">Guitar</h2>
        <span className="text-xs font-mono text-[#7c869a]">6-String Standard</span>
      </div>

      <ReverbControl reverbOn={reverbOn} onToggle={toggleReverb} reverbAmount={reverbAmount} onAmountChange={updateReverbAmount} />

      {/* Chord buttons */}
      <div>
        <p className="text-xs text-[#7c869a] font-mono mb-2">Quick Chords</p>
        <div className="flex gap-2 flex-wrap">
          {CHORDS.map(chord => (
            <button
              key={chord.name}
              onClick={() => playChord(chord)}
              className={`px-4 py-2 rounded-lg text-sm font-display font-bold border transition-all ${selectedChord === chord.name ? 'bg-orange-500/20 border-orange-500 text-orange-400 scale-95' : 'border-[#252b3b] text-[#e8eaf0] hover:border-orange-500/50 bg-[#12161e]'}`}
            >
              {chord.name}
            </button>
          ))}
        </div>
      </div>

      {/* Fretboard */}
      <div className="overflow-x-auto">
        <div className="min-w-max rounded-xl overflow-hidden border border-[#252b3b]">
          {/* Fret numbers */}
          <div className="flex bg-[#0a0c10] border-b border-[#252b3b]">
            <div className="w-12 shrink-0 text-center text-xs font-mono text-[#7c869a] py-1.5">Open</div>
            {Array.from({ length: FRETS }).map((_, f) => (
              <div key={f} className="w-14 shrink-0 text-center text-xs font-mono text-[#7c869a] py-1.5">{f + 1}</div>
            ))}
          </div>
          {/* Strings */}
          {STRINGS.map((str, si) => (
            <div key={str.name} className="flex bg-[#12161e] border-b border-[#1a1f2e] last:border-b-0 relative">
              {/* String name */}
              <div className="w-12 shrink-0 flex items-center justify-center">
                <span className="text-xs font-mono font-bold" style={{ color: str.color }}>{str.name}</span>
              </div>
              {/* Open string */}
              <button
                className={`w-14 shrink-0 h-10 flex items-center justify-center border-r border-[#1a1f2e] hover:bg-orange-500/10 transition-colors ${activeCell === `${si}-0` ? 'bg-orange-500/20' : ''}`}
                onClick={() => pluckFret(si, 0)}
              >
                <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: str.color, background: activeCell === `${si}-0` ? str.color : 'transparent' }} />
              </button>
              {/* Frets */}
              {Array.from({ length: FRETS }).map((_, f) => {
                const fret = f + 1;
                const cellKey = `${si}-${fret}`;
                const isActive = activeCell === cellKey;
                const isDotFret = [3, 5, 7, 9, 12].includes(fret);
                return (
                  <button
                    key={fret}
                    className={`w-14 shrink-0 h-10 flex items-center justify-center border-r border-[#1a1f2e] relative transition-colors ${isActive ? 'bg-orange-500/20' : isDotFret ? 'bg-[#1a1f2e]/50 hover:bg-orange-500/10' : 'hover:bg-orange-500/10'}`}
                    onClick={() => pluckFret(si, fret)}
                    onTouchStart={(e) => { e.preventDefault(); pluckFret(si, fret); }}
                  >
                    {/* Fret wire */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#4a4035]" />
                    {/* String line */}
                    <div className="absolute inset-x-0 h-px" style={{ background: str.color, top: '50%', opacity: 0.5 }} />
                    {isActive && (
                      <div className="w-5 h-5 rounded-full z-10" style={{ background: str.color, boxShadow: `0 0 10px ${str.color}` }} />
                    )}
                    {isDotFret && !isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#252b3b] z-10" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-[#7c869a] font-mono">Click any fret to pluck that note. Use chord buttons for full chords.</p>
    </div>
  );
}
