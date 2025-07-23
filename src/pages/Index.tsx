import { useEffect, useState, useRef } from 'react';
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
  const [userPoints, setUserPoints] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);

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
              <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text">About</button>
              <button onClick={() => scrollToSection('refer')} className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text">Refer & Earn</button>
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

        {/* Hero Section */}
        <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <ParallaxLayer speed={0.5} className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: `url(${gamingBg})` }}
            />
          </ParallaxLayer>

          <MouseParallax 
            strength={0.02}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{ backgroundImage: `url(${particlesBg})` }}
            />
          </MouseParallax>

          <FloatingElement 
            className="absolute top-20 left-20 text-gaming-primary opacity-50"
            speed={3}
            delay={0}
          >
            <Gamepad2 size={60} />
          </FloatingElement>

          <FloatingElement 
            className="absolute top-40 right-32 text-gaming-secondary opacity-30"
            speed={4}
            delay={1}
          >
            <Trophy size={80} />
          </FloatingElement>

          <FloatingElement 
            className="absolute bottom-32 left-40 text-gaming-accent opacity-40"
            speed={2.5}
            delay={2}
          >
            <Zap size={50} />
          </FloatingElement>

          <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
            <div className="scroll-reveal">
              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
                <span className="aqube-gradient bg-clip-text text-transparent">
                  AqubeXP
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-foreground mb-4 font-semibold">
                Not Just a Card
              </p>
              <p className="text-4xl md:text-5xl font-bold mb-8 aqube-gradient bg-clip-text text-transparent">
                A Power-Up
              </p>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
                India's first gaming credit card is on the way - Level up your gaming experience. Join the Waitlist now!!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Button 
                  size="lg" 
                  className="bg-gaming-primary hover:bg-gaming-primary/90 text-gaming-background px-8 py-4 text-lg font-semibold shadow-glow hover:shadow-xl transition-all duration-300"
                  onClick={() => scrollToSection('auth')}
                >
                  Pre Register Now
                </Button>
              </div>

              <div className="mb-16">
                <CreditCard3D className="card-3d" />
              </div>

              <button 
                onClick={() => scrollToSection('features')}
                className="animate-bounce text-gaming-primary hover:text-gaming-secondary transition-colors"
              >
                <ChevronDown size={40} />
              </button>
            </div>
          </div>
        </section>

        {/* Authentication Section */}
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

        {/* Gaming Arena Section */}
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
              <div className="scroll-reveal bg-gaming-surface p-6 rounded-2xl border border-gaming-primary/30">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎰</div>
                  <h3 className="text-xl font-semibold text-gaming-primary mb-2">Slot Machine</h3>
                  <p className="text-muted-foreground mb-4">Try your luck! Win points and prizes with lucky streaks.</p>
                  <Button 
                    onClick={() => setSlotMachineOpen(true)}
                    className="w-full bg-gaming-primary hover:bg-gaming-primary/90"
                  >
                    Spin Now
                  </Button>
                </div>
              </div>
              
              <div className="scroll-reveal bg-gaming-surface p-6 rounded-2xl border border-gaming-primary/30">
                <div className="text-center">
                  <div className="text-6xl mb-4">🧠</div>
                  <h3 className="text-xl font-semibold text-gaming-primary mb-2">Gaming Quiz</h3>
                  <p className="text-muted-foreground mb-4">Test your gaming knowledge with timed questions.</p>
                  <Button disabled className="w-full bg-gaming-secondary/50">
                    Coming Soon
                  </Button>
                </div>
              </div>
              
              <div className="scroll-reveal bg-gaming-surface p-6 rounded-2xl border border-gaming-primary/30">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔤</div>
                  <h3 className="text-xl font-semibold text-gaming-primary mb-2">Word Scramble</h3>
                  <p className="text-muted-foreground mb-4">Unscramble the letters to form valid words against the clock!</p>
                  <Button disabled className="w-full bg-gaming-accent/50">
                    Coming Soon
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboard Section */}
        <section id="leaderboard" className="py-20 relative">
          <ParallaxLayer speed={0.2} className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-5"
              style={{ backgroundImage: `url(${heroCard})` }}
            />
          </ParallaxLayer>
          
          <div className="container mx-auto px-6">
            <div className="scroll-reveal">
              <ConnectedLeaderboard />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 relative">
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <FeatureCard
                icon={Gamepad2}
                title="All-in-One Platform"
                description="Access app and card features, including a gaming marketplace and expense tracking tool, for a unified gaming and fintech experience."
                className="scroll-reveal"
              />
              <FeatureCard
                icon={Shield}
                title="Transparent Payments"
                description="No hidden charges; choose between free and paid card options for extra advantages; enjoy 0% interest on select benefits."
                className="scroll-reveal"
              />
              <FeatureCard
                icon={Gift}
                title="Rewards & Perks"
                description="Earn points, cashback, and exclusive offers tailored for gamers."
                className="scroll-reveal"
              />
              <FeatureCard
                icon={Trophy}
                title="Exclusive Events & Progression"
                description="Participate in exclusive events, track your XP progress, and compete on leaderboards to unlock special perks."
                className="scroll-reveal"
              />
              <FeatureCard
                icon={Bot}
                title="AI Features"
                description="Utilize advanced AI tools for personalized recommendations and smart assistance."
                className="scroll-reveal"
              />
              <FeatureCard
                icon={Star}
                title="Gaming-First Rewards"
                description="Whether you're a casual mobile gamer or a pro esports athlete, Aqube XP levels up your experience."
                className="scroll-reveal"
              />
            </div>
          </div>
        </section>

        {/* Exclusive Offer Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="scroll-reveal bg-gradient-to-r from-gaming-primary/20 to-gaming-secondary/20 rounded-3xl p-12 border border-gaming-primary/30 text-center">
              <div className="text-6xl mb-6">🏆</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 aqube-gradient bg-clip-text text-transparent">
                Exclusive Pre-registration Offer
              </h2>
              <h3 className="text-2xl font-semibold text-gaming-primary mb-6">
                Free Official Esports Jersey
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                All pre-registered users will receive an exclusive esports team jersey with their Aqube XP credit card.
              </p>
              <div className="space-y-4">
                <Button 
                  size="lg" 
                  className="bg-gaming-primary hover:bg-gaming-primary/90 px-8 py-4 text-lg"
                  onClick={() => scrollToSection('auth')}
                >
                  Secure Your Jersey Now
                </Button>
                <div className="text-sm text-gaming-accent">
                  Pre-register Now → Get Your Free Jersey
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Referral Section */}
        <section id="refer" className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="scroll-reveal">
              <ReferralSystem user={user} />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 relative">
          <ParallaxLayer speed={0.3} className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-5"
              style={{ backgroundImage: `url(${gamingBg})` }}
            />
          </ParallaxLayer>
          
          <div className="container mx-auto px-6">
            <div className="scroll-reveal text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 aqube-gradient bg-clip-text text-transparent">
                About Aqube XP
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-8 scroll-reveal">
              <p className="text-lg text-muted-foreground leading-relaxed">
                We are gamers, passionate about gaming and esports. We recognized that gamers in India deserve financial products that match their lifestyle. That's why we're building AqubeXP —India's first credit card designed for gamers.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our mission is to revolutionize how India's gaming community manages money. Our vision is to bridge the gap between gaming and finance—empowering gamers to earn, save, and enjoy exclusive rewards on every transaction while promoting financial literacy.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe gamers deserve more than just points—they deserve power. That's why our card isn't just about spending smarter; it's about leveling up your life.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              <div className="text-center scroll-reveal">
                <div className="text-4xl font-bold text-gaming-primary mb-2">1K+</div>
                <div className="text-muted-foreground">Pre Registers</div>
              </div>
              <div className="text-center scroll-reveal">
                <div className="text-4xl font-bold text-gaming-secondary mb-2">100K+</div>
                <div className="text-muted-foreground">points claimed</div>
              </div>
              <div className="text-center scroll-reveal">
                <div className="text-4xl font-bold text-gaming-accent mb-2">99.9%</div>
                <div className="text-muted-foreground">System Uptime</div>
              </div>
              <div className="text-center scroll-reveal">
                <div className="text-4xl font-bold text-gaming-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Gamer Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 relative">
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
                <div key={index} className="scroll-reveal bg-gaming-surface p-6 rounded-lg border border-gaming-primary/30">
                  <h3 className="text-lg font-semibold text-gaming-primary mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer onSurveyClick={() => setSurveyOpen(true)} />
        
        {/* Modals */}
        <SlotMachineModal user={user} isOpen={slotMachineOpen} onClose={() => setSlotMachineOpen(false)} />
        <SurveyModal user={user} isOpen={surveyOpen} onClose={() => setSurveyOpen(false)} />
        <GamingQuiz user={user} isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
        <WordScramble user={user} isOpen={wordScrambleOpen} onClose={() => setWordScrambleOpen(false)} />
      </div>
    </>
  );
};

export default Index;