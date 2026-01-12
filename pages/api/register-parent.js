import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceKey) {
      return res.status(500).json({ error: 'Server misconfigured: missing Supabase env vars' });
    }
    const adminSupabase = createClient(supabaseUrl, serviceKey);
    const { 
      first_name, 
      last_name, 
      email, 
      phone, 
      address, 
      emergency_contact_name, 
      emergency_contact_phone 
    } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate parent ID
    const { data: parentIdData, error: parentIdError } = await adminSupabase.rpc('generate_parent_id');
    if (parentIdError) {
      return res.status(400).json({ error: parentIdError.message });
    }
    const parentId = parentIdData;

    // Create auth user
    const { data: authData, error: authError } = await adminSupabase.auth.admin.createUser({
      email: email.trim().toLowerCase(),
      password: `${first_name.toLowerCase()}${last_name.toLowerCase()}2024`,
      email_confirm: true
    });

    if (authError) {
      console.error('Auth error:', authError);
      return res.status(400).json({ error: authError.message });
    }

    // Create parent record
    const { data: parentData, error: parentError } = await adminSupabase
      .from('parents')
      .insert([{
        parent_id: parentId,
        user_id: authData.user.id,
        first_name,
        last_name,
        email: email.trim().toLowerCase(),
        phone,
        address,
        emergency_contact_name,
        emergency_contact_phone
      }])
      .select()
      .single();

    if (parentError) {
      console.error('Parent creation error:', parentError);
      // Clean up auth user if parent creation fails
      try { await adminSupabase.auth.admin.deleteUser(authData.user.id); } catch (_) {}
      return res.status(400).json({ error: parentError.message });
    }

    res.status(201).json({
      success: true,
      parent: parentData,
      credentials: {
        email: email.trim().toLowerCase(),
        password: `${first_name.toLowerCase()}${last_name.toLowerCase()}2024`,
        parent_id: parentId
      }
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
