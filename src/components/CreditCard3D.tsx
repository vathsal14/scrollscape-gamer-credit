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
        "relative w-[360px] h-[225px] mx-auto cursor-pointer transition-all duration-700 transform-gpu",
        "sm:w-[400px] sm:h-[250px]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        ref={setCardRef}
        className={cn(
          "w-full h-full rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gaming-primary/10 to-gaming-secondary/10 transition-all duration-700 transform-gpu",
          "relative overflow-hidden backdrop-blur-sm shadow-hero border border-gaming-primary/30",
          isHovered && "shadow-xl"
        )}
        style={cardStyle}
      >
        {/* Card background gradient */}
        <div className={cn(
          "absolute inset-0 rounded-2xl sm:rounded-3xl transition-all duration-700",
          "bg-gradient-to-br from-gaming-background/80 to-gaming-background/60",
        )} />
        
        {/* Holographic overlay */}
        <div className={cn(
          "absolute inset-0 rounded-2xl sm:rounded-3xl transition-all duration-700",
          "bg-gradient-to-br from-gaming-primary/10 via-gaming-secondary/5 to-gaming-accent/10",
          isHovered && "opacity-80"
        )} />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gaming-primary/60 rounded-full animate-float"
              style={{
                left: `${15 + i * 15}%`,
                top: `${40 + (i % 3) * 15}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${3 + i * 0.8}s`,
                opacity: 0.6
              }}
            />
          ))}
        </div>
        
        {/* Card content */}
        <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between">
          {/* Card chip and logo */}
          <div className="flex justify-between items-start">
            <div className="relative">
              <div className="w-10 h-8 sm:w-12 sm:h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
                <div className="absolute top-1/2 left-1/2 w-3/4 h-3 bg-black/20 rounded-sm transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
            <div className="text-gaming-primary font-bold text-xl sm:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-gaming-primary to-gaming-accent">
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