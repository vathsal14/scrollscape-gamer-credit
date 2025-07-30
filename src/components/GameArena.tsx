import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dice1, Brain, Shuffle, Key } from 'lucide-react';
import { KeyGameModal } from './KeyGameModal';

const GameArena = () => {
  const [isKeyGameOpen, setIsKeyGameOpen] = useState(false);
  return (
    <section className="py-20 bg-gaming-surface">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-foreground mb-6">
            Gaming <span className="text-transparent bg-clip-text aqube-gradient glow-text">Arena</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Play games, earn points, and climb the leaderboard!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Slot Machine */}
          <div className="bg-gaming-surface-elevated border border-gaming-primary/20 rounded-3xl p-8 text-center hover:border-gaming-primary/40 transition-all hover:shadow-lg hover:shadow-gaming-primary/20">
            <div className="w-20 h-20 bg-gaming-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Dice1 className="w-10 h-10 text-gaming-primary" />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-2">🎰 Slot Machine</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Try your luck! Win points and prizes with lucky streaks.
            </p>
            <Button variant="outline" className="w-full group">
              <span className="group-hover:animate-pulse">Spin Now</span>
            </Button>
          </div>

          {/* Gaming Quiz */}
          <div className="bg-gaming-surface-elevated border border-gaming-secondary/20 rounded-3xl p-8 text-center hover:border-gaming-secondary/40 transition-all hover:shadow-lg hover:shadow-gaming-secondary/20">
            <div className="w-20 h-20 bg-gaming-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-10 h-10 text-gaming-secondary" />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-2">🧠 Gaming Quiz</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Test your gaming knowledge with timed questions.
            </p>
            <Button variant="outline" className="w-full group">
              <span className="group-hover:animate-pulse">Start Quiz</span>
            </Button>
          </div>

          {/* Word Scramble */}
          <div className="bg-gaming-surface-elevated border border-gaming-accent/20 rounded-3xl p-8 text-center hover:border-gaming-accent/40 transition-all hover:shadow-lg hover:shadow-gaming-accent/20">
            <div className="w-20 h-20 bg-gaming-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shuffle className="w-10 h-10 text-gaming-accent" />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-2">🔤 Word Scramble</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Unscramble letters to form gaming-related words.
            </p>
            <Button variant="outline" className="w-full group">
              <span className="group-hover:animate-pulse">Play Now</span>
            </Button>
          </div>

          {/* Key Game */}
          <div className="bg-gaming-surface-elevated border border-purple-500/20 rounded-3xl p-8 text-center hover:border-purple-500/40 transition-all hover:shadow-lg hover:shadow-purple-500/20">
            <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Key className="w-10 h-10 text-purple-500" />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-2">🔑 Key Game</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Test your reflexes in this exciting key-based challenge!
            </p>
            <Button 
              variant="outline" 
              className="w-full group bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30"
              onClick={() => setIsKeyGameOpen(true)}
            >
              <span className="group-hover:animate-pulse">Play Key Game</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Key Game Modal */}
      <KeyGameModal 
        isOpen={isKeyGameOpen} 
        onClose={() => setIsKeyGameOpen(false)} 
      />
    </section>
  );
};

export default GameArena;