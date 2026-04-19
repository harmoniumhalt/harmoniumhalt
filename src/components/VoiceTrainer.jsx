import { useState, useCallback, useRef } from 'react';
import { useAudioEngine } from '../hooks/useAudioEngine';
import { Mic, MicOff, Play, Square, Volume2 } from 'lucide-react';

const EXERCISES = [
  { name: 'Sa-Re-Ga', notes: [261.63, 293.66, 329.63, 349.23, 392.00], labels: ['Sa', 'Re', 'Ga', 'Ma', 'Pa'] },
  { name: 'Sargam Up', notes: [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25], labels: ['S', 'R', 'G', 'M', 'P', 'D', 'N', "S'"] },
  { name: 'Sargam Down', notes: [523.25, 493.88, 440.00, 392.00, 349.23, 329.63, 293.66, 261.63], labels: ["S'", 'N', 'D', 'P', 'M', 'G', 'R', 'S'] },
  { name: 'Mandra Saptak', notes: [130.81, 146.83, 164.81, 174.61, 196.00, 220.00, 246.94, 261.63], labels: ['S₁', 'R₁', 'G₁', 'M₁', 'P₁', 'D₁', 'N₁', 'S'] },
];

const WARM_UPS = [
  { name: 'Lip Trills', duration: 15, desc: 'Relax lips and trill while sliding pitch' },
  { name: 'Humming', duration: 20, desc: 'Hum on M with relaxed jaw' },
  { name: 'Yawn-Sigh', duration: 10, desc: 'Open wide yawn then exhale with AH' },
  { name: 'Tongue Twisters', duration: 30, desc: 'Articulation warm-up for clean consonants' },
];

