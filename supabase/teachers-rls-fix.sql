-- Add public read access to teachers table for faculty directory
-- This allows anyone to view teacher information for the faculty directory

-- Drop existing restrictive policies
drop policy if exists "Teachers view own record" on public.teachers;
drop policy if exists "Teachers manageable by authenticated users" on public.teachers;

-- Create new policies
-- Allow public read access for faculty directory
create policy "Public can view teachers for faculty directory" on public.teachers
  for select using (true);

-- Teachers can view their own record
create policy "Teachers view own record" on public.teachers
  for select using (auth.uid() = user_id);

-- Authenticated users can manage teachers (admin)
create policy "Authenticated users can manage teachers" on public.teachers
  for all to authenticated using (true) with check (true);
