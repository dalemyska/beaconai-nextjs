'use client';

import { useState, useCallback, useRef } from 'react';
import type { StreamMetadata, StreamUsage, ValidationResult } from '@/components/tdgseo/types';
import { generateSeoContentStream } from '@/services/tdgSeoService';

interface UseTDGStreamingReturn {
  content: string;
  isStreaming: boolean;
  metadata: StreamMetadata | null;
  usage: StreamUsage | null;
  validation: ValidationResult | null;
  error: string | null;
  startStreaming: (promptType: string, inputs: Record<string, string>, includeKB: boolean) => Promise<void>;
  stopStreaming: () => void;
}

export function useTDGStreaming(): UseTDGStreamingReturn {
  const [content, setContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [metadata, setMetadata] = useState<StreamMetadata | null>(null);
  const [usage, setUsage] = useState<StreamUsage | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const stopStreaming = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsStreaming(false);
  }, []);

  const startStreaming = useCallback(async (
    promptType: string,
    inputs: Record<string, string>,
    includeKB: boolean,
  ) => {
    // Reset state
    setContent('');
    setMetadata(null);
    setUsage(null);
    setValidation(null);
    setError(null);
    setIsStreaming(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await generateSeoContentStream(
        promptType,
        inputs,
        includeKB,
        controller.signal,
      );

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No readable stream available');

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const event = JSON.parse(line);

            switch (event.type) {
              case 'metadata':
                setMetadata({ usedKB: event.usedKB, model: event.model });
                break;
              case 'content_delta':
                setContent((prev) => prev + event.text);
                break;
              case 'done':
                if (event.usage) setUsage(event.usage);
                if (event.validation) setValidation(event.validation as ValidationResult);
                break;
            }
          } catch {
            // Skip malformed lines
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        // User cancelled - not an error
      } else {
        const msg = err instanceof Error ? err.message : 'Streaming failed';
        setError(msg);
        setContent(`Error: ${msg}`);
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  }, []);

  return { content, isStreaming, metadata, usage, validation, error, startStreaming, stopStreaming };
}
