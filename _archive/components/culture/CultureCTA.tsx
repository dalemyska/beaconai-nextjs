import Link from "next/link";
import { Button } from "@/components/ui/button";

const CultureCTA = () => {
  return (
    <div className="text-center">
      <Button asChild className="bg-beacon-gold hover:bg-beacon-gold/90 text-beacon-navy text-lg px-8 py-6 rounded-md">
        <Link
          href="/book-consultation"
          aria-label="Book a consultation"
        >
          Book a Consultation
        </Link>
      </Button>
    </div>
  );
};

export default CultureCTA;
