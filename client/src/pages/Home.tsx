import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "wouter";
import MedievalDailyFact from "@/components/medieval/MedievalDailyFact";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });

    // Initial overlay animation
    if (overlayRef.current) {
      timeline.fromTo(
        overlayRef.current,
        {
          opacity: 1,
          background: 'rgba(0,0,0,1)'
        },
        {
          opacity: 0.5,
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
          duration: 1.5,
          ease: "power2.inOut"
        }
      );
    }
    
    // Main title animation with medieval reveal effect
    if (titleRef.current) {
      const letters = titleRef.current.textContent?.split('') || [];
      titleRef.current.innerHTML = '';
      letters.forEach((letter, i) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        titleRef.current?.appendChild(span);
      });

      timeline.to(
        titleRef.current.children,
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.7)"
        },
        0.5
      );
    }
    
    // Subtitle animation
    if (subtitleRef.current) {
      timeline.fromTo(
        subtitleRef.current,
        { 
          opacity: 0,
          y: 20,
          filter: 'blur(10px)'
        },
        { 
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1
        },
        "-=0.5"
      );
    }
    
    // Content panel animation
    if (contentRef.current) {
      const panel = contentRef.current.querySelector('.content-panel');
      const text = contentRef.current.querySelector('.panel-text');
      const button = contentRef.current.querySelector('.cta-button');
      
      if (panel && text && button) {
        timeline
          .fromTo(
            panel,
            {
              opacity: 0,
              y: 30,
              scale: 0.95
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8
            },
            "-=0.3"
          )
          .fromTo(
            text,
            {
              opacity: 0,
              y: 20
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6
            },
            "-=0.4"
          )
          .fromTo(
            button,
            {
              opacity: 0,
              y: 20,
              scale: 0.9
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.7)"
            },
            "-=0.3"
          );
      }
    }

    // Parallax effect for background
    gsap.to(".bg-image", {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="bg-image absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1559237705-a00ee8c47456?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1.1)',
          filter: 'brightness(0.2)'
        }}
      />

      {/* Overlay with animated gradient */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d] transition-opacity duration-1000"
      />

      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col items-center justify-between py-20 px-4">
        {/* Title Section */}
        <div className="text-center pt-20">
          <h1 
            ref={titleRef}
            className="font-medieval text-5xl md:text-7xl lg:text-8xl text-amber-200 mb-6 tracking-wider"
            style={{
              textShadow: '0 0 20px rgba(210, 147, 38, 0.4), 0 0 40px rgba(210, 147, 38, 0.2), 0 0 60px rgba(210, 147, 38, 0.1)'
            }}
          >
            MYSTERIUM MEDII AEVI
          </h1>
          <h2 
            ref={subtitleRef}
            className="font-medieval text-4xl md:text-5xl lg:text-6xl text-stone-300 tracking-wide"
          >
            Un Viaggio nel Cuore del Medioevo
          </h2>
        </div>

        {/* Content Panel */}
        <div ref={contentRef} className="max-w-4xl w-full mt-auto">
          <div 
            className="content-panel relative p-8 rounded-lg border border-amber-200/20"
            style={{
              background: 'linear-gradient(to bottom, rgba(26, 26, 26, 0.95), rgba(45, 45, 45, 0.95))',
              boxShadow: 'inset 0 0 30px rgba(210, 147, 38, 0.15), 0 10px 30px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(10px)'
            }}
          >
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-200/40"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-amber-200/40"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-amber-200/40"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-200/40"></div>

            <div className="text-center">
              <p className="panel-text font-medieval text-xl md:text-2xl text-stone-300/90 mb-8 max-w-3xl mx-auto">
                Esplora i misteri e le meraviglie dell'epoca medievale attraverso un viaggio nel tempo
              </p>
              
              <Link 
                href="/introduzione"
                className="cta-button inline-block px-8 py-4 bg-amber-200 text-[#1a1a1a] rounded-sm font-medieval text-lg tracking-wide transition-all duration-300 hover:bg-amber-300 hover:scale-105 active:scale-95 border-2 border-amber-200/80"
              >
                Inizia il Viaggio
              </Link>
            </div>

            {/* Decorative medieval flourish */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-32 h-1">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Medieval Features Section */}
      <section className="pt-8 pb-20 bg-[#1a1a1a]/80">
        <div className="container mx-auto px-4">
          {/* Decorative Medieval Divider */}
          <div className="relative w-full max-w-4xl mx-auto mb-16">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-amber-200/40 to-transparent"></div>
            <div className="flex items-center justify-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-200/40"></div>
              <div className="relative">
                <div className="w-8 h-8 border-2 border-amber-200/40 rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="w-6 h-6 border-2 border-amber-200/30 rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-200/40"></div>
            </div>
          </div>

          <MedievalDailyFact />
        </div>
      </section>
    </div>
  );
};

export default Home;