export function VoiceTrainer() {
  const { playNote, getCtx } = useAudioEngine();
  const [isListening, setIsListening] = useState(false);
  const [detectedNote, setDetectedNote] = useState(null);
  const [detectedFreq, setDetectedFreq] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedEx, setSelectedEx] = useState(EXERCISES[0]);
  const [activeStep, setActiveStep] = useState(null);
  const [tempo, setTempo] = useState(60);
  const [activeWarmup, setActiveWarmup] = useState(null);
  const [warmupTimer, setWarmupTimer] = useState(null);
  const [warmupSecondsLeft, setWarmupSecondsLeft] = useState(0);
  const timerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const rafRef = useRef(null);

  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const freqToNote = useCallback((freq) => {
    const noteNum = Math.round(12 * Math.log2(freq / 440) + 69);
    const name = noteNames[noteNum % 12];
    const octave = Math.floor(noteNum / 12) - 1;
    return `${name}${octave}`;
  }, []);

  const startListening = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;
      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);
      sourceRef.current = source;
      setIsListening(true);

      const buffer = new Float32Array(analyser.fftSize);
      const detect = () => {
        analyser.getFloatTimeDomainData(buffer);
        // Autocorrelation pitch detection
        let bestOffset = -1, bestCorr = 0;
        let lastCorr = 1;
        let foundGoodCorr = false;
        const SIZE = buffer.length / 2;
        for (let offset = 8; offset < SIZE; offset++) {
          let corr = 0;
          for (let i = 0; i < SIZE; i++) corr += buffer[i] * buffer[i + offset];
          corr = corr / SIZE;
          if (corr > 0.9 && corr > lastCorr) {
            foundGoodCorr = true;
            if (corr > bestCorr) { bestCorr = corr; bestOffset = offset; }
          } else if (foundGoodCorr) break;
          lastCorr = corr;
        }
        if (bestOffset > 0) {
          const freq = ctx.sampleRate / bestOffset;
          if (freq > 60 && freq < 1200) {
            setDetectedFreq(Math.round(freq));
            setDetectedNote(freqToNote(freq));
          }
        }
        rafRef.current = requestAnimationFrame(detect);
      };
      detect();
    } catch {
      alert('Microphone access denied.');
    }
  }, [freqToNote]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    setDetectedNote(null);
    setDetectedFreq(null);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (audioCtxRef.current) audioCtxRef.current.close();
  }, []);

  const playExercise = useCallback(() => {
    getCtx();
    const interval = (60 / tempo) * 1000;
    let step = 0;
    setIsPlaying(true);
    const tick = () => {
      if (step >= selectedEx.notes.length) {
        setIsPlaying(false); setActiveStep(null); return;
      }
      playNote(selectedEx.notes[step], 'harmonium', 0.8, interval / 1000 * 0.85);
      setActiveStep(step);
      step++;
      timerRef.current = setTimeout(tick, interval);
    };
    tick();
  }, [getCtx, playNote, selectedEx, tempo]);

  const stopExercise = useCallback(() => {
    setIsPlaying(false); setActiveStep(null);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const startWarmup = useCallback((wu, idx) => {
    setActiveWarmup(idx);
    setWarmupSecondsLeft(wu.duration);
    const interval = setInterval(() => {
      setWarmupSecondsLeft(prev => {
        if (prev <= 1) { clearInterval(interval); setActiveWarmup(null); return 0; }
        return prev - 1;
      });
    }, 1000);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Volume2 className="w-5 h-5 text-orange-400" />
        <h2 className="font-display text-2xl font-bold text-[#e8eaf0]">Voice Trainer</h2>
      </div>

      {/* Pitch detector */}
      <div className="rounded-xl border border-[#252b3b] bg-[#12161e] p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-display font-semibold text-[#e8eaf0]">Live Pitch Detector</span>
          <button
            onClick={isListening ? stopListening : startListening}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isListening ? 'bg-red-500/20 border border-red-500/50 text-red-400' : 'bg-orange-500 text-white hover:bg-orange-400'}`}
          >
            {isListening ? <><MicOff className="w-4 h-4" /> Stop</> : <><Mic className="w-4 h-4" /> Listen</>}
          </button>
        </div>
        {isListening ? (
          <div className="flex items-center gap-4">
            <div className="flex-1 text-center">
              <div className="font-display text-4xl font-bold text-orange-400">{detectedNote || '—'}</div>
              <div className="text-xs font-mono text-[#7c869a] mt-1">{detectedFreq ? `${detectedFreq} Hz` : 'Listening...'}</div>
            </div>
            <div className="flex items-end gap-0.5 h-12">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="wave-bar w-1.5 bg-orange-400/70 rounded" style={{ animationDelay: `${i * 0.08}s` }} />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-xs text-[#7c869a] font-mono">Click Listen to detect your singing pitch in real-time.</p>
        )}
      </div>

      {/* Warm-up exercises */}
      <div className="border border-[#252b3b] rounded-xl p-4 bg-[#12161e]">
        <h3 className="font-display text-sm font-semibold text-[#e8eaf0] mb-3">Vocal Warm-ups</h3>
        <div className="grid grid-cols-2 gap-2">
          {WARM_UPS.map((wu, i) => (
            <button
              key={wu.name}
              onClick={() => startWarmup(wu, i)}
              className={`p-3 rounded-xl border text-left transition-all ${activeWarmup === i ? 'border-orange-500/60 bg-orange-500/10' : 'border-[#252b3b] hover:border-orange-500/30'}`}
            >
              <div className="text-sm font-semibold text-[#e8eaf0]">{wu.name}</div>
              <div className="text-[10px] text-[#7c869a] font-mono mt-0.5">{wu.desc}</div>
              {activeWarmup === i && (
                <div className="mt-1 text-orange-400 text-xs font-mono midi-pulse">{warmupSecondsLeft}s remaining</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Sargam exercises */}
      <div className="border border-[#252b3b] rounded-xl p-4 bg-[#12161e]">
        <h3 className="font-display text-sm font-semibold text-[#e8eaf0] mb-3">Sargam Exercises</h3>
        <div className="flex gap-2 flex-wrap mb-3">
          {EXERCISES.map(ex => (
            <button key={ex.name} onClick={() => setSelectedEx(ex)}
              className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${selectedEx.name === ex.name ? 'border-orange-500/60 bg-orange-500/10 text-orange-400' : 'border-[#252b3b] text-[#7c869a] hover:border-orange-500/30'}`}
            >{ex.name}</button>
          ))}
        </div>
        {/* Swar display */}
        <div className="flex gap-1.5 flex-wrap mb-3">
          {selectedEx.labels.map((l, i) => (
            <div key={i} className={`w-10 h-10 rounded-lg flex items-center justify-center font-display text-sm font-bold border transition-all ${activeStep === i ? 'bg-orange-500 border-orange-400 text-white scale-110' : 'bg-[#1a1f2e] border-[#252b3b] text-[#e8eaf0]'}`}>
              {l}
            </div>
          ))}
        </div>
        <div className="flex gap-3 items-center">
          <input type="range" min="40" max="120" value={tempo} onChange={(e) => setTempo(Number(e.target.value))}
            className="w-24 accent-orange-500 h-1" />
          <span className="text-xs font-mono text-orange-400 w-14">{tempo} BPM</span>
          <button onClick={isPlaying ? stopExercise : playExercise}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isPlaying ? 'bg-red-500/20 border border-red-500/50 text-red-400' : 'bg-orange-500 text-white hover:bg-orange-400'}`}
          >{isPlaying ? <><Square className="w-3.5 h-3.5" /> Stop</> : <><Play className="w-3.5 h-3.5" /> Play & Sing Along</>}</button>
        </div>
      </div>
    </div>
  );
}
