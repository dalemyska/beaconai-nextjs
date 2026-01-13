'use client';

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactSuccessMessageProps {
  onReset: () => void;
}

const ContactSuccessMessage = ({ onReset }: ContactSuccessMessageProps) => {
  return (
    <div className="bg-green-50 border border-green-100 rounded-lg p-6 text-center">
      <div className="mb-4 flex justify-center">
        <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
          <Send className="h-6 w-6 text-green-600" />
        </div>
      </div>
      <h3 className="text-xl font-medium text-green-800 mb-2">Message Sent!</h3>
      <p className="text-green-700 mb-4">
        Thank you for reaching out. One of our team members will get back to you within 24 hours.
      </p>
      <Button
        variant="outline"
        onClick={onReset}
        className="border-green-300 text-green-700 hover:bg-green-50"
      >
        Send another message
      </Button>
    </div>
  );
};

export default ContactSuccessMessage;
