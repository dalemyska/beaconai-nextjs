import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const ApproachCTA = () => {
  return (
    <section className="py-12 md:py-16 bg-beacon-navy text-white">
      <div className="container-custom text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Transform Your AI Approach?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Schedule a consultation to discuss how our approach can help your organization implement AI successfully.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-beacon-gold hover:bg-beacon-gold/90 text-beacon-navy font-semibold text-lg px-8 py-6"
        >
          <Link href="/book-consultation">
            <Calendar className="mr-2 h-5 w-5" />
            BOOK A CONSULTATION
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default ApproachCTA;
