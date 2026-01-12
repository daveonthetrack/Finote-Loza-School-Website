import Layout from '@/components/Layout';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function OnlineApplication() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Student Information
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    gradeLevel: '',
    
    // Contact Information
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Parent/Guardian Information
    parentFirstName: '',
    parentLastName: '',
    parentEmail: '',
    parentPhone: '',
    parentOccupation: '',
    parentEmployer: '',
    
    // Emergency Contact
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    
    // Academic Information
    previousSchool: '',
    previousSchoolAddress: '',
    previousSchoolPhone: '',
    reasonForLeaving: '',
    specialNeeds: '',
    medicalConditions: '',
    
    // Additional Information
    extracurricularActivities: '',
    interests: '',
    goals: '',
    additionalInfo: ''
  });

  const steps = [
    { id: 1, title: 'Student Information', description: 'Basic student details' },
    { id: 2, title: 'Contact Information', description: 'Address and contact details' },
    { id: 3, title: 'Parent/Guardian', description: 'Parent or guardian information' },
    { id: 4, title: 'Academic History', description: 'Previous school information' },
    { id: 5, title: 'Additional Information', description: 'Interests and goals' },
    { id: 6, title: 'Review & Submit', description: 'Review and submit application' }
  ];

  const gradeLevels = [
    'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('applications')
        .insert([{
          student_first_name: formData.firstName,
          student_middle_name: formData.middleName || null,
          student_last_name: formData.lastName,
          date_of_birth: formData.dateOfBirth,
          gender: formData.gender,
          grade_level: formData.gradeLevel,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          parent_first_name: formData.parentFirstName,
          parent_last_name: formData.parentLastName,
          parent_email: formData.parentEmail,
          parent_phone: formData.parentPhone,
          parent_occupation: formData.parentOccupation,
          parent_employer: formData.parentEmployer,
          emergency_contact_name: formData.emergencyContactName,
          emergency_contact_phone: formData.emergencyContactPhone,
          emergency_contact_relation: formData.emergencyContactRelation,
          previous_school: formData.previousSchool,
          previous_school_address: formData.previousSchoolAddress,
          previous_school_phone: formData.previousSchoolPhone,
          reason_for_leaving: formData.reasonForLeaving,
          special_needs: formData.specialNeeds,
          medical_conditions: formData.medicalConditions,
          extracurricular_activities: formData.extracurricularActivities,
          interests: formData.interests,
          goals: formData.goals,
          additional_info: formData.additionalInfo,
          status: 'submitted',
          submitted_at: new Date().toISOString()
        }]);

      if (error) {
        console.error('Error submitting application:', error);
        alert(`There was an error submitting your application: ${error.message}. Please try again or contact our admissions office.`);
      } else {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting your application. Please try again or contact our admissions office at (555) 123-4567.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <section className="bg-gradient-to-br from-navy-900 to-navy-700 text-white py-20">
          <div className="container-page">
            <Reveal>
              <h1 className="heading-section text-white">Application Submitted</h1>
              <p className="mt-4 text-xl text-navy-100 max-w-3xl">
                Thank you for your interest in Finote Loza School! Your application has been successfully submitted.
              </p>
            </Reveal>
          </div>
        </section>
        
        <section className="container-page py-16">
          <Reveal>
            <div className="card p-8 text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-navy-900 mb-4">Application Received!</h2>
              <p className="text-gray-600 mb-6">
                We have received your application for {formData.gradeLevel}. Our admissions team will review 
                your application and contact you within 5-7 business days with next steps.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">What happens next?</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Application review by admissions team</li>
                  <li>• Contact for additional documents if needed</li>
                  <li>• Schedule campus tour and interview</li>
                  <li>• Receive admission decision</li>
                </ul>
              </div>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => window.location.href = '/'}
                  className="btn-primary"
                >
                  Return to Homepage
                </button>
                <button 
                  onClick={() => window.location.href = '/admissions'}
                  className="btn-secondary"
                >
                  Learn More About Admissions
                </button>
              </div>
            </div>
          </Reveal>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-700 text-white py-20">
        <div className="container-page">
          <Reveal>
            <h1 className="heading-section text-white">Online Application</h1>
            <p className="mt-4 text-xl text-navy-100 max-w-3xl">
              Apply to Finote Loza School online. Complete the application form below 
              and take the first step toward joining our community.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="container-page py-8">
        <Reveal>
          <div className="flex flex-wrap justify-center gap-4">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= step.id 
                    ? 'bg-gold-700 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.id}
                </div>
                <div className="hidden sm:block">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-gold-700' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
                {step.id < steps.length && (
                  <div className={`w-8 h-0.5 ${
                    currentStep > step.id ? 'bg-gold-700' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Application Form */}
      <section className="container-page pb-16">
        <form onSubmit={handleSubmit}>
          <Reveal>
            <div className="card p-8 max-w-4xl mx-auto">
              {/* Step 1: Student Information */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-6">Student Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
                      <input
                        type="text"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level *</label>
                      <select
                        name="gradeLevel"
                        value={formData.gradeLevel}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      >
                        <option value="">Select Grade Level</option>
                        {gradeLevels.map((grade) => (
                          <option key={grade} value={grade}>{grade}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-6">Contact Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Parent/Guardian Information */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-6">Parent/Guardian Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Parent First Name *</label>
                      <input
                        type="text"
                        name="parentFirstName"
                        value={formData.parentFirstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Parent Last Name *</label>
                      <input
                        type="text"
                        name="parentLastName"
                        value={formData.parentLastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Parent Email *</label>
                      <input
                        type="email"
                        name="parentEmail"
                        value={formData.parentEmail}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Parent Phone *</label>
                      <input
                        type="tel"
                        name="parentPhone"
                        value={formData.parentPhone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
                      <input
                        type="text"
                        name="parentOccupation"
                        value={formData.parentOccupation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Employer</label>
                      <input
                        type="text"
                        name="parentEmployer"
                        value={formData.parentEmployer}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-navy-900 mb-4">Emergency Contact</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Name *</label>
                        <input
                          type="text"
                          name="emergencyContactName"
                          value={formData.emergencyContactName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Phone *</label>
                        <input
                          type="tel"
                          name="emergencyContactPhone"
                          value={formData.emergencyContactPhone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Relationship *</label>
                        <input
                          type="text"
                          name="emergencyContactRelation"
                          value={formData.emergencyContactRelation}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Academic History */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-6">Academic History</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Previous School *</label>
                      <input
                        type="text"
                        name="previousSchool"
                        value={formData.previousSchool}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Previous School Address</label>
                      <input
                        type="text"
                        name="previousSchoolAddress"
                        value={formData.previousSchoolAddress}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Previous School Phone</label>
                      <input
                        type="tel"
                        name="previousSchoolPhone"
                        value={formData.previousSchoolPhone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Leaving Previous School</label>
                      <textarea
                        name="reasonForLeaving"
                        value={formData.reasonForLeaving}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Special Needs or Accommodations</label>
                      <textarea
                        name="specialNeeds"
                        value={formData.specialNeeds}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="Please describe any special needs or accommodations required..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
                      <textarea
                        name="medicalConditions"
                        value={formData.medicalConditions}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="Please describe any medical conditions we should be aware of..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Additional Information */}
              {currentStep === 5 && (
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-6">Additional Information</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Extracurricular Activities</label>
                      <textarea
                        name="extracurricularActivities"
                        value={formData.extracurricularActivities}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="Sports, clubs, music, art, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Academic Interests</label>
                      <textarea
                        name="interests"
                        value={formData.interests}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="Subjects you enjoy, areas of interest..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Educational Goals</label>
                      <textarea
                        name="goals"
                        value={formData.goals}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="What do you hope to achieve at our school?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
                      <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="Any other information you'd like to share..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Review & Submit */}
              {currentStep === 6 && (
                <div>
                  <h2 className="text-2xl font-bold text-navy-900 mb-6">Review Your Application</h2>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-lg mb-3">Student Information</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div><strong>Name:</strong> {formData.firstName} {formData.middleName} {formData.lastName}</div>
                        <div><strong>Date of Birth:</strong> {formData.dateOfBirth}</div>
                        <div><strong>Gender:</strong> {formData.gender}</div>
                        <div><strong>Grade Level:</strong> {formData.gradeLevel}</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div><strong>Email:</strong> {formData.email}</div>
                        <div><strong>Phone:</strong> {formData.phone}</div>
                        <div><strong>Address:</strong> {formData.address}</div>
                        <div><strong>City, State ZIP:</strong> {formData.city}, {formData.state} {formData.zipCode}</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-lg mb-3">Parent/Guardian Information</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div><strong>Parent Name:</strong> {formData.parentFirstName} {formData.parentLastName}</div>
                        <div><strong>Parent Email:</strong> {formData.parentEmail}</div>
                        <div><strong>Parent Phone:</strong> {formData.parentPhone}</div>
                        <div><strong>Occupation:</strong> {formData.parentOccupation}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Important Notes:</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Please ensure all information is accurate before submitting</li>
                      <li>• You will receive a confirmation email after submission</li>
                      <li>• Our admissions team will contact you within 5-7 business days</li>
                      <li>• Additional documents may be required during the review process</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-primary"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </button>
                )}
              </div>
            </div>
          </Reveal>
        </form>
      </section>
    </Layout>
  );
}
