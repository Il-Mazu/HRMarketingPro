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
    // Animazioni di entrata
    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });
    
    // Animazione del titolo
    if (titleRef.current) {
      timeline.fromTo(
        titleRef.current,
        { 
          opacity: 0, 
          y: -30 
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2
        },
        0
      );
    }
    
    // Animazione del sottotitolo
    if (subtitleRef.current) {
      timeline.fromTo(
        subtitleRef.current,
        { 
          opacity: 0, 
          y: 20 
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1
        },
        0.4
      );
    }
    
    // Animazione della pergamena
    if (scrollRef.current) {
      timeline.fromTo(
        scrollRef.current,
        { 
          opacity: 0,
          y: 100
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5
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
    }
    
    // Animazione del contenuto principale quando viene raggiunto
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { 
          opacity: 0, 
          y: 40 
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );
    }
    
    return () => {
      // Pulizia delle istanze ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div className="min-h-screen relative">
      {/* Hero section con sfondo a schermo intero */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
        {/* Background con cavaliere e castello */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/images/knight-with-scroll.svg")',
            backgroundSize: 'cover',
          }}
        >
          {/* Overlay scuro con vignette */}
          <div 
            className="absolute inset-0 bg-black/30"
            style={{
              background: 'radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.7) 100%)',
            }}
          ></div>
        </div>
        
        {/* Area del titolo nella parte superiore */}
        <div className="relative z-10 pt-32 pb-12 text-center">
          <h1 
            ref={titleRef} 
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
        
        {/* Spazio centrale vuoto per mostrare il cavaliere */}
        <div className="flex-grow"></div>
        
        {/* Pergamena in basso */}
        <div 
          ref={scrollRef}
          className="relative z-10 w-full"
        >
          <div className="max-w-5xl mx-auto px-6 pb-16">
            {/* Sfondo pergamena */}
            <div 
              className="relative bg-scroll-color rounded-t-3xl py-8 px-8 md:px-12 border-t-4 border-x-4 border-scroll-edge shadow-2xl"
              style={{
                backgroundImage: 'url("/images/parchment-texture.svg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Bordi decorativi della pergamena */}
              <div className="absolute left-0 top-0 w-12 h-12 border-l-4 border-t-4 border-primary/30 rounded-tl-3xl"></div>
              <div className="absolute right-0 top-0 w-12 h-12 border-r-4 border-t-4 border-primary/30 rounded-tr-3xl"></div>
              
              {/* Contenuto della pergamena */}
              <div ref={scrollContentRef} className="text-center">
                <h3 className="font-medieval text-3xl md:text-4xl text-primary mb-4 tracking-wider">
                  <span className="text-secondary text-4xl md:text-5xl font-bold mr-1">M</span>ysterium <span className="text-secondary text-4xl md:text-5xl font-bold mr-1">M</span>edii <span className="text-secondary text-4xl md:text-5xl font-bold mr-1">A</span>evi
                </h3>
                
                <p className="font-medieval text-xl md:text-2xl text-charcoal mb-8 max-w-3xl mx-auto">
                  Viaggia nei segreti e nelle meraviglie dell'epoca medievale
                </p>
                
                <Link 
                  href="#content"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("content")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group inline-block px-8 py-4 bg-primary text-foreground border-2 border-secondary hover:bg-primary/80 transition-all duration-300 font-medieval text-lg tracking-wide hover:scale-105 active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10">Inizia il Viaggio</span>
                  <span className="absolute inset-0 bg-secondary/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
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
            {/* Sezione sulla storia medievale */}
            <div className="bg-scroll-color rounded-lg overflow-hidden shadow-2xl border border-secondary/20 mb-16"
                style={{
                  backgroundImage: 'url("/images/parchment-texture.svg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
            >
              <div className="p-8 md:p-12">
                <h2 className="font-title text-3xl md:text-4xl text-primary mb-6 text-center">Introduzione al Medioevo</h2>
                
                <div className="medieval-divider mb-8"></div>
                
                <p className="medieval-initials text-charcoal mb-6 leading-relaxed">
                  Il Medioevo, periodo storico che abbraccia circa mille anni, dal 476 d.C. (caduta dell'Impero Romano d'Occidente) al 1492 (scoperta dell'America), è un'epoca ricca di contrasti, misteri e fascino. Spesso dipinto con toni cupi nei secoli successivi, che lo definirono "età di mezzo" tra la gloria dell'antichità classica e il rinnovamento rinascimentale, il Medioevo fu in realtà un periodo di grande fermento culturale, spirituale e sociale.
                </p>
                
                <p className="text-charcoal mb-6 leading-relaxed">
                  In questi secoli nacquero le università, si svilupparono nuove tecnologie agricole, si costruirono le maestose cattedrali gotiche, e si posero le basi per la formazione degli stati nazionali europei. Fu un'epoca di profonda spiritualità, dove la fede permeava ogni aspetto della vita quotidiana, ma anche di notevoli progressi scientifici e filosofici.
                </p>
                
                <blockquote className="border-l-4 border-primary pl-4 my-8 italic text-primary">
                  "Il Medioevo non era né così luminoso come lo dipingono i romantici, né così oscuro come lo descrivono gli illuministi."
                  <footer className="text-right text-sm mt-2">— Umberto Eco</footer>
                </blockquote>
                
                <p className="text-charcoal leading-relaxed">
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
                  className="inline-block px-8 py-4 bg-primary text-foreground border-2 border-secondary hover:bg-primary/80 transition-all duration-300 font-medieval text-lg tracking-wide hover:scale-105 active:scale-95"
                >
                  Visita le Curiosità
                </Link>
                <Link 
                  href="/chi-siamo"
                  className="inline-block px-8 py-4 bg-charcoal text-foreground border-2 border-secondary hover:bg-charcoal/80 transition-all duration-300 font-medieval text-lg tracking-wide hover:scale-105 active:scale-95"
                >
                  Chi Siamo
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
