import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Baby, CheckCircle } from 'lucide-react';

const Pediatrics = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Baby className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">Pediatrics Medical Billing Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Specialized pediatric billing for well-child visits, vaccinations, and developmental screenings.</p>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary">98%</div><div className="text-gray-600">First-Pass Rate</div></div>
            <div><div className="text-3xl font-bold text-primary">1,800+</div><div className="text-gray-600">Pediatricians Served</div></div>
            <div><div className="text-3xl font-bold text-primary">15</div><div className="text-gray-600">Days AR</div></div>
            <div><div className="text-3xl font-bold text-primary">100%</div><div className="text-gray-600">Vaccine Billing</div></div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-dark mb-6">Expert Pediatric Coding & Billing</h2>
              <p className="text-gray-600 mb-6">Pediatric billing requires expertise in well-child visit codes, vaccine administration, and Bright Futures guidelines.</p>
              
              <h3 className="text-2xl font-bold text-dark mb-4">Services We Handle</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Well-child visits (99381-99397)', 'Vaccine administration (90460-90474)', 'Developmental screenings', 'Newborn care', 'Sick visits', 'School physicals', 'Sports physicals', 'Chronic pediatric conditions'].map(s => (
                  <span key={s} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{s}</span>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-dark mb-3">Pediatrics Billing Expertise</h4>
                <ul className="space-y-2">
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Vaccine for Children (VFC) program billing</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Bright Futures preventive medicine guidelines</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Newborn hospital care (99460-99465)</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />ADHD and behavioral health coding</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-6 border h-fit sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4">Pediatrics Billing Assessment</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('A pediatrics billing specialist will contact you.'); }} className="space-y-4">
                <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg px-4 py-2" required />
                <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border rounded-lg px-4 py-2" required />
                <input type="tel" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border rounded-lg px-4 py-2" />
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold">Request Consultation →</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <Link to="/contact" className="bg-accent px-8 py-3 rounded-lg font-semibold inline-block">Schedule a Free Consultation</Link>
      </section>
    </div>
  );
};

export default Pediatrics;