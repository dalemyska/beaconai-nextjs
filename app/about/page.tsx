import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Building, DollarSign, Users, TrendingUp, ArrowDown, Check } from "lucide-react";

export const metadata: Metadata = {
  title: 'About Dale Myska - beaconAI Founder | MIT AI Executive',
  description: "Learn about Dale Myska's journey from Fortune 50 operations leadership to founding beaconAI. MIT AI Executive Academy graduate helping SMBs implement practical AI solutions.",
  openGraph: {
    title: 'About Dale Myska - beaconAI Founder | MIT AI Executive',
    description: "Learn about Dale Myska's journey from Fortune 50 operations leadership to founding beaconAI.",
    images: ['/dale-myska-headshot.jpeg'],
  },
  twitter: {
    title: 'About Dale Myska - beaconAI Founder | MIT AI Executive',
    description: "Learn about Dale Myska's journey from Fortune 50 operations leadership to founding beaconAI.",
    images: ['/dale-myska-headshot.jpeg'],
  },
  alternates: {
    canonical: 'https://beaconai.ai/about',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-beacon-navy text-white py-24 text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            From Fortune 50 Operations to AI Implementation Partner
          </h1>
          <p className="text-beacon-gold text-xl mb-8">
            MIT AI Executive Academy | 10+ Years Fortune 50 Leadership | Denver, Colorado
          </p>
          <div className="flex justify-center mb-8">
            <img
              src="/dale-myska-headshot.jpeg"
              alt="Dale Myska - beaconAI Founder"
              className="w-48 h-48 rounded-full object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* The Journey Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold text-beacon-navy mb-12 text-center">
            The Journey
          </h2>
          <div className="space-y-12">
            <div className="relative pl-8 border-l-4 border-beacon-gold">
              <h3 className="text-2xl font-bold text-beacon-navy mb-3">Fortune 50 Leadership</h3>
              <p className="text-gray-700 text-lg">
                Spent over a decade at companies like UPS helping businesses implement technology that saved millions. Specialized in operations, supply chain optimization, and franchise systems.
              </p>
            </div>
            <div className="relative pl-8 border-l-4 border-beacon-gold">
              <h3 className="text-2xl font-bold text-beacon-navy mb-3">Franchise Operations Expert</h3>
              <p className="text-gray-700 text-lg">
                Led operations for franchise organizations including AlphaGraphics, PostNet, and World Options.
              </p>
            </div>
            <div className="relative pl-8 border-l-4 border-beacon-gold">
              <h3 className="text-2xl font-bold text-beacon-navy mb-3">MIT AI Executive Academy</h3>
              <p className="text-gray-700 text-lg">
                Completed MIT&apos;s intensive AI Executive Education program. Realized the massive gap between what large enterprises could afford in AI consulting versus what SMBs actually needed.
              </p>
            </div>
            <div className="relative pl-8 border-l-4 border-beacon-gold">
              <h3 className="text-2xl font-bold text-beacon-navy mb-3">beaconAI Founded</h3>
              <p className="text-gray-700 text-lg">
                Left corporate security to help businesses that were being left behind in the AI revolution. Now work with 5 carefully selected clients at a time to ensure deep partnership and real results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why I Started beaconAI Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-bold text-beacon-navy mb-12 text-center">
            Why I Started beaconAI
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-beacon-gold hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Building className="w-12 h-12 text-beacon-gold mb-4" />
                <h3 className="text-xl font-bold text-beacon-navy mb-3">The Problem I Saw</h3>
                <p className="text-gray-700">
                  Big consultancies charge $500K+ for AI strategies that SMBs can&apos;t afford or implement. Cheap consultants don&apos;t understand operations. Small businesses were getting left behind.
                </p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-beacon-teal hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <DollarSign className="w-12 h-12 text-beacon-teal mb-4" />
                <h3 className="text-xl font-bold text-beacon-navy mb-3">The Gap I Fill</h3>
                <p className="text-gray-700">
                  I spent years helping Fortune 50 companies save millions through operational technology. That same expertise should be accessible to growing businesses, not just enterprises.
                </p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-beacon-navy hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-beacon-navy mb-4" />
                <h3 className="text-xl font-bold text-beacon-navy mb-3">The Mission</h3>
                <p className="text-gray-700">
                  Make practical AI implementation accessible to businesses that don&apos;t have enterprise budgets or technical teams. Focus on measurable ROI, not theoretical possibilities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Makes This Approach Different Section */}
      <section className="py-16 bg-beacon-navy text-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center">
            What Makes This Approach Different
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/10 p-8 rounded-lg">
              <ArrowDown className="w-12 h-12 text-beacon-gold mb-4" />
              <h3 className="text-2xl font-bold mb-4">Top-Down Strategy</h3>
              <ul className="space-y-3 text-lg">
                <li>• Executive vision and business objectives first</li>
                <li>• MIT-backed frameworks and strategic planning</li>
                <li>• Clear ROI targets and leadership buy-in</li>
              </ul>
            </div>
            <div className="bg-white/10 p-8 rounded-lg">
              <TrendingUp className="w-12 h-12 text-beacon-teal mb-4" />
              <h3 className="text-2xl font-bold mb-4">Bottom-Up Implementation</h3>
              <ul className="space-y-3 text-lg">
                <li>• Front-line team engagement and real pain points</li>
                <li>• Test solutions with actual users</li>
                <li>• Quick wins build enthusiasm and adoption</li>
              </ul>
            </div>
          </div>
          <div className="bg-beacon-gold text-beacon-navy p-8 rounded-lg text-center max-w-4xl mx-auto">
            <p className="text-xl font-semibold">
              <strong>Why Both Matter:</strong> Top-down alone = great strategy, poor adoption. Bottom-up alone = random tools, no strategic impact. Together = sustainable transformation with real ROI.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials & Experience Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold text-beacon-navy mb-12 text-center">
            Credentials & Experience
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Check className="w-6 h-6 text-beacon-gold flex-shrink-0 mt-1" />
              <p className="text-lg text-gray-700">MIT Sloan School of Management - AI Executive Academy Graduate</p>
            </div>
            <div className="flex items-start gap-4">
              <Check className="w-6 h-6 text-beacon-gold flex-shrink-0 mt-1" />
              <p className="text-lg text-gray-700">10+ years Fortune 50 operations and supply chain leadership</p>
            </div>
            <div className="flex items-start gap-4">
              <Check className="w-6 h-6 text-beacon-gold flex-shrink-0 mt-1" />
              <p className="text-lg text-gray-700">Franchise operations expertise (PostNet, MBE Worldwide)</p>
            </div>
            <div className="flex items-start gap-4">
              <Check className="w-6 h-6 text-beacon-gold flex-shrink-0 mt-1" />
              <p className="text-lg text-gray-700">Supply chain optimization and multi-location business management</p>
            </div>
            <div className="flex items-start gap-4">
              <Check className="w-6 h-6 text-beacon-gold flex-shrink-0 mt-1" />
              <p className="text-lg text-gray-700">Technology implementation resulting in multi-million dollar savings</p>
            </div>
            <div className="flex items-start gap-4">
              <Check className="w-6 h-6 text-beacon-gold flex-shrink-0 mt-1" />
              <p className="text-lg text-gray-700">Executive coaching and organizational change management</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why I Only Work With 5 Clients Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold text-beacon-navy mb-8 text-center">
            Why I Only Work With 5 Clients at a Time
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg mb-6">
              This isn&apos;t about being exclusive. It&apos;s about being effective. When I worked in Fortune 50 companies, I saw what happens when consultants spread themselves too thin - generic advice, slow response times, and implementations that never quite fit.
            </p>
            <p className="text-gray-700 text-lg mb-6">
              By limiting my client roster to 5 businesses, I can:
            </p>
            <ul className="space-y-3 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-beacon-gold font-bold">•</span>
                <span>Deeply understand your specific operations and challenges</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-beacon-gold font-bold">•</span>
                <span>Be available when you actually need guidance, not next quarter</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-beacon-gold font-bold">•</span>
                <span>Iterate and adjust based on what&apos;s actually working in your business</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-beacon-gold font-bold">•</span>
                <span>Build a real partnership, not just deliver a report</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Personal Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold text-beacon-navy mb-8 text-center">
            Beyond the Business Card
          </h2>
          <div className="prose prose-lg max-w-none text-center">
            <p className="text-gray-700 text-lg mb-6">
              I&apos;m based in Denver, Colorado, where I live with my wife Emily and our two kids. When I&apos;m not helping businesses implement AI, you&apos;ll find me collecting bourbon, baking sourdough, or helping my wife tend to her bees.
            </p>
            <p className="text-gray-700 text-lg">
              These aren&apos;t just hobbies - they&apos;ve taught me that the best results come from patience, attention to detail, and respecting natural processes. Principles that apply equally well to AI implementation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-beacon-gold text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <h3 className="text-4xl font-bold text-beacon-navy mb-6">
            Ready to See If We&apos;re a Fit?
          </h3>
          <p className="text-xl text-beacon-navy mb-8">
            Start with the AI Readiness Assessment to get your score and personalized recommendations.
          </p>
          <Link href="/readiness-assessment" className="inline-block bg-beacon-navy text-white px-12 py-4 text-xl font-bold rounded-md hover:bg-beacon-navy/90 transition-all duration-300 hover:-translate-y-1 mb-6">
            Take the Free Assessment
          </Link>
          <p className="text-beacon-navy text-lg">
            Or email me directly: <a href="mailto:dale@beaconai.ai" className="underline hover:text-beacon-navy/80">dale@beaconai.ai</a>
          </p>
        </div>
      </section>
    </main>
  );
}
