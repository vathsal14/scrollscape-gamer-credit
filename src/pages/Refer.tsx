import { useState, useEffect } from 'react';
import { ParallaxLayer } from '@/components/ParallaxLayers';
import { Copy, Gift, Users, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import particlesBg from '@/assets/particles-bg.jpg';

const Refer = () => {
  const [referralCode] = useState('722f74aa');
  const [referralsMade] = useState(0);
  const [currentSpins] = useState(3);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

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
            <a href="/about" className="text-foreground hover:text-gaming-primary transition-colors hover:glow-text">About</a>
            <a href="/refer" className="text-gaming-primary glow-text">Refer & Earn</a>
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
            Refer & Earn <span className="text-transparent bg-clip-text aqube-gradient glow-text">Spins</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Invite friends to join Aqube XP and earn extra spins. Maximum 3 referrals per user.
          </p>
        </div>
      </section>

      {/* Referral Dashboard */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Referral Code Section */}
            <div className="bg-gaming-surface-elevated border border-gaming-primary/20 rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">Your Referral Code</h2>
              <p className="text-muted-foreground mb-6">Share this code with friends</p>
              
              <div className="bg-gaming-surface p-6 rounded-2xl border-2 border-gaming-primary/30 mb-6">
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-mono font-bold text-gaming-primary glow-text">
                    {referralCode}
                  </div>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className="ml-4"
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gaming-surface p-4 rounded-xl">
                  <div className="text-2xl font-bold text-gaming-primary">{referralsMade}/3</div>
                  <div className="text-sm text-muted-foreground">Referrals made</div>
                </div>
                <div className="bg-gaming-surface p-4 rounded-xl">
                  <div className="text-2xl font-bold text-gaming-secondary">{3 - referralsMade}</div>
                  <div className="text-sm text-muted-foreground">Remaining</div>
                </div>
                <div className="bg-gaming-surface p-4 rounded-xl">
                  <div className="text-2xl font-bold text-gaming-accent">{currentSpins}</div>
                  <div className="text-sm text-muted-foreground">Current spins</div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-gaming-surface-elevated border border-gaming-primary/20 rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">How It Works</h2>
              <p className="text-muted-foreground mb-8">Simple steps to earn spins</p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gaming-primary rounded-full flex items-center justify-center font-bold text-gaming-background">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Share Your Code</h3>
                    <p className="text-muted-foreground">Send your referral code to friends who love gaming</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gaming-secondary rounded-full flex items-center justify-center font-bold text-white">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Friend Signs Up</h3>
                    <p className="text-muted-foreground">They create an account using your referral code</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gaming-accent rounded-full flex items-center justify-center font-bold text-gaming-background">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Earn Extra Spins</h3>
                    <p className="text-muted-foreground">You get +1 spin for each successful referral</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Tip */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-gradient-to-r from-gaming-primary/20 to-gaming-secondary/20 border border-gaming-primary/30 rounded-3xl p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-gaming-accent mr-3" />
              <h3 className="text-2xl font-bold text-foreground">💡 Pro Tip</h3>
            </div>
            <p className="text-lg text-muted-foreground">
              Maximum 3 referrals per user. Each referral gives you 1 extra spin for the rewards wheel!
            </p>
          </div>
        </div>
      </section>

      {/* Share Buttons */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <h3 className="text-3xl font-bold text-foreground mb-8">Share with Friends</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Gift className="w-4 h-4" />
              <span>Share on Discord</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Share on Telegram</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Refer;