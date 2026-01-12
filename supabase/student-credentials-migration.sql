-- Student initial credentials storage (admin-only via service routes)
create table if not exists public.student_credentials (
  id uuid primary key default gen_random_uuid(),
  student_row_id uuid not null references public.students(id) on delete cascade,
  student_id text not null,
  email text not null,
  initial_password text not null,
  created_at timestamptz default now()
);

alter table public.student_credentials enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'student_credentials' and policyname = 'No direct access by default'
  ) then
    create policy "No direct access by default" on public.student_credentials for all to authenticated using ( false ) with check ( false );
  end if;
end $$;





