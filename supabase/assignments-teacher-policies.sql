-- Allow teachers to create and manage per-student assignments
-- while keeping existing student-owned policies intact.

do $$
begin
  -- Teachers can see all assignments (for their UI)
  if not exists (
    select 1 from pg_policies
    where tablename = 'assignments'
      and policyname = 'Assignments visible to teachers'
  ) then
    create policy "Assignments visible to teachers"
      on public.assignments
      for select
      to authenticated
      using (
        exists (
          select 1 from public.teachers
          where teachers.user_id = auth.uid()
        )
      );
  end if;

  -- Teachers can insert assignments for any student
  if not exists (
    select 1 from pg_policies
    where tablename = 'assignments'
      and policyname = 'Assignments insert by teachers'
  ) then
    create policy "Assignments insert by teachers"
      on public.assignments
      for insert
      to authenticated
      with check (
        exists (
          select 1 from public.teachers
          where teachers.user_id = auth.uid()
        )
      );
  end if;

  -- Teachers can update assignments (e.g., status)
  if not exists (
    select 1 from pg_policies
    where tablename = 'assignments'
      and policyname = 'Assignments update by teachers'
  ) then
    create policy "Assignments update by teachers"
      on public.assignments
      for update
      to authenticated
      using (
        exists (
          select 1 from public.teachers
          where teachers.user_id = auth.uid()
        )
      )
      with check (
        exists (
          select 1 from public.teachers
          where teachers.user_id = auth.uid()
        )
      );
  end if;
end $$;


