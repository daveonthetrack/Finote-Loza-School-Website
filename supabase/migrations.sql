-- Articles table
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  cover_url text,
  author text,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Photos table
create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  filename text not null,
  url text not null,
  caption text,
  uploaded_by uuid references auth.users (id),
  created_at timestamptz default now()
);

-- Applications table
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  student_first_name text not null,
  student_last_name text not null,
  date_of_birth date not null,
  gender text not null,
  grade_level text not null,
  email text not null,
  phone text not null,
  address text not null,
  city text not null,
  state text not null,
  zip_code text not null,
  parent_first_name text not null,
  parent_last_name text not null,
  parent_email text not null,
  parent_phone text not null,
  parent_occupation text,
  parent_employer text,
  emergency_contact_name text not null,
  emergency_contact_phone text not null,
  emergency_contact_relation text not null,
  previous_school text not null,
  previous_school_address text,
  previous_school_phone text,
  reason_for_leaving text,
  special_needs text,
  medical_conditions text,
  extracurricular_activities text,
  interests text,
  goals text,
  additional_info text,
  status text default 'submitted',
  submitted_at timestamptz default now(),
  registered_student_id uuid references public.students(id),
  decided_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Events table
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  location text,
  start_at timestamptz not null,
  end_at timestamptz,
  created_by uuid references auth.users (id),
  created_at timestamptz default now()
);

-- RLS
alter table public.articles enable row level security;
alter table public.photos enable row level security;
alter table public.events enable row level security;
alter table public.applications enable row level security;

-- Policies
do $$
begin
  -- articles
  if not exists (select 1 from pg_policies where tablename = 'articles' and policyname = 'Articles are viewable by everyone') then
    create policy "Articles are viewable by everyone" on public.articles for select using ( true );
  end if;
  if not exists (select 1 from pg_policies where tablename = 'articles' and policyname = 'Articles are manageable by authenticated users') then
    create policy "Articles are manageable by authenticated users" on public.articles for all to authenticated using ( true ) with check ( true );
  end if;

  -- photos
  if not exists (select 1 from pg_policies where tablename = 'photos' and policyname = 'Photos are viewable by everyone') then
    create policy "Photos are viewable by everyone" on public.photos for select using ( true );
  end if;
  if not exists (select 1 from pg_policies where tablename = 'photos' and policyname = 'Photos are manageable by authenticated users') then
    create policy "Photos are manageable by authenticated users" on public.photos for all to authenticated using ( true ) with check ( true );
  end if;

  -- events
  if not exists (select 1 from pg_policies where tablename = 'events' and policyname = 'Events are viewable by everyone') then
    create policy "Events are viewable by everyone" on public.events for select using ( true );
  end if;
  if not exists (select 1 from pg_policies where tablename = 'events' and policyname = 'Events are manageable by authenticated users') then
    create policy "Events are manageable by authenticated users" on public.events for all to authenticated using ( true ) with check ( true );
  end if;

  -- applications
  if not exists (select 1 from pg_policies where tablename = 'applications' and policyname = 'Applications are manageable by authenticated users') then
    create policy "Applications are manageable by authenticated users" on public.applications for all to authenticated using ( true ) with check ( true );
  end if;
  if not exists (select 1 from pg_policies where tablename = 'applications' and policyname = 'Applications are viewable by authenticated users') then
    create policy "Applications are viewable by authenticated users" on public.applications for select to authenticated using ( true );
  end if;
  if not exists (select 1 from pg_policies where tablename = 'applications' and policyname = 'Anyone can submit applications') then
    create policy "Anyone can submit applications" on public.applications for insert to anon with check ( true );
  end if;

  -- announcements
  if not exists (select 1 from pg_policies where tablename = 'announcements' and policyname = 'Announcements are viewable by everyone') then
    create policy "Announcements are viewable by everyone" on public.announcements for select using ( true );
  end if;
  if not exists (select 1 from pg_policies where tablename = 'announcements' and policyname = 'Announcements are manageable by authenticated users') then
    create policy "Announcements are manageable by authenticated users" on public.announcements for all to authenticated using ( true ) with check ( true );
  end if;

  -- students
  if not exists (select 1 from pg_policies where tablename = 'students' and policyname = 'Students view own record') then
    create policy "Students view own record" on public.students for select using ( auth.uid() = user_id );
  end if;
  if not exists (select 1 from pg_policies where tablename = 'students' and policyname = 'Students manageable by authenticated staff') then
    create policy "Students manageable by authenticated staff" on public.students for all to authenticated using ( true ) with check ( true );
  end if;
  -- assignments policies
  if not exists (select 1 from pg_policies where tablename = 'assignments' and policyname = 'Assignments visible to owner') then
    create policy "Assignments visible to owner" on public.assignments for select using ( auth.uid() = assigned_to_user_id );
  end if;
  if not exists (select 1 from pg_policies where tablename = 'assignments' and policyname = 'Assignments insert by owner') then
    create policy "Assignments insert by owner" on public.assignments for insert with check ( auth.uid() = assigned_to_user_id );
  end if;
  if not exists (select 1 from pg_policies where tablename = 'assignments' and policyname = 'Assignments update by owner') then
    create policy "Assignments update by owner" on public.assignments for update using ( auth.uid() = assigned_to_user_id ) with check ( auth.uid() = assigned_to_user_id );
  end if;
