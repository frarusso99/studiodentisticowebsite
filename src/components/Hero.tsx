import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  'https://images.pexels.com/photos/6809645/pexels-photo-6809645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/3845723/pexels-photo-3845723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80',
  'https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];


const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, []);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
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

  // Autoplay
  useEffect(() => {
    if (!isHovering) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [nextSlide, isHovering]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Column - Text Content */}
      <div className="w-full md:w-1/2 bg-[#F3EFEA] flex items-center justify-center order-2 md:order-1 px-6 md:px-12 lg:px-20 py-16 md:py-0">
        <div className="max-w-xl">
          <h1 className="font-manrope text-4xl md:text-5xl lg:text-6xl text-[#233539] leading-tight mb-6">
            Il tuo sorriso,{' '}
            <span className="italic font-light">
              la nostra passione
            </span>
          </h1>
          <p className="font-manrope text-[#2E545D] text-lg md:text-xl mb-8 leading-relaxed">
            Ci prendiamo cura della salute del tuo sorriso con professionalità e un approccio personalizzato per ogni paziente.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="font-manrope font-medium px-8 py-4 bg-[#4A828F] text-white hover:bg-[#2E545D] transition-colors duration-300 rounded-2xl shadow-sm hover:shadow-md"
          >
            Prenota una Visita
          </motion.button>
        </div>
      </div>

      {/* Right Column - Image Carousel */}
      <div 
        className="w-full md:w-1/2 h-[60vh] md:h-screen relative overflow-hidden order-1 md:order-2"
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

        {/* Navigation Arrows - Visible on Hover */}
        <AnimatePresence>
          {isHovering && (
            <>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-white/80 hover:bg-white transition-colors duration-300 rounded-xl backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6 text-[#4A828F]" />
              </motion.button>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-white/80 hover:bg-white transition-colors duration-300 rounded-xl backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6 text-[#4A828F]" />
              </motion.button>
            </>
          )}
        </AnimatePresence>

        {/* Image Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
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
    </div>
  );
};

export default HeroSection;