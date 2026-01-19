import type { Metadata } from 'next';
import { BlogList } from '@/components/blog/BlogList';
import { NewsletterSignup } from '@/components/shared/NewsletterSignup';

export const metadata: Metadata = {
  title: 'AI Strategy Blog - Implementation Insights',
  description: 'Expert insights on AI implementation, strategy, and transformation for executives. Real-world case studies and actionable advice.',
  keywords: 'AI strategy, artificial intelligence implementation, business transformation, executive AI insights, AI case studies',
  openGraph: {
    title: 'AI Strategy Blog - Practical Implementation Insights | beaconAI',
    description: 'Expert insights on AI implementation, strategy, and transformation for executives and business leaders.',
    url: 'https://beaconai.ai/blog',
    siteName: 'beaconAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Strategy Blog - Practical Implementation Insights | beaconAI',
    description: 'Expert insights on AI implementation, strategy, and transformation for executives and business leaders.',
  },
  alternates: {
    canonical: 'https://beaconai.ai/blog',
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-primary/5 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Strategy <span className="text-primary">Insights</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Practical implementation strategies, real-world case studies, and executive insights
            to help you navigate your AI transformation journey.
          </p>
          <NewsletterSignup variant="inline" className="max-w-2xl mx-auto" />
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">What You&apos;ll Learn</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-bold text-lg mb-3">Implementation Strategies</h3>
                <p className="text-muted-foreground">
                  Practical frameworks for deploying AI solutions that actually work in real business environments.
                  No theoretical fluff - just actionable strategies from the trenches.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg mb-3">Executive Insights</h3>
                <p className="text-muted-foreground">
                  Leadership perspectives on navigating AI transformation, building buy-in, and measuring ROI.
                  From Fortune 50 experience to SMB practicality.
                </p>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-lg mb-3">Real-World Case Studies</h3>
                <p className="text-muted-foreground">
                  Detailed breakdowns of AI implementations across industries - what worked, what didn&apos;t,
                  and the lessons learned along the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <BlogList />
      </section>

      {/* Topics Covered */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">Topics We Cover</h2>
            <p className="text-lg text-muted-foreground mb-6">
              From AI readiness assessments to change management, our blog covers the full spectrum
              of AI implementation challenges facing modern businesses.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">AI Strategy</span>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">Change Management</span>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">ROI Measurement</span>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">Team Training</span>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">Tool Selection</span>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">Process Automation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </main>
  );
}
