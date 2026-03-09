'use client';

import { Database, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import type { KBStats } from './types';

interface TDGKnowledgeBaseProps {
  kbStats: KBStats;
  includeKB: boolean;
  crawling: boolean;
  onToggleKB: (value: boolean) => void;
  onRefresh: () => void;
}

export function TDGKnowledgeBase({ kbStats, includeKB, crawling, onToggleKB, onRefresh }: TDGKnowledgeBaseProps) {
  return (
    <Card className="mb-6" style={{ borderLeft: '4px solid #1C7C7C' }}>
      <CardContent className="py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5" style={{ color: '#1C7C7C' }} />
              <span className="font-semibold" style={{ color: '#2C3E50' }}>Knowledge Base</span>
            </div>
            <div className="text-sm" style={{ color: '#6B7280' }}>
              {kbStats.count > 0 ? (
                <>
                  <span className="font-medium" style={{ color: '#1C7C7C' }}>{kbStats.count} articles</span>
                  {kbStats.lastIndexed && (
                    <span className="ml-2">
                      &bull; Last indexed: {new Date(kbStats.lastIndexed).toLocaleDateString()}
                    </span>
                  )}
                </>
              ) : (
                <span>Not indexed yet</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch id="include-kb" checked={includeKB} onCheckedChange={onToggleKB} />
              <Label htmlFor="include-kb" className="text-sm font-medium cursor-pointer" style={{ color: '#2C3E50' }}>
                Include KB Context
              </Label>
            </div>
            <Button
              onClick={onRefresh}
              disabled={crawling}
              variant="outline"
              size="sm"
              className="font-semibold"
              style={{ borderColor: '#1C7C7C', color: '#1C7C7C' }}
            >
              {crawling ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Crawling...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh KB
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
