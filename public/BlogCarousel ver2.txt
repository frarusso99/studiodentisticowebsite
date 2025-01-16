import { useState } from 'react';
import { motion } from 'framer-motion';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';

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

const BlogCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev === blogArticles.length - 2 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? blogArticles.length - 2 : prev - 1
    );
  };

  return (
    <section className="py-32 bg-gradient-to-b from-[#AFCDD5]/10 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-light text-[#233539] mb-6">
            Approfondimenti e Novità
          </h2>
          <p className="text-xl text-[#2E545D]/80 leading-relaxed">
            Esplora i nostri articoli per rimanere aggiornato sulle ultime novità 
            nel campo della salute dentale
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 
                     bg-white/90 hover:bg-[#4A828F] text-[#4A828F] hover:text-white 
                     w-12 h-12 rounded-full flex items-center justify-center 
                     transition-all duration-500 hover:scale-110 shadow-lg
                     backdrop-blur-sm"
          >
            <IoArrowBack className="w-6 h-6" />
          </button>

          <div className="overflow-hidden px-4">
            <motion.div 
              className="flex gap-8"
              animate={{ x: `${-currentIndex * 33.33}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {blogArticles.map((article) => (
                <motion.article 
                  key={article.id} 
                  className="flex-none w-[calc(33.33%-1.33rem)] group cursor-pointer"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)]
                               transform transition-all duration-500 h-full">
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <span className="absolute top-4 left-4 z-20 px-4 py-1.5 rounded-full text-sm 
                                   font-medium text-white bg-[#4A828F]/90 backdrop-blur-sm">
                        {article.category}
                      </span>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-medium text-[#233539] mb-3 
                                 group-hover:text-[#4A828F] transition-colors duration-300">
                        {article.title}
                      </h3>
                      <p className="text-[#2E545D]/70 leading-relaxed">
                        {article.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>

          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 
                     bg-white/90 hover:bg-[#4A828F] text-[#4A828F] hover:text-white 
                     w-12 h-12 rounded-full flex items-center justify-center 
                     transition-all duration-500 hover:scale-110 shadow-lg
                     backdrop-blur-sm"
          >
            <IoArrowForward className="w-6 h-6" />
          </button>

          <div className="flex justify-center mt-12 gap-2">
            {blogArticles.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300
                          ${currentIndex === idx 
                            ? 'bg-[#4A828F] w-8' 
                            : 'bg-[#4A828F]/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogCarousel;