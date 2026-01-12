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

    const { q = '', grade = '' } = req.query || {};

    let query = supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (grade) {
      query = query.eq('grade_level', grade);
    }

    const { data, error } = await query;
    if (error) return res.status(400).json({ error: error.message });

    const normalizedQ = String(q).trim().toLowerCase();
    const filtered = !normalizedQ
      ? data || []
      : (data || []).filter((s) => {
          const fullName = [s.first_name, s.middle_name, s.last_name].filter(Boolean).join(' ').toLowerCase();
          const sid = (s.student_id || '').toLowerCase();
          return fullName.includes(normalizedQ) || sid.includes(normalizedQ);
        });

    return res.status(200).json({ students: filtered });
  } catch (e) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}





