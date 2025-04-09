import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { 
  GiWheat,
  GiMeat,
  GiWineGlass,
  GiHoneycomb,
  GiCook,
  GiFruitBowl
} from "react-icons/gi";
import MedievalPageHeader from "@/components/medieval/MedievalPageHeader";
import MedievalFooter from "@/components/medieval/MedievalFooter";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: "all", name: "Tutte le Categorie", icon: GiCook },
  { id: "main", name: "Piatti Principali", icon: GiMeat },
  { id: "side", name: "Contorni", icon: GiWheat },
  { id: "beverage", name: "Bevande", icon: GiWineGlass },
  { id: "dessert", name: "Dolci", icon: GiHoneycomb }
];

const dishes = [
  {
    id: 1,
    name: "Arrosto di Cinghiale",
    category: "main",
    period: "XIII-XV secolo",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600",
    description: "Piatto nobile per eccellenza, il cinghiale veniva cacciato nelle foreste e preparato con spezie pregiate.",
    ingredients: [
      "Carne di cinghiale",
      "Vino rosso",
      "Spezie orientali",
      "Erbe aromatiche"
    ],
    preparation: [
      "Marinatura nel vino",
      "Cottura lenta",
      "Aggiunta di spezie",
      "Servito con salsa"
    ],
    icon: GiMeat
  },
  {
    id: 2,
    name: "Zuppa di Cereali",
    category: "side",
    period: "X-XV secolo",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1600",
    description: "Base dell'alimentazione medievale, la zuppa di cereali era arricchita con verdure di stagione.",
    ingredients: [
      "Orzo",
      "Farro",
      "Verdure locali",
      "Erbe aromatiche"
    ],
    preparation: [
      "Cottura dei cereali",
      "Aggiunta verdure",
      "Insaporimento con erbe",
      "Servita calda"
    ],
    icon: GiWheat
  },
  {
    id: 3,
    name: "Idromele",
    category: "beverage",
    period: "XI-XV secolo",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1600",
    description: "Bevanda antica ottenuta dalla fermentazione del miele, molto apprezzata durante i banchetti.",
    ingredients: [
      "Miele puro",
      "Acqua di fonte",
      "Spezie",
      "Lieviti naturali"
    ],
    preparation: [
      "Diluizione del miele",
      "Fermentazione",
      "Aggiunta di spezie",
      "Invecchiamento"
    ],
    icon: GiWineGlass
  },
  {
    id: 4,
    name: "Torta di Mele e Miele",
    category: "dessert",
    period: "XII-XV secolo",
    image: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a7?q=80&w=1600",
    description: "Dolce tradizionale preparato con miele locale e mele, spesso servito durante le festività.",
    ingredients: [
      "Mele fresche",
      "Miele",
      "Farina di frumento",
      "Spezie dolci"
    ],
    preparation: [
      "Preparazione impasto",
      "Taglio delle mele",
      "Cottura al forno",
      "Glassatura al miele"
    ],
    icon: GiHoneycomb
  },
  {
    id: 5,
    name: "Pasticcio di Carne",
    category: "main",
    period: "XIII-XV secolo",
    image: "https://images.unsplash.com/photo-1605908580297-f3e1c02e64ff?q=80&w=1600",
    description: "Piatto sostanzioso che combinava carne, verdure e spezie in un involucro di pasta.",
    ingredients: [
      "Carne di manzo",
      "Verdure miste",
      "Pasta sfoglia",
      "Spezie varie"
    ],
    preparation: [
      "Preparazione del ripieno",
      "Stesura della pasta",
      "Assemblaggio",
      "Cottura in forno"
    ],
    icon: GiMeat
  },
  {
    id: 6,
    name: "Vino Speziato",
    category: "beverage",
    period: "XI-XV secolo",
    image: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?q=80&w=1600",
    description: "Bevanda calda a base di vino rosso, arricchita con miele e spezie orientali.",
    ingredients: [
      "Vino rosso",
      "Miele",
      "Cannella",
      "Chiodi di garofano"
    ],
    preparation: [
      "Riscaldamento del vino",
      "Aggiunta di spezie",
      "Dolcificazione",
      "Filtraggio"
    ],
    icon: GiWineGlass
  }
];

const Cibo = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const cardsRef = useRef<HTMLDivElement>(null);

  const filteredDishes = selectedCategory === "all" 
    ? dishes 
    : dishes.filter(dish => dish.category === selectedCategory);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.dish-card');
      
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
        title="GASTRONOMIA MEDIEVALE"
        subtitle="Sapori e tradizioni culinarie del Medioevo"
        backgroundImage="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2000"
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

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={cardsRef}>
          <AnimatePresence mode="wait">
            {filteredDishes.map((dish) => (
              <motion.div
                key={dish.id}
                className="dish-card"
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
                      src={dish.image} 
                      alt={dish.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    
                    {/* Icon */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-amber-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-500/30">
                      <dish.icon className="w-6 h-6 text-amber-300" />
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-amber-300 font-medieval text-2xl mb-2">{dish.name}</h3>
                      <div className="text-stone-400">{dish.period}</div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <p className="text-stone-300 mb-6">{dish.description}</p>
                    
                    {/* Ingredients */}
                    <div className="space-y-3 mb-6">
                      <h4 className="text-amber-400 font-medieval text-lg mb-3">Ingredienti:</h4>
                      {dish.ingredients.map((ingredient, i) => (
                        <div 
                          key={i}
                          className="flex items-center space-x-3 group"
                        >
                          <div className="w-2 h-2 bg-amber-500/50 rounded-full group-hover:bg-amber-500 transition-colors duration-300"></div>
                          <p className="text-stone-300 group-hover:text-stone-200 transition-colors duration-300">{ingredient}</p>
                        </div>
                      ))}
                    </div>

                    {/* Preparation */}
                    <div className="space-y-3">
                      <h4 className="text-amber-400 font-medieval text-lg mb-3">Preparazione:</h4>
                      {dish.preparation.map((step, i) => (
                        <div 
                          key={i}
                          className="flex items-center space-x-3 group"
                        >
                          <div className="w-2 h-2 bg-amber-500/50 rounded-full group-hover:bg-amber-500 transition-colors duration-300"></div>
                          <p className="text-stone-300 group-hover:text-stone-200 transition-colors duration-300">{step}</p>
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

export default Cibo; 