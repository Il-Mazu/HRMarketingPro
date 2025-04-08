import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "wouter";

// Assicuriamoci che ScrollTrigger sia registrato
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animazioni di entrata migliorate
    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });
    
    // Animazione del titolo con effetto di apparizione drammatico
    if (titleRef.current) {
      timeline.fromTo(
        titleRef.current,
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
          textShadow: "0 0 20px rgba(210, 147, 38, 0.4), 0 0 40px rgba(210, 147, 38, 0.2)",
          duration: 1.2
        },
        0
      );
    }
    
    // Animazione del sottotitolo con effetto di spaziatura lettere
    if (subtitleRef.current) {
      timeline.fromTo(
        subtitleRef.current,
        { 
          opacity: 0, 
          y: 20,
          letterSpacing: "0em"
        },
        { 
          opacity: 1, 
          y: 0, 
          letterSpacing: "0.05em",
          duration: 1.2
        },
        0.4
      );
    }
    
    // Animazione della pergamena con effetto elastico
    if (scrollRef.current) {
      timeline.fromTo(
        scrollRef.current,
        { 
          opacity: 0,
          y: 100,
          scale: 0.8
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)"
        },
        0.7
      );
    }
    
    // Animazione del contenuto nella pergamena
    if (scrollContentRef.current) {
      timeline.fromTo(
        scrollContentRef.current,
        { 
          opacity: 0
        },
        { 
          opacity: 1, 
          duration: 1
        },
        1.2
      );
      
      // Animazione di rotazione sottile della pergamena all'hover
      scrollRef.current?.addEventListener('mouseenter', () => {
        gsap.to(scrollRef.current, {
          rotation: 0.5,
          scale: 1.02,
          duration: 0.5,
          ease: "power2.out"
        });
      });
      
      scrollRef.current?.addEventListener('mouseleave', () => {
        gsap.to(scrollRef.current, {
          rotation: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    }
    
    // Observer per rivelare elementi quando sono visibili
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
    
    // Animazione avanzata del contenuto principale quando viene raggiunto
    if (contentRef.current) {
      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      });
      
      contentTl
        .fromTo(
          contentRef.current,
          { 
            opacity: 0, 
            y: 40 
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
          }
        )
        .fromTo(
          '.medieval-divider',
          {
            width: 0,
            opacity: 0.5
          },
          {
            width: '100%',
            opacity: 1,
            duration: 1,
            ease: "power2.inOut"
          },
          "-=0.5"
        );
    }
    
    return () => {
      // Pulizia delle istanze ScrollTrigger e observer
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      contentElements.forEach(element => {
        observer.unobserve(element);
      });
      
      // Rimuovere event listener
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('mouseenter', () => {});
        scrollRef.current.removeEventListener('mouseleave', () => {});
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen relative">
      {/* Hero section con sfondo a schermo intero */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-between overflow-hidden">
        {/* Background con cavaliere e castello - immagine aggiornata */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/images/user/knight-castle-new.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Overlay scuro con vignette migliorato */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%)',
              boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)'
            }}
          ></div>
        </div>
        
        {/* Area del titolo nella parte superiore */}
        <div className="relative z-10 pt-32 pb-12 text-center">
          <h1 
            ref={titleRef} 
            id="mainTitle"
            className="font-title text-5xl md:text-7xl lg:text-8xl text-secondary tracking-widest glow-text"
          >
            MYSTERIUM
          </h1>
          
          <h2 
            ref={subtitleRef} 
            className="font-title text-3xl md:text-5xl lg:text-6xl text-foreground mt-4"
          >
            MEDII AEVI
          </h2>
        </div>
        
        {/* Spazio centrale visibile per mostrare il cavaliere */}
        <div className="flex-grow relative pointer-events-none"></div>
        
        {/* Pergamena in basso */}
        <div 
          ref={scrollRef}
          className="relative z-10 w-full"
        >
          <div className="max-w-5xl mx-auto px-6 pb-16">
            {/* Finestra moderna in stile medievale */}
            <div 
              className="relative py-8 px-6 md:px-8 shadow-2xl scroll-reveal bg-gradient-to-b from-primary/90 to-primary/95 rounded-lg border-2 border-secondary/50"
              style={{
                backdropFilter: 'blur(4px)',
                minHeight: '240px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'translateZ(0)',
                transition: 'transform 0.3s ease-out',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4), inset 0 0 15px rgba(210, 147, 38, 0.2)'
              }}
            >
              {/* Contenuto del pannello con animazione migliorata */}
              <div 
                ref={scrollContentRef} 
                className="text-center py-6 px-4 md:px-10 max-w-4xl mx-auto"
                style={{
                  margin: '0 auto',
                  width: '90%'
                }}
              >
                <h3 className="font-medieval text-3xl md:text-4xl text-foreground mb-4 tracking-wider animate-fade-in">
                  <span className="text-secondary text-4xl md:text-5xl font-bold mr-1 animate-pop-in">M</span>ysterium 
                  <span className="text-secondary text-4xl md:text-5xl font-bold mx-1 animate-pop-in" style={{animationDelay: '0.2s'}}>M</span>edii 
                  <span className="text-secondary text-4xl md:text-5xl font-bold mx-1 animate-pop-in" style={{animationDelay: '0.4s'}}>A</span>evi
                </h3>
                
                <p className="font-medieval text-xl md:text-2xl text-foreground/90 mb-8 max-w-3xl mx-auto animate-fade-in-slow">
                  Viaggia nei segreti e nelle meraviglie dell'epoca medievale
                </p>
                
                <Link 
                  href="#content"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("content")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group inline-block px-8 py-4 bg-secondary text-secondary-foreground border-2 border-secondary/80 hover:bg-secondary/90 transition-all duration-300 font-medieval text-lg tracking-wide hover:scale-105 active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10">Inizia il Viaggio</span>
                  <span className="absolute inset-0 bg-primary/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contenuto principale */}
      <section id="content" className="py-20 bg-charcoal/95">
        <div className="container mx-auto px-4">
          <div ref={contentRef} className="max-w-4xl mx-auto">
            {/* Sezione sulla storia medievale con design moderno */}
            <div className="bg-gradient-to-br from-primary/95 to-primary/90 rounded-lg overflow-hidden shadow-2xl border-2 border-secondary/30 mb-16 transform hover:scale-[1.01] transition-all duration-500"
                style={{
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3), inset 0 0 15px rgba(210, 147, 38, 0.15)',
                  backdropFilter: 'blur(8px)'
                }}
            >
              <div 
                className="p-8 md:p-12 content-reveal"
                style={{
                  opacity: 0,
                  transform: 'translateY(20px)',
                  transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
                }}
              >
                <h2 className="font-title text-3xl md:text-4xl text-secondary mb-6 text-center glow-text-subtle">Introduzione al Medioevo</h2>
                
                <div className="h-1 w-full bg-gradient-to-r from-secondary/30 via-secondary to-secondary/30 rounded-full mb-8 animate-expand"></div>
                
                <p className="first-letter:font-medieval first-letter:text-secondary first-letter:text-5xl first-letter:float-left first-letter:mr-2 first-letter:leading-[0.8] text-foreground mb-6 leading-relaxed">
                  Il Medioevo, periodo storico che abbraccia circa mille anni, dal 476 d.C. (caduta dell'Impero Romano d'Occidente) al 1492 (scoperta dell'America), è un'epoca ricca di contrasti, misteri e fascino. Spesso dipinto con toni cupi nei secoli successivi, che lo definirono "età di mezzo" tra la gloria dell'antichità classica e il rinnovamento rinascimentale, il Medioevo fu in realtà un periodo di grande fermento culturale, spirituale e sociale.
                </p>
                
                <p className="text-foreground/90 mb-6 leading-relaxed reveal-text">
                  In questi secoli nacquero le università, si svilupparono nuove tecnologie agricole, si costruirono le maestose cattedrali gotiche, e si posero le basi per la formazione degli stati nazionali europei. Fu un'epoca di profonda spiritualità, dove la fede permeava ogni aspetto della vita quotidiana, ma anche di notevoli progressi scientifici e filosofici.
                </p>
                
                <blockquote className="border-l-4 border-secondary pl-4 my-8 italic text-secondary quote-animation">
                  "Il Medioevo non era né così luminoso come lo dipingono i romantici, né così oscuro come lo descrivono gli illuministi."
                  <footer className="text-right text-sm mt-2 text-foreground/80">— Umberto Eco</footer>
                </blockquote>
                
                <p className="text-foreground/90 leading-relaxed reveal-text-delayed">
                  Attraverso questo sito, ci immergeremo nelle curiosità, nelle stranezze e negli aspetti più affascinanti di questo periodo storico complesso, scoprendo come molte delle sue usanze, credenze e invenzioni continuino a influenzare il nostro mondo contemporaneo.
                </p>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="text-center">
              <h2 className="font-title text-4xl text-secondary mb-8">Esplora le Curiosità Medievali</h2>
              <p className="text-foreground max-w-2xl mx-auto mb-10 font-medieval text-lg">
                Scopri aneddoti affascinanti, pratiche insolite e stranezze del Medioevo che hanno plasmato la nostra storia.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <Link 
                  href="/curiosities"
                  className="group inline-block px-8 py-4 bg-secondary text-secondary-foreground border-2 border-secondary/80 hover:bg-secondary/90 transition-all duration-300 font-medieval text-lg tracking-wide hover:scale-105 active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10">Visita le Curiosità</span>
                  <span className="absolute inset-0 bg-primary/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                </Link>
                <Link 
                  href="/chi-siamo"
                  className="group inline-block px-8 py-4 bg-primary text-foreground border-2 border-secondary/80 hover:bg-primary/90 transition-all duration-300 font-medieval text-lg tracking-wide hover:scale-105 active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10">Chi Siamo</span>
                  <span className="absolute inset-0 bg-secondary/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
