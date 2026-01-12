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

    const { parent_id, student_id } = req.body || {};
    if (!parent_id || !student_id) {
      return res.status(400).json({ error: 'Missing parent_id or student_id' });
    }

    const { error } = await supabase
      .from('parent_students')
      .delete()
      .eq('parent_id', parent_id)
      .eq('student_id', student_id);
    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}


