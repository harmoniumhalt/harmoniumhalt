import { useState, useCallback, useRef } from 'react';
import { useAudioEngine } from '../hooks/useAudioEngine';
import { ReverbControl } from './ReverbControl';
import { Play, Square, BookOpen } from 'lucide-react';

const RAGAS = [
  {
    name: 'Yaman',
    time: 'Evening',
    mood: 'Romantic, Serene',
    aroha:  [261.63, 293.66, 329.63, 369.99, 392.00, 440.00, 493.88, 523.25],
    avaroha:[523.25, 493.88, 440.00, 392.00, 369.99, 329.63, 293.66, 261.63],
    notes:  ['S', 'R', 'G', 'M#', 'P', 'D', 'N', "S'"],
    color:  'from-indigo-900 to-blue-950'
  },
  {
    name: 'Bhairav',
    time: 'Morning',
    mood: 'Peaceful, Devotional',
    aroha:  [261.63, 277.18, 329.63, 349.23, 392.00, 415.30, 493.88, 523.25],
    avaroha:[523.25, 493.88, 415.30, 392.00, 349.23, 329.63, 277.18, 261.63],
    notes:  ['S', 'r', 'G', 'M', 'P', 'd', 'N', "S'"],
    color:  'from-amber-900 to-orange-950'
  },
  {
    name: 'Bhairavi',
    time: 'Morning (concluding)',
    mood: 'Melancholic, Poignant',
    aroha:  [261.63, 277.18, 311.13, 349.23, 392.00, 415.30, 466.16, 523.25],
    avaroha:[523.25, 466.16, 415.30, 392.00, 349.23, 311.13, 277.18, 261.63],
    notes:  ['S', 'r', 'g', 'M', 'P', 'd', 'n', "S'"],
    color:  'from-purple-900 to-violet-950'
  },
  {
    name: 'Desh',
    time: 'Late Night',
    mood: 'Romantic, Patriotic',
    aroha:  [261.63, 329.63, 349.23, 392.00, 440.00, 523.25],
    avaroha:[523.25, 493.88, 440.00, 392.00, 349.23, 329.63, 293.66, 261.63],
    notes:  ['S', 'G', 'M', 'P', 'D', "S'"],
    color:  'from-green-900 to-teal-950'
  },
  {
    name: 'Kafi',
    time: 'Night',
    mood: 'Emotional, Folk',
    aroha:  [261.63, 293.66, 311.13, 349.23, 392.00, 440.00, 466.16, 523.25],
    avaroha:[523.25, 466.16, 440.00, 392.00, 349.23, 311.13, 293.66, 261.63],
    notes:  ['S', 'R', 'g', 'M', 'P', 'D', 'n', "S'"],
    color:  'from-rose-900 to-red-950'
  },
];

const ALANKARS = [
  { name: 'Basic Ascending', pattern: [0, 1, 2, 3, 4, 5, 6, 7] },
  { name: 'Basic Descending', pattern: [7, 6, 5, 4, 3, 2, 1, 0] },
  { name: '3-Note Groups', pattern: [0, 1, 2, 1, 2, 3, 2, 3, 4, 3, 4, 5] },
  { name: 'Meend (glide)', pattern: [0, 2, 4, 7, 4, 2, 0] },
];

