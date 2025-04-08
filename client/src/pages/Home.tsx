import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "wouter";
import ScrollSword from "@/components/ScrollSword";

// Assicuriamoci che ScrollTrigger sia registrato
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const introTextRef = useRef<HTMLParagraphElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create fade-in animation for intro text
    const introText = introTextRef.current;
    if (introText) {
      gsap.fromTo(
        introText,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          delay: 0.5,
          ease: "power2.out" 
        }
      );
    }
    
    // Animate text block when it comes into view
    const textBlock = textBlockRef.current;
    if (textBlock) {
      gsap.fromTo(
        textBlock,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: textBlock,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div>
      {/* Hero Section */}
      <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-charcoal bg-opacity-70 bg-blend-multiply" 
             style={{
               backgroundImage: 'url("/images/hero-bg.png"), url("/images/medieval-pattern.svg")',
               backgroundSize: 'cover, 300px',
               backgroundPosition: 'center, center',
               backgroundRepeat: 'no-repeat, repeat',
             }}>
        </div>
        
        {/* Animated sword component */}
        <ScrollSword mainTitleId="main-title" />
        
        <div className="container mx-auto px-4 z-20 text-center">
          <h1 id="main-title" className="font-title text-5xl md:text-7xl lg:text-8xl mb-6 text-secondary tracking-widest glow-text">
            MYSTERIUM <br /><span className="text-4xl md:text-6xl text-foreground">MEDII AEVI</span>
          </h1>
          <p ref={introTextRef} className="font-medieval text-xl md:text-2xl text-foreground italic max-w-3xl mx-auto opacity-0">
            Viaggia nei segreti e nelle meraviglie dell'epoca medievale
          </p>
          <div className="mt-16">
            <Link href="#about" onClick={(e) => {
              e.preventDefault();
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }} className="inline-block px-8 py-4 bg-primary text-foreground border-2 border-secondary hover:bg-primary/80 transition-all duration-300 font-medieval text-lg tracking-wide hover:scale-105 active:scale-95">
              Inizia il Viaggio
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-charcoal to-transparent"></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-primary/90 rounded-lg overflow-hidden shadow-2xl transform -translate-y-6 border border-secondary/20">
            <div ref={textBlockRef} className="p-8 md:p-12 parchment">
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
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-16 bg-charcoal/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-title text-4xl text-secondary mb-8">Esplora le Curiosità Medievali</h2>
          <p className="text-foreground max-w-2xl mx-auto mb-10 font-medieval text-lg">
            Scopri aneddoti affascinanti, pratiche insolite e stranezze del Medioevo che hanno plasmato la nostra storia.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link 
              href="/curiosities"
              className="inline-block px-8 py-4 bg-primary text-foreground border-2 border-secondary hover:bg-primary/80 transition-all duration-300 font-medieval text-lg tracking-wide"
            >
              Visita le Curiosità
            </Link>
            <Link 
              href="/chi-siamo"
              className="inline-block px-8 py-4 bg-charcoal text-foreground border-2 border-secondary hover:bg-charcoal/80 transition-all duration-300 font-medieval text-lg tracking-wide"
            >
              Chi Siamo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
