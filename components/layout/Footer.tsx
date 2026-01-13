'use client';

import { memo } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Mail, PhoneCall } from 'lucide-react';

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-beacon-navy text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/">
              <img
                src="/lovable-uploads/d3757dcc-3a2b-46f7-94ce-de50e39f9312.png"
                alt="BeaconAI Logo"
                className="h-16 mb-4"
                loading="lazy"
                width="128"
                height="64"
              />
            </Link>
            <p className="text-sm text-gray-300 mt-4">
              Practical Solutions. Measurable Results. For businesses of all sizes.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-beacon-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-beacon-gold transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-300 hover:text-beacon-gold transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-montserrat text-lg font-semibold mb-4 text-beacon-gold">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-beacon-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-beacon-gold transition-colors">About</Link>
              </li>
              <li>
                <Link href="/readiness-assessment" className="text-gray-300 hover:text-beacon-gold transition-colors">AI Assessment</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-beacon-gold transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-montserrat text-lg font-semibold mb-4 text-beacon-gold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-beacon-gold transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-beacon-gold transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-300 hover:text-beacon-gold transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-montserrat text-lg font-semibold mb-4 text-beacon-gold">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-beacon-gold" aria-hidden="true" />
                <a href="mailto:info@beaconai.ai" className="text-gray-300 hover:text-beacon-gold transition-colors">
                  info@beaconai.ai
                </a>
              </li>
              <li className="flex items-center">
                <PhoneCall size={16} className="mr-2 text-beacon-gold" aria-hidden="true" />
                <a href="tel:+17202491174" className="text-gray-300 hover:text-beacon-gold transition-colors">
                  (720) 249-1174
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} BeaconAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
