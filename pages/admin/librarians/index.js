import AdminGuard from '@/components/AdminGuard';
import AdminLayout from '@/components/AdminLayout';
import { useEffect, useState } from 'react';

export default function AdminLibrarians() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [createdCreds, setCreatedCreds] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/librarians/list');
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Failed to load librarians');
      setRows(json.librarians || []);
    } catch (e) {
      setError(String(e?.message || 'Failed to load librarians'));
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  async function create() {
    setCreating(true);
    setError('');
    setCreatedCreds(null);
    try {
      const res = await fetch('/api/admin/librarians/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          password: form.password.trim() || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Failed to create librarian');
      setCreatedCreds(json.credentials || null);
      setForm({ firstName: '', lastName: '', email: '', password: '' });
      await load();
    } catch (e) {
      setError(String(e?.message || 'Failed to create librarian'));
    } finally {
      setCreating(false);
    }
  }

  async function remove(id) {
    if (!confirm('Delete this librarian account? This will also delete the auth user.')) return;
    setError('');
    try {
      const res = await fetch('/api/admin/librarians/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Failed to delete librarian');
      await load();
    } catch (e) {
      setError(String(e?.message || 'Failed to delete librarian'));
    }
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="py-2">
          <div className="flex items-center justify-between">
            <h1 className="heading-section">Librarians</h1>
          </div>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {createdCreds && (
            <div className="mt-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md px-4 py-3 text-sm">
              <p className="font-semibold">Librarian created</p>
              <p className="mt-1">
                Email: <strong>{createdCreds.email}</strong> • Password: <strong>{createdCreds.password}</strong> • ID: <strong>{createdCreds.librarian_id}</strong>
              </p>
              <p className="mt-1 text-xs text-emerald-700">Copy these credentials now (they won’t be shown again).</p>
            </div>
          )}

          <div className="mt-6 card p-5">
            <p className="font-semibold">Create librarian account</p>
            <p className="text-sm text-gray-600 mt-1">This creates a Supabase auth user and links it to the `librarians` table.</p>
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              <div>
                <label className="text-sm text-gray-600">First name</label>
                <input className="mt-1 w-full rounded-md border px-3 py-2" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
              </div>
              <div>
                <label className="text-sm text-gray-600">Last name</label>
                <input className="mt-1 w-full rounded-md border px-3 py-2" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input className="mt-1 w-full rounded-md border px-3 py-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="text-sm text-gray-600">Password (optional)</label>
                <input className="mt-1 w-full rounded-md border px-3 py-2" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="auto-generated if empty" />
              </div>
            </div>
            <button className="btn-primary mt-4" disabled={creating} onClick={create}>
              {creating ? 'Creating…' : 'Create Librarian'}
            </button>
          </div>

          <div className="mt-6 card overflow-hidden">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <p className="font-semibold">Existing librarians</p>
              <p className="text-sm text-gray-600">{loading ? 'Loading…' : `${rows.length} total`}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="text-left px-4 py-3">Name</th>
                    <th className="text-left px-4 py-3">Email</th>
                    <th className="text-left px-4 py-3">Librarian ID</th>
                    <th className="text-right px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {rows.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{r.first_name} {r.last_name}</td>
                      <td className="px-4 py-3">{r.email}</td>
                      <td className="px-4 py-3 font-mono text-xs">{r.librarian_id}</td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-red-700 hover:underline" onClick={() => remove(r.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {!loading && rows.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                        No librarians yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}


