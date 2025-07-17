import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CreditCard3DProps {
  className?: string;
}

export const CreditCard3D = ({ className }: CreditCard3DProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "relative w-96 h-60 mx-auto cursor-pointer transition-all duration-500 transform-gpu perspective-1000",
        isHovered && "scale-110",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={cn(
          "w-full h-full rounded-2xl bg-gradient-card border border-gaming-primary/30 shadow-card-custom transition-all duration-500 transform-gpu",
          "relative overflow-hidden backdrop-blur-sm",
          isHovered && "shadow-hero rotate-y-12"
        )}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-glow opacity-50 animate-glow-pulse" />
        
        {/* Card content */}
        <div className="relative z-10 p-8 h-full flex flex-col justify-between">
          {/* Card chip and logo */}
          <div className="flex justify-between items-start">
            <div className="w-12 h-8 bg-gaming-primary rounded opacity-80" />
            <div className="text-gaming-primary font-bold text-2xl aqube-gradient bg-clip-text text-transparent">AQUBE</div>
          </div>
          
          {/* Card number */}
          <div className="space-y-4">
            <div className="text-foreground font-mono text-xl tracking-widest">
              **** **** **** 1337
            </div>
            
            {/* Card details */}
            <div className="flex justify-between items-end">
              <div>
                <div className="text-muted-foreground text-xs uppercase tracking-wide">Cardholder</div>
                <div className="text-foreground font-semibold">GAMING LEGEND</div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs uppercase tracking-wide">Expires</div>
                <div className="text-foreground font-semibold">12/29</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated background pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gaming-secondary/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gaming-accent/10 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};