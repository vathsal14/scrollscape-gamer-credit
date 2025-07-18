import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Coins, Play, Trophy, Gift, Star, Zap, X } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface SlotMachineModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const SlotMachineModal = ({ user, isOpen, onClose }: SlotMachineModalProps) => {
  const [spinning, setSpinning] = useState(false);
  const [spins, setSpins] = useState(0);
  const [points, setPoints] = useState(0);
  const [reels, setReels] = useState(['🎰', '🎰', '🎰']);
  const [lastWin, setLastWin] = useState<string | null>(null);

  const symbols = ['🎰', '🍀', '💎', '👑', '⭐', '🔥', '💰', '🎯'];
  
  const rewards = {
    // Possible rewards (higher chance)
    '🍀🍀🍀': { points: 100, message: '100 Points!' },
    '⭐⭐⭐': { points: 500, message: '500 Points!' },
    '🔥🔥🔥': { points: 1000, message: '1000 Points!' },
    '🎯🎯🎯': { points: 0, message: 'Extra Spin!', extraSpin: true },
    
    // Impossible rewards (will never be rolled)
    '💎💎💎': { points: 0, message: 'Gaming Headset!', impossible: true },
    '👑👑👑': { points: 0, message: 'Nintendo Switch!', impossible: true },
    '🎰🎰🎰': { points: 0, message: 'Free Credit Card!', impossible: true },
    '💰💰💰': { points: 0, message: 'Gaming Headset!', impossible: true }
  };

  const possibleCombinations = ['🍀🍀🍀', '⭐⭐⭐', '🔥🔥🔥', '🎯🎯🎯'];

  useEffect(() => {
    if (user && isOpen) {
      fetchUserData();
    }
  }, [user, isOpen]);

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
    const spinDuration = 3000;
    const interval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);
    }, 100);

    setTimeout(async () => {
      clearInterval(interval);
      
      // Determine result based on weighted probability
      let finalReels: string[];
      const randomValue = Math.random();
      
      if (randomValue < 0.3) {
        // 30% chance for 100 points
        finalReels = ['🍀', '🍀', '🍀'];
      } else if (randomValue < 0.15) {
        // 15% chance for 500 points
        finalReels = ['⭐', '⭐', '⭐'];
      } else if (randomValue < 0.05) {
        // 5% chance for 1000 points
        finalReels = ['🔥', '🔥', '🔥'];
      } else if (randomValue < 0.1) {
        // 10% chance for extra spin
        finalReels = ['🎯', '🎯', '🎯'];
      } else {
        // Random non-winning combination
        finalReels = [
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)]
        ];
        // Ensure it's not a winning combination
        const combo = finalReels.join('');
        if (possibleCombinations.includes(combo)) {
          finalReels[2] = symbols.find(s => s !== finalReels[0] && s !== finalReels[1]) || '🎰';
        }
      }
      
      setReels(finalReels);
      setSpinning(false);

      // Check for wins
      const reelString = finalReels.join('');
      const reward = rewards[reelString as keyof typeof rewards];
      
      let pointsWon = 0;
      let spinsUsed = 1;
      
      if (reward) {
        if ('extraSpin' in reward && reward.extraSpin) {
          spinsUsed = 0; // Don't consume a spin
          setLastWin(reward.message);
          toast.success(`${reward.message} Spin again!`);
        } else {
          pointsWon = reward.points;
          setLastWin(reward.message);
          toast.success(`${reward.message} +${reward.points} points!`);
        }
      } else {
        // Small consolation points
        pointsWon = 10;
        toast.info('Better luck next time! +10 consolation points');
      }

      // Update user data
      await updateUserData(spins - spinsUsed, points + pointsWon);
    }, spinDuration);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gaming-surface border-gaming-primary/30">
        <DialogHeader>
          <DialogTitle className="text-gaming-primary flex items-center justify-center gap-2">
            <Play className="w-6 h-6" />
            Spin & Win
          </DialogTitle>
        </DialogHeader>
        
        {!user ? (
          <div className="text-center py-8">
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
          </div>
        ) : (
          <div className="space-y-6">
            {/* Progress bar showing steps */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <div className="w-16 h-1 bg-yellow-400"></div>
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 text-sm">⏱</span>
              </div>
              <div className="w-16 h-1 bg-gray-300"></div>
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 text-sm">○</span>
              </div>
              <div className="w-16 h-1 bg-gray-300"></div>
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 text-sm">○</span>
              </div>
              <div className="w-16 h-1 bg-gray-300"></div>
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                <Gift className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-6 text-sm mb-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <span>{spins} spins</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                  <span className="text-white text-xs">💧</span>
                </div>
                <span>179 ml</span>
              </div>
            </div>

            {/* Main Slot Machine */}
            <div className="relative">
              <div className="bg-gradient-to-b from-gray-800 to-black p-6 rounded-3xl border-4 border-gray-700">
                {/* Top section with Uber branding */}
                <div className="text-center mb-4">
                  <div className="text-white text-sm mb-2">AqubeXP</div>
                  <div className="text-white text-lg font-bold">GET 10% OFF</div>
                  <div className="text-white text-sm">on buying AqubeXP rewards</div>
                </div>
                
                {/* Blue reward section */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl relative overflow-hidden">
                  {/* Confetti decorations */}
                  <div className="absolute inset-0">
                    <div className="absolute top-2 left-4 text-yellow-400 text-xs rotate-12">🎊</div>
                    <div className="absolute top-4 right-6 text-yellow-300 text-xs -rotate-12">🎉</div>
                    <div className="absolute bottom-4 left-6 text-yellow-400 text-xs rotate-45">✨</div>
                    <div className="absolute bottom-2 right-4 text-yellow-300 text-xs -rotate-45">🎊</div>
                  </div>
                  
                  {/* Slot machine reels */}
                  <div className="flex justify-center space-x-2 mb-4">
                    {reels.map((symbol, index) => (
                      <div
                        key={index}
                        className={`w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl transition-all duration-300 ${
                          spinning ? 'animate-spin' : ''
                        }`}
                      >
                        {index === 1 ? (
                          <div className="w-8 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"></div>
                        ) : (
                          symbol
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <div className="text-white text-lg font-bold mb-2">AqubeXP Rewards</div>
                    <div className="text-white text-xl font-bold">
                      {lastWin || 'Spin to Win!'}
                    </div>
                  </div>
                </div>
                
                {/* Bottom section */}
                <div className="text-center mt-4">
                  <div className="text-white text-sm">AqubeXP</div>
                  <div className="text-white text-sm">GET 10% OFF</div>
                </div>
              </div>
            </div>

            {/* Spin Button */}
            <Button
              onClick={spinReels}
              disabled={spinning || spins <= 0}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 disabled:opacity-50"
              size="lg"
            >
              {spinning ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Spinning...
                </div>
              ) : spins <= 0 ? (
                'No Spins Left'
              ) : (
                `${spins} spins to spin again`
              )}
            </Button>

            {/* Terms */}
            <div className="text-center">
              <div className="text-xs text-muted-foreground">Terms and conditions</div>
            </div>

            {/* Rewards Info */}
            <div className="text-xs text-muted-foreground space-y-1 bg-gaming-background p-3 rounded-lg">
              <div className="font-semibold text-gaming-primary">Possible Rewards:</div>
              <div className="grid grid-cols-2 gap-1">
                <div>🍀🍀🍀 = 100 Points</div>
                <div>⭐⭐⭐ = 500 Points</div>
                <div>🔥🔥🔥 = 1000 Points</div>
                <div>🎯🎯🎯 = Extra Spin</div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SlotMachineModal;