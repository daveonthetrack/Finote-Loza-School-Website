import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { firstName, lastName, gradeLevel, homeroom } = req.body || {};
  if (!firstName || !lastName) return res.status(400).json({ error: 'Missing required fields' });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return res.status(500).json({ error: 'Server misconfigured: SUPABASE_SERVICE_ROLE_KEY or URL missing' });
  }
  const supabaseAdmin = createClient(url, serviceKey);

  // Generate student_id and password
  const pad = (n) => n.toString().padStart(4, '0');
  const base = `${(firstName[0] || 'S').toUpperCase()}${(lastName[0] || 'T').toUpperCase()}${Date.now().toString().slice(-4)}`;
  const studentId = base;
  const password = Math.random().toString(36).slice(-10) + 'A1!';

  // Create auth user
  const email = `${studentId}@students.finoteloza.edu`;
  const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: 'student', student_id: studentId, first_name: firstName, last_name: lastName }
  });
  if (authError) return res.status(500).json({ error: authError.message });

  // Insert student record
  const supabase = supabaseAdmin;
  const { data: inserted, error: insertError } = await supabase.from('students').insert({
    student_id: studentId,
    first_name: firstName,
    last_name: lastName,
    grade_level: gradeLevel || null,
    homeroom: homeroom || null,
    user_id: authUser.user?.id || null,
  }).select('id').single();
  if (insertError) return res.status(500).json({ error: insertError.message });

  // Store initial credentials for admin to view later
  const { error: credErr } = await supabase
    .from('student_credentials')
    .insert({
      student_row_id: inserted.id,
      student_id: studentId,
      email,
      initial_password: password,
    });
  if (credErr) {
    // Not fatal for registration, but log in response
    console.error('Failed to store student credentials:', credErr.message);
  }

  return res.status(200).json({ studentId, password, email, studentRowId: inserted.id });
}


