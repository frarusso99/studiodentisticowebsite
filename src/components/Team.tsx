import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const teamMembers = [
    {
        id: 1,
        name: "Dr. Mario Rossi",
        role: "Direttore Sanitario",
        image: "https://www.adcdentalcenter.it/wp-content/uploads/sos-dentista.webp",
        bgColor: "bg-[#AFCDD5]"
    },
    {
        id: 2,
        name: "Dr.ssa Anna Bianchi",
        role: "Ortodontista",
        image: "./ortodontista.webp",
        bgColor: "bg-[#D6E9FF]"
    },
    {
        id: 3,
        name: "Dr. Luca Verdi",
        role: "Chirurgo Orale",
        image: "https://www.letterainsurancebroker.com/wp-content/uploads/2023/07/assicurazione-dentisti.jpg",
        bgColor: "bg-[#F8E4FF]"
    },
    {
        id: 4,
        name: "Dr.ssa Chiara Neri",
        role: "Igienista Dentale",
        image: "https://media.gettyimages.com/id/1391411841/it/foto/facciamo-in-modo-che-questi-denti-siano-di-nuovo-buoni.jpg?s=612x612&w=gi&k=20&c=B3o7kC2fw45uLxr7RQgp2PgrtHGKXhxE_SoqiSdcPio=",
        bgColor: "bg-[#FFE4D6]"
    }
];

export default function Team() {
    const { scrollY } = useScroll();

    const yTransforms = [
        useTransform(scrollY, [0, 1000], [0, -50]),
        useTransform(scrollY, [0, 1000], [0, -20]),
        useTransform(scrollY, [0, 1000], [0, -35]),
        useTransform(scrollY, [0, 1000], [0, -25]),
    ];

    return (
        <section
            id="team"
            className="scroll-mt-24 relative min-h-screen py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-[#AFCDD5]/20 via-white/50 to-[#4A828F]/10"
        >
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 max-w-xl"
                    >
                        <div className="space-y-8">
                            <h2 className="font-manrope text-4xl sm:text-5xl text-[#233539] mb-6">
                                Il Nostro Team
                                <span className="block text-2xl md:text-3xl font-light italic mt-2 text-[#4A828F]">
                                    professionalità ed esperienza
                                </span>
                            </h2>

                            <p className="font-manrope text-[#2E545D]/80 text-lg leading-relaxed">
                                Il nostro team unisce competenza ed empatia per offrirti
                                un'esperienza di cura dentale superiore. Ogni membro porta
                                con sé anni di esperienza e una passione genuina per il
                                benessere dei pazienti.
                            </p>

                            <motion.button
                                whileHover={{ x: 5 }}
                                className="font-manrope inline-flex items-center gap-2 text-[#4A828F] hover:text-[#233539] transition-colors"
                            >
                                Scopri di più sul nostro team
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Team Members - Desktop */}
                    <div className="lg:w-1/2 relative h-[600px] hidden lg:block">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.id}
                                style={{ y: yTransforms[index] }}
                                className={`absolute transition-all duration-500
                                    ${index === 0 ? 'left-[5%] top-[5%]' : ''}
                                    ${index === 1 ? 'left-[50%] top-[10%] translate-x-[-50%]' : ''}
                                    ${index === 2 ? 'left-[20%] top-[60%]' : ''}
                                    ${index === 3 ? 'left-[60%] top-[50%] translate-x-[-50%]' : ''}
                                `}
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.03 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    className="relative group cursor-pointer"
                                >
                                    <div
                                        className={`w-44 h-44 sm:w-48 sm:h-48 rounded-full border-2 shadow-md
                                            border-white ${member.bgColor} p-1`}
                                    >
                                        <div className="w-full h-full rounded-full overflow-hidden">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center w-full"
                                    >
                                        <p className="font-semibold text-[#233539]">{member.name}</p>
                                        <p className="text-sm text-[#4A828F]">{member.role}</p>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Team Members - Mobile/Tablet */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-12 lg:hidden">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.05 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="flex flex-col items-center"
                            >
                                <div
                                    className={`w-40 h-40 sm:w-44 sm:h-44 rounded-full border-2 shadow-md
                                        border-white ${member.bgColor} p-1`}
                                >
                                    <div className="w-full h-full rounded-full overflow-hidden">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="text-center mt-4">
                                    <p className="font-semibold text-[#233539]">{member.name}</p>
                                    <p className="text-sm text-[#4A828F]">{member.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
