import { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InstrumentLab } from './components/InstrumentLab';
import { Lessons } from './components/Lessons';
import { Blog } from './components/Blog';
import { Testimonials } from './components/Testimonials';
import { About } from './components/About';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [activePage, setActivePage] = useState('home');

  const scrollTo = useCallback((id) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, []);

  const handleNavigate = useCallback((page) => {
    setActivePage(page);
    const scrollMap = {
      instruments: 'instruments',
      lessons: 'lessons',
      blog: 'blog',
      about: 'about',
      practice: 'instruments',
    };
    if (scrollMap[page]) {
      scrollTo(scrollMap[page]);
    } else if (page === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [scrollTo]);

  const handleSelectInstrument = useCallback((id) => {
    setSelectedInstrument(id);
    scrollTo('instruments');
  }, [scrollTo]);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-[#e8eaf0]">
      <Navbar activePage={activePage} onNavigate={handleNavigate} />

      <main>
        <Hero onSelectInstrument={handleSelectInstrument} onNavigate={handleNavigate} />
        <InstrumentLab initialInstrument={selectedInstrument} />
        <Lessons />
        <Testimonials />
        <Blog />
        <About />
      </main>

      <Footer />
    </div>
  );
}
