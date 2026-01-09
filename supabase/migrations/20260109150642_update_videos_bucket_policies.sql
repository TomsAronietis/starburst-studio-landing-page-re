/*
  # Update Videos Storage Bucket Policies
  
  1. Changes
    - Drop existing restrictive policies
    - Allow public uploads, updates, and deletes
    - Keep public read access
  
  2. Security Notes
    - This allows anyone to upload videos without authentication
    - Suitable for simple admin pages without user authentication
    - Consider adding authentication later for production use
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can upload videos" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own videos" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own videos" ON storage.objects;

-- Allow anyone to upload videos
CREATE POLICY "Anyone can upload videos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'videos');

-- Allow anyone to update videos
CREATE POLICY "Anyone can update videos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'videos');

-- Allow anyone to delete videos
CREATE POLICY "Anyone can delete videos"
ON storage.objects FOR DELETE
USING (bucket_id = 'videos');
