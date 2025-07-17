import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CreditCard3DProps {
  className?: string;
}

export const CreditCard3D = ({ className }: CreditCard3DProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardRef, setCardRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef) return;
      
      const rect = cardRef.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      setMousePosition({
        x: (e.clientX - centerX) / 10,
        y: (e.clientY - centerY) / 10
      });
    };

    if (isHovered) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered, cardRef]);

  const cardStyle = isHovered ? {
    transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg) scale3d(1.1, 1.1, 1.1)`,
  } : {};

  return (
    <div 
      className={cn(
        "relative w-96 h-60 mx-auto cursor-pointer transition-all duration-700 transform-gpu",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        ref={setCardRef}
        className={cn(
          "w-full h-full rounded-2xl bg-gradient-card border border-gaming-primary/30 transition-all duration-700 transform-gpu",
          "relative overflow-hidden backdrop-blur-sm shadow-hero",
          isHovered && "shadow-xl"
        )}
        style={cardStyle}
      >
        {/* Enhanced Glow effect */}
        <div className={cn(
          "absolute inset-0 rounded-2xl transition-all duration-700",
          isHovered ? "bg-gradient-glow opacity-80 animate-glow-pulse" : "bg-gradient-glow opacity-40"
        )} />
        
        {/* Holographic overlay */}
        <div className={cn(
          "absolute inset-0 rounded-2xl transition-all duration-700",
          "bg-gradient-to-br from-gaming-primary/20 via-transparent to-gaming-secondary/20",
          isHovered && "opacity-60"
        )} />
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gaming-primary rounded-full animate-float opacity-60"
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + i * 0.5}s`
              }}
            />
          ))}
        </div>
        
        {/* Card content */}
        <div className="relative z-10 p-8 h-full flex flex-col justify-between">
          {/* Card chip and logo */}
          <div className="flex justify-between items-start">
            <div className="w-12 h-8 bg-gaming-primary rounded-lg opacity-90 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gaming-accent/30 to-transparent" />
            </div>
            <div className="text-gaming-primary font-bold text-2xl aqube-gradient bg-clip-text text-transparent">
              AQUBE XP
            </div>
          </div>
          
          {/* Card number */}
          <div className="space-y-4">
            <div className="text-foreground font-mono text-xl tracking-widest drop-shadow-lg">
              •••• •••• •••• 1337
            </div>
            
            {/* Card details */}
            <div className="flex justify-between items-end">
              <div>
                <div className="text-muted-foreground text-xs uppercase tracking-wide">Cardholder</div>
                <div className="text-foreground font-semibold">GAMING LEGEND</div>
              </div>
              <div>
                <div className="text-muted-foreground text-xs uppercase tracking-wide">Valid Thru</div>
                <div className="text-foreground font-semibold">12/29</div>
              </div>
              <div className="w-12 h-8 bg-gradient-to-r from-gaming-primary to-gaming-secondary rounded opacity-80" />
            </div>
          </div>
        </div>
        
        {/* Enhanced animated background patterns */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gaming-secondary/20 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gaming-accent/20 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gaming-primary/15 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 10,0 L 10,10 L 0,10" stroke="currentColor" strokeWidth="0.5" fill="none"/>
                <circle cx="10" cy="10" r="1" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
        </div>
      </div>
    </div>
  );
};