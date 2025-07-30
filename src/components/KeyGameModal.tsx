import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface KeyGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyGameModal = ({ isOpen, onClose }: KeyGameModalProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full h-full max-w-5xl max-h-[90vh] bg-gaming-surface rounded-2xl overflow-hidden border border-gaming-primary/30 m-4">
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-gaming-surface/80 hover:bg-gaming-surface/60"
          aria-label="Close game"
        >
          <X className="w-5 h-5" />
        </Button>
        
        <iframe
          ref={iframeRef}
          src="/games/keygame/key.html"
          className="w-full h-full border-0"
          title="Key Game"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};
