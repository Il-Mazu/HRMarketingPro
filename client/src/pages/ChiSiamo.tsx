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
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });
    
    if (headerRef.current) {
      // Header background animation
      timeline.fromTo(
        headerRef.current,
        { 
          opacity: 0,
          y: -50
        },
        { 
          opacity: 1,
          y: 0,
          duration: 0.8
        }
      );

      // Title animation
      timeline.fromTo(
        headerRef.current.querySelector('h1'),
        {
          opacity: 0,
          y: 30,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)"
        },
        "-=0.5"
      );

      // Subtitle animation
      timeline.fromTo(
        headerRef.current.querySelector('p'),
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5
        },
        "-=0.4"
      );

      // Divider animation
      timeline.fromTo(
        headerRef.current.querySelector('.bg-amber-200\\/50'),
        {
          opacity: 0,
          width: "0%"
        },
        {
          opacity: 1,
          width: "6rem",
          duration: 0.5,
          ease: "power2.out"
        },
        "-=0.3"
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

    // Content section animations - now tied to the main timeline
    if (contentRef.current) {
      const contentSection = contentRef.current.querySelector('.content-section');
      if (contentSection) {
        // Initial state - hide the content section
        gsap.set(contentSection, { opacity: 0, y: 50 });

        // Main content section reveal
        timeline.fromTo(
          contentSection,
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out"
          },
          "+=0.1" // Reduced pause
        );

        // Frame corners animation
        timeline.fromTo(
          contentSection.querySelectorAll('.border-t-2, .border-b-2, .border-l-2, .border-r-2'),
          {
            scale: 0,
            opacity: 0
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out(1.7)"
          },
          "-=0.4"
        );

        // Gradient borders animation
        timeline.fromTo(
          contentSection.querySelectorAll('.bg-gradient-to-r, .bg-gradient-to-b'),
          {
            opacity: 0,
            scale: 0.8
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.05
          },
          "-=0.4"
        );

        // Title and divider animation
        timeline.fromTo(
          contentSection.querySelector('h2'),
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5
          },
          "-=0.3"
        );

        // Text content animation
        timeline.fromTo(
          contentSection.querySelectorAll('p'),
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1
          },
          "-=0.2"
        );

        // Image animation
        timeline.fromTo(
          contentSection.querySelector('img'),
          {
            opacity: 0,
            scale: 0.8
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power2.out"
          },
          "-=0.5"
        );
      }
    }

    return () => {
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
            backgroundImage: 'url("https://images.unsplash.com/photo-1562239058-2878729e9ad4?q=80&w=2000")',
            filter: 'brightness(0.2)'
          }}
        ></div>
        
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-medieval text-amber-200 mb-4 tracking-wider opacity-0"
              style={{
                textShadow: '0 0 20px rgba(210, 147, 38, 0.4), 0 0 40px rgba(210, 147, 38, 0.2), 0 0 60px rgba(210, 147, 38, 0.1)'
              }}>
            CHI SIAMO
          </h1>
          <p className="text-stone-300 max-w-3xl mx-auto text-center font-medieval text-lg px-4 opacity-0">
            La storia della nostra amicizia e della nostra passione per il Medioevo
          </p>
          <div className="w-24 h-1 bg-amber-200/50 mx-auto mt-4 opacity-0"></div>
        </div>
      </div>

      {/* About Us Content */}
      <section className="py-16 bg-[#1a1a1a]/80">
        <div className="container mx-auto px-4">
          <div ref={contentRef} className="max-w-4xl mx-auto">
            {/* La Nostra Storia Section */}
            <div className="content-section mb-16 transform hover:scale-[1.01] transition-all duration-700">
              <div className="relative bg-gradient-to-br from-[#1a1a1a]/95 to-[#2a1a1a]/95 rounded-lg overflow-hidden shadow-2xl border border-amber-200/20"
                style={{
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3), inset 0 0 15px rgba(210, 147, 38, 0.15)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-200/40 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-amber-200/40 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-amber-200/40 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-200/40 rounded-br-lg"></div>

                {/* Medieval decorative border */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-32 w-1 bg-gradient-to-b from-transparent via-amber-200/40 to-transparent"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-32 w-1 bg-gradient-to-b from-transparent via-amber-200/40 to-transparent"></div>
                </div>

                <div className="p-8 md:p-12 relative">
                  {/* Title with decorative elements */}
                  <div className="relative mb-12 text-center">
                    <h2 className="font-medieval text-3xl text-amber-200 mb-4 relative inline-block">
                      La Nostra Storia
                      <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
                    </h2>
                    {/* Decorative medieval symbols */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-24 h-1">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent"></div>
                      <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-16 h-1 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent"></div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="relative">
                      {/* Text content with medieval initial letter */}
                      <p className="first-letter:font-medieval first-letter:text-amber-200 first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:leading-[0.8] text-stone-300 mb-6 leading-relaxed relative">
                        <span className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-transparent via-amber-200/20 to-transparent"></span>
                        Siamo due amici uniti da una passione comune: il Medioevo in tutte le sue sfaccettature. La nostra amicizia è nata più di quindici anni fa durante una fiera del libro antico, quando entrambi ci siamo ritrovati a sfogliare la stessa copia di un raro testo sulle leggende medievali italiane.
                      </p>
                      
                      <p className="text-stone-300/90 mb-6 leading-relaxed pl-4 border-l border-amber-200/20">
                        Da quel momento, abbiamo condiviso innumerevoli avventure: viaggi alla scoperta di castelli dimenticati, partecipazioni a festival medievali in costume, lunghe notti passate a discutere di storia e leggende.
                      </p>
                    </div>
                    
                    <div className="relative h-[300px] group">
                      {/* Image frame with decorative corners */}
                      <div className="absolute inset-0 border border-amber-200/30 rounded-lg overflow-hidden">
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-200/40"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-200/40"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-200/40"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-200/40"></div>
                        <img 
                          src="https://images.unsplash.com/photo-1584727638096-042c45049ebe?q=80&w=1200"
                          alt="Antica biblioteca medievale"
                          className="absolute inset-0 w-full h-full object-cover rounded-lg transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-stone-300/90 leading-relaxed mt-8 relative">
                    <span className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-transparent via-amber-200/20 to-transparent"></span>
                    Attraverso questo progetto, vogliamo condividere con voi le curiosità, le stranezze e le meraviglie del Medioevo che abbiamo scoperto nel nostro percorso. Crediamo che questo periodo storico, spesso frainteso, abbia molto da insegnare al mondo contemporaneo e meriti di essere esplorato con occhi nuovi.
                  </p>

                  {/* Decorative bottom flourish */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-1">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Call to action */}
            <div className="text-center mt-16">
              <h2 className="font-title text-3xl text-amber-200 mb-6">Continua l'Esplorazione</h2>
              <Link 
                href="/curiosities"
                className="inline-block px-8 py-4 mx-4 bg-gradient-to-r from-amber-200 to-amber-300 text-[#1a1a1a] border-2 border-amber-200/80 hover:from-amber-300 hover:to-amber-400 transition-all duration-300 font-medieval text-lg tracking-wide hover:scale-105 active:scale-95 shadow-lg hover:shadow-amber-200/20"
              >
                Esplora le Curiosità
              </Link>
              <Link 
                href="/"
                className="inline-block px-8 py-4 mx-4 bg-[#1a1a1a]/95 text-amber-200 border-2 border-amber-200/80 hover:bg-[#2a1a1a]/95 transition-all duration-300 font-medieval text-lg tracking-wide hover:scale-105 active:scale-95"
              >
                Torna all'Inizio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChiSiamo;