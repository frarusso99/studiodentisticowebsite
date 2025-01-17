import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebook, FaInstagram, FaPhoneAlt, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all ${
        isScrolled ? 'bg-white shadow-md backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="flex justify-between items-center px-4 md:px-8 lg:px-16 py-4">
        {/* Logo and Links */}
        <div className="flex items-center space-x-10 w-1/2"> {/* Aumentato space-x per distanziare */}
          <img src="./logo3.png" alt="Logo" className="h-14" />
          <ul className="hidden md:flex space-x-6 text-gray-800 text-sm font-medium">
            <li><a href="#home" className="hover:text-gray-600 transition">Home</a></li>
            <li><a href="#services" className="hover:text-gray-600 transition">Servizi</a></li>
            <li><a href="#team" className="hover:text-gray-600 transition">Team</a></li>
            <li><a href="#location" className="hover:text-gray-600 transition">Dove siamo</a></li>
            <li><a href="#blog" className="hover:text-gray-600 transition">Blog</a></li>
            <li><a href="#contact" className="hover:text-gray-600 transition">Contatti</a></li>
          </ul>
        </div>

        {/* Icons and Buttons */}
        <div className="hidden md:flex items-center space-x-4 md:space-x-6">
          <a href="#facebook" className="text-gray-800 hover:text-gray-600 transition">
            <FaFacebook className="text-xl" />
          </a>
          <a href="#instagram" className="text-gray-800 hover:text-gray-600 transition">
            <FaInstagram className="text-xl" />
          </a>
          <a
            href="tel:+123456789"
            className="flex items-center px-4 py-2 border border-gray-800 rounded-full text-gray-800 hover:bg-gray-100 transition"
          >
            <FaPhoneAlt className="mr-2" /> Chiamaci
          </a>
          <a
            href="#book"
            className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition"
          >
            Prenota Ora
          </a>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800 focus:outline-none"
          >
            <FaBars className="text-2xl" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }} // Partirà dalla destra
            animate={{ opacity: 1, x: 0 }} // Entrerà in posizione
            exit={{ opacity: 0, x: '100%' }} // Uscirà dalla destra
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed top-0 right-0 w-3/4 bg-gradient-to-r from-gray-100 via-white to-gray-100 shadow-md h-full"
          >
            {/* Logo e menu mobile */}
            <div className="flex justify-between items-center px-6 py-4">
              <img src="./logo3.png" alt="Logo" className="h-14" />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-800 focus:outline-none"
              >
                <FaBars className="text-2xl" />
              </button>
            </div>
            <ul className="flex flex-col space-y-4 py-4 text-center text-gray-800 font-medium">
              <li><a href="#home" className="hover:text-gray-600 transition">Home</a></li>
              <li><a href="#services" className="hover:text-gray-600 transition">Servizi</a></li>
              <li><a href="#team" className="hover:text-gray-600 transition">Team</a></li>
              <li><a href="#location" className="hover:text-gray-600 transition">Dove siamo</a></li>
              <li><a href="#blog" className="hover:text-gray-600 transition">Blog</a></li>
              <li><a href="#contact" className="hover:text-gray-600 transition">Contatti</a></li>
              <li>
                <div className="flex justify-center space-x-4 mt-4">
                  <a href="#facebook" className="text-gray-800 hover:text-gray-600 transition">
                    <FaFacebook className="text-lg" />
                  </a>
                  <a href="#instagram" className="text-gray-800 hover:text-gray-600 transition">
                    <FaInstagram className="text-lg" />
                  </a>
                </div>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
