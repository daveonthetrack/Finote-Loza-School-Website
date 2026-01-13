import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Footer() {
  const [content, setContent] = useState({});
  useEffect(() => {
    (async () => {
      const keys = ['footer.school_name','footer.tagline','footer.email','footer.phone','footer.address'];
      const { data } = await supabase.from('site_content').select('key,value').in('key', keys);
      const map = {};
      (data || []).forEach((r)=>{ map[r.key] = r.value; });
      setContent(map);
    })();
  }, []);

  return (
    <footer className="bg-navy-800 text-white mt-12">
      <div className="container-page py-10 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <p className="font-display text-lg">{content['footer.school_name'] || 'Finote Loza School'}</p>
          <p className="mt-2 text-white/70">{content['footer.tagline'] || 'Excellence in Education'}</p>
        </div>
        <div>
          <p className="font-semibold">Contact</p>
          <p className="text-white/70 mt-2">Email: {content['footer.email'] || 'info@finoteloza.edu'}</p>
          <p className="text-white/70">Phone: {content['footer.phone'] || '+251-000-0000'}</p>
        </div>
        <div>
          <p className="font-semibold">Address</p>
          <p className="text-white/70 mt-2">{content['footer.address'] || 'Add your school address here'}</p>
        </div>
        <div>
          <p className="font-semibold">Quick Links</p>
          <ul className="mt-2 space-y-1 text-white/80">
            <li><a href="/student/login" className="hover:text-gold-300">Student Portal</a></li>
            <li><a href="/parent/login" className="hover:text-gold-300">Parent Portal</a></li>
            <li><a href="/teacher/login" className="hover:text-gold-300">Teacher Portal</a></li>
            <li><a href="/librarian/login" className="hover:text-gold-300">Librarian Portal</a></li>
            <li><a href="/library" className="hover:text-gold-300">Library</a></li>
            <li><a href="/online-application" className="hover:text-gold-300">Online Application</a></li>
            <li><a href="/faculty-directory" className="hover:text-gold-300">Faculty Directory</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page py-4 text-xs text-white/70">© {new Date().getFullYear()} Finote Loza School</div>
      </div>
    </footer>
  );
}


