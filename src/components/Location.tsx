import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaGoogle, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaRegCalendarCheck,
  FaStar
} from 'react-icons/fa';

type FormData = {
  name: string;
  phone: string;
  email: string;
  preferredTime: string;
  treatment: string;
  message: string;
  insurance: string;
};

const businessHours = [
  { day: 'Lunedì - Venerdì', hours: '09:00 - 19:00' },
  { day: 'Sabato', hours: '09:00 - 13:00' },
  { day: 'Domenica', hours: 'Chiuso' }
];

const Location = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    preferredTime: '',
    treatment: '',
    message: '',
    insurance: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(formData);
    setIsSubmitting(false);
  };

  return (
    <section id="dove siamo" className="py-16 px-4 sm:px-8 bg-[#E7E6F7]/30 to-white/80">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="font-manrope text-4xl md:text-5xl text-[#233539] mb-8 text-center"
      >
        Dove Trovarci
      </motion.h2>
      <p className="font-manrope text-[#2E545D] text-lg mb-8 text-center">
        Vieni a visitare il nostro studio e scopri i nostri servizi
      </p>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              className="bg-white p-8 rounded-3xl shadow-lg shadow-blue-100/50 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-urbanist font-semibold text-xl text-primary-medium/90 mb-6 flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#4A828F]" /> Studio Dentistico
              </h3>
              <p className="font-manrope font-medium text-[#2E545D] my-3">Via G. Washington, 70, 20146 Milano MI</p>
              <p className="text-[#2E545D] my-3 flex items-center gap-2">
                <FaPhone className="text-[#4A828F]" /> +39 02 4047785
              </p>
              <p className="font-manrope font-medium text-[#2E545D] my-3 flex items-center gap-2">
                <FaEnvelope className="text-[#4A828F]" /> studio@dentistagalimberti.it
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-3xl shadow-lg shadow-blue-100/50 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-urbanist font-semibold text-primary-medium/90 text-xl mb-6 flex items-center gap-2">
                <FaClock className="text-[#4A828F]" /> Orari di Apertura
              </h3>
              {businessHours.map(({ day, hours }) => (
                <p key={day} className="font-manrope font-medium text-[#2E545D] my-3">
                  <strong>{day}:</strong> {hours}
                </p>
              ))}
            </motion.div>
          </div>

          <motion.div 
            className="rounded-3xl overflow-hidden shadow-lg shadow-blue-100/50 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.8876171939824!2d9.138449776652927!3d45.46069413642744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c3c8d8fd373f%3A0xf9413c5045960b01!2sStudio%20Dentistico%20Dott.%20Galimberti!5e0!3m2!1sit!2sit!4v1705330000000!5m2!1sit!2sit"
              className="w-full h-[400px] border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </motion.div>

          <motion.a 
            href="https://g.co/kgs/MWvDSnS" 
            target="_blank"
            className="flex items-center justify-center gap-3 p-6 bg-white text-[#4A828F] no-underline rounded-2xl font-medium shadow-lg shadow-blue-100/50 border border-gray-100 hover:bg-[#4A828F] hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <FaGoogle className="text-xl" /> 
            <span className="font-bold font-manrope">4.9</span>
            <div className="flex gap-1 text-yellow-400">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <span className="font-manrope font-semibold text-sm">(Leggi le recensioni degli utenti)</span>
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white p-10 rounded-3xl shadow-lg shadow-blue-100/50 border border-gray-100">
            <div className="font-manrope font-medium inline-flex items-center gap-2 bg-[#4A828F]/10 text-[#4A828F] px-6 py-3 rounded-full text-sm mb-6">
              <FaRegCalendarCheck /> Risposta entro 24h
            </div>
            
            <h2 className="font-manrope font-semibold text-3xl text-primary-medium/90 mb-4">Prenota una Visita</h2>
            <p className="font-manrope font-medium text-primary-medium/90 mb-8 leading-relaxed">
              Compila il form per richiedere un appuntamento. 
              Il nostro team ti ricontatterà per trovare l'orario più adatto alle tue esigenze.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-manrope text-primary-medium/90 text-sm font-semibold">
                  Nome e Cognome *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4A828F] focus:ring-opacity-20 focus:border-[#4A828F]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-manrope text-primary-medium/90 text-sm font-semibold">
                    Telefono *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4A828F] focus:ring-opacity-20 focus:border-[#4A828F]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-manrope text-primary-medium/90 text-sm font-semibold">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4A828F] focus:ring-opacity-20 focus:border-[#4A828F]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-manrope text-primary-medium/90 text-sm font-semibold">
                  Fascia Oraria Preferita
                </label>
                <select 
                  name="preferredTime" 
                  value={formData.preferredTime} 
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4A828F] focus:ring-opacity-20 focus:border-[#4A828F] appearance-none bg-white"
                >
                  <option value="">Seleziona un orario</option>
                  <option value="mattina">Mattina (9:00 - 13:00)</option>
                  <option value="pomeriggio">Pomeriggio (14:00 - 19:00)</option>
                  <option value="sabato">Sabato Mattina</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-manrope text-primary-medium/90 text-sm font-semibold">
                  Trattamento di Interesse
                </label>
                <select 
                  name="treatment" 
                  value={formData.treatment} 
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4A828F] focus:ring-opacity-20 focus:border-[#4A828F] appearance-none bg-white"
                >
                  <option value="">Seleziona un trattamento</option>
                  <option value="visita">Prima Visita</option>
                  <option value="igiene">Igiene e Prevenzione</option>
                  <option value="implantologia">Implantologia</option>
                  <option value="ortodonzia">Ortodonzia</option>
                  <option value="estetica">Odontoiatria Estetica</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-manrope text-primary-medium/90 text-sm font-semibold">
                  Messaggio
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Descrivici le tue esigenze..."
                  className="w-full p-4 border border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4A828F] focus:ring-opacity-20 focus:border-[#4A828F] resize-y"
                />
              </div>

              <motion.button 
                type="submit" 
                disabled={isSubmitting}
                className="p-4 bg-[#4A828F] text-white border-none rounded-xl text-base font-manrope font-semibold cursor-pointer transition-all duration-300 hover:bg-[#2E545D] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-200/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Invio in corso...' : 'Richiedi Appuntamento'}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Location;
