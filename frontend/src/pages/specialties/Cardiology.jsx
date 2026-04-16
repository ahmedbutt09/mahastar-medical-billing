import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, CheckCircle, TrendingUp, Clock, DollarSign, Shield, PhoneCall, FileText, Activity, Award, BarChart3, Users } from 'lucide-react';

const Cardiology = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', practice: '' });

  const cptCodes = ['92928', '92929', '93306', '93458', '93571', '93620', '93798', '93280'];
  const commonIssues = ['Stent placements', 'Echocardiograms', 'Stress tests', 'Cardiac catheterizations', 'Pacemaker insertions', 'Holter monitoring'];
  const denialReasons = ['Medical necessity', 'Missing documentation', 'Modifier errors', 'Frequency limits', 'NCD/LCD compliance'];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! A cardiology billing specialist will contact you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', practice: '' });
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Heart className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">Cardiology Medical Billing Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Specialized cardiology RCM with 94% first-pass claim acceptance. We handle complex cardiac coding, cath lab claims, and device monitoring.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary">94%</div><div className="text-gray-600">First-Pass Rate</div></div>
            <div><div className="text-3xl font-bold text-primary">$2.8K</div><div className="text-gray-600">Avg Claim Value</div></div>
            <div><div className="text-3xl font-bold text-primary">1,200+</div><div className="text-gray-600">Cardiologists Served</div></div>
            <div><div className="text-3xl font-bold text-primary">18</div><div className="text-gray-600">Days AR</div></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-dark mb-6">Expert Cardiology Coding & Billing</h2>
              <p className="text-gray-600 mb-6">Cardiology billing requires specialized knowledge of cardiac procedures, diagnostic tests, and device monitoring. Our certified cardiology coding specialists ensure maximum reimbursement while maintaining compliance.</p>
              
              <h3 className="text-2xl font-bold text-dark mb-4">Common CPT Codes We Handle</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {cptCodes.map(code => (<span key={code} className="bg-gray-100 px-3 py-1 rounded-full text-sm font-mono">{code}</span>))}
              </div>

              <h3 className="text-2xl font-bold text-dark mb-4">Cardiology Billing Challenges We Solve</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {commonIssues.map(issue => (<div key={issue} className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-primary" /><span>{issue}</span></div>))}
              </div>

              <h3 className="text-2xl font-bold text-dark mb-4">Top Denial Reasons & Our Solutions</h3>
              <div className="space-y-3 mb-8">
                {denialReasons.map(reason => (<div key={reason} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"><span>{reason}</span><span className="text-primary font-semibold">↓ 67% after MahaStar</span></div>))}
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-dark mb-3">Why Cardiology Practices Choose MahaStar</h4>
                <ul className="space-y-2">
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Certified cardiology coders (CCC, CIRCC)</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Expert in NCDs for cardiac imaging</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Modifier -59 and -25 expertise</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />E/M coding for cardiology clinics</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-6 border h-fit sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4">Get a Cardiology Billing Assessment</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded-lg px-4 py-2" required />
                <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border rounded-lg px-4 py-2" required />
                <input type="tel" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border rounded-lg px-4 py-2" />
                <input type="text" placeholder="Practice Name" value={formData.practice} onChange={e => setFormData({...formData, practice: e.target.value})} className="w-full border rounded-lg px-4 py-2" />
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary">Request Consultation →</button>
              </form>
              <p className="text-xs text-gray-500 text-center mt-4">Free, no-obligation analysis</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Cardiology Revenue?</h2>
          <Link to="/contact" className="bg-accent px-8 py-3 rounded-lg font-semibold inline-block hover:bg-secondary">Schedule a Free Consultation</Link>
        </div>
      </section>
    </div>
  );
};

export default Cardiology;