import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "wouter";
import TimelineItem from "../components/TimelineItem";

// Assicuriamoci che ScrollTrigger sia registrato
gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
}

const friendshipTimeline: TimelineEvent[] = [
  {
    title: "2005 - Primo Incontro",
    description: "Il nostro primo incontro alla fiera medievale di Montefiascone. Entrambi appassionati di storia medievale, ci siamo trovati nello stesso stand di libri antichi e abbiamo scoperto la nostra comune passione per i manoscritti medievali e la storia dei templari.",
    imageSrc: "/images/hero-bg.png",
    imageAlt: "Fiera medievale con libri antichi",
    imagePosition: "right",
  },
  {
    title: "2008 - Primo Viaggio Insieme",
    description: "Il nostro primo viaggio insieme alla scoperta dei castelli della Loira in Francia. Un'esperienza indimenticabile che ha cementato la nostra amicizia attraverso l'esplorazione di antiche fortezze, sale dei cavalieri e biblioteche storiche che custodiscono documenti risalenti al Medioevo.",
    imageSrc: "/images/hero-bg.png",
    imageAlt: "Castello medievale in Francia",
    imagePosition: "left",
  },
  {
    title: "2012 - Fondazione del Club di Storia",
    description: "Abbiamo fondato insieme il 'Club degli Appassionati di Storia Medievale' nella nostra città, creando una comunità di persone con la nostra stessa passione. Ogni mese organizziamo incontri tematici, visite guidate e laboratori pratici per riscoprire tecniche e tradizioni medievali.",
    imageSrc: "/images/hero-bg.png",
    imageAlt: "Persone riunite ad un evento storico",
    imagePosition: "right",
  },
  {
    title: "2015 - Pubblicazione del Nostro Primo Libro",
    description: "Dopo anni di ricerca in biblioteche e archivi storici, abbiamo pubblicato il nostro primo libro insieme: 'Segreti e Leggende del Medioevo Italiano'. Il volume raccoglie storie poco conosciute e curiosità sorprendenti che abbiamo scoperto durante i nostri viaggi attraverso borghi e castelli italiani.",
    imageSrc: "/images/hero-bg.png",
    imageAlt: "Libro antico su un tavolo in legno",
    imagePosition: "left",
  },
  {
    title: "2018 - Partecipazione al Festival Medievale",
    description: "Siamo stati invitati come relatori al prestigioso Festival Medievale di Monteriggioni, un riconoscimento importante per il nostro lavoro di divulgazione storica. La nostra conferenza sulle superstizioni e credenze popolari nel Medioevo ha attirato un pubblico numeroso e interessato.",
    imageSrc: "/images/hero-bg.png",
    imageAlt: "Festival medievale con bandiere e costumi d'epoca",
    imagePosition: "right",
  },
  {
    title: "2022 - Creazione del Sito Web",
    description: "Abbiamo deciso di condividere la nostra passione con il mondo intero creando questo sito web, un progetto che ci sta molto a cuore. Mysterium Medii Aevi rappresenta il culmine del nostro percorso insieme e uno strumento per divulgare la ricchezza culturale di un'epoca affascinante e complessa.",
    imageSrc: "/images/hero-bg.png",
    imageAlt: "Computer moderno con contenuti medievali",
    imagePosition: "left",
  }
];

const ChiSiamo = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate title when page loads
    const title = titleRef.current;
    if (title) {
      gsap.fromTo(
        title,
        { opacity: 0, y: -20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power2.out" 
        }
      );
    }
    
    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-event');
    if (timelineItems.length > 0) {
      timelineItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              toggleActions: "play none none none"
            },
            delay: 0.1 * index
          }
        );
      });
    }
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div>
      <div className="h-20"></div> {/* Spacer for fixed header */}
      
      {/* Hero Banner */}
      <section className="py-16 bg-gradient-to-b from-charcoal to-charcoal/80 border-b border-secondary/20">
        <div className="container mx-auto px-4 pt-8">
          <h1 ref={titleRef} className="font-title text-4xl md:text-6xl text-secondary mb-6 text-center glow-text">
            Chi Siamo
          </h1>
          <p className="text-foreground max-w-3xl mx-auto text-center font-medieval text-xl leading-relaxed">
            La storia della nostra amicizia e della nostra passione per il Medioevo
          </p>
        </div>
      </section>
      
      {/* About Us Content */}
      <section className="py-16 bg-charcoal/80">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl mb-16 transform hover:scale-[1.01] transition-all duration-500">
            <div className="p-8 md:p-12 parchment">
              <h2 className="font-medieval text-3xl text-primary mb-6 text-center">La Nostra Storia</h2>
              
              <div className="medieval-divider mb-8"></div>
              
              <p className="medieval-initials text-charcoal mb-6 leading-relaxed">
                Siamo due amici uniti da una passione comune: il Medioevo in tutte le sue sfaccettature. La nostra amicizia è nata più di quindici anni fa durante una fiera del libro antico, quando entrambi ci siamo ritrovati a sfogliare la stessa copia di un raro testo sulle leggende medievali italiane.
              </p>
              
              <p className="text-charcoal mb-6 leading-relaxed">
                Da quel momento, abbiamo condiviso innumerevoli avventure: viaggi alla scoperta di castelli dimenticati, partecipazioni a festival medievali in costume, lunghe notti passate a discutere di storia e leggende. La nostra passione ci ha portato a fondare un club locale di appassionati di storia medievale e, più recentemente, a creare questo sito web.
              </p>
              
              <p className="text-charcoal leading-relaxed">
                Attraverso questo progetto, vogliamo condividere con voi le curiosità, le stranezze e le meraviglie del Medioevo che abbiamo scoperto nel nostro percorso. Crediamo che questo periodo storico, spesso frainteso, abbia molto da insegnare al mondo contemporaneo e meriti di essere esplorato con occhi nuovi.
              </p>
            </div>
          </div>
          
          {/* Interactive Timeline */}
          <div className="max-w-5xl mx-auto">
            <h2 className="font-title text-3xl md:text-4xl text-secondary mb-12 text-center glow-text">
              La Linea del Tempo della Nostra Amicizia
            </h2>
            
            <div ref={timelineRef} className="relative pl-6 border-l-2 border-secondary/50 mb-16">
              {friendshipTimeline.map((event, index) => (
                <TimelineItem
                  key={index}
                  title={event.title}
                  description={event.description}
                  imageSrc={event.imageSrc}
                  imageAlt={event.imageAlt}
                  imagePosition={event.imagePosition}
                  index={index}
                />
              ))}
            </div>
          </div>
          
          {/* Call to action */}
          <div className="text-center mt-16">
            <Link 
              href="/curiosities"
              className="inline-block px-8 py-4 bg-primary text-foreground border-2 border-secondary hover:bg-primary/80 transition-all duration-300 font-medieval text-lg tracking-wide mr-4 hover:scale-105 active:scale-95"
            >
              Esplora le Curiosità
            </Link>
            <Link 
              href="/"
              className="inline-block px-8 py-4 bg-charcoal text-foreground border-2 border-secondary hover:bg-charcoal/80 transition-all duration-300 font-medieval text-lg tracking-wide hover:scale-105 active:scale-95"
            >
              Torna all'Inizio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChiSiamo;