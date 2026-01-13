'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactFormSchema, ContactFormValues } from "./ContactFormSchema";
import { submitLead } from "@/services/leadService";
import { submitFormWithDualCapture } from "@/services/googleFormsService";

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      role: "",
      message: "",
    },
    mode: "onBlur",
  });

  const handleSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setFormErrors({});

    try {
      console.log("Contact form submitted with data:", data);

      // Client-side validation before submission
      const validationErrors: Record<string, string> = {};
      let hasErrors = false;

      if (!data.name.trim()) {
        validationErrors.name = "Name is required";
        hasErrors = true;
      }

      if (!data.email.trim()) {
        validationErrors.email = "Email is required";
        hasErrors = true;
      } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        validationErrors.email = "Please enter a valid email address";
        hasErrors = true;
      }

      if (!data.company.trim()) {
        validationErrors.company = "Company name is required";
        hasErrors = true;
      }

      if (hasErrors) {
        setFormErrors(validationErrors);
        toast.error("Please correct the errors in the form");
        setIsSubmitting(false);
        return;
      }

      // Use the dual submission service
      const success = await submitFormWithDualCapture(
        {
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          company: data.company,
          role: data.role || undefined,
          message: data.message || undefined,
          source: "Contact Form",
          resource: undefined
        },
        // The Supabase submission function
        (leadData) => submitLead({
          ...leadData,
          name: leadData.name as string,
          email: leadData.email as string,
          phone: leadData.phone as string | undefined,
          company: leadData.company as string | undefined,
          message: leadData.message as string | undefined,
          source: leadData.source as string,
          metadata: {
            ...(leadData.metadata as Record<string, unknown>),
            page: "contact"
          }
        })
      );

      if (success) {
        setIsSuccess(true);
        toast.success("Message sent successfully! We'll get back to you soon.");
        form.reset();
      } else {
        console.error("Failed to submit the contact form");
        throw new Error("Failed to submit the form");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("There was a problem sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setFormErrors({});
    form.reset();
  };

  return {
    form,
    isSubmitting,
    isSuccess,
    formErrors,
    handleSubmit: form.handleSubmit(handleSubmit),
    resetForm
  };
};
