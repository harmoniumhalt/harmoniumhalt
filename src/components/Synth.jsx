import { useState, useCallback, useEffect, useRef } from 'react';
import { useAudioEngine } from '../hooks/useAudioEngine';
import { useMidi } from '../hooks/useMidi';
import { MidiPanel } from './MidiPanel';
import { ReverbControl } from './ReverbControl';
import { Sliders } from 'lucide-react';

const SYNTH_KEYS = [
  { note: 'C4',  freq: 261.63, type: 'white', kb: 'a' },
  { note: 'C#4', freq: 277.18, type: 'black', kb: 'w' },
  { note: 'D4',  freq: 293.66, type: 'white', kb: 's' },
  { note: 'D#4', freq: 311.13, type: 'black', kb: 'e' },
  { note: 'E4',  freq: 329.63, type: 'white', kb: 'd' },
  { note: 'F4',  freq: 349.23, type: 'white', kb: 'f' },
  { note: 'F#4', freq: 369.99, type: 'black', kb: 't' },
  { note: 'G4',  freq: 392.00, type: 'white', kb: 'g' },
  { note: 'G#4', freq: 415.30, type: 'black', kb: 'y' },
  { note: 'A4',  freq: 440.00, type: 'white', kb: 'h' },
  { note: 'A#4', freq: 466.16, type: 'black', kb: 'u' },
  { note: 'B4',  freq: 493.88, type: 'white', kb: 'j' },
  { note: 'C5',  freq: 523.25, type: 'white', kb: 'k' },
];

const WHITE_KEYS = SYNTH_KEYS.filter(k => k.type === 'white');
const KB_MAP = {};
SYNTH_KEYS.forEach((k, i) => { if (k.kb) KB_MAP[k.kb] = i; });

const WAVEFORMS = ['sine', 'square', 'sawtooth', 'triangle'];
const WAVEFORM_LABELS = { sine: 'Sine', square: 'Square', sawtooth: 'Saw', triangle: 'Tri' };

export function Synth() {
  const { playNote, reverbOn, toggleReverb, reverbAmount, updateReverbAmount, getCtx } = useAudioEngine();
  const [activeKeys, setActiveKeys] = useState(new Set());
  const [wave, setWave] = useState('sawtooth');
  const ctxRef = useRef(null);
  const oscillatorsRef = useRef({});

  const triggerKey = useCallback((idx, velocity = 1.0) => {
    getCtx();
    const key = SYNTH_KEYS[idx];
    playNote(key.freq, 'synth', velocity, 1.2);
    setActiveKeys(prev => new Set([...prev, idx]));
    setTimeout(() => setActiveKeys(prev => { const s = new Set(prev); s.delete(idx); return s; }), 300);
  }, [playNote, getCtx]);

  const onNoteOn = useCallback((midiNote, velocity) => {
    const idx = midiNote - 60;
    if (idx >= 0 && idx < SYNTH_KEYS.length) triggerKey(idx, velocity);
  }, [triggerKey]);

  const onNoteOff = useCallback((midiNote) => {
    const idx = midiNote - 60;
    setActiveKeys(prev => { const s = new Set(prev); s.delete(idx); return s; });
  }, []);

  const { supported, devices, selectedDeviceId, connected, lastNote, connect, disconnect, midiNoteToName, requestMidi } = useMidi(onNoteOn, onNoteOff);

  useEffect(() => {
    const down = (e) => { if (e.repeat) return; const idx = KB_MAP[e.key]; if (idx !== undefined) triggerKey(idx); };
    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, [triggerKey]);

  const whiteCount = WHITE_KEYS.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-[#e8eaf0]">Synthesizer</h2>
        <div className="flex items-center gap-1.5">
          <Sliders className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-mono text-orange-400">{WAVEFORM_LABELS[wave]}</span>
        </div>
      </div>

      <MidiPanel
        supported={supported} devices={devices} selectedDeviceId={selectedDeviceId}
        connected={connected} lastNote={lastNote}
        onConnect={connect} onDisconnect={disconnect}
        onDeviceChange={() => {}} onRefresh={requestMidi}
        midiNoteToName={midiNoteToName}
      />

      <ReverbControl reverbOn={reverbOn} onToggle={toggleReverb} reverbAmount={reverbAmount} onAmountChange={updateReverbAmount} />

      {/* Waveform selector */}
      <div className="flex gap-2">
        {WAVEFORMS.map(w => (
          <button
            key={w}
            onClick={() => setWave(w)}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-colors ${wave === w ? 'bg-orange-500/20 border-orange-500/60 text-orange-400' : 'border-[#252b3b] text-[#7c869a] hover:border-orange-500/30 hover:text-[#e8eaf0]'}`}
          >
            {WAVEFORM_LABELS[w]}
          </button>
        ))}
      </div>

      {/* Synth visualizer bars */}
      <div className="flex items-end justify-center gap-0.5 h-10 rounded-xl bg-[#12161e] border border-[#252b3b] overflow-hidden px-2">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-orange-500/60 rounded-t"
            style={{
              animation: `barPulse ${0.5 + Math.random() * 0.5}s ease-in-out ${i * 0.03}s infinite`,
              transformOrigin: 'bottom',
              minHeight: '2px',
              opacity: activeKeys.size > 0 ? 1 : 0.3,
            }}
          />
        ))}
      </div>

      {/* Keyboard */}
      <div className="relative overflow-x-auto">
        <div className="relative rounded-xl bg-[#0d1117] border border-[#252b3b] p-2"
          style={{ height: '140px', minWidth: `${whiteCount * 46}px` }}>
          <div className="absolute inset-2" style={{ height: 'calc(100% - 16px)' }}>
            {/* White keys */}
            <div className="absolute inset-0 flex gap-0.5">
              {WHITE_KEYS.map((k) => {
                const globalIdx = SYNTH_KEYS.indexOf(k);
                const isActive = activeKeys.has(globalIdx);
                return (
                  <div
                    key={k.note}
                    className={`key-white flex-1 ${isActive ? 'active key-glow' : ''}`}
                    style={{ height: '100%' }}
                    onMouseDown={() => triggerKey(globalIdx)}
                    onTouchStart={(e) => { e.preventDefault(); triggerKey(globalIdx); }}
                  >
                    <span className="note-label">{k.note}</span>
                  </div>
                );
              })}
            </div>
            {/* Black keys */}
            {(() => {
              let wi = 0;
              const kw = 100 / whiteCount;
              return SYNTH_KEYS.map((k, i) => {
                if (k.type === 'white') { wi++; return null; }
                const lp = (wi - 0.32) * kw;
                const isActive = activeKeys.has(i);
                return (
                  <div
                    key={k.note}
                    className={`key-black ${isActive ? 'active key-glow' : ''}`}
                    style={{ left: `calc(${lp}% + 1px)`, width: `calc(${kw * 0.65}% - 2px)`, height: '62%', top: 0 }}
                    onMouseDown={(e) => { e.stopPropagation(); triggerKey(i); }}
                    onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); triggerKey(i); }}
                  />
                );
              });
            })()}
          </div>
        </div>
      </div>

      <p className="text-xs text-[#7c869a] font-mono">Keys A–K to play. Change waveform for different synth textures.</p>
    </div>
  );
}
