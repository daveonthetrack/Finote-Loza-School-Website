import AdminLayout from '@/components/AdminLayout';
import AdminGuard from '@/components/AdminGuard';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function EventsAdmin() {
  const [events, setEvents] = useState([]);

  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await supabase
      .from('events')
      .select('id,title,location,start_at,updated_at')
      .order('start_at', { ascending: true });
    setEvents(data || []);
  }

  async function remove(id) {
    if (!confirm('Delete this event?')) return;
    await supabase.from('events').delete().eq('id', id);
    load();
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="py-2">
          <div className="flex items-center justify-between">
            <h1 className="heading-section">Manage Events</h1>
            <Link href="/admin/events/new" className="btn-primary">New Event</Link>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600">
                  <th className="py-2 pr-4">Title</th>
                  <th className="py-2 pr-4">Start</th>
                  <th className="py-2 pr-4">Location</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e) => (
                  <tr key={e.id} className="border-t">
                    <td className="py-2 pr-4">{e.title}</td>
                    <td className="py-2 pr-4">{new Date(e.start_at).toLocaleString()}</td>
                    <td className="py-2 pr-4">{e.location}</td>
                    <td className="py-2 pr-4 space-x-2">
                      <Link href={`/admin/events/${e.id}`} className="underline">Edit</Link>
                      <button onClick={() => remove(e.id)} className="text-red-600">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}


