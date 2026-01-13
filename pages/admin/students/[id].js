import AdminLayout from '@/components/AdminLayout';
import AdminGuard from '@/components/AdminGuard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import { useSettings } from '@/lib/settingsContext';
import { openStudentIdCardPrintWindow } from '@/lib/printStudentIdCard';

export default function StudentDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { settings } = useSettings();
  const [student, setStudent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    // Student Information
    first_name: '',
    middle_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    grade_level: '',
    email: '',
    phone: '',
    address: '',
    homeroom: '',
    photo_url: '',
    // Emergency
    emergency_contact_name: '',
    emergency_contact_phone: '',
    emergency_contact_relationship: '',
    // Academic Information
    previous_school: '',
    previous_school_address: '',
    previous_school_phone: '',
    reason_for_leaving: '',
    special_needs: '',
    medical_conditions: '',
    // Additional Information
    extracurricular_activities: '',
    interests: '',
    goals: '',
    additional_info: '',
  });
  const [parentForm, setParentForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    occupation: '',
    employer: '',
  });

  const gradeLevels = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  const homerooms = ['A','B','C','D','E','F','G','H'];

  useEffect(() => { if (id) load(); }, [id]);

  async function load() {
    try {
      const res = await fetch(`/api/admin/students/detail?id=${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to load');
      const s = json.student;
      const p = json.parent;
      setStudent(s);
      setForm({
        first_name: s.first_name || '',
        middle_name: s.middle_name || '',
        last_name: s.last_name || '',
        date_of_birth: s.date_of_birth || '',
        gender: s.gender || '',
        grade_level: s.grade_level || '',
        email: s.email || '',
        phone: s.phone || '',
        address: s.address || '',
        homeroom: s.homeroom || '',
        photo_url: s.photo_url || '',
        emergency_contact_name: s.emergency_contact_name || '',
        emergency_contact_phone: s.emergency_contact_phone || '',
        emergency_contact_relationship: s.emergency_contact_relationship || '',
        previous_school: s.previous_school || '',
        previous_school_address: s.previous_school_address || '',
        previous_school_phone: s.previous_school_phone || '',
        reason_for_leaving: s.reason_for_leaving || '',
        special_needs: s.special_needs || '',
        medical_conditions: s.medical_conditions || '',
        extracurricular_activities: s.extracurricular_activities || '',
        interests: s.interests || '',
        goals: s.goals || '',
        additional_info: s.additional_info || '',
      });
      setParentForm({
        first_name: p?.first_name || '',
        last_name: p?.last_name || '',
        email: p?.email || '',
        phone: p?.phone || '',
        occupation: p?.occupation || '',
        employer: p?.employer || '',
      });
    } catch (e) {
      alert(e.message);
    }
  }

  async function onSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/students/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, student: form, parent: parentForm }),
      });
      const json = await res.json();
      setSaving(false);
      if (!res.ok) throw new Error(json.error || 'Failed to save');
      alert('Saved');
      // Refresh current data
      load();
    } catch (err) {
      setSaving(false);
      alert(err.message);
    }
  }

  async function onPhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const key = `students/${student.student_id}-${Date.now()}`;
    const { error: uploadError } = await supabase.storage.from('assets').upload(key, file, { upsert: true, cacheControl: '3600', contentType: file.type });
    if (uploadError) { alert(uploadError.message); setUploading(false); return; }
    const { data: publicUrl } = supabase.storage.from('assets').getPublicUrl(key);
    setStudent({ ...student, photo_url: publicUrl.publicUrl });
    setForm({ ...form, photo_url: publicUrl.publicUrl });
    setUploading(false);
  }

  async function onViewInitialCredentials() {
    try {
      const res = await fetch(`/api/admin/students/credentials?id=${id}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed');
      const c = json.credentials;
      alert(`First credentials for ${student.first_name} ${student.last_name}\nID: ${c.student_id}\nEmail: ${c.email}\nPassword: ${c.initial_password}`);
    } catch (e) {
      alert(e.message);
    }
  }

  async function onDeleteStudent() {
    if (!confirm(`Delete ${student.first_name} ${student.last_name}? This cannot be undone.`)) return;
    try {
      const res = await fetch('/api/admin/students/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, deleteAuthUser: true })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to delete');
      router.replace('/admin/students');
    } catch (e) {
      alert(e.message);
    }
  }

  function printIdCard() {
    const s = student;
    if (!s) return;
    const schoolName = settings?.school_name || 'Finote Loza School';
    const logoUrl = settings?.logo_url || '';

    openStudentIdCardPrintWindow(s, {
      schoolName,
      logoUrl,
      website: 'www.finoteloza.edu',
      phone: settings?.contact_phone || '+251 11 123 4567',
      address: settings?.address || 'Addis Ababa, Ethiopia',
      // QR encodes the Student ID by default
    });
  }

  if (!student) return (
    <AdminGuard>
      <AdminLayout>
        <div className="py-2">Loading...</div>
      </AdminLayout>
    </AdminGuard>
  );

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="py-2">
          <h1 className="heading-section">{student.first_name} {student.last_name}</h1>
          <form onSubmit={onSave} className="mt-6 grid lg:grid-cols-[1fr,380px] gap-8 items-start">
            <div className="card p-6 space-y-6">
              {/* Student Information */}
              <div>
                <h2 className="text-lg font-semibold mb-3">Student Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">First Name</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={form.first_name} onChange={(e)=>setForm({...form, first_name:e.target.value})} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Middle Name</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={form.middle_name} onChange={(e)=>setForm({...form, middle_name:e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Last Name</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={form.last_name} onChange={(e)=>setForm({...form, last_name:e.target.value})} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Date of Birth</label>
                    <input type="date" className="mt-1 w-full rounded-md border-gray-300" value={form.date_of_birth} onChange={(e)=>setForm({...form, date_of_birth:e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Gender</label>
                    <select
                      className="mt-1 w-full rounded-md border-gray-300"
                      value={form.gender}
                      onChange={(e)=>setForm({...form, gender:e.target.value})}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Grade Level</label>
                    <select
                      className="mt-1 w-full rounded-md border-gray-300"
                      value={form.grade_level}
                      onChange={(e)=>setForm({...form, grade_level:e.target.value})}
                    >
                      <option value="">Select grade</option>
                      {gradeLevels.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input type="email" className="mt-1 w-full rounded-md border-gray-300" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Phone</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium">Address</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={form.address} onChange={(e)=>setForm({...form, address:e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Homeroom (Section)</label>
                    <select
                      className="mt-1 w-full rounded-md border-gray-300"
                      value={form.homeroom}
                      onChange={(e)=>setForm({...form, homeroom:e.target.value})}
                    >
                      <option value="">Select section</option>
                      {homerooms.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Student ID (Username)</label>
                    <input className="mt-1 w-full rounded-md border-gray-300 font-mono" value={student.student_id} disabled />
                  </div>
                </div>
              </div>

              {/* Parent/Guardian Information */}
              <div>
                <h2 className="text-lg font-semibold mb-3">Parent/Guardian Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">Parent First Name</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={parentForm.first_name} onChange={(e)=>setParentForm({...parentForm, first_name:e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Parent Last Name</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={parentForm.last_name} onChange={(e)=>setParentForm({...parentForm, last_name:e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Parent Email</label>
                    <input type="email" className="mt-1 w-full rounded-md border-gray-300" value={parentForm.email} onChange={(e)=>setParentForm({...parentForm, email:e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Parent Phone</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={parentForm.phone} onChange={(e)=>setParentForm({...parentForm, phone:e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Occupation</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={parentForm.occupation} onChange={(e)=>setParentForm({...parentForm, occupation:e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Employer</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={parentForm.employer} onChange={(e)=>setParentForm({...parentForm, employer:e.target.value})} />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium">Emergency Contact</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={form.emergency_contact_name} onChange={(e)=>setForm({...form, emergency_contact_name:e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Emergency Phone</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={form.emergency_contact_phone} onChange={(e)=>setForm({...form, emergency_contact_phone:e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Relationship</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={form.emergency_contact_relationship} onChange={(e)=>setForm({...form, emergency_contact_relationship:e.target.value})} />
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h2 className="text-lg font-semibold mb-3">Academic Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">Previous School</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={form.previous_school} onChange={(e)=>setForm({...form, previous_school:e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Previous School Address</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={form.previous_school_address} onChange={(e)=>setForm({...form, previous_school_address:e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Previous School Phone</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={form.previous_school_phone} onChange={(e)=>setForm({...form, previous_school_phone:e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Reason for Leaving</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={form.reason_for_leaving} onChange={(e)=>setForm({...form, reason_for_leaving:e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Special Needs</label>
                    <textarea className="mt-1 w-full rounded-md border-gray-300" rows={3} value={form.special_needs} onChange={(e)=>setForm({...form, special_needs:e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Medical Conditions</label>
                    <textarea className="mt-1 w-full rounded-md border-gray-300" rows={3} value={form.medical_conditions} onChange={(e)=>setForm({...form, medical_conditions:e.target.value})} />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h2 className="text-lg font-semibold mb-3">Additional Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">Extracurricular Activities</label>
                    <textarea className="mt-1 w-full rounded-md border-gray-300" rows={3} value={form.extracurricular_activities} onChange={(e)=>setForm({...form, extracurricular_activities:e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Interests</label>
                    <textarea className="mt-1 w-full rounded-md border-gray-300" rows={3} value={form.interests} onChange={(e)=>setForm({...form, interests:e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Goals</label>
                    <textarea className="mt-1 w-full rounded-md border-gray-300" rows={3} value={form.goals} onChange={(e)=>setForm({...form, goals:e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Additional Info</label>
                    <textarea className="mt-1 w-full rounded-md border-gray-300" rows={3} value={form.additional_info} onChange={(e)=>setForm({...form, additional_info:e.target.value})} />
                  </div>
                </div>
              </div>

              <div>
                <button className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="card p-6">
                <p className="font-semibold mb-3">Headshot Photo</p>
                <div className="aspect-[3/4] w-48 bg-gray-100 rounded-xl overflow-hidden">
                  {student.photo_url ? (
                    <img src={student.photo_url} alt="headshot" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No photo</div>
                  )}
                </div>
                <label className="btn-secondary mt-3 inline-block cursor-pointer">
                  {uploading ? 'Uploading...' : 'Upload Photo'}
                  <input type="file" accept="image/*" className="hidden" onChange={onPhotoChange} disabled={uploading} />
                </label>
              </div>

              <div className="card p-6">
                <p className="font-semibold mb-3">ID Card Preview</p>
                <div className="border rounded-xl p-3 bg-white" style={{ width: 320 }}>
                  <div className="bg-navy-900 text-white px-3 py-2 rounded-md mb-2 flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={settings?.logo_url || '/logo.png'}
                      alt={settings?.school_name || 'Finote Loza School'}
                      className="w-6 h-6 rounded-full bg-white object-cover"
                    />
                    <div className="font-semibold">{settings?.school_name || 'Finote Loza School'}</div>
                  </div>
                  <div className="aspect-[16/9] bg-gray-100 rounded mb-2 overflow-hidden">
                    {student.photo_url && <img src={student.photo_url} className="w-full h-full object-cover" />}
                  </div>
                  <div className="text-sm"><div className="text-gray-500">Student</div><div className="font-semibold">{student.first_name} {student.last_name}</div></div>
                  <div className="text-sm mt-1"><div className="text-gray-500">ID</div><div className="font-mono">{student.student_id}</div></div>
                </div>
                <button className="btn-primary mt-3" onClick={printIdCard}>Print ID Card</button>
              </div>

              <div className="card p-6">
                <p className="font-semibold mb-3">Security</p>
                <button
                  className="inline-flex items-center rounded-md border px-3 py-2"
                  onClick={async () => {
                    const res = await fetch('/api/reset-student-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId: student.user_id }) });
                    const json = await res.json();
                    if (!res.ok) { alert(json.error || 'Failed'); return; }
                    alert(`Temporary password: ${json.newPassword}`);
                  }}
                  disabled={!student.user_id}
                >
                  Reset Password
                </button>
                {!student.user_id && <p className="text-xs text-gray-500 mt-2">No linked auth user. Create account from Applications or re-register the student.</p>}
                <div className="mt-4 flex items-center gap-3">
                  <button className="btn-secondary" onClick={onViewInitialCredentials}>View Initial Credentials</button>
                  <button className="inline-flex items-center rounded-md border border-red-300 text-red-700 px-3 py-2" onClick={onDeleteStudent}>Delete Student</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}


