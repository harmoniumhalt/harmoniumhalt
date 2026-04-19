import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Harmonium from './components/instruments/Harmonium';
import InstrumentCard from './components/InstrumentCard';
import Testimonial from './components/Testimonial';

const App = () => {
  const [currentView, setCurrentView] = useState<'home' | 'harmonium'>('home');

  const instruments = [
    { name: 'Harmonium', icon: '🪗', url: '/harmonium' },
    { name: 'Tabla', icon: '🥁', url: '/tabla' },
    { name: 'Tanpura', icon: '🎸', url: '/tanpura' },
    { name: 'Piano', icon: '🎹', url: '/piano' },
    { name: 'Guitar', icon: '🎸', url: '/guitar' },
    { name: 'Flute', icon: '🎶', url: '/flute' },
  ];

  const testimonials = [
    {
      name: 'Anika Sharma',
      role: 'Music Teacher',
      content: 'Helium Dock has transformed how I teach Indian classical music. My students can now practice anytime with authentic instruments.'
    },
    {
      name: 'Raj Patel',
      role: 'Beginner Musician',
      content: 'As someone new to harmonium, this platform helped me learn basic techniques without investing in a physical instrument.'
    },
    {
      name: 'Priya Desai',
      role: 'Professional Singer',
      content: 'The online tanpura is incredibly accurate and has become an essential part of my daily practice routine.'
    }
  ];

  if (currentView === 'harmonium') {
    return <Harmonium onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">Play Online Instruments</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10">
              Learn easily, practice daily with our authentic virtual instruments
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => setCurrentView('harmonium')}
                className="bg-white text-primary-700 hover:bg-slate-100 font-bold py-3 px-8 rounded-lg text-lg transition"
              >
                Start Playing
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg text-lg transition">
                Watch Demo
              </button>
            </div>
          </div>
        </section>

        {/* Instruments Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="section-heading">Our Virtual Instruments</h2>
            <p className="section-subheading">
              Experience authentic sounds and realistic playability with our carefully crafted virtual instruments
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {instruments.map((instrument, index) => (
                <InstrumentCard
                  key={index}
                  name={instrument.name}
                  icon={instrument.icon}
                  url={instrument.url}
                  onClick={() => {
                    if (instrument.name === 'Harmonium') {
                      setCurrentView('harmonium');
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="section-heading">Why Choose Helium Dock?</h2>
            <p className="section-subheading">
              Our platform offers unique features designed to enhance your musical journey
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Authentic Sound</h3>
                <p className="text-slate-600">
                  Our instruments are recorded from high-quality physical instruments to ensure the most authentic sound experience.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Customizable</h3>
                <p className="text-slate-600">
                  Adjust settings like reverb, volume, and sound presets to create your perfect practice environment.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Practice Anytime</h3>
                <p className="text-slate-600">
                  Access our instruments 24/7 from any device with an internet connection. No setup required.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="section-heading">What Our Users Say</h2>
            <p className="section-subheading">
              Join thousands of musicians who have enhanced their practice with Helium Dock
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {testimonials.map((testimonial, index) => (
                <Testimonial
                  key={index}
                  name={testimonial.name}
                  role={testimonial.role}
                  content={testimonial.content}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Ready to Start Your Musical Journey?</h2>
            <p className="text-xl max-w-2xl mx-auto mb-10">
              Join thousands of musicians practicing with our virtual instruments every day
            </p>
            <button 
              onClick={() => setCurrentView('harmonium')}
              className="bg-white text-primary-700 hover:bg-slate-100 font-bold py-3 px-8 rounded-lg text-lg transition"
            >
              Play Now - It's Free!
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;