import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-gradient-to-r from-charcoal/90 via-charcoal/95 to-charcoal/90 backdrop-blur-md shadow-lg border-b border-secondary/30" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center group">
          <div className="relative">
            <span className="text-secondary font-title text-3xl tracking-wider group-hover:text-foreground transition-colors duration-300">
              Mysterium
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-500"></div>
          </div>
        </Link>
        
        <div className="hidden md:flex space-x-10">
          <Link 
            href="/" 
            className={`font-medieval relative transition-colors duration-300 group ${
              location === "/" ? "text-secondary" : "text-foreground hover:text-secondary"
            }`}
          >
            <span>Home</span>
            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300 ${location === "/" ? "w-full" : ""}`}></span>
          </Link>
          <a 
            href="/#about" 
            className="text-foreground hover:text-secondary transition-colors duration-300 font-medieval relative group"
            onClick={(e) => {
              if (location === "/") {
                e.preventDefault();
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span>Introduzione</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
          </a>
          <Link 
            href="/curiosities" 
            className={`font-medieval relative transition-colors duration-300 group ${
              location === "/curiosities" ? "text-secondary" : "text-foreground hover:text-secondary"
            }`}
          >
            <span>Curiosità</span>
            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300 ${location === "/curiosities" ? "w-full" : ""}`}></span>
          </Link>
          <Link 
            href="/chi-siamo" 
            className={`font-medieval relative transition-colors duration-300 group ${
              location === "/chi-siamo" ? "text-secondary" : "text-foreground hover:text-secondary"
            }`}
          >
            <span>Chi Siamo</span>
            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300 ${location === "/chi-siamo" ? "w-full" : ""}`}></span>
          </Link>
        </div>
        
        <button 
          className="md:hidden text-foreground hover:text-secondary transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50 rounded-full p-1"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden bg-gradient-to-b from-charcoal to-charcoal/95 backdrop-blur-md border-t border-secondary/20 transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
          <Link 
            href="/" 
            className={`font-medieval text-center py-2 transition-colors duration-300 ${
              location === "/" ? "text-secondary" : "text-foreground hover:text-secondary"
            }`}
            onClick={closeMobileMenu}
          >
            <span className="relative">
              Home
              {location === "/" && <span className="absolute -bottom-1 left-1/4 right-1/4 h-0.5 bg-secondary"></span>}
            </span>
          </Link>
          <a 
            href="/#about" 
            className="text-foreground hover:text-secondary transition-colors duration-300 font-medieval text-center py-2"
            onClick={(e) => {
              closeMobileMenu();
              if (location === "/") {
                e.preventDefault();
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Introduzione
          </a>
          <Link 
            href="/curiosities" 
            className={`font-medieval text-center py-2 transition-colors duration-300 ${
              location === "/curiosities" ? "text-secondary" : "text-foreground hover:text-secondary"
            }`}
            onClick={closeMobileMenu}
          >
            <span className="relative">
              Curiosità
              {location === "/curiosities" && <span className="absolute -bottom-1 left-1/4 right-1/4 h-0.5 bg-secondary"></span>}
            </span>
          </Link>
          <Link 
            href="/chi-siamo" 
            className={`font-medieval text-center py-2 transition-colors duration-300 ${
              location === "/chi-siamo" ? "text-secondary" : "text-foreground hover:text-secondary"
            }`}
            onClick={closeMobileMenu}
          >
            <span className="relative">
              Chi Siamo
              {location === "/chi-siamo" && <span className="absolute -bottom-1 left-1/4 right-1/4 h-0.5 bg-secondary"></span>}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
