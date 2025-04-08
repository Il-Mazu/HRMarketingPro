import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const medievalFacts = [
  {
    id: 1,
    title: "Il Carnevale Medievale",
    content: "Durante il periodo medievale, il carnevale era una celebrazione straordinaria che vedeva nobili e popolani unirsi in festeggiamenti sfrenati. Per tre giorni, le rigide gerarchie sociali si dissolvevano in un turbinio di maschere, danze e rappresentazioni teatrali.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200"
  },
  {
    id: 2,
    title: "Le Giostre dei Cavalieri",
    content: "I tornei cavallereschi erano molto più di semplici competizioni: rappresentavano veri e propri spettacoli di abilità, coraggio e nobiltà d'animo. I cavalieri, bardati nelle loro lucenti armature, si sfidavano in prove di destrezza che includevano non solo il classico duello con la lancia, ma anche tiro con l'arco a cavallo e complesse coreografie militari.",
    image: "https://images.unsplash.com/photo-1490902931801-d6f80ca94fe4?q=80&w=1200"
  },
  {
    id: 3,
    title: "L'Arte dei Mastri Vetrai",
    content: "Le vetrate delle cattedrali medievali non erano solo elementi decorativi, ma veri e propri libri illustrati per i fedeli che non sapevano leggere. I mastri vetrai svilupparono tecniche incredibilmente sofisticate per creare scene bibliche e agiografiche di straordinaria bellezza.",
    image: "https://images.unsplash.com/photo-1616606484004-5ef3cc46e39d?q=80&w=1200"
  }
];

const MedievalDailyFact = () => {
  const [currentFact, setCurrentFact] = useState(medievalFacts[0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        const currentIndex = medievalFacts.findIndex(fact => fact.id === currentFact.id);
        const nextIndex = (currentIndex + 1) % medievalFacts.length;
        setCurrentFact(medievalFacts[nextIndex]);
        setIsVisible(true);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, [currentFact]);

  return (
    <div className="relative w-full bg-[#1a1a1a] rounded-lg overflow-hidden border border-amber-200/20">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-200/40"></div>
      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-amber-200/40"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-amber-200/40"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-200/40"></div>

      <div className="relative h-[400px]">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
          style={{
            backgroundImage: `url(${currentFact.image})`,
            filter: 'brightness(0.3)',
            opacity: isVisible ? 1 : 0
          }}
        />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          className="relative p-8 h-full flex flex-col justify-end"
        >
          <h2 className="font-medieval text-amber-200 text-2xl mb-4">
            Curiosità del Giorno
          </h2>
          <h3 className="font-medieval text-amber-200 text-xl mb-4">
            {currentFact.title}
          </h3>
          <p className="text-stone-300">
            {currentFact.content}
          </p>
        </motion.div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {medievalFacts.map((fact) => (
          <button
            key={fact.id}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              fact.id === currentFact.id
                ? 'bg-amber-200 scale-125'
                : 'bg-amber-200/30 hover:bg-amber-200/50'
            }`}
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => {
                setCurrentFact(fact);
                setIsVisible(true);
              }, 500);
            }}
          />
        ))}
      </div>

      {/* Decorative medieval flourish */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-32 h-1">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/40 to-transparent"></div>
      </div>
    </div>
  );
};

export default MedievalDailyFact; 