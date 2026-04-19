import { ArrowRight, Music, Headphones, Star, Users } from 'lucide-react';

const STATS = [
  { icon: Music, value: '9+', label: 'Instruments' },
  { icon: Users, value: '50K+', label: 'Learners' },
  { icon: Headphones, value: 'Real', label: 'Audio Engine' },
  { icon: Star, value: 'Free', label: 'Forever' },
];

const INSTRUMENTS = [
  { name: 'Harmonium', icon: '🎹', color: 'from-orange-900/60 to-orange-950', id: 'harmonium' },
  { name: 'Piano', icon: '🎹', color: 'from-blue-900/60 to-blue-950', id: 'piano' },
  { name: 'Tabla', icon: '🥁', color: 'from-amber-900/60 to-amber-950', id: 'tabla' },
  { name: 'Guitar', icon: '🎸', color: 'from-green-900/60 to-green-950', id: 'guitar' },
  { name: 'Tanpura', icon: '🪕', color: 'from-purple-900/60 to-purple-950', id: 'tanpura' },
  { name: 'Synth', icon: '🎷', color: 'from-cyan-900/60 to-cyan-950', id: 'synth' },
  { name: 'Drum Pad', icon: '🥁', color: 'from-red-900/60 to-red-950', id: 'drumpad' },
  { name: 'Raga Trainer', icon: '🎼', color: 'from-indigo-900/60 to-indigo-950', id: 'raga' },
  { name: 'Voice Trainer', icon: '🎤', color: 'from-rose-900/60 to-rose-950', id: 'voice' },
];

export function Hero({ onSelectInstrument, onNavigate }) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden bg-grid">
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, #f97316 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 midi-pulse inline-block" />
          <span className="text-xs font-mono text-orange-400">Free Online Music Lab</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 max-w-4xl">
          Play Online Instruments,
          <br />
          <span className="text-gradient">Learn Easily,</span>
          <br />
          Practice Daily
        </h1>

        <p className="text-lg text-[#7c869a] max-w-2xl mb-8 leading-relaxed">
          Helium Dock is your all-in-one music lab. Play Harmonium, Piano, Tabla, Guitar, and more —
          with real audio, MIDI support, raga training, and guided lessons. 100% free, no download needed.
        </p>

        <div className="flex flex-wrap gap-3 mb-16">
          <button
            onClick={() => onNavigate('instruments')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold text-base transition-all hover:scale-105"
          >
            Play Now <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('lessons')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#252b3b] hover:border-orange-500/50 text-[#e8eaf0] font-semibold text-base transition-colors bg-[#12161e]"
          >
            Browse Lessons
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3 p-3 rounded-xl border border-[#252b3b] bg-[#12161e]/50">
              <div className="w-9 h-9 rounded-lg bg-orange-500/15 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <div className="font-display text-xl font-bold text-[#e8eaf0]">{value}</div>
                <div className="text-xs text-[#7c869a]">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Instrument grid */}
        <div id="instruments-grid">
          <h2 className="font-display text-2xl font-bold text-[#e8eaf0] mb-4">Choose an Instrument</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-3">
            {INSTRUMENTS.map(inst => (
              <button
                key={inst.id}
                onClick={() => onSelectInstrument(inst.id)}
                className={`group p-3 rounded-xl border border-[#252b3b] bg-gradient-to-b ${inst.color} hover:border-orange-500/50 hover:scale-105 transition-all text-center`}
              >
                <div className="text-2xl mb-1">{inst.icon}</div>
                <div className="text-[10px] font-display font-semibold text-[#e8eaf0] leading-tight">{inst.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
