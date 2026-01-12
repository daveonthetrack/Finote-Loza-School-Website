import Image from 'next/image';
import Layout from '@/components/Layout';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';

export default function Gallery({ photos = [], seo = {} }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [filteredPhotos, setFilteredPhotos] = useState(photos);

  const categories = [
    { id: 'all', name: 'All Photos', count: photos.length },
    { id: 'campus', name: 'Campus Life', count: photos.filter(p => p.filename?.toLowerCase().includes('campus') || p.caption?.toLowerCase().includes('campus')).length },
    { id: 'events', name: 'Events', count: photos.filter(p => p.filename?.toLowerCase().includes('event') || p.caption?.toLowerCase().includes('event')).length },
    { id: 'sports', name: 'Sports', count: photos.filter(p => p.filename?.toLowerCase().includes('sport') || p.caption?.toLowerCase().includes('sport')).length },
    { id: 'academics', name: 'Academics', count: photos.filter(p => p.filename?.toLowerCase().includes('academic') || p.caption?.toLowerCase().includes('academic')).length },
    { id: 'graduation', name: 'Graduation', count: photos.filter(p => p.filename?.toLowerCase().includes('graduation') || p.caption?.toLowerCase().includes('graduation')).length }
  ];

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPhotos(photos);
    } else {
      setFilteredPhotos(photos.filter(p => 
        p.filename?.toLowerCase().includes(selectedCategory) || 
        p.caption?.toLowerCase().includes(selectedCategory)
      ));
    }
  }, [selectedCategory, photos]);

  const openLightbox = (photo) => {
    setLightboxImage(photo);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    const currentIndex = filteredPhotos.findIndex(p => p.id === lightboxImage.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setLightboxImage(filteredPhotos[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredPhotos.findIndex(p => p.id === lightboxImage.id);
    const prevIndex = currentIndex === 0 ? filteredPhotos.length - 1 : currentIndex - 1;
    setLightboxImage(filteredPhotos[prevIndex]);
  };

  return (
    <Layout title={seo.title || 'Photo Gallery — Finote Loza School'} description={seo.description || 'Explore photos from Finote Loza School'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-700 text-white py-20">
        <div className="container-page">
          <Reveal>
            <h1 className="heading-section text-white">Photo Gallery</h1>
            <p className="mt-4 text-xl text-navy-100 max-w-3xl">
              Explore moments from our vibrant school community. 
              From classroom activities to special events, see what makes Finote Loza School special.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Category Filters */}
      <section className="container-page py-8">
        <Reveal>
          <div className="flex flex-wrap gap-2 justify-center">
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
      </section>

      {/* Photo Grid */}
      <section className="container-page pb-16">
        {filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo, idx) => (
              <Reveal key={photo.id} delay={idx * 50}>
                <div 
                  className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-soft cursor-pointer hover:shadow-lg transition group"
                  onClick={() => openLightbox(photo)}
                >
                  <Image 
                    src={photo.url} 
                    alt={photo.caption || photo.filename} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {photo.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <p className="text-white text-sm font-medium truncate">{photo.caption}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No photos found</h3>
              <p className="text-gray-500">No photos available in this category yet.</p>
            </div>
          </Reveal>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="relative">
              <Image
                src={lightboxImage.url}
                alt={lightboxImage.caption || lightboxImage.filename}
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              {lightboxImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
                  <p className="text-white text-lg font-medium">{lightboxImage.caption}</p>
                </div>
              )}
            </div>
            
            <div className="text-center mt-4 text-white">
              <p className="text-sm">
                {filteredPhotos.findIndex(p => p.id === lightboxImage.id) + 1} of {filteredPhotos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await supabase
    .from('photos')
    .select('id,filename,url,caption,created_at')
    .order('created_at', { ascending: false })
    .limit(100);

  const { data: seoRows } = await supabase
    .from('site_content')
    .select('key,value')
    .in('key', ['gallery.seo.title','gallery.seo.description']);
  const seo = {};
  (seoRows || []).forEach((r)=>{ if (r.key.endsWith('.title')) seo.title = r.value; if (r.key.endsWith('.description')) seo.description = r.value; });
  return {
    props: { photos: data ?? [], seo },
    revalidate: 120,
  };
}




