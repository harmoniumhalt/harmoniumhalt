import { useState, useCallback, useEffect, useRef } from 'react';
import { useAudioEngine } from '../hooks/useAudioEngine';
import { useMidi } from '../hooks/useMidi';
import { MidiPanel } from './MidiPanel';
import { ReverbControl } from './ReverbControl';

// Piano note frequencies (2 octaves, C3–B4)
const KEYS = [
  { note: 'C3',  freq: 130.81, type: 'white', kb: 'a' },
  { note: 'C#3', freq: 138.59, type: 'black', kb: 'w' },
  { note: 'D3',  freq: 146.83, type: 'white', kb: 's' },
  { note: 'D#3', freq: 155.56, type: 'black', kb: 'e' },
  { note: 'E3',  freq: 164.81, type: 'white', kb: 'd' },
  { note: 'F3',  freq: 174.61, type: 'white', kb: 'f' },
  { note: 'F#3', freq: 185.00, type: 'black', kb: 't' },
  { note: 'G3',  freq: 196.00, type: 'white', kb: 'g' },
  { note: 'G#3', freq: 207.65, type: 'black', kb: 'y' },
  { note: 'A3',  freq: 220.00, type: 'white', kb: 'h' },
  { note: 'A#3', freq: 233.08, type: 'black', kb: 'u' },
  { note: 'B3',  freq: 246.94, type: 'white', kb: 'j' },
  { note: 'C4',  freq: 261.63, type: 'white', kb: 'k' },
  { note: 'C#4', freq: 277.18, type: 'black', kb: 'o' },
  { note: 'D4',  freq: 293.66, type: 'white', kb: 'l' },
  { note: 'D#4', freq: 311.13, type: 'black', kb: 'p' },
  { note: 'E4',  freq: 329.63, type: 'white', kb: ';' },
  { note: 'F4',  freq: 349.23, type: 'white', kb: "'" },
  { note: 'F#4', freq: 369.99, type: 'black', kb: ']' },
  { note: 'G4',  freq: 392.00, type: 'white', kb: '\\' },
  { note: 'G#4', freq: 415.30, type: 'black', kb: '' },
  { note: 'A4',  freq: 440.00, type: 'white', kb: '' },
  { note: 'A#4', freq: 466.16, type: 'black', kb: '' },
  { note: 'B4',  freq: 493.88, type: 'white', kb: '' },
];

const WHITE_KEYS = KEYS.filter(k => k.type === 'white');
const BLACK_KEYS = KEYS.filter(k => k.type === 'black');

// Map keyboard key → KEYS index
const KB_MAP = {};
KEYS.forEach((k, i) => { if (k.kb) KB_MAP[k.kb] = i; });

// MIDI note 48 = C3
const MIDI_BASE = 48;

export function Piano() {
  const { playNote, reverbOn, toggleReverb, reverbAmount, updateReverbAmount, getCtx } = useAudioEngine();
  const [activeKeys, setActiveKeys] = useState(new Set());
  const [octaveShift, setOctaveShift] = useState(0);

  const handleNoteOn = useCallback((midiNote, velocity) => {
    const idx = midiNote - MIDI_BASE;
    if (idx >= 0 && idx < KEYS.length) {
      const key = KEYS[idx];
      playNote(key.freq * Math.pow(2, octaveShift), 'piano', velocity);
      setActiveKeys(prev => new Set([...prev, idx]));
      setTimeout(() => setActiveKeys(prev => { const s = new Set(prev); s.delete(idx); return s; }), 300);
    }
  }, [playNote, octaveShift]);

  const handleNoteOff = useCallback((midiNote) => {
    const idx = midiNote - MIDI_BASE;
    setActiveKeys(prev => { const s = new Set(prev); s.delete(idx); return s; });
  }, []);

  const { supported, devices, selectedDeviceId, connected, lastNote, connect, disconnect, midiNoteToFreq, midiNoteToName, requestMidi } = useMidi(handleNoteOn, handleNoteOff);

  const triggerKey = useCallback((idx) => {
    getCtx();
    const key = KEYS[idx];
    playNote(key.freq * Math.pow(2, octaveShift), 'piano', 1.0);
    setActiveKeys(prev => new Set([...prev, idx]));
    setTimeout(() => setActiveKeys(prev => { const s = new Set(prev); s.delete(idx); return s; }), 200);
  }, [playNote, octaveShift, getCtx]);

  // Keyboard input
  useEffect(() => {
    const down = (e) => {
      if (e.repeat) return;
      const idx = KB_MAP[e.key];
      if (idx !== undefined) triggerKey(idx);
    };
    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, [triggerKey]);

  // White key width % for positioning
  const whiteCount = WHITE_KEYS.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-[#e8eaf0]">Piano</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#7c869a] font-mono">Octave</span>
          <button onClick={() => setOctaveShift(o => Math.max(-2, o - 1))} className="w-7 h-7 rounded border border-[#252b3b] hover:border-orange-500 text-[#e8eaf0] text-sm transition-colors">-</button>
          <span className="w-6 text-center text-sm font-mono text-orange-400">{octaveShift >= 0 ? '+' : ''}{octaveShift}</span>
          <button onClick={() => setOctaveShift(o => Math.min(2, o + 1))} className="w-7 h-7 rounded border border-[#252b3b] hover:border-orange-500 text-[#e8eaf0] text-sm transition-colors">+</button>
        </div>
      </div>

      <MidiPanel
        supported={supported} devices={devices} selectedDeviceId={selectedDeviceId}
        connected={connected} lastNote={lastNote}
        onConnect={connect} onDisconnect={disconnect}
        onDeviceChange={(id) => { }} onRefresh={requestMidi}
        midiNoteToName={midiNoteToName}
      />

      <ReverbControl reverbOn={reverbOn} onToggle={toggleReverb} reverbAmount={reverbAmount} onAmountChange={updateReverbAmount} />

      {/* Keyboard */}
      <div className="relative overflow-x-auto">
        <div className="relative" style={{ height: '160px', minWidth: `${whiteCount * 44}px` }}>
          {/* White keys */}
          <div className="absolute inset-0 flex">
            {WHITE_KEYS.map((k, wi) => {
              const globalIdx = KEYS.indexOf(k);
              const isActive = activeKeys.has(globalIdx);
              return (
                <div
                  key={k.note}
                  className={`key-white flex-1 ${isActive ? 'active key-glow' : ''}`}
                  style={{ height: '100%', margin: '0 1px' }}
                  onMouseDown={() => triggerKey(globalIdx)}
                  onTouchStart={(e) => { e.preventDefault(); triggerKey(globalIdx); }}
                >
                  <span className="note-label">{k.note}</span>
                  {k.kb && <span className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#7c869a]/50">{k.kb.toUpperCase()}</span>}
                </div>
              );
            })}
          </div>

          {/* Black keys overlay */}
          {(() => {
            const positions = [];
            let whiteIdx = 0;
            const keyWidth = 100 / whiteCount;
            KEYS.forEach((k, i) => {
              if (k.type === 'white') { whiteIdx++; }
              else {
                const leftPct = (whiteIdx - 0.32) * keyWidth;
                positions.push({ key: k, idx: i, leftPct });
              }
            });
            return positions.map(({ key, idx, leftPct }) => {
              const isActive = activeKeys.has(idx);
              return (
                <div
                  key={key.note}
                  className={`key-black ${isActive ? 'active key-glow' : ''}`}
                  style={{
                    left: `calc(${leftPct}% + 1px)`,
                    width: `calc(${(100 / whiteCount) * 0.65}% - 2px)`,
                    height: '62%',
                    top: 0
                  }}
                  onMouseDown={(e) => { e.stopPropagation(); triggerKey(idx); }}
                  onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); triggerKey(idx); }}
                />
              );
            });
          })()}
        </div>
      </div>

      <p className="text-xs text-[#7c869a] font-mono">Use keyboard keys A–; to play. Connect MIDI device above.</p>
    </div>
  );
}
