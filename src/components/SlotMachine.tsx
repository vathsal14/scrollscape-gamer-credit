import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Coins, Play, Trophy, Gift, Star, Zap } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface SlotMachineProps {
  user: User | null;
}

const SlotMachine = ({ user }: SlotMachineProps) => {
  const [spinning, setSpinning] = useState(false);
  const [spins, setSpins] = useState(0);
  const [points, setPoints] = useState(0);
  const [reels, setReels] = useState(['🎰', '🎰', '🎰']);
  const [lastWin, setLastWin] = useState<string | null>(null);

  const symbols = ['🎰', '🍀', '💎', '👑', '⭐', '🔥', '💰', '🎯'];
  const rewards = {
    '🎰🎰🎰': { points: 1000, message: 'JACKPOT! Triple Slots!' },
    '💎💎💎': { points: 500, message: 'Diamond Win!' },
    '👑👑👑': { points: 300, message: 'Royal Victory!' },
    '🍀🍀🍀': { points: 200, message: 'Lucky Triple!' },
    '⭐⭐⭐': { points: 150, message: 'Star Power!' },
    '🔥🔥🔥': { points: 100, message: 'Fire Win!' },
    '💰💰💰': { points: 250, message: 'Money Rain!' },
    '🎯🎯🎯': { points: 180, message: 'Perfect Shot!' }
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('spins, points')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      if (data) {
        setSpins(data.spins || 0);
        setPoints(data.points || 0);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const updateUserData = async (newSpins: number, newPoints: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          spins: newSpins, 
          points: newPoints,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      
      setSpins(newSpins);
      setPoints(newPoints);
    } catch (error) {
      console.error('Error updating user data:', error);
      toast.error('Failed to update data');
    }
  };

  const spinReels = async () => {
    if (!user) {
      toast.error('Please sign in to play!');
      return;
    }

    if (spins <= 0) {
      toast.error('No spins remaining! Refer friends to get more spins.');
      return;
    }

    setSpinning(true);
    setLastWin(null);

    // Animate spinning
    const spinDuration = 2000;
    const interval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);
    }, 100);

    setTimeout(async () => {
      clearInterval(interval);
      
      // Final result
      const finalReels = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ];
      
      setReels(finalReels);
      setSpinning(false);

      // Check for wins
      const reelString = finalReels.join('');
      const reward = rewards[reelString as keyof typeof rewards];
      
      let pointsWon = 0;
      if (reward) {
        pointsWon = reward.points;
        setLastWin(reward.message);
        toast.success(`${reward.message} +${reward.points} points!`);
      } else {
        // Small consolation points
        pointsWon = 10;
        toast.info('Better luck next time! +10 consolation points');
      }

      // Update user data
      await updateUserData(spins - 1, points + pointsWon);
    }, spinDuration);
  };

  if (!user) {
    return (
      <Card className="w-full max-w-md mx-auto bg-gaming-surface border-gaming-primary/30">
        <CardHeader className="text-center">
          <CardTitle className="text-gaming-primary flex items-center justify-center gap-2">
            <Play className="w-6 h-6" />
            Slot Machine
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-muted-foreground mb-4">
            Sign in to start spinning and winning rewards!
          </div>
          <div className="flex justify-center space-x-4 text-6xl mb-6">
            <div className="bg-gaming-background p-4 rounded-lg border border-gaming-primary/30">
              🎰
            </div>
            <div className="bg-gaming-background p-4 rounded-lg border border-gaming-primary/30">
              🎰
            </div>
            <div className="bg-gaming-background p-4 rounded-lg border border-gaming-primary/30">
              🎰
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-gaming-surface border-gaming-primary/30">
      <CardHeader className="text-center">
        <CardTitle className="text-gaming-primary flex items-center justify-center gap-2">
          <Play className="w-6 h-6" />
          Slot Machine
        </CardTitle>
        <div className="flex justify-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-gaming-accent" />
            <span>{spins} spins</span>
          </div>
          <div className="flex items-center gap-1">
            <Coins className="w-4 h-4 text-gaming-secondary" />
            <span>{points} points</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Slot Machine Display */}
        <div className="flex justify-center space-x-2">
          {reels.map((symbol, index) => (
            <div
              key={index}
              className={`bg-gaming-background p-4 rounded-lg border-2 text-6xl transition-all duration-300 ${
                spinning
                  ? 'border-gaming-primary animate-pulse scale-110'
                  : 'border-gaming-primary/30'
              }`}
            >
              {symbol}
            </div>
          ))}
        </div>

        {/* Last Win Display */}
        {lastWin && (
          <div className="text-center p-3 bg-gaming-primary/20 rounded-lg border border-gaming-primary/30">
            <div className="flex items-center justify-center gap-2 text-gaming-primary font-semibold">
              <Trophy className="w-5 h-5" />
              {lastWin}
            </div>
          </div>
        )}

        {/* Spin Button */}
        <Button
          onClick={spinReels}
          disabled={spinning || spins <= 0}
          className="w-full bg-gaming-primary hover:bg-gaming-primary/90 disabled:opacity-50"
          size="lg"
        >
          {spinning ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Spinning...
            </div>
          ) : spins <= 0 ? (
            'No Spins Left'
          ) : (
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              SPIN ({spins} left)
            </div>
          )}
        </Button>

        {/* Rewards Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="font-semibold text-gaming-primary">Winning Combinations:</div>
          <div className="grid grid-cols-2 gap-1">
            <div>🎰🎰🎰 = 1000pts</div>
            <div>💎💎💎 = 500pts</div>
            <div>👑👑👑 = 300pts</div>
            <div>💰💰💰 = 250pts</div>
          </div>
          <div className="text-center mt-2 text-gaming-accent">
            Get more spins by referring friends!
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SlotMachine;