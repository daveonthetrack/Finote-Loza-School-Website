-- Extend students table with additional profile fields used in the admin UI
-- This is safe to run multiple times thanks to IF NOT EXISTS guards.

alter table if exists public.students
  add column if not exists middle_name text,
  add column if not exists date_of_birth date,
  add column if not exists gender text,
  add column if not exists email text,
  add column if not exists phone text,
  add column if not exists address text,
  add column if not exists previous_school text,
  add column if not exists previous_school_address text,
  add column if not exists previous_school_phone text,
  add column if not exists reason_for_leaving text,
  add column if not exists special_needs text,
  add column if not exists medical_conditions text,
  add column if not exists extracurricular_activities text,
  add column if not exists interests text,
  add column if not exists goals text,
  add column if not exists additional_info text,
  add column if not exists emergency_contact_name text,
  add column if not exists emergency_contact_phone text,
  add column if not exists emergency_contact_relationship text;


