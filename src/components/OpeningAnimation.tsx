import { useEffect, useState } from 'react';
import { Gamepad2, Zap, Crown } from 'lucide-react';

const OpeningAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 500);
    const timer2 = setTimeout(() => setStage(2), 1500);
    const timer3 = setTimeout(() => setStage(3), 2500);
    const timer4 = setTimeout(() => setIsVisible(false), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-gaming-background flex items-center justify-center">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gaming-primary rounded-full opacity-30 animate-glow-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative text-center">
        {/* Stage 0: Initial icons */}
        <div className={`transition-all duration-700 ${stage >= 1 ? 'scale-110 opacity-100' : 'scale-50 opacity-0'}`}>
          <div className="flex items-center justify-center space-x-8 mb-8">
            <Gamepad2 className="w-16 h-16 text-gaming-primary animate-glow-pulse" />
            <Zap className="w-20 h-20 text-gaming-secondary animate-glow-pulse" />
            <Crown className="w-16 h-16 text-gaming-accent animate-glow-pulse" />
          </div>
        </div>

        {/* Stage 1: Brand name */}
        <div className={`transition-all duration-1000 ${stage >= 2 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
          <h1 className="text-7xl md:text-9xl font-bold aqube-gradient bg-clip-text text-transparent glow-text mb-4">
            AqubeXP
          </h1>
        </div>

        {/* Stage 2: Tagline */}
        <div className={`transition-all duration-1000 delay-300 ${stage >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
          <p className="text-2xl md:text-3xl text-gaming-primary font-semibold glow-text">
            Level Up Your Gaming Experience
          </p>
        </div>

        {/* Loading indicator */}
        <div className={`mt-12 transition-all duration-700 ${stage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-64 h-2 bg-gaming-surface rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-gaming-primary via-gaming-secondary to-gaming-accent transition-all duration-1000 ease-out"
              style={{ width: `${(stage + 1) * 25}%` }}
            />
          </div>
          <p className="text-muted-foreground mt-4">Loading gaming experience...</p>
        </div>
      </div>

      {/* Glow effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20 animate-glow-pulse" />
    </div>
  );
};

export default OpeningAnimation;