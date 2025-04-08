import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Assicuriamoci che ScrollTrigger sia registrato
gsap.registerPlugin(ScrollTrigger);

interface ScrollSwordProps {
  mainTitleId: string;
}

const ScrollSword = ({ mainTitleId }: ScrollSwordProps) => {
  const swordRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const sword = swordRef.current;
    const mainTitle = document.getElementById(mainTitleId);
    
    if (!sword || !mainTitle) return;
    
    // Initial appearance animation
    gsap.fromTo(sword, 
      { 
        rotate: -90, 
        scale: 0.5, 
        y: 100, 
        opacity: 0 
      },
      { 
        rotate: -45, 
        scale: 1, 
        y: 0, 
        opacity: 0.8, 
        duration: 1.5, 
        ease: "power3.out",
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
    
    return () => {
      // Clean up ScrollTrigger instances to prevent memory leaks
      ScrollTrigger.getAll().forEach(instance => instance.kill());
    };
  }, [mainTitleId]);
  
  return (
    <div className="absolute z-10 w-full h-full flex justify-center items-center pointer-events-none">
      {/* Spada principale dettagliata con effetto glow */}
      <img 
        ref={swordRef}
        className="w-1/3 md:w-1/4 lg:w-1/5 relative z-10"
        src="/images/medieval-sword-detailed.svg"
        alt="Spada medievale decorativa" 
        style={{ 
          filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 6px rgba(191, 155, 48, 0.3))',
          transform: 'rotate(-45deg)'
        }}
      />
    </div>
  );
};

export default ScrollSword;
