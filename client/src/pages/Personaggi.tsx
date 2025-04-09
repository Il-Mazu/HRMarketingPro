import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import MedievalPageHeader from "@/components/medieval/MedievalPageHeader";
import MedievalFooter from "@/components/medieval/MedievalFooter";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const characters = [
  {
    name: "Carlo Magno",
    title: "Re dei Franchi e Imperatore",
    years: "742-814 d.C.",
    description: "Unificatore dell'Europa occidentale e fondatore del Sacro Romano Impero. La sua corte divenne un centro di rinascita culturale.",
    image: "https://images.unsplash.com/photo-1578321272066-408f83ecf53a?q=80&w=1600",
    achievements: [
      "Conquista e unificazione di vasti territori",
      "Promozione dell'istruzione e della cultura",
      "Riforma amministrativa e monetaria"
    ]
  },
  {
    name: "Giovanna d'Arco",
    title: "La Pulzella d'Orléans",
    years: "1412-1431 d.C.",
    description: "Eroina nazionale francese che guidò l'esercito durante la Guerra dei Cent'anni. Le sue visioni e il suo coraggio ispirarono la nazione.",
    image: "https://images.unsplash.com/photo-1599627446523-fe226fb49554?q=80&w=1600",
    achievements: [
      "Liberazione di Orléans",
      "Incoronazione di Carlo VII",
      "Simbolo di resistenza nazionale"
    ]
  },
  {
    name: "Federico II",
    title: "Stupor Mundi",
    years: "1194-1250 d.C.",
    description: "Imperatore del Sacro Romano Impero, re di Sicilia e Gerusalemme. Uomo di straordinaria cultura e promotore delle arti e delle scienze.",
    image: "https://images.unsplash.com/photo-1599627446610-995c8d2df1a9?q=80&w=1600",
    achievements: [
      "Fondazione dell'Università di Napoli",
      "Promozione della cultura multilingue",
      "Codificazione delle leggi"
    ]
  },
  {
    name: "Eleanor di Aquitania",
    title: "Regina di Francia e Inghilterra",
    years: "1122-1204 d.C.",
    description: "Una delle donne più potenti del Medioevo, patrona delle arti e della cultura cortese. Regina consorte sia di Francia che d'Inghilterra.",
    image: "https://images.unsplash.com/photo-1578321272028-f80cf9b60e21?q=80&w=1600",
    achievements: [
      "Promozione della cultura cortese",
      "Gestione di vasti territori",
      "Influenza politica internazionale"
    ]
  }
];

const Personaggi = () => {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.character-card');
      
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
        title="PERSONAGGI ILLUSTRI"
        subtitle="Le figure che hanno plasmato il Medioevo"
        backgroundImage="https://images.unsplash.com/photo-1599627446523-fe226fb49554?q=80&w=2000"
      />

      {/* Characters Grid */}
      <div className="container mx-auto px-4 py-16" ref={cardsRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {characters.map((character, index) => (
            <motion.div
              key={character.name}
              className="character-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="bg-[#1a1a1a]/80 border border-amber-500/30 rounded-lg overflow-hidden hover:border-amber-500/50 transition-all duration-300 shadow-xl group">
                {/* Image Section */}
                <div className="relative h-64">
                  <img 
                    src={character.image} 
                    alt={character.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-amber-300 font-medieval text-3xl mb-2">{character.name}</h3>
                    <p className="text-amber-200/80 font-medieval">{character.title}</p>
                    <p className="text-stone-400 text-sm">{character.years}</p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <p className="text-stone-300 mb-6">{character.description}</p>
                  
                  {/* Achievements */}
                  <div className="space-y-3">
                    <h4 className="text-amber-400 font-medieval text-lg mb-3">Principali Conseguimenti:</h4>
                    {character.achievements.map((achievement, i) => (
                      <div 
                        key={i}
                        className="flex items-center space-x-3 group"
                      >
                        <div className="w-2 h-2 bg-amber-500/50 rounded-full group-hover:bg-amber-500 transition-colors duration-300"></div>
                        <p className="text-stone-300 group-hover:text-stone-200 transition-colors duration-300">{achievement}</p>
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

export default Personaggi; 