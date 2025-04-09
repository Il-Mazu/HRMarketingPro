import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { GiCastle, GiChurch, GiVillage, GiTowerBridge } from "react-icons/gi";
import MedievalPageHeader from "@/components/medieval/MedievalPageHeader";
import MedievalFooter from "@/components/medieval/MedievalFooter";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    name: "Mont Saint-Michel",
    type: "Abbazia",
    location: "Normandia, Francia",
    description: "Un'isola-abbazia che si erge maestosa sulla baia, simbolo perfetto dell'architettura religiosa medievale. Durante l'alta marea, l'abbazia sembra galleggiare sul mare.",
    image: "https://images.unsplash.com/photo-1589569674623-4f99be82cba0?q=80&w=1600",
    icon: GiChurch,
    features: [
      "Architettura gotica",
      "Biblioteca monastica",
      "Cripta romanica"
    ]
  },
  {
    name: "Castello di Edimburgo",
    type: "Castello",
    location: "Scozia, Regno Unito",
    description: "Fortezza che domina la città di Edimburgo, il castello ha resistito a numerosi assedi e custodisce i gioielli della corona scozzese.",
    image: "https://images.unsplash.com/photo-1564631027894-5d9f8e7fa0f4?q=80&w=1600",
    icon: GiCastle,
    features: [
      "Sale reali",
      "Prigioni medievali",
      "Cappella di Santa Margherita"
    ]
  },
  {
    name: "Rothenburg ob der Tauber",
    type: "Città medievale",
    location: "Baviera, Germania",
    description: "Una delle città medievali meglio conservate d'Europa, con le sue mura intatte e le caratteristiche case a graticcio.",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1600",
    icon: GiVillage,
    features: [
      "Mura cittadine complete",
      "Case a graticcio",
      "Piazza del mercato medievale"
    ]
  },
  {
    name: "Ponte Carlo",
    type: "Ponte fortificato",
    location: "Praga, Repubblica Ceca",
    description: "Ponte gotico decorato con statue barocche, è stato per secoli l'unico collegamento tra la Città Vecchia e il Castello di Praga.",
    image: "https://images.unsplash.com/photo-1562624475-96c2bc08fab6?q=80&w=1600",
    icon: GiTowerBridge,
    features: [
      "Torri gotiche",
      "Statue barocche",
      "Fortificazioni medievali"
    ]
  }
];

const Luoghi = () => {
  const locationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (locationsRef.current) {
      const cards = locationsRef.current.querySelectorAll('.location-card');
      
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
        title="LUOGHI MEDIEVALI"
        subtitle="Esplora i luoghi più affascinanti del Medioevo"
        backgroundImage="https://images.unsplash.com/photo-1564631027894-5d9f8e7fa0f4?q=80&w=2000"
      />

      {/* Locations Grid */}
      <div className="container mx-auto px-4 py-16" ref={locationsRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={location.name}
              className="location-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="bg-[#1a1a1a]/80 border border-amber-500/30 rounded-lg overflow-hidden hover:border-amber-500/50 transition-all duration-300 shadow-xl group">
                {/* Image Section */}
                <div className="relative h-72">
                  <img 
                    src={location.image} 
                    alt={location.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  
                  {/* Location Icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-amber-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-500/30">
                    <location.icon className="w-6 h-6 text-amber-300" />
                  </div>

                  {/* Title Section */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-amber-300 font-medieval text-3xl mb-2">{location.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-amber-200/80 font-medieval">{location.type}</span>
                      <span className="text-stone-400">•</span>
                      <span className="text-stone-400">{location.location}</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <p className="text-stone-300 mb-6">{location.description}</p>
                  
                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="text-amber-400 font-medieval text-lg mb-3">Caratteristiche Principali:</h4>
                    {location.features.map((feature, i) => (
                      <div 
                        key={i}
                        className="flex items-center space-x-3 group"
                      >
                        <div className="w-2 h-2 bg-amber-500/50 rounded-full group-hover:bg-amber-500 transition-colors duration-300"></div>
                        <p className="text-stone-300 group-hover:text-stone-200 transition-colors duration-300">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-500/30 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-amber-500/30 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-amber-500/30 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-500/30 rounded-br-lg"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <MedievalFooter />
    </div>
  );
};

export default Luoghi; 