import Layout from '@/components/Layout';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';

export default function LibraryPage() {
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load(q = '') {
    setLoading(true);
    setError('');
    try {
      const { data, error: e } = await supabase.rpc('library_public_catalog', {
        p_search: q && q.trim() ? q.trim() : null,
      });
      if (e) throw e;
      setRows(data || []);
    } catch (e2) {
      setError(String(e2?.message || 'Failed to load library catalog'));
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => rows, [rows]);

  return (
    <Layout title="Library">
      <section className="bg-white">
        <div className="container-page py-10">
          <Reveal>
            <SectionHeading
              eyebrow="Library"
              title="Available Books"
              subtitle="Browse the current library catalog and see what’s available."
            />
          </Reveal>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="flex-1 max-w-xl">
              <label className="text-sm text-gray-600">Search</label>
              <div className="mt-1 flex gap-2">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Search by title, author, or category..."
                />
                <button
                  className="btn-primary"
                  onClick={() => load(search)}
                  disabled={loading}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {loading ? 'Loading…' : `${filtered.length} book(s)`}
            </div>
          </div>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {!loading && filtered.length === 0 && (
              <div className="card p-6 sm:col-span-2 lg:col-span-3">
                <p className="font-semibold">No books found</p>
                <p className="text-sm text-gray-600 mt-1">Try a different search term.</p>
              </div>
            )}

            {filtered.map((b) => (
              <div key={b.id} className="card p-5 flex gap-4">
                <div className="w-14 h-16 rounded-md bg-gray-100 border overflow-hidden flex items-center justify-center shrink-0">
                  {b.cover_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={b.cover_url} alt={b.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-gray-500">No cover</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-navy-900 truncate">{b.title}</p>
                  <p className="text-sm text-gray-600 truncate">{b.author || 'Unknown author'}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    {b.category && (
                      <span className="px-2 py-1 rounded-full bg-navy-50 text-navy-700 border border-navy-100">
                        {b.category}
                      </span>
                    )}
                    <span className="px-2 py-1 rounded-full bg-gray-50 text-gray-700 border">
                      Available: <strong>{b.available_copies}</strong> / {b.total_copies}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}


