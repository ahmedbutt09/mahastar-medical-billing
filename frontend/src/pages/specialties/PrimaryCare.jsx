import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, CheckCircle } from 'lucide-react';

const PrimaryCare = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Stethoscope className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">Primary Care Medical Billing Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Comprehensive primary care billing for family medicine, internal medicine, and general practice.</p>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary">97%</div><div className="text-gray-600">First-Pass Rate</div></div>
            <div><div className="text-3xl font-bold text-primary">2,500+</div><div className="text-gray-600">Providers Served</div></div>
            <div><div className="text-3xl font-bold text-primary">18</div><div className="text-gray-600">Days AR</div></div>
            <div><div className="text-3xl font-bold text-primary">30%</div><div className="text-gray-600">Revenue Increase</div></div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-dark mb-6">Complete Primary Care RCM Solutions</h2>
              <p className="text-gray-600 mb-6">Primary care billing involves preventive medicine, chronic care management, and value-based coding. Our team ensures you capture every service.</p>
              
              <h3 className="text-2xl font-bold text-dark mb-4">Services We Handle</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Annual wellness visits', 'Chronic care management', 'Preventive medicine', 'E/M coding (99202-99215)', 'Telehealth visits', 'Transitional care management', 'Annual physicals', 'Vaccine administration'].map(s => (
                  <span key={s} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{s}</span>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-dark mb-3">Primary Care Billing Expertise</h4>
                <ul className="space-y-2">
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Medicare annual wellness visits (AWV)</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Chronic Care Management (CCM) billing</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Transitional Care Management (TCM)</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Value-based care reporting</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-6 border h-fit sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4">Primary Care Billing Assessment</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('A primary care billing specialist will contact you.'); }} className="space-y-4">
                <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg px-4 py-2" required />
                <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border rounded-lg px-4 py-2" required />
                <input type="tel" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border rounded-lg px-4 py-2" />
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold">Get Free Assessment →</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <Link to="/contact" className="bg-accent px-8 py-3 rounded-lg font-semibold inline-block">Schedule a Consultation</Link>
      </section>
    </div>
  );
};

export default PrimaryCare;