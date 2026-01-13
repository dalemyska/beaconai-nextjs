'use client';

import { useState, useCallback, memo, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prevState => !prevState);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/readiness-assessment', label: 'AI Assessment' }
  ];

  return (
    <header className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'shadow-md py-3' : 'shadow-sm py-4'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src="/lovable-uploads/d3757dcc-3a2b-46f7-94ce-de50e39f9312.png"
              alt="BeaconAI Logo"
              className="h-12"
              width="auto"
              height="48"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`font-montserrat hover:text-beacon-teal relative group transition-colors ${
                  pathname === item.path ? 'text-beacon-teal' : 'text-beacon-navy'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 transform origin-left transition-transform duration-300 ${
                  pathname === item.path
                    ? 'bg-beacon-teal scale-x-100'
                    : 'bg-beacon-teal scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </Link>
            ))}
            <Button
              asChild
              className="bg-gradient-to-r from-beacon-navy to-beacon-teal hover:from-beacon-navy/90 hover:to-beacon-teal/90 text-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 ml-4"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </nav>

          <button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-beacon-navy" />
            ) : (
              <Menu className="h-6 w-6 text-beacon-navy" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-md animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`font-montserrat transition-colors ${
                  pathname === item.path ? 'text-beacon-teal' : 'text-beacon-navy'
                }`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
            <Button
              asChild
              className="bg-gradient-to-r from-beacon-navy to-beacon-teal hover:from-beacon-navy/90 hover:to-beacon-teal/90 text-white w-full shadow-md"
              onClick={closeMenu}
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
});

Header.displayName = "Header";

export default Header;
