'use client';

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  };

  return (
    <>
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          onKeyDown={handleKeyDown}
          className="fixed bottom-8 right-8 bg-beacon-navy text-white p-3 rounded-full shadow-lg hover:bg-beacon-navy/80 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-beacon-teal"
          aria-label="Scroll to top"
          tabIndex={0}
          role="button"
        >
          <ArrowUp size={24} aria-hidden="true" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
