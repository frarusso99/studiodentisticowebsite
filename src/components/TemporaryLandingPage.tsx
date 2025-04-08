import { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Phone, MessageCircle, MapPin, Clock, Facebook, Instagram, Mail, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/studiodentisticowebsite/poltrona1.jpg',
  '/studiodentisticowebsite/entrata1.jpg',
  '/studiodentisticowebsite/porta1.jpg',
];

const businessHours = [
  { day: 'Lunedì - Venerdì', hours: '09:00 - 19:00' },
  { day: 'Sabato', hours: '09:00 - 13:00' },
  { day: 'Domenica', hours: 'Chiuso' }
];

const TemporaryLandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, []);

  // Touch handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // Scroll detection for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Autoplay
  useEffect(() => {
    if (!isHovering) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [nextSlide, isHovering]);

  const handleSocialClick = (url) => {
    window.open(url, '_blank');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-[#F3EFEA]">
      {/* Top Static Bar with Social Links - Redesigned */}
      <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white shadow-sm'
      }`}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center">
            <img
              src="/studiodentisticowebsite/logo3.png"
              alt="Studio Dentistico"
              className="h-12 w-auto mr-4"
            />
        </div>
          
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="tel:+390240123456" 
              className="flex items-center gap-1 text-sm text-[#2E545D] hover:text-[#4A828F] transition-colors duration-300"
            >
              <Phone className="w-4 h-4" /> 
              <span>+39 02 4047785</span>
            </a>
            
            <a 
              href="mailto:studio@dentistagalimberti.it"
              className="flex items-center gap-1 text-sm text-[#2E545D] hover:text-[#4A828F] transition-colors duration-300"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden lg:inline">studio@dentistagalimberti.it</span>
            </a>
            
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-[#2E545D] hover:text-[#4A828F] transition-colors duration-300"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-[#2E545D] hover:text-[#4A828F] transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            
            <a
              href="https://wa.me/390240123456"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 bg-[#4A828F] text-white px-4 py-2 rounded-full hover:bg-[#2E545D] transition-colors font-manrope text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Prenota Ora
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <a 
              href="tel:+390240123456" 
              className="text-[#2E545D] hover:text-[#4A828F] transition-colors duration-300"
              aria-label="Chiama"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-[#2E545D] hover:text-[#4A828F] transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-white transition-transform duration-500 ease-in-out transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-6 py-6">
          <div className="flex justify-between items-center">
            <img
              src="/studiodentisticowebsite/logo3.png"
              alt="Studio Dentistico"
              className="h-12 w-auto"
            />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-[#2E545D] p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-12 flex flex-col items-center text-center">
            <div className="w-full max-w-xs space-y-6">
              <div className="flex flex-col items-center space-y-4 py-4">
                <a
                  href="tel:+390240123456"
                  className="flex items-center justify-center space-x-2 text-[#2E545D] hover:text-[#4A828F] transition-colors font-manrope text-lg"
                >
                  <Phone className="w-5 h-5" />
                  <span>+39 02 4047785</span>
                </a>
                
                <a 
                  href="mailto:studio@dentistagalimberti.it"
                  className="flex items-center justify-center space-x-2 text-[#2E545D] hover:text-[#4A828F] transition-colors font-manrope text-lg"
                >
                  <Mail className="w-5 h-5" />
                  <span>studio@dentistagalimberti.it</span>
                </a>
                
                <a
                  href="https://www.google.com/maps?q=Via+G.+Washington,+70,+20146+Milano+MI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 text-[#2E545D] hover:text-[#4A828F] transition-colors font-manrope text-lg"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Via G. Washington, 70, Milano</span>
                </a>
              </div>

              <div className="flex justify-center space-x-6 pt-4">
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

              <a
                href="https://wa.me/390240123456"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#4A828F] text-white py-3 rounded-md font-manrope text-lg hover:bg-[#2E545D] transition-colors text-center mt-8"
              >
                Prenota Ora
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero Section with Image Carousel */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden mt-16 md:mt-20"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Studio dentistico"
            draggable="false"
          />
        </AnimatePresence>

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 flex flex-col items-center justify-center text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-manrope text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4"
          >
            Nuova Apertura
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-manrope font-light text-lg md:text-xl text-white mb-8 max-w-xl"
          >
            Il tuo sorriso, <span className="italic">la nostra passione</span>
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-manrope text-white/90 text-base md:text-lg mb-8 max-w-xl"
          >
            Prenota subito la tua prima visita nel nostro nuovo studio dentistico
          </motion.p>
          
          {/* Call-to-Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mt-2"
          >
            <motion.a
              href="tel:+390240123456"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="font-manrope flex items-center justify-center gap-2 px-8 py-4 bg-[#4A828F] text-white hover:bg-[#2E545D] transition-colors duration-300 rounded-full shadow-lg"
            >
              <Phone className="w-5 h-5" /> Chiamaci
            </motion.a>
            <motion.a
              href="https://wa.me/390240123456"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="font-manrope flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#4A828F] hover:bg-gray-100 transition-colors duration-300 rounded-full shadow-lg"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </motion.a>
          </motion.div>
        </div>

        {/* Navigation Arrows - Smaller size */}
        <AnimatePresence>
          {isHovering && (
            <>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white transition-colors duration-300 rounded-lg backdrop-blur-sm z-10"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-[#4A828F]" />
              </motion.button>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white transition-colors duration-300 rounded-lg backdrop-blur-sm z-10"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#4A828F]" />
              </motion.button>
            </>
          )}
        </AnimatePresence>

        {/* Image Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                currentIndex === index 
                  ? 'bg-white w-8' 
                  : 'bg-white/60 hover:bg-white/80 w-1.5'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Location and Hours Information */}
      <div className="px-6 py-12 md:py-16 bg-[#F3EFEA]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-5 py-2 rounded-full bg-[#4A828F]/10 text-[#4A828F] text-sm font-medium mb-3"
            >
              Studio Dentistico
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-manrope text-3xl md:text-4xl text-[#233539] mb-3"
            >
              Dove Trovarci
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-manrope text-[#2E545D] text-lg max-w-2xl mx-auto"
            >
              Siamo facilmente raggiungibili nel cuore di Milano, vieni a trovarci
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Map */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-lg h-64 md:h-auto"
            >
              <a 
                href="https://www.google.com/maps?q=Via+G.+Washington,+70,+20146+Milano+MI" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5593.436387931559!2d9.2207452!3d45.495619299999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c71e5bd0a023%3A0xdf3a968cf22b736e!2sStudio%20dentistico%20Dentalp%20Milano!5e0!3m2!1sit!2sit!4v1737328891415!5m2!1sit!2sit"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  title="Studio location"
                ></iframe>
              </a>
            </motion.div>
            
            {/* Contact and Hours Info */}
            <div className="grid grid-cols-1 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white p-6 rounded-2xl shadow-md"
              >
                <h3 className="font-manrope font-medium text-xl text-[#233539] mb-4 flex items-center gap-2">
                  <MapPin className="text-[#4A828F]" /> Indirizzo
                </h3>
                <p className="font-manrope text-[#2E545D] mb-2">Via G. Washington, 70, 20146 Milano MI</p>
                <p className="font-manrope text-[#2E545D] mb-2">
                  <a 
                    href="tel:+390240123456" 
                    className="hover:text-[#4A828F] transition-colors duration-300"
                  >
                    +39 02 4047785
                  </a>
                </p>
                <p className="font-manrope text-[#2E545D]">
                  <a 
                    href="mailto:studio@dentistagalimberti.it" 
                    className="hover:text-[#4A828F] transition-colors duration-300"
                  >
                    studio@dentistagalimberti.it
                  </a>
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white p-6 rounded-2xl shadow-md"
              >
                <h3 className="font-manrope font-medium text-xl text-[#233539] mb-4 flex items-center gap-2">
                  <Clock className="text-[#4A828F]" /> Orari di Apertura
                </h3>
                {businessHours.map(({ day, hours }) => (
                  <p key={day} className="font-manrope text-[#2E545D] mb-2">
                    <span className="font-medium">{day}:</span> {hours}
                  </p>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemporaryLandingPage;