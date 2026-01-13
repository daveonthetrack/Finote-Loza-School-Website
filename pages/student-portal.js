import Layout from '@/components/Layout';
import StudentGuard from '@/components/StudentGuard';
import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/lib/supabaseClient';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';

// Helper function for relative dates
const formatRelativeDate = (dateString) => {
  if (!dateString) return 'No due date';
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    const daysOverdue = Math.abs(diffDays);
    return `${daysOverdue} day${daysOverdue > 1 ? 's' : ''} overdue`;
  } else if (diffDays === 0) {
    return 'Due today';
  } else if (diffDays === 1) {
    return 'Due tomorrow';
  } else if (diffDays <= 7) {
    return `Due in ${diffDays} days`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
};

// Helper function to check if assignment is overdue
const isOverdue = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const now = new Date();
  return date < now;
};

export default function StudentPortal() {
  const [me, setMe] = useState(null);
  const [assignmentsData, setAssignmentsData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [gradesData, setGradesData] = useState([]);
  const [gpa, setGpa] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [announcements, setAnnouncements] = useState([]);
  
  // Filters and search
  const [assignmentSearch, setAssignmentSearch] = useState('');
  const [assignmentFilter, setAssignmentFilter] = useState('all'); // all, pending, completed, overdue
  const [gradeFilter, setGradeFilter] = useState('all'); // all, or specific semester
  const [subjectFilter, setSubjectFilter] = useState('all');

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
          .order('created_at', { ascending: false });
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
        .order('due_date', { ascending: true });
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

  // Process assignments with enhanced data
  const assignments = useMemo(() => {
    return assignmentsData.map(x => ({
      id: x.id,
      title: x.title,
      subject: x.subject || 'General',
      dueDate: x.due_date || '',
      status: x.status || 'Pending',
      priority: x.priority || 'medium',
      isOverdue: isOverdue(x.due_date),
      relativeDate: formatRelativeDate(x.due_date)
    }));
  }, [assignmentsData]);

  // Filtered assignments
  const filteredAssignments = useMemo(() => {
    let filtered = assignments;
    
    // Search filter
    if (assignmentSearch) {
      const searchLower = assignmentSearch.toLowerCase();
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(searchLower) || 
        a.subject.toLowerCase().includes(searchLower)
      );
    }
    
    // Status filter
    if (assignmentFilter === 'overdue') {
      filtered = filtered.filter(a => a.isOverdue);
    } else if (assignmentFilter === 'pending') {
      filtered = filtered.filter(a => a.status === 'Pending' && !a.isOverdue);
    } else if (assignmentFilter === 'completed') {
      filtered = filtered.filter(a => a.status === 'Completed');
    }
    
    return filtered;
  }, [assignments, assignmentSearch, assignmentFilter]);

  const upcomingEvents = eventsData.map(e => ({
    title: e.title,
    date: (e.start_at || '').slice(0,10),
    time: e.start_at ? new Date(e.start_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
    location: e.location || '',
    fullDate: e.start_at
  }));

  // Process grades with enhanced data
  const grades = useMemo(() => {
    return gradesData.map(g => ({
      id: g.id,
      subject: g.subject,
      title: g.assignments?.title || '-',
      percentage: g.grade_value,
      letter: g.letter_grade || '-',
      semester: g.semester || '-',
      year: g.academic_year || '-'
    }));
  }, [gradesData]);

  // Get unique subjects and semesters for filters
  const uniqueSubjects = useMemo(() => {
    const subjects = [...new Set(grades.map(g => g.subject).filter(Boolean))];
    return subjects.sort();
  }, [grades]);

  const uniqueSemesters = useMemo(() => {
    const semesters = [...new Set(grades.map(g => g.semester).filter(Boolean))];
    return semesters.sort();
  }, [grades]);

  // Filtered grades
  const filteredGrades = useMemo(() => {
    let filtered = grades;
    if (subjectFilter !== 'all') {
      filtered = filtered.filter(g => g.subject === subjectFilter);
    }
    if (gradeFilter !== 'all') {
      filtered = filtered.filter(g => g.semester === gradeFilter);
    }
    return filtered;
  }, [grades, subjectFilter, gradeFilter]);

  // Grade breakdown by subject
  const gradeBreakdown = useMemo(() => {
    const breakdown = {};
    filteredGrades.forEach(grade => {
      if (!breakdown[grade.subject]) {
        breakdown[grade.subject] = {
          subject: grade.subject,
          grades: [],
          average: 0
        };
      }
      if (grade.percentage != null) {
        breakdown[grade.subject].grades.push(grade.percentage);
      }
    });
    
    Object.keys(breakdown).forEach(subject => {
      const grades = breakdown[subject].grades;
      if (grades.length > 0) {
        breakdown[subject].average = (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(1);
      }
    });
    
    return breakdown;
  }, [filteredGrades]);

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

  const getGradeColor = (percentage) => {
    if (percentage == null) return 'text-gray-600';
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <Layout>
      <StudentGuard>
        {me && (
          <section className="bg-navy-900 text-white pt-20 md:pt-24 pb-6 md:pb-8">
            <div className="container-page flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
              <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                  {me.photo_url ? (
                    <img src={me.photo_url} alt="headshot" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/70 text-xl md:text-2xl font-semibold">{(me.first_name?.[0]||'S')}{(me.last_name?.[0]||'T')}</div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-lg md:text-xl font-semibold truncate">Welcome, {me.first_name} {me.last_name}</div>
                  <div className="text-white/80 text-xs md:text-sm">ID: {me.student_id} • Grade: {me.grade_level || '-'} • Homeroom: {me.homeroom || '-'}</div>
                </div>
              </div>
              <div className="relative w-full md:w-auto">
                <details className="group">
                  <summary className="list-none cursor-pointer select-none px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-sm text-center md:text-left">Profile</summary>
                  <div className="absolute right-0 md:right-auto mt-2 w-48 bg-white text-navy-900 rounded-md shadow-lg card p-2 space-y-1 z-10">
                    <button
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm transition"
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
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm transition"
                      onClick={async ()=> { await supabase.auth.signOut(); window.location.href='/student/login'; }}
                    >Logout</button>
                  </div>
                </details>
              </div>
            </div>
          </section>
        )}
      {/* Student Info Cards */}
      <section className="container-page py-6 md:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <Reveal delay={0}>
            <div className="card p-4 md:p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-sm md:text-lg truncate">{me?.first_name} {me?.last_name}</h3>
              <p className="text-xs md:text-sm text-gray-600">{me?.grade_level || 'N/A'}</p>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <div className="card p-4 md:p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gold-700">{gpa ? gpa.toFixed(2) : 'N/A'}</h3>
              <p className="text-xs md:text-sm text-gray-600">GPA</p>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <div className="card p-4 md:p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gold-700">{filteredAssignments.filter(a => a.isOverdue).length}</h3>
              <p className="text-xs md:text-sm text-gray-600">Overdue</p>
            </div>
          </Reveal>
          
          <Reveal delay={300}>
            <div className="card p-4 md:p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
              </div>
              <h3 className="text-sm md:text-lg font-bold text-gold-700 truncate">{me?.student_id}</h3>
              <p className="text-xs md:text-sm text-gray-600">Student ID</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="container-page pb-6 md:pb-8">
        <Reveal>
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
              { id: 'grades', name: 'Grades', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
              { id: 'assignments', name: 'Assignments', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
              { id: 'announcements', name: 'Announcements', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
              { id: 'schedule', name: 'Schedule', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gold-700 text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                {tab.name}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <section className="container-page pb-12 md:pb-16">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            <Reveal>
              <div className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-navy-900">Upcoming Assignments</h2>
                  <span className="text-sm text-gray-600">{filteredAssignments.filter(a => !a.isOverdue && a.status !== 'Completed').length} pending</span>
                </div>
                <div className="space-y-3">
                  {filteredAssignments.filter(a => !a.isOverdue && a.status !== 'Completed').slice(0, 5).length > 0 ? (
                    filteredAssignments.filter(a => !a.isOverdue && a.status !== 'Completed').slice(0, 5).map((assignment) => (
                      <div key={assignment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{assignment.title}</h3>
                          <p className="text-sm text-gray-600 truncate">{assignment.subject}</p>
                        </div>
                        <div className="text-right ml-4 flex-shrink-0">
                          <p className="text-sm font-medium text-gray-900">{assignment.relativeDate}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(assignment.priority)}`}>
                            {assignment.priority}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-center py-4">No upcoming assignments.</p>
                  )}
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={100}>
              <div className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-navy-900">Upcoming Events</h2>
                  <span className="text-sm text-gray-600">{upcomingEvents.length} events</span>
                </div>
                <div className="space-y-3">
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.slice(0, 5).map((event, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{event.title}</h3>
                          <p className="text-sm text-gray-600 truncate">{event.location || 'No location'}</p>
                        </div>
                        <div className="text-right ml-4 flex-shrink-0">
                          <p className="text-sm font-medium text-gray-900">{event.date}</p>
                          <p className="text-xs text-gray-600">{event.time}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-center py-4">No upcoming events.</p>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Grades Tab */}
      {activeTab === 'grades' && (
        <section className="container-page pb-12 md:pb-16">
          <Reveal>
            <div className="card overflow-hidden">
              <div className="p-4 md:p-6 border-b bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h2 className="text-xl font-bold text-navy-900">Grades</h2>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="text-sm text-gray-600">GPA: <span className="font-semibold text-gold-700 text-lg">{gpa ? gpa.toFixed(2) : 'N/A'}</span></div>
                    <select
                      value={subjectFilter}
                      onChange={(e) => setSubjectFilter(e.target.value)}
                      className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    >
                      <option value="all">All Subjects</option>
                      {uniqueSubjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                    <select
                      value={gradeFilter}
                      onChange={(e) => setGradeFilter(e.target.value)}
                      className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                    >
                      <option value="all">All Semesters</option>
                      {uniqueSemesters.map(semester => (
                        <option key={semester} value={semester}>{semester}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Grade Breakdown by Subject */}
              {Object.keys(gradeBreakdown).length > 0 && (
                <div className="p-4 md:p-6 border-b bg-gray-50">
                  <h3 className="text-lg font-semibold text-navy-900 mb-4">Subject Averages</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.values(gradeBreakdown).map((subject) => (
                      <div key={subject.subject} className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">{subject.subject}</p>
                        <p className={`text-2xl font-bold ${getGradeColor(subject.average)}`}>
                          {subject.average}%
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{subject.grades.length} grade{subject.grades.length !== 1 ? 's' : ''}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredGrades.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subject</th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Assignment</th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Percentage</th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Letter</th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Semester</th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Year</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredGrades.map((gr) => (
                        <tr key={gr.id} className="hover:bg-gray-50 transition">
                          <td className="px-4 md:px-6 py-4 font-medium text-sm">{gr.subject}</td>
                          <td className="px-4 md:px-6 py-4 text-sm text-gray-600">{gr.title}</td>
                          <td className="px-4 md:px-6 py-4">
                            <span className={`text-sm font-semibold ${getGradeColor(gr.percentage)}`}>
                              {gr.percentage != null ? `${gr.percentage}%` : '-'}
                            </span>
                          </td>
                          <td className="px-4 md:px-6 py-4">
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gold-100 text-gold-700">
                              {gr.letter}
                            </span>
                          </td>
                          <td className="px-4 md:px-6 py-4 text-sm text-gray-600">{gr.semester}</td>
                          <td className="px-4 md:px-6 py-4 text-sm text-gray-600">{gr.year}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 md:p-12 text-center">
                  <p className="text-gray-600">No grades available yet.</p>
                </div>
              )}
            </div>
          </Reveal>
        </section>
      )}

      {/* Assignments Tab */}
      {activeTab === 'assignments' && (
        <section className="container-page pb-12 md:pb-16">
          <Reveal>
            {/* Search and Filter Bar */}
            <div className="card p-4 md:p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search assignments..."
                    value={assignmentSearch}
                    onChange={(e) => setAssignmentSearch(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                  />
                </div>
                <select
                  value={assignmentFilter}
                  onChange={(e) => setAssignmentFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                >
                  <option value="all">All Assignments</option>
                  <option value="overdue">Overdue</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredAssignments.length > 0 ? (
                filteredAssignments.map((assignment) => (
                  <div 
                    key={assignment.id} 
                    className={`card p-6 hover:shadow-lg transition-all ${
                      assignment.isOverdue ? 'border-l-4 border-red-500 bg-red-50/30' : ''
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{assignment.title}</h3>
                          {assignment.isOverdue && (
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                              Overdue
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            {assignment.subject}
                          </span>
                          <span className={`flex items-center gap-1 ${assignment.isOverdue ? 'text-red-600 font-semibold' : ''}`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {assignment.relativeDate}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
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
                <div className="card p-6 md:p-12 text-center">
                  <h2 className="text-xl font-bold text-navy-900 mb-4">Assignments</h2>
                  <p className="text-gray-600">No assignments found matching your filters.</p>
                </div>
              )}
            </div>
          </Reveal>
        </section>
      )}

      {/* Announcements Tab */}
      {activeTab === 'announcements' && (
        <section className="container-page pb-12 md:pb-16">
          <Reveal>
            <div className="space-y-4">
              {announcements.length > 0 ? (
                announcements.map((announcement, idx) => (
                  <div key={idx} className="card p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-3">
                      <h3 className="font-semibold text-lg">{announcement.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex-shrink-0 ${
                        announcement.level === 'error' ? 'bg-red-100 text-red-700' :
                        announcement.level === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {announcement.level}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3 whitespace-pre-wrap">{announcement.message}</p>
                    <p className="text-sm text-gray-500">Posted: {new Date(announcement.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                ))
              ) : (
                <div className="card p-6 md:p-12 text-center">
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
        <section className="container-page pb-12 md:pb-16">
          <Reveal>
            <div className="card p-6 md:p-12 text-center">
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
