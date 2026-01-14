/*
  # Create booking widget configuration table

  1. New Tables
    - `booking_widget`
      - `id` (integer, primary key)
      - `embed_code` (text, stores iframe embed code from Calendly or other platforms)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policy to allow public viewing
    - Add policy for authenticated users to update
*/

CREATE TABLE IF NOT EXISTS booking_widget (
  id integer PRIMARY KEY DEFAULT 1,
  embed_code text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE booking_widget ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view booking widget"
  ON booking_widget FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can update booking widget"
  ON booking_widget FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

INSERT INTO booking_widget (id, embed_code) VALUES (
  1,
  '<!-- Calendly inline widget begin -->
<div class="calendly-inline-widget" data-url="https://calendly.com/starburstcraftstudio" style="min-width:320px;height:700px;"></div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
<!-- Calendly inline widget end -->'
) ON CONFLICT (id) DO NOTHING;
