import React from 'react';
import { motion } from 'framer-motion';
import MedievalIcon from './MedievalIcon';

interface Kingdom {
  id: string;
  name: string;
  icon: 'crown' | 'fleurDeLis' | 'column';
  color: string;
  position: {
    x: number;
    y: number;
  };
  description: string;
}

interface MedievalMapProps {
  kingdoms?: Kingdom[];
}

const MedievalMap: React.FC<MedievalMapProps> = ({ kingdoms = [] }) => {
  return (
    <div className="relative w-full aspect-[4/3] bg-[#1a1a1a] rounded-lg overflow-hidden">
      {/* Map content */}
      <div className="relative w-full h-full p-8">
        {/* Kingdoms */}
        {kingdoms?.map((kingdom) => (
          <motion.div
            key={kingdom.id}
            className="absolute group"
            style={{
              left: `${kingdom.position.x}%`,
              top: `${kingdom.position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            whileHover={{ scale: 1.1 }}
          >
            {/* Kingdom circle */}
            <motion.div
              className="relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div 
                className={`w-16 h-16 rounded-full bg-[#1a1a1a] ${kingdom.color} bg-opacity-20 border-2 border-opacity-40
                           group-hover:bg-opacity-30 group-hover:border-opacity-60 transition-all duration-300
                           flex items-center justify-center relative`}
              >
                {/* Icon */}
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  <MedievalIcon type={kingdom.icon} className="w-8 h-8" />
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-amber-200 opacity-0 group-hover:opacity-10
                              filter blur-md transition-opacity duration-300"></div>
              </div>

              {/* Kingdom info */}
              <motion.div
                className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 bg-[#1a1a1a] border border-amber-200/20
                           p-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300
                           shadow-lg min-w-[200px] max-w-[250px] text-center z-20"
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
              >
                <h3 className="text-amber-200 font-medieval text-lg mb-2">{kingdom.name}</h3>
                <p className="text-stone-300 text-sm">{kingdom.description}</p>
                
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-200/40"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-amber-200/40"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-amber-200/40"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-amber-200/40"></div>
                
                {/* Arrow pointer */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                  <div className="w-3 h-3 bg-[#1a1a1a] border-t border-l border-amber-200/20 transform rotate-45"></div>
                </div>
              </motion.div>

              {/* Connection lines */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {kingdoms
                  .filter(k => k.id !== kingdom.id)
                  .map(k => (
                    <div
                      key={`${kingdom.id}-${k.id}`}
                      className="absolute w-px bg-amber-200/20 origin-center"
                      style={{
                        height: '100px',
                        left: '50%',
                        top: '50%',
                        transform: `rotate(${Math.atan2(
                          k.position.y - kingdom.position.y,
                          k.position.x - kingdom.position.x
                        )}rad)`
                      }}
                    ></div>
                  ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Decorative frame */}
      <div className="absolute inset-4 border-2 border-amber-200/20 pointer-events-none"></div>
      <div className="absolute inset-3 border border-amber-200/10 pointer-events-none"></div>
      
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-200/40 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-amber-200/40 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-amber-200/40 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-200/40 pointer-events-none"></div>
    </div>
  );
};

export default MedievalMap; 