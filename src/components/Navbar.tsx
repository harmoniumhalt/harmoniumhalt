import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <span className="text-xl font-heading font-bold text-primary-700">Helium Dock</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-slate-700 hover:text-primary-600 font-medium">Home</a>
            <a href="/instruments" className="text-slate-700 hover:text-primary-600 font-medium">Instruments</a>
            <a href="/lessons" className="text-slate-700 hover:text-primary-600 font-medium">Lessons</a>
            <a href="/practice" className="text-slate-700 hover:text-primary-600 font-medium">Practice</a>
            <a href="/blog" className="text-slate-700 hover:text-primary-600 font-medium">Blog</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className="md:hidden text-slate-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <a href="/contact" className="hidden md:inline-block bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">Contact</a>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <a href="/" className="text-slate-700 hover:text-primary-600 font-medium">Home</a>
              <a href="/instruments" className="text-slate-700 hover:text-primary-600 font-medium">Instruments</a>
              <a href="/lessons" className="text-slate-700 hover:text-primary-600 font-medium">Lessons</a>
              <a href="/practice" className="text-slate-700 hover:text-primary-600 font-medium">Practice</a>
              <a href="/blog" className="text-slate-700 hover:text-primary-600 font-medium">Blog</a>
              <a href="/contact" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition inline-block w-fit">Contact</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;