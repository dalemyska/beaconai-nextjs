import { TrendingUp, Users, Settings2 } from 'lucide-react';

const OurDifference = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-2xl md:text-4xl font-bold text-beacon-navy mb-12 text-center">Our Difference</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Business-First Philosophy */}
          <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-beacon-navy/10 flex items-center justify-center mb-6">
              <TrendingUp className="h-8 w-8 text-beacon-navy" />
            </div>
            <h3 className="text-xl font-bold text-beacon-navy mb-4">Business-First Philosophy</h3>
            <p className="text-gray-700">
              We start with your business objectives, not technology. Our recommendations focus on practical solutions
              that deliver measurable results for your specific challenges.
            </p>
          </div>

          {/* Human-Centered Approach */}
          <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-beacon-navy/10 flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-beacon-navy" />
            </div>
            <h3 className="text-xl font-bold text-beacon-navy mb-4">Human-Centered Approach</h3>
            <p className="text-gray-700">
              We recognize that successful AI implementation depends on human adoption. Our emphasis on change
              management and culture building creates sustainable transformation.
            </p>
          </div>

          {/* Practical Implementation Experience */}
          <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-beacon-navy/10 flex items-center justify-center mb-6">
              <Settings2 className="h-8 w-8 text-beacon-navy" />
            </div>
            <h3 className="text-xl font-bold text-beacon-navy mb-4">Practical Implementation Experience</h3>
            <p className="text-gray-700">
              Our team brings real-world implementation experience across industries. We understand the challenges
              and opportunities at each stage of the AI journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurDifference;
