import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { GiScrollUnfurled, GiCrown } from "react-icons/gi";

interface MedievalPageHeaderProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

const MedievalPageHeader = ({ title, subtitle, backgroundImage = "/images/medieval-background.jpg" }: MedievalPageHeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    if (headerRef.current) {
      timeline
        .fromTo(
          headerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.5 }
        )
        .fromTo(
          titleRef.current,
          { 
            opacity: 0, 
            y: -50,
            scale: 0.9
          },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 1.2,
            ease: "elastic.out(1, 0.5)"
          },
          "-=0.5"
        )
        .fromTo(
          subtitleRef.current,
          { 
            opacity: 0, 
            y: 30,
            scale: 0.95
          },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 1,
            ease: "back.out(1.7)"
          },
          "-=0.8"
        )
        .fromTo(
          dividerRef.current,
          { 
            width: 0,
            opacity: 0
          },
          { 
            width: "100%", 
            opacity: 1, 
            duration: 1.2,
            ease: "power2.inOut"
          },
          "-=0.5"
        );
    }

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div 
      ref={headerRef}
      className="relative h-[400px] flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.92), rgba(80, 20, 20, 0.85))',
        boxShadow: 'inset 0 0 200px rgba(0,0,0,0.9)'
      }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: 'brightness(0.2) contrast(1.2) sepia(0.2)',
          transform: 'scale(1.05)',
          transition: 'transform 0.5s ease-out'
        }}
      />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        {/* Corner Ornaments */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-amber-500/30"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-amber-500/30"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-amber-500/30"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-amber-500/30"></div>
        
        {/* Diagonal Lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent transform -skew-y-2"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent transform skew-y-2"></div>
        
        {/* Vertical Ornaments */}
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2">
          <GiScrollUnfurled className="text-amber-500/30 w-12 h-12 mb-8" />
          <div className="h-32 w-[1px] mx-auto bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"></div>
          <GiCrown className="text-amber-500/30 w-12 h-12 mt-8" />
        </div>
        <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
          <GiScrollUnfurled className="text-amber-500/30 w-12 h-12 mb-8" />
          <div className="h-32 w-[1px] mx-auto bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"></div>
          <GiCrown className="text-amber-500/30 w-12 h-12 mt-8" />
        </div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Pre-title ornament */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-amber-500/50"></div>
          <GiCrown className="text-amber-400/80 w-8 h-8 mx-4 transform -translate-y-1" />
          <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-amber-500/50"></div>
        </div>
        
        <h1 
          ref={titleRef}
          className="text-5xl md:text-6xl font-medieval text-amber-300 mb-8 tracking-wider leading-tight"
          style={{
            textShadow: '0 0 25px rgba(210, 147, 38, 0.6), 0 0 45px rgba(210, 147, 38, 0.4), 0 0 65px rgba(210, 147, 38, 0.3)',
            letterSpacing: '0.15em'
          }}
        >
          {title}
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-stone-300 max-w-3xl mx-auto text-center font-medieval text-xl md:text-2xl mb-12"
          style={{
            textShadow: '0 0 15px rgba(255, 255, 255, 0.4)',
            letterSpacing: '0.1em'
          }}
        >
          {subtitle}
        </p>
        
        {/* Post-title ornament */}
        <div 
          ref={dividerRef}
          className="relative"
        >
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500/70 to-transparent"></div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-amber-500/30 flex items-center justify-center bg-black/50">
            <GiScrollUnfurled className="text-amber-400/80 w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedievalPageHeader; 