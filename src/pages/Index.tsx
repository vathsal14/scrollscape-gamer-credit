import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ParallaxSection } from '@/components/ParallaxSection';
import { CreditCard3D } from '@/components/CreditCard3D';
import { FeatureCard } from '@/components/FeatureCard';
import { 
  Gamepad2, 
  Trophy, 
  Zap, 
  Shield, 
  Gift, 
  Star,
  ChevronDown,
  Play,
  Award,
  Coins
} from 'lucide-react';
import heroCard from '@/assets/hero-card.jpg';
import gamingBg from '@/assets/gaming-bg.jpg';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gaming-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gaming-background/80 backdrop-blur-md border-b border-gaming-primary/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gaming-primary">GameCard</div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-foreground hover:text-gaming-primary transition-colors">Features</a>
            <a href="#rewards" className="text-foreground hover:text-gaming-primary transition-colors">Rewards</a>
            <a href="#apply" className="text-foreground hover:text-gaming-primary transition-colors">Apply</a>
          </div>
          <Button variant="gaming-outline" size="sm">Login</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParallaxSection speed={0.3} className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ 
              backgroundImage: `url(${heroCard})`,
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          />
        </ParallaxSection>
        
        <div className="absolute inset-0 bg-gradient-hero" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-slide-up">
            <h1 className="text-6xl md:text-8xl font-bold text-foreground leading-tight">
              Level Up Your
              <span className="block text-transparent bg-clip-text bg-gradient-primary">
                Gaming Rewards
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The ultimate credit card for gamers. Earn exclusive rewards on gaming purchases, 
              get early access to new releases, and unlock premium gaming experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="lg">
                <Play className="mr-2" />
                Apply Now
              </Button>
              <Button variant="gaming-outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-gaming-primary" />
          </div>
        </div>
      </section>

      {/* Card Showcase Section */}
      <section className="relative py-32 bg-gaming-surface">
        <ParallaxSection speed={0.2} className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ 
              backgroundImage: `url(${gamingBg})`,
              transform: `translateY(${scrollY * 0.3}px)`
            }}
          />
        </ParallaxSection>
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Your <span className="text-gaming-primary">Game-Changing</span> Card
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed for gamers, by gamers. Experience the power of premium rewards.
            </p>
          </div>
          
          <CreditCard3D className="mb-16" />
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-gaming-primary mb-2">5X</div>
              <div className="text-foreground font-semibold">Gaming Purchases</div>
              <div className="text-muted-foreground">Earn 5x points on all gaming-related purchases</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gaming-secondary mb-2">3X</div>
              <div className="text-foreground font-semibold">Streaming Services</div>
              <div className="text-muted-foreground">Triple points on entertainment subscriptions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gaming-accent mb-2">2X</div>
              <div className="text-foreground font-semibold">Online Shopping</div>
              <div className="text-muted-foreground">Double points on all online purchases</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-gaming-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Epic <span className="text-gaming-primary">Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Unlock a world of gaming benefits and exclusive perks designed for true gamers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Gamepad2}
              title="Gaming Rewards"
              description="Earn up to 5x points on gaming purchases including consoles, games, and accessories."
            />
            <FeatureCard
              icon={Trophy}
              title="Exclusive Access"
              description="Get early access to beta games, limited edition releases, and gaming events."
            />
            <FeatureCard
              icon={Zap}
              title="Instant Cashback"
              description="Receive instant cashback on select gaming purchases and streaming services."
            />
            <FeatureCard
              icon={Shield}
              title="Purchase Protection"
              description="Extended warranty and purchase protection for all your gaming gear."
            />
            <FeatureCard
              icon={Gift}
              title="Birthday Bonuses"
              description="Special birthday rewards including free games and bonus points."
            />
            <FeatureCard
              icon={Star}
              title="VIP Status"
              description="Enjoy VIP customer service and priority support for all your needs."
            />
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section id="rewards" className="relative py-32 bg-gaming-surface-elevated overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-20" />
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-foreground mb-8">
                Redeem Your <span className="text-gaming-secondary">Victory</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-gaming-primary/20">
                    <Coins className="w-6 h-6 text-gaming-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Game Credits</h3>
                    <p className="text-muted-foreground">Convert points to credits for Steam, PlayStation, Xbox, and more.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-gaming-secondary/20">
                    <Award className="w-6 h-6 text-gaming-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Gaming Gear</h3>
                    <p className="text-muted-foreground">Redeem points for the latest gaming hardware and accessories.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-gaming-accent/20">
                    <Gift className="w-6 h-6 text-gaming-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Exclusive Events</h3>
                    <p className="text-muted-foreground">Access to gaming conventions, tournaments, and meetups.</p>
                  </div>
                </div>
              </div>
              
              <Button variant="gaming" size="lg" className="mt-8">
                Explore Rewards
              </Button>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-gradient-card border border-gaming-primary/30 animate-float">
                    <div className="text-2xl font-bold text-gaming-primary mb-2">50,000</div>
                    <div className="text-sm text-muted-foreground">Welcome Bonus Points</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-card border border-gaming-secondary/30 animate-float" style={{ animationDelay: '1s' }}>
                    <div className="text-2xl font-bold text-gaming-secondary mb-2">$500</div>
                    <div className="text-sm text-muted-foreground">Gaming Credit Value</div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="p-6 rounded-2xl bg-gradient-card border border-gaming-accent/30 animate-float" style={{ animationDelay: '0.5s' }}>
                    <div className="text-2xl font-bold text-gaming-accent mb-2">0%</div>
                    <div className="text-sm text-muted-foreground">Annual Fee</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-card border border-gaming-primary/30 animate-float" style={{ animationDelay: '1.5s' }}>
                    <div className="text-2xl font-bold text-gaming-primary mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">Gaming Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section id="apply" className="py-32 bg-gaming-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-foreground mb-8">
            Ready to <span className="text-gaming-primary">Level Up</span>?
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Join thousands of gamers who have already upgraded their rewards game. 
            Apply now and start earning epic rewards on every purchase.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button variant="hero" size="lg">
              <Play className="mr-2" />
              Apply Now - It's Free
            </Button>
            <div className="text-muted-foreground text-sm">
              ✓ No annual fee  ✓ Instant approval  ✓ 50K welcome bonus
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gaming-surface border-t border-gaming-primary/20 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-gaming-primary mb-4">GameCard</div>
              <p className="text-muted-foreground">The ultimate credit card for the gaming community.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Features</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>Gaming Rewards</div>
                <div>Exclusive Access</div>
                <div>Purchase Protection</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>Help Center</div>
                <div>Contact Us</div>
                <div>Gaming Support</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
                <div>Security</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gaming-primary/20 mt-12 pt-8 text-center text-muted-foreground">
            © 2024 GameCard. All rights reserved. Game on! 🎮
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
