import Link from 'next/link';
import Image from 'next/image';
import { useSettings } from '@/lib/settingsContext';
import { useState } from 'react';

export default function Navbar() {
  const { settings } = useSettings();
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-navy-700/95 backdrop-blur text-white sticky top-0 z-40">
      <div className="container-page flex items-center justify-between py-3">
                <Link href="/" className="flex items-center gap-3">
                  <span className="relative block h-10 w-[132px]">
                    <span className="absolute -bottom-12 left-1 block h-[110px] w-[110px] rounded-full overflow-hidden bg-white">
                      {settings?.logo_url ? (
                        <Image src={settings.logo_url} alt="Finote Loza School" fill className="object-cover" priority />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center bg-gold-500 text-navy-900 font-semibold text-3xl">FL</span>
                      )}
                    </span>
                  </span>
                  <span className="font-display text-xl">{settings?.school_name || 'Finote Loza School'}</span>
                </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/about" className="hover:text-gold-300">About</Link>
          <Link href="/admissions" className="hover:text-gold-300">Admissions</Link>
          <Link href="/online-application" className="hover:text-gold-300">Apply</Link>
          <Link href="/faculty-directory" className="hover:text-gold-300">Faculty</Link>
          <Link href="/news" className="hover:text-gold-300">News</Link>
          <Link href="/gallery" className="hover:text-gold-300">Gallery</Link>
          <Link href="/calendar" className="hover:text-gold-300">Calendar</Link>
          <Link href="/contact" className="hover:text-gold-300">Contact</Link>
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-md px-3 py-2 ring-1 ring-white/20 hover:bg-white/10"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-navy-800 text-white border-t border-white/10">
          <div className="container-page py-3 flex items-center justify-between">
            <span className="font-display">Menu</span>
            <button
              className="inline-flex items-center justify-center rounded-md px-3 py-2 ring-1 ring-white/20 hover:bg-white/10"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="container-page grid gap-2 pb-4 text-sm">
            <Link onClick={() => setOpen(false)} href="/about" className="hover:text-gold-300">About</Link>
            <Link onClick={() => setOpen(false)} href="/admissions" className="hover:text-gold-300">Admissions</Link>
            <Link onClick={() => setOpen(false)} href="/online-application" className="hover:text-gold-300">Apply</Link>
            <Link onClick={() => setOpen(false)} href="/faculty-directory" className="hover:text-gold-300">Faculty</Link>
            <Link onClick={() => setOpen(false)} href="/news" className="hover:text-gold-300">News</Link>
            <Link onClick={() => setOpen(false)} href="/gallery" className="hover:text-gold-300">Gallery</Link>
            <Link onClick={() => setOpen(false)} href="/calendar" className="hover:text-gold-300">Calendar</Link>
            <Link onClick={() => setOpen(false)} href="/contact" className="hover:text-gold-300">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}


