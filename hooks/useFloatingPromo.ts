'use client';

import { useEffect, useState } from 'react';

interface UseFloatingPromoOptions {
  delay?: number;
  autoHideDelay?: number;
  sessionKey?: string;
}

export const useFloatingPromo = (options: UseFloatingPromoOptions = {}) => {
  const {
    delay = 7000,
    autoHideDelay = 30000,
    sessionKey = 'floatingPromoShown'
  } = options;

  const [shouldShow, setShouldShow] = useState(false);
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    if (sessionStorage.getItem(sessionKey)) {
      return;
    }

    // Track scroll to detect if user scrolled past hero
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setHasScrolledPastHero(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Show after delay if user hasn't scrolled past hero
    const showTimer = setTimeout(() => {
      if (!hasScrolledPastHero) {
        setShouldShow(true);

        // Auto-hide after specified delay
        setTimeout(() => {
          setShouldShow(false);
        }, autoHideDelay);
      }
    }, delay);

    return () => {
      clearTimeout(showTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [delay, autoHideDelay, sessionKey, hasScrolledPastHero]);

  const dismiss = () => {
    setShouldShow(false);
    sessionStorage.setItem(sessionKey, 'true');
  };

  return {
    shouldShow,
    dismiss
  };
};
