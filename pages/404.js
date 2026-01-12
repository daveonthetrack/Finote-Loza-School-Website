import Layout from '@/components/Layout';
import Reveal from '@/components/Reveal';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <Layout>
      <section className="min-h-[70vh] bg-gradient-to-br from-navy-900 to-navy-700 text-white flex items-center">
        <div className="container-page text-center">
          <Reveal>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"/></svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold">Page not found</h1>
            <p className="mt-4 text-lg text-navy-100 max-w-2xl mx-auto">The page you’re looking for doesn’t exist or has been moved.</p>
            <div className="mt-8">
              <Link href="/" className="btn-primary">Go back home</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}


