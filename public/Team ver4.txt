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
    
    const floatY1 = useTransform(scrollY, [0, 1000], [0, -30]);
    const floatY2 = useTransform(scrollY, [0, 1000], [0, -60]);
    const floatY3 = useTransform(scrollY, [0, 1000], [0, -45]);

    return (
        <section className="relative py-16 overflow-hidden bg-gradient-to-b from-[#AFCDD5]/10 to-white">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4A828F]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#4A828F]/5 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    {/* Content Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 space-y-8"
                    >
                        <div className="space-y-4">
                            <h2 className="text-[#2E545D] text-5xl font-bold leading-tight">
                                Il Nostro Team
                                <span className="block text-[#4A828F] mt-2">Professionale</span>
                            </h2>
                            <div className="w-24 h-1.5 bg-[#4A828F] rounded-full" />
                        </div>

                        <p className="text-[#233539] text-lg leading-relaxed">
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
                                    className="flex items-center space-x-3 text-[#2E545D]"
                                >
                                    <div className="w-2 h-2 rounded-full bg-[#4A828F]" />
                                    <span className="font-medium">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

{/* Team Members Section */}
<div className="lg:w-1/2 relative h-[600px]">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.id}
                                style={{
                                    y: [floatY1, floatY2, floatY3][index],
                                    left: `${[15, 45, 25][index]}%`,
                                    top: `${[10, 40, 65][index]}%`,
                                }}
                                className="absolute"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: index * 0.3 }}
                            >
                                <div className="relative group">
                                    <div className="w-56 h-56 rounded-full overflow-hidden shadow-[0_15px_50px_rgba(74,130,143,0.2)] transition-all duration-500 ease-out transform group-hover:shadow-[0_20px_80px_rgba(74,130,143,0.3)] group-hover:scale-105">
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
                                        className="absolute inset-0 rounded-full bg-gradient-to-b from-[#4A828F]/40 via-[#2E545D]/45 to-[#233539]/50 flex items-center justify-center"
                                    >
                                        <div className="text-center text-white p-4 transform transition-transform duration-300 group-hover:scale-105">
                                            <p className="font-bold text-xl mb-2">{member.name}</p>
                                            <p className="text-[#E5F0F3] text-sm">{member.role}</p>
                                        </div>
                                    </motion.div>
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