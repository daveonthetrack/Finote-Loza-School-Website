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

    const { parents } = req.body || {};
    if (!Array.isArray(parents) || parents.length === 0) {
      return res.status(400).json({ error: 'No parents provided' });
    }

    const results = [];
    for (const raw of parents) {
      const first_name = (raw.first_name || '').trim();
      const last_name = (raw.last_name || '').trim();
      const email = (raw.email || '').trim().toLowerCase();
      const phone = (raw.phone || '').trim() || null;
      const address = (raw.address || '').trim() || null;
      const emergency_contact_name = (raw.emergency_contact_name || '').trim() || null;
      const emergency_contact_phone = (raw.emergency_contact_phone || '').trim() || null;

      if (!first_name || !last_name || !email) {
        results.push({ email, ok: false, error: 'Missing required fields' });
        continue;
      }

      try {
        const { data: parentIdData, error: idErr } = await supabase.rpc('generate_parent_id');
        if (idErr) throw idErr;

        const password = `${first_name.toLowerCase()}${last_name.toLowerCase()}2024`;
        const { data: authData, error: authErr } = await supabase.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        });
        if (authErr) throw authErr;

        const { error: insertErr } = await supabase
          .from('parents')
          .insert([{ parent_id: parentIdData, user_id: authData.user.id, first_name, last_name, email, phone, address, emergency_contact_name, emergency_contact_phone }]);
        if (insertErr) {
          try { await supabase.auth.admin.deleteUser(authData.user.id); } catch (_) {}
          throw insertErr;
        }
        results.push({ email, ok: true, parent_id: parentIdData, password });
      } catch (e) {
        results.push({ email, ok: false, error: e.message });
      }
    }

    const okCount = results.filter(r => r.ok).length;
    return res.status(200).json({ imported: okCount, results });
  } catch (e) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}


