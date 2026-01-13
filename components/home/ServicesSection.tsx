'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const ServicesSection = () => {
  const { targetRef, isIntersecting } = useIntersectionObserver(() => {});

  const services = [
    {
      title: "AI Strategy Session",
      subtitle: "Perfect for: Executives who need clarity",
      features: [
        "90-minute working session",
        "Identify your top 3 AI opportunities",
        "Get a clear next step"
      ],
      investment: "$1,500",
      cta: "Book Your Session",
      link: "/book-consultation"
    },
    {
      title: "AI Discovery Sprint",
      subtitle: "Perfect for: Companies ready to move",
      features: [
        "2-day intensive assessment",
        "Map core processes",
        "Quick wins roadmap"
      ],
      investment: "$12,500",
      cta: "Learn More",
      link: "/services"
    },
    {
      title: "AI Transformation Program",
      subtitle: "Perfect for: Organizations ready to lead",
      features: [
        "90-day implementation",
        "Full team enablement",
        "Measurable ROI focus"
      ],
      investment: "Starting at $25,000",
      cta: "See the Details",
      link: "/services"
    }
  ];

  return (
    <section ref={targetRef as React.RefObject<HTMLElement>} className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-3xl md:text-4xl text-beacon-navy mb-4">
            Choose Your Starting Point
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 ${
                isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <h3 className="font-montserrat text-2xl text-beacon-navy font-semibold mb-2">
                {service.title}
              </h3>
              <p className="font-sourceSansPro text-beacon-teal italic mb-6">
                {service.subtitle}
              </p>

              <ul className="space-y-3 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <div className="w-2 h-2 bg-beacon-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="font-sourceSansPro text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <p className="font-montserrat text-lg font-bold text-beacon-gold mb-6">
                Investment: {service.investment}
              </p>

              <Button
                asChild
                className="w-full bg-beacon-gold hover:bg-beacon-gold/90 text-beacon-navy font-montserrat font-semibold"
              >
                <Link href={service.link}>
                  {service.cta} →
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
