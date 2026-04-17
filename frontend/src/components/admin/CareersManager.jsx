import React, { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Save, X, Briefcase, MapPin, Clock, DollarSign, Users } from 'lucide-react';

const CareersManager = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showAppsModal, setShowAppsModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    description: '',
    requirements: '',
    salary_range: '',
    is_active: true
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const jobsRes = await api.get('/api/careers');
      const appsRes = await api.get('/api/admin/applications');
      setJobs(jobsRes.data.data || []);
      setApplications(appsRes.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch careers data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.department) {
      toast.error('Please fill in title and department');
      return;
    }

    try {
      if (editing) {
        await api.put(`/api/careers/${editing}`, formData);
        toast.success('Job updated');
      } else {
        await api.post('/api/careers', formData);
        toast.success('Job posted');
      }
      resetForm();
      fetchData();
    } catch (error) {
      toast.error('Failed to save job');
    }
  };

  const deleteJob = async (id) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      try {
        await api.delete(`/api/careers/${id}`);
        toast.success('Job deleted');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      await api.put(`/api/admin/applications/${id}`, { status });
      toast.success(`Application marked as ${status}`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const resetForm = () => {
    setShowJobModal(false);
    setEditing(null);
    setFormData({
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      description: '',
      requirements: '',
      salary_range: '',
      is_active: true
    });
  };

  if (loading) {
    return <div className="text-center py-12">Loading careers data...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Job Postings Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-dark">Job Postings</h2>
            <p className="text-gray-500 text-sm mt-1">Manage open positions and job descriptions</p>
          </div>
          <button onClick={() => setShowJobModal(true)} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus size={16} /> Post Job
          </button>
        </div>

        <div className="divide-y">
          {jobs.map((job) => (
            <div key={job.id} className="p-6 hover:bg-gray-50 transition">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">{job.department}</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{job.type}</span>
                    <span className={`text-xs px-2 py-1 rounded ${job.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {job.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-dark mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                    <span className="flex items-center gap-1"><DollarSign size={14} /> {job.salary_range}</span>
                  </div>
                  <p className="text-gray-600 line-clamp-2">{job.description}</p>
                  <button 
                    onClick={() => {
                      setSelectedJob(job);
                      setShowAppsModal(true);
                    }}
                    className="mt-3 text-primary text-sm hover:underline flex items-center gap-1"
                  >
                    <Users size={14} /> View Applications
                  </button>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => {
                    setEditing(job.id);
                    setFormData(job);
                    setShowJobModal(true);
                  }} className="text-blue-600 hover:text-blue-800">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => deleteJob(job.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Job Modal */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-dark">{editing ? 'Edit Job' : 'Post New Job'}</h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="Medical Coder"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="Operations, Sales, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="Remote, Hybrid, or City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                <input
                  type="text"
                  value={formData.salary_range}
                  onChange={(e) => setFormData({...formData, salary_range: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="$55k - $75k"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Job description and responsibilities..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                <textarea
                  rows="4"
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Required qualifications and skills..."
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={resetForm} className="btn-secondary">Cancel</button>
                <button onClick={handleSubmit} className="btn-primary flex items-center gap-2">
                  <Save size={16} /> {editing ? 'Update' : 'Post'} Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Applications Modal */}
      {showAppsModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold text-dark">Applications for {selectedJob.title}</h2>
                <p className="text-gray-500 text-sm">{applications.filter(a => a.job_id === selectedJob.id).length} applicants</p>
              </div>
              <button onClick={() => setShowAppsModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {applications.filter(a => a.job_id === selectedJob.id).map((app) => (
                <div key={app.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-dark">{app.name}</h3>
                      <p className="text-sm text-gray-600">{app.email}</p>
                      {app.phone && <p className="text-sm text-gray-500">{app.phone}</p>}
                      {app.cover_letter && (
                        <p className="text-sm text-gray-600 mt-2 italic">"{app.cover_letter}"</p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">Applied: {new Date(app.applied_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={app.status}
                        onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                        className="text-sm border rounded px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="rejected">Rejected</option>
                        <option value="hired">Hired</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              {applications.filter(a => a.job_id === selectedJob.id).length === 0 && (
                <p className="text-center text-gray-500 py-8">No applications yet for this position.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersManager;