const CultureProcess = () => {
  return (
    <>
      <h3 className="text-2xl font-bold text-beacon-navy text-center mb-8">
        Our Acceleration Process
      </h3>

      <div className="max-w-4xl mx-auto mb-16">
        <div className="relative">
          {/* Timeline bar */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-beacon-navy/20 z-0"></div>

          {/* Timeline steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 rounded-full bg-beacon-navy/10 flex items-center justify-center mx-auto mb-4 md:bg-white">
                <span className="text-xl font-bold text-beacon-navy">1</span>
              </div>
              <h4 className="text-lg font-semibold text-beacon-navy mb-2">Deep Discovery</h4>
              <p className="text-gray-600">We conduct a thorough assessment of your current AI capabilities and needs</p>
            </div>

            <div className="relative z-10 text-center">
              <div className="w-16 h-16 rounded-full bg-beacon-navy/10 flex items-center justify-center mx-auto mb-4 md:bg-white">
                <span className="text-xl font-bold text-beacon-navy">2</span>
              </div>
              <h4 className="text-lg font-semibold text-beacon-navy mb-2">Leadership Alignment</h4>
              <p className="text-gray-600">We develop executive understanding and strategic vision for AI</p>
            </div>

            <div className="relative z-10 text-center">
              <div className="w-16 h-16 rounded-full bg-beacon-navy/10 flex items-center justify-center mx-auto mb-4 md:bg-white">
                <span className="text-xl font-bold text-beacon-navy">3</span>
              </div>
              <h4 className="text-lg font-semibold text-beacon-navy mb-2">Staff Engagement</h4>
              <p className="text-gray-600">We build AI literacy and excitement across the organization</p>
            </div>

            <div className="relative z-10 text-center">
              <div className="w-16 h-16 rounded-full bg-beacon-navy/10 flex items-center justify-center mx-auto mb-4 md:bg-white">
                <span className="text-xl font-bold text-beacon-navy">4</span>
              </div>
              <h4 className="text-lg font-semibold text-beacon-navy mb-2">Planning & Implementation</h4>
              <p className="text-gray-600">We create and begin executing your custom AI roadmap</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CultureProcess;
