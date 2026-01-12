import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { userId, newPassword } = req.body || {};
  if (!userId) return res.status(400).json({ error: 'Missing userId' });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return res.status(500).json({ error: 'Server misconfigured: SUPABASE_SERVICE_ROLE_KEY or URL missing' });
  const supabaseAdmin = createClient(url, serviceKey);

  const nextPassword = newPassword && typeof newPassword === 'string' && newPassword.length >= 8
    ? newPassword
    : (Math.random().toString(36).slice(-10) + 'A1!');
  const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, { password: nextPassword });
  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json({ newPassword: nextPassword });
}


