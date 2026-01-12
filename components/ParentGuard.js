import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';

export default function ParentGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [parent, setParent] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setUser(null);
        setParent(null);
        router.push('/parent/login');
      } else {
        setUser(session.user);
        await verifyParent(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  async function verifyParent(userId) {
    try {
      const { data: parentData, error } = await supabase
        .from('parents')
        .select('id, parent_id, first_name, last_name, email')
        .eq('user_id', userId)
        .single();

      if (error || !parentData) {
        await supabase.auth.signOut();
        router.push('/parent/login');
        return;
      }
      setParent(parentData);
    } catch (error) {
      console.error('Error verifying parent:', error);
      await supabase.auth.signOut();
      router.push('/parent/login');
    }
  }

  async function checkUser() {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/parent/login');
        return;
      }

      setUser(session.user);
      await verifyParent(session.user.id);
    } catch (error) {
      console.error('Error checking user:', error);
      router.push('/parent/login');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading parent portal...</p>
        </div>
      </div>
    );
  }

  if (!user || !parent) {
    return null;
  }

  return children;
}
