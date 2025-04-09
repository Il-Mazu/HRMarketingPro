import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { FaLandmark, FaUsers, FaPalette, FaUtensils } from "react-icons/fa";
import { GiCastle, GiCrossedSwords, GiAnvil, GiHouse, GiScrollUnfurled, GiCrown, GiFeather, GiShield, GiSwordClash, GiTreasureMap } from "react-icons/gi";
import MedievalFeatureCard from "../components/medieval/MedievalFeatureCard";
import MedievalTimeline from "../components/medieval/MedievalTimeline";
import MedievalMap from "../components/medieval/MedievalMap";
import MedievalIcon from "../components/medieval/MedievalIcon";
import frameBackground from '/src/assets/images/medieval-frame-bg.jpg';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: "Avvenimenti Importanti",
    icon: <FaLandmark className="w-8 h-8" />,
    description: "Scopri gli eventi che hanno plasmato il Medioevo",
    path: "/HRMarketingPro/avvenimenti",
    color: "from-red-900/40 to-red-950/40",
    hoverColor: "from-red-800/50 to-red-900/50"
  },
  {
    title: "Personaggi",
    icon: <FaUsers className="w-8 h-8" />,
    description: "Le figure che hanno fatto la storia",
    path: "/HRMarketingPro/personaggi",
    color: "from-amber-900/40 to-amber-950/40",
    hoverColor: "from-amber-800/50 to-amber-900/50"
  },
  {
    title: "Luoghi",
    icon: <GiCastle className="w-8 h-8" />,
    description: "Esplora castelli, monasteri e città medievali",
    path: "/HRMarketingPro/luoghi",
    color: "from-red-900/40 to-red-950/40",
    hoverColor: "from-red-800/50 to-red-900/50"
  },
  {
    title: "Arte",
    icon: <FaPalette className="w-8 h-8" />,
    description: "L'espressione artistica nell'epoca medievale",
    path: "/HRMarketingPro/arte",
    color: "from-amber-900/40 to-amber-950/40",
    hoverColor: "from-amber-800/50 to-amber-900/50"
  },
  {
    title: "Vita Quotidiana",
    icon: <GiHouse className="w-8 h-8" />,
    description: "Come si viveva nel Medioevo",
    path: "/HRMarketingPro/vita-quotidiana",
    color: "from-red-900/40 to-red-950/40",
    hoverColor: "from-red-800/50 to-red-900/50"
  },
  {
    title: "Armi e Armature",
    icon: <GiCrossedSwords className="w-8 h-8" />,
    description: "L'equipaggiamento dei guerrieri medievali",
    path: "/HRMarketingPro/armi-armature",
    color: "from-amber-900/40 to-amber-950/40",
    hoverColor: "from-amber-800/50 to-amber-900/50"
  },
  {
    title: "Arti e Artigianato",
    icon: <GiAnvil className="w-8 h-8" />,
    description: "Le maestranze e i mestieri dell'epoca",
    path: "/HRMarketingPro/arti-artigianato",
    color: "from-red-900/40 to-red-950/40",
    hoverColor: "from-red-800/50 to-red-900/50"
  },
  {
    title: "Cibo",
    icon: <FaUtensils className="w-8 h-8" />,
    description: "La gastronomia medievale",
    path: "/HRMarketingPro/cibo",
    color: "from-amber-900/40 to-amber-950/40",
    hoverColor: "from-amber-800/50 to-amber-900/50"
  }
];

