import AdminLayout from '@/components/AdminLayout';
import AdminGuard from '@/components/AdminGuard';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminContent() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newItem, setNewItem] = useState({ key: '', page: '', section: '', value: '' });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('site_content').select('*').order('page').order('section');
    setItems(data || []);
    setLoading(false);
  }

  async function saveItem(idx) {
    setSaving(true);
    const item = items[idx];
    await supabase.from('site_content').upsert({ key: item.key, page: item.page, section: item.section, value: item.value, updated_at: new Date().toISOString() });
    setSaving(false);
  }

  async function deleteItem(idx) {
    const key = items[idx]?.key;
    if (!key) return;
    if (!confirm('Delete this content item?')) return;
    await supabase.from('site_content').delete().eq('key', key);
    await load();
  }

  async function addItem(e) {
    e.preventDefault();
    if (!newItem.key) return alert('Key is required');
    await supabase.from('site_content').insert([newItem]);
    setNewItem({ key: '', page: '', section: '', value: '' });
    await load();
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="py-2 max-w-5xl">
          <h1 className="heading-section">Content</h1>

          {loading ? (
            <div className="card p-6 mt-6">Loading...</div>
          ) : (
            <div className="space-y-6 mt-6">
              <form onSubmit={addItem} className="card p-6 grid md:grid-cols-4 gap-3">
                <input placeholder="key (unique)" className="rounded-md border-gray-300" value={newItem.key} onChange={(e)=>setNewItem({...newItem,key:e.target.value})} />
                <input placeholder="page (e.g., home)" className="rounded-md border-gray-300" value={newItem.page} onChange={(e)=>setNewItem({...newItem,page:e.target.value})} />
                <input placeholder="section (e.g., hero.title)" className="rounded-md border-gray-300" value={newItem.section} onChange={(e)=>setNewItem({...newItem,section:e.target.value})} />
                <div className="flex gap-2">
                  <button className="btn-primary">Add</button>
                </div>
                <div className="md:col-span-4">
                  <textarea placeholder="value" className="w-full rounded-md border-gray-300" rows={3} value={newItem.value} onChange={(e)=>setNewItem({...newItem,value:e.target.value})} />
                </div>
              </form>

              <div className="card overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">Key</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">Page</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">Section</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">Value</th>
                      <th className="px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it, idx) => (
                      <tr key={it.key} className="border-t border-gray-100">
                        <td className="px-4 py-3 font-mono text-xs">{it.key}</td>
                        <td className="px-4 py-3 text-sm">{it.page}</td>
                        <td className="px-4 py-3 text-sm">{it.section}</td>
                        <td className="px-4 py-3">
                          <textarea className="w-full rounded-md border-gray-300 text-sm" rows={3} value={it.value || ''} onChange={(e)=>{
                            const n = [...items];
                            n[idx] = { ...n[idx], value: e.target.value };
                            setItems(n);
                          }} />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button onClick={()=>saveItem(idx)} className="px-3 py-1.5 rounded-md bg-gold-600 text-white text-sm" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
                            <button onClick={()=>deleteItem(idx)} className="px-3 py-1.5 rounded-md border text-sm">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}


