const Footer = () => {
  return (
    <footer className="bg-charcoal border-t border-secondary/30 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-medieval text-2xl text-secondary mb-4">Mysterium Medii Aevi</h2>
          <p className="text-foreground/80 text-sm">© {new Date().getFullYear()} - Un viaggio nel fascino e nei misteri del Medioevo</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
