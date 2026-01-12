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

    const { parent_id, student_printed_id } = req.body || {};
    if (!parent_id || !student_printed_id) {
      return res.status(400).json({ error: 'Missing parent_id or student_printed_id' });
    }

    const { data: student, error: sErr } = await supabase
      .from('students')
      .select('id, student_id, first_name, last_name')
      .eq('student_id', student_printed_id)
      .single();
    if (sErr || !student) return res.status(404).json({ error: 'Student not found' });

    const { error: linkErr } = await supabase
      .from('parent_students')
      .insert([{ parent_id, student_id: student.id }]);
    if (linkErr) return res.status(400).json({ error: linkErr.message });

    return res.status(200).json({ success: true, student });
  } catch (e) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}


