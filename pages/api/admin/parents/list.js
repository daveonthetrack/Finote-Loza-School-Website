import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      return res.status(500).json({ error: 'Server misconfigured' });
    }
    const supabase = createClient(url, key);

    // Fetch parents
    const { data: parents, error: pErr } = await supabase
      .from('parents')
      .select('*')
      .order('created_at', { ascending: false });
    if (pErr) return res.status(400).json({ error: pErr.message });

    // Fetch relationships in one query
    const { data: rels, error: rErr } = await supabase
      .from('parent_students')
      .select('parent_id, students:students ( id, first_name, last_name, student_id )');
    if (rErr) return res.status(400).json({ error: rErr.message });

    const parentIdToStudents = {};
    (rels || []).forEach((row) => {
      if (!parentIdToStudents[row.parent_id]) parentIdToStudents[row.parent_id] = [];
      if (row.students) parentIdToStudents[row.parent_id].push(row.students);
    });

    const enriched = (parents || []).map((p) => ({
      ...p,
      linked_students: parentIdToStudents[p.id] || []
    }));

    return res.status(200).json({ parents: enriched });
  } catch (e) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}


