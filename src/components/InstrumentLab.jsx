import { useState } from 'react';
import { Piano } from './Piano';
import { Harmonium } from './Harmonium';
import { Tabla } from './Tabla';
import { Tanpura } from './Tanpura';
import { DrumPad } from './DrumPad';
import { Guitar } from './Guitar';
import { Synth } from './Synth';
import { RagaTrainer } from './RagaTrainer';
import { VoiceTrainer } from './VoiceTrainer';
import { RotateCcw } from 'lucide-react';

const TABS = [
  { id: 'harmonium', label: 'Harmonium', emoji: '🎹' },
  { id: 'piano',     label: 'Piano',     emoji: '🎹' },
  { id: 'tabla',     label: 'Tabla',     emoji: '🥁' },
  { id: 'tanpura',   label: 'Tanpura',   emoji: '🪕' },
  { id: 'guitar',    label: 'Guitar',    emoji: '🎸' },
  { id: 'synth',     label: 'Synth',     emoji: '🎷' },
  { id: 'drumpad',   label: 'Drum Pad',  emoji: '🥁' },
  { id: 'raga',      label: 'Raga',      emoji: '🎼' },
  { id: 'voice',     label: 'Voice',     emoji: '🎤' },
];

function LandscapeHint() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className="sm:hidden flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1a1f2e] border border-[#252b3b] text-xs text-[#7c869a] font-mono mb-3">
      <RotateCcw className="w-3.5 h-3.5 text-orange-400 shrink-0" />
      <span>Rotate to landscape for best keyboard experience</span>
      <button onClick={() => setDismissed(true)} className="ml-auto text-[#252b3b] hover:text-orange-400">✕</button>
    </div>
  );
}

export function InstrumentLab({ initialInstrument }) {
  const [active, setActive] = useState(initialInstrument || 'harmonium');

  const renderInstrument = () => {
    switch (active) {
      case 'harmonium': return <Harmonium />;
      case 'piano':     return <Piano />;
      case 'tabla':     return <Tabla />;
      case 'tanpura':   return <Tanpura />;
      case 'guitar':    return <Guitar />;
      case 'synth':     return <Synth />;
      case 'drumpad':   return <DrumPad />;
      case 'raga':      return <RagaTrainer />;
      case 'voice':     return <VoiceTrainer />;
      default:          return <Harmonium />;
    }
  };

  return (
    <section id="instruments" className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h2 className="font-display text-3xl font-extrabold text-[#e8eaf0] mb-1">Instrument Lab</h2>
        <p className="text-[#7c869a] text-sm font-mono">Real audio • MIDI support • Mobile ready</p>
      </div>

      {/* Tab bar — horizontal scroll on mobile */}
      <div className="overflow-x-auto -mx-4 px-4 mb-4">
        <div className="flex gap-1.5 min-w-max">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border whitespace-nowrap transition-all ${
                active === tab.id
                  ? 'bg-orange-500/15 border-orange-500/50 text-orange-400'
                  : 'border-[#252b3b] text-[#7c869a] hover:border-orange-500/30 hover:text-[#e8eaf0] bg-[#12161e]'
              }`}
            >
              <span className="text-base">{tab.emoji}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Instrument panel */}
      <div className="rounded-2xl border border-[#252b3b] bg-[#12161e] p-4 md:p-6">
        <LandscapeHint />
        {renderInstrument()}
      </div>
    </section>
  );
}
