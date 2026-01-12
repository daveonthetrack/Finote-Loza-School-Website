-- Grades table
create table if not exists public.grades (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.students(id) not null,
  assignment_id uuid references public.assignments(id),
  subject text not null,
  grade_value numeric(5,2) not null, -- e.g., 85.50 for 85.5% (total)
  letter_grade text, -- A+, A, A-, B+, B, B-, C+, C, C-, D+, D, D-, F
  max_points numeric(5,2) default 100,
  earned_points numeric(5,2),
  semester text, -- Fall 2024, Spring 2024, etc.
  academic_year text, -- 2023-2024, 2024-2025, etc.
  teacher_notes text,
  assessment numeric(5,2),
  midterm numeric(5,2),
  final_exam numeric(5,2),
  remark text,
  finalized boolean default false,
  created_by uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.grades enable row level security;

-- Grades policies
do $$
begin
  -- Students can view their own grades
  if not exists (select 1 from pg_policies where tablename = 'grades' and policyname = 'Students view own grades') then
    create policy "Students view own grades" on public.grades for select 
      using ( 
        exists (
          select 1 from public.students 
          where students.id = grades.student_id 
          and students.user_id = auth.uid()
        )
      );
  end if;
  
  -- Authenticated users can manage grades (teachers/admin)
  if not exists (select 1 from pg_policies where tablename = 'grades' and policyname = 'Grades manageable by authenticated users') then
    create policy "Grades manageable by authenticated users" on public.grades for all to authenticated using ( true ) with check ( true );
  end if;
end $$;

-- Function to calculate letter grade
create or replace function calculate_letter_grade(grade_percentage numeric)
returns text as $$
begin
  case
    when grade_percentage >= 97 then return 'A+';
    when grade_percentage >= 93 then return 'A';
    when grade_percentage >= 90 then return 'A-';
    when grade_percentage >= 87 then return 'B+';
    when grade_percentage >= 83 then return 'B';
    when grade_percentage >= 80 then return 'B-';
    when grade_percentage >= 77 then return 'C+';
    when grade_percentage >= 73 then return 'C';
    when grade_percentage >= 70 then return 'C-';
    when grade_percentage >= 67 then return 'D+';
    when grade_percentage >= 63 then return 'D';
    when grade_percentage >= 60 then return 'D-';
    else return 'F';
  end case;
end;
$$ language plpgsql;

-- Function to calculate GPA
create or replace function calculate_gpa(student_uuid uuid, semester_filter text default null)
returns numeric as $$
declare
  total_points numeric := 0;
  total_credits numeric := 0;
  grade_record record;
begin
  for grade_record in 
    select grade_value, 
           case 
             when grade_value >= 97 then 4.0
             when grade_value >= 93 then 4.0
             when grade_value >= 90 then 3.7
             when grade_value >= 87 then 3.3
             when grade_value >= 83 then 3.0
             when grade_value >= 80 then 2.7
             when grade_value >= 77 then 2.3
             when grade_value >= 73 then 2.0
             when grade_value >= 70 then 1.7
             when grade_value >= 67 then 1.3
             when grade_value >= 63 then 1.0
             when grade_value >= 60 then 0.7
             else 0.0
           end as gpa_points
    from public.grades 
    where student_id = student_uuid
    and (semester_filter is null or semester = semester_filter)
  loop
    total_points := total_points + grade_record.gpa_points;
    total_credits := total_credits + 1;
  end loop;
  
  if total_credits = 0 then
    return 0;
  end if;
  
  return round(total_points / total_credits, 2);
end;
$$ language plpgsql;

-- Trigger to automatically calculate letter grade when grade_value is updated
create or replace function update_letter_grade()
returns trigger as $$
begin
  new.letter_grade := calculate_letter_grade(new.grade_value);
  return new;
end;
$$ language plpgsql;

create trigger grades_letter_grade_trigger
  before insert or update of grade_value on public.grades
  for each row execute function update_letter_grade();
