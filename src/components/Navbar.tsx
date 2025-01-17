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
        className="fixed top-0 left-0 right-0 z-50 mx-2 sm:mx-4 lg:mx-8 my-2 sm:my-4 rounded-2xl bg-primary/80 backdrop-blur-lg shadow-lg transition-all duration-500"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center h-20 md:h-24">
            {/* Logo */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex items-center mr-8"
            >
              <img
                className="h-14 w-auto sm:h-16 md:h-20"
                src="./logoneg.png"
                alt="Studio Dentistico Logo"
              />
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex space-x-8">
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

            {/* Desktop Social & CTA */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Social Icons */}
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
                className="font-manrope font-bold px-6 py-2.5 bg-white text-primary rounded-2xl hover:bg-white/90 transition-colors shadow-md"
              >
                Prenota Ora
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden ml-auto rounded-lg p-2 text-white hover:bg-primary-dark/20 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { type: "spring", damping: 20 }
              }}
              exit={{ 
                opacity: 0, 
                x: -100,
                transition: { type: "spring", damping: 20 }
              }}
              className="fixed top-24 left-2 right-2 z-50 md:hidden bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
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
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                  >
                    <Phone size={18} />
                    <span>Chiamaci</span>
                  </motion.a>
                  <motion.a
                    href="#dove-siamo"
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors shadow-md"
                  >
                    Prenota
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}