import { Menu, X, ChevronRight, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-blue-100/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <img 
              src="/logo.png" 
              alt="Dr. Nicola Russo" 
              className="h-16 relative transform transition duration-300 group-hover:scale-105" 
            />
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {['Servizi', 'Tecnologia', 'Chi Siamo', 'Contatti'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="relative px-4 py-2 text-primary-dark font-medium group"
              >
                <span className="relative z-10 transition duration-300 group-hover:text-primary">
                  {item}
                </span>
                <div className="absolute inset-0 h-1 w-0 bg-primary/10 rounded-full bottom-0 -z-0 group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
            <div className="ml-4 flex items-center space-x-8">
              <a href="tel:+123456789" className="flex items-center text-primary hover:text-primary-dark transition-colors">
                <Phone size={18} className="mr-2" />
                <span className="font-medium">Chiama ora</span>
              </a>
              <button className="group bg-primary text-white px-6 py-2 rounded-3xl hover:bg-primary-dark transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center">
                Prenota Ora
                <ChevronRight className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1" size={18} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full hover:bg-primary/10 transition-colors"
            >
              {isOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className="text-primary" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute w-full bg-white/80 backdrop-blur-lg transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 shadow-xl' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-4 py-6 space-y-4">
          {['Servizi', 'Tecnologia', 'Chi Siamo', 'Contatti'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="block px-4 py-2 text-primary-dark hover:bg-primary/10 rounded-lg transition-colors"
            >
              {item}
            </a>
          ))}
          <div className="pt-4 space-y-4">
            <a 
              href="tel:+123456789" 
              className="flex items-center px-4 py-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              <Phone size={18} className="mr-2" />
              <span className="font-medium">Chiama ora</span>
            </a>
            <button className="w-full bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors flex items-center justify-center group">
              Prenota Ora
              <ChevronRight className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1" size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}