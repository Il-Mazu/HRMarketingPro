import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GiPaintBrush, 
  GiWindow, 
  GiScrollUnfurled, 
  GiStoneCrafting,
  GiPaintRoller,
  GiChurch
} from "react-icons/gi";
import MedievalPageHeader from "@/components/medieval/MedievalPageHeader";
import MedievalFooter from "@/components/medieval/MedievalFooter";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const artCategories = [
  { id: "all", name: "Tutte le Opere", icon: GiPaintBrush },
  { id: "painting", name: "Pittura", icon: GiPaintRoller },
  { id: "stained-glass", name: "Vetrate", icon: GiWindow },
  { id: "manuscript", name: "Manoscritti", icon: GiScrollUnfurled },
  { id: "sculpture", name: "Scultura", icon: GiStoneCrafting },
];

const artworks = [
  {
    id: 1,
    title: "L'Annunciazione",
    artist: "Simone Martini",
    year: "1333",
    category: "painting",
    image: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=1600",
    description: "Capolavoro della pittura gotica senese, caratterizzato da un uso raffinato dell'oro e dettagli eleganti.",
    technique: "Tempera e oro su tavola",
    icon: GiPaintRoller
  },
  {
    id: 2,
    title: "Vetrata della Cattedrale di Chartres",
    artist: "Maestri Vetrai Medievali",
    year: "XIII secolo",
    category: "stained-glass",
    image: "https://images.unsplash.com/photo-1548743155-f9c7a27467b8?q=80&w=1600",
    description: "Una delle più belle vetrate gotiche, che racconta storie bibliche attraverso un uso magistrale del colore.",
    technique: "Vetrata policroma",
    icon: GiWindow
  },
  {
    id: 3,
    title: "Libro di Kells",
    artist: "Monaci Irlandesi",
    year: "800 circa",
    category: "manuscript",
    image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=1600",
    description: "Manoscritto miniato considerato il più importante esempio dell'arte insulare.",
    technique: "Pergamena miniata",
    icon: GiScrollUnfurled
  },
  {
    id: 4,
    title: "Portale Ovest di Chartres",
    artist: "Scultori Gotici",
    year: "1145-1155",
    category: "sculpture",
    image: "https://images.unsplash.com/photo-1548345680-f5475ea5df84?q=80&w=1600",
    description: "Esempio magnifico della scultura romanica, con figure allungate e dettagli simbolici.",
    technique: "Scultura in pietra",
    icon: GiStoneCrafting
  },
  {
    id: 5,
    title: "Madonna col Bambino",
    artist: "Giotto",
    year: "1310 circa",
    category: "painting",
    image: "https://images.unsplash.com/photo-1578301978069-45264734cddc?q=80&w=1600",
    description: "Opera rivoluzionaria che segna il passaggio dalla pittura bizantina a quella rinascimentale.",
    technique: "Tempera su tavola",
    icon: GiPaintRoller
  },
  {
    id: 6,
    title: "Rosone di Notre-Dame",
    artist: "Maestri Vetrai",
    year: "XIII secolo",
    category: "stained-glass",
    image: "https://images.unsplash.com/photo-1541447271487-09612b3f49f7?q=80&w=1600",
    description: "Magnifico esempio di rosone gotico, simbolo della luce divina.",
    technique: "Vetrata policroma",
    icon: GiChurch
  }
];

const Arte = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const galleryRef = useRef<HTMLDivElement>(null);

  const filteredArtworks = selectedCategory === "all" 
    ? artworks 
    : artworks.filter(artwork => artwork.category === selectedCategory);

  useEffect(() => {
    if (galleryRef.current) {
      const cards = galleryRef.current.querySelectorAll('.artwork-card');
      
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
        title="ARTE MEDIEVALE"
        subtitle="Un viaggio attraverso i capolavori del Medioevo"
        backgroundImage="https://images.unsplash.com/photo-1578301978069-45264734cddc?q=80&w=2000"
      />

      {/* Categories */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {artCategories.map((category) => (
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={galleryRef}>
          <AnimatePresence mode="wait">
            {filteredArtworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                className="artwork-card"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-[#1a1a1a]/80 border border-amber-500/30 rounded-lg overflow-hidden hover:border-amber-500/50 transition-all duration-300 shadow-xl group">
                  {/* Image */}
                  <div className="relative h-64">
                    <img 
                      src={artwork.image} 
                      alt={artwork.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    
                    {/* Title Section */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-amber-300 font-medieval text-2xl mb-2">{artwork.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-amber-200/80">{artwork.artist}</span>
                        <span className="text-stone-400">•</span>
                        <span className="text-stone-400">{artwork.year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-stone-300 mb-4">{artwork.description}</p>
                    <div className="text-amber-400/80 text-sm">
                      Tecnica: {artwork.technique}
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

export default Arte; 