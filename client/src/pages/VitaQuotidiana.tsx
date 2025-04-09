import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { GiWheat, GiSewingNeedle, GiBlacksmith, GiCastle, GiPrayerBeads, GiPartyPopper } from "react-icons/gi";
import MedievalPageHeader from "@/components/medieval/MedievalPageHeader";
import MedievalFooter from "@/components/medieval/MedievalFooter";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const dailyLifeAspects = [
  {
    title: "La Vita Contadina",
    icon: GiWheat,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600",
    description: "I contadini costituivano la maggior parte della popolazione medievale. La loro vita era scandita dal ritmo delle stagioni e dal duro lavoro nei campi.",
    details: [
      "Coltivazione con il sistema della rotazione triennale",
      "Allevamento di animali domestici",
      "Vita in comunità rurali",
      "Pagamento delle decime alla Chiesa"
    ]
  },
  {
    title: "Artigianato e Mestieri",
    icon: GiSewingNeedle,
    image: "https://images.unsplash.com/photo-1621600411688-4be93cd68504?q=80&w=1600",
    description: "Gli artigiani medievali erano organizzati in corporazioni che regolavano la produzione e la formazione degli apprendisti.",
    details: [
      "Sistema delle corporazioni",
      "Apprendistato e formazione",
      "Produzione di beni essenziali",
      "Specializzazione dei mestieri"
    ]
  },
  {
    title: "Vita nel Castello",
    icon: GiCastle,
    image: "https://images.unsplash.com/photo-1564631027894-5d9f8e7fa0f4?q=80&w=1600",
    description: "La vita nel castello era caratterizzata da una rigida gerarchia sociale e da rituali quotidiani che coinvolgevano nobili e servitori.",
    details: [
      "Organizzazione gerarchica",
      "Banchetti e cerimonie",
      "Amministrazione del feudo",
      "Educazione cavalleresca"
    ]
  },
  {
    title: "Vita Religiosa",
    icon: GiPrayerBeads,
    image: "https://images.unsplash.com/photo-1548743155-f9c7a27467b8?q=80&w=1600",
    description: "La religione permeava ogni aspetto della vita medievale, con la Chiesa che svolgeva un ruolo centrale nella società.",
    details: [
      "Preghiere quotidiane",
      "Celebrazioni liturgiche",
      "Pellegrinaggi",
      "Opere di carità"
    ]
  },
  {
    title: "Feste e Celebrazioni",
    icon: GiPartyPopper,
    image: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?q=80&w=1600",
    description: "Le feste religiose e popolari scandivano l'anno medievale, offrendo momenti di svago e socialità.",
    details: [
      "Feste religiose",
      "Fiere e mercati",
      "Tornei cavallereschi",
      "Rappresentazioni teatrali"
    ]
  },
  {
    title: "Mestieri Urbani",
    icon: GiBlacksmith,
    image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1600",
    description: "Le città medievali erano centri di commercio e produzione, dove fiorivano numerosi mestieri specializzati.",
    details: [
      "Commercio e mercati",
      "Botteghe artigiane",
      "Vita nelle corporazioni",
      "Innovazioni tecniche"
    ]
  }
];

const VitaQuotidiana = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.aspect-card');
      
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
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
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              end: "top center",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.2
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      <MedievalPageHeader 
        title="VITA QUOTIDIANA"
        subtitle="Un viaggio nella vita di tutti i giorni nel Medioevo"
        backgroundImage="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000"
      />

      {/* Daily Life Aspects Grid */}
      <div className="container mx-auto px-4 py-16" ref={cardsRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dailyLifeAspects.map((aspect, index) => (
            <motion.div
              key={aspect.title}
              className="aspect-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="bg-[#1a1a1a]/80 border border-amber-500/30 rounded-lg overflow-hidden hover:border-amber-500/50 transition-all duration-300 shadow-xl group">
                {/* Image Section */}
                <div className="relative h-64">
                  <img 
                    src={aspect.image} 
                    alt={aspect.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  
                  {/* Icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-amber-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-500/30">
                    <aspect.icon className="w-6 h-6 text-amber-300" />
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-amber-300 font-medieval text-2xl mb-2">{aspect.title}</h3>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <p className="text-stone-300 mb-6">{aspect.description}</p>
                  
                  {/* Details */}
                  <div className="space-y-3">
                    <h4 className="text-amber-400 font-medieval text-lg mb-3">Aspetti Principali:</h4>
                    {aspect.details.map((detail, i) => (
                      <div 
                        key={i}
                        className="flex items-center space-x-3 group"
                      >
                        <div className="w-2 h-2 bg-amber-500/50 rounded-full group-hover:bg-amber-500 transition-colors duration-300"></div>
                        <p className="text-stone-300 group-hover:text-stone-200 transition-colors duration-300">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-500/30 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-amber-500/30 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-amber-500/30 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-500/30 rounded-br-lg"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <MedievalFooter />
    </div>
  );
};

export default VitaQuotidiana; 