import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Zap, Building2, Users, Clock, DollarSign } from 'lucide-react';

const Pricing = () => {
  const [selectedModel, setSelectedModel] = useState('end-to-end');

  const models = {
    'end-to-end': {
      name: 'End-to-End RCM',
      description: 'Full revenue cycle management from patient registration to final payment',
      price: '3.5% - 6.5%',
      features: [
        'Patient registration & eligibility verification',
        'Medical coding (AAPC certified)',
        'Claims submission & tracking',
        'Payment posting & reconciliation',
        'Denial management & appeals',
        'AR follow-up (30+ days)',
        'Monthly performance reporting',
        'Dedicated account manager'
      ]
    },
    'partial': {
      name: 'Partial RCM',
      description: 'Choose specific modules to complement your existing team',
      price: 'Custom',
      features: [
        'Medical coding only',
        'Denial management only',
        'AR follow-up only',
        'Credentialing services',
        'Telehealth billing',
        'Pay-per-claim model available',
        'No long-term commitment',
        'Scale up/down monthly'
      ]
    },
    'co-managed': {
      name: 'Co-Managed System',
      description: 'We augment your internal billing team with our specialists',
      price: '$45 - $65 / hour',
      features: [
        'Dedicated offshore team members',
        'Work alongside your existing billers',
        'Train on your existing workflows',
        'No minimum hours commitment',
        'Same-day task completion',
        'Weekly strategy calls',
        'Transparent time tracking',
        '30-day satisfaction guarantee'
      ]
    },
    'fte': {
      name: 'FTE Model',
      description: 'Dedicated full-time equivalent team at 60% less cost',
      price: '$2,500 - $4,500 / month',
      features: [
        'Dedicated billers assigned to your practice',
        'Full-time coverage (40 hours/week)',
        'Same US-based workflows',
        'HIPAA & SOC2 compliant',
        'Includes all software licenses',
        'Monthly performance bonuses',
        '12-month lock-in rate',
        'Free replacement if needed'
      ]
    }
  };

  const [formData, setFormData] = useState({
    providerCount: 5,
    monthlyClaims: 1000,
    name: '',
    email: '',
    phone: ''
  });

  const estimatedSavings = () => {
    const baseCost = formData.monthlyClaims * 25;
    const mahastarCost = formData.monthlyClaims * 8;
    const savings = baseCost - mahastarCost;
    return savings > 0 ? savings.toLocaleString() : 0;
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the model that fits your practice. No hidden fees. No long-term contracts.
          </p>
        </div>

        {/* Pricing Model Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(models).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedModel(key)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedModel === key
                  ? 'bg-dark text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {models[key].name}
            </button>
          ))}
        </div>

        {/* Pricing Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="grid md:grid-cols-2">
            <div className="p-8 bg-gradient-to-br from-dark to-primary text-white">
              <h3 className="text-2xl font-bold mb-2">{models[selectedModel].name}</h3>
              <p className="text-blue-100 mb-4">{models[selectedModel].description}</p>
              <div className="text-4xl font-bold mb-1">{models[selectedModel].price}</div>
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
                {models[selectedModel].features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ROI Calculator */}
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

        {/* FAQ Section */}
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

export default Pricing;