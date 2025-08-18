-- Add new columns for comprehensive blog management
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS meta_keywords TEXT,
ADD COLUMN IF NOT EXISTS schema_data JSONB,
ADD COLUMN IF NOT EXISTS author_bio TEXT,
ADD COLUMN IF NOT EXISTS author_avatar_url TEXT,
ADD COLUMN IF NOT EXISTS featured_image_alt TEXT,
ADD COLUMN IF NOT EXISTS reading_time INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS social_sharing JSONB DEFAULT '{"facebook": true, "twitter": true, "linkedin": true, "pinterest": true}'::jsonb,
ADD COLUMN IF NOT EXISTS content_html TEXT,
ADD COLUMN IF NOT EXISTS draft_data JSONB,
ADD COLUMN IF NOT EXISTS auto_save_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create trigger to update auto_save_timestamp
CREATE OR REPLACE FUNCTION update_auto_save_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.auto_save_timestamp = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_posts_auto_save
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_auto_save_timestamp();

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_posts_status_published ON posts(status, published_at);
CREATE INDEX IF NOT EXISTS idx_posts_auto_save ON posts(auto_save_timestamp);