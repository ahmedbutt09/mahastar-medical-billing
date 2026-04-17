import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, Loader } from 'lucide-react';
import api from '../api';

const Pricing = () => {
  const [selectedModel, setSelectedModel] = useState('end-to-end');
  const [pricingModels, setPricingModels] = useState({});
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    providerCount: 5,
    monthlyClaims: 1000,
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetchPricingConfig();
  }, []);

  const fetchPricingConfig = async () => {
    try {
      const response = await api.get('/api/pricing-config');
      if (response.data.success) {
        const modelsMap = {};
        response.data.data.forEach(model => {
          modelsMap[model.model_key] = model;
        });
        setPricingModels(modelsMap);
      }
    } catch (error) {
      console.error('Error fetching pricing:', error);
      // Fallback to hardcoded data if API fails
      setPricingModels(fallbackPricing);
    } finally {
      setLoading(false);
    }
  };

  const estimatedSavings = () => {
    const baseCost = formData.monthlyClaims * 25;
    const mahastarCost = formData.monthlyClaims * 8;
    const savings = baseCost - mahastarCost;
    return savings > 0 ? savings.toLocaleString() : 0;
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <Loader className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  const currentModel = pricingModels[selectedModel] || {};

  return (
    <div className="pt-24 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header - Static */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the model that fits your practice. No hidden fees. No long-term contracts.
          </p>
        </div>

        {/* Pricing Model Selector - Dynamic from DB */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(pricingModels).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedModel(key)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedModel === key
                  ? 'bg-dark text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {pricingModels[key]?.model_name}
            </button>
          ))}
        </div>

        {/* Pricing Card - Dynamic from DB */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="grid md:grid-cols-2">
            <div className="p-8 bg-gradient-to-br from-dark to-primary text-white">
              <h3 className="text-2xl font-bold mb-2">{currentModel.model_name}</h3>
              <p className="text-blue-100 mb-4">{currentModel.description}</p>
              <div className="text-4xl font-bold mb-1">{currentModel.price_text}</div>
              <p className="text-blue-100 text-sm mb-6">per month • no setup fee</p>
              <Link
                to="/contact"
                className="block text-center bg-accent hover:bg-secondary text-white py-3 rounded-xl font-semibold transition"
              >
                Get Started →
              </Link>
              <p className="text-xs text-blue-100 mt-4 text-center">30-day satisfaction guarantee</p>
            </div>
            <div className="p-8">
              <h4 className="font-semibold text-lg mb-4 text-dark">What's included:</h4>
              <div className="space-y-3">
                {currentModel.features?.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ROI Calculator - Static (interactive) */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-dark text-center mb-6">
            📊 See How Much You Can Save
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Providers
              </label>
              <select
                value={formData.providerCount}
                onChange={(e) => setFormData({...formData, providerCount: parseInt(e.target.value)})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
              >
                <option value={1}>1 Provider</option>
                <option value={2}>2 Providers</option>
                <option value={5}>5 Providers</option>
                <option value={10}>10 Providers</option>
                <option value={20}>20 Providers</option>
                <option value={50}>50+ Providers</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Claims Volume
              </label>
              <select
                value={formData.monthlyClaims}
                onChange={(e) => setFormData({...formData, monthlyClaims: parseInt(e.target.value)})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
              >
                <option value={100}>100+ claims</option>
                <option value={500}>500+ claims</option>
                <option value={1000}>1,000+ claims</option>
                <option value={2500}>2,500+ claims</option>
                <option value={5000}>5,000+ claims</option>
                <option value={10000}>10,000+ claims</option>
              </select>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-sm text-gray-600 mb-1">Estimated Monthly Savings</div>
              <div className="text-3xl font-bold text-primary">${estimatedSavings()}</div>
              <div className="text-xs text-gray-500">vs. in-house billing</div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link to="/contact" className="bg-dark text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary transition inline-block">
              Get Custom Quote
            </Link>
          </div>
        </div>

        {/* FAQ Section - Static */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-dark mb-4">Frequently Asked Questions</h3>
          <p className="text-gray-600">
            Have questions? <Link to="/contact" className="text-primary hover:underline">Contact our sales team</Link> for a personalized quote.
          </p>
        </div>
      </div>
    </div>
  );
};

// Fallback data if API fails
const fallbackPricing = {
  'end-to-end': {
    model_name: 'End-to-End RCM',
    description: 'Full revenue cycle management',
    price_text: '3.5% - 6.5%',
    features: ['Patient registration', 'Medical coding', 'Claims submission']
  },
  'partial': {
    model_name: 'Partial RCM',
    description: 'Choose specific modules',
    price_text: 'Custom',
    features: ['Medical coding only', 'Denial management only']
  },
  'co-managed': {
    model_name: 'Co-Managed System',
    description: 'Augment your team',
    price_text: '$45 - $65 / hour',
    features: ['Dedicated team members', 'No minimum hours']
  },
  'fte': {
    model_name: 'FTE Model',
    description: 'Dedicated full-time team',
    price_text: '$2,500 - $4,500 / month',
    features: ['Dedicated billers', 'Full-time coverage']
  }
};

export default Pricing;