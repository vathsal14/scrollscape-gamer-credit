import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ParallaxLayer, MouseParallax } from '@/components/ParallaxLayers';
import { CreditCard3D } from '@/components/CreditCard3D';
import { FeatureCard } from '@/components/FeatureCard';
import { FloatingElement } from '@/components/FloatingElement';
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
  Coins,
  Sparkles,
  Rocket,
  Crown
} from 'lucide-react';
import heroCard from '@/assets/hero-card.jpg';
import gamingBg from '@/assets/gaming-bg.jpg';
import particlesBg from '@/assets/particles-bg.jpg';
import geometricBg from '@/assets/geometric-bg.jpg';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gaming-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gaming-background/80 backdrop-blur-md border-b border-gaming-primary/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-3xl font-bold aqube-gradient bg-clip-text text-transparent">
            Aqube
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text">Features</a>
            <a href="#rewards" className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text">Rewards</a>
            <a href="#apply" className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text">Apply</a>
          </div>
          <Button variant="gaming-outline" size="sm" className="magnetic-hover">Login</Button>
        </div>
      </nav>

      {/* Hero Section with Multiple Parallax Layers */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden parallax-container">
        {/* Background Layers */}
        <ParallaxLayer speed={0.1} className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${particlesBg})` }}
          />
        </ParallaxLayer>
        
        <ParallaxLayer speed={0.2} direction="right" className="absolute inset-0 z-10">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${geometricBg})` }}
          />
        </ParallaxLayer>
        
        <ParallaxLayer speed={0.3} className="absolute inset-0 z-20">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${heroCard})` }}
          />
        </ParallaxLayer>
        
        <div className="absolute inset-0 bg-gradient-hero z-30" />
        
        {/* Floating Elements */}
        <FloatingElement speed={4} amplitude={15} delay={0} className="absolute top-20 left-10 z-40">
          <div className="w-20 h-20 bg-gaming-primary/20 rounded-full blur-xl animate-glow-pulse" />
        </FloatingElement>
        
        <FloatingElement speed={3} amplitude={20} delay={1} className="absolute top-32 right-20 z-40">
          <div className="w-16 h-16 bg-gaming-secondary/30 rounded-full blur-lg animate-glow-pulse" />
        </FloatingElement>
        
        <FloatingElement speed={5} amplitude={12} delay={2} className="absolute bottom-40 left-20 z-40">
          <div className="w-24 h-24 bg-gaming-accent/25 rounded-full blur-2xl animate-glow-pulse" />
        </FloatingElement>

        {/* Main Content */}
        <div className="relative z-50 container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text Content */}
            <div className="space-y-8 scroll-reveal">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-gaming-primary/10 border border-gaming-primary/30 rounded-full px-4 py-2 text-sm">
                  <Sparkles className="w-4 h-4 text-gaming-primary" />
                  <span className="text-gaming-primary font-semibold">Premium Gaming Rewards</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                  Level Up Your
                  <span className="block text-transparent bg-clip-text aqube-gradient glow-text">
                    Gaming Experience
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Aqube's revolutionary gaming credit card unlocks exclusive rewards, 
                  early access to new releases, and premium gaming experiences designed for true gamers.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="group">
                  <Play className="mr-2 group-hover:scale-110 transition-transform" />
                  Get Your Aqube Card
                </Button>
                <Button variant="gaming-outline" size="lg" className="magnetic-hover">
                  <Rocket className="mr-2" />
                  Explore Features
                </Button>
              </div>
              
              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gaming-primary rounded-full animate-glow-pulse" />
                  <span>No Annual Fee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gaming-secondary rounded-full animate-glow-pulse" />
                  <span>Instant Approval</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gaming-accent rounded-full animate-glow-pulse" />
                  <span>50K Bonus Points</span>
                </div>
              </div>
            </div>
            
            {/* Right side - Credit Card */}
            <MouseParallax strength={0.05} className="relative">
              <div className="relative">
                {/* Glow effects around card */}
                <div className="absolute -inset-20 bg-gradient-glow opacity-60 animate-glow-pulse" />
                <div className="absolute -inset-10 bg-gaming-primary/10 rounded-full blur-3xl" />
                
                <CreditCard3D className="relative z-10 card-3d scale-110" />
                
                {/* Floating particles around card */}
                <FloatingElement speed={3} amplitude={8} delay={0.5} className="absolute -top-8 -left-8">
                  <div className="w-3 h-3 bg-gaming-primary rounded-full animate-glow-pulse" />
                </FloatingElement>
                <FloatingElement speed={4} amplitude={12} delay={1.5} className="absolute -bottom-8 -right-8">
                  <div className="w-2 h-2 bg-gaming-secondary rounded-full animate-glow-pulse" />
                </FloatingElement>
                <FloatingElement speed={2.5} amplitude={10} delay={2.5} className="absolute top-16 -right-12">
                  <div className="w-4 h-4 bg-gaming-accent rounded-full animate-glow-pulse" />
                </FloatingElement>
              </div>
            </MouseParallax>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-50">
          <ChevronDown className="w-8 h-8 text-gaming-primary animate-glow-pulse" />
        </div>
      </section>

      {/* Stats Section with Parallax */}
      <section className="relative py-20 bg-gaming-surface overflow-hidden">
        <ParallaxLayer speed={0.15} direction="left" className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${gamingBg})` }}
          />
        </ParallaxLayer>
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="scroll-reveal">
              <div className="text-5xl font-bold text-gaming-primary mb-2 glow-text">5X</div>
              <div className="text-foreground font-semibold mb-1">Gaming Purchases</div>
              <div className="text-muted-foreground text-sm">Earn 5x points on all gaming-related purchases</div>
            </div>
            <div className="scroll-reveal">
              <div className="text-5xl font-bold text-gaming-secondary mb-2 glow-text">3X</div>
              <div className="text-foreground font-semibold mb-1">Streaming Services</div>
              <div className="text-muted-foreground text-sm">Triple points on entertainment subscriptions</div>
            </div>
            <div className="scroll-reveal">
              <div className="text-5xl font-bold text-gaming-accent mb-2 glow-text">50K</div>
              <div className="text-foreground font-semibold mb-1">Welcome Bonus</div>
              <div className="text-muted-foreground text-sm">Bonus points after first purchase</div>
            </div>
            <div className="scroll-reveal">
              <div className="text-5xl font-bold text-gaming-primary mb-2 glow-text">0%</div>
              <div className="text-foreground font-semibold mb-1">Annual Fee</div>
              <div className="text-muted-foreground text-sm">No hidden fees, ever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced Parallax */}
      <section id="features" className="relative py-32 bg-gaming-background overflow-hidden">
        <ParallaxLayer speed={0.1} className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-5"
            style={{ backgroundImage: `url(${particlesBg})` }}
          />
        </ParallaxLayer>
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-20 scroll-reveal">
            <div className="inline-flex items-center space-x-2 bg-gaming-primary/10 border border-gaming-primary/30 rounded-full px-6 py-3 mb-6">
              <Crown className="w-5 h-5 text-gaming-primary" />
              <span className="text-gaming-primary font-semibold">Premium Features</span>
            </div>
            
            <h2 className="text-6xl font-bold text-foreground mb-6">
              Epic <span className="text-transparent bg-clip-text aqube-gradient glow-text">Gaming Benefits</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Unlock a world of gaming benefits and exclusive perks designed specifically for the gaming community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="scroll-reveal">
              <FeatureCard
                icon={Gamepad2}
                title="Gaming Rewards"
                description="Earn up to 5x points on gaming purchases including consoles, games, and accessories."
              />
            </div>
            <div className="scroll-reveal">
              <FeatureCard
                icon={Trophy}
                title="Exclusive Access"
                description="Get early access to beta games, limited edition releases, and gaming events."
              />
            </div>
            <div className="scroll-reveal">
              <FeatureCard
                icon={Zap}
                title="Instant Cashback"
                description="Receive instant cashback on select gaming purchases and streaming services."
              />
            </div>
            <div className="scroll-reveal">
              <FeatureCard
                icon={Shield}
                title="Purchase Protection"
                description="Extended warranty and purchase protection for all your gaming gear."
              />
            </div>
            <div className="scroll-reveal">
              <FeatureCard
                icon={Gift}
                title="Birthday Bonuses"
                description="Special birthday rewards including free games and bonus points."
              />
            </div>
            <div className="scroll-reveal">
              <FeatureCard
                icon={Star}
                title="VIP Status"
                description="Enjoy VIP customer service and priority support for all your needs."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Rewards Section with Complex Parallax */}
      <section id="rewards" className="relative py-32 bg-gaming-surface-elevated overflow-hidden">
        <ParallaxLayer speed={0.2} direction="right" className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{ backgroundImage: `url(${geometricBg})` }}
          />
        </ParallaxLayer>
        
        <div className="absolute inset-0 bg-gradient-glow opacity-20" />
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="scroll-reveal">
              <div className="inline-flex items-center space-x-2 bg-gaming-secondary/10 border border-gaming-secondary/30 rounded-full px-6 py-3 mb-8">
                <Award className="w-5 h-5 text-gaming-secondary" />
                <span className="text-gaming-secondary font-semibold">Reward System</span>
              </div>
              
              <h2 className="text-6xl font-bold text-foreground mb-8">
                Redeem Your <span className="text-transparent bg-clip-text bg-gradient-primary glow-text">Victory</span>
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-6 group">
                  <div className="p-4 rounded-2xl bg-gaming-primary/20 group-hover:bg-gaming-primary/30 transition-colors">
                    <Coins className="w-8 h-8 text-gaming-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-3">Game Credits</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Convert points to credits for Steam, PlayStation, Xbox, Nintendo, and more gaming platforms.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 group">
                  <div className="p-4 rounded-2xl bg-gaming-secondary/20 group-hover:bg-gaming-secondary/30 transition-colors">
                    <Award className="w-8 h-8 text-gaming-secondary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-3">Gaming Gear</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Redeem points for the latest gaming hardware, peripherals, and exclusive merchandise.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 group">
                  <div className="p-4 rounded-2xl bg-gaming-accent/20 group-hover:bg-gaming-accent/30 transition-colors">
                    <Gift className="w-8 h-8 text-gaming-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-3">Exclusive Events</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Access to gaming conventions, tournaments, meetups, and exclusive Aqube member events.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button variant="gaming" size="lg" className="mt-12 group">
                <Sparkles className="mr-2 group-hover:animate-spin" />
                Explore Rewards
              </Button>
            </div>
            
            <div className="relative scroll-reveal">
              <MouseParallax strength={0.03}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <FloatingElement speed={3} amplitude={8} delay={0}>
                      <div className="p-8 rounded-3xl bg-gradient-card border border-gaming-primary/30 hover:border-gaming-primary/60 transition-all hover:scale-105 card-3d">
                        <div className="text-3xl font-bold text-gaming-primary mb-3 glow-text">50,000</div>
                        <div className="text-sm text-muted-foreground leading-relaxed">Welcome Bonus Points</div>
                      </div>
                    </FloatingElement>
                    
                    <FloatingElement speed={4} amplitude={12} delay={1}>
                      <div className="p-8 rounded-3xl bg-gradient-card border border-gaming-secondary/30 hover:border-gaming-secondary/60 transition-all hover:scale-105 card-3d">
                        <div className="text-3xl font-bold text-gaming-secondary mb-3 glow-text">$500</div>
                        <div className="text-sm text-muted-foreground leading-relaxed">Gaming Credit Value</div>
                      </div>
                    </FloatingElement>
                  </div>
                  
                  <div className="space-y-6 mt-12">
                    <FloatingElement speed={2.5} amplitude={10} delay={0.5}>
                      <div className="p-8 rounded-3xl bg-gradient-card border border-gaming-accent/30 hover:border-gaming-accent/60 transition-all hover:scale-105 card-3d">
                        <div className="text-3xl font-bold text-gaming-accent mb-3 glow-text">0%</div>
                        <div className="text-sm text-muted-foreground leading-relaxed">Annual Fee Forever</div>
                      </div>
                    </FloatingElement>
                    
                    <FloatingElement speed={3.5} amplitude={14} delay={1.5}>
                      <div className="p-8 rounded-3xl bg-gradient-card border border-gaming-primary/30 hover:border-gaming-primary/60 transition-all hover:scale-105 card-3d">
                        <div className="text-3xl font-bold text-gaming-primary mb-3 glow-text">24/7</div>
                        <div className="text-sm text-muted-foreground leading-relaxed">Gaming Support</div>
                      </div>
                    </FloatingElement>
                  </div>
                </div>
              </MouseParallax>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section id="apply" className="relative py-32 bg-gaming-background overflow-hidden">
        <ParallaxLayer speed={0.1} className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${heroCard})` }}
          />
        </ParallaxLayer>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto scroll-reveal">
            <div className="inline-flex items-center space-x-2 bg-gaming-primary/10 border border-gaming-primary/30 rounded-full px-6 py-3 mb-8">
              <Rocket className="w-5 h-5 text-gaming-primary" />
              <span className="text-gaming-primary font-semibold">Join The Revolution</span>
            </div>
            
            <h2 className="text-6xl font-bold text-foreground mb-8">
              Ready to <span className="text-transparent bg-clip-text aqube-gradient glow-text">Level Up</span>?
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Join thousands of gamers who have already upgraded their rewards game with Aqube. 
              Apply now and start earning epic rewards on every purchase.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button variant="hero" size="lg" className="group text-xl px-12 py-6">
                <Play className="mr-3 group-hover:scale-110 transition-transform" />
                Apply Now - It's Free
              </Button>
              <div className="text-muted-foreground">
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gaming-primary rounded-full animate-glow-pulse" />
                    <span>No annual fee</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gaming-secondary rounded-full animate-glow-pulse" />
                    <span>Instant approval</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gaming-accent rounded-full animate-glow-pulse" />
                    <span>50K welcome bonus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gaming-surface border-t border-gaming-primary/20 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-3xl font-bold aqube-gradient bg-clip-text text-transparent mb-4">Aqube</div>
              <p className="text-muted-foreground leading-relaxed">The ultimate gaming credit card for the modern gaming community.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-6 text-lg">Features</h4>
              <div className="space-y-3 text-muted-foreground">
                <div className="hover:text-gaming-primary transition-colors cursor-pointer">Gaming Rewards</div>
                <div className="hover:text-gaming-primary transition-colors cursor-pointer">Exclusive Access</div>
                <div className="hover:text-gaming-primary transition-colors cursor-pointer">Purchase Protection</div>
                <div className="hover:text-gaming-primary transition-colors cursor-pointer">VIP Support</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-6 text-lg">Support</h4>
              <div className="space-y-3 text-muted-foreground">
                <div className="hover:text-gaming-primary transition-colors cursor-pointer">Help Center</div>
                <div className="hover:text-gaming-primary transition-colors cursor-pointer">Contact Us</div>
                <div className="hover:text-gaming-primary transition-colors cursor-pointer">Gaming Support</div>
                <div className="hover:text-gaming-primary transition-colors cursor-pointer">Community</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-6 text-lg">Legal</h4>
              <div className="space-y-3 text-muted-foreground">
                <div className="hover:text-gaming-primary transition-colors cursor-pointer">Privacy Policy</div>
                <div className="hover:text-gaming-primary transition-colors cursor-pointer">Terms of Service</div>
                <div className="hover:text-gaming-primary transition-colors cursor-pointer">Security</div>
                <div className="hover:text-gaming-primary transition-colors cursor-pointer">Compliance</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gaming-primary/20 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 Aqube. All rights reserved. Game on! 
              <span className="inline-block ml-2 text-gaming-primary animate-glow-pulse">🎮</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;