import { useState } from 'react';
import { 
  FaWhatsapp, FaInstagram, FaFacebookF, FaLinkedinIn,
  FaClock, FaPhoneAlt 
} from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLocationMarker, HiArrowRight } from 'react-icons/hi';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormEvent } from 'react'; // Import for FormEvent type
import { MouseEvent } from 'react'; // Import for MouseEvent type

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const currentYear = new Date().getFullYear();

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Qui implementa la logica per la newsletter
      console.log('Subscribing:', email);
      // Reset form after successful subscription
      setEmail('');
      // Mostra feedback all'utente
      alert('Iscrizione completata con successo!');
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Si è verificato un errore. Riprova più tardi.');
    }
  };
  
  const handleNavigation = (section: string) => {
    setEmail(''); // Reset form when navigating

    if (section.toLowerCase() === 'blog') {
      // Se siamo già sulla pagina blog, non fare nulla
      if (location.pathname !== '/blog') {
        navigate('/blog');  // Naviga alla pagina Blog
      }
    } else {
      // Altre navigazioni
      if (location.pathname === '/') {
        // Siamo sulla home page, scrolliamo alla sezione desiderata
        document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: 'instant' });
      } else {
        // Se siamo su una pagina diversa dalla Home, naviga alla Home
        navigate('/');
        setTimeout(() => {
          document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: 'instant' });
        }, 100);
      }
    }
  };

  const socialLinks = {
    instagram: 'https://instagram.com/tuoprofilo',
    facebook: 'https://facebook.com/tuapagina',
    linkedin: 'https://linkedin.com/company/tuazienda'
  };

  return (
    <>
      {/* Pre-footer CTA */}
      <div className="relative">
        <div className="absolute inset-0 bg-[#4A828F]/10 backdrop-blur-sm" />
        <div className="container mx-auto px-6 py-16 relative">
          <div className="bg-gradient-to-r from-[#233539] to-[#2E545D] rounded-3xl p-12 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-manrope text-3xl font-medium text-white mb-4">
                  Prenota la Tua Prima Visita Gratuita
                </h2>
                <p className="font-manrope font-medium text-[#AFCDD5] mb-6">
                  Un sorriso sano inizia con una consulenza personalizzata
                </p>
              </div>
              <div className="flex justify-end">
                <button 
                  onClick={() => handleNavigation('contact')}
                  className="group bg-white px-8 py-4 rounded-full font-manrope font-semibold text-[#233539] 
                           hover:bg-[#AFCDD5] transition-all duration-300 flex items-center gap-3"
                >
                  Prenota Ora
                  <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/+390000000000" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 p-4 rounded-full shadow-lg 
                   hover:scale-110 transition-transform duration-300 z-50 group"
        onClick={(e) => {
          // Tracking dell'evento se necessario
          console.log('WhatsApp clicked');
        }}
      >
        <FaWhatsapp className="w-6 h-6 text-white" />
        <span className="font-manrope font-medium absolute right-full mr-3 bg-white text-gray-800 px-4 py-2 
                        rounded-lg shadow-lg text-sm whitespace-nowrap opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300">
          Scrivici su WhatsApp
        </span>
      </a>

      <footer id="contatti" className="bg-[#233539] text-white pt-20 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Section */}
            <div className="space-y-6">
              <h2 className="font-manrope text-2xl">Studio Dentistico</h2>
              <p className="font-manrope text-[#AFCDD5]/80 leading-relaxed">
                La tua salute dentale è la nostra missione. 
                Tecnologie all'avanguardia e approccio personalizzato.
              </p>
              <div className="flex gap-4">
                {[
                  { Icon: FaInstagram, link: socialLinks.instagram },
                  { Icon: FaFacebookF, link: socialLinks.facebook },
                  { Icon: FaLinkedinIn, link: socialLinks.linkedin }
                ].map(({ Icon, link }, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#4A828F]/20 p-3 rounded-full hover:bg-[#4A828F] 
                             transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-manrope text-lg font-medium mb-6">Menu Rapido</h3>
              <ul className="space-y-4">
                {['Home', 'Servizi', 'Team', 'Studio', 'Blog'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => handleNavigation(item)}
                      className="font-manrope text-[#AFCDD5]/80 hover:text-white transition-colors duration-300 
                                flex items-center gap-2 group"
                    >
                      <HiArrowRight className="opacity-0 group-hover:opacity-100 
                                            transition-opacity duration-300" />
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>



            {/* Contact Info */}
            <div>
              <h3 className="font-manrope text-lg font-medium mb-6">Orari e Contatti</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 font-manrop text-[#AFCDD5]/80">
                  <FaClock className="text-[#4A828F]" />
                  <div>
                    <p>Lun - Ven: 9:00 - 19:00</p>
                    <p>Sab: 9:00 - 13:00</p>
                  </div>
                </li>
                <li>
                  <a 
                    href="tel:+390021234567"
                    className="font-manrope flex items-center gap-3 text-[#AFCDD5]/80 hover:text-white transition-colors"
                  >
                    <FaPhoneAlt className="text-[#4A828F]" />
                    <span>+39 02 1234567</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:info@studiodentistico.it"
                    className="font-manrope flex items-center gap-3 text-[#AFCDD5]/80 hover:text-white transition-colors"
                  >
                    <HiOutlineMail className="text-[#4A828F]" />
                    <span>info@studiodentistico.it</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://maps.google.com/?q=Via+Roma+123,+Milano"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-manrope flex items-center gap-3 text-[#AFCDD5]/80 hover:text-white transition-colors"
                  >
                    <HiOutlineLocationMarker className="text-[#4A828F]" />
                    <span>Via Roma 123, Milano</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-manrope text-lg font-medium mb-6">Newsletter</h3>
              <p className="font-manrope text-[#AFCDD5]/80 mb-4">
                Iscriviti per ricevere consigli sulla salute dentale e le nostre ultime novità
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  placeholder="La tua email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#AFCDD5]/10 border border-[#AFCDD5]/20
                           text-white placeholder-[#AFCDD5]/50 focus:outline-none 
                           focus:border-[#4A828F] transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="font-manrope font-medium w-full bg-[#4A828F] text-white py-3 rounded-lg 
                           hover:bg-[#2E545D] transition-colors duration-300"
                >
                  Iscriviti
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#AFCDD5]/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="font-manrope text-[#AFCDD5]/60 text-sm">
                © {currentYear} Studio Dentistico. Tutti i diritti riservati.
              </p>
              <div className="font-manrope flex gap-6 text-sm">
                <a 
                  href="/privacy-policy"
                  className="text-[#AFCDD5]/60 hover:text-white transition-colors duration-300"
                >
                  Privacy Policy
                </a>
                <a 
                  href="/cookie-policy"
                  className="font-manrope text-[#AFCDD5]/60 hover:text-white transition-colors duration-300"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;




