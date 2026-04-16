import React, { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { Save, Edit, Eye, Plus, X } from 'lucide-react';

const PageContentManager = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    page_slug: '',
    page_name: '',
    hero_title: '',
    hero_subtitle: '',
    hero_image: '',
    content: '',
    cta_title: '',
    cta_text: '',
    cta_button_text: '',
    cta_button_link: '',
    meta_title: '',
    meta_description: ''
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await api.get('/api/page-contents');
      setPages(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch pages');
    }
  };

  const handleSelectPage = async (slug) => {
    try {
      const response = await api.get(`/api/page-content/${slug}`);
      if (response.data.data) {
        setFormData(response.data.data);
      } else {
        // New page - set defaults based on slug
        setFormData({
          page_slug: slug,
          page_name: slug.charAt(0).toUpperCase() + slug.slice(1),
          hero_title: '',
          hero_subtitle: '',
          hero_image: '',
          content: '',
          cta_title: '',
          cta_text: '',
          cta_button_text: 'Learn More',
          cta_button_link: '/contact',
          meta_title: '',
          meta_description: ''
        });
      }
      setSelectedPage(slug);
      setEditing(true);
    } catch (error) {
      toast.error('Error loading page');
    }
  };

  const handleSave = async () => {
    try {
      await api.post('/api/page-content', formData);
      toast.success('Page content saved successfully!');
      setEditing(false);
      fetchPages();
    } catch (error) {
      toast.error('Failed to save page content');
    }
  };

  const pagesList = [
    { slug: 'services', name: 'Services Page' },
    { slug: 'about', name: 'About Us' },
    { slug: 'pricing', name: 'Pricing' },
    { slug: 'contact', name: 'Contact' },
    { slug: 'home', name: 'Homepage' },
    { slug: 'case-studies', name: 'Case Studies' },
    { slug: 'blog', name: 'Blog' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Selector */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Select Page to Edit</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {pagesList.map(page => (
            <button
              key={page.slug}
              onClick={() => handleSelectPage(page.slug)}
              className={`p-3 text-left rounded-lg border transition-all ${
                selectedPage === page.slug 
                  ? 'border-primary bg-primary/5 text-primary' 
                  : 'border-gray-200 hover:border-primary'
              }`}
            >
              <div className="font-medium">{page.name}</div>
              <div className="text-xs text-gray-500 mt-1">/{page.slug}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      {editing && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Editing: {formData.page_name}</h3>
            <button onClick={() => setEditing(false)} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Hero Section */}
            <div className="border-b pb-4">
              <h4 className="font-semibold text-lg mb-4">Hero Section</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
                  <input
                    type="text"
                    value={formData.hero_title || ''}
                    onChange={(e) => setFormData({...formData, hero_title: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Main headline"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image URL</label>
                  <input
                    type="text"
                    value={formData.hero_image || ''}
                    onChange={(e) => setFormData({...formData, hero_image: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
                <textarea
                  value={formData.hero_subtitle || ''}
                  onChange={(e) => setFormData({...formData, hero_subtitle: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  rows="2"
                  placeholder="Supporting text"
                />
              </div>
            </div>

            {/* CTA Section */}
            <div className="border-b pb-4">
              <h4 className="font-semibold text-lg mb-4">Call to Action Section</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CTA Title</label>
                  <input
                    type="text"
                    value={formData.cta_title || ''}
                    onChange={(e) => setFormData({...formData, cta_title: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={formData.cta_button_text || ''}
                    onChange={(e) => setFormData({...formData, cta_button_text: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
                <textarea
                  value={formData.cta_text || ''}
                  onChange={(e) => setFormData({...formData, cta_text: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  rows="2"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Link</label>
                <input
                  type="text"
                  value={formData.cta_button_link || ''}
                  onChange={(e) => setFormData({...formData, cta_button_link: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="/contact"
                />
              </div>
            </div>

            {/* SEO Section */}
            <div className="border-b pb-4">
              <h4 className="font-semibold text-lg mb-4">SEO Settings</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                  <input
                    type="text"
                    value={formData.meta_title || ''}
                    onChange={(e) => setFormData({...formData, meta_title: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Page title for search engines"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                  <textarea
                    value={formData.meta_description || ''}
                    onChange={(e) => setFormData({...formData, meta_description: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    rows="2"
                    placeholder="Description for search results"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-3">
              <button onClick={() => setEditing(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview of existing pages */}
      {!editing && pages.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Saved Page Content</h3>
          <div className="space-y-2">
            {pages.map(page => (
              <div key={page.id} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{page.page_name}</div>
                  <div className="text-sm text-gray-500">/{page.page_slug}</div>
                </div>
                <button 
                  onClick={() => handleSelectPage(page.page_slug)}
                  className="text-primary hover:text-primary/80"
                >
                  <Edit size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PageContentManager;