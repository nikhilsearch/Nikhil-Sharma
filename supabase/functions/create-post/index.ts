import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify admin token
    const authHeader = req.headers.get('authorization');
    const xAdminHeader = req.headers.get('x-admin-token');
    const adminToken = Deno.env.get('ADMIN_BLOG_TOKEN');
    
    const isAuthorized =
      (authHeader && authHeader === `Bearer ${adminToken}`) ||
      (xAdminHeader && xAdminHeader === adminToken);
    
    if (!isAuthorized) {
      console.log('Unauthorized access attempt');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { title, content_markdown, excerpt, cover_image_url, author_name, slug, status } = await req.json();

    // Validate required fields
    if (!title || !content_markdown || !slug) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: title, content_markdown, slug' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Initialize Supabase client with service role key for admin operations
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Create the blog post
    const { data, error } = await supabase
      .from('posts')
      .insert({
        title,
        content_markdown,
        excerpt,
        cover_image_url,
        author_name,
        slug,
        status: status || 'draft',
        published_at: status === 'published' ? new Date().toISOString() : null
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to create post', details: error.message }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Blog post created successfully:', data.id);
    return new Response(
      JSON.stringify({ success: true, post: data }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in create-post function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});