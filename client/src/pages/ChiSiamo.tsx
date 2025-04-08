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
    imageSrc: "/images/medieval-castle-bg.svg",
    imageAlt: "Fiera medievale con libri antichi",
    imagePosition: "right",
  },
  {
    title: "2008 - Primo Viaggio Insieme",
    description: "Il nostro primo viaggio insieme alla scoperta dei castelli della Loira in Francia. Un'esperienza indimenticabile che ha cementato la nostra amicizia attraverso l'esplorazione di antiche fortezze, sale dei cavalieri e biblioteche storiche che custodiscono documenti risalenti al Medioevo.",
    imageSrc: "/images/monastery-bg.svg",
    imageAlt: "Castello medievale in Francia",
    imagePosition: "left",
  },
  {
    title: "2012 - Fondazione del Club di Storia",
    description: "Abbiamo fondato insieme il 'Club degli Appassionati di Storia Medievale' nella nostra città, creando una comunità di persone con la nostra stessa passione. Ogni mese organizziamo incontri tematici, visite guidate e laboratori pratici per riscoprire tecniche e tradizioni medievali.",
    imageSrc: "/images/medieval-castle-bg.svg",
    imageAlt: "Persone riunite ad un evento storico",
    imagePosition: "right",
  },
  {
    title: "2015 - Pubblicazione del Nostro Primo Libro",
    description: "Dopo anni di ricerca in biblioteche e archivi storici, abbiamo pubblicato il nostro primo libro insieme: 'Segreti e Leggende del Medioevo Italiano'. Il volume raccoglie storie poco conosciute e curiosità sorprendenti che abbiamo scoperto durante i nostri viaggi attraverso borghi e castelli italiani.",
    imageSrc: "/images/parchment-texture.svg",
    imageAlt: "Libro antico su un tavolo in legno",
    imagePosition: "left",
  },
  {
    title: "2018 - Partecipazione al Festival Medievale",
    description: "Siamo stati invitati come relatori al prestigioso Festival Medievale di Monteriggioni, un riconoscimento importante per il nostro lavoro di divulgazione storica. La nostra conferenza sulle superstizioni e credenze popolari nel Medioevo ha attirato un pubblico numeroso e interessato.",
    imageSrc: "/images/monastery-bg.svg",
    imageAlt: "Festival medievale con bandiere e costumi d'epoca",
    imagePosition: "right",
  },
  {
    title: "2022 - Creazione del Sito Web",
    description: "Abbiamo deciso di condividere la nostra passione con il mondo intero creando questo sito web, un progetto che ci sta molto a cuore. Mysterium Medii Aevi rappresenta il culmine del nostro percorso insieme e uno strumento per divulgare la ricchezza culturale di un'epoca affascinante e complessa.",
    imageSrc: "/images/medieval-pattern.svg",
    imageAlt: "Computer moderno con contenuti medievali",
    imagePosition: "left",
  }
];

