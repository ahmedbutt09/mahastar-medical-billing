import React, { useState, useEffect } from 'react';
import api from '../../api';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Save, X, DollarSign } from 'lucide-react';

const PricingManager = () => {
  const [pricingModels, setPricingModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    model_key: '',
    model_name: '',
    description: '',
    price_text: '',
    features: [],
    sort_order: 0
  });
  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/pricing-config');
      setPricingModels(response.data.data || []);
    } catch (error) {
      toast.error('Failed to fetch pricing');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.model_name) {
      toast.error('Please fill in model name');
      return;
    }

    try {
      if (editing) {
        await api.put(`/api/pricing-config/${editing}`, formData);
        toast.success('Pricing model updated');
      } else {
        await api.post('/api/pricing-config', formData);
        toast.success('Pricing model added');
      }
      resetForm();
      fetchPricing();
    } catch (error) {
      toast.error('Failed to save pricing');
    }
  };

  const deletePricing = async (id) => {
    if (window.confirm('Are you sure you want to delete this pricing model?')) {
      try {
        await api.delete(`/api/pricing-config/${id}`);
        toast.success('Pricing model deleted');
        fetchPricing();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const resetForm = () => {
    setShowModal(false);
    setEditing(null);
    setFormData({
      model_key: '',
      model_name: '',
      description: '',
      price_text: '',
      features: [],
      sort_order: pricingModels.length
    });
    setFeatureInput('');
  };

  if (loading) {
    return <div className="text-center py-12">Loading pricing models...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-dark">Pricing Models</h2>
          <p className="text-gray-500 text-sm mt-1">Manage subscription plans and pricing options</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={16} /> Add Pricing Model
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 p-6">
        {pricingModels.map((model) => (
          <div key={model.id} className="border rounded-xl p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-dark">{model.model_name}</h3>
                <p className="text-2xl font-bold text-primary mt-2">{model.price_text}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => {
                  setEditing(model.id);
                  setFormData(model);
                  setShowModal(true);
                }} className="text-blue-600 hover:text-blue-800">
                  <Edit size={18} />
                </button>
                <button onClick={() => deletePricing(model.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">{model.description}</p>
            <div className="border-t pt-4">
              <p className="font-semibold text-sm mb-2">Features:</p>
              <ul className="space-y-1">
                {model.features?.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                    <DollarSign size={12} className="text-primary" /> {feature}
                  </li>
                ))}
                {model.features?.length > 3 && (
                  <li className="text-sm text-gray-400">+{model.features.length - 3} more features</li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-dark">{editing ? 'Edit Pricing Model' : 'Add Pricing Model'}</h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model Key</label>
                <input
                  type="text"
                  value={formData.model_key}
                  onChange={(e) => setFormData({...formData, model_key: e.target.value.toLowerCase().replace(/\s/g, '-')})}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="end-to-end, partial, co-managed, fte"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model Name</label>
                <input
                  type="text"
                  value={formData.model_name}
                  onChange={(e) => setFormData({...formData, model_name: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="End-to-End RCM"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Brief description of this pricing model"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Text</label>
                <input
                  type="text"
                  value={formData.price_text}
                  onChange={(e) => setFormData({...formData, price_text: e.target.value})}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="3.5% - 6.5% or $2,500 - $4,500 / month"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    className="flex-1 border rounded-lg px-4 py-2"
                    placeholder="Enter a feature"
                  />
                  <button onClick={addFeature} className="bg-primary text-white px-4 py-2 rounded-lg">Add</button>
                </div>
                <div className="space-y-1">
                  {formData.features.map((feature, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                      <span className="text-sm">{feature}</span>
                      <button onClick={() => removeFeature(idx)} className="text-red-500 hover:text-red-700">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
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
                  <Save size={16} /> {editing ? 'Update' : 'Save'} Pricing Model
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingManager;