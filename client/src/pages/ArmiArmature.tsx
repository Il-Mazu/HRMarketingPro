import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { 
  GiSwordsPower,
  GiArmorVest,
  GiCrossbow,
  GiShield,
  GiHorseHead,
  GiSwordsEmblem
} from "react-icons/gi";
import MedievalPageHeader from "@/components/medieval/MedievalPageHeader";
import MedievalFooter from "@/components/medieval/MedievalFooter";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: "all", name: "Tutte le Categorie", icon: GiSwordsEmblem },
  { id: "weapons", name: "Armi", icon: GiSwordsPower },
  { id: "armor", name: "Armature", icon: GiArmorVest },
  { id: "shields", name: "Scudi", icon: GiShield },
];

const items = [
  {
    id: 1,
    name: "Spada Lunga",
    category: "weapons",
    period: "XIII-XV secolo",
    image: "https://images.unsplash.com/photo-1589987607627-0bb0b4d39c93?q=80&w=1600",
    description: "La spada lunga era l'arma principale dei cavalieri medievali, simbolo di nobiltà e potere.",
    details: [
      "Lunghezza totale: 120-150 cm",
      "Peso: 1.3-1.8 kg",
      "Impugnatura a due mani",
      "Lama affilata su entrambi i lati"
    ],
    icon: GiSwordsPower
  },
  {
    id: 2,
    name: "Armatura a Piastre",
    category: "armor",
    period: "XV secolo",
    image: "https://images.unsplash.com/photo-1562128755-08c1c5c15210?q=80&w=1600",
    description: "L'armatura a piastre rappresentava il massimo della protezione per i cavalieri medievali.",
    details: [
      "Peso totale: 20-25 kg",
      "Protezione completa del corpo",
      "Articolazioni mobili",
      "Acciaio temprato"
    ],
    icon: GiArmorVest
  },
  {
    id: 3,
    name: "Balestra da Guerra",
    category: "weapons",
    period: "XII-XV secolo",
    image: "https://images.unsplash.com/photo-1576615278693-f8e095e37e01?q=80&w=1600",
    description: "La balestra era un'arma potente che poteva penetrare le armature a grande distanza.",
    details: [
      "Gittata: 300-350 metri",
      "Meccanismo di caricamento",
      "Dardi in acciaio",
      "Alta precisione"
    ],
    icon: GiCrossbow
  },
  {
    id: 4,
    name: "Scudo Araldico",
    category: "shields",
    period: "XIII-XIV secolo",
    image: "https://images.unsplash.com/photo-1590419690008-905895e8fe0d?q=80&w=1600",
    description: "Lo scudo araldico non era solo protezione ma anche simbolo dell'identità del cavaliere.",
    details: [
      "Forma triangolare",
      "Decorazioni araldiche",
      "Legno rinforzato con metallo",
      "Dimensioni: 60x45 cm"
    ],
    icon: GiShield
  },
  {
    id: 5,
    name: "Bardatura da Guerra",
    category: "armor",
    period: "XIV-XV secolo",
    image: "https://images.unsplash.com/photo-1615859131861-052f0641a60e?q=80&w=1600",
    description: "La bardatura proteggeva il cavallo del cavaliere in battaglia.",
    details: [
      "Protezione completa del cavallo",
      "Piastre metalliche articolate",
      "Decorazioni araldiche",
      "Peso: 15-20 kg"
    ],
    icon: GiHorseHead
  },
  {
    id: 6,
    name: "Armatura da Torneo",
    category: "armor",
    period: "XV secolo",
    image: "https://images.unsplash.com/photo-1599834562135-b6fc90e642ca?q=80&w=1600",
    description: "Armatura specializzata per i tornei, più pesante e protettiva di quella da battaglia.",
    details: [
      "Peso: 25-30 kg",
      "Rinforzi speciali",
      "Decorazioni elaborate",
      "Visiera rinforzata"
    ],
    icon: GiArmorVest
  }
];

const ArmiArmature = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const cardsRef = useRef<HTMLDivElement>(null);

  const filteredItems = selectedCategory === "all" 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.item-card');
      
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
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      <MedievalPageHeader 
        title="ARMI E ARMATURE"
        subtitle="L'equipaggiamento dei guerrieri medievali"
        backgroundImage="https://images.unsplash.com/photo-1562128755-08c1c5c15210?q=80&w=2000"
      />

      {/* Categories */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                selectedCategory === category.id
                  ? "border-amber-500 bg-amber-500/20 text-amber-300"
                  : "border-amber-500/30 hover:border-amber-500/50 text-stone-300 hover:text-amber-200"
              }`}
            >
              <category.icon className="w-5 h-5" />
              <span className="font-medieval">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={cardsRef}>
          <AnimatePresence mode="wait">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                className="item-card"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-[#1a1a1a]/80 border border-amber-500/30 rounded-lg overflow-hidden hover:border-amber-500/50 transition-all duration-300 shadow-xl group">
                  {/* Image Section */}
                  <div className="relative h-64">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    
                    {/* Icon */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-amber-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-500/30">
                      <item.icon className="w-6 h-6 text-amber-300" />
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-amber-300 font-medieval text-2xl mb-2">{item.name}</h3>
                      <div className="text-stone-400">{item.period}</div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <p className="text-stone-300 mb-6">{item.description}</p>
                    
                    {/* Details */}
                    <div className="space-y-3">
                      <h4 className="text-amber-400 font-medieval text-lg mb-3">Caratteristiche:</h4>
                      {item.details.map((detail, i) => (
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
          </AnimatePresence>
        </div>
      </div>

      <MedievalFooter />
    </div>
  );
};

export default ArmiArmature; 