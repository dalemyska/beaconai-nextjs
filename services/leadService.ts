'use client';

import { supabase } from '@/lib/supabase/client';
import { sanitizeFormData } from '@/utils/inputSanitization';

export interface LeadData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  source: string;
  metadata?: Record<string, unknown>;
}

export const submitLead = async (leadData: LeadData): Promise<boolean> => {
  try {
    // Sanitize input data
    const sanitizedData = sanitizeFormData(leadData as unknown as Record<string, unknown>) as unknown as LeadData;

    console.log('Submitting lead to Supabase for source:', sanitizedData.source);

    const { error } = await supabase
      .from('Website_Leads')
      .insert({
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone || null,
        company: sanitizedData.company || null,
        message: sanitizedData.message || null,
        source: sanitizedData.source,
        metadata: sanitizedData.metadata ? JSON.parse(JSON.stringify(sanitizedData.metadata)) : null,
        submitted_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error submitting lead:', error.message);
      return false;
    }

    console.log('Lead submitted successfully');
    return true;
  } catch (error) {
    console.error('Error submitting lead:', error instanceof Error ? error.message : 'Unknown error');
    return false;
  }
};
