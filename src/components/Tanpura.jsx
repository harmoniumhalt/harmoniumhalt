import { useState, useCallback, useRef } from 'react';
import { useAudioEngine } from '../hooks/useAudioEngine';
import { ReverbControl } from './ReverbControl';
import { Play, Square } from 'lucide-react';

const STRINGS = [
  { label: 'Pa',  freq: 392.00, color: '#f97316' },
  { label: 'Sa',  freq: 261.63, color: '#fbbf24' },
  { label: "Sa'", freq: 523.25, color: '#fb923c' },
  { label: 'Ni',  freq: 493.88, color: '#f59e0b' },
];

const TAALS = [
  { label: 'Slow (60 BPM)',  bpm: 60 },
  { label: 'Medium (80 BPM)', bpm: 80 },
  { label: 'Fast (100 BPM)', bpm: 100 },
];

export function Tanpura() {
  const { playNote, reverbOn, toggleReverb, reverbAmount, updateReverbAmount, getCtx } = useAudioEngine();
  const [activeString, setActiveString] = useState(null);
  const [isLooping, setIsLooping] = useState(false);
  const [tempo, setTempo] = useState(60);
  const loopRef = useRef(null);
  const stepRef = useRef(0);

  const pluckString = useCallback((idx) => {
    getCtx();
    const str = STRINGS[idx];
    playNote(str.freq, 'tanpura', 0.8, 3.5);
    setActiveString(idx);
    setTimeout(() => setActiveString(null), 500);
  }, [playNote, getCtx]);

  const startLoop = useCallback(() => {
    setIsLooping(true);
    const interval = (60 / tempo) * 1000 * 0.6;
    const tick = () => {
      const idx = stepRef.current % STRINGS.length;
      pluckString(idx);
      stepRef.current++;
      loopRef.current = setTimeout(tick, interval);
    };
    tick();
  }, [pluckString, tempo]);

  const stopLoop = useCallback(() => {
    setIsLooping(false);
    if (loopRef.current) clearTimeout(loopRef.current);
    loopRef.current = null;
  }, []);

  const toggleLoop = useCallback(() => {
    if (isLooping) stopLoop();
    else startLoop();
  }, [isLooping, startLoop, stopLoop]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-[#e8eaf0]">Tanpura</h2>
        <div className={`px-3 py-1 rounded-full text-xs font-mono border ${isLooping ? 'bg-orange-500/20 text-orange-400 border-orange-500/40' : 'bg-[#1a1f2e] text-[#7c869a] border-[#252b3b]'}`}>
          {isLooping ? 'Droning...' : 'Idle'}
        </div>
      </div>

      <ReverbControl reverbOn={reverbOn} onToggle={toggleReverb} reverbAmount={reverbAmount} onAmountChange={updateReverbAmount} />

      {/* Tanpura body */}
      <div className="relative rounded-2xl border border-[#252b3b] bg-gradient-to-b from-[#1a1f2e] to-[#0a0c10] p-6 overflow-hidden">
        {/* Decorative neck */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-16 bg-gradient-to-b from-[#5C2E0A] to-[#3D1E07] rounded-b-2xl" />

        {/* Strings */}
        <div className="relative flex justify-center gap-6 md:gap-10 pt-8">
          {STRINGS.map((str, i) => {
            const isActive = activeString === i;
            return (
              <div
                key={str.label}
                className="flex flex-col items-center gap-2 cursor-pointer tanpura-string"
                onMouseDown={() => pluckString(i)}
                onTouchStart={(e) => { e.preventDefault(); pluckString(i); }}
              >
                {/* String line */}
                <div
                  className={`w-1 rounded-full transition-all ${isActive ? 'vibrating' : ''}`}
                  style={{
                    height: '120px',
                    background: `linear-gradient(180deg, ${str.color}cc 0%, ${str.color} 50%, ${str.color}cc 100%)`,
                    boxShadow: isActive ? `0 0 12px ${str.color}` : 'none',
                    animation: isActive ? 'stringVibrate 0.5s ease-out' : 'none'
                  }}
                />
                <span className="font-display text-sm font-bold" style={{ color: str.color }}>{str.label}</span>
              </div>
            );
          })}
        </div>

        {/* Gourd / body oval */}
        <div className="mx-auto mt-4 w-40 h-24 rounded-full bg-gradient-to-b from-[#5C2E0A] to-[#2a1205] border-2 border-[#8B4513]/50 shadow-2xl flex items-center justify-center">
          <div className="w-20 h-14 rounded-full bg-gradient-to-b from-[#3D1E07] to-[#1a0d03] shadow-inner" />
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 items-center">
        <select
          value={tempo}
          onChange={(e) => setTempo(Number(e.target.value))}
          className="bg-[#1a1f2e] border border-[#252b3b] rounded-lg px-3 py-2 text-sm text-[#e8eaf0] font-mono focus:outline-none focus:border-orange-500"
        >
          {TAALS.map(t => <option key={t.bpm} value={t.bpm}>{t.label}</option>)}
        </select>
        <button
          onClick={toggleLoop}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-sm transition-all ${isLooping ? 'bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30' : 'bg-orange-500 hover:bg-orange-400 text-white'}`}
        >
          {isLooping ? <><Square className="w-4 h-4" /> Stop Drone</> : <><Play className="w-4 h-4" /> Start Drone</>}
        </button>
      </div>

      <p className="text-xs text-[#7c869a] font-mono">Click individual strings or Start Drone for continuous loop. Great for riyaz practice.</p>
    </div>
  );
}
