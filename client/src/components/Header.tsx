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
      className={`fixed top-0 w-full z-50 border-b border-secondary/40 transition-all duration-300 ${
        scrolled ? "bg-charcoal/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="text-secondary font-medieval text-2xl">Mysterium</span>
        </Link>
        
        <div className="hidden md:flex space-x-8">
          <Link 
            href="/" 
            className={`font-medieval transition-colors duration-300 ${
              location === "/" ? "text-secondary" : "text-foreground hover:text-secondary"
            }`}
          >
            Home
          </Link>
          <a 
            href="/#about" 
            className="text-foreground hover:text-secondary transition-colors duration-300 font-medieval"
            onClick={(e) => {
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
            className={`font-medieval transition-colors duration-300 ${
              location === "/curiosities" ? "text-secondary" : "text-foreground hover:text-secondary"
            }`}
          >
            Curiosità
          </Link>
        </div>
        
        <button 
          className="md:hidden text-foreground hover:text-secondary"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden bg-charcoal border-t border-secondary/40 transition-all duration-300 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
          <Link 
            href="/" 
            className={`font-medieval text-center py-2 transition-colors duration-300 ${
              location === "/" ? "text-secondary" : "text-foreground hover:text-secondary"
            }`}
            onClick={closeMobileMenu}
          >
            Home
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
            Curiosità
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
