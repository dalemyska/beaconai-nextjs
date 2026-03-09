'use client';

import { FileText, Briefcase, HelpCircle, RefreshCw, CheckCircle, Search, PenTool, Lightbulb, Layout } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { prompts } from './promptConfigs';
import { PROMPT_CATEGORIES } from './types';
import type { PromptCategory } from './types';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Briefcase,
  HelpCircle,
  RefreshCw,
  CheckCircle,
  Search,
  PenTool,
  Lightbulb,
  Layout,
};

const CATEGORY_ORDER: PromptCategory[] = ['meta', 'faq', 'content', 'advanced'];

interface TDGSidebarProps {
  selectedPrompt: string;
  onSelectPrompt: (key: string) => void;
}

export function TDGSidebar({ selectedPrompt, onSelectPrompt }: TDGSidebarProps) {
  // Group prompts by category
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    label: PROMPT_CATEGORIES[category],
    items: Object.entries(prompts).filter(([, p]) => p.category === category),
  }));

  // Determine which category is currently active (for default open accordion)
  const activeCategory = prompts[selectedPrompt]?.category || 'meta';

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold" style={{ color: '#6B7280' }}>Content Type</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Accordion type="multiple" defaultValue={[activeCategory]}>
          {grouped.map(({ category, label, items }) => (
            <AccordionItem key={category} value={category} className="border-b-0">
              <AccordionTrigger className="py-2 text-xs font-semibold uppercase tracking-wider hover:no-underline" style={{ color: '#6B7280' }}>
                {label}
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                <div className="space-y-1">
                  {items.map(([key, prompt]) => {
                    const Icon = ICON_MAP[prompt.iconName];
                    const isSelected = selectedPrompt === key;
                    return (
                      <button
                        key={key}
                        onClick={() => onSelectPrompt(key)}
                        style={{
                          backgroundColor: isSelected ? '#1C7C7C' : '#FFFFFF',
                          color: isSelected ? '#FFFFFF' : '#2C3E50',
                          border: isSelected ? 'none' : '2px solid #E5E7EB',
                        }}
                        className="w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 font-semibold text-sm hover:shadow-md"
                      >
                        {Icon && <Icon className="w-5 h-5 shrink-0" />}
                        <span className="truncate">{prompt.name}</span>
                      </button>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
