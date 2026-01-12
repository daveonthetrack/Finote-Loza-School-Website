import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function StudentGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    async function run() {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        window.location.href = '/student/login';
        return;
      }
      try {
        const role = data.user.user_metadata?.role;
        if (role && role !== 'student') {
          await supabase.auth.signOut();
          window.location.href = '/student/login';
          return;
        }
        // Verify student profile exists
        const { data: studentProfile } = await supabase
          .from('students')
          .select('id')
          .eq('user_id', data.user.id)
          .single();
        if (!studentProfile) {
          await supabase.auth.signOut();
          window.location.href = '/student/login';
          return;
        }
      } catch (e) {
        await supabase.auth.signOut();
        window.location.href = '/student/login';
        return;
      }
      setAuthed(true);
      setLoading(false);
    }
    run();
  }, []);

  if (loading) return <div className="container-page py-12">Loading...</div>;
  if (!authed) return null;
  return children;
}


