import React from 'react';
import { motion } from 'framer-motion';

interface MedievalFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const MedievalFeatureCard: React.FC<MedievalFeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Main card */}
      <div className="relative bg-[#1a1a1a]/95 p-6 rounded-lg border border-amber-200/20 shadow-lg overflow-hidden">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-200/40 transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-top-left"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-200/40 transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-top-right"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-200/40 transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-bottom-left"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-200/40 transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-bottom-right"></div>

        {/* Content */}
        <div className="relative z-10">
          <div className="text-amber-200 mb-4 transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-medieval text-amber-200 mb-2">{title}</h3>
          <p className="text-stone-300">{description}</p>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 bg-amber-200/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
      </div>
    </motion.div>
  );
};

export default MedievalFeatureCard; 