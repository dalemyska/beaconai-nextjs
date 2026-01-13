'use client';

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const SolutionSection = () => {
  const { targetRef, isIntersecting } = useIntersectionObserver(() => {});

  const steps = [
    {
      number: "1",
      title: "Understand Your Reality",
      description: "Map your actual workflows (not theoretical processes)"
    },
    {
      number: "2",
      title: "Identify Quick Wins",
      description: "Find 3-5 immediate opportunities with clear ROI"
    },
    {
      number: "3",
      title: "Build, Don't Break",
      description: "Enhance what's working, fix what isn't"
    },
    {
      number: "4",
      title: "Measure Everything",
      description: "Track real business impact, not vanity metrics"
    }
  ];

  return (
    <section ref={targetRef as React.RefObject<HTMLElement>} className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-3xl md:text-4xl text-beacon-navy mb-4">
            The Strategic Path to AI Success
          </h2>
          <p className="font-sourceSansPro text-xl text-gray-700 max-w-3xl mx-auto">
            Most consultants start with technology. I start with your business.
          </p>
        </div>

        <div className="mb-12">
          <h3 className="font-montserrat text-2xl text-beacon-navy mb-8 text-center">
            My Process-First Approach:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-lg shadow-lg transition-all duration-700 ${
                  isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-beacon-gold text-beacon-navy rounded-full font-montserrat font-bold text-xl mb-4 mx-auto">
                  {step.number}
                </div>
                <h4 className="font-montserrat text-xl text-beacon-navy font-semibold mb-3 text-center">
                  {step.title}
                </h4>
                <p className="font-sourceSansPro text-gray-600 text-center">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
