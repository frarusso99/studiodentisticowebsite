import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaGoogle, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaRegCalendarCheck,
  FaInfoCircle,
  FaShieldAlt
} from 'react-icons/fa';

type FormData = {
  name: string;
  phone: string;
  email: string;
  preferredTime: string;
  treatment: string;
  message: string;
  privacyConsent: boolean;
};

const businessHours = [
  { day: 'Martedì', hours: '09-13, 15-19' },
  { day: 'Giovedì', hours: '09-13, 15-19' },
  { day: 'Venerdì', hours: '09-13, 15-19' },
  { day: 'Sabato', hours: '09-13' }
];

const Location = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    preferredTime: '',
    treatment: '',
    message: '',
    privacyConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const encode = (data: { [key: string]: any }) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacyConsent) {
      setFormError("Per favore, accetta l'informativa sulla privacy per continuare.");
      return;
    }
    
    setIsSubmitting(true);
    setFormError(null);

    try {
      // Invio del form a Netlify
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "Richiesta di Appuntamento",
          ...formData
        })
      });
      
      // Reimpostare il form dopo l'invio
      setFormData({
        name: '',
        phone: '',
        email: '',
        preferredTime: '',
        treatment: '',
        message: '',
        privacyConsent: false
      });
      
      setIsSubmitted(true);
      // Nascondere il messaggio di successo dopo 5 secondi
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Errore durante l\'invio del form:', error);
      setFormError("Si è verificato un errore durante l'invio del form. Riprova più tardi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="dove siamo" className="scroll-mt-24 py-16 px-4 sm:px-8 bg-[#E7E6F7]/30">
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
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-manrope font-medium text-xl text-[#233539] mb-5 flex items-center gap-2">
                <FaInfoCircle className="text-[#4A828F]" /> Contatti
              </h3>
              <a 
                href="https://maps.app.goo.gl/6xofLe6CmSrA6p63A" 
                className="font-manrope text-[#2E545D] my-3 flex items-center gap-2 hover:text-[#4A828F] transition-colors"
              >
               <FaMapMarkerAlt className="text-[#4A828F]" /> Piazza Calvario, 89010 Varapodio RC
              </a>
              <a 
                href="tel:+393319103441" 
                className="font-manrope text-[#2E545D] my-3 flex items-center gap-2 hover:text-[#4A828F] transition-colors"
              >
                <FaPhone className="text-[#4A828F]" /> +39 331 910 3441
              </a>
              <a 
                href="mailto:dr.nicolarusso94@gmail.com" 
                className="font-manrope text-[#2E545D] my-3 flex items-center gap-2 hover:text-[#4A828F] transition-colors"
              >
                <FaEnvelope className="text-[#4A828F]" /> dr.nicolarusso94@gmail.com
              </a>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-manrope font-medium text-[#233539] text-xl mb-5 flex items-center gap-2">
                <FaClock className="text-[#4A828F]" /> Orari di Apertura
              </h3>
              {businessHours.map(({ day, hours }) => (
                <p key={day} className="font-manrope text-[#2E545D] my-3">
                  <strong>{day}:</strong> {hours}
                </p>
              ))}
            </motion.div>
          </div>

          <motion.div 
            className="rounded-2xl overflow-hidden shadow-md border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3130.3439265851775!2d15.978389775589196!3d38.317865771853555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8052d3a694608597%3A0xe92563210bc8d0dd!2sStudio%20dentistico%20Dr.%20Nicola%20Russo!5e0!3m2!1sit!2sit!4v1745506096084!5m2!1sit!2sit"
              className="w-full h-[350px] border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </motion.div>

          <motion.a 
            href="https://g.co/kgs/LzjPqGc"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 p-5 bg-white text-[#4A828F] no-underline rounded-xl font-medium shadow-md border border-gray-100 hover:bg-[#4A828F] hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <FaGoogle className="text-xl" /> 
            <span className="font-manrope text-sm">Visita la nostra pagina Google</span>
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <div className="font-manrope inline-flex items-center gap-2 bg-[#4A828F]/10 text-[#4A828F] px-5 py-2 rounded-full text-sm mb-6">
              <FaRegCalendarCheck /> Risposta entro 24h
            </div>
            
            <h2 className="font-manrope font-medium text-2xl text-[#233539] mb-4">Prenota una Visita</h2>
            <p className="font-manrope text-[#2E545D] mb-6">
              Compila il form per richiedere un appuntamento. 
              Ti ricontatteremo presto.
            </p>

            {isSubmitted && (
              <div className="p-4 mb-6 rounded-lg bg-green-100 text-green-800">
                Grazie! La tua richiesta è stata inviata. Ti contatteremo presto.
              </div>
            )}

            {formError && (
              <div className="p-4 mb-6 rounded-lg bg-red-100 text-red-800">
                {formError}
              </div>
            )}

            {/* Form per Netlify */}
            <form 
              name="Richiesta di Appuntamento" 
              method="POST" 
              data-netlify="true" 
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit} 
              className="flex flex-col gap-5"
            >
              {/* Campo nascosto per netlify */}
              <input type="hidden" name="form-name" value="Richiesta di Appuntamento" />
              
              {/* Campo honeypot per prevenire spam */}
              <p className="hidden">
                <label>
                  Non compilare questo campo se sei umano: <input name="bot-field" />
                </label>
              </p>

              <div className="flex flex-col gap-2">
                <label className="font-manrope text-[#2E545D] text-sm font-medium">
                  Nome e Cognome *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A828F] focus:border-[#4A828F]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-manrope text-[#2E545D] text-sm font-medium">
                    Telefono *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A828F] focus:border-[#4A828F]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-manrope text-[#2E545D] text-sm font-medium">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A828F] focus:border-[#4A828F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-manrope text-[#2E545D] text-sm font-medium">
                    Fascia Oraria Preferita
                  </label>
                  <select 
                    name="preferredTime" 
                    value={formData.preferredTime} 
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A828F] focus:border-[#4A828F] appearance-none bg-white"
                  >
                    <option value="">Seleziona un orario</option>
                    <option value="Mattina (9:00 - 13:00)">Mattina (9:00 - 13:00)</option>
                    <option value="Pomeriggio (15:00 - 19:00)">Pomeriggio (15:00 - 19:00)</option>
                    <option value="Sabato Mattina">Sabato Mattina</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-manrope text-[#2E545D] text-sm font-medium">
                    Trattamento di Interesse
                  </label>
                  <select 
                    name="treatment" 
                    value={formData.treatment} 
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A828F] focus:border-[#4A828F] appearance-none bg-white"
                  >
                    <option value="">Seleziona un trattamento</option>
                    <option value="Prima Visita">Prima Visita</option>
                    <option value="Igiene e Prevenzione">Igiene e Prevenzione</option>
                    <option value="Implantologia">Implantologia</option>
                    <option value="Ortodonzia">Ortodonzia</option>
                    <option value="Odontoiatria Estetica">Odontoiatria Estetica</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-manrope text-[#2E545D] text-sm font-medium">
                  Messaggio
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Descrivici le tue esigenze..."
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A828F] focus:border-[#4A828F] resize-y"
                />
              </div>

              {/* Consenso Privacy - Versione semplificata */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="pt-0.5">
                  <input
                    type="checkbox"
                    name="privacyConsent"
                    id="privacyConsent"
                    checked={formData.privacyConsent}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-[#4A828F] focus:ring-[#4A828F]"
                    required
                  />
                </div>
                <label htmlFor="privacyConsent" className="font-manrope text-sm text-[#2E545D]">
                  * Ho letto e accetto la <a href="https://www.iubenda.com/privacy-policy/55906244" className="text-[#4A828F] underline font-medium">Privacy Policy</a> dello studio. I miei dati saranno trattati esclusivamente per rispondere alla richiesta e per eventuali obblighi di legge.
                </label>
              </div>

              <motion.button 
                type="submit" 
                disabled={isSubmitting}
                className="p-3 bg-[#4A828F] text-white rounded-lg font-manrope font-medium cursor-pointer hover:bg-[#2E545D] disabled:opacity-70 shadow-md"
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