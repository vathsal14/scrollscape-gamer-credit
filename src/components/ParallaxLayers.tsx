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
      const rect = layerRef.current.getBoundingClientRect();
      const elementTop = scrolled + rect.top;
      const windowHeight = window.innerHeight;
      
      // Only apply parallax when element is in viewport
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        let transform = '';
        const relativeScroll = scrolled - elementTop + windowHeight;
        
        switch (direction) {
          case 'up':
            transform = `translate3d(0, ${relativeScroll * speed}px, 0)`;
            break;
          case 'down':
            transform = `translate3d(0, ${-relativeScroll * speed}px, 0)`;
            break;
          case 'left':
            transform = `translate3d(${relativeScroll * speed}px, 0, 0)`;
            break;
          case 'right':
            transform = `translate3d(${-relativeScroll * speed}px, 0, 0)`;
            break;
        }
        
        layerRef.current.style.transform = transform;
        layerRef.current.style.willChange = 'transform';
      }
    };

    const throttledScroll = (() => {
      let ticking = false;
      return () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };
    })();

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initialize position
    return () => window.removeEventListener('scroll', throttledScroll);
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