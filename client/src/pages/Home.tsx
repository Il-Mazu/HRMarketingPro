import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { GiFeather, GiScrollUnfurled, GiCastle, GiSwordClash, GiShield, GiTreasureMap } from "react-icons/gi";
import MedievalFeatureCard from "@/components/medieval/MedievalFeatureCard";
import MedievalDailyFact from "@/components/medieval/MedievalDailyFact";
import MedievalIcon from "@/components/medieval/MedievalIcon";
import medievalCastleBg from "@/assets/images/medieval-castle-bg.jpg";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
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
          background: 'radial-gradient(circle at center, rgba(122, 31, 31, 0.3) 0%, rgba(27, 27, 27, 0.7) 100%)',
          duration: 1.5,
          ease: "power2.inOut"
        },
        {
          opacity: 0.5,
          background: 'radial-gradient(circle at center, rgba(122, 31, 31, 0.3) 0%, rgba(27, 27, 27, 0.7) 100%)',
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

    // Navigation links animation
    if (navLinksRef.current) {
      const links = navLinksRef.current.children;
      timeline.fromTo(
        links,
        {
          opacity: 0,
          y: 20,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.7)"
        },
        "-=0.3"
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

    // Features section animation
    if (featuresRef.current) {
      const features = featuresRef.current.querySelectorAll('.feature-card');
      
      features.forEach((feature, index) => {
        gsap.fromTo(
          feature,
          {
            opacity: 0,
            y: 50,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: feature,
              start: "top bottom-=100",
              end: "bottom center",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.2
          }
        );
      });
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

    // Journey Call-to-Action Panel animations
    if (contentRef.current) {
      const panel = contentRef.current.querySelector('.backdrop-blur-sm');
      const corners = contentRef.current.querySelectorAll('.corner-decoration');
      const text = contentRef.current.querySelector('.panel-text');
      const button = contentRef.current.querySelector('.cta-button');

      gsap.set([panel, corners, text, button], { opacity: 0 });

      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top 80%",
        onEnter: () => {
          // Panel background fade in
          gsap.to(panel, {
            opacity: 1,
            duration: 1,
            ease: "power2.out"
          });

          // Corner decorations animation
          gsap.to(corners, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            delay: 0.3
          });

          // Text fade in and slide up
          gsap.to(text, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.6
          });

          // Button fade in and scale
          gsap.to(button, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            delay: 0.9,
            ease: "back.out(1.7)"
          });
        }
      });

      // Set initial states
      gsap.set(text, { opacity: 0, y: 20 });
      gsap.set(button, { opacity: 0, scale: 0.9 });
      gsap.set(corners, { opacity: 0, scale: 0.8 });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollIndicatorRef.current) {
        const opacity = Math.max(0, 1 - (window.scrollY / (window.innerHeight * 0.5)));
        scrollIndicatorRef.current.style.opacity = opacity.toString();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update the auto-scroll effect (place this with the other useEffect hooks)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const startAutoScroll = () => {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % 3);
      }, 6000); // Change slide every 6 seconds
    };

    startAutoScroll();

    // Pause auto-scroll when user interacts with carousel
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('mouseenter', () => clearInterval(interval));
      carousel.addEventListener('mouseleave', startAutoScroll);
    }

    return () => {
      clearInterval(interval);
      if (carousel) {
        carousel.removeEventListener('mouseenter', () => clearInterval(interval));
        carousel.removeEventListener('mouseleave', startAutoScroll);
      }
    };
  }, []);

  // Add this function for manual navigation
  const handleSlideChange = (newSlide: number) => {
    setCurrentSlide(newSlide);
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="bg-image absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: `url(${medievalCastleBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1.1)',
          filter: 'brightness(0.2) sepia(50%)'
        }}
      />

      {/* Overlay with animated gradient */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-[#7A1F1F] to-[#1B1B1B] transition-opacity duration-1000"
      />

      {/* Main Content */}
      <div className="relative min-h-screen flex flex-col">
        {/* Hero Section - Centered in viewport */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-screen px-4">
          <div className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-16"
            >
              <img 
                src="./images/celtic-knot.png" 
                alt="Celtic Knot Ornament" 
                className="w-24 md:w-32 mx-auto"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(194, 163, 93, 0.5))'
                }}
              />
            </motion.div>

            <h1 
              ref={titleRef}
              className="font-medieval text-4xl md:text-6xl lg:text-7xl text-[#C2A35D] mb-8 tracking-wider text-center max-w-4xl"
            >
              MYSTERIUM MEDII AEVI
            </h1>

            <h2 
              ref={subtitleRef}
              className="font-medieval text-3xl md:text-4xl lg:text-5xl text-[#F5ECD9] tracking-wide mb-16 text-center"
            >
              Un Viaggio nel Cuore del Medioevo
            </h2>

            {/* Quick Navigation Links */}
            <div ref={navLinksRef} className="flex flex-wrap justify-center gap-4">
              {['Cronologia', 'Personaggi', 'Luoghi', 'Arte'].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(194, 163, 93, 0.2)',
                    borderColor: 'rgba(194, 163, 93, 0.5)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-[#0E0E0E]/50 text-[#C2A35D] border border-[#C2A35D]/30 rounded-sm font-medieval hover:bg-[#C2A35D]/20 transition-all duration-300"
                >
                  {item}
                </motion.button>
              ))}
            </div>

            {/* Refined Scroll Indicator - Bottom Right */}
            <motion.div
              ref={scrollIndicatorRef}
              className="scroll-indicator hidden lg:flex flex-col items-center fixed bottom-12 right-12 gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3.5 }}
            >
              <motion.span
                className="text-[#F5ECD9] font-medieval text-base whitespace-nowrap"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Scorri verso il basso
              </motion.span>
              <motion.div
                animate={{ 
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <GiFeather 
                  className="w-8 h-8 text-[#C2A35D] transform rotate-[30deg]"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="w-full mt-[20vh]">
          {/* Decorative Medieval Divider */}
          <div className="w-full max-w-4xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <img 
                src="./images/celtic-knot.png" 
                alt="Celtic Knot Ornament" 
                className="w-24 md:w-32 mx-auto"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(194, 163, 93, 0.5))'
                }}
              />
            </motion.div>
          </div>

          {/* Journey Call-to-Action Panel */}
          <motion.div 
            ref={contentRef}
            className="max-w-4xl mx-auto px-4 mb-32"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="relative p-8 bg-[#0E0E0E]/95 backdrop-blur-sm border border-[#C2A35D] content-panel group"
              whileHover={{ 
                boxShadow: "0 0 40px rgba(122, 31, 31, 0.2)",
                scale: 1.01,
                transition: { duration: 0.3 }
              }}
            >
              {/* Corner decorations with enhanced visibility */}
              <motion.div 
                className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#C2A35D] corner-decoration"
                whileHover={{ scale: 1.1, opacity: 0.9 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div 
                className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#C2A35D] corner-decoration"
                whileHover={{ scale: 1.1, opacity: 0.9 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#C2A35D] corner-decoration"
                whileHover={{ scale: 1.1, opacity: 0.9 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#C2A35D] corner-decoration"
                whileHover={{ scale: 1.1, opacity: 0.9 }}
                transition={{ duration: 0.2 }}
              />

              {/* Enhanced background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#7A1F1F]/10 to-[#0E0E0E]/80 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative text-center z-10">
                <motion.h3 
                  className="font-medieval text-2xl md:text-3xl text-[#C2A35D] mb-8 panel-text tracking-wider"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  Scegli il tuo cammino attraverso i secoli: ogni argomento è una porta verso i misteri del Medioevo
                </motion.h3>
                <Link href="introduzione.tsx">
                  <motion.button 
                    className="px-12 py-4 bg-[#7A1F1F]/20 border-2 border-[#C2A35D] text-[#C2A35D] font-medieval text-xl tracking-wider relative overflow-hidden group cta-button"
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: 'rgba(122, 31, 31, 0.4)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="relative z-10">Inizia il Viaggio</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#7A1F1F]/40 to-[#A23232]/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Feature Cards Section */}
          <div className="w-full max-w-7xl mx-auto grid md:grid-cols-3 gap-12 px-8 mb-32" ref={featuresRef}>
            {[
              {
                icon: "crown" as const,
                title: "Società Feudale",
                description: "La struttura sociale del Medioevo, basata su legami di fedeltà e protezione, ha influenzato profondamente lo sviluppo delle istituzioni europee."
              },
              {
                icon: "castle" as const,
                title: "Arte e Architettura",
                description: "Le cattedrali gotiche e i castelli medievali testimoniano l'incredibile maestria degli artigiani e architetti dell'epoca."
              },
              {
                icon: "scroll" as const,
                title: "Cultura e Sapere",
                description: "La rinascita culturale del Medioevo pose le basi per il successivo sviluppo del Rinascimento e dell'età moderna."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.2,
                  ease: [0.21, 0.68, 0.44, 0.99]
                }}
                className="relative group feature-card"
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="relative h-[240px] bg-[#0E0E0E]/80 backdrop-blur-sm overflow-hidden"
                  whileHover={{ 
                    boxShadow: "0 0 30px rgba(194, 163, 93, 0.2)"
                  }}
                >
                  {/* Golden frame with animated gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C2A35D]/20 to-[#A23232]/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-[1px] bg-[#0E0E0E]/90"></div>
                  
                  {/* Animated decorative border */}
                  <div className="absolute inset-0 border border-[#C2A35D]/30 group-hover:border-[#C2A35D]/50 transition-colors duration-300"></div>
                  <motion.div 
                    className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#C2A35D]/40"
                    whileHover={{ scale: 1.2, opacity: 0.8 }}
                  ></motion.div>
                  <motion.div 
                    className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#C2A35D]/40"
                    whileHover={{ scale: 1.2, opacity: 0.8 }}
                  ></motion.div>

                  {/* Content wrapper */}
                  <div className="relative z-10 flex flex-col items-center justify-between h-full p-6">
                    {/* Icon container with hover effect */}
                    <motion.div 
                      className="mb-4 transform group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="w-16 h-16 relative">
                        {/* Animated circle border */}
                        <div className="absolute inset-0 rounded-full border-2 border-[#C2A35D]/30 group-hover:border-[#C2A35D]/60 transition-colors duration-300"></div>
                        {/* Glowing effect on hover */}
                        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                          background: 'radial-gradient(circle at center, rgba(194, 163, 93, 0.2) 0%, transparent 70%)'
                        }}></div>
                        {/* Main icon with hover animation */}
                        <motion.div 
                          className="absolute inset-0 flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <MedievalIcon 
                            type={feature.icon}
                            className="w-8 h-8 text-[#C2A35D] transform group-hover:text-[#C2A35D] transition-colors duration-300"
                          />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Text content with hover effects */}
                    <div className="flex-1 flex flex-col justify-center">
                      <motion.h3 
                        className="font-medieval text-2xl text-[#C2A35D] mb-3 text-center group-hover:text-[#C2A35D] transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {feature.title}
                      </motion.h3>
                      <motion.p 
                        className="text-[#F5ECD9] text-center text-sm leading-relaxed group-hover:text-[#F5ECD9] transition-colors duration-300"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        {feature.description}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Medieval Daily Facts Section with Decorative Dividers */}
          <section className="relative py-16 bg-[#0E0E0E]/80 backdrop-blur-sm">
            {/* Top Decorative Divider */}
            <div className="w-full h-8 relative mb-12">
              <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#C2A35D] to-transparent" />
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16">
                <img 
                  src="./images/celtic-knot.png" 
                  alt="Celtic Divider" 
                  className="w-full h-full object-contain"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(194, 163, 93, 0.3))'
                  }}
                />
              </div>
            </div>

            <div className="container mx-auto px-4">
              {/* Daily Fact Carousel - With Auto-scroll */}
              <div className="max-w-6xl mx-auto mb-16">
                <h2 className="font-medieval text-2xl text-[#C2A35D] mb-6 text-center">Curiosità del Giorno</h2>
                <div 
                  className="relative rounded-lg overflow-hidden bg-[#0E0E0E]/90 border border-[#C2A35D]/20"
                  ref={carouselRef}
                >
                  <div 
                    className="flex transition-transform duration-1000 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {[
                      {
                        image: "https://images.unsplash.com/photo-1585166059782-f28143545183?w=1600&h=900&fit=crop",
                        fact: "Nel Medioevo, i monaci utilizzavano una tecnica particolare per la produzione della pergamena: immergevano le pelli di pecora in una soluzione di calce per 8 giorni, poi le raschiavano con una lama curva chiamata 'lunellum'. Un solo libro richiedeva la pelle di un intero gregge."
                      },
                      {
                        image: "https://images.unsplash.com/photo-1578930331269-d7c2554c0374?w=1600&h=900&fit=crop",
                        fact: "Le torri dei castelli medievali erano costruite con scale a chiocciola che giravano in senso orario salendo. Questo design non era casuale: costringeva gli attaccanti destrorsi a combattere in una posizione svantaggiosa, mentre i difensori avevano più spazio per usare la spada."
                      },
                      {
                        image: "https://images.unsplash.com/photo-1519326844852-704caea5679e?w=1600&h=900&fit=crop",
                        fact: "Nel XIII secolo, gli orologi meccanici erano così rari e preziosi che alcune città impiegavano un 'custode del tempo' il cui unico compito era mantenere l'orologio della torre civica funzionante. Questa figura era pagata più di un artigiano specializzato."
                      }
                    ].map((slide, index) => (
                      <div
                        key={index}
                        className="min-w-full relative"
                      >
                        <div className="relative h-[400px]">
                          <img
                            src={slide.image}
                            alt={`Medieval curiosity ${index + 1}`}
                            className="w-full h-full object-cover"
                            style={{ filter: 'brightness(0.7)' }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/30 to-transparent" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#0E0E0E] to-transparent">
                          <p className="text-[#F5ECD9] text-lg leading-relaxed max-w-4xl mx-auto text-center">
                            {slide.fact}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Carousel Navigation Dots */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-10">
                    {[0, 1, 2].map((dot) => (
                      <button
                        key={dot}
                        onClick={() => setCurrentSlide(dot)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          currentSlide === dot 
                            ? 'bg-[#C2A35D] scale-125' 
                            : 'bg-[#C2A35D]/30 hover:bg-[#C2A35D]/50'
                        }`}
                        aria-label={`Go to slide ${dot + 1}`}
                      />
                    ))}
                  </div>

                  {/* Carousel Controls */}
                  <button
                    onClick={() => handleSlideChange((currentSlide - 1 + 3) % 3)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-[#0E0E0E]/60 border border-[#C2A35D]/30 text-[#C2A35D] hover:bg-[#7A1F1F]/40 transition-colors duration-300 z-10"
                    aria-label="Previous slide"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => handleSlideChange((currentSlide + 1) % 3)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-[#0E0E0E]/60 border border-[#C2A35D]/30 text-[#C2A35D] hover:bg-[#7A1F1F]/40 transition-colors duration-300 z-10"
                    aria-label="Next slide"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Interactive Topic Cards - Fixed 3D Flip Implementation */}
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
                {[
                  {
                    title: "Armi e Armature",
                    image: "./images/medieval/weapons.jpg",
                    description: "Scopri l'evoluzione delle armi e delle armature medievali, dalla cotta di maglia alle elaborate armature a piastre del XV secolo."
                  },
                  {
                    title: "Vita di Corte",
                    image: "./images/medieval/court.jpg",
                    description: "Esplora gli intrighi, le cerimonie e le tradizioni che caratterizzavano la vita quotidiana nelle corti medievali."
                  },
                  {
                    title: "Arti e Mestieri",
                    image: "./images/medieval/crafts.jpg",
                    description: "Immergiti nel mondo degli artigiani medievali: fabbri, vetrai, miniatori e costruttori di cattedrali."
                  }
                ].map((card, index) => (
                  <div
                    key={card.title}
                    className="flip-card-container h-[400px] cursor-pointer"
                  >
                    <div className="flip-card">
                      {/* Card Front */}
                      <div className="flip-card-front">
                        <div className="relative h-full bg-[#0E0E0E] border border-[#C2A35D]/30 rounded-lg overflow-hidden">
                          <div className="absolute inset-0">
                            <img
                              src={card.image}
                              alt={card.title}
                              className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/50 to-transparent" />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                            <h3 className="font-medieval text-xl text-[#C2A35D] mb-2">{card.title}</h3>
                            <div className="text-[#F5ECD9]/60 text-sm">Clicca per saperne di più</div>
                          </div>
                        </div>
                      </div>

                      {/* Card Back */}
                      <div className="flip-card-back">
                        <div className="h-full bg-[#7A1F1F]/20 border border-[#C2A35D]/30 rounded-lg p-6 flex flex-col justify-center items-center text-center">
                          <h3 className="font-medieval text-xl text-[#C2A35D] mb-4">{card.title}</h3>
                          <p className="text-[#F5ECD9] leading-relaxed">{card.description}</p>
                          <button className="mt-6 px-6 py-2 border border-[#C2A35D]/50 text-[#C2A35D] font-medieval hover:bg-[#C2A35D]/10 transition-colors duration-300">
                            Scopri di più
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Decorative Divider */}
            <div className="w-full h-8 relative mt-12">
              <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#C2A35D] to-transparent" />
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rotate-180">
                <img 
                  src="./images/celtic-knot.png" 
                  alt="Celtic Divider" 
                  className="w-full h-full object-contain"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(194, 163, 93, 0.3))'
                  }}
                />
              </div>
            </div>
          </section>

          {/* Medieval Footer */}
          <footer className="relative bg-[#0E0E0E] border-t border-[#C2A35D]/20">
            {/* Decorative Top Border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C2A35D]/30 to-transparent" />
            
            {/* Background Pattern */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C2A35D' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }}
            />

            <div className="container mx-auto px-4 py-12 relative">
              {/* Main Footer Content */}
              <div className="grid md:grid-cols-4 gap-8 mb-12">
                {/* Logo & About */}
                <div className="md:col-span-2">
                  <h3 className="font-medieval text-xl text-[#C2A35D] mb-4">Mysterium Medii Aevi</h3>
                  <p className="text-[#F5ECD9]/80 mb-6 max-w-md">
                    Un viaggio attraverso i secoli oscuri, alla scoperta dei misteri e delle meraviglie del Medioevo. Unisciti a noi in questa straordinaria avventura nel passato.
                  </p>
                  {/* Newsletter Signup */}
                  <div className="relative max-w-md">
                    <input
                      type="email"
                      placeholder="La tua email per ricevere aggiornamenti..."
                      className="w-full px-4 py-2 bg-[#1B1B1B] border border-[#C2A35D]/30 rounded-sm text-[#F5ECD9] placeholder-[#F5ECD9]/40 focus:outline-none focus:border-[#C2A35D]"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-[#7A1F1F] text-[#F5ECD9] hover:bg-[#A23232] transition-colors duration-300 rounded-sm text-sm">
                      Iscriviti
                    </button>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="font-medieval text-lg text-[#C2A35D] mb-4 flex items-center">
                    <GiScrollUnfurled className="w-5 h-5 mr-2" />
                    Collegamenti Rapidi
                  </h4>
                  <ul className="space-y-2">
                    {[
                      { label: 'Home', href: '/' },
                      { label: 'Storia', href: '/storia' },
                      { label: 'Personaggi', href: '/personaggi' },
                      { label: 'Luoghi', href: '/luoghi' },
                      { label: 'Contatti', href: '/contatti' }
                    ].map((link) => (
                      <li key={link.label}>
                        <Link 
                          href={link.href}
                          className="text-[#F5ECD9]/70 hover:text-[#C2A35D] transition-colors duration-300 flex items-center"
                        >
                          <div className="w-1 h-1 bg-[#C2A35D]/40 rounded-full mr-2" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="font-medieval text-lg text-[#C2A35D] mb-4 flex items-center">
                    <GiFeather className="w-5 h-5 mr-2" />
                    Seguici
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Facebook', icon: GiShield },
                      { label: 'Twitter', icon: GiSwordClash },
                      { label: 'Instagram', icon: GiTreasureMap },
                      { label: 'YouTube', icon: GiCastle }
                    ].map((social) => (
                      <a
                        key={social.label}
                        href="#"
                        className="flex items-center text-[#F5ECD9]/70 hover:text-[#C2A35D] transition-colors duration-300"
                      >
                        <social.icon className="w-5 h-5 mr-2" />
                        {social.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="pt-8 border-t border-[#C2A35D]/20">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-[#F5ECD9]/60 text-sm text-center md:text-left mb-4 md:mb-0">
                    © {new Date().getFullYear()} Mysterium Medii Aevi. Tutti i diritti riservati.
                  </p>
                  <div className="flex space-x-6">
                    <a href="#" className="text-[#F5ECD9]/60 hover:text-[#C2A35D] text-sm transition-colors duration-300">
                      Privacy Policy
                    </a>
                    <a href="#" className="text-[#F5ECD9]/60 hover:text-[#C2A35D] text-sm transition-colors duration-300">
                      Termini di Servizio
                    </a>
                  </div>
                </div>
              </div>

              {/* Call to Action Button */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <Link href="/join">
                  <button className="px-8 py-3 bg-[#7A1F1F] border border-[#C2A35D]/50 text-[#F5ECD9] font-medieval hover:bg-[#A23232] transition-colors duration-300 rounded-sm shadow-lg flex items-center space-x-2">
                    <span>Unisciti al Viaggio Medievale</span>
                    <span className="text-[#C2A35D]">→</span>
                  </button>
                </Link>
              </div>
            </div>
          </footer>

          {/* Add necessary CSS for card flipping - Fixed Implementation */}
          <style>{`
            .flip-card-container {
              perspective: 1000px;
            }

            .flip-card {
              position: relative;
              width: 100%;
              height: 100%;
              transition: transform 0.6s;
              transform-style: preserve-3d;
            }

            .flip-card-container:hover .flip-card,
            .flip-card-container:focus .flip-card {
              transform: rotateY(180deg);
            }

            .flip-card-front,
            .flip-card-back {
              position: absolute;
              width: 100%;
              height: 100%;
              backface-visibility: hidden;
              -webkit-backface-visibility: hidden;
            }

            .flip-card-back {
              transform: rotateY(180deg);
            }

            @media (hover: none) {
              .flip-card-container:active .flip-card {
                transform: rotateY(180deg);
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default Home;