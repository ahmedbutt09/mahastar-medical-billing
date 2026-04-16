import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bone, CheckCircle, TrendingUp, Clock, DollarSign, Shield } from 'lucide-react';

const Orthopedics = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const cptCodes = ['29827', '29881', '27130', '27447', '22630', '22551', '28485', '27786'];
  const procedures = ['Rotator cuff repair', 'ACL reconstruction', 'Total knee replacement', 'Total hip replacement', 'Spinal fusion', 'Fracture repair'];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('An orthopedics billing specialist will contact you within 24 hours.');
    setFormData({ name: '', email: '', phone: '' });
  };

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Bone className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">Orthopedics Medical Billing Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Specialized orthopedic billing for surgical and non-surgical practices. Maximize reimbursement for complex procedures.</p>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary">96%</div><div className="text-gray-600">Clean Claim Rate</div></div>
            <div><div className="text-3xl font-bold text-primary">$5.2K</div><div className="text-gray-600">Avg Surgical Claim</div></div>
            <div><div className="text-3xl font-bold text-primary">900+</div><div className="text-gray-600">Orthopedic Surgeons</div></div>
            <div><div className="text-3xl font-bold text-primary">22</div><div className="text-gray-600">Days AR</div></div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-dark mb-6">Expert Orthopedic Surgery Coding</h2>
              <p className="text-gray-600 mb-6">Orthopedic billing involves complex surgical packages, global periods, and modifier usage. Our certified orthopedic coders maximize revenue while ensuring compliance.</p>
              
              <h3 className="text-2xl font-bold text-dark mb-4">Common Procedures We Code</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {procedures.map(proc => (<span key={proc} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{proc}</span>))}
              </div>

              <h3 className="text-2xl font-bold text-dark mb-4">Key CPT Codes</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {cptCodes.map(code => (<span key={code} className="bg-gray-100 px-3 py-1 rounded-full text-sm font-mono">{code}</span>))}
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-dark mb-3">Orthopedic Billing Expertise</h4>
                <ul className="space-y-2">
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Global period management (90-day global)</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Modifier -58, -78, -79 for staged procedures</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />ASC billing for ambulatory surgery centers</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Workers' compensation orthopedic claims</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-6 border h-fit sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4">Orthopedic Billing Assessment</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
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

export default Orthopedics;