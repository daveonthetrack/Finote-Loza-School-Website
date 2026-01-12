-- Teachers table (similar to students but for faculty)
create table if not exists public.teachers (
  id uuid primary key default gen_random_uuid(),
  teacher_id text unique not null, -- printed ID/username (e.g., TCH-2024-001)
  first_name text not null,
  last_name text not null,
  email text unique not null,
  phone text,
  photo_url text,
  department text,
  subjects text[], -- array of subjects they teach
  employee_type text default 'full-time', -- full-time, part-time, substitute
  hire_date date,
  user_id uuid references auth.users (id), -- set when auth user created
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.teachers enable row level security;

-- Teachers policies
do $$
begin
  -- Teachers can view their own record
  if not exists (select 1 from pg_policies where tablename = 'teachers' and policyname = 'Teachers view own record') then
    create policy "Teachers view own record" on public.teachers for select using ( auth.uid() = user_id );
  end if;
  
  -- Authenticated users can manage teachers (admin)
  if not exists (select 1 from pg_policies where tablename = 'teachers' and policyname = 'Teachers manageable by authenticated users') then
    create policy "Teachers manageable by authenticated users" on public.teachers for all to authenticated using ( true ) with check ( true );
  end if;
end $$;
