'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2, AlertTriangle, Mail, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  submitAssessment as submitAssessmentToDb,
  verifyServiceHealth,
  captureLeadFallback
} from '@/services/assessmentService';
import { useAssessment } from '@/hooks/useAssessment';
import CARELandingStep from './steps/CARELandingStep';
import CompanyInfoStep from './steps/CompanyInfoStep';
import AssessmentStep from './steps/AssessmentStep';
import EmailStep from './steps/EmailStep';
import ProcessingStep from './steps/ProcessingStep';
import ResultsStep from './steps/CAREResultsStep';

export interface AssessmentData {
  // Company Info
  companyName: string;
  companyWebsite: string;
  industry: string;
  userName: string;
  userRole: string;

  // Assessment answers (CARE framework)
  culture: Record<string, number>;
  adoption: Record<string, number>;
  readiness: Record<string, number>;
  evolution: Record<string, number>;

  // Contact
  email: string;
  consent: boolean;

  // Results
  scores?: {
    culture: number;
    adoption: number;
    readiness: number;
    evolution: number;
    overall: number;
  };
}

const initialData: AssessmentData = {
  companyName: '',
  companyWebsite: '',
  industry: '',
  userName: '',
  userRole: '',
  culture: {},
  adoption: {},
  readiness: {},
  evolution: {},
  email: '',
  consent: false
};

const steps = [{
  id: 'landing',
  label: 'Welcome'
}, {
  id: 'company',
  label: 'Company Info'
}, {
  id: 'assessment',
  label: 'Assessment'
}, {
  id: 'email',
  label: 'Your Details'
}, {
  id: 'processing',
  label: 'Analyzing'
}, {
  id: 'results',
  label: 'Results'
}];

const STORAGE_KEY = 'care_assessment_draft';
const MAX_RETRIES = 3;
const RETRY_DELAYS = [2000, 4000, 8000]; // Exponential backoff

const CAREAssessmentWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<AssessmentData>(initialData);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stepValidity, setStepValidity] = useState<Record<number, boolean>>({});
  const [showRecoveryDialog, setShowRecoveryDialog] = useState(false);
  const [lastError, setLastError] = useState<string>('');
  const [isCapturingFallback, setIsCapturingFallback] = useState(false);

  // Unique session ID for tracking and debugging
  const sessionId = useMemo(() => crypto.randomUUID(), []);

  // Use the assessment hook for real-time updates
  const {
    assessmentId,
    assessment,
    status,
    error: assessmentError,
    startProcessing,
    retry
  } = useAssessment({
    onComplete: () => {
      console.log(`[Assessment][${sessionId}] Completed, navigating to results`);
      clearSavedDraft();
      setCurrentStep(5);
    },
    onError: error => {
      console.error(`[Assessment][${sessionId}] Error:`, error);
      toast.error('There was an issue processing your assessment. You can retry or your report will be emailed within 24 hours.');
    }
  });

  // Auto-save to localStorage on data changes
  useEffect(() => {
    if (currentStep > 0 && currentStep < 4) {
      const draft = {
        data,
        currentStep,
        savedAt: new Date().toISOString(),
        sessionId
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
      console.log(`[Assessment][${sessionId}] Auto-saved draft at step ${currentStep}`);
    }
  }, [data, currentStep, sessionId]);

  // Restore from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { data: savedData, currentStep: savedStep, savedAt } = JSON.parse(saved);
        const savedDate = new Date(savedAt);
        const hoursSinceSave = (Date.now() - savedDate.getTime()) / (1000 * 60 * 60);

        // Only restore if saved within last 24 hours
        if (hoursSinceSave < 24 && savedData.companyName) {
          setData(savedData);
          setCurrentStep(savedStep);
          toast.info('Restored your previous progress', { duration: 4000 });
          console.log(`[Assessment][${sessionId}] Restored draft from ${savedAt}`);
        } else {
          clearSavedDraft();
        }
      } catch (e) {
        console.error('Failed to restore draft:', e);
        clearSavedDraft();
      }
    }
  }, [sessionId]);

  // Check service health on email step
  useEffect(() => {
    if (currentStep === 3) {
      verifyServiceHealth().then(healthy => {
        if (!healthy) {
          toast.warning('Our servers are experiencing high load. Submission may take longer than usual.', { duration: 5000 });
        }
      });
    }
  }, [currentStep]);

  const clearSavedDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateData = useCallback((updates: Partial<AssessmentData>) => {
    setData(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  const setIsStepValid = useCallback((stepIndex: number, valid: boolean) => {
    setStepValidity(prev => ({
      ...prev,
      [stepIndex]: valid
    }));
  }, []);

  // Memoized callbacks for each step to prevent infinite re-renders
  const setStep1Valid = useCallback((valid: boolean) => {
    setStepValidity(prev => ({ ...prev, 1: valid }));
  }, []);

  const setStep3Valid = useCallback((valid: boolean) => {
    setStepValidity(prev => ({ ...prev, 3: valid }));
  }, []);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const startAssessment = () => {
    setCurrentStep(1);
  };

  const handleRestart = useCallback(() => {
    clearSavedDraft();
    setCurrentStep(0);
    setData(initialData);
    setStepValidity({});
    setShowRecoveryDialog(false);
  }, []);

  // Submit with retry logic
  const submitWithRetry = async (
    submissionData: Parameters<typeof submitAssessmentToDb>[0],
    maxRetries = MAX_RETRIES
  ): Promise<string> => {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`[Assessment][${sessionId}] Submission attempt ${attempt}/${maxRetries}`);
        const id = await submitAssessmentToDb(submissionData);
        console.log(`[Assessment][${sessionId}] Attempt ${attempt} succeeded with ID: ${id}`);
        return id;
      } catch (error: unknown) {
        lastError = error instanceof Error ? error : new Error(String(error));
        console.error(`[Assessment][${sessionId}] Attempt ${attempt} failed:`, error);

        if (attempt < maxRetries) {
          const delay = RETRY_DELAYS[attempt - 1] || 8000;
          console.log(`[Assessment][${sessionId}] Waiting ${delay}ms before retry...`);
          await new Promise(r => setTimeout(r, delay));
        }
      }
    }

    throw lastError || new Error('All submission attempts failed');
  };

  const handleSubmitAssessment = async () => {
    // Flatten responses
    const flatResponses: Record<string, number> = {
      ...data.culture,
      ...data.adoption,
      ...data.readiness,
      ...data.evolution,
    };

    // Validate all 12 required questions are answered
    const requiredQuestions = ['C1', 'C2', 'C3', 'A1', 'A2', 'A3', 'R1', 'R2', 'R3', 'E1', 'E2', 'E3'];
    const missingQuestions = requiredQuestions.filter(q => flatResponses[q] === undefined);

    if (missingQuestions.length > 0) {
      console.error(`[Assessment][${sessionId}] Missing answers:`, missingQuestions);
      toast.error('Some questions were not answered. Please go back and complete all questions.');
      setCurrentStep(2);
      return;
    }

    console.log(`[Assessment][${sessionId}] Starting submission:`, {
      responseCount: Object.keys(flatResponses).length,
      user: { name: data.userName, email: data.email, company: data.companyName }
    });

    setCurrentStep(4); // Processing step
    setIsProcessing(true);
    setLastError('');

    const submissionData = {
      user_name: data.userName,
      user_email: data.email,
      company_name: data.companyName,
      company_website: data.companyWebsite.startsWith('http') ? data.companyWebsite : `https://${data.companyWebsite}`,
      industry: data.industry || undefined,
      user_role: data.userRole,
      responses: flatResponses,
      status: 'pending'
    };

    try {
      const id = await submitWithRetry(submissionData);
      console.log(`[Assessment][${sessionId}] Submitted successfully with ID: ${id}`);
      clearSavedDraft();
      startProcessing(id);
    } catch (error: unknown) {
      console.error(`[Assessment][${sessionId}] All submission attempts failed:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setLastError(errorMessage);
      setShowRecoveryDialog(true);
      setIsProcessing(false);
    }
  };

  const handleFallbackCapture = async () => {
    setIsCapturingFallback(true);

    const flatResponses: Record<string, number> = {
      ...data.culture,
      ...data.adoption,
      ...data.readiness,
      ...data.evolution,
    };

    const success = await captureLeadFallback({
      email: data.email,
      name: data.userName,
      company: data.companyName,
      website: data.companyWebsite,
      role: data.userRole,
      responses: flatResponses,
      session_id: sessionId,
      error_message: lastError
    });

    setIsCapturingFallback(false);
    setShowRecoveryDialog(false);

    if (success) {
      clearSavedDraft();
      toast.success('Your information has been saved. You will receive your results via email within 24 hours.', { duration: 8000 });
      // Show a simplified confirmation state
      setCurrentStep(0);
    } else {
      toast.error('Unable to save your information. Please contact dale@beaconai.ai directly.');
    }
  };

  const handleRetryFromDialog = () => {
    setShowRecoveryDialog(false);
    handleSubmitAssessment();
  };

  const handleRetry = useCallback(() => {
    retry();
  }, [retry]);

  const handleProcessingComplete = useCallback(() => {
    setCurrentStep(5);
  }, []);

  // Update data with scores from assessment when completed
  const displayData = assessment ? {
    ...data,
    scores: {
      culture: assessment.culture_score || 0,
      adoption: assessment.adoption_score || 0,
      readiness: assessment.readiness_score || 0,
      evolution: assessment.evolution_score || 0,
      overall: assessment.overall_score || 0
    }
  } : data;

  // Create a minimal assessment object for the results step
  const assessmentForResults = assessment ? {
    culture_score: assessment.culture_score,
    adoption_score: assessment.adoption_score,
    readiness_score: assessment.readiness_score,
    evolution_score: assessment.evolution_score,
    overall_score: assessment.overall_score,
    pdf_url: assessment.pdf_url,
    email_sent_at: assessment.email_sent_at,
    user_email: assessment.user_email || data.email,
    company_name: data.companyName,
    email_sent: !!assessment.email_sent_at,
  } : null;

  const progress = currentStep === 0 ? 0 : currentStep / (steps.length - 1) * 100;

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <CARELandingStep onStart={startAssessment} />;
      case 1:
        return <CompanyInfoStep data={data} updateData={updateData} setIsStepValid={setStep1Valid} />;
      case 2:
        return <AssessmentStep data={data} updateData={updateData} onBack={prevStep} onContinue={nextStep} />;
      case 3:
        return <EmailStep data={data} updateData={updateData} setIsStepValid={setStep3Valid} />;
      case 4:
        return <ProcessingStep assessmentId={assessmentId || undefined} status={status} error={assessmentError} onComplete={handleProcessingComplete} onRetry={handleRetry} />;
      case 5:
        return <ResultsStep data={displayData} assessment={assessmentForResults} onRestart={handleRestart} userRole={data.userRole} />;
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return stepValidity[1] === true;
      case 2:
        const totalQuestions = Object.keys(data.culture).length + Object.keys(data.adoption).length + Object.keys(data.readiness).length + Object.keys(data.evolution).length;
        return totalQuestions >= 12;
      case 3:
        return stepValidity[3] === true;
      default:
        return true;
    }
  };

  const showNavigation = currentStep > 0 && currentStep < 4 && currentStep !== 2;

  return (
    <div className="min-h-screen bg-background flex flex-col" role="main" aria-label="AI Readiness Assessment">
      {/* Skip Link for Accessibility */}
      <a href="#assessment-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md">
        Skip to content
      </a>

      {/* Progress Bar */}
      {currentStep > 0 && currentStep < 5 && (
        <div className="border-b border-border" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Assessment progress">
          <div className="container-custom py-3">
            <div className="flex items-center gap-4">
              <Progress value={progress} className="h-2 flex-1" />
              <span className="text-sm font-medium text-muted-foreground min-w-[3rem]" aria-hidden="true">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="flex justify-between mt-2">
              {steps.slice(1, -1).map((step, index) => (
                <span
                  key={step.id}
                  className={`text-xs font-medium transition-colors ${index + 1 <= currentStep ? 'text-primary' : 'text-muted-foreground'}`}
                  aria-current={index + 1 === currentStep ? 'step' : undefined}
                >
                  {step.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <main id="assessment-content" className="container-custom py-8 md:py-12 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation */}
      {showNavigation && (
        <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border" aria-label="Assessment navigation">
          <div className="container-custom py-4">
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep <= 1}
                className="gap-2 min-h-[44px] min-w-[100px]"
                aria-label="Go to previous step"
                data-track="assessment-back"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Back
              </Button>

              {currentStep === 3 ? (
                <Button
                  onClick={handleSubmitAssessment}
                  disabled={!canProceed() || isProcessing}
                  className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 min-h-[44px] min-w-[140px]"
                  aria-label={isProcessing ? 'Processing your assessment' : 'Submit and get your results'}
                  data-track="assessment-submit"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Get My Results
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px] min-w-[100px]"
                  aria-label="Continue to next step"
                  data-track="assessment-next"
                >
                  Next
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Button>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* Recovery Dialog */}
      <Dialog open={showRecoveryDialog} onOpenChange={setShowRecoveryDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Submission Issue
            </DialogTitle>
            <DialogDescription className="text-left">
              We encountered an issue submitting your assessment after multiple attempts. Your data has been saved locally and won&apos;t be lost.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-3">
            <p className="text-sm text-muted-foreground">
              <strong>Your email:</strong> {data.email}
            </p>
            <p className="text-sm text-muted-foreground">
              Choose how you&apos;d like to proceed:
            </p>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleRetryFromDialog}
              disabled={isCapturingFallback}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
            <Button
              onClick={handleFallbackCapture}
              disabled={isCapturingFallback}
              className="gap-2 bg-primary text-primary-foreground"
            >
              {isCapturingFallback ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Send Results By Email
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Footer - Only show on landing/results */}
      {(currentStep === 0 || currentStep === 5) && (
        <footer className="border-t border-border bg-muted/30 mt-auto">
          <div className="container-custom py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>&copy; 2025 beaconAI. All rights reserved.</p>
              <nav className="flex items-center gap-6" aria-label="Footer navigation">
                <a href="/privacy-policy" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded" data-track="footer-privacy">
                  Privacy Policy
                </a>
                <a href="/terms-of-service" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded" data-track="footer-terms">
                  Terms of Service
                </a>
                <a href="mailto:dale@beaconai.ai" className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded" data-track="footer-contact">
                  Contact
                </a>
              </nav>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default CAREAssessmentWizard;
