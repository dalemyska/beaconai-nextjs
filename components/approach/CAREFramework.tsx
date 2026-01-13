import { Users, Settings2, BookOpen, TrendingUp } from 'lucide-react';

const CAREFramework = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-2xl md:text-4xl font-bold text-beacon-navy mb-4 text-center">The CARE Framework</h2>
        <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
          Our implementation methodology follows the CARE framework:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Change */}
          <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-beacon-navy">
            <div className="flex items-center mb-4">
              <div className="bg-beacon-navy/10 p-3 rounded-full mr-4">
                <Users className="h-8 w-8 text-beacon-navy" />
              </div>
              <h3 className="text-2xl font-bold text-beacon-navy">C - Change</h3>
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Building the human foundation for AI success</h4>
            <p className="text-gray-700 mb-4">
              The most overlooked aspect of AI implementation is the human component. We help your organization:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex">
                <span className="text-beacon-gold mr-2">•</span>
                Address psychological barriers to AI adoption
              </li>
              <li className="flex">
                <span className="text-beacon-gold mr-2">•</span>
                Build new capabilities and confidence
              </li>
              <li className="flex">
                <span className="text-beacon-gold mr-2">•</span>
                Create cultural conditions for successful evolution
              </li>
              <li className="flex">
                <span className="text-beacon-gold mr-2">•</span>
                Develop change management strategies that work
              </li>
            </ul>
          </div>

          {/* Adoption */}
          <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-beacon-gold">
            <div className="flex items-center mb-4">
              <div className="bg-beacon-gold/10 p-3 rounded-full mr-4">
                <Settings2 className="h-8 w-8 text-beacon-gold" />
              </div>
              <h3 className="text-2xl font-bold text-beacon-navy">A - Adoption</h3>
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Implementing the right tools for business impact</h4>
            <p className="text-gray-700 mb-4">
              With a solid change foundation, we focus on practical adoption:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex">
                <span className="text-beacon-gold mr-2">•</span>
                Selecting appropriate AI tools and systems
              </li>
              <li className="flex">
                <span className="text-beacon-gold mr-2">•</span>
                Establishing infrastructure and integration points
              </li>
              <li className="flex">
                <span className="text-beacon-gold mr-2">•</span>
                Creating governance frameworks and guardrails
              </li>
              <li className="flex">
                <span className="text-beacon-gold mr-2">•</span>
                Operationalizing AI capabilities to support business objectives
              </li>
            </ul>
          </div>

          {/* Readiness */}
          <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-beacon-teal">
            <div className="flex items-center mb-4">
              <div className="bg-beacon-teal/10 p-3 rounded-full mr-4">
                <BookOpen className="h-8 w-8 text-beacon-teal" />
              </div>
              <h3 className="text-2xl font-bold text-beacon-navy">R - Readiness</h3>
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Developing organizational knowledge and skills</h4>
            <p className="text-gray-700 mb-4">
              We build the knowledge foundation needed for informed decisions:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex">
                <span className="text-beacon-gold mr-2">•</span>
                Assessing AI literacy across your organization
              </li>
              <li className="flex">
                <span className="text-beacon-gold mr-2">•</span>
                Educating key stakeholders on AI capabilities and limitations
              </li>
              <li className="flex">
                <span className="text-beacon-gold mr-2">•</span>
                Determining priority areas for AI application
              </li>
              <li className="flex">
                <span className="text-beacon-gold mr-2">•</span>
                Creating skills development roadmaps
              </li>
            </ul>
          </div>

          {/* Evolution */}
          <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-beacon-navy">
            <div className="flex items-center mb-4">
              <div className="bg-beacon-navy/10 p-3 rounded-full mr-4">
                <TrendingUp className="h-8 w-8 text-beacon-navy" />
              </div>
              <h3 className="text-2xl font-bold text-beacon-navy">E - Evolution</h3>
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Transforming business models and opportunities</h4>
            <p className="text-gray-700 mb-4">
              With the right foundation, we help you evolve:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex">
                <span className="text-beacon-gold mr-2">•</span>
                Reimagining business processes with AI capabilities
              </li>
              <li className="flex">
                <span className="text-beacon-gold mr-2">•</span>
                Enhancing customer experiences through personalization
              </li>
              <li className="flex">
                <span className="text-beacon-gold mr-2">•</span>
                Creating new competitive advantages
              </li>
              <li className="flex">
                <span className="text-beacon-gold mr-2">•</span>
                Developing innovation roadmaps for continued growth
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CAREFramework;
