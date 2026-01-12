import Layout from '@/components/Layout';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Admissions({ content = {}, seo = {} }) {
  const [activeTab, setActiveTab] = useState('requirements');

  const requirements = [
    { grade: 'Kindergarten', age: '5 years old by Sept 1', documents: ['Birth Certificate', 'Immunization Records', 'Previous School Records'] },
    { grade: 'Elementary (1-5)', age: '6-10 years old', documents: ['Birth Certificate', 'Immunization Records', 'Previous School Records', 'Teacher Recommendation'] },
    { grade: 'Middle School (6-8)', age: '11-13 years old', documents: ['Birth Certificate', 'Immunization Records', 'Previous School Records', 'Teacher Recommendations (2)', 'Student Essay'] },
    { grade: 'High School (9-12)', age: '14-17 years old', documents: ['Birth Certificate', 'Immunization Records', 'Previous School Records', 'Teacher Recommendations (2)', 'Student Essay', 'Standardized Test Scores'] }
  ];

  const processSteps = [
    { step: 1, title: 'Submit Application', description: 'Complete the online application form and upload required documents', duration: '1-2 weeks' },
    { step: 2, title: 'Review Process', description: 'Our admissions team reviews your application and supporting materials', duration: '2-3 weeks' },
    { step: 3, title: 'Interview & Tour', description: 'Schedule a family interview and campus tour with our admissions team', duration: '1 week' },
    { step: 4, title: 'Decision & Enrollment', description: 'Receive admission decision and complete enrollment paperwork', duration: '1-2 weeks' }
  ];

  const tuitionInfo = [
    { grade: 'Kindergarten', tuition: '$12,500', fees: '$1,200', total: '$13,700' },
    { grade: 'Elementary (1-5)', tuition: '$15,000', fees: '$1,500', total: '$16,500' },
    { grade: 'Middle School (6-8)', tuition: '$17,500', fees: '$1,800', total: '$19,300' },
    { grade: 'High School (9-12)', tuition: '$20,000', fees: '$2,000', total: '$22,000' }
  ];

  const financialAidTypes = [
    { type: 'Merit Scholarships', description: 'Awarded based on academic achievement and potential', amount: 'Up to 50% tuition' },
    { type: 'Need-Based Aid', description: 'Based on family financial circumstances', amount: 'Up to 75% tuition' },
    { type: 'Athletic Scholarships', description: 'For students excelling in sports', amount: 'Up to 30% tuition' },
    { type: 'Community Service Grants', description: 'For students committed to community service', amount: 'Up to 25% tuition' }
  ];

  return (
    <Layout title={seo.title || 'Admissions — Finote Loza School'} description={seo.description || 'Admissions at Finote Loza School'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-700 text-white py-20">
        <div className="container-page">
          <Reveal>
            <h1 className="heading-section text-white">{content['admissions.hero.title'] || 'Admissions'}</h1>
            <p className="mt-4 text-xl text-navy-100 max-w-3xl">
              {content['admissions.hero.subtitle'] || 'Join our community of learners and discover your potential. We welcome students who are ready to excel academically and grow as individuals.'}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Application Process */}
      <section className="container-page py-16">
        <Reveal>
          <SectionHeading title="Application Process" subtitle="Your journey to joining our school community" />
        </Reveal>
        
        <div className="mt-12">
          <div className="flex flex-wrap gap-2 mb-8">
            {processSteps.map((step) => (
              <button
                key={step.step}
                onClick={() => setActiveTab(`step-${step.step}`)}
                className={`px-4 py-2 rounded-lg transition ${
                  activeTab === `step-${step.step}` 
                    ? 'bg-gold-700 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Step {step.step}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <Reveal key={step.step} delay={idx * 100}>
                <div className={`card p-6 text-center ${activeTab === `step-${step.step}` ? 'ring-2 ring-gold-700' : ''}`}>
                  <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gold-700 font-bold text-lg">{step.step}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                  <p className="text-xs text-gold-700 font-medium">Duration: {step.duration}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements by Grade */}
      <section className="bg-gray-50 py-16">
        <div className="container-page">
          <Reveal>
            <SectionHeading title="Admission Requirements" subtitle="What you need to apply by grade level" />
          </Reveal>
          
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {requirements.map((req, idx) => (
              <Reveal key={req.grade} delay={idx * 100}>
                <div className="card p-6">
                  <h3 className="font-semibold text-lg mb-2">{req.grade}</h3>
                  <p className="text-gold-700 font-medium mb-4">{req.age}</p>
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Required Documents:</h4>
                    <ul className="space-y-1">
                      {req.documents.map((doc, docIdx) => (
                        <li key={docIdx} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-gold-700 rounded-full mr-2"></span>
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tuition & Financial Aid */}
      <section className="container-page py-16">
        <Reveal>
          <SectionHeading title="Tuition & Financial Aid" subtitle="Making quality education accessible" />
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-2 gap-12">
          {/* Tuition Table */}
          <Reveal>
            <div>
              <h3 className="text-2xl font-bold text-navy-900 mb-6">Annual Tuition</h3>
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">Grade Level</th>
                        <th className="px-4 py-3 text-left font-semibold">Tuition</th>
                        <th className="px-4 py-3 text-left font-semibold">Fees</th>
                        <th className="px-4 py-3 text-left font-semibold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tuitionInfo.map((info, idx) => (
                        <tr key={info.grade} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 font-medium">{info.grade}</td>
                          <td className="px-4 py-3">{info.tuition}</td>
                          <td className="px-4 py-3">{info.fees}</td>
                          <td className="px-4 py-3 font-semibold text-gold-700">{info.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                * Fees include technology, activities, and materials. Payment plans available.
              </p>
            </div>
          </Reveal>

          {/* Financial Aid */}
          <Reveal delay={100}>
            <div>
              <h3 className="text-2xl font-bold text-navy-900 mb-6">Financial Aid Options</h3>
              <div className="space-y-4">
                {financialAidTypes.map((aid, idx) => (
                  <div key={aid.type} className="card p-4">
                    <h4 className="font-semibold text-lg mb-2">{aid.type}</h4>
                    <p className="text-gray-600 text-sm mb-2">{aid.description}</p>
                    <p className="text-gold-700 font-medium">{aid.amount}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 card p-4 bg-gold-50">
                <h4 className="font-semibold text-lg mb-2">How to Apply for Aid</h4>
                <ol className="text-sm text-gray-700 space-y-1">
                  <li>1. Complete the financial aid application</li>
                  <li>2. Submit required financial documents</li>
                  <li>3. Meet with our financial aid counselor</li>
                  <li>4. Receive aid decision with admission offer</li>
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Important Dates */}
      <section className="bg-navy-900 text-white py-16">
        <div className="container-page">
          <Reveal>
            <SectionHeading title="Important Dates" subtitle="Mark your calendar" className="text-white" />
          </Reveal>
          
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <Reveal delay={0}>
              <div className="card p-6 bg-white/10 backdrop-blur-sm">
                <h3 className="font-semibold text-lg mb-2">Early Application Deadline</h3>
                <p className="text-gold-300 font-medium">December 15</p>
                <p className="text-sm text-gray-300 mt-2">Priority consideration and early decision</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="card p-6 bg-white/10 backdrop-blur-sm">
                <h3 className="font-semibold text-lg mb-2">Regular Application Deadline</h3>
                <p className="text-gold-300 font-medium">March 1</p>
                <p className="text-sm text-gray-300 mt-2">Final deadline for all applications</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="card p-6 bg-white/10 backdrop-blur-sm">
                <h3 className="font-semibold text-lg mb-2">Decision Notification</h3>
                <p className="text-gold-300 font-medium">April 15</p>
                <p className="text-sm text-gray-300 mt-2">Admission decisions released</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact Admissions */}
      <section className="container-page py-16">
        <Reveal>
          <SectionHeading title="Questions About Admissions?" subtitle="We're here to help" />
        </Reveal>
        
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <Reveal>
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-4">Contact Our Admissions Team</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">Admissions Office</p>
                  <p className="text-gray-600">Phone: (555) 123-4567</p>
                  <p className="text-gray-600">Email: admissions@finoteloza.edu</p>
                </div>
                <div>
                  <p className="font-medium">Office Hours</p>
                  <p className="text-gray-600">Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p className="text-gray-600">Saturday: 9:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-4">Apply Online</h3>
              <p className="text-gray-600 mb-4">
                Complete your application online with our easy-to-use form. 
                Save your progress and submit when ready.
              </p>
              <Link href="/online-application" className="btn-primary">
                Start Online Application
              </Link>
            </div>
          </Reveal>
          
          <Reveal delay={200}>
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-4">Schedule a Visit</h3>
              <p className="text-gray-600 mb-4">
                Experience our campus firsthand. Schedule a personalized tour and meet with our admissions team.
              </p>
              <Link href="/contact" className="btn-primary">
                Schedule Campus Tour
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const keys = ['admissions.hero.title','admissions.hero.subtitle'];
  const { data } = await supabase
    .from('site_content')
    .select('key,value')
    .in('key', keys);
  const content = {};
  (data || []).forEach((r)=>{ content[r.key] = r.value; });
  const { data: seoRows } = await supabase
    .from('site_content')
    .select('key,value')
    .in('key', ['admissions.seo.title','admissions.seo.description']);
  const seo = {};
  (seoRows || []).forEach((r)=>{ if (r.key.endsWith('.title')) seo.title = r.value; if (r.key.endsWith('.description')) seo.description = r.value; });
  return { props: { content, seo }, revalidate: 60 };
}




