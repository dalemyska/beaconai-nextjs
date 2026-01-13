import SecretCyborgAssessmentInfo from "./SecretCyborgAssessmentInfo";
import SecretCyborgResearch from "./SecretCyborgResearch";

const SecretCyborgsSection = () => {
  return (
    <section id="learn-more" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-montserrat text-3xl md:text-4xl text-beacon-navy mb-8 text-center md:text-left">
            32% of Your Employees Are Already Using AI. You Just Don&apos;t Know It.
          </h2>

          <div className="mb-8">
            <p className="font-sourceSansPro text-lg text-gray-700 mb-6">
              We call them &ldquo;Secret Cyborgs&rdquo; - employees who&apos;ve discovered AI on their own and are quietly using ChatGPT, Claude, or other AI tools to get their work done faster.
            </p>

            <p className="font-sourceSansPro text-xl text-beacon-teal text-center font-semibold mb-8">
              No official approval. No training. No oversight.
            </p>

            <div className="mb-8">
              <p className="font-sourceSansPro text-lg text-gray-700 mb-4 font-semibold">
                They&apos;re in every department:
              </p>
              <ul className="space-y-3">
                {[
                  "The sales rep writing proposals with ChatGPT",
                  "The HR manager using AI for job descriptions",
                  "The finance analyst running reports through Claude",
                  "The marketing coordinator creating content with AI"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-beacon-gold rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="font-sourceSansPro text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-50 border-l-4 border-red-400 p-6">
                <h3 className="font-montserrat text-lg font-semibold text-red-800 mb-3">Hidden Risk</h3>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>• Uncontrolled data exposure</li>
                  <li>• Inconsistent quality and brand voice</li>
                  <li>• Compliance vulnerabilities</li>
                  <li>• No oversight or governance</li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-400 p-6">
                <h3 className="font-montserrat text-lg font-semibold text-green-800 mb-3">Missed Opportunity</h3>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Untapped efficiency gains</li>
                  <li>• Innovation happening in silos</li>
                  <li>• Competitive advantage ignored</li>
                  <li>• Strategic potential wasted</li>
                </ul>
              </div>
            </div>

            <div className="bg-beacon-navy text-white p-6 rounded-lg">
              <h3 className="font-montserrat text-xl font-semibold text-beacon-gold mb-4">
                The solution isn&apos;t to stop them. It&apos;s to lead them.
              </h3>
              <p className="font-sourceSansPro text-white/90">
                I help you transform Secret Cyborgs from hidden risk to competitive advantage - creating an AI-ready culture that channels this innovation safely and strategically.
              </p>
            </div>
          </div>
        </div>

        <SecretCyborgAssessmentInfo />
        <SecretCyborgResearch />
      </div>
    </section>
  );
};

export default SecretCyborgsSection;
