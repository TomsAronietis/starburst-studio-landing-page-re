/*
  # Create Sample Edit Videos Table

  1. New Tables
    - `sample_edit_videos`
      - `id` (uuid, primary key)
      - `position` (integer, 1-2) - Position in the sample edit section
      - `video_name` (text) - Name of the video file in storage
      - `video_url` (text) - Public URL of the video
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `sample_edit_videos` table
    - Allow public read access (for landing page)
    - Allow public write access (for simple admin page)

  3. Constraints
    - Unique constraint on position (only one video per position)
    - Check constraint to ensure position is 1 or 2
*/

CREATE TABLE IF NOT EXISTS sample_edit_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  position integer NOT NULL,
  video_name text NOT NULL,
  video_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE sample_edit_videos 
ADD CONSTRAINT sample_edit_unique_position UNIQUE (position);

ALTER TABLE sample_edit_videos
ADD CONSTRAINT sample_edit_valid_position CHECK (position >= 1 AND position <= 2);

ALTER TABLE sample_edit_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read sample edit videos"
  ON sample_edit_videos FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert sample edit videos"
  ON sample_edit_videos FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update sample edit videos"
  ON sample_edit_videos FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete sample edit videos"
  ON sample_edit_videos FOR DELETE
  USING (true);
