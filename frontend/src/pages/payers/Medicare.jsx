import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, Clock, DollarSign, FileText, AlertCircle } from 'lucide-react';

const Medicare = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Shield className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">Medicare Billing Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Expert Medicare Part A, Part B, and Medicare Advantage billing with 98% first-pass acceptance rate.</p>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary">98%</div><div className="text-gray-600">First-Pass Rate</div></div>
            <div><div className="text-3xl font-bold text-primary">2,500+</div><div className="text-gray-600">Medicare Providers</div></div>
            <div><div className="text-3xl font-bold text-primary">14</div><div className="text-gray-600">Days to Payment</div></div>
            <div><div className="text-3xl font-bold text-primary">100%</div><div className="text-gray-600">NCCI Compliance</div></div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-dark mb-6">Complete Medicare Billing Solutions</h2>
              <p className="text-gray-600 mb-6">We specialize in Medicare billing compliance, ensuring your claims meet all CMS requirements for maximum reimbursement.</p>
              
              <h3 className="text-2xl font-bold text-dark mb-4">Medicare Services We Handle</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {['Part A (Hospital/Facility)', 'Part B (Professional/Medical)', 'Medicare Advantage (Part C)', 'Prescription Drug (Part D)', 'Medicare Secondary Payer (MSP)', 'DMEPOS billing', 'Home health billing', 'Hospice billing'].map(s => (
                  <span key={s} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{s}</span>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-dark mb-4">Medicare Compliance Expertise</h3>
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg"><span>NCCI Edits</span><span className="text-primary font-semibold">100% Compliant</span></div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg"><span>LCD/NCD Compliance</span><span className="text-primary font-semibold">Automated Checks</span></div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg"><span>MUE Limits</span><span className="text-primary font-semibold">Real-time Validation</span></div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg"><span>Modifier Usage</span><span className="text-primary font-semibold">AI-Assisted</span></div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-dark mb-3">Why Choose Us for Medicare Billing?</h4>
                <ul className="space-y-2">
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Certified Medicare billing specialists</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Real-time NCCI and MUE validation</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Medicare denial management and appeals</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />MAC-specific requirements expertise</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-6 border h-fit sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4">Medicare Billing Assessment</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('A Medicare billing specialist will contact you.'); }} className="space-y-4">
                <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg px-4 py-2" required />
                <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border rounded-lg px-4 py-2" required />
                <input type="tel" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border rounded-lg px-4 py-2" />
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold">Get Medicare Audit →</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <Link to="/contact" className="bg-accent px-8 py-3 rounded-lg font-semibold inline-block">Schedule Medicare Consultation</Link>
      </section>
    </div>
  );
};

export default Medicare;