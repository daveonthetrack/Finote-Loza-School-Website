import AdminLayout from '@/components/AdminLayout';
import AdminGuard from '@/components/AdminGuard';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function TeachersAdmin() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    subjects: '',
    employeeType: 'full-time',
    hireDate: ''
  });
  const [createdTeacher, setCreatedTeacher] = useState(null);

  useEffect(() => {
    loadTeachers();
  }, []);

  async function loadTeachers() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTeachers(data || []);
    } catch (error) {
      console.error('Error loading teachers:', error);
      alert('Error loading teachers data');
    } finally {
      setLoading(false);
    }
  }

  async function createTeacher(e) {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch('/api/register-teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTeacher)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create teacher');
      }

      setCreatedTeacher(data.credentials);
      setShowCreateModal(false);
      setNewTeacher({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        department: '',
        subjects: '',
        employeeType: 'full-time',
        hireDate: ''
      });
      loadTeachers();
    } catch (error) {
      console.error('Error creating teacher:', error);
      alert('Error creating teacher: ' + error.message);
    } finally {
      setCreating(false);
    }
  }

  async function resetTeacherPassword(teacherId) {
    const newPassword = prompt('Enter new password for teacher:');
    if (!newPassword) return;

    try {
      // Get the teacher's user_id
      const { data: teacher } = await supabase
        .from('teachers')
        .select('user_id, email')
        .eq('teacher_id', teacherId)
        .single();

      if (!teacher) {
        alert('Teacher not found');
        return;
      }

      // Update password using Supabase admin
      const res = await fetch('/api/reset-teacher-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: teacher.user_id, 
          newPassword 
        })
      });

      if (!res.ok) {
        throw new Error('Failed to reset password');
      }

      alert('Password updated successfully');
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Error resetting password: ' + error.message);
    }
  }

  const departments = [
    'Mathematics',
    'English',
    'Science',
    'History',
    'Arts',
    'Physical Education',
    'Foreign Languages',
    'Special Education',
    'Administration',
    'Counseling'
  ];

  const employeeTypes = [
    'full-time',
    'part-time',
    'substitute',
    'contract'
  ];

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="py-2">
          <div className="flex justify-between items-center mb-6">
            <h1 className="heading-section">Manage Teachers</h1>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="btn-primary"
            >
              Register Teacher
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-700 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading teachers...</p>
            </div>
          ) : (
            <div className="card overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Teacher ID</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Name</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Email</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Department</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Subjects</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Type</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Hire Date</th>
                    <th className="px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr key={teacher.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-semibold text-gold-700">
                          {teacher.teacher_id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{teacher.first_name} {teacher.last_name}</div>
                        {teacher.phone && (
                          <div className="text-sm text-gray-500">{teacher.phone}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">{teacher.email}</td>
                      <td className="px-6 py-4">{teacher.department || '-'}</td>
                      <td className="px-6 py-4">
                        {teacher.subjects && teacher.subjects.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {teacher.subjects.map((subject, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                                {subject}
                              </span>
                            ))}
                          </div>
                        ) : '-'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          teacher.employee_type === 'full-time' ? 'bg-green-100 text-green-800' :
                          teacher.employee_type === 'part-time' ? 'bg-yellow-100 text-yellow-800' :
                          teacher.employee_type === 'substitute' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {teacher.employee_type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {teacher.hire_date ? new Date(teacher.hire_date).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => resetTeacherPassword(teacher.teacher_id)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Reset Password
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {teachers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No teachers found. Register your first teacher to get started.
                </div>
              )}
            </div>
          )}

          {/* Create Teacher Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="flex justify-between items-center border-b p-4">
                  <h2 className="text-xl font-bold">Register New Teacher</h2>
                  <button 
                    onClick={() => setShowCreateModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={createTeacher} className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">First Name *</label>
                      <input
                        type="text"
                        className="w-full rounded-md border-gray-300"
                        value={newTeacher.firstName}
                        onChange={(e) => setNewTeacher({ ...newTeacher, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name *</label>
                      <input
                        type="text"
                        className="w-full rounded-md border-gray-300"
                        value={newTeacher.lastName}
                        onChange={(e) => setNewTeacher({ ...newTeacher, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <input
                      type="email"
                      className="w-full rounded-md border-gray-300"
                      value={newTeacher.email}
                      onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                      type="tel"
                      className="w-full rounded-md border-gray-300"
                      value={newTeacher.phone}
                      onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Department</label>
                    <select
                      className="w-full rounded-md border-gray-300"
                      value={newTeacher.department}
                      onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })}
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Subjects (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="Mathematics, Physics, Calculus"
                      className="w-full rounded-md border-gray-300"
                      value={newTeacher.subjects}
                      onChange={(e) => setNewTeacher({ ...newTeacher, subjects: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Employee Type</label>
                      <select
                        className="w-full rounded-md border-gray-300"
                        value={newTeacher.employeeType}
                        onChange={(e) => setNewTeacher({ ...newTeacher, employeeType: e.target.value })}
                      >
                        {employeeTypes.map((type) => (
                          <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Hire Date</label>
                      <input
                        type="date"
                        className="w-full rounded-md border-gray-300"
                        value={newTeacher.hireDate}
                        onChange={(e) => setNewTeacher({ ...newTeacher, hireDate: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="btn-primary flex-1"
                      disabled={creating}
                    >
                      {creating ? 'Creating...' : 'Register Teacher'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="btn-secondary flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Success Modal */}
          {createdTeacher && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Teacher Registered Successfully!</h2>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Login Credentials:</h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Teacher ID:</span> {createdTeacher.teacher_id}</div>
                      <div><span className="font-medium">Email:</span> {createdTeacher.email}</div>
                      <div><span className="font-medium">Password:</span> {createdTeacher.password}</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    Please save these credentials securely. The teacher can use them to log in to the teacher portal.
                  </p>
                  
                  <button
                    onClick={() => setCreatedTeacher(null)}
                    className="btn-primary w-full"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
