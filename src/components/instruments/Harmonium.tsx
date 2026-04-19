import React, { useState, useEffect } from 'react';

interface HarmoniumProps {
  onBack: () => void;
}

const Harmonium: React.FC<HarmoniumProps> = ({ onBack }) => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [reverb, setReverb] = useState(50);
  const [volume, setVolume] = useState(80);

  // Simulate playing a note
  const playNote = (note: string) => {
    setPressedKeys(prev => new Set(prev).add(note));
    // In a real app, this would trigger audio playback
    setTimeout(() => {
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(note);
        return newSet;
      });
    }, 300);
  };

  // Generate keyboard keys
  const generateKeys = (start: number, count: number, isLower: boolean) => {
    return Array.from({ length: count }, (_, i) => {
      const charCode = start + i;
      const key = String.fromCharCode(charCode);
      const isPressed = pressedKeys.has(key);
      return (
        <button
          key={key}
          className={`h-16 rounded-md transition-all duration-150 flex items-center justify-center text-white font-bold text-sm md:text-base ${
            isLower 
              ? (isPressed ? 'bg-slate-400 h-12' : 'bg-slate-600 hover:bg-slate-500') 
              : (isPressed ? 'bg-slate-600 h-12' : 'bg-slate-700 hover:bg-slate-600')
          }`}
          onMouseDown={() => playNote(key)}
        >
          {key}
        </button>
      );
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold">Harmonium</h1>
        <button 
          onClick={onBack}
          className="flex items-center text-primary-600 hover:text-primary-800"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex justify-between mb-4">
                <div className="text-white font-bold">Harmonium</div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-2 mb-4">
                {generateKeys(65, 14, false)}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {generateKeys(97, 14, true)}
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4">
              <button className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-6 rounded-lg flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Play Demo
              </button>
              <button className="bg-slate-200 hover:bg-slate-300 text-slate-800 py-2 px-6 rounded-lg flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                Record
              </button>
              <button className="bg-slate-200 hover:bg-slate-300 text-slate-800 py-2 px-6 rounded-lg flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 19.5c-4.14 0-7.5-3.36-7.5-7.5 0-1.19.29-2.31.8-3.3L12 12.5l6.7-3.8c.51.99.8 2.11.8 3.3 0 4.14-3.36 7.5-7.5 7.5z"/></svg>
                Save
              </button>
            </div>
          </div>
          
          <div className="md:w-1/3">
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4">Controls</h3>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="font-medium">Volume</label>
                  <span className="text-slate-600">{volume}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="font-medium">Reverb</label>
                  <span className="text-slate-600">{reverb}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={reverb}
                  onChange={(e) => setReverb(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-3">Preset Sounds</h4>
                <div className="grid grid-cols-2 gap-3">
                  {['Classical', 'Devotional', 'Folk', 'Modern'].map((preset) => (
                    <button 
                      key={preset}
                      className="py-2 px-3 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Quick Tips</h4>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Use both rows for full harmonium experience
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Adjust reverb for different acoustic environments
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Try recording your practice sessions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-heading font-bold mb-6">Harmonium Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((lesson) => (
            <div key={lesson} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                  <span className="text-primary-600 font-bold">{lesson}</span>
                </div>
                <h3 className="font-bold">Lesson {lesson}</h3>
              </div>
              <p className="text-slate-600 mb-4">Introduction to basic harmonium techniques and finger positioning</p>
              <button className="text-primary-600 font-medium hover:text-primary-800 flex items-center">
                Start Lesson
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Harmonium;