import Layout from '@/components/Layout';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import ParentGuard from '@/components/ParentGuard';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [parentInfo, setParentInfo] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [gradesByStudent, setGradesByStudent] = useState({});
  const [gpaByStudent, setGpaByStudent] = useState({});

  useEffect(() => {
    loadParentData();
  }, []);

  async function loadParentData() {
    try {
      // Get the authenticated parent's information
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch parent profile
      const { data: parentData, error: parentError } = await supabase
        .from('parents')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (parentError || !parentData) {
        console.error('Error fetching parent profile:', parentError);
        return;
      }

      setParentInfo(parentData);

      // Fetch students associated with this parent
      const { data: parentStudentsData } = await supabase
        .from('parent_students')
        .select(`
          students (
            id,
            first_name,
            last_name,
            student_id,
            grade_level,
            user_id
          )
        `)
        .eq('parent_id', parentData.id);

      const studentsList = parentStudentsData?.map(ps => ({
        id: ps.students.id,
        name: `${ps.students.first_name} ${ps.students.last_name}`,
        grade: ps.students.grade_level || 'N/A',
        studentId: ps.students.student_id,
        gpa: 'N/A', // Will be implemented when grades system is ready
        attendance: 'N/A' // Will be implemented when attendance system is ready
      })) || [];

      setStudents(studentsList);

      if (studentsList.length > 0) {
        setSelectedStudent(studentsList[0].id);
      }

      // Load grades for all associated students
      const studentIds = studentsList.map((s) => s.id);
      if (studentIds.length > 0) {
        const { data: gradesData } = await supabase
          .from('grades')
          .select('id, student_id, subject, grade_value, letter_grade, semester, academic_year, created_at, assignments ( title )')
          .in('student_id', studentIds)
          .eq('finalized', true);

        const gradesMap = {};
        (gradesData || []).forEach((gr) => {
          if (!gradesMap[gr.student_id]) gradesMap[gr.student_id] = [];
          gradesMap[gr.student_id].push(gr);
        });
        setGradesByStudent(gradesMap);

        // Compute GPA per student via RPC
        const gpaEntries = await Promise.all(
          studentIds.map(async (id) => {
            try {
              const { data: gpaData } = await supabase.rpc('calculate_gpa', { student_uuid: id, semester_filter: null });
              let value = null;
              if (typeof gpaData === 'number') value = gpaData;
              else if (Array.isArray(gpaData) && gpaData.length) value = gpaData[0];
              return [id, value];
            } catch {
              return [id, null];
            }
          })
        );
        const gpaMap = {};
        gpaEntries.forEach(([id, val]) => { gpaMap[id] = val; });
        setGpaByStudent(gpaMap);
      }

      // Fetch announcements
      const { data: annData } = await supabase
        .from('announcements')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false })
        .limit(5);

      setAnnouncements(annData || []);

      // Fetch upcoming events
      const now = new Date().toISOString();
      const { data: eventsData } = await supabase
        .from('events')
        .select('*')
        .gte('start_at', now)
        .order('start_at', { ascending: true })
        .limit(5);

      setEvents(eventsData || []);

    } catch (error) {
      console.error('Error loading parent data:', error);
    } finally {
      setLoading(false);
    }
  }

  const currentStudent = students.find(s => s.id === selectedStudent);

  // Derive academic progress from latest grades for the selected student
  const academicProgress = (() => {
    const list = [];
    if (!selectedStudent) return list;
    const sGrades = gradesByStudent[selectedStudent] || [];
    const bySubject = {};
    sGrades.forEach((g) => {
      if (!bySubject[g.subject]) bySubject[g.subject] = [];
      bySubject[g.subject].push(g);
    });
    Object.entries(bySubject).forEach(([subject, arr]) => {
      arr.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      const current = arr[0]?.grade_value ?? null;
      const previous = arr[1]?.grade_value ?? null;
      let trend = 'up';
      if (current != null && previous != null) trend = current >= previous ? 'up' : 'down';
      list.push({ subject, current, previous, trend });
    });
    return list;
  })();

  const recentActivities = [
    { 
      type: 'assignment', 
      title: 'Math Problem Set Chapter 8', 
      subject: 'Mathematics',
      status: 'Completed',
      date: '2024-01-10',
      grade: 'A'
    },
    { 
      type: 'exam', 
      title: 'Biology Midterm', 
      subject: 'Biology',
      status: 'Graded',
      date: '2024-01-08',
      grade: 'B+'
    },
    { 
      type: 'assignment', 
      title: 'Literature Analysis Essay', 
      subject: 'English',
      status: 'Submitted',
      date: '2024-01-07',
      grade: 'Pending'
    },
    { 
      type: 'attendance', 
      title: 'Perfect Attendance Week', 
      subject: 'General',
      status: 'Achieved',
      date: '2024-01-05',
      grade: 'N/A'
    }
  ];

  const upcomingEventsFormatted = events.map(event => ({
    title: event.title,
    date: event.start_at ? new Date(event.start_at).toLocaleDateString() : 'TBD',
    time: event.start_at ? new Date(event.start_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'TBD',
    teacher: 'N/A', // Will be implemented when teacher assignments are ready
    type: 'event'
  }));

  const getTrendIcon = (trend) => {
    if (trend === 'up') {
      return (
        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>
      );
    } else {
      return (
        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
        </svg>
      );
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'assignment':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'exam':
        return (
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      case 'attendance':
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-page py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading parent dashboard...</p>
        </div>
      </Layout>
    );
  }

  return (
    <ParentGuard>
      <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-700 text-white py-20">
        <div className="container-page">
          <Reveal>
            <h1 className="heading-section text-white">Parent Dashboard</h1>
            <p className="mt-4 text-xl text-navy-100 max-w-3xl">
              Welcome, {parentInfo?.first_name || 'Parent'}! Monitor your child's academic progress, 
              stay informed about school events, and communicate with teachers.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Student Selection */}
      <section className="container-page py-8">
        <Reveal>
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4">Select Student</h2>
            {students.length > 0 ? (
              <div className="flex gap-4">
                {students.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudent(student.id)}
                    className={`p-4 rounded-lg border-2 transition ${
                      selectedStudent === student.id
                        ? 'border-gold-700 bg-gold-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h3 className="font-semibold">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.grade}</p>
                    <p className="text-sm text-gray-500">ID: {student.studentId}</p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No students found. Please contact the school administration.</p>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      {/* Student Overview Cards */}
      {currentStudent && (
        <section className="container-page pb-8">
          <div className="grid md:grid-cols-4 gap-6">
            <Reveal delay={0}>
              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                        <h3 className="text-2xl font-bold text-gold-700">{gpaByStudent[currentStudent.id] ?? 'N/A'}</h3>
                <p className="text-gray-600">Current GPA</p>
              </div>
            </Reveal>
            
            <Reveal delay={100}>
              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gold-700">{currentStudent.attendance}</h3>
                <p className="text-gray-600">Attendance</p>
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gold-700">N/A</h3>
                <p className="text-gray-600">Pending Assignments</p>
              </div>
            </Reveal>
            
            <Reveal delay={300}>
              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gold-700">{events.length}</h3>
                <p className="text-gray-600">Upcoming Events</p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Navigation Tabs */}
      <section className="container-page pb-8">
        <Reveal>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'overview', name: 'Overview' },
              { id: 'academic', name: 'Academic Progress' },
              { id: 'grades', name: 'Grades' },
              { id: 'activities', name: 'Recent Activities' },
              { id: 'events', name: 'Upcoming Events' },
              { id: 'announcements', name: 'Announcements' }
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

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <section className="container-page pb-16">
          <div className="grid lg:grid-cols-2 gap-8">
            <Reveal>
              <div className="card p-6">
                <h2 className="text-xl font-bold text-navy-900 mb-4">Academic Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Overall GPA</span>
                            <span className="text-lg font-semibold text-gold-700">{gpaByStudent[currentStudent.id] ?? 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Attendance Rate</span>
                    <span className="text-lg font-semibold text-green-600">{currentStudent.attendance}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completed Assignments</span>
                    <span className="text-lg font-semibold text-blue-600">24/27</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Upcoming Exams</span>
                    <span className="text-lg font-semibold text-orange-600">3</span>
                  </div>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={100}>
              <div className="card p-6">
                <h2 className="text-xl font-bold text-navy-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full p-3 text-left bg-gold-50 hover:bg-gold-100 rounded-lg transition">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="font-medium">Message Teacher</span>
                    </div>
                  </button>
                  <button className="w-full p-3 text-left bg-gold-50 hover:bg-gold-100 rounded-lg transition">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">Schedule Meeting</span>
                    </div>
                  </button>
                  <button className="w-full p-3 text-left bg-gold-50 hover:bg-gold-100 rounded-lg transition">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="font-medium">View Report Card</span>
                    </div>
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Academic Progress Tab */}
      {activeTab === 'academic' && (
        <section className="container-page pb-16">
          <Reveal>
            <div className="card overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-navy-900">Subject Performance</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold">Subject</th>
                      <th className="px-6 py-3 text-left font-semibold">Current Grade</th>
                      <th className="px-6 py-3 text-left font-semibold">Previous Grade</th>
                      <th className="px-6 py-3 text-left font-semibold">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {academicProgress.map((subject, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 font-medium">{subject.subject}</td>
                        <td className="px-6 py-4">
                          <span className="text-lg font-semibold text-gold-700">{subject.current}%</span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{subject.previous}%</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {getTrendIcon(subject.trend)}
                            <span className={`text-sm font-medium ${
                              subject.trend === 'up' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {subject.trend === 'up' ? 'Improving' : 'Declining'}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Recent Activities Tab */}
      {/* Grades Tab */}
      {activeTab === 'grades' && (
        <section className="container-page pb-16">
          <Reveal>
            <div className="card overflow-hidden">
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-xl font-bold text-navy-900">Grades</h2>
                {currentStudent && (
                  <div className="text-sm text-gray-600">GPA: <span className="font-semibold text-gold-700">{gpaByStudent[currentStudent.id] ?? 'N/A'}</span></div>
                )}
              </div>
              {currentStudent && (gradesByStudent[currentStudent.id]?.length || 0) > 0 ? (
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
                      {(gradesByStudent[currentStudent.id] || []).map((gr, idx) => (
                        <tr key={gr.id || idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-3 font-medium">{gr.subject}</td>
                          <td className="px-6 py-3">{gr.assignments?.title || '-'}</td>
                          <td className="px-6 py-3">{gr.grade_value != null ? `${gr.grade_value}%` : '-'}</td>
                          <td className="px-6 py-3">
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gold-100 text-gold-700">{gr.letter_grade || '-'}</span>
                          </td>
                          <td className="px-6 py-3">{gr.semester || '-'}</td>
                          <td className="px-6 py-3">{gr.academic_year || '-'}</td>
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
      {activeTab === 'activities' && (
        <section className="container-page pb-16">
          <Reveal>
            <div className="space-y-4">
              {recentActivities.map((activity, idx) => (
                <div key={idx} className="card p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{activity.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span>{activity.subject}</span>
                        <span>•</span>
                        <span>{activity.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          activity.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          activity.status === 'Graded' ? 'bg-blue-100 text-blue-700' :
                          activity.status === 'Submitted' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {activity.status}
                        </span>
                        {activity.grade !== 'N/A' && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gold-100 text-gold-700">
                            Grade: {activity.grade}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* Upcoming Events Tab */}
      {activeTab === 'events' && (
        <section className="container-page pb-16">
          <Reveal>
            <div className="space-y-4">
              {upcomingEventsFormatted.length > 0 ? (
                upcomingEventsFormatted.map((event, idx) => (
                  <div key={idx} className="card p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {event.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{event.teacher}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        event.type === 'meeting' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="card p-6 text-center">
                  <h2 className="text-xl font-bold text-navy-900 mb-4">Upcoming Events</h2>
                  <p className="text-gray-600">No upcoming events scheduled.</p>
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
      </Layout>
    </ParentGuard>
  );
}
