-- Create enum for post status
DO $$ BEGIN
  CREATE TYPE public.post_status AS ENUM ('draft','published');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create posts table
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content_markdown TEXT NOT NULL,
  cover_image_url TEXT,
  status public.post_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  author_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_posts_updated_at ON public.posts;
CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Public read policy for published posts
DROP POLICY IF EXISTS "Public can read published posts" ON public.posts;
CREATE POLICY "Public can read published posts"
ON public.posts
FOR SELECT
TO public
USING (status = 'published');

-- Helpful index
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON public.posts (published_at DESC);

-- Create public storage bucket for blog media
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-media','blog-media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to objects in blog-media bucket
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public can view blog media'
  ) THEN
    CREATE POLICY "Public can view blog media"
    ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'blog-media');
  END IF;
END $$;