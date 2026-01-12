import { supabase } from '@/lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, newPassword } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const password = newPassword || 'password123';

    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
      password: password
    });

    if (error) {
      console.error('Password reset error:', error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
      newPassword: password
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
