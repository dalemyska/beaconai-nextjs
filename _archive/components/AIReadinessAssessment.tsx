import Link from "next/link";
import ReadinessHero from "./readiness/ReadinessHero";
import ReadinessDeliverables from "./readiness/ReadinessDeliverables";
import ReadinessProcess from "./readiness/ReadinessProcess";
import ReadinessOutcomes from "./readiness/ReadinessOutcomes";
import ReadinessCTA from "./readiness/ReadinessCTA";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const AIReadinessAssessment = () => {
  return (
    <section id="readiness" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="container-custom">
        <ReadinessHero />
        <ReadinessDeliverables />
        <ReadinessProcess />

        {/* Self-Assessment CTA */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <div className="bg-beacon-navy/5 p-8 rounded-lg">
            <h3 className="text-xl font-semibold text-beacon-navy mb-4">
              Not ready for a full assessment? Try our self-assessment first
            </h3>
            <p className="text-gray-700 mb-6">
              Get a quick overview of your organization&apos;s AI readiness with our free self-assessment tool
            </p>
            <Link href="/readiness-assessment">
              <Button className="bg-beacon-teal hover:bg-beacon-teal/90 text-white text-lg px-6 py-3 rounded-md flex items-center gap-2">
                Take the Self-Assessment <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>

        <ReadinessOutcomes />
        <ReadinessCTA />
      </div>
    </section>
  );
};

export default AIReadinessAssessment;
