import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';

const BlogCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null); // Tipo specificato

  const blogArticles = [
    {
      id: 1,
      category: 'Ortodonzia',
      title: 'Sorriso Perfetto con Invisalign',
      subtitle: 'Scopri come ottenere un sorriso perfetto in modo discreto e confortevole',
      image: '/api/placeholder/800/600'
    },
    {
      id: 2,
      category: 'Implantologia',
      title: 'Tecnologie Innovative per i Tuoi Impianti',
      subtitle: 'Le ultime novità per un recupero più rapido e risultati naturali',
      image: '/api/placeholder/800/600'
    },
    {
      id: 3,
      category: 'Igiene Dentale',
      title: 'La Prevenzione è il Miglior Sorriso',
      subtitle: 'Guida pratica per mantenere una corretta igiene orale quotidiana',
      image: '/api/placeholder/800/600'
    },
    {
      id: 4,
      category: 'Estetica Dentale',
      title: 'Il Tuo Sorriso, Più Brillante che Mai',
      subtitle: 'Trattamenti personalizzati per una bellezza naturale',
      image: '/api/placeholder/800/600'
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

  const handleDragStart = (e: TouchEvent | MouseEvent) => {
    setIsDragging(true);
    const pageX = e instanceof TouchEvent ? e.touches[0].pageX : e.pageX;
    setStartX(pageX);
    if (carouselRef.current) {
      setScrollLeft(carouselRef.current.scrollLeft);
    }
  };
  
  const handleDragMove = (e: TouchEvent | MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const pageX = e instanceof TouchEvent ? e.touches[0].pageX : e.pageX;
    const walk = (pageX - startX) * 2;
  
    if (Math.abs(walk) > 50) {
      if (walk > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
      setIsDragging(false);
    }
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.addEventListener('touchstart', handleDragStart);
    carousel.addEventListener('touchmove', handleDragMove);
    carousel.addEventListener('touchend', handleDragEnd);
    carousel.addEventListener('mousedown', handleDragStart);
    carousel.addEventListener('mousemove', handleDragMove);
    carousel.addEventListener('mouseup', handleDragEnd);
    carousel.addEventListener('mouseleave', handleDragEnd);

    return () => {
      carousel.removeEventListener('touchstart', handleDragStart);
      carousel.removeEventListener('touchmove', handleDragMove);
      carousel.removeEventListener('touchend', handleDragEnd);
      carousel.removeEventListener('mousedown', handleDragStart);
      carousel.removeEventListener('mousemove', handleDragMove);
      carousel.removeEventListener('mouseup', handleDragEnd);
      carousel.removeEventListener('mouseleave', handleDragEnd);
    };
  }, [isDragging, startX]);

  return (
    <section className="py-16 md:py-32 bg-gradient-to-b from-[#AFCDD5]/10 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-[#233539] mb-4 md:mb-6">
            Approfondimenti e Novità
          </h2>
          <p className="text-lg md:text-xl text-[#2E545D]/80 leading-relaxed">
            Esplora i nostri articoli per rimanere aggiornato sulle ultime novità 
            nel campo della salute dentale
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto" ref={carouselRef}>
          {/* Navigation Buttons - Hidden on mobile */}
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
                      className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] h-full"
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="relative h-48 md:h-64 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                        <img 
                          src={blogArticles[index].image}
                          alt={blogArticles[index].title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <span className="absolute top-4 left-4 z-20 px-4 py-1.5 rounded-full text-sm 
                                     font-medium text-white bg-[#4A828F]/90 backdrop-blur-sm">
                          {blogArticles[index].category}
                        </span>
                      </div>
                      <div className="p-6 md:p-8">
                        <h3 className="text-xl md:text-2xl font-medium text-[#233539] mb-3 
                                   group-hover:text-[#4A828F] transition-colors duration-300">
                          {blogArticles[index].title}
                        </h3>
                        <p className="text-[#2E545D]/70 leading-relaxed">
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

          {/* Dots Navigation */}
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