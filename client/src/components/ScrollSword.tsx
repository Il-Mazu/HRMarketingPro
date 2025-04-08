import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Assicuriamoci che ScrollTrigger sia registrato
gsap.registerPlugin(ScrollTrigger);

interface ScrollSwordProps {
  mainTitleId: string;
}

const ScrollSword = ({ mainTitleId }: ScrollSwordProps) => {
  const swordRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tiltRotation, setTiltRotation] = useState({x: 0, y: 0});
  
  // Effetto di tilt dinamico sulla spada in base al movimento del mouse
  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current || !swordRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calcola la posizione relativa del mouse rispetto al centro
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Normalizza i valori per creare un effetto fluido ma limitato
    const tiltX = -(mouseY / rect.height) * 10; // tilt massimo di 10 gradi
    const tiltY = (mouseX / rect.width) * 10;
    
    setTiltRotation({x: tiltX, y: tiltY});
    
    // Effetto di movimento fluido con GSAP
    gsap.to(swordRef.current, {
      rotationX: tiltX,
      rotationY: tiltY,
      duration: 0.5,
      ease: "power2.out"
    });
  };
  
  // Resetta la rotazione quando il mouse esce dalla finestra
  const handleMouseLeave = () => {
    if (!swordRef.current) return;
    
    gsap.to(swordRef.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out"
    });
    
    setTiltRotation({x: 0, y: 0});
  };
  
  useEffect(() => {
    const sword = swordRef.current;
    const mainTitle = document.getElementById(mainTitleId);
    const container = containerRef.current;
    
    if (!sword || !mainTitle || !container) return;
    
    // Aggiungi event listener per il movimento del mouse
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // Initial appearance animation con effetto elastico
    gsap.fromTo(sword, 
      { 
        rotate: -90, 
        scale: 0.5, 
        y: 100, 
        opacity: 0,
        filter: 'drop-shadow(0 0 0px rgba(255, 255, 255, 0))'
      },
      { 
        rotate: -45, 
        scale: 1, 
        y: 0, 
        opacity: 0.8, 
        filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 6px rgba(191, 155, 48, 0.3))',
        duration: 1.5, 
        ease: "elastic.out(1, 0.5)",
        delay: 0.3
      }
    );
    
    // Advanced scroll animation for sword
    const swordAnim = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom center",
        scrub: true,
        pin: false,
        pinSpacing: false,
      }
    });
    
    swordAnim
      .to(sword, {
        scale: 2,
        rotate: 0,
        y: -30,
        opacity: 1,
        ease: "power2.inOut",
      })
      .to(sword, {
        scale: 3,
        rotate: 45,
        y: -100,
        opacity: 0.4,
        ease: "power2.inOut",
      }, "+=0.2");
    
    // Advanced scroll animation for title
    const titleAnim = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "center center",
        scrub: true,
      }
    });
    
    titleAnim.to(mainTitle, {
      y: -60,
      scale: 0.8,
      opacity: 0.1,
      ease: "power2.inOut",
    });
    
    // Aggiungi un effetto di pulsazione discreta e perpetua
    gsap.to(sword, {
      filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5)) drop-shadow(0 0 10px rgba(191, 155, 48, 0.5))',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    return () => {
      // Clean up ScrollTrigger instances to prevent memory leaks
      ScrollTrigger.getAll().forEach(instance => instance.kill());
      
      // Rimuovi gli event listener
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mainTitleId]);
  
  return (
    <div 
      ref={containerRef}
      className="absolute z-10 w-full h-full flex justify-center items-center"
      style={{ perspective: '1000px' }}
    >
      {/* Spada principale dettagliata con effetto glow e supporto per tilt 3D */}
      <img 
        ref={swordRef}
        className="w-1/3 md:w-1/4 lg:w-1/5 relative z-10 cursor-pointer transform transition-transform duration-300 hover:scale-105"
        src="/images/medieval-sword-detailed.svg"
        alt="Spada medievale decorativa" 
        style={{ 
          filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 6px rgba(191, 155, 48, 0.3))',
          transform: `rotate(-45deg) rotateX(${tiltRotation.x}deg) rotateY(${tiltRotation.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      />
      
      {/* Effetto di luce ambientale che segue la spada */}
      <div 
        className="absolute w-1/2 h-1/2 rounded-full bg-secondary/10 blur-3xl"
        style={{
          transform: `translate(${tiltRotation.y * 3}px, ${tiltRotation.x * 3}px)`,
          opacity: 0.3,
          transition: 'transform 0.5s ease-out'
        }}
      ></div>
    </div>
  );
};

export default ScrollSword;
