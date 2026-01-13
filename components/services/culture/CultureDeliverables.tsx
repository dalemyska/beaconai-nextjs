import { BarChart, Users, FileText } from "lucide-react";

const CultureDeliverables = () => {
  return (
    <>
      <h3 className="text-2xl font-bold text-beacon-navy text-center mb-8">
        What You&apos;ll Receive
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {/* Deep Assessment */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-beacon-teal/10 flex items-center justify-center mb-4">
            <BarChart className="h-6 w-6 text-beacon-teal" />
          </div>
          <h4 className="text-xl font-semibold text-beacon-navy mb-3">Deep Assessment</h4>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              AI usage and skills benchmarking
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Process and workflow analysis
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Technical infrastructure evaluation
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Detailed gap analysis
            </li>
          </ul>
        </div>

        {/* Leadership Development */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-beacon-teal/10 flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-beacon-teal" />
          </div>
          <h4 className="text-xl font-semibold text-beacon-navy mb-3">Leadership Development</h4>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Executive AI strategy training (two half-day sessions)
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              AI governance framework development
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Change management planning
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              ROI tracking methodology
            </li>
          </ul>
        </div>

        {/* Staff Education */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-beacon-teal/10 flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-beacon-teal" />
          </div>
          <h4 className="text-xl font-semibold text-beacon-navy mb-3">Staff Education</h4>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Department-specific AI training workshops
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Hands-on tool demonstrations and practice
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              AI use case development sessions
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Internal AI champion certification
            </li>
          </ul>
        </div>

        {/* Strategic Roadmap */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-beacon-teal/10 flex items-center justify-center mb-4">
            <FileText className="h-6 w-6 text-beacon-teal" />
          </div>
          <h4 className="text-xl font-semibold text-beacon-navy mb-3">Strategic Roadmap</h4>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Comprehensive AI implementation plan
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Prioritized initiative portfolio
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Resource requirements and timelines
            </li>
            <li className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              Success metrics and tracking framework
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CultureDeliverables;
