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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Globe, User, Briefcase, Factory } from 'lucide-react';
import type { AssessmentData } from '../CAREAssessmentWizard';

const industries = [
  { value: 'Healthcare / Medical', label: 'Healthcare / Medical' },
  { value: 'Financial Services / Banking', label: 'Financial Services / Banking' },
  { value: 'Retail / E-commerce', label: 'Retail / E-commerce' },
  { value: 'Manufacturing / Industrial', label: 'Manufacturing / Industrial' },
  { value: 'Technology / Software', label: 'Technology / Software' },
  { value: 'Professional Services / Consulting', label: 'Professional Services / Consulting' },
  { value: 'Education / Training', label: 'Education / Training' },
  { value: 'Hospitality / Travel', label: 'Hospitality / Travel' },
  { value: 'Real Estate / Construction', label: 'Real Estate / Construction' },
  { value: 'Energy / Utilities', label: 'Energy / Utilities' },
  { value: 'Transportation / Logistics', label: 'Transportation / Logistics' },
  { value: 'Media / Entertainment', label: 'Media / Entertainment' },
  { value: 'Nonprofit / Government', label: 'Nonprofit / Government' },
  { value: 'Other', label: 'Other' },
];

interface CompanyInfoStepProps {
  data: AssessmentData;
  updateData: (updates: Partial<AssessmentData>) => void;
  setIsStepValid: (valid: boolean) => void;
}

const formSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, 'Company name is required')
    .max(100, 'Company name must be less than 100 characters'),
  companyWebsite: z
    .string()
    .trim()
    .min(1, 'Website is required')
    .max(255, 'URL must be less than 255 characters')
    .refine((val) => {
      // Allow plain domains like "example.com" or full URLs
      const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
      return urlPattern.test(val);
    }, 'Please enter a valid website (e.g., yourcompany.com)'),
  userName: z
    .string()
    .trim()
    .min(1, 'Your name is required')
    .max(100, 'Name must be less than 100 characters'),
  industry: z
    .string()
    .optional(),
  userRole: z
    .string()
    .min(1, 'Please select your role'),
  customRole: z
    .string()
    .trim()
    .max(100, 'Role must be less than 100 characters')
    .optional(),
}).refine((data) => {
  if (data.userRole === 'Other') {
    return data.customRole && data.customRole.trim().length >= 2;
  }
  return true;
}, { message: 'Please specify your role', path: ['customRole'] });

type FormValues = z.infer<typeof formSchema>;

const roles = [
  { value: 'Founder', label: 'Founder' },
  { value: 'Solopreneur', label: 'Solopreneur / Small Business Owner' },
  { value: 'CEO', label: 'CEO' },
  { value: 'COO', label: 'COO' },
  { value: 'CTO', label: 'CTO' },
  { value: 'CHRO', label: 'CHRO' },
  { value: 'CMO', label: 'CMO' },
  { value: 'Other', label: 'Other' },
];

const CompanyInfoStep = ({ data, updateData, setIsStepValid }: CompanyInfoStepProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: data.companyName || '',
      companyWebsite: data.companyWebsite || '',
      industry: data.industry || '',
      userName: data.userName || '',
      userRole: data.userRole || '',
      customRole: '',
    },
    mode: 'onChange',
  });

  const selectedRole = form.watch('userRole');

  const { isValid } = form.formState;

  // Update parent state when form values change
  useEffect(() => {
    const subscription = form.watch((values) => {
      // Use custom role if "Other" is selected
      const effectiveRole = values.userRole === 'Other'
        ? values.customRole || 'Other'
        : values.userRole || '';

      updateData({
        companyName: values.companyName || '',
        companyWebsite: values.companyWebsite || '',
        industry: values.industry || '',
        userName: values.userName || '',
        userRole: effectiveRole,
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
      <header className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-3">
          Let&apos;s Get Started
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Tell us a bit about yourself and your organization. This information helps us
          personalize your assessment report with relevant industry insights and recommendations.
        </p>
      </header>

      <Card className="border-border">
        <CardContent className="p-4 sm:p-6 md:p-8">
          <Form {...form}>
            <form className="space-y-5 sm:space-y-6" aria-label="Company information form">
              {/* Company Name */}
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-foreground text-sm sm:text-base">
                      <Building2 className="w-4 h-4 text-primary" aria-hidden="true" />
                      Company Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your company name"
                        className="h-11 sm:h-12 text-base"
                        aria-describedby="companyName-error"
                        data-track="input-company-name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage id="companyName-error" />
                  </FormItem>
                )}
              />

              {/* Company Website */}
              <FormField
                control={form.control}
                name="companyWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-foreground text-sm sm:text-base">
                      <Globe className="w-4 h-4 text-primary" aria-hidden="true" />
                      Company Website
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="yourcompany.com"
                        className="h-11 sm:h-12 text-base"
                        aria-describedby="companyWebsite-error"
                        data-track="input-company-website"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage id="companyWebsite-error" />
                  </FormItem>
                )}
              />

              {/* Industry (Optional) */}
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-foreground text-sm sm:text-base">
                      <Factory className="w-4 h-4 text-primary" aria-hidden="true" />
                      Industry
                      <span className="text-xs text-muted-foreground font-normal">(optional)</span>
                    </FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value === '__auto__' ? '' : value)}
                      value={field.value || '__auto__'}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="h-11 sm:h-12 text-base"
                          aria-describedby="industry-description"
                          data-track="input-industry"
                        >
                          <SelectValue placeholder="Auto-detect from website" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="__auto__" className="text-base text-muted-foreground">
                          Auto-detect from website
                        </SelectItem>
                        {industries.map((industry) => (
                          <SelectItem key={industry.value} value={industry.value} className="text-base">
                            {industry.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p id="industry-description" className="text-xs text-muted-foreground">
                      We&apos;ll auto-detect your industry from your website. Select manually if you prefer.
                    </p>
                  </FormItem>
                )}
              />

              {/* User Name */}
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-foreground text-sm sm:text-base">
                      <User className="w-4 h-4 text-primary" aria-hidden="true" />
                      Your Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="h-11 sm:h-12 text-base"
                        autoComplete="name"
                        aria-describedby="userName-error"
                        data-track="input-user-name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage id="userName-error" />
                  </FormItem>
                )}
              />

              {/* User Role */}
              <FormField
                control={form.control}
                name="userRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-foreground text-sm sm:text-base">
                      <Briefcase className="w-4 h-4 text-primary" aria-hidden="true" />
                      Your Role
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger
                          className="h-11 sm:h-12 text-base"
                          aria-describedby="userRole-error"
                          data-track="input-user-role"
                        >
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.value} value={role.value} className="text-base">
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage id="userRole-error" />
                  </FormItem>
                )}
              />

              {/* Custom Role Input - shows when "Other" is selected */}
              {selectedRole === 'Other' && (
                <FormField
                  control={form.control}
                  name="customRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-foreground text-sm sm:text-base">
                        <Briefcase className="w-4 h-4 text-primary" aria-hidden="true" />
                        Please Specify Your Role
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., VP of Innovation, Product Manager"
                          className="h-11 sm:h-12 text-base"
                          aria-describedby="customRole-error"
                          data-track="input-custom-role"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage id="customRole-error" />
                    </FormItem>
                  )}
                />
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Privacy Note */}
      <p className="text-xs text-muted-foreground text-center mt-4 px-2">
        Your information is kept confidential and used only to personalize your assessment.
      </p>
    </div>
  );
};

export default CompanyInfoStep;
