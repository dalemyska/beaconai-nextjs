'use client';

import { useState, useEffect } from 'react';
import { FileText, Lightbulb, HelpCircle, Briefcase, RefreshCw, CheckCircle, AlertCircle, Search, PenTool, Copy, Database, BookOpen, Lock, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';
import { Switch } from '@/components/ui/switch';

// Create an untyped Supabase client for TDG-specific tables
// These tables exist in the shared Supabase project but aren't typed in beaconAI's schema
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Simple password for internal tool access
const TOOL_PASSWORD = 'tdg2024seo';

interface PromptField {
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

interface PromptConfig {
  name: string;
  description: string;
  icon: React.ReactNode;
  fields: PromptField[];
}

const prompts: Record<string, PromptConfig> = {
  '1': {
    name: 'Meta Description - Single Page',
    description: "Paste the URL and optional context - we'll create optimized meta descriptions",
    icon: <FileText className="w-5 h-5" />,
    fields: [
      { id: 'url', label: 'Page URL *', placeholder: 'e.g., https://dgtraining.com/iata-training/', required: true },
      { id: 'focusKeyphrase', label: 'Focus Keyphrase (optional)', placeholder: 'e.g., iata certification online', required: false },
      { id: 'pageDescription', label: 'Additional Context (optional)', placeholder: 'e.g., emphasize group discounts, target FedEx shippers', multiline: true, rows: 2, required: false },
    ]
  },
  '2': {
    name: 'Meta Description - Batch',
    description: 'Paste multiple URLs (one per line) for batch processing',
    icon: <Briefcase className="w-5 h-5" />,
    fields: [
      { id: 'urls', label: 'Page URLs (one per line) *', placeholder: 'https://dgtraining.com/iata-training/\nhttps://dgtraining.com/dot-training/', multiline: true, rows: 6, required: true }
    ]
  },
  '3': {
    name: 'Meta Description - From Scratch',
    description: 'Create meta descriptions without a URL - describe your page and keywords',
    icon: <FileText className="w-5 h-5" />,
    fields: [
      { id: 'pageTitle', label: 'Page Title *', placeholder: 'e.g., IATA Dangerous Goods Training', required: true },
      { id: 'focusKeyphrase', label: 'Focus Keyphrase *', placeholder: 'e.g., iata certification online', required: true },
      { id: 'pageDescription', label: 'What is this page about? *', placeholder: 'e.g., Online IATA DG training, Category 6 certification', multiline: true, rows: 3, required: true },
      { id: 'targetKeywords', label: 'Additional Keywords (optional)', placeholder: 'e.g., dangerous goods training, dg certificate', required: false }
    ]
  },
  '4': {
    name: 'FAQ Section - Customer Questions',
    description: 'Create FAQ section based on actual customer questions',
    icon: <HelpCircle className="w-5 h-5" />,
    fields: [
      { id: 'businessType', label: 'Business Type', placeholder: 'Dangerous Goods Training Provider', defaultValue: 'Dangerous Goods Training Provider', required: false },
      { id: 'serviceProduct', label: 'Service/Product *', placeholder: 'e.g., IATA, IMDG, DOT Hazmat training courses', multiline: true, required: true },
      { id: 'questions', label: 'Customer Questions (one per line) *', placeholder: 'How long is the IATA DG certification valid?\nDo I need recurrent training?', multiline: true, rows: 6, required: true },
      { id: 'keywords', label: 'SEO Keywords to Include *', placeholder: 'e.g., IATA certification, hazmat recurrent training', multiline: true, required: true }
    ]
  },
  '5': {
    name: 'FAQ Content - Specific Topic',
    description: 'Build comprehensive FAQs around a specific topic',
    icon: <HelpCircle className="w-5 h-5" />,
    fields: [
      { id: 'topic', label: 'Main Topic *', placeholder: 'e.g., IATA Dangerous Goods Regulations', required: true },
      { id: 'audience', label: 'Target Audience *', placeholder: 'e.g., Freight forwarders seeking certification', required: true },
      { id: 'keywords', label: 'Keywords to Include *', placeholder: 'e.g., DGR, dangerous goods declaration', multiline: true, required: true },
      { id: 'competitorQuestions', label: 'Common Questions *', placeholder: 'e.g., What is covered in IATA training?', multiline: true, required: true }
    ]
  },
  '6': {
    name: 'Content Analysis & Improvement',
    description: 'Review existing content and get SEO improvement recommendations',
    icon: <RefreshCw className="w-5 h-5" />,
    fields: [
      { id: 'contentUrl', label: 'Page URL (optional)', placeholder: 'e.g., https://dgtraining.com/iata-training/', required: false },
      { id: 'content', label: 'Current Content (optional if URL provided)', placeholder: 'Paste your existing webpage content...', multiline: true, rows: 8, required: false },
      { id: 'primaryKeyword', label: 'Primary Keyword (optional)', placeholder: 'e.g., IATA dangerous goods training', required: false },
      { id: 'secondaryKeywords', label: 'Secondary Keywords (optional)', placeholder: 'e.g., DGR certification, hazmat compliance', multiline: true, required: false },
      { id: 'contentGoal', label: 'Content Goal (optional)', placeholder: 'e.g., Drive enrollments for Category 6 course', multiline: true, required: false }
    ]
  },
  '7': {
    name: 'Content Expansion',
    description: 'Expand a content section with more detail and SEO optimization',
    icon: <FileText className="w-5 h-5" />,
    fields: [
      { id: 'sectionUrl', label: 'Page URL (optional)', placeholder: 'e.g., https://dgtraining.com/iata-training/', required: false },
      { id: 'section', label: 'Current Section (optional if URL provided)', placeholder: 'Paste the content section to expand...', multiline: true, rows: 6, required: false },
      { id: 'targetLength', label: 'Target Word Count (optional)', placeholder: 'e.g., 800 words', required: false },
      { id: 'keywords', label: 'Focus Keywords (optional)', placeholder: 'e.g., lithium battery shipping, UN3480', multiline: true, required: false },
      { id: 'userIntent', label: 'User Intent (optional)', placeholder: 'e.g., Understanding lithium battery shipping', multiline: true, required: false }
    ]
  },
  '8': {
    name: 'Meta Description Review',
    description: "Improve existing meta descriptions for TDG's brand",
    icon: <CheckCircle className="w-5 h-5" />,
    fields: [
      { id: 'metaDescriptions', label: 'Existing Meta Descriptions *', placeholder: 'Paste meta descriptions to improve...', multiline: true, rows: 5, required: true },
      { id: 'business', label: 'Your Business', placeholder: 'Transportation Development Group', defaultValue: 'Transportation Development Group', required: false },
      { id: 'brandVoice', label: 'Brand Voice *', placeholder: 'e.g., Professional yet approachable', required: true },
      { id: 'audience', label: 'Target Audience *', placeholder: 'e.g., Logistics professionals, compliance managers', required: true }
    ]
  },
  '9': {
    name: 'FAQ Refinement',
    description: 'Customize generic FAQs with TDG-specific details',
    icon: <HelpCircle className="w-5 h-5" />,
    fields: [
      { id: 'faqs', label: 'AI-Generated FAQs *', placeholder: 'Paste FAQs to refine...', multiline: true, rows: 8, required: true },
      { id: 'specificServices', label: 'Your Specific Services *', placeholder: 'e.g., IATA Cat 6, Cat 11, IMDG', multiline: true, required: true },
      { id: 'policies', label: 'Company Policies *', placeholder: 'e.g., 24-month validity, group discounts', multiline: true, required: true },
      { id: 'contactInfo', label: 'Contact Information *', placeholder: 'e.g., support@dgtraining.com', required: true },
      { id: 'tone', label: 'Conversational Tone *', placeholder: 'e.g., Friendly but professional', required: true }
    ]
  },
  '10': {
    name: 'Focus Keyphrase Analyzer',
    description: 'Analyze page optimization for your target focus keyphrase',
    icon: <Search className="w-5 h-5" />,
    fields: [
      { id: 'analyzeUrl', label: 'Page URL *', placeholder: 'e.g., https://dgtraining.com/iata-training/', required: true },
      { id: 'focusKeyphrase', label: 'Focus Keyphrase *', placeholder: 'e.g., iata certification online', required: true },
      { id: 'synonyms', label: 'Synonyms/Related (optional)', placeholder: 'e.g., iata dg training, dangerous goods certification', multiline: true, rows: 2, required: false }
    ]
  },
  '11': {
    name: 'Blog Post Generator',
    description: 'Create comprehensive, SEO-optimized blog posts on DG training topics',
    icon: <PenTool className="w-5 h-5" />,
    fields: [
      { id: 'blogTopic', label: 'Blog Topic/Keyword *', placeholder: 'e.g., lithium battery shipping regulations 2025', required: true },
      { id: 'blogAngle', label: 'Angle/Approach (optional)', placeholder: 'e.g., beginner guide, regulatory update, how-to, case study', required: false },
      { id: 'targetAudience', label: 'Target Audience (optional)', placeholder: 'e.g., logistics professionals, compliance officers, new shippers', required: false },
      { id: 'wordCount', label: 'Target Word Count (optional)', placeholder: 'e.g., 1500 words (default: 1200-1500)', required: false },
      { id: 'includeTrending', label: 'Research Trending Topics?', type: 'checkbox', defaultValue: 'true', required: false }
    ]
  },
  '12': {
    name: 'Blog Topic Research',
    description: 'Research trending topics and generate blog post ideas with keyword opportunities',
    icon: <Lightbulb className="w-5 h-5" />,
    fields: [
      { id: 'researchArea', label: 'Research Area *', placeholder: 'e.g., IATA regulations, lithium batteries, hazmat compliance', required: true },
      { id: 'competitorUrls', label: 'Competitor URLs (optional)', placeholder: 'Paste competitor blog URLs to analyze their topics', multiline: true, rows: 3, required: false },
      { id: 'numberOfIdeas', label: 'Number of Ideas', placeholder: '10', defaultValue: '10', required: false }
    ]
  },
  '13': {
    name: 'Landing Page Builder (Beta)',
    description: 'Generate fast-loading HTML landing page with TDG branding, optimized for conversions',
    icon: <Layout className="w-5 h-5" />,
    fields: [
      {
        id: 'trainingCourse',
        label: 'Training Course *',
        type: 'select',
        required: true,
        options: [
          { value: '', label: 'Select a course...' },
          { value: 'IATA Category 6 - Shippers', label: 'IATA Category 6 - Shippers' },
          { value: 'IATA Category 3 - Freight Forwarders', label: 'IATA Category 3 - Freight Forwarders' },
          { value: 'IATA Category 1 - Operators', label: 'IATA Category 1 - Operators' },
          { value: 'IATA Recurrent Training', label: 'IATA Recurrent Training' },
          { value: 'DOT Hazmat General Awareness', label: 'DOT Hazmat General Awareness' },
          { value: 'DOT Hazmat Function-Specific', label: 'DOT Hazmat Function-Specific' },
          { value: 'DOT 49 CFR Ground Shipper', label: 'DOT 49 CFR Ground Shipper' },
          { value: 'IMDG Code - Ocean Shipping', label: 'IMDG Code - Ocean Shipping' },
          { value: 'Lithium Battery Shipping', label: 'Lithium Battery Shipping' },
          { value: 'Multimodal DG Training', label: 'Multimodal DG Training' },
          { value: 'Dry Ice Shipping', label: 'Dry Ice Shipping' },
          { value: 'Biological Substances (UN3373)', label: 'Biological Substances (UN3373)' }
        ]
      },
      {
        id: 'targetPersona',
        label: 'Target Persona *',
        type: 'select',
        required: true,
        options: [
          { value: '', label: 'Select a persona...' },
          { value: 'Compliance Manager - needs to keep team certified and audit-ready', label: 'Compliance Manager' },
          { value: 'Freight Forwarder - handles DG shipments for clients, needs certification', label: 'Freight Forwarder' },
          { value: 'Shipper/Warehouse - prepares DG packages, needs initial or renewal cert', label: 'Shipper/Warehouse' },
          { value: 'HR/Training Manager - enrolling employees in bulk training', label: 'HR/Training Manager' },
          { value: 'Small Business Owner - shipping DG products, carrier requires cert', label: 'Small Business Owner' },
          { value: 'Logistics Coordinator - managing DG compliance across operations', label: 'Logistics Coordinator' },
          { value: 'New Hire - first-time certification required for job', label: 'New Hire' }
        ]
      },
      {
        id: 'urgencyLevel',
        label: 'Urgency Context',
        type: 'select',
        required: false,
        options: [
          { value: '', label: 'No specific urgency' },
          { value: 'Certificate expiring soon - needs renewal ASAP', label: 'Certificate Expiring' },
          { value: 'Shipment rejected by carrier - needs cert to ship', label: 'Carrier Rejection' },
          { value: 'Audit coming up - needs compliance documentation', label: 'Upcoming Audit' },
          { value: 'New job requirement - must get certified to start', label: 'Job Requirement' },
          { value: 'Expanding to DG shipping - getting started', label: 'New to DG Shipping' }
        ]
      },
      { id: 'promotionOffer', label: 'Promotion/Offer (optional)', placeholder: 'e.g., 20% off for groups of 5+, Free DGR manual included', required: false },
      { id: 'courseUrl', label: 'Course URL for CTA *', placeholder: 'https://dgtraining.com/course-name/', required: true },
      { id: 'coursePrice', label: 'Course Price', placeholder: 'e.g., $199, $149 (sale)', required: false }
    ]
  }
};

export default function TDGSeoPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState('1');
  const [loading, setLoading] = useState(false);
  const [crawling, setCrawling] = useState(false);
  const [results, setResults] = useState('');
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [includeKB, setIncludeKB] = useState(true);
  const [kbStats, setKbStats] = useState<{ count: number; lastIndexed: string | null }>({ count: 0, lastIndexed: null });
  const [usedKB, setUsedKB] = useState(false);
  const { toast } = useToast();

  // Check for saved auth on mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('tdg-seo-auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch KB stats on mount (only if authenticated)
  useEffect(() => {
    if (isAuthenticated) {
      fetchKBStats();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === TOOL_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
      sessionStorage.setItem('tdg-seo-auth', 'true');
    } else {
      setAuthError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('tdg-seo-auth');
  };

  const fetchKBStats = async () => {
    try {
      const { data, error } = await supabase
        .from('tdg_knowledge_base')
        .select('last_indexed_at')
        .order('last_indexed_at', { ascending: false })
        .limit(100);

      if (!error && data) {
        setKbStats({
          count: data.length,
          lastIndexed: data[0]?.last_indexed_at || null
        });
      }
    } catch (e) {
      console.error('Error fetching KB stats:', e);
    }
  };

  const refreshKnowledgeBase = async () => {
    setCrawling(true);
    try {
      const { data, error } = await supabase.functions.invoke('tdg-crawl-kb');

      if (error) throw error;

      toast({
        title: "Knowledge Base Updated",
        description: `Indexed: ${data?.stats?.indexed || 0}, Updated: ${data?.stats?.updated || 0}`,
      });

      // Refresh stats
      await fetchKBStats();
    } catch (error) {
      console.error('Error crawling KB:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to crawl knowledge base',
        variant: "destructive",
      });
    } finally {
      setCrawling(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const currentPrompt = prompts[selectedPrompt];

  const isValid = (() => {
    const allRequiredFilled = currentPrompt.fields.every(field => {
      if (!field.required) return true;
      if (field.defaultValue) return true;
      return inputs[field.id] && inputs[field.id].trim() !== '';
    });

    // Special validation for tools 6 and 7 - need either URL or content/section
    if (selectedPrompt === '6') {
      const hasUrlOrContent = (inputs.contentUrl?.trim()) || (inputs.content?.trim());
      return allRequiredFilled && hasUrlOrContent;
    }
    if (selectedPrompt === '7') {
      const hasUrlOrSection = (inputs.sectionUrl?.trim()) || (inputs.section?.trim());
      return allRequiredFilled && hasUrlOrSection;
    }
    return allRequiredFilled;
  })();

  const generateContent = async () => {
    setLoading(true);
    setResults('');
    setUsedKB(false);

    try {
      // Include default values in inputs
      const finalInputs = { ...inputs };
      currentPrompt.fields.forEach(field => {
        if (field.defaultValue && !finalInputs[field.id]) {
          finalInputs[field.id] = field.defaultValue;
        }
      });

      const { data, error } = await supabase.functions.invoke('tdg-seo-generate', {
        body: { promptType: selectedPrompt, inputs: finalInputs, includeKB }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setResults(data?.content || 'No content generated');
      setUsedKB(data?.usedKB || false);
      toast({
        title: "Content Generated",
        description: data?.usedKB
          ? "Content generated with Knowledge Base context."
          : "Your SEO content has been generated successfully.",
      });
    } catch (error) {
      console.error('Error generating content:', error);
      setResults(`Error generating content: ${error instanceof Error ? error.message : 'Unknown error'}`);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to generate content',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(results);
    toast({
      title: "Copied",
      description: "Content copied to clipboard!",
    });
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8F9FA' }}>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center font-bold text-white text-2xl" style={{ backgroundColor: '#1C7C7C' }}>
                TDG
              </div>
            </div>
            <CardTitle style={{ color: '#1C7C7C' }}>SEO Content Generator</CardTitle>
            <p className="text-sm" style={{ color: '#6B7280' }}>Internal tool for Transportation Development Group</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="font-medium" style={{ color: '#2C3E50' }}>
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#6B7280' }} />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="pl-10"
                    autoFocus
                  />
                </div>
                {authError && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {authError}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full font-bold"
                style={{ backgroundColor: '#1C7C7C', color: '#FFFFFF' }}
              >
                Access Tool
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FA' }}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white" style={{ backgroundColor: '#1C7C7C' }}>
                  TDG
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black" style={{ color: '#2C3E50' }}>SEO Content Generator</h1>
                <p className="text-sm" style={{ color: '#6B7280' }}>Transportation Development Group</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="font-medium"
            >
              Logout
            </Button>
          </div>
          <p style={{ color: '#6B7280' }}>Generate optimized meta descriptions, FAQs, and content for dgtraining.com</p>
        </div>

        {/* Knowledge Base Controls */}
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
                          • Last indexed: {new Date(kbStats.lastIndexed).toLocaleDateString()}
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
                  <Switch
                    id="include-kb"
                    checked={includeKB}
                    onCheckedChange={setIncludeKB}
                  />
                  <Label htmlFor="include-kb" className="text-sm font-medium cursor-pointer" style={{ color: '#2C3E50' }}>
                    Include KB Context
                  </Label>
                </div>
                <Button
                  onClick={refreshKnowledgeBase}
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold" style={{ color: '#6B7280' }}>Content Type</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(prompts).map(([key, prompt]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedPrompt(key);
                      setInputs({});
                      setResults('');
                    }}
                    style={{
                      backgroundColor: selectedPrompt === key ? '#1C7C7C' : '#FFFFFF',
                      color: selectedPrompt === key ? '#FFFFFF' : '#2C3E50',
                      border: selectedPrompt === key ? 'none' : '2px solid #E5E7EB'
                    }}
                    className="w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 font-semibold text-sm hover:shadow-md"
                  >
                    {prompt.icon}
                    <span className="truncate">{prompt.name}</span>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Input Form */}
            <Card style={{ borderTop: '4px solid #1C7C7C' }}>
              <CardHeader>
                <CardTitle style={{ color: '#1C7C7C' }}>{currentPrompt.name}</CardTitle>
                <p className="text-sm" style={{ color: '#6B7280' }}>{currentPrompt.description}</p>
                <p className="text-xs" style={{ color: '#FF8C42' }}>* Required fields</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentPrompt.fields.map(field => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id} className="font-medium" style={{ color: '#2C3E50' }}>
                      {field.label}
                    </Label>
                    {field.type === 'checkbox' ? (
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={field.id}
                          checked={inputs[field.id] === 'true' || (!inputs[field.id] && field.defaultValue === 'true')}
                          onCheckedChange={(checked) => handleInputChange(field.id, checked ? 'true' : 'false')}
                        />
                        <Label htmlFor={field.id} className="text-sm font-normal">
                          Include trending topic analysis
                        </Label>
                      </div>
                    ) : field.type === 'select' ? (
                      <select
                        id={field.id}
                        value={inputs[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        style={{ color: inputs[field.id] ? '#2C3E50' : '#9CA3AF' }}
                      >
                        {field.options?.map(opt => (
                          <option key={opt.value} value={opt.value} style={{ color: '#2C3E50' }}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : field.multiline ? (
                      <Textarea
                        id={field.id}
                        value={inputs[field.id] || field.defaultValue || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        rows={field.rows || 3}
                        className="resize-none"
                      />
                    ) : (
                      <Input
                        id={field.id}
                        type="text"
                        value={inputs[field.id] || field.defaultValue || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}

                <Button
                  onClick={generateContent}
                  disabled={loading || !isValid}
                  className="w-full mt-6 font-bold"
                  style={{
                    backgroundColor: loading || !isValid ? '#D1D5DB' : '#1C7C7C',
                    color: '#FFFFFF'
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
                    {(selectedPrompt === '6' || selectedPrompt === '7')
                      ? 'Please provide either a URL or paste content, and fill all required fields'
                      : 'Please fill in all required fields'}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Results */}
            {results && (
              <Card style={{ borderTop: '4px solid #FF8C42' }}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-6 h-6" style={{ color: '#1C7C7C' }} />
                      <CardTitle style={{ color: '#1C7C7C' }}>Generated Content</CardTitle>
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
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      size="sm"
                      className="font-semibold"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    className="rounded-lg p-6 border-2 whitespace-pre-wrap text-sm leading-relaxed font-medium"
                    style={{ backgroundColor: '#F9FAFB', borderColor: '#E5E7EB', color: '#2C3E50' }}
                  >
                    {results}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Card style={{ borderLeft: '4px solid #FF8C42' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base" style={{ color: '#1C7C7C' }}>
                  <Lightbulb className="w-5 h-5" style={{ color: '#FF8C42' }} />
                  Dangerous Goods SEO Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 font-medium" style={{ color: '#2C3E50' }}>
                  <li className="flex items-start gap-2">
                    <span style={{ color: '#FF8C42' }} className="font-black">•</span>
                    <span><strong>Focus Keyphrase:</strong> Choose one main keyphrase per page (e.g., &quot;iata certification online&quot;)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: '#FF8C42' }} className="font-black">•</span>
                    <span><strong>Keyphrase Placement:</strong> Include in title, first paragraph, headings, meta, and URL</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: '#FF8C42' }} className="font-black">•</span>
                    <span><strong>Keyword Density:</strong> Aim for 1-2% - use naturally without stuffing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: '#FF8C42' }} className="font-black">•</span>
                    <span>Use proper industry terms (DGR, IATA, IMDG, Hazmat, 49 CFR)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: '#FF8C42' }} className="font-black">•</span>
                    <span>Reference specific regulations and training categories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: '#FF8C42' }} className="font-black">•</span>
                    <span>Emphasize compliance, safety, and certification validity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: '#FF8C42' }} className="font-black">•</span>
                    <span>Target logistics professionals and compliance officers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: '#FF8C42' }} className="font-black">•</span>
                    <span>Use specifics: &quot;24-month validity&quot;, &quot;9 classes&quot;, &quot;Category 6&quot;</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
