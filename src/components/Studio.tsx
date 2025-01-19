import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { useSwipeable } from 'react-swipeable';

const studioSlides = [
  {
    id: 1,
    title: 'Reception & Accoglienza',
    description: 'Il tuo percorso inizia in un ambiente accogliente e rilassante',
    image: 'https://images.pexels.com/photos/6809645/pexels-photo-6809645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    highlight: 'Wi-Fi gratuito e area refresh'
  },
  {
    id: 2,
    title: 'Sala Operatoria Principale',
    description: "Tecnologie all'avanguardia per diagnosi e trattamenti precisi",
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80',
    highlight: 'Microscopio 3D di ultima generazione'
  },
  {
    id: 3,
    title: 'Area Diagnostica',
    description: 'Imaging digitale per diagnosi immediate e accurate',
    image: 'https://images.pexels.com/photos/6502019/pexels-photo-6502019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    highlight: 'TAC 3D e radiografia digitale'
  },
  {
    id: 4,
    title: 'Zona Relax',
    description: 'Un ambiente confortevole per il tuo benessere',
    image: 'https://images.pexels.com/photos/8459996/pexels-photo-8459996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    highlight: 'Poltrone massaggianti e TV'
  }
];

const Studio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: 'LEFT' | 'RIGHT') => {
    if (direction === 'LEFT') {
      setCurrentIndex((prev) => (prev + 1) % studioSlides.length);
    } else if (direction === 'RIGHT') {
      setCurrentIndex((prev) => (prev === 0 ? studioSlides.length - 1 : prev - 1));
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('LEFT'),
    onSwipedRight: () => handleSwipe('RIGHT'),
  });

  return (
    <section id="studio" className="min-h-screen bg-[#F7DAD9]/30 relative overflow-hidden py-6 md:py-12 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-8 lg:mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-manrope text-4xl md:text-5xl text-[#233539] mb-6"
          >
            Il Nostro Studio
            <span className="block text-2xl md:text-3xl font-light italic mt-2 text-[#4A828F]">
              accogliente e vicino a te
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-manrope text-[#2E545D]/80 text-lg leading-relaxed"
          >
            Un ambiente semplice e curato, progettato per offrirti tranquillità e benessere. 
            Qui troverai attenzione, professionalità e un'atmosfera familiare.
          </motion.p>
        </div>


        <div {...handlers} className="relative max-w-4xl mx-auto">
          <div className="relative h-[60vh] rounded-xl overflow-hidden shadow-lg bg-[#233539]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-full"
              >
                <img
                  src={studioSlides[currentIndex].image}
                  alt={studioSlides[currentIndex].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
                <div className="font-manrope absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="font-manrope text-xl sm:text-2xl font-light"
                  >
                    {studioSlides[currentIndex].title}
                  </motion.h3>
                  <p className="text-sm sm:text-base mt-1 sm:mt-2">
                    {studioSlides[currentIndex].description}
                  </p>
                  <span className="mt-2 sm:mt-4 inline-block px-3 py-1 bg-[#4A828F]/90 rounded-full text-xs sm:text-sm">
                    {studioSlides[currentIndex].highlight}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => handleSwipe('RIGHT')}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-[#4A828F] text-[#4A828F] hover:text-white w-10 h-10 rounded-full items-center justify-center transition-all duration-300"
          >
            <IoArrowBack className="w-5 h-5" />
          </button>

          <button
            onClick={() => handleSwipe('LEFT')}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-[#4A828F] text-[#4A828F] hover:text-white w-10 h-10 rounded-full items-center justify-center transition-all duration-300"
          >
            <IoArrowForward className="w-5 h-5" />
          </button>

          <div className="flex sm:hidden justify-between mt-3">
            <button
              onClick={() => handleSwipe('RIGHT')}
              className="bg-white/80 hover:bg-[#4A828F] text-[#4A828F] hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            >
              <IoArrowBack className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleSwipe('LEFT')}
              className="bg-white/80 hover:bg-[#4A828F] text-[#4A828F] hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            >
              <IoArrowForward className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
            {studioSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300
                  ${currentIndex === idx 
                    ? 'w-8 bg-[#4A828F]' 
                    : 'w-1.5 bg-[#4A828F]/30'}`}>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Studio;