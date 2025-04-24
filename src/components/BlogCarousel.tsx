import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

const BlogCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const carouselRef = useRef<HTMLDivElement>(null);

  const getVisiblePosts = () => {
    if (window.innerWidth >= 768) {
      const remainingPosts = blogPosts.length - currentIndex;
      if (remainingPosts >= 3) {
        return [currentIndex, currentIndex + 1, currentIndex + 2];
      } else if (remainingPosts === 1) {
        return [currentIndex];
      } else {
        return Array.from({ length: remainingPosts }, (_, i) => currentIndex + i);
      }
    } else {
      return [currentIndex];
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      if (window.innerWidth >= 768) {
        const remainingPosts = blogPosts.length - prev;
        if (remainingPosts <= 3) return 0;
        return prev + 3;
      } else {
        return prev >= blogPosts.length - 1 ? 0 : prev + 1;
      }
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      if (window.innerWidth >= 768) {
        if (prev === 0) {
          const remainder = blogPosts.length % 3;
          return remainder === 0 ? blogPosts.length - 3 : blogPosts.length - remainder;
        }
        return Math.max(0, prev - 3);
      } else {
        return prev === 0 ? blogPosts.length - 1 : prev - 1;
      }
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = () => {
    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      deltaX > 0 ? nextSlide() : prevSlide();
    }
    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
  };

  return (
    <section id="blogCarousel" className="scroll-mt-24 py-24 bg-gradient-to-b from-white to-[#F9E4D4]/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-manrope text-4xl md:text-5xl text-[#233539] mb-6"
          >
            Approfondimenti e Novità
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-manrope text-[#2E545D] text-lg"
          >
            Esplora i nostri articoli per rimanere aggiornato sulle ultime novità
          </motion.p>
        </div>

        <div className="relative max-w-7xl mx-auto" ref={carouselRef}>
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-[#4A828F] text-[#4A828F] hover:text-white w-14 h-14 rounded-full items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <IoArrowBack className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
          </button>

          <div className="overflow-hidden px-0 md:px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {getVisiblePosts().map((index) => (
                  <Link to={`/blog/${blogPosts[index].slug}`} key={blogPosts[index].id}>
                    <motion.article whileHover={{ y: -8 }} className="group cursor-pointer h-[520px] flex flex-col">
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                        {/* Container dell'immagine */}
                        <div className="relative h-64 flex-shrink-0 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-[#233539]/60 to-transparent z-10" />
                          <img
                            src={blogPosts[index].image}
                            alt={blogPosts[index].title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                          />
                          <span className="absolute top-4 left-4 z-20 px-4 py-2 rounded-full text-sm font-medium text-white bg-[#4A828F] shadow-md backdrop-blur-sm">
                            {blogPosts[index].category}
                          </span>
                        </div>

                        {/* Container del testo */}
                        <div className="p-8 flex-grow flex flex-col">
                          <h3 className="font-manrope font-medium text-xl text-[#233539] group-hover:text-[#4A828F] transition-colors duration-300 mb-4 line-clamp-2">
                            {blogPosts[index].title}
                          </h3>
                          <p className="font-manrope text-[#2E545D]/80 line-clamp-3 mb-6">
                            {blogPosts[index].subtitle}
                          </p>
                          <div className="flex items-center text-[#4A828F] font-medium mt-auto">
                            Leggi di più
                            <svg
                              className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={nextSlide}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-[#4A828F] text-[#4A828F] hover:text-white w-14 h-14 rounded-full items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <IoArrowForward className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
          </button>

          <div className="flex justify-center mt-12 gap-2">
            {Array.from({ length: Math.ceil(blogPosts.length / (window.innerWidth >= 768 ? 3 : 1)) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx * (window.innerWidth >= 768 ? 3 : 1))}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / (window.innerWidth >= 768 ? 3 : 1)) === idx
                    ? 'bg-[#4A828F] w-8'
                    : 'bg-[#4A828F]/20 w-1.5'
                }`}
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