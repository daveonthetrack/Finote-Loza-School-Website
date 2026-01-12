import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import AdminGuard from '@/components/AdminGuard';
import Reveal from '@/components/Reveal';
import { supabase } from '@/lib/supabaseClient';

export default function AdminParentsPage() {
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [linkingParentId, setLinkingParentId] = useState(null);
  const [linkStudentId, setLinkStudentId] = useState('');
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '' });
  const [showBulk, setShowBulk] = useState(false);
  const [bulkCsv, setBulkCsv] = useState('first_name,last_name,email,phone\nJane,Doe,jane@example.com,\nJohn,Smith,john@example.com,');
  const [toast, setToast] = useState({ type: '', message: '' });

  useEffect(() => {
    loadParents();
  }, []);

  async function loadParents() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/parents/list');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to load parents');
      setParents(json.parents || []);
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Error loading parents: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateParent(e) {
    e.preventDefault();
    setCreating(true);
    try {
      const body = {
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim() || undefined
      };
      const res = await fetch('/api/register-parent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || 'Failed to register parent');
      }
      setShowCreate(false);
      setForm({ first_name: '', last_name: '', email: '', phone: '' });
      await loadParents();
      // eslint-disable-next-line no-alert
      alert('Parent registered successfully');
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Error registering parent: ' + e.message);
    } finally {
      setCreating(false);
    }
  }

  async function handleResetPassword(parent) {
    const newPassword = window.prompt('Enter a new password for ' + parent.first_name + ' ' + parent.last_name);
    if (!newPassword) return;
    try {
      const res = await fetch('/api/reset-parent-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: parent.user_id, newPassword })
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || 'Failed to reset password');
      }
      // eslint-disable-next-line no-alert
      alert('Password reset successfully');
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Error resetting password: ' + e.message);
    }
  }

  async function handleLinkStudent(parentId) {
    if (!linkStudentId.trim()) return;
    try {
      // Lookup student by printed student_id
      const res = await fetch('/api/admin/parents/link-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parent_id: parentId, student_printed_id: linkStudentId.trim() })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to link student');
      setLinkingParentId(null);
      setLinkStudentId('');
      // eslint-disable-next-line no-alert
      alert('Linked student ' + json.student.first_name + ' ' + json.student.last_name);
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Error linking student: ' + e.message);
    }
  }

  function showToast(type, message) {
    setToast({ type, message });
    setTimeout(() => setToast({ type: '', message: '' }), 2500);
  }

  function parseCsv(text) {
    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h=>h.trim());
    const out = [];
    for (let i=1;i<lines.length;i++) {
      const row = {};
      const cols = lines[i].split(',');
      headers.forEach((h, idx) => { row[h] = (cols[idx] || '').trim(); });
      if (row.first_name && row.last_name && row.email) out.push(row);
    }
    return out;
  }

  async function handleBulkImport() {
    try {
      const parents = parseCsv(bulkCsv);
      if (parents.length === 0) {
        showToast('error','No valid rows found');
        return;
      }
      const res = await fetch('/api/admin/parents/bulk-import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parents })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Import failed');
      showToast('success', `Imported ${json.imported} of ${parents.length}`);
      setShowBulk(false);
      await loadParents();
    } catch (e) {
      showToast('error', e.message);
    }
  }

  return (
    <AdminGuard>
    <AdminLayout>
      <div className="py-2">
        <Reveal>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Parents</h1>
            <button
              onClick={() => setShowCreate(true)}
              className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Register Parent
            </button>
            <button
              onClick={() => setShowBulk(true)}
              className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition"
            >
              Bulk Import
            </button>
          </div>
        </Reveal>

        {loading ? (
          <div className="text-center py-12 text-gray-600">Loading parents...</div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Parent</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Email</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Phone</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Parent ID</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {parents.map((p) => (
                  <tr key={p.id} className="border-t border-gray-200">
                    <td className="px-6 py-4">
                      <div className="font-medium">{p.first_name} {p.last_name}</div>
                      {(p.linked_students && p.linked_students.length > 0) && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {(p.linked_students || []).map((s) => (
                            <span key={s.id} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                              {s.first_name} {s.last_name} ({s.student_id})
                              <button
                                aria-label="Unlink student"
                                onClick={async () => {
                                  try {
                                    const res = await fetch('/api/admin/parents/unlink-student', {
                                      method: 'POST',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ parent_id: p.id, student_id: s.id })
                                    });
                                    const json = await res.json();
                                    if (!res.ok) throw new Error(json.error || 'Failed to unlink');
                                    await loadParents();
                                  } catch (e) {
                                    // eslint-disable-next-line no-alert
                                    alert('Error unlinking: ' + e.message);
                                  }
                                }}
                                className="ml-1 text-red-600 hover:text-red-800"
                              >
                                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">{p.email}</td>
                    <td className="px-6 py-4">{p.phone || '-'}</td>
                    <td className="px-6 py-4">{p.parent_id}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2 items-center">
                        <button
                          onClick={() => handleResetPassword(p)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Reset Password
                        </button>

                        {linkingParentId === p.id ? (
                          <div className="flex items-center gap-2 bg-gray-50 border rounded-md p-2">
                            <input
                              type="text"
                              placeholder="Student ID (e.g., ST1234)"
                              className="rounded-md border-gray-300 text-sm"
                              value={linkStudentId}
                              onChange={(e) => setLinkStudentId(e.target.value)}
                            />
                            <button
                              onClick={() => handleLinkStudent(p.id)}
                              className="bg-gold-600 hover:bg-gold-700 text-white px-3 py-1.5 rounded-md text-sm"
                            >
                              Link
                            </button>
                            <button
                              onClick={() => { setLinkingParentId(null); setLinkStudentId(''); }}
                              className="text-gray-600 hover:text-gray-800 text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setLinkingParentId(p.id)}
                            className="px-3 py-1.5 rounded-md border border-gold-600 text-gold-700 hover:bg-gold-50 text-sm"
                          >
                            Link Student
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {parents.length === 0 && (
              <div className="text-center py-12 text-gray-600">No parents found.</div>
            )}
          </div>
        )}

        {showCreate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="flex justify-between items-center border-b p-4">
                <h2 className="text-xl font-bold">Register Parent</h2>
                <button onClick={() => setShowCreate(false)} className="text-gray-500 hover:text-gray-700">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <form onSubmit={handleCreateParent} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input
                      className="w-full rounded-md border-gray-300"
                      value={form.first_name}
                      onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input
                      className="w-full rounded-md border-gray-300"
                      value={form.last_name}
                      onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-md border-gray-300"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone (optional)</label>
                  <input
                    className="w-full rounded-md border-gray-300"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-lg font-medium transition flex-1"
                    disabled={creating}
                  >
                    {creating ? 'Registering...' : 'Register Parent'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreate(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      {/* Bulk Import Modal */}
      {showBulk && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-bold">Bulk Import Parents (CSV)</h2>
              <button onClick={() => setShowBulk(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600">Paste CSV with headers: first_name,last_name,email,phone</p>
              <textarea className="w-full rounded-md border-gray-300" rows={10} value={bulkCsv} onChange={(e)=>setBulkCsv(e.target.value)} />
              <div className="flex justify-end gap-2">
                <button onClick={()=>setShowBulk(false)} className="px-4 py-2 rounded-md border text-sm">Cancel</button>
                <a
                  href={`data:text/csv;charset=utf-8,${encodeURIComponent('first_name,last_name,email,phone\nJane,Doe,jane@example.com,\nJohn,Smith,john@example.com,')}`}
                  download="parents_template.csv"
                  className="px-4 py-2 rounded-md border text-sm"
                >
                  Download Template
                </a>
                <button onClick={handleBulkImport} className="px-4 py-2 rounded-md bg-gold-600 text-white text-sm">Import</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Toast */}
      {toast.message && (
        <div className={`fixed bottom-6 right-6 px-4 py-3 rounded-md shadow-lg text-sm ${toast.type==='success'?'bg-green-600 text-white':'bg-red-600 text-white'}`}>{toast.message}</div>
      )}
    </AdminLayout>
    </AdminGuard>
  );
}

 
