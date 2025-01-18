import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';

const BlogCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const carouselRef = useRef<HTMLDivElement>(null);

  const blogArticles = [
    {
      id: 1,
      category: 'Ortodonzia',
      title: 'Sorriso Perfetto con Invisalign',
      subtitle: 'Scopri come ottenere un sorriso perfetto in modo discreto e confortevole',
      image: 'https://studiomedicom.it/wp-content/uploads/2020/11/invasilign.jpg'
    },
    {
      id: 2,
      category: 'Implantologia',
      title: 'Tecnologie Innovative per i Tuoi Impianti',
      subtitle: 'Le ultime novità per un recupero più rapido e risultati naturali',
      image: 'https://www.studiodentisticominasi.it/media/k2/items/cache/ccb4e23c8aa216f1e96d31ab209c036b_M.jpg'
    },
    {
      id: 3,
      category: 'Igiene Dentale',
      title: 'La Prevenzione è il Miglior Sorriso',
      subtitle: 'Guida pratica per mantenere una corretta igiene orale quotidiana',
      image: 'https://i0.wp.com/www.centridentisticiprimo.it/wp-content/uploads/2020/05/igiene-orale-732x447-1.jpg?fit=732%2C447&ssl=1'
    },
    {
      id: 4,
      category: 'Estetica Dentale',
      title: 'Il Tuo Sorriso, Più Brillante che Mai',
      subtitle: 'Trattamenti personalizzati per una bellezza naturale',
      image: 'https://pentadentswiss.com/wp-content/uploads/2019/01/sbiancamento-dentale-1-1024x683.jpg'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev === blogArticles.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? blogArticles.length - 1 : prev - 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchEnd = () => {
    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;

    // Se il movimento orizzontale è maggiore di quello verticale e supera una soglia minima
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    // Reset degli stati touch
    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
  };

  return (
<section className="py-16 md:py-32 bg-[#F9E4D4]/30">
  <div className="container mx-auto px-4 md:px-6">
    <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
      <h2 className="font-manrope text-4xl sm:text-5xl text-[#233539] mb-6">
        Approfondimenti e Novità
      </h2>
      <p className="font-manrope text-[#2E545D] text-lg">
        Esplora i nostri articoli per rimanere aggiornato sulle ultime novità
      </p>
    </div>

        <div className="relative max-w-7xl mx-auto" ref={carouselRef}>
          <button 
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 
                     bg-white/90 hover:bg-[#4A828F] text-[#4A828F] hover:text-white 
                     w-12 h-12 rounded-full items-center justify-center 
                     transition-all duration-500 hover:scale-110 shadow-lg
                     backdrop-blur-sm"
          >
            <IoArrowBack className="w-6 h-6" />
          </button>

          <div className="overflow-hidden px-0 md:px-4">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {[
                  currentIndex,
                  (currentIndex + 1) % blogArticles.length,
                  (currentIndex + 2) % blogArticles.length,
                ].map((index) => (
                  <article 
                    key={blogArticles[index].id}
                    className={`group cursor-pointer transform transition-all duration-500
                              ${index !== currentIndex ? 'hidden md:block' : ''}`}
                  >
                    <motion.div 
                      className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.4 }}
                      style={{ height: '500px' }} // Altezza fissa per tutte le card
                    >
                      <div className="relative h-48 md:h-64 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                        <img 
                          src={blogArticles[index].image}
                          alt={blogArticles[index].title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <span className="font-manrope absolute top-4 left-4 z-20 px-4 py-1.5 rounded-full text-sm 
                                     font-medium text-white bg-[#4A828F]/90 backdrop-blur-sm">
                          {blogArticles[index].category}
                        </span>
                      </div>
                      <div className="p-6 md:p-8 flex flex-col h-[calc(500px-16rem)]"> {/* Calcolo preciso dell'altezza rimanente */}
                        <h3 className="font-urbanist text-xl md:text-2xl font-semibold text-primary-medium/90 mb-3 
                                   group-hover:text-[#4A828F] transition-colors duration-300 
                                   line-clamp-2 flex-none"> {/* flex-none impedisce la compressione */}
                          {blogArticles[index].title}
                        </h3>
                        <p className="font-manrope font-medium text-[#2E545D]/70 leading-relaxed line-clamp-3 flex-grow">
                          {blogArticles[index].subtitle}
                        </p>
                      </div>
                    </motion.div>
                  </article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 
                     bg-white/90 hover:bg-[#4A828F] text-[#4A828F] hover:text-white 
                     w-12 h-12 rounded-full items-center justify-center 
                     transition-all duration-500 hover:scale-110 shadow-lg
                     backdrop-blur-sm"
          >
            <IoArrowForward className="w-6 h-6" />
          </button>

          <div className="flex justify-center mt-8 md:mt-12 gap-2">
            {blogArticles.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300
                          ${currentIndex === idx 
                            ? 'bg-[#4A828F] w-8' 
                            : 'bg-[#4A828F]/20'}`}
                aria-label={`Vai all'articolo ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogCarousel;