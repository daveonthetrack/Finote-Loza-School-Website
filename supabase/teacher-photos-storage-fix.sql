-- Drop existing policies if they exist
drop policy if exists "Teachers can upload their own photos" on storage.objects;
drop policy if exists "Teachers can update their own photos" on storage.objects;
drop policy if exists "Teachers can delete their own photos" on storage.objects;
drop policy if exists "Anyone can view teacher photos" on storage.objects;

-- Create more permissive policies for teacher photos
create policy "Authenticated users can upload teacher photos" on storage.objects
for insert to authenticated with check (bucket_id = 'teacher-photos');

create policy "Authenticated users can update teacher photos" on storage.objects
for update to authenticated using (bucket_id = 'teacher-photos');

create policy "Authenticated users can delete teacher photos" on storage.objects
for delete to authenticated using (bucket_id = 'teacher-photos');

create policy "Anyone can view teacher photos" on storage.objects
for select using (bucket_id = 'teacher-photos');
