import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import MedievalPageHeader from "@/components/medieval/MedievalPageHeader";
import MedievalFooter from "@/components/medieval/MedievalFooter";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    year: "476 d.C.",
    title: "Caduta dell'Impero Romano d'Occidente",
    description: "La deposizione dell'ultimo imperatore romano Romolo Augustolo segna convenzionalmente l'inizio del Medioevo.",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1600"
  },
  {
    year: "800 d.C.",
    title: "Incoronazione di Carlo Magno",
    description: "Carlo Magno viene incoronato Imperatore del Sacro Romano Impero da Papa Leone III, segnando la nascita di una nuova era imperiale.",
    image: "https://images.unsplash.com/photo-1548248823-ce16a73b6d49?q=80&w=1600"
  },
  {
    year: "1066 d.C.",
    title: "Battaglia di Hastings",
    description: "Guglielmo il Conquistatore sconfigge Harold Godwinson, cambiando per sempre il corso della storia inglese.",
    image: "https://images.unsplash.com/photo-1599627446523-fe226fb49554?q=80&w=1600"
  },
  {
    year: "1096 d.C.",
    title: "Prima Crociata",
    description: "Inizia la Prima Crociata, che porterà alla conquista di Gerusalemme e alla fondazione degli Stati Crociati.",
    image: "https://images.unsplash.com/photo-1619008340437-99c9dd0fccf8?q=80&w=1600"
  },
  {
    year: "1215 d.C.",
    title: "Magna Carta",
    description: "Re Giovanni d'Inghilterra firma la Magna Carta, limitando il potere reale e ponendo le basi per il costituzionalismo moderno.",
    image: "https://images.unsplash.com/photo-1532188363366-3a1b2ac4a338?q=80&w=1600"
  }
];

const Avvenimenti = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timelineRef.current) {
      const events = timelineRef.current.querySelectorAll('.timeline-event');
      
      events.forEach((event, index) => {
        gsap.fromTo(
          event,
          { 
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            scale: 0.9
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            scrollTrigger: {
              trigger: event,
              start: "top bottom-=100",
              end: "top center",
              toggleActions: "play none none reverse"
            }
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
        title="AVVENIMENTI IMPORTANTI"
        subtitle="I momenti che hanno plasmato il Medioevo"
        backgroundImage="https://images.unsplash.com/photo-1562239058-2878729e9ad4?q=80&w=2000"
      />

      {/* Timeline Section */}
      <div className="container mx-auto px-4 py-16" ref={timelineRef}>
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-500/30 via-amber-500/20 to-transparent"></div>

          {/* Timeline Events */}
          {timelineEvents.map((event, index) => (
            <div 
              key={event.year}
              className={`timeline-event relative flex items-center mb-16 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Event Content */}
              <motion.div 
                className="w-1/2 p-6"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-[#1a1a1a]/80 border border-amber-500/30 p-6 rounded-lg shadow-xl hover:border-amber-500/50 transition-all duration-300">
                  <h3 className="text-amber-400 font-medieval text-2xl mb-2">{event.year}</h3>
                  <h4 className="text-amber-200 font-medieval text-xl mb-4">{event.title}</h4>
                  <p className="text-stone-300">{event.description}</p>
                </div>
              </motion.div>

              {/* Center Point */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4">
                <div className="w-full h-full bg-amber-500 rounded-full"></div>
                <div className="absolute w-8 h-8 bg-amber-500/30 rounded-full -left-2 -top-2 animate-pulse"></div>
              </div>

              {/* Event Image */}
              <motion.div 
                className="w-1/2 p-6"
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <MedievalFooter />
    </div>
  );
};

export default Avvenimenti; 