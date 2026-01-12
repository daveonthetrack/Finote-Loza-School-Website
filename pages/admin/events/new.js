import AdminLayout from '@/components/AdminLayout';
import AdminGuard from '@/components/AdminGuard';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function NewEvent() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', description: '', location: '', start_at: '', end_at: '' });
  const [saving, setSaving] = useState(false);

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from('events').insert({
      title: form.title,
      description: form.description,
      location: form.location,
      start_at: new Date(form.start_at).toISOString(),
      end_at: form.end_at ? new Date(form.end_at).toISOString() : null
    });
    setSaving(false);
    if (!error) router.push('/admin/events');
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="py-2 max-w-3xl">
          <h1 className="heading-section">New Event</h1>
          <form onSubmit={save} className="mt-6 card p-6 space-y-4">
            <input className="w-full rounded-md border-gray-300" placeholder="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} required />
            <input className="w-full rounded-md border-gray-300" placeholder="Location" value={form.location} onChange={(e)=>setForm({...form,location:e.target.value})} required />
            <textarea className="w-full rounded-md border-gray-300" rows="4" placeholder="Description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />
            <div className="grid md:grid-cols-2 gap-4">
              <input type="datetime-local" className="w-full rounded-md border-gray-300" value={form.start_at} onChange={(e)=>setForm({...form,start_at:e.target.value})} required />
              <input type="datetime-local" className="w-full rounded-md border-gray-300" value={form.end_at} onChange={(e)=>setForm({...form,end_at:e.target.value})} />
            </div>
            <button className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          </form>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}


