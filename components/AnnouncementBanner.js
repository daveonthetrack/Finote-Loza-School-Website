import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState(null);
  const [dismissedId, setDismissedId] = useState(null);

  useEffect(() => {
    const id = typeof window !== 'undefined' ? localStorage.getItem('dismissed_announcement_id') : null;
    setDismissedId(id);
    load();
  }, []);

  async function load() {
    const { data } = await supabase
      .from('announcements')
      .select('id,title,message,level,active,starts_at,ends_at')
      .eq('active', true)
      .order('starts_at', { ascending: false })
      .limit(1);
    if (data && data[0] && data[0].id !== dismissedId) setAnnouncement(data[0]);
  }

  if (!announcement || (dismissedId && dismissedId === announcement.id)) return null;

  const color = announcement.level === 'warning' ? 'bg-yellow-100 text-yellow-900' : announcement.level === 'error' ? 'bg-red-100 text-red-900' : 'bg-blue-100 text-blue-900';

  return (
    <div className={`${color}`}>
      <div className="container-page py-2 text-sm flex items-start gap-3">
        <div className="flex-1">
          <strong className="mr-2">{announcement.title}</strong>
          <span>{announcement.message}</span>
        </div>
        <button
          aria-label="Dismiss announcement"
          className="opacity-70 hover:opacity-100"
          onClick={() => {
            setDismissedId(announcement.id);
            if (typeof window !== 'undefined') localStorage.setItem('dismissed_announcement_id', announcement.id);
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}


