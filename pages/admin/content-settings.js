import AdminLayout from '@/components/AdminLayout';
import AdminGuard from '@/components/AdminGuard';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminContentSettings() {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ type: '', message: '' });

  const keys = [
    // Home
    'home.hero.title','home.hero.highlight','home.hero.subtitle',
    // About
    'about.hero.title','about.hero.subtitle','about.mission','about.vision',
    // Contact
    'contact.hero.title','contact.hero.subtitle',
    'contact.address_line1','contact.address_line2','contact.address_line3',
    'contact.phone_main',
    'contact.email_info','contact.email_admissions',
    'contact.office_hours_line1','contact.office_hours_line2','contact.office_hours_line3'
    ,
    // SEO
    'home.seo.title','home.seo.description',
    'about.seo.title','about.seo.description',
    'admissions.seo.title','admissions.seo.description',
    'news.seo.title','news.seo.description',
    'gallery.seo.title','gallery.seo.description',
    'contact.seo.title','contact.seo.description'
  ];

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_content')
        .select('key,value')
        .in('key', keys);
      if (error) {
        showToast('error', error.message);
      } else {
        const map = {};
        (data || []).forEach((r) => { map[r.key] = r.value || ''; });
        setValues(map);
      }
      setLoading(false);
    })();
  }, []);

  function onChange(key, v) {
    setValues((prev) => ({ ...prev, [key]: v }));
  }

  function showToast(type, message) {
    setToast({ type, message });
    setTimeout(() => setToast({ type: '', message: '' }), 2500);
  }

  async function saveSection(sectionKeys) {
    try {
      setSaving(true);
      const upserts = sectionKeys.map((k) => ({ key: k, value: values[k] || '' }));
      const { error } = await supabase.from('site_content').upsert(upserts);
      if (error) throw error;
      showToast('success', 'Saved successfully');
    } catch (e) {
      showToast('error', e.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="py-2 max-w-4xl">
          <h1 className="heading-section">Content Settings</h1>

          {loading ? (
            <div className="card p-6 mt-6">Loading...</div>
          ) : (
            <div className="space-y-6 mt-6">
              {/* Home */}
              <div className="card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-navy-900">Home - Hero</p>
                  <button
                    onClick={() => saveSection(['home.hero.title','home.hero.highlight','home.hero.subtitle'])}
                    className="px-3 py-1.5 rounded-md bg-gold-600 text-white text-sm disabled:opacity-60"
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input className="mt-1 w-full rounded-md border-gray-300" value={values['home.hero.title'] || ''} onChange={(e)=>onChange('home.hero.title', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Highlight</label>
                  <input className="mt-1 w-full rounded-md border-gray-300" value={values['home.hero.highlight'] || ''} onChange={(e)=>onChange('home.hero.highlight', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                  <textarea className="mt-1 w-full rounded-md border-gray-300" rows={3} value={values['home.hero.subtitle'] || ''} onChange={(e)=>onChange('home.hero.subtitle', e.target.value)} />
                </div>
              </div>

              {/* About */}
              <div className="card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-navy-900">About Page</p>
                  <button
                    onClick={() => saveSection(['about.hero.title','about.hero.subtitle','about.mission','about.vision'])}
                    className="px-3 py-1.5 rounded-md bg-gold-600 text-white text-sm disabled:opacity-60"
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hero Title</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['about.hero.title'] || ''} onChange={(e)=>onChange('about.hero.title', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hero Subtitle</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['about.hero.subtitle'] || ''} onChange={(e)=>onChange('about.hero.subtitle', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mission</label>
                  <textarea className="mt-1 w-full rounded-md border-gray-300" rows={3} value={values['about.mission'] || ''} onChange={(e)=>onChange('about.mission', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Vision</label>
                  <textarea className="mt-1 w-full rounded-md border-gray-300" rows={3} value={values['about.vision'] || ''} onChange={(e)=>onChange('about.vision', e.target.value)} />
                </div>
              </div>

              {/* Contact */}
              <div className="card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-navy-900">Contact Page</p>
                  <button
                    onClick={() => saveSection([
                      'contact.hero.title','contact.hero.subtitle',
                      'contact.address_line1','contact.address_line2','contact.address_line3',
                      'contact.phone_main','contact.email_info','contact.email_admissions',
                      'contact.office_hours_line1','contact.office_hours_line2','contact.office_hours_line3'
                    ])}
                    className="px-3 py-1.5 rounded-md bg-gold-600 text-white text-sm disabled:opacity-60"
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hero Title</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['contact.hero.title'] || ''} onChange={(e)=>onChange('contact.hero.title', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hero Subtitle</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['contact.hero.subtitle'] || ''} onChange={(e)=>onChange('contact.hero.subtitle', e.target.value)} />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['contact.address_line1'] || ''} onChange={(e)=>onChange('contact.address_line1', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['contact.address_line2'] || ''} onChange={(e)=>onChange('contact.address_line2', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address Line 3</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['contact.address_line3'] || ''} onChange={(e)=>onChange('contact.address_line3', e.target.value)} />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Main Phone</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['contact.phone_main'] || ''} onChange={(e)=>onChange('contact.phone_main', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Info Email</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['contact.email_info'] || ''} onChange={(e)=>onChange('contact.email_info', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Admissions Email</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['contact.email_admissions'] || ''} onChange={(e)=>onChange('contact.email_admissions', e.target.value)} />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Office Hours 1</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['contact.office_hours_line1'] || ''} onChange={(e)=>onChange('contact.office_hours_line1', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Office Hours 2</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['contact.office_hours_line2'] || ''} onChange={(e)=>onChange('contact.office_hours_line2', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Office Hours 3</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['contact.office_hours_line3'] || ''} onChange={(e)=>onChange('contact.office_hours_line3', e.target.value)} />
                  </div>
                </div>
              </div>

              {/* SEO */}
              <div className="card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-navy-900">SEO</p>
                  <button
                    onClick={() => saveSection([
                      'home.seo.title','home.seo.description',
                      'about.seo.title','about.seo.description',
                      'admissions.seo.title','admissions.seo.description',
                      'news.seo.title','news.seo.description',
                      'gallery.seo.title','gallery.seo.description',
                      'contact.seo.title','contact.seo.description'
                    ])}
                    className="px-3 py-1.5 rounded-md bg-gold-600 text-white text-sm disabled:opacity-60"
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Home Title</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['home.seo.title']||''} onChange={(e)=>onChange('home.seo.title', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Home Description</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['home.seo.description']||''} onChange={(e)=>onChange('home.seo.description', e.target.value)} />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">About Title</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['about.seo.title']||''} onChange={(e)=>onChange('about.seo.title', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">About Description</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['about.seo.description']||''} onChange={(e)=>onChange('about.seo.description', e.target.value)} />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Admissions Title</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['admissions.seo.title']||''} onChange={(e)=>onChange('admissions.seo.title', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Admissions Description</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['admissions.seo.description']||''} onChange={(e)=>onChange('admissions.seo.description', e.target.value)} />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">News Title</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['news.seo.title']||''} onChange={(e)=>onChange('news.seo.title', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">News Description</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['news.seo.description']||''} onChange={(e)=>onChange('news.seo.description', e.target.value)} />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gallery Title</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['gallery.seo.title']||''} onChange={(e)=>onChange('gallery.seo.title', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text sm font-medium text-gray-700">Gallery Description</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['gallery.seo.description']||''} onChange={(e)=>onChange('gallery.seo.description', e.target.value)} />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Title</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['contact.seo.title']||''} onChange={(e)=>onChange('contact.seo.title', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Description</label>
                    <input className="mt-1 w-full rounded-md border-gray-300" value={values['contact.seo.description']||''} onChange={(e)=>onChange('contact.seo.description', e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Toast */}
        {toast.message && (
          <div className={`fixed bottom-6 right-6 px-4 py-3 rounded-md shadow-lg text-sm ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
            {toast.message}
          </div>
        )}
      </AdminLayout>
    </AdminGuard>
  );
}


