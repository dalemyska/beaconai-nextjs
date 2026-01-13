'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Brain, Users, Rocket, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CARELandingStepProps {
  onStart: () => void;
}

const pillars = [
  {
    letter: 'C',
    title: 'Culture',
    description: "How ready is your organization's culture for AI transformation?",
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    letter: 'A',
    title: 'Adoption',
    description: 'What\'s your current level of AI tool adoption and integration?',
    icon: Brain,
    color: 'bg-amber-500',
  },
  {
    letter: 'R',
    title: 'Readiness',
    description: 'Do you have the infrastructure and processes to support AI?',
    icon: Rocket,
    color: 'bg-emerald-500',
  },
  {
    letter: 'E',
    title: 'Evolution',
    description: 'How prepared are you for continuous AI advancement?',
    icon: TrendingUp,
    color: 'bg-purple-500',
  },
];

const benefits = [
  'Personalized AI readiness score',
  'Actionable recommendations',
  'Industry benchmarking insights',
  'Strategic next steps',
];

const CARELandingStep = ({ onStart }: CARELandingStepProps) => {
  const handleStart = () => {
    console.log('[Analytics] Event: assessment_started');
    onStart();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-0">
      {/* Hero Section */}
      <section className="text-center mb-12" aria-labelledby="hero-heading">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
            Free AI Readiness Assessment
          </span>
        </motion.div>

        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight"
        >
          Is Your Organization Ready for{' '}
          <span className="text-secondary">AI?</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          Discover your AI readiness score with our comprehensive CARE Framework assessment.
          Get personalized insights and actionable recommendations in just 5 minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={handleStart}
            className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base sm:text-lg px-8 py-6 min-h-[56px] w-full sm:w-auto focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            aria-label="Start the AI Readiness Assessment"
            data-track="start-assessment"
          >
            Start Assessment
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Button>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm">Takes only 5 minutes</span>
          </div>
        </motion.div>
      </section>

      {/* CARE Framework Pillars */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-12"
        aria-labelledby="care-heading"
      >
        <h2 id="care-heading" className="text-xl sm:text-2xl font-bold text-center text-primary mb-8">
          The CARE Framework
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.letter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-border">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 ${pillar.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    aria-hidden="true"
                  >
                    <span className="text-xl sm:text-2xl font-bold text-white">
                      {pillar.letter}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-primary mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Benefits */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-primary/5 rounded-2xl p-6 sm:p-8"
        aria-labelledby="benefits-heading"
      >
        <h3 id="benefits-heading" className="text-lg sm:text-xl font-bold text-primary text-center mb-6">
          What You&apos;ll Receive
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto" role="list">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" aria-hidden="true" />
              <span className="text-sm sm:text-base text-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </motion.section>
    </div>
  );
};

export default CARELandingStep;
