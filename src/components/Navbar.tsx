import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Facebook, Instagram } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex justify-between items-center h-24">
            {/* Left Side */}
            <div className="flex items-center w-1/2">
              <img 
                src="./logo3.png" 
                alt="Studio Dentistico" 
                className={`h-16 w-auto mr-8 transition-opacity duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              {/* Navigation Links - Desktop */}
              <div className="hidden lg:flex space-x-5">
                {['Home', 'Servizi', 'Team', 'Dove siamo', 'Blog', 'Contatti'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-800 hover:text-[#4A828F] transition-colors font-manrope text-sm"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex items-center space-x-5">
              {/* Social Icons */}
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-[#2E545D] hover:text-[#4A828F] transition-colors cursor-pointer" />
                <Instagram className="w-5 h-5 text-[#2E545D] hover:text-[#4A828F] transition-colors cursor-pointer" />
              </div>
              
              {/* CTA Buttons */}
              <button className="flex items-center space-x-2 text-[#2E545D] hover:text-[#4A828F] transition-colors font-manrope">
                <Phone className="w-4 h-4" />
                <span>Chiamaci</span>
              </button>
              <button className="bg-[#4A828F] text-white px-6 py-2 rounded-md hover:bg-[#2E545D] transition-colors font-manrope">
                Prenota Ora
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="text-[#2E545D] hover:text-[#4A828F] transition-colors"
              >
                <Menu className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-white transition-transform duration-500 ease-in-out transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-6 md:px-12 py-6">
          <div className="flex justify-between items-center">
            <img 
              src="./logo3.png" 
              alt="Studio Dentistico" 
              className="h-16 w-auto"
            />
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="text-[#2E545D] p-2"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="mt-12 flex flex-col items-center text-center">
            {['Home', 'Servizi', 'Team', 'Dove siamo', 'Blog', 'Contatti'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-800 text-2xl font-manrope transition-colors hover:text-[#4A828F] py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}

            <div className="pt-8 flex space-x-6">
              <Facebook className="w-6 h-6 text-[#2E545D] hover:text-[#4A828F] transition-colors" />
              <Instagram className="w-6 h-6 text-[#2E545D] hover:text-[#4A828F] transition-colors" />
            </div>

            <div className="pt-8 w-full max-w-xs space-y-4">
              <button className="flex items-center justify-center space-x-2 text-[#2E545D] hover:text-[#4A828F] transition-colors font-manrope text-lg w-full">
                <Phone className="w-5 h-5" />
                <span>Chiamaci</span>
              </button>
              <button className="w-full bg-[#4A828F] text-white py-3 rounded-md font-manrope text-lg hover:bg-[#2E545D] transition-colors">
                Prenota Ora
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Navbar;