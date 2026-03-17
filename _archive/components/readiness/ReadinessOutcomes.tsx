const ReadinessOutcomes = () => {
  const businessOutcomes = [
    "Clear understanding of your organization's AI readiness",
    "Identification of quick-win AI opportunities",
    "Practical roadmap for moving forward",
    "Foundation for AI culture building",
    "Alignment between leadership and staff on AI vision"
  ];

  const perfectFor = [
    "Organizations wanting to understand their AI starting point",
    "Companies concerned about unmanaged AI use",
    "Businesses seeking practical AI guidance without major investment",
    "Leadership teams wanting to build AI literacy"
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-beacon-navy mb-4">Business Outcomes</h3>
        <p className="text-gray-700 mb-4">After completing the AI Readiness Assessment, you&apos;ll have:</p>
        <ul className="space-y-2 text-gray-600">
          {businessOutcomes.map((outcome, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              {outcome}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-beacon-navy mb-4">Perfect For</h3>
        <ul className="space-y-2 text-gray-600">
          {perfectFor.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-beacon-teal mr-2">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReadinessOutcomes;
