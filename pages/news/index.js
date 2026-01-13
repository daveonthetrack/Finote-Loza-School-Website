import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';

export default function NewsPage({ articles: initialArticles = [], seo = {} }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [articles, setArticles] = useState(initialArticles);
  const [filteredArticles, setFilteredArticles] = useState(initialArticles);
  const [loading, setLoading] = useState(true);

  // Always fetch articles on mount to get latest data (client-side)
  useEffect(() => {
    async function fetchArticles() {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('id,title,slug,excerpt,cover_url,category,published_at')
          .not('published_at', 'is', null)
          .order('published_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching articles:', error);
          // If fetch fails, use initial articles as fallback
          if (initialArticles.length > 0) {
            setArticles(initialArticles);
            setFilteredArticles(initialArticles);
          }
        } else if (data) {
          console.log('Fetched articles:', data.length, data);
          setArticles(data || []);
          setFilteredArticles(data || []);
        }
      } catch (err) {
        console.error('Unexpected error fetching articles:', err);
        // Fallback to initial articles
        if (initialArticles.length > 0) {
          setArticles(initialArticles);
          setFilteredArticles(initialArticles);
        }
      } finally {
        setLoading(false);
      }
    }
    // Always fetch to get latest articles
    fetchArticles();
  }, []);

  const categories = [
    { id: 'all', name: 'All News', count: articles.length },
    { id: 'academic', name: 'Academic', count: articles.filter(a => a.category === 'academic').length },
    { id: 'events', name: 'Events', count: articles.filter(a => a.category === 'events').length },
    { id: 'sports', name: 'Sports', count: articles.filter(a => a.category === 'sports').length },
    { id: 'announcements', name: 'Announcements', count: articles.filter(a => a.category === 'announcements').length },
    { id: 'community', name: 'Community', count: articles.filter(a => a.category === 'community').length }
  ];

  useEffect(() => {
    let filtered = articles;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  }, [searchTerm, selectedCategory, articles]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString([], {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout title={seo.title || 'School News — Finote Loza School'} description={seo.description || 'Latest news and updates from Finote Loza School'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-700 text-white py-20">
        <div className="container-page">
          <Reveal>
            <h1 className="heading-section text-white">School News</h1>
            <p className="mt-4 text-xl text-navy-100 max-w-3xl">
              Stay informed about the latest happenings, achievements, and important updates 
              from our school community.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="container-page py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          <Reveal>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search news articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition ${
                    selectedCategory === category.id
                      ? 'bg-gold-700 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured Article */}
      {filteredArticles.length > 0 && (
        <section className="container-page pb-8">
          <Reveal>
            <div className="card overflow-hidden">
              <Link href={`/news/${filteredArticles[0].slug}`} className="block">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto">
                    {filteredArticles[0].cover_url ? (
                      <Image 
                        src={filteredArticles[0].cover_url} 
                        alt={filteredArticles[0].title} 
                        fill 
                        className="object-cover" 
                      />
                    ) : (
                      <div className="h-full bg-gradient-to-br from-gold-100 to-navy-100 flex items-center justify-center">
                        <span className="text-gray-500">Featured Article</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-gold-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <span>{formatDate(filteredArticles[0].published_at)}</span>
                      {filteredArticles[0].category && (
                        <>
                          <span>•</span>
                          <span className="capitalize">{filteredArticles[0].category}</span>
                        </>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-navy-900 mb-4 hover:text-gold-700 transition">
                      {filteredArticles[0].title}
                    </h2>
                    <p className="text-gray-600 mb-4">{filteredArticles[0].excerpt}</p>
                    <span className="text-gold-700 font-medium hover:underline">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </Reveal>
        </section>
      )}

      {/* News Grid */}
      <section className="container-page pb-16">
        {loading ? (
          <Reveal>
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-700 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading articles...</p>
            </div>
          </Reveal>
        ) : filteredArticles.length > 1 ? (
          <>
            <Reveal>
              <h2 className="text-2xl font-bold text-navy-900 mb-8">Latest News</h2>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.slice(1).map((article, idx) => (
                <Reveal key={article.id} delay={idx * 100}>
                  <Link href={`/news/${article.slug}`} className="card overflow-hidden hover:shadow-lg transition group">
                    <div className="relative h-48 overflow-hidden">
                      {article.cover_url ? (
                        <Image 
                          src={article.cover_url} 
                          alt={article.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                      ) : (
                        <div className="h-full bg-gradient-to-br from-gold-100 to-navy-100 flex items-center justify-center">
                          <span className="text-gray-500">News Article</span>
                        </div>
                      )}
                      {article.category && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-white/90 text-gray-700 px-2 py-1 rounded text-xs font-medium capitalize">
                            {article.category}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{formatDate(article.published_at)}</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-3 group-hover:text-gold-700 transition">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                      <span className="text-gold-700 font-medium text-sm hover:underline">
                        Read More →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </>
        ) : filteredArticles.length === 1 ? (
          <Reveal>
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No additional articles</h3>
              <p className="text-gray-500">Only the featured article matches your current filters.</p>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No articles found</h3>
              <p className="text-gray-500">No articles match your current search or filter criteria.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="mt-4 btn-primary"
              >
                Clear Filters
              </button>
            </div>
          </Reveal>
        )}
      </section>

      {/* Newsletter Signup */}
      <section className="bg-navy-900 text-white py-16">
        <div className="container-page">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-xl text-navy-100 mb-8">
                Subscribe to our newsletter to receive the latest news and updates directly in your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-gold-500 focus:outline-none"
                />
                <button className="btn-primary bg-gold-700 hover:bg-gold-600">
                  Subscribe
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await supabase
    .from('articles')
    .select('id,title,slug,excerpt,cover_url,category,published_at')
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false });

  const { data: seoRows } = await supabase
    .from('site_content')
    .select('key,value')
    .in('key', ['news.seo.title','news.seo.description']);
  const seo = {};
  (seoRows || []).forEach((r)=>{ if (r.key.endsWith('.title')) seo.title = r.value; if (r.key.endsWith('.description')) seo.description = r.value; });
  return {
    props: { articles: data ?? [], seo },
    revalidate: 60,
  };
}




