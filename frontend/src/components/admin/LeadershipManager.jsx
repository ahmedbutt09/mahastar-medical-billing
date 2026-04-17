import React, { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Save, X, Users, Mail, Linkedin } from 'lucide-react';

const LeadershipManager = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    linkedin_url: '',
    sort_order: 0,
    is_active: true
  });

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/leadership');
      setLeaders(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch leadership team');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.title) {
      toast.error('Please fill in name and title');
      return;
    }

    try {
      if (editing) {
        await api.put(`/api/leadership/${editing}`, formData);
        toast.success('Leader updated');
      } else {
        await api.post('/api/leadership', formData);
        toast.success('Leader added');
      }
      resetForm();
      fetchLeaders();
    } catch (error) {
      toast.error('Failed to save leader');
    }
  };

  const deleteLeader = async (id) => {
    if (window.confirm('Are you sure you want to delete this leader?')) {
      try {
        await api.delete(`/api/leadership/${id}`);
        toast.success('Leader deleted');
        fetchLeaders();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const resetForm = () => {
    setShowModal(false);
    setEditing(null);
    setFormData({
      name: '',
      title: '',
      bio: '',
      email: '',
      linkedin_url: '',
      sort_order: leaders.length,
      is_active: true
    });
  };

  if (loading) {
    return <div className="text-center py-12">Loading leadership team...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-dark">Leadership Team</h2>
          <p className="text-gray-500 text-sm mt-1">Manage executive team members and their profiles</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={16} /> Add Team Member
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {leaders.map((leader) => (
          <div key={leader.id} className="border rounded-xl p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{leader.name.charAt(0)}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => {
                  setEditing(leader.id);
                  setFormData(leader);
                  setShowModal(true);
                }} className="text-blue-600 hover:text-blue-800">
                  <Edit size={18} />
                </button>
                <button onClick={() => deleteLeader(leader.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-bold text-dark mb-1">{leader.name}</h3>
            <p className="text-primary text-sm mb-3">{leader.title}</p>
            <p className="text-gray-600 text-sm line-clamp-3">{leader.bio}</p>
            <div className="flex gap-3 mt-4 pt-4 border-t">
              {leader.email && (
                <a href={`mailto:${leader.email}`} className="text-gray-400 hover:text-primary transition">
                  <Mail size={16} />
                </a>
              )}
              {leader.linkedin_url && (
                <a href={leader.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition">
                  <Linkedin size={16} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-dark">{editing ? 'Edit Team Member' : 'Add Team Member'}</h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="CEO & Founder"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  rows="4"
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Professional background and experience..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({...formData, linkedin_url: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="https://linkedin.com/in/johnsmith"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({...formData, sort_order: parseInt(e.target.value)})}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="0, 1, 2..."
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={resetForm} className="btn-secondary">Cancel</button>
                <button onClick={handleSubmit} className="btn-primary flex items-center gap-2">
                  <Save size={16} /> {editing ? 'Update' : 'Save'} Team Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadershipManager;