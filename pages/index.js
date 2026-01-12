import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import SectionHeading from '@/components/SectionHeading';
import NewsletterForm from '@/components/NewsletterForm';
import SlideLoginButton from '@/components/SlideLoginButton';
import Reveal from '@/components/Reveal';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Home({ latestArticles = [], upcomingEvents = [], photos = [], content = {}, seo = {} }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Filter photos that have valid URLs
  const validPhotos = photos.filter(photo => photo.url && photo.url.trim() !== '');
  
  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    if (validPhotos.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % validPhotos.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [validPhotos.length]);

  // Preload images
  useEffect(() => {
    if (validPhotos.length > 0) {
      const imagePromises = validPhotos.map(photo => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = photo.url;
        });
      });
      
      Promise.all(imagePromises)
        .then(() => setIsLoaded(true))
        .catch(() => setIsLoaded(true)); // Still show even if some images fail
    } else {
      setIsLoaded(true);
    }
  }, [validPhotos]);

  return (
    <Layout title={seo.title || 'Finote Loza School'} description={seo.description || 'Excellence in Education'}>
      {/* Hero Section with Photo Slideshow */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images */}
        {validPhotos.length > 0 ? (
          <>
            {validPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={photo.url}
                  alt={photo.caption || photo.filename || 'School photo'}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700"></div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/80 via-navy-800/60 to-gold-900/30"></div>
        
        {/* Content */}
        <div className="container-page relative z-10 text-center">
          <Reveal>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight text-white">
              {content['home.hero.title'] || 'Welcome to '}<span className="text-gold-400">{content['home.hero.highlight'] || 'Finote Loza School'}</span>
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto mb-8 leading-relaxed">
              {content['home.hero.subtitle'] || 'Nurturing lifelong learners, courageous risk-takers, and joyous peacemakers. Excellence in education through innovation, community, and character.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/admissions" className="bg-gold-600 hover:bg-gold-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition">
                Begin Your Journey
              </Link>
              <Link href="/about" className="border-2 border-white text-white hover:bg-white hover:text-navy-900 px-8 py-4 rounded-lg font-medium text-lg transition">
                Learn More
              </Link>
            </div>
          </Reveal>
        </div>
        
        {/* Slide Indicators */}
        {validPhotos.length > 1 && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2">
            {validPhotos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-gold-400 scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <SlideLoginButton />

      {/* Core Values Section */}
      <section className="py-20 bg-white">
        <div className="container-page">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-navy-900 mb-6">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These fundamental principles guide everything we do at Finote Loza School
              </p>
            </div>
          </Reveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Joy', description: 'Creating a joyful learning environment where students discover their passions and develop a lifelong love of learning.' },
              { title: 'Belonging', description: 'Fostering an inclusive community where every student feels valued, respected, and supported.' },
              { title: 'Exploration', description: 'Encouraging curiosity and discovery through hands-on learning and innovative teaching methods.' },
              { title: 'Engagement', description: 'Inspiring active participation in learning, community service, and personal growth.' }
            ].map((value, idx) => (
              <Reveal key={value.title} delay={idx * 100}>
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-gold-700">{value.title[0]}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* School Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-page">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-navy-900 mb-6">
                At a Glance
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover what makes Finote Loza School a special place for learning and growth
              </p>
            </div>
          </Reveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '15', label: 'Average Class Size', description: 'Small classes ensure personalized attention' },
              { number: '25', label: 'Acre Campus', description: 'Beautiful grounds with modern facilities' },
              { number: '35%', label: 'Students Receiving Financial Aid', description: 'Committed to accessibility and diversity' },
              { number: '12:1', label: 'Student to Teacher Ratio', description: 'Optimal learning environment' }
            ].map((stat, idx) => (
              <Reveal key={stat.label} delay={idx * 100}>
                <div className="text-center p-6 bg-white rounded-xl shadow-soft">
                  <div className="text-5xl font-display font-bold text-gold-700 mb-2">{stat.number}</div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">{stat.label}</h3>
                  <p className="text-sm text-gray-600">{stat.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Programs Section */}
      <section className="py-20 bg-white">
        <div className="container-page">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-navy-900 mb-6">
                Our Academic Program
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Rigorous academics combined with innovative teaching methods to prepare students for success
              </p>
            </div>
          </Reveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: 'Elementary School', 
                description: 'Building strong foundations in reading, writing, mathematics, and critical thinking.',
                features: ['Literacy & Language Arts', 'Mathematics & Science', 'Social Studies', 'Arts & Music']
              },
              { 
                title: 'Middle School', 
                description: 'Expanding knowledge and developing independence through challenging coursework.',
                features: ['Advanced Mathematics', 'Literature & Composition', 'Laboratory Sciences', 'World Languages']
              },
              { 
                title: 'High School', 
                description: 'College-preparatory curriculum with AP courses and specialized electives.',
                features: ['Advanced Placement', 'College Counseling', 'Leadership Programs', 'Community Service']
              }
            ].map((program, idx) => (
              <Reveal key={program.title} delay={idx * 100}>
                <div className="card p-8 hover:shadow-lg transition">
                  <h3 className="text-2xl font-semibold text-navy-900 mb-4">{program.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
                  <ul className="space-y-2">
                    {program.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 text-gold-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-page">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-navy-900 mb-6">
                What Our Community Says
              </h2>
            </div>
          </Reveal>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Reveal delay={0}>
              <div className="card p-8">
                <div className="mb-6">
                  <svg className="w-8 h-8 text-gold-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>
                <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">
                  "One of the dimensions of Finote Loza School that I most appreciate is the building of community through the recognition and embrace of each individual, and of each person's capacity for experiencing and sharing truth."
                </blockquote>
                <cite className="text-sm font-semibold text-navy-900">From a Finote Loza Parent</cite>
              </div>
            </Reveal>
            
            <Reveal delay={100}>
              <div className="card p-8">
                <div className="mb-6">
                  <svg className="w-8 h-8 text-gold-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>
                <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">
                  "I cannot begin to express how much I have grown during my time in this community. I have learned how to make connections with people, how to take care of my environment, and how not to apologize for using my voice."
                </blockquote>
                <cite className="text-sm font-semibold text-navy-900">From a Finote Loza Graduate</cite>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 bg-white">
        <div className="container-page">
          <div className="flex items-end justify-between mb-16">
            <Reveal>
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-navy-900 mb-4">
                  Recent News
                </h2>
                <p className="text-xl text-gray-600">Stay updated with the latest from our school community</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <Link href="/news" className="text-navy-700 hover:text-navy-900 font-medium">
                View all news →
              </Link>
            </Reveal>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {latestArticles.map((article, idx) => (
              <Reveal key={article.id} delay={idx * 100}>
                <Link href={`/news/${article.slug}`} className="card overflow-hidden hover:shadow-lg transition group">
                  {article.cover_url ? (
                    <div className="relative h-48 overflow-hidden">
                      <Image 
                        src={article.cover_url} 
                        alt={article.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-gold-100 to-navy-100" />
                  )}
                  <div className="p-6">
                    <div className="text-sm text-gold-700 font-medium mb-2">
                      {new Date(article.published_at).toLocaleDateString()}
                    </div>
                    <h3 className="font-semibold text-xl text-navy-900 mb-3 group-hover:text-gold-700 transition">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{article.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-page">
          <div className="flex items-end justify-between mb-16">
            <Reveal>
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-navy-900 mb-4">
                  Upcoming Events
                </h2>
                <p className="text-xl text-gray-600">Join us for these exciting upcoming events</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <Link href="/calendar" className="text-navy-700 hover:text-navy-900 font-medium">
                View calendar →
              </Link>
            </Reveal>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, idx) => (
              <Reveal key={event.id} delay={idx * 100}>
                <div className="card p-6 hover:shadow-lg transition">
                  <div className="flex items-start gap-4">
                    <div className="bg-gold-100 text-gold-700 p-3 rounded-lg text-center min-w-[60px]">
                      <div className="text-sm font-medium">
                        {new Date(event.start_at).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div className="text-lg font-bold">
                        {new Date(event.start_at).getDate()}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-navy-900 mb-2">{event.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{event.location}</p>
                      <p className="text-gray-700">{event.description}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-navy-900 to-navy-700 text-white">
        <div className="container-page text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-navy-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover how Finote Loza School can help your child thrive academically, socially, and personally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/admissions" className="bg-gold-600 hover:bg-gold-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition">
                Apply Now
              </Link>
              <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-navy-900 px-8 py-4 rounded-lg font-medium text-lg transition">
                Schedule a Visit
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container-page">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-navy-900 mb-4">
                Stay Connected
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Subscribe to our newsletter for updates, events, and insights from our school community.
              </p>
              <NewsletterForm />
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data: articles } = await supabase
    .from('articles')
    .select('id,title,slug,excerpt,cover_url,published_at')
    .order('published_at', { ascending: false })
    .limit(3);

  const now = new Date().toISOString();
  const { data: events } = await supabase
    .from('events')
    .select('id,title,description,location,start_at')
    .gte('start_at', now)
    .order('start_at', { ascending: true })
    .limit(3);

  const { data: photos } = await supabase
    .from('photos')
    .select('id,url,caption,filename,created_at')
    .order('created_at', { ascending: false })
    .limit(12);

  const keys = ['home.hero.title','home.hero.highlight','home.hero.subtitle'];
  const { data: contentRows } = await supabase
    .from('site_content')
    .select('key,value')
    .in('key', keys);
  const content = {};
  (contentRows || []).forEach((r) => { content[r.key] = r.value; });

  const { data: seoRows } = await supabase
    .from('site_content')
    .select('key,value')
    .in('key', ['home.seo.title','home.seo.description']);
  const seo = {};
  (seoRows || []).forEach((r) => { if (r.key.endsWith('.title')) seo.title = r.value; if (r.key.endsWith('.description')) seo.description = r.value; });

  return { props: { latestArticles: articles ?? [], upcomingEvents: events ?? [], photos: photos ?? [], content, seo }, revalidate: 60 };
}


