-- Create itineraries table
CREATE TABLE IF NOT EXISTS itineraries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  trip_name text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  destinations jsonb DEFAULT '[]'::jsonb,
  description text
);

-- Enable Row Level Security
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;

-- Create policy for users to only access their own itineraries
CREATE POLICY "Users can only access their own itineraries" ON itineraries
  FOR ALL USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS itineraries_user_id_idx ON itineraries(user_id);
CREATE INDEX IF NOT EXISTS itineraries_created_at_idx ON itineraries(created_at);