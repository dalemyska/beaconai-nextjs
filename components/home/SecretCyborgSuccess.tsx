'use client';

import { Button } from "@/components/ui/button";
import { Download, FileCheck } from "lucide-react";

interface SecretCyborgSuccessProps {
  onDownload: () => void;
}

const SecretCyborgSuccess = ({ onDownload }: SecretCyborgSuccessProps) => {
  return (
    <div className="py-6 text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-green-100 p-3 rounded-full">
          <FileCheck className="h-8 w-8 text-green-600" />
        </div>
      </div>
      <p className="mb-4 font-medium">Your download is ready.</p>
      <Button
        className="bg-beacon-navy hover:bg-beacon-navy/90"
        onClick={onDownload}
      >
        <Download className="mr-2 h-4 w-4" /> View PDF
      </Button>
      <p className="text-sm text-gray-500 mt-4">
        To learn more about managing AI adoption in your organization, contact BeaconAI for a consultation.
      </p>
    </div>
  );
};

export default SecretCyborgSuccess;
