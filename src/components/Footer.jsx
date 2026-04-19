import { Music2, Github, Youtube, Twitter } from 'lucide-react';

const LINKS = {
  Platform: [
    { label: 'Instruments', href: '#instruments' },
    { label: 'Lessons', href: '#lessons' },
    { label: 'Practice Tools', href: '#practice' },
    { label: 'Blog', href: '#blog' },
  ],
  Instruments: [
    { label: 'Harmonium', href: '#instruments' },
    { label: 'Piano', href: '#instruments' },
    { label: 'Tabla', href: '#instruments' },
    { label: 'Tanpura', href: '#instruments' },
    { label: 'Guitar', href: '#instruments' },
  ],
  Learn: [
    { label: 'Raga Basics', href: '#blog' },
    { label: 'Taal Guide', href: '#blog' },
    { label: 'MIDI Setup', href: '#blog' },
    { label: 'Daily Riyaz', href: '#blog' },
  ],
  Legal: [
    { label: 'About Us', href: '#about' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Disclaimer', href: '#' },
  ],
};

const SCHEMA_ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Helium Dock",
  "url": "https://www.heliumdock.com",
  "description": "Free online music learning platform with playable instruments, MIDI support, and real audio engine.",
  "sameAs": ["https://www.heliumdock.com"]
};

export function Footer() {
  return (
    <footer id="contact" className="border-t border-[#252b3b] bg-[#0a0c10] mt-8">
      {/* Schema.org (hidden) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ORG) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                <Music2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-[#e8eaf0]">
                Helium<span className="text-orange-400">Dock</span>
              </span>
            </div>
            <p className="text-xs text-[#7c869a] leading-relaxed mb-4 max-w-xs">
              Play Online Instruments, Learn Easily, Practice Daily. Free music lab for everyone.
            </p>
            <div className="flex gap-3">
              <a href="https://www.heliumdock.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-[#252b3b] flex items-center justify-center hover:border-orange-500/50 transition-colors">
                <Github className="w-3.5 h-3.5 text-[#7c869a]" />
              </a>
              <a href="https://www.heliumdock.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-[#252b3b] flex items-center justify-center hover:border-orange-500/50 transition-colors">
                <Youtube className="w-3.5 h-3.5 text-[#7c869a]" />
              </a>
              <a href="https://www.heliumdock.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-[#252b3b] flex items-center justify-center hover:border-orange-500/50 transition-colors">
                <Twitter className="w-3.5 h-3.5 text-[#7c869a]" />
              </a>
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-xs font-semibold text-[#e8eaf0] mb-3 font-display uppercase tracking-wide">{group}</h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.label}>
                    <a href={link.href}
                      className="text-xs text-[#7c869a] hover:text-orange-400 transition-colors font-mono">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-[#252b3b]">
          <p className="text-[10px] text-[#7c869a] font-mono">
            &copy; 2026 Helium Dock. heliumdock.com — All rights reserved.
          </p>
          <p className="text-[10px] text-[#7c869a] font-mono">
            Built with Web Audio API &bull; MIDI Support &bull; React
          </p>
        </div>
      </div>
    </footer>
  );
}
