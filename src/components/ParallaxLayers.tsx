import { useEffect, useRef } from 'react';

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  offset?: number;
}

export const ParallaxLayer = ({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = '',
  offset = 0
}: ParallaxLayerProps) => {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!layerRef.current) return;
      
      const scrolled = window.pageYOffset;
      let transform = '';
      
      switch (direction) {
        case 'up':
          transform = `translateY(${(scrolled - offset) * speed}px)`;
          break;
        case 'down':
          transform = `translateY(${-(scrolled - offset) * speed}px)`;
          break;
        case 'left':
          transform = `translateX(${(scrolled - offset) * speed}px)`;
          break;
        case 'right':
          transform = `translateX(${-(scrolled - offset) * speed}px)`;
          break;
      }
      
      layerRef.current.style.transform = transform;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize position
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction, offset]);

  return (
    <div ref={layerRef} className={className}>
      {children}
    </div>
  );
};

interface MouseParallaxProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export const MouseParallax = ({ children, strength = 0.1, className = '' }: MouseParallaxProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX - innerWidth / 2) * strength;
      const y = (clientY - innerHeight / 2) * strength;
      
      elementRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};