/*
  # Create Featured Videos Table

  1. New Tables
    - `featured_videos`
      - `id` (uuid, primary key)
      - `position` (integer, 1-3) - Position in the gallery
      - `video_name` (text) - Name of the video file in storage
      - `video_url` (text) - Public URL of the video
      - `label` (text) - Display label (e.g., "Raw → Final")
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `featured_videos` table
    - Allow public read access (for landing page)
    - Allow public write access (for simple admin page)

  3. Constraints
    - Unique constraint on position (only one video per position)
    - Check constraint to ensure position is 1, 2, or 3
*/

CREATE TABLE IF NOT EXISTS featured_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  position integer NOT NULL,
  video_name text NOT NULL,
  video_url text NOT NULL,
  label text NOT NULL DEFAULT 'Raw → Final',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add unique constraint on position
ALTER TABLE featured_videos 
ADD CONSTRAINT unique_position UNIQUE (position);

-- Add check constraint for position values
ALTER TABLE featured_videos
ADD CONSTRAINT valid_position CHECK (position >= 1 AND position <= 3);

-- Enable RLS
ALTER TABLE featured_videos ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read featured videos
CREATE POLICY "Anyone can read featured videos"
  ON featured_videos FOR SELECT
  USING (true);

-- Allow anyone to insert featured videos
CREATE POLICY "Anyone can insert featured videos"
  ON featured_videos FOR INSERT
  WITH CHECK (true);

-- Allow anyone to update featured videos
CREATE POLICY "Anyone can update featured videos"
  ON featured_videos FOR UPDATE
  USING (true);

-- Allow anyone to delete featured videos
CREATE POLICY "Anyone can delete featured videos"
  ON featured_videos FOR DELETE
  USING (true);
