import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "wouter";
import TimelineItem from "@/components/TimelineItem";

// Assicuriamoci che ScrollTrigger sia registrato
gsap.registerPlugin(ScrollTrigger);

const medievalFacts = [
  {
    title: "Il Carnevale Medievale",
    description: "Durante il periodo medievale, il carnevale era una celebrazione straordinaria che vedeva nobili e popolani unirsi in festeggiamenti sfrenati. Per tre giorni, le rigide gerarchie sociali si dissolvevano in un turbinio di maschere, danze e rappresentazioni teatrali. I giullari intrattenevano le folle con acrobazie e canti satirici, mentre le strade si riempivano di profumi di spezie e dolci tipici. Questa tradizione rappresentava una vera e propria valvola di sfogo sociale, permettendo anche ai più umili di vivere momenti di spensierata allegria.",
    imageSrc: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200",
    imageAlt: "Maschere e costumi medievali durante il carnevale",
    imagePosition: "right"
  },
  {
    title: "Le Giostre dei Cavalieri",
    description: "I tornei cavallereschi erano molto più di semplici competizioni: rappresentavano veri e propri spettacoli di abilità, coraggio e nobiltà d'animo. I cavalieri, bardati nelle loro lucenti armature, si sfidavano in prove di destrezza che includevano non solo il classico duello con la lancia, ma anche tiro con l'arco a cavallo e complesse coreografie militari. Le dame della corte assistevano dalle tribune, lanciando i loro veli come segno di favore ai campioni preferiti. Questi eventi erano fondamentali per mantenere l'addestramento militare in tempo di pace.",
    imageSrc: "https://images.unsplash.com/photo-1490902931801-d6f80ca94fe4?q=80&w=1200",
    imageAlt: "Cavalieri in armatura durante un torneo medievale",
    imagePosition: "left"
  },
  {
    title: "L'Arte dei Mastri Vetrai",
    description: "Le vetrate delle cattedrali medievali non erano solo elementi decorativi, ma veri e propri libri illustrati per i fedeli che non sapevano leggere. I mastri vetrai svilupparono tecniche incredibilmente sofisticate per creare scene bibliche e agiografiche di straordinaria bellezza. Il processo di creazione richiedeva anni di apprendistato e una profonda conoscenza non solo delle tecniche artigianali, ma anche della simbologia religiosa. I colori vivaci e le composizioni complesse delle vetrate erano ottenuti attraverso l'aggiunta di minerali rari e preziosi al vetro fuso.",
    imageSrc: "https://images.unsplash.com/photo-1616606484004-5ef3cc46e39d?q=80&w=1200",
    imageAlt: "Vetrata medievale di una cattedrale",
    imagePosition: "right"
  },
  {
    title: "I Segreti degli Amanuensi",
    description: "Gli amanuensi medievali non erano semplici copisti, ma veri artisti e custodi del sapere. Nei loro scriptoria, illuminati dalla luce naturale o da candele, trascorrevano anni interi a copiare e decorare un singolo manoscritto. Le miniature che adornavano i codici erano realizzate con pigmenti preziosi come il lapislazzuli e l'oro in foglia. Ogni pagina era una composizione accuratamente pianificata, dove testo e immagine si fondevano in un'armonia perfetta. Molte delle tecniche di impaginazione moderne hanno origine proprio da queste antiche pratiche.",
    imageSrc: "https://images.unsplash.com/photo-1526314114033-349ef6f72220?q=80&w=1200",
    imageAlt: "Antico manoscritto miniato",
    imagePosition: "left"
  },
  {
    title: "La Vita nei Monasteri",
    description: "I monasteri medievali erano molto più che luoghi di preghiera: erano veri e propri centri di cultura, innovazione e preservazione del sapere. I monaci non si dedicavano solo alla preghiera e alla copiatura dei testi, ma anche alla sperimentazione agricola, alla produzione di birra e vino, e allo sviluppo di tecniche mediche avanzate. I giardini dei monasteri erano veri laboratori botanici, dove si coltivavano piante medicinali e si conducevano esperimenti per migliorare le tecniche di coltivazione. L'organizzazione della giornata monastica ha influenzato profondamente il nostro modo di concepire il tempo e il lavoro.",
    imageSrc: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1200",
    imageAlt: "Antico monastero medievale",
    imagePosition: "right"
  }
];

