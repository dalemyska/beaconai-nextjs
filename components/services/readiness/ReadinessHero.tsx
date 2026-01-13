import { BarChart } from "lucide-react";

const ReadinessHero = () => {
  return (
    <>
      <h2 className="text-3xl md:text-4xl font-bold text-beacon-navy text-center mb-2">
        AI Readiness Assessment
      </h2>

      {/* Visual banner - gauge concept */}
      <div className="relative h-28 max-w-3xl mx-auto mb-8 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-beacon-navy/20 to-beacon-teal/20 rounded-lg"></div>
        <div className="relative z-10 flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-beacon-navy/10 flex items-center justify-center">
            <BarChart className="h-8 w-8 text-beacon-navy" />
          </div>
          <div className="h-2 w-64 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-beacon-navy to-beacon-teal w-3/4 rounded-full"></div>
          </div>
        </div>
      </div>

      <h3 className="text-xl md:text-2xl font-semibold text-center text-beacon-navy mb-8">
        Discover Your AI Starting Point
      </h3>

      <div className="max-w-4xl mx-auto text-lg text-gray-700 mb-12">
        <p>
          Our AI Readiness Assessment provides a clear picture of your organization&apos;s current AI capabilities and creates a foundation for successful implementation. This two-week engagement delivers immediate value while setting the stage for strategic AI adoption.
        </p>
      </div>
    </>
  );
};

export default ReadinessHero;
