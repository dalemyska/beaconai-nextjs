'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);

  const handleAnimation = useCallback(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setShowHighlight(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(handleAnimation, [handleAnimation]);

  return (
    <section
      className="hero-section relative py-20 md:py-32 overflow-hidden min-h-[500px] md:min-h-[600px] text-white"
      aria-label="Hero section introducing BeaconAI services"
    >
      {/* Optimized background elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-beacon-gold/10 rounded-full blur-md animate-float-slow"></div>
        <div className="absolute top-2/3 right-10 w-16 h-16 bg-beacon-teal/10 rounded-full blur-md animate-float-medium"></div>
        <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-beacon-gold/5 rounded-full blur-md animate-float-fast"></div>
        <div className="absolute inset-0 bg-dot-pattern opacity-5"></div>
      </div>

      <div className="container-custom relative z-10 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between min-h-[400px] md:min-h-[500px]">
          {/* Content side */}
          <div className="w-full md:w-1/2 px-2 md:px-0 mb-8 md:mb-0">
            <h1 className="hero-headline font-montserrat text-3xl md:text-5xl font-bold mb-6">
              <span className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                You&apos;re Already Using AI.
              </span>
              <br />
              <span className={`transition-all duration-1000 delay-300 ${showHighlight ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
                You&apos;re Just Not Using It Right.
              </span>
            </h1>

            <p className={`font-sourceSansPro text-lg md:text-xl mb-6 text-white/90 max-w-2xl transition-all duration-700 delay-500
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              I help executives who&apos;ve started with ChatGPT turn random experiments into strategic transformation. No theory. No hype. Just practical implementation that delivers measurable ROI.
            </p>

            {/* Trust Bar */}
            <div className={`font-sourceSansPro text-sm text-white/80 mb-8 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 transition-all duration-700 delay-700
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span>MIT AI Executive</span>
              <span className="hidden md:inline text-beacon-gold">|</span>
              <span>Implemented AI at 500+ Locations</span>
              <span className="hidden md:inline text-beacon-gold">|</span>
              <span>20+ Years Operations Leadership</span>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-900
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Button
                asChild
                size="lg"
                className="bg-beacon-gold hover:bg-beacon-gold/90 text-beacon-navy font-montserrat font-semibold px-8 py-4 text-base"
              >
                <Link href="/book-consultation">
                  Get Your AI Strategy Session
                </Link>
              </Button>
              <Link
                href="/approach"
                className="text-white hover:text-beacon-gold transition-colors font-sourceSansPro underline text-base self-center"
              >
                See How I Work →
              </Link>
            </div>
          </div>

          {/* Image side */}
          <div className={`w-full md:w-1/2 flex justify-center md:justify-end transition-all duration-1000
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative max-w-[500px]">
              <Image
                src="/lovable-uploads/24cda179-ab01-44cf-97c3-e9f29ddc3fa3.png"
                alt="Lighthouse guiding ships through digital transformation representing BeaconAI's guidance"
                className="lighthouse-image rounded-lg shadow-xl w-full object-cover transform hover:scale-[1.01] transition-transform duration-500"
                width={550}
                height={413}
                priority
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-beacon-navy/10 to-transparent opacity-60" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave SVG at bottom */}
      <div className="absolute bottom-0 left-0 w-full" aria-hidden="true">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[50px] text-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.45,12.34,100.91,24,151.36,35.56S251.81,57.76,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