const ChiSiamo = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate title when page loads - migliorato con effetto di scale e glow
    const title = titleRef.current;
    const animations: (gsap.core.Tween | gsap.core.Timeline)[] = [];
    
    if (title) {
      const titleAnim = gsap.fromTo(
        title,
        { 
          opacity: 0, 
          y: -30, 
          scale: 0.9,
          textShadow: "0 0 0 rgba(0,0,0,0)"
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          textShadow: "0 0 15px rgba(210, 147, 38, 0.4), 0 0 30px rgba(210, 147, 38, 0.2)",
          duration: 1.2, 
          ease: "back.out(1.7)" 
        }
      );
      animations.push(titleAnim);
    }
    
    // Crea una linea del tempo animata
    const timelineEl = timelineRef.current;
    if (timelineEl) {
      // Animazione della linea verticale che cresce
      gsap.fromTo(
        timelineEl,
        { 
          borderLeftWidth: '2px',
          borderLeftColor: 'rgba(210, 147, 38, 0.1)',
          height: '0%'
        },
        {
          height: '100%',
          borderLeftColor: 'rgba(210, 147, 38, 0.5)',
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: timelineEl,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1
          }
        }
      );
      
      // Aggiungi punti luminosi che si accendono mentre scorri
      const timelineDots = document.querySelectorAll('.timeline-marker');
      timelineDots.forEach((dot, index) => {
        gsap.fromTo(
          dot,
          { 
            scale: 0,
            opacity: 0,
            boxShadow: '0 0 0 0 rgba(210, 147, 38, 0)'
          },
          {
            scale: 1,
            opacity: 1,
            boxShadow: '0 0 10px 2px rgba(210, 147, 38, 0.5)',
            duration: 0.5,
            scrollTrigger: {
              trigger: dot,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            delay: 0.1 * index
          }
        );
      });
    }
    
    // Animate timeline items con staggered timing e avanzati effetti parallax
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
      timelineItems.forEach((item, index) => {
        // Crea un effetto parallax per l'immagine all'interno dell'elemento
        const image = item.querySelector('img');
        if (image) {
          gsap.to(image, {
            y: -20,
            scale: 1.05,
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          });
        }
        
        // Animazione del testo con effetto staggered
        const titleEl = item.querySelector('h3');
        const descEl = item.querySelector('p');
        
        if (titleEl && descEl) {
          const itemTl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          });
          
          itemTl
            .fromTo(
              titleEl, 
              { 
                opacity: 0, 
                y: -20, 
                scale: 0.95 
              }, 
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                ease: "back.out(1.7)"
              }
            )
            .fromTo(
              descEl,
              { 
                opacity: 0, 
                y: 20 
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out"
              },
              "-=0.4"
            );
          
          animations.push(itemTl);
        }
      });
    }
    
    // Effetto speciale migliorato sulla sezione di contenuto "La Nostra Storia"
    const storySection = document.querySelector('.story-reveal');
    if (storySection) {
      const storySectionAnim = gsap.timeline({
        scrollTrigger: {
          trigger: storySection,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });
      
      // Animazione a cascata degli elementi del contenuto
      storySectionAnim
        .fromTo(
          '.reveal-title',
          { opacity: 0, y: -20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
        )
        .fromTo(
          '.medieval-divider',
          { width: 0, opacity: 0.5 },
          { width: '100%', opacity: 1, duration: 1, ease: "power2.inOut" },
          "-=0.4"
        )
        .fromTo(
          '.fade-in-text',
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            stagger: 0.2, 
            ease: "power2.out" 
          },
          "-=0.6"
        );
      
      animations.push(storySectionAnim);
    }
    
    // Effetto di apparizione per le call-to-action in fondo alla pagina
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
      gsap.fromTo(
        ctaSection,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ctaSection,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }
    
    // Observer per gli elementi con effetto reveal
    const contentElements = document.querySelectorAll('.content-reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    
    contentElements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      // Clean up animations manually
      animations.forEach(anim => anim.kill());
      
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Clean up Observer
      contentElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);
  
  return (
    <div>
      <div className="h-20"></div> {/* Spacer for fixed header */}
      
      {/* Hero Banner con sfondo personalizzato */}
      <section className="py-16 border-b border-secondary/20 relative">
        {/* Background con monastero medievale */}
        <div className="absolute inset-0 z-0 bg-charcoal/60 bg-blend-multiply" 
             style={{
               backgroundImage: 'url("/images/monastery-bg.svg"), url("/images/medieval-pattern.svg")',
               backgroundSize: 'cover, 300px',
               backgroundPosition: 'center, center',
               backgroundRepeat: 'no-repeat, repeat',
             }}>
          {/* Overlay vignette */}
          <div className="absolute inset-0" 
               style={{
                 background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.5) 100%)',
               }}>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pt-8 relative z-10">
          <h1 ref={titleRef} className="font-title text-4xl md:text-6xl text-secondary mb-6 text-center glow-text animate-fade-in-up">
            Chi Siamo
          </h1>
          <p className="text-foreground max-w-3xl mx-auto text-center font-medieval text-xl leading-relaxed animate-fade-in-up" style={{animationDelay: '300ms'}}>
            La storia della nostra amicizia e della nostra passione per il Medioevo
          </p>
        </div>
      </section>
      
      {/* About Us Content */}
      <section className="py-16 bg-charcoal/80">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16 transform hover:scale-[1.01] transition-all duration-500">
            <div className="bg-gradient-to-br from-primary/95 to-primary/90 rounded-lg overflow-hidden shadow-2xl border-2 border-secondary/30"
              style={{
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3), inset 0 0 15px rgba(210, 147, 38, 0.15)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <div className="p-8 md:p-12 story-reveal">
                <h2 className="font-medieval text-3xl text-secondary mb-6 text-center reveal-title">La Nostra Storia</h2>
                
                <div className="h-1 w-full bg-gradient-to-r from-secondary/30 via-secondary to-secondary/30 rounded-full mb-8 animate-expand"></div>
                
                <p className="first-letter:font-medieval first-letter:text-secondary first-letter:text-5xl first-letter:float-left first-letter:mr-2 first-letter:leading-[0.8] text-foreground mb-6 leading-relaxed fade-in-text">
                  Siamo due amici uniti da una passione comune: il Medioevo in tutte le sue sfaccettature. La nostra amicizia è nata più di quindici anni fa durante una fiera del libro antico, quando entrambi ci siamo ritrovati a sfogliare la stessa copia di un raro testo sulle leggende medievali italiane.
                </p>
                
                <p className="text-foreground/90 mb-6 leading-relaxed fade-in-text" style={{animationDelay: '0.2s'}}>
                  Da quel momento, abbiamo condiviso innumerevoli avventure: viaggi alla scoperta di castelli dimenticati, partecipazioni a festival medievali in costume, lunghe notti passate a discutere di storia e leggende. La nostra passione ci ha portato a fondare un club locale di appassionati di storia medievale e, più recentemente, a creare questo sito web.
                </p>
                
                <p className="text-foreground/90 leading-relaxed fade-in-text" style={{animationDelay: '0.4s'}}>
                  Attraverso questo progetto, vogliamo condividere con voi le curiosità, le stranezze e le meraviglie del Medioevo che abbiamo scoperto nel nostro percorso. Crediamo che questo periodo storico, spesso frainteso, abbia molto da insegnare al mondo contemporaneo e meriti di essere esplorato con occhi nuovi.
                </p>
              </div>
            </div>
          </div>
          
          {/* Interactive Timeline */}
          <div className="max-w-5xl mx-auto">
            <h2 className="font-title text-3xl md:text-4xl text-secondary mb-12 text-center glow-text">
              La Linea del Tempo della Nostra Amicizia
            </h2>
            
            <div ref={timelineRef} className="relative pl-6 mb-16">
              {/* Luminous timeline line with gradient effect */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary via-secondary/50 to-secondary/20"></div>
              
              {friendshipTimeline.map((event, index) => (
                <div key={index} className="relative mb-16">
                  <TimelineItem
                    title={event.title}
                    description={event.description}
                    imageSrc={event.imageSrc}
                    imageAlt={event.imageAlt}
                    imagePosition={event.imagePosition}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Call to action */}
          <div className="text-center mt-16 cta-section bg-transparent">
            <Link 
              href="/curiosities"
              className="group relative inline-block px-8 py-4 bg-secondary text-secondary-foreground border-2 border-secondary/80 hover:bg-secondary/90 transition-all duration-300 font-medieval text-lg tracking-wide mr-4 hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Esplora le Curiosità</span>
              <span className="absolute inset-0 z-0 bg-primary/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 pointer-events-none"></span>
            </Link>
            <Link 
              href="/"
              className="group relative inline-block px-8 py-4 bg-primary text-foreground border-2 border-secondary/80 hover:bg-primary/90 transition-all duration-300 font-medieval text-lg tracking-wide hover:scale-105 active:scale-95"
            >
              <span className="relative z-10">Torna all'Inizio</span>
              <span className="absolute inset-0 z-0 bg-secondary/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 pointer-events-none"></span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChiSiamo;