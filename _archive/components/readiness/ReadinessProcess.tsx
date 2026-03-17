const ReadinessProcess = () => {
  return (
    <>
      <h3 className="text-2xl font-bold text-beacon-navy text-center mb-8">
        Our Assessment Process
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
              <h4 className="text-lg font-semibold text-beacon-navy mb-2">Discovery</h4>
              <p className="text-gray-600">We begin with stakeholder interviews and survey deployment to understand your current state</p>
            </div>

            <div className="relative z-10 text-center">
              <div className="w-16 h-16 rounded-full bg-beacon-navy/10 flex items-center justify-center mx-auto mb-4 md:bg-white">
                <span className="text-xl font-bold text-beacon-navy">2</span>
              </div>
              <h4 className="text-lg font-semibold text-beacon-navy mb-2">Analysis</h4>
              <p className="text-gray-600">Our team reviews findings to identify patterns, opportunities, and gaps</p>
            </div>

            <div className="relative z-10 text-center">
              <div className="w-16 h-16 rounded-full bg-beacon-navy/10 flex items-center justify-center mx-auto mb-4 md:bg-white">
                <span className="text-xl font-bold text-beacon-navy">3</span>
              </div>
              <h4 className="text-lg font-semibold text-beacon-navy mb-2">Workshop</h4>
              <p className="text-gray-600">We conduct an executive workshop to build AI literacy and alignment</p>
            </div>

            <div className="relative z-10 text-center">
              <div className="w-16 h-16 rounded-full bg-beacon-navy/10 flex items-center justify-center mx-auto mb-4 md:bg-white">
                <span className="text-xl font-bold text-beacon-navy">4</span>
              </div>
              <h4 className="text-lg font-semibold text-beacon-navy mb-2">Recommendations</h4>
              <p className="text-gray-600">You receive a detailed scorecard and roadmap for moving forward</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadinessProcess;
