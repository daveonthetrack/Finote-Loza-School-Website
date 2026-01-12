import Layout from '@/components/Layout';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';

export default function ParentLogin() {
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
      console.log('Attempting parent login with:', { email, password: '***' });
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (signInError) {
        console.error('Supabase auth error:', signInError);
        throw signInError;
      }

      console.log('Auth successful, checking parent status...');

      // Check if user is a parent by looking up in parents table
      const { data: parent, error: parentError } = await supabase
        .from('parents')
        .select('id, parent_id, first_name, last_name, email')
        .eq('user_id', data.user.id)
        .single();

      console.log('Parent lookup result:', { parent, parentError });

      if (parentError || !parent) {
        console.log('User is not a parent, signing out...');
        // User is not a parent, sign them out
        await supabase.auth.signOut();
        setError('Access denied. This account is not authorized for parent portal access.');
        return;
      }

      console.log('Parent verified, redirecting...');
      // Successfully authenticated parent
      router.push('/parent-dashboard');
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle specific error cases
      if (error.message.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please check your credentials and try again.');
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Parent Portal Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Access your parent dashboard to monitor your child's progress
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
                  <p><strong>Email:</strong> Your registered parent email address</p>
                  <p><strong>Password:</strong> Your parent account password</p>
                  <p><strong>Access:</strong> View your child's academic progress</p>
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
