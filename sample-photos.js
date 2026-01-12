// Sample photos data for testing the gallery
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

// This script can be run in the browser console to add sample photos
// Copy and paste this into your browser console while on the admin photos page:

/*
const { createClient } = supabase;
const supabaseUrl = 'https://qahogrslrrvlrgdqyxpe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhaG9ncnNscnJ2bHJnZHF5eHBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNDQ2NzksImV4cCI6MjA3NTgyMDY3OX0.g4PHGH68yJ9qP-oNu-j_wilT6nnWblHjwpx40N6hojU';

const supabaseClient = createClient(supabaseUrl, supabaseKey);

async function addSamplePhotos() {
  for (const photo of samplePhotos) {
    const { error } = await supabaseClient
      .from('photos')
      .insert(photo);
    
    if (error) {
      console.error('Error adding photo:', error);
    } else {
      console.log('Added photo:', photo.filename);
    }
  }
}

addSamplePhotos();
*/
