import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return res.status(500).json({ error: 'Server misconfigured' });

  const { id } = req.body || {};
  if (!id) return res.status(400).json({ error: 'Missing librarian id' });

  const supabaseAdmin = createClient(url, key);

  try {
    const { data: row, error: fetchErr } = await supabaseAdmin
      .from('librarians')
      .select('id,user_id')
      .eq('id', id)
      .single();
    if (fetchErr || !row) return res.status(404).json({ error: 'Librarian not found' });

    // Delete librarian row first (then auth user)
    const { error: delErr } = await supabaseAdmin.from('librarians').delete().eq('id', id);
    if (delErr) return res.status(500).json({ error: delErr.message });

    if (row.user_id) {
      await supabaseAdmin.auth.admin.deleteUser(row.user_id);
    }

    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}


