import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';

const studioSlides = [
  {
    id: 1,
    title: 'Reception & Accoglienza',
    description: 'Il tuo percorso inizia in un ambiente accogliente e rilassante',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80',
    highlight: 'Wi-Fi gratuito e area refresh'
  },
  {
    id: 2,
    title: 'Sala Operatoria Principale',
    description: 'Tecnologie all\'avanguardia per diagnosi e trattamenti precisi',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80',
    highlight: 'Microscopio 3D di ultima generazione'
  },
  {
    id: 3,
    title: 'Area Diagnostica',
    description: 'Imaging digitale per diagnosi immediate e accurate',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80',
    highlight: 'TAC 3D e radiografia digitale'
  },
  {
    id: 4,
    title: 'Zona Relax',
    description: 'Un ambiente confortevole per il tuo benessere',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80',
    highlight: 'Poltrone massaggianti e TV'
  }
];

const Studio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % studioSlides.length);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => 
      prev === 0 ? studioSlides.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#AFCDD5]/10 to-white 
                      relative overflow-hidden py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl font-light text-[#233539] mb-6"
          >
            Scopri il Nostro Studio
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#2E545D]/80 leading-relaxed"
          >
            Un ambiente all'avanguardia dove tecnologia e comfort 
            si uniscono per garantirti la migliore esperienza possibile
          </motion.p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl 
                       bg-[#233539]">
            <AnimatePresence mode="wait" onExitComplete={() => setIsAnimating(false)}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 
                             via-transparent to-black/60" />
                <img
                  src={studioSlides[currentIndex].image}
                  alt={studioSlides[currentIndex].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-12">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-white"
                  >
                    <h3 className="text-3xl font-light mb-4">
                      {studioSlides[currentIndex].title}
                    </h3>
                    <p className="text-white/90 text-lg mb-4">
                      {studioSlides[currentIndex].description}
                    </p>
                    <span className="inline-block px-4 py-2 bg-[#4A828F]/90 
                                 rounded-full text-sm backdrop-blur-sm">
                      {studioSlides[currentIndex].highlight}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 
                     hover:bg-[#4A828F] text-[#4A828F] hover:text-white w-12 h-12 
                     rounded-full flex items-center justify-center transition-all 
                     duration-300 hover:scale-110"
          >
            <IoArrowBack className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 
                     hover:bg-[#4A828F] text-[#4A828F] hover:text-white w-12 h-12 
                     rounded-full flex items-center justify-center transition-all 
                     duration-300 hover:scale-110"
          >
            <IoArrowForward className="w-6 h-6" />
          </button>

          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {studioSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300
                          ${currentIndex === idx 
                            ? 'w-8 bg-[#4A828F]' 
                            : 'w-1.5 bg-[#4A828F]/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Studio;