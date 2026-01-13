'use client';

import { Badge } from '@/components/ui/badge';
import { Calendar, User, Clock } from 'lucide-react';
import { sanitizeHtml } from '@/utils/sanitizeHtml';
import type { BlogPost as BlogPostType } from '@/services/blogService';

interface BlogPostProps {
  post: BlogPostType;
}

export const BlogPost = ({ post }: BlogPostProps) => {
  const publishedDate = new Date(post.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const readingTime = Math.ceil((post.content_html?.length || post.content_markdown?.length || 0) / 1000);

  return (
    <article className="max-w-4xl mx-auto">
      {/* Cover Image */}
      {post.cover_image_url && (
        <div className="aspect-video overflow-hidden rounded-lg mb-8">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {publishedDate}
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {post.author}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {readingTime} min read
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Tags and Category */}
        <div className="flex flex-wrap gap-2">
          {post.category && (
            <Badge variant="secondary" className="text-sm">
              {post.category}
            </Badge>
          )}
          {post.tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="text-sm">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80">
        {post.content_html ? (
          <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content_html) }} />
        ) : post.content_markdown ? (
          <div className="whitespace-pre-wrap">
            {post.content_markdown}
          </div>
        ) : (
          <p className="text-muted-foreground">No content available.</p>
        )}
      </div>
    </article>
  );
};
