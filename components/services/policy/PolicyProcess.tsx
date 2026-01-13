const PolicyProcess = () => {
  const steps = [
    {
      number: 1,
      title: "Assessment",
      description: "We evaluate your current AI use and potential risks"
    },
    {
      number: 2,
      title: "Development",
      description: "We create tailored policy frameworks and guidelines"
    },
    {
      number: 3,
      title: "Review",
      description: "We refine policies with stakeholder input"
    },
    {
      number: 4,
      title: "Implementation",
      description: "We help you roll out and communicate new policies"
    }
  ];

  return (
    <>
      <h3 className="text-2xl font-bold text-beacon-navy text-center mb-8">
        Our Policy Development Process
      </h3>

      <div className="max-w-4xl mx-auto mb-16">
        <div className="relative">
          {/* Timeline bar */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-beacon-navy/20 z-0"></div>

          {/* Timeline steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative z-10 text-center">
                <div className="w-16 h-16 rounded-full bg-beacon-navy/10 flex items-center justify-center mx-auto mb-4 md:bg-white">
                  <span className="text-xl font-bold text-beacon-navy">{step.number}</span>
                </div>
                <h4 className="text-lg font-semibold text-beacon-navy mb-2">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PolicyProcess;
