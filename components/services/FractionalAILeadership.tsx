import { User, BarChart, Shield, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FractionalAILeadership = () => {
  return (
    <section id="leadership" className="py-20 bg-white scroll-mt-20">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-beacon-navy text-center mb-2">
          Fractional AI Leadership
        </h2>

        {/* Visual banner */}
        <div className="relative h-28 max-w-3xl mx-auto mb-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-beacon-navy/20 to-beacon-teal/20 rounded-lg"></div>
          <div className="relative z-10 flex items-center justify-center">
            <div className="flex items-center space-x-8">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm">
                <User className="h-10 w-10 text-beacon-navy" />
              </div>
              <svg width="120" height="40" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="18" width="120" height="4" rx="2" fill="#0a3161" opacity="0.3" />
                <rect x="20" y="18" width="80" height="4" rx="2" fill="#0a3161" />
                <text x="60" y="38" textAnchor="middle" fontSize="12" fill="#0a3161">Part-time</text>
              </svg>
            </div>
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-semibold text-center text-beacon-navy mb-8">
          Strategic AI Guidance Without a Full-Time Hire
        </h3>

        <div className="max-w-4xl mx-auto text-lg text-gray-700 mb-12">
          <p>
            Access MIT-trained AI expertise on an ongoing basis without the cost of a full-time executive. Our Fractional AI Leadership service provides strategic direction, implementation support, and risk management tailored to your business needs.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-beacon-navy text-center mb-8">
          What You&apos;ll Receive
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Strategic Guidance */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-beacon-teal/10 flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-beacon-teal" />
            </div>
            <h4 className="text-xl font-semibold text-beacon-navy mb-3">Strategic Guidance</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Monthly executive strategy sessions
              </li>
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                AI roadmap development and refinement
              </li>
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Vendor evaluation assistance
              </li>
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Investment prioritization
              </li>
            </ul>
          </div>

          {/* Implementation Support */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-beacon-teal/10 flex items-center justify-center mb-4">
              <BarChart className="h-6 w-6 text-beacon-teal" />
            </div>
            <h4 className="text-xl font-semibold text-beacon-navy mb-3">Implementation Support</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Project oversight and direction
              </li>
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Technical guidance and recommendations
              </li>
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Process optimization advice
              </li>
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Performance monitoring
              </li>
            </ul>
          </div>

          {/* Risk Management */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-beacon-teal/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-beacon-teal" />
            </div>
            <h4 className="text-xl font-semibold text-beacon-navy mb-3">Risk Management</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Policy compliance reviews
              </li>
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Ethical use monitoring
              </li>
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Security and privacy guidance
              </li>
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Emerging regulation updates
              </li>
            </ul>
          </div>

          {/* Capability Building */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-beacon-teal/10 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-beacon-teal" />
            </div>
            <h4 className="text-xl font-semibold text-beacon-navy mb-3">Capability Building</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Internal champion coaching
              </li>
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Team skill development
              </li>
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Knowledge transfer planning
              </li>
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Learning resource curation
              </li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-beacon-navy text-center mb-8">
          Our Leadership Approach
        </h3>

        <div className="max-w-3xl mx-auto bg-gray-50 rounded-lg p-8 mb-16">
          <p className="text-center text-gray-700 mb-6">
            Our fractional leadership model provides:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="h-10 w-10 rounded-full bg-beacon-navy/10 flex items-center justify-center mr-4">
                <svg className="h-5 w-5 text-beacon-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-gray-700">Regular strategic guidance (15-20 hours monthly)</span>
            </div>

            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="h-10 w-10 rounded-full bg-beacon-navy/10 flex items-center justify-center mr-4">
                <svg className="h-5 w-5 text-beacon-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-gray-700">On-demand support for critical decisions</span>
            </div>

            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="h-10 w-10 rounded-full bg-beacon-navy/10 flex items-center justify-center mr-4">
                <svg className="h-5 w-5 text-beacon-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-gray-700">Quarterly review and planning sessions</span>
            </div>

            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="h-10 w-10 rounded-full bg-beacon-navy/10 flex items-center justify-center mr-4">
                <svg className="h-5 w-5 text-beacon-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <span className="text-gray-700">Continuous monitoring of AI landscape</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-beacon-navy mb-4">Business Outcomes</h3>
            <p className="text-gray-700 mb-4">With Fractional AI Leadership, your organization will:</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Receive expert AI direction without a $250K+ annual salary
              </li>
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Keep AI initiatives on track and delivering ROI
              </li>
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Avoid costly mistakes and wasted resources
              </li>
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Stay current with AI developments and best practices
              </li>
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Build internal capabilities over time
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-beacon-navy mb-4">Perfect For</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Growing businesses implementing AI across functions
              </li>
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Companies unable to justify a full-time AI executive
              </li>
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Organizations wanting expert guidance during AI transformation
              </li>
              <li className="flex items-start">
                <span className="text-beacon-teal mr-2">•</span>
                Leadership teams seeking ongoing AI strategic support
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Button asChild className="bg-beacon-gold hover:bg-beacon-gold/90 text-beacon-navy text-lg px-8 py-6 rounded-md">
            <Link href="/book-consultation">
              Book a Consultation
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FractionalAILeadership;
