import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Separator } from './ui/separator';
import { ThreadsIcon } from './ThreadsIcon';

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <h4 className="mb-1">Advik Furniture and Interior</h4>
              <p className="text-primary-foreground/70 text-sm italic">CRAFTED FOR YOUR HOME</p>
            </div>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Crafting premium furniture that transforms houses into homes. Quality, comfort, and style in every piece.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/people/Wood-At-Makers/100094145480813/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/advik_furniture_and_interior/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.threads.com/@advik_furniture_and_interior" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-full flex items-center justify-center transition-colors">
                <ThreadsIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <button onClick={() => scrollToSection('home')} className="hover:text-primary-foreground transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('beds')} className="hover:text-primary-foreground transition-colors">
                  Beds
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('sofas')} className="hover:text-primary-foreground transition-colors">
                  Sofas
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('chairs')} className="hover:text-primary-foreground transition-colors">
                  Chairs
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('dining-tables')} className="hover:text-primary-foreground transition-colors">
                  Dining Tables
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-primary-foreground transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition-colors">
                  Warranty Information
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>663A, Thandal Kazhani, G.N.T Road, Puzhal Redhhills, Chennai - 66</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+919471983191" className="hover:text-primary-foreground transition-colors">
                  +91 94719 83191
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@advik.com" className="hover:text-primary-foreground transition-colors">
                  info@advik.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/60">
          <p>© 2025 Advik Furniture and Interior. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
