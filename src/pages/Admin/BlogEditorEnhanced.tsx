import { useState, useEffect, useCallback } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Eye, Clock, Zap } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RichTextEditor } from "@/components/RichTextEditor";
import { ImageUploader } from "@/components/ImageUploader";
import { BlogPreview } from "@/components/BlogPreview";
import { calculateReadingTime } from "@/utils/readingTime";

const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
  excerpt: z.string().optional(),
  content_markdown: z.string().min(1, "Content is required"),
  content_html: z.string().min(1, "HTML content is required"),
  cover_image_url: z.string().url().optional().or(z.literal("")),
  featured_image_alt: z.string().optional(),
  author_name: z.string().optional(),
  author_bio: z.string().optional(),
  author_avatar_url: z.string().url().optional().or(z.literal("")),
  status: z.enum(["draft", "published"]),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  meta_keywords: z.string().optional(),
  schema_data: z.any().optional(),
  social_sharing: z.any().optional(),
});

type BlogPostForm = z.infer<typeof blogPostSchema>;

const BlogEditorEnhanced = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState('content');
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
      content_html: "",
      cover_image_url: "",
      featured_image_alt: "",
      author_name: "",
      author_bio: "",
      author_avatar_url: "",
      status: "draft",
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
      schema_data: {},
      social_sharing: {
        facebook: true,
        twitter: true,
        linkedin: true,
        pinterest: true
      }
    },
  });

  // Watch form values for auto-save
  const watchedValues = form.watch();

  // Populate form with existing post data in edit mode
  useEffect(() => {
    if (existingPost && isEditMode) {
      form.reset({
        title: existingPost.title,
        slug: existingPost.slug,
        excerpt: existingPost.excerpt || "",
        content_markdown: existingPost.content_markdown,
        content_html: existingPost.content_html || existingPost.content_markdown,
        cover_image_url: existingPost.cover_image_url || "",
        featured_image_alt: existingPost.featured_image_alt || "",
        author_name: existingPost.author_name || "",
        author_bio: existingPost.author_bio || "",
        author_avatar_url: existingPost.author_avatar_url || "",
        status: existingPost.status,
        meta_title: existingPost.meta_title || "",
        meta_description: existingPost.meta_description || "",
        meta_keywords: existingPost.meta_keywords || "",
        schema_data: existingPost.schema_data || {},
        social_sharing: existingPost.social_sharing || {
          facebook: true,
          twitter: true,
          linkedin: true,
          pinterest: true
        }
      });
    }
  }, [existingPost, isEditMode, form]);

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    if (!isEditMode || !id || !adminToken) return;

    setAutoSaving(true);
    try {
      const formData = form.getValues();
      const readingTimeMinutes = calculateReadingTime(formData.content_html || formData.content_markdown);
      
      const { error } = await supabase.functions.invoke('update-post', {
        body: { 
          ...formData, 
          id,
          reading_time: readingTimeMinutes,
          draft_data: formData
        },
        headers: { 'x-admin-token': adminToken },
      });

      if (!error) {
        setLastSaved(new Date());
      }
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setAutoSaving(false);
    }
  }, [form, isEditMode, id, adminToken]);

  // Auto-save every 30 seconds when content changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isEditMode && watchedValues.content_html) {
        autoSave();
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [watchedValues, autoSave, isEditMode]);

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    form.setValue("slug", slug);
    
    // Auto-generate meta title if not set
    if (!form.getValues("meta_title")) {
      form.setValue("meta_title", title);
    }
  };

  // Handle image upload
  const handleImageUpload = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `blog-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('blog-media')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('blog-media')
      .getPublicUrl(filePath);

    return data.publicUrl;
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

      // Calculate reading time
      const readingTimeMinutes = calculateReadingTime(data.content_html || data.content_markdown);
      const postData = {
        ...data,
        reading_time: readingTimeMinutes,
        published_at: data.status === 'published' ? new Date().toISOString() : null
      };

      if (isEditMode && id) {
        // Update existing post
        const { data: result, error } = await supabase.functions.invoke('update-post', {
          body: { ...postData, id },
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

        // Navigate back to admin
        navigate('/admin/blog');
      } else {
        // Create new post
        const { data: result, error } = await supabase.functions.invoke('create-post', {
          body: postData,
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

        // Navigate to edit mode for the new post
        navigate(`/admin/blog/edit/${result.id}`);
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
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin/blog">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Admin
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
              </h1>
              {lastSaved && (
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Last saved: {lastSaved.toLocaleTimeString()}
                  {autoSaving && <span className="text-blue-500">(Auto-saving...)</span>}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {autoSaving && (
              <div className="flex items-center gap-1 text-sm text-blue-500">
                <Zap className="w-3 h-3 animate-pulse" />
                Auto-saving...
              </div>
            )}
          </div>
        </div>

        {/* Admin Token */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <Input
                placeholder="Paste ADMIN_BLOG_TOKEN"
                value={adminToken}
                onChange={(e) => setAdminToken(e.target.value)}
                type="password"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  localStorage.setItem('ADMIN_BLOG_TOKEN', adminToken);
                  toast({ title: 'Saved', description: 'Admin token saved locally.' });
                }}
              >
                Save Token
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="seo">SEO & Meta</TabsTrigger>
            <TabsTrigger value="social">Social & Author</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TabsContent value="content" className="space-y-6">
                {/* Basic Content */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
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
                  </CardContent>
                </Card>

                {/* Cover Image */}
                <Card>
                  <CardHeader>
                    <CardTitle>Cover Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="cover_image_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <ImageUploader
                              onImageUpload={field.onChange}
                              currentImage={field.value}
                              alt={form.watch("featured_image_alt")}
                              onAltChange={(alt) => form.setValue("featured_image_alt", alt)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Rich Text Editor */}
                <FormField
                  control={form.control}
                  name="content_html"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={(content) => {
                            field.onChange(content);
                            // Also update markdown for backward compatibility
                            form.setValue("content_markdown", content);
                          }}
                          onImageUpload={handleImageUpload}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="seo" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>SEO & Meta Tags</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="meta_title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Title</FormLabel>
                          <FormControl>
                            <Input placeholder="SEO title (defaults to post title)" {...field} />
                          </FormControl>
                          <p className="text-xs text-muted-foreground">
                            Recommended: 50-60 characters
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="meta_description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="SEO description for search results..."
                              {...field}
                            />
                          </FormControl>
                          <p className="text-xs text-muted-foreground">
                            Recommended: 150-160 characters
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="meta_keywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Keywords</FormLabel>
                          <FormControl>
                            <Input placeholder="keyword1, keyword2, keyword3" {...field} />
                          </FormControl>
                          <p className="text-xs text-muted-foreground">
                            Comma-separated keywords for SEO
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="social" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Author Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                      <FormField
                        control={form.control}
                        name="author_avatar_url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Author Avatar URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com/avatar.jpg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="author_bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Author Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Brief bio about the author..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Social Sharing Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { key: 'facebook', label: 'Facebook' },
                        { key: 'twitter', label: 'Twitter' },
                        { key: 'linkedin', label: 'LinkedIn' },
                        { key: 'pinterest', label: 'Pinterest' },
                      ].map((platform) => (
                        <div key={platform.key} className="flex items-center justify-between">
                          <label className="text-sm font-medium">{platform.label}</label>
                          <Switch
                            checked={form.watch(`social_sharing.${platform.key}`)}
                            onCheckedChange={(checked) => 
                              form.setValue(`social_sharing.${platform.key}`, checked)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preview">
                <BlogPreview
                  title={form.watch("title")}
                  excerpt={form.watch("excerpt")}
                  content={form.watch("content_html") || form.watch("content_markdown")}
                  coverImage={form.watch("cover_image_url")}
                  authorName={form.watch("author_name")}
                  authorBio={form.watch("author_bio")}
                  authorAvatar={form.watch("author_avatar_url")}
                  publishedAt={form.watch("status") === "published" ? new Date() : undefined}
                  status={form.watch("status")}
                  metaTitle={form.watch("meta_title")}
                  metaDescription={form.watch("meta_description")}
                  metaKeywords={form.watch("meta_keywords")}
                />
              </TabsContent>

              <div className="flex gap-4 pt-6">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? (isEditMode ? "Updating..." : "Creating...") : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {isEditMode ? 'Update Blog Post' : 'Create Blog Post'}
                    </>
                  )}
                </Button>
                
                <Link to="/admin/blog" className="flex-1">
                  <Button type="button" variant="outline" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    View All Posts
                  </Button>
                </Link>
              </div>
            </form>
          </Form>
        </Tabs>
      </div>
    </div>
  );
};

export default BlogEditorEnhanced;