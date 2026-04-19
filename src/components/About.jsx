import { Shield, Award, Globe, Music2 } from 'lucide-react';

const TRUST = [
  { icon: Music2, title: '9+ Instruments', desc: 'Harmonium, Piano, Tabla, Guitar, Synth, Tanpura, Drum Pad, Raga & Voice Trainer' },
  { icon: Shield, title: 'No Signup Needed', desc: 'Start playing instantly. No account, no subscription, no download.' },
  { icon: Globe, title: 'Web Audio API', desc: 'Real oscillator-based sounds with envelope shaping and convolution reverb.' },
  { icon: Award, title: 'MIDI Ready', desc: 'Connect any USB MIDI keyboard and play with velocity sensitivity.' },
];

export function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="rounded-2xl border border-[#252b3b] bg-[#12161e] overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left */}
          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-[#252b3b]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 mb-5 text-xs font-mono text-orange-400">
              About Helium Dock
            </div>
            <h2 className="font-display text-3xl font-extrabold text-[#e8eaf0] mb-4 leading-tight">
              Your Free Online Music Lab
            </h2>
            <p className="text-[#7c869a] leading-relaxed mb-4">
              Helium Dock was built for musicians of all levels — from curious beginners picking up their first notes
              to seasoned practitioners who need a reliable digital instrument for daily riyaz.
            </p>
            <p className="text-[#7c869a] leading-relaxed mb-6">
              We use the Web Audio API to generate authentic instrument tones — no pre-recorded samples, no latency,
              no internet required once loaded. MIDI support means your hardware keyboard becomes a high-quality
              digital harmonium or piano instantly.
            </p>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-[#1a1f2e] border border-[#252b3b]">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-orange-400 font-mono">HG</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-[#e8eaf0]">Helium Guide</div>
                <div className="text-xs text-[#7c869a] font-mono">Music Educator & Web Audio Developer</div>
              </div>
            </div>
          </div>
          {/* Right */}
          <div className="p-8 md:p-10 grid grid-cols-1 gap-4">
            {TRUST.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-4 rounded-xl border border-[#252b3b] bg-[#1a1f2e]/50">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#e8eaf0] mb-0.5">{title}</div>
                  <div className="text-xs text-[#7c869a] leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
