const ApproachIntroduction = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-700 mb-12">
            At beaconAI, we believe that successful AI implementation is more about people and process
            than technology alone. Our approach focuses on building AI-ready organizations through
            strategic, practical steps that deliver measurable business results.
          </p>

          <div className="relative max-w-2xl mx-auto my-12">
            <div className="rounded-full bg-beacon-navy/10 p-4 border-2 border-dashed border-beacon-navy relative h-48 md:h-56">
              {/* Center People Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="rounded-full bg-beacon-navy text-white h-28 w-28 md:h-32 md:w-32 flex items-center justify-center shadow-md">
                  <span className="font-semibold text-center">People</span>
                </div>
              </div>

              {/* Left Process Circle */}
              <div className="absolute top-1/2 left-[12%] transform -translate-y-1/2">
                <div className="rounded-full bg-beacon-gold text-beacon-navy h-28 w-28 md:h-32 md:w-32 flex items-center justify-center shadow-md">
                  <span className="font-semibold text-center">Process</span>
                </div>
              </div>

              {/* Right Technology Circle */}
              <div className="absolute top-1/2 right-[12%] transform -translate-y-1/2">
                <div className="rounded-full bg-beacon-teal text-white h-28 w-28 md:h-32 md:w-32 flex items-center justify-center shadow-md">
                  <span className="font-semibold text-center">Technology</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachIntroduction;
