import Layout from '@/components/Layout';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

export default function About({ content = {}, seo = {} }) {
  const values = [
    { title: 'Academic Excellence', description: 'Rigorous curriculum designed to challenge and inspire students to reach their highest potential.' },
    { title: 'Character Development', description: 'Building integrity, respect, and responsibility through daily practice and community service.' },
    { title: 'Innovation & Creativity', description: 'Encouraging critical thinking, problem-solving, and creative expression in all subjects.' },
    { title: 'Community & Service', description: 'Fostering a sense of belonging and commitment to making a positive impact in the world.' }
  ];

  const faculty = [
    { name: 'Dr. Sarah Johnson', role: 'Principal', experience: '15 years', specialty: 'Educational Leadership' },
    { name: 'Mr. David Chen', role: 'Mathematics Department Head', experience: '12 years', specialty: 'Advanced Mathematics' },
    { name: 'Ms. Emily Rodriguez', role: 'Science Teacher', experience: '8 years', specialty: 'Biology & Chemistry' },
    { name: 'Dr. Michael Thompson', role: 'English Department Head', experience: '10 years', specialty: 'Literature & Writing' }
  ];

  const testimonials = [
    { quote: "Finote Loza School has transformed my daughter into a confident, curious learner. The teachers truly care about each student's success.", author: "Maria Santos", role: "Parent" },
    { quote: "The academic rigor combined with character development has prepared me well for university. I'm grateful for the foundation I received.", author: "Ahmed Hassan", role: "Graduate, Class of 2023" },
    { quote: "The supportive community and innovative teaching methods make learning exciting. I love coming to school every day!", author: "Sophie Kim", role: "Grade 10 Student" }
  ];

  return (
    <Layout title={seo.title || 'About — Finote Loza School'} description={seo.description || 'About Finote Loza School'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-700 text-white py-20">
        <div className="container-page">
          <Reveal>
            <h1 className="heading-section text-white">{content['about.hero.title'] || 'About Finote Loza School'}</h1>
            <p className="mt-4 text-xl text-navy-100 max-w-3xl">
              {content['about.hero.subtitle'] || 'Founded with a commitment to academic excellence and character development, we provide a nurturing environment where students thrive and discover their potential.'}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container-page py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <Reveal>
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {content['about.mission'] || 'To empower students to become compassionate, confident, and creative leaders through rigorous academics, character development, and community engagement.'}
              </p>
              <h2 className="text-3xl font-bold text-navy-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                {content['about.vision'] || 'To be a leading educational institution that prepares students for success in higher education and life, while fostering a lifelong love of learning.'}
              </p>
            </div>
          </Reveal>
          <Reveal type="slide-right" delay={100}>
            <div className="card p-6">
              <div className="relative h-80 w-full rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src="/about.jpg"
                  alt="Finote Loza School students"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16">
        <div className="container-page">
          <Reveal>
            <SectionHeading title="Our Core Values" subtitle="The principles that guide everything we do" />
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <Reveal key={value.title} delay={idx * 100}>
                <div className="card p-6 text-center hover:shadow-lg transition">
                  <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gold-700 font-bold text-xl">{idx + 1}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="container-page py-16">
        <Reveal>
          <SectionHeading title="Meet Our Faculty" subtitle="Dedicated educators committed to student success" />
        </Reveal>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {faculty.map((member, idx) => (
            <Reveal key={member.name} delay={idx * 100}>
              <div className="card p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-gold-100 to-navy-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500 font-semibold">{member.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-gold-700 font-medium">{member.role}</p>
                <p className="text-sm text-gray-600 mt-1">{member.experience} experience</p>
                <p className="text-xs text-gray-500 mt-2">{member.specialty}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-navy-900 text-white py-16">
        <div className="container-page">
          <Reveal>
            <SectionHeading title="What People Say" subtitle="Hear from our community" className="text-white" />
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Reveal key={testimonial.author} delay={idx * 150}>
                <div className="card p-6 bg-white/10 backdrop-blur-sm">
                  <p className="text-gray-100 italic mb-4">"{testimonial.quote}"</p>
                  <div className="border-t border-white/20 pt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-300">{testimonial.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container-page py-16">
        <Reveal>
          <SectionHeading title="By the Numbers" subtitle="Our impact in the community" />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '500+', label: 'Students' },
            { number: '50+', label: 'Faculty' },
            { number: '25+', label: 'Years of Excellence' },
            { number: '95%', label: 'University Acceptance' }
          ].map((stat, idx) => (
            <Reveal key={stat.label} delay={idx * 100}>
              <div className="text-center">
                <div className="text-4xl font-bold text-gold-700 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const keys = ['about.hero.title','about.hero.subtitle','about.mission','about.vision'];
  const { data } = await supabase
    .from('site_content')
    .select('key,value')
    .in('key', keys);
  const content = {};
  (data || []).forEach((r)=>{ content[r.key] = r.value; });
  const { data: seoRows } = await supabase
    .from('site_content')
    .select('key,value')
    .in('key', ['about.seo.title','about.seo.description']);
  const seo = {};
  (seoRows || []).forEach((r)=>{ if (r.key.endsWith('.title')) seo.title = r.value; if (r.key.endsWith('.description')) seo.description = r.value; });
  return { props: { content, seo }, revalidate: 60 };
}




