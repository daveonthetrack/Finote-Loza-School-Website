import AdminLayout from '@/components/AdminLayout';
import AdminGuard from '@/components/AdminGuard';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function TeacherDebug() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function testLogin() {
    setLoading(true);
    setResult('');
    
    try {
      console.log('Testing login with:', { email, password: '***' });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        setResult(`❌ Login failed: ${error.message}`);
        return;
      }

      // Check teacher record
      const { data: teacher, error: teacherError } = await supabase
        .from('teachers')
        .select('*')
        .eq('user_id', data.user.id)
        .single();

      if (teacherError) {
        setResult(`❌ Teacher lookup failed: ${teacherError.message}`);
        return;
      }

      if (!teacher) {
        setResult('❌ No teacher record found for this user');
        return;
      }

      setResult(`✅ Login successful! Teacher: ${teacher.first_name} ${teacher.last_name} (${teacher.teacher_id})`);
      
      // Sign out after test
      await supabase.auth.signOut();
      
    } catch (error) {
      setResult(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function listTeachers() {
    setLoading(true);
    setResult('');
    
    try {
      const { data: teachers, error } = await supabase
        .from('teachers')
        .select('teacher_id, first_name, last_name, email, user_id')
        .order('created_at', { ascending: false });

      if (error) {
        setResult(`❌ Failed to fetch teachers: ${error.message}`);
        return;
      }

      if (!teachers || teachers.length === 0) {
        setResult('❌ No teachers found in database');
        return;
      }

      const teacherList = teachers.map(t => 
        `${t.teacher_id}: ${t.first_name} ${t.last_name} (${t.email}) - User ID: ${t.user_id}`
      ).join('\n');

      setResult(`✅ Found ${teachers.length} teachers:\n\n${teacherList}`);
      
    } catch (error) {
      setResult(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="py-2">
          <h1 className="heading-section">Teacher Login Debug</h1>
          
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Test Teacher Login</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full rounded-md border-gray-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="teacher@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  className="w-full rounded-md border-gray-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="firstnamelastnameyear"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={testLogin}
                  disabled={loading || !email || !password}
                  className="btn-primary"
                >
                  {loading ? 'Testing...' : 'Test Login'}
                </button>
                
                <button
                  onClick={listTeachers}
                  disabled={loading}
                  className="btn-secondary"
                >
                  List Teachers
                </button>
              </div>
            </div>
          </div>

          {result && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Result</h2>
              <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg">
                {result}
              </pre>
            </div>
          )}

          <div className="card p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Troubleshooting Steps</h2>
            <div className="space-y-3 text-sm">
              <div>
                <strong>1. Check if teacher exists:</strong> Use "List Teachers" button to see all registered teachers
              </div>
              <div>
                <strong>2. Verify credentials:</strong> Make sure email and password match exactly what was created
              </div>
              <div>
                <strong>3. Password format:</strong> Should be firstnamelastnameyear (e.g., sarahjohnson2024)
              </div>
              <div>
                <strong>4. Email format:</strong> Should be the exact email used during registration
              </div>
              <div>
                <strong>5. Check Supabase:</strong> Verify the teacher record exists in the teachers table
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
