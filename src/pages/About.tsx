import { ParallaxLayer } from '@/components/ParallaxLayers';
import { 
  Trophy, 
  Users, 
  Target, 
  Heart,
  TrendingUp,
  Shield,
  GamepadIcon,
  BookOpen
} from 'lucide-react';
import { FeatureCard } from '@/components/FeatureCard';
import particlesBg from '@/assets/particles-bg.jpg';

const About = () => {
  return (
    <div className="min-h-screen bg-gaming-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gaming-background/80 backdrop-blur-md border-b border-gaming-primary/20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-3xl font-bold aqube-gradient bg-clip-text text-transparent">
            AqubeXP
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="/" className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text">Home</a>
            <a href="/#features" className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text">Features</a>
            <a href="/about" className="text-gaming-primary glow-text">About</a>
            <a href="/refer" className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text">Refer & Earn</a>
            <a href="/faq" className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text">FAQ</a>
          </div>
          <a href="/#join" className="bg-gaming-primary text-gaming-background px-6 py-2 rounded-full font-semibold hover:shadow-glow transition-all">
            Join Aqube XP
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <ParallaxLayer speed={0.1} className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${particlesBg})` }}
          />
        </ParallaxLayer>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-8">
            About <span className="text-transparent bg-clip-text aqube-gradient glow-text">Aqube XP</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We are gamers, passionate about gaming and esports. We recognized that gamers in India deserve 
            financial products that match their lifestyle. That's why we're building AqubeXP —India's 
            first credit card designed for gamers.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gaming-surface">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-foreground mb-8">
                Our <span className="text-transparent bg-clip-text bg-gradient-primary glow-text">Mission</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Our mission is to revolutionize how India's gaming community manages money. Our vision is to 
                bridge the gap between gaming and finance—empowering gamers to earn, save, and enjoy exclusive 
                rewards on every transaction while promoting financial literacy.
              </p>
              <p className="text-lg text-foreground font-semibold">
                We believe gamers deserve more than just points—they deserve power. That's why our card isn't 
                just about spending smarter; it's about leveling up your life.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-gradient-glow opacity-40 rounded-full blur-3xl" />
              <div className="relative bg-gaming-surface-elevated p-12 rounded-3xl border border-gaming-primary/20">
                <Target className="w-16 h-16 text-gaming-primary mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To empower gamers with financial tools that understand and reward their lifestyle, 
                  creating a bridge between gaming passion and financial success in India and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center text-foreground mb-16">
            Key <span className="text-transparent bg-clip-text aqube-gradient glow-text">Features</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={GamepadIcon}
              title="Gaming-First Rewards"
              description="Whether you're a casual mobile gamer or a pro esports athlete, Aqube XP levels up your experience."
            />
            <FeatureCard
              icon={BookOpen}
              title="Financial Literacy"
              description="AqubeXP merges gaming and finance to increase financial literacy within the gaming community."
            />
            <FeatureCard
              icon={TrendingUp}
              title="Industry Growth"
              description="We're committed to unlocking the full potential of India's gaming and esports industry."
            />
            <FeatureCard
              icon={Users}
              title="Community Driven"
              description="More than a credit card— AqubeXP is a movement built for and by gamers."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gaming-surface-elevated">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-6xl font-bold text-gaming-primary mb-4 glow-text">1K+</div>
              <div className="text-foreground font-semibold mb-2">Pre Registers</div>
              <div className="text-muted-foreground">Early adopters ready to level up</div>
            </div>
            <div>
              <div className="text-6xl font-bold text-gaming-secondary mb-4 glow-text">100K+</div>
              <div className="text-foreground font-semibold mb-2">Points Claimed</div>
              <div className="text-muted-foreground">Total rewards earned by community</div>
            </div>
            <div>
              <div className="text-6xl font-bold text-gaming-accent mb-4 glow-text">99.9%</div>
              <div className="text-foreground font-semibold mb-2">System Uptime</div>
              <div className="text-muted-foreground">Reliable gaming financial platform</div>
            </div>
            <div>
              <div className="text-6xl font-bold text-gaming-primary mb-4 glow-text">24/7</div>
              <div className="text-foreground font-semibold mb-2">Gamer Support</div>
              <div className="text-muted-foreground">Always here when you need us</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;