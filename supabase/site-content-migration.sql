-- Site Content (simple CMS key-value storage)
create table if not exists public.site_content (
  key text primary key,
  page text,
  section text,
  value text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.site_content enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where tablename = 'site_content' and policyname = 'Site content readable by everyone') then
    create policy "Site content readable by everyone" on public.site_content for select using ( true );
  end if;
  if not exists (select 1 from pg_policies where tablename = 'site_content' and policyname = 'Site content manageable by authenticated') then
    create policy "Site content manageable by authenticated" on public.site_content for all to authenticated using ( true ) with check ( true );
  end if;
end $$;


