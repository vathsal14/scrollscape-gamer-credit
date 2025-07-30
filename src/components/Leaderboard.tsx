import { Trophy, Crown, Medal, Gift } from 'lucide-react';

const Leaderboard = () => {
  const topPlayers = [
    { rank: 1, name: "GameMaster2024", points: 15420, avatar: "🏆" },
    { rank: 2, name: "ProGamer_X", points: 14850, avatar: "🥈" },
    { rank: 3, name: "ElitePlayer", points: 13990, avatar: "🥉" },
    { rank: 4, name: "NinjaGamer", points: 12750, avatar: "🎮" },
    { rank: 5, name: "PixelWarrior", points: 11500, avatar: "⚡" },
    { rank: 6, name: "CyberChamp", points: 10800, avatar: "🚀" },
    { rank: 7, name: "QuestSeeker", points: 9950, avatar: "🎯" },
    { rank: 8, name: "LevelUpHero", points: 9200, avatar: "🌟" }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-gaming-accent" />;
      case 2:
        return <Trophy className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">{rank}</div>;
    }
  };

  return (
    <section className="py-20 bg-gaming-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-foreground mb-6">
            Hall of <span className="text-transparent bg-clip-text aqube-gradient glow-text">Fame</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Compete with gamers worldwide and climb the leaderboard. Show off your gaming prowess 
            and earn your place among the elite.
          </p>
        </div>

        {/* Surprise Giveaway Banner */}
        <div className="bg-gradient-to-r from-gaming-primary/20 to-gaming-secondary/20 border border-gaming-primary/30 rounded-3xl p-8 text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Gift className="w-8 h-8 text-gaming-accent mr-3" />
            <h3 className="text-3xl font-bold text-foreground">🎁 Surprise Giveaway!</h3>
          </div>
          <p className="text-lg text-muted-foreground">
            Top contenders will receive exclusive surprises after launch. Compete now for your chance to win!
          </p>
        </div>

        {/* Leaderboard Table */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gaming-surface-elevated border border-gaming-primary/20 rounded-3xl overflow-hidden">
            <div className="bg-gaming-surface p-6 border-b border-gaming-primary/20">
              <h3 className="text-2xl font-bold text-foreground flex items-center">
                <Trophy className="w-6 h-6 text-gaming-primary mr-3" />
                Top Gamers
              </h3>
            </div>
            
            <div className="divide-y divide-gaming-primary/10">
              {topPlayers.map((player) => (
                <div 
                  key={player.rank}
                  className={`p-6 flex items-center justify-between hover:bg-gaming-surface/50 transition-colors ${
                    player.rank <= 3 ? 'bg-gaming-primary/5' : ''
                  }`}
                >
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center justify-center w-12 h-12">
                      {getRankIcon(player.rank)}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{player.avatar}</div>
                      <div>
                        <div className={`font-bold ${
                          player.rank === 1 ? 'text-gaming-accent text-xl glow-text' : 
                          player.rank === 2 ? 'text-gray-400 text-lg' : 
                          player.rank === 3 ? 'text-amber-600 text-lg' : 
                          'text-foreground'
                        }`}>
                          {player.name}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          Rank #{player.rank}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`font-bold text-lg ${
                      player.rank === 1 ? 'text-gaming-accent glow-text' : 
                      player.rank === 2 ? 'text-gray-400' : 
                      player.rank === 3 ? 'text-amber-600' : 
                      'text-gaming-primary'
                    }`}>
                      {player.points.toLocaleString()}
                    </div>
                    <div className="text-muted-foreground text-sm">points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">Want to see your name here?</p>
          <a 
            href="/#join"
            className="inline-block bg-gaming-primary text-gaming-background px-8 py-4 rounded-full font-semibold hover:shadow-glow transition-all"
          >
            Start Competing
          </a>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;