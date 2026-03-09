export interface PromptField {
  id: string;
  label: string;
  placeholder?: string;
  required: boolean;
  multiline?: boolean;
  rows?: number;
  defaultValue?: string;
  type?: 'checkbox' | 'text' | 'select';
  options?: { value: string; label: string }[];
}

export type PromptCategory = 'meta' | 'faq' | 'content' | 'advanced';

export interface PromptConfig {
  name: string;
  description: string;
  iconName: string;
  category: PromptCategory;
  fields: PromptField[];
}

export interface KBStats {
  count: number;
  lastIndexed: string | null;
}

export interface GenerateResult {
  content: string;
  usedKB: boolean;
  error?: string;
}

export interface ValidationResult {
  type: 'success' | 'warning';
  message: string;
  details?: string;
}

export interface StreamMetadata {
  usedKB: boolean;
  model: string;
}

export interface StreamUsage {
  input_tokens: number;
  output_tokens: number;
}

export const PROMPT_CATEGORIES: Record<PromptCategory, string> = {
  meta: 'Meta Descriptions',
  faq: 'FAQ Content',
  content: 'Content Tools',
  advanced: 'Advanced',
};
