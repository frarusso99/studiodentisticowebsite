import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Smile, Timer, Sparkles, Shield, Heart, Activity, Target, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Services = () => {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const services = [
    {
      icon: Smile,
      title: "Pulizia Dentale",
      description: "Igiene professionale e personalizzata per mantenere il tuo sorriso naturalmente sano."
    },
    {
      icon: Timer,
      title: "Ortodonzia",
      description: "Trattamenti su misura per un allineamento dentale armonioso e naturale."
    },
    {
      icon: Sparkles,
      title: "Sbiancamento",
      description: "Tecniche delicate e progressive per valorizzare la luminosità del tuo sorriso."
    },
    {
      icon: Shield,
      title: "Otturazioni",
      description: "Restauri estetici con materiali biocompatibili di ultima generazione."
    },
    {
      icon: Heart,
      title: "Cure Conservative",
      description: "Interventi minimamente invasivi per preservare la naturale bellezza dei tuoi denti."
    },
    {
      icon: Activity,
      title: "Devitalizzazioni",
      description: "Procedure precise e confortevoli per eliminare il dolore preservando il dente."
    },
    {
      icon: Target,
      title: "Protesi Dentali",
      description: "Soluzioni personalizzate che si integrano perfettamente con il tuo sorriso."
    },
    {
      icon: Star,
      title: "Estetica Dentale",
      description: "Trattamenti delicati per valorizzare l'armonia naturale del tuo viso."
    }
  ];

  // Calcola il numero di gruppi in base al numero di servizi
  const getGroupCount = () => {
    return Math.ceil(services.length / 3);
  };

  // Mostra i servizi per il gruppo attuale (3 per gruppo)
  const getVisibleServices = () => {
    const start = currentGroup * 3;
    const end = start + 3;
    return services.slice(start, end);
  };

  const nextGroup = useCallback(() => {
    setCurrentGroup((prevGroup) => (prevGroup + 1) % getGroupCount());
  }, []);

  const prevGroup = useCallback(() => {
    setCurrentGroup((prevGroup) => (prevGroup === 0 ? getGroupCount() - 1 : prevGroup - 1));
  }, []);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) {
        nextGroup();
      } else {
        prevGroup();
      }
    }
  };

  useEffect(() => {
    if (!isHovering) {
      const timer = setInterval(nextGroup, 5000);
      return () => clearInterval(timer);
    }
  }, [nextGroup, isHovering]);

  return (
    <section id="servizi" className="bg-gradient-to-br from-[#E8F4F2] to-[#F5F0EB] py-8 md:py-16 lg:py-24 px-2 md:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header più compatto */}
        <div className="max-w-2xl mb-8 md:mb-12 lg:mb-20 text-center md:text-left">
          <h2 className="font-manrope text-2xl md:text-4xl lg:text-5xl text-[#233539] mb-2 md:mb-6">
            I Nostri Servizi
            <span className="block text-lg md:text-2xl lg:text-3xl font-light italic mt-1 md:mt-2 text-[#4A828F]">
              tecnologia e professionalità
            </span>
          </h2>
          <p className="font-manrope text-[#2E545D] text-sm md:text-lg">
            Offriamo cure dentistiche complete con un approccio delicato e personalizzato per ogni paziente.
          </p>
        </div>
        
        <div className="relative pb-12 md:pb-16 lg:pb-20">
          <div 
            className="relative overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="grid grid-cols-3 gap-2 md:gap-6 lg:gap-8">
              <AnimatePresence mode="wait">
                {getVisibleServices().map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={`${service.title}-${currentGroup}-${idx}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="group"
                    >
                      <div className="bg-white/80 backdrop-blur-sm p-3 md:p-6 lg:p-8 rounded-lg md:rounded-2xl lg:rounded-3xl shadow-sm 
                                    transition-all duration-300 h-full
                                    hover:shadow-lg hover:bg-white
                                    border border-[#4A828F]/10">
                        <div className="mb-2 md:mb-4 lg:mb-6 p-2 md:p-3 lg:p-4 rounded-lg md:rounded-xl lg:rounded-2xl 
                                    bg-gradient-to-br from-[#4A828F]/5 to-transparent
                                    w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 flex items-center justify-center
                                    group-hover:from-[#4A828F]/10 transition-colors duration-300">
                          <Icon 
                            className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-[#4A828F] transition-transform duration-300 group-hover:scale-110" 
                            strokeWidth={1.5}
                          />
                        </div>
                        <h3 className="font-manrope text-sm md:text-xl lg:text-2xl text-[#233539] font-medium mb-1 md:mb-3 lg:mb-4 
                                     group-hover:text-[#4A828F] transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="font-manrope text-[#2E545D]/80 text-xs md:text-sm lg:text-base leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Controlli di navigazione più compatti */}
          <div className="absolute -bottom-6 left-0 w-full flex justify-between items-center px-2 md:px-4">
            <div className="flex space-x-1 md:space-x-2">
              {Array.from({ length: getGroupCount() }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentGroup(index)}
                  className={`h-1 transition-all duration-300 rounded-full 
                    ${currentGroup === index 
                      ? 'bg-[#4A828F] w-4 md:w-6 lg:w-8' 
                      : 'bg-[#4A828F]/20 hover:bg-[#4A828F]/40 w-1 md:w-2'
                    }`}
                  aria-label={`Vai al gruppo ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevGroup}
                className="p-1.5 md:p-2 lg:p-3 bg-white hover:bg-[#4A828F] text-[#4A828F] hover:text-white
                          transition-all duration-300 rounded-full shadow-sm hover:shadow-md"
                aria-label="Gruppo precedente"
              >
                <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextGroup}
                className="p-1.5 md:p-2 lg:p-3 bg-white hover:bg-[#4A828F] text-[#4A828F] hover:text-white
                          transition-all duration-300 rounded-full shadow-sm hover:shadow-md"
                aria-label="Gruppo successivo"
              >
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;