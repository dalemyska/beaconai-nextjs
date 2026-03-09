'use client';

import { useState } from 'react';
import { CheckCircle, BookOpen, Copy, Eye, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DOMPurify from 'dompurify';
import { useToast } from '@/hooks/use-toast';
import { MarkdownRenderer } from './MarkdownRenderer';
import type { ValidationResult } from './types';

interface TDGResultsProps {
  results: string;
  promptKey: string;
  usedKB: boolean;
  validation?: ValidationResult | null;
}

function extractHtml(content: string): string {
  const trimmed = content.trim();

  const codeBlockRegex = /^```(?:html)?\s*\n([\s\S]*?)\n```\s*$/;
  const match = trimmed.match(codeBlockRegex);
  if (match) return match[1].trim();

  const simpleRegex = /^```(?:html)?\s*([\s\S]*?)```\s*$/;
  const simpleMatch = trimmed.match(simpleRegex);
  if (simpleMatch) return simpleMatch[1].trim();

  if (trimmed.startsWith('<!DOCTYPE') || trimmed.startsWith('<html') || trimmed.startsWith('<HTML')) {
    return trimmed;
  }

  const htmlMatch = trimmed.match(/(<!DOCTYPE[\s\S]*<\/html>)/i);
  if (htmlMatch) return htmlMatch[1];

  return trimmed;
}

/** Sanitize landing page HTML: allow full structure but strip scripts and event handlers */
function sanitizeLandingPageHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    WHOLE_DOCUMENT: true,
    ADD_TAGS: ['style', 'link', 'meta'],
    ADD_ATTR: ['target', 'rel', 'style', 'class', 'id', 'name', 'content', 'property', 'charset', 'viewport'],
    FORBID_TAGS: ['script'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur'],
  });
}

export function TDGResults({ results, promptKey, usedKB, validation }: TDGResultsProps) {
  const [showPreview, setShowPreview] = useState(true);
  const { toast } = useToast();
  const isLandingPage = promptKey === '13';

  const copyToClipboard = () => {
    const contentToCopy = isLandingPage ? extractHtml(results) : results;
    navigator.clipboard.writeText(contentToCopy);
    toast({
      title: 'Copied',
      description: isLandingPage ? 'HTML code copied to clipboard!' : 'Content copied to clipboard!',
    });
  };

  return (
    <Card style={{ borderTop: '4px solid #FF8C42' }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6" style={{ color: '#1C7C7C' }} />
            <CardTitle style={{ color: '#1C7C7C' }}>
              {isLandingPage ? 'Generated Landing Page' : 'Generated Content'}
            </CardTitle>
            {usedKB && (
              <span
                className="text-xs px-2 py-1 rounded-full flex items-center gap-1"
                style={{ backgroundColor: '#E0F2F1', color: '#1C7C7C' }}
              >
                <BookOpen className="w-3 h-3" />
                KB Enhanced
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isLandingPage && (
              <Button onClick={() => setShowPreview(!showPreview)} variant="outline" size="sm" className="font-semibold">
                {showPreview ? (
                  <>
                    <Code className="w-4 h-4 mr-2" />
                    View Code
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </>
                )}
              </Button>
            )}
            <Button onClick={copyToClipboard} variant="outline" size="sm" className="font-semibold">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLandingPage && showPreview ? (
          <div className="rounded-lg border-2 overflow-hidden" style={{ borderColor: '#E5E7EB' }}>
            <iframe
              srcDoc={sanitizeLandingPageHtml(extractHtml(results))}
              title="Landing Page Preview"
              className="w-full bg-white"
              style={{ height: '800px', border: 'none' }}
              sandbox="allow-same-origin"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : isLandingPage ? (
          <div
            className="rounded-lg p-6 border-2 whitespace-pre-wrap text-sm leading-relaxed font-medium overflow-x-auto"
            style={{ backgroundColor: '#F9FAFB', borderColor: '#E5E7EB', color: '#2C3E50' }}
          >
            {extractHtml(results)}
          </div>
        ) : (
          <div
            className="rounded-lg p-6 border-2 overflow-x-auto"
            style={{ backgroundColor: '#F9FAFB', borderColor: '#E5E7EB' }}
          >
            <MarkdownRenderer content={results} />
          </div>
        )}

        {validation && (
          <div
            className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium"
            style={{
              backgroundColor: validation.type === 'success' ? '#ECFDF5' : '#FFFBEB',
              color: validation.type === 'success' ? '#065F46' : '#92400E',
            }}
          >
            <span>{validation.type === 'success' ? '\u2705' : '\u26A0\uFE0F'}</span>
            <span>{validation.message}</span>
            {validation.details && (
              <span className="text-xs opacity-75 ml-1">({validation.details})</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
