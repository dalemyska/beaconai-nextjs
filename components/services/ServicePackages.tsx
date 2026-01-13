import Link from "next/link";
import { ArrowRight, Activity, Users, Shield, User, FileText, HeartPulse } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnchorLink } from "@/components/ui/anchor-link";

const ServicePackages = () => {
  return (
    <section className="py-16 bg-white" id="packages">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-beacon-navy text-center mb-8">
          Our Service Packages
        </h2>

        {/* Main service packages - 2 rows of 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* AI Readiness Assessment */}
          <Card className="hover:shadow-lg transition-shadow duration-300 border-t-4 border-beacon-teal">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-beacon-navy/10 flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-beacon-navy" />
              </div>
              <CardTitle className="text-2xl mb-1 text-beacon-navy">AI Readiness Assessment</CardTitle>
              <p className="font-medium text-gray-700">Jumpstart your AI journey in 2 weeks</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Discover your organization&apos;s AI starting point and build a foundation for successful implementation through our structured assessment process.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg text-beacon-navy font-medium">Starting at $5,500</span>
                <Button asChild className="bg-beacon-gold hover:bg-beacon-gold/90 text-beacon-navy">
                  <AnchorLink href="#readiness" className="inline-flex items-center">
                    Learn More <ArrowRight size={16} className="ml-1" />
                  </AnchorLink>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Culture Accelerator */}
          <Card className="hover:shadow-lg transition-shadow duration-300 border-t-4 border-beacon-teal">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-beacon-navy/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-beacon-navy" />
              </div>
              <CardTitle className="text-2xl mb-1 text-beacon-navy">AI Culture Accelerator</CardTitle>
              <p className="font-medium text-gray-700">Transform your organization&apos;s AI capabilities</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Develop the knowledge, processes, and strategy to implement AI effectively through our comprehensive training and implementation program.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg text-beacon-navy font-medium">$15,000-$20,000</span>
                <Button asChild className="bg-beacon-gold hover:bg-beacon-gold/90 text-beacon-navy">
                  <AnchorLink href="#culture" className="inline-flex items-center">
                    Learn More <ArrowRight size={16} className="ml-1" />
                  </AnchorLink>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Process Documentation */}
          <Card className="hover:shadow-lg transition-shadow duration-300 border-t-4 border-beacon-teal">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-beacon-navy/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-beacon-navy" />
              </div>
              <CardTitle className="text-2xl mb-1 text-beacon-navy">AI Process Documentation</CardTitle>
              <p className="font-medium text-gray-700">Document core processes while integrating AI</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Transform unclear operations into documented systems with strategic AI integration points that drive measurable business results.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg text-beacon-navy font-medium">$15,000-$40,000+</span>
                <Button asChild className="bg-beacon-gold hover:bg-beacon-gold/90 text-beacon-navy">
                  <AnchorLink href="#process-documentation" className="inline-flex items-center">
                    Learn More <ArrowRight size={16} className="ml-1" />
                  </AnchorLink>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Policy Development */}
          <Card className="hover:shadow-lg transition-shadow duration-300 border-t-4 border-beacon-teal">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-beacon-navy/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-beacon-navy" />
              </div>
              <CardTitle className="text-2xl mb-1 text-beacon-navy">AI Policy Development</CardTitle>
              <p className="font-medium text-gray-700">Create responsible AI guidelines</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Establish clear, practical AI policies that protect your organization while encouraging innovation and responsible use.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg text-beacon-navy font-medium">$3,500 standalone</span>
                <Button asChild className="bg-beacon-gold hover:bg-beacon-gold/90 text-beacon-navy">
                  <AnchorLink href="#policy" className="inline-flex items-center">
                    Learn More <ArrowRight size={16} className="ml-1" />
                  </AnchorLink>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Fractional AI Leadership */}
          <Card className="hover:shadow-lg transition-shadow duration-300 border-t-4 border-beacon-teal">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-beacon-navy/10 flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-beacon-navy" />
              </div>
              <CardTitle className="text-2xl mb-1 text-beacon-navy">Fractional AI Leadership</CardTitle>
              <p className="font-medium text-gray-700">Strategic AI guidance without a full-time hire</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Access MIT-trained AI expertise on an ongoing basis with our monthly retainer service—at a fraction of a full-time executive&apos;s cost.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg text-beacon-navy font-medium">$5,000 monthly</span>
                <Button asChild className="bg-beacon-gold hover:bg-beacon-gold/90 text-beacon-navy">
                  <AnchorLink href="#leadership" className="inline-flex items-center">
                    Learn More <ArrowRight size={16} className="ml-1" />
                  </AnchorLink>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Coaching - Updated */}
          <Card className="hover:shadow-lg transition-shadow duration-300 border-t-4 border-beacon-gold">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-beacon-navy/10 flex items-center justify-center mb-4">
                <HeartPulse className="h-6 w-6 text-beacon-navy" />
              </div>
              <CardTitle className="text-2xl mb-1 text-beacon-navy">AI Coaching</CardTitle>
              <p className="font-medium text-gray-700">Personalized guidance for your AI challenges</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Get practical solutions for your specific AI challenges without generic courses or predetermined paths. Direct access to expert guidance when you need it most.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg text-beacon-navy font-medium">$2,000 for 10 hours</span>
                <Button asChild className="bg-beacon-gold hover:bg-beacon-gold/90 text-beacon-navy">
                  <Link href="/services/ai-coaching" className="inline-flex items-center">
                    Learn More <ArrowRight size={16} className="ml-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicePackages;
