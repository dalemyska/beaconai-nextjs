'use client';

import { Button } from "@/components/ui/button";

const AIProcessDocumentation = () => {
  return (
    <section id="process-documentation" className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-beacon-navy mb-4">AI Process Documentation & Integration</h2>
          <p className="text-xl text-beacon-teal mb-8">Document core processes while integrating AI</p>
          <p className="max-w-3xl mx-auto text-gray-700">
            Transform unclear operations into documented systems with strategic AI integration points that drive
            measurable business results. Our structured approach ensures you&apos;re building AI capabilities on a
            solid operational foundation.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold text-beacon-navy mb-4">What You&apos;ll Receive:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-beacon-gold mr-2">•</span>
                <span>Collaborative mapping of 8-12 core processes</span>
              </li>
              <li className="flex items-start">
                <span className="text-beacon-gold mr-2">•</span>
                <span>Identification of strategic AI integration points</span>
              </li>
              <li className="flex items-start">
                <span className="text-beacon-gold mr-2">•</span>
                <span>Prioritized AI opportunities by potential impact</span>
              </li>
              <li className="flex items-start">
                <span className="text-beacon-gold mr-2">•</span>
                <span>Implementation roadmap with resource requirements</span>
              </li>
              <li className="flex items-start">
                <span className="text-beacon-gold mr-2">•</span>
                <span>Process management framework for ongoing governance</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://app.usemotion.com/meet/dalemyska/consultation" target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button className="bg-beacon-gold hover:bg-beacon-gold/90 text-beacon-navy w-full sm:w-auto">
                Book a Consultation
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIProcessDocumentation;
