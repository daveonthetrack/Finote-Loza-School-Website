import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';

export default function AdminGuard({ children }) {
  const router = useRouter();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      if (data?.session) setStatus('authed');
      else {
        setStatus('anon');
        router.replace('/admin/login');
      }
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!mounted) return;
      if (session) setStatus('authed');
      else {
        setStatus('anon');
        router.replace('/admin/login');
      }
    });
    return () => { mounted = false; sub?.subscription?.unsubscribe(); };
  }, [router]);

  if (status === 'loading') {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-4 border-navy-200 border-t-gold-500 animate-spin" />
      </div>
    );
  }

  if (status === 'authed') return children;
  return null;
}


