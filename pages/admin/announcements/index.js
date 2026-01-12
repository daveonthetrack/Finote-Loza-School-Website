import AdminLayout from '@/components/AdminLayout';
import AdminGuard from '@/components/AdminGuard';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });
    setAnnouncements(data || []);
  }

  async function toggleActive(id, active) {
    await supabase.from('announcements').update({ active: !active }).eq('id', id);
    load();
  }

  async function remove(id) {
    if (!confirm('Delete this announcement?')) return;
    await supabase.from('announcements').delete().eq('id', id);
    load();
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="py-2">
          <div className="flex items-center justify-between">
            <h1 className="heading-section">Announcements</h1>
            <Link href="/admin/announcements/new" className="btn-primary">New Announcement</Link>
          </div>

          <div className="mt-6 space-y-3">
            {announcements.map((a) => (
              <div key={a.id} className="card p-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs ${a.level === 'warning' ? 'bg-yellow-100 text-yellow-800' : a.level === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>{a.level}</span>
                    {!a.active && <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">inactive</span>}
                  </div>
                  <h3 className="font-semibold text-lg mt-1">{a.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{a.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{a.starts_at ? new Date(a.starts_at).toLocaleString() : ''} {a.ends_at ? `→ ${new Date(a.ends_at).toLocaleString()}` : ''}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/announcements/${a.id}`} className="text-navy-700">Edit</Link>
                  <button onClick={() => toggleActive(a.id, a.active)} className="text-gold-700">{a.active ? 'Deactivate' : 'Activate'}</button>
                  <button onClick={() => remove(a.id)} className="text-red-600">Delete</button>
                </div>
              </div>
            ))}
            {announcements.length === 0 && (
              <div className="card p-6 text-center text-gray-600">No announcements yet.</div>
            )}
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}


