import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Copy, Users, Gift, Share2, Zap } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface ReferralSystemProps {
  user: User | null;
}

const ReferralSystem = ({ user }: ReferralSystemProps) => {
  const [referralCode, setReferralCode] = useState('');
  const [referralCount, setReferralCount] = useState(0);
  const [spins, setSpins] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchReferralCount();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('referral_code, spins')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      if (data) {
        setReferralCode(data.referral_code || '');
        setSpins(data.spins || 0);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchReferralCount = async () => {
    if (!user) return;
    
    try {
      const { count, error } = await supabase
        .from('referrals')
        .select('*', { count: 'exact' })
        .eq('referrer_id', user.id);

      if (error) throw error;
      
      setReferralCount(count || 0);
    } catch (error) {
      console.error('Error fetching referral count:', error);
    }
  };

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      toast.success('Referral code copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy referral code');
    }
  };

  const shareReferral = async () => {
    const shareData = {
      title: 'Join Aqube XP - Gaming Credit Card',
      text: `Join me on Aqube XP, India's first gaming credit card! Use my referral code: ${referralCode}`,
      url: `${window.location.origin}?ref=${referralCode}`
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`
        );
        toast.success('Referral link copied to clipboard!');
      }
    } catch (error) {
      toast.error('Failed to share referral');
    }
  };

  if (!user) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-gaming-surface border-gaming-primary/30">
        <CardHeader className="text-center">
          <CardTitle className="text-gaming-primary flex items-center justify-center gap-2">
            <Users className="w-6 h-6" />
            Refer & Earn Spins
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-muted-foreground mb-4">
            Sign in to start referring friends and earning extra spins!
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-gaming-background rounded-lg border border-gaming-primary/20">
              <div className="text-gaming-primary font-bold text-2xl">1</div>
              <div className="text-muted-foreground">Share Your Code</div>
            </div>
            <div className="p-4 bg-gaming-background rounded-lg border border-gaming-primary/20">
              <div className="text-gaming-secondary font-bold text-2xl">2</div>
              <div className="text-muted-foreground">Friend Signs Up</div>
            </div>
            <div className="p-4 bg-gaming-background rounded-lg border border-gaming-primary/20">
              <div className="text-gaming-accent font-bold text-2xl">3</div>
              <div className="text-muted-foreground">Earn Extra Spins</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const maxReferrals = 3;
  const remainingReferrals = Math.max(0, maxReferrals - referralCount);

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gaming-surface border-gaming-primary/30">
      <CardHeader className="text-center">
        <CardTitle className="text-gaming-primary flex items-center justify-center gap-2">
          <Users className="w-6 h-6" />
          Refer & Earn Spins
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          Invite friends to join Aqube XP and earn extra spins. Maximum 3 referrals per user.
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Referral Code Section */}
        <div className="space-y-3">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-2">Your Referral Code</div>
            <div className="text-sm text-gaming-accent mb-4">
              Share this code with friends
            </div>
          </div>
          
          <div className="flex gap-2">
            <Input
              value={referralCode}
              readOnly
              className="text-center font-mono text-lg bg-gaming-background border-gaming-primary/30"
            />
            <Button
              onClick={copyReferralCode}
              variant="outline"
              className="border-gaming-primary/30 hover:bg-gaming-primary/10"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              onClick={shareReferral}
              className="bg-gaming-primary hover:bg-gaming-primary/90"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-gaming-background rounded-lg border border-gaming-primary/20">
            <div className="text-gaming-primary font-bold text-2xl">{referralCount}</div>
            <div className="text-sm text-muted-foreground">Referrals made</div>
            <div className="text-xs text-gaming-accent">/{maxReferrals}</div>
          </div>
          <div className="p-4 bg-gaming-background rounded-lg border border-gaming-secondary/20">
            <div className="text-gaming-secondary font-bold text-2xl">{remainingReferrals}</div>
            <div className="text-sm text-muted-foreground">Remaining</div>
          </div>
          <div className="p-4 bg-gaming-background rounded-lg border border-gaming-accent/20">
            <div className="text-gaming-accent font-bold text-2xl flex items-center justify-center gap-1">
              <Zap className="w-5 h-5" />
              {spins}
            </div>
            <div className="text-sm text-muted-foreground">Current spins</div>
          </div>
        </div>

        {/* How It Works */}
        <div className="space-y-4">
          <div className="text-center text-sm font-semibold text-gaming-primary">
            How It Works
          </div>
          <div className="text-sm text-muted-foreground">
            Simple steps to earn spins
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gaming-background rounded-lg border border-gaming-primary/20">
              <div className="w-12 h-12 bg-gaming-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-gaming-background font-bold">1</span>
              </div>
              <div className="font-semibold text-gaming-primary mb-2">Share Your Code</div>
              <div className="text-xs text-muted-foreground">
                Send your referral code to friends who love gaming
              </div>
            </div>
            
            <div className="text-center p-4 bg-gaming-background rounded-lg border border-gaming-secondary/20">
              <div className="w-12 h-12 bg-gaming-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">2</span>
              </div>
              <div className="font-semibold text-gaming-secondary mb-2">Friend Signs Up</div>
              <div className="text-xs text-muted-foreground">
                They create an account using your referral code
              </div>
            </div>
            
            <div className="text-center p-4 bg-gaming-background rounded-lg border border-gaming-accent/20">
              <div className="w-12 h-12 bg-gaming-accent rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-gaming-background font-bold">3</span>
              </div>
              <div className="font-semibold text-gaming-accent mb-2">Earn Extra Spins</div>
              <div className="text-xs text-muted-foreground">
                You get +1 spin for each successful referral
              </div>
            </div>
          </div>
        </div>

        {/* Pro Tip */}
        <div className="p-4 bg-gaming-primary/10 rounded-lg border border-gaming-primary/30">
          <div className="flex items-start gap-3">
            <Gift className="w-5 h-5 text-gaming-primary mt-0.5" />
            <div>
              <div className="font-semibold text-gaming-primary mb-1">💡 Pro Tip</div>
              <div className="text-sm text-muted-foreground">
                Maximum 3 referrals per user. Each referral gives you 1 extra spin for the rewards wheel!
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralSystem;