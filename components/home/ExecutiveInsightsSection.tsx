'use client';

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const ExecutiveInsightsSection = () => {
  const { targetRef, isIntersecting } = useIntersectionObserver(() => {});

  const insights = [
    {
      title: "The Knowledge Gap",
      quote: "I don't know what AI can do for me... not knowing which service to go to",
      author: "Executive Recruiter & Franchise Owner",
      description: "This is the #1 challenge. Leaders know AI matters but don't know where to start."
    },
    {
      title: "The Compliance Fear",
      quote: "Our compliance department is super reluctant... that comes from fear",
      author: "Private Equity COO",
      description: "Legal and compliance teams often become the biggest blockers to innovation."
    },
    {
      title: "The ROI Reality",
      quote: "The people that own businesses care about money",
      author: "Service Business Owner",
      description: "Every AI initiative must tie directly to financial impact, not just efficiency."
    },
    {
      title: "The Practical Need",
      quote: "There's gotta be an AI expert that watches me do all my tasks",
      author: "Franchise Executive",
      description: "Theory doesn't help. Executives want someone to observe their specific reality."
    }
  ];

  return (
    <section ref={targetRef as React.RefObject<HTMLElement>} className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-3xl md:text-4xl text-beacon-navy mb-4">
            What Executives Tell Me
          </h2>
          <p className="font-sourceSansPro text-lg text-gray-600 max-w-3xl mx-auto">
            From my conversations with business leaders navigating AI adoption:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`bg-white p-6 rounded-lg shadow-lg border-t-4 border-beacon-teal transition-all duration-700 ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <h3 className="font-montserrat text-xl font-semibold text-beacon-navy mb-4">
                {insight.title}
              </h3>
              <blockquote className="font-sourceSansPro text-lg text-gray-700 italic mb-3">
                &ldquo;{insight.quote}&rdquo;
              </blockquote>
              <cite className="font-sourceSansPro text-sm text-gray-600 mb-4 block">
                - {insight.author}
              </cite>
              <p className="font-sourceSansPro text-gray-700">
                {insight.description}
              </p>
            </div>
          ))}
        </div>

        <div className={`bg-beacon-navy text-white p-8 rounded-lg text-center transition-all duration-700 ${
          isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`} style={{ transitionDelay: '800ms' }}>
          <h3 className="font-montserrat text-xl font-semibold text-beacon-gold mb-4">
            These aren&apos;t just quotes. They&apos;re the foundation of my approach.
          </h3>
          <p className="font-sourceSansPro text-white/90">
            Every service I offer addresses these real concerns from real executives.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExecutiveInsightsSection;
