import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Trophy, Crown, Medal, User as UserIcon, Gift } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface LeaderboardEntry {
  id: string;
  display_name: string | null;
  email: string | null;
  points: number;
  rank: number;
}

interface ConnectedLeaderboardProps {
  user: User | null;
}

const ConnectedLeaderboard = ({ user }: ConnectedLeaderboardProps) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<LeaderboardEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [user?.id]);

  const fetchLeaderboard = async (): Promise<void> => {
    try {
      setLoading(true);
      
      // Fetch top 3 players
      const { data: topPlayers, error: topError } = await supabase
        .from('profiles')
        .select('id, display_name, email, points')
        .not('points', 'is', null)
        .order('points', { ascending: false })
        .limit(3);

      if (topError) throw topError;

      // Set leaderboard with ranks
      const leaderboardWithRanks = (topPlayers || []).map((profile, index) => ({
        ...profile,
        rank: index + 1,
        points: profile.points || 0
      }));

      setLeaderboard(leaderboardWithRanks);

      // If user is signed in, find their rank
      if (user?.id) {
        const { data: allUsers, error: usersError } = await supabase
          .from('profiles')
          .select('id, display_name, email, points')
          .order('points', { ascending: false });

        if (usersError) throw usersError;

        const userIndex = allUsers?.findIndex(u => u.id === user.id) ?? -1;
        
        if (userIndex !== -1) {
          const userRank = userIndex + 1;
          const userData = allUsers?.[userIndex];
          
          // Only show if not in top 3
          if (userRank > 3 && userData) {
            setCurrentUserRank({
              ...userData,
              rank: userRank,
              points: userData.points || 0
            });
          } else {
            setCurrentUserRank(null);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number): JSX.Element => {
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

  const getRankBadge = (rank: number): string => {
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
            Top 3 players are displayed below. Sign in to see your position!
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
          <div className="divide-y divide-gaming-primary/10">
            {leaderboard.length > 0 ? (
              leaderboard.map((entry) => (
                <div 
                  key={entry.id}
                  className={`p-4 flex items-center justify-between ${
                    entry.rank <= 3 ? 'bg-gaming-primary/5' : ''
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      entry.rank === 1 ? 'bg-yellow-500' : 
                      entry.rank === 2 ? 'bg-gray-400' : 
                      'bg-amber-600'
                    }`}>
                      {entry.rank}
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gaming-primary/10 flex items-center justify-center">
                        {getRankIcon(entry.rank)}
                      </div>
                      <div>
                        <div className="font-medium">
                          {entry.display_name || entry.email?.split('@')[0] || 'Anonymous'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {entry.rank === 1 ? 'Champion' : entry.rank === 2 ? '1st Runner Up' : '2nd Runner Up'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-gaming-primary">
                      {entry.points.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      points
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <Trophy className="w-16 h-16 text-gaming-primary mx-auto mb-4 opacity-50" />
                <div className="text-lg font-semibold text-muted-foreground mb-2">
                  No players yet
                </div>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Be the first to play and claim the top spot on the leaderboard!
                </p>
              </div>
          )}
          </div>
        </CardContent>
      </Card>

      {/* Current User's Position */}
      {user && currentUserRank && (
        <Card className="bg-gaming-surface border-gaming-primary/30">
          <CardContent className="p-0">
            <div className="p-4 flex items-center justify-between bg-gaming-primary/5">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gaming-primary text-white font-bold">
                  {currentUserRank.rank}
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gaming-primary/10 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-gaming-primary" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {currentUserRank.display_name || currentUserRank.email?.split('@')[0] || 'You'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Your position
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg text-gaming-primary">
                  {currentUserRank.points.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  points
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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