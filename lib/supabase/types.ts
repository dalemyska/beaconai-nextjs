export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      care_assessments: {
        Row: {
          id: string
          created_at: string
          user_name: string
          user_email: string
          company_name: string
          company_website: string
          detected_industry: string | null
          user_role: string
          responses: Json
          company_context: string | null
          insights: Json | null
          solution_summary: string | null
          culture_score: number | null
          adoption_score: number | null
          readiness_score: number | null
          evolution_score: number | null
          overall_score: number | null
          status: string | null
          pdf_url: string | null
          email_sent: boolean | null
          email_sent_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_name: string
          user_email: string
          company_name: string
          company_website: string
          detected_industry?: string | null
          user_role: string
          responses: Json
          company_context?: string | null
          insights?: Json | null
          solution_summary?: string | null
          culture_score?: number | null
          adoption_score?: number | null
          readiness_score?: number | null
          evolution_score?: number | null
          overall_score?: number | null
          status?: string | null
          pdf_url?: string | null
          email_sent?: boolean | null
          email_sent_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_name?: string
          user_email?: string
          company_name?: string
          company_website?: string
          detected_industry?: string | null
          user_role?: string
          responses?: Json
          company_context?: string | null
          insights?: Json | null
          solution_summary?: string | null
          culture_score?: number | null
          adoption_score?: number | null
          readiness_score?: number | null
          evolution_score?: number | null
          overall_score?: number | null
          status?: string | null
          pdf_url?: string | null
          email_sent?: boolean | null
          email_sent_at?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: string
          slug: string
          title: string
          author: string
          category: string
          tags: string[]
          excerpt: string
          content_markdown: string | null
          content_html: string | null
          cover_image_url: string | null
          featured: boolean
          published: boolean
          published_at: string
          meta_description: string | null
          seo_keywords: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          author: string
          category: string
          tags?: string[]
          excerpt: string
          content_markdown?: string | null
          content_html?: string | null
          cover_image_url?: string | null
          featured?: boolean
          published?: boolean
          published_at?: string
          meta_description?: string | null
          seo_keywords?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          author?: string
          category?: string
          tags?: string[]
          excerpt?: string
          content_markdown?: string | null
          content_html?: string | null
          cover_image_url?: string | null
          featured?: boolean
          published?: boolean
          published_at?: string
          meta_description?: string | null
          seo_keywords?: string[]
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      tdg_knowledge_base: {
        Row: {
          id: string
          last_indexed_at: string | null
        }
        Insert: {
          id?: string
          last_indexed_at?: string | null
        }
        Update: {
          id?: string
          last_indexed_at?: string | null
        }
        Relationships: []
      }
      Website_Leads: {
        Row: {
          campaign: string | null
          company: string | null
          email: string
          id: string
          message: string | null
          metadata: Json | null
          name: string
          phone: string | null
          source: string
          submitted_at: string
        }
        Insert: {
          campaign?: string | null
          company?: string | null
          email: string
          id?: string
          message?: string | null
          metadata?: Json | null
          name: string
          phone?: string | null
          source: string
          submitted_at?: string
        }
        Update: {
          campaign?: string | null
          company?: string | null
          email?: string
          id?: string
          message?: string | null
          metadata?: Json | null
          name?: string
          phone?: string | null
          source?: string
          submitted_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      match_documents: {
        Args: { query_embedding: string; match_count?: number; filter?: Json }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
