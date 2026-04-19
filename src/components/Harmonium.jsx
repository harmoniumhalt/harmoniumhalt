import { useState, useCallback, useEffect } from 'react';
import { useAudioEngine } from '../hooks/useAudioEngine';
import { useMidi } from '../hooks/useMidi';
import { MidiPanel } from './MidiPanel';
import { ReverbControl } from './ReverbControl';

const HARMONIUM_KEYS = [
  { note: 'Sa',   swar: 'S',  freq: 261.63, type: 'white', kb: 'a', midi: 60 },
  { note: 'Komal Re', swar: 'r', freq: 277.18, type: 'black', kb: 'w', midi: 61 },
  { note: 'Re',   swar: 'R',  freq: 293.66, type: 'white', kb: 's', midi: 62 },
  { note: 'Komal Ga', swar: 'g', freq: 311.13, type: 'black', kb: 'e', midi: 63 },
  { note: 'Ga',   swar: 'G',  freq: 329.63, type: 'white', kb: 'd', midi: 64 },
  { note: 'Ma',   swar: 'M',  freq: 349.23, type: 'white', kb: 'f', midi: 65 },
  { note: 'Tivra Ma', swar: 'm', freq: 369.99, type: 'black', kb: 't', midi: 66 },
  { note: 'Pa',   swar: 'P',  freq: 392.00, type: 'white', kb: 'g', midi: 67 },
  { note: 'Komal Dha', swar: 'd', freq: 415.30, type: 'black', kb: 'y', midi: 68 },
  { note: 'Dha',  swar: 'D',  freq: 440.00, type: 'white', kb: 'h', midi: 69 },
  { note: 'Komal Ni', swar: 'n', freq: 466.16, type: 'black', kb: 'u', midi: 70 },
  { note: 'Ni',   swar: 'N',  freq: 493.88, type: 'white', kb: 'j', midi: 71 },
  { note: "Sa'",  swar: "S'", freq: 523.25, type: 'white', kb: 'k', midi: 72 },
  { note: "Komal Re'", swar: "r'", freq: 554.37, type: 'black', kb: 'o', midi: 73 },
  { note: "Re'",  swar: "R'", freq: 587.33, type: 'white', kb: 'l', midi: 74 },
  { note: "Komal Ga'", swar: "g'", freq: 622.25, type: 'black', kb: 'p', midi: 75 },
  { note: "Ga'",  swar: "G'", freq: 659.25, type: 'white', kb: ';', midi: 76 },
  { note: "Ma'",  swar: "M'", freq: 698.46, type: 'white', kb: "'", midi: 77 },
];

const WHITE_KEYS = HARMONIUM_KEYS.filter(k => k.type === 'white');
const KB_MAP = {};
HARMONIUM_KEYS.forEach((k, i) => { if (k.kb) KB_MAP[k.kb] = i; });
const MIDI_MAP = {};
HARMONIUM_KEYS.forEach((k, i) => { MIDI_MAP[k.midi] = i; });

export function Harmonium() {
  const { playNote, reverbOn, toggleReverb, reverbAmount, updateReverbAmount, getCtx } = useAudioEngine();
  const [activeKeys, setActiveKeys] = useState(new Set());
  const [bellowsOpen, setBellowsOpen] = useState(false);

  const triggerKey = useCallback((idx, velocity = 1.0) => {
    getCtx();
    const key = HARMONIUM_KEYS[idx];
    playNote(key.freq, 'harmonium', velocity, 1.5);
    setBellowsOpen(true);
    setActiveKeys(prev => new Set([...prev, idx]));
    setTimeout(() => {
      setActiveKeys(prev => { const s = new Set(prev); s.delete(idx); return s; });
      setBellowsOpen(false);
    }, 400);
  }, [playNote, getCtx]);

  const onNoteOn = useCallback((midiNote, velocity) => {
    const idx = MIDI_MAP[midiNote];
    if (idx !== undefined) triggerKey(idx, velocity);
  }, [triggerKey]);

  const onNoteOff = useCallback((midiNote) => {
    const idx = MIDI_MAP[midiNote];
    if (idx !== undefined) setActiveKeys(prev => { const s = new Set(prev); s.delete(idx); return s; });
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
        <h2 className="font-display text-2xl font-bold text-[#e8eaf0]">Harmonium</h2>
        <div className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${bellowsOpen ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' : 'bg-[#1a1f2e] text-[#7c869a] border border-[#252b3b]'}`}>
          {bellowsOpen ? 'Bellows Open' : 'Bellows Closed'}
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

      {/* Harmonium body */}
      <div className="rounded-2xl border-2 border-[#8B4513]/50 bg-gradient-to-b from-[#5C2E0A] to-[#3D1E07] p-4 shadow-2xl">
        {/* Grille decoration */}
        <div className="flex gap-1 mb-4 justify-center">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-2 h-8 rounded-full bg-[#2a1205]/80 border border-[#8B4513]/30" />
          ))}
        </div>

        {/* Keys */}
        <div className="relative bg-[#1a1008] rounded-xl p-2" style={{ height: '140px' }}>
          <div className="relative h-full" style={{ minWidth: `${whiteCount * 42}px` }}>
            {/* White keys */}
            <div className="absolute inset-0 flex gap-0.5">
              {WHITE_KEYS.map((k) => {
                const globalIdx = HARMONIUM_KEYS.indexOf(k);
                const isActive = activeKeys.has(globalIdx);
                return (
                  <div
                    key={k.note}
                    className={`key-white flex-1 relative ${isActive ? 'active key-glow' : ''}`}
                    style={{ height: '100%' }}
                    onMouseDown={() => triggerKey(globalIdx)}
                    onTouchStart={(e) => { e.preventDefault(); triggerKey(globalIdx); }}
                  >
                    <span className="note-label text-[#5C2E0A] font-bold">{k.swar}</span>
                  </div>
                );
              })}
            </div>
            {/* Black keys */}
            {(() => {
              let whiteIdx = 0;
              const kw = 100 / whiteCount;
              return HARMONIUM_KEYS.map((k, i) => {
                if (k.type === 'white') { whiteIdx++; return null; }
                const leftPct = (whiteIdx - 0.32) * kw;
                const isActive = activeKeys.has(i);
                return (
                  <div
                    key={k.note}
                    className={`key-black ${isActive ? 'active key-glow' : ''}`}
                    style={{ left: `calc(${leftPct}% + 1px)`, width: `calc(${kw * 0.65}% - 2px)`, height: '62%', top: 0 }}
                    onMouseDown={(e) => { e.stopPropagation(); triggerKey(i); }}
                    onTouchStart={(e) => { e.preventDefault(); e.stopPropagation(); triggerKey(i); }}
                  >
                    <span style={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', fontSize: '0.5rem', color: '#f97316', fontFamily: 'JetBrains Mono' }}>{k.swar}</span>
                  </div>
                );
              });
            })()}
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="mt-3 flex justify-center gap-2">
          {['S', 'R', 'G', 'M', 'P', 'D', 'N'].map(s => (
            <span key={s} className="text-[#8B4513]/60 text-xs font-mono font-bold">{s}</span>
          ))}
        </div>
      </div>

      <p className="text-xs text-[#7c869a] font-mono">Keys A–; to play. Keyboard mapped to Swaras S R G M P D N.</p>
    </div>
  );
}
