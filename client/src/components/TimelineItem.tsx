import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Assicuriamoci che ScrollTrigger sia registrato
gsap.registerPlugin(ScrollTrigger);

interface TimelineItemProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  index: number;
}

const TimelineItem = ({
  title,
  description,
  imageSrc,
  imageAlt,
  imagePosition = "right",
  index
}: TimelineItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const element = itemRef.current;
    const titleElement = titleRef.current;
    const textElement = textRef.current;
    const imageElement = imageRef.current;
    
    if (!element || !titleElement || !textElement || !imageElement) return;
    
    // Create timeline for advanced animation sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
    
    // Animate title first
    tl.fromTo(
      titleElement,
      { 
        opacity: 0,
        y: -20,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      }
    );
    
    // Animate text next
    tl.fromTo(
      textElement,
      { 
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      },
      "-=0.2" // Start slightly before the previous animation finishes
    );
    
    // Animate image with a special effect
    tl.fromTo(
      imageElement,
      {
        opacity: 0,
        scale: 0.8,
        rotate: imagePosition === "left" ? -5 : 5
      },
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)"
      },
      "-=0.3" // Start slightly before the previous animation finishes
    );
    
    // Add hover effects after animation is complete
    if (imageElement) {
      imageElement.addEventListener("mouseenter", () => {
        gsap.to(imageElement, {
          scale: 1.05,
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          duration: 0.3
        });
      });
      
      imageElement.addEventListener("mouseleave", () => {
        gsap.to(imageElement, {
          scale: 1,
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          duration: 0.3
        });
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
      
      if (imageElement) {
        imageElement.removeEventListener("mouseenter", () => {});
        imageElement.removeEventListener("mouseleave", () => {});
      }
    };
  }, [index, imagePosition]);
  
  return (
    <div ref={itemRef} className="timeline-item pb-8">
      <h3 
        ref={titleRef} 
        className="font-medieval text-2xl md:text-3xl text-primary mb-4 tracking-wide"
        style={{ opacity: 0 }}
      >
        {title}
      </h3>
      
      <div className={`flex flex-col ${imagePosition === "left" ? "md:flex-row-reverse" : "md:flex-row"} gap-6 md:gap-8 items-center`}>
        <div className="md:w-2/3">
          <p 
            ref={textRef}
            className="text-charcoal leading-relaxed"
            style={{ opacity: 0 }}
          >
            {description}
          </p>
        </div>
        <div className="md:w-1/3 flex justify-center items-start">
          <img 
            ref={imageRef}
            src={imageSrc} 
            alt={imageAlt} 
            className="rounded-md shadow-xl w-full h-48 object-cover border border-secondary/20 transition-transform duration-300 cursor-pointer"
            style={{ opacity: 0 }}
          />
        </div>
      </div>
      
      {/* Timeline dot with pulse animation */}
      <div className="timeline-marker absolute left-0 w-6 h-6 rounded-full bg-secondary border-4 border-primary shadow-glow animate-pulse-subtle"></div>
    </div>
  );
};

export default TimelineItem;
