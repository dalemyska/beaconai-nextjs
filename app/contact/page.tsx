import type { Metadata } from 'next';
import Link from 'next/link';
import { CalendlyButton } from '@/components/contact/CalendlyButton';

export const metadata: Metadata = {
  title: 'Contact BeaconAI | AI Strategy Consulting',
  description: 'Get in touch with BeaconAI for AI implementation and strategy consulting. Schedule a call or email us to discuss your AI transformation.',
  openGraph: {
    title: 'Contact BeaconAI | AI Strategy Consulting',
    description: 'Schedule a consultation to discuss your AI implementation needs.',
    url: 'https://beaconai.ai/contact',
    siteName: 'beaconAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact BeaconAI | AI Strategy Consulting',
    description: 'Schedule a consultation to discuss your AI implementation needs.',
  },
  alternates: {
    canonical: 'https://beaconai.ai/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-beacon-navy text-white py-20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">Let&apos;s Talk About Your AI Future</h1>
          <p className="text-xl text-beacon-gold mb-8">
            Ready to explore how AI can transform your business?
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">

            {/* Email Option */}
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <h2 className="text-3xl font-bold text-beacon-navy mb-6">Send Me an Email</h2>
              <p className="text-lg text-gray-700 mb-8">
                Prefer to start with a message? Tell me about your business and AI goals.
              </p>
              <a
                href="mailto:dale@beaconai.ai?subject=AI Implementation Discussion&body=Hi Dale,%0D%0A%0D%0AI'd like to discuss AI implementation for my business.%0D%0A%0D%0ABest regards,"
                className="inline-block bg-beacon-gold text-beacon-navy px-8 py-4 text-lg font-bold rounded-md hover:bg-beacon-gold/90 transition-all duration-300"
              >
                dale@beaconai.ai
              </a>
            </div>

            {/* Call Option */}
            <div className="text-center p-8 bg-beacon-navy text-white rounded-lg">
              <h2 className="text-3xl font-bold mb-6">Schedule a Call</h2>
              <p className="text-lg mb-8 opacity-90">
                Ready to dive deeper? Let&apos;s have a strategic conversation about your AI readiness.
              </p>
              <CalendlyButton />
            </div>

          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-beacon-navy mb-6">
              Before We Talk...
            </h3>
            <p className="text-lg text-gray-700 mb-8">
              Haven&apos;t taken the AI Readiness Assessment yet? It helps me understand your starting point
              and makes our conversation much more valuable.
            </p>
            <Link
              href="/readiness-assessment"
              className="inline-block bg-beacon-teal text-white px-8 py-4 text-lg font-semibold rounded-md hover:bg-beacon-teal/90 transition-all duration-300"
            >
              Take the Assessment First
            </Link>
          </div>

          {/* What to Expect */}
          <div className="mt-16 bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-beacon-navy mb-6 text-center">
              What to Expect When We Connect
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div>
                <h4 className="font-bold text-beacon-navy mb-3">During Our Consultation</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Review your current AI challenges and opportunities</li>
                  <li>• Discuss your assessment results (if completed)</li>
                  <li>• Identify quick wins and strategic initiatives</li>
                  <li>• Outline a potential implementation roadmap</li>
                  <li>• Determine if we&apos;re a good fit to work together</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-beacon-navy mb-3">No Pressure, Just Value</h4>
                <p className="text-gray-700 mb-4">
                  Every conversation is focused on providing value, whether we end up working together or not.
                  I only take on 5 clients at a time, so if we&apos;re not the right fit, I&apos;ll tell you honestly
                  and may even recommend other resources.
                </p>
              </div>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="mt-16 text-center border-t pt-12">
            <h3 className="text-2xl font-bold text-beacon-navy mb-4">
              Connect on LinkedIn
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Follow my thoughts on AI implementation and business transformation.
            </p>
            <a
              href="https://linkedin.com/in/dalemyska"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-md hover:bg-blue-700 transition-all duration-300"
            >
              Connect with Dale Myska
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
