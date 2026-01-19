import type { Metadata } from 'next';
import CAREAssessmentWizard from '@/components/readiness/care/CAREAssessmentWizard';

export const metadata: Metadata = {
  title: 'AI Readiness Assessment | CARE Framework',
  description: 'Discover your AI readiness score with the CARE Framework. Get actionable insights in just 5 minutes.',
  keywords: 'AI readiness, AI assessment, CARE framework, AI transformation, digital transformation, AI consulting',
  openGraph: {
    type: 'website',
    title: 'AI Readiness Assessment | beaconAI',
    description: 'Discover your organization\'s AI readiness score. Get personalized insights and actionable recommendations in just 5 minutes.',
    url: 'https://beaconai.ai/readiness-assessment',
    siteName: 'beaconAI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Readiness Assessment | beaconAI',
    description: 'Discover your organization\'s AI readiness score. Get personalized insights and actionable recommendations in just 5 minutes.',
  },
  alternates: {
    canonical: 'https://beaconai.ai/readiness-assessment',
  },
};

export default function ReadinessAssessmentPage() {
  return (
    <>
      {/* SEO Content Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold text-beacon-navy mb-4">
              Discover Your Organization&apos;s AI Readiness
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              The CARE Framework Assessment evaluates four critical dimensions of AI readiness: Culture, Adoption,
              Readiness, and Evolution. In just 5 minutes, you&apos;ll receive a comprehensive analysis of where your
              organization stands and what steps to take next.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-xl text-beacon-navy mb-3">What You&apos;ll Discover</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Your overall AI readiness score across all dimensions</li>
                <li>• Detailed insights into each CARE framework category</li>
                <li>• Personalized recommendations for your industry</li>
                <li>• A comprehensive PDF report you can share with leadership</li>
                <li>• Specific next steps to accelerate your AI journey</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-bold text-xl text-beacon-navy mb-3">Why Take This Assessment?</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Identify gaps before investing in AI solutions</li>
                <li>• Build leadership alignment around AI priorities</li>
                <li>• Benchmark against industry best practices</li>
                <li>• Create a data-driven case for AI investment</li>
                <li>• Get expert guidance tailored to your situation</li>
              </ul>
            </div>
          </div>

          <div className="bg-beacon-navy text-white p-6 rounded-lg text-center mb-12">
            <p className="text-lg">
              <strong>Used by executives at companies ranging from startups to Fortune 500 organizations</strong> to
              evaluate their AI readiness and create actionable transformation roadmaps.
            </p>
          </div>
        </div>
      </div>

      {/* Assessment Wizard */}
      <CAREAssessmentWizard />
    </>
  );
}
