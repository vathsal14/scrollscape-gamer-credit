import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Trophy, Crown, Medal, Star, Gift } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  display_name: string | null;
  email: string | null;
  points: number;
  rank: number;
}

const ConnectedLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, display_name, email, points')
        .not('points', 'is', null)
        .order('points', { ascending: false })
        .limit(10);

      if (error) throw error;

      const leaderboardWithRanks = data?.map((profile, index) => ({
        ...profile,
        rank: index + 1,
        points: profile.points || 0
      })) || [];

      setLeaderboard(leaderboardWithRanks);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <Trophy className="w-5 h-5 text-gaming-primary" />;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white";
      case 2:
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white";
      case 3:
        return "bg-gradient-to-r from-amber-600 to-amber-700 text-white";
      default:
        return "bg-gaming-surface border border-gaming-primary/30 text-gaming-primary";
    }
  };

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-gaming-surface border-gaming-primary/30">
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-gaming-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-muted-foreground">Loading leaderboard...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gaming-surface border-gaming-primary/30">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold aqube-gradient bg-clip-text text-transparent">
            Hall of Fame
          </CardTitle>
          <p className="text-muted-foreground">
            Compete with gamers worldwide and climb the leaderboard. Show off your gaming prowess and earn your place among the elite.
          </p>
        </CardHeader>
      </Card>

      {/* Surprise Giveaway Banner */}
      <Card className="bg-gradient-to-r from-gaming-primary/20 to-gaming-secondary/20 border-gaming-primary/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-3 text-center">
            <Gift className="w-8 h-8 text-gaming-accent" />
            <div>
              <div className="text-xl font-bold text-gaming-primary mb-1">
                🎁 Surprise Giveaway!
              </div>
              <div className="text-sm text-muted-foreground">
                Top contenders will receive exclusive surprises after launch. Compete now for your chance to win!
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card className="bg-gaming-surface border-gaming-primary/30">
        <CardContent className="p-0">
          {leaderboard.length > 0 ? (
            <div className="space-y-2 p-6">
              {leaderboard.map((player) => (
                <div
                  key={player.id}
                  className={`
                    flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]
                    ${player.rank <= 3 
                      ? 'bg-gradient-to-r from-gaming-background to-gaming-surface border border-gaming-primary/30' 
                      : 'bg-gaming-background border border-gaming-primary/20'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center font-bold
                      ${getRankBadge(player.rank)}
                    `}>
                      {player.rank <= 3 ? getRankIcon(player.rank) : player.rank}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gaming-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-gaming-primary font-bold">
                          {(player.display_name || player.email || 'Anonymous')[0].toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">
                          {player.display_name || player.email?.split('@')[0] || 'Anonymous Gamer'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Rank #{player.rank}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-gaming-accent" />
                      <span className="font-bold text-gaming-primary">
                        {player.points.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gaming-primary mx-auto mb-4 opacity-50" />
              <div className="text-lg font-semibold text-muted-foreground mb-2">
                No players yet
              </div>
              <div className="text-sm text-muted-foreground">
                Be the first to join and claim the top spot!
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gaming-surface border-gaming-primary/30">
        <CardContent className="text-center py-8">
          <div className="space-y-4">
            <div className="text-xl font-bold text-gaming-primary">
              Ready to Compete?
            </div>
            <div className="text-muted-foreground max-w-md mx-auto">
              Play games, complete challenges, and earn points to climb the leaderboard!
            </div>
            <Button 
              onClick={() => document.getElementById('gaming-arena')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gaming-primary hover:bg-gaming-primary/90"
            >
              Start Competing
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConnectedLeaderboard;