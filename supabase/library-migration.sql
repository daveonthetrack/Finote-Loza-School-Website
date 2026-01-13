-- Library module: books, copies, loans, librarians + RLS + helper RPCs
-- Run this in Supabase SQL editor.

-- Librarians (role table)
create table if not exists public.librarians (
  id uuid primary key default gen_random_uuid(),
  librarian_id text unique not null, -- e.g., LIB-2026-0001
  first_name text not null,
  last_name text not null,
  email text unique not null,
  user_id uuid unique references auth.users (id),
  created_at timestamptz default now()
);

alter table public.librarians enable row level security;

-- Helper: check if current user is a librarian
create or replace function public.is_librarian()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.librarians l
    where l.user_id = auth.uid()
  );
$$;

do $$
begin
  -- Librarians can view their own record
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'librarians' and policyname = 'Librarians view own record'
  ) then
    create policy "Librarians view own record"
      on public.librarians
      for select
      using (auth.uid() = user_id);
  end if;
end $$;

-- Books
create table if not exists public.library_books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text,
  isbn text,
  category text,
  description text,
  cover_url text,
  published_year int,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.library_books enable row level security;

-- Copies (physical barcoded items)
create table if not exists public.library_copies (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references public.library_books(id) on delete cascade,
  copy_code text not null unique, -- barcode / unique copy code
  location text,
  condition text,
  created_at timestamptz default now()
);

alter table public.library_copies enable row level security;

-- Loans
create table if not exists public.library_loans (
  id uuid primary key default gen_random_uuid(),
  copy_id uuid not null references public.library_copies(id) on delete restrict,
  student_id text not null, -- user-provided Student ID string
  checked_out_at timestamptz not null default now(),
  due_at timestamptz not null,
  returned_at timestamptz,
  checked_out_by uuid references auth.users(id),
  returned_by uuid references auth.users(id),
  notes text
);

alter table public.library_loans enable row level security;

-- Constraints / indexes
create index if not exists library_copies_book_id_idx on public.library_copies(book_id);
create index if not exists library_loans_student_id_idx on public.library_loans(student_id);
create index if not exists library_loans_due_at_idx on public.library_loans(due_at);

-- Only one active (unreturned) loan per copy
create unique index if not exists library_loans_one_active_per_copy
  on public.library_loans(copy_id)
  where returned_at is null;

-- RLS Policies: only librarians can manage library tables
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'library_books' and policyname = 'Librarians manage books'
  ) then
    create policy "Librarians manage books"
      on public.library_books
      for all
      using (public.is_librarian())
      with check (public.is_librarian());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'library_copies' and policyname = 'Librarians manage copies'
  ) then
    create policy "Librarians manage copies"
      on public.library_copies
      for all
      using (public.is_librarian())
      with check (public.is_librarian());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'library_loans' and policyname = 'Librarians manage loans'
  ) then
    create policy "Librarians manage loans"
      on public.library_loans
      for all
      using (public.is_librarian())
      with check (public.is_librarian());
  end if;
end $$;

-- Public catalog RPC (does not expose copy_code)
create or replace function public.library_public_catalog(p_search text default null)
returns table (
  id uuid,
  title text,
  author text,
  category text,
  cover_url text,
  total_copies int,
  available_copies int
)
language sql
security definer
set search_path = public
as $$
  select
    b.id,
    b.title,
    b.author,
    b.category,
    b.cover_url,
    count(c.id)::int as total_copies,
    count(c.id) filter (
      where not exists (
        select 1
        from public.library_loans l
        where l.copy_id = c.id
          and l.returned_at is null
      )
    )::int as available_copies
  from public.library_books b
  left join public.library_copies c on c.book_id = b.id
  where (
    p_search is null
    or b.title ilike '%' || p_search || '%'
    or coalesce(b.author,'') ilike '%' || p_search || '%'
    or coalesce(b.category,'') ilike '%' || p_search || '%'
  )
  group by b.id
  order by b.title asc;
$$;

-- Checkout / checkin RPCs (atomic; uses copy_code)
create or replace function public.library_checkout(p_copy_code text, p_student_id text, p_due_at timestamptz default null)
returns table (
  loan_id uuid,
  copy_code text,
  student_id text,
  checked_out_at timestamptz,
  due_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_copy_id uuid;
  v_due timestamptz;
begin
  if not public.is_librarian() then
    raise exception 'Not authorized';
  end if;

  select c.id into v_copy_id
  from public.library_copies c
  where c.copy_code = p_copy_code;

  if v_copy_id is null then
    raise exception 'Copy not found';
  end if;

  if exists (
    select 1 from public.library_loans l
    where l.copy_id = v_copy_id and l.returned_at is null
  ) then
    raise exception 'Copy already checked out';
  end if;

  v_due := coalesce(p_due_at, now() + interval '14 days');

  insert into public.library_loans as l (copy_id, student_id, due_at, checked_out_by)
  values (v_copy_id, p_student_id, v_due, auth.uid())
  returning l.id, p_copy_code, p_student_id, l.checked_out_at, l.due_at
    into loan_id, copy_code, student_id, checked_out_at, due_at;

  return next;
end $$;

create or replace function public.library_checkin(p_copy_code text)
returns table (
  loan_id uuid,
  copy_code text,
  student_id text,
  returned_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_copy_id uuid;
begin
  if not public.is_librarian() then
    raise exception 'Not authorized';
  end if;

  select c.id into v_copy_id
  from public.library_copies c
  where c.copy_code = p_copy_code;

  if v_copy_id is null then
    raise exception 'Copy not found';
  end if;

  update public.library_loans l
    set returned_at = now(),
        returned_by = auth.uid()
  where l.copy_id = v_copy_id
    and l.returned_at is null
  returning l.id, p_copy_code, l.student_id, l.returned_at
    into loan_id, copy_code, student_id, returned_at;

  if loan_id is null then
    raise exception 'No active loan for this copy';
  end if;

  return next;
end $$;


