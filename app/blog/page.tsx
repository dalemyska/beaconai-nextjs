import type { Metadata } from 'next';
import { BlogList } from '@/components/blog/BlogList';
import { NewsletterSignup } from '@/components/shared/NewsletterSignup';

export const metadata: Metadata = {
  title: 'AI Strategy Blog - Practical Implementation Insights | beaconAI',
  description: 'Expert insights on AI implementation, strategy, and transformation for executives and business leaders. Real-world case studies and actionable advice.',
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

      {/* Blog Posts */}
      <section className="py-16">
        <BlogList />
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </main>
  );
}
