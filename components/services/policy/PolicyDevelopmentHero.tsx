import { FileText, Shield } from "lucide-react";

const PolicyDevelopmentHero = () => {
  return (
    <>
      <h2 className="text-3xl md:text-4xl font-bold text-beacon-navy text-center mb-2">
        AI Policy Development
      </h2>

      {/* Visual banner */}
      <div className="relative h-28 max-w-3xl mx-auto mb-8 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-beacon-navy/20 to-beacon-teal/20 rounded-lg"></div>
        <div className="relative z-10 flex items-center justify-center">
          <div className="flex items-center space-x-6">
            <Shield className="h-16 w-16 text-beacon-navy opacity-80" />
            <div className="h-12 w-32 bg-white/80 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-beacon-navy mr-2" />
              <span className="font-medium text-beacon-navy">Guidelines</span>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-xl md:text-2xl font-semibold text-center text-beacon-navy mb-8">
        Create Responsible AI Guidelines
      </h3>

      <div className="max-w-4xl mx-auto text-lg text-gray-700 mb-12">
        <p>
          Develop clear, practical AI policies that protect your organization while encouraging innovation. Our policy framework establishes responsible AI practices tailored to your business needs.
        </p>
      </div>
    </>
  );
};

export default PolicyDevelopmentHero;
