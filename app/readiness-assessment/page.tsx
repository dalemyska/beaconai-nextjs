import type { Metadata } from 'next';
import CAREAssessmentWizard from '@/components/readiness/care/CAREAssessmentWizard';

export const metadata: Metadata = {
  title: 'AI Readiness Assessment | CARE Framework | beaconAI',
  description: 'Discover your organization\'s AI readiness score with beaconAI\'s CARE Framework assessment. Get actionable insights in just 5 minutes.',
  keywords: 'AI readiness, AI assessment, CARE framework, AI transformation, digital transformation, AI consulting',
  openGraph: {
    type: 'website',
    title: 'AI Readiness Assessment | beaconAI',
    description: 'Discover your organization\'s AI readiness score. Get personalized insights and actionable recommendations in just 5 minutes.',
    url: 'https://beaconai.ai/readiness-assessment',
    siteName: 'beaconAI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Readiness Assessment | beaconAI',
    description: 'Discover your organization\'s AI readiness score. Get personalized insights and actionable recommendations in just 5 minutes.',
  },
  alternates: {
    canonical: 'https://beaconai.ai/readiness-assessment',
  },
};

export default function ReadinessAssessmentPage() {
  return <CAREAssessmentWizard />;
}
