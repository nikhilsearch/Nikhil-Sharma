import React from 'react';
import parse from 'html-react-parser';
import { Calendar, Clock, User, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SocialSharing } from './SocialSharing';
import { format } from 'date-fns';
import { calculateReadingTime, formatReadingTime } from '@/utils/readingTime';

interface BlogPreviewProps {
  title: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  authorName?: string;
  authorBio?: string;
  authorAvatar?: string;
  publishedAt?: Date;
  status: 'draft' | 'published';
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export const BlogPreview: React.FC<BlogPreviewProps> = ({
  title,
  excerpt,
  content,
  coverImage,
  authorName,
  authorBio,
  authorAvatar,
  publishedAt,
  status,
  metaTitle,
  metaDescription,
  metaKeywords
}) => {
  const readingTimeMinutes = calculateReadingTime(content || '');
  const currentUrl = window.location.href;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* SEO Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            SEO Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted/30">
              <h3 className="text-blue-600 text-lg font-medium line-clamp-1">
                {metaTitle || title}
              </h3>
              <p className="text-green-700 text-sm">
                {currentUrl}
              </p>
              <p className="text-gray-600 text-sm line-clamp-2 mt-1">
                {metaDescription || excerpt || 'No description available'}
              </p>
            </div>
            {metaKeywords && (
              <div>
                <p className="text-sm font-medium mb-2">Meta Keywords:</p>
                <div className="flex flex-wrap gap-1">
                  {metaKeywords.split(',').map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {keyword.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Blog Post Preview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Blog Post Preview</CardTitle>
            <Badge variant={status === 'published' ? 'default' : 'secondary'}>
              {status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <article className="prose prose-lg max-w-none">
            {coverImage && (
              <img
                src={coverImage}
                alt={title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}

            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
              
              {excerpt && (
                <p className="text-xl text-muted-foreground mb-6">{excerpt}</p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                {authorName && (
                  <div className="flex items-center gap-2">
                    {authorAvatar ? (
                      <img
                        src={authorAvatar}
                        alt={authorName}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    <span>{authorName}</span>
                  </div>
                )}

                {publishedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{format(publishedAt, 'MMMM d, yyyy')}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatReadingTime(readingTimeMinutes)}</span>
                </div>
              </div>
            </header>

            <div className="blog-content">
              {content ? parse(content) : <p>No content available</p>}
            </div>

            {authorBio && (
              <div className="mt-12 p-6 bg-muted/30 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">About the Author</h3>
                <div className="flex gap-4">
                  {authorAvatar && (
                    <img
                      src={authorAvatar}
                      alt={authorName}
                      className="w-16 h-16 rounded-full"
                    />
                  )}
                  <div>
                    {authorName && (
                      <h4 className="font-medium mb-2">{authorName}</h4>
                    )}
                    <p className="text-muted-foreground">{authorBio}</p>
                  </div>
                </div>
              </div>
            )}
          </article>
        </CardContent>
      </Card>

      {/* Social Sharing */}
      <SocialSharing
        title={title}
        excerpt={excerpt}
        url={currentUrl}
      />
    </div>
  );
};