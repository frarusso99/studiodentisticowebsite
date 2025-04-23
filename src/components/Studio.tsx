import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoArrowBack, IoArrowForward, IoClose, IoExpand } from 'react-icons/io5';
import { useSwipeable } from 'react-swipeable';

const studioSlides = [
  {
    id: 1,
    title: 'Sala Attesa',
    description: 'Uno spazio semplice e ordinato dove accomodarsi prima della visita.',
    image: '/salaattesa1.jpg',
    highlight: 'Sedie comode e ambiente tranquillo'
  },
  {
    id: 2,
    title: 'Reception',
    description: 'Il primo punto di contatto, con personale disponibile per ogni esigenza.',
    image: '/reception1.jpg',
    highlight: 'Accoglienza cortese e informazioni chiare'
  },
  {
    id: 3,
    title: 'Sala Operatoria',
    description: 'Locale attrezzato per trattamenti odontoiatrici in un ambiente pulito e funzionale.',
    image: '/poltrona1.jpg',
    highlight: 'Poltrona confortevole e strumenti aggiornati'
  },
  {
    id: 4,
    title: 'Ingresso',
    description: 'Corridoio ordinato che collega reception, ambulatori e area attesa.',
    image: '/entrata1.jpg',
    highlight: 'Spazi ristrutturati e accesso semplice'
  },
  {
    id: 5,
    title: 'Esterno dello Studio',
    description: 'Facciata visibile dalla strada con ingresso ben segnalato.',
    image: '/facciata1.jpg',
    highlight: 'Studio facilmente riconoscibile e raggiungibile'
  }
];

const Studio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleSwipe = (direction: 'LEFT' | 'RIGHT') => {
    if (direction === 'LEFT') {
      setCurrentIndex((prev) => (prev + 1) % studioSlides.length);
    } else if (direction === 'RIGHT') {
      setCurrentIndex((prev) => (prev === 0 ? studioSlides.length - 1 : prev - 1));
    }
  };

  const handleLightboxSwipe = (direction: 'LEFT' | 'RIGHT') => {
    if (direction === 'LEFT') {
      setLightboxIndex((prev) => (prev + 1) % studioSlides.length);
    } else if (direction === 'RIGHT') {
      setLightboxIndex((prev) => (prev === 0 ? studioSlides.length - 1 : prev - 1));
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    // Enable scrolling again
    document.body.style.overflow = 'auto';
  };

  const carouselHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('LEFT'),
    onSwipedRight: () => handleSwipe('RIGHT'),
  });

  const lightboxHandlers = useSwipeable({
    onSwipedLeft: () => handleLightboxSwipe('LEFT'),
    onSwipedRight: () => handleLightboxSwipe('RIGHT'),
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

        <div {...carouselHandlers} className="relative max-w-4xl mx-auto">
          <div className="relative h-[60vh] rounded-xl overflow-hidden shadow-lg bg-[#233539] cursor-pointer group">
            <button 
              onClick={() => openLightbox(currentIndex)}
              className="absolute inset-0 w-full h-full z-10"
              aria-label="Apri immagine a schermo intero"
            >
              <span className="sr-only">Visualizza immagine a schermo intero</span>
            </button>
            
            <div className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-[#4A828F] text-[#4A828F] hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
              <IoExpand className="w-5 h-5" />
            </div>
            
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
            onClick={(e) => {
              e.stopPropagation();
              handleSwipe('RIGHT');
            }}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-[#4A828F] text-[#4A828F] hover:text-white w-10 h-10 rounded-full items-center justify-center transition-all duration-300 z-20"
          >
            <IoArrowBack className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSwipe('LEFT');
            }}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-[#4A828F] text-[#4A828F] hover:text-white w-10 h-10 rounded-full items-center justify-center transition-all duration-300 z-20"
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          >
            <div 
              {...lightboxHandlers}
              className="relative w-full h-full flex flex-col justify-center items-center"
            >
              <div className="absolute top-4 right-4 z-50">
                <button
                  onClick={closeLightbox}
                  className="bg-white/20 hover:bg-white/40 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <IoClose className="w-6 h-6" />
                </button>
              </div>
              
              <div className="relative w-full h-full max-h-screen flex items-center justify-center p-4 sm:p-8">
                <motion.div
                  key={`lightbox-${lightboxIndex}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full max-w-5xl max-h-[80vh] flex flex-col"
                >
                  <div className="flex-1 relative overflow-hidden rounded-lg">
                    <img
                      src={studioSlides[lightboxIndex].image}
                      alt={studioSlides[lightboxIndex].title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <div className="text-white text-center mt-4 px-4">
                    <h3 className="text-xl sm:text-2xl font-light">
                      {studioSlides[lightboxIndex].title}
                    </h3>
                    <p className="text-sm sm:text-base mt-1 sm:mt-2 text-white/80">
                      {studioSlides[lightboxIndex].description}
                    </p>
                  </div>
                </motion.div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLightboxSwipe('RIGHT');
                  }}
                  className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <IoArrowBack className="w-5 h-5" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLightboxSwipe('LEFT');
                  }}
                  className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <IoArrowForward className="w-5 h-5" />
                </button>
              </div>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {studioSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300
                      ${lightboxIndex === idx 
                        ? 'w-10 bg-white' 
                        : 'w-2 bg-white/30'}`}>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Studio;