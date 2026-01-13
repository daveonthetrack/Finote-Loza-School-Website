import LibrarianGuard from '@/components/LibrarianGuard';
import LibrarianLayout from '@/components/LibrarianLayout';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

function genCopyCode() {
  const a = Math.random().toString(36).slice(2, 6).toUpperCase();
  const b = Date.now().toString(36).toUpperCase();
  return `COPY-${b}-${a}`;
}

export default function LibrarianCopies() {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [copies, setCopies] = useState([]);
  const [activeLoanByCopyId, setActiveLoanByCopyId] = useState({});
  const [loading, setLoading] = useState(true);
  const [copyForm, setCopyForm] = useState({ copy_code: '', location: '', condition: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    if (!selectedBookId) {
      setCopies([]);
      setActiveLoanByCopyId({});
      setLoading(false);
      return;
    }
    loadCopies(selectedBookId);
  }, [selectedBookId]);

  async function loadBooks() {
    setLoading(true);
    const { data } = await supabase.from('library_books').select('id,title').order('title', { ascending: true });
    setBooks(data || []);
    setSelectedBookId((data && data[0]?.id) || '');
    setCopyForm((f) => ({ ...f, copy_code: genCopyCode() }));
    setLoading(false);
  }

  async function loadCopies(bookId) {
    setLoading(true);
    setError('');
    const { data: copyRows, error: e1 } = await supabase
      .from('library_copies')
      .select('id,copy_code,location,condition,created_at')
      .eq('book_id', bookId)
      .order('created_at', { ascending: false });
    if (e1) setError(e1.message);
    setCopies(copyRows || []);

    const ids = (copyRows || []).map((c) => c.id);
    if (ids.length === 0) {
      setActiveLoanByCopyId({});
      setLoading(false);
      return;
    }

    const { data: loans } = await supabase
      .from('library_loans')
      .select('id,copy_id,student_id,due_at,returned_at')
      .in('copy_id', ids)
      .is('returned_at', null);

    const map = {};
    (loans || []).forEach((l) => { map[l.copy_id] = l; });
    setActiveLoanByCopyId(map);
    setLoading(false);
  }

  const selectedBook = useMemo(() => books.find((b) => b.id === selectedBookId) || null, [books, selectedBookId]);

  async function addCopy() {
    setSaving(true);
    setError('');
    try {
      if (!selectedBookId) {
        setError('Select a book first.');
        return;
      }
      const payload = {
        book_id: selectedBookId,
        copy_code: copyForm.copy_code.trim(),
        location: copyForm.location.trim() || null,
        condition: copyForm.condition.trim() || null,
      };
      if (!payload.copy_code) {
        setError('copy_code is required.');
        return;
      }
      const { error: e } = await supabase.from('library_copies').insert([payload]);
      if (e) throw e;
      setCopyForm({ copy_code: genCopyCode(), location: '', condition: '' });
      await loadCopies(selectedBookId);
    } catch (e) {
      setError(String(e?.message || 'Failed to add copy'));
    } finally {
      setSaving(false);
    }
  }

  return (
    <LibrarianGuard>
      <LibrarianLayout>
        <div className="py-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="heading-section">Copies</h1>
              <p className="text-sm text-gray-600">Manage physical copies (barcoded items).</p>
            </div>
          </div>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div className="mt-4 card p-5">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-1">
                <label className="text-sm text-gray-600">Book</label>
                <select
                  className="mt-1 w-full rounded-md border px-3 py-2"
                  value={selectedBookId}
                  onChange={(e) => setSelectedBookId(e.target.value)}
                >
                  {books.map((b) => (
                    <option key={b.id} value={b.id}>{b.title}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  Selected: <strong>{selectedBook?.title || '—'}</strong>
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="font-semibold">Add new copy</p>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  <div>
                    <label className="text-sm text-gray-600">copy_code (barcode)</label>
                    <input
                      className="mt-1 w-full rounded-md border px-3 py-2 font-mono text-xs"
                      value={copyForm.copy_code}
                      onChange={(e) => setCopyForm({ ...copyForm, copy_code: e.target.value })}
                    />
                    <button
                      type="button"
                      className="text-xs text-gold-700 hover:underline mt-1"
                      onClick={() => setCopyForm({ ...copyForm, copy_code: genCopyCode() })}
                    >
                      Generate
                    </button>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Location</label>
                    <input
                      className="mt-1 w-full rounded-md border px-3 py-2"
                      value={copyForm.location}
                      onChange={(e) => setCopyForm({ ...copyForm, location: e.target.value })}
                      placeholder="Shelf A3"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Condition</label>
                    <input
                      className="mt-1 w-full rounded-md border px-3 py-2"
                      value={copyForm.condition}
                      onChange={(e) => setCopyForm({ ...copyForm, condition: e.target.value })}
                      placeholder="Good"
                    />
                  </div>
                </div>
                <button className="btn-primary mt-4" onClick={addCopy} disabled={saving}>
                  {saving ? 'Adding…' : 'Add Copy'}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 card overflow-hidden">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <p className="font-semibold">Copies for {selectedBook?.title || '—'}</p>
              <p className="text-sm text-gray-600">{loading ? 'Loading…' : `${copies.length} copy(s)`}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="text-left px-4 py-3">copy_code</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-left px-4 py-3">Location</th>
                    <th className="text-left px-4 py-3">Condition</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {copies.map((c) => {
                    const loan = activeLoanByCopyId[c.id];
                    const status = loan ? 'Checked out' : 'Available';
                    return (
                      <tr key={c.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-mono text-xs">{c.copy_code}</td>
                        <td className="px-4 py-3">
                          {loan ? (
                            <span className="px-2 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs">
                              Checked out • {loan.student_id}
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs">
                              Available
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">{c.location || '—'}</td>
                        <td className="px-4 py-3">{c.condition || '—'}</td>
                      </tr>
                    );
                  })}
                  {!loading && copies.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                        No copies yet. Add one above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </LibrarianLayout>
    </LibrarianGuard>
  );
}


