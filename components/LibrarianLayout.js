import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

function NavLink({ href, label, icon }) {
  const router = useRouter();
  const active = router.asPath.startsWith(href);
  return (
    <Link
      href={href}
      className={
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition border-l-2 ' +
        (active
          ? 'bg-gold-100 text-gold-800 font-medium border-gold-600'
          : 'text-gray-700 hover:bg-gray-100 border-transparent')
      }
    >
      {icon}
      {label}
    </Link>
  );
}

export default function LibrarianLayout({ children }) {
  const [librarian, setLibrarian] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { data } = await supabase
          .from('librarians')
          .select('first_name,last_name,librarian_id')
          .eq('user_id', user.id)
          .single();
        setLibrarian(data || null);
      } catch (e) {
        // no-op
      }
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = '/librarian/login';
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-page py-6">
        <div className="grid grid-cols-1 md:grid-cols-[260px,1fr] gap-6">
          <aside className="bg-white border border-gray-100 rounded-xl shadow-soft p-4 h-max sticky top-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-navy-50 border border-navy-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-navy-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0 0C10.832 19.477 9.246 20 7.5 20S4.168 19.477 3 18.253m0-13C4.168 4.477 5.754 4 7.5 4s3.332.477 4.5 1.253m0 13C13.168 19.477 14.754 20 16.5 20c1.746 0 3.332-.477 4.5-1.253m0-13C19.832 4.477 18.246 4 16.5 4c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="font-display text-sm text-gray-900">
                  {librarian ? `${librarian.first_name} ${librarian.last_name}` : 'Librarian Portal'}
                </p>
                <p className="text-xs text-gray-500">{librarian?.librarian_id || 'Library Tools'}</p>
              </div>
            </div>

            <nav className="space-y-1">
              <NavLink
                href="/librarian-portal"
                label="Dashboard"
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                  </svg>
                }
              />
              <NavLink
                href="/librarian-portal/books"
                label="Books"
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0 0C10.832 19.477 9.246 20 7.5 20S4.168 19.477 3 18.253m0-13C4.168 4.477 5.754 4 7.5 4s3.332.477 4.5 1.253m0 13C13.168 19.477 14.754 20 16.5 20c1.746 0 3.332-.477 4.5-1.253m0-13C19.832 4.477 18.246 4 16.5 4c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                }
              />
              <NavLink
                href="/librarian-portal/copies"
                label="Copies"
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V7a2 2 0 00-2-2H8a2 2 0 00-2 2v6m14 0a2 2 0 01-2 2H8a2 2 0 01-2-2m14 0v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6" />
                  </svg>
                }
              />
              <NavLink
                href="/librarian-portal/loans"
                label="Loans"
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
              />
            </nav>

            <button
              onClick={signOut}
              className="mt-6 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              Sign out
            </button>
          </aside>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}


