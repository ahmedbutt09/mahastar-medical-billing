import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, TrendingUp, Clock, DollarSign, CheckCircle } from 'lucide-react';

const ForIndependentPractices = () => {
  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Stethoscope className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">RCM Services for Independent Practices</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">Remain independent and stabilize revenue with our affordable RCM solutions.</p>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary">25%</div><div className="text-gray-600">Revenue Increase</div></div>
            <div><div className="text-3xl font-bold text-primary">$2K</div><div className="text-gray-600">Monthly Savings</div></div>
            <div><div className="text-3xl font-bold text-primary">15</div><div className="text-gray-600">Days AR</div></div>
            <div><div className="text-3xl font-bold text-primary">No</div><div className="text-gray-600">Long-term Contracts</div></div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-dark mb-6">Keep Your Practice Independent</h2>
              <p className="text-gray-600 mb-6">You don't need to sell to a hospital system to survive. Our affordable RCM solutions help independent practices thrive.</p>
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-bold text-dark mb-3">Independent Practice Solutions</h4>
                <ul className="space-y-2">
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Pay-as-you-go pricing models</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />No minimum contract term</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Scalable as you grow</li>
                  <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-primary" />Same-day claim submission</li>
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-xl p-6 border h-fit sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4">Independent Practice Assessment</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert('A practice specialist will contact you.'); }} className="space-y-4">
                <input type="text" placeholder="Practice Name" className="w-full border rounded-lg px-4 py-2" required />
                <input type="text" placeholder="# of Providers" className="w-full border rounded-lg px-4 py-2" required />
                <input type="email" placeholder="Email" className="w-full border rounded-lg px-4 py-2" required />
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold">Get Quote →</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-16 text-center">
        <Link to="/contact" className="bg-accent px-8 py-3 rounded-lg font-semibold inline-block">Start Saving Today</Link>
      </section>
    </div>
  );
};

export default ForIndependentPractices;