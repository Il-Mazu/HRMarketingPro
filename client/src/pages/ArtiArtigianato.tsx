import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { 
  GiAnvil,
  GiSewingNeedle,
  GiGlassShot,
  GiWoodFrame,
  GiLeatherBoot,
  GiHammerNails
} from "react-icons/gi";
import MedievalPageHeader from "@/components/medieval/MedievalPageHeader";
import MedievalFooter from "@/components/medieval/MedievalFooter";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: "all", name: "Tutte le Arti", icon: GiHammerNails },
  { id: "metal", name: "Lavorazione Metalli", icon: GiAnvil },
  { id: "textile", name: "Arte Tessile", icon: GiSewingNeedle },
  { id: "ceramics", name: "Ceramica", icon: GiGlassShot },
  { id: "woodwork", name: "Lavorazione Legno", icon: GiWoodFrame }
];

const crafts = [
  {
    id: 1,
    name: "Fabbro Medievale",
    category: "metal",
    period: "XII-XV secolo",
    image: "https://images.unsplash.com/photo-1620231150904-a86b9802656a?q=80&w=1600",
    description: "Il fabbro era uno degli artigiani più importanti nella società medievale, creando sia oggetti quotidiani che opere d'arte in metallo.",
    techniques: [
      "Forgiatura a caldo",
      "Martellatura",
      "Tempra dell'acciaio",
      "Decorazione metallica"
    ],
    products: [
      "Utensili agricoli",
      "Ferri di cavallo",
      "Serrature e chiavi",
      "Oggetti decorativi"
    ],
    icon: GiAnvil
  },
  {
    id: 2,
    name: "Arte della Tessitura",
    category: "textile",
    period: "XI-XV secolo",
    image: "https://images.unsplash.com/photo-1598867543269-d9d01df4e00a?q=80&w=1600",
    description: "La tessitura era un'arte fondamentale che produceva tessuti preziosi e arazzi decorativi per nobili e chiese.",
    techniques: [
      "Tessitura su telaio",
      "Tintura naturale",
      "Ricamo a mano",
      "Lavorazione della lana"
    ],
    products: [
      "Arazzi decorativi",
      "Tessuti pregiati",
      "Abbigliamento nobile",
      "Paramenti sacri"
    ],
    icon: GiSewingNeedle
  },
  {
    id: 3,
    name: "Ceramica Medievale",
    category: "ceramics",
    period: "X-XV secolo",
    image: "https://images.unsplash.com/photo-1590422749897-47036da0b0ff?q=80&w=1600",
    description: "L'arte della ceramica produceva sia oggetti utilitari che decorativi, con tecniche raffinate di smaltatura e decorazione.",
    techniques: [
      "Modellazione al tornio",
      "Smaltatura",
      "Cottura in forno",
      "Decorazione pittorica"
    ],
    products: [
      "Vasellame da tavola",
      "Brocche e anfore",
      "Piastrelle decorate",
      "Oggetti liturgici"
    ],
    icon: GiGlassShot
  },
  {
    id: 4,
    name: "Vetraio Medievale",
    category: "metal",
    period: "XII-XV secolo",
    image: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=1600",
    description: "I maestri vetrai creavano opere d'arte in vetro, dalle vetrate delle cattedrali agli oggetti quotidiani.",
    techniques: [
      "Soffiatura del vetro",
      "Colorazione con ossidi",
      "Piombatura",
      "Molatura"
    ],
    products: [
      "Vetrate istoriate",
      "Calici e bicchieri",
      "Lampade",
      "Specchi"
    ],
    icon: GiGlassShot
  },
  {
    id: 5,
    name: "Ebanisteria Medievale",
    category: "woodwork",
    period: "XI-XV secolo",
    image: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?q=80&w=1600",
    description: "Gli ebanisti medievali creavano mobili e oggetti in legno di alta qualità, spesso riccamente decorati.",
    techniques: [
      "Intaglio a mano",
      "Intarsio",
      "Tornitura",
      "Assemblaggio a incastro"
    ],
    products: [
      "Mobili decorati",
      "Cofanetti intarsiati",
      "Cornici scultoree",
      "Arredi ecclesiastici"
    ],
    icon: GiWoodFrame
  },
  {
    id: 6,
    name: "Arte del Cuoio",
    category: "textile",
    period: "XI-XV secolo",
    image: "https://images.unsplash.com/photo-1531010868489-02dfc2711d58?q=80&w=1600",
    description: "La lavorazione del cuoio era essenziale per la produzione di abbigliamento, armature e oggetti quotidiani.",
    techniques: [
      "Concia delle pelli",
      "Taglio e cucito",
      "Goffratura",
      "Decorazione a punzone"
    ],
    products: [
      "Calzature",
      "Cinture e borse",
      "Foderi per armi",
      "Rilegature di libri"
    ],
    icon: GiLeatherBoot
  }
];

const ArtiArtigianato = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const cardsRef = useRef<HTMLDivElement>(null);

  const filteredCrafts = selectedCategory === "all" 
    ? crafts 
    : crafts.filter(craft => craft.category === selectedCategory);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.craft-card');
      
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
        title="ARTI E ARTIGIANATO"
        subtitle="Le maestranze e le tecniche del Medioevo"
        backgroundImage="https://images.unsplash.com/photo-1620231150904-a86b9802656a?q=80&w=2000"
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

        {/* Crafts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={cardsRef}>
          <AnimatePresence mode="wait">
            {filteredCrafts.map((craft) => (
              <motion.div
                key={craft.id}
                className="craft-card"
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
                      src={craft.image} 
                      alt={craft.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    
                    {/* Icon */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-amber-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-500/30">
                      <craft.icon className="w-6 h-6 text-amber-300" />
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-amber-300 font-medieval text-2xl mb-2">{craft.name}</h3>
                      <div className="text-stone-400">{craft.period}</div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <p className="text-stone-300 mb-6">{craft.description}</p>
                    
                    {/* Techniques */}
                    <div className="space-y-3 mb-6">
                      <h4 className="text-amber-400 font-medieval text-lg mb-3">Tecniche:</h4>
                      {craft.techniques.map((technique, i) => (
                        <div 
                          key={i}
                          className="flex items-center space-x-3 group"
                        >
                          <div className="w-2 h-2 bg-amber-500/50 rounded-full group-hover:bg-amber-500 transition-colors duration-300"></div>
                          <p className="text-stone-300 group-hover:text-stone-200 transition-colors duration-300">{technique}</p>
                        </div>
                      ))}
                    </div>

                    {/* Products */}
                    <div className="space-y-3">
                      <h4 className="text-amber-400 font-medieval text-lg mb-3">Prodotti:</h4>
                      {craft.products.map((product, i) => (
                        <div 
                          key={i}
                          className="flex items-center space-x-3 group"
                        >
                          <div className="w-2 h-2 bg-amber-500/50 rounded-full group-hover:bg-amber-500 transition-colors duration-300"></div>
                          <p className="text-stone-300 group-hover:text-stone-200 transition-colors duration-300">{product}</p>
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

export default ArtiArtigianato; 