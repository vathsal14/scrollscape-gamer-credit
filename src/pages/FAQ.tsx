import { useState } from 'react';
import { ParallaxLayer } from '@/components/ParallaxLayers';
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import particlesBg from '@/assets/particles-bg.jpg';
import { cn } from '@/lib/utils';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const faqs = [
    {
      question: "When will the credit card be available?",
      answer: "As early as possible! Stay tuned for announcements!"
    },
    {
      question: "How can I redeem my reward?",
      answer: "Your reward will be available to you after the launch of our credit card/app as early as possible"
    },
    {
      question: "Will there be any charges for gaming credit card?",
      answer: "We will launch card with two variants one for free and other with annual fee with extra rewards and features"
    },
    {
      question: "How to get more spins?",
      answer: "You can refer to your friends or family and get 3 spins max"
    },
    {
      question: "How to progress in leaderboard?",
      answer: "Play games, quizzes and spin the wheel to collect points and progress in leaderboards you can even receive a surprise gift if you are the first in the list"
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
      answer: "We will update via your mail, and social media handles"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gaming-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gaming-background/80 backdrop-blur-md border-b border-gaming-primary/20">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-3xl font-bold aqube-gradient bg-clip-text text-transparent">
              AqubeXP
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text">Home</a>
              <a href="/#features" className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text">Features</a>
              <a href="/about" className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text">About</a>
              <a href="/refer" className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text">Refer & Earn</a>
              <a href="/faq" className="text-gaming-primary glow-text">FAQ</a>
              <a href="/#join" className="bg-gaming-primary text-gaming-background px-6 py-2 rounded-full font-semibold hover:shadow-glow transition-all">
                Join Aqube XP
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground hover:text-gaming-primary focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={cn(
            'md:hidden mt-4 transition-all duration-300 ease-in-out overflow-hidden',
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}>
            <div className="flex flex-col space-y-4 py-4">
              <a 
                href="/" 
                className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="/#features" 
                className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="/about" 
                className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="/refer" 
                className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Refer & Earn
              </a>
              <a 
                href="/faq" 
                className="text-gaming-primary glow-text px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </a>
              <a 
                href="/#join" 
                className="bg-gaming-primary text-gaming-background px-6 py-2 rounded-full font-semibold hover:shadow-glow transition-all text-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Join Aqube XP
              </a>
            </div>
          </div>
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
            Frequently Asked <span className="text-transparent bg-clip-text aqube-gradient glow-text">Questions</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get answers to the most common questions about Aqube XP gaming credit card
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-gaming-surface-elevated border border-gaming-primary/20 rounded-xl overflow-hidden hover:border-gaming-primary/40 transition-all duration-300"
              >
                <div 
                  className="p-5 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold text-foreground pr-4">{faq.question}</h3>
                  <div className="flex-shrink-0 ml-4">
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-gaming-primary transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gaming-primary transition-transform duration-300" />
                    )}
                  </div>
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-5 -mt-2 text-muted-foreground">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gaming-surface">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Still have <span className="text-transparent bg-clip-text aqube-gradient glow-text">questions?</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Can't find the answer you're looking for? Please chat with our friendly team.
            </p>
            <a 
              href="mailto:info@aqube.xyz"
              className="inline-block bg-gaming-primary text-gaming-background px-8 py-4 rounded-full font-semibold hover:shadow-glow transition-all"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;