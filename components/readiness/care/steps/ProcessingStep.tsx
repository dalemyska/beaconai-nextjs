'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Brain,
  Lightbulb,
  FileText,
  Mail,
  CheckCircle2,
  Loader2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getStageFromStatus, isStageComplete } from '@/hooks/useAssessment';

type AssessmentStatus =
  | 'pending'
  | 'scraping'
  | 'generating_insights'
  | 'generating_solution'
  | 'generating_pdf'
  | 'sending_email'
  | 'completed'
  | 'failed'
  | null;

interface ProcessingStepProps {
  assessmentId?: string;
  status?: AssessmentStatus;
  error?: string | null;
  onComplete?: () => void;
  onRetry?: () => void;
}

const processingStages = [
  {
    icon: Globe,
    label: 'Analyzing your company...',
    description: 'Researching your industry and context',
    statusMatch: ['pending', 'scraping'],
  },
  {
    icon: Brain,
    label: 'Evaluating AI readiness...',
    description: 'Processing your assessment responses',
    statusMatch: ['generating_insights'],
  },
  {
    icon: Lightbulb,
    label: 'Creating recommendations...',
    description: 'Generating personalized insights',
    statusMatch: ['generating_solution'],
  },
  {
    icon: FileText,
    label: 'Building your report...',
    description: 'Compiling your AI Readiness Report',
    statusMatch: ['generating_pdf'],
  },
  {
    icon: Mail,
    label: 'Sending to your inbox...',
    description: 'Delivering your personalized report',
    statusMatch: ['sending_email'],
  },
];

const ProcessingStep = ({ assessmentId, status, error, onComplete, onRetry }: ProcessingStepProps) => {
  const [showFallback, setShowFallback] = useState(false);

  // Determine current stage from status
  const currentStage = getStageFromStatus(status ?? null);
  const completedStages = processingStages
    .map((_, index) => index)
    .filter(index => isStageComplete(status ?? null, index));

  // Calculate progress based on status
  const getProgress = () => {
    if (status === 'completed') return 100;
    if (status === 'failed') return 0;

    const stageProgress: Record<string, number> = {
      'pending': 5,
      'scraping': 15,
      'generating_insights': 35,
      'generating_solution': 55,
      'generating_pdf': 75,
      'sending_email': 90,
    };

    return stageProgress[status || 'pending'] || 0;
  };

  const progress = getProgress();

  // Show fallback message after 60 seconds
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setShowFallback(true);
    }, 60000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // Handle completion
  useEffect(() => {
    if (status === 'completed' && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [status, onComplete]);

  // Error state
  if (status === 'failed' || error) {
    console.log('[Analytics] Event: assessment_processing_failed', { error, assessmentId });

    return (
      <div className="max-w-2xl mx-auto text-center py-8 px-4 sm:px-0" role="alert" aria-live="assertive">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
          <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-destructive" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-4">
          Processing Issue
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-md mx-auto">
          {error || "We encountered an issue processing your assessment. Don't worry - your data is saved."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {onRetry && (
            <Button
              onClick={onRetry}
              className="gap-2 min-h-[44px]"
              aria-label="Retry processing the assessment"
              data-track="processing-retry"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Try Again
            </Button>
          )}
          <Button
            variant="outline"
            className="min-h-[44px] text-sm sm:text-base"
            aria-label="Your report will be emailed within 24 hours"
          >
            Report will be emailed within 24 hours
          </Button>
        </div>
        {assessmentId && (
          <p className="text-xs text-muted-foreground mt-8">
            Reference: {assessmentId.slice(0, 8)}...
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto text-center py-8 px-4 sm:px-0" role="status" aria-live="polite" aria-label="Processing your assessment">
      {/* Animated Brain Illustration */}
      <div className="relative mb-8 sm:mb-10" aria-hidden="true">
        <motion.div
          className="w-24 h-24 sm:w-32 sm:h-32 mx-auto relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {/* Orbiting particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-secondary rounded-full"
              style={{
                top: '50%',
                left: '50%',
              }}
              animate={{
                x: [0, Math.cos((i * 2 * Math.PI) / 3) * 40, 0],
                y: [0, Math.sin((i * 2 * Math.PI) / 3) * 40, 0],
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>

        {/* Center icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
            <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
          </div>
        </motion.div>
      </div>

      {/* Current Stage Highlight */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-6 sm:mb-8"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-2">
            {processingStages[currentStage]?.label}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {processingStages[currentStage]?.description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Overall Progress Bar */}
      <div className="mb-6 sm:mb-8 px-2 sm:px-4" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Processing progress">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%]"
            style={{ width: `${progress}%` }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mt-2">
          {Math.round(progress)}% complete
        </p>
      </div>

      {/* Stage List */}
      <ul className="space-y-2 sm:space-y-3 text-left max-w-md mx-auto" aria-label="Processing stages">
        {processingStages.map((stage, index) => {
          const Icon = stage.icon;
          const isCompleted = completedStages.includes(index);
          const isCurrent = currentStage === index && !isCompleted;

          return (
            <motion.li
              key={stage.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-lg transition-all ${
                isCurrent
                  ? 'bg-primary/10 border border-primary/20'
                  : isCompleted
                    ? 'bg-secondary/10'
                    : 'bg-muted/30'
              }`}
              aria-current={isCurrent ? 'step' : undefined}
            >
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ${
                  isCompleted
                    ? 'bg-secondary text-secondary-foreground'
                    : isCurrent
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                }`}
                aria-hidden="true"
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                ) : (
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <span
                  className={`font-medium text-xs sm:text-sm ${
                    isCompleted
                      ? 'text-secondary'
                      : isCurrent
                        ? 'text-primary'
                        : 'text-muted-foreground'
                  }`}
                >
                  {stage.label.replace('...', '')}
                </span>
              </div>

              {isCompleted && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-secondary font-medium flex-shrink-0"
                  aria-label="Completed"
                >
                  Done
                </motion.span>
              )}
            </motion.li>
          );
        })}
      </ul>

      {/* Fallback Message */}
      <AnimatePresence>
        {showFallback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 sm:mt-8 p-3 sm:p-4 bg-muted/50 rounded-lg border border-border"
            role="status"
          >
            <p className="text-xs sm:text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Taking longer than expected?</span>
              <br />
              Don&apos;t worry, your report will be emailed to you shortly.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Assessment ID indicator */}
      {assessmentId && (
        <p className="text-xs text-muted-foreground mt-6 sm:mt-8">
          Reference: {assessmentId.slice(0, 8)}...
        </p>
      )}
    </div>
  );
};

export default ProcessingStep;
