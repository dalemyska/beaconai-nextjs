const ImplementationProcess = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-2xl md:text-4xl font-bold text-beacon-navy mb-12 text-center">Our Implementation Process</h2>

        {/* Timeline for desktop */}
        <div className="hidden md:block max-w-5xl mx-auto mb-12">
          <div className="relative">
            {/* Horizontal line */}
            <div className="absolute h-1 bg-beacon-navy top-12 left-0 right-0 z-0"></div>

            {/* Timeline steps */}
            <div className="flex justify-between relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center w-1/5">
                <div className="bg-beacon-navy h-10 w-10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <span className="font-semibold text-beacon-navy text-center">Discovery</span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center w-1/5">
                <div className="bg-beacon-navy h-10 w-10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <span className="font-semibold text-beacon-navy text-center">Strategy Development</span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center w-1/5">
                <div className="bg-beacon-navy h-10 w-10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <span className="font-semibold text-beacon-navy text-center">Implementation Planning</span>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center w-1/5">
                <div className="bg-beacon-navy h-10 w-10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-white font-bold">4</span>
                </div>
                <span className="font-semibold text-beacon-navy text-center">Guided Execution</span>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col items-center w-1/5">
                <div className="bg-beacon-navy h-10 w-10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-white font-bold">5</span>
                </div>
                <span className="font-semibold text-beacon-navy text-center">Measurement & Optimization</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline steps content */}
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Discovery */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center mb-6">
              <div className="md:hidden bg-beacon-navy h-10 w-10 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-beacon-navy">1. Discovery</h3>
            </div>
            <p className="text-lg md:text-xl text-gray-800 mb-5 md:ml-0">
              We begin by understanding your business objectives, current capabilities, and organizational culture. This includes:
            </p>
            <ul className="space-y-3 text-lg text-gray-800 md:ml-0">
              <li className="flex items-start">
                <span className="text-beacon-gold text-xl mr-3 mt-1">•</span>
                <span>Executive interviews and vision alignment</span>
              </li>
              <li className="flex items-start">
                <span className="text-beacon-gold text-xl mr-3 mt-1">•</span>
                <span>&quot;Secret Cyborg&quot; assessment to identify existing AI use</span>
              </li>
              <li className="flex items-start">
                <span className="text-beacon-gold text-xl mr-3 mt-1">•</span>
                <span>AI readiness evaluation across business functions</span>
              </li>
              <li className="flex items-start">
                <span className="text-beacon-gold text-xl mr-3 mt-1">•</span>
                <span>Opportunity mapping for quick wins and long-term impact</span>
              </li>
            </ul>
          </div>

          {/* Step 2: Strategy Development */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center mb-6">
              <div className="md:hidden bg-beacon-navy h-10 w-10 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-beacon-navy">2. Strategy Development</h3>
            </div>
            <p className="text-lg md:text-xl text-gray-800 mb-5 md:ml-0">
              Based on discovery insights, we create a tailored strategy that includes:
            </p>
            <ul className="space-y-3 text-lg text-gray-800 md:ml-0">
              <li className="flex items-start">
                <span className="text-beacon-gold text-xl mr-3 mt-1">•</span>
                <span>AI vision and roadmap aligned to business goals</span>
              </li>
              <li className="flex items-start">
                <span className="text-beacon-gold text-xl mr-3 mt-1">•</span>
                <span>Prioritized initiative portfolio with clear success metrics</span>
              </li>
              <li className="flex items-start">
                <span className="text-beacon-gold text-xl mr-3 mt-1">•</span>
                <span>Resource requirements and capability development plans</span>
              </li>
              <li className="flex items-start">
                <span className="text-beacon-gold text-xl mr-3 mt-1">•</span>
                <span>Change management and communication frameworks</span>
              </li>
            </ul>
          </div>

          {/* Step 3: Implementation Planning */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center mb-6">
              <div className="md:hidden bg-beacon-navy h-10 w-10 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-beacon-navy">3. Implementation Planning</h3>
            </div>
            <p className="text-lg md:text-xl text-gray-800 mb-5 md:ml-0">
              We develop detailed implementation plans for prioritized initiatives:
            </p>
            <ul className="space-y-3 text-lg text-gray-800 md:ml-0">
              <li className="flex items-start">
                <span className="text-beacon-gold text-xl mr-3 mt-1">•</span>
                <span>Technology selection and integration approach</span>
              </li>
              <li className="flex items-start">
                <span className="text-beacon-gold text-xl mr-3 mt-1">•</span>
                <span>Process redesign and workflow adjustments</span>
              </li>
              <li className="flex items-start">
                <span className="text-beacon-gold text-xl mr-3 mt-1">•</span>
                <span>Team structure and responsibility alignment</span>
              </li>
              <li className="flex items-start">
                <span className="text-beacon-gold text-xl mr-3 mt-1">•</span>
                <span>Training and development schedules</span>
              </li>
            </ul>
          </div>

          {/* Step 4: Guided Execution */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center mb-6">
              <div className="md:hidden bg-beacon-navy h-10 w-10 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-beacon-navy">4. Guided Execution</h3>
            </div>
            <p className="text-lg md:text-xl text-gray-800 mb-5 md:ml-0">
              We work alongside your team through implementation:
            </p>
            <ul className="space-y-3 text-lg text-gray-800 md:ml-0">
              <li className="flex items-start">
                <span className="text-beacon-gold text-xl mr-3 mt-1">•</span>
                <span>Hands-on guidance through technology deployment</span>
              </li>
              <li className="flex items-start">
                <span className="text-beacon-gold text-xl mr-3 mt-1">•</span>
                <span>Change management and adoption support</span>
              </li>
              <li className="flex items-start">
                <span className="text-beacon-gold text-xl mr-3 mt-1">•</span>
                <span>Knowledge transfer to internal teams</span>
              </li>
              <li className="flex items-start">
                <span className="text-beacon-gold text-xl mr-3 mt-1">•</span>
                <span>Regular progress assessment and course correction</span>
              </li>
            </ul>
          </div>

          {/* Step 5: Measurement & Optimization */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center mb-6">
              <div className="md:hidden bg-beacon-navy h-10 w-10 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-xl">5</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-beacon-navy">5. Measurement & Optimization</h3>
            </div>
            <p className="text-lg md:text-xl text-gray-800 mb-5 md:ml-0">
              We help you measure success and continuously improve:
            </p>
            <ul className="space-y-3 text-lg text-gray-800 md:ml-0">
              <li className="flex items-start">
                <span className="text-beacon-gold text-xl mr-3 mt-1">•</span>
                <span>KPI tracking and ROI validation</span>
              </li>
              <li className="flex items-start">
                <span className="text-beacon-gold text-xl mr-3 mt-1">•</span>
                <span>User feedback collection and analysis</span>
              </li>
              <li className="flex items-start">
                <span className="text-beacon-gold text-xl mr-3 mt-1">•</span>
                <span>Process optimization and refinement</span>
              </li>
              <li className="flex items-start">
                <span className="text-beacon-gold text-xl mr-3 mt-1">•</span>
                <span>Planning for next-phase initiatives</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImplementationProcess;
