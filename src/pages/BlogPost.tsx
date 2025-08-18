import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import StructuredData from "@/components/SEO/StructuredData";
import { useEffect } from "react";

interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content_markdown: string;
  cover_image_url: string | null;
  published_at: string;
  author_name: string | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      if (!slug) throw new Error("No slug provided");

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error("Post not found");

      return data as BlogPostData;
    },
    enabled: !!slug,
  });

  // SEO: Update document title and meta tags
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Blog`;

      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", post.excerpt || post.title);
      }

      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", `${window.location.origin}/blog/${post.slug}`);
    }

    return () => {
      document.title = "Your Site Title";
    };
  }, [post]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-muted rounded w-32" />
              <div className="h-12 bg-muted rounded w-3/4" />
              <div className="h-64 bg-muted rounded" />
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-muted rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/blog")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SEO Structured Data */}
      <StructuredData
        type="Portfolio"
        data={{
          "@type": "Article",
          headline: post.title,
          description: post.excerpt || post.title,
          image: post.cover_image_url,
          datePublished: post.published_at,
          author: {
            "@type": "Person",
            name: post.author_name || "Author",
          },
          publisher: {
            "@type": "Organization",
            name: "Your Site Name",
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${window.location.origin}/blog/${post.slug}`,
          },
          url: `${window.location.origin}/blog/${post.slug}`,
        }}
      />

      <article className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">

            {/* Back Button */}
            <Button
              variant="outline"
              onClick={() => navigate("/blog")}
              className="mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>

            {/* Cover Image */}
            {post.cover_image_url ? (
              <div className="aspect-video overflow-hidden rounded-lg mb-8">
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="aspect-video bg-muted rounded-lg mb-8 flex items-center justify-center text-muted-foreground text-sm italic">
                No image available
              </div>
            )}

            {/* Post Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <time dateTime={post.published_at}>
                    {format(new Date(post.published_at), "MMM d, yyyy")}
                  </time>
                </div>
                {post.author_name && (
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span>{post.author_name}</span>
                  </div>
                )}
              </div>

              {post.excerpt && (
                <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
            </header>

            {/* Markdown Content */}
            <div className="prose prose-lg max-w-none 
              prose-headings:text-foreground prose-headings:font-bold
              prose-p:text-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:pl-6 prose-blockquote:py-4
              prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
              prose-pre:bg-muted prose-pre:border prose-pre:border-border
              prose-img:rounded-lg prose-img:shadow-md
              prose-hr:border-border
              prose-table:border prose-table:border-border
              prose-th:bg-muted prose-th:border prose-th:border-border prose-th:px-4 prose-th:py-2
              prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2
              dark:prose-invert">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content_markdown}
              </ReactMarkdown>
            </div>

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-border">
              <Button
                variant="outline"
                onClick={() => navigate("/blog")}
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to all posts
              </Button>
            </footer>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;