import { Clock, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const openingHours = [
  { day: "Lunedì - Venerdì", hours: "09:00 - 19:00" },
  { day: "Sabato", hours: "09:00 - 13:00" },
  { day: "Domenica", hours: "Chiuso" }
];

export default function Hero() {
  const [currentHour, setCurrentHour] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentHour((prev) => (prev + 1) % openingHours.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
<section className="relative min-h-screen bg-gradient-to-br from-primary-light/5 via-white to-primary/5">
      {/* Mesh Gradient Background con effetto paralasse */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-[#AFCDD5]/20 to-transparent"
          style={{ filter: 'blur(40px)' }}
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-tl from-[#4A828F]/10 to-transparent"
          style={{ filter: 'blur(40px)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 space-y-10"
          >
            <div className="space-y-6">
              <h1 className="font-brand text-4xl md:text-5xl font-bold text-[#233539] leading-tight">
                Il Tuo Sorriso,
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="block text-[#4A828F] mt-2"
                >
                  La Nostra Passione
                </motion.span>
              </h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="font-display text-xl text-[#2E545D] leading-relaxed"
              >
                Trasformiamo la salute del tuo sorriso con tecnologia all'avanguardia 
                e cure personalizzate nel cuore di Reggio Calabria.
              </motion.p>
            </div>

            {/* Opening Hours & Contact Section */}
            <div className="grid grid-cols-1 gap-6">
              {/* Modified Opening Hours Card */}
              <motion.div 
                className="bg-white/80 backdrop-blur-md rounded-3xl p-4 shadow-lg border border-[#AFCDD5]/20 transform-gpu"
                whileHover={{ y: -2 }}
                onHoverStart={() => setIsPaused(true)}
                onHoverEnd={() => setIsPaused(false)}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-3">
                  <Clock className="text-[#4A828F]" size={24} />
                  <h2 className="font-semibold text-[#233539] text-lg">Orari di Apertura</h2>
                </div>

                <motion.div
  initial={{ height: 40 }}
  whileHover={{ height: "auto" }}
  className="overflow-hidden mt-4"
>
  <AnimatePresence mode="wait" initial={false}>
    {openingHours.map((schedule, index) =>
      index === currentHour || isPaused ? (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{
            duration: 0.6, // Aumenta il tempo per una transizione più fluida
            ease: [0.25, 0.8, 0.5, 1], // Cubic bezier per un movimento più naturale
          }}
          className="flex justify-between items-center py-1"
        >
          <span className="text-[#2E545D] font-medium">{schedule.day}</span>
          <span className="text-[#4A828F] text-lg font-semibold">{schedule.hours}</span>
        </motion.div>
      ) : null
    )}
  </AnimatePresence>
</motion.div>
              </motion.div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <motion.a 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://wa.me/+39NUMEROSTUDIO" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] text-white rounded-3xl hover:bg-[#20BA5A] transition-all duration-300 shadow-lg hover:shadow-xl transform-gpu"
                >
                  <FaWhatsapp size={24} />
                  <span className="font-medium">Prenota Visita</span>
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#location" 
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-primary/80 backdrop-blur-sm text-white rounded-3xl hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-xl border border-[#AFCDD5]/20 transform-gpu"
                >
                  <MapPin size={24} />
                  <span className="font-medium">Dove Siamo</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Gallery Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative group rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transform-gpu"
                >
                  <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80"
                    alt="Studio dentistico moderno"
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#233539]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <h3 className="text-lg font-semibold">Studio Moderno</h3>
                    <p className="text-sm">Tecnologia e comfort per i nostri pazienti</p>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative group rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transform-gpu"
                >
                  <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    src="https://centridentalsmile.it/wp-content/uploads/2018/11/scanner-intra-orale.jpg"
                    alt="Scanner intraorale di ultima generazione"
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#233539]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <h3 className="text-lg font-semibold">Scanner Intraorale</h3>
                    <p className="text-sm">Precisione digitale per il tuo sorriso</p>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-6 pt-12">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative group rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transform-gpu"
                >
                  <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    src="https://www.dental-art.it/wp-content/uploads/2020/10/studio-dentistico-monterotti-area-servizio_11-scaled-e1602678564612.jpg"
                    alt="Sala operatoria moderna"
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#233539]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <h3 className="text-lg font-semibold">Sala Operatoria</h3>
                    <p className="text-sm">Ambiente sterile e all'avanguardia</p>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative group rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transform-gpu"
                >
                  <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    src="https://images.pexels.com/photos/269218/pexels-photo-269218.jpeg"
                    alt="Attrezzatura dentistica moderna"
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#233539]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <h3 className="text-lg font-semibold">Attrezzature Moderne</h3>
                    <p className="text-sm">Tecnologia per cure di qualità</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
