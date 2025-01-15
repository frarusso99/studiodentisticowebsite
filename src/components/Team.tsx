import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
}

const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: "Dr. Mario Rossi",
        role: "Dentista",
        image: "https://www.adcdentalcenter.it/wp-content/uploads/sos-dentista.webp"
    },
    {
        id: 2,
        name: "Dr.ssa Anna Bianchi",
        role: "Ortodontista",
        image: "./public/ortodontista.webp"
    },
    {
        id: 3,
        name: "Dr. Luca Verdi",
        role: "Chirurgo Orale",
        image: "https://www.letterainsurancebroker.com/wp-content/uploads/2023/07/assicurazione-dentisti.jpg"
    }
];

const Team: React.FC = () => {
    const { scrollY } = useScroll();
    
    const floatY1 = useTransform(scrollY, [0, 1000], [0, -20]);
    const floatY2 = useTransform(scrollY, [0, 1000], [0, -30]);
    const floatY3 = useTransform(scrollY, [0, 1000], [0, -25]);

    return (
        <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-[#AFCDD5]/10 to-white">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#4A828F]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#4A828F]/5 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Content Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 space-y-6 lg:space-y-8 text-center lg:text-left"
                    >
                        <div className="space-y-4">
                            <h2 className="text-[#2E545D] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                                Il Nostro Team
                                <span className="block text-[#4A828F] mt-2">Professionale</span>
                            </h2>
                            <div className="w-24 h-1.5 bg-[#4A828F] rounded-full mx-auto lg:mx-0" />
                        </div>

                        <p className="text-[#233539] text-base sm:text-lg leading-relaxed">
                            Un team di esperti dedicato alla tua salute dentale, 
                            combinando esperienza, tecnologia e un approccio personalizzato 
                            per ogni paziente.
                        </p>

                        <div className="space-y-4 pt-4">
                            {['Tecnologie Innovative', 'Cura Personalizzata'].map((feature, index) => (
                                <motion.div
                                    key={feature}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    className="flex items-center space-x-3 text-[#2E545D] justify-center lg:justify-start"
                                >
                                    <div className="w-2 h-2 rounded-full bg-[#4A828F]" />
                                    <span className="font-medium">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Team Members Section - Desktop */}
                    <div className="lg:w-1/2 relative h-[400px] sm:h-[500px] lg:h-[600px] hidden sm:block">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.id}
                                style={{
                                    y: [floatY1, floatY2, floatY3][index],
                                }}
                                className={`absolute transition-all duration-500 ease-out
                                    ${index === 0 ? 'left-[15%] top-[10%]' : ''}
                                    ${index === 1 ? 'left-[45%] top-[40%]' : ''}
                                    ${index === 2 ? 'left-[25%] top-[65%]' : ''}
                                `}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.3 }}
                            >
                                <div className="relative group">
                                    <div className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden shadow-[0_15px_50px_rgba(74,130,143,0.2)] transition-all duration-500 ease-out transform group-hover:shadow-[0_20px_80px_rgba(74,130,143,0.3)] group-hover:scale-105">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
                                        />
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0 rounded-full bg-gradient-to-b from-[#4A828F]/40 via-[#2E545D]/45 to-[#233539]/50 flex items-center justify-center backdrop-blur-sm"
                                    >
                                        <div className="text-center text-white p-4 transform transition-transform duration-300 group-hover:scale-105">
                                            <p className="font-bold text-base md:text-lg lg:text-xl mb-1 lg:mb-2">{member.name}</p>
                                            <p className="text-[#E5F0F3] text-xs md:text-sm">{member.role}</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Team Members Section - Mobile */}
                    <div className="w-full grid grid-cols-1 gap-8 sm:hidden">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="flex flex-col items-center"
                            >
                                <div className="relative group">
                                    <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg transition-all duration-500 ease-out transform group-hover:shadow-xl group-hover:scale-105">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#233539]/70 flex items-end justify-center pb-6">
                                            <div className="text-center text-white">
                                                <p className="font-bold text-lg mb-1">{member.name}</p>
                                                <p className="text-[#E5F0F3] text-sm">{member.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Team;