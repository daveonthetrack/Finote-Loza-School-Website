import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  async function subscribe(e) {
    e.preventDefault();
    setError('');
    const { error: insertError } = await supabase.from('subscribers').insert({ email });
    if (insertError) { setError('Could not subscribe.'); return; }
    setDone(true);
  }

  if (done) return <p className="text-green-700">Thanks for subscribing!</p>;

  return (
    <form onSubmit={subscribe} className="flex gap-3">
      <input type="email" required placeholder="Your email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2" />
      <button className="btn-primary">Subscribe</button>
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </form>
  );
}


