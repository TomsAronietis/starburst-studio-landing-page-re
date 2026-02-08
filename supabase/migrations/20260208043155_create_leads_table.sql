/*
  # Create leads table for quiz form submissions

  1. New Tables
    - `leads`
      - `id` (uuid, primary key) - Unique identifier for each lead
      - `name` (text) - Full name of the lead
      - `email` (text, unique) - Email address of the lead
      - `phone` (text) - Phone number of the lead
      - `created_at` (timestamptz) - Timestamp when the lead was created

  2. Security
    - Enable RLS on `leads` table
    - Add policy for anonymous users to insert their own data
    - Add policy for authenticated users to read all leads (for admin purposes)

  3. Notes
    - Email is unique to prevent duplicate submissions
    - Anonymous users can only insert, not read or update
    - This allows collecting leads without requiring authentication
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit lead form"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all leads"
  ON leads FOR SELECT
  TO authenticated
  USING (true);