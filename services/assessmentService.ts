export interface CareAssessmentInsert {
  user_name: string;
  user_email: string;
  company_name: string;
  company_website: string;
  industry?: string;
  user_role: string;
  responses: Record<string, unknown>;
  culture_score?: number;
  adoption_score?: number;
  readiness_score?: number;
  evolution_score?: number;
  overall_score?: number;
  status?: string;
}

export interface CareAssessment {
  id: string;
  created_at: string;
  user_name: string;
  user_email: string;
  company_name: string;
  company_website: string;
  detected_industry: string | null;
  user_role: string;
  responses: Record<string, unknown>;
  company_context: string | null;
  insights: Record<string, unknown> | null;
  solution_summary: string | null;
  culture_score: number | null;
  adoption_score: number | null;
  readiness_score: number | null;
  evolution_score: number | null;
  overall_score: number | null;
  status: string | null;
  pdf_url: string | null;
  email_sent: boolean | null;
  email_sent_at: string | null;
}

const EDGE_FUNCTION_BASE = `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/functions/v1`;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Verify that the assessment submission service is available
 * @returns true if healthy, false otherwise
 */
export const verifyServiceHealth = async (): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${EDGE_FUNCTION_BASE}/submit-assessment`, {
      method: 'GET',
      headers: { 'apikey': SUPABASE_ANON_KEY },
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.warn('[AssessmentService] Health check failed:', error);
    return false;
  }
};

/**
 * Submit a new CARE assessment via edge function (bypasses RLS restrictions)
 * @param data Assessment data to insert
 * @returns The assessment ID
 */
export const submitAssessment = async (data: CareAssessmentInsert): Promise<string> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(`${EDGE_FUNCTION_BASE}/submit-assessment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
      },
      body: JSON.stringify(data),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[AssessmentService] Error submitting assessment:', errorData);
      throw new Error(`Failed to submit assessment: ${errorData.error || response.statusText}`);
    }

    const result = await response.json();
    return result.id;
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    throw error;
  }
};

/**
 * Capture lead as fallback when primary submission fails
 * @param data Lead data to capture
 */
export const captureLeadFallback = async (data: {
  email: string;
  name: string;
  company?: string;
  website?: string;
  role?: string;
  responses?: Record<string, unknown>;
  session_id?: string;
  error_message?: string;
}): Promise<boolean> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${EDGE_FUNCTION_BASE}/emergency-lead-capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
      },
      body: JSON.stringify(data),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('[AssessmentService] Emergency lead capture failed:', error);
    return false;
  }
};

