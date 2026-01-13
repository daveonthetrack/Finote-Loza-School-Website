import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';

function NavLink({ href, label }) {
  const router = useRouter();
  const active = router.asPath.startsWith(href);
  return (
    <Link
      href={href}
      className={
        'block rounded-md px-3 py-2 text-sm ' +
        (active ? 'bg-navy-700 text-white' : 'text-navy-900 hover:bg-navy-100')
      }
    >
      {label}
    </Link>
  );
}

export default function AdminLayout({ children }) {
  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[240px,1fr] gap-6">
          <aside className="bg-white border border-gray-100 rounded-xl shadow-soft p-4 h-max sticky top-6">
            <p className="font-display text-lg text-navy-800">Admin</p>
            <nav className="mt-3 space-y-1">
              <NavLink href="/admin/dashboard" label="Dashboard" />
              <NavLink href="/admin/articles" label="Articles" />
              <NavLink href="/admin/events" label="Events" />
              <NavLink href="/admin/photos" label="Photos" />
              <NavLink href="/admin/students" label="Students" />
                      <NavLink href="/admin/teachers" label="Teachers" />
                      <NavLink href="/admin/parents" label="Parents" />
                      <NavLink href="/admin/applications" label="Applications" />
              <NavLink href="/admin/announcements" label="Announcements" />
              <NavLink href="/admin/assignments" label="Assignments" />
              <NavLink href="/admin/grades" label="Grades" />
              <NavLink href="/admin/librarians" label="Librarians" />
              <NavLink href="/admin/teacher-debug" label="Teacher Debug" />
              <NavLink href="/admin/content" label="Content" />
              <NavLink href="/admin/content-settings" label="Content Settings" />
              <NavLink href="/admin/settings" label="Settings" />
            </nav>
            <button onClick={signOut} className="mt-4 w-full rounded-md border px-3 py-2 text-sm">Sign out</button>
          </aside>
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}


