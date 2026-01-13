'use client';

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Briefcase, Target, Users, TrendingUp } from "lucide-react";

const CredibilitySection = () => {
  const { targetRef, isIntersecting } = useIntersectionObserver(() => {});

  const experiences = [
    "EVP at PostNet & AlphaGraphics: Led 500+ franchise locations, implemented AI call screening that maximized sales conversions",
    "COO at World Options: Led emerging franchise restart through COVID disruption - learned how businesses must adapt or die",
    "MIT AI Executive Academy Graduate: Selected as 1 of 100 global executives to master AI strategy"
  ];

  const approaches = [
    {
      icon: Briefcase,
      title: "Business First",
      description: "I don't start with AI. I start with your goals."
    },
    {
      icon: Target,
      title: "Process Focused",
      description: "Fix operations before adding technology."
    },
    {
      icon: Users,
      title: "Culture Matters",
      description: "Technology fails without team buy-in."
    },
    {
      icon: TrendingUp,
      title: "ROI Obsessed",
      description: "Every recommendation tied to business impact."
    }
  ];

  return (
    <section ref={targetRef as React.RefObject<HTMLElement>} className="section-padding bg-beacon-navy text-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-3xl md:text-4xl text-white mb-4">
            Why Executives Trust Me
          </h2>
          <h3 className="font-montserrat text-2xl text-beacon-gold mb-8">
            Not Just Another Tech Consultant
          </h3>
        </div>

        <div className="mb-12">
          <p className="font-sourceSansPro text-lg text-white mb-6">
            I&apos;ve navigated disruption and implemented AI at scale:
          </p>

          <ul className="space-y-4 mb-8">
            {experiences.map((experience, index) => (
              <li
                key={index}
                className={`flex items-start transition-all duration-700 ${
                  isIntersecting ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-2 h-2 bg-beacon-gold rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="font-sourceSansPro text-white/90">
                  <strong className="text-white">{experience.split(':')[0]}:</strong>
                  {experience.split(':')[1]}
                </span>
              </li>
            ))}
          </ul>

          <div className="bg-beacon-gold text-beacon-navy p-6 rounded-lg mb-8">
            <blockquote className="font-sourceSansPro text-lg italic">
              &ldquo;I&apos;ve led through disruption before. COVID taught us that standing still means falling behind. AI is today&apos;s disruption - but this time, you can get ahead of it.&rdquo;
            </blockquote>
          </div>

          <div className="mb-8">
            <p className="font-sourceSansPro text-white/90 mb-4">
              <strong className="text-white">What Makes Me Different:</strong> I&apos;ve already done what you&apos;re trying to do. At AlphaGraphics, I implemented AI tools that transformed our sales process. I know what works, what doesn&apos;t, and how to get buy-in from franchisees who resist change.
            </p>

            <p className="font-sourceSansPro text-lg text-white/90 italic text-center">
              I don&apos;t just theorize about AI. I&apos;ve implemented it. Led through disruption. Delivered results.
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-montserrat text-2xl text-beacon-gold mb-8 text-center">
            My Approach is Different
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {approaches.map((approach, index) => (
              <div
                key={index}
                className={`flex items-start space-x-4 transition-all duration-700 ${
                  isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${(index + 3) * 200}ms` }}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-beacon-gold text-beacon-navy rounded-full flex-shrink-0">
                  <approach.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-montserrat text-lg font-semibold text-white mb-2">
                    {approach.title}
                  </h4>
                  <p className="font-sourceSansPro text-white/90">
                    {approach.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredibilitySection;
