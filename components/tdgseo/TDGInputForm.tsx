'use client';

import { useMemo } from 'react';
import { Lightbulb, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { PromptConfig } from './types';

interface TDGInputFormProps {
  prompt: PromptConfig;
  promptKey: string;
  inputs: Record<string, string>;
  loading: boolean;
  onInputChange: (field: string, value: string) => void;
  onGenerate: () => void;
}

export function TDGInputForm({ prompt, promptKey, inputs, loading, onInputChange, onGenerate }: TDGInputFormProps) {
  const isValid = useMemo(() => {
    const allRequiredFilled = prompt.fields.every((field) => {
      if (!field.required) return true;
      if (field.defaultValue) return true;
      return inputs[field.id] && inputs[field.id].trim() !== '';
    });

    if (promptKey === '6') {
      const hasUrlOrContent = inputs.contentUrl?.trim() || inputs.content?.trim();
      return allRequiredFilled && !!hasUrlOrContent;
    }
    if (promptKey === '7') {
      const hasUrlOrSection = inputs.sectionUrl?.trim() || inputs.section?.trim();
      return allRequiredFilled && !!hasUrlOrSection;
    }
    return allRequiredFilled;
  }, [prompt.fields, promptKey, inputs]);

  return (
    <Card style={{ borderTop: '4px solid #1C7C7C' }}>
      <CardHeader>
        <CardTitle style={{ color: '#1C7C7C' }}>{prompt.name}</CardTitle>
        <p className="text-sm" style={{ color: '#6B7280' }}>{prompt.description}</p>
        <p className="text-xs" style={{ color: '#FF8C42' }}>* Required fields</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {prompt.fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="font-medium" style={{ color: '#2C3E50' }}>
              {field.label}
            </Label>
            {field.type === 'checkbox' ? (
              <div className="flex items-center gap-2">
                <Checkbox
                  id={field.id}
                  checked={inputs[field.id] === 'true' || (!inputs[field.id] && field.defaultValue === 'true')}
                  onCheckedChange={(checked) => onInputChange(field.id, checked ? 'true' : 'false')}
                />
                <Label htmlFor={field.id} className="text-sm font-normal">
                  Include trending topic analysis
                </Label>
              </div>
            ) : field.type === 'select' ? (
              <select
                id={field.id}
                value={inputs[field.id] || ''}
                onChange={(e) => onInputChange(field.id, e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ color: inputs[field.id] ? '#2C3E50' : '#9CA3AF' }}
              >
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value} style={{ color: '#2C3E50' }}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : field.multiline ? (
              <Textarea
                id={field.id}
                value={inputs[field.id] || field.defaultValue || ''}
                onChange={(e) => onInputChange(field.id, e.target.value)}
                placeholder={field.placeholder}
                rows={field.rows || 3}
                className="resize-none"
              />
            ) : (
              <Input
                id={field.id}
                type="text"
                value={inputs[field.id] || field.defaultValue || ''}
                onChange={(e) => onInputChange(field.id, e.target.value)}
                placeholder={field.placeholder}
              />
            )}
          </div>
        ))}

        <Button
          onClick={onGenerate}
          disabled={loading || !isValid}
          className="w-full mt-6 font-bold"
          style={{
            backgroundColor: loading || !isValid ? '#D1D5DB' : '#1C7C7C',
            color: '#FFFFFF',
          }}
        >
          {loading ? (
            <>
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              Generating with AI...
            </>
          ) : (
            <>
              <Lightbulb className="w-5 h-5 mr-2" />
              Generate SEO Content
            </>
          )}
        </Button>

        {!isValid && !loading && (
          <p className="text-sm flex items-center gap-2 font-medium" style={{ color: '#FF8C42' }}>
            <AlertCircle className="w-4 h-4" />
            {promptKey === '6' || promptKey === '7'
              ? 'Please provide either a URL or paste content, and fill all required fields'
              : 'Please fill in all required fields'}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
