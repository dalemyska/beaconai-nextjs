'use client';

import { toast } from "sonner";

export interface GoogleFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
  message?: string;
  source: string;
  resource?: string;
  [key: string]: unknown;
}

export const submitToGoogleForm = async (formData: GoogleFormData): Promise<boolean> => {
  try {
    // Google Forms submission URL
    const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdXzaROs7_4bIJrWMjcSikBDKibk5WZzRwlLOyMOZ1QJzW_uQ/formResponse";

    // Create form data for submission
    const formPayload = new FormData();
    formPayload.append("entry.1688953650", formData.name); // Full Name
    formPayload.append("entry.162555328", formData.email); // Email Address
    if (formData.company) formPayload.append("entry.860113377", formData.company); // Company Name
    if (formData.role) formPayload.append("entry.1265742189", formData.role); // Role/Position
    if (formData.phone) formPayload.append("entry.1082958348", formData.phone); // Phone Number
    if (formData.message) formPayload.append("entry.1896688852", formData.message); // Message/Comments
    formPayload.append("entry.986355471", formData.source); // Source
    if (formData.resource) formPayload.append("entry.1751346961", formData.resource); // Resource Request

    console.log("Submitting to Google Forms with data:", {
      name: formData.name,
      email: formData.email,
      source: formData.source,
      resource: formData.resource,
      hasPhone: !!formData.phone,
      hasCompany: !!formData.company
    });

    // Use a silent submission approach with fetch and no-cors mode
    try {
      await fetch(googleFormUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formPayload
      });

      console.log("Google Forms submission completed successfully");
      return true;
    } catch (fetchError) {
      console.error("Fetch error during Google Forms submission:", fetchError);

      // Fall back to iframe method as a backup
      console.log("Attempting iframe fallback method...");
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) {
        throw new Error("Could not access iframe document");
      }

      // Create form in iframe
      const form = iframeDoc.createElement('form');
      form.method = 'POST';
      form.action = googleFormUrl;
      form.target = '_blank';

      // Add all form data to the iframe form
      for (const [key, value] of formPayload.entries()) {
        const input = iframeDoc.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = typeof value === 'string' ? value : '';
        form.appendChild(input);
      }

      // Append and submit the form
      iframeDoc.body.appendChild(form);

      // Create a new window reference that we can close
      const newWindow = window.open('', '_blank');
      form.submit();

      // Close the new window immediately after submission
      if (newWindow) {
        setTimeout(() => {
          newWindow.close();
        }, 500);
      }

      // Clean up the iframe after a short delay
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);

      console.log("Iframe fallback completed");
      return true;
    }
  } catch (error) {
    console.error("Error submitting to Google Form:", error);
    return false;
  }
};

// This is our dual submission service that tries Google Form first, then always submits to Supabase
export const submitFormWithDualCapture = async (
  formData: GoogleFormData,
  supabaseSubmitFn: (data: Record<string, unknown>) => Promise<boolean>
): Promise<boolean> => {
  try {
    console.log("Starting dual capture submission...");

    // Try Google Forms submission first
    console.log("Attempting Google Forms submission...");
    const googleSuccess = await submitToGoogleForm(formData);

    if (!googleSuccess) {
      console.log("Google Forms submission failed, but continuing with Supabase");
    } else {
      console.log("Google Forms submission succeeded");
    }

    // Always submit to Supabase for redundancy and long-term storage
    console.log("Submitting to Supabase...");
    const supabaseSuccess = await supabaseSubmitFn({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      company: formData.company || '',
      message: formData.message || '',
      source: formData.source,
      metadata: {
        role: formData.role || '',
        resource: formData.resource || ''
      }
    });

    console.log("Supabase submission result:", supabaseSuccess);

    // Return true if either submission was successful
    const overallSuccess = googleSuccess || supabaseSuccess;
    console.log("Overall dual submission success:", overallSuccess);

    return overallSuccess;
  } catch (error) {
    console.error("Error in dual submission:", error);
    toast.error("There was a problem submitting your information. Please try again.");
    return false;
  }
};
