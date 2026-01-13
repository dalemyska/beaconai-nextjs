import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SecretCyborgAssessmentInfo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
      <div className="order-2 md:order-1">
        <img
          src="/lovable-uploads/a0bc5868-0f4a-4273-b5f0-3ec630456057.png"
          alt="Secret Cyborg Assessment"
          className="rounded-lg shadow-lg w-full"
        />
      </div>
      <div className="order-1 md:order-2">
        <h3 className="text-2xl font-bold text-beacon-navy mb-4">Our Proprietary &ldquo;Secret Cyborg&rdquo; Assessment</h3>
        <p className="text-gray-600 mb-6">
          We help you identify undisclosed AI usage, evaluate literacy levels, and create a baseline for measuring implementation progress. This crucial first step illuminates both opportunities and risks in your current AI landscape.
        </p>

        <ul className="space-y-3 mb-8">
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
            <span className="text-gray-700">Stop losing ground to competitors with more mature AI cultures</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
            <span className="text-gray-700">Eliminate mounting security and compliance risks from unauthorized AI use</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
            <span className="text-gray-700">Convert wasted AI experimentation into measurable productivity gains</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
            <span className="text-gray-700">Prepare for the inevitable AI transformation while you still have time to adapt</span>
          </li>
        </ul>

        <Button asChild className="bg-beacon-navy hover:bg-beacon-navy/90 text-white">
          <Link href="/services">Learn More About Our Assessment</Link>
        </Button>
      </div>
    </div>
  );
};

export default SecretCyborgAssessmentInfo;
