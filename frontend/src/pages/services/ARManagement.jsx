import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  Clock, 
  TrendingDown, 
  PhoneCall,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Users,
  Target,
  RefreshCw
} from 'lucide-react';

const ARManagement = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    arBacklog: ''
  });

  const stats = [
    { value: '$2.5M+', label: 'Monthly AR Recovered', icon: DollarSign },
    { value: '<30 Days', label: 'Average Resolution Time', icon: Clock },
    { value: '94%', label: 'First-Call Resolution', icon: TrendingDown },
    { value: '24/7', label: 'Call Center Support', icon: PhoneCall },
  ];

  const agingBuckets = [
    { days: '31-60 Days', recovery: '85%', color: 'bg-yellow-500' },
    { days: '61-90 Days', recovery: '65%', color: 'bg-orange-500' },
    { days: '91-120 Days', recovery: '45%', color: 'bg-red-500' },
    { days: '120+ Days', recovery: '25%', color: 'bg-red-700' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('AR Assessment Request:', formData);
    alert('Thank you! An AR specialist will contact you within 24 hours to review your backlog.');
    setFormData({ name: '', email: '', phone: '', arBacklog: '' });
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-dark to-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">AR Management & Follow-up Services</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Power your AR management process with dedicated calling teams and proven recovery strategies
            </p>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-12 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-dark mb-4">Are You Struggling With These Challenges?</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <h3 className="font-bold text-dark mb-2">Huge AR Backlog?</h3>
              <p className="text-gray-600">Aging claims eating into your practice's cash flow</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <Target className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <h3 className="font-bold text-dark mb-2">Missing Every Billed Dollar?</h3>
              <p className="text-gray-600">Revenue left on the table due to inefficient follow-up</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <RefreshCw className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <h3 className="font-bold text-dark mb-2">Messy AR Process?</h3>
              <p className="text-gray-600">No clear workflow or accountability for collections</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-white rounded-xl shadow-md">
                <stat.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-dark">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div>
              <h2 className="text-3xl font-bold text-dark mb-6">Aggressive AR Recovery at Affordable Prices</h2>
              <p className="text-gray-600 mb-6">
                Are you tired of paying inflated AR calling bills? Whittle down not just on outstanding AR but AR calling costs as well. 
                We offer both insurer and patient calling services.
              </p>
              
              <h3 className="text-2xl font-bold text-dark mb-4">Our AR Management Process</h3>
              <div className="space-y-4 mb-8">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-dark">AR Triage & Prioritization</h4>
                    <p className="text-gray-600 text-sm">We analyze your aging report and prioritize by payer, amount, and days outstanding</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-dark">Insurer Calling Campaign</h4>
                    <p className="text-gray-600 text-sm">Dedicated team calls payers daily to resolve unpaid claims</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-dark">Patient Balance Follow-up</h4>
                    <p className="text-gray-600 text-sm">Professional patient calling to collect deductibles and co-insurance</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold text-dark">Weekly Reporting</h4>
                    <p className="text-gray-600 text-sm">Transparent updates on claims resolved, dollars collected, and next steps</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-dark mb-4">Recovery Rates by Aging Bucket</h3>
              <div className="space-y-3">
                {agingBuckets.map((bucket, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{bucket.days}</span>
                      <span className="font-semibold">{bucket.recovery} recovery rate</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${bucket.color} h-2 rounded-full`} style={{ width: bucket.recovery }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">*Early intervention dramatically improves recovery rates</p>
            </div>

            {/* Right Column - Form */}
            <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200 h-fit sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4">Get a Free AR Assessment</h3>
              <p className="text-gray-600 text-sm mb-6">
                Tell us about your AR backlog and we'll provide a recovery estimate.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                    placeholder="john@practice.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current AR Backlog (approx.)</label>
                  <select
                    value={formData.arBacklog}
                    onChange={(e) => setFormData({...formData, arBacklog: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="">Select amount</option>
                    <option value="< $50k">Less than $50,000</option>
                    <option value="$50k - $100k">$50,000 - $100,000</option>
                    <option value="$100k - $250k">$100,000 - $250,000</option>
                    <option value="$250k - $500k">$250,000 - $500,000</option>
                    <option value="$500k+">Over $500,000</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition"
                >
                  Get Recovery Estimate →
                </button>
              </form>
              <p className="text-xs text-gray-500 text-center mt-4">
                Free, no-obligation AR analysis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Info */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-dark mb-4">Affordable AR Calling Prices</h2>
          <p className="text-gray-600 mb-8">
            Pay only for successful recoveries. No upfront fees. No hidden charges.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="text-2xl font-bold text-primary">15%</div>
              <div className="text-sm text-gray-600">of recovered amount</div>
              <div className="mt-2 text-xs text-gray-500">Insurer follow-up only</div>
            </div>
            <div className="border-2 border-primary rounded-xl p-6 bg-primary/5">
              <div className="text-2xl font-bold text-primary">20%</div>
              <div className="text-sm text-gray-600">of recovered amount</div>
              <div className="mt-2 text-xs text-gray-500">Insurer + Patient calling</div>
              <div className="mt-2 inline-block bg-primary text-white text-xs px-2 py-1 rounded">Most Popular</div>
            </div>
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="text-2xl font-bold text-primary">$35/hr</div>
              <div className="text-sm text-gray-600">dedicated AR specialist</div>
              <div className="mt-2 text-xs text-gray-500">Monthly retainer model</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Recover Your AR?</h2>
          <p className="text-xl text-blue-100 mb-6">Stop leaving money on the table</p>
          <Link to="/contact" className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition inline-block">
            Start AR Recovery Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ARManagement;