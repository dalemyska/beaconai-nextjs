import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Building, Users, GraduationCap, TrendingUp, ArrowDown } from 'lucide-react';
import { NewsletterSignup } from '@/components/shared/NewsletterSignup';

export const metadata: Metadata = {
  title: 'beaconAI - AI Implementation for SMBs',
  description: 'Find out if your business is ready for AI. Take our free assessment to get your readiness score and personalized recommendations.',
  openGraph: {
    title: 'beaconAI - AI Implementation for SMBs',
    description: 'Find out if your business is ready for AI. Take our free assessment to get your readiness score and personalized recommendations.',
    type: 'website',
  },
  twitter: {
    title: 'beaconAI - AI Implementation for SMBs',
    description: 'Find out if your business is ready for AI. Take our free assessment.',
  },
  alternates: {
    canonical: 'https://beaconai.consulting',
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-beacon-navy text-white py-24 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find Out If Your Business<br />Is Ready for AI
          </h1>
          <p className="text-beacon-gold text-xl mb-8">MIT AI Executive Academy | 10+ Years Fortune 50</p>
          <Link
            href="/readiness-assessment"
            className="inline-block bg-beacon-gold text-beacon-navy px-12 py-4 text-xl font-bold rounded-md hover:bg-beacon-gold/90 transition-all duration-300 hover:-translate-y-1"
          >
            Take the Free Assessment
          </Link>
          <p className="mt-6 text-lg opacity-90">5 minutes. 12 questions. Instant results.</p>
        </div>
      </section>

      {/* Assessment Promo Section */}
      <section className="bg-gradient-to-br from-beacon-navy to-beacon-teal py-20 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Most Businesses Aren&apos;t Ready for AI.<br />Are You?
          </h2>
          <p className="text-xl mb-12">
            Before you invest in AI, know exactly where you stand.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-beacon-gold mb-2">73%</div>
              <p>of SMBs fail at AI implementation</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-beacon-gold mb-2">5min</div>
              <p>to complete assessment</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-beacon-gold mb-2">$47M</div>
              <p>saved using this framework</p>
            </div>
          </div>

          <Link
            href="/readiness-assessment"
            className="inline-block bg-beacon-gold text-beacon-navy px-12 py-4 text-xl font-bold rounded-md hover:bg-beacon-gold/90 transition-all duration-300 hover:-translate-y-1 mr-6"
          >
            Get Your AI Readiness Score
          </Link>
          <a
            href="#what-we-do"
            className="inline-block bg-transparent text-white border-2 border-white px-8 py-4 text-lg font-semibold rounded-md hover:bg-white hover:text-beacon-navy transition-all duration-300"
          >
            Learn What We Do First
          </a>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-bold text-beacon-navy mb-6 text-center">
            What We Do
          </h2>
          <p className="text-xl text-gray-700 mb-12 text-center max-w-3xl mx-auto">
            After your assessment, we&apos;ll work together on the services that best fit your readiness level and business goals.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-t-4 border-beacon-gold hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-beacon-navy mb-3">AI Strategy Development</h3>
                <p className="text-gray-700">Create your roadmap for practical AI adoption that aligns with business objectives and delivers measurable ROI.</p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-beacon-gold hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-beacon-navy mb-3">Process Mapping & AI Agent Deployment</h3>
                <p className="text-gray-700">Identify and automate your biggest time-wasters with custom AI agents that handle repetitive tasks.</p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-beacon-gold hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-beacon-navy mb-3">Custom Tool/Agent Development</h3>
                <p className="text-gray-700">Build AI solutions that solve your specific challenges, tailored to your workflows and data.</p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-beacon-gold hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-beacon-navy mb-3">AI Coaching</h3>
                <p className="text-gray-700">One-on-one executive guidance for AI leadership, strategy decisions, and organizational change management.</p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-beacon-gold hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-beacon-navy mb-3">AI Training</h3>
                <p className="text-gray-700">Get your entire team comfortable and capable with AI tools through hands-on workshops and ongoing support.</p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-beacon-gold hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-beacon-navy mb-3">Fractional AI Leadership</h3>
                <p className="text-gray-700">Ongoing strategic guidance without the full-time cost - perfect for growing businesses scaling AI initiatives.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-bold text-beacon-navy mb-6 text-center">
            Who This Is For
          </h2>
          <p className="text-xl text-gray-700 mb-12 text-center max-w-3xl mx-auto">
            We work with forward-thinking businesses ready to gain competitive advantage through practical AI implementation.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-beacon-navy rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-beacon-navy mb-3">Franchise Organizations</h3>
              <p className="text-gray-700">Multi-location businesses seeking consistency and competitive advantage through standardized AI processes across all locations.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-beacon-navy rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-beacon-navy mb-3">SMB Operations Leaders</h3>
              <p className="text-gray-700">Companies with 10-500 employees ready to work smarter, reduce operational costs, and scale without proportional headcount growth.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-beacon-navy rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-beacon-navy mb-3">Professional Service Firms</h3>
              <p className="text-gray-700">Law firms, accountancies, and consultancies looking to eliminate repetitive work and deliver higher value to clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-bold text-beacon-navy mb-6 text-center">
            Our Approach
          </h2>
          <p className="text-xl text-gray-700 mb-12 text-center max-w-3xl mx-auto">
            We combine executive strategy with frontline reality to ensure both adoption and results.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <div className="flex items-center mb-4">
                <TrendingUp className="text-beacon-gold mr-3" size={32} />
                <h3 className="text-2xl font-bold text-beacon-navy">Top-Down Strategy</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-beacon-gold font-bold mr-3">•</span>
                  Start with executive vision and business objectives
                </li>
                <li className="flex items-start">
                  <span className="text-beacon-gold font-bold mr-3">•</span>
                  Align AI initiatives with strategic goals
                </li>
                <li className="flex items-start">
                  <span className="text-beacon-gold font-bold mr-3">•</span>
                  Ensure leadership buy-in and ROI targets
                </li>
              </ul>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <ArrowDown className="text-beacon-teal mr-3" size={32} />
                <h3 className="text-2xl font-bold text-beacon-navy">Bottom-Up Implementation</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-beacon-teal font-bold mr-3">•</span>
                  Engage front-line teams to identify real pain points
                </li>
                <li className="flex items-start">
                  <span className="text-beacon-teal font-bold mr-3">•</span>
                  Test solutions with actual users
                </li>
                <li className="flex items-start">
                  <span className="text-beacon-teal font-bold mr-3">•</span>
                  Build enthusiasm through quick wins
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-beacon-navy rounded-lg p-8 text-center">
            <h4 className="text-beacon-gold text-2xl font-bold mb-4">Why Both Matter</h4>
            <div className="grid md:grid-cols-3 gap-6 text-white">
              <div>
                <p className="font-semibold mb-2">Top-down alone =</p>
                <p className="text-sm">Great strategy, poor adoption</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Bottom-up alone =</p>
                <p className="text-sm">Random tools, no strategic impact</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Together =</p>
                <p className="text-sm text-beacon-gold">Sustainable transformation with real ROI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-16 bg-gradient-to-r from-beacon-navy/5 to-beacon-teal/5">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </section>

      {/* What Executives Tell Me Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-bold text-beacon-navy mb-6 text-center">
            What Executives Tell Me
          </h2>
          <p className="text-xl text-gray-700 mb-12 text-center max-w-3xl mx-auto">
            From my conversations with business leaders navigating AI adoption:
          </p>

          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            <Card className="border-t-4 border-beacon-teal">
              <CardContent className="p-6">
                <div className="mb-4">
                  <p className="text-xl italic mb-3">
                    <span className="text-beacon-teal text-3xl">&ldquo;</span>
                    I don&apos;t know what AI can do for me... not knowing which service to go to
                    <span className="text-beacon-teal text-3xl">&rdquo;</span>
                  </p>
                  <p className="text-sm text-gray-600 italic mb-4">
                    - Executive Recruiter & Franchise Owner
                  </p>
                  <p className="text-gray-700">
                    This is the #1 challenge. Leaders know AI matters but don&apos;t know where to start.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-beacon-teal">
              <CardContent className="p-6">
                <div className="mb-4">
                  <p className="text-xl italic mb-3">
                    <span className="text-beacon-teal text-3xl">&ldquo;</span>
                    Our compliance department is super reluctant... that comes from fear
                    <span className="text-beacon-teal text-3xl">&rdquo;</span>
                  </p>
                  <p className="text-sm text-gray-600 italic mb-4">
                    - Private Equity COO
                  </p>
                  <p className="text-gray-700">
                    Legal and compliance teams often become the biggest blockers to innovation.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-beacon-teal">
              <CardContent className="p-6">
                <div className="mb-4">
                  <p className="text-xl italic mb-3">
                    <span className="text-beacon-teal text-3xl">&ldquo;</span>
                    The people that own businesses care about money
                    <span className="text-beacon-teal text-3xl">&rdquo;</span>
                  </p>
                  <p className="text-sm text-gray-600 italic mb-4">
                    - Service Business Owner
                  </p>
                  <p className="text-gray-700">
                    Every AI initiative must tie directly to financial impact, not just efficiency.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-beacon-teal">
              <CardContent className="p-6">
                <div className="mb-4">
                  <p className="text-xl italic mb-3">
                    <span className="text-beacon-teal text-3xl">&ldquo;</span>
                    There&apos;s gotta be an AI expert that watches me do all my tasks
                    <span className="text-beacon-teal text-3xl">&rdquo;</span>
                  </p>
                  <p className="text-sm text-gray-600 italic mb-4">
                    - Franchise Executive
                  </p>
                  <p className="text-gray-700">
                    Theory doesn&apos;t help. Executives want someone to observe their specific reality.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-beacon-navy rounded-lg p-8 text-center">
            <p className="text-beacon-gold text-2xl font-bold mb-2">
              These aren&apos;t just quotes. They&apos;re the foundation of my approach.
            </p>
            <p className="text-white text-lg">
              Every service I offer addresses these real concerns from real executives.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold text-beacon-navy mb-8">
            Why Trust Me With Your AI Journey?
          </h2>
          <div className="space-y-6 text-lg text-gray-700">
            <p>I&apos;m Dale Myska. I spent over a decade at Fortune 50 companies helping other companies implement technology that saved millions. Then I watched small businesses get left behind in the AI revolution.</p>
            <p>
              After completing MIT&apos;s AI Executive Academy, I realized the problem:
              Big consultancies charge $500K+. Cheap consultants don&apos;t understand operations.
            </p>
            <p>
              Now I help 5 businesses at a time implement AI that actually works.
              Start with the assessment to see if we&apos;re a fit.
            </p>
          </div>
          <div className="mt-8">
            <Link
              href="/readiness-assessment"
              className="inline-block bg-beacon-gold text-beacon-navy px-8 py-4 text-lg font-bold rounded-md hover:bg-beacon-gold/90 transition-all duration-300"
            >
              Take the Assessment →
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Contact Section */}
      <section className="py-16 bg-beacon-navy text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">Not Ready for the Assessment?</h2>
          <p className="text-xl mb-8">
            Let&apos;s have a conversation instead.
          </p>
          <div className="space-y-4 text-lg">
            <p>
              Email: <a href="mailto:dale@beaconai.ai" className="text-beacon-gold hover:underline">dale@beaconai.ai</a>
            </p>
            <p>
              LinkedIn: <a href="https://linkedin.com/in/dalemyska" className="text-beacon-gold hover:underline" target="_blank" rel="noopener noreferrer">Connect with me</a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-50 text-center text-gray-600">
        <p>&copy; 2024 beaconAI | Denver, Colorado</p>
        <div className="mt-4 space-x-4 text-sm">
          <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <span>|</span>
          <Link href="/terms-of-service" className="hover:underline">Terms of Service</Link>
        </div>
      </footer>
    </main>
  );
}
