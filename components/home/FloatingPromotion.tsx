'use client';

import { useState } from 'react';
import { X, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFloatingPromo } from '@/hooks/useFloatingPromo';
import { useRouter } from 'next/navigation';

const FloatingPromotion = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const router = useRouter();
  const { shouldShow, dismiss } = useFloatingPromo({
    delay: 7000,
    autoHideDelay: 30000,
    sessionKey: 'homeFloatingPromoShown'
  });

  const handleClick = () => {
    router.push('/ai-coaching-starter?utm_source=home_floating_promo&utm_medium=floating_window&utm_campaign=coaching_starter_promotion');
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    dismiss();
  };

  if (!shouldShow || isDismissed) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-in-right">
      {/* Mobile positioning */}
      <div className="sm:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 right-auto">
        <FloatingPromoContent onDismiss={handleDismiss} onClick={handleClick} />
      </div>

      {/* Desktop positioning */}
      <div className="hidden sm:block">
        <FloatingPromoContent onDismiss={handleDismiss} onClick={handleClick} />
      </div>
    </div>
  );
};

const FloatingPromoContent = ({ onDismiss, onClick }: { onDismiss: () => void; onClick: () => void }) => (
  <div className="bg-white rounded-lg shadow-lg border-2 border-beacon-gold/20 p-4 max-w-sm relative group hover:shadow-xl transition-all duration-300">
    {/* Close button */}
    <button
      onClick={onDismiss}
      className="absolute -top-2 -right-2 bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1 text-xs transition-colors"
      aria-label="Dismiss promotion"
    >
      <X size={12} />
    </button>

    {/* Content */}
    <div className="flex items-start space-x-3">
      <div className="bg-beacon-gold/10 p-2 rounded-full flex-shrink-0">
        <Brain className="h-5 w-5 text-beacon-gold" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <h3 className="font-semibold text-beacon-navy text-sm">
            New: AI Coaching Starter Pack
          </h3>
        </div>

        <p className="text-gray-600 text-xs mb-3">
          2 hours of personalized guidance - Get started today!
        </p>

        <Button
          onClick={onClick}
          size="sm"
          className="bg-beacon-gold hover:bg-beacon-gold/90 text-beacon-navy font-semibold text-xs h-8 w-full"
        >
          Learn More
        </Button>
      </div>
    </div>

    {/* Subtle glow effect */}
    <div className="absolute inset-0 bg-beacon-gold/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
  </div>
);

export default FloatingPromotion;
