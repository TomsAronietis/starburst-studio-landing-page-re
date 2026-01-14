/*
  # Add embed code support for external video hosting

  1. Changes
    - Add `embed_code` column to `featured_videos` table for storing iframe embeds from Wistia, etc.
    - Allow null values for backward compatibility with existing video URLs
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'featured_videos' AND column_name = 'embed_code'
  ) THEN
    ALTER TABLE featured_videos ADD COLUMN embed_code text;
  END IF;
END $$;
