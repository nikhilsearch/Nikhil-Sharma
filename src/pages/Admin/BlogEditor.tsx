import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  excerpt: z.string().optional(),
  content_markdown: z.string().min(1, "Content is required"),
  cover_image_url: z.string().url().optional().or(z.literal("")),
  author_name: z.string().optional(),
  status: z.enum(["draft", "published"]),
});

type BlogPostForm = z.infer<typeof blogPostSchema>;

const BlogEditor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [adminToken, setAdminToken] = useState<string>(
    typeof window !== 'undefined' ? localStorage.getItem('ADMIN_BLOG_TOKEN') || '' : ''
  );

  const isEditMode = !!id;

  // Fetch existing post data for edit mode
  const { data: existingPost, isLoading: isLoadingPost } = useQuery({
    queryKey: ["blog-post-edit", id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: isEditMode,
  });

  const form = useForm<BlogPostForm>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content_markdown: "",
      cover_image_url: "",
      author_name: "",
      status: "draft",
    },
  });

  // Populate form with existing post data in edit mode
  useEffect(() => {
    if (existingPost && isEditMode) {
      form.reset({
        title: existingPost.title,
        slug: existingPost.slug,
        excerpt: existingPost.excerpt || "",
        content_markdown: existingPost.content_markdown,
        cover_image_url: existingPost.cover_image_url || "",
        author_name: existingPost.author_name || "",
        status: existingPost.status,
      });
    }
  }, [existingPost, isEditMode, form]);

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    form.setValue("slug", slug);
  };

  const onSubmit = async (data: BlogPostForm) => {
    setIsLoading(true);
    try {
      if (!adminToken) {
        toast({
          title: "Admin token required",
          description: "Paste your ADMIN_BLOG_TOKEN above and click Save.",
          variant: "destructive",
        });
        return;
      }

      if (isEditMode && id) {
        // Update existing post
        const { data: result, error } = await supabase.functions.invoke('update-post', {
          body: { ...data, id },
          headers: { 'x-admin-token': adminToken },
        });

        if (error) {
          throw error;
        }

        if (result.error) {
          throw new Error(result.error);
        }

        toast({
          title: "Success!",
          description: `Blog post ${data.status === 'published' ? 'updated and published' : 'updated as draft'} successfully.`,
        });

        // Navigate back to blog
        navigate('/blog');
      } else {
        // Create new post
        const { data: result, error } = await supabase.functions.invoke('create-post', {
          body: data,
          headers: { 'x-admin-token': adminToken },
        });

        if (error) {
          throw error;
        }

        if (result.error) {
          throw new Error(result.error);
        }

        toast({
          title: "Success!",
          description: `Blog post ${data.status === 'published' ? 'published' : 'saved as draft'} successfully.`,
        });

        // Reset form
        form.reset();
      }
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} post:`, error);
      toast({
        title: "Error",
        description: `Failed to ${isEditMode ? 'update' : 'create'} blog post. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditMode && isLoadingPost) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/blog">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">
            {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Save className="w-5 h-5" />
              Blog Post Editor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <FormLabel>Admin Token</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder="Paste ADMIN_BLOG_TOKEN"
                  value={adminToken}
                  onChange={(e) => setAdminToken(e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    localStorage.setItem('ADMIN_BLOG_TOKEN', adminToken);
                    toast({ title: 'Saved', description: 'Admin token saved locally.' });
                  }}
                >
                  Save
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Stored in your browser only. Required to create posts.</p>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter blog post title"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              handleTitleChange(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug *</FormLabel>
                        <FormControl>
                          <Input placeholder="auto-generated-from-title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description of the blog post..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="cover_image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="author_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="content_markdown"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content (Markdown) *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your blog post content in Markdown..."
                          className="min-h-[400px] font-mono"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <Button type="submit" disabled={isLoading} className="flex-1">
                    {isLoading ? (isEditMode ? "Updating..." : "Creating...") : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {isEditMode ? 'Update Blog Post' : 'Create Blog Post'}
                      </>
                    )}
                  </Button>
                  
                  <Link to="/blog" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Blog
                    </Button>
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>📝 Manual Supabase Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Step 1: Access Supabase Dashboard</h3>
              <p className="text-sm text-muted-foreground mb-2">Go to your Supabase project dashboard and open the SQL Editor.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Step 2: Insert Blog Post Data</h3>
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`INSERT INTO posts (
  title, 
  slug, 
  content_markdown, 
  excerpt, 
  author_name, 
  cover_image_url, 
  status, 
  published_at
) VALUES (
  'Generative Engine Optimization',
  'generative-engine-optimization',
  '# Generative Engine Optimization
  
Your full markdown content here...',
  'Learn about GEO and how it impacts search...',
  'Your Name',
  'https://your-image-url.com/image.jpg',
  'published',
  NOW()
);`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Step 3: Upload Images to Supabase Storage</h3>
              <p className="text-sm text-muted-foreground">Upload images to the 'blog-media' bucket and use the public URL in cover_image_url.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogEditor;