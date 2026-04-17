import React, { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Save, X, Layout, Eye, EyeOff } from 'lucide-react';

const DynamicPagesManager = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    page_type: 'services',
    slug: '',
    page_title: '',
    hero_title: '',
    hero_subtitle: '',
    main_title: '',
    content: '',
    cta_title: '',
    cta_text: '',
    cta_button: '',
    cta_link: '/contact',
    is_active: true
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/dynamic-pages');
      setPages(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch pages');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.page_title || !formData.slug) {
      toast.error('Please fill in page title and slug');
      return;
    }

    try {
      if (editing) {
        await api.put(`/api/dynamic-page/${editing}`, formData);
        toast.success('Page updated');
      } else {
        await api.post('/api/dynamic-page', formData);
        toast.success('Page created');
      }
      resetForm();
      fetchPages();
    } catch (error) {
      toast.error('Failed to save page');
    }
  };

  const deletePage = async (id) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      try {
        await api.delete(`/api/dynamic-page/${id}`);
        toast.success('Page deleted');
        fetchPages();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      await api.patch(`/api/dynamic-page/${id}/toggle`, { is_active: !currentStatus });
      toast.success(`Page ${!currentStatus ? 'activated' : 'deactivated'}`);
      fetchPages();
    } catch (error) {
      toast.error('Failed to toggle status');
    }
  };

  const resetForm = () => {
    setShowModal(false);
    setEditing(null);
    setFormData({
      page_type: 'services',
      slug: '',
      page_title: '',
      hero_title: '',
      hero_subtitle: '',
      main_title: '',
      content: '',
      cta_title: '',
      cta_text: '',
      cta_button: '',
      cta_link: '/contact',
      is_active: true
    });
  };

  const pageTypes = [
    { value: 'services', label: 'Services' },
    { value: 'specialties', label: 'Specialties' },
    { value: 'payers', label: 'Payers' },
    { value: 'ehr', label: 'EHR Integrations' },
    { value: 'software', label: 'Software' },
    { value: 'automation', label: 'Automation' },
    { value: 'solutions', label: 'Solutions' },
    { value: 'audience', label: 'Audience Pages' }
  ];

  if (loading) {
    return <div className="text-center py-12">Loading dynamic pages...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-dark">Dynamic Pages</h2>
          <p className="text-gray-500 text-sm mt-1">Manage all content-driven pages (40+ pages)</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={16} /> Create Page
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className="capitalize px-2 py-1 bg-gray-100 rounded text-xs">{page.page_type}</span>
                </td>
                <td className="px-6 py-4 font-medium">{page.page_title}</td>
                <td className="px-6 py-4 text-sm">{page.slug}</td>
                <td className="px-6 py-4 text-sm text-primary">/{page.page_type}/{page.slug}</td>
                <td className="px-6 py-4">
                  <button onClick={() => toggleActive(page.id, page.is_active)}>
                    {page.is_active ? (
                      <Eye className="w-5 h-5 text-green-600" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                 </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => {
                      setEditing(page.id);
                      setFormData(page);
                      setShowModal(true);
                    }} className="text-blue-600 hover:text-blue-800">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => deletePage(page.id)} className="text-red-600 hover:text-red-800">
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
              <h2 className="text-2xl font-bold text-dark">{editing ? 'Edit Page' : 'Create New Page'}</h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Page Type</label>
                  <select
                    value={formData.page_type}
                    onChange={(e) => setFormData({...formData, page_type: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2"
                  >
                    {pageTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s/g, '-')})}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="cardiology, medicare, etc."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                <input
                  type="text"
                  value={formData.page_title}
                  onChange={(e) => setFormData({...formData, page_title: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Cardiology Medical Billing"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
                <input
                  type="text"
                  value={formData.hero_title}
                  onChange={(e) => setFormData({...formData, hero_title: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Hero section headline"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
                <textarea
                  rows="2"
                  value={formData.hero_subtitle}
                  onChange={(e) => setFormData({...formData, hero_subtitle: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Supporting text for hero section"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Main Content (HTML)</label>
                <textarea
                  rows="6"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2 font-mono text-sm"
                  placeholder="<p>Main page content in HTML...</p>"
                />
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-dark mb-3">Call to Action Section</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CTA Title</label>
                    <input
                      type="text"
                      value={formData.cta_title}
                      onChange={(e) => setFormData({...formData, cta_title: e.target.value})}
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
                    <input
                      type="text"
                      value={formData.cta_button}
                      onChange={(e) => setFormData({...formData, cta_button: e.target.value})}
                      className="w-full border rounded-lg px-4 py-2"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
                  <textarea
                    rows="2"
                    value={formData.cta_text}
                    onChange={(e) => setFormData({...formData, cta_text: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
                  <input
                    type="text"
                    value={formData.cta_link}
                    onChange={(e) => setFormData({...formData, cta_link: e.target.value})}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="/contact"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button onClick={resetForm} className="btn-secondary">Cancel</button>
                <button onClick={handleSubmit} className="btn-primary flex items-center gap-2">
                  <Save size={16} /> {editing ? 'Update' : 'Create'} Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicPagesManager;