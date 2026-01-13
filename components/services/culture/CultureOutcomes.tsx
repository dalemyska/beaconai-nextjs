const CultureOutcomes = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
      <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-beacon-navy mb-4">Business Outcomes</h3>
        <p className="text-gray-700 mb-4">After completing the AI Culture Accelerator, your organization will:</p>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start">
            <span className="text-beacon-teal mr-2">•</span>
            Have leaders who confidently drive AI initiatives
          </li>
          <li className="flex items-start">
            <span className="text-beacon-teal mr-2">•</span>
            See staff embracing and experimenting with AI tools
          </li>
          <li className="flex items-start">
            <span className="text-beacon-teal mr-2">•</span>
            Follow a clear roadmap for implementing AI across functions
          </li>
          <li className="flex items-start">
            <span className="text-beacon-teal mr-2">•</span>
            Measure and track AI implementation success
          </li>
          <li className="flex items-start">
            <span className="text-beacon-teal mr-2">•</span>
            Begin realizing tangible business benefits from AI
          </li>
        </ul>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-beacon-navy mb-4">Perfect For</h3>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start">
            <span className="text-beacon-teal mr-2">•</span>
            Organizations ready to make AI a strategic advantage
          </li>
          <li className="flex items-start">
            <span className="text-beacon-teal mr-2">•</span>
            Companies wanting to move beyond ad-hoc AI experimentation
          </li>
          <li className="flex items-start">
            <span className="text-beacon-teal mr-2">•</span>
            Businesses seeking to build internal AI capabilities
          </li>
          <li className="flex items-start">
            <span className="text-beacon-teal mr-2">•</span>
            Teams needing guidance through comprehensive AI implementation
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CultureOutcomes;
