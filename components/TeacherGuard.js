import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';

export default function TeacherGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setUser(null);
        setTeacher(null);
        router.push('/teacher/login');
      } else {
        setUser(session.user);
        await verifyTeacher(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  async function verifyTeacher(userId) {
    try {
      const { data: teacherData, error } = await supabase
        .from('teachers')
        .select('id, teacher_id, first_name, last_name, department')
        .eq('user_id', userId)
        .single();

      if (error || !teacherData) {
        // User is not a teacher, sign them out
        await supabase.auth.signOut();
        router.push('/teacher/login');
        return;
      }

      setTeacher(teacherData);
    } catch (error) {
      console.error('Error verifying teacher:', error);
      await supabase.auth.signOut();
      router.push('/teacher/login');
    }
  }

  async function checkUser() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/teacher/login');
        return;
      }
      
      setUser(session.user);
      await verifyTeacher(session.user.id);
    } catch (error) {
      console.error('Error checking user:', error);
      router.push('/teacher/login');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading teacher portal...</p>
        </div>
      </div>
    );
  }

  if (!user || !teacher) {
    return null;
  }

  return children;
}
