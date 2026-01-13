import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';

export default function LibrarianGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [librarian, setLibrarian] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setUser(null);
        setLibrarian(null);
        router.push('/librarian/login');
      } else {
        setUser(session.user);
        await verifyLibrarian(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  async function verifyLibrarian(userId) {
    try {
      const { data: librarianData, error } = await supabase
        .from('librarians')
        .select('id,librarian_id,first_name,last_name,email')
        .eq('user_id', userId)
        .single();

      if (error || !librarianData) {
        await supabase.auth.signOut();
        router.push('/librarian/login');
        return;
      }

      setLibrarian(librarianData);
    } catch (e) {
      await supabase.auth.signOut();
      router.push('/librarian/login');
    }
  }

  async function checkUser() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/librarian/login');
        return;
      }
      setUser(session.user);
      await verifyLibrarian(session.user.id);
    } catch (e) {
      router.push('/librarian/login');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading library tools...</p>
        </div>
      </div>
    );
  }

  if (!user || !librarian) return null;
  return children;
}


