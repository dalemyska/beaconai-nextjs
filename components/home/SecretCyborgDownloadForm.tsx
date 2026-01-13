'use client';

import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import SecretCyborgSuccess from "./SecretCyborgSuccess";
import { useState } from "react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitLead } from "@/services/leadService";
import { toast } from "sonner";

const secretCyborgFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().min(1, { message: "Company name is required" }),
  privacy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

type SecretCyborgFormValues = z.infer<typeof secretCyborgFormSchema>;

const SecretCyborgDownloadForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [showDownloadLink, setShowDownloadLink] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SecretCyborgFormValues>({
    resolver: zodResolver(secretCyborgFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      privacy: false,
    },
  });

  const handleSubmit = async (data: SecretCyborgFormValues) => {
    setIsSubmitting(true);

    try {
      const success = await submitLead({
        name: data.name,
        email: data.email,
        company: data.company,
        source: "Secret Cyborg Download",
        metadata: {
          resourceRequested: "Harvard Business Review Article"
        }
      });

      if (success) {
        setIsSuccess(true);
        setTimeout(() => {
          setShowDownloadLink(true);
        }, 1500);
      } else {
        throw new Error("Failed to process download request");
      }
    } catch (error) {
      console.error("Download form error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    window.open('/downloads/secret-cyborgs-hbr.pdf', '_blank');
  };

  const handleDialogClose = () => {
    if (!isSuccess) return;

    setTimeout(() => {
      setIsSuccess(false);
      setShowDownloadLink(false);
      form.reset();
    }, 300);
  };

  return (
    <Dialog onOpenChange={open => {
      if (!open) handleDialogClose();
    }}>
      <DialogTrigger asChild>
        <Button className="mx-auto flex items-center gap-2 bg-beacon-navy hover:bg-beacon-navy/90 transition-all">
          <Download className="w-5 h-5" />
          Download Harvard Business Review Article
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>{isSuccess ? "Thank you!" : "Download HBR Article"}</DialogTitle>
        </DialogHeader>

        {!isSuccess ? (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Please provide your information to access the Harvard Business Review article on Secret Cyborgs.
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your company" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="privacy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the collection and processing of my personal information *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-beacon-teal hover:bg-beacon-teal/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download Article
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-2">
                  We respect your privacy and will never share your information.
                </p>
              </form>
            </Form>
          </>
        ) : (
          showDownloadLink ? (
            <SecretCyborgSuccess onDownload={handleDownload} />
          ) : (
            <div className="py-6 text-center">
              <p className="mb-4">Preparing your download...</p>
              <p className="text-sm text-gray-600">This will just take a moment.</p>
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SecretCyborgDownloadForm;
