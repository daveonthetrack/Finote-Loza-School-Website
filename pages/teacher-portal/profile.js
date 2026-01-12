import TeacherLayout from '@/components/TeacherLayout';
import TeacherGuard from '@/components/TeacherGuard';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';

export default function TeacherProfile() {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    department: '',
    subjects: [],
    bio: ''
  });

  useEffect(() => {
    loadTeacherProfile();
  }, []);

  async function loadTeacherProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: teacherData } = await supabase
        .from('teachers')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (teacherData) {
        setTeacher(teacherData);
        setProfileData({
          first_name: teacherData.first_name || '',
          last_name: teacherData.last_name || '',
          email: teacherData.email || '',
          phone: teacherData.phone || '',
          department: teacherData.department || '',
          subjects: teacherData.subjects || [],
          bio: teacherData.bio || ''
        });
      }
    } catch (error) {
      console.error('Error loading teacher profile:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `teacher-photos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('teacher-photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('teacher-photos')
        .getPublicUrl(filePath);

      // Update teacher profile with new photo URL
      const { error: updateError } = await supabase
        .from('teachers')
        .update({ photo_url: publicUrl })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      // Update local state
      setTeacher(prev => ({ ...prev, photo_url: publicUrl }));
      alert('Profile picture updated successfully!');

    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Error uploading photo: ' + error.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleProfileUpdate(e) {
    e.preventDefault();
    setUpdating(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('teachers')
        .update({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          email: profileData.email,
          phone: profileData.phone,
          department: profileData.department,
          subjects: profileData.subjects,
          bio: profileData.bio
        })
        .eq('user_id', user.id);

      if (error) throw error;

      // Update local state
      setTeacher(prev => ({ ...prev, ...profileData }));
      alert('Profile updated successfully!');

    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile: ' + error.message);
    } finally {
      setUpdating(false);
    }
  }

  function addSubject() {
    const newSubject = prompt('Enter subject name:');
    if (newSubject && !profileData.subjects.includes(newSubject)) {
      setProfileData(prev => ({
        ...prev,
        subjects: [...prev.subjects, newSubject]
      }));
    }
  }

  function removeSubject(subjectToRemove) {
    setProfileData(prev => ({
      ...prev,
      subjects: prev.subjects.filter(subject => subject !== subjectToRemove)
    }));
  }

  if (loading) {
    return (
      <TeacherGuard>
        <TeacherLayout>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-700 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </TeacherLayout>
      </TeacherGuard>
    );
  }

  return (
    <TeacherGuard>
      <TeacherLayout>
        <div className="py-2">
          <Reveal>
            <SectionHeading title="Profile Settings" subtitle="Manage your teacher profile and information" />
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Profile Picture Section */}
            <Reveal delay={100}>
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Picture</h2>
                
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4">
                    {teacher?.photo_url ? (
                      <img 
                        src={teacher.photo_url} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl font-semibold">
                        {(teacher?.first_name?.[0] || 'T')}{(teacher?.last_name?.[0] || 'R')}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <label className="cursor-pointer">
                      <span className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-lg font-medium transition inline-block">
                        {uploading ? 'Uploading...' : 'Change Photo'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      JPG, PNG or GIF. Max size 5MB.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Profile Information Section */}
            <Reveal delay={200}>
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
                
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-md border-gray-300"
                        value={profileData.first_name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, first_name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-md border-gray-300"
                        value={profileData.last_name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, last_name: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-md border-gray-300"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full rounded-md border-gray-300"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <select
                      className="w-full rounded-md border-gray-300"
                      value={profileData.department}
                      onChange={(e) => setProfileData(prev => ({ ...prev, department: e.target.value }))}
                    >
                      <option value="">Select Department</option>
                      <option value="mathematics">Mathematics</option>
                      <option value="science">Science</option>
                      <option value="english">English</option>
                      <option value="history">History</option>
                      <option value="art">Art</option>
                      <option value="music">Music</option>
                      <option value="physical-education">Physical Education</option>
                      <option value="administration">Administration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subjects
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {profileData.subjects.map((subject, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm flex items-center gap-2"
                        >
                          {subject}
                          <button
                            type="button"
                            onClick={() => removeSubject(subject)}
                            className="text-gold-600 hover:text-gold-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={addSubject}
                      className="text-gold-600 hover:text-gold-700 text-sm font-medium"
                    >
                      + Add Subject
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      className="w-full rounded-md border-gray-300"
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={updating}
                      className="bg-gold-600 hover:bg-gold-700 text-white px-6 py-2 rounded-lg font-medium transition disabled:opacity-50"
                    >
                      {updating ? 'Updating...' : 'Update Profile'}
                    </button>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>

          {/* Account Information */}
          <Reveal delay={300}>
            <div className="card p-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Teacher ID</h3>
                  <p className="text-gray-600">{teacher?.teacher_id || 'Not assigned'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Employee Type</h3>
                  <p className="text-gray-600 capitalize">{teacher?.employee_type || 'Not specified'}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Hire Date</h3>
                  <p className="text-gray-600">
                    {teacher?.hire_date ? new Date(teacher.hire_date).toLocaleDateString() : 'Not specified'}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Member Since</h3>
                  <p className="text-gray-600">
                    {teacher?.created_at ? new Date(teacher.created_at).toLocaleDateString() : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </TeacherLayout>
    </TeacherGuard>
  );
}