const Introduzione = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    if (headerRef.current) {
      timeline
        .fromTo(
          headerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.5 }
        )
        .fromTo(
          titleRef.current,
          { 
            opacity: 0, 
            y: -50,
            scale: 0.9
          },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 1.2,
            ease: "elastic.out(1, 0.5)"
          },
          "-=0.5"
        )
        .fromTo(
          subtitleRef.current,
          { 
            opacity: 0, 
            y: 30,
            scale: 0.95
          },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 1,
            ease: "back.out(1.7)"
          },
          "-=0.8"
        )
        .fromTo(
          dividerRef.current,
          { 
            width: 0,
            opacity: 0
          },
          { 
            width: "100%", 
            opacity: 1, 
            duration: 1.2,
            ease: "power2.inOut"
          },
          "-=0.5"
        );
    }

    if (cardsRef.current) {
      gsap.fromTo(
        ".section-card",
        { 
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top center+=100",
            end: "bottom center",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0E0E0E] relative">
      {/* Background Image with Frame */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${frameBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.15
        }}
      />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Enhanced Header */}
        <div 
          ref={headerRef}
          className="relative h-[600px] flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.92), rgba(80, 20, 20, 0.85))',
            boxShadow: 'inset 0 0 200px rgba(0,0,0,0.9)'
          }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
            style={{
              backgroundImage: 'url("/images/medieval-background.jpg")',
              filter: 'brightness(0.2) contrast(1.2) sepia(0.2)',
              transform: 'scale(1.05)',
              transition: 'transform 0.5s ease-out'
            }}
          />
          
          {/* Decorative elements */}
          <div className="absolute inset-0 z-0">
            {/* Corner Ornaments */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-amber-500/30"></div>
            <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-amber-500/30"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-amber-500/30"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-amber-500/30"></div>
            
            {/* Diagonal Lines */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent transform -skew-y-2"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent transform skew-y-2"></div>
            
            {/* Vertical Ornaments */}
            <div className="absolute top-1/2 left-8 transform -translate-y-1/2">
              <GiScrollUnfurled className="text-amber-500/30 w-12 h-12 mb-8" />
              <div className="h-32 w-[1px] mx-auto bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"></div>
              <GiCrown className="text-amber-500/30 w-12 h-12 mt-8" />
            </div>
            <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
              <GiScrollUnfurled className="text-amber-500/30 w-12 h-12 mb-8" />
              <div className="h-32 w-[1px] mx-auto bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"></div>
              <GiCrown className="text-amber-500/30 w-12 h-12 mt-8" />
            </div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
            {/* Pre-title ornament */}
            <div className="flex items-center justify-center mb-8">
              <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-amber-500/50"></div>
              <GiCrown className="text-amber-400/80 w-8 h-8 mx-4 transform -translate-y-1" />
              <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-amber-500/50"></div>
            </div>
            
            <h1 
              ref={titleRef}
              className="text-6xl md:text-8xl font-medieval text-amber-300 mb-8 tracking-wider leading-tight"
              style={{
                textShadow: '0 0 25px rgba(210, 147, 38, 0.6), 0 0 45px rgba(210, 147, 38, 0.4), 0 0 65px rgba(210, 147, 38, 0.3)',
                letterSpacing: '0.15em'
              }}
            >
              IL TUO VIAGGIO<br />COMINCIA QUI
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-stone-300 max-w-3xl mx-auto text-center font-medieval text-2xl md:text-3xl mb-12"
              style={{
                textShadow: '0 0 15px rgba(255, 255, 255, 0.4)',
                letterSpacing: '0.1em'
              }}
            >
              Scegli tu da dove iniziare
            </p>
            
            {/* Post-title ornament */}
            <div 
              ref={dividerRef}
              className="relative"
            >
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500/70 to-transparent"></div>
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-amber-500/30 flex items-center justify-center bg-black/50">
                <GiScrollUnfurled className="text-amber-400/80 w-8 h-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Sections Grid */}
        <div ref={cardsRef} className="container mx-auto px-4 py-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {sections.map((section, index) => {
              const handleClick = () => {
                window.location.pathname = section.path;
              };

              return (
                <div 
                  key={section.path} 
                  onClick={handleClick}
                  className="relative cursor-pointer"
                >
                  <motion.div
                    className={`section-card rounded-lg p-6 border-2 border-red-800/30 bg-gradient-to-br ${section.color} 
                      backdrop-blur-sm hover:border-amber-600/50 transition-all duration-500 group relative overflow-hidden
                      hover:shadow-[0_0_30px_rgba(194,163,93,0.15)] transform-gpu`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        duration: 0.8,
                        delay: index * 0.1,
                        ease: "easeOut"
                      }
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ 
                      scale: 1.03,
                      y: -8,
                      transition: { 
                        duration: 0.3,
                        ease: "easeOut"
                      }
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Content wrapper */}
                    <div className="relative z-10">
                      <motion.div 
                        className="flex items-center mb-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Icon container with glow effect */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-amber-500/20 blur-lg transform scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <motion.div 
                            className="relative transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 text-amber-200 group-hover:text-amber-400"
                            whileHover={{ rotate: 15 }}
                            transition={{ duration: 0.3 }}
                          >
                            {section.icon}
                          </motion.div>
                        </div>
                        <h2 className="text-2xl font-medieval text-amber-200 ml-4 group-hover:text-amber-400 transition-colors duration-300 tracking-wider">
                          {section.title}
                        </h2>
                      </motion.div>
                      
                      <motion.p 
                        className="text-stone-300 group-hover:text-stone-200 transition-colors duration-300"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {section.description}
                      </motion.p>

                      {/* Animated underline */}
                      <motion.div
                        className="h-0.5 bg-amber-600/30 mt-4 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                        initial={false}
                      />
                    </div>

                    {/* Hover effect particles */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
                          initial={false}
                          animate={{
                            x: [0, Math.random() * 100 - 50],
                            y: [0, Math.random() * -100],
                            opacity: [0, 1, 0],
                            scale: [1, 1.5, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeOut",
                          }}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Arrow indicator */}
                    <motion.div 
                      className="absolute bottom-4 right-4 text-amber-400/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: -10, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Medieval Footer */}
        <footer className="relative bg-[#0E0E0E] border-t border-[#C2A35D]/20 mt-16">
          {/* Decorative Top Border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C2A35D]/30 to-transparent" />
          
          {/* Background Pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C2A35D' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          />

          <div className="container mx-auto px-4 py-12 relative">
            {/* Main Footer Content */}
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {/* Logo & About */}
              <div className="md:col-span-2">
                <h3 className="font-medieval text-xl text-[#C2A35D] mb-4">Mysterium Medii Aevi</h3>
                <p className="text-[#F5ECD9]/80 mb-6 max-w-md">
                  Un viaggio attraverso i secoli oscuri, alla scoperta dei misteri e delle meraviglie del Medioevo. Unisciti a noi in questa straordinaria avventura nel passato.
                </p>
                {/* Newsletter Signup */}
                <div className="relative max-w-md">
                  <input
                    type="email"
                    placeholder="La tua email per ricevere aggiornamenti..."
                    className="w-full px-4 py-2 bg-[#1B1B1B] border border-[#C2A35D]/30 rounded-sm text-[#F5ECD9] placeholder-[#F5ECD9]/40 focus:outline-none focus:border-[#C2A35D]"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-[#7A1F1F] text-[#F5ECD9] hover:bg-[#A23232] transition-colors duration-300 rounded-sm text-sm">
                    Iscriviti
                  </button>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-medieval text-lg text-[#C2A35D] mb-4 flex items-center">
                  <GiScrollUnfurled className="w-5 h-5 mr-2" />
                  Collegamenti Rapidi
                </h4>
                <ul className="space-y-2">
                  {[
                    { label: 'Home', href: '/HRMarketingPro/' },
                    { label: 'Storia', href: '/HRMarketingPro/storia' },
                    { label: 'Personaggi', href: '/HRMarketingPro/personaggi' },
                    { label: 'Luoghi', href: '/HRMarketingPro/luoghi' },
                    { label: 'Contatti', href: '/HRMarketingPro/contatti' }
                  ].map((link) => (
                    <li key={link.label}>
                      <a 
                        href={link.href}
                        className="text-[#F5ECD9]/70 hover:text-[#C2A35D] transition-colors duration-300 flex items-center"
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.pathname = link.href;
                        }}
                      >
                        <div className="w-1 h-1 bg-[#C2A35D]/40 rounded-full mr-2" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-medieval text-lg text-[#C2A35D] mb-4 flex items-center">
                  <GiFeather className="w-5 h-5 mr-2" />
                  Seguici
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Facebook', icon: GiShield },
                    { label: 'Twitter', icon: GiSwordClash },
                    { label: 'Instagram', icon: GiTreasureMap },
                    { label: 'YouTube', icon: GiCastle }
                  ].map((social) => (
                    <a
                      key={social.label}
                      href="#"
                      className="flex items-center text-[#F5ECD9]/70 hover:text-[#C2A35D] transition-colors duration-300"
                    >
                      <social.icon className="w-5 h-5 mr-2" />
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-[#C2A35D]/20">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-[#F5ECD9]/60 text-sm text-center md:text-left mb-4 md:mb-0">
                  © {new Date().getFullYear()} Mysterium Medii Aevi. Tutti i diritti riservati.
                </p>
                <div className="flex space-x-6">
                  <a href="#" className="text-[#F5ECD9]/60 hover:text-[#C2A35D] text-sm transition-colors duration-300">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-[#F5ECD9]/60 hover:text-[#C2A35D] text-sm transition-colors duration-300">
                    Termini di Servizio
                  </a>
                </div>
              </div>
            </div>

            {/* Call to Action Button */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <button 
                onClick={() => window.location.pathname = '/HRMarketingPro/join'}
                className="px-8 py-3 bg-[#7A1F1F] border border-amber-200/50 text-[#F5ECD9] font-medieval hover:bg-[#A23232] transition-colors duration-300 rounded-sm shadow-lg flex items-center space-x-2"
              >
                <span>Unisciti al Viaggio Medievale</span>
                <span className="text-[#C2A35D]">→</span>
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Introduzione; 