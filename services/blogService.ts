import { supabase } from '@/lib/supabase/client';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  category: string;
  tags: string[];
  excerpt: string;
  content_markdown: string | null;
  content_html: string | null;
  cover_image_url: string | null;
  featured: boolean;
  published: boolean;
  published_at: string;
  meta_description: string | null;
  seo_keywords: string[];
  created_at: string;
  updated_at: string;
}

export interface PaginatedBlogPosts {
  posts: BlogPost[];
  total: number;
  totalPages: number;
  currentPage: number;
}

const blogTable = () => supabase.from('blog_posts');

export const getBlogPosts = async (limit?: number): Promise<BlogPost[]> => {
  try {
    const { data, error } = await blogTable()
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(limit || 1000);

    if (error) {
      console.log('Blog posts not available yet');
      return [];
    }

    return data || [];
  } catch (error) {
    console.log('Blog functionality not ready yet');
    return [];
  }
};

export const getFeaturedPosts = async (limit = 3): Promise<BlogPost[]> => {
  try {
    const { data, error } = await blogTable()
      .select('*')
      .eq('published', true)
      .eq('featured', true)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.log('Featured posts not available yet');
      return [];
    }

    return data || [];
  } catch (error) {
    console.log('Blog functionality not ready yet');
    return [];
  }
};

export const getPaginatedBlogPosts = async (
  page: number = 1,
  pageSize: number = 8,
  selectedTags?: string[]
): Promise<PaginatedBlogPosts> => {
  try {
    const offset = (page - 1) * pageSize;

    let query = blogTable()
      .select('*', { count: 'exact' })
      .eq('published', true)
      .order('published_at', { ascending: false });

    // Filter by tags if provided
    if (selectedTags && selectedTags.length > 0) {
      query = query.overlaps('tags', selectedTags);
    }

    const { data, error, count } = await query
      .range(offset, offset + pageSize - 1);

    if (error) {
      console.log('Paginated blog posts not available yet:', error);
      return { posts: [], total: 0, totalPages: 0, currentPage: page };
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      posts: data || [],
      total,
      totalPages,
      currentPage: page
    };
  } catch (error) {
    console.log('Blog functionality not ready yet:', error);
    return { posts: [], total: 0, totalPages: 0, currentPage: page };
  }
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const { data, error } = await blogTable()
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    if (error) {
      console.log('Blog post not found or not available yet:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.log('Blog functionality not ready yet:', error);
    return null;
  }
};

export const getRelatedPosts = async (
  category: string,
  excludeSlug: string,
  limit: number = 3
): Promise<BlogPost[]> => {
  try {
    const { data, error } = await blogTable()
      .select('*')
      .eq('published', true)
      .eq('category', category)
      .neq('slug', excludeSlug)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.log('Related posts not available yet:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.log('Blog functionality not ready yet:', error);
    return [];
  }
};

export const getBlogTags = async (): Promise<string[]> => {
  try {
    const { data, error } = await blogTable()
      .select('tags')
      .eq('published', true)
      .not('tags', 'is', null);

    if (error) {
      console.log('Blog tags not available yet:', error);
      return [];
    }

    // Flatten all tag arrays and get unique tags
    const allTags = data?.reduce((acc: string[], item: { tags: string[] | null }) => {
      if (item.tags && Array.isArray(item.tags)) {
        return [...acc, ...item.tags];
      }
      return acc;
    }, []) || [];

    const uniqueTags = [...new Set(allTags)].filter(Boolean) as string[];
    return uniqueTags;
  } catch (error) {
    console.log('Blog functionality not ready yet:', error);
    return [];
  }
};

export const getBlogCategories = async (): Promise<string[]> => {
  try {
    const { data, error } = await blogTable()
      .select('category')
      .eq('published', true)
      .not('category', 'is', null);

    if (error) {
      console.log('Blog categories not available yet');
      return [];
    }

    const categories = [...new Set(data?.map((item: { category: string | null }) => item.category).filter(Boolean))] as string[];
    return categories || [];
  } catch (error) {
    console.log('Blog functionality not ready yet');
    return [];
  }
};

export const getPostsByCategory = async (category: string): Promise<BlogPost[]> => {
  try {
    const { data, error } = await blogTable()
      .select('*')
      .eq('category', category)
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (error) {
      console.log('Blog posts by category not available yet');
      return [];
    }

    return data || [];
  } catch (error) {
    console.log('Blog functionality not ready yet');
    return [];
  }
};

export const getPostsByTags = async (tags: string[]): Promise<BlogPost[]> => {
  try {
    const { data, error } = await blogTable()
      .select('*')
      .overlaps('tags', tags)
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (error) {
      console.log('Blog posts by tags not available yet:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.log('Blog functionality not ready yet:', error);
    return [];
  }
};
