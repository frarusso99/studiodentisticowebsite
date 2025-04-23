import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Smile, Timer, Sparkles, Shield, Heart, Activity, Target, Star, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Services = () => {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const services = [
    {
      icon: Smile,
      title: "Igiene Orale Professionale",
      description: "Rimozione del tartaro e prevenzione delle patologie gengivali. Un trattamento regolare per mantenere denti e gengive in perfetta salute."
    },
    {
      icon: Timer,
      title: "Ortodonzia Invisibile",
      description: "Soluzioni moderne e trasparenti per allineare i denti in modo discreto. Ideale per adulti e adolescenti che desiderano un sorriso armonioso."
    },
    {
      icon: Sparkles,
      title: "Sbiancamento Dentale",
      description: "Tecniche sicure e progressive per illuminare il tuo sorriso. Trattamenti effettuati in studio o con kit personalizzati per casa."
    },
    {
      icon: Shield,
      title: "Cure Conservative",
      description: "Otturazioni estetiche in composito, minimamente invasive, per ripristinare la funzionalità e l’estetica del dente danneggiato."
    },
    {
      icon: Heart,
      title: "Endodonzia (Devitalizzazione)",
      description: "Trattamenti endodontici precisi per salvare il dente compromesso, eliminando dolore e infezioni."
    },
    {
      icon: Activity,
      title: "Protesi Fisse e Mobili",
      description: "Riabilitazioni su misura per restituire funzionalità ed estetica al sorriso. Protesi moderne, comode e altamente personalizzate."
    },
    {
      icon: Target,
      title: "Implantologia Dentale",
      description: "Sostituzione dei denti mancanti con impianti dentali in titanio di ultima generazione, per un risultato stabile e naturale."
    },
    {
      icon: Star,
      title: "Estetica Dentale e Faccette",
      description: "Interventi su forma e colore dei denti per valorizzare il sorriso in modo naturale, con tecniche non invasive."
    },
    {
      icon: Shield,
      title: "Trattamenti per Parodontite",
      description: "Terapie mirate per la cura delle gengive e il mantenimento della salute del parodonto."
    }
  ];

  const getGroupCount = () => {
    return Math.ceil(services.length / 3);
  };

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

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
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
    <section id="servizi" className="min-h-screen bg-gradient-to-br from-[#E8F4F2] to-[#F5F0EB] py-12 md:py-24 px-4 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-12 md:mb-20 text-center md:text-left">
          <h2 className="font-manrope text-3xl md:text-4xl lg:text-5xl text-[#233539] mb-4 md:mb-6">
            I nostri servizi
            <span className="block text-xl md:text-2xl lg:text-3xl font-light italic mt-2 text-[#4A828F]">
              Tecnologie moderne e attenzione al paziente
            </span>
          </h2>
          <p className="font-manrope text-[#2E545D] text-base md:text-lg">
            Presso il nostro studio dentistico a Varapodio offriamo cure dentistiche complete con un approccio delicato e personalizzato per ogni paziente. 
          </p>
        </div>

        <div className="relative pb-16 md:pb-20">
          <div 
            className="relative overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              <AnimatePresence mode="wait">
                {getVisibleServices().map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={`${service.title}-${idx}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="group"
                    >
                      <div className="bg-white/80 backdrop-blur-sm p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-sm 
                                    transition-all duration-300 h-full
                                    hover:shadow-lg hover:bg-white
                                    border border-[#4A828F]/10">
                        <div className="mb-4 md:mb-6 p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#4A828F]/5 to-transparent
                                    w-12 h-12 md:w-16 md:h-16 flex items-center justify-center
                                    group-hover:from-[#4A828F]/10 transition-colors duration-300">
                          <Icon 
                            className="w-6 h-6 md:w-8 md:h-8 text-[#4A828F] transition-transform duration-300 group-hover:scale-110" 
                            strokeWidth={1.5}
                          />
                        </div>
                        <h3 className="font-manrope text-xl md:text-2xl text-[#233539] font-medium mb-2 md:mb-4 
                                     group-hover:text-[#4A828F] transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="font-manrope text-sm md:text-base text-[#2E545D]/80 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Controlli di navigazione */}
          <div className="absolute -bottom-4 left-0 w-full flex justify-between items-center px-2 md:px-4 mt-6 md:mt-8">
            <div className="flex space-x-1 md:space-x-2">
              {Array.from({ length: getGroupCount() }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentGroup(index)}
                  className={`h-1 transition-all duration-300 rounded-full 
                    ${currentGroup === index 
                      ? 'bg-[#4A828F] w-6 md:w-8' 
                      : 'bg-[#4A828F]/20 hover:bg-[#4A828F]/40 w-2'
                    }`}
                  aria-label={`Vai al gruppo ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex space-x-2 md:space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevGroup}
                className="p-2 md:p-3 bg-white hover:bg-[#4A828F] text-[#4A828F] hover:text-white
                          transition-all duration-300 rounded-full shadow-sm hover:shadow-md"
                aria-label="Gruppo precedente"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextGroup}
                className="p-2 md:p-3 bg-white hover:bg-[#4A828F] text-[#4A828F] hover:text-white
                          transition-all duration-300 rounded-full shadow-sm hover:shadow-md"
                aria-label="Gruppo successivo"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
