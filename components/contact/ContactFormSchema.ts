import { z } from "zod";

// Basic phone number validation regex (allows common formats)
const phoneRegex = /^(\+\d{1,3}[-\s]?)?(\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}|\d{10})$/;

// Form schema validation
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string()
    .regex(phoneRegex, { message: "Please enter a valid phone number" })
    .optional()
    .or(z.literal('')),
  company: z.string().min(1, { message: "Company name is required" }),
  role: z.string().optional().or(z.literal('')),
  message: z.string()
    .min(10, { message: "Please provide a message of at least 10 characters" })
    .optional()
    .or(z.literal('')),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
