import { useEffect, useRef } from 'react';

interface FloatingElementProps {
  children: React.ReactNode;
  speed?: number;
  amplitude?: number;
  delay?: number;
  className?: string;
}

export const FloatingElement = ({ 
  children, 
  speed = 3, 
  amplitude = 10, 
  delay = 0,
  className = '' 
}: FloatingElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;
    
    const element = elementRef.current;
    element.style.animation = `float ${speed}s ease-in-out infinite`;
    element.style.animationDelay = `${delay}s`;
    element.style.setProperty('--float-amplitude', `${amplitude}px`);
  }, [speed, amplitude, delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};