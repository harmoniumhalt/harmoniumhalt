import { useState, useCallback, useRef } from 'react';
import { useAudioEngine } from '../hooks/useAudioEngine';
import { ReverbControl } from './ReverbControl';
import { Play, Square, Music } from 'lucide-react';

const PADS = [
  { name: 'Kick',   freq: 60,  key: 'q', color: 'bg-red-900/80 border-red-700',     label: 'K' },
  { name: 'Snare',  freq: 200, key: 'w', color: 'bg-orange-900/80 border-orange-700', label: 'S' },
  { name: 'HiHat',  freq: 800, key: 'e', color: 'bg-yellow-900/80 border-yellow-700', label: 'H' },
  { name: 'Clap',   freq: 450, key: 'r', color: 'bg-amber-900/80 border-amber-700',  label: 'C' },
  { name: 'Tom 1',  freq: 120, key: 'a', color: 'bg-stone-700/80 border-stone-500',  label: 'T1' },
  { name: 'Tom 2',  freq: 90,  key: 's', color: 'bg-stone-800/80 border-stone-600',  label: 'T2' },
  { name: 'Crash',  freq: 900, key: 'd', color: 'bg-zinc-700/80 border-zinc-500',    label: 'CR' },
  { name: 'Ride',   freq: 700, key: 'f', color: 'bg-zinc-800/80 border-zinc-600',    label: 'R' },
  { name: 'Shaker', freq: 1200,key: 'z', color: 'bg-green-900/80 border-green-700',  label: 'SH' },
  { name: 'Conga',  freq: 250, key: 'x', color: 'bg-teal-900/80 border-teal-700',   label: 'CO' },
  { name: 'Bongo',  freq: 320, key: 'c', color: 'bg-cyan-900/80 border-cyan-700',   label: 'B' },
  { name: 'Cowbell',freq: 550, key: 'v', color: 'bg-purple-900/80 border-purple-700', label: 'CW' },
];

const KB_MAP = {};
PADS.forEach((p, i) => { if (p.key) KB_MAP[p.key] = i; });

// Simple beat patterns
const BEATS = [
  { name: 'Rock',   pattern: [0,0,1,0, 1,0,2,0, 0,0,1,0, 1,2,2,0], bpm: 100 },
  { name: 'Hip-Hop',pattern: [0,2,2,2, 1,2,0,2, 0,2,1,2, 1,2,0,2], bpm: 85  },
  { name: 'Jazz',   pattern: [2,2,0,2, 2,2,1,2, 2,2,0,2, 2,2,1,2], bpm: 120 },
];

export function DrumPad() {
  const { playNote, reverbOn, toggleReverb, reverbAmount, updateReverbAmount, getCtx } = useAudioEngine();
  const [activePads, setActivePads] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [beatStep, setBeatStep] = useState(null);
  const timerRef = useRef(null);
  const stepRef = useRef(0);

  const triggerPad = useCallback((idx, velocity = 1.0) => {
    getCtx();
    const pad = PADS[idx];
    playNote(pad.freq, 'drum', velocity, 0.4);
    setActivePads(prev => new Set([...prev, idx]));
    setTimeout(() => setActivePads(prev => { const s = new Set(prev); s.delete(idx); return s; }), 150);
  }, [playNote, getCtx]);

  const startBeat = useCallback(() => {
    setIsPlaying(true);
    const beat = BEATS[currentBeat];
    const interval = (60 / beat.bpm) * 1000 / 4;
    const tick = () => {
      const step = stepRef.current % beat.pattern.length;
      const padIdx = beat.pattern[step];
      if (padIdx >= 0) triggerPad(padIdx, 0.9);
      setBeatStep(step);
      stepRef.current++;
      timerRef.current = setTimeout(tick, interval);
    };
    tick();
  }, [triggerPad, currentBeat]);

  const stopBeat = useCallback(() => {
    setIsPlaying(false);
    setBeatStep(null);
    stepRef.current = 0;
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  // Keyboard
  useState(() => {
    const down = (e) => { if (e.repeat) return; const idx = KB_MAP[e.key]; if (idx !== undefined) triggerPad(idx); };
    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-[#e8eaf0]">Drum Pad</h2>
        <div className="flex items-center gap-1">
          {beatStep !== null && Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-colors ${beatStep % 4 === i ? 'bg-orange-400' : 'bg-[#252b3b]'}`} />
          ))}
        </div>
      </div>

      <ReverbControl reverbOn={reverbOn} onToggle={toggleReverb} reverbAmount={reverbAmount} onAmountChange={updateReverbAmount} />

      {/* Beat controls */}
      <div className="flex gap-2 items-center flex-wrap">
        <Music className="w-4 h-4 text-[#7c869a]" />
        {BEATS.map((b, i) => (
          <button
            key={b.name}
            onClick={() => { setCurrentBeat(i); if (isPlaying) { stopBeat(); setTimeout(startBeat, 100); } }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${currentBeat === i ? 'bg-orange-500/20 border-orange-500/50 text-orange-400' : 'border-[#252b3b] text-[#7c869a] hover:border-orange-500/30'}`}
          >
            {b.name} <span className="font-mono opacity-70">{b.bpm}</span>
          </button>
        ))}
        <button
          onClick={isPlaying ? stopBeat : startBeat}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ml-auto ${isPlaying ? 'bg-red-500/20 border border-red-500/50 text-red-400' : 'bg-orange-500 text-white hover:bg-orange-400'}`}
        >
          {isPlaying ? <><Square className="w-3.5 h-3.5" /> Stop</> : <><Play className="w-3.5 h-3.5" /> Auto Beat</>}
        </button>
      </div>

      {/* Pads grid */}
      <div className="grid grid-cols-4 gap-2">
        {PADS.map((pad, i) => (
          <button
            key={pad.name}
            className={`drum-pad ${pad.color} border-2 rounded-xl p-3 md:p-4 flex flex-col items-center justify-center gap-1 ${activePads.has(i) ? 'active' : ''}`}
            onMouseDown={() => triggerPad(i)}
            onTouchStart={(e) => { e.preventDefault(); triggerPad(i); }}
          >
            <span className="font-display text-base md:text-lg font-bold text-white">{pad.label}</span>
            <span className="text-[9px] font-mono text-white/50">{pad.name}</span>
            <span className="text-[9px] font-mono text-white/30">[{pad.key.toUpperCase()}]</span>
          </button>
        ))}
      </div>

      <p className="text-xs text-[#7c869a] font-mono">Keys Q W E R A S D F Z X C V to play. Auto beat loops patterns.</p>
    </div>
  );
}
