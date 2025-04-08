import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollSwordProps {
  mainTitleId: string;
}

const ScrollSword = ({ mainTitleId }: ScrollSwordProps) => {
  const swordRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const sword = swordRef.current;
    const mainTitle = document.getElementById(mainTitleId);
    
    if (!sword || !mainTitle) return;
    
    // Set initial state
    gsap.set(sword, {
      rotate: -45,
      scale: 1,
      opacity: 0.5,
    });
    
    // Create sword animation on scroll
    const swordAnim = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      }
    });
    
    swordAnim.to(sword, {
      scale: 2.5,
      rotate: -20,
      opacity: 0.8,
      ease: "power1.inOut",
    });
    
    // Create title animation on scroll
    const titleAnim = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      }
    });
    
    titleAnim.to(mainTitle, {
      y: -100,
      opacity: 0.2,
      ease: "power1.inOut",
    });
    
    return () => {
      // Clean up ScrollTrigger instances to prevent memory leaks
      ScrollTrigger.getAll().forEach(instance => instance.kill());
    };
  }, [mainTitleId]);
  
  return (
    <div className="absolute z-10 w-full h-full flex justify-center items-center pointer-events-none">
      <img 
        ref={swordRef}
        className="w-1/4 md:w-1/6 transition-transform duration-500"
        src="https://images.unsplash.com/photo-1593466144596-10226e97e134?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        alt="Spada medievale decorativa" 
      />
    </div>
  );
};

export default ScrollSword;
