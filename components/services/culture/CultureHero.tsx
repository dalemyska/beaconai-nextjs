import { Users } from "lucide-react";

const CultureHero = () => {
  return (
    <>
      <h2 className="text-3xl md:text-4xl font-bold text-beacon-navy text-center mb-2">
        AI Culture Accelerator
      </h2>

      {/* Visual banner */}
      <div className="relative h-28 max-w-3xl mx-auto mb-8 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-beacon-navy/20 to-beacon-teal/20 rounded-lg"></div>
        <div className="relative z-10 flex items-center justify-center">
          <div className="flex space-x-4">
            <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
              <Users className="h-8 w-8 text-beacon-navy" />
            </div>
            <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center opacity-80">
              <svg className="h-8 w-8 text-beacon-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center opacity-60">
              <svg className="h-8 w-8 text-beacon-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-xl md:text-2xl font-semibold text-center text-beacon-navy mb-8">
        Transform Your Organization&apos;s AI Capabilities
      </h3>

      <div className="max-w-4xl mx-auto text-lg text-gray-700 mb-12">
        <p>
          The AI Culture Accelerator builds on the Readiness Assessment to deliver comprehensive training, process improvement, and strategic planning. This program creates the human and organizational foundation for successful AI implementation.
        </p>
      </div>
    </>
  );
};

export default CultureHero;
