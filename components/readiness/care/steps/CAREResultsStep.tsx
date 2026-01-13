'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  Brain,
  Rocket,
  TrendingUp,
  Download,
  Calendar,
  ArrowRight,
  Mail,
  Phone,
  ExternalLink,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Building2
} from 'lucide-react';
import type { AssessmentData } from '../CAREAssessmentWizard';

// Minimal assessment data needed for results display
interface MinimalAssessment {
  culture_score?: number | null;
  adoption_score?: number | null;
  readiness_score?: number | null;
  evolution_score?: number | null;
  overall_score?: number | null;
  pdf_url?: string | null;
  email_sent_at?: string | null;
  user_email?: string | null;
  company_name?: string;
  email_sent?: boolean;
  detected_industry?: string | null;
}

interface ResultsStepProps {
  data: AssessmentData;
  assessment?: MinimalAssessment | null;
  onRestart?: () => void;
  userRole?: string;
}

const pillarConfig = {
  culture: {
    icon: Users,
    title: 'Culture',
    description: 'Leadership alignment & innovation mindset',
    color: 'hsl(var(--chart-1))',
    bgClass: 'bg-[hsl(var(--chart-1))]',
    textClass: 'text-[hsl(var(--chart-1))]',
  },
  adoption: {
    icon: Brain,
    title: 'Adoption',
    description: 'Current AI usage & governance',
    color: 'hsl(var(--chart-2))',
    bgClass: 'bg-[hsl(var(--chart-2))]',
    textClass: 'text-[hsl(var(--chart-2))]',
  },
  readiness: {
    icon: Rocket,
    title: 'Readiness',
    description: 'Skills & training infrastructure',
    color: 'hsl(var(--chart-3))',
    bgClass: 'bg-[hsl(var(--chart-3))]',
    textClass: 'text-[hsl(var(--chart-3))]',
  },
  evolution: {
    icon: TrendingUp,
    title: 'Evolution',
    description: 'Strategic vision & roadmap',
    color: 'hsl(var(--chart-4))',
    bgClass: 'bg-[hsl(var(--chart-4))]',
    textClass: 'text-[hsl(var(--chart-4))]',
  },
};

const getScoreLabel = (score: number) => {
  if (score >= 80) return { label: 'Leader', color: 'text-emerald-500', bg: 'bg-emerald-500/10' };
  if (score >= 60) return { label: 'Advancing', color: 'text-blue-500', bg: 'bg-blue-500/10' };
  if (score >= 40) return { label: 'Developing', color: 'text-amber-500', bg: 'bg-amber-500/10' };
  return { label: 'Emerging', color: 'text-orange-500', bg: 'bg-orange-500/10' };
};

const getRecommendations = (scores: NonNullable<AssessmentData['scores']>, userRole?: string) => {
  const recommendations: string[] = [];
  const isSmallBusiness = userRole === 'Founder' || userRole === 'Solopreneur';

  if (isSmallBusiness) {
    if (scores.culture < 60) {
      recommendations.push('Start with one AI tool that automates your most time-consuming task - tools like ChatGPT, Notion AI, or Zapier can deliver quick wins without a big investment.');
    }
    if (scores.adoption < 60) {
      recommendations.push('Pick your biggest bottleneck and find an AI solution for it. Focus on tools with free tiers that you can test before committing.');
    }
    if (scores.readiness < 60) {
      recommendations.push('Dedicate 30 minutes weekly to learning AI basics through free resources like YouTube tutorials or vendor documentation.');
    }
    if (scores.evolution < 60) {
      recommendations.push('Set a simple 6-month goal: identify 3 tasks AI could handle, then implement one. Build your AI capability gradually.');
    }
  } else {
    if (scores.culture < 60) {
      recommendations.push('Foster a culture of innovation by starting with pilot AI projects that demonstrate quick wins.');
    }
    if (scores.adoption < 60) {
      recommendations.push('Identify 2-3 high-impact use cases for AI adoption and create a structured implementation plan.');
    }
    if (scores.readiness < 60) {
      recommendations.push('Invest in data infrastructure and establish clear AI governance policies.');
    }
    if (scores.evolution < 60) {
      recommendations.push('Develop a 2-3 year AI roadmap with clear milestones and success metrics.');
    }
  }

  if (recommendations.length === 0) {
    if (isSmallBusiness) {
      recommendations.push('You\'re ahead of most small businesses in AI readiness. Consider becoming a case study or advisor for others in your space.');
      recommendations.push('Look into advanced AI tools that could give you a competitive edge in your industry.');
    } else {
      recommendations.push('Continue building on your strong foundation by exploring advanced AI capabilities.');
      recommendations.push('Consider becoming an AI leader in your industry by sharing best practices.');
    }
  }

  return recommendations;
};

