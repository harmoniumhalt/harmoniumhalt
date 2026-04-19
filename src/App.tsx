import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Harmonium from './components/instruments/Harmonium';
import InstrumentCard from './components/InstrumentCard';
import Testimonial from './components/Testimonial';

const instruments = [
  { name: "Harmonium", icon: "🎹", url: "/harmonium" },
  { name: "Tabla", icon: "🥁", url: "/tabla" },
  { name: "Tanpura", icon: "🪕", url: "/tanpura" },
  { name: "Piano", icon: "🎹", url: "/piano" },
  { name: "Drum Pad", icon: "🥁", url: "/drum-pad" },
  { name: "Guitar", icon: "🎸", url: "/guitar" },
  { name: "Synth", icon: "🎷", url: "/synth" },
  { name: "Voice Trainer", icon: "🎤", url: "/voice-trainer" },
  { name: "Raga Trainer", icon: "🎼", url: "/raga-trainer" }
];

const testimonials = [
  {
    name: "Ananya Sharma",
    role: "Music Student",
    content: "Helium Dock transformed my learning experience. The interactive instruments and structured lessons helped me master classical ragas in just 3 months!",
    avatar: "/images/avatar1.jpg"
  },
  {
    name: "Raj Patel",
    role: "Professional Musician",
    content: "As a performer, I use Helium Dock daily for practice. The realistic sound samples and reverb system make it feel like I'm playing real instruments.",
    avatar: "/images/avatar2.jpg"
  },
  {
    name: "Priya Mehta",
    role: "Music Teacher",
    content: "I recommend Helium Dock to all my students. The curriculum progression from beginner to advanced is perfectly structured.",
    avatar: "/images/avatar3.jpg"
  }
];

function App() {
  const [activeInstrument, setActiveInstrument] = useState<string | null>(null);

  const handleInstrumentSelect = (instrument: string) => {
    setActiveInstrument(instrument);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {activeInstrument === 'harmonium' ? (
          <Harmonium onBack={() => setActiveInstrument(null)} />
        ) : (
          <>
            {/* Hero Section */}
            <section className="py-16 md:py-24">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-slate-900">
                  Play Online Instruments, Learn Easily, Practice Daily
                </h1>
                <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                  Master music with our interactive platform. Real instruments, structured lessons, and daily practice tools - all in one place.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button 
                    onClick={() => handleInstrumentSelect('harmonium')}
                    className="btn-primary"
                  >
                    Start Playing Now
                  </button>
                  <a href="/lessons" className="btn-secondary">
                    Explore Lessons
                  </a>
                </div>
              </div>
            </section>
            
            {/* Featured Instrument */}
            <section className="py-12 bg-white rounded-2xl shadow-lg mb-16">
              <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                    <h2 className="text-3xl font-heading font-bold mb-4 text-slate-900">Harmonium - Our Featured Instrument</h2>
                    <p className="text-slate-600 mb-6">
                      Experience the rich, soulful sound of the harmonium with our realistic online version. Perfect for practicing classical ragas, bhajans, and devotional music.
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Authentic sound samples
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Real-time reverb control
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Sample music playback
                      </li>
                      <li className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Mobile optimized interface
                      </li>
                    </ul>
                    <button 
                      onClick={() => handleInstrumentSelect('harmonium')}
                      className="btn-primary"
                    >
                      Try Harmonium Now
                    </button>
                  </div>
                  <div className="md:w-1/2">
                    <div className="bg-gradient-to-br from-primary-50 to-slate-100 rounded-xl p-8 border border-slate-200">
                      <div className="flex justify-center mb-6">
                        <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md">
                          <div className="flex justify-between mb-4">
                            <div className="text-white font-bold">Harmonium</div>
                            <div className="flex space-x-2">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                          </div>
                          <div className="grid grid-cols-7 gap-2 mb-4">
                            {Array.from({ length: 14 }).map((_, i) => (
                              <button 
                                className="h-16 bg-slate-700 rounded-md hover:bg-slate-600 transition flex items-center justify-center text-white font-bold"
                                key={i}
                              >
                                {String.fromCharCode(65 + i)}
                              </button>
                            ))}
                          </div>
                          <div className="grid grid-cols-7 gap-2">
                            {Array.from({ length: 14 }).map((_, i) => (
                              <button 
                                className="h-16 bg-slate-600 rounded-md hover:bg-slate-500 transition flex items-center justify-center text-white font-bold"
                                key={i}
                              >
                                {String.fromCharCode(97 + i)}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <button className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-6 rounded-lg flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                          Play Demo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Instruments Grid */}
            <section className="py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-heading font-bold mb-4">Explore Our Instruments</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Play real instruments online with authentic sound samples and interactive controls
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {instruments.map((instrument) => (
                  <InstrumentCard 
                    key={instrument.name}
                    name={instrument.name} 
                    icon={instrument.icon} 
                    url={instrument.url} 
                    onClick={() => handleInstrumentSelect(instrument.name.toLowerCase())}
                  />
                ))}
              </div>
              
              <div className="text-center mt-12">
                <a href="/instruments" className="btn-secondary">
                  View All Instruments
                </a>
              </div>
            </section>
            
            {/* Testimonials */}
            <section className="py-16 bg-slate-50 rounded-2xl">
              <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-heading font-bold mb-4">What Our Users Say</h2>
                  <p className="text-slate-600">
                    Join thousands of musicians who transformed their learning with Helium Dock
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial) => (
                    <Testimonial 
                      key={testimonial.name}
                      name={testimonial.name}
                      role={testimonial.role}
                      content={testimonial.content}
                      avatar={testimonial.avatar}
                    />
                  ))}
                </div>
              </div>
            </section>
            
            {/* YouTube Embed */}
            <section className="py-16">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-heading font-bold mb-4">Learn with Our Video Tutorials</h2>
                <p className="text-slate-600 mb-10">
                  Watch expert instructors guide you through techniques and compositions
                </p>
                
                <div className="bg-slate-200 border-2 border-dashed border-slate-300 rounded-xl w-full aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto text-slate-400 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l-5.5 4.5 5.5 3.5z"/></svg>
                    <p className="text-slate-500">YouTube Video Placeholder</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;