export function RagaTrainer() {
  const { playNote, reverbOn, toggleReverb, reverbAmount, updateReverbAmount, getCtx } = useAudioEngine();
  const [selectedRaga, setSelectedRaga] = useState(RAGAS[0]);
  const [selectedAlankar, setSelectedAlankar] = useState(ALANKARS[0]);
  const [activeSwar, setActiveSwar] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(80);
  const timerRef = useRef(null);

  const playSwar = useCallback((freqIdx) => {
    getCtx();
    const freq = selectedRaga.aroha[freqIdx] || selectedRaga.aroha[0];
    playNote(freq, 'harmonium', 0.9, 0.6);
    setActiveSwar(freqIdx);
    setTimeout(() => setActiveSwar(null), 400);
  }, [playNote, getCtx, selectedRaga]);

  const playAlankar = useCallback(() => {
    const raga = selectedRaga;
    const alankar = selectedAlankar;
    const interval = (60 / tempo) * 1000;
    let step = 0;
    setIsPlaying(true);

    const playStep = () => {
      if (step >= alankar.pattern.length) {
        setIsPlaying(false);
        setActiveSwar(null);
        return;
      }
      const noteIdx = alankar.pattern[step] % raga.aroha.length;
      const freq = raga.aroha[noteIdx];
      playNote(freq, 'harmonium', 0.85, interval / 1000 * 0.8);
      setActiveSwar(noteIdx);
      step++;
      timerRef.current = setTimeout(playStep, interval);
    };
    playStep();
  }, [playNote, selectedRaga, selectedAlankar, tempo]);

  const stopAlankar = useCallback(() => {
    setIsPlaying(false);
    setActiveSwar(null);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-orange-400" />
        <h2 className="font-display text-2xl font-bold text-[#e8eaf0]">Raga Trainer</h2>
      </div>

      <ReverbControl reverbOn={reverbOn} onToggle={toggleReverb} reverbAmount={reverbAmount} onAmountChange={updateReverbAmount} />

      {/* Raga selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {RAGAS.map(raga => (
          <button
            key={raga.name}
            onClick={() => setSelectedRaga(raga)}
            className={`p-3 rounded-xl border text-left transition-all ${selectedRaga.name === raga.name ? 'border-orange-500/60 bg-orange-500/10' : 'border-[#252b3b] bg-[#12161e] hover:border-orange-500/30'}`}
          >
            <div className="font-display text-sm font-bold text-[#e8eaf0]">{raga.name}</div>
            <div className="text-[10px] font-mono text-[#7c869a] mt-0.5">{raga.time}</div>
            <div className="text-[10px] text-orange-400/70 mt-0.5">{raga.mood}</div>
          </button>
        ))}
      </div>

      {/* Selected raga info */}
      <div className={`rounded-xl bg-gradient-to-br ${selectedRaga.color} border border-white/10 p-4`}>
        <h3 className="font-display text-lg font-bold text-white mb-1">{selectedRaga.name}</h3>
        <p className="text-xs text-white/60 font-mono mb-3">Time: {selectedRaga.time} | Mood: {selectedRaga.mood}</p>

        {/* Aroha / Avaroha */}
        <div className="space-y-2">
          <div>
            <p className="text-[10px] font-mono text-white/50 mb-1">Aroha (Ascending)</p>
            <div className="flex gap-1.5 flex-wrap">
              {selectedRaga.notes.map((swar, i) => (
                <button
                  key={i}
                  onClick={() => playSwar(i)}
                  className={`w-10 h-10 rounded-lg font-display text-sm font-bold border transition-all ${activeSwar === i ? 'bg-orange-500 border-orange-400 text-white scale-110' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
                >
                  {swar}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-mono text-white/50 mb-1">Avaroha (Descending)</p>
            <div className="flex gap-1.5 flex-wrap">
              {[...selectedRaga.notes].reverse().map((swar, i) => (
                <button
                  key={i}
                  onClick={() => playSwar(selectedRaga.notes.length - 1 - i)}
                  className={`w-10 h-10 rounded-lg font-display text-sm font-bold border bg-white/10 border-white/20 text-white/80 hover:bg-white/20 transition-all`}
                >
                  {swar}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alankar practice */}
      <div className="border border-[#252b3b] rounded-xl p-4 bg-[#12161e]">
        <h3 className="font-display text-sm font-semibold text-[#e8eaf0] mb-3">Alankar Practice</h3>
        <div className="flex gap-2 flex-wrap mb-3">
          {ALANKARS.map(a => (
            <button
              key={a.name}
              onClick={() => setSelectedAlankar(a)}
              className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${selectedAlankar.name === a.name ? 'border-orange-500/60 bg-orange-500/10 text-orange-400' : 'border-[#252b3b] text-[#7c869a] hover:border-orange-500/30'}`}
            >
              {a.name}
            </button>
          ))}
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#7c869a] font-mono">BPM</span>
            <input
              type="range" min="40" max="160" value={tempo}
              onChange={(e) => setTempo(Number(e.target.value))}
              className="w-24 accent-orange-500 h-1"
            />
            <span className="text-xs font-mono text-orange-400 w-8">{tempo}</span>
          </div>
          <button
            onClick={isPlaying ? stopAlankar : playAlankar}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isPlaying ? 'bg-red-500/20 border border-red-500/50 text-red-400' : 'bg-orange-500 text-white hover:bg-orange-400'}`}
          >
            {isPlaying ? <><Square className="w-3.5 h-3.5" /> Stop</> : <><Play className="w-3.5 h-3.5" /> Play Alankar</>}
          </button>
        </div>
      </div>
    </div>
  );
}
