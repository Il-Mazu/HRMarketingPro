import { Link } from "wouter";
import { GiScrollUnfurled, GiFeather, GiShield, GiSwordClash, GiTreasureMap, GiCastle } from "react-icons/gi";

const MedievalFooter = () => {
  return (
    <footer className="relative bg-[#0E0E0E] border-t border-[#C2A35D]/20">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C2A35D]/30 to-transparent" />
      
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C2A35D' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 py-12 relative">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo & About */}
          <div className="md:col-span-2">
            <h3 className="font-medieval text-xl text-[#C2A35D] mb-4">Mysterium Medii Aevi</h3>
            <p className="text-[#F5ECD9]/80 mb-6 max-w-md">
              Un viaggio attraverso i secoli oscuri, alla scoperta dei misteri e delle meraviglie del Medioevo. Unisciti a noi in questa straordinaria avventura nel passato.
            </p>
            {/* Newsletter Signup */}
            <div className="relative max-w-md">
              <input
                type="email"
                placeholder="La tua email per ricevere aggiornamenti..."
                className="w-full px-4 py-2 bg-[#1B1B1B] border border-[#C2A35D]/30 rounded-sm text-[#F5ECD9] placeholder-[#F5ECD9]/40 focus:outline-none focus:border-[#C2A35D]"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-[#7A1F1F] text-[#F5ECD9] hover:bg-[#A23232] transition-colors duration-300 rounded-sm text-sm">
                Iscriviti
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medieval text-lg text-[#C2A35D] mb-4 flex items-center">
              <GiScrollUnfurled className="w-5 h-5 mr-2" />
              Collegamenti Rapidi
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Storia', href: '/storia' },
                { label: 'Personaggi', href: '/personaggi' },
                { label: 'Luoghi', href: '/luoghi' },
                { label: 'Contatti', href: '/contatti' }
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-[#F5ECD9]/70 hover:text-[#C2A35D] transition-colors duration-300 flex items-center"
                  >
                    <div className="w-1 h-1 bg-[#C2A35D]/40 rounded-full mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-medieval text-lg text-[#C2A35D] mb-4 flex items-center">
              <GiFeather className="w-5 h-5 mr-2" />
              Seguici
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Facebook', icon: GiShield },
                { label: 'Twitter', icon: GiSwordClash },
                { label: 'Instagram', icon: GiTreasureMap },
                { label: 'YouTube', icon: GiCastle }
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="flex items-center text-[#F5ECD9]/70 hover:text-[#C2A35D] transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5 mr-2" />
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#C2A35D]/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#F5ECD9]/60 text-sm text-center md:text-left mb-4 md:mb-0">
              © {new Date().getFullYear()} Mysterium Medii Aevi. Tutti i diritti riservati.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-[#F5ECD9]/60 hover:text-[#C2A35D] text-sm transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-[#F5ECD9]/60 hover:text-[#C2A35D] text-sm transition-colors duration-300">
                Termini di Servizio
              </a>
            </div>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
          <Link href="/join">
            <button className="px-8 py-3 bg-[#7A1F1F] border border-[#C2A35D]/50 text-[#F5ECD9] font-medieval hover:bg-[#A23232] transition-colors duration-300 rounded-sm shadow-lg flex items-center space-x-2">
              <span>Unisciti al Viaggio Medievale</span>
              <span className="text-[#C2A35D]">→</span>
            </button>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default MedievalFooter; 