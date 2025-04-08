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
  
  useEffect(() => {
    const element = itemRef.current;
    
    if (!element) return;
    
    // Create animation for timeline item
    gsap.fromTo(
      element,
      { 
        opacity: 0,
        y: 40 
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        delay: 0.1 * index
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [index]);
  
  return (
    <div ref={itemRef} className="timeline-item pb-16 opacity-0">
      <div className="timeline-marker"></div>
      <div className="ml-8 md:ml-12">
        <div className="parchment p-6 md:p-8 rounded-lg">
          <h3 className="font-medieval text-2xl text-primary mb-4">{title}</h3>
          <div className={`flex flex-col ${imagePosition === "left" ? "md:flex-row-reverse" : "md:flex-row"} gap-6`}>
            <div className="md:w-2/3">
              <p className="text-charcoal">{description}</p>
            </div>
            <div className="md:w-1/3">
              <img 
                src={imageSrc} 
                alt={imageAlt} 
                className="rounded-md shadow-md w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
