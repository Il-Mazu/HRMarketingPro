import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "wouter";
import TimelineItem from "@/components/TimelineItem";

// Assicuriamoci che ScrollTrigger sia registrato
gsap.registerPlugin(ScrollTrigger);

const medievalFacts = [
  {
    title: "La Festa dei Folli",
    description: "Durante il Medioevo esisteva una celebrazione annuale chiamata \"Festa dei Folli\" (Festum Fatuorum), in cui l'ordine sociale veniva temporaneamente sovvertito. I chierici di grado inferiore eleggevano un \"vescovo dei folli\" che parodiava le cerimonie ecclesiastiche, mentre la gente comune poteva prendere in giro la nobiltà senza conseguenze. Era un momento di sfogo sociale e di rovesciamento simbolico delle gerarchie, tollerato dalle autorità come \"valvola di sfogo\" per mantenere l'ordine durante il resto dell'anno.",
    imageSrc: "https://images.unsplash.com/photo-1577083553156-afa5e476e032?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Rappresentazione della Festa dei Folli",
    imagePosition: "right"
  },
  {
    title: "Processi agli Animali",
    description: "Nel Medioevo non era insolito che animali venissero processati con la stessa serietà degli esseri umani. Esistono documenti storici di processi contro maiali accusati di infanticidio, cavalli per omicidio, e persino insetti per danni ai raccolti. Questi processi seguivano le stesse procedure dei tribunali ordinari: agli animali veniva assegnato un avvocato difensore, si ascoltavano testimoni e si emetteva una sentenza formale. Le punizioni potevano includere l'impiccagione pubblica dell'animale \"colpevole\". Questi processi riflettevano la visione medievale di un universo morale che includeva tutte le creature.",
    imageSrc: "https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Rappresentazione di un tribunale medievale",
    imagePosition: "left"
  },
  {
    title: "Mangiare su Pane Invece dei Piatti",
    description: "Prima che l'uso dei piatti diventasse comune, i commensali medievali usavano una fetta di pane raffermo e piatto chiamato \"trencher\" come piatto commestibile. Il cibo veniva servito su questo \"piatto di pane\", che assorbiva i sughi e i condimenti durante il pasto. Al termine del banchetto, questo pane imbevuto poteva essere mangiato dal commensale se ancora affamato, donato ai poveri come elemosina, o dato ai cani. Questa pratica non solo riduceva la necessità di lavare i piatti ma rappresentava anche un modo efficiente per non sprecare cibo in un'epoca di frequenti carestie.",
    imageSrc: "https://images.unsplash.com/photo-1568877701346-0ded9d71a91c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Rappresentazione di pane medievale",
    imagePosition: "right"
  },
  {
    title: "L'Ora Medievale Variabile",
    description: "Nel Medioevo, il concetto di ora era molto diverso da quello attuale. Invece di avere ore di uguale durata tutto l'anno, il giorno era diviso in 12 ore diurne e 12 notturne, indipendentemente dalla stagione. Questo significava che in estate le ore diurne erano più lunghe di quelle notturne, mentre in inverno accadeva l'opposto. Un'ora estiva diurna poteva durare l'equivalente di 90 minuti moderni, mentre un'ora invernale notturna appena 30 minuti. Questa misurazione, chiamata \"ore temporali\" (horae temporales), era basata sui ritmi naturali e sull'osservazione del sole, piuttosto che su una misurazione meccanica uniforme.",
    imageSrc: "https://images.unsplash.com/photo-1508108712903-49b7ef9b1df8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Orologio medievale",
    imagePosition: "left"
  },
  {
    title: "Matrimoni Sotto la Grondaia",
    description: "Una curiosa pratica matrimoniale del tardo Medioevo era il \"matrimonio sotto la grondaia\". Quando una coppia non poteva permettersi le spese per una cerimonia formale o affrontare certi impedimenti legali, potevano sposarsi semplicemente stando sotto la grondaia di una chiesa durante la pioggia. L'acqua che cadeva dal tetto della chiesa (considerata benedetta) fungeva da benedizione per il loro matrimonio. Questi matrimoni, chiamati anche \"matrimoni per destitutionem\", erano considerati validi dalla comunità, sebbene non sempre riconosciuti ufficialmente dalle autorità ecclesiastiche. Questa pratica evidenzia come la gente comune adattasse le istituzioni formali alle proprie necessità.",
    imageSrc: "https://images.unsplash.com/photo-1588421357574-87938a86fa28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Chiesa medievale",
    imagePosition: "right"
  }
];

const Curiosities = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    // Animate title when page loads
    const title = titleRef.current;
    if (title) {
      const titleAnim = gsap.fromTo(
        title,
        { opacity: 0, y: -20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power2.out" 
        }
      );
      
      // Aggiungi animazione all'entrata degli elementi timeline
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2 + (index * 0.1),
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });
      
      return () => {
        // Clean up animations manually
        titleAnim.kill();
        
        // Clean up ScrollTrigger instances
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);
  
  return (
    <div>
      <div className="h-20"></div> {/* Spacer for fixed header */}
      
      {/* Hero Banner con sfondo della biblioteca medievale */}
      <section className="py-16 border-b border-secondary/30 relative">
        {/* Background */}
        <div className="absolute inset-0 z-0 bg-charcoal/70 bg-blend-multiply" 
             style={{
               backgroundImage: 'url("/images/curiosities-bg.svg"), url("/images/medieval-pattern.svg")',
               backgroundSize: 'cover, 300px',
               backgroundPosition: 'center, center',
               backgroundRepeat: 'no-repeat, repeat',
             }}>
          {/* Overlay vignette */}
          <div className="absolute inset-0" 
               style={{
                 background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.4) 100%)',
               }}>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pt-8 relative z-10">
          <h1 ref={titleRef} className="font-title text-4xl md:text-5xl text-secondary mb-6 text-center glow-text animate-fade-in-up">
            Curiosità Medievali
          </h1>
          <p className="text-foreground max-w-3xl mx-auto text-center font-medieval text-lg animate-fade-in-up" style={{animationDelay: '300ms'}}>
            Esplora le stranezze, i misteri e le pratiche affascinanti dell'epoca medievale
          </p>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-16 bg-charcoal/80">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto pl-8 relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary/50"></div>
            
            {/* Timeline Items con design originale migliorato */}
            {medievalFacts.map((fact, index) => (
              <TimelineItem
                key={index}
                title={fact.title}
                description={fact.description}
                imageSrc={fact.imageSrc}
                imageAlt={fact.imageAlt}
                imagePosition={fact.imagePosition as "left" | "right"}
                index={index}
              />
            ))}
          </div>
          
          {/* Call to action */}
          <div className="text-center mt-16">
            <Link 
              href="/"
              className="inline-block px-8 py-4 bg-primary text-foreground border-2 border-secondary hover:bg-primary/80 transition-all duration-300 font-medieval text-lg tracking-wide"
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
