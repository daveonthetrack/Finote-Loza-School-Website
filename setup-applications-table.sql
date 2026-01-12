-- Run this SQL in your Supabase SQL Editor to create the applications table

-- Applications table
CREATE TABLE IF NOT EXISTS public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_first_name text NOT NULL,
  student_last_name text NOT NULL,
  date_of_birth date NOT NULL,
  gender text NOT NULL,
  grade_level text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  parent_first_name text NOT NULL,
  parent_last_name text NOT NULL,
  parent_email text NOT NULL,
  parent_phone text NOT NULL,
  parent_occupation text,
  parent_employer text,
  emergency_contact_name text NOT NULL,
  emergency_contact_phone text NOT NULL,
  emergency_contact_relation text NOT NULL,
  previous_school text NOT NULL,
  previous_school_address text,
  previous_school_phone text,
  reason_for_leaving text,
  special_needs text,
  medical_conditions text,
  extracurricular_activities text,
  interests text,
  goals text,
  additional_info text,
  status text DEFAULT 'submitted',
  submitted_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Create policies for applications
CREATE POLICY "Applications are manageable by authenticated users" 
ON public.applications 
FOR ALL 
TO authenticated 
USING ( true ) 
WITH CHECK ( true );

CREATE POLICY "Applications are viewable by authenticated users" 
ON public.applications 
FOR SELECT 
TO authenticated 
USING ( true );

-- Allow public to insert applications (for the form submission)
CREATE POLICY "Anyone can submit applications" 
ON public.applications 
FOR INSERT 
TO public 
WITH CHECK ( true );
