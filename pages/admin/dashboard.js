import AdminLayout from '@/components/AdminLayout';
import AdminGuard from '@/components/AdminGuard';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Dashboard() {
  const [stats, setStats] = useState({ articles: 0, events: 0, photos: 0 });

  useEffect(() => {
    async function loadStats() {
      const [{ count: aCount }, { count: eCount }, { count: pCount }] = await Promise.all([
        supabase.from('articles').select('*', { count: 'exact', head: true }),
        supabase.from('events').select('*', { count: 'exact', head: true }),
        supabase.from('photos').select('*', { count: 'exact', head: true }),
      ]);
      setStats({ articles: aCount || 0, events: eCount || 0, photos: pCount || 0 });
    }
    loadStats();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="py-2">
          <div className="flex items-center justify-between">
            <h1 className="heading-section">Admin Dashboard</h1>
            <button onClick={handleSignOut} className="inline-flex items-center rounded-md border px-3 py-1.5">Sign out</button>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-4">
            <Link href="/admin/articles" className="card p-5 hover:shadow-lg transition">
              <p className="text-sm text-gray-600">Articles</p>
              <p className="mt-1 text-3xl font-semibold">{stats.articles}</p>
            </Link>
            <Link href="/admin/events" className="card p-5 hover:shadow-lg transition">
              <p className="text-sm text-gray-600">Events</p>
              <p className="mt-1 text-3xl font-semibold">{stats.events}</p>
            </Link>
            <Link href="/admin/photos" className="card p-5 hover:shadow-lg transition">
              <p className="text-sm text-gray-600">Photos</p>
              <p className="mt-1 text-3xl font-semibold">{stats.photos}</p>
            </Link>
            <Link href="/admin/applications" className="card p-5 hover:shadow-lg transition">
              <p className="text-sm text-gray-600">Applications</p>
              <p className="mt-1 text-3xl font-semibold">→</p>
            </Link>
          </div>
          
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Link href="/admin/settings" className="card p-5 hover:shadow-lg transition">
              <p className="text-sm text-gray-600">Site Settings</p>
              <p className="mt-1 text-3xl font-semibold">→</p>
            </Link>
            <Link href="/admin/students" className="card p-5 hover:shadow-lg transition">
              <p className="text-sm text-gray-600">Students</p>
              <p className="mt-1 text-3xl font-semibold">→</p>
            </Link>
            <Link href="/admin/announcements" className="card p-5 hover:shadow-lg transition">
              <p className="text-sm text-gray-600">Announcements</p>
              <p className="mt-1 text-3xl font-semibold">→</p>
            </Link>
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}