// Industry-specific recommendations
const getIndustryRecommendations = (industry: string): string[] => {
  const recommendations: Record<string, string[]> = {
    'Healthcare / Medical': [
      'Consider AI-powered patient scheduling to reduce no-shows by 20-30%',
      'Explore clinical documentation automation to save provider time',
      'Implement HIPAA-compliant chatbots for patient FAQs and triage'
    ],
    'Financial Services / Banking': [
      'Implement fraud detection AI for real-time transaction monitoring',
      'Automate document processing for loan applications and KYC',
      'Deploy customer service chatbots with regulatory compliance'
    ],
    'Retail / E-commerce': [
      'Use AI-driven product recommendations to increase average order value',
      'Implement demand forecasting to optimize inventory and reduce stockouts',
      'Deploy customer service automation to handle common inquiries'
    ],
    'Manufacturing / Industrial': [
      'Implement predictive maintenance to reduce unplanned downtime by 25-40%',
      'Use AI-powered quality control to catch defects earlier in production',
      'Optimize supply chain with demand forecasting and routing AI'
    ],
    'Technology / Software': [
      'Accelerate development with AI-powered code review and assistance',
      'Reduce QA time 30-50% with automated testing tools',
      'Improve customer support with AI-powered ticket routing and responses'
    ],
    'Professional Services / Consulting': [
      'Automate document review and contract analysis to save billable hours',
      'Use AI research assistants to accelerate project delivery',
      'Implement knowledge management AI to surface relevant expertise'
    ],
    'Education / Training': [
      'Create personalized learning paths to improve student outcomes',
      'Automate grading for objective assessments to free instructor time',
      'Deploy 24/7 student support chatbots for common questions'
    ],
    'Hospitality / Travel': [
      'Optimize revenue with AI-powered dynamic pricing (5-15% improvement)',
      'Improve guest satisfaction with AI concierge and service chatbots',
      'Use demand forecasting for staffing and inventory optimization'
    ],
  };
  return recommendations[industry] || [];
};

