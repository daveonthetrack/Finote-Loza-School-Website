import { useState } from 'react';
import Layout from '@/components/Layout';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { supabase } from '@/lib/supabaseClient';
import { useEffect } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    subject: '',
    message: '' 
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [content, setContent] = useState({});
  useEffect(() => {
    (async () => {
      const keys = [
        'contact.hero.title','contact.hero.subtitle',
        'contact.address_line1','contact.address_line2','contact.address_line3',
        'contact.phone_main','contact.email_info','contact.email_admissions',
        'contact.office_hours_line1','contact.office_hours_line2','contact.office_hours_line3'
      ];
      const { data } = await supabase.from('site_content').select('key,value').in('key', keys);
      const map = {};
      (data || []).forEach((r)=>{ map[r.key] = r.value; });
      setContent(map);
    })();
  }, []);

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Address',
      details: [
        content['contact.address_line1'] || '123 School Street',
        content['contact.address_line2'] || 'Education City, EC 12345',
        content['contact.address_line3'] || 'United States'
      ]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Phone',
      details: [
        content['contact.phone_main'] || '(555) 123-4567',
        'Main Office',
        (content['contact.office_hours_line1'] || 'Mon-Fri 8AM-5PM')
      ]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      details: [
        content['contact.email_info'] || 'info@finoteloza.edu',
        'General Inquiries',
        content['contact.email_admissions'] || 'admissions@finoteloza.edu'
      ]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Office Hours',
      details: [
        content['contact.office_hours_line1'] || 'Monday - Friday: 8:00 AM - 5:00 PM',
        content['contact.office_hours_line2'] || 'Saturday: 9:00 AM - 2:00 PM',
        content['contact.office_hours_line3'] || 'Sunday: Closed'
      ]
    }
  ];

  const departments = [
    { name: 'Admissions', email: 'admissions@finoteloza.edu', phone: '(555) 123-4568' },
    { name: 'Academic Affairs', email: 'academics@finoteloza.edu', phone: '(555) 123-4569' },
    { name: 'Student Services', email: 'students@finoteloza.edu', phone: '(555) 123-4570' },
    { name: 'Financial Aid', email: 'financial@finoteloza.edu', phone: '(555) 123-4571' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!form.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function onSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      await supabase.from('inquiries').insert({ 
        name: form.name, 
        email: form.email, 
        phone: form.phone,
        subject: form.subject,
        message: form.message 
      });
      setSent(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout title={(content['contact.seo.title']||'Contact — Finote Loza School')} description={(content['contact.seo.description']||'Get in touch with Finote Loza School')}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-700 text-white py-20">
        <div className="container-page">
          <Reveal>
            <h1 className="heading-section text-white">{content['contact.hero.title'] || 'Contact Us'}</h1>
            <p className="mt-4 text-xl text-navy-100 max-w-3xl">{content['contact.hero.subtitle'] || "We'd love to hear from you. Get in touch with our team for any questions, concerns, or to schedule a visit to our campus."}</p>
          </Reveal>
        </div>
      </section>

      {/* Contact Information */}
      <section className="container-page py-16">
        <Reveal>
          <SectionHeading title="Get in Touch" subtitle="Multiple ways to reach us" />
        </Reveal>
        
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, idx) => (
            <Reveal key={info.title} delay={idx * 100}>
              <div className="card p-6 text-center">
                <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gold-700">
                  {info.icon}
                </div>
                <h3 className="font-semibold text-lg mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, detailIdx) => (
                    <p key={detailIdx} className="text-gray-600 text-sm">{detail}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="bg-gray-50 py-16">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Reveal>
              <div>
                <h2 className="text-2xl font-bold text-navy-900 mb-6">Send us a Message</h2>
                {sent ? (
                  <div className="card p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600 mb-4">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                    <button 
                      onClick={() => setSent(false)}
                      className="btn-primary"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="card p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                        <input 
                          type="text"
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          }`}
                          value={form.name} 
                          onChange={(e) => setForm({...form, name: e.target.value})} 
                          required 
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input 
                          type="email"
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          value={form.email} 
                          onChange={(e) => setForm({...form, email: e.target.value})} 
                          required 
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input 
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                          value={form.phone} 
                          onChange={(e) => setForm({...form, phone: e.target.value})} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                        <select 
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 ${
                            errors.subject ? 'border-red-500' : 'border-gray-300'
                          }`}
                          value={form.subject} 
                          onChange={(e) => setForm({...form, subject: e.target.value})} 
                          required
                        >
                          <option value="">Select a subject</option>
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Admissions">Admissions</option>
                          <option value="Academic Questions">Academic Questions</option>
                          <option value="Financial Aid">Financial Aid</option>
                          <option value="Student Services">Student Services</option>
                          <option value="Campus Tour">Campus Tour</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                      <textarea 
                        rows="5"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={form.message} 
                        onChange={(e) => setForm({...form, message: e.target.value})} 
                        required 
                        placeholder="Please provide as much detail as possible..."
                      />
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Map & Departments */}
            <Reveal delay={100}>
              <div>
                <h2 className="text-2xl font-bold text-navy-900 mb-6">Find Us</h2>
                
                {/* Map Placeholder */}
                <div className="card p-6 mb-8">
                  <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-gray-500">Interactive Map</p>
                      <p className="text-sm text-gray-400">123 School Street, Education City</p>
                    </div>
                  </div>
                </div>

                {/* Departments */}
                <div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-4">Contact by Department</h3>
                  <div className="space-y-3">
                    {departments.map((dept, idx) => (
                      <div key={dept.name} className="card p-4">
                        <h4 className="font-semibold text-lg mb-2">{dept.name}</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {dept.email}
                          </p>
                          <p className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {dept.phone}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}




