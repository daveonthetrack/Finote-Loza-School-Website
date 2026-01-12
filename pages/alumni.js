import Layout from '@/components/Layout';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { useState } from 'react';

export default function AlumniSection() {
  const [activeTab, setActiveTab] = useState('spotlight');
  const [selectedClass, setSelectedClass] = useState('all');

  const classYears = [
    { year: 'all', name: 'All Classes', count: 150 },
    { year: '2023', name: 'Class of 2023', count: 25 },
    { year: '2022', name: 'Class of 2022', count: 28 },
    { year: '2021', name: 'Class of 2021', count: 22 },
    { year: '2020', name: 'Class of 2020', count: 30 },
    { year: '2019', name: 'Class of 2019', count: 26 },
    { year: '2018', name: 'Class of 2018', count: 19 }
  ];

  const alumniSpotlight = [
    {
      id: 1,
      name: 'Dr. Sarah Mitchell',
      classYear: '2015',
      currentRole: 'Pediatric Surgeon',
      organization: 'Johns Hopkins Hospital',
      education: 'M.D. from Harvard Medical School',
      achievement: 'Led groundbreaking research in pediatric cardiac surgery',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
      quote: 'Finote Loza School gave me the foundation to pursue my dreams in medicine. The rigorous academics and supportive teachers prepared me for the challenges ahead.'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      classYear: '2018',
      currentRole: 'Software Engineer',
      organization: 'Google',
      education: 'B.S. Computer Science from MIT',
      achievement: 'Developed AI algorithms used by millions of users worldwide',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      quote: 'The problem-solving skills I learned at Finote Loza School are still the foundation of my work today. The teachers encouraged curiosity and critical thinking.'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      classYear: '2020',
      currentRole: 'Environmental Lawyer',
      organization: 'Natural Resources Defense Council',
      education: 'J.D. from Yale Law School',
      achievement: 'Won landmark case protecting endangered species',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      quote: 'Finote Loza School instilled in me a passion for justice and environmental protection. The debate team and service learning programs shaped my career path.'
    },
    {
      id: 4,
      name: 'David Chen',
      classYear: '2017',
      currentRole: 'Investment Banker',
      organization: 'Goldman Sachs',
      education: 'MBA from Wharton School',
      achievement: 'Led $2B merger deal in renewable energy sector',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      quote: 'The analytical thinking and leadership skills I developed at Finote Loza School have been invaluable in my finance career.'
    }
  ];

  const recentAlumni = [
    {
      name: 'Alex Thompson',
      classYear: '2023',
      currentRole: 'Research Assistant',
      organization: 'Stanford University',
      education: 'Pursuing Ph.D. in Physics'
    },
    {
      name: 'Maria Santos',
      classYear: '2023',
      currentRole: 'Marketing Coordinator',
      organization: 'Nike',
      education: 'B.A. Marketing from UCLA'
    },
    {
      name: 'James Wilson',
      classYear: '2022',
      currentRole: 'Teacher',
      organization: 'Finote Loza School',
      education: 'M.Ed. from Columbia University'
    },
    {
      name: 'Lisa Park',
      classYear: '2022',
      currentRole: 'Data Scientist',
      organization: 'Microsoft',
      education: 'M.S. Data Science from Carnegie Mellon'
    },
    {
      name: 'Michael Brown',
      classYear: '2021',
      currentRole: 'Architect',
      organization: 'Foster + Partners',
      education: 'M.Arch from Harvard GSD'
    },
    {
      name: 'Jennifer Lee',
      classYear: '2021',
      currentRole: 'Journalist',
      organization: 'The New York Times',
      education: 'M.A. Journalism from Columbia'
    }
  ];

  const events = [
    {
      title: 'Alumni Reunion 2024',
      date: '2024-06-15',
      time: '6:00 PM',
      location: 'School Campus',
      description: 'Join us for our annual alumni reunion featuring networking, campus tours, and dinner.',
      type: 'reunion'
    },
    {
      title: 'Career Day 2024',
      date: '2024-03-20',
      time: '9:00 AM',
      location: 'Main Auditorium',
      description: 'Alumni share their career journeys with current students.',
      type: 'career'
    },
    {
      title: 'Homecoming Game',
      date: '2024-10-12',
      time: '7:00 PM',
      location: 'School Stadium',
      description: 'Cheer on our football team and reconnect with fellow alumni.',
      type: 'sports'
    }
  ];

  const getEventIcon = (type) => {
    switch (type) {
      case 'reunion':
        return (
          <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'career':
        return (
          <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
          </svg>
        );
      case 'sports':
        return (
          <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-700 text-white py-20">
        <div className="container-page">
          <Reveal>
            <h1 className="heading-section text-white">Alumni Network</h1>
            <p className="mt-4 text-xl text-navy-100 max-w-3xl">
              Stay connected with your Finote Loza School family. Discover what your fellow alumni 
              are accomplishing and join our vibrant community of graduates.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="container-page py-8">
        <Reveal>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'spotlight', name: 'Alumni Spotlight' },
              { id: 'recent', name: 'Recent Graduates' },
              { id: 'events', name: 'Alumni Events' },
              { id: 'network', name: 'Networking' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition ${
                  activeTab === tab.id
                    ? 'bg-gold-700 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Alumni Spotlight Tab */}
      {activeTab === 'spotlight' && (
        <section className="container-page pb-16">
          <Reveal>
            <SectionHeading title="Alumni Spotlight" subtitle="Celebrating our accomplished graduates" />
          </Reveal>
          
          <div className="mt-12 grid lg:grid-cols-2 gap-8">
            {alumniSpotlight.map((alumnus, idx) => (
              <Reveal key={alumnus.id} delay={idx * 100}>
                <div className="card p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 rounded-full overflow-hidden">
                        <img 
                          src={alumnus.image} 
                          alt={alumnus.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-navy-900 mb-2">{alumnus.name}</h3>
                      <p className="text-gold-700 font-semibold mb-1">Class of {alumnus.classYear}</p>
                      <p className="text-lg font-medium text-gray-700 mb-2">{alumnus.currentRole}</p>
                      <p className="text-gray-600 mb-3">{alumnus.organization}</p>
                      <p className="text-sm text-gray-500 mb-4">{alumnus.education}</p>
                      <div className="bg-gold-50 p-4 rounded-lg mb-4">
                        <h4 className="font-semibold text-gold-800 mb-2">Notable Achievement:</h4>
                        <p className="text-gold-700 text-sm">{alumnus.achievement}</p>
                      </div>
                      <blockquote className="text-gray-600 italic border-l-4 border-gold-500 pl-4">
                        "{alumnus.quote}"
                      </blockquote>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Recent Graduates Tab */}
      {activeTab === 'recent' && (
        <section className="container-page pb-16">
          <Reveal>
            <SectionHeading title="Recent Graduates" subtitle="Where our newest alumni are now" />
          </Reveal>
          
          <div className="mt-8 mb-8">
            <Reveal delay={100}>
              <div className="flex flex-wrap gap-2">
                {classYears.map((classYear) => (
                  <button
                    key={classYear.year}
                    onClick={() => setSelectedClass(classYear.year)}
                    className={`px-4 py-2 rounded-lg transition ${
                      selectedClass === classYear.year
                        ? 'bg-gold-700 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {classYear.name} ({classYear.count})
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentAlumni
              .filter(alumnus => selectedClass === 'all' || alumnus.classYear === selectedClass)
              .map((alumnus, idx) => (
                <Reveal key={`${alumnus.name}-${alumnus.classYear}`} delay={idx * 100}>
                  <div className="card p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-gold-700 font-semibold text-lg">
                          {alumnus.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{alumnus.name}</h3>
                        <p className="text-gold-700 font-medium text-sm">Class of {alumnus.classYear}</p>
                        <p className="text-gray-600 text-sm mt-1">{alumnus.currentRole}</p>
                        <p className="text-gray-500 text-xs mt-1">{alumnus.organization}</p>
                        <p className="text-gray-500 text-xs mt-2">{alumnus.education}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
          </div>
        </section>
      )}

      {/* Alumni Events Tab */}
      {activeTab === 'events' && (
        <section className="container-page pb-16">
          <Reveal>
            <SectionHeading title="Alumni Events" subtitle="Stay connected through our events" />
          </Reveal>
          
          <div className="mt-12 space-y-6">
            {events.map((event, idx) => (
              <Reveal key={event.title} delay={idx * 100}>
                <div className="card p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gold-100 rounded-lg flex items-center justify-center">
                        {getEventIcon(event.type)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-navy-900 mb-2">{event.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      <button className="btn-primary">
                        Register for Event
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Networking Tab */}
      {activeTab === 'network' && (
        <section className="container-page pb-16">
          <Reveal>
            <SectionHeading title="Alumni Networking" subtitle="Connect with fellow graduates" />
          </Reveal>
          
          <div className="mt-12 grid lg:grid-cols-2 gap-8">
            <Reveal delay={0}>
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-navy-900 mb-6">Join Our Alumni Network</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Professional Networking</h3>
                      <p className="text-gray-600 text-sm">Connect with alumni in your field and expand your professional network.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Career Mentorship</h3>
                      <p className="text-gray-600 text-sm">Get guidance from experienced alumni in your chosen career path.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0 0C10.832 19.477 9.246 20 7.5 20S4.168 19.477 3 18.253m0-13C4.168 4.477 5.754 4 7.5 4s3.332.477 4.5 1.253m0 13C13.168 19.477 14.754 20 16.5 20c1.746 0 3.332-.477 4.5-1.253m0-13C19.832 4.477 18.246 4 16.5 4c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Job Opportunities</h3>
                      <p className="text-gray-600 text-sm">Access exclusive job postings and internship opportunities from alumni companies.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button className="btn-primary w-full">
                    Join Alumni Network
                  </button>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={100}>
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-navy-900 mb-6">Stay Connected</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Alumni Newsletter</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Get monthly updates on alumni achievements, school news, and upcoming events.
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                      <button className="btn-primary">
                        Subscribe
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Social Media</h3>
                    <div className="flex gap-4">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                        Twitter
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Contact Alumni Office</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>Email: alumni@finoteloza.edu</p>
                      <p>Phone: (555) 123-4577</p>
                      <p>Office Hours: Mon-Fri 9:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </Layout>
  );
}
