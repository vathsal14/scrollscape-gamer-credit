import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard = ({ icon: Icon, title, description, className }: FeatureCardProps) => {
  return (
    <div className={cn(
      "group p-6 rounded-2xl bg-gradient-card border border-gaming-primary/20 hover:border-gaming-primary/50",
      "transition-all duration-300 hover:scale-105 hover:shadow-glow",
      "backdrop-blur-sm",
      className
    )}>
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-4 rounded-2xl bg-gaming-primary/10 group-hover:bg-gaming-primary/20 transition-colors duration-300">
          <Icon className="w-8 h-8 text-gaming-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
};