'use client';

import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";

interface ContactFormSubmitProps {
  isSubmitting: boolean;
}

const ContactFormSubmit = ({ isSubmitting }: ContactFormSubmitProps) => {
  return (
    <Button
      type="submit"
      className="w-full bg-beacon-teal hover:bg-beacon-teal/90"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </>
      )}
    </Button>
  );
};

export default ContactFormSubmit;
