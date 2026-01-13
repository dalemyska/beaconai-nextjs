'use client';

import { Form } from "@/components/ui/form";
import { useContactForm } from "./useContactForm";
import ContactFormFields from "./ContactFormFields";
import ContactFormSubmit from "./ContactFormSubmit";
import ContactSuccessMessage from "./ContactSuccessMessage";

const ContactForm = () => {
  const { form, isSubmitting, isSuccess, handleSubmit, resetForm } = useContactForm();

  return (
    <div className="w-full">
      {isSuccess ? (
        <ContactSuccessMessage onReset={resetForm} />
      ) : (
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <ContactFormFields form={form} />
            <ContactFormSubmit isSubmitting={isSubmitting} />
          </form>
        </Form>
      )}
    </div>
  );
};

export default ContactForm;
