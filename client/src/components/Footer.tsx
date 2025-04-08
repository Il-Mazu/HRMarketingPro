import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-charcoal to-charcoal/95 border-t border-secondary/20 py-12 relative">
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 w-full h-2 bg-gradient-to-r from-transparent via-secondary/40 to-transparent"></div>
      <div className="absolute left-4 md:left-10 top-6 w-16 h-16 md:w-24 md:h-24 opacity-20 bg-secondary/20 rounded-full blur-md"></div>
      <div className="absolute right-4 md:right-10 top-6 w-16 h-16 md:w-24 md:h-24 opacity-20 bg-secondary/20 rounded-full blur-md"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Medieval decorative ornament */}
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mb-2"></div>
          <div className="w-52 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mb-8"></div>
          
          {/* Logo and text */}
          <div className="text-center mb-10">
            <h2 className="font-title text-3xl md:text-4xl text-secondary mb-4 glow-text">Mysterium Medii Aevi</h2>
            <div className="h-0.5 w-32 bg-secondary/30 mx-auto mb-4"></div>
            <p className="text-foreground/90 font-medieval text-sm max-w-lg mx-auto italic">
              "Un viaggio nel fascino e nei misteri dell'epoca medievale, attraverso storie, curiosità e meraviglie dimenticate del passato"
            </p>
          </div>
          
          {/* Navigation links with ornate styling */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-10">
            <Link href="/" className="group relative">
              <span className="text-foreground/80 hover:text-secondary transition-colors duration-300 text-base font-medieval">Home</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/curiosities" className="group relative">
              <span className="text-foreground/80 hover:text-secondary transition-colors duration-300 text-base font-medieval">Curiosità</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/chi-siamo" className="group relative">
              <span className="text-foreground/80 hover:text-secondary transition-colors duration-300 text-base font-medieval">Chi Siamo</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
          
          {/* Medieval ornament separator */}
          <div className="flex items-center justify-center w-full mb-6">
            <div className="h-px w-1/6 bg-gradient-to-r from-transparent to-secondary/50"></div>
            <div className="mx-4 text-secondary">❧</div>
            <div className="h-px w-1/6 bg-gradient-to-l from-transparent to-secondary/50"></div>
          </div>
          
          {/* Copyright with medieval styling */}
          <div className="text-center">
            <p className="text-foreground/60 text-xs tracking-wide font-medieval">
              © Anno Domini {new Date().getFullYear()} • Mysterium Medii Aevi • Tutti i diritti riservati
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
