import Link from "next/link";
import { Button } from "@/components/ui/button";

const CallToActionSection = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom text-center">
        <h2 className="font-montserrat text-3xl md:text-4xl text-beacon-navy mb-6">
          Ready to Stop Experimenting and Start Transforming?
        </h2>
        <p className="font-sourceSansPro text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
          You know AI is critical to your future. You&apos;ve tried the DIY approach.
          Now it&apos;s time for strategic implementation.
        </p>

        <div className="bg-white p-10 rounded-lg shadow-lg max-w-2xl mx-auto mb-8">
          <h3 className="font-montserrat text-2xl text-beacon-navy mb-6">
            Three Ways to Start:
          </h3>

          <div className="space-y-4 text-left mb-8">
            <div className="flex items-start">
              <div className="flex items-center justify-center w-8 h-8 bg-beacon-gold text-beacon-navy rounded-full font-montserrat font-bold text-sm mr-4 flex-shrink-0 mt-1">
                1
              </div>
              <div>
                <h4 className="font-montserrat font-semibold text-beacon-navy">Free Executive Brief</h4>
                <p className="font-sourceSansPro text-gray-600">15-minute call to discuss your situation</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center justify-center w-8 h-8 bg-beacon-gold text-beacon-navy rounded-full font-montserrat font-bold text-sm mr-4 flex-shrink-0 mt-1">
                2
              </div>
              <div>
                <h4 className="font-montserrat font-semibold text-beacon-navy">AI Strategy Session</h4>
                <p className="font-sourceSansPro text-gray-600">90 minutes to map your opportunities</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center justify-center w-8 h-8 bg-beacon-gold text-beacon-navy rounded-full font-montserrat font-bold text-sm mr-4 flex-shrink-0 mt-1">
                3
              </div>
              <div>
                <h4 className="font-montserrat font-semibold text-beacon-navy">Discovery Sprint</h4>
                <p className="font-sourceSansPro text-gray-600">2 days to transform your approach</p>
              </div>
            </div>
          </div>

          <Button asChild size="lg" className="bg-beacon-gold hover:bg-beacon-gold/90 text-beacon-navy font-montserrat font-semibold px-8 py-4">
            <Link href="/book-consultation">
              Schedule Your Executive Brief →
            </Link>
          </Button>
        </div>

        <p className="font-sourceSansPro text-lg italic text-gray-600 text-center">
          &quot;The best time to plant a tree was 20 years ago. The second best time is now.&quot;<br />
          The same is true for AI.
        </p>
      </div>
    </section>
  );
};

export default CallToActionSection;
