import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query || {};
    if (!id) return res.status(400).json({ error: 'Missing student id' });

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return res.status(500).json({ error: 'Server misconfigured' });
    const supabase = createClient(url, key);

    const { data: student, error: sErr } = await supabase
      .from('students')
      .select('*')
      .eq('id', id)
      .single();
    if (sErr) return res.status(400).json({ error: sErr.message });

    // Get first linked parent if any
    const { data: links, error: lErr } = await supabase
      .from('parent_students')
      .select('parents:parents(*)')
      .eq('student_id', id)
      .limit(1);
    if (lErr) return res.status(400).json({ error: lErr.message });
    const parent = links && links.length > 0 ? links[0].parents : null;

    return res.status(200).json({ student, parent });
  } catch (e) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}




