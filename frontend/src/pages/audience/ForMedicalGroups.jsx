import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, TrendingUp, Clock, DollarSign, CheckCircle } from 'lucide-react';

const ForMedicalGroups = () => {
  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Users className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">RCM Services for Medical Group Practices</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Contain costs and manage care variations with our specialized group practice RCM.</p>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary">30%</div><div className="text-gray-600">Cost Reduction</div></div>
            <div><div className="text-3xl font-bold text-primary">18</div><div className="text-gray-600">Days AR</div></div>
            <div><div className="text-3xl font-bold text-primary">97%</div><div className="text-gray-600">Clean Claim Rate</div></div>
            <div><div className="text-3xl font-bold text-primary">50+</div><div className="text-gray-600">Specialties</div></div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-dark mb-6">Group Practice RCM Expertise</h2>
              <p className="text-gray-600 mb-6">We understand the unique challenges of medical group practices — multiple locations, varied payer contracts, and diverse specialties.</p>
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-dark mb-3">Group Practice Solutions</h4>
                <ul className="space-y-2">
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Multi-specialty coding and billing</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Centralized credentialing for all locations</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Payer contract optimization</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Provider enrollment management</li>
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-xl p-6 border h-fit sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4">Group Practice Assessment</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('A group practice specialist will contact you.'); }} className="space-y-4">
                <input type="text" placeholder="Practice Name" className="w-full border rounded-lg px-4 py-2" required />
                <input type="text" placeholder="# of Providers" className="w-full border rounded-lg px-4 py-2" required />
                <input type="text" placeholder="Your Name" className="w-full border rounded-lg px-4 py-2" required />
                <input type="email" placeholder="Email" className="w-full border rounded-lg px-4 py-2" required />
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold">Request Group Practice Consultation →</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <Link to="/contact" className="bg-accent px-8 py-3 rounded-lg font-semibold inline-block">Schedule Consultation</Link>
      </section>
    </div>
  );
};

export default ForMedicalGroups;