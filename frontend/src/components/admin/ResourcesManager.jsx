import React, { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Save, X, FileText, Video, Calendar, BookOpen } from 'lucide-react';

const ResourcesManager = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [resourceType, setResourceType] = useState('whitepaper');
  const [formData, setFormData] = useState({
    resource_type: 'whitepaper',
    title: '',
    slug: '',
    description: '',
    category: '',
    file_url: '',
    pages: '',
    webinar_date: '',
    webinar_time: '',
    duration: '',
    speaker: '',
    webinar_status: 'upcoming',
    event_date: '',
    location: '',
    event_type: '',
    is_active: true
  });

  useEffect(() => {
    fetchAllResources();
  }, []);

  const fetchAllResources = async () => {
    setLoading(true);
    try {
      const types = ['whitepapers', 'webinars', 'events', 'magazine', 'faqs', 'glossary'];
      let allResources = [];
      for (const type of types) {
        const response = await api.get(`/api/resources/${type}`);
        if (response.data.success) {
          allResources = [...allResources, ...response.data.data];
        }
      }
      setResources(allResources);
    } catch (error) {
      toast.error('Failed to fetch resources');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = { ...formData, resource_type: resourceType };
      
      if (editing) {
        await api.put(`/api/resource/${editing}`, payload);
        toast.success('Resource updated');
      } else {
        await api.post('/api/resources', payload);
        toast.success('Resource added');
      }
      resetForm();
      fetchAllResources();
    } catch (error) {
      toast.error('Failed to save resource');
    }
  };

  const deleteResource = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await api.delete(`/api/resource/${id}`);
        toast.success('Resource deleted');
        fetchAllResources();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const resetForm = () => {
    setShowModal(false);
    setEditing(null);
    setFormData({
      resource_type: resourceType,
      title: '',
      slug: '',
      description: '',
      category: '',
      file_url: '',
      pages: '',
      webinar_date: '',
      webinar_time: '',
      duration: '',
      speaker: '',
      webinar_status: 'upcoming',
      event_date: '',
      location: '',
      event_type: '',
      is_active: true
    });
  };

  const getResourceIcon = (type) => {
    switch(type) {
      case 'whitepaper': return <FileText size={16} />;
      case 'webinar': return <Video size={16} />;
      case 'event': return <Calendar size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading resources...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-dark">Resources</h2>
          <p className="text-gray-500 text-sm mt-1">Manage whitepapers, webinars, events, and more</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={16} /> Add Resource
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {resources.map((resource) => (
              <tr key={resource.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {getResourceIcon(resource.resource_type)}
                    <span className="capitalize">{resource.resource_type}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{resource.title || resource.question || resource.term}</td>
                <td className="px-6 py-4 text-sm">{resource.category || resource.faq_category || resource.letter}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${resource.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {resource.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => {
                      setEditing(resource.id);
                      setFormData(resource);
                      setResourceType(resource.resource_type);
                      setShowModal(true);
                    }} className="text-blue-600 hover:text-blue-800">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => deleteResource(resource.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-dark">{editing ? 'Edit Resource' : 'Add Resource'}</h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
                <select
                  value={resourceType}
                  onChange={(e) => setResourceType(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value="whitepaper">Whitepaper</option>
                  <option value="webinar">Webinar</option>
                  <option value="event">Event</option>
                  <option value="faq">FAQ</option>
                  <option value="glossary">Glossary Term</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Resource title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Resource description"
                />
              </div>

              {resourceType === 'whitepaper' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PDF URL</label>
                    <input
                      type="text"
                      value={formData.file_url || ''}
                      onChange={(e) => setFormData({...formData, file_url: e.target.value})}
                      className="w-full border rounded-lg px-4 py-2"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pages</label>
                    <input
                      type="number"
                      value={formData.pages || ''}
                      onChange={(e) => setFormData({...formData, pages: e.target.value})}
                      className="w-full border rounded-lg px-4 py-2"
                      placeholder="Number of pages"
                    />
                  </div>
                </>
              )}

              {resourceType === 'webinar' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={formData.webinar_date || ''}
                      onChange={(e) => setFormData({...formData, webinar_date: e.target.value})}
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="text"
                      value={formData.webinar_time || ''}
                      onChange={(e) => setFormData({...formData, webinar_time: e.target.value})}
                      className="w-full border rounded-lg px-4 py-2"
                      placeholder="2:00 PM EST"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                    <input
                      type="number"
                      value={formData.duration || ''}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Speaker</label>
                    <input
                      type="text"
                      value={formData.speaker || ''}
                      onChange={(e) => setFormData({...formData, speaker: e.target.value})}
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.webinar_status || 'upcoming'}
                      onChange={(e) => setFormData({...formData, webinar_status: e.target.value})}
                      className="w-full border rounded-lg px-4 py-2"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="recorded">Recorded</option>
                      <option value="live">Live</option>
                    </select>
                  </div>
                </div>
              )}

              {resourceType === 'event' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                    <input
                      type="date"
                      value={formData.event_date || ''}
                      onChange={(e) => setFormData({...formData, event_date: e.target.value})}
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={formData.location || ''}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                    <input
                      type="text"
                      value={formData.event_type || ''}
                      onChange={(e) => setFormData({...formData, event_type: e.target.value})}
                      className="w-full border rounded-lg px-4 py-2"
                      placeholder="Conference, Webinar, Workshop"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={resetForm} className="btn-secondary">Cancel</button>
                <button onClick={handleSubmit} className="btn-primary flex items-center gap-2">
                  <Save size={16} /> {editing ? 'Update' : 'Save'} Resource
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesManager;