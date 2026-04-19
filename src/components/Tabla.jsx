import { useState, useCallback } from 'react';
import { useAudioEngine } from '../hooks/useAudioEngine';
import { ReverbControl } from './ReverbControl';

const TABLA_BOLS = [
  { bol: 'Dha', freq: 147, key: 'a', color: 'from-orange-800 to-orange-950', ring: 'border-orange-600', desc: 'Left+Right combined' },
  { bol: 'Dhin', freq: 130, key: 's', color: 'from-orange-700 to-orange-900', ring: 'border-orange-500', desc: 'Bass stroke' },
  { bol: 'Ti',  freq: 392, key: 'd', color: 'from-amber-700 to-amber-950', ring: 'border-amber-600', desc: 'Right sharp' },
  { bol: 'Te',  freq: 349, key: 'f', color: 'from-amber-600 to-amber-900', ring: 'border-amber-500', desc: 'Right mute' },
  { bol: 'Ke',  freq: 98,  key: 'j', color: 'from-stone-600 to-stone-900', ring: 'border-stone-500', desc: 'Left bass' },
  { bol: 'Ge',  freq: 110, key: 'k', color: 'from-stone-700 to-stone-950', ring: 'border-stone-600', desc: 'Left open' },
  { bol: 'Na',  freq: 440, key: 'l', color: 'from-red-800 to-red-950', ring: 'border-red-600', desc: 'Right tip' },
  { bol: 'Tun', freq: 196, key: ';', color: 'from-red-700 to-red-900', ring: 'border-red-500', desc: 'Left center' },
];

const KB_MAP = {};
TABLA_BOLS.forEach((b, i) => { KB_MAP[b.key] = i; });

export function Tabla() {
  const { playNote, reverbOn, toggleReverb, reverbAmount, updateReverbAmount, getCtx } = useAudioEngine();
  const [activeIdx, setActiveIdx] = useState(null);
  const [lastBol, setLastBol] = useState('');

  const playBol = useCallback((idx) => {
    getCtx();
    const bol = TABLA_BOLS[idx];
    playNote(bol.freq, 'tabla', 1.0, 0.5);
    setActiveIdx(idx);
    setLastBol(bol.bol);
    setTimeout(() => setActiveIdx(null), 200);
  }, [playNote, getCtx]);

  const handleKey = useCallback((e) => {
    if (e.repeat) return;
    const idx = KB_MAP[e.key];
    if (idx !== undefined) playBol(idx);
  }, [playBol]);

  // Global keyboard
  useState(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-[#e8eaf0]">Tabla</h2>
        <div className="px-3 py-1 rounded-full bg-[#1a1f2e] border border-[#252b3b] text-orange-400 font-mono text-sm min-w-16 text-center">
          {lastBol || '—'}
        </div>
      </div>

      <ReverbControl reverbOn={reverbOn} onToggle={toggleReverb} reverbAmount={reverbAmount} onAmountChange={updateReverbAmount} />

      {/* Tabla drums visual */}
      <div className="flex justify-center gap-8 py-4">
        {/* Bayan (left, bass) */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-[#7c869a]">Bayan</span>
          <div className="relative">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-b from-stone-700 to-stone-900 border-4 border-stone-600 shadow-2xl flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-stone-950 border-2 border-stone-700 shadow-inner flex items-center justify-center">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-stone-800 to-stone-950 border border-stone-600" />
              </div>
            </div>
          </div>
        </div>
        {/* Dayan (right, treble) */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-[#7c869a]">Dayan</span>
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-b from-amber-800 to-amber-950 border-4 border-amber-700 shadow-2xl flex items-center justify-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-amber-950 border-2 border-amber-700 shadow-inner flex items-center justify-center">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-stone-950 border border-amber-800" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bol pads */}
      <div className="grid grid-cols-4 gap-2">
        {TABLA_BOLS.map((bol, i) => (
          <button
            key={bol.bol}
            className={`tabla-pad rounded-xl bg-gradient-to-b ${bol.color} border-2 ${activeIdx === i ? bol.ring + ' scale-95 brightness-150' : 'border-transparent'} p-3 flex flex-col items-center gap-1 select-none`}
            onMouseDown={() => playBol(i)}
            onTouchStart={(e) => { e.preventDefault(); playBol(i); }}
          >
            <span className="font-display text-lg font-bold text-white">{bol.bol}</span>
            <span className="text-[10px] font-mono text-white/50">[{bol.key.toUpperCase()}]</span>
          </button>
        ))}
      </div>

      <p className="text-xs text-[#7c869a] font-mono">Press A S D F J K L ; to play bols.</p>
    </div>
  );
}
