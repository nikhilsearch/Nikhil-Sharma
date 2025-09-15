import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Edit, ExternalLink } from "lucide-react";
import StructuredData from "@/components/SEO/StructuredData"; // Fixed import
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string;
  author_name: string | null;
  status: string;
  created_at: string;
}

const Blog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, slug, title, excerpt, cover_image_url, published_at, author_name, status, created_at")
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data as BlogPost[];
    },
  });

  // External blog posts from Substack
  const externalPosts = [
    {
      id: "external-1",
      title: "AI SEO: How AI Search Deconstructs Traditional SEO",
      excerpt: "Explore how AI-powered search engines are revolutionizing SEO strategies and what it means for digital marketing professionals.",
      url: "https://imnikhil10.substack.com/p/ai-seo-how-ai-search-deconstructs",
      published_at: "2025-08-27",
      author_name: "Nikhil Sharma",
      isExternal: true
    },
    {
      id: "external-2", 
      title: "Organization Schema for AI Search",
      excerpt: "Learn how to implement organization schema markup to improve your visibility in AI-powered search results.",
      url: "https://imnikhil10.substack.com/p/organization-schema-for-ai-search",
      published_at: "2025-08-25",
      author_name: "Nikhil Sharma",
      isExternal: true
    }
  ];

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
      
      <Header />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 pt-32">
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
              {/* External Featured Posts */}
              {externalPosts.map((post) => (
                <div key={post.id} className="relative">
                  <a href={post.url} target="_blank" rel="noopener noreferrer">
                    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border/50 bg-gradient-to-br from-primary/5 to-purple-500/5">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {format(new Date(post.published_at), "MMM d, yyyy")}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {post.author_name}
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                        <h2 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                        <Button variant="ghost" className="p-0 h-auto font-semibold group-hover:text-primary">
                          Read on Substack
                          <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </a>
                </div>
              ))}
              
              {/* Internal Blog Posts */}
              {posts?.filter(post => 
                post.status === 'published' && 
                post.id !== 'c0d258e3-9a79-40e4-a8cf-711236a40bdb' // Filter out GEO post
              ).map((post) => (
                <div key={post.id} className="relative">
                  <Link to={`/blog/${post.slug}`}>
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
                  
                  {/* Edit button - only visible on hover */}
                  <Link 
                    to={`/admin/blog-edit/${post.id}`}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button size="sm" variant="secondary" className="shadow-lg">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              ))}
              
              {/* Show all posts including drafts for admin purposes */}
              {posts?.filter(post => post.status === 'draft').map((post) => (
                <div key={post.id} className="relative">
                  <Card className="border-dashed border-2 border-muted-foreground/30 opacity-60">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline">Draft</Badge>
                        <Link to={`/admin/blog-edit/${post.id}`}>
                          <Button size="sm" variant="secondary">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </Link>
                      </div>
                      <h2 className="text-xl font-semibold line-clamp-2">
                        {post.title}
                      </h2>
                    </CardHeader>
                    <CardContent>
                      {post.excerpt && (
                        <p className="text-muted-foreground line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Created: {format(new Date(post.published_at || post.created_at), "MMM d, yyyy")}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Blog;