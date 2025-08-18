-- Add RLS policies to allow edge functions to manage posts
-- These policies will allow the edge functions (running with service role) to manage posts

-- Allow edge functions to insert posts
CREATE POLICY "Edge functions can insert posts" 
ON public.posts 
FOR INSERT 
TO service_role
WITH CHECK (true);

-- Allow edge functions to update posts
CREATE POLICY "Edge functions can update posts" 
ON public.posts 
FOR UPDATE 
TO service_role
USING (true);

-- Allow edge functions to delete posts
CREATE POLICY "Edge functions can delete posts" 
ON public.posts 
FOR DELETE 
TO service_role
USING (true);

-- Allow edge functions to select all posts (for admin operations)
CREATE POLICY "Edge functions can select all posts" 
ON public.posts 
FOR SELECT 
TO service_role
USING (true);