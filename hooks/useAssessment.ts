'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Configuration for polling
const POLLING_INTERVAL_MS = 5000; // 5 seconds
const MAX_POLL_COUNT = 60; // Maximum polls (5 minutes at 5s intervals)

interface UseAssessmentOptions {
  onComplete?: () => void;
  onError?: (error: string) => void;
}

type AssessmentStatus =
  | 'pending'
  | 'scraping'
  | 'generating_report'
  | 'generating_insights'
  | 'generating_solution'
  | 'generating_pdf'
  | 'sending_email'
  | 'completed'
  | 'failed';

interface AssessmentData {
  id: string;
  status: AssessmentStatus;
  culture_score: number | null;
  adoption_score: number | null;
  readiness_score: number | null;
  evolution_score: number | null;
  overall_score: number | null;
  pdf_url: string | null;
  email_sent_at: string | null;
  user_email: string | null;
}

interface UseAssessmentReturn {
  assessmentId: string | null;
  assessment: AssessmentData | null;
  status: AssessmentStatus | null;
  isLoading: boolean;
  error: string | null;
  startProcessing: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
  retry: () => Promise<void>;
}

export function useAssessment(options: UseAssessmentOptions = {}): UseAssessmentReturn {
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [assessment, setAssessment] = useState<AssessmentData | null>(null);
  const [status, setStatus] = useState<AssessmentStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pollingIntervalRef = useRef<number | null>(null);
  const pollCountRef = useRef<number>(0);
  const isPollingStoppedRef = useRef<boolean>(false);

  // Stable ref for callbacks to avoid re-render loops
  const optionsRef = useRef(options);
  optionsRef.current = options;

  // Stop polling helper
  const stopPolling = useCallback((reason: string) => {
    if (pollingIntervalRef.current) {
      console.log(`Stopping status polling: ${reason}`);
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    isPollingStoppedRef.current = true;
  }, []);

  // Fetch assessment status via secure edge function
  const fetchAssessmentStatus = useCallback(async () => {
    if (!assessmentId) return;

    // Don't poll if already stopped
    if (isPollingStoppedRef.current) {
      return;
    }

    // Increment poll count and check limit
    pollCountRef.current += 1;
    if (pollCountRef.current > MAX_POLL_COUNT) {
      stopPolling(`Max poll count (${MAX_POLL_COUNT}) exceeded`);
      setError('Assessment is taking too long. Please check your email for results or contact support.');
      optionsRef.current.onError?.('Polling timeout');
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/check-assessment-status`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({ assessmentId }),
          signal: controller.signal
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Error fetching assessment status:', errorData);

        if (response.status === 404) {
          stopPolling('Assessment not found (404)');
          setError('Assessment not found');
          return;
        }

        // 410 Gone - assessment polling expired (old completed assessment)
        if (response.status === 410) {
          stopPolling('Assessment polling expired (410)');
          // If it was completed, trigger completion callback
          if (errorData.status === 'completed') {
            setStatus('completed');
            optionsRef.current.onComplete?.();
          } else {
            setError(errorData.message || 'Assessment processing completed. Check your email for results.');
          }
          return;
        }

        // For other errors, don't immediately stop, could be transient
        setError(errorData.error || 'Failed to fetch assessment status');
        return;
      }

      const data: AssessmentData = await response.json();

      setAssessment(data);
      setStatus(data.status);

      // Handle terminal states
      if (data.status === 'completed') {
        console.log('Assessment completed!');
        stopPolling('Assessment completed');
        optionsRef.current.onComplete?.();
      } else if (data.status === 'failed') {
        console.log('Assessment failed');
        stopPolling('Assessment failed');
        setError('Assessment processing failed. Please try again.');
        optionsRef.current.onError?.('Assessment processing failed');
      }
    } catch (err) {
      clearTimeout(timeoutId);
      console.error('Failed to fetch assessment status:', err);
      // Network errors and timeouts - don't immediately stop, could be transient
      if (err instanceof Error && err.name === 'AbortError') {
        console.warn('Assessment status check timed out, will retry on next poll');
        return;
      }
      setError(err instanceof Error ? err.message : 'Failed to fetch assessment status');
    }
  }, [assessmentId, stopPolling]);

  // Start polling when assessmentId is set
  useEffect(() => {
    if (!assessmentId) return;

    console.log('Starting status polling for assessment:', assessmentId);

    // Reset polling state
    pollCountRef.current = 0;
    isPollingStoppedRef.current = false;

    // Initial fetch
    fetchAssessmentStatus();

    // Poll every 5 seconds for status updates
    pollingIntervalRef.current = window.setInterval(() => {
      fetchAssessmentStatus();
    }, POLLING_INTERVAL_MS);

    return () => {
      if (pollingIntervalRef.current) {
        console.log('Cleanup: Stopping status polling');
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };
  }, [assessmentId, fetchAssessmentStatus]);

  // Start processing the assessment
  const startProcessing = useCallback(async (id: string) => {
    setAssessmentId(id);
    setIsLoading(true);
    setError(null);

    // Reset polling state for new assessment
    pollCountRef.current = 0;
    isPollingStoppedRef.current = false;

    try {
      console.log('Starting assessment processing:', id);

      // Call the process-assessment edge function
      const processController = new AbortController();
      const processTimeout = setTimeout(() => processController.abort(), 30000);

      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/process-assessment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({ assessmentId: id }),
          signal: processController.signal
        }
      );

      clearTimeout(processTimeout);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Process assessment error:', errorText);
        // Don't throw - the function might still be running
        // We'll rely on polling to track progress
      }

      console.log('Process assessment request sent');
    } catch (err) {
      console.error('Failed to start processing:', err);
      // Don't set error yet - the function might still complete
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Retry processing
  const retry = useCallback(async () => {
    if (!assessmentId) return;

    setError(null);
    setStatus('pending');

    // Reset polling state for retry
    pollCountRef.current = 0;
    isPollingStoppedRef.current = false;

    try {
      // Re-trigger processing via edge function
      await startProcessing(assessmentId);
    } catch (err) {
      console.error('Retry failed:', err);
      setError('Failed to retry. Please try again.');
    }
  }, [assessmentId, startProcessing]);

  return {
    assessmentId,
    assessment,
    status,
    isLoading,
    error,
    startProcessing,
    refetch: fetchAssessmentStatus,
    retry,
  };
}

// Map status to stage index for UI
export function getStageFromStatus(status: AssessmentStatus | null): number {
  switch (status) {
    case 'pending':
      return 0;
    case 'scraping':
      return 0;
    case 'generating_report':
    case 'generating_insights':
    case 'generating_solution':
      return 1;
    case 'generating_pdf':
      return 2;
    case 'sending_email':
      return 3;
    case 'completed':
      return 4;
    case 'failed':
      return -1;
    default:
      return 0;
  }
}

export function isStageActive(status: AssessmentStatus | null, stageIndex: number): boolean {
  const currentStage = getStageFromStatus(status);
  return currentStage === stageIndex;
}

export function isStageComplete(status: AssessmentStatus | null, stageIndex: number): boolean {
  const currentStage = getStageFromStatus(status);
  return currentStage > stageIndex;
}
