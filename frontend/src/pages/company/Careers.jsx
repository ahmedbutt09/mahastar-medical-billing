// src/pages/company/Careers.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, DollarSign, Loader, ChevronDown, ChevronUp } from 'lucide-react';
import api from '../../api';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cover_letter: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/api/careers');
      if (response.data.success) {
        setJobs(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/careers/${selectedJob.id}/apply`, formData);
      alert(`Application submitted for ${selectedJob.title}! We'll contact you soon.`);
      setShowModal(false);
      setSelectedJob(null);
      setFormData({ name: '', email: '', phone: '', cover_letter: '' });
    } catch (error) {
      alert('Error submitting application. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <Loader className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Briefcase className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Build your career at MahaStar and help transform healthcare revenue cycle management.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-dark mb-2">Why Work at MahaStar?</h2>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-gray-600">Remote Culture</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-gray-600">Years Industry Leader</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-dark mb-8">Open Positions</h2>
          
          {jobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No open positions at this time. Check back soon!</p>
            </div>
          )}

          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-dark mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><Briefcase size={14} />{job.department}</span>
                      <span className="flex items-center gap-1"><MapPin size={14} />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock size={14} />{job.type}</span>
                      <span className="flex items-center gap-1"><DollarSign size={14} />{job.salary_range}</span>
                    </div>
                    <p className="text-gray-600 mb-3">{job.description}</p>
                    {job.requirements && (
                      <details className="mt-2">
                        <summary className="text-primary cursor-pointer font-medium">View Requirements</summary>
                        <p className="text-gray-600 text-sm mt-2">{job.requirements}</p>
                      </details>
                    )}
                  </div>
                  <button
                    onClick={() => handleApply(job)}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition whitespace-nowrap"
                  >
                    Apply Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-dark">Apply for {selectedJob.title}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
                <textarea
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  value={formData.cover_letter}
                  onChange={(e) => setFormData({...formData, cover_letter: e.target.value})}
                />
              </div>
              <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;