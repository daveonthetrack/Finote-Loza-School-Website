import AdminLayout from '@/components/AdminLayout';
import AdminGuard from '@/components/AdminGuard';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AddSamplePhotos() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const samplePhotos = [
    {
      filename: 'campus_main_building.jpg',
      url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
      caption: 'Main campus building with beautiful architecture'
    },
    {
      filename: 'graduation_ceremony.jpg',
      url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
      caption: 'Graduation ceremony celebration'
    },
    {
      filename: 'sports_basketball_game.jpg',
      url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop',
      caption: 'Basketball team in action'
    },
    {
      filename: 'academic_science_lab.jpg',
      url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop',
      caption: 'Students working in the science laboratory'
    },
    {
      filename: 'event_school_fair.jpg',
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      caption: 'Annual school fair and festival'
    },
    {
      filename: 'campus_library.jpg',
      url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
      caption: 'Modern library with extensive book collection'
    },
    {
      filename: 'sports_soccer_team.jpg',
      url: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=600&fit=crop',
      caption: 'Soccer team celebrating victory'
    },
    {
      filename: 'academic_art_class.jpg',
      url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
      caption: 'Students creating art in the studio'
    },
    {
      filename: 'event_music_concert.jpg',
      url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      caption: 'School music concert performance'
    },
    {
      filename: 'graduation_cap_toss.jpg',
      url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
      caption: 'Graduates celebrating with cap toss'
    },
    {
      filename: 'campus_cafeteria.jpg',
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      caption: 'Students enjoying lunch in the cafeteria'
    },
    {
      filename: 'sports_track_field.jpg',
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      caption: 'Track and field athletes training'
    }
  ];

  async function addSamplePhotos() {
    setLoading(true);
    setMessage('');
    
    try {
      let successCount = 0;
      let errorCount = 0;

      for (const photo of samplePhotos) {
        const { error } = await supabase
          .from('photos')
          .insert(photo);
        
        if (error) {
          console.error('Error adding photo:', error);
          errorCount++;
        } else {
          successCount++;
        }
      }

      setMessage(`Successfully added ${successCount} photos. ${errorCount} errors occurred.`);
    } catch (error) {
      setMessage('Error adding sample photos: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="py-2">
          <h1 className="heading-section">Add Sample Photos</h1>
          <p className="mt-4 text-gray-600">
            This will add sample photos to the gallery for testing purposes.
          </p>
          
          <div className="mt-6 card p-6">
            <h2 className="text-lg font-semibold mb-4">Sample Photos Preview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {samplePhotos.slice(0, 8).map((photo, idx) => (
                <div key={idx} className="relative">
                  <img 
                    src={photo.url} 
                    alt={photo.caption}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <div className="mt-1 text-xs text-gray-600 truncate">
                    {photo.filename}
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={addSamplePhotos}
              disabled={loading}
              className="btn-primary disabled:opacity-50"
            >
              {loading ? 'Adding Photos...' : `Add ${samplePhotos.length} Sample Photos`}
            </button>
            
            {message && (
              <div className={`mt-4 p-3 rounded-lg ${
                message.includes('Successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
