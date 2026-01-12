import Layout from '@/components/Layout';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function StudentLogin() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const raw = identifier.trim();
      const email = raw.includes('@')
        ? raw.toLowerCase()
        : `${raw}@students.finoteloza.edu`.toLowerCase();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (signInError) {
        console.error('Login error:', signInError);
        
        if (signInError.message.includes('Invalid login credentials')) {
          setError('Invalid Student ID or password. Please check your credentials and try again.');
        } else if (signInError.message.includes('Email not confirmed')) {
          setError('Please check your email and click the confirmation link before logging in.');
        } else if (signInError.message.includes('Too many requests')) {
          setError('Too many login attempts. Please wait a moment before trying again.');
        } else {
          setError(`Login failed: ${signInError.message}. Please try again or contact IT support if the problem persists.`);
        }
        return;
      }
      
      window.location.href = '/student-portal';
    } catch (error) {
      console.error('Unexpected error:', error);
      setError('An unexpected error occurred. Please try again.');
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Student Portal Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Access your student dashboard to view assignments and grades
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
                  Student ID or Email
                </label>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username email"
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gold-500 focus:border-gold-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your Student ID or email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
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
                  <p><strong>Student ID:</strong> Your assigned student ID (e.g., ST1234) or your full email address</p>
                  <p><strong>Password:</strong> Your student account password</p>
                  <p>
                    <strong>Email:</strong>{' '}
                    {identifier
                      ? (identifier.includes('@')
                          ? identifier.trim().toLowerCase()
                          : `${identifier}@students.finoteloza.edu`)
                      : 'studentid@students.finoteloza.edu'}
                  </p>
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


