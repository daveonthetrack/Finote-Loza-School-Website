import Link from 'next/link';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function SlideLoginButton() {
  return (
    <div className="fixed top-1/2 right-0 -translate-y-1/2 z-50 group">
      <Link
        href="/admin/login"
        className="flex items-center gap-2 bg-navy-700 text-white px-4 py-2 rounded-l-full shadow-soft translate-x-24 group-hover:translate-x-0 transition-transform duration-300 hover:bg-navy-800"
        aria-label="Admin Login"
      >
        <ArrowRightOnRectangleIcon className="h-5 w-5" />
        <span className="text-sm font-medium">Admin Login</span>
      </Link>
    </div>
  );
}


