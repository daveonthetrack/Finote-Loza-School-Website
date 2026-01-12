import Link from 'next/link';
import Image from 'next/image';
import { useSettings } from '@/lib/settingsContext';

export default function Hero() {
  const { settings } = useSettings();
  return (
    <section className="relative text-white">
      {settings?.banner_url ? (
        <div className="absolute inset-0">
          <Image src={settings.banner_url} alt="Banner" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-navy-900/60" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700" />
      )}
      <div className="container-page relative py-20 sm:py-28">
        <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs animate-fade-in">Welcome to</span>
        <h1 className="heading-hero mt-3 animate-fade-up">{settings?.school_name || 'Finote Loza School'}</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/90 animate-fade-up" style={{ animationDelay: '100ms' }}>{settings?.tagline || 'Excellence in Education'}</p>
        <div className="mt-8 flex gap-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <Link href="/admissions" className="btn-primary">Apply Now</Link>
          <Link href="/about" className="inline-flex items-center justify-center rounded-md border border-white/30 text-white px-5 py-2.5">Learn More</Link>
        </div>
      </div>
    </section>
  );
}


