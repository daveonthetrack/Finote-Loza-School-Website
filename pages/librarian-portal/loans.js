import LibrarianGuard from '@/components/LibrarianGuard';
import LibrarianLayout from '@/components/LibrarianLayout';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

function fmt(d) {
  try {
    return new Date(d).toLocaleDateString();
  } catch {
    return String(d || '');
  }
}

export default function LibrarianLoans() {
  const [checkout, setCheckout] = useState({ student_id: '', copy_code: '', due_days: '14' });
  const [checkinCode, setCheckinCode] = useState('');
  const [activeLoans, setActiveLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('active'); // active | dueSoon | overdue

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const { data, error: e } = await supabase
        .from('library_loans')
        .select('id,student_id,checked_out_at,due_at,returned_at,copy_id,library_copies(copy_code,book_id,library_books(title))')
        .is('returned_at', null)
        .order('due_at', { ascending: true });
      if (e) throw e;
      setActiveLoans(data || []);
    } catch (e2) {
      setError(String(e2?.message || 'Failed to load loans'));
      setActiveLoans([]);
    } finally {
      setLoading(false);
    }
  }

  const derived = useMemo(() => {
    const now = new Date();
    const dueSoonThreshold = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    const rows = activeLoans.map((l) => {
      const due = l.due_at ? new Date(l.due_at) : null;
      const overdue = due ? due < now : false;
      const dueSoon = due ? due >= now && due <= dueSoonThreshold : false;
      return { ...l, _overdue: overdue, _dueSoon: dueSoon };
    });
    if (filter === 'overdue') return rows.filter((r) => r._overdue);
    if (filter === 'dueSoon') return rows.filter((r) => r._dueSoon);
    return rows;
  }, [activeLoans, filter]);

  async function doCheckout() {
    setBusy(true);
    setError('');
    try {
      const days = Number(checkout.due_days || '14');
      const dueAt = new Date(Date.now() + Math.max(1, days) * 24 * 60 * 60 * 1000).toISOString();
      const { error: e } = await supabase.rpc('library_checkout', {
        p_copy_code: checkout.copy_code.trim(),
        p_student_id: checkout.student_id.trim(),
        p_due_at: dueAt,
      });
      if (e) throw e;
      setCheckout({ student_id: '', copy_code: '', due_days: '14' });
      await load();
    } catch (e2) {
      setError(String(e2?.message || 'Checkout failed'));
    } finally {
      setBusy(false);
    }
  }

  async function doCheckin() {
    setBusy(true);
    setError('');
    try {
      const { error: e } = await supabase.rpc('library_checkin', {
        p_copy_code: checkinCode.trim(),
      });
      if (e) throw e;
      setCheckinCode('');
      await load();
    } catch (e2) {
      setError(String(e2?.message || 'Check-in failed'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <LibrarianGuard>
      <LibrarianLayout>
        <div className="py-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="heading-section">Loans</h1>
              <p className="text-sm text-gray-600">Check-out and return copies using student_id and copy_code.</p>
            </div>
          </div>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="card p-5">
              <p className="font-semibold">Check-out</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <div className="sm:col-span-1">
                  <label className="text-sm text-gray-600">Student ID</label>
                  <input
                    className="mt-1 w-full rounded-md border px-3 py-2"
                    value={checkout.student_id}
                    onChange={(e) => setCheckout({ ...checkout, student_id: e.target.value })}
                    placeholder="STD-2026-0001"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="text-sm text-gray-600">copy_code</label>
                  <input
                    className="mt-1 w-full rounded-md border px-3 py-2 font-mono text-xs"
                    value={checkout.copy_code}
                    onChange={(e) => setCheckout({ ...checkout, copy_code: e.target.value })}
                    placeholder="COPY-XXXX-YYYY"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="text-sm text-gray-600">Due (days)</label>
                  <input
                    className="mt-1 w-full rounded-md border px-3 py-2"
                    value={checkout.due_days}
                    onChange={(e) => setCheckout({ ...checkout, due_days: e.target.value })}
                  />
                </div>
              </div>
              <button className="btn-primary mt-4" disabled={busy} onClick={doCheckout}>
                {busy ? 'Working…' : 'Check-out'}
              </button>
            </div>

            <div className="card p-5">
              <p className="font-semibold">Return (Check-in)</p>
              <div className="mt-3">
                <label className="text-sm text-gray-600">copy_code</label>
                <input
                  className="mt-1 w-full rounded-md border px-3 py-2 font-mono text-xs"
                  value={checkinCode}
                  onChange={(e) => setCheckinCode(e.target.value)}
                  placeholder="COPY-XXXX-YYYY"
                />
              </div>
              <button className="btn-primary mt-4" disabled={busy} onClick={doCheckin}>
                {busy ? 'Working…' : 'Return'}
              </button>
            </div>
          </div>

          <div className="mt-4 card overflow-hidden">
            <div className="px-5 py-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="font-semibold">Active Loans</p>
                <p className="text-sm text-gray-600">Due soon and overdue are highlighted.</p>
              </div>
              <div className="flex gap-2">
                <select className="rounded-md border px-3 py-2 text-sm" value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="active">All active</option>
                  <option value="dueSoon">Due soon (3 days)</option>
                  <option value="overdue">Overdue</option>
                </select>
                <button className="btn-secondary" onClick={load} disabled={loading}>Refresh</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="text-left px-4 py-3">copy_code</th>
                    <th className="text-left px-4 py-3">Book</th>
                    <th className="text-left px-4 py-3">Student ID</th>
                    <th className="text-left px-4 py-3">Checked out</th>
                    <th className="text-left px-4 py-3">Due</th>
                    <th className="text-left px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {derived.map((l) => {
                    const code = l.library_copies?.copy_code || '—';
                    const title = l.library_copies?.library_books?.title || '—';
                    const status = l._overdue ? 'Overdue' : (l._dueSoon ? 'Due soon' : 'On loan');
                    return (
                      <tr key={l.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-mono text-xs">{code}</td>
                        <td className="px-4 py-3">{title}</td>
                        <td className="px-4 py-3 font-mono text-xs">{l.student_id}</td>
                        <td className="px-4 py-3">{fmt(l.checked_out_at)}</td>
                        <td className="px-4 py-3">{fmt(l.due_at)}</td>
                        <td className="px-4 py-3">
                          {l._overdue ? (
                            <span className="px-2 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs">{status}</span>
                          ) : l._dueSoon ? (
                            <span className="px-2 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs">{status}</span>
                          ) : (
                            <span className="px-2 py-1 rounded-full bg-gray-50 border text-gray-700 text-xs">{status}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {!loading && derived.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                        No loans found for this filter.
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


