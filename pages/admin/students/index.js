import AdminLayout from '@/components/AdminLayout';
import AdminGuard from '@/components/AdminGuard';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useSettings } from '@/lib/settingsContext';
import { openStudentIdCardPrintWindow } from '@/lib/printStudentIdCard';

export default function AdminStudents() {
  const { settings } = useSettings();
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ firstName: '', lastName: '', gradeLevel: '', homeroom: '' });
  const [creating, setCreating] = useState(false);
  const [lastCreds, setLastCreds] = useState(null);
  const [search, setSearch] = useState('');
  const [grade, setGrade] = useState('');
  const [importing, setImporting] = useState(false);
  const [importLog, setImportLog] = useState([]);

  const gradeLevels = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  const homerooms = ['A','B','C','D','E','F','G','H'];

  const totalStudents = students.length;
  const gradeOptions = useMemo(
    () =>
      Array.from(
        new Set(
          (students || [])
            .map((s) => s.grade_level || '')
            .filter((g) => g && g.trim().length > 0)
        )
      ).sort(),
    [students]
  );

  useEffect(() => { load(); }, []);

  async function load() {
    try {
      const params = new URLSearchParams();
      if (search) params.set('q', search);
      if (grade) params.set('grade', grade);
      const res = await fetch(`/api/admin/students/list?${params.toString()}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to load students');
      setStudents(json.students || []);
    } catch (e) {
      console.error(e);
      setStudents([]);
    }
  }

  async function onCreate(e) {
    e.preventDefault();
    setCreating(true);
    const res = await fetch('/api/register-student', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setCreating(false);
    const json = await res.json();
    if (!res.ok) { alert(json.error || 'Failed'); return; }
    setLastCreds(json);
    setForm({ firstName: '', lastName: '', gradeLevel: '', homeroom: '' });
    load();
  }

  const filtered = students;

  function onExportCsv() {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (grade) params.set('grade', grade);
    const qs = params.toString();
    const url = `/api/admin/students/export${qs ? `?${qs}` : ''}`;
    if (typeof window !== 'undefined') {
      window.location.href = url;
    }
  }

  async function onImportCsv(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    setImportLog([]);
    const text = await file.text();
    // Expected headers: first_name,last_name,grade_level,homeroom
    const lines = text.split(/\r?\n/).filter(Boolean);
    const [header, ...rows] = lines;
    const cols = header.split(',').map((c) => c.trim().toLowerCase());
    const idx = {
      first: cols.indexOf('first_name'),
      last: cols.indexOf('last_name'),
      grade: cols.indexOf('grade_level'),
      room: cols.indexOf('homeroom'),
    };
    for (const row of rows) {
      const parts = row.split(',');
      const payload = {
        firstName: parts[idx.first]?.trim(),
        lastName: parts[idx.last]?.trim(),
        gradeLevel: parts[idx.grade]?.trim() || '',
        homeroom: parts[idx.room]?.trim() || '',
      };
      if (!payload.firstName || !payload.lastName) {
        setImportLog((l) => [...l, `Skipped row (missing name): ${row}`]);
        continue;
      }
      try {
        const res = await fetch('/api/register-student', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Failed');
        setImportLog((l) => [...l, `OK ${payload.firstName} ${payload.lastName} -> ${json.studentId}`]);
      } catch (err) {
        setImportLog((l) => [...l, `ERR ${payload.firstName} ${payload.lastName}: ${err.message}`]);
      }
    }
    setImporting(false);
    load();
  }

  function printIdCard(s) {
    const schoolName = settings?.school_name || 'Finote Loza School';
    const logoUrl = settings?.logo_url || '';
    const siteUrl = settings?.site_url || '';
    const qrUrl = siteUrl ? `${siteUrl.replace(/\/$/, '')}/student-portal` : '';

    openStudentIdCardPrintWindow(s, {
      schoolName,
      logoUrl,
      website: 'www.finoteloza.edu',
      phone: settings?.contact_phone || '+251 11 123 4567',
      address: settings?.address || 'Addis Ababa, Ethiopia',
      qrUrl,
    });
  }

  // actions moved to student profile page

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="py-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="heading-section">Students</h1>
              <div className="text-sm text-gray-600">
                {totalStudents === 0
                  ? 'No students loaded'
                  : `${totalStudents} student${totalStudents !== 1 ? 's' : ''} loaded`}
              </div>
            </div>
            <button
              type="button"
              onClick={onExportCsv}
              className="btn-secondary whitespace-nowrap"
              disabled={totalStudents === 0}
            >
              Export CSV
            </button>
          </div>

          <form onSubmit={onCreate} className="mt-6 card p-6 grid md:grid-cols-5 gap-3 items-end">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium">First Name</label>
              <input className="mt-1 w-full rounded-md border-gray-300" value={form.firstName} onChange={(e)=>setForm({...form,firstName:e.target.value})} required />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium">Last Name</label>
              <input className="mt-1 w-full rounded-md border-gray-300" value={form.lastName} onChange={(e)=>setForm({...form,lastName:e.target.value})} required />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium">Grade</label>
              <select
                className="mt-1 w-full rounded-md border-gray-300"
                value={form.gradeLevel}
                onChange={(e)=>setForm({...form,gradeLevel:e.target.value})}
              >
                <option value="">Select grade</option>
                {gradeLevels.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium">Homeroom (Section)</label>
              <select
                className="mt-1 w-full rounded-md border-gray-300"
                value={form.homeroom}
                onChange={(e)=>setForm({...form,homeroom:e.target.value})}
              >
                <option value="">Select section</option>
                {homerooms.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-1">
              <button className="btn-primary w-full" disabled={creating}>{creating ? 'Creating...' : 'Register Student'}</button>
            </div>
          </form>

          <div className="mt-4 grid md:grid-cols-3 gap-4">
            <div className="card p-4">
              <label className="block text-sm font-medium">Search</label>
              <input className="mt-1 w-full rounded-md border-gray-300" placeholder="Name or ID" value={search} onChange={(e)=>{setSearch(e.target.value);}} onBlur={load} />
              <button type="button" className="btn-secondary mt-2" onClick={load}>Search</button>
            </div>
            <div className="card p-4">
              <label className="block text-sm font-medium">Filter by Grade</label>
              <select
                className="mt-1 w-full rounded-md border-gray-300"
                value={grade}
                onChange={(e)=>{setGrade(e.target.value);}}
                onBlur={load}
              >
                <option value="">All grades</option>
                {gradeOptions.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              <button type="button" className="btn-secondary mt-2" onClick={load}>Apply</button>
            </div>
            <div className="card p-4">
              <label className="block text-sm font-medium">Bulk Import (CSV)</label>
              <input type="file" accept=".csv" className="mt-1 w-full" onChange={onImportCsv} disabled={importing} />
              <p className="text-xs text-gray-500 mt-2">Headers: first_name,last_name,grade_level,homeroom</p>
            </div>
          </div>

          {importLog.length > 0 && (
            <div className="mt-4 card p-4 text-xs max-h-48 overflow-auto">
              {importLog.map((l, i) => <div key={i}>{l}</div>)}
            </div>
          )}

          {lastCreds && (
            <div className="mt-4 card p-4 text-sm">
              <div className="font-semibold">Credentials generated</div>
              <div>Username (Student ID): <span className="font-mono">{lastCreds.studentId}</span></div>
              <div>Temp Password: <span className="font-mono">{lastCreds.password}</span></div>
              <div>Email: <span className="font-mono">{lastCreds.email}</span></div>
              <div className="text-xs text-gray-500 mt-2">Share with the student and require password change on first login (we can add a flow).</div>
            </div>
          )}

          <div className="mt-8">
            {filtered.length === 0 ? (
              <div className="card p-8 text-center text-sm text-gray-600">
                <div className="font-semibold mb-2">No students found</div>
                <p>Try adjusting your search or grade filter, or register a new student above.</p>
              </div>
            ) : (
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">Student</th>
                        <th className="px-4 py-3 text-left font-semibold">ID</th>
                        <th className="px-4 py-3 text-left font-semibold">Grade</th>
                        <th className="px-4 py-3 text-left font-semibold">Homeroom</th>
                        <th className="px-4 py-3 text-left font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((s, idx) => (
                        <tr key={s.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3">
                            <Link href={`/admin/students/${s.id}`} className="text-navy-700 hover:underline">
                              {s.first_name} {s.last_name}
                            </Link>
                          </td>
                          <td className="px-4 py-3 font-mono">{s.student_id}</td>
                          <td className="px-4 py-3">{s.grade_level || '-'}</td>
                          <td className="px-4 py-3">{s.homeroom || '-'}</td>
                          <td className="px-4 py-3">
                            <button onClick={() => printIdCard(s)} className="text-navy-700">
                              Print ID
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
      </AdminLayout>
    </AdminGuard>
  );
}


