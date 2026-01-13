'use client';

import Link from 'next/link';

export default function ContactPage() {
  const handleCallClick = () => {
    window.open('https://calendly.com/dalemyska/ai-strategy', '_blank');
  };

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
              <button
                onClick={handleCallClick}
                className="inline-block bg-beacon-gold text-beacon-navy px-8 py-4 text-lg font-bold rounded-md hover:bg-beacon-gold/90 transition-all duration-300"
              >
                Book 30-Minute Call
              </button>
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
