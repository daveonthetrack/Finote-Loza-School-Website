import AdminLayout from '@/components/AdminLayout';
import AdminGuard from '@/components/AdminGuard';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function PhotosAdmin() {
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');

  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await supabase.from('photos').select('*').order('created_at', { ascending: false });
    setPhotos(data || []);
  }

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const filePath = `${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage.from('gallery').upload(filePath, file, { upsert: true, cacheControl: '3600', contentType: file.type });
    if (uploadError) { alert(uploadError.message); setUploading(false); return; }
    const { data: publicUrl } = supabase.storage.from('gallery').getPublicUrl(filePath);
    const { error: insertError } = await supabase.from('photos').insert({ filename: file.name, url: publicUrl.publicUrl, caption });
    if (insertError) { alert(insertError.message); }
    setCaption('');
    setUploading(false);
    load();
  }

  async function remove(id) {
    if (!confirm('Delete this photo?')) return;
    await supabase.from('photos').delete().eq('id', id);
    load();
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="py-2">
          <div className="flex justify-between items-center mb-6">
            <h1 className="heading-section">Manage Photos</h1>
            <Link href="/admin/add-sample-photos" className="btn-secondary">
              Add Sample Photos
            </Link>
          </div>
          <div className="mt-6 card p-4 flex flex-col sm:flex-row items-start sm:items-end gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium">Caption (optional)</label>
              <input className="mt-1 w-full rounded-md border-gray-300" value={caption} onChange={(e)=>setCaption(e.target.value)} />
            </div>
            <label className="btn-primary cursor-pointer">
              {uploading ? 'Uploading...' : 'Upload Photo'}
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((p) => (
              <div key={p.id} className="relative">
                <img src={p.url} alt={p.caption || p.filename} className="rounded-lg shadow-soft w-full aspect-[4/3] object-cover" />
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="truncate">{p.caption || p.filename}</span>
                  <button onClick={() => remove(p.id)} className="text-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}


