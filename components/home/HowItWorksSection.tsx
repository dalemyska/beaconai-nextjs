import Link from 'next/link';

const steps = [
  {
    number: 1,
    title: 'Take the Assessment',
    description:
      'Answer 12 quick questions about your business. Get your AI Readiness Score and a personalized report in 5 minutes.',
    cta: { label: 'Start the Assessment', href: '/readiness-assessment', external: false },
  },
  {
    number: 2,
    title: 'Book a Strategy Call',
    description:
      'Schedule a free 30-minute call to review your results and identify your highest-impact AI opportunities.',
    cta: {
      label: 'Book Your Call',
      href: 'https://app.usemotion.com/meet/dalemyska/consultation',
      external: true,
    },
  },
  {
    number: 3,
    title: 'Get Your Roadmap',
    description:
      'Walk away with a clear, prioritized action plan built around your business goals, budget, and team.',
    cta: null,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-4xl font-bold text-beacon-navy mb-6 text-center">
          How It Works
        </h2>
        <p className="text-xl text-gray-700 mb-12 text-center max-w-3xl mx-auto">
          Three simple steps to start your AI journey.
        </p>

        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-0.5 bg-beacon-gold/30 border-t-2 border-dashed border-beacon-gold/30" />

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step) => (
              <div key={step.number} className="text-center relative">
                {/* Numbered circle */}
                <div className="w-24 h-24 bg-beacon-gold text-beacon-navy rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg relative z-10">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-beacon-navy mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-700 mb-6 max-w-sm mx-auto">
                  {step.description}
                </p>
                {step.cta && (
                  step.cta.external ? (
                    <a
                      href={step.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-beacon-navy text-white px-6 py-3 font-semibold rounded-md hover:bg-beacon-navy/90 transition-all duration-300"
                    >
                      {step.cta.label}
                    </a>
                  ) : (
                    <Link
                      href={step.cta.href}
                      className="inline-block bg-beacon-navy text-white px-6 py-3 font-semibold rounded-md hover:bg-beacon-navy/90 transition-all duration-300"
                    >
                      {step.cta.label}
                    </Link>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
