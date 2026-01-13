'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NewsletterSignupProps {
  variant?: 'card' | 'inline' | 'minimal';
  className?: string;
}

export const NewsletterSignup = ({ variant = 'card', className = '' }: NewsletterSignupProps) => {
  const router = useRouter();

  const handleSignup = () => {
    router.push('/contact');
  };

  if (variant === 'minimal') {
    return (
      <Button
        onClick={handleSignup}
        variant="outline"
        size="sm"
        className={`gap-2 ${className}`}
      >
        <Mail className="w-4 h-4" />
        Newsletter
        <ArrowRight className="w-3 h-3" />
      </Button>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-4 p-4 bg-primary/5 rounded-lg border ${className}`}>
        <div className="flex-1">
          <h4 className="font-semibold mb-1">Stay Updated with AI Insights</h4>
          <p className="text-sm text-muted-foreground">
            Contact us to subscribe to our newsletter with AI strategies and tips.
          </p>
        </div>
        <Button onClick={handleSignup} className="gap-2 shrink-0">
          <Mail className="w-4 h-4" />
          Contact Us
          <ArrowRight className="w-3 h-3" />
        </Button>
      </div>
    );
  }

  return (
    <Card className={`bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 ${className}`}>
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Mail className="w-6 h-6 text-primary" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">
          AI Strategy Insights Newsletter
        </h3>
        <p className="text-muted-foreground mb-6">
          Contact us to subscribe to our newsletter with practical AI implementation strategies, real-world case studies, and executive insights.
        </p>
        <Button onClick={handleSignup} size="lg" className="gap-2">
          <Mail className="w-4 h-4" />
          Contact Us to Subscribe
          <ArrowRight className="w-4 h-4" />
        </Button>
        <p className="text-xs text-muted-foreground mt-3">
          Reach out and mention newsletter signup in your message
        </p>
      </CardContent>
    </Card>
  );
};
