import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "wouter";

// Assicuriamoci che ScrollTrigger sia registrato
gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  imageSrc?: string;
}

const friendshipTimeline: TimelineEvent[] = [
  {
    year: "2005",
    title: "Primo Incontro",
    description: "Il nostro primo incontro alla fiera medievale di Montefiascone. Entrambi appassionati di storia medievale, ci siamo trovati nello stesso stand di libri antichi.",
    imageSrc: "https://images.unsplash.com/photo-1543357480-c60d0dc78091?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "2008",
    title: "Primo Viaggio Insieme",
    description: "Il nostro primo viaggio insieme alla scoperta dei castelli della Loira in Francia. Un'esperienza indimenticabile che ha cementato la nostra amicizia.",
    imageSrc: "https://images.unsplash.com/photo-1591105575839-1b77252d08bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "2012",
    title: "Fondazione del Club di Storia",
    description: "Abbiamo fondato insieme il 'Club degli Appassionati di Storia Medievale' nella nostra città, creando una comunità di persone con la nostra stessa passione.",
    imageSrc: "https://images.unsplash.com/photo-1551356277-d357c989300c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "2015",
    title: "Pubblicazione del Nostro Primo Libro",
    description: "Dopo anni di ricerca, abbiamo pubblicato il nostro primo libro insieme: 'Segreti e Leggende del Medioevo Italiano'.",
    imageSrc: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "2018",
    title: "Partecipazione al Festival Medievale",
    description: "Siamo stati invitati come relatori al prestigioso Festival Medievale di Monteriggioni, un riconoscimento importante per il nostro lavoro.",
    imageSrc: "https://images.unsplash.com/photo-1527168027773-0cc890c4f42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: "2022",
    title: "Creazione del Sito Web",
    description: "Abbiamo deciso di condividere la nostra passione con il mondo intero creando questo sito web, un progetto che ci sta molto a cuore.",
    imageSrc: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
      <section className="py-16 bg-charcoal/90 border-b border-secondary/30">
        <div className="container mx-auto px-4 pt-8">
          <h1 ref={titleRef} className="font-title text-4xl md:text-5xl text-secondary mb-6 text-center">
            Chi Siamo
          </h1>
          <p className="text-foreground max-w-3xl mx-auto text-center font-medieval text-lg">
            La storia della nostra amicizia e della nostra passione per il Medioevo
          </p>
        </div>
      </section>
      
      {/* About Us Content */}
      <section className="py-16 bg-charcoal/80">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-primary/90 rounded-lg overflow-hidden shadow-2xl border border-secondary/20 mb-16">
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
          <h2 className="font-title text-3xl text-secondary mb-12 text-center">La Linea del Tempo della Nostra Amicizia</h2>
          
          <div ref={timelineRef} className="relative timeline">
            {/* Center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-secondary/50"></div>
            
            {/* Timeline events */}
            {friendshipTimeline.map((event, index) => (
              <div 
                key={index} 
                className={`timeline-event flex mb-16 items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content side */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className={`p-6 parchment rounded-lg shadow-lg border border-secondary/20 ${
                    index % 2 === 0 ? 'ml-auto' : 'mr-auto'
                  }`}>
                    <div className="font-medieval text-xl text-primary mb-2">{event.year}</div>
                    <h3 className="font-title text-2xl text-charcoal mb-3">{event.title}</h3>
                    <p className="text-charcoal text-sm md:text-base">{event.description}</p>
                  </div>
                </div>
                
                {/* Center marker */}
                <div className="w-2/12 flex justify-center">
                  <div className="bg-secondary w-5 h-5 rounded-full border-4 border-primary z-10"></div>
                </div>
                
                {/* Image side */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                  {event.imageSrc && (
                    <img 
                      src={event.imageSrc} 
                      alt={event.title} 
                      className={`rounded-lg shadow-lg ${
                        index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                      } w-full max-w-xs object-cover h-48`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to action */}
          <div className="text-center mt-16">
            <Link 
              href="/curiosities"
              className="inline-block px-8 py-4 bg-primary text-foreground border-2 border-secondary hover:bg-primary/80 transition-all duration-300 font-medieval text-lg tracking-wide mr-4"
            >
              Esplora le Curiosità
            </Link>
            <Link 
              href="/"
              className="inline-block px-8 py-4 bg-charcoal text-foreground border-2 border-secondary hover:bg-charcoal/80 transition-all duration-300 font-medieval text-lg tracking-wide"
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