const CAREResultsStep = ({ data, assessment, onRestart, userRole }: ResultsStepProps) => {
  const [pdfTimedOut, setPdfTimedOut] = useState(false);

  // Use scores from assessment if available, otherwise calculate from local data
  const scores = assessment ? {
    culture: assessment.culture_score || 0,
    adoption: assessment.adoption_score || 0,
    readiness: assessment.readiness_score || 0,
    evolution: assessment.evolution_score || 0,
    overall: assessment.overall_score || 0,
  } : data.scores || {
    culture: 0,
    adoption: 0,
    readiness: 0,
    evolution: 0,
    overall: 0,
  };

  const overallStatus = getScoreLabel(scores.overall);

  // Use userRole prop or fallback to data.userRole
  const effectiveRole = userRole || data.userRole;
  const recommendations = getRecommendations(scores, effectiveRole);

  // Get detected industry and industry-specific recommendations
  const detectedIndustry = assessment?.detected_industry;
  const industryRecommendations = detectedIndustry ? getIndustryRecommendations(detectedIndustry) : [];

  // Get PDF URL from assessment
  const pdfUrl = assessment?.pdf_url;
  const userEmail = assessment?.user_email || data.email;
  const companyName = assessment?.company_name || data.companyName;

  // Timeout for PDF generation - show fallback message after 45 seconds
  useEffect(() => {
    if (pdfUrl) {
      setPdfTimedOut(false);
      return;
    }

    const timeout = setTimeout(() => {
      if (!pdfUrl) {
        setPdfTimedOut(true);
      }
    }, 45000);

    return () => clearTimeout(timeout);
  }, [pdfUrl]);

  const handleScheduleCall = () => {
    console.log('[Analytics] Event: schedule_call_clicked');
    window.open('https://app.usemotion.com/meet/dalemyska/linkedin', '_blank');
  };

  const handleLearnMore = () => {
    console.log('[Analytics] Event: learn_more_clicked');
    window.open('https://www.beaconai.ai', '_blank');
  };

  const handleDownloadReport = () => {
    console.log('[Analytics] Event: download_report_clicked', { hasPdf: !!pdfUrl });
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    } else {
      console.log('PDF not yet available');
    }
  };

  const handleRestart = () => {
    console.log('[Analytics] Event: restart_assessment');
    if (onRestart) {
      onRestart();
    } else {
      window.location.reload();
    }
  };

  // Log completion
  console.log('[Analytics] Event: assessment_completed', {
    overallScore: scores.overall,
    cultureScore: scores.culture,
    adoptionScore: scores.adoption,
    readinessScore: scores.readiness,
    evolutionScore: scores.evolution
  });

  return (
    <div className="max-w-3xl mx-auto pb-20 px-4 sm:px-0" role="main" aria-label="Assessment results">
      {/* Success Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4"
          aria-hidden="true"
        >
          <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-secondary-foreground" />
        </motion.div>
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-primary mb-3">
          Your AI Readiness Assessment is Complete!
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
          {companyName}&apos;s personalized CARE analysis is ready
        </p>
      </motion.header>

      {/* Overall Score Card */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        aria-labelledby="overall-score-heading"
      >
        <Card className="mb-8 overflow-hidden border-2 border-primary/20">
          <div className="bg-gradient-to-br from-primary to-primary/80 p-6 sm:p-8 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4" aria-hidden="true">
              <Sparkles className="w-6 h-6 text-primary-foreground/30" />
            </div>
            <div className="absolute bottom-4 left-4" aria-hidden="true">
              <Sparkles className="w-4 h-4 text-primary-foreground/20" />
            </div>

            <p id="overall-score-heading" className="text-primary-foreground/80 mb-2 text-xs sm:text-sm uppercase tracking-wider">
              Overall AI Readiness Score
            </p>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="text-5xl sm:text-6xl md:text-8xl font-bold text-primary-foreground mb-3"
              aria-label={`Your overall score is ${scores.overall} percent`}
            >
              {scores.overall}%
            </motion.div>
            <span className={`inline-block px-4 py-1.5 rounded-full bg-background/20 text-primary-foreground font-medium text-sm sm:text-base`}>
              {overallStatus.label}
            </span>
          </div>
        </Card>
      </motion.section>

      {/* Score Breakdown - Visual Progress Bars */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-xl font-bold text-primary mb-4">Score Breakdown</h2>
        <Card>
          <CardContent className="p-6 space-y-6">
            {(Object.keys(pillarConfig) as Array<keyof typeof pillarConfig>).map((key, index) => {
              const config = pillarConfig[key];
              const score = scores[key];
              const Icon = config.icon;
              const status = getScoreLabel(score);

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${config.bgClass} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{config.title}</p>
                        <p className="text-xs text-muted-foreground">{config.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">{score}%</span>
                      <span className={`block text-xs ${status.color}`}>{status.label}</span>
                    </div>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
                      className={`h-full ${config.bgClass} rounded-full`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>

      {/* Industry-Specific Opportunities */}
      {detectedIndustry && detectedIndustry !== 'Other' && industryRecommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            AI Opportunities in {detectedIndustry}
          </h2>
          <Card className="bg-secondary/5 border-secondary/20">
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-4">
                Based on your industry, here are high-impact AI applications to consider:
              </p>
              <ul className="space-y-3">
                {industryRecommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-xl font-bold text-primary mb-4">Key Recommendations</h2>
        <Card>
          <CardContent className="p-6">
            <ul className="space-y-4">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-secondary">{index + 1}</span>
                  </div>
                  <span className="text-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Download Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-8"
      >
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <Download className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-bold text-primary mb-2">
              Download Your Full Report
            </h3>
            <p className="text-muted-foreground mb-4">
              Get your comprehensive AI Readiness Report with detailed insights and action items.
            </p>
            <Button
              onClick={handleDownloadReport}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 mb-3"
              size="lg"
              disabled={!pdfUrl && !pdfTimedOut}
            >
              <Download className="w-5 h-5" />
              {pdfUrl ? 'Download PDF Report' : pdfTimedOut ? 'Report will be emailed' : 'Report Generating...'}
            </Button>
            {assessment?.email_sent && assessment?.email_sent_at ? (
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Email delivered to <span className="font-medium text-foreground">{userEmail}</span> at{' '}
                <span className="font-medium">
                  {new Date(assessment.email_sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </p>
            ) : (
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                A copy will be sent to <span className="font-medium text-foreground">{userEmail}</span>
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* CTA Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid md:grid-cols-2 gap-4 mb-8"
      >
        {/* Schedule Strategy Session */}
        <Card className="border-2 border-secondary/30 hover:border-secondary/50 transition-colors">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">
              Schedule a Strategy Session
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Discuss your results with an AI implementation expert and create your personalized roadmap.
            </p>
            <Button
              onClick={handleScheduleCall}
              className="w-full gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Learn More */}
        <Card className="border-2 border-primary/30 hover:border-primary/50 transition-colors">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
              <ExternalLink className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">
              Learn More About beaconAI
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Explore our AI consulting services and see how we help organizations transform with AI.
            </p>
            <Button
              onClick={handleLearnMore}
              variant="outline"
              className="w-full gap-2 border-primary text-primary hover:bg-primary/10"
            >
              Visit beaconAI.ai
              <ExternalLink className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mb-8"
      >
        <Card className="bg-muted/50">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-primary mb-4 text-center">
              Questions? Let&apos;s Connect
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="mailto:dale@beaconai.ai"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <span>dale@beaconai.ai</span>
              </a>
              <a
                href="tel:+13038774292"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <span>+1 (303) 877-4292</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Start New Assessment */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center"
      >
        <Button
          onClick={handleRestart}
          variant="ghost"
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="w-4 h-4" />
          Start New Assessment
        </Button>
      </motion.div>
    </div>
  );
};

export default CAREResultsStep;
