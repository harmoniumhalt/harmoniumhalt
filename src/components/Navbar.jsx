import { useState } from 'react';
import { Menu, X, Music2 } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Instruments', href: '#instruments' },
  { label: 'Lessons', href: '#lessons' },
  { label: 'Practice', href: '#practice' },
  { label: 'Blog', href: '#blog' },
  { label: 'About', href: '#about' },
];

export function Navbar({ activePage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (href) => {
    setMenuOpen(false);
    if (onNavigate) onNavigate(href.replace('#', ''));
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#252b3b] bg-[#0a0c10]/90 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => onNavigate && onNavigate('home')} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center group-hover:bg-orange-400 transition-colors">
            <Music2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-display text-lg font-bold text-[#e8eaf0]">
            Helium<span className="text-orange-400">Dock</span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-[#7c869a] hover:text-[#e8eaf0] hover:bg-[#1a1f2e] transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="https://www.heliumdock.com" target="_blank" rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-colors">
            Start Playing
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg border border-[#252b3b] hover:border-orange-500/50 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-5 h-5 text-[#e8eaf0]" /> : <Menu className="w-5 h-5 text-[#e8eaf0]" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#252b3b] bg-[#0a0c10]">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-[#7c869a] hover:text-[#e8eaf0] hover:bg-[#1a1f2e] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => { setMenuOpen(false); onNavigate && onNavigate('instruments'); }}
                className="w-full px-4 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-semibold"
              >
                Start Playing
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
