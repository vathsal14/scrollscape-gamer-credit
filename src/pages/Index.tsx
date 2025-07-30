import { useEffect, useState, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ParallaxLayer, MouseParallax } from '@/components/ParallaxLayers';
import { CreditCard3D } from '@/components/CreditCard3D';
import { FeatureCard } from '@/components/FeatureCard';
import { FloatingElement } from '@/components/FloatingElement';
import OpeningAnimation from '@/components/OpeningAnimation';
import { Auth } from '@/components/Auth';
import SlotMachineModal from '@/components/SlotMachineModal';
import ReferralSystem from '@/components/ReferralSystem';
import ConnectedLeaderboard from '@/components/ConnectedLeaderboard';
import Footer from '@/components/Footer';
import SurveyModal from '@/components/SurveyModal';
import GamingQuiz from '@/components/GamingQuiz';
import WordScramble from '@/components/WordScramble';
import { KeyGameModal } from '@/components/KeyGameModal';
import { 
  Gamepad2, 
  Trophy, 
  Zap, 
  Shield, 
  Gift, 
  Star,
  CheckCircle2,
  Play,
  Award,
  Coins,
  Sparkles,
  Rocket,
  Crown,
  Target,
  Eye,
  DollarSign,
  Users2,
  Calendar,
  Bot,
  Menu,
  X
} from 'lucide-react';
import { User } from '@supabase/supabase-js';
import heroCard from '@/assets/hero-card.jpg';
import gamingBg from '@/assets/gaming-bg.jpg';
import particlesBg from '@/assets/particles-bg.jpg';
import geometricBg from '@/assets/geometric-bg.jpg';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showAnimation, setShowAnimation] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [slotMachineOpen, setSlotMachineOpen] = useState(false);
  const [surveyOpen, setSurveyOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [wordScrambleOpen, setWordScrambleOpen] = useState(false);
  const [keyGameOpen, setKeyGameOpen] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [userPoints, setUserPoints] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  const refreshUserPoints = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('points')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      setUserPoints(data?.points || 0);
    } catch (error) {
      console.error('Error refreshing points:', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 3500);
    return () => clearTimeout(timer);
  }, []);

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

  // Fetch user points when user changes
  useEffect(() => {
    const fetchUserPoints = async () => {
      if (!user) {
        setUserPoints(0);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('points')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setUserPoints(data?.points || 0);
      } catch (error) {
        console.error('Error fetching user points:', error);
        setUserPoints(0);
      }
    };

    fetchUserPoints();
  }, [user]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      {showAnimation && <OpeningAnimation />}
      <div className="min-h-screen bg-gaming-background overflow-x-hidden">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-gaming-background/80 backdrop-blur-md border-b border-gaming-primary/20">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-3xl font-bold aqube-gradient bg-clip-text text-transparent">
              AqubeXP
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              <button onClick={() => scrollToSection('hero')} className="text-gaming-primary glow-text">Home</button>
              <button onClick={() => scrollToSection('features')} className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text">Features</button>
              <button onClick={() => scrollToSection('jersey')} className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text">Jersey</button>
              <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text">About</button>
              <button onClick={() => scrollToSection('gaming-arena')} className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text">Gaming Arena</button>
              <button onClick={() => scrollToSection('leaderboard')} className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text">Leaderboard</button>
              <button onClick={() => scrollToSection('faq')} className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text">FAQ</button>
              
              {/* XP Points Display */}
              {user && (
                <div className="flex items-center gap-2 bg-gaming-primary/20 px-3 py-1 rounded-full border border-gaming-primary/30">
                  <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Coins className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gaming-primary font-semibold text-sm">{userPoints} XP</span>
                </div>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
            
            <button onClick={() => scrollToSection('auth')} className="hidden md:block bg-gaming-primary text-gaming-background px-6 py-2 rounded-full font-semibold hover:shadow-glow transition-all">
              Join Aqube XP
            </button>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-gaming-background/95 backdrop-blur-md border-t border-gaming-primary/20">
              <div className="container mx-auto px-6 py-4 space-y-4">
                <button onClick={() => scrollToSection('hero')} className="block text-gaming-primary glow-text">Home</button>
                <button onClick={() => scrollToSection('features')} className="block text-foreground hover:text-gaming-primary transition-colors">Features</button>
                <button onClick={() => scrollToSection('gaming-arena')} className="block text-foreground hover:text-gaming-primary transition-colors">Gaming Arena</button>
                <button onClick={() => scrollToSection('leaderboard')} className="block text-foreground hover:text-gaming-primary transition-colors">Leaderboard</button>
                <button onClick={() => scrollToSection('about')} className="block text-foreground hover:text-gaming-primary transition-colors">About</button>
                <button onClick={() => scrollToSection('refer')} className="block text-foreground hover:text-gaming-primary transition-colors">Refer & Earn</button>
                <button onClick={() => scrollToSection('faq')} className="block text-foreground hover:text-gaming-primary transition-colors">FAQ</button>
                <button onClick={() => scrollToSection('auth')} className="block bg-gaming-primary text-gaming-background px-6 py-2 rounded-full font-semibold">
                  Join Aqube XP
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* 1. Home Section */}
        <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gaming-background to-gaming-background/80">
          {/* Main Background */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${gamingBg})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                opacity: 0.15
              }}
            />
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${particlesBg})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                opacity: 0.1
              }}
            />
          </div>

          {/* Floating Elements */}
          <FloatingElement 
            className="absolute top-1/4 left-[10%] text-gaming-primary opacity-50"
            speed={3}
            delay={0}
          >
            <Gamepad2 size={60} />
          </FloatingElement>

          <FloatingElement 
            className="absolute top-1/3 right-[10%] text-gaming-secondary opacity-40"
            speed={4}
            delay={1}
          >
            <Trophy size={80} />
          </FloatingElement>

          <FloatingElement 
            className="absolute bottom-1/4 left-1/4 text-gaming-accent opacity-40"
            speed={2.5}
            delay={2}
          >
            <Zap size={50} />
          </FloatingElement>

          {/* Content */}
          <div className="relative z-10 w-full px-6 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-80px)] py-20">
              {/* Text Content - Left Side */}
              <div className="scroll-reveal max-w-2xl lg:max-w-xl xl:max-w-2xl text-center lg:text-left mb-12 lg:mb-0">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 leading-tight">
                  <span className="aqube-gradient bg-clip-text text-transparent">
                    AqubeXP
                  </span>
                </h1>
                
                <div className="space-y-2 md:space-y-4 mb-6 md:mb-8">
                  <p className="text-xl sm:text-2xl md:text-3xl text-foreground font-semibold">
                    Not Just a Card
                  </p>
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold aqube-gradient bg-clip-text text-transparent">
                    A Power-Up
                  </p>
                </div>
                
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 leading-relaxed">
                  India's first gaming credit card is on the way - Level up your gaming experience. Join the Waitlist now!!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8 md:mb-12">
                  <Button 
                    size="lg" 
                    className="bg-gaming-primary hover:bg-gaming-primary/90 text-gaming-background px-8 py-6 text-base sm:text-lg font-semibold shadow-glow hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                    onClick={() => scrollToSection('auth')}
                  >
                    Pre Register Now
                  </Button>
                </div>
              </div>

              {/* Credit Card - Right Side */}
              <div className="w-full lg:w-1/2 xl:w-2/5 max-w-2xl mx-auto lg:mx-0">
                <div className="relative">
                  <div className="relative z-10">
                    <CreditCard3D className="w-full h-auto" />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-gaming-primary/10 rounded-full blur-3xl -z-10" />
                  <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-gaming-secondary/10 rounded-full blur-3xl -z-10" />
                </div>
              </div>
            </div>

            {/* Scroll Down Button - Centered at bottom */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <button 
                onClick={() => scrollToSection('features')}
                className="animate-bounce text-gaming-primary hover:text-gaming-secondary transition-colors"
                aria-label="Scroll to next section"
              >
                <ChevronDown size={32} className="w-8 h-8 md:w-10 md:h-10" />
              </button>
            </div>
          </div>
        </section>

        {/* 2. Join the Revolution Section */}
        <section id="auth" className="py-20 relative">
          <ParallaxLayer speed={0.3} className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-5"
              style={{ backgroundImage: `url(${geometricBg})` }}
            />
          </ParallaxLayer>
          
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 scroll-reveal">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 aqube-gradient bg-clip-text text-transparent">
                Join the Revolution
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Be among the first to experience India's revolutionary gaming credit card
              </p>
            </div>
            
            <div className="scroll-reveal">
              <Auth onAuthChange={setUser} />
            </div>
          </div>
        </section>

        {/* 3. Features Section */}
        <section id="features" className="py-20 relative overflow-hidden">
          <ParallaxLayer speed={0.4} className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{ backgroundImage: `url(${geometricBg})` }}
            />
          </ParallaxLayer>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 scroll-reveal">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 aqube-gradient bg-clip-text text-transparent">
                Unlock Gaming Rewards
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience the perfect fusion of gaming and financial benefits. Our credit card is designed specifically for gamers who want to maximize their rewards and build credit.
              </p>
            </div>

            {/* Horizontal Scrolling Container */}
            <div className="relative">
              {/* Gradient fade effect on the sides */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gaming-background to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gaming-background to-transparent z-10 pointer-events-none" />
              
              {/* Scrollable container */}
              <div className="relative w-full overflow-hidden py-4">
                <div 
                  className="flex space-x-8 w-max"
                  style={{
                    animation: 'scroll 30s linear infinite',
                    animationPlayState: 'running',
                    padding: '1rem 0' // Add some vertical padding
                  }}
                >
                  {[
                    {
                      icon: Gamepad2,
                      title: "All-in-One Platform",
                      description: "Access app and card features, including a gaming marketplace and expense tracking tool, for a unified gaming and fintech experience."
                    },
                    {
                      icon: Shield,
                      title: "Transparent Payments",
                      description: "No hidden charges; choose between free and paid card options for extra advantages; enjoy 0% interest on select benefits."
                    },
                    {
                      icon: Gift,
                      title: "Rewards & Perks",
                      description: "Earn points, cashback, and exclusive offers tailored for gamers."
                    },
                    {
                      icon: Trophy,
                      title: "Exclusive Events",
                      description: "Participate in exclusive events, track your XP progress, and compete on leaderboards to unlock special perks."
                    },
                    {
                      icon: Bot,
                      title: "AI Features",
                      description: "Utilize advanced AI tools for personalized recommendations and smart assistance."
                    },
                    {
                      icon: Star,
                      title: "Gaming Rewards",
                      description: "Whether you're a casual mobile gamer or a pro esports athlete, Aqube XP levels up your experience."
                    }
                  ].map((feature, index) => (
                    <div 
                      key={index} 
                      className="flex-shrink-0 w-72 md:w-80 transition-transform hover:scale-105"
                    >
                      <FeatureCard
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                        className="h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Animation keyframes */}
            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes scroll {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(-50%);
                  }
                }
                
                @media (prefers-reduced-motion: reduce) {
                  [style*="animation:"] {
                    animation: none !important;
                  }
                }
                }
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `
            }} />
          </div>
        </section>

        {/* 4. Jersey Section */}
        <section id="jersey" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gaming-background to-gaming-background/80 -z-10" />
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-center opacity-5 -z-20" />
          
          <div className="container mx-auto px-6">
            <div className="scroll-reveal">
              <div className="flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto">
                {/* Jersey Image */}
                <div className="lg:w-1/2 relative">
                  <div className="relative z-10">
                    <img 
                      src="/images/jersey.png" 
                      alt="Esports Jersey" 
                      className="w-full max-w-lg mx-auto transform transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-gaming-primary/10 rounded-full blur-3xl -z-10" />
                  <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-gaming-secondary/10 rounded-full blur-3xl -z-10" />
                </div>

                {/* Content */}
                <div className="lg:w-1/2 text-center lg:text-left">
                  <div className="inline-block px-4 py-2 mb-6 bg-gaming-primary/10 text-gaming-primary text-sm font-semibold rounded-full">
                    EXCLUSIVE OFFER
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gaming-primary to-gaming-secondary bg-clip-text text-transparent">
                    Free Esports Jersey
                  </h2>
                  <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                    Pre-register now and receive an exclusive esports jersey with your Aqube XP credit card. Limited time offer for early adopters!
                  </p>
                  
                  <div className="space-y-6">
                    <ul className="space-y-3 text-left max-w-md mx-auto lg:mx-0">
                      <li className="flex items-center">
                        <CheckCircle2 className="w-6 h-6 text-gaming-primary mr-3 flex-shrink-0" />
                        <span>Official Aqube XP esports team jersey</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="w-6 h-6 text-gaming-primary mr-3 flex-shrink-0" />
                        <span>High-performance, breathable fabric</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="w-6 h-6 text-gaming-primary mr-3 flex-shrink-0" />
                        <span>Limited edition design</span>
                      </li>
                    </ul>

                    <div className="pt-4">
                      <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-gaming-primary to-gaming-secondary hover:opacity-90 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-gaming-primary/20"
                        onClick={() => scrollToSection('auth')}
                      >
                        Claim Your Free Jersey Now
                      </Button>
                      <p className="text-sm text-gaming-accent mt-3">
                        Limited stock available • First come, first served
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. About Section - Single Screen Layout */}
        <section id="about" className="min-h-screen flex items-center relative overflow-hidden py-12">
          <div className="absolute inset-0 bg-gradient-to-b from-gaming-background to-gaming-background/80 -z-10" />
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-center opacity-5 -z-20" />
          
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - About Content */}
              <div className="space-y-8">
                <div className="scroll-reveal">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gaming-primary to-gaming-secondary bg-clip-text text-transparent">
                    About Aqube XP
                  </h2>
                  
                  <div className="space-y-4 mb-8">
                    <p className="text-muted-foreground leading-relaxed">
                      We are gamers, passionate about gaming and esports. We recognized that gamers in India deserve financial products that match their lifestyle. That's why we're building AqubeXP —India's first credit card designed for gamers.
                    </p>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      Our mission is to revolutionize how India's gaming community manages money. Our vision is to bridge the gap between gaming and finance—empowering gamers to earn, save, and enjoy exclusive rewards on every transaction while promoting financial literacy.
                    </p>
                  </div>
                </div>

                {/* Key Features - Compact Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gaming-card/50 p-4 rounded-xl border border-gaming-primary/20 hover:border-gaming-primary/50 transition-colors">
                    <div className="w-10 h-10 bg-gaming-primary/10 rounded-lg flex items-center justify-center mb-3">
                      <Trophy className="w-5 h-5 text-gaming-primary" />
                    </div>
                    <h3 className="font-semibold mb-1 text-foreground">Gaming Rewards</h3>
                    <p className="text-sm text-muted-foreground">Level up your gaming experience</p>
                  </div>
                  
                  <div className="bg-gaming-card/50 p-4 rounded-xl border border-gaming-primary/20 hover:border-gaming-primary/50 transition-colors">
                    <div className="w-10 h-10 bg-gaming-primary/10 rounded-lg flex items-center justify-center mb-3">
                      <DollarSign className="w-5 h-5 text-gaming-primary" />
                    </div>
                    <h3 className="font-semibold mb-1 text-foreground">Financial Tools</h3>
                    <p className="text-sm text-muted-foreground">Smart money management</p>
                  </div>
                  
                  <div className="bg-gaming-card/50 p-4 rounded-xl border border-gaming-primary/20 hover:border-gaming-primary/50 transition-colors">
                    <div className="w-10 h-10 bg-gaming-primary/10 rounded-lg flex items-center justify-center mb-3">
                      <Users2 className="w-5 h-5 text-gaming-primary" />
                    </div>
                    <h3 className="font-semibold mb-1 text-foreground">Community</h3>
                    <p className="text-sm text-muted-foreground">Built by gamers, for gamers</p>
                  </div>

                  <div className="bg-gaming-card/50 p-4 rounded-xl border border-gaming-primary/20 hover:border-gaming-primary/50 transition-colors">
                    <div className="w-10 h-10 bg-gaming-primary/10 rounded-lg flex items-center justify-center mb-3">
                      <Award className="w-5 h-5 text-gaming-primary" />
                    </div>
                    <h3 className="font-semibold mb-1 text-foreground">Exclusive Perks</h3>
                    <p className="text-sm text-muted-foreground">Special rewards and benefits</p>
                  </div>
                </div>

                {/* Mission Statement */}
                <div className="bg-gaming-card/30 backdrop-blur-sm p-6 rounded-2xl border border-gaming-primary/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gaming-primary/10 rounded-full flex items-center justify-center">
                      <Target className="w-4 h-4 text-gaming-primary" />
                    </div>
                    <h3 className="font-semibold text-gaming-primary">OUR MISSION</h3>
                  </div>
                  <p className="text-foreground">
                    To empower gamers with financial tools that understand and reward their lifestyle, creating a bridge between gaming passion and financial success in India and beyond.
                  </p>
                </div>
              </div>

              {/* Right Column - Partners */}
              <div className="space-y-8">
                <div className="bg-gaming-card/30 backdrop-blur-sm p-6 rounded-2xl border border-gaming-primary/20">
                  <h3 className="text-2xl font-bold text-center mb-6 text-foreground">Our Programs</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">Proud member of leading startup ecosystems</p>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { name: 'NVIDIA Inception', logo: '/logos/nvidia-logo.png', desc: 'AI & gaming startup accelerator program' },
                      { name: 'Microsoft for Startups', logo: '/logos/microsoft-logo.png', desc: 'Startup growth program' },
                    ].map((partner, index) => (
                      <div key={index} className="flex flex-col items-center text-center p-4 hover:bg-gaming-card/50 rounded-xl transition-colors">
                        <div className="bg-white/5 p-3 rounded-xl mb-3 w-20 h-20 flex items-center justify-center">
                          <img src={partner.logo} alt={partner.name} className="h-10 object-contain" />
                        </div>
                        <h4 className="font-semibold text-sm text-foreground">{partner.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{partner.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Additional Info */}
                <div className="bg-gradient-to-br from-gaming-primary/10 to-gaming-secondary/10 p-6 rounded-2xl border border-gaming-primary/20">
                  <h3 className="font-semibold text-lg mb-3 text-foreground">Why Choose Aqube XP?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-gaming-primary flex-shrink-0" />
                      <span>Designed specifically for the Indian gaming community</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-gaming-primary flex-shrink-0" />
                      <span>Earn rewards on every transaction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-gaming-primary flex-shrink-0" />
                      <span>Exclusive gaming benefits and discounts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-gaming-primary flex-shrink-0" />
                      <span>Build credit while you play</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Gaming Arena Section */}
        <section id="gaming-arena" className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12 scroll-reveal">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 aqube-gradient bg-clip-text text-transparent">
                Gaming Arena
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Play games, earn points, and climb the leaderboard!
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Slot Machine Card */}
              <div className="scroll-reveal bg-gaming-surface p-6 rounded-2xl border border-gaming-primary/30">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎰</div>
                  <h3 className="text-xl font-semibold text-gaming-primary mb-2">Slot Machine</h3>
                  <p className="text-muted-foreground mb-4">Try your luck! Win points and prizes with lucky streaks.</p>
                  {user ? (
                    <Button 
                      onClick={() => setSlotMachineOpen(true)}
                      className="w-full bg-gaming-primary hover:bg-gaming-primary/90"
                    >
                      Spin Now
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-amber-400 mb-2">Sign in to play and earn points!</p>
                      <Button 
                        onClick={() => scrollToSection('auth')}
                        className="w-full bg-amber-500 hover:bg-amber-600"
                      >
                        Sign In to Play
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Gaming Quiz Card */}
              <div className="scroll-reveal bg-gaming-surface p-6 rounded-2xl border border-gaming-primary/30">
                <div className="text-center">
                  <div className="text-6xl mb-4">🧠</div>
                  <h3 className="text-xl font-semibold text-gaming-primary mb-2">Gaming Quiz</h3>
                  <p className="text-muted-foreground mb-4">Test your gaming knowledge with timed questions.</p>
                  {user ? (
                    <Button 
                      onClick={() => setQuizOpen(true)}
                      className="w-full bg-gaming-secondary hover:bg-gaming-secondary/90"
                    >
                      Play Now
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-amber-400 mb-2">Sign in to test your knowledge!</p>
                      <Button 
                        onClick={() => scrollToSection('auth')}
                        className="w-full bg-amber-500 hover:bg-amber-600"
                      >
                        Sign In to Play
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Word Scramble Card */}
              <div className="scroll-reveal bg-gaming-surface p-6 rounded-2xl border border-gaming-primary/30">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔤</div>
                  <h3 className="text-xl font-semibold text-gaming-primary mb-2">Word Scramble</h3>
                  <p className="text-muted-foreground mb-4">Unscramble the letters to form valid words against the clock!</p>
                  {user ? (
                    <Button 
                      onClick={() => setWordScrambleOpen(true)}
                      className="w-full bg-gaming-accent hover:bg-gaming-accent/90"
                    >
                      Play Now
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-amber-400 mb-2">Sign in to play word games!</p>
                      <Button 
                        onClick={() => scrollToSection('auth')}
                        className="w-full bg-amber-500 hover:bg-amber-600"
                      >
                        Sign In to Play
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Game Card */}
              <div className="scroll-reveal bg-gaming-surface p-6 rounded-2xl border border-gaming-primary/30">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎮</div>
                  <h3 className="text-xl font-semibold text-gaming-primary mb-2">Key Game</h3>
                  <p className="text-muted-foreground mb-4">Test your reflexes in this exciting key pressing challenge!</p>
                  {user ? (
                    <Button 
                      onClick={() => setKeyGameOpen(true)}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      Play Now
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-amber-400 mb-2">Sign in to play the key game!</p>
                      <Button 
                        onClick={() => scrollToSection('auth')}
                        className="w-full bg-amber-500 hover:bg-amber-600"
                      >
                        Sign In to Play
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Leaderboard Section */}
        <section id="leaderboard" className="py-20 relative">
          <ParallaxLayer speed={0.2} className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-5"
              style={{ backgroundImage: `url(${heroCard})` }}
            />
          </ParallaxLayer>
          
          <div className="container mx-auto px-6">
            <div className="scroll-reveal">
              <ConnectedLeaderboard user={user} />
            </div>
          </div>
        </section>

        {/* 8. FAQ Section */}
        <section id="faq" className="py-20 relative">
          <ParallaxLayer speed={0.3} className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-5"
              style={{ backgroundImage: `url(${gamingBg})` }}
            />
          </ParallaxLayer>
          
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 scroll-reveal">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 aqube-gradient bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  question: "When will the credit card be available?",
                  answer: "As early as possible! Stay tuned for announcements!"
                },
                {
                  question: "How can I redeem my rewards?",
                  answer: "Your rewards will be available to you after the launch of our credit card/app as early as possible."
                },
                {
                  question: "Will there be any charges for the gaming credit card?",
                  answer: "We will launch the card with two variants - one for free and another with an annual fee that includes extra rewards and features."
                },
                {
                  question: "How to get more spins?",
                  answer: "You can refer your friends or family and get up to 3 spins max."
                },
                {
                  question: "How to progress in the leaderboard?",
                  answer: "Play games, quizzes and spin the wheel to collect points and progress in leaderboards. You can even receive a surprise gift if you are first in the list!"
                },
                {
                  question: "Is it free to register on the website?",
                  answer: "Yes, registration is completely free."
                },
                {
                  question: "Why should I pre-register for the Aqube Gaming Credit Card?",
                  answer: "Pre-registering ensures you are among the first to access exclusive benefits, early offers, and rewards."
                },
                {
                  question: "Is my personal information secure?",
                  answer: "Absolutely. We prioritize user data privacy and security, following strict data protection policies."
                },
                {
                  question: "How will I know when it launches?",
                  answer: "We will update you via email and social media handles."
                }
              ].map((faq, index) => (
                <div 
                  key={index} 
                  className="scroll-reveal bg-gaming-surface rounded-lg border border-gaming-primary/30 overflow-hidden hover:border-gaming-primary/50 transition-colors"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gaming-surface/50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gaming-primary pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-gaming-primary" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gaming-primary" />
                      )}
                    </div>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 pt-1 text-muted-foreground">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Footer */}
        <Footer onSurveyClick={() => setSurveyOpen(true)} />
        
        {/* Modals */}
        <SlotMachineModal 
          user={user} 
          isOpen={slotMachineOpen} 
          onClose={() => setSlotMachineOpen(false)}
          onPointsUpdate={refreshUserPoints}
        />
        <SurveyModal user={user} isOpen={surveyOpen} onClose={() => setSurveyOpen(false)} />
        <GamingQuiz user={user} isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
        <WordScramble user={user} isOpen={wordScrambleOpen} onClose={() => setWordScrambleOpen(false)} />
        <KeyGameModal isOpen={keyGameOpen} onClose={() => setKeyGameOpen(false)} />
      </div>
    </>
  );
};

export default Index;