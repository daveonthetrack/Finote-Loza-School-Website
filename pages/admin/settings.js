import AdminLayout from '@/components/AdminLayout';
import AdminGuard from '@/components/AdminGuard';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useSettings } from '@/lib/settingsContext';

export default function AdminSettings() {
  const { settings, setSettings } = useSettings();
  const [form, setForm] = useState({ school_name: '', tagline: '', logo_url: '', banner_url: '' });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState({ logo: false, banner: false });

  useEffect(() => {
    (async () => {
      if (!settings) {
        const { data } = await supabase.from('site_settings').select('*').eq('id', 1).maybeSingle();
        if (data) {
          setSettings(data);
          setForm({
            school_name: data.school_name || '',
            tagline: data.tagline || '',
            logo_url: data.logo_url || '',
            banner_url: data.banner_url || '',
          });
        }
      } else {
        setForm({
          school_name: settings.school_name || '',
          tagline: settings.tagline || '',
          logo_url: settings.logo_url || '',
          banner_url: settings.banner_url || '',
        });
      }
      setLoading(false);
    })();
  }, [settings, setSettings]);

  async function savePartial(partial) {
    await supabase.from('site_settings').upsert({ id: 1, ...partial, updated_at: new Date().toISOString() });
    setSettings((prev) => ({ ...(prev || {}), id: 1, ...partial }));
  }

  async function uploadFile(e, field, bucket, autosave = false) {
    const file = e.target.files?.[0];
    if (!file) return;
    const path = `${Date.now()}_${file.name}`;
    const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, { upsert: true, cacheControl: '3600', contentType: file.type });
    if (upErr) {
      alert('Upload failed: ' + upErr.message);
      return;
    }
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    setForm((f) => ({ ...f, [field]: data.publicUrl }));
    if (autosave) {
      await savePartial({ [field]: data.publicUrl });
    }
  }

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    await supabase.from('site_settings').upsert({ id: 1, ...form, updated_at: new Date().toISOString() });
    setSaving(false);
    setSettings({ id: 1, ...form });
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="py-2 max-w-3xl">
          <h1 className="heading-section">Site Settings</h1>

          {loading ? (
            <div className="mt-6 card p-6">Loading...</div>
          ) : (
            <form onSubmit={save} className="mt-6 space-y-6">
              <div className="card p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium">School Name</label>
                  <input className="mt-1 w-full rounded-md border-gray-300" value={form.school_name} onChange={(e)=>setForm({...form,school_name:e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium">Tagline</label>
                  <input className="mt-1 w-full rounded-md border-gray-300" value={form.tagline} onChange={(e)=>setForm({...form,tagline:e.target.value})} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Logo</p>
                      <p className="text-xs text-gray-500">PNG/SVG, ~160×160 recommended</p>
                    </div>
                    {form.logo_url ? (
                      <button type="button" className="text-sm text-red-600" onClick={()=>setForm({...form,logo_url:''})}>Remove</button>
                    ) : null}
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <input className="w-full rounded-md border-gray-300" value={form.logo_url} onChange={(e)=>setForm({...form,logo_url:e.target.value})} placeholder="https://..." />
                    <label className={`btn-primary cursor-pointer whitespace-nowrap ${uploading.logo ? 'opacity-70 pointer-events-none' : ''}`}>
                      {uploading.logo ? 'Uploading...' : 'Change'}
                      <input type="file" accept="image/*" className="hidden" onChange={(e)=>{ setUploading((u)=>({...u,logo:true})); uploadFile(e,'logo_url','assets',true).finally(()=>setUploading((u)=>({...u,logo:false}))); }} />
                    </label>
                  </div>
                  <div className="mt-4">
                    <div className="h-24 w-24 overflow-hidden rounded-full border bg-white">
                      {form.logo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={form.logo_url} alt="Logo preview" className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-gold-100 to-navy-100" />)
                      }
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Banner</p>
                      <p className="text-xs text-gray-500">Wide image, 1600×600 recommended</p>
                    </div>
                    {form.banner_url ? (
                      <button type="button" className="text-sm text-red-600" onClick={()=>setForm({...form,banner_url:''})}>Remove</button>
                    ) : null}
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <input className="w-full rounded-md border-gray-300" value={form.banner_url} onChange={(e)=>setForm({...form,banner_url:e.target.value})} placeholder="https://..." />
                    <label className={`btn-primary cursor-pointer whitespace-nowrap ${uploading.banner ? 'opacity-70 pointer-events-none' : ''}`}>
                      {uploading.banner ? 'Uploading...' : 'Change'}
                      <input type="file" accept="image/*" className="hidden" onChange={(e)=>{ setUploading((u)=>({...u,banner:true})); uploadFile(e,'banner_url','assets',true).finally(()=>setUploading((u)=>({...u,banner:false}))); }} />
                    </label>
                  </div>
                  <div className="mt-4 aspect-[16/6] w-full overflow-hidden rounded-lg border bg-gray-100">
                    {form.banner_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={form.banner_url} alt="Banner preview" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-navy-100 to-gold-100" />)
                    }
                  </div>
                </div>
              </div>

              <div>
                <button className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Settings'}</button>
                <p className="mt-2 text-xs text-gray-500">Uploads use the public Supabase bucket named <span className="font-medium">assets</span>.</p>
              </div>
            </form>
          )}
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}


