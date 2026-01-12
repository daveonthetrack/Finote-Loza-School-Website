-- Add optional middle name field for student applications

alter table if exists public.applications
  add column if not exists student_middle_name text;


