import React, { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Save, X, Eye, TrendingUp } from 'lucide-react';

const CaseStudiesManager = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    specialty: '',
    challenge: '',
    solution: '',
    results: [],
    quote: '',
    quote_author: '',
    metrics: {}
  });
  const [resultInput, setResultInput] = useState('');

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/case-studies');
      setCaseStudies(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch case studies');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.specialty) {
      toast.error('Please fill in title and specialty');
      return;
    }

    try {
      if (editing) {
        await api.put(`/api/case-studies/${editing}`, formData);
        toast.success('Case study updated');
      } else {
        await api.post('/api/case-studies', formData);
        toast.success('Case study added');
      }
      resetForm();
      fetchCaseStudies();
    } catch (error) {
      toast.error('Failed to save case study');
    }
  };

  const deleteCaseStudy = async (id) => {
    if (window.confirm('Are you sure you want to delete this case study?')) {
      try {
        await api.delete(`/api/case-studies/${id}`);
        toast.success('Case study deleted');
        fetchCaseStudies();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const editCaseStudy = (study) => {
    setEditing(study.id);
    setFormData({
      title: study.title,
      specialty: study.specialty,
      challenge: study.challenge,
      solution: study.solution,
      results: study.results || [],
      quote: study.quote || '',
      quote_author: study.quote_author || '',
      metrics: study.metrics || {}
    });
    setShowModal(true);
  };

  const addResult = () => {
    if (resultInput.trim()) {
      setFormData({
        ...formData,
        results: [...formData.results, resultInput.trim()]
      });
      setResultInput('');
    }
  };

  const removeResult = (index) => {
    setFormData({
      ...formData,
      results: formData.results.filter((_, i) => i !== index)
    });
  };

  const resetForm = () => {
    setShowModal(false);
    setEditing(null);
    setFormData({
      title: '',
      specialty: '',
      challenge: '',
      solution: '',
      results: [],
      quote: '',
      quote_author: '',
      metrics: {}
    });
    setResultInput('');
  };

  if (loading) {
    return <div className="text-center py-12">Loading case studies...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-dark">Case Studies</h2>
          <p className="text-gray-500 text-sm mt-1">Manage success stories and client results</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={16} /> Add Case Study
        </button>
      </div>

      <div className="divide-y">
        {caseStudies.map((study) => (
          <div key={study.id} className="p-6 hover:bg-gray-50 transition">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">{study.specialty}</span>
                </div>
                <h3 className="text-xl font-semibold text-dark mb-2">{study.title}</h3>
                <p className="text-gray-600 mb-2 line-clamp-2">{study.challenge}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><TrendingUp size={14} /> {study.results?.length || 0} results</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => editCaseStudy(study)} className="text-blue-600 hover:text-blue-800">
                  <Edit size={18} />
                </button>
                <button onClick={() => deleteCaseStudy(study.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-dark">{editing ? 'Edit Case Study' : 'Add Case Study'}</h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="Practice Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialty *</label>
                  <input
                    type="text"
                    value={formData.specialty}
                    onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="Cardiology, Orthopedics, etc."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Challenge</label>
                <textarea
                  rows="3"
                  value={formData.challenge}
                  onChange={(e) => setFormData({...formData, challenge: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Describe the client's challenge..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Solution</label>
                <textarea
                  rows="3"
                  value={formData.solution}
                  onChange={(e) => setFormData({...formData, solution: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Describe the solution provided..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Results</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={resultInput}
                    onChange={(e) => setResultInput(e.target.value)}
                    className="flex-1 border rounded-lg px-4 py-2"
                    placeholder="e.g., AR reduced from 62 to 19 days"
                  />
                  <button onClick={addResult} className="bg-primary text-white px-4 py-2 rounded-lg">Add</button>
                </div>
                <div className="space-y-1">
                  {formData.results.map((result, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                      <span className="text-sm">{result}</span>
                      <button onClick={() => removeResult(idx)} className="text-red-500 hover:text-red-700">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quote</label>
                  <textarea
                    rows="2"
                    value={formData.quote}
                    onChange={(e) => setFormData({...formData, quote: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="Client testimonial..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quote Author</label>
                  <input
                    type="text"
                    value={formData.quote_author}
                    onChange={(e) => setFormData({...formData, quote_author: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="Dr. John Smith, MD"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={resetForm} className="btn-secondary">Cancel</button>
                <button onClick={handleSubmit} className="btn-primary flex items-center gap-2">
                  <Save size={16} /> {editing ? 'Update' : 'Save'} Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudiesManager;