const PolicyOutcomes = () => {
  const businessOutcomes = [
    "Clear framework for responsible AI use",
    "Reduced risk of data or ethical issues",
    "Appropriate governance structures",
    "Confidence to innovate within boundaries",
    "Compliance with emerging regulations"
  ];

  const perfectFor = [
    "Organizations with active AI experimentation",
    "Businesses in regulated industries",
    "Companies concerned about data privacy",
    "Teams wanting to establish AI guardrails"
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-beacon-navy mb-4">Business Outcomes</h3>
        <p className="text-gray-700 mb-4">After implementing AI Policy Development, your organization will have:</p>
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

export default PolicyOutcomes;
