import { Link } from 'react-router-dom';
import { Recycle, Leaf, Mail, MapPin, Phone, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Recycle className="h-8 w-8 text-primary transition-transform duration-300 group-hover:rotate-180" />
                <Leaf className="h-4 w-4 text-accent absolute -bottom-1 -right-1" />
              </div>
              <span className="font-bold text-lg">
                Smart<span className="text-primary">Waste</span>
              </span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              AI-Powered Waste Sorting for a Greener Future. Join us in creating a cleaner planet through smart technology.
            </p>
            <div className="flex gap-3">
              <Button asChild variant="hero" size="sm">
                <Link to="/upload">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="border-background/30 text-background hover:bg-background/10">
                <Link to="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-background">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {[
                { name: 'How It Works', path: '/how-it-works' },
                { name: 'Upload Waste', path: '/upload' },
                { name: 'Categories', path: '/categories' },
                { name: 'Technology', path: '/technology' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-background/70 hover:text-primary transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-background">Resources</h4>
            <nav className="flex flex-col gap-2">
              {[
                { name: 'Environmental Impact', path: '/impact' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'FAQ', path: '/contact' },
                { name: 'Privacy Policy', path: '#' },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-background/70 hover:text-primary transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-background">Contact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-background/70 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@smartwaste.ai</span>
              </div>
              <div className="flex items-center gap-3 text-background/70 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-background/70 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Green Tech Campus, Innovation City</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/60 text-sm text-center md:text-left">
              © 2024 Smart Waste Segregation System. Student / College Project.
            </p>
            <p className="text-background/60 text-sm flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-hazardous fill-hazardous" /> for a greener planet
              <Leaf className="h-4 w-4 text-primary ml-1" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
