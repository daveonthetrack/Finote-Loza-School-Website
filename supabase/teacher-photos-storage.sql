-- Create storage bucket for teacher photos
insert into storage.buckets (id, name, public) 
values ('teacher-photos', 'teacher-photos', true)
on conflict (id) do nothing;

-- Set up RLS policies for teacher photos
create policy "Teachers can upload their own photos" on storage.objects
for insert with check (
  bucket_id = 'teacher-photos' 
  and auth.uid()::text = (storage.foldername(name))[2]
);

create policy "Teachers can update their own photos" on storage.objects
for update using (
  bucket_id = 'teacher-photos' 
  and auth.uid()::text = (storage.foldername(name))[2]
);

create policy "Teachers can delete their own photos" on storage.objects
for delete using (
  bucket_id = 'teacher-photos' 
  and auth.uid()::text = (storage.foldername(name))[2]
);

create policy "Anyone can view teacher photos" on storage.objects
for select using (bucket_id = 'teacher-photos');
