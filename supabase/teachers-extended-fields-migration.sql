-- Extend teachers table with additional profile fields used in the teacher portal
-- Safe to run multiple times thanks to IF NOT EXISTS.

alter table if exists public.teachers
  add column if not exists bio text;


