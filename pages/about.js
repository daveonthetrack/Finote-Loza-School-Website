import Layout from '@/components/Layout';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

export default function About({ content = {}, seo = {} }) {
  const values = [
    { title: 'Academic Excellence', description: 'Strong foundations in literacy, numeracy, and science aligned with Ethiopia’s national standards.' },
    { title: 'Bilingual Learning', description: 'Supportive English instruction with respect for local languages and clear communication at home and school.' },
    { title: 'Character & Culture', description: 'Respect, responsibility, and pride in Ethiopian heritage—built through daily routines and mentorship.' },
    { title: 'Community Partnership', description: 'A strong relationship with parents and the community to support every learner’s growth.' }
  ];

  const programs = [
    {
      title: 'Kindergarten (KG)',
      subtitle: 'Early years foundation',
      items: ['Phonics & early literacy', 'Numbers & basic math', 'Art, music & movement', 'Social skills & routines'],
    },
    {
      title: 'Elementary (1–5)',
      subtitle: 'Strong fundamentals',
      items: ['Reading comprehension', 'Math mastery', 'Science & discovery', 'Writing and communication'],
    },
    {
      title: 'Middle School (6–8)',
      subtitle: 'Confidence + study skills',
      items: ['Subject-based teaching', 'Projects & group work', 'Study habits and discipline', 'Continuous assessment'],
    },
    {
      title: 'High School (9–12)',
      subtitle: 'Ministry exam readiness',
      items: ['Focused exam prep', 'Practice tests & review', 'Guidance and mentorship', 'University/career awareness'],
    },
  ];

  const story = [
    { year: '2004', text: 'Finote Loza School opens with a focus on discipline, academic excellence, and strong teacher support.' },
    { year: '2012', text: 'Expanded grade levels and introduced structured tutoring & revision programs for upper grades.' },
    { year: '2018', text: 'Strengthened reading culture with library time and extracurricular clubs.' },
    { year: 'Today', text: 'Serving families in Addis Ababa with KG–12 programs and a strong community partnership.' },
  ];

  const faculty = [
    { name: 'Ato Dawit Mekonnen', role: 'Principal', experience: '15 years', specialty: 'Educational Leadership' },
    { name: 'W/ro Hanna Tesfaye', role: 'Academic Coordinator', experience: '12 years', specialty: 'Curriculum & Student Support' },
    { name: 'Ato Samuel Bekele', role: 'Mathematics Department Head', experience: '11 years', specialty: 'Mathematics & Problem Solving' },
    { name: 'W/ro Selamawit Abebe', role: 'Science Teacher', experience: '9 years', specialty: 'Biology & Chemistry' }
  ];

  const testimonials = [
    { quote: "Finote Loza School helped my daughter build confidence in English and strong study habits. The teachers communicate with us and really follow up.", author: "W/ro Meron Girma", role: "Parent" },
    { quote: "The ministry exam preparation and the support from teachers made a big difference. I felt ready and calm on exam day.", author: "Yared Tadesse", role: "Graduate" },
    { quote: "I like the library time and group projects. We learn seriously, but we also have clubs and activities.", author: "Liya Kebede", role: "Grade 10 Student" }
  ];

  return (
    <Layout title={seo.title || 'About — Finote Loza School'} description={seo.description || 'About Finote Loza School'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-700 text-white py-20">
        <div className="container-page">
          <Reveal>
            <h1 className="heading-section text-white">{content['about.hero.title'] || 'About Finote Loza School'}</h1>
            <p className="mt-4 text-xl text-navy-100 max-w-3xl">
              {content['about.hero.subtitle'] || 'Based in Addis Ababa, Ethiopia, Finote Loza School is committed to strong academics, discipline, and a supportive community that helps students thrive.'}
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
                {content['about.mission'] || 'To prepare students for success in school and life through strong academics, good character, and daily support—working closely with families and the community.'}
              </p>
              <h2 className="text-3xl font-bold text-navy-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                {content['about.vision'] || 'To be a trusted school in Ethiopia known for excellent teaching, clear discipline, and graduates who are confident, responsible, and ready for higher education.'}
              </p>

              <div className="mt-8 grid gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">Ministry exam readiness</p>
                    <p className="text-sm text-gray-600">Structured review sessions, practice exams, and personalized support.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-8 h-8 rounded-full bg-navy-50 border border-navy-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-navy-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0 0C10.832 19.477 9.246 20 7.5 20S4.168 19.477 3 18.253m0-13C4.168 4.477 5.754 4 7.5 4s3.332.477 4.5 1.253m0 13C13.168 19.477 14.754 20 16.5 20c1.746 0 3.332-.477 4.5-1.253m0-13C19.832 4.477 18.246 4 16.5 4c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">Library & reading culture</p>
                    <p className="text-sm text-gray-600">Age-appropriate books and guided reading time to build confidence.</p>
                  </div>
                </div>
              </div>
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
              <p className="text-xs text-gray-500 mt-3">
                Students building confidence through teamwork, school culture, and daily learning.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-white py-16">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              title="Programs (KG–12)"
              subtitle="Structured learning for every stage—from early years to ministry exam preparation."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {programs.map((p, idx) => (
              <Reveal key={p.title} delay={idx * 80}>
                <div className="card p-6 h-full">
                  <p className="font-semibold text-navy-900">{p.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{p.subtitle}</p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-700">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-600 shrink-0" />
                        <span className="min-w-0">{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-gray-50 py-16">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              title="Our Story"
              subtitle="A steady focus on learning, discipline, and community—serving families in Addis Ababa."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {story.map((s, idx) => (
              <Reveal key={s.year} delay={idx * 90}>
                <div className="card p-6 flex gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0">
                    <span className="font-bold text-navy-900">{s.year}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Community & Approach */}
      <section className="bg-white py-16">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              title="A School Community in Addis Ababa"
              subtitle="Practical learning, clear expectations, and support for every student."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Strong routines & discipline',
                description: 'Clear rules, consistent follow-up, and respectful communication help students focus and grow.',
              },
              {
                title: 'Languages & learning',
                description: 'We support strong English progress while respecting local languages—building confidence in speaking, reading, and writing.',
              },
              {
                title: 'Clubs & activities',
                description: 'Reading club, science projects, art, and sports to support well-rounded development.',
              },
            ].map((item, idx) => (
              <Reveal key={item.title} delay={idx * 100}>
                <div className="card p-6">
                  <p className="font-semibold text-navy-900">{item.title}</p>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
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
                <div className="card p-6 bg-white border border-white/10 shadow-soft">
                  <p className="text-gray-900 italic mb-4">"{testimonial.quote}"</p>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
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
            { number: '800+', label: 'Students' },
            { number: '70+', label: 'Teachers & Staff' },
            { number: '20+', label: 'Years Serving Families' },
            { number: '98%', label: 'Ministry Exam Pass Rate' }
          ].map((stat, idx) => (
            <Reveal key={stat.label} delay={idx * 100}>
              <div className="text-center">
                <div className="text-4xl font-bold text-gold-700 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href="/news" className="btn-secondary">Read School News</a>
          <a href="/library" className="btn-secondary">Visit the Library</a>
          <a href="/online-application" className="btn-primary">Apply Now</a>
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




