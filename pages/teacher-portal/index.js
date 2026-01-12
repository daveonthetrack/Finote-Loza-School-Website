import TeacherLayout from '@/components/TeacherLayout';
import TeacherGuard from '@/components/TeacherGuard';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

export default function TeacherPortal() {
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    pendingAssignments: 0,
    gradesToGrade: 0,
    upcomingDeadlines: 0
  });
  const [recentAssignments, setRecentAssignments] = useState([]);
  const [recentGrades, setRecentGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeacherData();
  }, []);

  async function loadTeacherData() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch teacher profile
      const { data: teacher } = await supabase
        .from('teachers')
        .select('first_name,last_name,email,department,subjects,photo_url')
        .eq('user_id', user.id)
        .single();

      setTeacherInfo(teacher ? {
        name: `${teacher.first_name} ${teacher.last_name}`,
        email: teacher.email || user.email,
        subjects: teacher.subjects || [],
        department: teacher.department || 'Faculty',
        photo_url: teacher.photo_url || null
      } : {
        name: user.email,
        email: user.email,
        subjects: [],
        department: 'Faculty'
      });

      // Load recent assignments and attach student info via students.user_id
      const { data: assignmentsRaw } = await supabase
        .from('assignments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      let assignments = assignmentsRaw || [];
      const assignedUserIds = assignments
        .map((a) => a.assigned_to_user_id)
        .filter(Boolean);

      if (assignedUserIds.length > 0) {
        const { data: studentRows } = await supabase
          .from('students')
          .select('first_name,last_name,student_id,user_id')
          .in('user_id', assignedUserIds);
        const byUserId = Object.fromEntries(
          (studentRows || []).map((s) => [s.user_id, s])
        );
        assignments = assignments.map((a) => ({
          ...a,
          student: a.assigned_to_user_id ? byUserId[a.assigned_to_user_id] || null : null,
        }));
      }

      // Load recent grades
      const { data: grades } = await supabase
        .from('grades')
        .select(`
          *,
          students!grades_student_id_fkey (
            first_name,
            last_name,
            student_id
          ),
          assignments!grades_assignment_id_fkey (
            title
          )
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      // Calculate stats
      const { data: allAssignments } = await supabase
        .from('assignments')
        .select('status')
        .eq('status', 'Pending');

      const { data: allGrades } = await supabase
        .from('grades')
        .select('id');

      setRecentAssignments(assignments || []);
      setRecentGrades(grades || []);
      setStats({
        totalStudents: 24, // TODO: compute based on teacher's classes
        pendingAssignments: allAssignments?.length || 0,
        gradesToGrade: 0, // TODO: compute based on ungraded items
        upcomingDeadlines: 3 // TODO: compute based on due dates
      });

    } catch (error) {
      console.error('Error loading teacher data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <TeacherGuard>
        <TeacherLayout>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-700 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading teacher dashboard...</p>
          </div>
        </TeacherLayout>
      </TeacherGuard>
    );
  }

  return (
    <TeacherGuard>
      <TeacherLayout>
        <div className="py-2">
          {/* Hero */}
          <div className="mb-8 rounded-xl overflow-hidden">
            <div className="bg-gradient-to-br from-navy-900 to-navy-700 text-white p-6 md:p-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                  {teacherInfo?.photo_url ? (
                    <img src={teacherInfo.photo_url} alt="profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white/80 text-lg font-semibold">
                      {(teacherInfo?.name?.split(' ')?.[0]?.[0] || 'T')}{(teacherInfo?.name?.split(' ')?.[1]?.[0] || 'R')}
                    </span>
                  )}
                </div>
                <div>
                  <h1 className="heading-section text-white">Welcome back, {teacherInfo?.name || 'Teacher'}!</h1>
                  <p className="text-navy-200 text-sm md:text-base">{teacherInfo?.department || 'Faculty'} • {teacherInfo?.subjects?.join(', ') || 'Subjects not set'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Reveal delay={0}>
              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gold-700">{stats.totalStudents}</h3>
                <p className="text-gray-600">Total Students</p>
              </div>
            </Reveal>
            
            <Reveal delay={100}>
              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gold-700">{stats.pendingAssignments}</h3>
                <p className="text-gray-600">Pending Assignments</p>
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gold-700">{stats.gradesToGrade}</h3>
                <p className="text-gray-600">Grades to Grade</p>
              </div>
            </Reveal>
            
            <Reveal delay={300}>
              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gold-700">{stats.upcomingDeadlines}</h3>
                <p className="text-gray-600">Upcoming Deadlines</p>
              </div>
            </Reveal>
          </div>

          {/* Quick Actions */}
          <Reveal>
            <div className="card p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-gold-100 text-gold-700">Shortcuts</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/teacher-portal/assignments" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Create Assignment</p>
                    <p className="text-sm text-gray-600">Add new assignment</p>
                  </div>
                </div>
              </Link>

              <Link href="/teacher-portal/grades" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Grade Assignments</p>
                    <p className="text-sm text-gray-600">Review and grade work</p>
                  </div>
                </div>
              </Link>

              <Link href="/teacher-portal/students" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">View Students</p>
                    <p className="text-sm text-gray-600">Student progress</p>
                  </div>
                </div>
              </Link>

              <Link href="/teacher-portal/attendance" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Take Attendance</p>
                    <p className="text-sm text-gray-600">Mark attendance</p>
                  </div>
                </div>
              </Link>

              <Link href="/teacher-portal/profile" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Profile Settings</p>
                    <p className="text-sm text-gray-600">Update profile</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </Reveal>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Assignments */}
            <Reveal>
              <div className="card p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Assignments</h2>
                  <Link href="/teacher-portal/assignments" className="text-gold-600 hover:text-gold-700 text-sm font-medium">
                    View all
                  </Link>
                </div>
                <div className="space-y-3">
                  {recentAssignments.length > 0 ? (
                    recentAssignments.map((assignment) => (
                      <div key={assignment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{assignment.title}</p>
                          <p className="text-sm text-gray-600">
                            {assignment.student
                              ? `${assignment.student.first_name} ${assignment.student.last_name}`
                              : 'Unknown Student'}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            assignment.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : assignment.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {assignment.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No recent assignments</p>
                  )}
                </div>
              </div>
            </Reveal>

            {/* Recent Grades */}
            <Reveal delay={100}>
              <div className="card p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Grades</h2>
                  <Link href="/teacher-portal/grades" className="text-gold-600 hover:text-gold-700 text-sm font-medium">
                    View all
                  </Link>
                </div>
                <div className="space-y-3">
                  {recentGrades.length > 0 ? (
                    recentGrades.map((grade) => (
                      <div key={grade.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">
                            {grade.students ? 
                              `${grade.students.first_name} ${grade.students.last_name}` : 
                              'Unknown Student'
                            }
                          </p>
                          <p className="text-sm text-gray-600">
                            {grade.assignments ? grade.assignments.title : grade.subject}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            grade.grade_value >= 90 ? 'text-green-600' :
                            grade.grade_value >= 80 ? 'text-blue-600' :
                            grade.grade_value >= 70 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {grade.grade_value}%
                          </p>
                          <p className="text-xs text-gray-500">{grade.letter_grade}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No recent grades</p>
                )}
              </div>
              </div>
            </Reveal>
          </div>
        </div>
      </TeacherLayout>
    </TeacherGuard>
  );
}
