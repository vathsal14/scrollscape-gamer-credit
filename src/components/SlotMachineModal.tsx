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
  onPointsUpdate?: () => void;
}

const SlotMachineModal = ({ user, isOpen, onClose, onPointsUpdate }: SlotMachineModalProps) => {
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
      
      // Notify parent component to refresh points display
      if (onPointsUpdate) {
        onPointsUpdate();
      }
    }, spinDuration);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-gradient-to-b from-black via-gray-900 to-black border-2 border-gaming-primary/50 overflow-hidden">
        <DialogHeader className="relative">
          <button 
            onClick={onClose}
            className="absolute -top-2 -right-2 w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          
          {/* Progress bar */}
          <div className="flex items-center justify-center gap-1 mb-4">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <div className="w-12 h-1 bg-yellow-400"></div>
            <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center">
              <span className="text-gray-700 text-xs">○</span>
            </div>
            <div className="w-12 h-1 bg-gray-400"></div>
            <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center">
              <span className="text-gray-700 text-xs">○</span>
            </div>
            <div className="w-12 h-1 bg-gray-400"></div>
            <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center">
              <span className="text-gray-700 text-xs">○</span>
            </div>
            <div className="w-12 h-1 bg-gray-400"></div>
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
              <Gift className="w-3 h-3 text-white" />
            </div>
          </div>
          
          <DialogTitle className="text-gaming-primary flex items-center justify-center gap-2 text-lg">
            <Play className="w-5 h-5" />
            Spin & Win
          </DialogTitle>
        </DialogHeader>
        
        {!user ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-6">
              Sign in to start spinning and winning rewards!
            </div>
            <div className="flex justify-center space-x-3">
              {['🎰', '🎰', '🎰'].map((symbol, index) => (
                <div key={index} className="w-16 h-16 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg border-2 border-gaming-primary/30 flex items-center justify-center text-3xl">
                  {symbol}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Stats */}
            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
                <span className="text-white">{spins} spins</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                  <Coins className="w-3 h-3 text-white" />
                </div>
                <span className="text-white">{points} points</span>
              </div>
            </div>

            {/* Main Slot Machine */}
            <div className="relative mx-auto max-w-sm">
              {/* Slot Machine Frame */}
              <div className={`bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 p-1 rounded-3xl shadow-2xl border-4 border-yellow-400 ${spinning ? 'machine-glow' : ''}`}>
                <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-2xl">
                  
                  {/* Top Display */}
                  <div className="text-center mb-4">
                    <div className="text-yellow-400 text-sm font-bold tracking-wider">AQUBEXP</div>
                    <div className="text-white text-xs">GAMING REWARDS</div>
                  </div>
                  
                  {/* Slot Display */}
                  <div className="bg-gradient-to-b from-blue-600 to-blue-800 p-6 rounded-xl relative overflow-hidden shadow-inner">
                    {/* Background effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50"></div>
                    <div className="absolute inset-0">
                      <div className="absolute top-2 left-4 text-yellow-300 text-sm animate-pulse">✨</div>
                      <div className="absolute top-4 right-6 text-yellow-300 text-sm animate-bounce">💫</div>
                      <div className="absolute bottom-4 left-6 text-yellow-300 text-sm animate-pulse">⭐</div>
                      <div className="absolute bottom-2 right-4 text-yellow-300 text-sm animate-bounce">✨</div>
                    </div>
                    
                    {/* Reels Container */}
                    <div className="relative z-10">
                      <div className={`flex justify-center space-x-3 mb-4 transition-all duration-500 ${spinning ? 'animate-bounce' : ''}`}>
                        {reels.map((symbol, index) => (
                          <div
                            key={index}
                            className={`w-16 h-16 bg-white rounded-full border-4 border-gray-300 shadow-lg flex items-center justify-center text-2xl transition-all duration-300 ${
                              spinning ? 'animate-pulse scale-110' : 'hover:scale-105'
                            }`}
                          >
                            <div className={`${spinning ? 'animate-spin' : ''} transition-all duration-300`}>
                              {symbol}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="text-center">
                        <div className="text-white text-lg font-bold mb-1">AqubeXP Rewards</div>
                        <div className="text-yellow-300 text-lg font-bold">
                          {spinning ? 'SPINNING...' : lastWin || 'Spin to Win!'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Prize Display */}
                  <div className="mt-4 text-center">
                    <div className="text-yellow-400 text-xs font-bold">GET 10% OFF</div>
                    <div className="text-white text-xs">on AqubeXP purchases</div>
                  </div>
                </div>
              </div>
              
              {/* Machine Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/20 to-transparent rounded-3xl pointer-events-none animate-pulse"></div>
            </div>

            {/* Spin Button */}
            <div className="text-center">
              <Button
                onClick={spinReels}
                disabled={spinning || spins <= 0}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-4 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-105 active:scale-95"
                size="lg"
              >
                {spinning ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-3 border-black border-t-transparent rounded-full animate-spin" />
                    <span className="text-lg">SPINNING...</span>
                  </div>
                ) : spins <= 0 ? (
                  <span className="text-lg">NO SPINS LEFT</span>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Play className="w-5 h-5" />
                    <span className="text-lg">SPIN NOW ({spins} left)</span>
                  </div>
                )}
              </Button>
            </div>

            {/* Terms */}
            <div className="text-center">
              <div className="text-xs text-gray-400 hover:text-gray-300 cursor-pointer">Terms and conditions</div>
            </div>

            {/* Rewards Info */}
            <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gaming-primary/30">
              <div className="text-sm font-semibold text-gaming-primary mb-2 text-center">Possible Rewards</div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                <div className="flex items-center gap-1">
                  <span>🍀🍀🍀</span>
                  <span>100 Points</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>⭐⭐⭐</span>
                  <span>500 Points</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>🔥🔥🔥</span>
                  <span>1000 Points</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>🎯🎯🎯</span>
                  <span>Extra Spin</span>
                </div>
              </div>
              <div className="text-center mt-3 text-xs text-gaming-accent">
                Refer friends to get more spins!
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SlotMachineModal;