import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Logo } from './Logo';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Beds', id: 'beds' },
    { name: 'Sofas', id: 'sofas' },
    { name: 'Chairs', id: 'chairs' },
    { name: 'Dining Tables', id: 'dining-tables' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center"
            >
              <Logo />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Contact Info - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:+919471983191" className="flex items-center space-x-2 text-sm text-foreground/80 hover:text-foreground">
              <Phone className="w-4 h-4" />
              <span>+91 94719 83191</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-foreground/80 hover:text-foreground transition-colors py-2"
                >
                  {link.name}
                </button>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <a href="tel:+919471983191" className="flex items-center space-x-2 text-sm text-foreground/80">
                  <Phone className="w-4 h-4" />
                  <span>+91 94719 83191</span>
                </a>
                <a href="mailto:info@advik.com" className="flex items-center space-x-2 text-sm text-foreground/80">
                  <Mail className="w-4 h-4" />
                  <span>info@advik.com</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
