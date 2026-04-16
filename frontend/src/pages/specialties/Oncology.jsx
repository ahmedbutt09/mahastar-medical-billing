import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, CheckCircle } from 'lucide-react';

const Oncology = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Activity className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">Oncology Medical Billing Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Specialized oncology billing for chemotherapy, radiation therapy, and cancer care management.</p>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary">95%</div><div className="text-gray-600">First-Pass Rate</div></div>
            <div><div className="text-3xl font-bold text-primary">600+</div><div className="text-gray-600">Oncologists Served</div></div>
            <div><div className="text-3xl font-bold text-primary">21</div><div className="text-gray-600">Days AR</div></div>
            <div><div className="text-3xl font-bold text-primary">$8.5K</div><div className="text-gray-600">Avg Chemo Claim</div></div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-dark mb-6">Expert Oncology Coding & Billing</h2>
              <p className="text-gray-600 mb-6">Oncology billing requires expertise in chemotherapy administration coding, J-code management, and radiation therapy billing.</p>
              
              <h3 className="text-2xl font-bold text-dark mb-4">Services We Code</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Chemotherapy administration (96400-96549)', 'J-code drug billing', 'Radiation therapy (77300-77799)', 'Hormonal therapy', 'Immunotherapy', 'Palliative care', 'Cancer screening', 'Survivorship care'].map(s => (
                  <span key={s} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{s}</span>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-dark mb-3">Oncology Billing Expertise</h4>
                <ul className="space-y-2">
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Chemotherapy drug J-code management</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Infusion time tracking and coding</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Radiation therapy fractions billing</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />340B drug pricing compliance</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-6 border h-fit sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4">Oncology Billing Assessment</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('An oncology billing specialist will contact you.'); }} className="space-y-4">
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

export default Oncology;