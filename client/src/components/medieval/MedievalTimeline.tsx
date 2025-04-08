import React from 'react';
import { motion } from 'framer-motion';

interface TimelineEvent {
  period: string;
  year: string;
  description: string;
}

interface MedievalTimelineProps {
  events?: TimelineEvent[];
}

const MedievalTimeline: React.FC<MedievalTimelineProps> = ({ events = [] }) => {
  return (
    <div className="relative w-full py-16">
      {/* Decorative frame */}
      <div className="absolute inset-0 border border-amber-200/30"></div>
      
      {/* Title */}
      <h2 className="text-3xl font-medieval text-amber-200 text-center mb-12">
        Linea del Tempo Medievale
      </h2>

      {/* Main timeline container */}
      <div className="relative px-4 py-8">
        {/* Main timeline line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-amber-200/30"></div>
        
        {/* Timeline events */}
        <div className="relative flex justify-between items-center">
          {events?.map((event, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Event dot */}
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-amber-200 z-10 relative"></div>
              </div>

              {/* Year label */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-amber-200 font-medieval text-sm">{event.year}</span>
              </div>

              {/* Period label and description */}
              <motion.div
                className="absolute -top-28 left-1/2 transform -translate-x-1/2 bg-[#1a1a1a]/95 
                           border border-amber-200/20 p-3 rounded opacity-0 group-hover:opacity-100 
                           transition-all duration-300 w-[280px] text-center z-20"
                initial={{ opacity: 0, y: -10 }}
                whileHover={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-amber-200 font-medieval text-lg mb-1">{event.period}</h3>
                <p className="text-stone-300 text-sm leading-snug">{event.description}</p>
                
                {/* Arrow pointer */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 rotate-45 
                              w-4 h-4 bg-[#1a1a1a]/95 border-r border-b border-amber-200/20"></div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedievalTimeline; 