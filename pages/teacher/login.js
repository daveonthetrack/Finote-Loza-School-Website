import Layout from '@/components/Layout';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';

export default function TeacherLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', { email, password: '***' });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        console.error('Supabase auth error:', error);
        throw error;
      }

      console.log('Auth successful, checking teacher status...');

      // Check if user is a teacher by looking up in teachers table
      const { data: teacher, error: teacherError } = await supabase
        .from('teachers')
        .select('id, teacher_id, first_name, last_name, department')
        .eq('user_id', data.user.id)
        .single();

      console.log('Teacher lookup result:', { teacher, teacherError });

      if (teacherError || !teacher) {
        console.log('User is not a teacher, signing out...');
        // User is not a teacher, sign them out
        await supabase.auth.signOut();
        setError('Access denied. This account is not authorized for teacher portal access.');
        return;
      }

      console.log('Teacher verified, redirecting...');
      // Successfully authenticated teacher
      router.push('/teacher-portal');
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle specific error cases
      if (error.message.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please check your credentials and try again. Make sure you are using the correct email and password format (firstnamelastnameyear).');
      } else if (error.message.includes('Email not confirmed')) {
        setError('Please check your email and click the confirmation link before logging in.');
      } else if (error.message.includes('Too many requests')) {
        setError('Too many login attempts. Please wait a moment before trying again.');
      } else {
        setError(`Login failed: ${error.message}. Please try again or contact IT support if the problem persists.`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-gold-100">
              <svg className="h-6 w-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0 0C10.832 19.477 9.246 20 7.5 20S4.168 19.477 3 18.253m0-13C4.168 4.477 5.754 4 7.5 4s3.332.477 4.5 1.253m0 13C13.168 19.477 14.754 20 16.5 20c1.746 0 3.332-.477 4.5-1.253m0-13C19.832 4.477 18.246 4 16.5 4c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Teacher Portal Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Access your teaching dashboard to manage grades and assignments
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gold-500 focus:border-gold-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gold-500 focus:border-gold-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gold-600 hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div className="text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h3 className="text-sm font-medium text-blue-800 mb-2">Login Information</h3>
                <div className="text-xs text-blue-700 space-y-1">
                  <p><strong>Email:</strong> Your registered email address</p>
                  <p><strong>Password:</strong> firstnamelastnameyear (e.g., sarahjohnson2024)</p>
                  <p><strong>Teacher ID:</strong> TCH-YYYY-XXXX (provided by admin)</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Need help accessing your account?{' '}
                <a href="/contact" className="font-medium text-gold-600 hover:text-gold-500">
                  Contact IT Support
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
