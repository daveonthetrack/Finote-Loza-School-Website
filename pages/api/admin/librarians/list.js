import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return res.status(500).json({ error: 'Server misconfigured' });

  const supabaseAdmin = createClient(url, key);

  try {
    const { data, error } = await supabaseAdmin
      .from('librarians')
      .select('id,librarian_id,first_name,last_name,email,user_id,created_at')
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ librarians: data || [] });
  } catch (e) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}


