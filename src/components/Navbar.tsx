import { useState, useEffect } from 'react';
import { Menu, X, Phone, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Servizi', href: '#servizi' },
  { name: 'Chi siamo', href: '#chi-siamo' },
  { name: 'Dove siamo', href: '#dove-siamo' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contatti', href: '#contatti' }  
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Background with blur - separate from content */}
        <div className="absolute inset-0 bg-primary/80 backdrop-blur-lg shadow-lg" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-24 md:h-24 px-4">
            {/* Logo - Moved more to the left */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex items-center -ml-2"
            >
              <img
                className="h-16 w-auto sm:h-16 md:h-20"
                src="./logoneg.png"
                alt="Studio Dentistico Logo"
              />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 ml-8">
              <div className="flex space-x-6">
                {navigation.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="font-manrope text-white hover:text-white/80 text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Desktop Social & CTA - Moved more to the right */}
            <div className="hidden md:flex items-center -mr-2">
              <div className="flex items-center space-x-4 mr-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white hover:text-white/80 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white hover:text-white/80 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </motion.a>
              </div>

              <motion.a
                href="tel:+39NUMEROSTUDIO"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-white text-primary rounded-2xl hover:bg-white/90 transition-colors"
              >
                <Phone size={18} />
                <span className="font-manrope font-bold">Chiamaci</span>
              </motion.a>
              <motion.a
                href="#dove-siamo"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="font-manrope font-semibold px-6 py-2.5 bg-white text-primary rounded-2xl hover:bg-white/90 transition-colors shadow-md ml-3"
              >
                Prenota Ora
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden -mr-2 rounded-lg p-2 text-white hover:bg-primary-dark/20 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu - Now part of the navbar */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: "auto", 
                opacity: 1,
                transition: { 
                  height: {
                    type: "spring",
                    damping: 30,
                    stiffness: 300
                  },
                  opacity: {
                    duration: 0.2
                  }
                }
              }}
              exit={{ 
                height: 0,
                opacity: 0,
                transition: {
                  height: {
                    type: "spring",
                    damping: 30,
                    stiffness: 300
                  },
                  opacity: {
                    duration: 0.2
                  }
                }
              }}
              className="relative md:hidden bg-white shadow-lg overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navigation.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(false)}
                    className="font-manrope block px-4 py-3 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    {item.name}
                  </motion.a>
                ))}
                
                {/* Mobile Social Icons */}
                <div className="flex justify-center space-x-6 py-4">
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-primary hover:text-primary-dark transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={24} />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-primary hover:text-primary-dark transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook size={24} />
                  </motion.a>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.a
                    href="tel:+39NUMEROSTUDIO"
                    whileTap={{ scale: 0.98 }}
                    className="font-manrope font-semibold flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                  >
                    <Phone size={18} />
                    <span>Chiamaci</span>
                  </motion.a>
                  <motion.a
                    href="#dove-siamo"
                    whileTap={{ scale: 0.98 }}
                    className="font-manrope font-semibold flex items-center justify-center px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-md"
                  >
                    Prenota
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}