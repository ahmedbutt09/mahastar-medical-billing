import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PracticeFusion = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-6xl mb-4">🔬</div>
          <h1 className="text-5xl font-bold mb-4">Practice Fusion Integration</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Seamless Practice Fusion integration for independent and small group practices.</p>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary">1,500+</div><div className="text-gray-600">PF Practices</div></div>
            <div><div className="text-3xl font-bold text-primary">3</div><div className="text-gray-600">Days Integration</div></div>
            <div><div className="text-3xl font-bold text-primary">97%</div><div className="text-gray-600">Data Accuracy</div></div>
            <div><div className="text-3xl font-bold text-primary">24/7</div><div className="text-gray-600">PF Support</div></div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-dark mb-3">Practice Fusion Integration Features</h4>
                <ul className="space-y-2">
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Practice Fusion API integration</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Automated claim extraction</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Real-time eligibility verification</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Practice Fusion denial management</li>
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-xl p-6 border h-fit sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4">Practice Fusion Assessment</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('A Practice Fusion integration specialist will contact you.'); }} className="space-y-4">
                <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg px-4 py-2" required />
                <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border rounded-lg px-4 py-2" required />
                <input type="tel" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border rounded-lg px-4 py-2" />
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold">Schedule PF Integration →</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <Link to="/contact" className="bg-accent px-8 py-3 rounded-lg font-semibold inline-block">Start Practice Fusion Integration</Link>
      </section>
    </div>
  );
};

export default PracticeFusion;