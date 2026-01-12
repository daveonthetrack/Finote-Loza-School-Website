import TeacherLayout from '@/components/TeacherLayout';
import TeacherGuard from '@/components/TeacherGuard';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';

export default function TeacherGrades() {
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGrade, setNewGrade] = useState({
    student_id: '',
    assignment_id: '',
    subject: '',
    grade_value: '',
    max_points: 100,
    earned_points: '',
    semester: '',
    academic_year: '',
    teacher_notes: ''
  });
  const [creating, setCreating] = useState(false);
  const [filterStudent, setFilterStudent] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [weights, setWeights] = useState({ assessment: 30, midterm: 20, final_exam: 50 });
  const [remarkScale, setRemarkScale] = useState([
    { min: 90, max: 100, label: 'Excellent' },
    { min: 80, max: 89.99, label: 'Very Good' },
    { min: 70, max: 79.99, label: 'Good' },
    { min: 60, max: 69.99, label: 'Satisfactory' },
    { min: 50, max: 59.99, label: 'Pass' },
    { min: 0, max: 49.99, label: 'Fail' },
  ]);
  const [entryYear, setEntryYear] = useState('');
  const [entrySemester, setEntrySemester] = useState('');
  const [entryGrade, setEntryGrade] = useState('');
  const [entryHomeroom, setEntryHomeroom] = useState('');
  const [entrySubject, setEntrySubject] = useState('');
  const [entryRows, setEntryRows] = useState([]);
  const [savingClassGrades, setSavingClassGrades] = useState(false);

  const gradeLevels = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  const homerooms = ['A','B','C','D','E','F','G','H'];
  const semesters = ['Semester 1', 'Semester 2', 'Trimester 1', 'Trimester 2', 'Trimester 3'];

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id;

      // Load grades with student and assignment info
      const { data: gradesData } = await supabase
        .from('grades')
        .select(`
          *,
          students!grades_student_id_fkey (
            first_name,
            last_name,
            student_id,
            grade_level,
            homeroom
          ),
          assignments!grades_assignment_id_fkey (
            title,
            subject
          )
        `)
        .order('created_at', { ascending: false })
        .eq('created_by', userId);

      // Load students
      const { data: studentsData } = await supabase
        .from('students')
        .select('id, first_name, last_name, student_id, grade_level, homeroom')
        .order('first_name');

      // Load assignments
      const { data: assignmentsData } = await supabase
        .from('assignments')
        .select('id, title, subject')
        .order('title');

      // Load grading settings (weights and remark scale)
      const { data: settingsData } = await supabase
        .from('site_settings')
        .select('grade_assessment_weight, grade_midterm_weight, grade_final_weight, grade_remark_scale')
        .eq('id', 1)
        .maybeSingle();

      if (settingsData) {
        const w = {
          assessment: settingsData.grade_assessment_weight ?? 30,
          midterm: settingsData.grade_midterm_weight ?? 20,
          final_exam: settingsData.grade_final_weight ?? 50,
        };
        setWeights(w);
        if (settingsData.grade_remark_scale) {
          try {
            setRemarkScale(settingsData.grade_remark_scale);
          } catch {
            // keep defaults on parse error
          }
        }
      }

      setGrades(gradesData || []);
      setStudents(studentsData || []);
      setAssignments(assignmentsData || []);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Error loading grades data');
    } finally {
      setLoading(false);
    }
  }

  const getRemarkForTotal = (total) => {
    for (const rule of remarkScale) {
      if (total >= rule.min && total <= rule.max) return rule.label;
    }
    return '';
  };

  async function loadRosterForClass() {
    if (!entryYear || !entrySemester || !entryGrade || !entryHomeroom || !entrySubject) {
      alert('Please select academic year, semester, class (grade and section), and subject.');
      return;
    }
    const { data: roster, error } = await supabase
      .from('students')
      .select('id, first_name, last_name, student_id, grade_level, homeroom')
      .eq('grade_level', entryGrade)
      .eq('homeroom', entryHomeroom)
      .order('first_name');
    if (error) {
      alert(error.message);
      return;
    }
    const rows = (roster || []).map((s) => ({
      student_id: s.id,
      name: `${s.first_name} ${s.last_name}`,
      student_code: s.student_id,
      grade: s.grade_level,
      homeroom: s.homeroom,
      assessment: '',
      midterm: '',
      final_exam: '',
      total: 0,
      remark: '',
    }));
    setEntryRows(rows);
  }

  function updateEntryRow(idx, field, value) {
    setEntryRows((rows) => {
      const copy = [...rows];
      const row = { ...copy[idx] };
      let v = value === '' ? '' : parseFloat(String(value));
      if (Number.isNaN(v)) v = '';
      if (field === 'assessment' && typeof v === 'number') {
        if (v < 0) v = 0;
        if (v > weights.assessment) v = weights.assessment;
      }
      if (field === 'midterm' && typeof v === 'number') {
        if (v < 0) v = 0;
        if (v > weights.midterm) v = weights.midterm;
      }
      if (field === 'final_exam' && typeof v === 'number') {
        if (v < 0) v = 0;
        if (v > weights.final_exam) v = weights.final_exam;
      }
      row[field] = v;
      const a = typeof row.assessment === 'number' ? row.assessment : 0;
      const m = typeof row.midterm === 'number' ? row.midterm : 0;
      const f = typeof row.final_exam === 'number' ? row.final_exam : 0;
      const total = a + m + f;
      row.total = Number.isFinite(total) ? parseFloat(total.toFixed(2)) : 0;
      row.remark = getRemarkForTotal(row.total);
      copy[idx] = row;
      return copy;
    });
  }

  async function submitClassGrades() {
    if (!entryYear || !entrySemester || !entrySubject) {
      alert('Please select academic year, semester, and subject.');
      return;
    }
    if (entryRows.length === 0) {
      alert('No students in this class.');
      return;
    }
    setSavingClassGrades(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id;
      const rowsToInsert = entryRows
        .filter((r) => r.assessment !== '' || r.midterm !== '' || r.final_exam !== '')
        .map((r) => {
          const a = typeof r.assessment === 'number' ? r.assessment : 0;
          const m = typeof r.midterm === 'number' ? r.midterm : 0;
          const f = typeof r.final_exam === 'number' ? r.final_exam : 0;
          const total = a + m + f;
          return {
            student_id: r.student_id,
            assignment_id: null,
            subject: entrySubject.trim(),
            grade_value: parseFloat(total.toFixed(2)),
            assessment: a,
            midterm: m,
            final_exam: f,
            remark: getRemarkForTotal(total),
            semester: entrySemester,
            academic_year: entryYear,
            teacher_notes: null,
            created_by: userId,
            finalized: true,
          };
        });
      if (rowsToInsert.length === 0) {
        alert('Please enter at least one grade before submitting.');
        setSavingClassGrades(false);
        return;
      }
      const { error } = await supabase.from('grades').insert(rowsToInsert);
      if (error) throw error;
      alert('Grades submitted successfully.');
      setEntryRows([]);
      loadData();
    } catch (error) {
      console.error('Error submitting class grades:', error);
      alert('Error submitting class grades: ' + error.message);
    } finally {
      setSavingClassGrades(false);
    }
  }

  async function createGrade(e) {
    e.preventDefault();
    setCreating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id;
      const payload = {
        student_id: newGrade.student_id,
        assignment_id: newGrade.assignment_id ? newGrade.assignment_id : null,
        subject: (newGrade.subject || '').trim(),
        grade_value: typeof newGrade.grade_value === 'number' ? newGrade.grade_value : parseFloat(String(newGrade.grade_value || '0')),
        max_points: typeof newGrade.max_points === 'number' ? newGrade.max_points : parseFloat(String(newGrade.max_points || '100')),
        earned_points: newGrade.earned_points === '' || newGrade.earned_points == null ? null : (typeof newGrade.earned_points === 'number' ? newGrade.earned_points : parseFloat(String(newGrade.earned_points))),
        semester: newGrade.semester || null,
        academic_year: newGrade.academic_year || null,
        teacher_notes: newGrade.teacher_notes || null,
        created_by: userId
      };
      if (!payload.student_id) {
        throw new Error('Please select a student.');
      }

      const { error } = await supabase
        .from('grades')
        .insert([payload]);

      if (error) throw error;

      alert('Grade created successfully!');
      setShowCreateModal(false);
      setNewGrade({
        student_id: '',
        assignment_id: '',
        subject: '',
        grade_value: '',
        max_points: 100,
        earned_points: '',
        semester: '',
        academic_year: '',
        teacher_notes: ''
      });
      loadData();
    } catch (error) {
      console.error('Error creating grade:', error);
      alert('Error creating grade: ' + error.message);
    } finally {
      setCreating(false);
    }
  }

  async function updateGrade(gradeId, field, value) {
    try {
      const { error } = await supabase
        .from('grades')
        .update({ [field]: value })
        .eq('id', gradeId);

      if (error) throw error;

      loadData();
    } catch (error) {
      console.error('Error updating grade:', error);
      alert('Error updating grade: ' + error.message);
    }
  }

  async function deleteGrade(gradeId) {
    if (!confirm('Are you sure you want to delete this grade?')) return;
    
    try {
      const { error } = await supabase
        .from('grades')
        .delete()
        .eq('id', gradeId);

      if (error) throw error;

      alert('Grade deleted successfully!');
      loadData();
    } catch (error) {
      console.error('Error deleting grade:', error);
      alert('Error deleting grade: ' + error.message);
    }
  }

  const getGradeColor = (gradeValue) => {
    if (gradeValue >= 90) return 'text-green-600';
    if (gradeValue >= 80) return 'text-blue-600';
    if (gradeValue >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getLetterGradeColor = (letterGrade) => {
    if (letterGrade?.startsWith('A')) return 'bg-green-100 text-green-800';
    if (letterGrade?.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (letterGrade?.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    if (letterGrade?.startsWith('D')) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const filteredGrades = grades.filter(grade => {
    const matchesStudent = !filterStudent || grade.students?.first_name?.toLowerCase().includes(filterStudent.toLowerCase()) || 
                          grade.students?.last_name?.toLowerCase().includes(filterStudent.toLowerCase());
    const matchesSubject = !filterSubject || grade.subject?.toLowerCase().includes(filterSubject.toLowerCase());
    return matchesStudent && matchesSubject;
  });

  return (
    <TeacherGuard>
      <TeacherLayout>
        <div className="py-2">
          <Reveal>
            <SectionHeading title="Grades" subtitle="Record and manage student grades" />
          </Reveal>
          
          <div className="flex justify-end mb-6">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" /></svg>
              Add Grade
            </button>
          </div>

          {/* Filters */}
          <Reveal delay={100}>
            <div className="card p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium mb-1">Filter by Student</label>
                <input
                  type="text"
                  placeholder="Search by student name..."
                  className="w-full rounded-md border-gray-300"
                  value={filterStudent}
                  onChange={(e) => setFilterStudent(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Filter by Subject</label>
                <input
                  type="text"
                  placeholder="Search by subject..."
                  className="w-full rounded-md border-gray-300"
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                />
              </div>
              </div>
            </div>
          </Reveal>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-700 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading grades...</p>
            </div>
          ) : (
            <div className="card overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Student</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Subject</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Assignment</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Grade</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Letter</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Points</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Semester</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGrades.map((grade) => (
                    <tr key={grade.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        {grade.students ? (
                          <div>
                            <div className="font-medium">
                              {grade.students.first_name} {grade.students.last_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {grade.students.student_id} • Grade {grade.students.grade_level}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">Unknown Student</span>
                        )}
                      </td>
                      <td className="px-6 py-4">{grade.subject}</td>
                      <td className="px-6 py-4">
                        {grade.assignments ? grade.assignments.title : '-'}
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="100"
                          className={`w-20 text-center font-semibold ${getGradeColor(grade.grade_value)}`}
                          value={grade.grade_value}
                          onChange={(e) => updateGrade(grade.id, 'grade_value', parseFloat(e.target.value))}
                        />
                        <span className="text-gray-500 ml-1">%</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getLetterGradeColor(grade.letter_grade)}`}>
                          {grade.letter_grade || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div>{grade.earned_points || '-'} / {grade.max_points}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div>{grade.semester || '-'}</div>
                          <div className="text-gray-500">{grade.academic_year || '-'}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteGrade(grade.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredGrades.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  {grades.length === 0 
                    ? 'No grades found. Add your first grade to get started.'
                    : 'No grades match your current filters.'
                  }
                </div>
              )}
            </div>
          )}

          {/* Create Grade Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="flex justify-between items-center border-b p-4">
                  <h2 className="text-xl font-bold">Add New Grade</h2>
                  <button 
                    onClick={() => setShowCreateModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={createGrade} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Student</label>
                    <select
                      className="w-full rounded-md border-gray-300"
                      value={newGrade.student_id}
                      onChange={(e) => setNewGrade({ ...newGrade, student_id: e.target.value })}
                      required
                    >
                      <option value="">Select a student</option>
                      {students.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.first_name} {student.last_name} ({student.student_id}) - Grade {student.grade_level}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Assignment (Optional)</label>
                    <select
                      className="w-full rounded-md border-gray-300"
                      value={newGrade.assignment_id}
                      onChange={(e) => setNewGrade({ ...newGrade, assignment_id: e.target.value })}
                    >
                      <option value="">No assignment</option>
                      {assignments.map((assignment) => (
                        <option key={assignment.id} value={assignment.id}>
                          {assignment.title} ({assignment.subject})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Subject</label>
                    <input
                      type="text"
                      className="w-full rounded-md border-gray-300"
                      value={newGrade.subject}
                      onChange={(e) => setNewGrade({ ...newGrade, subject: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Grade (%)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        className="w-full rounded-md border-gray-300"
                        value={newGrade.grade_value}
                        onChange={(e) => setNewGrade({ ...newGrade, grade_value: parseFloat(e.target.value) })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Max Points</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className="w-full rounded-md border-gray-300"
                        value={newGrade.max_points}
                        onChange={(e) => setNewGrade({ ...newGrade, max_points: parseFloat(e.target.value) })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Earned Points</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="w-full rounded-md border-gray-300"
                      value={newGrade.earned_points}
                      onChange={(e) => setNewGrade({ ...newGrade, earned_points: parseFloat(e.target.value) })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Semester</label>
                      <input
                        type="text"
                        placeholder="Fall 2024"
                        className="w-full rounded-md border-gray-300"
                        value={newGrade.semester}
                        onChange={(e) => setNewGrade({ ...newGrade, semester: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Academic Year</label>
                      <input
                        type="text"
                        placeholder="2024-2025"
                        className="w-full rounded-md border-gray-300"
                        value={newGrade.academic_year}
                        onChange={(e) => setNewGrade({ ...newGrade, academic_year: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Teacher Notes</label>
                    <textarea
                      className="w-full rounded-md border-gray-300"
                      rows={3}
                      value={newGrade.teacher_notes}
                      onChange={(e) => setNewGrade({ ...newGrade, teacher_notes: e.target.value })}
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-lg font-medium transition flex-1"
                      disabled={creating}
                    >
                      {creating ? 'Adding...' : 'Add Grade'}
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
