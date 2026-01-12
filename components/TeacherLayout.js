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

export default function TeacherLayout({ children }) {
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { data } = await supabase
          .from('teachers')
          .select('first_name,last_name,department,photo_url')
          .eq('user_id', user.id)
          .single();
        setTeacher(data || null);
      } catch (e) {
        // no-op
      }
    })();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = '/teacher/login';
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-page py-6">
        <div className="grid grid-cols-1 md:grid-cols-[240px,1fr] gap-6">
          <aside className="bg-white border border-gray-100 rounded-xl shadow-soft p-4 h-max sticky top-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center overflow-hidden">
                {teacher?.photo_url ? (
                  <img src={teacher.photo_url} alt="profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gold-700 text-sm font-semibold">
                    {(teacher?.first_name?.[0] || 'T')}{(teacher?.last_name?.[0] || 'R')}
                  </span>
                )}
              </div>
              <div>
                <p className="font-display text-sm text-gray-900">
                  {teacher ? `${teacher.first_name} ${teacher.last_name}` : 'Teacher Portal'}
                </p>
                <p className="text-xs text-gray-500">{teacher?.department || 'Faculty'}</p>
              </div>
            </div>
            <nav className="space-y-1">
              <NavLink 
                href="/teacher-portal" 
                label="Dashboard" 
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                  </svg>
                }
              />
              <NavLink 
                href="/teacher-portal/assignments" 
                label="Assignments" 
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
              />
              <NavLink 
                href="/teacher-portal/grades" 
                label="Grades" 
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                }
              />
              <NavLink 
                href="/teacher-portal/students" 
                label="My Students" 
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                }
              />
              <NavLink 
                href="/teacher-portal/attendance" 
                label="Attendance" 
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              />
              <NavLink 
                href="/teacher-portal/profile" 
                label="Profile" 
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
