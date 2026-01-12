import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return res.status(500).json({ error: 'Server misconfigured' });
    const supabase = createClient(url, key);

    const { id, deleteAuthUser } = req.body || {};
    if (!id) return res.status(400).json({ error: 'Missing student row id' });

    // Fetch student to get user_id
    const { data: student, error: fErr } = await supabase
      .from('students')
      .select('id, user_id')
      .eq('id', id)
      .single();
    if (fErr || !student) return res.status(404).json({ error: 'Student not found' });

    // Clean up dependent data to avoid FK errors
    // 1) Delete grades for this student (grades references students without cascade)
    const { error: gErr } = await supabase
      .from('grades')
      .delete()
      .eq('student_id', id);
    if (gErr) return res.status(400).json({ error: gErr.message });

    // 2) Clear application links
    const { error: aClrErr } = await supabase
      .from('applications')
      .update({ registered_student_id: null })
      .eq('registered_student_id', id);
    if (aClrErr) return res.status(400).json({ error: aClrErr.message });

    // 3) Delete student row (cascades remove credentials and parent_students links)
    const { error: dErr } = await supabase
      .from('students')
      .delete()
      .eq('id', id);
    if (dErr) return res.status(400).json({ error: dErr.message });

    // Optionally delete the auth user
    if (deleteAuthUser && student.user_id) {
      const { error: aErr } = await supabase.auth.admin.deleteUser(student.user_id);
      if (aErr) return res.status(400).json({ error: aErr.message });
    }

    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}


