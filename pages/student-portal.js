import Layout from '@/components/Layout';
import StudentGuard from '@/components/StudentGuard';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';


export default function StudentPortal() {
  const [me, setMe] = useState(null);
  const [assignmentsData, setAssignmentsData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [gradesData, setGradesData] = useState([]);
  const [gpa, setGpa] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      const userId = data?.user?.id;
      if (!userId) return;
      const { data: s } = await supabase.from('students').select('*').eq('user_id', userId).single();
      setMe(s || null);
      // fetch grades and GPA for this student
      if (s?.id) {
        const { data: g } = await supabase
          .from('grades')
          .select('id, subject, grade_value, letter_grade, semester, academic_year, assignments!grades_assignment_id_fkey ( title )')
          .eq('student_id', s.id)
          .eq('finalized', true)
          .order('created_at', { ascending: false })
          .limit(20);
        setGradesData(g || []);

        const { data: gpaData } = await supabase.rpc('calculate_gpa', { student_uuid: s.id, semester_filter: null });
        if (typeof gpaData === 'number') {
          setGpa(gpaData);
        } else if (Array.isArray(gpaData) && gpaData.length) {
          setGpa(gpaData[0]);
        } else {
          setGpa(null);
        }
      }
      // fetch per-student assignments
      const { data: a } = await supabase
        .from('assignments')
        .select('id,title,subject,due_date,status,priority')
        .eq('assigned_to_user_id', userId)
        .order('due_date', { ascending: true })
        .limit(10);
      setAssignmentsData(a || []);
      // fetch upcoming events (public)
      const now = new Date().toISOString();
      const { data: ev } = await supabase
        .from('events')
        .select('id,title,location,start_at,end_at')
        .gt('start_at', now)
        .order('start_at', { ascending: true })
        .limit(10);
      setEventsData(ev || []);
    })();
  }, []);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Fetch announcements
    (async () => {
      const { data: annData } = await supabase
        .from('announcements')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false })
        .limit(10);
      setAnnouncements(annData || []);
    })();
  }, []);

  const assignments = assignmentsData.map(x => ({
    title: x.title,
    subject: x.subject || 'General',
    dueDate: x.due_date || '',
    status: x.status || 'Pending',
    priority: x.priority || 'medium'
  }));

  const upcomingEvents = eventsData.map(e => ({
    title: e.title,
    date: (e.start_at || '').slice(0,10),
    time: e.start_at ? new Date(e.start_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
    location: e.location || ''
  }));

  const grades = gradesData.map(g => ({
    subject: g.subject,
    title: g.assignments?.title || '-',
    percentage: g.grade_value,
    letter: g.letter_grade || '-',
    semester: g.semester || '-',
    year: g.academic_year || '-'
  }));

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'In Progress': return 'text-blue-600 bg-blue-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Layout>
      <StudentGuard>
        {me && (
          <section className="bg-navy-900 text-white py-8">
            <div className="container-page flex items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                  {me.photo_url ? (
                    <img src={me.photo_url} alt="headshot" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/70 text-2xl font-semibold">{(me.first_name?.[0]||'S')}{(me.last_name?.[0]||'T')}</div>
                  )}
                </div>
                <div>
                  <div className="text-xl font-semibold">Welcome, {me.first_name} {me.last_name}</div>
                  <div className="text-white/80 text-sm">ID: {me.student_id} • Grade: {me.grade_level || '-'} • Homeroom: {me.homeroom || '-'}</div>
                </div>
              </div>
              <div className="relative">
                <details className="group">
                  <summary className="list-none cursor-pointer select-none px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-sm">Profile</summary>
                  <div className="absolute right-0 mt-2 w-48 bg-white text-navy-900 rounded-md shadow card p-2 space-y-1">
                    <button
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm"
                      onClick={async () => {
                        const newPass = prompt('Enter a new password');
                        if (!newPass) return;
                        const { data: userData } = await supabase.auth.getUser();
                        const userId = userData?.user?.id;
                        if (!userId) return alert('Not signed in');
                        const res = await fetch('/api/reset-student-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, newPassword: newPass }) });
                        if (!res.ok) return alert('Failed to change password');
                        alert('Password updated');
                      }}
                    >Change Password</button>
                    <button
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm"
                      onClick={async ()=> { await supabase.auth.signOut(); window.location.href='/student/login'; }}
                    >Logout</button>
                  </div>
                </details>
              </div>
            </div>
          </section>
        )}
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-700 text-white py-20">
        <div className="container-page">
          <Reveal>
            <h1 className="heading-section text-white">Student Portal</h1>
            <p className="mt-4 text-xl text-navy-100 max-w-3xl">
              Welcome back, {me?.first_name} {me?.last_name}! Access your assignments, 
              and stay updated with school announcements.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Student Info Cards */}
      <section className="container-page py-8">
        <div className="grid md:grid-cols-4 gap-6">
          <Reveal delay={0}>
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">{me?.first_name} {me?.last_name}</h3>
              <p className="text-gray-600">{me?.grade_level || 'N/A'}</p>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gold-700">{gpa ?? 'N/A'}</h3>
              <p className="text-gray-600">GPA</p>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gold-700">N/A</h3>
              <p className="text-gray-600">Attendance</p>
            </div>
          </Reveal>
          
          <Reveal delay={300}>
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gold-700">{me?.student_id}</h3>
              <p className="text-gray-600">Student ID</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="container-page pb-8">
        <Reveal>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'dashboard', name: 'Dashboard' },
              { id: 'grades', name: 'Grades' },
              { id: 'assignments', name: 'Assignments' },
              { id: 'announcements', name: 'Announcements' },
              { id: 'schedule', name: 'Schedule' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition ${
                  activeTab === tab.id
                    ? 'bg-gold-700 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <section className="container-page pb-16">
          <div className="grid lg:grid-cols-2 gap-8">
            <Reveal>
              <div className="card p-6">
                <h2 className="text-xl font-bold text-navy-900 mb-4">Upcoming Assignments</h2>
                <div className="space-y-3">
                  {assignments.length > 0 ? (
                    assignments.slice(0, 3).map((assignment, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-semibold">{assignment.title}</h3>
                          <p className="text-sm text-gray-600">{assignment.subject}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Due: {assignment.dueDate}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(assignment.priority)}`}>
                            {assignment.priority}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No upcoming assignments.</p>
                  )}
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={100}>
              <div className="card p-6">
                <h2 className="text-xl font-bold text-navy-900 mb-4">Upcoming Events</h2>
                <div className="space-y-3">
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.slice(0, 3).map((event, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-sm text-gray-600">{event.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{event.date}</p>
                          <p className="text-sm text-gray-600">{event.time}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No upcoming events.</p>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Grades Tab */}
      {activeTab === 'grades' && (
        <section className="container-page pb-16">
          <Reveal>
            <div className="card overflow-hidden">
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-xl font-bold text-navy-900">Grades</h2>
                <div className="text-sm text-gray-600">GPA: <span className="font-semibold text-gold-700">{gpa ?? 'N/A'}</span></div>
              </div>
              {grades.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left font-semibold">Subject</th>
                        <th className="px-6 py-3 text-left font-semibold">Assignment</th>
                        <th className="px-6 py-3 text-left font-semibold">Percentage</th>
                        <th className="px-6 py-3 text-left font-semibold">Letter</th>
                        <th className="px-6 py-3 text-left font-semibold">Semester</th>
                        <th className="px-6 py-3 text-left font-semibold">Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grades.map((gr, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-3 font-medium">{gr.subject}</td>
                          <td className="px-6 py-3">{gr.title}</td>
                          <td className="px-6 py-3">{gr.percentage != null ? `${gr.percentage}%` : '-'}</td>
                          <td className="px-6 py-3">
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gold-100 text-gold-700">{gr.letter}</span>
                          </td>
                          <td className="px-6 py-3">{gr.semester}</td>
                          <td className="px-6 py-3">{gr.year}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-gray-600">No grades available yet.</p>
                </div>
              )}
            </div>
          </Reveal>
        </section>
      )}

      {/* Assignments Tab */}
      {activeTab === 'assignments' && (
        <section className="container-page pb-16">
          <Reveal>
            <div className="space-y-4">
              {assignments.length > 0 ? (
                assignments.map((assignment, idx) => (
                  <div key={idx} className="card p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{assignment.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            {assignment.subject}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Due: {assignment.dueDate}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(assignment.status)}`}>
                          {assignment.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(assignment.priority)}`}>
                          {assignment.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="card p-6 text-center">
                  <h2 className="text-xl font-bold text-navy-900 mb-4">Assignments</h2>
                  <p className="text-gray-600">No assignments available at this time.</p>
                </div>
              )}
            </div>
          </Reveal>
        </section>
      )}

      {/* Announcements Tab */}
      {activeTab === 'announcements' && (
        <section className="container-page pb-16">
          <Reveal>
            <div className="space-y-4">
              {announcements.length > 0 ? (
                announcements.map((announcement, idx) => (
                  <div key={idx} className="card p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-lg">{announcement.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        announcement.level === 'error' ? 'bg-red-100 text-red-700' :
                        announcement.level === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {announcement.level}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{announcement.message}</p>
                    <p className="text-sm text-gray-500">Posted: {new Date(announcement.created_at).toLocaleDateString()}</p>
                  </div>
                ))
              ) : (
                <div className="card p-6 text-center">
                  <h2 className="text-xl font-bold text-navy-900 mb-4">Announcements</h2>
                  <p className="text-gray-600">No announcements at this time.</p>
                </div>
              )}
            </div>
          </Reveal>
        </section>
      )}

      {/* Schedule Tab */}
      {activeTab === 'schedule' && (
        <section className="container-page pb-16">
          <Reveal>
            <div className="card p-6 text-center">
              <h2 className="text-xl font-bold text-navy-900 mb-6">Weekly Schedule</h2>
              <p className="text-gray-600">
                Schedule information is not yet available. This feature will be implemented when the class schedule system is set up.
              </p>
            </div>
          </Reveal>
        </section>
      )}
      </StudentGuard>
    </Layout>
  );
}
