import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return res.status(500).json({ error: 'Server misconfigured' });

  const { firstName, lastName, email, password: providedPassword } = req.body || {};
  if (!firstName || !lastName || !email) return res.status(400).json({ error: 'Missing required fields' });

  const supabaseAdmin = createClient(url, key);

  try {
    const pad = (n) => n.toString().padStart(4, '0');
    const year = new Date().getFullYear();

    const { data: last } = await supabaseAdmin
      .from('librarians')
      .select('librarian_id')
      .like('librarian_id', `LIB-${year}-%`)
      .order('librarian_id', { ascending: false })
      .limit(1)
      .single();

    let nextNumber = 1;
    if (last?.librarian_id) {
      const parts = String(last.librarian_id).split('-');
      const lastNumber = parseInt(parts[2] || '0', 10);
      if (!Number.isNaN(lastNumber)) nextNumber = lastNumber + 1;
    }

    const librarianId = `LIB-${year}-${pad(nextNumber)}`;
    const password = providedPassword || `${String(firstName).toLowerCase()}${String(lastName).toLowerCase()}${year}`;

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: String(email).trim().toLowerCase(),
      password,
      email_confirm: true,
      user_metadata: {
        first_name: firstName,
        last_name: lastName,
        librarian_id: librarianId,
      },
    });

    if (authError) return res.status(400).json({ error: `Failed to create librarian account: ${authError.message}` });

    const { data: librarianRow, error: librarianError } = await supabaseAdmin
      .from('librarians')
      .insert([{
        librarian_id: librarianId,
        first_name: firstName,
        last_name: lastName,
        email: String(email).trim().toLowerCase(),
        user_id: authData.user.id,
      }])
      .select()
      .single();

    if (librarianError) {
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return res.status(400).json({ error: `Failed to create librarian record: ${librarianError.message}` });
    }

    return res.status(200).json({
      success: true,
      librarian: librarianRow,
      credentials: {
        librarian_id: librarianId,
        email: librarianRow.email,
        password,
      },
    });
  } catch (e) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}


