import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-charcoal to-charcoal/95 border-t border-secondary/20 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Medieval divider at top */}
          <div className="w-full max-w-md medieval-divider mb-8"></div>
          
          {/* Logo and text */}
          <div className="text-center mb-8">
            <h2 className="font-title text-3xl text-secondary mb-4 glow-text">Mysterium Medii Aevi</h2>
            <p className="text-foreground/90 font-medieval text-sm max-w-lg mx-auto">
              Un viaggio nel fascino e nei misteri dell'epoca medievale, attraverso storie, curiosità e meraviglie dimenticate del passato
            </p>
          </div>
          
          {/* Navigation links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-8">
            <Link href="/" className="text-foreground/80 hover:text-secondary transition-colors duration-300 text-sm font-medieval">
              Home
            </Link>
            <Link href="/curiosities" className="text-foreground/80 hover:text-secondary transition-colors duration-300 text-sm font-medieval">
              Curiosità
            </Link>
            <Link href="/chi-siamo" className="text-foreground/80 hover:text-secondary transition-colors duration-300 text-sm font-medieval">
              Chi Siamo
            </Link>
          </div>
          
          {/* Separator */}
          <div className="w-16 h-px bg-secondary/50 mb-6"></div>
          
          {/* Copyright */}
          <div className="text-center">
            <p className="text-foreground/60 text-xs">
              © {new Date().getFullYear()} - Mysterium Medii Aevi - Tutti i diritti riservati
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
