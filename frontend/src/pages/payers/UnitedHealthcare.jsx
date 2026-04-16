import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, CheckCircle } from 'lucide-react';

const UnitedHealthcare = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <TrendingUp className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">UnitedHealthcare Billing Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Expert UHC billing for commercial, Medicare Advantage, and Exchange plans.</p>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary">96%</div><div className="text-gray-600">First-Pass Rate</div></div>
            <div><div className="text-3xl font-bold text-primary">15K+</div><div className="text-gray-600">Annual Claims</div></div>
            <div><div className="text-3xl font-bold text-primary">16</div><div className="text-gray-600">Days to Payment</div></div>
            <div><div className="text-3xl font-bold text-primary">92%</div><div className="text-gray-600">Appeal Success</div></div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-dark mb-6">UnitedHealthcare Billing Expertise</h2>
              <p className="text-gray-600 mb-6">UHC has complex billing rules across its many products. Our team specializes in UHC claim submission and denial management.</p>
              
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-dark mb-3">UHC Billing Expertise</h4>
                <ul className="space-y-2">
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />UHC Medicare Advantage billing</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Optum claim processing and appeals</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />UHC Exchange plan billing</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Pre-authorization management</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-6 border h-fit sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4">UHC Billing Assessment</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('A UHC billing specialist will contact you.'); }} className="space-y-4">
                <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg px-4 py-2" required />
                <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border rounded-lg px-4 py-2" required />
                <input type="tel" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border rounded-lg px-4 py-2" />
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold">Get UHC Audit →</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <Link to="/contact" className="bg-accent px-8 py-3 rounded-lg font-semibold inline-block">Schedule UHC Consultation</Link>
      </section>
    </div>
  );
};

export default UnitedHealthcare;