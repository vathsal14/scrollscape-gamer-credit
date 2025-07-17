import { useEffect, useRef } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxSection = ({ children, speed = 0.5, className = '' }: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrolled = window.pageYOffset;
      const parallax = scrolled * speed;
      
      sectionRef.current.style.transform = `translateY(${parallax}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
};