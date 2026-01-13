const CAREFramework = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-beacon-navy text-center mb-12">
          How Our Services Connect to the CARE Framework
        </h2>

        <div className="max-w-5xl mx-auto relative">
          {/* CARE Framework Visual */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-beacon-navy/10 rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-beacon-navy mb-1">C</h3>
                <p className="font-medium text-beacon-navy">Change</p>
              </div>
              <div className="bg-beacon-navy/10 rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-beacon-navy mb-1">A</h3>
                <p className="font-medium text-beacon-navy">Adoption</p>
              </div>
              <div className="bg-beacon-navy/10 rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-beacon-navy mb-1">R</h3>
                <p className="font-medium text-beacon-navy">Readiness</p>
              </div>
              <div className="bg-beacon-navy/10 rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-beacon-navy mb-1">E</h3>
                <p className="font-medium text-beacon-navy">Evolution</p>
              </div>
            </div>
          </div>

          <p className="text-lg text-gray-700 text-center mb-10">
            Our service packages are designed to support different aspects of the CARE framework—our comprehensive methodology for successful AI implementation:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Change */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-beacon-navy">
              <h3 className="text-xl font-semibold text-beacon-navy mb-2">C - Change</h3>
              <p className="font-medium text-gray-700 mb-3">Building the human foundation for AI success</p>
              <p className="text-gray-600 mb-2"><span className="font-medium">Primary services:</span></p>
              <ul className="space-y-1 text-gray-600">
                <li className="flex items-center">
                  <span className="text-beacon-teal mr-2">•</span>
                  AI Culture Accelerator
                </li>
                <li className="flex items-center">
                  <span className="text-beacon-teal mr-2">•</span>
                  AI Process Documentation & Integration
                </li>
                <li className="flex items-center">
                  <span className="text-beacon-teal mr-2">•</span>
                  Fractional AI Leadership
                </li>
              </ul>
            </div>

            {/* Adoption */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-beacon-navy">
              <h3 className="text-xl font-semibold text-beacon-navy mb-2">A - Adoption</h3>
              <p className="font-medium text-gray-700 mb-3">Implementing the right tools for business impact</p>
              <p className="text-gray-600 mb-2"><span className="font-medium">Primary services:</span></p>
              <ul className="space-y-1 text-gray-600">
                <li className="flex items-center">
                  <span className="text-beacon-teal mr-2">•</span>
                  AI Culture Accelerator
                </li>
                <li className="flex items-center">
                  <span className="text-beacon-teal mr-2">•</span>
                  AI Process Documentation & Integration
                </li>
                <li className="flex items-center">
                  <span className="text-beacon-teal mr-2">•</span>
                  AI Policy Development
                </li>
              </ul>
            </div>

            {/* Readiness */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-beacon-navy">
              <h3 className="text-xl font-semibold text-beacon-navy mb-2">R - Readiness</h3>
              <p className="font-medium text-gray-700 mb-3">Developing organizational knowledge and skills</p>
              <p className="text-gray-600 mb-2"><span className="font-medium">Primary services:</span></p>
              <ul className="space-y-1 text-gray-600">
                <li className="flex items-center">
                  <span className="text-beacon-teal mr-2">•</span>
                  AI Readiness Assessment
                </li>
                <li className="flex items-center">
                  <span className="text-beacon-teal mr-2">•</span>
                  AI Process Documentation & Integration
                </li>
                <li className="flex items-center">
                  <span className="text-beacon-teal mr-2">•</span>
                  AI Culture Accelerator
                </li>
              </ul>
            </div>

            {/* Evolution */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-beacon-navy">
              <h3 className="text-xl font-semibold text-beacon-navy mb-2">E - Evolution</h3>
              <p className="font-medium text-gray-700 mb-3">Transforming business models and opportunities</p>
              <p className="text-gray-600 mb-2"><span className="font-medium">Primary services:</span></p>
              <ul className="space-y-1 text-gray-600">
                <li className="flex items-center">
                  <span className="text-beacon-teal mr-2">•</span>
                  Fractional AI Leadership
                </li>
                <li className="flex items-center">
                  <span className="text-beacon-teal mr-2">•</span>
                  AI Culture Accelerator
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CAREFramework;
