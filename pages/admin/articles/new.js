import AdminLayout from '@/components/AdminLayout';
import AdminGuard from '@/components/AdminGuard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function NewArticle() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', cover_url: '' });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // auto-generate slug from title if slug is empty or matches old pattern
    const s = form.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    if (!form.slug && s) setForm((f) => ({ ...f, slug: s }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title]);

  async function uploadCover(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const path = `articles/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from('assets').upload(path, file, { upsert: true, cacheControl: '3600', contentType: file.type });
    if (error) { alert(error.message); setUploading(false); return; }
    const { data } = supabase.storage.from('assets').getPublicUrl(path);
    setForm((f) => ({ ...f, cover_url: data.publicUrl }));
    setUploading(false);
  }

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from('articles').insert({
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      cover_url: form.cover_url,
      published_at: new Date().toISOString()
    });
    setSaving(false);
    if (!error) router.push('/admin/articles');
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="py-2 max-w-3xl">
          <h1 className="heading-section">New Article</h1>
          <form onSubmit={save} className="mt-6 card p-6 space-y-4">
            <input className="w-full rounded-md border-gray-300" placeholder="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} required />
            <input className="w-full rounded-md border-gray-300" placeholder="Slug" value={form.slug} onChange={(e)=>setForm({...form,slug:e.target.value})} required />
            <div>
              <div className="flex items-center gap-3">
                <input className="w-full rounded-md border-gray-300" placeholder="Cover URL (optional)" value={form.cover_url} onChange={(e)=>setForm({...form,cover_url:e.target.value})} />
                <label className={`btn-primary cursor-pointer whitespace-nowrap ${uploading ? 'opacity-70 pointer-events-none' : ''}`}>
                  {uploading ? 'Uploading...' : 'Upload'}
                  <input type="file" accept="image/*" className="hidden" onChange={uploadCover} />
                </label>
              </div>
              <div className="mt-3 h-40 w-full overflow-hidden rounded-lg border bg-gray-50">
                {form.cover_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.cover_url} alt="Cover preview" className="h-full w-full object-cover" />
                ) : null}
              </div>
            </div>
            <textarea className="w-full rounded-md border-gray-300" rows="3" placeholder="Excerpt" value={form.excerpt} onChange={(e)=>setForm({...form,excerpt:e.target.value})} />
            <textarea className="w-full rounded-md border-gray-300" rows="8" placeholder="Content (HTML)" value={form.content} onChange={(e)=>setForm({...form,content:e.target.value})} />
            <button className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          </form>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}


