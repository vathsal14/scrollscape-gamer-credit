import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FooterProps {
  onSurveyClick?: () => void;
}

const Footer = ({ onSurveyClick }: FooterProps) => {
  return (
    <footer className="bg-gaming-surface-elevated border-t border-gaming-primary/20">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="text-4xl font-bold aqube-gradient bg-clip-text text-transparent mb-6">
              Aqube XP
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
              Level up your financial game with India's first gaming credit card. Earn XP, 
              unlock rewards, and get exclusive gaming perks.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-gaming-primary" />
                <span>info@aqube.xyz</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-gaming-primary" />
                <span>+91 9121184320</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-gaming-primary" />
                <span>Hyderabad, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6">Quick Links</h3>
            <div className="space-y-4">
              <a href="/" className="flex items-center space-x-2 text-muted-foreground hover:text-gaming-primary transition-colors">
                <ExternalLink className="w-4 h-4" />
                <span>Home</span>
              </a>
              <a href="/#features" className="flex items-center space-x-2 text-muted-foreground hover:text-gaming-primary transition-colors">
                <ExternalLink className="w-4 h-4" />
                <span>Features</span>
              </a>
              <a href="/about" className="flex items-center space-x-2 text-muted-foreground hover:text-gaming-primary transition-colors">
                <ExternalLink className="w-4 h-4" />
                <span>About</span>
              </a>
              <a href="/faq" className="flex items-center space-x-2 text-muted-foreground hover:text-gaming-primary transition-colors">
                <ExternalLink className="w-4 h-4" />
                <span>FAQ</span>
              </a>
              <a href="mailto:info@aqube.xyz" className="flex items-center space-x-2 text-muted-foreground hover:text-gaming-primary transition-colors">
                <ExternalLink className="w-4 h-4" />
                <span>Contact</span>
              </a>
            </div>
          </div>

          {/* Survey CTA */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6">Help Us Serve You Better</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Share your gaming preferences and financial needs to help us create the perfect credit card for you.
            </p>
            <Button 
              onClick={onSurveyClick}
              className="bg-gaming-primary hover:bg-gaming-primary/90"
            >
              Take Survey
            </Button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gaming-primary/20 mt-12 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2025 Aqube XP. All rights reserved. | Made with ❤️ for gamers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;