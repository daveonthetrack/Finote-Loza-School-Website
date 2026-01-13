import LibrarianGuard from '@/components/LibrarianGuard';
import LibrarianLayout from '@/components/LibrarianLayout';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function LibrarianDashboard() {
  const [stats, setStats] = useState({
    books: 0,
    copies: 0,
    activeLoans: 0,
    dueSoon: 0,
    overdue: 0,
  });
  const [loading, setLoading] = useState(true);

  const now = useMemo(() => new Date(), []);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load() {
    setLoading(true);
    try {
      const [
        { count: booksCount },
        { count: copiesCount },
        { data: activeLoans },
      ] = await Promise.all([
        supabase.from('library_books').select('*', { count: 'exact', head: true }),
        supabase.from('library_copies').select('*', { count: 'exact', head: true }),
        supabase
          .from('library_loans')
          .select('id,due_at,returned_at')
          .is('returned_at', null),
      ]);

      const dueSoonThreshold = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
      const active = activeLoans || [];
      const dueSoon = active.filter((l) => l.due_at && new Date(l.due_at) <= dueSoonThreshold && new Date(l.due_at) >= now).length;
      const overdue = active.filter((l) => l.due_at && new Date(l.due_at) < now).length;

      setStats({
        books: booksCount || 0,
        copies: copiesCount || 0,
        activeLoans: active.length,
        dueSoon,
        overdue,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <LibrarianGuard>
      <LibrarianLayout>
        <div className="py-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="heading-section">Library Dashboard</h1>
              <p className="text-sm text-gray-600">Manage books, copies, and student loans.</p>
            </div>
            <div className="flex gap-2">
              <Link href="/librarian-portal/loans" className="btn-primary">Check-out / Return</Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-5">
            <div className="card p-4">
              <p className="text-xs text-gray-500">Books</p>
              <p className="mt-1 text-2xl font-semibold">{loading ? '—' : stats.books}</p>
            </div>
            <div className="card p-4">
              <p className="text-xs text-gray-500">Copies</p>
              <p className="mt-1 text-2xl font-semibold">{loading ? '—' : stats.copies}</p>
            </div>
            <div className="card p-4">
              <p className="text-xs text-gray-500">Active loans</p>
              <p className="mt-1 text-2xl font-semibold">{loading ? '—' : stats.activeLoans}</p>
            </div>
            <div className="card p-4">
              <p className="text-xs text-gray-500">Due soon (3 days)</p>
              <p className="mt-1 text-2xl font-semibold">{loading ? '—' : stats.dueSoon}</p>
            </div>
            <div className="card p-4">
              <p className="text-xs text-gray-500">Overdue</p>
              <p className="mt-1 text-2xl font-semibold text-red-700">{loading ? '—' : stats.overdue}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Link href="/librarian-portal/books" className="card p-5 hover:shadow-lg transition">
              <p className="font-semibold">Books</p>
              <p className="text-sm text-gray-600 mt-1">Add/edit titles in the catalog.</p>
            </Link>
            <Link href="/librarian-portal/copies" className="card p-5 hover:shadow-lg transition">
              <p className="font-semibold">Copies</p>
              <p className="text-sm text-gray-600 mt-1">Manage barcoded physical copies.</p>
            </Link>
            <Link href="/librarian-portal/loans" className="card p-5 hover:shadow-lg transition">
              <p className="font-semibold">Loans</p>
              <p className="text-sm text-gray-600 mt-1">Check-out / return and view due dates.</p>
            </Link>
          </div>
        </div>
      </LibrarianLayout>
    </LibrarianGuard>
  );
}


