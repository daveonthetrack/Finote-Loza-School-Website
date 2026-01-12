-- Create parents table
create table if not exists parents (
  id uuid primary key default gen_random_uuid(),
  parent_id text unique not null,
  user_id uuid references auth.users(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  address text,
  emergency_contact_name text,
  emergency_contact_phone text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create index for faster lookups
create index if not exists idx_parents_user_id on parents(user_id);
create index if not exists idx_parents_parent_id on parents(parent_id);

-- Create parent-student relationship table
create table if not exists parent_students (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references parents(id) on delete cascade,
  student_id uuid references students(id) on delete cascade,
  relationship text default 'parent', -- parent, guardian, etc.
  created_at timestamp with time zone default now(),
  unique(parent_id, student_id)
);

-- Create indexes for parent-student relationships
create index if not exists idx_parent_students_parent_id on parent_students(parent_id);
create index if not exists idx_parent_students_student_id on parent_students(student_id);

-- Enable RLS
alter table parents enable row level security;
alter table parent_students enable row level security;

-- RLS Policies for parents table
create policy "Parents can view their own profile" on parents
  for select using (auth.uid() = user_id);

create policy "Parents can update their own profile" on parents
  for update using (auth.uid() = user_id);

create policy "Admins can view all parents" on parents
  for select using (
    exists (
      select 1 from auth.users
      where auth.users.id = auth.uid()
      and auth.users.email = 'admin@finoteloza.edu'
    )
  );

create policy "Admins can insert parents" on parents
  for insert with check (
    exists (
      select 1 from auth.users
      where auth.users.id = auth.uid()
      and auth.users.email = 'admin@finoteloza.edu'
    )
  );

create policy "Admins can update parents" on parents
  for update using (
    exists (
      select 1 from auth.users
      where auth.users.id = auth.uid()
      and auth.users.email = 'admin@finoteloza.edu'
    )
  );

-- RLS Policies for parent_students table
create policy "Parents can view their student relationships" on parent_students
  for select using (
    parent_id in (
      select id from parents where user_id = auth.uid()
    )
  );

create policy "Admins can manage parent-student relationships" on parent_students
  for all using (
    exists (
      select 1 from auth.users
      where auth.users.id = auth.uid()
      and auth.users.email = 'admin@finoteloza.edu'
    )
  );

-- Function to generate parent ID
create or replace function generate_parent_id()
returns text as $$
declare
  new_id text;
  year_part text;
begin
  year_part := extract(year from now())::text;
  
  select 'PAR-' || year_part || '-' || lpad((count(*) + 1)::text, 4, '0')
  into new_id
  from parents
  where parent_id like 'PAR-' || year_part || '-%';
  
  return new_id;
end;
$$ language plpgsql;

-- Function to update updated_at timestamp
create or replace function update_parents_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to update updated_at
create trigger update_parents_updated_at
  before update on parents
  for each row
  execute function update_parents_updated_at();
