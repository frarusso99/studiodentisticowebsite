import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Facebook, Instagram } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (section: string) => {
    if (section.toLowerCase() === 'blog') {
      navigate('/blog');
    } else if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex justify-between items-center h-24">
          <div className="flex items-center w-1/2">
          <button
            onClick={() => {
              if (location.pathname === '/') {
                // Se siamo già nella homepage, scrolliamo in alto
                window.scrollTo({ top: 0, behavior: 'instant' });
              } else {
                // Altrimenti, naviga alla homepage
                navigate('/');
              }
            }}
            className="focus:outline-none"
          >
            <img
              src="/studiodentisticowebsite/logo3.png"
              alt="Studio Dentistico"
              className={`h-16 w-auto mr-8 transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </button>

            <div className="hidden lg:flex space-x-5">
              {['Home', 'Servizi', 'Team', 'Dove siamo', 'Blog', 'Contatti'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavigation(item)}
                  className="text-gray-800 hover:text-[#4A828F] transition-colors font-manrope text-sm"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
            <div className="hidden lg:flex items-center space-x-5">
              <div className="flex space-x-4">
                <button
                  onClick={() => handleSocialClick('https://www.facebook.com')}
                  className="text-[#2E545D] hover:text-[#4A828F] transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleSocialClick('https://www.instagram.com')}
                  className="text-[#2E545D] hover:text-[#4A828F] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </button>
              </div>

              <a
                href="tel:+390123456789"
                className="flex items-center space-x-2 text-[#2E545D] hover:text-[#4A828F] transition-colors font-manrope"
              >
                <Phone className="w-4 h-4" />
                <span>Chiamaci</span>
              </a>

              <button
                onClick={() => handleNavigation('Dove siamo')}
                className="bg-[#4A828F] text-white px-6 py-2 rounded-full hover:bg-[#2E545D] transition-colors font-manrope"
              >
                Prenota Ora
              </button>
            </div>

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

      <div
        className={`fixed inset-0 z-50 bg-white transition-transform duration-500 ease-in-out transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-6 md:px-12 py-6">
          <div className="flex justify-between items-center">
            <img
              src="/studiodentisticowebsite/logo3.png"
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
              <button
                key={item}
                onClick={() => handleNavigation(item)}
                className="text-gray-800 text-2xl font-manrope transition-colors hover:text-[#4A828F] py-3"
              >
                {item}
              </button>
            ))}

            <div className="pt-8 flex space-x-6">
              <button
                onClick={() => handleSocialClick('https://www.facebook.com')}
                className="text-[#2E545D] hover:text-[#4A828F] transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleSocialClick('https://www.instagram.com')}
                className="text-[#2E545D] hover:text-[#4A828F] transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </button>
            </div>

            <div className="pt-8 w-full max-w-xs space-y-4">
              <a
                href="tel:+390123456789"
                className="flex items-center justify-center space-x-2 text-[#2E545D] hover:text-[#4A828F] transition-colors font-manrope text-lg w-full"
              >
                <Phone className="w-5 h-5" />
                <span>Chiamaci</span>
              </a>
              <button
                onClick={() => handleNavigation('Dove siamo')}
                className="w-full bg-[#4A828F] text-white py-3 rounded-md font-manrope text-lg hover:bg-[#2E545D] transition-colors"
              >
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
