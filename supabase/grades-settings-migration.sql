-- Extend site_settings with optional grade configuration

alter table if exists public.site_settings
  add column if not exists grade_assessment_weight numeric(5,2) default 30,
  add column if not exists grade_midterm_weight numeric(5,2) default 20,
  add column if not exists grade_final_weight numeric(5,2) default 50,
  add column if not exists grade_remark_scale jsonb;

-- Seed default remark scale if not set
update public.site_settings
set grade_remark_scale = '[
  {"min": 90, "max": 100, "label": "Excellent"},
  {"min": 80, "max": 89.99, "label": "Very Good"},
  {"min": 70, "max": 79.99, "label": "Good"},
  {"min": 60, "max": 69.99, "label": "Satisfactory"},
  {"min": 50, "max": 59.99, "label": "Pass"},
  {"min": 0,  "max": 49.99, "label": "Fail"}
]'
where id = 1
  and grade_remark_scale is null;


