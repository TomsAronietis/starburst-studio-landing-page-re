/*
  # Create Videos Storage Bucket

  1. Storage Setup
    - Creates a public storage bucket named 'videos'
    - Videos will be publicly accessible for viewing
    - Only authenticated users can upload/manage videos
  
  2. Security
    - Public read access for all videos
    - Authenticated users can upload videos
    - Authenticated users can update/delete their own uploads
*/

-- Create the videos storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('videos', 'videos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to view videos
CREATE POLICY "Public Access to Videos"
ON storage.objects FOR SELECT
USING (bucket_id = 'videos');

-- Allow authenticated users to upload videos
CREATE POLICY "Authenticated users can upload videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'videos');

-- Allow authenticated users to update their own videos
CREATE POLICY "Users can update own videos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'videos' AND auth.uid()::text = owner::text);

-- Allow authenticated users to delete their own videos
CREATE POLICY "Users can delete own videos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'videos' AND auth.uid()::text = owner::text);