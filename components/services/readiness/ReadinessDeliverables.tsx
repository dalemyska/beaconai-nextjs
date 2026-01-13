import { Users, BarChart, FileText } from "lucide-react";

const ReadinessDeliverables = () => {
  return (
    <>
      <h3 className="text-2xl font-bold text-beacon-navy text-center mb-8">
        What You&apos;ll Receive
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {/* Organizational Assessment */}
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-beacon-teal/10 flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-beacon-teal" />
          </div>
          <h4 className="text-xl font-semibold text-beacon-navy mb-3">Organizational Assessment</h4>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Comprehensive employee AI readiness survey
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              &quot;Secret Cyborg&quot; discovery (identifying existing AI users)
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Leadership alignment evaluation
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Data environment review
            </li>
          </ul>
        </div>

        {/* Executive Workshop */}
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-beacon-teal/10 flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-beacon-teal" />
          </div>
          <h4 className="text-xl font-semibold text-beacon-navy mb-3">Executive Workshop</h4>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              2-hour AI awareness session for leadership
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              AI opportunity overview for your industry
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Case studies and practical applications
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Q&A and strategy discussion
            </li>
          </ul>
        </div>

        {/* Readiness Scorecard */}
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-beacon-teal/10 flex items-center justify-center mb-4">
            <BarChart className="h-6 w-6 text-beacon-teal" />
          </div>
          <h4 className="text-xl font-semibold text-beacon-navy mb-3">Readiness Scorecard</h4>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              AI readiness ratings across key dimensions
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Strengths and gaps analysis
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Benchmark comparison to industry peers
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Visual representation of your starting point
            </li>
          </ul>
        </div>

        {/* Implementation Roadmap */}
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-beacon-teal/10 flex items-center justify-center mb-4">
            <FileText className="h-6 w-6 text-beacon-teal" />
          </div>
          <h4 className="text-xl font-semibold text-beacon-navy mb-3">Implementation Roadmap</h4>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Prioritized AI opportunity identification
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Quick-win recommendations
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Resource planning guidance
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Next steps for moving forward
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ReadinessDeliverables;
