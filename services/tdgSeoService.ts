import type { GenerateResult, KBStats } from '@/components/tdgseo/types';

const EDGE_FUNCTION_BASE = `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/functions/v1`;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Generate SEO content via the tdg-seo-generate Edge Function
 */
export async function generateSeoContent(
  promptType: string,
  inputs: Record<string, string>,
  includeKB: boolean,
  signal?: AbortSignal,
): Promise<GenerateResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120000);

  // Combine external signal with timeout
  const combinedSignal = signal
    ? AbortSignal.any([signal, controller.signal])
    : controller.signal;

  try {
    const response = await fetch(`${EDGE_FUNCTION_BASE}/tdg-seo-generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ promptType, inputs, includeKB }),
      signal: combinedSignal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(errorData.error || `Generation failed: ${response.statusText}`);
    }

    const data = await response.json();
    if (data?.error) {
      throw new Error(data.error);
    }

    return {
      content: data?.content || 'No content generated',
      usedKB: data?.usedKB || false,
    };
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out or was cancelled.');
    }
    throw error;
  }
}

/**
 * Start a streaming generation request.
 * Returns the raw Response for the caller to process the NDJSON stream.
 */
export async function generateSeoContentStream(
  promptType: string,
  inputs: Record<string, string>,
  includeKB: boolean,
  signal?: AbortSignal,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120000);

  const combinedSignal = signal
    ? AbortSignal.any([signal, controller.signal])
    : controller.signal;

  try {
    const response = await fetch(`${EDGE_FUNCTION_BASE}/tdg-seo-generate?stream=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ promptType, inputs, includeKB }),
      signal: combinedSignal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(errorData.error || `Streaming generation failed: ${response.statusText}`);
    }

    return response;
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out or was cancelled.');
    }
    throw error;
  }
}

/**
 * Fetch knowledge base stats
 */
export async function fetchKBStats(): Promise<KBStats> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/rest/v1/tdg_knowledge_base?select=last_indexed_at&order=last_indexed_at.desc&limit=100`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
      },
    );

    if (!response.ok) return { count: 0, lastIndexed: null };

    const data = await response.json();
    return {
      count: data.length,
      lastIndexed: data[0]?.last_indexed_at || null,
    };
  } catch {
    return { count: 0, lastIndexed: null };
  }
}

/**
 * Trigger KB crawl/reindex
 */
export async function refreshKnowledgeBase(): Promise<{ indexed: number; updated: number }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120000);

  try {
    const response = await fetch(`${EDGE_FUNCTION_BASE}/tdg-crawl-kb`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(errorData.error || `Crawl failed: ${response.statusText}`);
    }

    const data = await response.json();
    return { indexed: data?.stats?.indexed || 0, updated: data?.stats?.updated || 0 };
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('KB crawl timed out. Please try again.');
    }
    throw error;
  }
}
