'use client';

import { useState, useEffect, useCallback } from 'react';
import { Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useTDGStreaming } from '@/hooks/useTDGStreaming';
import { TDGLoginScreen } from './TDGLoginScreen';
import { TDGSidebar } from './TDGSidebar';
import { TDGInputForm } from './TDGInputForm';
import { TDGResults } from './TDGResults';
import { TDGKnowledgeBase } from './TDGKnowledgeBase';
import { TDGTips } from './TDGTips';
import { prompts } from './promptConfigs';
import type { KBStats, ValidationResult } from './types';
import {
  generateSeoContent,
  fetchKBStats as fetchKBStatsService,
  refreshKnowledgeBase as refreshKBService,
} from '@/services/tdgSeoService';

export function TDGSeoTool() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState('1');
  const [loading, setLoading] = useState(false);
  const [crawling, setCrawling] = useState(false);
  const [nonStreamResults, setNonStreamResults] = useState('');
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [includeKB, setIncludeKB] = useState(true);
  const [kbStats, setKbStats] = useState<KBStats>({ count: 0, lastIndexed: null });
  const [nonStreamUsedKB, setNonStreamUsedKB] = useState(false);
  const [nonStreamValidation, setNonStreamValidation] = useState<ValidationResult | null>(null);
  const { toast } = useToast();

  // Streaming hook for prompts 1-12
  const streaming = useTDGStreaming();

  // Determine if current prompt uses streaming (all except 13)
  const useStreaming = selectedPrompt !== '13';

  // Unified results: streaming content for 1-12, non-stream results for 13
  const results = useStreaming ? streaming.content : nonStreamResults;
  const usedKB = useStreaming ? (streaming.metadata?.usedKB ?? false) : nonStreamUsedKB;
  const validation = useStreaming ? streaming.validation : nonStreamValidation;
  const isGenerating = useStreaming ? streaming.isStreaming : loading;

  useEffect(() => {
    if (sessionStorage.getItem('tdg-seo-auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const loadKBStats = useCallback(async () => {
    const stats = await fetchKBStatsService();
    setKbStats(stats);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadKBStats();
    }
  }, [isAuthenticated, loadKBStats]);

  const handleSelectPrompt = (key: string) => {
    // Stop any in-progress streaming
    if (streaming.isStreaming) streaming.stopStreaming();
    setSelectedPrompt(key);
    setInputs({});
    setNonStreamResults('');
    setNonStreamValidation(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleRefreshKB = async () => {
    setCrawling(true);
    try {
      const stats = await refreshKBService();
      toast({
        title: 'Knowledge Base Updated',
        description: `Indexed: ${stats.indexed}, Updated: ${stats.updated}`,
      });
      await loadKBStats();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to crawl knowledge base',
        variant: 'destructive',
      });
    } finally {
      setCrawling(false);
    }
  };

  const prepareFinalInputs = () => {
    const currentPrompt = prompts[selectedPrompt];
    const finalInputs = { ...inputs };
    currentPrompt.fields.forEach((field) => {
      if (field.defaultValue && !finalInputs[field.id]) {
        finalInputs[field.id] = field.defaultValue;
      }
    });
    return finalInputs;
  };

  const handleGenerate = async () => {
    const finalInputs = prepareFinalInputs();

    if (useStreaming) {
      // Use streaming for prompts 1-12
      await streaming.startStreaming(selectedPrompt, finalInputs, includeKB);
      if (!streaming.error) {
        toast({
          title: 'Content Generated',
          description: 'Your SEO content has been generated successfully.',
        });
      }
    } else {
      // Non-streaming for prompt 13
      setLoading(true);
      setNonStreamResults('');
      setNonStreamUsedKB(false);
      setNonStreamValidation(null);

      try {
        const result = await generateSeoContent(selectedPrompt, finalInputs, includeKB);
        setNonStreamResults(result.content);
        setNonStreamUsedKB(result.usedKB);
        toast({
          title: 'Content Generated',
          description: result.usedKB
            ? 'Content generated with Knowledge Base context.'
            : 'Your SEO content has been generated successfully.',
        });
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Unknown error';
        setNonStreamResults(`Error generating content: ${msg}`);
        toast({ title: 'Error', description: msg, variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('tdg-seo-auth');
  };

  if (!isAuthenticated) {
    return <TDGLoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  const currentPrompt = prompts[selectedPrompt];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white" style={{ backgroundColor: '#1C7C7C' }}>
                TDG
              </div>
              <div>
                <h1 className="text-2xl font-black" style={{ color: '#2C3E50' }}>SEO Content Generator</h1>
                <p className="text-sm" style={{ color: '#6B7280' }}>Transportation Development Group</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm" className="font-medium">
              Logout
            </Button>
          </div>
          <p style={{ color: '#6B7280' }}>Generate optimized meta descriptions, FAQs, and content for dgtraining.com</p>
        </div>

        <TDGKnowledgeBase
          kbStats={kbStats}
          includeKB={includeKB}
          crawling={crawling}
          onToggleKB={setIncludeKB}
          onRefresh={handleRefreshKB}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <TDGSidebar selectedPrompt={selectedPrompt} onSelectPrompt={handleSelectPrompt} />
          </div>

          <div className="lg:col-span-3 space-y-6">
            <TDGInputForm
              prompt={currentPrompt}
              promptKey={selectedPrompt}
              inputs={inputs}
              loading={isGenerating}
              onInputChange={handleInputChange}
              onGenerate={handleGenerate}
            />

            {/* Stop button during streaming */}
            {streaming.isStreaming && (
              <Button
                onClick={streaming.stopStreaming}
                variant="outline"
                className="w-full font-semibold"
                style={{ borderColor: '#FF8C42', color: '#FF8C42' }}
              >
                <Square className="w-4 h-4 mr-2" />
                Stop Generating
              </Button>
            )}

            {results && (
              <TDGResults
                results={results}
                promptKey={selectedPrompt}
                usedKB={usedKB}
                validation={validation}
              />
            )}

            <TDGTips />
          </div>
        </div>
      </div>
    </div>
  );
}
