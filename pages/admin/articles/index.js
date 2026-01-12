import AdminLayout from '@/components/AdminLayout';
import AdminGuard from '@/components/AdminGuard';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ArticlesAdmin() {
  const [articles, setArticles] = useState([]);

  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await supabase
      .from('articles')
      .select('id,title,slug,published_at,updated_at,cover_url')
      .order('updated_at', { ascending: false });
    setArticles(data || []);
  }

  async function remove(id) {
    if (!confirm('Delete this article?')) return;
    await supabase.from('articles').delete().eq('id', id);
    load();
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="py-2">
          <div className="flex items-center justify-between">
            <h1 className="heading-section">Manage Articles</h1>
            <Link href="/admin/articles/new" className="btn-primary">New Article</Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <div key={a.id} className="card p-4 flex gap-4">
                <div className="h-20 w-28 rounded-md overflow-hidden bg-gray-100 border">
                  {a.cover_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={a.cover_url} alt="" className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div className="flex-1">
                  <p className="font-medium line-clamp-1">{a.title}</p>
                  <p className="text-xs text-gray-500">/{a.slug}</p>
                  <p className="text-xs text-gray-500 mt-1">{a.updated_at ? new Date(a.updated_at).toLocaleString() : ''}</p>
                  <div className="mt-2 flex gap-3">
                    <Link href={`/admin/articles/${a.id}`} className="underline">Edit</Link>
                    <button onClick={() => remove(a.id)} className="text-red-600">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}


