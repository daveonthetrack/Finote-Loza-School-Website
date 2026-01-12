import AdminLayout from '@/components/AdminLayout';
import AdminGuard from '@/components/AdminGuard';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ApplicationsAdmin() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) {
        console.error('Error loading applications:', error);
        alert('Error loading applications: ' + error.message);
      } else {
        setApplications(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error loading applications');
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString([], {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-700';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-700';
      case 'accepted':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <AdminGuard>
        <AdminLayout>
          <div className="py-2">
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-700 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading applications...</p>
              </div>
            </div>
          </div>
        </AdminLayout>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="py-2">
          <div className="flex justify-between items-center mb-6">
            <h1 className="heading-section">Applications</h1>
            <div className="text-sm text-gray-600">
              {applications.length} total applications
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="card p-8 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No applications yet</h3>
              <p className="text-gray-500">Applications will appear here once students start submitting them.</p>
            </div>
          ) : (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold">Student Name</th>
                      <th className="px-6 py-3 text-left font-semibold">Grade Level</th>
                      <th className="px-6 py-3 text-left font-semibold">Parent Email</th>
                      <th className="px-6 py-3 text-left font-semibold">Status</th>
                      <th className="px-6 py-3 text-left font-semibold">Submitted</th>
                      <th className="px-6 py-3 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app, idx) => (
                      <tr key={app.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium">
                              {app.student_first_name}
                              {app.student_middle_name ? ` ${app.student_middle_name} ` : ' '}
                              {app.student_last_name}
                            </div>
                            <div className="text-sm text-gray-500">{app.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">{app.grade_level}</td>
                        <td className="px-6 py-4">{app.parent_email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                            {app.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDate(app.submitted_at)}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedApplication(app)}
                            className="text-gold-700 hover:text-gold-900 font-medium text-sm"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Application Details Modal */}
          {selectedApplication && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold text-navy-900">
                      Application Details
                    </h2>
                    <button
                      onClick={() => setSelectedApplication(null)}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Student Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-navy-900 mb-4">Student Information</h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <strong>Name:</strong>{' '}
                          {selectedApplication.student_first_name}
                          {selectedApplication.student_middle_name ? ` ${selectedApplication.student_middle_name} ` : ' '}
                          {selectedApplication.student_last_name}
                        </div>
                        <div><strong>Date of Birth:</strong> {selectedApplication.date_of_birth}</div>
                        <div><strong>Gender:</strong> {selectedApplication.gender}</div>
                        <div><strong>Grade Level:</strong> {selectedApplication.grade_level}</div>
                        <div><strong>Email:</strong> {selectedApplication.email}</div>
                        <div><strong>Phone:</strong> {selectedApplication.phone}</div>
                        <div><strong>Address:</strong> {selectedApplication.address}, {selectedApplication.city}, {selectedApplication.state} {selectedApplication.zip_code}</div>
                      </div>
                    </div>

                    {/* Parent Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-navy-900 mb-4">Parent/Guardian Information</h3>
                      <div className="space-y-3 text-sm">
                        <div><strong>Parent Name:</strong> {selectedApplication.parent_first_name} {selectedApplication.parent_last_name}</div>
                        <div><strong>Parent Email:</strong> {selectedApplication.parent_email}</div>
                        <div><strong>Parent Phone:</strong> {selectedApplication.parent_phone}</div>
                        <div><strong>Occupation:</strong> {selectedApplication.parent_occupation || 'Not provided'}</div>
                        <div><strong>Employer:</strong> {selectedApplication.parent_employer || 'Not provided'}</div>
                        <div><strong>Emergency Contact:</strong> {selectedApplication.emergency_contact_name}</div>
                        <div><strong>Emergency Phone:</strong> {selectedApplication.emergency_contact_phone}</div>
                        <div><strong>Relationship:</strong> {selectedApplication.emergency_contact_relation}</div>
                      </div>
                    </div>

                    {/* Academic Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-navy-900 mb-4">Academic Information</h3>
                      <div className="space-y-3 text-sm">
                        <div><strong>Previous School:</strong> {selectedApplication.previous_school}</div>
                        <div><strong>Previous School Address:</strong> {selectedApplication.previous_school_address || 'Not provided'}</div>
                        <div><strong>Previous School Phone:</strong> {selectedApplication.previous_school_phone || 'Not provided'}</div>
                        <div><strong>Reason for Leaving:</strong> {selectedApplication.reason_for_leaving || 'Not provided'}</div>
                        <div><strong>Special Needs:</strong> {selectedApplication.special_needs || 'None reported'}</div>
                        <div><strong>Medical Conditions:</strong> {selectedApplication.medical_conditions || 'None reported'}</div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-navy-900 mb-4">Additional Information</h3>
                      <div className="space-y-3 text-sm">
                        <div><strong>Extracurricular Activities:</strong> {selectedApplication.extracurricular_activities || 'Not provided'}</div>
                        <div><strong>Interests:</strong> {selectedApplication.interests || 'Not provided'}</div>
                        <div><strong>Goals:</strong> {selectedApplication.goals || 'Not provided'}</div>
                        <div><strong>Additional Info:</strong> {selectedApplication.additional_info || 'Not provided'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <strong>Status:</strong> 
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedApplication.status)}`}>
                          {selectedApplication.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Submitted:</strong> {formatDate(selectedApplication.submitted_at)}
                      </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <button
                        className="btn-primary"
                        onClick={async () => {
                          try {
                            const res = await fetch('/api/admin/applications/accept', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ applicationId: selectedApplication.id })
                            });
                            const json = await res.json();
                            if (!res.ok) throw new Error(json.error || 'Failed to accept');
                            alert(`Accepted.\n\nStudent Credentials\nID: ${json.credentials.student.username}\nEmail: ${json.credentials.student.email}\nPassword: ${json.credentials.student.password}\n\nParent Credentials\nParent ID: ${json.credentials.parent.parent_id}\nEmail: ${json.credentials.parent.email}\nPassword: ${json.credentials.parent.password}`);
                            setSelectedApplication(null);
                            loadApplications();
                          } catch (e) {
                            alert(e.message);
                          }
                        }}
                      >
                        Accept & Register Student + Parent
                      </button>
                      <button
                        className="inline-flex items-center rounded-md border px-3 py-2"
                        onClick={async () => {
                          await supabase
                            .from('applications')
                            .update({ status: 'rejected', decided_at: new Date().toISOString() })
                            .eq('id', selectedApplication.id);
                          setSelectedApplication(null);
                          loadApplications();
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
