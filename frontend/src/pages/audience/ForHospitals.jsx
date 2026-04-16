import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, TrendingUp, Clock, DollarSign, Shield, CheckCircle, BarChart3, Users, Activity } from 'lucide-react';

const ForHospitals = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', hospitalName: '' });

  const benefits = [
    { icon: TrendingUp, title: 'Scalable Solutions', desc: 'Enterprise-grade RCM that scales with your hospital system' },
    { icon: DollarSign, title: 'Cost-Effective', desc: 'Reduce billing costs by up to 40% with our offshore model' },
    { icon: Clock, title: 'Faster Reimbursement', desc: '14-day average AR for hospital claims' },
    { icon: Shield, title: 'Enterprise Security', desc: 'SOC2 Type II, HIPAA, and VAPT compliant' },
  ];

  const services = [
    'Inpatient & Outpatient Billing', 'Emergency Department Coding', 'Surgery Center Billing', 'Ancillary Services',
    'Observation Stay Management', 'DRG Validation', 'Transfer DRG Review', 'Hospital Denial Management'
  ];

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Building2 className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">RCM Services for Hospitals</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Scalable and cost-effective billing solutions for health systems of all sizes.</p>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary">40%</div><div className="text-gray-600">Cost Reduction</div></div>
            <div><div className="text-3xl font-bold text-primary">14</div><div className="text-gray-600">Days AR</div></div>
            <div><div className="text-3xl font-bold text-primary">98%</div><div className="text-gray-600">Clean Claim Rate</div></div>
            <div><div className="text-3xl font-bold text-primary">500+</div><div className="text-gray-600">Hospital Beds</div></div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-dark mb-6">Enterprise Hospital RCM Solutions</h2>
              <p className="text-gray-600 mb-6">We provide end-to-end revenue cycle management for hospitals, from patient access to final payment posting. Our scalable solutions grow with your health system.</p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <benefit.icon className="w-6 h-6 text-primary flex-shrink-0" />
                    <div><h3 className="font-semibold">{benefit.title}</h3><p className="text-sm text-gray-600">{benefit.desc}</p></div>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-dark mb-4">Hospital Services We Provide</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {services.map(s => (<span key={s} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{s}</span>))}
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-dark mb-3">Why Hospitals Choose MahaStar</h4>
                <ul className="space-y-2">
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Dedicated hospital billing team with 10+ years experience</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />UB-04 and CMS-1500 claim expertise</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Medicare and Medicaid hospital billing specialists</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />24/7 account access and real-time reporting</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-6 border h-fit sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4">Hospital RCM Assessment</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('A hospital RCM specialist will contact you.'); }} className="space-y-4">
                <input type="text" placeholder="Hospital Name" className="w-full border rounded-lg px-4 py-2" required />
                <input type="text" placeholder="Your Name" className="w-full border rounded-lg px-4 py-2" required />
                <input type="email" placeholder="Email" className="w-full border rounded-lg px-4 py-2" required />
                <input type="tel" placeholder="Phone" className="w-full border rounded-lg px-4 py-2" />
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold">Request Hospital Consultation →</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <Link to="/contact" className="bg-accent px-8 py-3 rounded-lg font-semibold inline-block">Schedule Hospital Consultation</Link>
      </section>
    </div>
  );
};

export default ForHospitals;