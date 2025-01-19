import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Smile, Heart, Shield, Sparkle, Clock, Star, Users } from 'lucide-react';

const services = [
  {
    icon: <Stethoscope />,
    title: "Diagnosi Digitale Avanzata",
    description: "Tecnologia di ultima generazione per una diagnosi precisa e tempestiva del tuo sorriso."
  },
  {
    icon: <Smile />,
    title: "Estetica Dentale Professionale",
    description: "Trasforma il tuo sorriso con trattamenti personalizzati e risultati naturali garantiti."
  },
  {
    icon: <Heart />,
    title: "Implantologia All-on-4",
    description: "Recupera il tuo sorriso in una sola seduta con la tecnologia implantare più innovativa."
  },
  {
    icon: <Shield />,
    title: "Ortodonzia Invisibile",
    description: "Ti garantiamo il raggiungimento di un perfetto allineamento dentale con tecniche invisibili e personalizzate."
  },
  {
    icon: <Sparkle/>,
    title: "Igiene Dentale Professionale",
    description: "Trattamenti di pulizia approfondita per mantenere il tuo sorriso sano e brillante."
  },
  {
    icon: <Clock />,
    title: "Emergenze Dentali",
    description: "Assistenza immediata e professionale per ogni tipo di emergenza dentale."
  },
  {
    icon: <Star />,
    title: "Sbiancamento Dentale",
    description: "Tecniche innovative per un sorriso più luminoso e naturalmente bianco."
  },
  {
    icon: <Users />,
    title: "Odontoiatria Pediatrica",
    description: "Cure dentali specializzate per i più piccoli in un ambiente accogliente e sicuro."
  }
];

export default function Services() {
  const [isHoveredIndex, setIsHoveredIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftGradient(scrollLeft > 0);
      setShowRightGradient(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Mouse drag handlers for smooth scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current!.offsetLeft);
    setScrollLeft(scrollContainerRef.current!.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section id="servizi" className="py-20 relative bg-gradient-to-br from-[#AFCDD5]/20 via-white/50 to-[#4A828F]/10">
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5" />
      
      <div className="relative">
    {/* Header */}
    <div className="px-6 md:px-12 lg:px-20 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="font-manrope text-4xl md:text-5xl text-[#233539] mb-6">
          I Nostri Servizi
          <span className="block text-2xl md:text-3xl font-light italic mt-2 text-[#4A828F]">
            tecnologia e professionalità
          </span>
        </h2>
        <p className="font-manrope text-[#2E545D] text-lg">
          Scopri i nostri servizi di odontoiatria all'avanguardia, dove esperienza e innovazione si fondono per il tuo benessere
        </p>
      </motion.div>
    </div>

    {/* Scroll Container with Gradient Overlays */}
    <div className="relative">
      {/* Left Gradient */}
      <div 
        className={`absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#AFCDD5]/20 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
          showLeftGradient ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Right Gradient */}
      <div 
        className={`absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#AFCDD5]/20 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
          showRightGradient ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Scrollable Services */}
      <div 
        ref={scrollContainerRef}
        className={`flex overflow-x-auto hide-scrollbar gap-6 px-6 md:px-12 lg:px-20 py-4 cursor-grab ${
          isDragging ? 'cursor-grabbing' : ''
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            onHoverStart={() => setIsHoveredIndex(index)}
            onHoverEnd={() => setIsHoveredIndex(null)}
            className="relative group flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[380px]"
          >
            <div className="relative overflow-hidden rounded-3xl bg-white p-8 h-full transition-all duration-300 hover:shadow-xl border border-[#4A828F]/10">
              {/* Background Gradient */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-[#4A828F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              {/* Content */}
              <div className="relative z-10">
                <motion.div
                  animate={{
                    scale: isHoveredIndex === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="inline-block p-4 rounded-2xl bg-[#AFCDD5]/20 mb-6"
                >
                  <div className="text-[#4A828F] w-8 h-8">
                    {service.icon}
                  </div>
                </motion.div>

                <h3 className="font-manrope text-xl text-[#233539] mb-4 transition-colors duration-300 group-hover:text-[#4A828F]">
                  {service.title}
                </h3>

                <p className="font-manrope text-[#2E545D]/80 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>

  <style>
    {`
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `}
  </style>
</section>
  );
}