const Curiosities = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate header and title when page loads
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { 
          opacity: 0,
          y: -30
        },
        { 
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out"
        }
      );

      // Parallax effect for header background
      gsap.to(headerRef.current.querySelector('.bg-image'), {
        y: 50,
        ease: "none",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // Animate timeline items with improved effects
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      // Fade in and slide up animation
      gsap.fromTo(
        item,
        { 
          opacity: 0, 
          y: 50,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.2
        }
      );

      // Subtle parallax effect for images
      const image = item.querySelector('img');
      if (image) {
        gsap.to(image, {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    });

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d]">
      {/* Header con stile simile a Introduzione */}
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
          className="absolute inset-0 bg-cover bg-center bg-fixed z-0 bg-image"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1599627428518-55547ad812b9?q=80&w=2000")',
            filter: 'brightness(0.2)'
          }}
        ></div>
        
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-medieval text-amber-200 mb-4 tracking-wider"
              style={{
                textShadow: '0 0 20px rgba(210, 147, 38, 0.4), 0 0 40px rgba(210, 147, 38, 0.2), 0 0 60px rgba(210, 147, 38, 0.1)'
              }}>
            CURIOSITÀ MEDIEVALI
          </h1>
          <p className="text-stone-300 max-w-3xl mx-auto text-center font-medieval text-lg px-4">
            Esplora le stranezze, i misteri e le pratiche affascinanti dell'epoca medievale
          </p>
          <div className="w-24 h-1 bg-amber-200/50 mx-auto mt-4"></div>
        </div>
      </div>

      {/* Timeline Section */}
      <section className="py-16 bg-[#1a1a1a]/80">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto relative">
            {/* Decorative side elements */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-amber-200/5 via-amber-200/20 to-amber-200/5"></div>
            <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-amber-200/5 via-amber-200/20 to-amber-200/5"></div>
            
            {/* Timeline Items */}
            <div className="space-y-16">
              {medievalFacts.map((fact, index) => (
                <div key={index} className="timeline-item group">
                  {/* Decorative connector */}
                  <div className="absolute left-0 w-3 h-3 -ml-[7px] rounded-full bg-amber-200/50 shadow-glow-amber"></div>
                  
                  <div className="bg-gradient-to-br from-[#1a1a1a]/95 to-[#2a1a1a]/95 rounded-lg border border-amber-200/20 shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:border-amber-200/40 hover:scale-[1.02]">
                    <div className={`grid md:grid-cols-2 gap-8 items-center ${
                      fact.imagePosition === 'left' ? 'md:flex-row-reverse' : ''
                    }`}>
                      <div className="p-8 relative">
                        {/* Decorative corner */}
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-200/20 rounded-tl-lg"></div>
                        
                        <h3 className="text-3xl font-medieval text-amber-200 mb-6 relative">
                          {fact.title}
                          <div className="absolute -bottom-2 left-0 w-16 h-px bg-gradient-to-r from-amber-200/50 to-transparent"></div>
                        </h3>
                        <p className="text-stone-300 leading-relaxed">{fact.description}</p>
                        
                        {/* Decorative corner */}
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-200/20 rounded-br-lg"></div>
                      </div>
                      <div className="h-[300px] relative group-hover:scale-105 transition-transform duration-700">
                        <img 
                          src={fact.imageSrc} 
                          alt={fact.imageAlt}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Call to action */}
          <div className="text-center mt-16 relative">
            {/* Decorative elements */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-16 bg-gradient-to-b from-amber-200/20 to-transparent"></div>
            
            <h2 className="font-title text-3xl text-amber-200 mb-6 relative inline-block">
              Continua l'Esplorazione
              <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent"></div>
            </h2>
            
            <Link 
              href="/"
              className="inline-block px-8 py-4 mx-4 bg-gradient-to-r from-amber-200 to-amber-300 text-[#1a1a1a] border-2 border-amber-200/80 hover:from-amber-300 hover:to-amber-400 transition-all duration-300 font-medieval text-lg tracking-wide hover:scale-105 active:scale-95 shadow-lg hover:shadow-amber-200/20"
            >
              Torna all'Inizio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Curiosities;
