import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return res.status(500).json({ error: 'Server misconfigured' });
    const supabase = createClient(url, key);

    const { id } = req.query || {};
    if (!id) return res.status(400).json({ error: 'Missing student id' });

    const { data, error } = await supabase
      .from('student_credentials')
      .select('student_id, email, initial_password, created_at')
      .eq('student_row_id', id)
      .order('created_at', { ascending: true })
      .limit(1)
      .single();
    if (error) return res.status(404).json({ error: error.message });

    return res.status(200).json({ credentials: data });
  } catch (e) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}





