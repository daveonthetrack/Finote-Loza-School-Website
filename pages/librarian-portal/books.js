import LibrarianGuard from '@/components/LibrarianGuard';
import LibrarianLayout from '@/components/LibrarianLayout';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

function EmptyState({ onAdd }) {
  return (
    <div className="card p-6">
      <p className="font-semibold">No books yet</p>
      <p className="text-sm text-gray-600 mt-1">Add your first book to start building the catalog.</p>
      <button className="btn-primary mt-4" onClick={onAdd}>Add Book</button>
    </div>
  );
}

function BookModal({ open, onClose, initial, onSaved }) {
  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    cover_url: '',
    published_year: '',
    description: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    setError('');
    setForm({
      title: initial?.title || '',
      author: initial?.author || '',
      isbn: initial?.isbn || '',
      category: initial?.category || '',
      cover_url: initial?.cover_url || '',
      published_year: initial?.published_year ? String(initial.published_year) : '',
      description: initial?.description || '',
    });
  }, [open, initial]);

  async function save() {
    setSaving(true);
    setError('');
    try {
      const payload = {
        title: form.title.trim(),
        author: form.author.trim() || null,
        isbn: form.isbn.trim() || null,
        category: form.category.trim() || null,
        cover_url: form.cover_url.trim() || null,
        published_year: form.published_year ? Number(form.published_year) : null,
        description: form.description.trim() || null,
        updated_at: new Date().toISOString(),
      };

      if (!payload.title) {
        setError('Title is required.');
        return;
      }

      if (initial?.id) {
        const { error: e } = await supabase.from('library_books').update(payload).eq('id', initial.id);
        if (e) throw e;
      } else {
        const { error: e } = await supabase.from('library_books').insert([{ ...payload }]);
        if (e) throw e;
      }

      onSaved?.();
      onClose();
    } catch (e) {
      setError(String(e?.message || 'Failed to save book'));
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <p className="font-semibold">{initial?.id ? 'Edit Book' : 'Add Book'}</p>
          <button className="text-gray-500 hover:text-gray-900" onClick={onClose}>✕</button>
        </div>
        <div className="p-5">
          {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3 text-sm">{error}</div>}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm text-gray-600">Title *</label>
              <input className="mt-1 w-full rounded-md border px-3 py-2" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-gray-600">Author</label>
              <input className="mt-1 w-full rounded-md border px-3 py-2" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-gray-600">Category</label>
              <input className="mt-1 w-full rounded-md border px-3 py-2" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-gray-600">ISBN</label>
              <input className="mt-1 w-full rounded-md border px-3 py-2" value={form.isbn} onChange={(e) => setForm({ ...form, isbn: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-gray-600">Published year</label>
              <input className="mt-1 w-full rounded-md border px-3 py-2" value={form.published_year} onChange={(e) => setForm({ ...form, published_year: e.target.value })} />
            </div>
            <div>
              <label className="text-sm text-gray-600">Cover URL</label>
              <input className="mt-1 w-full rounded-md border px-3 py-2" value={form.cover_url} onChange={(e) => setForm({ ...form, cover_url: e.target.value })} />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-sm text-gray-600">Description</label>
            <textarea className="mt-1 w-full rounded-md border px-3 py-2 min-h-[90px]" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
        </div>
        <div className="px-5 py-4 border-t flex items-center justify-end gap-2">
          <button className="btn-secondary" onClick={onClose} disabled={saving}>Cancel</button>
          <button className="btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
}

export default function LibrarianBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from('library_books')
      .select('id,title,author,category,isbn,cover_url,published_year,description,created_at')
      .order('title', { ascending: true });
    setBooks(data || []);
    setLoading(false);
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return books;
    return books.filter((b) => {
      const hay = `${b.title || ''} ${b.author || ''} ${b.category || ''} ${b.isbn || ''}`.toLowerCase();
      return hay.includes(q);
    });
  }, [books, search]);

  return (
    <LibrarianGuard>
      <LibrarianLayout>
        <div className="py-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="heading-section">Books</h1>
              <p className="text-sm text-gray-600">Add and edit the library catalog.</p>
            </div>
            <button className="btn-primary" onClick={() => { setEditing(null); setOpen(true); }}>
              Add Book
            </button>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <input
              className="w-full sm:max-w-md rounded-md border px-3 py-2"
              placeholder="Search books…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="text-sm text-gray-600">{loading ? 'Loading…' : `${filtered.length} book(s)`}</div>
          </div>

          <div className="mt-4">
            {!loading && filtered.length === 0 ? (
              <EmptyState onAdd={() => { setEditing(null); setOpen(true); }} />
            ) : (
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                      <tr>
                        <th className="text-left px-4 py-3">Title</th>
                        <th className="text-left px-4 py-3">Author</th>
                        <th className="text-left px-4 py-3">Category</th>
                        <th className="text-left px-4 py-3">ISBN</th>
                        <th className="text-right px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filtered.map((b) => (
                        <tr key={b.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-navy-900">{b.title}</td>
                          <td className="px-4 py-3">{b.author || '—'}</td>
                          <td className="px-4 py-3">{b.category || '—'}</td>
                          <td className="px-4 py-3 font-mono text-xs">{b.isbn || '—'}</td>
                          <td className="px-4 py-3 text-right">
                            <button
                              className="text-gold-700 hover:underline"
                              onClick={() => { setEditing(b); setOpen(true); }}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        <BookModal
          open={open}
          initial={editing}
          onClose={() => setOpen(false)}
          onSaved={load}
        />
      </LibrarianLayout>
    </LibrarianGuard>
  );
}


