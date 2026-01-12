import Layout from '@/components/Layout';
import Reveal from '@/components/Reveal';
import Link from 'next/link';

export default function ErrorPage() {
  return (
    <Layout>
      <section className="min-h-[70vh] bg-gradient-to-br from-navy-900 to-navy-700 text-white flex items-center">
        <div className="container-page text-center">
          <Reveal>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636a9 9 0 11-12.728 12.728A9 9 0 0118.364 5.636zM12 9v4m0 4h.01"/></svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold">Something went wrong</h1>
            <p className="mt-4 text-lg text-navy-100 max-w-2xl mx-auto">An unexpected error occurred. Please try again in a moment.</p>
            <div className="mt-8">
              <Link href="/" className="btn-primary">Go back home</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}


