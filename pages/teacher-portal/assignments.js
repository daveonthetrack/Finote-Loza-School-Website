import TeacherLayout from '@/components/TeacherLayout';
import TeacherGuard from '@/components/TeacherGuard';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';

export default function TeacherAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    subject: '',
    description: '',
    due_date: '',
    priority: 'medium',
    assigned_to_user_id: '',
    assign_mode: 'single', // 'single' | 'class'
    grade_level: '',
    homeroom: ''
  });
  const [creating, setCreating] = useState(false);

  const gradeLevels = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  const homerooms = ['A','B','C','D','E','F','G','H'];

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      // Load assignments
      const { data: assignmentsRaw } = await supabase
        .from('assignments')
        .select('*')
        .order('created_at', { ascending: false });

      // Load students for assignment creation and for display
      const { data: studentsData } = await supabase
        .from('students')
        .select('id, first_name, last_name, student_id, grade_level, homeroom, user_id')
        .not('user_id', 'is', null)
        .order('first_name');

      const byUserId = Object.fromEntries(
        (studentsData || []).map((s) => [s.user_id, s])
      );

      const assignmentsWithStudent = (assignmentsRaw || []).map((a) => ({
        ...a,
        student: a.assigned_to_user_id ? byUserId[a.assigned_to_user_id] || null : null,
      }));

      setAssignments(assignmentsWithStudent);
      setStudents(studentsData || []);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Error loading assignments data');
    } finally {
      setLoading(false);
    }
  }

  async function createAssignment(e) {
    e.preventDefault();
    setCreating(true);
    try {
      const base = {
        title: newAssignment.title,
        subject: newAssignment.subject || null,
        description: newAssignment.description || null,
        due_date: newAssignment.due_date || null,
        priority: newAssignment.priority || 'medium',
      };

      let insertError = null;

      if (newAssignment.assign_mode === 'class') {
        if (!newAssignment.grade_level || !newAssignment.homeroom) {
          throw new Error('Please select both grade and section to assign to a class.');
        }
        // Load all students in that class (grade + homeroom) who have user accounts
        const { data: gradeStudents, error: studentsErr } = await supabase
          .from('students')
          .select('user_id')
          .eq('grade_level', newAssignment.grade_level)
          .eq('homeroom', newAssignment.homeroom)
          .not('user_id', 'is', null);
        if (studentsErr) throw studentsErr;
        if (!gradeStudents || gradeStudents.length === 0) {
          throw new Error('No students found for that grade.');
        }
        const rows = gradeStudents.map((s) => ({
          ...base,
          assigned_to_user_id: s.user_id,
        }));
        const { error } = await supabase.from('assignments').insert(rows);
        insertError = error;
      } else {
        if (!newAssignment.assigned_to_user_id) {
          throw new Error('Please select a student.');
        }
        const { error } = await supabase
          .from('assignments')
          .insert([{ ...base, assigned_to_user_id: newAssignment.assigned_to_user_id }]);
        insertError = error;
      }

      if (insertError) throw insertError;

      alert('Assignment created successfully!');
      setShowCreateModal(false);
      setNewAssignment({
        title: '',
        subject: '',
        description: '',
        due_date: '',
        priority: 'medium',
        assigned_to_user_id: '',
        assign_mode: 'single',
        grade_level: '',
        homeroom: ''
      });
      loadData();
    } catch (error) {
      console.error('Error creating assignment:', error);
      alert('Error creating assignment: ' + error.message);
    } finally {
      setCreating(false);
    }
  }

  async function updateAssignmentStatus(assignmentId, newStatus) {
    try {
      const { error } = await supabase
        .from('assignments')
        .update({ status: newStatus })
        .eq('id', assignmentId);

      if (error) throw error;

      loadData();
    } catch (error) {
      console.error('Error updating assignment:', error);
      alert('Error updating assignment: ' + error.message);
    }
  }

  async function deleteAssignment(assignmentId) {
    if (!confirm('Are you sure you want to delete this assignment?')) return;
    
    try {
      const { error } = await supabase
        .from('assignments')
        .delete()
        .eq('id', assignmentId);

      if (error) throw error;

      alert('Assignment deleted successfully!');
      loadData();
    } catch (error) {
      console.error('Error deleting assignment:', error);
      alert('Error deleting assignment: ' + error.message);
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getClassLabel = (student) => {
    if (!student) return 'Unknown';
    const grade = student.grade_level || '';
    const room = student.homeroom || '';
    if (!grade && !room) return 'Unassigned';
    return `${grade}${room}`;
  };

  const groupedAssignments = assignments.reduce((acc, assignment) => {
    const key = getClassLabel(assignment.student);
    if (!acc[key]) acc[key] = [];
    acc[key].push(assignment);
    return acc;
  }, {});

  const sortedClassKeys = Object.keys(groupedAssignments).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return (
    <TeacherGuard>
      <TeacherLayout>
        <div className="py-2">
          <Reveal>
            <SectionHeading title="Assignments" subtitle="Create and manage student assignments" />
          </Reveal>
          
          <div className="flex justify-end mb-6">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" /></svg>
              New Assignment
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-700 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading assignments...</p>
            </div>
          ) : (
            <div className="card overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Title</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Subject</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Student</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Due Date</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Priority</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Status</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedClassKeys.map((cls) => (
                    <tbody key={cls}>
                      <tr className="bg-gray-100">
                        <td className="px-6 py-2 text-sm font-semibold text-gray-700" colSpan={7}>
                          Class {cls}
                        </td>
                      </tr>
                      {groupedAssignments[cls].map((assignment) => (
                        <tr key={assignment.id} className="border-t border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-medium">{assignment.title}</div>
                            {assignment.description && (
                              <div className="text-sm text-gray-500 mt-1 max-w-xs truncate">
                                {assignment.description}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">{assignment.subject || '-'}</td>
                          <td className="px-6 py-4">
                            {assignment.student ? (
                              <div>
                                <div className="font-medium">
                                  {assignment.student.first_name} {assignment.student.last_name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {assignment.student.student_id} • Grade {getClassLabel(assignment.student)}
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-400">Unknown Student</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {assignment.due_date ? new Date(assignment.due_date).toLocaleDateString() : '-'}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(assignment.priority)}`}>
                              {assignment.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(assignment.status)}`}>
                              {assignment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <select
                                value={assignment.status}
                                onChange={(e) => updateAssignmentStatus(assignment.id, e.target.value)}
                                className="text-xs border border-gray-300 rounded px-2 py-1"
                              >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                              </select>
                              <button
                                onClick={() => deleteAssignment(assignment.id)}
                                className="text-red-600 hover:text-red-800 text-xs"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ))}
                </tbody>
              </table>
              
              {assignments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No assignments found. Create your first assignment to get started.
                </div>
              )}
            </div>
          )}

          {/* Create Assignment Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="flex justify-between items-center border-b p-4">
                  <h2 className="text-xl font-bold">Create New Assignment</h2>
                  <button 
                    onClick={() => setShowCreateModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={createAssignment} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                      type="text"
                      className="w-full rounded-md border-gray-300"
                      value={newAssignment.title}
                      onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Subject</label>
                    <input
                      type="text"
                      className="w-full rounded-md border-gray-300"
                      value={newAssignment.subject}
                      onChange={(e) => setNewAssignment({ ...newAssignment, subject: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      className="w-full rounded-md border-gray-300"
                      rows={3}
                      value={newAssignment.description}
                      onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Due Date</label>
                    <input
                      type="date"
                      className="w-full rounded-md border-gray-300"
                      value={newAssignment.due_date}
                      onChange={(e) => setNewAssignment({ ...newAssignment, due_date: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Priority</label>
                    <select
                      className="w-full rounded-md border-gray-300"
                      value={newAssignment.priority}
                      onChange={(e) => setNewAssignment({ ...newAssignment, priority: e.target.value })}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium mb-1">Assign To</label>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="assign_mode"
                          value="single"
                          checked={newAssignment.assign_mode === 'single'}
                          onChange={() =>
                            setNewAssignment({ ...newAssignment, assign_mode: 'single' })
                          }
                        />
                        Single student
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="assign_mode"
                          value="class"
                          checked={newAssignment.assign_mode === 'class'}
                          onChange={() =>
                            setNewAssignment({ ...newAssignment, assign_mode: 'class' })
                          }
                        />
                        Entire class (e.g. 9C)
                      </label>
                    </div>
                  </div>

                  {newAssignment.assign_mode === 'single' ? (
                    <div>
                      <label className="block text-sm font-medium mb-1">Student</label>
                      <select
                        className="w-full rounded-md border-gray-300"
                        value={newAssignment.assigned_to_user_id}
                        onChange={(e) =>
                          setNewAssignment({
                            ...newAssignment,
                            assigned_to_user_id: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="">Select a student</option>
                        {students.map((student) => (
                          <option key={student.id} value={student.user_id}>
                            {student.first_name} {student.last_name} ({student.student_id}) - Grade{' '}
                            {student.grade_level}{student.homeroom ? student.homeroom : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Grade</label>
                        <select
                          className="w-full rounded-md border-gray-300"
                          value={newAssignment.grade_level}
                          onChange={(e) =>
                            setNewAssignment({ ...newAssignment, grade_level: e.target.value })
                          }
                          required
                        >
                          <option value="">Select grade</option>
                          {gradeLevels.map((g) => (
                            <option key={g} value={g}>
                              {g}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Section</label>
                        <select
                          className="w-full rounded-md border-gray-300"
                          value={newAssignment.homeroom}
                          onChange={(e) =>
                            setNewAssignment({ ...newAssignment, homeroom: e.target.value })
                          }
                          required
                        >
                          <option value="">Select section</option>
                          {homerooms.map((h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-lg font-medium transition flex-1"
                      disabled={creating}
                    >
                      {creating ? 'Creating...' : 'Create Assignment'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </TeacherLayout>
    </TeacherGuard>
  );
}
