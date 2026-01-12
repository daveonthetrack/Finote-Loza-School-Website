import AdminLayout from '@/components/AdminLayout';
import AdminGuard from '@/components/AdminGuard';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';

export default function EditAnnouncement() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({ title: '', message: '', level: 'info', active: true, starts_at: '', ends_at: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (id) load(); }, [id]);

  async function load() {
    const { data, error } = await supabase.from('announcements').select('*').eq('id', id).single();
    if (error) { alert(error.message); return; }
    setForm({
      title: data.title || '',
      message: data.message || '',
      level: data.level || 'info',
      active: !!data.active,
      starts_at: data.starts_at ? data.starts_at.slice(0,16) : '',
      ends_at: data.ends_at ? data.ends_at.slice(0,16) : '',
    });
    setLoading(false);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form };
    if (!payload.starts_at) payload.starts_at = null;
    if (!payload.ends_at) payload.ends_at = null;
    const { error } = await supabase.from('announcements').update(payload).eq('id', id);
    setSaving(false);
    if (error) return alert(error.message);
    router.push('/admin/announcements');
  }

  if (loading) {
    return (
      <AdminGuard>
        <AdminLayout>
          <div className="py-2">Loading...</div>
        </AdminLayout>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="py-2">
          <h1 className="heading-section">Edit Announcement</h1>
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
              <button className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
            </div>
          </form>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}


