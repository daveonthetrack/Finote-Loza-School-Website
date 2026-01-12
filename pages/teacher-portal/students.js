import TeacherLayout from '@/components/TeacherLayout';
import TeacherGuard from '@/components/TeacherGuard';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

export default function TeacherStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase
          .from('students')
          .select('first_name,last_name,student_id,grade_level,homeroom')
          .order('first_name');
        setStudents(data || []);
      } catch (e) {
        console.error('Error loading students for teacher view:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <TeacherGuard>
      <TeacherLayout>
        <div className="py-2">
          <Reveal>
            <SectionHeading
              title="Students"
              subtitle="View basic information for students (read-only for now)"
            />
          </Reveal>
          <div className="card mt-4 overflow-hidden">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-700 mx-auto mb-4" />
                <p className="text-gray-600">Loading students...</p>
              </div>
            ) : students.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No students available to display.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-sm font-medium text-gray-500">Name</th>
                      <th className="px-6 py-3 text-sm font-medium text-gray-500">Student ID</th>
                      <th className="px-6 py-3 text-sm font-medium text-gray-500">Grade</th>
                      <th className="px-6 py-3 text-sm font-medium text-gray-500">Homeroom</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => (
                      <tr key={s.student_id} className="border-t border-gray-200">
                        <td className="px-6 py-3">
                          {s.first_name} {s.last_name}
                        </td>
                        <td className="px-6 py-3 font-mono">{s.student_id}</td>
                        <td className="px-6 py-3">{s.grade_level || '-'}</td>
                        <td className="px-6 py-3">{s.homeroom || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </TeacherLayout>
    </TeacherGuard>
  );
}


