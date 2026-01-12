import AdminLayout from '@/components/AdminLayout';
import AdminGuard from '@/components/AdminGuard';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';

export default function NewAnnouncement() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', message: '', level: 'info', active: true, starts_at: '', ends_at: '' });
  const [saving, setSaving] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form };
    if (!payload.starts_at) delete payload.starts_at;
    if (!payload.ends_at) delete payload.ends_at;
    const { error } = await supabase.from('announcements').insert(payload);
    setSaving(false);
    if (error) return alert(error.message);
    router.push('/admin/announcements');
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="py-2">
          <h1 className="heading-section">New Announcement</h1>
          <form onSubmit={onSubmit} className="mt-6 card p-6 space-y-4 max-w-2xl">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input className="mt-1 w-full rounded-md border-gray-300" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea className="mt-1 w-full rounded-md border-gray-300" rows={4} value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} required />
            </div>
            <div className="grid md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium">Level</label>
                <select className="mt-1 w-full rounded-md border-gray-300" value={form.level} onChange={(e)=>setForm({...form,level:e.target.value})}>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input id="active" type="checkbox" className="rounded border-gray-300" checked={form.active} onChange={(e)=>setForm({...form,active:e.target.checked})} />
                <label htmlFor="active" className="text-sm">Active</label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Starts At</label>
                <input type="datetime-local" className="mt-1 w-full rounded-md border-gray-300" value={form.starts_at} onChange={(e)=>setForm({...form,starts_at:e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium">Ends At</label>
                <input type="datetime-local" className="mt-1 w-full rounded-md border-gray-300" value={form.ends_at} onChange={(e)=>setForm({...form,ends_at:e.target.value})} />
              </div>
            </div>
            <div>
              <button className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Create Announcement'}</button>
            </div>
          </form>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}


