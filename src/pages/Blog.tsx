import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import StructuredData from "@/components/SEO/StructuredData";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string;
  author_name: string | null;
}

const Blog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, slug, title, excerpt, cover_image_url, published_at, author_name")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data as BlogPost[];
    },
  });

  return (
    <>
      <StructuredData
        type="WebSite"
        data={{
          name: "Blog",
          description: "Latest insights and articles on SEO, AI, and digital marketing",
          url: `${window.location.origin}/blog`
        }}
      />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Latest</span>{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Insights
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the latest trends in SEO, AI, and digital marketing strategy
            </p>
          </header>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg" />
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded" />
                      <div className="h-3 bg-muted rounded w-5/6" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : !posts?.length ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">No posts yet</h2>
              <p className="text-muted-foreground">Check back soon for new content!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border/50">
                    {post.cover_image_url && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(post.published_at), "MMM d, yyyy")}
                        </div>
                        {post.author_name && (
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author_name}
                          </div>
                        )}
                      </div>
                      <h2 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                    </CardHeader>
                    <CardContent>
                      {post.excerpt && (
                        <p className="text-muted-foreground line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                      )}
                      <Button variant="ghost" className="p-0 h-auto font-semibold group-hover:text-primary">
                        Read more
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;