import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle } from 'lucide-react';

const Anesthesiology = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Clock className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">Anesthesiology Medical Billing Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Specialized anesthesia billing for time-based coding, base units, and modifier usage.</p>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary">96%</div><div className="text-gray-600">First-Pass Rate</div></div>
            <div><div className="text-3xl font-bold text-primary">2,000+</div><div className="text-gray-600">Anesthesiologists Served</div></div>
            <div><div className="text-3xl font-bold text-primary">20</div><div className="text-gray-600">Days AR</div></div>
            <div><div className="text-3xl font-bold text-primary">100%</div><div className="text-gray-600">Time Documentation</div></div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-dark mb-6">Expert Anesthesiology Coding & Billing</h2>
              <p className="text-gray-600 mb-6">Anesthesiology billing requires expertise in time-based coding, base unit calculation, and medical direction rules.</p>
              
              <h3 className="text-2xl font-bold text-dark mb-4">Common CPT Codes</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {['00100-01999 (Anesthesia codes)', '99100 (Extreme age)', '99116 (Hypothermia)', '99135 (Hypotension)', '99140 (Emergency)', '99143-99150 (Moderate sedation)'].map(s => (
                  <span key={s} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{s}</span>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-dark mb-3">Anesthesiology Billing Expertise</h4>
                <ul className="space-y-2">
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Time unit calculation (1 unit = 15 minutes)</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Modifier AA, QK, QX, QY for medical direction</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Base unit verification per ASA codes</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Teaching anesthesiologist billing rules</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-6 border h-fit sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4">Anesthesiology Billing Assessment</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('An anesthesiology billing specialist will contact you.'); }} className="space-y-4">
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

export default Anesthesiology;