end $$;

-- Storage: ensure buckets exist (idempotent)
insert into storage.buckets (id, name, public)
values ('assets', 'assets', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

-- Announcements table
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null,
  level text default 'info', -- info | warning | error
  active boolean default true,
  starts_at timestamptz default now(),
  ends_at timestamptz,
  created_by uuid references auth.users (id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.announcements enable row level security;

-- Students table (accounts separate from auth.users; links via user_id if provisioned)
create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  student_id text unique not null, -- printed ID/username
  first_name text not null,
  middle_name text,
  last_name text not null,
  photo_url text,
  grade_level text,
  homeroom text,
  user_id uuid references auth.users (id), -- set when auth user created
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.students enable row level security;

-- Assignments table (per-student)
create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subject text,
  description text,
  due_date date,
  status text default 'Pending', -- Pending | In Progress | Completed
  priority text default 'medium', -- low | medium | high
  assigned_to_user_id uuid references auth.users (id) not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.assignments enable row level security;

-- Storage RLS for 'assets' bucket
do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='Assets public read'
  ) then
    create policy "Assets public read" on storage.objects for select
      using ( bucket_id = 'assets' );
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='Assets authenticated write'
  ) then
    create policy "Assets authenticated write" on storage.objects for insert to authenticated
      with check ( bucket_id = 'assets' );
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='Assets authenticated update'
  ) then
    create policy "Assets authenticated update" on storage.objects for update to authenticated
      using ( bucket_id = 'assets' ) with check ( bucket_id = 'assets' );
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='Assets authenticated delete'
  ) then
    create policy "Assets authenticated delete" on storage.objects for delete to authenticated
      using ( bucket_id = 'assets' );
  end if;
end $$;

-- Storage RLS for 'gallery' bucket
do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='Gallery public read'
  ) then
    create policy "Gallery public read" on storage.objects for select
      using ( bucket_id = 'gallery' );
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='Gallery authenticated write'
  ) then
    create policy "Gallery authenticated write" on storage.objects for insert to authenticated
      with check ( bucket_id = 'gallery' );
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='Gallery authenticated update'
  ) then
    create policy "Gallery authenticated update" on storage.objects for update to authenticated
      using ( bucket_id = 'gallery' ) with check ( bucket_id = 'gallery' );
  end if;
  if not exists (
    select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='Gallery authenticated delete'
  ) then
    create policy "Gallery authenticated delete" on storage.objects for delete to authenticated
      using ( bucket_id = 'gallery' );
  end if;
end $$;

-- Subscribers (newsletter)
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);
alter table public.subscribers enable row level security;
do $$
begin
  if not exists (select 1 from pg_policies where tablename='subscribers' and policyname='Subscribers insert by everyone') then
    create policy "Subscribers insert by everyone" on public.subscribers for insert to anon, authenticated with check ( true );
  end if;
  if not exists (select 1 from pg_policies where tablename='subscribers' and policyname='Subscribers readable by authenticated') then
    create policy "Subscribers readable by authenticated" on public.subscribers for select to authenticated using ( true );
  end if;
end $$;

-- Inquiries (contact form)
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);
alter table public.inquiries enable row level security;
do $$
begin
  if not exists (select 1 from pg_policies where tablename='inquiries' and policyname='Inquiries insert by everyone') then
    create policy "Inquiries insert by everyone" on public.inquiries for insert to anon, authenticated with check ( true );
  end if;
  if not exists (select 1 from pg_policies where tablename='inquiries' and policyname='Inquiries readable by authenticated') then
    create policy "Inquiries readable by authenticated" on public.inquiries for select to authenticated using ( true );
  end if;
end $$;

-- Site settings (single-row)
create table if not exists public.site_settings (
  id int primary key default 1,
  school_name text default 'Finote Loza School',
  tagline text default 'Excellence in Education',
  logo_url text,
  banner_url text,
  updated_at timestamptz default now()
);
alter table public.site_settings enable row level security;
do $$
begin
  if not exists (select 1 from pg_policies where tablename='site_settings' and policyname='Settings readable by everyone') then
    create policy "Settings readable by everyone" on public.site_settings for select using ( true );
  end if;
  if not exists (select 1 from pg_policies where tablename='site_settings' and policyname='Settings manageable by authenticated users') then
    create policy "Settings manageable by authenticated users" on public.site_settings for all to authenticated using ( true ) with check ( true );
  end if;
end $$;









