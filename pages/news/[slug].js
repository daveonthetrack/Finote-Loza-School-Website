import Layout from '@/components/Layout';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

export default function ArticleDetail({ article }) {
  if (!article) {
    return (
      <Layout>
        <div className="container-page py-16"><p>Article not found.</p></div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="container-page py-12 prose max-w-3xl">
        <h1 className="font-display !mb-2">{article.title}</h1>
        <p className="text-sm text-gray-500 !mt-0">{article.published_at ? new Date(article.published_at).toLocaleDateString() : ''}</p>
        {article.cover_url && (
          <div className="mt-6">
            <Image src={article.cover_url} width={1200} height={700} alt={article.title} className="rounded-lg" />
          </div>
        )}
        <div className="mt-6 text-gray-800" dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const { data } = await supabase.from('articles').select('slug');
  const paths = (data ?? []).map((a) => ({ params: { slug: a.slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { data } = await supabase
    .from('articles')
    .select('id,title,slug,excerpt,content,cover_url,author,published_at')
    .eq('slug', params.slug)
    .single();

  if (!data) {
    return { notFound: true, revalidate: 60 };
  }

  return {
    props: { article: data },
    revalidate: 60,
  };
}








