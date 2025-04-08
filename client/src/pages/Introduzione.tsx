import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "wouter";
import { motion } from "framer-motion";
import MedievalFeatureCard from "../components/medieval/MedievalFeatureCard";
import MedievalTimeline from "../components/medieval/MedievalTimeline";
import MedievalMap from "../components/medieval/MedievalMap";
import MedievalIcon from "../components/medieval/MedievalIcon";

gsap.registerPlugin(ScrollTrigger);

const Introduzione = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });
    
    if (headerRef.current) {
      timeline.fromTo(
        headerRef.current,
        { 
          opacity: 0,
          y: -50
        },
        { 
          opacity: 1,
          y: 0,
          duration: 1.2
        }
      );
    }

    // Animazione per gli elementi del contenuto
    if (contentRef.current) {
      const cards = contentRef.current.querySelectorAll('.medieval-card');
      const images = contentRef.current.querySelectorAll('.medieval-image');
      
      timeline.fromTo(
        cards,
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
          stagger: 0.2
        },
        "-=0.5"
      );

      timeline.fromTo(
        images,
        {
          opacity: 0,
          x: -30,
          scale: 0.95
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2
        },
        "-=0.8"
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d]">
      {/* Header con stile simile a Curiosità */}
      <div 
        ref={headerRef}
        className="relative h-[300px] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(45, 45, 45, 0.9))',
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)'
        }}
      >
        {/* Immagine di sfondo con effetto parallasse */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1562239058-2878729e9ad4?q=80&w=2000")',
            filter: 'brightness(0.2)'
          }}
        ></div>
        
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-medieval text-amber-200 mb-4 tracking-wider"
              style={{
                textShadow: '0 0 20px rgba(210, 147, 38, 0.4), 0 0 40px rgba(210, 147, 38, 0.2), 0 0 60px rgba(210, 147, 38, 0.1)'
              }}>
            INTRODUZIONE AL MEDIOEVO
          </h1>
          <p className="text-stone-300 max-w-3xl mx-auto text-center font-medieval text-lg px-4">
            Un viaggio nel cuore dell'epoca che ha forgiato l'Europa moderna
          </p>
          <div className="w-24 h-1 bg-amber-200/50 mx-auto mt-4"></div>
        </div>
      </div>

      {/* Contenuto principale */}
      <div ref={contentRef} className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Prima sezione con immagine e testo */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
            <motion.div 
              className="medieval-card bg-[#1a1a1a]/95 p-8 rounded-lg border border-amber-200/20 shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-medieval text-amber-200 mb-6">L'Alba di un'Era</h2>
              <p className="text-stone-300 leading-relaxed mb-4">
                Il Medioevo, periodo storico che si estende per oltre mille anni, ha visto la nascita delle istituzioni e delle tradizioni che ancora oggi caratterizzano la società europea. Dalle ceneri dell'Impero Romano emerse un nuovo ordine sociale, politico e culturale che avrebbe plasmato il futuro del continente.
              </p>
              <p className="text-stone-300 leading-relaxed">
                In questo periodo di straordinaria complessità, arte, scienza e spiritualità si intrecciarono in modi unici, creando un patrimonio culturale di inestimabile valore che continua a affascinarci e ispirarci.
              </p>
            </motion.div>
            <div className="medieval-image rounded-lg overflow-hidden shadow-xl border border-amber-200/20">
              <img 
                src="https://images.unsplash.com/photo-1584727638096-042c45049ebe?q=80&w=1200" 
                alt="Antica cattedrale gotica" 
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Seconda sezione con citazione */}
          <motion.div 
            className="mb-16 text-center p-8 bg-[#1a1a1a]/95 rounded-lg border border-amber-200/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.blockquote 
              className="text-2xl font-medieval text-amber-200/90 italic mb-4"
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              "Il Medioevo è come un grande libro illustrato della vita umana, dove ogni pagina rivela una nuova meraviglia dell'ingegno e dello spirito."
            </motion.blockquote>
            <motion.p 
              className="text-stone-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              — Cronache Medievali
            </motion.p>
          </motion.div>

          {/* Terza sezione con immagine e testo invertiti */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
            <div className="medieval-image rounded-lg overflow-hidden shadow-xl border border-amber-200/20 order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1541340072-8e975925b1b7?q=80&w=1200" 
                alt="Antico scriptorium monastico" 
                className="w-full h-[400px] object-cover"
              />
            </div>
            <motion.div 
              className="medieval-card bg-[#1a1a1a]/95 p-8 rounded-lg border border-amber-200/20 shadow-lg order-1 md:order-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-medieval text-amber-200 mb-6">Custodi del Sapere</h2>
              <p className="text-stone-300 leading-relaxed mb-4">
                I monasteri medievali furono molto più che semplici luoghi di preghiera: divennero veri e propri centri di preservazione e trasmissione della conoscenza. Nei loro scriptoria, i monaci copiavano pazientemente antichi testi, salvando dall'oblio il sapere classico.
              </p>
              <p className="text-stone-300 leading-relaxed">
                Questi centri di studio e ricerca gettarono le basi per la nascita delle prime università europee, istituzioni che ancora oggi sono pilastri fondamentali della nostra società.
              </p>
            </motion.div>
          </div>

          {/* Timeline Section */}
          <div className="mb-16">
            <MedievalTimeline
              events={[
                { 
                  period: "Caduta dell'Impero",
                  year: "476 d.C.",
                  description: "Deposizione dell'ultimo imperatore romano d'Occidente, Romolo Augustolo."
                },
                { 
                  period: "Regno Carolingio",
                  year: "768 - 814",
                  description: "Carlo Magno viene incoronato imperatore del Sacro Romano Impero."
                },
                { 
                  period: "Anno Mille",
                  year: "1000 d.C.",
                  description: "Ripresa demografica e sviluppo delle città medievali."
                },
                { 
                  period: "Prima Crociata",
                  year: "1096 - 1099",
                  description: "Spedizione militare per la liberazione di Gerusalemme."
                },
                { 
                  period: "Magna Carta",
                  year: "1215",
                  description: "Documento fondamentale che limita il potere del re d'Inghilterra."
                },
                { 
                  period: "Peste Nera",
                  year: "1347 - 1351",
                  description: "La pandemia più devastante della storia europea medievale."
                },
                { 
                  period: "Fine del Medioevo",
                  year: "1492",
                  description: "La scoperta dell'America segna l'inizio dell'età moderna."
                }
              ]}
            />
          </div>

          {/* Map Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-medieval text-amber-200 mb-8 text-center">Regni Medievali</h2>
            <div className="relative rounded-lg overflow-hidden border border-amber-200/20">
              {/* Medieval Map Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                  backgroundImage: 'url("/images/medieval-map.jpg")',
                  filter: 'sepia(100%) brightness(0.3)'
                }}
              />
              <MedievalMap
                kingdoms={[
                  {
                    id: "francia",
                    name: "Francia",
                    icon: "fleurDeLis",
                    color: "border-amber-600",
                    position: { x: 30, y: 30 },
                    description: "Regno dei Franchi, culla della cavalleria e dell'arte gotica"
                  },
                  {
                    id: "germania",
                    name: "Germania",
                    icon: "crown",
                    color: "border-amber-700",
                    position: { x: 55, y: 25 },
                    description: "Sacro Romano Impero, potenza centrale dell'Europa medievale"
                  },
                  {
                    id: "italia",
                    name: "Italia",
                    icon: "column",
                    color: "border-amber-500",
                    position: { x: 45, y: 45 },
                    description: "Terra dei comuni e delle repubbliche marinare"
                  },
                  {
                    id: "spagna",
                    name: "Spagna",
                    icon: "crown",
                    color: "border-amber-600",
                    position: { x: 20, y: 45 },
                    description: "Regno della Reconquista e dell'incontro tra culture"
                  }
                ]}
              />
            </div>
          </div>

          {/* Feature Cards Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="flex-1">
              <MedievalFeatureCard
                icon={<MedievalIcon type="sword" className="w-12 h-12 transform rotate-45" />}
                title="Società Feudale"
                description="La struttura sociale del Medioevo, basata su legami di fedeltà e protezione, ha influenzato profondamente lo sviluppo delle istituzioni europee."
              />
            </div>
            <div className="flex-1">
              <MedievalFeatureCard
                icon={<MedievalIcon type="castle" className="w-12 h-12" />}
                title="Arte e Architettura"
                description="Le cattedrali gotiche e i castelli medievali testimoniano l'incredibile maestria degli artigiani e architetti dell'epoca."
              />
            </div>
            <div className="flex-1">
              <MedievalFeatureCard
                icon={<MedievalIcon type="scroll" className="w-12 h-12" />}
                title="Cultura e Sapere"
                description="La rinascita culturale del Medioevo pose le basi per il successivo sviluppo del Rinascimento e dell'età moderna."
              />
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center">
            <Link href="/curiosita">
              <motion.button 
                className="px-8 py-4 bg-amber-200 text-[#1a1a1a] rounded-lg font-medieval text-lg hover:bg-amber-300 transition-colors duration-300 border-2 border-amber-200/80"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Esplora le Curiosità Medievali
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduzione; 