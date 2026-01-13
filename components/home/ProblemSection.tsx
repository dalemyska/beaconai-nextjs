'use client';

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const ProblemSection = () => {
  const { targetRef, isIntersecting } = useIntersectionObserver(() => {});

  const quotes = [
    {
      text: "I use ChatGPT daily, but I know I'm missing bigger opportunities",
      author: "Franchise Owner"
    },
    {
      text: "Our compliance team blocks everything because they're terrified of AI",
      author: "Private Equity COO"
    },
    {
      text: "We just hit profitability. I can't afford expensive experiments",
      author: "Beverage Company CEO"
    },
    {
      text: "I'm paying $300 per lead on Google. There has to be a better way",
      author: "Service Business Owner"
    }
  ];

  return (
    <section ref={targetRef as React.RefObject<HTMLElement>} className="section-padding bg-white">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-3xl md:text-4xl text-beacon-navy mb-8">
            Sound Familiar?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {quotes.map((quote, index) => (
              <div
                key={index}
                className={`bg-gray-50 p-6 border-l-4 border-beacon-gold transition-all duration-700 ${
                  isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <blockquote className="font-sourceSansPro text-lg text-beacon-navy font-semibold mb-3">
                  &quot;{quote.text}&quot;
                </blockquote>
                <cite className="font-sourceSansPro text-base text-gray-600 italic">
                  - {quote.author}
                </cite>
              </div>
            ))}
          </div>

          <div className={`transition-all duration-700 delay-1000 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <p className="font-sourceSansPro text-lg text-gray-700 text-center mb-6">
              <strong>You&apos;re not alone.</strong> 91% of businesses are experimenting with AI, but only 13% are seeing real results.
            </p>

            <p className="font-montserrat text-2xl text-beacon-navy text-center font-semibold">
              The problem isn&apos;t the technology. It&apos;s the approach.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
