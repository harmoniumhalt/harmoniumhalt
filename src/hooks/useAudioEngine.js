import { useRef, useCallback, useState } from 'react';

/**
 * Lightweight Web Audio API engine — no external dependencies.
 * Creates oscillator-based notes with envelope shaping and optional reverb.
 */
export function useAudioEngine() {
  const ctxRef = useRef(null);
  const reverbRef = useRef(null);
  const reverbGainRef = useRef(null);
  const dryGainRef = useRef(null);
  const masterRef = useRef(null);
  const activeNodesRef = useRef({});
  const [reverbOn, setReverbOn] = useState(false);
  const [reverbAmount, setReverbAmount] = useState(0.4);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = ctxRef.current;
      masterRef.current = ctx.createGain();
      masterRef.current.gain.value = 0.85;
      masterRef.current.connect(ctx.destination);

      // Build reverb chain
      dryGainRef.current = ctx.createGain();
      dryGainRef.current.gain.value = 1;
      dryGainRef.current.connect(masterRef.current);

      reverbGainRef.current = ctx.createGain();
      reverbGainRef.current.gain.value = 0;
      reverbGainRef.current.connect(masterRef.current);

      // Simple algorithmic reverb via ConvolverNode with impulse response
      const convolver = ctx.createConvolver();
      reverbRef.current = convolver;
      const rate = ctx.sampleRate;
      const length = rate * 2.5;
      const impulse = ctx.createBuffer(2, length, rate);
      for (let c = 0; c < 2; c++) {
        const data = impulse.getChannelData(c);
        for (let i = 0; i < length; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.2);
        }
      }
      convolver.buffer = impulse;
      convolver.connect(reverbGainRef.current);
    }
    // Resume if suspended
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const toggleReverb = useCallback((on) => {
    setReverbOn(on);
    if (reverbGainRef.current) reverbGainRef.current.gain.value = on ? reverbAmount : 0;
    if (dryGainRef.current) dryGainRef.current.gain.value = on ? 0.7 : 1;
  }, [reverbAmount]);

  const updateReverbAmount = useCallback((val) => {
    setReverbAmount(val);
    if (reverbOn && reverbGainRef.current) reverbGainRef.current.gain.value = val;
  }, [reverbOn]);

  /**
   * noteType: 'harmonium' | 'piano' | 'synth' | 'tabla' | 'drum' | 'tanpura'
   */
  const playNote = useCallback((freq, noteType = 'piano', velocity = 1.0, duration = null) => {
    const ctx = getCtx();
    const now = ctx.currentTime;

    const gainNode = ctx.createGain();
    const dest = dryGainRef.current || masterRef.current;
    gainNode.connect(dest);
    if (reverbRef.current) gainNode.connect(reverbRef.current);

    let oscillators = [];

    if (noteType === 'harmonium') {
      // Harmonium: sawtooth + slight detuned copy for that reedy character
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';
      osc1.frequency.value = freq;
      osc2.frequency.value = freq * 1.003; // slight chorus
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.28 * velocity, now + 0.02);
      gainNode.gain.setValueAtTime(0.28 * velocity, now + (duration || 2) - 0.05);
      gainNode.gain.linearRampToValueAtTime(0, now + (duration || 2));
      osc1.start(now); osc2.start(now);
      osc1.stop(now + (duration || 2) + 0.01);
      osc2.stop(now + (duration || 2) + 0.01);
      oscillators = [osc1, osc2];
    } else if (noteType === 'piano') {
      // Piano: triangle fundamental + higher partials
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const osc3 = ctx.createOscillator();
      osc1.type = 'triangle';
      osc2.type = 'sine';
      osc3.type = 'sine';
      osc1.frequency.value = freq;
      osc2.frequency.value = freq * 2;
      osc3.frequency.value = freq * 3;
      const g2 = ctx.createGain(); g2.gain.value = 0.12;
      const g3 = ctx.createGain(); g3.gain.value = 0.05;
      osc1.connect(gainNode); osc2.connect(g2); g2.connect(gainNode);
      osc3.connect(g3); g3.connect(gainNode);
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.4 * velocity, now + 0.005);
      gainNode.gain.exponentialRampToValueAtTime(0.18 * velocity, now + 0.3);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + (duration || 2.5));
      osc1.start(now); osc2.start(now); osc3.start(now);
      osc1.stop(now + (duration || 2.5) + 0.1);
      osc2.stop(now + (duration || 2.5) + 0.1);
      osc3.stop(now + (duration || 2.5) + 0.1);
      oscillators = [osc1, osc2, osc3];
    } else if (noteType === 'synth') {
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc.type = 'square';
      osc2.type = 'sawtooth';
      osc.frequency.value = freq;
      osc2.frequency.value = freq * 0.5;
      const g2 = ctx.createGain(); g2.gain.value = 0.15;
      osc.connect(gainNode); osc2.connect(g2); g2.connect(gainNode);
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 4, now);
      filter.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.3);
      gainNode.disconnect(); gainNode.connect(filter); filter.connect(dest);
      if (reverbRef.current) gainNode.connect(reverbRef.current);
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.35 * velocity, now + 0.01);
      gainNode.gain.setValueAtTime(0.35 * velocity, now + (duration || 1.5) - 0.1);
      gainNode.gain.linearRampToValueAtTime(0, now + (duration || 1.5));
      osc.start(now); osc2.start(now);
      osc.stop(now + (duration || 1.5) + 0.1);
      osc2.stop(now + (duration || 1.5) + 0.1);
      oscillators = [osc, osc2];
    } else if (noteType === 'tabla') {
      // Tabla: pitched noise burst + sine decay
      const bufferSize = ctx.sampleRate * 0.3;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const bpf = ctx.createBiquadFilter();
      bpf.type = 'bandpass';
      bpf.frequency.value = freq;
      bpf.Q.value = 15;
      noise.connect(bpf);
      const toneOsc = ctx.createOscillator();
      toneOsc.frequency.setValueAtTime(freq, now);
      toneOsc.frequency.exponentialRampToValueAtTime(freq * 0.7, now + 0.4);
      toneOsc.type = 'sine';
      bpf.connect(gainNode); toneOsc.connect(gainNode);
      gainNode.gain.setValueAtTime(0.6 * velocity, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      noise.start(now); noise.stop(now + 0.32);
      toneOsc.start(now); toneOsc.stop(now + 0.52);
      oscillators = [toneOsc];
    } else if (noteType === 'drum') {
      const osc = ctx.createOscillator();
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.15, now + 0.25);
      osc.type = 'sine';
      osc.connect(gainNode);
      gainNode.gain.setValueAtTime(1.0 * velocity, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now); osc.stop(now + 0.42);
      oscillators = [osc];
    } else if (noteType === 'tanpura') {
      // Tanpura: rich harmonic series with slow amplitude modulation
      const harmonics = [1, 2, 3, 4, 5, 6];
      const weights = [0.5, 0.25, 0.15, 0.07, 0.02, 0.01];
      oscillators = harmonics.map((h, i) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq * h;
        const g = ctx.createGain();
        g.gain.value = weights[i];
        osc.connect(g); g.connect(gainNode);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.4 * velocity, now + 0.1);
        gainNode.gain.setValueAtTime(0.4 * velocity, now + (duration || 4) - 0.3);
        gainNode.gain.linearRampToValueAtTime(0, now + (duration || 4));
        osc.start(now); osc.stop(now + (duration || 4) + 0.1);
        return osc;
      });
    }

    return { gainNode, oscillators };
  }, [getCtx, reverbOn, reverbAmount]);

  const stopNote = useCallback((noteId) => {
    const node = activeNodesRef.current[noteId];
    if (node) {
      const ctx = ctxRef.current;
      if (ctx) {
        node.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
      }
      delete activeNodesRef.current[noteId];
    }
  }, []);

  return { playNote, stopNote, reverbOn, toggleReverb, reverbAmount, updateReverbAmount, getCtx };
}
