import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Servizi', href: '#servizi' },
  { name: 'Chi Siamo', href: '#chi-siamo' },
  { name: 'Location', href: '#location' },
];

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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'mx-4 sm:mx-6 lg:mx-8 my-4 rounded-2xl bg-white/80 backdrop-blur-lg shadow-lg'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative flex items-center mr-8"
          >
            <img
              className="h-12 w-auto sm:h-14 md:h-16"
              src="./public/logo.png"
              alt="Studio Logo"
            />
          </motion.a>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              {navigation.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-600 hover:text-primary text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.a
              href="tel:+39NUMEROSTUDIO"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 text-primary hover:text-primary-dark transition-colors"
            >
              <Phone size={18} />
              <span className="font-medium">Chiamaci</span>
            </motion.a>
            <motion.a
              href="#location"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-medium"
            >
              Prenota Ora
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden ml-auto rounded-lg p-2 hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: "auto",
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: { duration: 0.2, ease: "easeIn" }
            }}
            className="md:hidden bg-white/95 backdrop-blur-sm border-t"
          >
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-xl transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <motion.a
                  href="tel:+39NUMEROSTUDIO"
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-colors"
                >
                  <Phone size={18} />
                  <span>Chiamaci</span>
                </motion.a>
                <motion.a
                  href="#location"
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                >
                  Prenota
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}