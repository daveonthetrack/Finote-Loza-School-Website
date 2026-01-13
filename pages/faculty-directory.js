import Layout from '@/components/Layout';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function FacultyDirectory() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [faculty, setFaculty] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFacultyData();
  }, []);

  async function loadFacultyData() {
    try {
      // Fetch teachers from database
      const { data: teachersData, error: teachersError } = await supabase
        .from('teachers')
        .select('*')
        .order('first_name');

      console.log('Teachers fetch result:', { teachersData, teachersError });

      if (teachersError) {
        console.error('Error fetching teachers:', teachersError);
        return;
      }

      if (!teachersData || teachersData.length === 0) {
        console.log('No teachers found in database');
        setFaculty([]);
        setDepartments([{ id: 'all', name: 'All Faculty', count: 0 }]);
        return;
      }

      // Transform teachers data to match the expected format
      const facultyData = teachersData?.map(teacher => ({
        id: teacher.id,
        name: `${teacher.first_name} ${teacher.last_name}`,
        title: teacher.title || 'Teacher',
        department: teacher.department?.toLowerCase().replace(/\s+/g, '-') || 'general',
        email: teacher.email,
        phone: teacher.phone || 'N/A',
        office: teacher.office || 'N/A',
        education: teacher.education || 'N/A',
        experience: teacher.experience || 'N/A',
        specialties: teacher.subjects 
          ? (typeof teacher.subjects === 'string' 
              ? teacher.subjects.split(',').map(s => s.trim())
              : Array.isArray(teacher.subjects)
              ? teacher.subjects
              : ['General Education'])
          : ['General Education'],
        bio: teacher.bio || `Experienced educator specializing in ${teacher.department || 'general education'}.`,
        image: teacher.photo_url || `https://ui-avatars.com/api/?name=${teacher.first_name}+${teacher.last_name}&background=f3f4f6&color=374151&size=300`
      })) || [];

      setFaculty(facultyData);

      // Generate departments from actual data
      const departmentCounts = {};
      facultyData.forEach(member => {
        const dept = member.department;
        departmentCounts[dept] = (departmentCounts[dept] || 0) + 1;
      });

      const departmentsList = [
        { id: 'all', name: 'All Faculty', count: facultyData.length }
      ];

      Object.entries(departmentCounts).forEach(([dept, count]) => {
        const deptName = dept.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        departmentsList.push({
          id: dept,
          name: deptName,
          count: count
        });
      });

      setDepartments(departmentsList);

    } catch (error) {
      console.error('Error loading faculty data:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredFaculty = faculty.filter(member => {
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesDepartment && matchesSearch;
  });

  return (
    <Layout>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-700 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading faculty directory...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-navy-900 to-navy-700 text-white py-20">
            <div className="container-page">
              <Reveal>
                <h1 className="heading-section text-white">Faculty Directory</h1>
                <p className="mt-4 text-xl text-navy-100 max-w-3xl">
                  Meet our dedicated faculty members who are committed to providing 
                  exceptional education and fostering student success.
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
                      placeholder="Search faculty..."
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
                  {departments.map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => setSelectedDepartment(dept.id)}
                      className={`px-4 py-2 rounded-lg transition ${
                        selectedDepartment === dept.id
                          ? 'bg-gold-700 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {dept.name} ({dept.count})
                    </button>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          {/* Faculty Grid */}
          <section className="container-page pb-16">
            {filteredFaculty.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredFaculty.map((member, idx) => (
                  <Reveal key={member.id} delay={idx * 100}>
                    <div className="card p-6 hover:shadow-lg transition">
                      <div className="flex flex-col items-center text-center mb-4">
                        <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                          <img 
                            src={member.image} 
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-semibold text-lg">{member.name}</h3>
                        <p className="text-gold-700 font-medium">{member.title}</p>
                        <p className="text-sm text-gray-600 capitalize">{member.department.replace('-', ' ')}</p>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="text-gray-600">{member.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-gray-600">{member.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-gray-600">{member.office}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-medium text-sm text-gray-700 mb-2">Specialties:</h4>
                        <div className="flex flex-wrap gap-1">
                          {member.specialties.map((specialty, specialtyIdx) => (
                            <span key={specialtyIdx} className="px-2 py-1 bg-gold-100 text-gold-700 text-xs rounded">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-gray-600">{member.bio}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal>
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No faculty found</h3>
                  <p className="text-gray-500">
                    {faculty.length === 0 
                      ? 'No teachers have been registered yet. Please contact the administrator to add faculty members.'
                      : 'No faculty members match your current search criteria.'
                    }
                  </p>
                </div>
              </Reveal>
            )}
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 py-16">
            <div className="container-page">
              <Reveal>
                <SectionHeading title="Contact Faculty" subtitle="Get in touch with our teaching staff" />
              </Reveal>
              
              <div className="mt-12 grid md:grid-cols-3 gap-8">
                <Reveal delay={0}>
                  <div className="card p-6 text-center">
                    <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Email Faculty</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Send an email directly to any faculty member using their school email address.
                    </p>
                    <p className="text-sm text-gold-700 font-medium">faculty@finoteloza.edu</p>
                  </div>
                </Reveal>
                
                <Reveal delay={100}>
                  <div className="card p-6 text-center">
                    <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Call Faculty</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Reach faculty members by phone during their office hours.
                    </p>
                    <p className="text-sm text-gold-700 font-medium">(555) 123-4567</p>
                  </div>
                </Reveal>
                
                <Reveal delay={200}>
                  <div className="card p-6 text-center">
                    <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Office Hours</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Visit faculty during their scheduled office hours for in-person meetings.
                    </p>
                    <p className="text-sm text-gold-700 font-medium">Mon-Fri 3:00-4:00 PM</p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
}
