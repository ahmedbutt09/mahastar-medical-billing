import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const EClinicalWorks = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-6xl mb-4">💻</div>
          <h1 className="text-5xl font-bold mb-4">eClinicalWorks Integration</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Seamless eClinicalWorks integration for ambulatory practices and health centers.</p>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary">1,000+</div><div className="text-gray-600">ECW Practices</div></div>
            <div><div className="text-3xl font-bold text-primary">5</div><div className="text-gray-600">Days Integration</div></div>
            <div><div className="text-3xl font-bold text-primary">98%</div><div className="text-gray-600">Data Accuracy</div></div>
            <div><div className="text-3xl font-bold text-primary">24/7</div><div className="text-gray-600">ECW Support</div></div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-dark mb-3">eClinicalWorks Integration Features</h4>
                <ul className="space-y-2">
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Two-way API integration with ECW</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Automated claim extraction and submission</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Real-time eligibility checks via ECW</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />ECW denial management workflow</li>
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-xl p-6 border h-fit sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4">ECW Integration Assessment</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('An eClinicalWorks integration specialist will contact you.'); }} className="space-y-4">
                <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg px-4 py-2" required />
                <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border rounded-lg px-4 py-2" required />
                <input type="tel" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border rounded-lg px-4 py-2" />
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold">Schedule ECW Integration →</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <Link to="/contact" className="bg-accent px-8 py-3 rounded-lg font-semibold inline-block">Start ECW Integration</Link>
      </section>
    </div>
  );
};

export default EClinicalWorks;