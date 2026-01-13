'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, FileText, BarChart3, Lightbulb, Shield, CheckCircle } from 'lucide-react';
import type { AssessmentData } from '../CAREAssessmentWizard';

interface EmailStepProps {
  data: AssessmentData;
  updateData: (updates: Partial<AssessmentData>) => void;
  setIsStepValid: (valid: boolean) => void;
}

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  consent: z
    .boolean()
    .refine((val) => val === true, 'You must agree to receive your report'),
});

type FormValues = z.infer<typeof formSchema>;

const reportBenefits = [
  {
    icon: BarChart3,
    title: 'Your CARE Score',
    description: 'Detailed breakdown across all 4 pillars',
  },
  {
    icon: Lightbulb,
    title: 'Custom Recommendations',
    description: 'Actionable steps tailored to your results',
  },
  {
    icon: FileText,
    title: 'PDF Report',
    description: 'Professional document to share with your team',
  },
];

const EmailStep = ({ data, updateData, setIsStepValid }: EmailStepProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: data.email || '',
      consent: data.consent || false,
    },
    mode: 'onChange',
  });

  const { isValid } = form.formState;

  // Update parent state when form values change
  useEffect(() => {
    const subscription = form.watch((values) => {
      updateData({
        email: values.email || '',
        consent: values.consent || false,
      });
    });
    return () => subscription.unsubscribe();
  }, [form, updateData]);

  // Notify parent about form validity
  useEffect(() => {
    setIsStepValid(isValid);
  }, [isValid, setIsStepValid]);

  return (
    <div className="max-w-xl mx-auto pb-24 px-4 sm:px-0">
      {/* Header */}
      <header className="text-center mb-8">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-secondary-foreground" aria-hidden="true" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-4">
          Your Report is Almost Ready!
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
          Enter your email to receive your comprehensive AI Readiness Report
          with personalized insights and actionable recommendations.
        </p>
      </header>

      {/* What You Get */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8" role="list" aria-label="Report benefits">
        {reportBenefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 bg-primary/5 rounded-xl"
              role="listitem"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3" aria-hidden="true">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-semibold text-primary text-sm mb-1">
                {benefit.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Form Card */}
      <Card className="border-2 border-secondary/20 shadow-lg">
        <CardContent className="p-4 sm:p-6 md:p-8">
          <Form {...form}>
            <form className="space-y-5 sm:space-y-6" aria-label="Email submission form">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-foreground text-sm sm:text-base">
                      <Mail className="w-4 h-4 text-primary" aria-hidden="true" />
                      Work Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@company.com"
                        className="h-11 sm:h-12 text-base"
                        autoComplete="email"
                        aria-describedby="email-error"
                        data-track="input-email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage id="email-error" />
                  </FormItem>
                )}
              />

              {/* Consent Checkbox */}
              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1 min-w-[20px] min-h-[20px]"
                        aria-describedby="consent-error"
                        data-track="input-consent"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-xs sm:text-sm font-normal text-foreground cursor-pointer">
                        I agree to receive my AI Readiness Report and follow-up insights
                        and consultation opportunities from beaconAI
                      </FormLabel>
                      <FormMessage id="consent-error" />
                    </div>
                  </FormItem>
                )}
              />

              {/* Privacy Note */}
              <div className="flex items-start gap-3 p-3 sm:p-4 bg-muted/50 rounded-lg border border-border">
                <Shield className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs sm:text-sm text-muted-foreground">
                  We respect your privacy. Your information will never be sold
                  or shared with third parties.
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Trust Indicators */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-6 text-xs sm:text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4 text-secondary" aria-hidden="true" />
          <span>Free report</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4 text-secondary" aria-hidden="true" />
          <span>No credit card</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4 text-secondary" aria-hidden="true" />
          <span>Instant delivery</span>
        </div>
      </div>
    </div>
  );
};

export default EmailStep;
