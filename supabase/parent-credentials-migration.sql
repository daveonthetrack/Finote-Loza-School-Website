-- Parent initial credentials storage (admin-only via service routes)
create table if not exists public.parent_credentials (
  id uuid primary key default gen_random_uuid(),
  parent_row_id uuid not null references public.parents(id) on delete cascade,
  parent_id text not null,
  email text not null,
  initial_password text not null,
  created_at timestamptz default now()
);

alter table public.parent_credentials enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'parent_credentials' and policyname = 'No direct access by default (parents)'
  ) then
    create policy "No direct access by default (parents)" on public.parent_credentials for all to authenticated using ( false ) with check ( false );
  end if;
end $$;





