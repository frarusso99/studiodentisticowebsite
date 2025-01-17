import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const images = [
    'https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/52527/dentist-pain-borowac-cure-52527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09',
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
  
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
  
    let ticking = false;
    const handleScroll = () => {
      if (!isMobile && !ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrollPosition(window.scrollY);
          ticking = false;
        });
      }
    };
  
    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
  
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);
  

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true,
  });

  // Calcola le trasformazioni basate sullo scroll
  const maxScroll = 400; // Punto massimo di scroll per l'effetto
  const progress = Math.min(scrollPosition / maxScroll, 1);

  // Interpolazione lineare per le proprietà animate
  const minHeight = isMobile ? 300 : 460; // Altezza iniziale (mobile vs desktop)
  const maxHeight = isMobile ? 300 : 700; // Altezza massima dopo lo scroll (solo desktop)
  const currentHeight = isMobile ? minHeight : minHeight + (maxHeight - minHeight) * progress;

  // Calcola l'offset dello scroll solo per desktop
  const scrollOffset = isMobile ? 0 : Math.min(scrollPosition / 3, 120);

  return (
    <div className="min-h-[100vh] md:min-h-[155vh] relative w-full min-h-screen bg-gradient-to-br from-[#4A828F] via-[#5BA3AE] to-[#A4D2C5] px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto relative z-20 pt-28 md:pt-32">
        {/* Hero Text */}
        <motion.h1
          className="text-5xl md:text-6xl font-light leading-tight mb-8 md:mb-8 md:text-center text-left px-0 md:px-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-urbanist font-semibold text-white block md:inline text-5xl md:text-6xl lg:text-7xl leading-tight">
            Il tuo sorriso
          </span>{' '}
          <span className="font-urbanist font-semibold text-white block md:inline text-5xl md:text-6xl lg:text-7xl leading-tight">
            è la nostra priorità
          </span>
        </motion.h1>

        {/* Carousel Container with Overlay */}
        <motion.div
          className="relative"
          animate={{
            y: scrollOffset,
            height: currentHeight,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 50 }}
        >
          <div
            className={`relative w-full overflow-hidden rounded-2xl transition-all duration-300`}
            style={{ height: `${currentHeight}px` }}
          >
            {/* Carousel Content */}
            <div
              className="flex h-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              {...handlers}
            >
              {images.map((img, index) => (
                <div key={index} className="w-full h-full flex-shrink-0 relative">
                  <img
                    src={img}
                    alt={`Slide ${index + 1}`}
                    className={`w-full h-full object-cover transition-all duration-300`}
                  />
                  {/* Image Overlay - si attenua con lo scroll */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#233539]/80 via-transparent to-transparent transition-opacity duration-300"
                    style={{ opacity: isMobile ? 1 : 1 - progress * 0.8 }}
                  />
                </div>
              ))}
            </div>

            {/* Carousel Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    currentSlide === index ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-start flex-col absolute bottom-8 left-8 space-y-6 z-20">
              <p className="font-manrope text-white text-xl font-light max-w-lg leading-relaxed">
                Siamo un team dedicato alla cura del tuo sorriso,
                <br /> con tecnologie all'avanguardia.
              </p>
              <button className="font-manrope bg-white hover:bg-[#AFCDD5] text-primary px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg text-lg font-bold transform hover:scale-105">
                Prenota ora
              </button>
            </div>

            {/* Desktop Navigation Arrows */}
            <div className="hidden md:flex absolute bottom-8 right-8 gap-3 z-20">
              <button
                onClick={prevSlide}
                className="bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-colors duration-300 text-white"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-colors duration-300 text-white"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile CTA - Moved outside carousel */}
          <div className="block md:hidden mt-4 space-y-4 text-left px-2">
            <p className="text-white text-xl font-light leading-relaxed">
              Siamo un team dedicato alla cura del tuo sorriso,
              <br className="hidden sm:block" /> con tecnologie all'avanguardia.
            </p>
            <button className="bg-white hover:bg-[#AFCDD5] text-[#233539] px-10 py-5 rounded-full transition-all duration-300 shadow-lg text-xl font-medium transform hover:scale-105">
              Prenota ora
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
